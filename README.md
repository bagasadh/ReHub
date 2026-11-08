# ServisUlang AI — Website Bengkel & Sistem Tiket Servis

Website profil bisnis dan sistem booking tiket mandiri untuk bengkel servis laptop, PC, dan HP di Depok. Dibangun dengan standar web modern menggunakan **100% Pure HTML5 & CSS3** tanpa ketergantungan framework eksternal, tanpa JavaScript, dan mematuhi pedoman aksesibilitas **WCAG 2.2 Level AA**.

---

## 🚀 Keunggulan Teknis

* **100% Pure Semantic HTML5 & Modern CSS3:** Tanpa JavaScript, tanpa Node.js/npm, tanpa build step. Siap dibuka langsung di browser mana pun.
* **Aksesibilitas Teruji (WCAG 2.2 AA):** 0 pelanggaran axe-core, kontras rasio tinggi (>10:1 untuk teks utama di atas latar gelap `#202020`), struktur heading teratur, dan navigasi ramah keyboard (`:focus-visible`).
* **Arsitektur CSS Modular:** Stylesheet dipecah secara modular berdasarkan fungsinya sehingga mudah dirawat (*maintainable*) dan efisien token saat dikembangkan bersama AI.
* **Tipografi Self-Hosted:** Menggunakan font *IBM Plex Sans* dan *IBM Plex Mono* (OFL) yang disimpan lokal agar konsisten di semua perangkat (Android, iOS, Windows, macOS, Linux).
* **Fitur Interaktif Pure CSS:**
  * **Tabs Navigasi:** Menggunakan teknik *Radio Input + Label + Sibling Combinator* (`:checked ~ .booking-panel`).
  * **Metode Bayar Dinamis:** Menggunakan CSS modern selector `:has()` (`.field:has(#pay-*:checked)`).
  * **Simulasi Struk Tiket:** Menggunakan CSS pseudo-class `:target` (`#booking-receipt:target`).
  * **Validasi Form:** Validasi bawaan HTML5 yang disinkronkan dengan umpan balik visual CSS `:user-invalid`.
  * **Showcase Slider Beranda:** Menggunakan CSS `scroll-snap` native tanpa slider library.

---

## 📁 Struktur Direktori

```text
pemwebprojek/
├── web-statis/                    # Berkas web publik & internal
│   ├── index.html                 # Halaman beranda utama
│   ├── booking.html               # Formulir reservasi servis & cek tiket
│   ├── portofolio.html            # Galeri perbaikan (foto sebelum & sesudah)
│   ├── kontak.html                # Informasi workshop, alamat & jam buka
│   ├── dashboard.html             # Area teknisi: ringkasan status bengkel
│   ├── tiket.html                 # Area teknisi: daftar seluruh tiket
│   ├── tiket-baru.html            # Area teknisi: form input perangkat baru
│   ├── tiket-detail.html          # Area teknisi: diagnosis & checklist pemeriksaan
│   ├── riwayat.html               # Area teknisi: histori servis per pelanggan
│   ├── css/
│   │   ├── style.css              # Master stylesheet (mengimpor modul di bawah)
│   │   ├── base.css               # Font @font-face, variabel warna, CSS reset
│   │   ├── layout.css             # Kerangka, header publik, staff-bar, footer, grid
│   │   ├── components.css         # Tombol, badge, notice, card, form inputs
│   │   ├── beranda.css            # Hero section & trofi slider scroll-snap
│   │   ├── portofolio.css         # Card trofi & komparasi sebelum/sesudah
│   │   ├── booking.css            # Aturan DP, tabs, kalkulasi toleransi, struk
│   │   └── teknisi.css            # Checklist pemeriksaan, status AI, tabel data
│   ├── fonts/                     # Font IBM Plex (woff2 self-hosted)
│   └── img/                       # Aset logo, ikon SVG & gambar portofolio
├── DESIGN.md                      # Pedoman desain, token warna, dan tipografi
├── AUDIT.md                       # Laporan audit aksesibilitas & usability
├── .gitignore                     # Aturan pengabaian berkas sementara / cache
└── README.md                      # Dokumentasi proyek
```

---

## 💻 Cara Menjalankan Proyek

Karena proyek ini menggunakan web statis murni, **tidak diperlukan instalasi dependensi atau konfigurasi server khusus**.

### Opsi 1: Buka Langsung (Tanpa Web Server)
Cukup buka berkas `web-statis/index.html` dengan klik ganda atau menggunakan browser favorit Anda (Chrome, Firefox, Safari, Edge).

### Opsi 2: Menggunakan Local Web Server (Direkomendasikan)
Untuk pengalaman terbaik dalam menguji `@font-face` dan `@import`:

```bash
# Menggunakan Python (bawaan Linux / macOS / Windows):
python3 -m http.server 8000 --directory web-statis

# Atau menggunakan ekstensi VS Code:
# Klik kanan pada 'web-statis/index.html' -> "Open with Live Server"
```
Akses di browser melalui: `http://localhost:8000`

---

## 🎨 Token & Tema Desain

* **Latar Belakang:** `#202020` (Paper / Abu-abu gelap)
* **Permukaan Kartu:** `#2A2A2A` (Surface) & `#181818` (Surface sunken)
* **Teks Utama:** `#F5F5F5` (Ink-900)
* **Aksen Monokrom:** `#FFFFFF` (Signal / Tombol primer & sorotan aktif)
* **Status Badges:** Mengikuti standar indikator visual teknisi (Diterima, Diagnosis, Selesai, dll.)

---

## 📄 Lisensi & Hak Cipta
* Dibuat untuk pemenuhan tugas mata kuliah Pemrograman Web (Pemweb).
* Font IBM Plex berlisensi SIL Open Font License 1.1 (`fonts/LICENSE-IBM-Plex.txt`).
