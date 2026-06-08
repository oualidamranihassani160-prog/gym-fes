<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('cin')->unique();
            $table->string('full_name');
            $table->string('phone_number');
            $table->foreignId('membership_id')->constrained('membership_types');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('image_path')->nullable();
            $table->foreignId('admin_id')->constrained('admins');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};