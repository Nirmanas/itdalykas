<?php


namespace App\Enums;


enum OrderStatus: string
{
    case PENDING = 'PENDING';
    case PROCESSING = 'CONFIRMED';
    case COMPLETED = 'DELIVERED';
    case CANCELLED = 'CANCELLED';

    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }

}
