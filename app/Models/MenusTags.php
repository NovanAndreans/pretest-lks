<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenusTags extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = "menus_tags";

    protected $fillable = [
        'idTag',
        'idMenu',
    ];
}
