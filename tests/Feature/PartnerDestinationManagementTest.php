<?php

use App\Models\Category;
use App\Models\Destination;
use App\Models\User;
use Database\Seeders\DestinationSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed(DestinationSeeder::class);
});

test('partner sees only their own destinations on manage page', function () {
    $partner = User::factory()->create(['role' => 'business_owner', 'validation_status' => 'approved']);
    $own = Destination::first();
    $own->update(['user_id' => $partner->id]);

    $this->actingAs($partner)
        ->get(route('manage.destinations.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Destinations/Manage/Index')
            ->has('destinations.data', 1)
            ->where('destinations.data.0.id', $own->id));
});

test('partner can create a destination owned by themselves', function () {
    $partner = User::factory()->create(['role' => 'business_owner', 'validation_status' => 'approved']);

    $this->actingAs($partner)
        ->post(route('manage.destinations.store'), [
            'name' => 'Wisata Mitra Baru',
            'category_id' => Category::first()->id,
            'price' => 10000,
        ])
        ->assertRedirect(route('manage.destinations.index'));

    $this->assertDatabaseHas('destinations', [
        'slug' => 'wisata-mitra-baru',
        'user_id' => $partner->id,
    ]);
});

test('partner cannot edit destination owned by someone else', function () {
    $partner = User::factory()->create(['role' => 'business_owner', 'validation_status' => 'approved']);
    $destination = Destination::first();

    $this->actingAs($partner)
        ->get(route('manage.destinations.edit', $destination))
        ->assertForbidden();
});

test('regular users cannot access the manage page', function () {
    $user = User::factory()->create(['role' => 'user']);

    $this->actingAs($user)
        ->get(route('manage.destinations.index'))
        ->assertForbidden();
});

test('guests are redirected to login from the manage page', function () {
    $this->get(route('manage.destinations.index'))->assertRedirect('/login');
});

test('pending or rejected partners are blocked from the manage page', function (string $status) {
    $partner = User::factory()->create(['role' => 'business_owner', 'validation_status' => $status]);

    $this->actingAs($partner)
        ->get(route('manage.destinations.index'))
        ->assertForbidden();
})->with(['pending', 'rejected']);

test('approved partner can access the manage page', function () {
    $partner = User::factory()->create(['role' => 'business_owner', 'validation_status' => 'approved']);

    $this->actingAs($partner)
        ->get(route('manage.destinations.index'))
        ->assertOk();
});

test('replacing the image removes the old stored file', function () {
    Storage::fake('public');

    $admin = User::factory()->create(['role' => 'admin']);
    $destination = Destination::first();
    $oldPath = UploadedFile::fake()->create('old.jpg', 100, 'image/jpeg')->store('destinations', 'public');
    $destination->images()->delete();
    $destination->images()->create(['image_url' => '/storage/'.$oldPath, 'is_primary' => true]);

    $this->actingAs($admin)->put(route('manage.destinations.update', $destination), [
        'name' => $destination->name,
        'category_id' => $destination->category_id,
        'price' => 1000,
        'image' => UploadedFile::fake()->create('new.jpg', 100, 'image/jpeg'),
    ]);

    Storage::disk('public')->assertMissing($oldPath);
    expect($destination->images()->count())->toBe(1);
});

test('deleting a destination removes its stored image files', function () {
    Storage::fake('public');

    $admin = User::factory()->create(['role' => 'admin']);
    $destination = Destination::first();
    $path = UploadedFile::fake()->create('a.jpg', 100, 'image/jpeg')->store('destinations', 'public');
    $destination->images()->create(['image_url' => '/storage/'.$path, 'is_primary' => true]);

    $this->actingAs($admin)->delete(route('manage.destinations.destroy', $destination));

    Storage::disk('public')->assertMissing($path);
});

test('policy lets admins manage any destination but partners only their own', function () {
    $partner = User::factory()->create(['role' => 'business_owner']);
    $other = User::factory()->create(['role' => 'business_owner']);
    $admin = User::factory()->create(['role' => 'admin']);
    $user = User::factory()->create(['role' => 'user']);
    $destination = Destination::first();
    $destination->update(['user_id' => $partner->id]);

    expect($admin->can('update', $destination))->toBeTrue()
        ->and($partner->can('update', $destination))->toBeTrue()
        ->and($other->can('update', $destination))->toBeFalse()
        ->and($user->can('create', Destination::class))->toBeFalse();
});

test('store rejects invalid payload through the form request', function () {
    $partner = User::factory()->create(['role' => 'business_owner', 'validation_status' => 'approved']);

    $this->actingAs($partner)
        ->post(route('manage.destinations.store'), ['name' => '', 'price' => 100, 'discount_price' => 500])
        ->assertSessionHasErrors(['name', 'category_id', 'discount_price']);
});

test('partner cannot update or delete or toggle someone elses destination', function () {
    $partner = User::factory()->create(['role' => 'business_owner', 'validation_status' => 'approved']);
    $destination = Destination::first();

    $this->actingAs($partner)->put(route('manage.destinations.update', $destination), [
        'name' => 'X', 'category_id' => $destination->category_id, 'price' => 1,
    ])->assertForbidden();
    $this->actingAs($partner)->delete(route('manage.destinations.destroy', $destination))->assertForbidden();
    $this->actingAs($partner)->patch(route('manage.destinations.toggle-publish', $destination))->assertForbidden();
});

test('unverified partner is redirected to verification from the manage page', function () {
    $partner = User::factory()->unverified()->create(['role' => 'business_owner', 'validation_status' => 'approved']);

    $this->actingAs($partner)
        ->get(route('manage.destinations.index'))
        ->assertRedirect(route('verification.notice'));
});
