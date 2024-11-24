<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Cloudinary\Api\Upload\UploadApi;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Validation\ValidationException;

class ImageController extends Controller
{
    public function uploadImages(Request $request)
    {

        if (!$request->hasFile('images')) {
            return response()->json(['error' => 'No files uploaded'], 400);
        }

        try {
            $validatedData = $request->validate([
                'images' => 'required|array',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Invalid data provided',
                'details' => $e->errors(), // Trả về chi tiết lỗi
            ], 422);
        }
        $savedImages = [];

        foreach ($request->file('images') as $image) {
            $result = Cloudinary::upload($image->getRealPath(), [
                'folder' => 'book_shop_laravel',
            ]);

            $uploadedFileUrl = $result->getSecurePath();

            $savedImage = Image::create([
                'image_name' => $uploadedFileUrl,
                'public_id' => $result->getPublicId()
            ]);

            $savedImages[] = $savedImage;
        }

        return response()->json(['images' => $savedImages], 200);
    }

    public function uploadImagesWithProductId(Request $request)
    {
        if (!$request->hasFile('images')) {
            return response()->json(['error' => 'No files uploaded'], 400);
        }

        try {
            $validatedData = $request->validate([
                'product_id' => 'required|integer|exists:product,id',
                'images' => 'required|array',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $savedImages = [];

            foreach ($request->file('images') as $image) {
                $result = Cloudinary::upload($image->getRealPath(), [
                    'folder' => 'book_shop_laravel',
                ]);

                $uploadedFileUrl = $result->getSecurePath();

                $savedImage = Image::create([
                    'product_id' => $validatedData['product_id'],
                    'image_name' => $uploadedFileUrl,
                    'public_id' => $result->getPublicId(),
                ]);

                $savedImages[] = $savedImage;
            }

            $product = Product::with('image')->findOrFail($validatedData['product_id']);

            return response()->json([
                'message' => 'Images uploaded successfully.',
                'product' => $product,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Invalid data provided',
                'details' => $e->errors(), // Trả về chi tiết lỗi
            ], 422);
        }
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
