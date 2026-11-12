# DESIGN.md — ReHub

Pedoman desain untuk website bisnis servis laptop, PC, dan HP. Dokumen ini adalah sumber kebenaran untuk keputusan visual. Setiap pilihan di sini punya alasan tertulis dan merujuk ke standar (NN/g 10 Usability Heuristics, WCAG 2.2 AA), bukan selera.

Status (31 Okt 2026): **Fase 1 sampai 5 sudah diterapkan dan diverifikasi.** Yang tersisa hanya mengganti data contoh (lihat bagian 14).

---

## 1. Konsep & Karakter Desain

Situs bisnis servis perangkat lokal (Depok) untuk pelanggan perorangan dan kantor kecil, dengan bahasa visual **"laporan teknisi"**: tinta gelap (#202020), kartu kontras tinggi, dan nomor tiket bergaya mesin mono.

Karakter visual dibangun seimbang: halaman publik dirancang nyaman untuk membaca informasi dan portofolio, sedangkan area teknisi dirancang padat dan efisien untuk kebutuhan input data berulang. Transisi interaktif berjalan halus (150 ms) tanpa animasi dekoratif berlebihan demi performa dan aksesibilitas.

**Siapa penggunanya**
- *Calon pelanggan* (mahasiswa, pekerja, kantor kecil) di HP. Pertanyaan mereka: "Bisa servis ini? Dipercaya? Bagaimana menghubungi?"
- *Teknisi* di PC bengkel. Pekerjaan mereka: mencatat tiket, memeriksa, melaporkan. Sering, berulang, butuh cepat.

**Pembeda bisnis ini:** hasil servis bisa dicek (dicatat, diperiksa bukan ditebak, dilaporkan tertulis). Identitas visual mengangkat itu: bukti ada di depan, janji di belakang.

---

## 2. Prinsip

1. **Bukti di depan janji.** Foto sebelum/sesudah, temuan terkonfirmasi, hasil uji, nomor tiket, dan masa garansi selalu ditampilkan, bukan hanya disebut. *(NN/g #6 Mengenali, bukan mengingat.)*
2. **Navigasi Publik Konsisten.** Menu publik terdiri dari 4 halaman utama dengan urutan tetap: Beranda (`index.html`), Booking Servis (`booking.html`), Portofolio (`portofolio.html`), dan Kontak (`kontak.html`). Setiap menu memiliki halaman tersendiri dengan penanda `aria-current="page"` tanpa anchor lompat yang membingungkan.
3. **Dua mode yang tidak tertukar.** Area publik (`index.html`, `booking.html`, `portofolio.html`, `kontak.html`) dan Area teknisi (`dashboard.html`, `tiket.html`, `tiket-baru.html`, `tiket-detail.html`, `riwayat.html`) punya navigasi dan penanda visual yang jelas berbeda. *(NN/g #2 Kesesuaian dengan dunia nyata.)*
4. **Aturan Booking Konsumen:**
   - **DP Minimal:** Rp50.000 sebagai jaminan slot teknisi (memotong total biaya akhir).
   - **Toleransi Waktu:** Maksimal 1 jam dari jadwal awal yang dipilih.
   - **Kebijakan Hangus:** Jika konsumen tidak hadir dan tidak ada konfirmasi hingga toleransi 1 jam berakhir, DP dianggap hangus.
5. **Terbaca dulu, indah kemudian.** Rata kiri, panjang baris ≤ 66 karakter, kontras tinggi, tidak ada teks yang menumpuk di atas dekorasi. *(WCAG 1.4.3, 1.4.12.)*

---

## 3. Warna (Tema Monokrom Dark #202020)

Palet inti: **abu-abu gelap (#202020) + permukaan kartu (#2A2A2A) + teks putih (#F5F5F5) + aksen monokrom solid (#FFFFFF)**. Semua rasio dihitung dengan rumus WCAG 2.2 AA.

### 3.1 Token inti

| Token | Hex | Peran | Kontras |
|---|---|---|---|
| `--ink-900` | `#F5F5F5` | Teks utama, judul, teks tombol primer | > 15:1 di atas `#202020` |
| `--ink-700` | `#D4D4D4` | Teks sekunder, label menu nav | > 10:1 di atas `#202020` |
| `--ink-500` | `#9E9E9E` | Teks pendukung (meta, hint) | > 4,7:1 di atas `#202020` (≥ 4.5:1 WCAG AA) |
| `--paper` | `#202020` | Latar utama halaman (abu-abu gelap) | — |
| `--surface` | `#2A2A2A` | Kartu, section, panel | — |
| `--surface-sunken` | `#181818` | Kotak isian form, header teknisi | — |
| `--line` | `#383838` | Garis pemisah dekoratif & batas kartu | — |
| `--line-strong` | `#5A5A5A` | Batas kolom isian dan kontrol | > 3:1 |
| `--signal` | `#FFFFFF` | **Aksen Monokrom** (tombol primer, sorotan) | 16,5:1 terhadap `#202020` |
| `--link` | `#F0F0F0` | Tautan & cincin fokus keyboard | > 14:1 |
| `--link-hover` | `#FFFFFF` | Tautan saat hover | > 16:1 |

### 3.2 Logo & Identitas Visual
- **Logo:** Maskot robot teknisi octocat dengan tentakel mekanik, memegang laptop terminal & obeng servis dalam lingkaran putih.
- Menggantikan tanda teks `SU` sebelumnya. Digunakan sebagai logo header di seluruh halaman publik dan area teknisi, serta sebagai `favicon` browser.

### 3.3 Anggaran aksen (Monokrom Putih/Hitam)

Aksen putih solid (`--signal: #FFFFFF`) **hanya** boleh dipakai di:
1. Tombol aksi utama (`.btn-solid`, latar putih dengan teks `#202020`).
2. Bayangan foto hero dan bingkai foto "sesudah".
3. Nomor urut tahapan (`.steps`) dan titik linimasa aktif.

---

## 4. Tipografi

**Pilihan: IBM Plex Sans (teks) + IBM Plex Mono (data).** Self-hosted, lisensi OFL.

Alasan:
- Font sistem berbeda di tiap perangkat (Segoe UI di Windows, Roboto di Android, SF di iPhone), jadi identitas visual tidak konsisten di tempat pelanggan membukanya.
- Plex lahir dari konteks perangkat keras dan rekayasa, cocok dengan karakter bengkel. Keluarga Sans dan Mono-nya dirancang serasi, dan Mono dipakai untuk nomor tiket, nomor seri, dan kode, sehingga data terlihat berbeda dari kalimat.
- Mendukung seluruh karakter Bahasa Indonesia. Terbaca jelas pada ukuran kecil.
- Bukan font "bawaan generik" yang selalu muncul di desain template.

**Pemasangan:** unduh berkas `woff2` subset Latin dari paket `@fontsource/ibm-plex-sans` dan `@fontsource/ibm-plex-mono` (OFL-1.1), simpan di `fonts/`, panggil lewat `@font-face` dengan `font-display: swap`.

| Berkas | Ukuran |
|---|---|
| Plex Sans 400, 500, 600, 700 | ± 22–24 KB masing-masing |
| Plex Mono 400, 500 | ± 15 KB masing-masing |
| **Total** | **± 125 KB** (preload hanya 400 dan 600) |

Cadangan: `"IBM Plex Sans", system-ui, "Segoe UI", Roboto, Arial, sans-serif`.

### Skala (rasio ± 1,2)

| Peran | Ukuran | Berat | Tinggi baris |
|---|---|---|---|
| Display (H1 hero) | `clamp(2.25rem, 1.5rem + 3vw, 3.5rem)` | 700 | 1,1 |
| H1 halaman | `clamp(1.875rem, 1.4rem + 2vw, 2.75rem)` | 700 | 1,15 |
| H2 | `clamp(1.375rem, 1.1rem + 1vw, 1.75rem)` | 600 | 1,2 |
| H3 | 1.125rem | 600 | 1,3 |
| Isi | 1rem (16 px) | 400 | 1,6 |
| Lead | 1.125rem | 400 | 1,6 |
| Meta, hint | 0.875rem (14 px) | 400 | 1,5 |
| Badge | 0.8125rem (13 px) | 600 | 1,4 |

Aturan:
- Judul memakai berat 600–700 dan `letter-spacing: -0.01em` hanya untuk H1 dan H2.
- Panjang baris isi maksimal **66 karakter** (`max-width: 66ch`).
- Tidak ada huruf kapital semua, tidak ada penjarangan huruf berlebihan.
- Angka di tabel dan statistik memakai `font-variant-numeric: tabular-nums`.
- Nomor tiket (`RH-2026-00008`), nomor seri, dan harga memakai Plex Mono.
- Tidak ada teks vertikal atau berputar.
- Teks tidak pernah di bawah 14 px, kecuali badge (13 px, tebal, kontras tinggi).

---

## 5. Tata letak dan jarak

**Satuan jarak (kelipatan 4 px):** 4, 8, 12, 16, 24, 32, 48, 64, 96.

| Konteks | Jarak antar-bagian |
|---|---|
| Halaman publik | 64 px (mobile 48), 96 px antar bagian utama di desktop |
| Area teknisi | 32 px (mobile 24), lebih padat karena dipakai berulang |

- Wadah isi: maks **1120 px**, tepi 16 px (mobile), 24 px (≥ 640), 32 px (≥ 960).
- Titik putus: **640** dan **960 px**. Dirancang mobile-first.
- Perataan: semua teks **rata kiri**. Tidak ada teks isi yang rata tengah.
- Header **tidak sticky**, supaya tidak menutupi fokus keyboard (WCAG 2.4.11).

### 5.1 Struktur informasi

| Area | Halaman | Navigasi |
|---|---|---|
| **Publik** | `index`, `portofolio` (+ anchor Kontak) | Beranda · Portofolio · Kontak |
| **Area teknisi** | `dashboard`, `tiket`, `tiket-baru`, `tiket-detail`, `riwayat` | Dashboard · Tiket · Riwayat · ← Situs publik |

- Area teknisi punya bar atas **gelap** dengan label teks "Area teknisi", dan `<meta name="robots" content="noindex">`.
- Tautan ke Area teknisi di footer publik berukuran kecil, bukan di navigasi utama.
- Catatan: saat backend dibuat, Area teknisi wajib diproteksi login. Menyembunyikan tautan bukan keamanan.

### 5.2 Wireframe

**Beranda (publik)**

```
┌──────────────────────────────────────────────────────────┐
│ [SU] ReHub              Beranda Portofolio Kontak │  header terang
├──────────────────────────────────────────────────────────┤
│ ┌── HERO (panel tinta) ─────────────────────────────────┐│
│ │ H1 Bengkel servis laptop,     ┌───────────────┐       ││
│ │ PC, dan HP. Setiap perbaikan  │ foto sesudah  │       ││  foto + bayangan kuning
│ │ dicatat, dilaporkan tertulis. └───────────────┘▒      ││
│ │ Depok · Sen–Sab 09.00–18.00   Trofi 01 · Laptop       ││
│ │ [Lihat hasil servis] Kontak   Temuan · Hasil uji      ││
│ │                               ‹ sebelumnya  berikutnya ›│
│ └───────────────────────────────────────────────────────┘│
│                                                          │
│ Kenapa hasilnya bisa dicek                               │
│ ■1 Dicatat saat masuk  ■2 Diperiksa, bukan ditebak ■3 ... │  langkah berurutan
│                                                          │
│ Kontak & lokasi          [Chat WhatsApp]                 │
│ alamat · jam buka        Instagram                       │
├──────────────────────────────────────────────────────────┤
│ © 2026 ... · Area teknisi                                │
└──────────────────────────────────────────────────────────┘
```

Alasannya: layar pertama menjawab "apa, di mana, bagaimana menghubungi" **dan** langsung memberi bukti. Teks H1 diambil dari deskripsi yang sudah ada di situs, bukan klaim baru.

**Dashboard (Area teknisi)**

```
Dashboard                                   [+ Tiket baru]
┌ Perlu ditinjau ─────────────────────────────────────────┐   ← tindakan dulu
│ Kemungkinan kasus berulang: RH-2026-00008 ...            │
└─────────────────────────────────────────────────────────┘
9 total tiket · 3 aktif · 6 kasus di Repair Memory           ← baris ringkas, tanpa kartu
[Diterima 2] [Diagnosis 1] [Menunggu 0] ... (chip tautan filter)
Tiket terbaru  (tabel)
Status sistem: Database lokal aktif & aturan diagnosis siap       ← teks kecil, bukan "metrik"
```

---

## 6. Bentuk, bayangan, gerak

| Aspek | Aturan | Alasan |
|---|---|---|
| Radius | **4 px** (tombol, kolom isian, badge kotak), **8 px** (kartu, panel), **pil** (badge status saja) | Tiga tingkat membuat "ini kontrol, ini wadah, ini penanda status" mudah dikenali |
| Garis | 1 px `--line` untuk wadah, 1 px `--line-strong` untuk kontrol | Struktur lewat garis, bukan bayangan |
| Bayangan | **Tidak ada**, kecuali satu: bayangan keras `8px 8px 0 --signal` pada foto hero (mobile 5 px) | Bayangan = penanda ketinggian. Satu elemen yang diangkat menjadi pusat perhatian |
| Gradien, blur, glow | Tidak dipakai | Tidak membawa informasi pada situs ini |
| Gerak | Transisi warna 150 ms pada hover/fokus. Gulir halus hanya bila `prefers-reduced-motion: no-preference`. Tanpa slide otomatis. | NN/g #1 dan WCAG 2.2.2, 2.3.3 |

---

## 7. Komponen

### Tombol
- Tinggi minimum **44 px**, radius 4, border 2 px.
- **Utama:** latar `--signal`, teks `--ink-900`. Hover: latar `--ink-900`, teks `--signal`. **Satu tombol utama per area.**
- **Sekunder:** garis `--ink-900`, latar transparan. Hover: latar tinta, teks putih.
- **Tautan-tombol:** teks `--link` bergaris bawah.
- Pada panel gelap: sekunder putih, tautan `--signal`.
- **Nonaktif:** atribut `disabled`, latar `#E3E8EB`, teks `--ink-500`, **selalu dengan teks penjelas** ("Menunggu verifikasi fisik"). Tidak ada tombol yang tampak aktif tapi tidak berfungsi. *(NN/g #1)*
- Nama aksi konsisten: tombol "Simpan status" menghasilkan pesan "Status disimpan".

### Navigasi
- Item aktif: `aria-current="page"`, teks tebal 600 + garis bawah 3 px `--ink-900` (header terang) atau latar putih tipis (bar gelap). Bukan kuning.
- Target ≥ 44 px. Tautan WhatsApp di header memakai gaya tombol utama.

### Badge status
Pil, 13 px/600, titik 8 px di depan memakai `currentColor`, warna sesuai tabel bagian 3.2. Selalu teks + titik.

### Kartu
Latar putih, garis 1 px `--line`, radius 8, padding 16 (mobile) / 24 px. Tanpa bayangan. **Hanya dipakai di Area teknisi dan entri portofolio**, tempat kartu mengelompokkan data. Bagian publik (langkah, kontak) tidak dibungkus kartu.

### Tabel
Kepala latar `#E4EAED` + garis bawah 2 px tinta. Kolom nomor tiket Plex Mono. Dibungkus `overflow-x: auto` dengan `position: relative`. Wajib memiliki `<caption>` dan `scope`. Baris bisa diberi hover tipis.

### Kolom isian
Label di atas, tinggi ≥ 44 px, garis `--line-strong`, radius 4. Fokus: cincin 3 px `--link` dengan offset 2 px. Teks petunjuk di bawah kolom, `aria-describedby`. Galat tampil di bawah kolom dengan teks "Galat:" + penjelasan cara memperbaiki, `aria-invalid="true"`, warna `#A31D1D`. Bidang opsional ditandai "(opsional)". *(NN/g #5, #9; WCAG 3.3.1, 3.3.3.)*

### Pemberitahuan
- **Peringatan:** latar `#FFF8DC`, garis kiri 6 px berwarna ambar `#B7791F` (bukan kuning aksen), dan judul teks "Perhatian". Garis kiri dipakai di sini karena menandai **status nyata**, dan statusnya juga ditulis dengan kata-kata, jadi tidak bergantung pada warna.
- **Info:** latar putih, garis `--line`.
- `role="note"` untuk statis, `role="status"` untuk pesan hasil aksi.

### Kotak estimasi gejala kerusakan
Garis putus-putus 2 px `--line-strong` + label "Estimasi Gejala Awal · oleh pelanggan". Garis putus-putus menandakan temuan awal yang perlu diverifikasi fisik oleh teknisi.

### Entri portofolio
Dua foto berdampingan (Sebelum / Sesudah) dengan keterangan teks. Foto sesudah diberi bingkai **tinta** 3 px (bukan kuning). Di bawahnya daftar fakta (keluhan awal, temuan, tindakan, hasil uji akhir). Nomor tiket dalam Plex Mono.

### Hero slide
Panel `--ink-900`, radius 8. Foto sesudah dengan bayangan keras kuning. Angka "01" tidak lagi memakai garis raksasa yang menimpa judul: dipindahkan ke label kecil di atas foto ("Trofi 01"). Navigasi sebelumnya/berikutnya tetap berupa tautan jangkar tanpa JavaScript.

### Linimasa (riwayat)
Garis tinta 3 px, titik tinta berisi putih. Nomor tiket Plex Mono.

---

## 8. Aksesibilitas (WCAG 2.2 AA): aturan tetap

Berlaku untuk setiap halaman, dicek setiap fase:

- Kontras teks ≥ 4,5:1, teks besar dan komponen UI ≥ 3:1.
- Target sentuh ≥ 44 px (minimum mutlak WCAG 2.5.8: 24 px).
- Fokus keyboard terlihat, 3 px, tidak tertutup elemen lain (2.4.7, 2.4.11).
- Reflow: tanpa gulir horizontal halaman pada **320 px** (1.4.10). Tabel boleh menggulir di dalam wadahnya.
- Nama aksesibel memuat teks yang terlihat (2.5.3). Tautan logo diberi nama "SU, ReHub, ke beranda" atau memakai wordmark lengkap.
- Bahasa bagian: `lang="en"` untuk teks Inggris di halaman Indonesia (3.1.2).
- Satu `<h1>` terlihat per halaman, urutan heading tidak melompat.
- Skip link, landmark (`header`, `nav`, `main`, `footer`), `aria-current`.
- Bantuan konsisten: menu "Kontak" berada di lokasi yang sama pada setiap halaman publik dan selalu menuju bagian Kontak (3.2.6).
- Informasi tidak hanya lewat warna (1.4.1).
- Tidak ada konten yang bergerak sendiri. Hormati `prefers-reduced-motion`.
- Form pelanggan publik (jika ada nanti) memakai `autocomplete` yang benar (1.3.5). Form yang diisi teknisi tentang pelanggan memakai `autocomplete="off"`.

---

## 9. Konten dan suara

- Bahasa Indonesia sehari-hari yang jelas. Kalimat aktif. Huruf kapital gaya kalimat.
- Nama aksi spesifik: "Chat WhatsApp", "Lihat hasil servis", "Simpan status", bukan "Kirim" atau "Klik di sini".
- Tidak ada emoji, tidak ada klaim yang tidak bisa dibuktikan ("terbaik", "tercepat", "100% puas").
- Teks galat menjelaskan apa yang salah dan cara memperbaikinya.
- **Data contoh harus berlabel.** Foto placeholder berlabel "Foto contoh" (sudah). Jangan menampilkan angka, nama, atau testimoni rekaan seolah-olah nyata.
- Jangan membuat bagian karena "situs lain punya". Tidak ada testimoni, logo pelanggan, atau harga bila datanya belum ada.

---

## 10. Pantangan (dan alasannya)

| Jangan | Alasan |
|---|---|
| Menambah warna aksen kedua atau gradien | Palet sengaja sempit (2–3 inti + 1 aksen) supaya kuning tetap bermakna |
| Garis kiri berwarna sebagai hiasan | Hanya untuk status nyata |
| Teks vertikal atau berputar | Lebih lambat dibaca, target klik sempit |
| Bagian hanya karena "template punya" (testimoni, logo, FAQ) | Tidak ada isinya, jadi tidak ada gunanya |
| Tombol yang tampak aktif tapi tidak melakukan apa-apa | Merusak kepercayaan (NN/g #1) |
| Tautan `href="#"` pada rilis | Janji rusak |
| Slide yang berputar sendiri | WCAG 2.2.2 |
| Menyederhanakan sampai kehilangan karakter | Karakter situs: tinta, kuning, mono, foto bersabuk bayangan |

---

## 11. Struktur berkas dan pemeliharaan

```
web-statis/
├── index.html … riwayat.html   (7 halaman, struktur sama)
├── css/style.css                (satu berkas, dibagi bagian bernomor)
├── fonts/                       (woff2 Plex, ± 125 KB)
└── img/
```

- Teknologi tetap **HTML + CSS statis**, tanpa framework dan tanpa JavaScript.
- `style.css` disusun: 1 Token (`:root`) · 2 Dasar · 3 Tata letak · 4 Komponen · 5 Halaman · 6 Responsif. Semua warna, font, dan jarak **hanya** lewat variabel CSS.
- Nama kelas yang sudah ada dipertahankan sebisa mungkin, supaya HTML tidak perlu ditulis ulang.
- Header dan footer disalin di tiap halaman, jadi mengubahnya berarti mengedit 7 berkas. Itu wajar untuk situs statis. Daftar ini mencatat posisinya.

---

## 12. Rencana implementasi (bertahap, setiap fase bisa ditinjau)

| Fase | Isi | Risiko | Perlu persetujuan |
|---|---|---|---|
| **1. Perbaikan standar** (selesai) | Tingkat 1 audit (nama logo, reflow 320 px, `lang="en"`, angka hero) + tombol nonaktif dengan penjelasan + `min()` pada grid | Rendah | Tidak, kecil. Bisa langsung. |
| **2. Fondasi desain** (selesai) | Token baru, font Plex self-hosted, skala radius, anggaran aksen, sistem tombol dan badge | Sedang (tampilan seluruh situs berubah halus) | **Ya** |
| **3. Struktur** (selesai) | Header publik vs Area teknisi, hero beranda baru, footer, tombol WhatsApp | Sedang–tinggi (navigasi seluruh halaman) | **Ya** |
| **4. Area teknisi** (selesai) | Hierarki dashboard, chip status, tanda hasil checklist, umpan balik form | Sedang | **Ya** |
| **5. QA akhir** (selesai) | axe (0 pelanggaran), reflow 320, tes keyboard, kontras, screenshot 3 ukuran | Rendah | Tidak |

Setiap fase diakhiri dengan: axe-core 0 pelanggaran, tidak ada gulir horizontal di 320 px, semua tautan valid, dan screenshot desktop dan tampilan mobile untuk proses peninjauan visual.

---

## 13. Daftar periksa mutu (dijalankan tiap fase)

- [ ] Palet hanya dari token. Kuning hanya di 3 tempat.
- [ ] Tidak ada gradien, blur, glow, bayangan selain satu di foto hero.
- [ ] Hanya tiga tingkat radius.
- [ ] Setiap pasangan warna teks dihitung ≥ 4,5:1.
- [ ] Semua halaman lulus axe-core (WCAG 2.2 AA) di 1280, 390, dan 320 px.
- [ ] Fokus keyboard terlihat di setiap kontrol.
- [ ] Satu `<h1>` terlihat per halaman.
- [ ] Setiap tombol berfungsi atau jelas bertanda nonaktif beserta alasannya.
- [ ] Tidak ada `href="#"` pada tautan yang sudah punya tujuan.
- [ ] Data contoh berlabel.


---

## 14. Catatan Implementasi & Penyesuaian Data Nyata

**Keputusan yang berbeda dari wireframe awal**
- Hero beranda memakai blok pengantar di atas latar terang (judul, kalimat pendukung, tombol), lalu panel gelap "Contoh hasil servis" di bawahnya. Hasilnya lebih mudah dibaca di HP daripada dua kolom dalam satu panel.
- **Tombol WhatsApp hanya satu**, di bagian Kontak beranda bersama Instagram dan alamat. Header, hero, footer, dan akhir portofolio tidak memakai tombol WhatsApp. Hero dan akhir portofolio hanya mengarahkan ke bagian Kontak.
- Halaman Area teknisi mendapat catatan "Prototipe statis" di bawah judul. Hapus catatan itu (class `proto-note`) setelah penyimpanan data benar-benar berfungsi.

**Data contoh yang masih harus diganti (cari teks ini di semua file HTML)**

| Apa | Sekarang | Lokasi |
|---|---|---|
| Nomor WhatsApp | `0812-3456-789`, tautan `https://wa.me/628123456789` | Hanya `index.html`, bagian Kontak (cari `wa.me`) |
| Instagram | `https://www.instagram.com/` (ada komentar `TODO`) | Hanya `index.html`, bagian Kontak |
| Alamat, jam buka | "Bengkel Contoh ReHub, Jl. Contoh Raya No. 1, Depok" | `index.html` (hero-meta dan bagian Kontak) |
| Foto portofolio | Gambar SVG "FOTO CONTOH" di `img/portofolio/` | `index.html`, `portofolio.html`. Ganti juga teks `alt` yang berakhiran "(foto contoh)" |

Aturan nomor WhatsApp: tulis tanpa angka 0 di depan dan awali 62, misalnya `0812-3456-789` menjadi `628123456789` di tautan `wa.me`.

**Catatan pengembangan lanjutan:** Pada fase implementasi full-stack di masa mendatang, area teknisi dapat dihubungkan dengan otentikasi login multi-level (Admin & Teknisi) dan basis data backend terpusat.
