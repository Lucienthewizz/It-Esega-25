<?php

namespace App\Http\Controllers;

use App\Models\CompetitionSlot;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class CompetitionSlotController extends Controller
{
    /**
     * Mendapatkan data slot untuk semua lomba
     */
    public function getAll()
    {
        $slots = CompetitionSlot::all();
        
        return response()->json([
            'success' => true,
            'data' => $slots
        ]);
    }
    
    /**
     * Mendapatkan data slot berdasarkan nama lomba
     */
    public function getByName(string $competitionName)
    {
        $slot = CompetitionSlot::where('competition_name', $competitionName)->first();
        
        if (!$slot) {
            return response()->json([
                'success' => false,
                'message' => 'Kompetisi tidak ditemukan'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $slot
        ]);
    }
    
    /**
     * Validasi apakah slot masih tersedia
     */
    public function validateAvailability(string $competitionName): JsonResponse
    {
        $slot = CompetitionSlot::where('competition_name', $competitionName)->first();
        
        if (!$slot) {
            return response()->json([
                'available' => false,
                'message' => 'Kompetisi tidak ditemukan'
            ]);
        }
        
        $hasSlot = $slot->hasAvailableSlots();
        
        return response()->json([
            'available' => $hasSlot,
            'availableSlots' => $slot->getAvailableSlots(),
            'totalSlots' => $slot->total_slots,
            'usedSlots' => $slot->used_slots,
            'filledPercentage' => $slot->getFilledPercentage(),
            'message' => $hasSlot ? 'Slot tersedia' : 'Slot penuh'
        ]);
    }
    
    /**
     * Validasi apakah slot masih tersedia berdasarkan tipe slot
     */
    public function validateSlotType(string $competitionName, string $slotType): JsonResponse
    {
        $slot = CompetitionSlot::where('competition_name', $competitionName)->first();
        
        if (!$slot) {
            return response()->json([
                'available' => false,
                'message' => 'Kompetisi tidak ditemukan'
            ]);
        }
        
        // Hitung berapa slot yang dibutuhkan
        $requiredSlots = ($slotType === 'double') ? 2 : 1;
        
        // Cek apakah tersedia
        $availableSlots = $slot->getAvailableSlots();
        $isAvailable = $availableSlots >= $requiredSlots;
        
        return response()->json([
            'available' => $isAvailable,
            'availableSlots' => $availableSlots,
            'requiredSlots' => $requiredSlots,
            'totalSlots' => $slot->total_slots,
            'usedSlots' => $slot->used_slots,
            'filledPercentage' => $slot->getFilledPercentage(),
            'message' => $isAvailable 
                ? "Slot tersedia (butuh {$requiredSlots} slot)" 
                : "Slot tidak mencukupi untuk tipe {$slotType}"
        ]);
    }
    
    /**
     * Increment slot yang digunakan
     */
    public function incrementSlot(Request $request, string $competitionName): JsonResponse
    {
        $slot = CompetitionSlot::where('competition_name', $competitionName)->first();
        
        if (!$slot) {
            return response()->json([
                'success' => false,
                'message' => 'Kompetisi tidak ditemukan'
            ], 404);
        }
        
        $count = $request->input('count', 1);
        
        if (!$slot->hasAvailableSlots() || $slot->used_slots + $count > $slot->total_slots) {
            return response()->json([
                'success' => false,
                'message' => 'Slot tidak mencukupi',
                'availableSlots' => $slot->getAvailableSlots(),
                'requestedSlots' => $count
            ], 400);
        }
        
        if ($slot->incrementUsedSlots($count)) {
            return response()->json([
                'success' => true,
                'message' => 'Slot berhasil ditambahkan',
                'availableSlots' => $slot->getAvailableSlots(),
                'totalSlots' => $slot->total_slots,
                'usedSlots' => $slot->used_slots
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Gagal menambahkan slot'
        ], 500);
    }
    
    /**
     * Increment slot yang digunakan berdasarkan tipe slot
     */
    public function incrementSlotByType(Request $request, string $competitionName): JsonResponse
    {
        $slot = CompetitionSlot::where('competition_name', $competitionName)->first();
        
        if (!$slot) {
            return response()->json([
                'success' => false,
                'message' => 'Kompetisi tidak ditemukan'
            ], 404);
        }
        
        $slotType = $request->input('slot_type', 'single');
        $count = ($slotType === 'double') ? 2 : 1;
        
        if (!$slot->hasAvailableSlots() || $slot->used_slots + $count > $slot->total_slots) {
            return response()->json([
                'success' => false,
                'message' => 'Slot tidak mencukupi',
                'availableSlots' => $slot->getAvailableSlots(),
                'requestedSlots' => $count
            ], 400);
        }
        
        if ($slot->incrementUsedSlots($count)) {
            return response()->json([
                'success' => true,
                'message' => "Berhasil menambahkan {$count} slot",
                'availableSlots' => $slot->getAvailableSlots(),
                'totalSlots' => $slot->total_slots,
                'usedSlots' => $slot->used_slots,
                'slotType' => $slotType
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Gagal menambahkan slot'
        ], 500);
    }
}