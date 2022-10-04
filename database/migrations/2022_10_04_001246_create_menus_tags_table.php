<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus_tags', function (Blueprint $table) {
            $table->unsignedBigInteger('idTag');
            $table->unsignedBigInteger('idMenu');

            $table->foreign('idTag')->references('idTag')->on('tags')->onDelete('cascade');
            $table->foreign('idMenu')->references('idMenu')->on('menus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus_tags');
    }
}
