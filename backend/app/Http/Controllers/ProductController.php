<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Image;
use App\Models\Product;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    protected $image;

    public function __construct(Image $image)
    {
        $this->image = $image;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $products = Product::with(['category:id,name', 'image:id,product_id,image_name'])->paginate($perPage);

        return response()->json([
            'message' => 'Products fetched successfully',
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_info.name' => 'required|string|max:255',
            'product_info.category_id' => 'required|exists:category,id',
            'product_info.price' => 'required|numeric|min:0',
            'product_info.description' => 'nullable|string',
            'product_info.quantity' => 'required|integer|min:0',
            'product_info.reduced_price' => 'nullable|numeric|min:0',
            'product_info.author' => 'nullable|string|max:255',
            'product_info.language' => 'nullable|string|max:255',
            'product_info.format' => 'nullable|string|max:255',
            'product_info.date_published' => 'nullable|date',
            'product_info.publisher' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422); // HTTP status code 422: Unprocessable Entity
        }

        $productInfo = $request->input('product_info');

        // Tạo sản phẩm
        $product = Product::create([
            'name' => $productInfo['name'],
            'description' => $productInfo['description'],
            'author' => $productInfo['author'],
            'language' => $productInfo['language'],
            'date_published' => $productInfo['date_published'],
            'publisher' => $productInfo['publisher'],
            'format' => $productInfo['format'],
            'category_id' => $productInfo['category_id'],
            'price' => $productInfo['price'],
            'quantity' => $productInfo['quantity'],
            'reduced_price' => $productInfo['reduced_price'],
        ]);

        if (!$product) {
            return response()->json([
                'message' => 'Failed to create product',
            ], 500);
        }

        $images = $request->input('images', []); // Lấy danh sách ảnh từ request
        foreach ($images as $image) {
            // Cập nhật product_id cho từng ảnh
            Image::where('id', $image['id'])->update([
                'product_id' => $product->id,
            ]);
        }

        // Trả về thông tin sản phẩm và danh sách ảnh đã liên kết
        return response()->json([
            'message' => 'Product created and images linked successfully',
            'product' => $product,
            'linked_images' => Image::where('product_id', $product->id)->get(), // Danh sách ảnh liên kết
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function getProductById($id)
    {
        $product = Product::with('image')->find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Product found successfully',
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        try {
            // Validate the request data
            $validator = Validator::make($request->all(), [
                'productUpdated.author' => 'required|string|min:3',
                'productUpdated.category_id' => 'required|integer|exists:category,id',
                'productUpdated.date_published' => 'required|date',
                'productUpdated.description' => 'required|string',
                'productUpdated.format' => 'required|string',
                'productUpdated.language' => 'required|string',
                'productUpdated.name' => 'required|string|min:3',
                'productUpdated.price' => 'required|numeric|min:0',
                'productUpdated.publisher' => 'required|string|min:3',
                'productUpdated.quantity' => 'required|integer|min:1',
                'productUpdated.reduced_price' => 'nullable|numeric|min:0',
                'deleteImageIds' => 'array',
                'deleteImageIds.*' => 'integer|exists:image,id',
            ]);

            // Check if validation fails
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation Error',
                    'errors' => $validator->errors(),
                ], 400); // HTTP status code 422: Unprocessable Entity
            }

            // Fetch the validated data
            $validatedData = $validator->validated();

            // Fetch the product to update
            $product = Product::findOrFail($id);

            // Update product details
            $product->update($validatedData['productUpdated']);

            // Handle image deletions if provided
            if (!empty($validatedData['deleteImageIds'])) {
                // Fetch the images to delete
                $imagesToDelete = Image::whereIn('id', $validatedData['deleteImageIds'])->get();

                foreach ($imagesToDelete as $image) {

                    $url = $image->url; // Assume the URL is stored in the `url` field
                    $publicId = $image->public_id;

                    if ($publicId) {
                        // Delete the image from Cloudinary
                        Cloudinary::destroy($publicId);
                    }

                    // Delete the image record from the database
                    $image->delete();
                }
            }

            $product->load('image');

            return response()->json([
                'message' => 'Product updated successfully.',
                'product' => $product,
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
            'reduced_price' => 'nullable|numeric|min:0',
            'author' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
            'format' => 'nullable|string|max:255',
            'date_published' => 'nullable|date',
            'publisher' => 'nullable|string|max:255',
        ]);

        $product->update($validated);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // Fetch the product
            $product = Product::with('image')->findOrFail($id); // Ensure `images` relation is loaded

            // Loop through associated images and delete from Cloudinary and database
            foreach ($product->image as $image) {
                // Delete the image from Cloudinary
                Cloudinary::destroy($image->public_id);

                // Delete the image record from the database
                $image->delete();
            }

            // Delete the product itself
            $product->delete();

            return response()->json(['message' => 'Product and associated images deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete product.'], 500);
        }
    }
}
