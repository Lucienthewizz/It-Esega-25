<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\FF_Participant;

class FFPlayersExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return FF_Participant::all();
    }

    public function headings(): array
    {
        return ['ID', 'Team ID', 'Name', 'Nickname', 'ID Server', 'No HP', 'Email', 'Alamat', 'Tanda Tangan', 'Foto', 'Role', 'Created At', 'Updated At'];
    }
}
