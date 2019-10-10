<?php

namespace Modules\Permission\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Permission\Http\Requests\PermissionRequest;
use Spatie\Permission\Models\Role;
use App\User;
use Spatie\Permission\Models\Permission;
use DataTables;
use Auth;
class PermissionController extends Controller
{

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('permission::index');
    }

    public function userIndex()
    {
        $users = User::orderBy('id', 'desc')->where('id','<>',1)->get();
        return view('permission::user-index',compact('users'));
    }

    public function roleIndex()
    {
        $roles = Role::all();
        return view('permission::role-index',compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('permission::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(PermissionRequest $request)
    {
        $permission = Permission::create(['name' => $request->name,'created_by' => Auth::user()->id]);
        return response()->json(['msg'=>'Permission Added Successfully!'], 200);
    }

    public function userPermissionToggle(Request $request,$id)
    {
        $user = User::findOrFail($id);

        if($request->has('enable')){
            $user->givePermissionTo($request->permission);
            return response()->json(['msg'=>'Permission enabled successfully!'], 200);
        }else{
            $user->revokePermissionTo($request->permission);
            return response()->json(['msg'=>'Permission disabled successfully!'], 200);
        }
    }

    public function rolePermissionToggle(Request $request,$id)
    {
        $role = Role::findOrFail($id);

        if($request->has('enable')){
            $role->givePermissionTo($request->permission);
            return response()->json(['msg'=>'Permission enabled successfully!'], 200);
        }else{
            $role->revokePermissionTo($request->permission);
            return response()->json(['msg'=>'Permission disabled successfully!'], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit($id)
    {
        $permission = Permission::find($id);
        return view('permission::edit',compact('permission'));
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(PermissionRequest $request,$id)
    {
        $permission = Permission::find($id);
        $permission->name = $request->name;
        $permission->save();

        return response()->json(['msg'=>'Permission Updated  Successfully!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);

        
    }

    public function data()
    {
        $data = Permission::orderBy('name', 'asc')->get();

        return DataTables::make($data)
        ->addIndexColumn()
        ->addColumn('action', function ($row) {
            $buttons = '';
            $buttons .= ' <button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="crud.editClick(this)">Edit</button>'; 
            $buttons .= ' <button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="deleteClick(this)">Delete</button>'; 
            return $buttons;
        })
        ->rawColumns(['action'])
        ->make(true); 
    }

    public function userData(Request $request)
    {
        $user = User::find($request->user);

        if($user){
            $data = Permission::orderBy('name', 'asc')->get();
        }else{
            $data = [];
        }
        
        return DataTables::make($data)
        ->addIndexColumn()
        ->addColumn('action', function ($row) use ($user) {
            $output = '';
            $has_permission = $user->hasDirectPermission($row->name) ? 'checked' : '';

            $output .= '<form action="'.url('permission/user-toggle',['id'=>$user->id]).'" method="post">
            <input value="1" type="checkbox" name="enable" class="flat-red" '.$has_permission.' onchange="crud.directSubmit(this.form)">
            <input value="'.$row->name.'" type="hidden" name="permission">
            </form>';

            return $output;
        })
        ->rawColumns(['action'])
        ->make(true); 
    }

    public function roleData(Request $request)
    {
        $role = Role::find($request->role);

        if($role){
            $data = Permission::orderBy('name', 'asc')->get();
        }else{  
            $data = [];
        }

        return DataTables::make($data)
        ->addIndexColumn()
        ->addColumn('action', function ($row) use ($role) {
            $output = '';
            $has_permission = $role->hasDirectPermission($row->name) ? 'checked' : '';

            $output .= '<form action="'.url('permission/role-toggle',['id'=>$role->id]).'" method="post">
            <input value="1" type="checkbox" name="enable" class="flat-red" '.$has_permission.' onchange="crud.directSubmit(this.form)">
            <input value="'.$row->name.'" type="hidden" name="permission">
            </form>';

            return $output;
        })
        ->rawColumns(['action'])
        ->make(true); 
    }
}
