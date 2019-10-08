<?php

namespace Modules\Log\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use DB;
class LogDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();


        DB::table('log_types')->insert([
            'id'=>1,
            'name' => 'LOGGED IN'
        ]);


        // $this->call("OthersTableSeeder");
    }
}
