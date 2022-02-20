<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * This class contains all the properties for basic relation models. Such models contain only one (name) field or more
 */
abstract class BasicRelationModel extends  Model
{
    use HasFactory;

    public $timestamps = false;
}
