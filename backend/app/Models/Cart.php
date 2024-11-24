<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'cart';

    public $incrementing = false;
    protected $primaryKey = null;
    protected $fillable = ['account_id', 'product_id', 'quantity'];
    public $timestamps = false;

    public function setKeysForSaveQuery($query)
    {
        $query
            ->where('account_id', $this->getAttribute('account_id'))
            ->where('product_id', $this->getAttribute('product_id'));

        return $query;
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
