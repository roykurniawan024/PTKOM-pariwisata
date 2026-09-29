<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('destinations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('category_id')->constrained('categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 15, 2)->default(0);
            $table->string('location')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->timestamps();

            $table->index('slug');
            $table->index('category_id');
            $table->index('location');
        });
    }
    public function down(): void {
        Schema::dropIfExists('destinations');
    }
};
