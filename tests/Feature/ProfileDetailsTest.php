<?php

use App\Models\Destination;
use App\Models\Review;
use App\Models\User;
use Database\Seeders\DestinationSeeder;
use Database\Seeders\ReviewSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('user can save profession, city and an avatar photo', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => $user->email,
        'profession' => 'Fotografer',
        'city' => 'Bandar Lampung',
        'avatar' => UploadedFile::fake()->image('foto.jpg'),
    ])->assertSessionHasNoErrors();

    $user->refresh();
    expect($user->profession)->toBe('Fotografer')
        ->and($user->city)->toBe('Bandar Lampung')
        ->and($user->avatar_url)->toStartWith('/storage/avatars/');

    Storage::disk('public')->assertExists(str_replace('/storage/', '', $user->avatar_url));
});

test('replacing the avatar removes the previous stored file', function () {
    Storage::fake('public');
    $user = User::factory()->create();
    $payload = fn () => ['name' => $user->name, 'email' => $user->email, 'avatar' => UploadedFile::fake()->image('a.png')];

    $this->actingAs($user)->patch(route('profile.update'), $payload());
    $first = str_replace('/storage/', '', $user->fresh()->avatar_url);

    $this->actingAs($user)->patch(route('profile.update'), $payload());

    Storage::disk('public')->assertMissing($first);
    Storage::disk('public')->assertExists(str_replace('/storage/', '', $user->fresh()->avatar_url));
});

test('profile rejects non image avatars and keeps the avatar when none is uploaded', function () {
    Storage::fake('public');
    $user = User::factory()->create(['avatar_url' => 'https://example.com/a.jpg']);

    $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => $user->email,
        'avatar' => UploadedFile::fake()->create('dokumen.pdf', 100, 'application/pdf'),
    ])->assertSessionHasErrors('avatar');

    $this->actingAs($user)->patch(route('profile.update'), [
        'name' => 'Nama Baru',
        'email' => $user->email,
        'city' => 'Metro',
    ])->assertSessionHasNoErrors();

    expect($user->fresh()->avatar_url)->toBe('https://example.com/a.jpg');
});

test('testimonials show the reviewer profession, city and avatar', function () {
    $this->seed(DestinationSeeder::class);
    $user = User::factory()->create([
        'name' => 'Budi', 'profession' => 'Dosen', 'city' => 'Metro', 'avatar_url' => '/storage/avatars/budi.jpg',
    ]);
    $plain = User::factory()->create(['name' => 'Tanpa Profil']);
    Review::factory()->create(['user_id' => $user->id, 'destination_id' => Destination::first()->id, 'created_at' => now()->subDay()]);
    Review::factory()->create(['user_id' => $plain->id, 'destination_id' => Destination::first()->id]);

    $this->get(route('testimonials.index'))->assertInertia(fn ($page) => $page
        ->has('testimonials', 2)
        ->where('testimonials.1.role', 'Dosen')
        ->where('testimonials.1.location', 'Metro')
        ->where('testimonials.1.avatar', '/storage/avatars/budi.jpg')
        ->where('testimonials.0.role', 'Pengunjung')
        ->where('testimonials.0.location', 'Lampung'));
});

test('review seeder fills profession, city and avatar of the sample visitors', function () {
    $this->seed(DestinationSeeder::class);
    $this->seed(ReviewSeeder::class);

    $rian = User::where('email', 'rian.hidayat@example.com')->first();
    expect($rian->profession)->toBe('Travel Vlogger')
        ->and($rian->city)->toBe('Jakarta')
        ->and($rian->avatar_url)->toStartWith('https://');
});
