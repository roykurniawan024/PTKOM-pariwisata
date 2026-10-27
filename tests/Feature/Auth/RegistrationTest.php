<?php

use App\Models\RegistrationToken;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertRedirect(route('registrasi.select'));
});

test('direct post to the legacy register endpoint no longer creates accounts', function () {
    $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertStatus(405);

    $this->assertGuest();
    $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
});

test('token registration endpoints are rate limited', function () {
    foreach (range(1, 10) as $ignored) {
        $this->post(route('registrasi.generate'), ['type' => 'user'])->assertRedirect();
    }

    $this->post(route('registrasi.generate'), ['type' => 'user'])->assertStatus(429);
});

test('used and long expired registration tokens are pruned', function () {
    RegistrationToken::create(['token' => 'a', 'type' => 'user', 'expires_at' => now()->addMinutes(30), 'is_used' => true]);
    RegistrationToken::create(['token' => 'b', 'type' => 'user', 'expires_at' => now()->subDays(2), 'is_used' => false]);
    $fresh = RegistrationToken::create(['token' => 'c', 'type' => 'user', 'expires_at' => now()->addMinutes(30), 'is_used' => false]);

    $this->artisan('model:prune', ['--model' => RegistrationToken::class])->assertSuccessful();

    expect(RegistrationToken::pluck('id')->all())->toBe([$fresh->id]);
});
