<?php

namespace Modules\Permission\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Role;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $roleOrPermission)
    {
        if (Auth::guard('admin')->guest()) {
            throw UnauthorizedException::notLoggedIn();
        }

        if($roleOrPermission == "SuperAdminOnly" && !Auth::guard('admin')->user()->id == 1){
            abort(403, 'Unauthorized action.'); 
        }

        $checkPermission = $this->checkPermission($roleOrPermission);


        if(!$checkPermission){
            $rolesOrPermissions = is_array($roleOrPermission)
            ? $roleOrPermission
            : explode('|', $roleOrPermission);
            throw UnauthorizedException::forRolesOrPermissions($rolesOrPermissions); 
        }
        return $next($request);
    }

    private function checkPermission($roleOrPermission)
    {
        $user = Auth::guard('admin')->user();

        $rolesOrPermissions = is_array($roleOrPermission)
        ? $roleOrPermission
        : explode('|', $roleOrPermission);

        if ($user->id != 1 && ! $user->hasAnyRole($rolesOrPermissions) && ! $user->hasAnyPermission($rolesOrPermissions)) {
            return false;
        }else{
            return true;
        }
    }
}
