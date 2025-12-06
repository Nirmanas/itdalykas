<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CarDetail extends Pivot
{
    protected $table = 'detail_model';

    public $timestamps = false;

    protected $fillable = [
        'detail_id',
        'model_id',
        'coords',
        'is_default',
    ];
}
