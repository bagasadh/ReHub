# Developer Guidelines & Context Map — ReHub

Dokumen ini adalah panduan ringkas bagi pengembang dan kontributor untuk menjaga konsistensi arsitektur dan efisiensi struktur proyek.

---

## 🎯 Aturan Utama Proyek

1. **Stack 100% Pure HTML5 & CSS3:**
   * Jangan menambahkan JavaScript (`.js` atau `<script>`) kecuali diminta secara eksplisit oleh pengguna.
   * Tanpa framework (Tailwind, Bootstrap, dll.). Semua styling mengandalkan Vanilla CSS modern.
   * Tanpa build step (Webpack, Vite, npm) agar web dapat langsung dibuka di browser lokal.
2. **Kepatuhan Aksesibilitas (WCAG 2.2 AA):**
   * Pertahankan kontras rasio minimal 4.5:1 untuk teks normal dan 3:1 untuk kontrol UI.
   * Selalu sertakan `alt`, `width`, dan `height` pada elemen `<img>`.
   * Pertahankan indikator `:focus-visible` untuk navigasi keyboard.
3. **Gunakan Design Tokens (CSS Custom Properties):**
   * Hindari menulis *hardcoded* hex code di file CSS modul. Selalu gunakan variabel dari `:root` di `base.css`:
     * Warna latar: `var(--paper)` (#202020), `var(--surface)` (#2A2A2A), `var(--surface-sunken)` (#181818)
     * Teks: `var(--ink-900)` (#F5F5F5), `var(--ink-700)` (#D4D4D4), `var(--ink-500)` (#9E9E9E)
     * Garis & Batas: `var(--line)` (#383838), `var(--line-strong)` (#5A5A5A)
     * Aksen Utama: `var(--signal)` (#FFFFFF)
     * Radius & Font: `var(--radius)`, `var(--radius-lg)`, `var(--font-body)`, `var(--font-mono)`

---

## 🗺️ Peta Berkas & Panduan Navigasi Cepat

Untuk mempercepat proses pencarian dan pemeliharaan kode, selalu targetkan berkas spesifik sesuai tabel berikut:

| Kebutuhan Pengguna / Tugas | Berkas Target | Catatan |
|---|---|---|
| Variabel warna, reset, font global | `web-statis/css/base.css` | Ubah variabel `:root` di sini untuk tema |
| Header, footer, navigasi, layout grid | `web-statis/css/layout.css` | Struktur kerangka bersama |
| Tombol, badge status, kartu, field form | `web-statis/css/components.css` | Komponen UI umum yang dipakai berulang |
| Halaman Beranda (Hero, slide showcase) | `web-statis/css/beranda.css` & `index.html` | Menggunakan CSS scroll-snap |
| Halaman Portofolio (Dinding trofi) | `web-statis/css/portofolio.css` & `portofolio.html` | Foto sebelum/sesudah perbaikan |
| Halaman Booking & Cek Tiket Konsumen | `web-statis/css/booking.css` & `booking.html` | Tab pure CSS, radio DP, struk :target |
| Area Teknisi (Dashboard, Checklist, Tiket) | `web-statis/css/teknisi.css` & `tiket*.html` | Khusus staf bengkel |

---

## 🛠️ Praktik Edit Terbaik
* Gunakan *targeted replacement* (`edit_file`) daripada menulis ulang berkas secara utuh.
* Jaga commit Git tetap rapi menggunakan konvensi *Conventional Commits* (`feat:`, `fix:`, `docs:`, `refactor:`).

