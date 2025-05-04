<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}