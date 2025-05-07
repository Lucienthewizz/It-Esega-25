<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
    
    /**
     * Bootstrap the model and its traits.
     * This will trigger automatic deletion of all related participants when a team is deleted.
     */
    protected static function booted()
    {
        static::deleting(function ($team) {
            $team->participants()->delete();
            
            if ($team->team_logo && Storage::disk('public')->exists($team->team_logo)) {
                Storage::disk('public')->delete($team->team_logo);
            }
            
            if ($team->proof_of_payment && Storage::disk('public')->exists($team->proof_of_payment)) {
                Storage::disk('public')->delete($team->proof_of_payment);
            }
        });
    }
}

