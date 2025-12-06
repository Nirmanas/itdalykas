<?php

namespace App\Http\Middleware;

use App\Enums\UserRoles;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if ($user && $user->role !== UserRoles::CLIENT)
        {
            if ($user->role === UserRoles::ADMIN)
            {
                return redirect()->route('admin.users.index');
            }
            if ($user->role === UserRoles::WORKER)
            {
                return redirect()->route('admin.car-models.index');
            }
        }
        return $next($request);
    }
}
