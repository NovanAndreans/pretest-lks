<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id('idMenu');
            $table->unsignedBigInteger('idCategory');
            $table->string('name', 150);
            $table->text('description');
            $table->decimal('price', $precision = 5, $scale = 2);
            $table->integer('ratingcount');
            $table->integer('ratingsum');

            $table->foreign('idCategory')->references('idCategory')->on('categorys')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
