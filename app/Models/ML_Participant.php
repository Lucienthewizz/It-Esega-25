<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ML_Participant extends Model
{
    use HasFactory;

    protected $table = 'ml_participants';

    protected $fillable = [
        'ml_team_id', 'name', 'nickname', 'id_server', 'no_hp', 'email', 'alamat',
        'tanda_tangan', 'foto', 'role', 'proof_of_payment', 'status'
    ];

    public function team()
    {
        return $this->belongsTo(ML_Team::class, 'ml_team_id');
    }
}

