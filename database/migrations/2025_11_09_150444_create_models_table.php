<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('models', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            $table->foreignId('brand_id')->constrained('brands')->cascadeOnDelete();

            $table->timestamps();
        });
        Schema::create('kits', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            $table->timestamps();
        });
        Schema::create('kit_model', function (Blueprint $table) {
            $table->id();

            $table->foreignId('model_id')->constrained('models')->cascadeOnDelete();
            $table->foreignId('kit_id')->constrained('kits')->cascadeOnDelete();
            $table->string('model_photo')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kit_model');
        Schema::dropIfExists('kits');
        Schema::dropIfExists('models');
    }
};
