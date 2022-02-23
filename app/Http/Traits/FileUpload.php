<?php

namespace App\Http\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait FileUpload
{
    public function uploadFile(?UploadedFile $file, string $path, string $disk = 'public'): ?string
    {
        if (!$file) return null;

        return Storage::disk($disk)->putFile($path, $file);
    }
}
