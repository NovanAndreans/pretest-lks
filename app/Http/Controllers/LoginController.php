<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Str;

class LoginController extends Controller
{

    private $apiToken;
    public function __construct()
    {
        $this->apiToken = uniqid(base64_encode(Str::random(40)));
    }
    /** 
     * 
     * @return \Illuminate\Http\Response 
     */

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            //Setting login response 
            $success['token'] = $this->apiToken;
            $success['id'] =  $user->idUser;
            $success['name'] =  $user->nickname;
            $success['fullname'] =  $user->commonname;
            $success['email'] =  $user->email;
            return response()->json([
                'status' => 'success',
                'data' => $success
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'data' => 'Unauthorized Access'
            ]);
        }
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => 'success'
        ]);
    }
}
