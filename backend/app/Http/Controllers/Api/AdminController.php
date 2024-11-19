<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function getAllUser() {

        // if (auth()->user()->role !== 'admin') {
        // return response()->json([
        //     'success' => false,
        //     'message' => 'Unauthorized'
        //     ], 403);
        // }

        $users = User::select('id', 'name', 'email', 'created_at')->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ], 200);
    }

    public function addUser(Request $request) {
        // if (auth()->user()->role!== 'admin') {
        // return response()->json([
        //     'success' => false,
        //     'message' => 'Unauthorized'
        //     ], 403);
        // }

        $request->validate([
            'name' =>'required|string',
            'email' =>'required|email|unique:users',
            'password' =>'required|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), 
        ]);

        return response()->json([
           'success' => true,
           'message' => 'User added successfully',
           'data' => $user
        ], 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }

        $user->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully!',
            'data' => $user,
        ], 200);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully!',
        ], 200);
    }
}
