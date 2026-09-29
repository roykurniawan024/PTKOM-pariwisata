<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('site_metrics', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('total_visitors')->default(0);
            $table->integer('active_users')->default(0);
            $table->integer('total_bookings')->default(0);
            $table->date('recorded_at')->unique();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('site_metrics');
    }
};
