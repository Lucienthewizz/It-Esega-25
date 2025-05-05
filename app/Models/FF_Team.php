<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FF_Team extends Model
{
    use HasFactory;

    protected $table = 'ff_teams';
    
    protected $fillable = [
        'team_name', 
        'team_logo', 
        'proof_of_payment', 
        'status'
    ];

    public function participants()
    {
        return $this->hasMany(FF_Participant::class, 'ff_team_id');
    }
}

