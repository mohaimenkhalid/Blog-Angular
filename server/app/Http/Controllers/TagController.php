<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function add_tag(Request $request){
        $validatedData = $request->validate([
            'name' => ['required'],
        ]);
        $tag = new Tag();
        $tag->name = $request->name;
        $tag->slug = str_replace(' ', '-', strtolower($request->name));
        $tag->save();
        return response()->json([
            'success' => 'Tag created successfully!'
        ]);
    }

    public function all_tag(){
        $tags = Tag::all();
        return response()->json(['tags' => $tags]);
    }

    public function edit_tag($id){
        $tag = Tag::find($id);
        return response()->json(['tag' => $tag]);
    }

    public function update_tag($id, Request $request){
        $tag = Tag::find($id);
        $tag->name = $request->name;
        $tag->slug = str_replace(' ', '-', strtolower($request->name));
        $tag->save();
        return response()->json([
            'success' => 'Tag update successfully!'
        ]);
    }

    public function delete_tag($id){
        $tag = Tag::find($id);
        $tag->delete();
        return response()->json([
            'success' => 'Tag deleted successfully!'
        ]);
    }
}
