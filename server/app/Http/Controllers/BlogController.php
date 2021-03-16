<?php

namespace App\Http\Controllers;

use App\Blog;
use App\BlogToCategory;
use App\BlogToTag;
use App\Models\Discussion;
use App\Upload;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Image;
use DomDocument;

class BlogController extends Controller
{
    public function index(){
        $blogs = Blog::with(['blog_category.category', 'blog_tag.tag', 'user'])->get();
        return response()->json(['blogs' => $blogs]);
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'title' => ['required'],
            'cover_image' => ['required'],
            'body' => ['required']
        ]);

        $slug = $this->setSlug(strtolower($request->title));
        $blog = new Blog();
        $blog->title = $request->title;
        $blog->body = '';
        $blog->slug = $slug;
        $blog->user_id = $request->user_id;

        if($request->cover_image){
            $imageName = time().'.' . explode('/', explode(':', substr($request->cover_image, 0, strpos($request->cover_image, ';')))[1])[1];
            !file_exists(public_path(Blog::COVER_IMAGE_UPLOAD_PATH.date('Y').'/'.date('m'))) && mkdir(public_path(Blog::COVER_IMAGE_UPLOAD_PATH.date('Y').'/'.date('m')), 0777, true);
            \Image::make($request->cover_image)
                ->save(public_path(Blog::COVER_IMAGE_UPLOAD_PATH.date('Y').'/'.date('m').'/').$imageName);

        }
        $blog->cover_image = $imageName;
        $blog->save();

        //save category & tag

        if($request->blog_selected_category){
            foreach ($request->blog_selected_category as $category){
                $blog_category = new BlogToCategory();
                $blog_category->blog_id = $blog->id;
                $blog_category->category_id = $category['id'];
                $blog_category->save();
            }
        }

        if($request->blog_selected_tag){
            foreach ($request->blog_selected_tag as $tag){
                $blog_tag = new BlogToTag();
                $blog_tag->blog_id = $blog->id;
                $blog_tag->tag_id = $tag['id'];
                $blog_tag->save();
            }
        }

        $body = $request->input('body');
        $dom = new DomDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . "<div>$body</div>");

        $container = $dom->getElementsByTagName('div')->item(0);
        $container = $container->parentNode->removeChild($container);

        while ($dom->firstChild) {
            $dom->removeChild($dom->firstChild);
        }

        while ($container->firstChild) {
            $dom->appendChild($container->firstChild);
        }

        $images = $dom->getElementsByTagName('img');

        $blog->body = $dom->saveHTML();
        $blog->save();

        foreach ($images as $img) {
            $src = $img->getAttribute('src');
            if (preg_match('/data:image/', $src)) {
                $this->mime_type_image_save($src, $img, $blog);
            }
        }
        $blog->body = $dom->saveHTML();
        $blog->update();
        return response()->json(
            [
                'success' => true,
                'message' => 'New blog post created successfully!'
            ]
        );
    }

    public function mime_type_image_save($src, $img, $blog){
        $general_directory = Blog::BODY_IMAGE_UPLOAD_PATH;
        preg_match('/data:image\/(?<mime>.*?)\;/', $src, $groups);
        $mimetype = $groups['mime'];
        $filename = $img->getAttribute('data-filename');
        $filename = time() . '_' . $filename;
        $filename = str_replace(' ', '_', $filename);
        $public_path = public_path() . $general_directory ;
        $year_folder = $public_path . date("Y");
        $month_folder = $year_folder . '/' . date("m");

        !file_exists($year_folder) && mkdir($year_folder, 0777, true);
        !file_exists($month_folder) && mkdir($month_folder, 0777, true);
        $folder_path = $general_directory . date('Y') . "/" . date('m') . "/";
        $img_md5_value = md5_file($src);
        $image_exist = Upload::where([['name', '=', $filename]])->first();

        if (!empty($image_exist)) {
            $filename =  Carbon::now()->timestamp . '_' . $filename;
        }

        $upload = new Upload();
        $upload->name = $filename;
        $upload->md5_hash = $img_md5_value;
        $upload->blog_id = $blog->id;
        $upload->save();
        $image = Image::make($src)
            ->encode($mimetype, 100)
            ->save(public_path($folder_path.$filename));
        $new_src = $upload->upload_url;
        $img->removeAttribute('src');
        $img->setAttribute('src', $new_src);
    }

    public function setSlug($title)
    {
        $title = strtolower($title);
        $slug = str_replace(' ', '-', $title);
        $i = 0;
        while(Blog::where('slug', $slug)->exists())
        {
            $i++;
            $slug = $title.'-'.$i;
        }
        return $slug;
    }

    public function show($slug) {
        $blog = Blog::where('slug', $slug)->with(['blog_category.category', 'blog_tag.tag', 'user'])->first();
        return response()->json(['blog' => $blog]);
    }
}
