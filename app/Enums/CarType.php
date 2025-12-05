<?php

namespace App\Enums;

enum CarType: string
{
    case BMW = 'BMW';
    case AUDI = 'audi';
    case MERCEDES = 'mercedes';
    case KIA = 'kia';
    case TOYOTA = 'toyota';
    case FORD = 'ford';
    case FERRARI = 'ferrari';
    case OTHER = 'kita';

    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }
}
