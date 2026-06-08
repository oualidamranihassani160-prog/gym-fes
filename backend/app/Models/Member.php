<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\MembershipType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'cin', 'full_name', 'phone_number', 'membership_id',
        'start_date', 'end_date', 'image_path', 'admin_id'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function membership()
    {
        return $this->belongsTo(MembershipType::class);
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}