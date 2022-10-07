<?php


namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Menu $menu)
    {
        $menu->idCategory = 1;
        $menu->menuname = 'Dawet';
        $menu->description = 'Enak Banget';
        $menu->price =  2.500;
        $menu->save();
    }
}
