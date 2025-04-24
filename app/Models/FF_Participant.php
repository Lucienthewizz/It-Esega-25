<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FF_Participant extends Model
{
    use HasFactory;

    protected $table = 'FF_Participant'; 
    
    protected $fillable = [
        'ff_team_id', 'name', 'nickname', 'id_server', 'no_hp', 'email', 'alamat',
        'tanda_tangan', 'foto', 'role', 'proof_of_payment', 'status'
    ];

    public function team()
    {
        return $this->belongsTo(FF_Team::class, 'ff_team_id');
    }
}
