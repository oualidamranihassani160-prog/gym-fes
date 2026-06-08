<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        // Get admin ID
        $adminId = DB::table('admins')->first()->id;
        
        // Get membership types
        $memberships = DB::table('membership_types')->get();
        
        // ========== MEMBERS DATA ==========
        $members = [
            // Active members (more than 7 days left)
            [
                'cin' => 'AB123456',
                'full_name' => 'Ahmed Benali',
                'phone_number' => '0612345678',
                'membership_id' => $memberships->where('name', 'Year')->first()->id,
                'start_date' => Carbon::now()->subMonths(2),
                'end_date' => Carbon::now()->addMonths(10),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'CD789012',
                'full_name' => 'Fatima Zahra',
                'phone_number' => '0623456789',
                'membership_id' => $memberships->where('name', '6 Months')->first()->id,
                'start_date' => Carbon::now()->subMonth(),
                'end_date' => Carbon::now()->addMonths(5),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'EF345678',
                'full_name' => 'Youssef Mansouri',
                'phone_number' => '0634567890',
                'membership_id' => $memberships->where('name', '3 Months')->first()->id,
                'start_date' => Carbon::now()->subWeeks(2),
                'end_date' => Carbon::now()->addWeeks(10),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'GH901234',
                'full_name' => 'Sofia El Fassi',
                'phone_number' => '0645678901',
                'membership_id' => $memberships->where('name', 'Month')->first()->id,
                'start_date' => Carbon::now()->subDays(5),
                'end_date' => Carbon::now()->addDays(25),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Expiring soon members (0-7 days left)
            [
                'cin' => 'IJ567890',
                'full_name' => 'Karim Idrissi',
                'phone_number' => '0656789012',
                'membership_id' => $memberships->where('name', 'Month')->first()->id,
                'start_date' => Carbon::now()->subDays(25),
                'end_date' => Carbon::now()->addDays(5),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'KL123456',
                'full_name' => 'Nadia Berrada',
                'phone_number' => '0667890123',
                'membership_id' => $memberships->where('name', '3 Months')->first()->id,
                'start_date' => Carbon::now()->subMonths(2)->subDays(20),
                'end_date' => Carbon::now()->addDays(3),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'MN789012',
                'full_name' => 'Hassan Amrani',
                'phone_number' => '0678901234',
                'membership_id' => $memberships->where('name', 'Month')->first()->id,
                'start_date' => Carbon::now()->subDays(28),
                'end_date' => Carbon::now()->addDays(2),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'OP345678',
                'full_name' => 'Leila Tazi',
                'phone_number' => '0689012345',
                'membership_id' => $memberships->where('name', 'Year')->first()->id,
                'start_date' => Carbon::now()->subMonths(11)->subDays(20),
                'end_date' => Carbon::now()->addDays(7),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Expired members
            [
                'cin' => 'QR901234',
                'full_name' => 'Rachid El Alami',
                'phone_number' => '0690123456',
                'membership_id' => $memberships->where('name', 'Month')->first()->id,
                'start_date' => Carbon::now()->subMonths(2),
                'end_date' => Carbon::now()->subDays(5),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'ST567890',
                'full_name' => 'Samira Benjelloun',
                'phone_number' => '0612345670',
                'membership_id' => $memberships->where('name', '3 Months')->first()->id,
                'start_date' => Carbon::now()->subMonths(4),
                'end_date' => Carbon::now()->subDays(15),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'UV123456',
                'full_name' => 'Mourad Chaoui',
                'phone_number' => '0623456780',
                'membership_id' => $memberships->where('name', '6 Months')->first()->id,
                'start_date' => Carbon::now()->subMonths(7),
                'end_date' => Carbon::now()->subDays(30),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'WX789012',
                'full_name' => 'Imane Serghini',
                'phone_number' => '0634567890',
                'membership_id' => $memberships->where('name', 'Year')->first()->id,
                'start_date' => Carbon::now()->subYears(1)->subDays(10),
                'end_date' => Carbon::now()->subDays(10),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Additional active members
            [
                'cin' => 'YZ345678',
                'full_name' => 'Omar Fassi',
                'phone_number' => '0645678901',
                'membership_id' => $memberships->where('name', '3 Months')->first()->id,
                'start_date' => Carbon::now()->subWeeks(3),
                'end_date' => Carbon::now()->addWeeks(9),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'AB901234',
                'full_name' => 'Hind El Ouafi',
                'phone_number' => '0656789012',
                'membership_id' => $memberships->where('name', '6 Months')->first()->id,
                'start_date' => Carbon::now()->subMonths(2),
                'end_date' => Carbon::now()->addMonths(4),
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        
        foreach ($members as $member) {
            DB::table('members')->insert($member);
        }
        
        // ========== ARCHIVED MEMBERS (Soft Deleted) ==========
        $archivedMembers = [
            [
                'cin' => 'CD567890',
                'full_name' => 'Abdelkader Benani',
                'phone_number' => '0667890123',
                'membership_id' => $memberships->where('name', 'Month')->first()->id,
                'start_date' => Carbon::now()->subMonths(3),
                'end_date' => Carbon::now()->subMonths(2),
                'image_path' => null,
                'admin_id' => $adminId,
                'deleted_at' => Carbon::now()->subDays(15),
                'created_at' => Carbon::now()->subMonths(3),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            [
                'cin' => 'EF901234',
                'full_name' => 'Latifa Bennani',
                'phone_number' => '0678901234',
                'membership_id' => $memberships->where('name', '3 Months')->first()->id,
                'start_date' => Carbon::now()->subMonths(6),
                'end_date' => Carbon::now()->subMonths(3),
                'image_path' => null,
                'admin_id' => $adminId,
                'deleted_at' => Carbon::now()->subDays(30),
                'created_at' => Carbon::now()->subMonths(6),
                'updated_at' => Carbon::now()->subDays(30),
            ],
            [
                'cin' => 'GH345678',
                'full_name' => 'Mohammed Sekkouri',
                'phone_number' => '0689012345',
                'membership_id' => $memberships->where('name', 'Year')->first()->id,
                'start_date' => Carbon::now()->subYears(1)->subMonths(2),
                'end_date' => Carbon::now()->subMonths(2),
                'image_path' => null,
                'admin_id' => $adminId,
                'deleted_at' => Carbon::now()->subDays(45),
                'created_at' => Carbon::now()->subYears(1),
                'updated_at' => Carbon::now()->subDays(45),
            ],
        ];
        
        foreach ($archivedMembers as $archivedMember) {
            DB::table('members')->insert($archivedMember);
        }
        
        // ========== PRODUCTS DATA ==========
        $products = [
            // Available products (quantity > 5)
            [
                'name' => 'Whey Protein Powder',
                'quantity' => 50,
                'price' => 450.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Creatine Monohydrate',
                'quantity' => 30,
                'price' => 250.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'BCAA Amino Acids',
                'quantity' => 25,
                'price' => 350.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gym Bag',
                'quantity' => 20,
                'price' => 299.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Water Bottle',
                'quantity' => 100,
                'price' => 49.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Resistance Bands Set',
                'quantity' => 40,
                'price' => 199.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Yoga Mat',
                'quantity' => 35,
                'price' => 179.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gym Gloves',
                'quantity' => 45,
                'price' => 89.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Low stock products (quantity <= 5)
            [
                'name' => 'Pre-Workout Supplement',
                'quantity' => 5,
                'price' => 399.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Weight Lifting Belt',
                'quantity' => 3,
                'price' => 349.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jump Rope',
                'quantity' => 4,
                'price' => 79.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Protein Bar (Box)',
                'quantity' => 5,
                'price' => 149.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Shaker Cup',
                'quantity' => 2,
                'price' => 39.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Out of stock products (quantity = 0)
            [
                'name' => 'Gym Hoodie',
                'quantity' => 0,
                'price' => 399.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Wrist Wraps',
                'quantity' => 0,
                'price' => 69.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Foam Roller',
                'quantity' => 0,
                'price' => 129.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gym Towel',
                'quantity' => 0,
                'price' => 49.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Arm Blaster',
                'quantity' => 0,
                'price' => 249.00,
                'image_path' => null,
                'admin_id' => $adminId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        
        foreach ($products as $product) {
            DB::table('products')->insert($product);
        }
    }
}