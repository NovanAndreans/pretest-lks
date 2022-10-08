<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Menu;
use App\Models\MenusTags;
use App\Http\Resources\CommentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * @var Comment
     */
    protected $comment;

    /**
     * UsersController constructor.
     *
     * @param Comment $tag
     */
    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->comment->join('menus', 'comments.idMenu', '=', 'menus.idMenu')
            ->join('users', 'comments.idUser', '=', 'users.idUser')->orderBy($request->column, $request->order);
        $users = $query->paginate($request->per_page ?? 5);

        return CommentResource::collection($users);
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
    public function store(Request $request, Menu $menu, MenusTags $menusTags)
    {
        $tag = json_decode($request->tag);
        DB::beginTransaction();
        try {
            $menus = $menu->findOrFail($request->idMenu);
            $count = $menus->ratingcount;
            $count++;
            $val = $menus->ratingsum;
            $val = $val += $request->value;
            $menus->update([
                'ratingcount' => $count,
                'ratingsum' => $val,
            ]);
            $insert = collect($request->only($this->comment->getFillable()))->filter();
            $this->comment->create($insert->toArray());
            foreach ($tag as $key) {
                $menusTags->create([
                    'idTag' => $key->idTag,
                    'idMenu' => $request->idMenu
                ]);
            }
            DB::commit();

            return response()->json(['message' => 'Success Create']);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->comment->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $row = $this->comment->findOrFail($id);
        $update = collect($request->only($this->comment->getFillable()));
        $row->update($update->toArray());

        return response()->json(['message' => 'Success Create']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->comment->findOrFail($id)->delete();
            DB::commit();
            return response()->json(['message' => 'Success Delete']);
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
