<?php

use App\Models\Review;
use App\Models\User;
use Database\Seeders\DestinationSeeder;
use Database\Seeders\ReviewSeeder;

beforeEach(function () {
    $this->seed(DestinationSeeder::class);
});

test('review seeder creates a visitor account for each approved sample review', function () {
    $this->seed(ReviewSeeder::class);

    expect(Review::count())->toBe(6)
        ->and(Review::approved()->count())->toBe(6)
        ->and(User::where('email', 'like', '%@example.com')->where('role', 'user')->count())->toBe(6);

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

    expect(Review::count())->toBe(6)
        ->and(User::where('email', 'rian.hidayat@example.com')->count())->toBe(1);

    $this->post(route('login'), ['email' => 'rian.hidayat@example.com', 'password' => 'password'])
        ->assertRedirect(route('dashboard', absolute: false));
});
