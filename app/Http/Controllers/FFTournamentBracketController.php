<?php

namespace App\Http\Controllers;

use App\Models\FF_Team;
use App\Models\FF_TournamentBracket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FFTournamentBracketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $brackets = FF_TournamentBracket::with('team')->orderBy('group')->orderBy('rank')->get();
        
        // Group by group for easier frontend display
        $groupedBrackets = $brackets->groupBy('group');
        
        return response()->json([
            'status' => 'success', 
            'data' => $groupedBrackets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'group' => 'required|string|in:A,B,C,D',
            'rank' => 'required|integer|min:1|max:12',
            'team_id' => 'nullable|exists:f_f__teams,id',
            'placement' => 'nullable|integer|min:0',
            'kill' => 'nullable|integer|min:0',
            'booyah' => 'nullable|integer|min:0',
            'total_point' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $bracket = FF_TournamentBracket::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Bracket created successfully',
            'data' => $bracket
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(FF_TournamentBracket $bracket): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => $bracket->load('team')
        ]);
    }

    /**
     * Update the specified resource.
     */
    public function update(Request $request, FF_TournamentBracket $bracket): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'team_id' => 'nullable|exists:f_f__teams,id',
            'placement' => 'nullable|integer|min:0',
            'kill' => 'nullable|integer|min:0',
            'booyah' => 'nullable|integer|min:0',
            'total_point' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $bracket->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Bracket updated successfully',
            'data' => $bracket->fresh('team')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FF_TournamentBracket $bracket): JsonResponse
    {
        $bracket->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Bracket deleted successfully'
        ]);
    }
    
    /**
     * Initialize the bracket for a group.
     */
    public function initializeGroup(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'group' => 'required|string|in:A,B,C,D',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }
        
        $group = $request->group;
        
        // Check if entries already exist for this group
        $existingEntries = FF_TournamentBracket::where('group', $group)->count();
        if ($existingEntries > 0) {
            return response()->json([
                'status' => 'error',
                'message' => "Bracket entries for Group {$group} already exist"
            ], 422);
        }
        
        // Create 12 empty slots for the group
        $brackets = [];
        for ($rank = 1; $rank <= 12; $rank++) {
            $brackets[] = FF_TournamentBracket::create([
                'group' => $group,
                'rank' => $rank,
                'team_id' => null,
                'placement' => null,
                'kill' => null,
                'booyah' => null,
                'total_point' => null,
            ]);
        }
        
        return response()->json([
            'status' => 'success',
            'message' => "Group {$group} bracket initialized successfully",
            'data' => $brackets
        ], 201);
    }
    
    /**
     * Get available teams not yet assigned to any bracket.
     */
    public function getAvailableTeams(): JsonResponse
    {
        // Get all teams already assigned to brackets
        $assignedTeamIds = FF_TournamentBracket::whereNotNull('team_id')->pluck('team_id');
        
        // Get all teams not assigned to any bracket
        $availableTeams = FF_Team::whereNotIn('id', $assignedTeamIds)->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $availableTeams
        ]);
    }
}
