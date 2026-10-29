<?php

use App\Models\Destination;
use App\Models\DestinationImage;
use Database\Seeders\DestinationSeeder;

test('seeding twice keeps one primary image per destination', function () {
    $this->seed(DestinationSeeder::class);
    $this->seed(DestinationSeeder::class);

    expect(Destination::count())->toBe(7)
        ->and(DestinationImage::count())->toBe(7)
        ->and(DestinationImage::where('is_primary', true)->count())->toBe(7);
});

test('re-seeding replaces an outdated seeded image and refreshes content but keeps the rating', function () {
    $this->seed(DestinationSeeder::class);
    $destination = Destination::where('slug', 'way-kambas')->first();
    $seededUrl = $destination->images()->first()->image_url;

    $destination->images()->update(['image_url' => 'https://example.com/lama.jpg']);
    $destination->forceFill(['tagline' => 'Tagline lama', 'rating' => 3.3])->saveQuietly();

    $this->seed(DestinationSeeder::class);

    $destination->refresh();
    expect($destination->images()->count())->toBe(1)
        ->and($destination->images()->first()->image_url)->toBe($seededUrl)
        ->and($destination->tagline)->not->toBe('Tagline lama')
        ->and((float) $destination->rating)->toBe(3.3);
});

test('re-seeding does not replace an image uploaded through the panel', function () {
    $this->seed(DestinationSeeder::class);
    $destination = Destination::where('slug', 'pulau-pahawang')->first();
    $destination->images()->delete();
    $destination->images()->create(['image_url' => '/storage/destinations/upload.jpg', 'is_primary' => true]);

    $this->seed(DestinationSeeder::class);

    expect($destination->images()->pluck('image_url')->all())->toBe(['/storage/destinations/upload.jpg']);
});

test('re-seeding cleans duplicated primary images left by an older seeder', function () {
    $this->seed(DestinationSeeder::class);
    $destination = Destination::where('slug', 'pantai-tanjung-setia')->first();
    $destination->images()->create(['image_url' => 'https://example.com/ganda.jpg', 'is_primary' => true]);
    expect($destination->images()->count())->toBe(2);

    $this->seed(DestinationSeeder::class);

    expect($destination->images()->count())->toBe(1)
        ->and($destination->images()->first()->image_url)->not->toBe('https://example.com/ganda.jpg');
});
