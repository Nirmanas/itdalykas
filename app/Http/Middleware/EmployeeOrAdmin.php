<?php

namespace App\Http\Middleware;

use App\Enums\UserRoles;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EmployeeOrAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !in_array($request->user()->role, [UserRoles::ADMIN, UserRoles::WORKER])) {
            abort(Response::HTTP_FORBIDDEN);
        }
        return $next($request);
    }
}

