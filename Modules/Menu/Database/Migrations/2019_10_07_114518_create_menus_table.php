<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->bigInteger('menu_icon_id')->nullable();
            $table->string('url')->default('#');
            $table->bigInteger('parent_id')->nullable();
            $table->bigInteger('level')->default(1);
            $table->bigInteger('priority')->nullable();
            $table->text('permissions')->nullable();
            $table->bigInteger('super_admin')->default(0);
            $table->bigInteger('status')->default(1);
            $table->timestamps();
            $table->softDeletes();
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
