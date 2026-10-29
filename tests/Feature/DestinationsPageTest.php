<?php

use App\Models\Destination;
use Database\Seeders\DestinationSeeder;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the destinations page for guests', function () {
    $this->get(route('destinations.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Destinations/Index'));
});

it('returns 404 for unknown or unpublished destination slugs', function () {
    $this->get('/destinations/slug-tidak-ada')->assertNotFound();

    $this->seed(DestinationSeeder::class);
    $dest = Destination::first();
    $dest->update(['is_published' => false]);

    $this->get("/destinations/{$dest->slug}")->assertNotFound();
});

it('shows tagline and facilities stored in the database', function () {
    $this->seed(DestinationSeeder::class);
    $dest = Destination::first();
    $dest->update(['tagline' => 'Tagline Uji', 'facilities' => ['Parkir'], 'tips' => ['Bawa air']]);

    $this->get("/destinations/{$dest->slug}")
        ->assertInertia(fn (Assert $page) => $page
            ->where('destination.tagline', 'Tagline Uji')
            ->where('destination.facilities', ['Parkir'])
            ->where('destination.tips', ['Bawa air']));
});

it('renders the detail page for a destination without a description', function () {
    $this->seed(DestinationSeeder::class);
    $dest = Destination::first();
    $dest->update(['description' => null]);

    $this->get("/destinations/{$dest->slug}")
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Destinations/Show/Index')
            ->where('destination.description', null));
});
