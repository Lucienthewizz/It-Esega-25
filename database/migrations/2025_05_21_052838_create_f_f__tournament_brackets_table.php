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
        Schema::create('f_f__tournament_brackets', function (Blueprint $table) {
            $table->id();
            $table->string('group'); // Group A, B, C, D
            $table->integer('rank');
            $table->unsignedBigInteger('team_id')->nullable();
            $table->integer('placement')->nullable();
            $table->integer('kill')->nullable();
            $table->integer('booyah')->nullable();
            $table->integer('total_point')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('f_f__tournament_brackets');
    }
};
