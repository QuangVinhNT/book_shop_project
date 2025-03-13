<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'message';

    protected $fillable = [
        'message',
        'sender_id',
        'receiver_id',
        'sent_at',
        'type',
    ];

    public $timestamps = false; // Vì bạn không sử dụng cột `created_at` và `updated_at`
}
