<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
  /**
   * Get all orders by account_id.
   *
   * @param int $accountId
   * @return \Illuminate\Http\JsonResponse
   */
  public function getAllOrdersByAccount($accountId)
  {
    // Lấy tất cả order dựa trên account_id
    $orders = Order::where('account_id', $accountId)
      ->with(['details.product.image', 'account'])
      ->get();

    return response()->json([
      'success' => true,
      'data' => $orders,
    ]);
  }

  public function getAllOrders()
  {
    $orders = Order::with(['details.product', 'account'])->get();

    return response()->json([
      'success' => true,
      'data' => $orders,
    ]);
  }
}
