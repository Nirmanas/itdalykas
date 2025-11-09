<?php

namespace App\Enums;

enum UserRoles: string
{
    case ADMINISTRATOR = "admin";
    case WORKER = "employee";
    case CLIENT = "client";
    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }
}
