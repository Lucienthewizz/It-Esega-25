<!DOCTYPE html>
<html>
<head>
    <title>Data Pemain Mobile Legends</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #000; padding: 8px; font-size: 12px; }
    </style>
</head>
<body>
    <h2>Data Pemain Mobile Legends</h2>
    <table>
        <thead>
            <tr>
                <th>Team</th>
                <th>Nama</th>
                <th>IGN</th>
                <th>ID Server</th>
                <th>No HP</th>
                <th>Email</th>
                <th>Alamat</th>
                <th>Role</th>
                <th>Foto</th>
                <th>TTD</th>
                <th>Dibuat</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($mlPlayers as $player)
                <tr>
                    <td>{{ $player->team->team_name }}</td>
                    <td>{{ $player->name }}</td>
                    <td>{{ $player->nickname }}</td>
                    <td>{{ $player->id_server }}</td>
                    <td>{{ $player->no_hp }}</td>
                    <td>{{ $player->email }}</td>
                    <td>{{ $player->alamat }}</td>
                    <td>{{ $player->role }}</td>
                    <td>
                        @if($player->foto)
                            <a href="{{ asset('storage/' . $player->foto) }}" target="_blank">Lihat</a>
                        @else
                            -
                        @endif
                    </td>
                    <td>
                        @if($player->foto)
                            <a href="{{ asset('storage/' . $player->tanda_tangan) }}" target="_blank">Lihat</a>
                        @else
                            -
                        @endif
                    </td>
                    <td>{{ $player->created_at ? $player->created_at->format('d-m-Y') : '-' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
