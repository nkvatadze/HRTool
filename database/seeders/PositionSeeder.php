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
            'Node.js Developer',
            'React.js Developer',
            'Vue.js developer',
            'Human Resources',
            'Administrative Assistant',
            'Executive Assistant',
            'Marketing Manager',
            'Customer Service Representative',
            'Nurse Practitioner',
            'Software Engineer',
            'Sales Manager',
            'Data Entry Clerk',
        ];

        $insertData = [];

        foreach ($positions as $position) {
            $insertData [] = [
                'name' => $position
            ];
        }

        Position::insert($insertData);

        Cache::forever('candidate-position', Position::all());
    }
}
