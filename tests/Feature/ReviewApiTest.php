<?php

use App\Models\Destination;
use App\Models\Review;
use App\Models\User;
use Database\Seeders\DestinationSeeder;

beforeEach(function () {
    $this->seed(DestinationSeeder::class);
    $this->destination = Destination::first();
});

test('api lists only approved reviews of a destination', function () {
    Review::factory()->create(['destination_id' => $this->destination->id, 'comment' => 'Disetujui']);
    Review::factory()->pending()->create(['destination_id' => $this->destination->id, 'comment' => 'Belum']);

    $this->getJson("/api/v1/destinations/{$this->destination->slug}/reviews")
        ->assertOk()
        ->assertJsonPath('meta.total', 1)
        ->assertJsonFragment(['comment' => 'Disetujui'])
        ->assertJsonMissing(['comment' => 'Belum']);
});

test('reviews endpoint returns 404 for unknown destination', function () {
    $this->getJson('/api/v1/destinations/tidak-ada/reviews')->assertNotFound();
});

test('authenticated user submits a review that awaits moderation', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'Bagus sekali'])
        ->assertSessionHas('success');

    $this->assertDatabaseHas('reviews', ['user_id' => $user->id, 'is_approved' => false]);
});

test('guests cannot submit reviews and rating must be valid', function () {
    $this->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'x'])
        ->assertRedirect('/login');

    $this->actingAs(User::factory()->create())
        ->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 9, 'comment' => 'x'])
        ->assertSessionHasErrors('rating');
});

test('admin approval recalculates destination rating', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $review = Review::factory()->pending()->create(['destination_id' => $this->destination->id, 'rating' => 3]);

    $this->actingAs($admin)
        ->patch(route('admin.reviews.moderate', $review), ['is_approved' => true])
        ->assertSessionHas('success');

    expect((float) $this->destination->fresh()->rating)->toBe(3.0);
});

test('non admin cannot moderate reviews', function () {
    $review = Review::factory()->pending()->create(['destination_id' => $this->destination->id]);

    $this->actingAs(User::factory()->create())
        ->patch(route('admin.reviews.moderate', $review), ['is_approved' => true])
        ->assertForbidden();
});

test('unverified user cannot submit a review', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'Bagus'])
        ->assertRedirect(route('verification.notice'));

    expect(Review::count())->toBe(0);
});
