<?php

namespace App\Models;

use App\Enums\CarType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CarModel extends Model
{
    public $timestamps = false;

    protected $table = 'models';

    protected $fillable = [
        'name',
        'picture_url',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'type' => CarType::class,
        ];
    }

    public function details(): BelongsToMany
    {
        return $this->belongsToMany(Detail::class, 'detail_model', 'model_id', 'detail_id');
    }
}

