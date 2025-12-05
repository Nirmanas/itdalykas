<?php

namespace App\Models;

use App\Enums\DetailType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Detail extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'picture_url',
        'stock',
        'type',
        'price',
    ];

    protected function casts(): array
    {
        return [
            'type' => DetailType::class,
        ];
    }

    public function models(): BelongsToMany
    {
        return $this
            ->belongsToMany(CarModel::class,
                'detail_model',
                'detail_id',
                'model_id');
    }
}
