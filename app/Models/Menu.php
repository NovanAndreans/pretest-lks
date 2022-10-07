<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $primaryKey = 'idMenu';

    protected $table = "menus";

    public $timestamps = false;

    protected $fillable = [
        'idCategory',
        'menuname',
        'description',
        'price',
        'ratingcount',
        'ratingsum',
    ];
}
