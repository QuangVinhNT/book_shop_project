<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }

    public function index(Request $request, $receiverId)
    {
        $messages = Message::where(function ($query) use ($request, $receiverId) {
            $query->where('sender_id', $request->user()->id)
                ->where('receiver_id', $receiverId);
        })->orWhere(function ($query) use ($request, $receiverId) {
            $query->where('sender_id', $receiverId)
                ->where('receiver_id', $request->user()->id);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }
}
