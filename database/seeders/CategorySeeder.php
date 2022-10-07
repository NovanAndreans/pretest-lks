<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Category $category)
    {
        $category->name = '5 Stars';
        $category->position = 9;
        $category->save();
    }
}
