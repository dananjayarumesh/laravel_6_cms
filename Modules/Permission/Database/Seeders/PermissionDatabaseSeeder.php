<?php

namespace Modules\Permission\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use DB;
class PermissionDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $items = array('user.delete',
            'user.edit',
            'user.create',
            'permission.list',
            'user.list',
            'role.list',
            'role.create',
            'role.delete',
            'role.edit',
            'log.activity.list',
            'permission.user.list',
            'permission.user.create',
            'permission.user.delete',
            'permission.user.edit',
            'permission.role.create',
            'permission.role.list',
            'permission.role.edit',
            'permission.role.delete');


        foreach ($items as $key => $item) {
            DB::table('permissions')->insert([
                'name' => $item,
                'guard_name' => 'web'
            ]);
        }

        // $this->call("OthersTableSeeder");
    }
}

