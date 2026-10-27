<?php

use App\Models\Category;
use App\Models\Destination;
use App\Models\Review;
use App\Models\User;
use Database\Seeders\DestinationSeeder;

beforeEach(function () {
    $this->seed(DestinationSeeder::class);
});

test('api returns category detail with published destinations by slug', function () {
    $category = Category::where('slug', 'bahari')->firstOrFail();

    $this->getJson("/api/v1/categories/{$category->slug}")
        ->assertOk()
        ->assertJsonPath('status', 'success')
        ->assertJsonPath('data.slug', 'bahari')
        ->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'name',
                'slug',
                'description',
                'destinations_count',
                'destinations',
            ],
        ]);
});

test('api returns 404 for unknown category slug', function () {
    $this->getJson('/api/v1/categories/kategori-tidak-ada')
        ->assertNotFound();
});

test('regular users and business owners cannot manage categories', function (string $role) {
    $user = User::factory()->create(['role' => $role, 'validation_status' => 'approved']);

    $this->actingAs($user)
        ->post(route('admin.categories.store'), [
            'name' => 'Wisata Kuliner',
            'description' => 'Kuliner khas Lampung',
        ])
        ->assertForbidden();
})->with(['user', 'business_owner']);

test('admin can create a new category with unique slug', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)
        ->post(route('admin.categories.store'), [
            'name' => 'Wisata Kuliner',
            'description' => 'Kuliner khas Lampung',
        ])
        ->assertSessionHas('success');

    $this->assertDatabaseHas('categories', [
        'name' => 'Wisata Kuliner',
        'slug' => 'wisata-kuliner',
    ]);
});

test('admin can update an existing category', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $category = Category::first();

    $this->actingAs($admin)
        ->put(route('admin.categories.update', $category), [
            'name' => 'Bahari Nusantara',
            'description' => 'Deskripsi baru kategori bahari.',
        ])
        ->assertSessionHas('success');

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Bahari Nusantara',
        'description' => 'Deskripsi baru kategori bahari.',
    ]);
});

test('admin cannot delete a category that still has destinations', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $category = Category::whereHas('destinations')->firstOrFail();

    $this->actingAs($admin)
        ->delete(route('admin.categories.destroy', $category))
        ->assertSessionHas('error');

    $this->assertDatabaseHas('categories', ['id' => $category->id]);
});

test('admin can delete an empty category', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $emptyCategory = Category::create([
        'name' => 'Kategori Kosong',
        'slug' => 'kategori-kosong',
        'description' => 'Belum ada destinasi',
    ]);

    $this->actingAs($admin)
        ->delete(route('admin.categories.destroy', $emptyCategory))
        ->assertSessionHas('success');

    $this->assertDatabaseMissing('categories', ['id' => $emptyCategory->id]);
});

test('admin can delete a review and recalculate destination rating', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $destination = Destination::first();

    Review::factory()->create(['destination_id' => $destination->id, 'rating' => 5, 'is_approved' => true]);
    $badReview = Review::factory()->create(['destination_id' => $destination->id, 'rating' => 1, 'is_approved' => true]);

    expect((float) $destination->fresh()->rating)->toBe(3.0);

    $this->actingAs($admin)
        ->delete(route('admin.reviews.destroy', $badReview))
        ->assertSessionHas('success');

    $this->assertDatabaseMissing('reviews', ['id' => $badReview->id]);
    expect((float) $destination->fresh()->rating)->toBe(5.0);
});

test('non-admin cannot delete a review', function () {
    $destination = Destination::first();
    $review = Review::factory()->create(['destination_id' => $destination->id]);

    $this->actingAs(User::factory()->create(['role' => 'user']))
        ->delete(route('admin.reviews.destroy', $review))
        ->assertForbidden();
});

test('category name must be unique on create and update', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    [$first, $second] = Category::take(2)->get();

    $this->actingAs($admin)
        ->post(route('admin.categories.store'), ['name' => $first->name])
        ->assertSessionHasErrors('name');

    $this->actingAs($admin)
        ->put(route('admin.categories.update', $second), ['name' => $first->name])
        ->assertSessionHasErrors('name');

    $this->actingAs($admin)
        ->put(route('admin.categories.update', $first), ['name' => $first->name, 'description' => 'Sama'])
        ->assertSessionHasNoErrors();
});
