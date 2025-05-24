<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CompetitionSlot extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'competition_name',
        'total_slots',
        'used_slots',
        'is_active'
    ];
    
    /**
     * Menunjukkan apakah model memiliki timestamps
     * 
     * @var bool
     */
    public $timestamps = true;
    
    /**
     * Cek apakah masih ada slot tersedia
     *
     * @return bool
     */
    public function hasAvailableSlots(): bool
    {
        return $this->total_slots > $this->used_slots;
    }
    
    /**
     * Cek apakah slot tersedia berdasarkan jumlah yang dibutuhkan
     *
     * @param int $count
     * @return bool
     */
    public function isSlotAvailable(int $count = 1): bool
    {
        return ($this->total_slots - $this->used_slots) >= $count;
    }
    
    /**
     * Mendapatkan jumlah slot yang masih tersedia
     *
     * @return int
     */
    public function getAvailableSlots(): int
    {
        return max(0, $this->total_slots - $this->used_slots);
    }
    
    /**
     * Mendapatkan persentase slot yang terisi
     *
     * @return float
     */
    public function getFilledPercentage(): float
    {
        if ($this->total_slots === 0) {
            return 0;
        }
        
        return ($this->used_slots / $this->total_slots) * 100;
    }
    
    /**
     * Menambah jumlah slot yang digunakan
     *
     * @param int $count
     * @return bool
     */
    public function incrementUsedSlots(int $count = 1): bool
    {
        // Pastikan tidak melebihi total slot
        if (($this->used_slots + $count) > $this->total_slots) {
            return false;
        }
        
        $this->used_slots += $count;
        return $this->save();
    }
    
    /**
     * Mengurangi jumlah slot yang digunakan
     *
     * @param int $count
     * @return bool
     */
    public function decrementUsedSlots(int $count = 1): bool
    {
        // Log status awal
        \Illuminate\Support\Facades\Log::debug("decrementUsedSlots dipanggil", [
            'competition_name' => $this->competition_name,
            'original_used_slots' => $this->used_slots,
            'decrement_count' => $count,
            'model_id' => $this->id
        ]);
        
        // Pastikan used_slots tidak menjadi negatif
        $oldValue = $this->used_slots;
        $newValue = max(0, $this->used_slots - $count);
        
        try {
            // Gunakan transaction dan query builder untuk menghindari race condition
            DB::transaction(function() use ($newValue, $count) {
                // Update menggunakan query builder dengan where clause untuk mencegah race condition
                $updated = self::where('id', $this->id)
                              ->where('used_slots', $this->used_slots) // Pastikan nilai used_slots belum berubah
                              ->update([
                                  'used_slots' => $newValue,
                                  'updated_at' => now()
                              ]);
                
                if ($updated === 0) {
                    // Jika tidak berhasil update karena race condition, coba cara kedua
                    $latestSlot = self::find($this->id);
                    if ($latestSlot) {
                        $latestSlot->used_slots = max(0, $latestSlot->used_slots - $count);
                        $latestSlot->save();
                    }
                }
            });
            
            // Refresh model untuk mendapatkan nilai terbaru
            $this->refresh();
            
            // Log perubahan nilai
            \Illuminate\Support\Facades\Log::debug("decrementUsedSlots perubahan nilai", [
                'competition_name' => $this->competition_name,
                'model_id' => $this->id,
                'before' => $oldValue,
                'after' => $this->used_slots,
                'expected_after' => $newValue,
                'difference' => $oldValue - $this->used_slots
            ]);
            
            return true;
        } catch (\Exception $e) {
            // Log error
            \Illuminate\Support\Facades\Log::error("decrementUsedSlots error", [
                'competition_name' => $this->competition_name,
                'model_id' => $this->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Coba cara alternatif jika masih gagal
            try {
                $this->used_slots = $newValue;
                $saved = $this->save();
                
                \Illuminate\Support\Facades\Log::debug("decrementUsedSlots alternatif", [
                    'competition_name' => $this->competition_name,
                    'model_id' => $this->id,
                    'saved' => $saved,
                    'new_used_slots' => $this->used_slots
                ]);
                
                return $saved;
            } catch (\Exception $e2) {
                \Illuminate\Support\Facades\Log::error("decrementUsedSlots error (alternatif)", [
                    'competition_name' => $this->competition_name,
                    'model_id' => $this->id,
                    'error' => $e2->getMessage()
                ]);
                return false;
            }
        }
    }
}