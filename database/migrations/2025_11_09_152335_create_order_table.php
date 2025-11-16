<?php

use App\Enums\OrderStatus;
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
//        Schema::create('orders', function (Blueprint $table) {
//            $table->id();
//
//            $table->enum('status', OrderStatus::all())->default(OrderStatus::PENDING);
//            $table->foreignId('user_id')->constrained('users');
//
//            $table->timestamps();
//        });
//        Schema::create('detail_order', function (Blueprint $table) {
//            $table->id();
//
//            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
//            $table->foreignId('detail_id')->constrained('details')->cascadeOnDelete();
//        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
//        Schema::dropIfExists('detail_order');
//        Schema::dropIfExists('orders');
    }
};
