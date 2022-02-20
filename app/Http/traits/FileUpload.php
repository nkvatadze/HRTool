<?php

namespace App\Http\traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait FileUpload
{
    public function uploadFile(UploadedFile $file, string $path, $public = 'public'): string
    {
        return Storage::disk($public)->putFile($path, $file);
    }
}