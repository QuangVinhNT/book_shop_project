<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    // Lấy danh sách tin nhắn giữa 2 người
    public function index(Request $request)
    {
        $messages = Message::where(function ($query) use ($request) {
            $query->where('sender_id', $request->sender_id)
                ->where('receiver_id', $request->receiver_id);
        })->orWhere(function ($query) use ($request) {
            $query->where('sender_id', $request->receiver_id)
                ->where('receiver_id', $request->sender_id);
        })->orderBy('sent_at', 'asc')->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $message = Message::create([
            'message' => $request->message,
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'sent_at' => now(),
            'type' => $request->type ?? 'text',
        ]);

        // Gửi sự kiện MessageSent
        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }
}
