<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $primaryKey = 'idUser';

    protected $table = "users";

    public $timestamps = false;

    protected $fillable = [
        'nickname',
        'email',
        'password',
        'commonname',
    ];
}
