<?php

namespace Database\Seeders;

use Database\Seeders\AdminSeeder;
use Database\Seeders\MembershipTypeSeeder;
use Database\Seeders\TestDataSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            MembershipTypeSeeder::class,
            TestDataSeeder::class,
        ]);
    }
}