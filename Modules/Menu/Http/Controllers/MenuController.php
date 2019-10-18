<?php

namespace Modules\Menu\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Menu\Entities\Menu;
use Modules\Menu\Entities\MenuIcon;
use Spatie\Permission\Models\Permission;
use DataTables;
use DB;

class MenuController extends Controller
{
    public function __construct()
    {
        $this->middleware('check_permission:SuperAdminOnly');
    }
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {

        // $main_parents = Menu::whereLevel(1)->get();

        $level_1_menus = Menu::whereLevel(1)->orderBy('priority')->get();
        $level_2_menus = Menu::whereLevel(2)->orderBy('priority')->whereParentId($request->l_1)->get();
        $level_3_menus = Menu::whereLevel(3)->orderBy('priority')->whereParentId($request->l_2)->get();

        $edit_view = '';
        if($request->l_3){
            $edit_view = $this->edit($request->l_3);
        }else if($request->l_2){
            $edit_view = $this->edit($request->l_2);
        }else if($request->l_1){
            $edit_view = $this->edit($request->l_1);
        }

        return view('menu::index',compact('level_1_menus','level_2_menus','level_3_menus','request','edit_view'));
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        $icons = MenuIcon::all();
        $main_parents = Menu::whereLevel(1)->get();
        return view('menu::create',compact('icons','main_parents'));
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        // dd($request->icon);

        $menu = new Menu();
        $menu->title = $request->title;
        $menu->menu_icon_id = $request->icon;

        if($request->super_admin_only){
            $menu->super_admin = 1;
        }

        $menu->url = $request->url ? $request->url : '#';
        if($request->parent_level_2){
           $menu->parent_id = $request->parent_level_2;
           $menu->level = 3;
       }else if($request->parent_level_1){
           $menu->parent_id = $request->parent_level_1;
           $menu->level = 2;
       }else{
        $menu->level = 1;
    }

    $menu->save();
    return response()->json(['msg'=>'Menu Added Successfully!'], 200);
}

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('menu::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit($id)
    {
        $icons = MenuIcon::all();
        $menu = Menu::findOrFail($id);
        $permissions = Permission::orderBy('name', 'asc')->get();
        return view('menu::includes.menu-details',compact('icons','menu','permissions'));
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request, $id)
    {
        // dd($request->title);
        $menu = Menu::findOrFail($id);
        $menu->title = $request->title;
        $menu->menu_icon_id = $request->icon;
        $menu->url = $request->url ? $request->url : '#';
        $menu->permissions = $request->permissions ? implode(',', $request->permissions) : NULL;
        if($request->has('super_admin_only')){
            $menu->super_admin = 1;
        }else{
            $menu->super_admin = 0;
        }
        $menu->save();

        return response()->json(['msg'=>'Menu updated successfully!'], 200);
    }

    public function updatePriority(Request $request)
    {
       DB::beginTransaction();
       try {
        if(count($request->level1_prority) > 0){
            foreach ($request->level1_prority as $key => $menu_id) {
                Menu::find($menu_id)->update(['priority'=>(int)$key+1]);
            }
        }
        if($request->level2_prority){
            if(count($request->level2_prority) > 0){
                foreach ($request->level2_prority as $key => $menu_id) {
                    Menu::findOrFail($menu_id)->update(['priority'=>(int)$key+1]);
                }
            }
        }

        if($request->level3_prority){
            if(count($request->level3_prority) > 0){
                foreach ($request->level3_prority as $key => $menu_id) {
                    Menu::findOrFail($menu_id)->update(['priority'=>(int)$key+1]);
                }
            }
        }
        

        DB::commit();
        return response()->json(['msg' => 'Menu priority updated successfully!'], 200);
    } catch (Exception $e) {
        DB::rollback();
        return response()->json(['msg' => 'Something went wrong!'], 500);
    }  


}

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy($id)
    {
        $menu_delete = Menu::findOrFail($id)->delete();
        return response()->json(['msg' => 'Menu Deleted successfully!'], 200);
    }

    public function menuStatusChange(Request $request)
    {
        $menu_status = Menu::findOrFail($request->menuId);

        if($menu_status->status == 1){            
            $menu_status->status = 0;
            $menu_status->save();
            return response()->json(['msg' => 'Menu Disable successfully!'], 200);
        }else if($menu_status->status == 0){
            $menu_status->status = 1;
            $menu_status->save();
            return response()->json(['msg' => 'Menu Enable successfully!'], 200);
        }
        
    }

    public function data(Request $request)
    {
        // dd($request->main_menu);
        $data = Menu::orderBy('id', 'desc')
        ->where(function ($q) use ($request){

            if ($request->sub_menu) {
              $q->where('parent_id',$request->sub_menu);
          }

          if (!$request->sub_menu && $request->main_menu) {
            $q->where('parent_id',$request->main_menu);
        }


    })
        ->get();

        return DataTables::make($data)
        ->addIndexColumn()
        ->addColumn('icon', function ($row) {
            return '<i class="fa '.$row->icon->icon_class.'"></i>';
        })
        ->editColumn('level', function ($row) {
            return 'Level ' . $row->level;
        })
        ->addColumn('parents', function ($row) {
            switch ($row->level) {
                case '1':
                return '-';
                break;
                case '2':
                return $row->parent->title;
                break;
                case '3':
                return $row->parent->title . ' -> ' . $row->parent->parent->title;
                break;
            }
        })
        ->addColumn('action', function ($row) {

            $buttons = '';
            $buttons .= '<button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="crud.editClick(this)">Edit</button>&nbsp';
            $buttons .= '<button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="crud.deleteClick(this)">Delete</button>'; 

            return $buttons;
        })
        ->rawColumns(['active','action','icon'])
        ->make(true); 
    }

    public function getSubMenus(Request $request)
    {
        return Menu::whereParentId($request->main_parent_id)->get();
    }
}
