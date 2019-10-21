<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Modules\Log\Events\ActivityLog;
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

            //submit activity log
            event(new ActivityLog(1));

            return redirect()->intended(route('admin.dashboard'));
        }

        $error = ValidationException::withMessages([
           'email' => ['These credentials do not match our records'],
       ]);
        
        throw $error;
    }
    
    public function logOut(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->flush();
        $request->session()->regenerate();
        return redirect()->route('admin.login');
    }
}
