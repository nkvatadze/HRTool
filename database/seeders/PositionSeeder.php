<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positions = [
            'Laravel Developer',
            'PHP developer',
            'Node.js Developer',
            'React.js Developer',
            'Vue.js developer',
            'Human Resources',
            'Software Engineer',
            'Python Developer',
        ];

        $insertData = [];

        foreach ($positions as $position) {
            $insertData [] = [
                'name' => $position
            ];
        }

        Position::insert($insertData);

        Cache::forever('positions', Position::all());
    }
}
