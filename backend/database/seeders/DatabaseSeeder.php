<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        DB::table('category')->insert([
            ['name' => 'Science Fiction', 'description' => 'Books about futuristic science and technology.'],
            ['name' => 'Romance', 'description' => 'Books that focus on romantic relationships.'],
            ['name' => 'Mystery', 'description' => 'Books about solving crimes or uncovering secrets.'],
            ['name' => 'Fantasy', 'description' => 'Books with magical or supernatural elements.'],
            ['name' => 'Biography', 'description' => 'Books about the life of a person.']
        ]);
    }
}
