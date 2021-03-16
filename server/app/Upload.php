<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    protected $appends = ['upload_url'];

    public function getUploadUrlAttribute(){
        $general_directory = Blog::BODY_IMAGE_UPLOAD_PATH;
        $folder_path = $general_directory . $this->created_at->year . "/" . $this->created_at->format('m') . "/";
        $upload_url = $folder_path.$this->name;

        return $upload_url;
    }
}
