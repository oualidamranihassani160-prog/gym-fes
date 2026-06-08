<?php

namespace App\Http\Controllers;

use App\Models\MembershipType;

class MembershipController extends Controller
{
    public function index()
    {
        return response()->json(MembershipType::all());
    }
}