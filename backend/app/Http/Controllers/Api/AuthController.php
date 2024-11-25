<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMail;
use App\Mail\SendEmailCodeResetPassword;
use App\Mail\VerifyEmail;
use App\Models\Account;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected $account;

    public function __construct(Account $account)
    {
        $this->account = $account;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|max:255',
            'email' => 'required|email|max:255|unique:account',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 404);
        }

        $verificationCode = Str::random(6);
        $expirationTime = Carbon::now()->addMinutes(3);
        $account = Account::create([
            'full_name' => $request->fullName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verify_code' => $verificationCode,
            'expiration_time' => $expirationTime
        ]);

        Mail::to($account->email)->send(new VerifyEmail($account, $verificationCode));

        $token = JWTAuth::fromUser($account);

        $cookie = cookie(
            'access_token',        // Tên cookie
            $token,                // Giá trị JWT
            60,                    // Thời hạn (phút)
            '/',                   // Đường dẫn (root của domain)
            null,                  // Domain (mặc định: null)
            false,                  // Secure (chỉ gửi qua HTTPS)
            true,                  // HttpOnly (chỉ truy cập qua HTTP, không thể đọc qua JavaScript)
            false,                 // SameSite (false: không bật, "strict", hoặc "lax")
            'Strict'               // SameSite policy
        );

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully. Please check your email for verification.',
            'account' => $account,
        ], 201, [], JSON_UNESCAPED_UNICODE)->cookie($cookie);
    }

    public function registerWithGoogle(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
            $driver = Socialite::driver('google');

            // Sử dụng thư viện Google để xác minh token
            $googleAccount = $driver->stateless()->userFromToken($request->token_id);

            if (!$googleAccount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid Google token.',
                ], 401);
            }

            $email = $googleAccount->getEmail();
            $fullName = $googleAccount->getName();
            $avatar = $googleAccount->getAvatar();

            // Kiểm tra xem người dùng đã tồn tại chưa
            $account = Account::where('email', $email)->first();

            if ($account) {
                return response()->json([
                    'success' => 'false',
                    'message' => 'This account is already logged in using another method.',
                ], 400);
            }

            if (!$account) {
                $account = Account::create([
                    'full_name' => $fullName,
                    'email' => $email,
                    'password' => Hash::make(Str::random(16)), // Tạo mật khẩu ngẫu nhiên
                    'is_verified' => true, // Đánh dấu là đã xác thực
                    'image' => $avatar, // Lưu ảnh đại diện từ Google
                    'is_social_login' => true
                ]);
            }

            // Tạo JWT token
            $token = JWTAuth::fromUser($account);

            // Tạo cookie chứa access_token
            $cookie = cookie(
                'access_token',
                $token,
                60,          // Thời hạn (phút)
                '/',         // Đường dẫn
                null,        // Domain
                false,       // Secure
                true,        // HttpOnly
                false,       // SameSite
                'Strict'     // SameSite policy
            );

            return response()->json([
                'success' => true,
                'message' => 'Login with Google successful.',
                'account' => $account,
            ], 200, [], JSON_UNESCAPED_UNICODE)->cookie($cookie);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 'false',
                'message' => 'Failed to verify Google token.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $account = Account::where('email', $request->email)->first();

        if (!$account) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.'
            ], 404);
        }

        if (!Hash::check($request->password, $account->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.'
            ], 401);
        }

        if (!$account->is_verified) {
            // Tạo mã xác thực mới
            $verificationCode = Str::random(6);
            $expirationTime = Carbon::now()->addMinutes(3);

            $account->verify_code = $verificationCode;
            $account->expiration_time = $expirationTime;
            $account->save();

            // Gửi email xác thực
            Mail::to($account->email)->send(new VerifyEmail($account, $verificationCode));
        }

        // Tạo JWT token
        $token = JWTAuth::fromUser($account);

        // Tạo cookie chứa access_token
        $cookie = cookie(
            'access_token',
            $token,
            60,          // Thời hạn (phút)
            '/',         // Đường dẫn
            null,        // Domain
            false,       // Secure
            true,        // HttpOnly
            false,       // SameSite
            'Strict'     // SameSite policy
        );

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'account' => $account,
        ], 200, [], JSON_UNESCAPED_UNICODE)->cookie($cookie);
    }

    public function loginWithGoogle(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
            $driver = Socialite::driver('google');

            // Sử dụng thư viện Google để xác minh token
            $googleAccount = $driver->stateless()->userFromToken($request->token_id);

            if (!$googleAccount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid Google token.',
                ], 401);
            }


            $email = $googleAccount->getEmail();
            $fullName = $googleAccount->getName();
            $avatar = $googleAccount->getAvatar();

            // Kiểm tra xem người dùng đã tồn tại chưa
            $account = Account::where('email', $email)->first();

            if ($account && !$account->is_social_login) {
                return response()->json([
                    'message' => 'This account is already logged in using another form'
                ], 400);
            }

            if (!$account) {
                $account = Account::create([
                    'full_name' => $fullName,
                    'email' => $email,
                    'password' => Hash::make(Str::random(16)), // Tạo mật khẩu ngẫu nhiên
                    'is_verified' => true, // Đánh dấu là đã xác thực
                    'image' => $avatar, // Lưu ảnh đại diện từ Google
                    'is_social_login' => true
                ]);
            }

            // Tạo JWT token
            $token = JWTAuth::fromUser($account);

            // Tạo cookie chứa access_token
            $cookie = cookie(
                'access_token',
                $token,
                60,          // Thời hạn (phút)
                '/',         // Đường dẫn
                null,        // Domain
                false,       // Secure
                true,        // HttpOnly
                false,       // SameSite
                'Strict'     // SameSite policy
            );

            return response()->json([
                'success' => true,
                'message' => 'Login with Google successful.',
                'account' => $account,
            ], 200, [], JSON_UNESCAPED_UNICODE)->cookie($cookie);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 'false',
                'message' => 'Failed to verify Google token.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function emailVerify(Request $request)
    {
        // 1. Validate input
        $request->validate([
            'code' => 'required|string',
        ]);

        $token = $request->cookie('access_token');

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Access token is missing.',
            ], 401);
        }

        $payload = JWTAuth::setToken($token)->getPayload();
        $accountId = $payload->get('accountId');

        $account = Account::find($accountId);

        if (!$account) {
            return response()->json([
                'success' => false,
                'message' => 'Account not found.',
            ], 404);
        }

        if ($account->verify_code !== $request->code) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification code.',
            ], 400);
        }

        if (Carbon::now()->greaterThan($account->expiration_time)) {
            return response()->json([
                'success' => false,
                'message' => 'Verification code has expired.',
            ], 400);
        }

        $account->update([
            'is_verified' => 1,
            'verify_code' => null,
            'expiration_time' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully.',
            'account' => $account
        ]);
    }

    public function emailForgotVerifyCode(Request $request)
    {
        // 1. Validate input
        $request->validate([
            'code' => 'required|string',
        ]);

        $email = $request->email;

        $account = Account::where('email', $email)->first();

        if (!$account) {
            return response()->json([
                'success' => false,
                'message' => 'Account not found.',
            ], 404);
        }

        if ($account->verify_code !== $request->code) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification code.',
            ], 400);
        }

        if (Carbon::now()->greaterThan($account->expiration_time)) {
            return response()->json([
                'success' => false,
                'message' => 'Verification code has expired.',
            ], 400);
        }

        $account->update([
            'is_verified' => 1,
            'verify_code' => null,
            'expiration_time' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Verify code forgot password success',
            'account' => $account
        ]);
    }

    public function getAccount(Request $request)
    {
        // Lấy token từ cookie
        $token = $request->cookie('access_token');

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Access token is missing.',
            ], 401);
        }

        try {
            // Giải mã token để lấy thông tin account ID
            $payload = JWTAuth::setToken($token)->getPayload();
            $accountId = $payload->get('accountId');

            // Lấy thông tin người dùng từ cơ sở dữ liệu
            $account = Account::find($accountId);

            if (!$account) {
                return response()->json([
                    'success' => false,
                    'message' => 'Account not found.',
                ], 404);
            }

            // Trả về thông tin tài khoản
            return response()->json([
                'success' => true,
                'account' => $account,
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token has expired.',
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token is invalid.',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred.',
            ], 500);
        }
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 404);
        }

        $token = Str::random(60);

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'access_token' => $token,
            'created_at' => now(),
        ]);

        Mail::to($request->email)->send(new ResetPasswordMail($token));

        return response()->json([
            'message' => 'We have emailed your password reset link!',
        ], 200);
    }

    public function sendEmailForgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:account,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 404);
        }

        $email = $request->email;

        $verifyCode = Str::random(6);
        $expirationTime = Carbon::now()->addMinutes(3);

        // Sử dụng Eloquent Model
        $account = Account::where('email', $email)->first();

        if ($account->is_social_login) {
            return response()->json([
                'success' => false,
                'message' => 'Account does not support password reset as it uses social login.',
            ], 400);
        }

        if ($account) {
            $account->update([
                'verify_code' => $verifyCode,
                'expiration_time' => $expirationTime,
            ]);
        }

        try {
            Mail::to($email)->send(new SendEmailCodeResetPassword($account, $verifyCode));
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send email. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'A verification code has been sent to your email. Please check your inbox.',
            'email' => $account->email,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'newPassword' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 404);
        }

        $user = Account::where('email', $request->email)->first();
        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'Password has been reset successfully.',
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $user = Account::where('email', $request->email)->first();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect.',
            ], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password changed successfully.',
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->cookie('access_token');

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Access token is missing.',
            ], 401);
        }

        try {
            // Invalidate token để đảm bảo không thể sử dụng lại
            JWTAuth::setToken($token)->invalidate();

            // Xóa cookie chứa token
            return response()->json([
                'success' => true,
                'message' => 'Logout successful.',
            ])->withCookie(cookie()->forget('access_token'));
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token is invalid.',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred during logout.',
            ], 500);
        }
    }
}
