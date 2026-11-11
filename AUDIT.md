# Audit ReHub

Versi yang diaudit: `rehub-css.zip` (7 halaman HTML + `css/style.css` 812 baris).
Tanggal audit: 31 Okt 2026.

## Cara audit

- **Terukur:** axe-core 4.14 (aturan WCAG 2.0/2.1/2.2 level A dan AA + best practice) pada 7 halaman × 3 lebar layar (1280, 390, 320 px). Rasio kontras dihitung dengan rumus WCAG, bukan ditebak. Ukuran target sentuh diukur di browser.
- **Pertimbangan ahli:** 10 Usability Heuristics Nielsen Norman Group untuk alur dan isi halaman, serta prinsip hierarki visual, tipografi, dan konsistensi.
- **Pembanding pola template:** daftar pola template generik dan anti-pattern web modern, dipakai sebagai daftar periksa evaluasi teknis, bukan selera subjektif.

Setiap temuan diberi salah satu dari empat tingkat, supaya jelas mana yang wajib dan mana yang pilihan:

| Tingkat | Arti |
|---|---|
| **1. Pelanggaran standar** | Gagal terhadap WCAG 2.2 AA atau cacat yang bisa diukur. Wajib diperbaiki. |
| **2. Masalah usability nyata** | Melanggar heuristik NN/g dan merugikan calon pelanggan atau teknisi. Sangat disarankan. |
| **3. Penyempurnaan identitas** | Bukan kesalahan. Dilakukan demi konsistensi dan karakter bisnis. |
| **4. Preferensi (sengaja tidak diubah)** | Bagian yang sudah bagus atau murni selera. Dibiarkan. |

---

## Status perbaikan (diperbarui 31 Okt 2026)

Semua temuan Tingkat 1 dan 2 sudah dikerjakan dan diukur ulang: **axe-core 0 pelanggaran** pada 7 halaman × 3 ukuran layar (1280, 390, 320 px), tidak ada butir "perlu dicek manual", semua kontrol punya indikator fokus, dan tidak ada tautan atau id yang rusak.

| Temuan | Status |
|---|---|
| 1.1 Nama tautan logo | Selesai: logo kini tautan bernama "SU ReHub" |
| 1.2 Reflow 320 px | Selesai: semua grid memakai batas lebar aman |
| 1.3 Bahasa bagian | Selesai: status diterjemahkan, tagline lama dihapus bersama sidebar |
| 1.4 Angka menimpa judul | Selesai: angka dihapus dari hero |
| 2.1 Publik dan teknisi bercampur | Selesai: header publik dan bar "Area teknisi" dipisah, halaman teknisi `noindex` |
| 2.2 Kontak tersembunyi | Selesai: semua kontak (WhatsApp, Instagram, alamat, jam buka) dikumpulkan di bagian Kontak beranda, dan menu "Kontak" selalu terlihat di header |
| 2.3 Beranda tanpa pernyataan bisnis | Selesai: `<h1>` terlihat + kalimat pendukung + tombol |
| 2.4 Status berbahasa Inggris | Selesai: label Indonesia, nilai internal tetap kode |
| 2.5 Kontrol tidak berfungsi | Sebagian: tombol AI dinonaktifkan dengan penjelasan, halaman teknisi diberi catatan prototipe. Penyimpanan form menunggu backend. |
| 2.6 Teks vertikal | Selesai: sidebar dihapus |
| 2.7 Hierarki dashboard | Selesai: "Perlu ditinjau" di atas, ringkasan satu baris, status jadi chip, status sistem jadi catatan kecil |
| 2.8 Umpan balik form | Selesai: petunjuk wajib-diisi dan pesan galat per kolom (tanpa JavaScript) |
| 3.1 sampai 3.6 Identitas | Selesai: kuning hanya di logo, tombol utama, dan bayangan foto hero. Font Plex, tiga tingkat radius, hasil checklist berwarna. |

Dokumen di bawah ini adalah audit awal sebelum perbaikan, dipertahankan sebagai catatan.

---

## Ringkasan

Fondasi frontend-nya **sudah baik**. Dari 7 halaman × 3 lebar layar, axe hanya menemukan **2 aturan yang dilanggar**. Struktur HTML semantik, skip link, label form, tabel dengan `caption` dan `scope`, fokus keyboard, `prefers-reduced-motion`, dan seluruh kontras teks sudah lulus.

Masalah terbesar **bukan di accessibility, tapi di arah produk**: situs ini mencampur halaman untuk calon pelanggan dengan halaman alat kerja teknisi dalam satu navigasi, dan jalur kontak utama (WhatsApp) tersembunyi serta belum berfungsi. Untuk website bisnis sungguhan, ini yang paling menentukan.

---

## Tingkat 1: Pelanggaran standar (wajib)

| # | Temuan | Standar | Bukti | Perbaikan |
|---|---|---|---|---|
| 1.1 | Tautan logo `SU` punya `aria-label="ReHub, ke beranda"` yang **tidak memuat teks yang terlihat ("SU")**. Pengguna pembaca suara dan pengguna kontrol suara ("klik SU") tidak bisa menyebut tautannya. | WCAG 2.5.3 Label in Name (A) | axe `label-content-name-mismatch`, 7 halaman, `.rail-brand` | Nama aksesibel dimulai dengan teks yang terlihat, atau logo diganti wordmark lengkap. |
| 1.2 | Di layar 320 px, halaman `tiket-detail` **melebar 16 px ke samping**. Penyebab: `.two-col` memakai `minmax(20rem, 1fr)`, sedangkan area isi di 320 px hanya 288 px. | WCAG 1.4.10 Reflow (AA) | Diukur: `.section.card` selesai di x=336 pada viewport 320 | `minmax(min(20rem, 100%), 1fr)`. |
| 1.3 | Teks berbahasa Inggris di halaman `lang="id"` **tanpa `lang="en"`**: sekitar 25 badge status ("Received", "Waiting for Approval", "Returned to Customer", dll.) dan tagline "Every Repair Becomes Knowledge" di tiap halaman. Pembaca suara akan melafalkannya dengan aksen Indonesia. axe tidak memeriksa ini. | WCAG 3.1.2 Language of Parts (AA) | Pemeriksaan manual pada kode | Beri `lang="en"` pada teks tersebut, atau terjemahkan (lihat 2.4). |
| 1.4 | Angka raksasa `01` (garis tipis, kontras 1,9:1) **menimpa judul** slide beranda. Teks judul tetap lulus kontras, tapi axe menandainya "tidak bisa ditentukan" dan secara visual judul jadi lebih sulit dibaca. | WCAG 1.4.3 (perlu tinjauan manual) | axe `incomplete` pada `#t1 > .slide-body > h2`; terlihat jelas di screenshot | Pindahkan angka ke area yang tidak berpotongan dengan teks. |

---

## Tingkat 2: Masalah usability nyata

| # | Temuan | Heuristik NN/g | Dampak |
|---|---|---|---|
| 2.1 | **Halaman publik dan alat teknisi bercampur di satu navigasi.** Calon pelanggan melihat "Dashboard, Tiket, Riwayat" yang berisi nama dan data pelanggan lain (Budi Santoso, CV Maju Jaya). Itu juga masalah privasi bila situs dipublikasikan. | #2 Kesesuaian dengan dunia nyata, #8 Desain minimalis | Pelanggan bingung memilih menu. Data pelanggan terlihat publik. |
| 2.2 | **Jalur kontak utama tersembunyi dan belum berfungsi.** WhatsApp hanya berupa tautan vertikal kecil (33×79 px) di sidebar dengan `href="#"`. Untuk bisnis servis, mengontak bengkel adalah tujuan utama pengunjung. | #7 Fleksibilitas dan efisiensi, #1 Visibilitas | Pengunjung yang siap datang tidak punya tombol jelas untuk menghubungi. |
| 2.3 | **Beranda tidak menyatakan apa bisnisnya.** `<h1>` sengaja disembunyikan (`sr-only`), dan layar pertama langsung menampilkan studi kasus tanpa kalimat "kami servis apa, di mana, bagaimana menghubungi". Studi kasusnya kuat sebagai bukti, tapi bukti butuh konteks. | #6 Mengenali, bukan mengingat | Pengunjung baru harus menebak. |
| 2.4 | **Istilah status berbahasa Inggris** ("Waiting for Approval", "Returned to Customer") di antarmuka berbahasa Indonesia, sementara seluruh teks lain Indonesia. | #2 Kesesuaian dengan dunia nyata | Teknisi dan pelanggan Indonesia harus menerjemahkan di kepala. *(Bergantung pada pertanyaan di bagian akhir.)* |
| 2.5 | **Kontrol yang tampak aktif tapi tidak melakukan apa-apa:** "Analisis dengan AI", "Konfirmasi & simpan", form `POST` ke halaman statis, filter tiket yang tidak memfilter, 9 tautan tiket yang semuanya membuka tiket 00008. | #1 Visibilitas status sistem, #5 Pencegahan kesalahan | Pengguna menekan, tidak ada yang terjadi, tidak ada penjelasan. |
| 2.6 | **Teks vertikal** (tagline berputar, tautan sidebar `writing-mode: vertical-rl`) lebih lambat dibaca dan sempit sebagai target klik. Ini lolos ukuran minimum WCAG 2.5.8 (24 px), tapi buruk untuk pemindaian. | #6 Mengenali, bukan mengingat | Navigasi sekunder sulit ditemukan di HP maupun desktop. |
| 2.7 | **Hierarki dashboard terbalik.** Satu-satunya hal yang butuh tindakan teknisi ("Kemungkinan kasus berulang") ada di urutan ketiga, di bawah dua baris kartu angka yang sama bentuknya. Kartu "Aturan lokal / Mode AI belum dikonfigurasi" adalah status sistem, bukan metrik. | #1 Visibilitas, #8 Desain minimalis | Teknisi membaca angka dulu, tugas belakangan. |
| 2.8 | **Form tanpa umpan balik:** tidak ada penanda wajib-diisi yang terlihat (hanya atribut `required`), tidak ada pesan galat sendiri, tidak ada konfirmasi sesudah kirim. | #5 Pencegahan kesalahan, #9 Pulih dari galat | Pengguna baru tahu salah saat browser menampilkan balon bawaan. |

---

## Tingkat 3: Penyempurnaan identitas

| # | Temuan | Alasan |
|---|---|---|
| 3.1 | **Aksen kuning dipakai terlalu luas:** 19 kemunculan di CSS (logo, tombol, garis navigasi, garis kiri kartu, nomor langkah, titik linimasa, garis atas kartu statistik, bayangan foto, angka raksasa). Aksen yang ada di mana-mana berhenti menjadi aksen. Kuning di atas latar terang juga hanya 1,6:1, jadi tak bisa dipakai sebagai petunjuk satu-satunya. | Batasi kuning pada tombol utama, logo, dan satu momen di hero. |
| 3.2 | **Font tergantung sistem pengguna** (`Bahnschrift` hanya ada di Windows, `system-ui` jadi Segoe UI / SF / Roboto). Identitas visual berbeda di tiap perangkat, padahal sasaran utamanya pemilik HP Android dan laptop Windows. | Font self-hosted memberi hasil sama di mana pun (lihat DESIGN.md). |
| 3.3 | **Skala radius tidak sistematis:** 3, 4, 6, 8 px dan pil bercampur. | Tiga tingkat saja: 4 px, 8 px, pil (khusus badge). |
| 3.4 | **Garis kiri dekoratif** pada `address` (4 px kuning) tidak membawa informasi. Garis kiri pada `.notice.warn` **dipertahankan** karena menandai status peringatan. | Dekorasi harus membawa makna atau dibuang. |
| 3.5 | **Hasil pemeriksaan (lulus / gagal / tidak relevan)** adalah inti nilai situs ("bisa dicek"), tapi tampil sebagai `<select>` polos tanpa penanda visual. | Beri tanda status berwarna + ikon teks yang konsisten dengan badge. |
| 3.6 | **Nama kelas CSS campur** (`btn-solid` kuning tapi `btn-outline` hover gelap, dua logika berbeda). | Dirapikan menjadi satu sistem tombol. |

---

## Tingkat 4: Preferensi dan sengaja tidak diubah

Dipertahankan karena sudah benar atau murni selera:

- Panel hero gelap dengan foto berbingkai bayangan keras kuning. Ini sudah menjadi ciri khas yang bukan template generik (satu-satunya bayangan di situs).
- Kartu putih di halaman data (tiket, dashboard, detail). Di sana kartu berfungsi mengelompokkan informasi, bukan hiasan.
- Sudut membulat kecil, warna tinta gelap + kertas dingin, nomor tiket dengan font mono.
- Tidak ada mode gelap. Pelanggan servis tidak membutuhkannya, jadi tidak ditambahkan.
- Tidak ada animasi dekoratif. Satu-satunya gerakan adalah gulir halus saat pindah slide, dan itu menghormati `prefers-reduced-motion`.
- Tabel horizontal scroll di HP: diizinkan WCAG sebagai pengecualian untuk data tabular. Hanya dipertimbangkan nanti bila teknisi sering memakai HP.
- Slide beranda berbasis `scroll-snap` tanpa JavaScript: sederhana, tahan banting, dan tombol sebelumnya/berikutnya sudah ada.

**Sengaja tidak ditambahkan** karena tidak ada kontennya: bagian testimoni, logo pelanggan, tabel harga tiga kolom, bento grid, animasi masuk, FAQ, chatbot.

---

## Hal yang tidak bisa diperbaiki lewat desain (kendala konten)

1. **Semua foto portofolio adalah placeholder** "FOTO CONTOH". Foto sebelum/sesudah adalah elemen kepercayaan paling kuat bagi situs servis. Desain akan siap, tapi kamu perlu foto asli.
2. **Tautan WhatsApp dan Instagram masih `#`**, dan alamat serta nomor telepon masih fiktif.
3. **Alt teks foto** bertuliskan "(foto contoh)" dan harus diganti saat foto asli dipasang.

---

## Hasil pengukuran yang lulus

| Pemeriksaan | Hasil |
|---|---|
| Kontras teks (semua pasangan warna teks dihitung dengan rumus WCAG) | Semua lulus 4,5:1 (terendah 5,85:1) |
| Kontras batas kolom isian | 3,39:1 di atas putih (lulus 3:1) |
| Ukuran target sentuh | Semua ≥ 33×37 px (minimum WCAG 24 px) |
| Judul halaman unik, `lang="id"`, skip link | Lulus |
| Urutan heading, satu `<h1>` per halaman | Lulus |
| Fokus keyboard terlihat | Lulus |
| Link yang rusak, id ganda, gambar hilang | Tidak ada |
