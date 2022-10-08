<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'        =>  $this->idMenu,
            'name'      => $this->menuname,
            'categoryname'      => $this->categoryname,
            'price'    => $this->price,
            'ratingcount'    => $this->ratingcount,
            'ratingsum'      => $this->ratingsum,
        ];
    }
}
