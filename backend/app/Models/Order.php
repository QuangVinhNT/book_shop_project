<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'order';

    protected $fillable = [
        'account_id',
        'time',
        'order_status',
        'payment_status',
        'receiver_name',
        'email',
        'phone_number',
        'address',
        'note',
        'payment_method',
        'discount_code_id'
    ];

    public function details()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
