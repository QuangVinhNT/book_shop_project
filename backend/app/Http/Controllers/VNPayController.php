<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;

class VnPayController extends Controller
{
  public function createOrder(Request $request)
  {
    try {
      // Validate dữ liệu từ frontend
      $validated = $request->validate([
        'account_id' => 'required|integer',
        'order_status' => 'required|string',
        'payment_status' => 'required|string',
        'receiver_name' => 'required|string|max:255',
        'phone_number' => 'required|string|max:13',
        'address' => 'required|string',
        'note' => 'nullable|string',
        'payment_method' => 'required|string',
        'discount_code_id' => 'nullable|integer',
        'details' => 'required|array'
      ]);

      // // Lưu đơn hàng
      $order = Order::create([
        'account_id' => $validated['account_id'],
        'time' => now(),
        'order_status' => $validated['order_status'],
        'payment_status' => $validated['payment_status'],
        'receiver_name' => $validated['receiver_name'],
        'phone_number' => $validated['phone_number'],
        'address' => $validated['address'],
        'note' => $validated['note'],
        'payment_method' => $validated['payment_method']
      ]);

      // Lưu chi tiết đơn hàng
      foreach ($validated['details'] as $detail) {
        OrderDetail::create([
          'order_id' => $order->id,
          'product_id' => $detail['productId'],
          'quantity' => $detail['quantity'],
        ]);
      }

      error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
      date_default_timezone_set('Asia/Ho_Chi_Minh');

      $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      $vnp_Returnurl = "http://localhost:3000/vnpay-return";
      $vnp_TmnCode = "DL1KKR66"; //Mã website tại VNPAY 
      $vnp_HashSecret = "H3ZG3PQET8JAKDHBEDY8VKXIBMHU7NS6"; //Chuỗi bí mật

      $vnp_TxnRef = $order->id;
      $vnp_OrderInfo = "Thanh toán hóa đơn";
      $vnp_OrderType = "Book shop";
      $vnp_Amount = $request->totalAmount * 24000 * 100;
      $vnp_Locale = "VN";
      // $vnp_BankCode = "NCB";
      $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

      $inputData = array(
        "vnp_Version" => "2.1.0",
        "vnp_TmnCode" => $vnp_TmnCode,
        "vnp_Amount" => $vnp_Amount,
        "vnp_Command" => "pay",
        "vnp_CreateDate" => date('YmdHis'),
        "vnp_CurrCode" => "VND",
        "vnp_IpAddr" => $vnp_IpAddr,
        "vnp_Locale" => $vnp_Locale,
        "vnp_OrderInfo" => $vnp_OrderInfo,
        "vnp_OrderType" => $vnp_OrderType,
        "vnp_ReturnUrl" => $vnp_Returnurl,
        "vnp_TxnRef" => $vnp_TxnRef,

      );

      if (isset($vnp_BankCode) && $vnp_BankCode != "") {
        $inputData['vnp_BankCode'] = $vnp_BankCode;
      }
      if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
        $inputData['vnp_Bill_State'] = $vnp_Bill_State;
      }

      ksort($inputData);
      $query = "";
      $i = 0;
      $hashdata = "";
      foreach ($inputData as $key => $value) {
        if ($i == 1) {
          $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
        } else {
          $hashdata .= urlencode($key) . "=" . urlencode($value);
          $i = 1;
        }
        $query .= urlencode($key) . "=" . urlencode($value) . '&';
      }

      $vnp_Url = $vnp_Url . "?" . $query;
      if (isset($vnp_HashSecret)) {
        $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
        $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
      }
      return response()->json(['payment_url' => $vnp_Url]);
    } catch (\Illuminate\Validation\ValidationException $e) {
      // Trả về lỗi dạng JSON với mã lỗi 422
      return response()->json([
        'message' => 'Dữ liệu không hợp lệ',
        'errors' => $e->errors()
      ], 422);
    } catch (\Exception $e) {
      // Xử lý các lỗi khác
      return response()->json([
        'message' => 'Có lỗi xảy ra trong quá trình xử lý',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  public function paymentReturn(Request $request)
  {
    try {
      // Lấy chuỗi bí mật từ config
      $vnp_HashSecret = "H3ZG3PQET8JAKDHBEDY8VKXIBMHU7NS6";

      // Lấy tất cả tham số từ request
      $inputData = $request->all();

      // Kiểm tra tham số vnp_SecureHash
      if (!isset($inputData['vnp_SecureHash'])) {
        return response()->json(['message' => 'Thiếu tham số vnp_SecureHash'], 400);
      }

      // Lấy và loại bỏ vnp_SecureHash khỏi dữ liệu đầu vào
      $vnp_SecureHash = $inputData['vnp_SecureHash'];
      unset($inputData['vnp_SecureHash'], $inputData['vnp_SecureHashType']);

      // Sắp xếp các tham số theo thứ tự alphabet
      ksort($inputData);

      // Tạo chuỗi hash data
      $hashData = urldecode(http_build_query($inputData));

      // Tạo hash để kiểm tra tính hợp lệ
      $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

      // So sánh hash
      // if ($secureHash !== $vnp_SecureHash) {
      //   return response()->json(['message' => 'Chữ ký không hợp lệ'], 400);
      // }

      // Kiểm tra mã phản hồi từ VNPAY
      if (isset($inputData['vnp_ResponseCode']) && $inputData['vnp_ResponseCode'] == '00') {
        // Lấy mã đơn hàng từ tham số vnp_TxnRef
        $orderId = $inputData['vnp_TxnRef'];

        // Tìm đơn hàng trong database
        $order = Order::find($orderId);

        if ($order) {
          // Cập nhật trạng thái đơn hàng và trạng thái thanh toán
          $accountId = $order->account_id; // Lấy account_id từ đơn hàng
          
          Cart::where('account_id', $accountId)->delete();

          $order->update([
            'order_status' => 'COMPLETED', // Hoặc trạng thái tùy chỉnh
            'payment_status' => 'PAID',
          ]);

          // Trả về phản hồi thành công
          return response()->json(['message' => 'Thanh toán thành công', 'data' => $inputData], 200);
        } else {
          // Nếu không tìm thấy đơn hàng
          return response()->json(['message' => 'Không tìm thấy đơn hàng', 'data' => $inputData], 404);
        }
        return response()->json(['message' => 'Thanh toán thành công', 'data' => $inputData], 200);
      } else {
        // Thanh toán thất bại
        return response()->json(['message' => 'Thanh toán thất bại', 'data' => $inputData], 400);
      }
    } catch (\Exception $e) {
      // Xử lý lỗi không mong muốn
      return response()->json([
        'message' => 'Có lỗi xảy ra trong quá trình xử lý',
        'error' => $e->getMessage()
      ], 500);
    }
  }
}
