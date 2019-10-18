<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Role\Http\Requests\RoleRequest;
use Modules\User\Http\Requests\UserRequest;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Modules\User\Entities\Admin;
use DataTables;


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('check_permission:user.list', ['only' => ['index']]);
        $this->middleware('check_permission:user.create',   ['only' => ['create','store']]);
        $this->middleware('check_permission:user.edit',   ['only' => ['edit', 'update']]);
        $this->middleware('check_permission:user.delete',   ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $permissions = Permission::all();
        return view('user::index',compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        $roles = Role::all();
        $permissions = Permission::all();
        return view('user::create',compact('roles','permissions'));
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(UserRequest $request)
    {
        
        $user = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            ]);

            foreach($request->roles as $role){
                $user->assignRole($role);
            }

            // $user->givePermissionTo($request->permission);
        
        return response()->json(['msg'=>'User Added Successfully!'], 200);
    }

    public function roleRequest(RoleRequest $request){

    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('user::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit($id)
    {
        $user = Admin::find($id);
        $roles = Role::all();

        $roleName = $user->getRoleNames()->toArray();

        return view('user::edit',compact('user','roles','roleName'));
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(UserRequest $request,$id)
    {
        $user = Admin::find($id);

        $user->name = $request->name;

        if(isset($request->password)){
            $user->password = $request->password;
        }

        $user->save();

        $roleName = $user->getRoleNames()->toArray();
        
        $result = array_diff($roleName,$request->roles);

        if($result){
            foreach($roleName as $role){
                $user->removeRole($role);
            }
        }

        if($request->roles){
            foreach($request->roles as $role){
                $user->assignRole($role);
            }
        }

        return response()->json(['msg'=>'User Updated Successfully!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }

    public function data()
    {
        $data = Admin::orderBy('id', 'desc')->where('id','<>',1)->get();

        return DataTables::make($data)
        ->addIndexColumn()
        ->addColumn('roles', function ($row) {

            $rollArray = array();

            foreach($row->getRoleNames() as $roles){
                $rollArray[] = $roles;
            }

            return $rollArray;

        })
        // ->addColumn('permissions', function ($row) {

        //     $permission_list ='<ul>';

        //     foreach($row->getAllPermissions() as $permission){
        //         $permission_list .= '<li>'.$permission->name.'</li>';
        //     }
        //     $permission_list .='</ul>';
        //     return $permission_list;

        // })
         ->addColumn('active', function ($row) {

            $check = $row->active ? 'checked':'';

            // return '<input value="'.$row->id.'" type="checkbox" class="flat-red" '.$check.' id="useractivechecked" onchange="alert(1)">';
            return '<input value="'.$row->id.'" type="checkbox" class="flat-red" '.$check.' value="">';
            
        })
        ->addColumn('action', function ($row) {

            $buttons = '';

            $buttons .= '<button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="viewPermission('.$row->id.')">View Permission</button>'; 

            $buttons .= '<button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="crud.editClick(this)">Edit</button>'; 
            // $buttons .= '<button type="button" class="btn btn-default btn-sm" data-id="'.$row->id.'" onclick="deleteClick(this)">Delete</button>'; 

        // $buttons = '<button href="javascript:;" class="btn btn-icon-only green data-edit" title="Edit" data-id="'.$row->id.'" onclick="editClick(this)">
        // <i class="fa fa-edit"></i>
        // </button>';

        // $buttons .= '<a href="javascript:;" class="btn btn-icon-only red data-delete" title="Delete" data-id="'.$row->id.'" onclick="deleteClick(this)"">
        // <i class="fa fa-times"></i>
        // </a>';

            return $buttons;    
        })
        ->rawColumns(['active','action'])
        ->make(true);    
    }

    public function userActive(Request $request){

        $user = User::findOrFail($request->user_id);

        if($request->active == 0){
            $user->active = 0;
            $user->save();
        }else{
            $user->active = 1;
            $user->save();
        }

        return response()->json(['msg' => 'action successfully'], 200);
    }

    public function addpermission(Request $request){

        $user = User::find($request->userid);

        $user->givePermissionTo($request->permission);

        return response()->json(['msg' => 'Permission added Successfully'], 200);

    }

    public function viewPermission(Request $request){

        $user = User::find($request->id);

        $permission_lists = $user->getAllPermissions();

        return view('user::includes.permission-list',compact('permission_lists'));

    }
}
