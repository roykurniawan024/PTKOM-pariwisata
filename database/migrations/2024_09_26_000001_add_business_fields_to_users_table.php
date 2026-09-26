<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user'); // user, business_owner, admin
            $table->string('business_name')->nullable();
            $table->string('business_type')->nullable();
            $table->text('business_address')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('validation_status')->default('pending'); // pending, approved, rejected
            $table->text('rejection_reason')->nullable();
        });

        Schema::create('registration_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('token')->unique();
            $table->string('type'); // user, business_owner
            $table->timestamp('expires_at');
            $table->boolean('is_used')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'business_name', 'business_type', 'business_address', 'phone_number', 'validation_status', 'rejection_reason']);
        });
        Schema::dropIfExists('registration_tokens');
    }
};