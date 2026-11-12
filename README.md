# ReHub - Website Bengkel & Sistem Reservasi Servis

Website profil bisnis dan sistem reservasi tiket servis mandiri untuk bengkel spesialis perbaikan laptop, PC, dan smartphone di Depok. Proyek ini dikembangkan sebagai pemenuhan tugas praktikum mata kuliah Pemrograman Web dengan fokus pada semantik HTML5, arsitektur CSS modular, aksesibilitas (WCAG 2.2 AA), dan interaktivitas client-side menggunakan Vanilla JavaScript.

---

## Fitur Utama

### 1. Antarmuka Publik (Konsumen)
* **Beranda & Showcase Portofolio:** Tampilan profil bengkel dilengkapi galeri komparasi dokumentasi kasus perbaikan sebelum dan sesudah (*before/after*).
* **Formulir Reservasi Mandiri (`booking.html`):**
  * Pemilihan jadwal servis dengan kalkulasi batas toleransi waktu kedatangan (+1 jam) secara *real-time*.
  * Pilihan nominal Down Payment (DP) dengan sinkronisasi instan antara tombol nominal cepat dan input manual.
  * Penerbitan bukti tiket (*receipt*) langsung setelah pengisian formulir.
  * Tautan konfirmasi otomatis ke WhatsApp admin bengkel beserta rincian data reservasi.
* **Sistem Analisis Gejala Kerusakan Otomatis:**
  * Konsumen dapat memeriksa kemungkinan komponen yang bermasalah secara mandiri berdasarkan keluhan perangkat.
  * Sistem memberikan estimasi rentang biaya perbaikan dan panduan persiapan sebelum unit dibawa ke bengkel.
* **Cek Riwayat & Status Tiket:** Konsumen dapat melacak progres pengerjaan unit secara mandiri hanya dengan memasukkan nomor tiket atau nomor WhatsApp.

### 2. Area Operasional Bengkel (Teknisi)
* **Dashboard Bengkel:** Ringkasan jumlah tiket aktif, tiket yang perlu ditinjau, dan metrik penanganan harian.
* **Manajemen Tiket Servis:** Daftar tiket masuk dengan fitur *live search* dan filter status (Diterima, Diagnosis, Menunggu Persetujuan, Dikerjakan, Siap Diambil, Selesai) tanpa *reload* halaman.
* **Lembar Inspeksi & Checklist Fisik (`tiket-detail.html`):**
  * Menampilkan keluhan pelanggan serta catatan estimasi awal yang diajukan oleh konsumen.
  * Form checklist bertahap (uji monitor eksternal, RAM, adaptor, dll.) dengan status kelulusan dan catatan teknisi.
  * Fitur salin temuan gejala langsung ke catatan inspeksi.
  * Pembaruan status pengerjaan yang tersimpan persisten.
* **Histori Servis Pelanggan (`riwayat.html`):** Linimasa rekam jejak servis perangkat per pelanggan beserta deteksi potensi kasus perbaikan berulang.

---

## Fondasi & Standar Teknis

1. **HTML5 Semantik & Aksesibilitas (WCAG 2.2 AA):**
   * Menggunakan elemen semantik (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`, `<figure>`).
   * Kontras warna teks memenuhi rasio minimal 4.5:1 untuk teks normal dan 3:1 untuk elemen interaktif.
   * Setiap form kontrol dilengkapi dengan `<label>` eksplisit dan indikator `:focus-visible` untuk navigasi keyboard.
   * Dilengkapi *skip navigation link* untuk kenyamanan pengguna pembaca layar (*screen reader*).
2. **Arsitektur CSS Modular:**
   * Ditulis secara *native* tanpa framework (Tailwind/Bootstrap) untuk memahami fondasi layout web modern secara mendalam.
   * Menggunakan Design Tokens berbasis CSS Custom Properties (`:root`) untuk menjaga konsistensi warna, tipografi, dan radius.
   * Struktur modular: `base.css` (reset & variabel), `layout.css` (grid & header/footer), `components.css` (tombol, badge, form), dan stylesheet khusus per halaman.
3. **Penyimpanan Lokal (Web Storage API):**
   * Seluruh interaksi data tiket, status, dan riwayat disimpan secara persisten di sisi klien menggunakan `localStorage`.
   * Dilengkapi mekanisme *seeding* otomatis saat aplikasi pertama kali dibuka.
4. **Tipografi Self-Hosted:**
   * Menggunakan *IBM Plex Sans* dan *IBM Plex Mono* (OFL) yang disimpan secara lokal di folder `fonts/` guna memastikan performa dan keterbacaan yang seragam di berbagai sistem operasi.

---

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

---

## Cara Menjalankan Proyek

Proyek ini berupa web statis berbasis browser sehingga tidak memerlukan kompilasi atau dependensi eksternal:

### Cara 1: Langsung di Browser
Buka berkas `web-statis/index.html` langsung menggunakan peramban web (Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari).

### Cara 2: Local HTTP Server (Direkomendasikan)
Menjalankan lewat web server lokal memudahkan pengujian *path* font dan modul CSS:

```bash
# Menggunakan Python 3 (bawaan sistem):
python3 -m http.server 8000 --directory web-statis

# Atau menggunakan ekstensi VS Code:
# Klik kanan 'web-statis/index.html' -> Pilih "Open with Live Server"
```

Buka peramban dan akses alamat: `http://localhost:8000`

---

## Catatan Pengembang & Lisensi
* Proyek ini dikembangkan secara mandiri untuk pemenuhan tugas mata kuliah Pemrograman Web (Pemweb).
* Font IBM Plex berlisensi SIL Open Font License 1.1 (`fonts/LICENSE-IBM-Plex.txt`).
