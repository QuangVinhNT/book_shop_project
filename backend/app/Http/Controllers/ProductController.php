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
    public function index()
    {
        $products = Product::all();
        return response()->json([
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
        $product = Product::findOrFail($id);

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
    public function edit(Product $product)
    {
        //
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
        $images = Image::where('product_id', $id)->get();

        if (!$images) {
            return response()->json([
                'message' => 'No images found for this product',
            ], 404);
        }

        foreach ($images as $image) {
            $url = $image->image_name;
            $filename = basename($url);
            $filenameWithoutExtension = pathinfo($filename, PATHINFO_FILENAME);
            Cloudinary::destroy('book_shop_laravel/' . $filenameWithoutExtension);
        }

        Image::where('product_id', $id)->delete();

        Product::findOrFail($id)->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
