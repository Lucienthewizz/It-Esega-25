<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Registrasi Tim {{ $teamName }}</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div
        style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #0d0e5e;">🎉 Registrasi Berhasil</h2>
        <p>Halo, {{ $email }}</p>
        <p>Tim <strong>{{ $teamName }}</strong> telah berhasil didaftarkan untuk game
            <strong>{{ strtoupper($gameType) }}</strong> IT Essega.</p>
        <p>Terima kasih telah mendaftar! Kami akan menghubungi Anda untuk informasi selanjutnya.</p>

        <a href="{{ $URL }}"
            style="background-color: #c01515; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Daftarkan Player Anda Sekarang
        </a>

        <p style="font-size: 14px; margin-top: 20px;">
            Jika tombol di atas tidak bisa diklik, salin dan tempel link berikut ke browser Anda:
        </p>
        <p style="font-size: 14px; color: #1a0dab;">
            <a href="{{ $URL }}" target="_blank" style="word-break: break-all;">{{ $URL }}</a>
        </p>


        <hr style="margin-top: 40px;">
        <p style="font-size: 12px; color: #777;">Email ini dikirim otomatis oleh sistem kami. Jangan membalas email ini.
        </p>
    </div>
</body>

</html>
