<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenusTags;
use App\Models\Comment;
use App\Http\Resources\MenuResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * @var Menu
     */
    protected $menu;

    /**
     * UsersController constructor.
     *
     * @param Menu $menu
     */
    public function __construct(Menu $menu)
    {
        $this->menu = $menu;
    }

    public function all()
    {
        $query = $this->menu->all();

        return $query;
    }

    public function where($id)
    {
        $query = $this->menu->where('idCategory', $id)->get();

        return $query;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->menu->join('categorys', 'menus.idCategory', '=', 'categorys.idCategory')->orderBy($request->column, $request->order);
        $users = $query->paginate($request->per_page ?? 5);

        return MenuResource::collection($users);
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
    public function store(Request $request)
    {
        $insert = collect($request->only($this->menu->getFillable()))->filter();
        $this->menu->create($insert->toArray());

        return response()->json(['message' => 'Success Create']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->menu->join('categorys', 'menus.idCategory', '=', 'categorys.idCategory')->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $row = $this->menu->findOrFail($id);
        $update = collect($request->only($this->menu->getFillable()));
        $row->update($update->toArray());

        return response()->json(['message' => 'Success Create']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, MenusTags $menusTags, Comment $comment)
    {
        DB::beginTransaction();
        try {
            $comment->where('idMenu', $id)->delete();
            $menusTags->where('idMenu', $id)->delete();
            $this->menu->findOrFail($id)->delete();
            DB::commit();
            return response()->json(['message' => 'Success Delete']);
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
