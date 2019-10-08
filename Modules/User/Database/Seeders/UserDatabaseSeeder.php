<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use DB;
class UserDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call("OthersTableSeeder");

        DB::table('admins')->insert([
            'id' => 1,
            'name' => 'Super Admin',
            'email' => 'admin@sense.com',
            'password'=> '$2y$10$L1oeNPCkpDKYZNOt.9lZ.eIgApbjWFpbqFHy4DCyX8usR5y2C315W',
            'active'=>1
        ]);
    }
}
