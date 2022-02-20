<?php

namespace Database\Seeders;

use App\Models\{Position, Skill, Status};
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (!Status::count()) {
            $this->call(StatusSeeder::class);
        }

        if (!Position::count()) {
            $this->call(PositionSeeder::class);
        }

        if (!Skill::count()) {
            $this->call(SkillSeeder::class);
        }
    }
}
