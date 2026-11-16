# ReHub — Website Bengkel & Reservasi Servis

Website profil bengkel dan reservasi servis mandiri untuk perbaikan laptop, PC, dan smartphone di Depok. Dibuat untuk tugas praktikum Pemrograman Web dengan HTML5 semantik, CSS modular tanpa framework, dan Vanilla JavaScript.

## Fitur

### Antarmuka Publik (Pelanggan)
- Beranda dan galeri portofolio perbandingan sebelum dan sesudah perbaikan.
- Formulir reservasi (`booking.html`): pilih jadwal servis dengan batas toleransi kedatangan (+1 jam), pilih nominal DP lewat tombol cepat atau input manual, cetak struk tiket langsung, dan kirim detail reservasi ke WhatsApp admin.
- Cek gejala kerusakan: bantu perkirakan komponen bermasalah, rentang biaya, dan persiapan sebelum unit dibawa ke bengkel.
- Lacak status tiket menggunakan nomor tiket atau nomor WhatsApp.

### Area Teknisi
- Dashboard ringkasan jumlah tiket aktif dan tiket yang perlu ditinjau.
- Daftar tiket dengan live search dan filter status (Diterima, Diagnosis, Menunggu Persetujuan, Dikerjakan, Siap Diambil, Selesai) tanpa reload.
- Lembar inspeksi (`tiket-detail.html`): menampilkan keluhan pelanggan, checklist pemeriksaan fisik (monitor eksternal, RAM, adaptor, dan komponen lain), tombol salin gejala ke catatan inspeksi, serta pembaruan status.
- Riwayat servis (`riwayat.html`): linimasa servis per pelanggan beserta penanda kasus perbaikan berulang.

## Teknis
- **HTML5 & Aksesibilitas (WCAG 2.2 AA):** memakai tag semantik (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`, `<figure>`), skip link, label eksplisit pada form, dan indikator `:focus-visible`.
- **CSS Modular:** ditulis native tanpa Tailwind atau Bootstrap, memakai variabel `:root` di `base.css` serta pemisahan `layout.css`, `components.css`, dan CSS per halaman.
- **Penyimpanan:** data tiket dan riwayat disimpan di `localStorage` dengan data awal otomatis saat pertama kali dibuka.
- **Font lokal:** memakai *IBM Plex Sans* dan *IBM Plex Mono* (OFL) dari folder `fonts/`.

## Struktur Direktori

```text
ReHub/
├── web-statis/                    # Berkas aplikasi web
│   ├── index.html                 # Halaman beranda & showcase
│   ├── booking.html               # Formulir reservasi & cek status tiket
│   ├── portofolio.html            # Galeri dokumentasi hasil servis
│   ├── kontak.html                # Informasi bengkel, jam buka & lokasi
│   ├── dashboard.html             # Area teknisi: ringkasan status bengkel
│   ├── tiket.html                 # Area teknisi: daftar dan pencarian tiket
│   ├── tiket-baru.html            # Area teknisi: informasi SOP reservasi mandiri
│   ├── tiket-detail.html          # Area teknisi: checklist inspeksi & update status
│   ├── riwayat.html               # Area teknisi: linimasa histori unit pelanggan
│   ├── css/
│   │   ├── style.css              # Master stylesheet (impor seluruh modul CSS)
│   │   ├── base.css               # Reset, @font-face, variabel warna & tema
│   │   ├── layout.css             # Kerangka tata letak, navigasi, grid & footer
│   │   ├── components.css         # Tombol, badge status, kartu & form fields
│   │   ├── beranda.css            # Layout hero & slider portofolio
│   │   ├── portofolio.css         # Grid perbandingan sebelum/sesudah perbaikan
│   │   ├── booking.css            # Tab antarmuka, aturan DP & struk reservasi
│   │   └── teknisi.css            # Tabel tiket, checklist & kotak diagnosis
│   ├── js/
│   │   ├── storage.js             # Seed data, fungsi CRUD localStorage & logika analisis gejala
│   │   ├── booking.js             # Logika booking, kalkulasi toleransi, DP & cek tiket
│   │   ├── teknisi.js             # Statistik dashboard & live search/filter tiket
│   │   ├── tiket-detail.js        # Logika checklist teknisi & update status unit
│   │   └── riwayat.js             # Tampilan linimasa histori perbaikan
│   ├── fonts/                     # Font IBM Plex Sans & IBM Plex Mono (woff2)
│   └── img/                       # Aset visual, logo & SVG dokumentasi portofolio
├── DESIGN.md                      # Pedoman desain, token warna & tipografi
├── AUDIT.md                       # Laporan evaluasi aksesibilitas & usability
├── .gitignore                     # Aturan pengabaian berkas lingkungan lokal
└── README.md                      # Dokumentasi proyek
```

## Cara Menjalankan

Web statis ini bisa dibuka langsung di browser lewat `web-statis/index.html`, atau dijalankan dengan local HTTP server agar path font dan CSS termuat normal:

```bash
python3 -m http.server 8000 --directory web-statis
```

Buka `http://localhost:8000` di browser (atau gunakan ekstensi Live Server di VS Code pada `web-statis/index.html`).

## Lisensi
Font IBM Plex memakai lisensi SIL Open Font License 1.1 (`fonts/LICENSE-IBM-Plex.txt`).
