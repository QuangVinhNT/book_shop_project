<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Cloudinary\Api\Upload\UploadApi;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ImageController extends Controller
{
    public function uploadImages(Request $request)
    {

        if (!$request->hasFile('images')) {
            return response()->json(['error' => 'No files uploaded'], 400);
        }

        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        $savedImages = [];

        foreach ($request->file('images') as $image) {
            $result = Cloudinary::upload($image->getRealPath(), [
                'folder' => 'book_shop_laravel', 
            ]);

            $uploadedFileUrl = $result->getSecurePath();

            $savedImage = Image::create([
                'image_name' => $uploadedFileUrl,
            ]);

            $savedImages[] = $savedImage; 
        }

        return response()->json(['images' => $savedImages], 200); 
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Upload ảnh lên Cloudinary
        $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath(), [
            'folder' => 'your-folder',
        ])->getSecurePath();

        $image = Image::create([
            'image_name' => $uploadedFileUrl,
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message' => 'Image uploaded successfully!',
            'url' => $uploadedFileUrl,
            'image' => $image
        ]);
    }
}
