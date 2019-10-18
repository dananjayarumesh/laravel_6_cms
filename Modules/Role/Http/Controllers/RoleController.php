<?php

namespace Modules\Role\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Role\Http\Requests\RoleRequest;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DataTables;

class RoleController extends Controller
{
    public function __construct()
    {
        // $this->middleware('check_permission:user.list', ['only' => ['index']]);
        // $this->middleware('check_permission:user.create',   ['only' => ['create','store']]);
        // $this->middleware('check_permission:user.edit',   ['only' => ['edit', 'update']]);
        // $this->middleware('check_permission:user.delete',   ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('role::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        // $permissions = Permission::all();
        return view('role::create',compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(RoleRequest $request)
    {
        $role = Role::create(['name' => $request->name]);

        // $role->givePermissionTo($request->permissions);

        return response()->json(['msg'=>'Role Added Successfully!'], 200);
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('role::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit($id)
    {
        // $permissions = Permission::all();
        $role = Role::find($id);
        return view('role::edit',compact('role','permissions'));
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(RoleRequest $request ,$id)
    {
        $role = Role::find($id);
        $role->name = $request->name;
        $role->save();

        // $role->givePermissionTo($request->permission);

        return response()->json(['msg'=>'Role Updated Successfully!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy($id)
    {
        Role::find($id)->delete();
        return response()->json(['msg'=>'Role Deleted Successfully!'], 200);
    }

    public function data()
    {
        $data = Role::all();

        return DataTables::make($data)
        ->addIndexColumn()
        ->addColumn('action', function ($row) {

            $buttons = '';

            $buttons .= '<button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="crud.editClick(this)">Edit</button>&nbsp'; 
            $buttons .= '<button type="button" class="btn btn-default btn-xs" data-id="'.$row->id.'" onclick="crud.deleteClick(this)">Delete</button>'; 

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
}
