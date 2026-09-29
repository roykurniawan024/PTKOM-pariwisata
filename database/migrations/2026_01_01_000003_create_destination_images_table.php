<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('destination_images', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('destination_id')->constrained('destinations')->cascadeOnDelete();
            $table->string('image_url', 1000);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
            
            $table->index('destination_id');
        });
    }
    public function down(): void {
        Schema::dropIfExists('destination_images');
    }
};
