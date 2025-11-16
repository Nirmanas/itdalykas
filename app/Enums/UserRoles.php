<?php

namespace App\Enums;

enum UserRoles: string
{
    case ADMIN = "administratorius";
    case WORKER = "darbuotojas";
    case CLIENT = "klientas";
    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }
}
