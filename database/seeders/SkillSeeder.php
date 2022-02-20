<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $skills = [
            'Laravel',
            'PHP',
            'Node.js',
            'Vue.js',
            'React',
            'MySQL',
            'Javascript',
            'Python',
            'Django',
            'CSS',
            'HTML',
        ];

        $insertData = [];

        foreach ($skills as $skill) {
            $insertData [] = [
                'name' => $skill
            ];
        }

        Skill::insert($insertData);

        Cache::forever('skills', Skill::all());
    }
}
