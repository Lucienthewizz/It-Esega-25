<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\CompetitionSlot;

class FF_Team extends Model
{
    use HasFactory;

    protected $table = 'ff_teams';
    
    protected $fillable = [
        'team_name', 
        'team_logo', 
        'proof_of_payment', 
        'email', 
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
            
            // Kembalikan slot kompetisi
            try {
                $slot = CompetitionSlot::where('competition_name', 'Free Fire')->first();
                
                if ($slot) {
                    Log::info('Returning competition slot from FF_Team model', [
                        'team_id' => $team->id,
                        'team_name' => $team->team_name,
                        'slot_count' => 1 // FF selalu menggunakan 1 slot
                    ]);
                    
                    $slot->decrementUsedSlots(1); // FF selalu menggunakan 1 slot
                }
            } catch (\Exception $e) {
                Log::error('Error returning competition slot from FF_Team model', [
                    'team_id' => $team->id,
                    'error' => $e->getMessage()
                ]);
            }
        });
    }
}

