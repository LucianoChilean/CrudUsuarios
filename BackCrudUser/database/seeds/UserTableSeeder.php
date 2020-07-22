<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\User;


class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        user::truncate();
        $password = Hash::make('123');
        $faker = \Faker\Factory::create();
        $now = \Carbon\Carbon::now();

        for($i = 1; $i < 50; $i++){
            user::create([
                'rut' => $faker->randomNumber,
                'nombre' => $faker->name,
                'apellido' => $faker->lastname,
                'email' => Str::random(10).'@gmail.com',
                'fecha_nacimiento' => Carbon::createFromDate(2000,01,01)->toDateTimeString(),
                'password' => $password, 
                'updated_at' => $now,
                'created_at' => $now,
                
            ]);
        }         

    }
}
