<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\FF_Participant;

class FFPlayersExport implements FromCollection, WithHeadings
{
    protected $data;
    
    public function __construct($data = null)
    {
        $this->data = $data;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->data ?? FF_Participant::all();
    }

    public function headings(): array
    {
        return ['ID', 'Team ID', 'Name', 'Nickname', 'ID Server', 'No HP', 'Email', 'Alamat', 'Tanda Tangan', 'Foto', 'Role', 'Status', 'Created At', 'Updated At'];
    }
}
