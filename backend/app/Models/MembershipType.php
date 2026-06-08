<?php

namespace App\Models;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'duration_months', 'price'];

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}