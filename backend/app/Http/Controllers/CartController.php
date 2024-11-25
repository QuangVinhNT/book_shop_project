<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function index($accountId)
    {
        $cartItems = Cart::where('account_id', $accountId)->with('product.image')->get();

        if (!$cartItems) {
            return response()->json([
                'success' => false,
                'message' => 'Cart is empty',
            ], 404);
        }

        return response()->json($cartItems, 200);
    }

    public function addToCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|exists:account,id',
            'product_id' => 'required|exists:product,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $cartItem = Cart::where('account_id', $validated['account_id'])
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cartItem) {
            $cartItem->quantity += 1;
            $cartItem->save();
        } else {
            $cartItem = Cart::create([
                'account_id' => $validated['account_id'],
                'product_id' => $validated['product_id'],
                'quantity' => 1,
            ]);
        }

        return response()->json($cartItem, 201);
    }

    public function decreaseQuantity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|exists:cart,account_id',
            'product_id' => 'required|exists:cart,product_id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $cartItem = Cart::where('account_id', $validated['account_id'])
            ->where('product_id', $validated['product_id'])
            ->first();

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item not found',
            ], 404);
        }

        $cartItem->quantity -= 1;

        if ($cartItem->quantity <= 0) {
            Cart::where('account_id', $validated['account_id'])
                ->where('product_id', $validated['product_id'])
                ->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product removed from cart',
            ], 200);
        }

        $cartItem->save();

        return response()->json([
            'success' => true,
            'message' => 'Product quantity decreased',
            'data' => $cartItem,
        ], 200);
    }

    public function removeItem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:cart,product_id',
            'account_id' => 'required|exists:cart,account_id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validate();

        $cartItem = Cart::where('product_id', $validated['product_id'])
            ->where('account_id', $validated['account_id']);
        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart'], 200);
    }

    public function clearCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|exists:cart,account_id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validate();

        Cart::where('account_id', $validated['account_id'])->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared successfully',
        ], 200);
    }

    public function calculateTotal($accountId)
    {
        $cartItems = Cart::where('account_id', $accountId)->with('product')->get();

        if (!$cartItems) {
            return response()->json([
                'success' => false,
                'message' => 'Cart is empty',
            ], 404);
        }

        $totalQuantity = $cartItems->sum('quantity');
        $totalPrice = $cartItems->sum(function ($cartItem) {
            return $cartItem->product->price * $cartItem->quantity;
        });

        return response()->json([
            'success' => true,
            'data' => [
                'total_quantity' => $totalQuantity,
                'total_price' => $totalPrice,
            ],
        ], 200);
    }
}
