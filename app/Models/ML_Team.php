<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ML_Team extends Model
{
    use HasFactory;

    protected $table = 'ML_Team';
    
    protected $fillable = [
        'team_name', 
        'team_logo', 
        'proof_of_payment', 
        'status'
    ];

    public function participants()
    {
        return $this->hasMany(ML_Participant::class, 'ml_team_id');
    }
}
