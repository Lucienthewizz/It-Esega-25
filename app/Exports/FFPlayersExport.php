<?php

namespace App\Exports;

use App\Models\ML_Participant;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MLPlayersExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ML_Participant::all();
    }

    public function headings(): array
    {
        return ['ID', 'Team ID', 'Name', 'Nickname', 'ID Server', 'No HP', 'Email', 'Alamat', 'Tanda Tangan', 'Foto', 'Role', 'Created At', 'Updated At'];
    }
}
