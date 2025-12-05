<?php

namespace App\Enums;

enum DetailType: string
{
    case WHEEL = 'ratai';
    case SPOILER = 'aptakas';

    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }
}
