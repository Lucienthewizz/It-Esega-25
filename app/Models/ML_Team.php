<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ML_Team extends Model
{
    use HasFactory;

    protected $table = 'ml_teams';
    
    protected $fillable = [
        'team_name', 
        'team_logo', 
        'proof_of_payment', 
        'status',
        'slot_type',
        'slot_count'
    ];

    public function participants()
    {
        return $this->hasMany(ML_Participant::class, 'ml_team_id');
    }
    
    public function isDoubleSlot()
    {
        return $this->slot_type === 'double' || $this->slot_count === 2;
    }
    
    public function isSingleSlot()
    {
        return $this->slot_type === 'single' || $this->slot_count === 1;
    }
}
