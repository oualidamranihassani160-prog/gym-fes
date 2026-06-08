<?php

namespace App\Models;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'quantity', 'price', 'image_path', 'admin_id'];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function getIsAvailableAttribute()
    {
        if ($this->quantity > 5) return 'available';
        if ($this->quantity > 0) return 'low_stock';
        return 'out_of_stock';
    }
}