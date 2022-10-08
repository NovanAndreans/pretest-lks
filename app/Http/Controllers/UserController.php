<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Comment;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @var User
     */
    protected $user;

    /**
     * UsersController constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->user->orderBy($request->column, $request->order);
        $users = $query->paginate($request->per_page ?? 5);

        return UserResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $insert = collect($req->only($this->user->getFillable()))->filter()->put('password', Hash::make($req->get('password')));
        $this->user->create($insert->toArray());

        return response()->json(['message' => 'Success Create']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->user->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $row = $this->user->findOrFail($id);
        $update = collect($request->only($this->user->getFillable()))->filter()->put('password', Hash::make($request->get('password')))->except('updatedby');
        $row->update($update->toArray());

        return response()->json(['message' => 'Success Create']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Comment $comment)
    {
        DB::beginTransaction();
        try {
            $comment->where('idUser', $id)->delete();
            $this->user->findOrFail($id)->delete();
            DB::commit();
            return response()->json(['message' => 'Success Delete']);
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
