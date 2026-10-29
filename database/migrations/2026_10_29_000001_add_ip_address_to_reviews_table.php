<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('reviews', function (Blueprint $table) {
            if (! Schema::hasColumn('reviews', 'ip_address')) {
                $table->string('ip_address', 45)->nullable()->after('is_approved')->index();
            }
        });
    }
    public function down(): void {
        Schema::table('reviews', function (Blueprint $table) {
            if (Schema::hasColumn('reviews', 'ip_address')) {
                $table->dropIndex(['ip_address']);
                $table->dropColumn('ip_address');
            }
        });
    }
};
