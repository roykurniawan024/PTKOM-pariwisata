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

test('a pending review does not change the existing rating', function () {
    $this->destination->update(['rating' => 4.5]);

    Review::factory()->pending()->create(['destination_id' => $this->destination->id, 'rating' => 1]);

    expect((float) $this->destination->fresh()->rating)->toBe(4.5);
});

test('rating resets to zero when the last approved review is unapproved or deleted', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $review = Review::factory()->create(['destination_id' => $this->destination->id, 'rating' => 4]);
    expect((float) $this->destination->fresh()->rating)->toBe(4.0);

    $this->actingAs($admin)->patch(route('admin.reviews.moderate', $review), ['is_approved' => false]);
    expect((float) $this->destination->fresh()->rating)->toBe(0.0);

    $this->actingAs($admin)->patch(route('admin.reviews.moderate', $review), ['is_approved' => true]);
    $this->actingAs($admin)->delete(route('admin.reviews.destroy', $review));
    expect((float) $this->destination->fresh()->rating)->toBe(0.0);
});

test('review submission is rate limited', function () {
    $user = User::factory()->create();

    foreach (range(1, 10) as $ignored) {
        $this->actingAs($user)
            ->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'Bagus'])
            ->assertRedirect();
    }

    $this->actingAs($user)
        ->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'Bagus'])
        ->assertStatus(429);
});

test('admin moderation page lists pending reviews by default and supports filters', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    Review::factory()->pending()->create(['destination_id' => $this->destination->id]);
    Review::factory()->create(['destination_id' => $this->destination->id]);

    $this->actingAs($admin)->get(route('admin.reviews.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/Reviews')
            ->where('currentStatus', 'pending')
            ->has('reviews.data', 1)
            ->where('stats', ['total' => 2, 'pending' => 1, 'approved' => 1]));

    $this->actingAs($admin)->get(route('admin.reviews.index', ['status' => 'all']))
        ->assertInertia(fn ($page) => $page->has('reviews.data', 2));

    $this->actingAs($admin)->get(route('admin.reviews.index', ['status' => 'approved']))
        ->assertInertia(fn ($page) => $page->has('reviews.data', 1)->where('reviews.data.0.is_approved', true));
});

test('only admins can open the moderation page', function () {
    $this->get(route('admin.reviews.index'))->assertRedirect('/login');

    $this->actingAs(User::factory()->create(['role' => 'user']))
        ->get(route('admin.reviews.index'))
        ->assertForbidden();
});

test('destination page shares approved reviews and the viewer own review', function () {
    $viewer = User::factory()->create();
    Review::factory()->create(['destination_id' => $this->destination->id, 'comment' => 'Tampil']);
    Review::factory()->pending()->create(['destination_id' => $this->destination->id, 'comment' => 'Tersembunyi']);
    Review::factory()->pending()->create(['destination_id' => $this->destination->id, 'user_id' => $viewer->id, 'comment' => 'Milik saya']);

    $this->actingAs($viewer)->get(route('destinations.show', $this->destination->slug))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Destinations/Show/Index')
            ->has('reviews', 1)
            ->where('reviews.0.comment', 'Tampil')
            ->where('destination.approved_reviews_count', 1)
            ->where('userReview.comment', 'Milik saya')
            ->where('userReview.is_approved', false));
});

test('guests get no own review on the destination page', function () {
    $this->get(route('destinations.show', $this->destination->slug))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->where('userReview', null)->has('reviews', 0));
});
