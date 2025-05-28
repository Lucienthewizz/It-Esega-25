<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\CompetitionSlot;

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
        'email',
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
    
    /**
     * Bootstrap the model and its traits.
     * This will trigger automatic deletion of all related participants when a team is deleted.
     */
    protected static function booted()
    {
        static::deleting(function ($team) {
            // Hapus semua participants terkait
            $team->participants()->delete();
            
            // Hapus file logo tim jika ada
            if ($team->team_logo && Storage::disk('public')->exists($team->team_logo)) {
                Storage::disk('public')->delete($team->team_logo);
            }
            
            // Hapus file bukti pembayaran jika ada
            if ($team->proof_of_payment && Storage::disk('public')->exists($team->proof_of_payment)) {
                Storage::disk('public')->delete($team->proof_of_payment);
            }
            
            // Kembalikan slot kompetisi
            try {
                $slotCount = $team->slot_count ?? ($team->slot_type === 'double' ? 2 : 1);
                $slot = CompetitionSlot::where('competition_name', 'Mobile Legends')->first();
                
                if ($slot) {
                    \Illuminate\Support\Facades\Log::info('Returning competition slot from ML_Team model', [
                        'team_id' => $team->id,
                        'team_name' => $team->team_name,
                        'slot_count' => $slotCount,
                        'slot_type' => $team->slot_type
                    ]);
                    
                    $slot->decrementUsedSlots($slotCount);
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Error returning competition slot from ML_Team model', [
                    'team_id' => $team->id,
                    'error' => $e->getMessage()
                ]);
            }
        });
    }
}
