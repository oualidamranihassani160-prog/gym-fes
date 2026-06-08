<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MembershipTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('membership_types')->insert([
            ['name' => 'Month', 'duration_months' => 1, 'price' => 120.00],
            ['name' => '3 Months', 'duration_months' => 3, 'price' => 300.00],
            ['name' => '6 Months', 'duration_months' => 6, 'price' => 500.00],
            ['name' => 'Year', 'duration_months' => 12, 'price' => 800.00],
        ]);
    }
}