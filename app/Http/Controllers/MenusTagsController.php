<?php

namespace App\Http\Controllers;

use App\Models\MenusTags;
use App\Http\Resources\MenuTagResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenusTagsController extends Controller
{
    /**
     * @var MenusTags
     */
    protected $menusTags;

    /**
     * UsersController constructor.
     *
     * @param MenusTags $tag
     */
    public function __construct(MenusTags $menusTags)
    {
        $this->menusTags = $menusTags;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->menusTags
            ->join('menus', 'menus.idMenu', '=', 'menus_tags.idMenu')
            ->join('tags', 'tags.idTag', '=', 'menus_tags.idTag')
            ->where('menus.idMenu', $request->idMenu)
            ->distinct()
            ->get();

        return $query;
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
        $insert = collect($request->only($this->menusTags->getFillable()))->filter();
        $this->menusTags->create($insert->toArray());

        return response()->json(['message' => 'Success Create']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MenusTags  $menusTags
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->menusTags->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MenusTags  $menusTags
     * @return \Illuminate\Http\Response
     */
    public function edit(MenusTags $menusTags)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MenusTags  $menusTags
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $row = $this->menusTags->findOrFail($id);
        $update = collect($request->only($this->menusTags->getFillable()));
        $row->update($update->toArray());

        return response()->json(['message' => 'Success Create']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MenusTags  $menusTags
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->menusTags->findOrFail($id)->delete();
            DB::commit();
            return response()->json(['message' => 'Success Delete']);
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
