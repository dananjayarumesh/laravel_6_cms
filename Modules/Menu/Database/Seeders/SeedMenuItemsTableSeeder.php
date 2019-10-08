<?php

namespace Modules\Menu\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use DB;
class SeedMenuItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $rows = [
            ['Dashboard',104,'/',NULL,1,1,NULL,0,1],
            ['Users',307,'user',NULL,1,5,'user.create,user.delete,user.edit,user.list',0,1],
            ['Role',307,'role',NULL,1,6,'role.create,role.delete,role.edit,role.list',0,1],
            ['Permissions',307,'permission',NULL,1,7,'permission.role.create,permission.role.delete,permission.role.edit,permission.role.list,permission.user.create,permission.user.delete,permission.user.edit,permission.user.list',0,1],
            ['Menu',307,'menu',NULL,1,8,NULL,1,1],
            ['Permissions',75,'permission',14,2,1,NULL,1,1],
            ['User Permissions',75,'user-permission',14,2,2,'permission.user.create,permission.user.delete,permission.user.edit,permission.user.list',0,1],
            ['Role Permissions',75,'role-permission',14,2,3,'permission.role.create,permission.role.delete,permission.role.edit,permission.role.list',0,1],
            ['Logs',104,'/log',NULL,1,9,'log.activity.list',0,1],
            ['Product',65,'#',NULL,1,2,NULL,0,1],
            ['Category',75,'product-category',47,2,NULL,NULL,0,1],
            ['Product',75,'product',47,2,NULL,NULL,0,1],
            ['Customer',480,'#',NULL,1,3,NULL,0,1],
            ['Registered Customer',75,'registered-customer',50,2,NULL,NULL,0,1],
            ['Quick Customer',75,'quick-customer',50,2,NULL,NULL,0,1],
            ['Report',137,'#',NULL,1,4,NULL,0,1],
            ['Sales Report',75,'sales-report',53,2,NULL,NULL,0,1],
            ['Customer Report',75,'customer-report',53,2,NULL,NULL,0,1],
            ['Product Reports',75,'product-report',53,2,NULL,NULL,0,1],

        ];

        foreach ($rows as $key => $row) {
            DB::table('menus')->insert([
                'title' => $row[0],
                'menu_icon_id' => $row[1],
                'url' => $row[2],
                'parent_id' => $row[3],
                'level' => $row[4],
                'priority' => $row[5],
                'permissions' => $row[6],
                'super_admin' => $row[7],
                'status' => $row[8]
            ]);
        }

    }



}








