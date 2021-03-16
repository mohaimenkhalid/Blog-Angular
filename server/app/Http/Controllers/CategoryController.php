<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function add_category(Request $request){
        $validatedData = $request->validate([
            'name' => ['required'],
        ]);
        $category = new Category();
        $category->name = $request->name;
        $category->slug = str_replace(' ', '-', strtolower($request->name));
        $category->save();
        return response()->json([
            'success' => 'Category created successfully!'
        ]);
    }

    public function all_category(){
        $categories = Category::all();
        return response()->json(['categories' => $categories]);
    }

    public function edit_category($id){
       $category = Category::find($id);
       return response()->json(['category' => $category]);
    }

    public function update_category($id, Request $request){
        $category = Category::find($id);
        $category->name = $request->name;
        $category->slug = str_replace(' ', '-', strtolower($request->name));
        $category->save();
        return response()->json([
            'success' => 'Category update successfully!'
        ]);
    }

    public function delete_category($id){
        $category = Category::find($id);
        $category->delete();
        return response()->json([
            'success' => 'Category deleted successfully!'
        ]);
    }
}
