<?php

use App\Models\Review;
use App\Models\User;
use Database\Seeders\DestinationSeeder;
use Database\Seeders\ReviewSeeder;

beforeEach(function () {
    $this->seed(DestinationSeeder::class);
});

test('review seeder creates visitor accounts for approved sample reviews', function () {
    $this->seed(ReviewSeeder::class);

    expect(Review::count())->toBe(42)
        ->and(Review::approved()->count())->toBe(42)
        ->and(User::where('email', 'like', '%@example.com')
            ->where('role', 'user')
            ->count())->toBe(12);

    $this->get(route('testimonials.index'))
        ->assertInertia(fn ($page) => $page
            ->component('Testimonials/Index')
            ->has('testimonials', 6)
            ->where('testimonials.5.name', 'Nadia Putri')
            ->where('testimonials.5.visited', 'Menara Siger'));
});

test('review seeder is idempotent and sample visitors can log in', function () {
    $this->seed(ReviewSeeder::class);
    $this->seed(ReviewSeeder::class);

    expect(Review::count())->toBe(42)
        ->and(User::where('email', 'rian.hidayat@example.com')->count())->toBe(1);

    $this->post(route('login'), [
        'email' => 'rian.hidayat@example.com',
        'password' => 'password',
    ])->assertRedirect(route('dashboard', absolute: false));
});

test('home page shows at most six approved reviews as testimonials', function () {
    $this->seed(ReviewSeeder::class);
    Review::factory()->pending()->create(['comment' => 'Belum disetujui']);
    Review::factory()->count(3)->create();

    $this->get(route('home'))->assertInertia(fn ($page) => $page
        ->component('Index')
        ->has('testimonials', 6)
        ->where('testimonials', fn ($items) => collect($items)
            ->every(fn ($item) => $item['quote'] !== 'Belum disetujui')));
});

test('home page testimonials are empty when no review is approved', function () {
    $this->get(route('home'))
        ->assertInertia(fn ($page) => $page->has('testimonials', 0));
});