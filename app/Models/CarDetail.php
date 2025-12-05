<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class CarDetail extends Model
{
    protected $table = 'detail_model';
    public $timestamps = false;
    protected $fillable = [
        'detail_id',
        'model_id',
        'coords',
    ];
}
