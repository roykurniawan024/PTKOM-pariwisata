<?php

use App\Models\Destination;
use App\Models\Review;
use App\Models\User;
use Database\Seeders\DestinationSeeder;

beforeEach(function () {
    $this->seed(DestinationSeeder::class);
    $this->destination = Destination::first();
});

test('review submission records the user ip address', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->withServerVariables(['REMOTE_ADDR' => '203.0.113.10'])->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'Sangat indah.'])->assertSessionHas('success');
    $this->assertDatabaseHas('reviews', ['user_id' => $user->id, 'destination_id' => $this->destination->id, 'ip_address' => '203.0.113.10']);
});

test('another user sharing the same ip address cannot spam a second review on the same destination', function () {
    $u1 = User::factory()->create();
    $u2 = User::factory()->create();
    $this->actingAs($u1)->withServerVariables(['REMOTE_ADDR' => '203.0.113.55'])->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'Komentar pertama.'])->assertSessionHas('success');
    $this->actingAs($u2)->withServerVariables(['REMOTE_ADDR' => '203.0.113.55'])->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 1, 'comment' => 'Spam akun kedua.'])->assertSessionHasErrors('comment');
    expect(Review::where('destination_id', $this->destination->id)->count())->toBe(1);
});

test('another user with a different ip address can review the same destination', function () {
    $u1 = User::factory()->create();
    $u2 = User::factory()->create();
    $this->actingAs($u1)->withServerVariables(['REMOTE_ADDR' => '203.0.113.71'])->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'IP pertama.'])->assertSessionHas('success');
    $this->actingAs($u2)->withServerVariables(['REMOTE_ADDR' => '203.0.113.72'])->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 4, 'comment' => 'IP kedua.'])->assertSessionHas('success');
    expect(Review::where('destination_id', $this->destination->id)->count())->toBe(2);
});

test('repeated rapid review submissions from the same ip are rate limited', function () {
    $user = User::factory()->create();
    for ($i = 1; $i <= 3; $i++) {
        $this->actingAs($user)->withServerVariables(['REMOTE_ADDR' => '203.0.113.99'])->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => "Ulasan {$i}"])->assertSessionHas('success');
    }
    $this->actingAs($user)->withServerVariables(['REMOTE_ADDR' => '203.0.113.99'])->post(route('destinations.reviews.store', $this->destination->slug), ['rating' => 5, 'comment' => 'Spam ke-4'])->assertSessionHasErrors('comment');
});
