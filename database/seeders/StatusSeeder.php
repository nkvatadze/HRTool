<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            'Initial',
            'First Contact',
            'Interview',
            'Tech Assignment',
            'Rejected',
            'Hired'
        ];

        $insertData = [];

        foreach ($statuses as $status) {
            $insertData[] = [
                'name' => $status
            ];
        }

        Status::insert($insertData);

        Cache::forever('candidate-statuses', Status::all());
    }
}
