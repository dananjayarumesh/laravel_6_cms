<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Entities\Admin;
class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('user::profile.index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('user::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
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
    public function edit()
    {
        return view('user::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
        if(empty($request->name)){
            return response()->json([
              'message' => 'The given data was invalid.',
              'errors' => ['data'=> ['Please give name of user.']
            ]
          ], 422);
        }

        $edit_user = Admin::find($request->userid);
        $edit_user->name = $request->name;

        if($request->password){
            if($request->password == $request->con_password){

                $edit_user->password = bcrypt($request->password);

            }else{
                return response()->json([
                    'message' => 'Password is not match for Confirm Password.'
                ], 422); 
            }
        }

        $edit_user->save();


        return response()->json(['msg'=>'User Profile updated Successfully!'], 200);

    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }
}
