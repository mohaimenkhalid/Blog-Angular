<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogToTag extends Model
{
    public function tag(){
        return $this->belongsTo(Tag::class, 'tag_id');
    }
}
