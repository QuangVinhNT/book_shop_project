<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'category_id',
        'price',
        'description',
        'quantity',
        'reduced_price',
        'author',
        'language',
        'format',
        'date_published',
        'publisher'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function image()
    {
        return $this->hasMany(Image::class);
    }
}
