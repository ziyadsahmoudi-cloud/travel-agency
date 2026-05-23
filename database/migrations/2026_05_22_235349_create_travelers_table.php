<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('travelers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tour_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('cin');
            $table->string('email');
            $table->string('phone');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('travelers');
    }
};
