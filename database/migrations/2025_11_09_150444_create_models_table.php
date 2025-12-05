<?php

use App\Enums\CarType;
use App\Enums\DetailType;
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
            $table->string('picture_url');
            $table->enum('type', CarType::all())->default(CarType::OTHER);

        });
        Schema::create('details', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('picture_url');
            $table->integer('stock')->default(0);
            $table->enum('type', DetailType::all());

        });
        Schema::create('detail_model', function (Blueprint $table) {
            $table->id();

            $table->foreignId('model_id')->constrained('models')->cascadeOnDelete();
            $table->foreignId('detail_id')->constrained('details')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_model');
        Schema::dropIfExists('details');
        Schema::dropIfExists('models');
    }
};
