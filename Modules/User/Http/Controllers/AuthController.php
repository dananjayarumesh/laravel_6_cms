<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Auth;
use Session;
class AuthController extends Controller
{

    public function login()
    {
        return view('user::auth.login');
    }


    public function submitLogin(Request $request)
    {
        $request->validate([
            'email'=> 'required|email',
            'password'=>'required|min:6'
        ]);

        if (Auth::guard('admin')->attempt(['email'=>$request->email,'password'=>$request->password],$request->remember)) {
            // $intended_url = Session::get('url.intended', route('admin.dashboard'));
            // Session::forget('url.intended');
            // return response()->json(['url'=>$intended_url], 200);
            return redirect()->intended(route('admin.dashboard'));
        }

        $error = ValidationException::withMessages([
           'email' => ['Credentials does not match'],
       ]);
        throw $error;
    }
    
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('user::index');
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
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        return view('user::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        return view('user::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
