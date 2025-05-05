<?php

namespace App\Exports;

use App\Models\ML_Participant;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MLPlayerExport implements FromCollection, WithHeadings
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
        return $this->data ?? ML_Participant::all();
    }

    public function headings(): array
    {
        return ['ID', 'Team ID', 'Name', 'Nickname', 'ID Server', 'No HP', 'Email', 'Alamat', 'Tanda Tangan', 'Foto', 'Role', 'Status', 'Created At', 'Updated At'];
    }
}