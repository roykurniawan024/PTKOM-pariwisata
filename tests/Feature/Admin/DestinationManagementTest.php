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

test('guests are redirected to login when visiting admin destinations page', function () {
    $response = $this->get('/admin/destinasi');

    $response->assertRedirect('/login');
});

test('regular users cannot access admin destinations page', function () {
    $user = User::factory()->create(['role' => 'user']);

    $response = $this->actingAs($user)->get('/admin/destinasi');

    $response->assertStatus(403);
});

test('admin can view destinations management page', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->get('/admin/destinasi');

    $response->assertStatus(200);
});

test('admin can create a new destination with image upload', function () {
    Storage::fake('public');

    $admin = User::factory()->create(['role' => 'admin']);
    $category = Category::first();

    $file = UploadedFile::fake()->create('pantai-marina.jpg', 100, 'image/jpeg');

    $response = $this->actingAs($admin)->post('/admin/destinasi', [
        'name' => 'Pantai Marina Kalianda',
        'category_id' => $category->id,
        'price' => 35000,
        'location' => 'Lampung Selatan',
        'rating' => 4.9,
        'description' => 'Pantai dengan bebatuan karang eksotis.',
        'image' => $file,
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('destinations', [
        'name' => 'Pantai Marina Kalianda',
        'slug' => 'pantai-marina-kalianda',
        'price' => 35000,
    ]);

    $destination = Destination::where('slug', 'pantai-marina-kalianda')->first();
    expect($destination->images()->count())->toBe(1);
});

test('admin can update destination details', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $destination = Destination::first();
    $category = Category::first();

    $response = $this->actingAs($admin)->put("/admin/destinasi/{$destination->id}", [
        'name' => 'Nama Destinasi Diperbarui',
        'category_id' => $category->id,
        'price' => 75000,
        'location' => 'Lokasi Baru',
        'rating' => 5.0,
        'description' => 'Deskripsi baru.',
    ]);

    $response->assertSessionHas('success');

    expect($destination->fresh()->name)->toBe('Nama Destinasi Diperbarui');
    expect((int) $destination->fresh()->price)->toBe(75000);
});

test('admin can delete a destination', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $destination = Destination::first();

    $response = $this->actingAs($admin)->delete("/admin/destinasi/{$destination->id}");

    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('destinations', [
        'id' => $destination->id,
    ]);
});

test('admin update keeps fields that are not sent', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $destination = Destination::first();
    $destination->update(['tagline' => 'Tagline lama', 'is_published' => true]);

    $this->actingAs($admin)->put("/admin/destinasi/{$destination->id}", [
        'name' => 'Nama Baru',
        'category_id' => $destination->category_id,
        'price' => 1000,
    ])->assertSessionHasNoErrors();

    $fresh = $destination->fresh();
    expect($fresh->tagline)->toBe('Tagline lama')
        ->and($fresh->is_published)->toBeTrue();
});

test('admin store ignores a manual rating and validates through the form request', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)->post('/admin/destinasi', [
        'name' => 'Destinasi Admin Baru',
        'category_id' => Category::first()->id,
        'price' => 1000,
        'rating' => 5,
    ])->assertSessionHasNoErrors();

    expect((float) Destination::where('slug', 'destinasi-admin-baru')->first()->rating)->toBe(0.0);

    $this->actingAs($admin)
        ->post('/admin/destinasi', ['name' => '', 'price' => 100, 'discount_price' => 500])
        ->assertSessionHasErrors(['name', 'category_id', 'discount_price']);
});
