<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $primaryKey = 'idTag';

    protected $table = "tags";

    public $timestamps = false;

    protected $fillable = [
        'name'
    ];
}
