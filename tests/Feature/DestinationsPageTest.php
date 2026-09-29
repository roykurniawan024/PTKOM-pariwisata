<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the destinations page for guests', function () {
    $this->get(route('destinations.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Destinations/Index'));
});
