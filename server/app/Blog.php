<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $appends = ['cover_image_url'];
    const COVER_IMAGE_UPLOAD_PATH = '/uploads/cover_image/';
    const BODY_IMAGE_UPLOAD_PATH = '/uploads/blog_body_image/';

    public function blog_category(){
        return $this->hasMany(BlogToCategory::class, 'blog_id');
    }
    public function blog_tag(){
        return $this->hasMany(BlogToTag::class, 'blog_id');
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getCoverImageUrlAttribute(){
        $general_directory =Blog::COVER_IMAGE_UPLOAD_PATH;
        $folder_path = $general_directory . $this->created_at->format('Y') . "/" . $this->created_at->format('m') . "/";
        $upload_url = $folder_path.$this->cover_image;

        return $upload_url;
    }
}
