<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Auth;
class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if($request->expectsJson()){
            return response()->json(['message' => $exception->getMessage()], 401);
        }

        // dd($exception->guards());

        $guard = $exception->guards()[0];

        switch ($guard) {

           case 'admin':
           return redirect()->guest(route('admin.login'));
           break;

           default:
           return redirect()->guest(url('login'));
           break;

       }

   }


    public function render($request, Exception $exception)
    {
        if ($exception instanceof TokenMismatchException) {
            return redirect('/');
        }

        if ($this->isHttpException($exception)) {

            switch ($exception->getStatusCode()) {

            // not authorized
                case '403':
                if(Auth::guard('admin')->check()){
                    return \Response::view('dashboard::errors.403',array(),403);
                }
                break;

            // not found
                case '404':
                
                // dd('sss');
                if(Auth::guard('admin')->check()){
                   return \Response::view('dashboard::errors.404',array(),404);
                }
               break;

            // internal error
               case '500':
                if(Auth::guard('admin')->check()){
                   return \Response::view('dashboard::errors.500',array(),500);
                }
               break;

               default:
               if(Auth::guard('admin')->check()){
                    return \Response::view('dashboard::errors.500',array(),500);
                }
               break;
           }
       }

        return parent::render($request, $exception);
    }
}
