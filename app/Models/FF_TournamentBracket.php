<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FF_TournamentBracket extends Model
{
    use HasFactory;

    protected $fillable = [
        'group',
        'rank',
        'team_id',
        'placement',
        'kill',
        'booyah',
        'total_point',
    ];

    protected $casts = [
        'rank' => 'integer',
        'placement' => 'integer',
        'kill' => 'integer',
        'booyah' => 'integer',
        'total_point' => 'integer',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(FF_Team::class, 'team_id');
    }
}
