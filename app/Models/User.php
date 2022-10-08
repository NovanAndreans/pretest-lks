<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DefaultModel;

class User extends Model implements Authenticatable
{
    use HasFactory, AuthenticableTrait;

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
