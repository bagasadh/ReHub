/**
 * ReHub — Storage Management (Client-Side Storage)
 * Modul helper untuk mengelola penyimpanan tiket di localStorage.
 * Termasuk mesin diagnosis mandiri AI untuk konsumen.
 */

const REHUB_STORAGE_KEY = 'rehub_tickets_data';

const SEED_TICKETS = [
  {
    id: 'RH-2026-BOK01',
    nama: 'Rian Pratama',
    telepon: '0812-3456-7890',
    email: 'rian@example.com',
    kategori: 'Laptop',
    perangkat: 'Laptop Asus ROG G513',
    merek: 'Asus',
    model: 'ROG G513',
    serial: 'ROG-513-2026',
    keluhan: 'Overheat & mati mendadak saat render video. Booking jam 14:00 WIB (Batas toleransi 15:00, DP Rp50.000).',
    tanggal: '2026-11-03',
    jam: '14:00',
    toleransi: '15:00 WIB',
    dp: 50000,
    metodeBayar: 'QRIS',
    status: 'diagnosis',
    statusLabel: 'Booking Online',
    masuk: 'Hari ini',
    masukIso: '2026-11-03',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 150.000',
    biayaDisetujui: 'Belum diisi',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: {
      waktu: '13:45 WIB, 3 Nov 2026',
      penyebabUtama: 'Sirkulasi Termal Tersumbat & Pasta Pendingin Kering',
      detailPenyebab: [
        'Thermal compound (pasta pendingin) di atas prosesor CPU/GPU sudah mengering',
        'Sirip radiator exhaust kipas tertutup gumpalan debu padat',
        'Mekanisme proteksi BIOS mematikan unit darurat untuk cegah kerusakan chip'
      ],
      tingkatKeparahan: 'Ringan – Sedang (Waspada jika dibiarkan)',
      estimasiRentang: 'Rp 100.000 – Rp 175.000 (Deep cleaning sirkulasi & re-pasting premium)',
      saranKonsumen: [
        'Hindari penggunaan laptop di atas kasur, karpet, atau bantal yang menyumbat ventilasi',
        'Jangan memaksakan rendering video atau gaming berat sebelum pendinginan dibersihkan',
        'Simpan pekerjaan Anda segera jika suhu kipas mulai terdengar menderu keras'
      ]
    }
  },
  {
    id: 'RH-2026-00009',
    nama: 'Siti Rahma',
    telepon: '0813-9876-5432',
    email: 'siti@example.com',
    kategori: 'Laptop',
    perangkat: 'Laptop Asus VivoBook 14',
    merek: 'Asus',
    model: 'VivoBook 14',
    serial: 'ASU-VB14-099',
    keluhan: 'Beberapa tombol keyboard tidak berfungsi.',
    tanggal: '2026-10-20',
    jam: '10:00',
    toleransi: '11:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'received',
    statusLabel: 'Diterima',
    masuk: '20 Okt 2026',
    masukIso: '2026-10-20',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 220.000',
    biayaDisetujui: 'Rp 220.000',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  },
  {
    id: 'RH-2026-00008',
    nama: 'Budi Santoso',
    telepon: '0811-2233-4455',
    email: 'budi@example.com',
    kategori: 'Laptop',
    perangkat: 'Laptop Lenovo IdeaPad 3',
    merek: 'Lenovo',
    model: 'IdeaPad 3',
    serial: 'LNV-DEMO-001',
    keluhan: 'Laptop hidup tapi layar hitam lagi, kipas berputar.',
    tanggal: '2026-10-17',
    jam: '13:00',
    toleransi: '14:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'diagnosis',
    statusLabel: 'Diagnosis',
    masuk: '17 Okt 2026',
    masukIso: '2026-10-17',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Belum diisi',
    biayaDisetujui: 'Belum diisi',
    isRepeatCase: true,
    repeatCaseId: 'RH-2026-00001',
    aiDiagnosis: {
      waktu: '12:30 WIB, 17 Okt 2026',
      penyebabUtama: 'Gangguan Output Visual / Modul RAM / Fleksibel LCD',
      detailPenyebab: [
        'Modul RAM mengalami oksidasi pin kontak atau longgar dari soket (gagal POST)',
        'Kabel fleksibel display (eDP) aus akibat buka-tutup engsel layar berulang',
        'Panel LCD mengalami malfungsi sirkuit backlight'
      ],
      tingkatKeparahan: 'Sedang',
      estimasiRentang: 'Rp 75.000 – Rp 350.000 (Jasa pasang/RAM s/d modul LCD jika rusak)',
      saranKonsumen: [
        'Jangan menekan panel layar secara berlebihan',
        'Bawa adaptor charger asli saat datang ke bengkel',
        'Jika punya monitor atau TV di rumah, coba hubungkan kabel HDMI untuk tes apakah mesin menyala'
      ]
    }
  },
  {
    id: 'RH-2026-00007',
    nama: 'CV Maju Jaya',
    telepon: '0815-4433-2211',
    email: 'kontak@majujaya.co.id',
    kategori: 'Laptop',
    perangkat: 'Laptop Lenovo ThinkPad E14',
    merek: 'Lenovo',
    model: 'ThinkPad E14',
    serial: 'TP-E14-0021',
    keluhan: 'Layar hitam saat dinyalakan, lampu indikator menyala.',
    tanggal: '2026-10-12',
    jam: '09:00',
    toleransi: '10:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'received',
    statusLabel: 'Diterima',
    masuk: '12 Okt 2026',
    masukIso: '2026-10-12',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 180.000',
    biayaDisetujui: 'Belum diisi',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  },
  {
    id: 'RH-2026-00006',
    nama: 'Rizky Ramadhan',
    telepon: '0818-7766-5544',
    email: 'rizky@example.com',
    kategori: 'HP',
    perangkat: 'HP Xiaomi Redmi Note 10',
    merek: 'Xiaomi',
    model: 'Redmi Note 10',
    serial: 'MI-RN10-994',
    keluhan: 'Baterai cepat habis dan HP sering mati sendiri.',
    tanggal: '2026-09-22',
    jam: '11:00',
    toleransi: '12:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'returned',
    statusLabel: 'Sudah diambil',
    masuk: '22 Sep 2026',
    masukIso: '2026-09-22',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 160.000',
    biayaDisetujui: 'Rp 160.000',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  },
  {
    id: 'RH-2026-00005',
    nama: 'Dewi Lestari',
    telepon: '0817-6655-4433',
    email: 'dewi@example.com',
    kategori: 'HP',
    perangkat: 'HP Samsung Galaxy A12',
    merek: 'Samsung',
    model: 'Galaxy A12',
    serial: 'SM-A12-4410',
    keluhan: 'HP jatuh, layar retak dan sentuhan tidak merespons di sebagian area.',
    tanggal: '2026-09-19',
    jam: '15:00',
    toleransi: '16:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'returned',
    statusLabel: 'Sudah diambil',
    masuk: '19 Sep 2026',
    masukIso: '2026-09-19',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 275.000',
    biayaDisetujui: 'Rp 275.000',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  },
  {
    id: 'RH-2026-00004',
    nama: 'CV Maju Jaya',
    telepon: '0815-4433-2211',
    email: 'kontak@majujaya.co.id',
    kategori: 'Laptop',
    perangkat: 'Laptop Lenovo ThinkPad E14',
    merek: 'Lenovo',
    model: 'ThinkPad E14',
    serial: 'TP-E14-0018',
    keluhan: 'Laptop sangat panas dan kipas berisik, sering melambat.',
    tanggal: '2026-09-14',
    jam: '10:00',
    toleransi: '11:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'returned',
    statusLabel: 'Sudah diambil',
    masuk: '14 Sep 2026',
    masukIso: '2026-09-14',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 120.000',
    biayaDisetujui: 'Rp 120.000',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  },
  {
    id: 'RH-2026-00003',
    nama: 'Andi Pratama',
    telepon: '0812-9988-7766',
    email: 'andi@example.com',
    kategori: 'PC',
    perangkat: 'PC Rakitan Ryzen 5 3600 Tower',
    merek: 'Custom PC',
    model: 'Ryzen 5 3600 Tower',
    serial: 'PC-RYZ-0331',
    keluhan: 'Komputer restart sendiri saat dipakai main game.',
    tanggal: '2026-09-04',
    jam: '16:00',
    toleransi: '17:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'returned',
    statusLabel: 'Sudah diambil',
    masuk: '4 Sep 2026',
    masukIso: '2026-09-04',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 95.000',
    biayaDisetujui: 'Rp 95.000',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  },
  {
    id: 'RH-2026-00002',
    nama: 'Siti Rahma',
    telepon: '0813-9876-5432',
    email: 'siti@example.com',
    kategori: 'Laptop',
    perangkat: 'Laptop Asus VivoBook 14',
    merek: 'Asus',
    model: 'VivoBook 14',
    serial: 'ASU-VB14-099',
    keluhan: 'Laptop mati total, tidak mau menyala dan tidak bisa di-charge.',
    tanggal: '2026-08-30',
    jam: '14:00',
    toleransi: '15:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'returned',
    statusLabel: 'Sudah diambil',
    masuk: '30 Agu 2026',
    masukIso: '2026-08-30',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 350.000',
    biayaDisetujui: 'Rp 350.000',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  },
  {
    id: 'RH-2026-00001',
    nama: 'Budi Santoso',
    telepon: '0811-2233-4455',
    email: 'budi@example.com',
    kategori: 'Laptop',
    perangkat: 'Laptop Lenovo IdeaPad 3',
    merek: 'Lenovo',
    model: 'IdeaPad 3',
    serial: 'LNV-DEMO-001',
    keluhan: 'Laptop hidup, kipas menyala, tetapi layarnya hitam. Sudah dicoba restart beberapa kali.',
    tanggal: '2026-08-23',
    jam: '13:00',
    toleransi: '14:00 WIB',
    dp: 0,
    metodeBayar: 'Booking Online',
    status: 'returned',
    statusLabel: 'Sudah diambil',
    masuk: '23 Agu 2026',
    masukIso: '2026-08-23',
    teknisi: 'Teknisi Demo',
    estimasiBiaya: 'Rp 75.000',
    biayaDisetujui: 'Rp 75.000',
    isRepeatCase: false,
    repeatCaseId: null,
    aiDiagnosis: null
  }
];

const STATUS_LABELS = {
  received: 'Diterima',
  diagnosis: 'Diagnosis',
  waiting: 'Menunggu persetujuan',
  repair: 'Dikerjakan',
  testing: 'Diuji',
  completed: 'Selesai',
  returned: 'Sudah diambil'
};

const ReHubStorage = {
  init() {
    const existing = localStorage.getItem(REHUB_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(REHUB_STORAGE_KEY, JSON.stringify(SEED_TICKETS));
    }
  },

  getAllTickets() {
    this.init();
    try {
      const data = localStorage.getItem(REHUB_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Gagal membaca data tiket:', e);
      return SEED_TICKETS;
    }
  },

  getTicketById(id) {
    const tickets = this.getAllTickets();
    return tickets.find(t => t.id.toLowerCase() === id.trim().toLowerCase()) || null;
  },

  searchTickets(query) {
    const q = query.trim().toLowerCase();
    if (!q) return this.getAllTickets();
    const tickets = this.getAllTickets();
    return tickets.filter(t => 
      t.id.toLowerCase().includes(q) ||
      (t.nama && t.nama.toLowerCase().includes(q)) ||
      (t.telepon && t.telepon.replace(/\D/g, '').includes(q.replace(/\D/g, ''))) ||
      (t.perangkat && t.perangkat.toLowerCase().includes(q)) ||
      (t.keluhan && t.keluhan.toLowerCase().includes(q)) ||
      (t.serial && t.serial.toLowerCase().includes(q))
    );
  },

  addTicket(ticket) {
    const tickets = this.getAllTickets();
    tickets.unshift(ticket);
    localStorage.setItem(REHUB_STORAGE_KEY, JSON.stringify(tickets));
    return ticket;
  },

  updateTicket(id, updates) {
    const tickets = this.getAllTickets();
    const index = tickets.findIndex(t => t.id.toLowerCase() === id.trim().toLowerCase());
    if (index !== -1) {
      tickets[index] = { ...tickets[index], ...updates };
      if (updates.status && STATUS_LABELS[updates.status]) {
        tickets[index].statusLabel = STATUS_LABELS[updates.status];
      }
      localStorage.setItem(REHUB_STORAGE_KEY, JSON.stringify(tickets));
      return tickets[index];
    }
    return null;
  },

  getStatusLabel(statusKey) {
    return STATUS_LABELS[statusKey] || statusKey;
  },

  formatRupiah(number) {
    return 'Rp ' + Number(number || 0).toLocaleString('id-ID');
  },

  formatIndoDate(dateStr) {
    if (!dateStr) return 'Hari ini';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const year = parts[0];
      return `${day} ${months[monthIdx] || ''} ${year}`;
    }
    return dateStr;
  },

  // =========================================================================
  // Mesin Diagnosis AI Konsumen (Client-Side Intelligence)
  // =========================================================================
  generateCustomerDiagnosis(keluhan = '', kategori = '', merekModel = '') {
    const text = (keluhan + ' ' + kategori + ' ' + merekModel).toLowerCase();
    let penyebabUtama = 'Anomali Komponen Hardware';
    let detailPenyebab = [];
    let tingkatKeparahan = 'Sedang';
    let estimasiRentang = 'Rp 75.000 – Rp 200.000';
    let saranKonsumen = [];

    if (text.includes('layar') || text.includes('hitam') || text.includes('blank') || text.includes('garis')) {
      penyebabUtama = 'Gangguan Output Visual / Modul RAM / Fleksibel LCD';
      detailPenyebab = [
        'Modul RAM mengalami oksidasi pin kontak atau longgar dari soket (gagal proses POST)',
        'Kabel fleksibel display (eDP) terjepit atau aus akibat buka-tutup engsel layar berulang',
        'Panel LCD mengalami malfungsi sirkuit backlight / tegangan inverter'
      ];
      tingkatKeparahan = 'Sedang';
      estimasiRentang = 'Rp 75.000 – Rp 350.000 (Pembersihan pin/RAM s/d penggantian panel LCD jika retak)';
      saranKonsumen = [
        'Jangan menekan permukaan panel layar dengan benda keras.',
        'Bawa adaptor charger bawaan saat datang ke bengkel.',
        'Jika Anda punya kabel HDMI di rumah, coba hubungkan ke TV atau monitor eksternal untuk memastikan mesin utama masih beroperasi.'
      ];
    } else if (text.includes('overheat') || text.includes('panas') || text.includes('mati mendadak') || text.includes('render') || text.includes('kipas')) {
      penyebabUtama = 'Sirkulasi Termal Tersumbat & Pasta Pendingin Kering';
      detailPenyebab = [
        'Thermal compound (pasta pendingin) di atas prosesor CPU/GPU sudah mengering dan mengeras',
        'Sirip exhaust radiator pendingin tertutup gumpalan debu tebal',
        'Sistem proteksi BIOS mematikan unit secara darurat untuk melindungi chip dari kerusakan permanen'
      ];
      tingkatKeparahan = 'Ringan – Sedang (Waspada jika dibiarkan)';
      estimasiRentang = 'Rp 100.000 – Rp 175.000 (Deep cleaning sirkulasi & re-pasting compound premium)';
      saranKonsumen = [
        'Hindari menyalakan laptop di atas kasur, bantal, atau karpet yang menyumbat ventilasi bawah.',
        'Jangan memaksakan rendering video atau gaming berat sebelum pendinginan dibersihkan.',
        'Simpan pekerjaan Anda secara berkala jika suara desingan kipas mulai menderu keras.'
      ];
    } else if (text.includes('keyboard') || text.includes('tombol') || text.includes('ngetik')) {
      penyebabUtama = 'Malfungsi Jalur Membran Keyboard / Residu Kotoran';
      detailPenyebab = [
        'Jalur matriks membran keyboard mengalami korosi atau putus mikro',
        'Kotoran mengganjal kubah karet (rubber dome) switch tombol',
        'Soket fleksibel pita keyboard di motherboard kendor'
      ];
      tingkatKeparahan = 'Ringan';
      estimasiRentang = 'Rp 120.000 – Rp 250.000 (Pembersihan soket jalur s/d penggantian modul keyboard)';
      saranKonsumen = [
        'Hindari mencongkel tuts tombol sendiri secara paksa karena rawan mematahkan scissor switch.',
        'Jangan menyemprotkan cairan pembersih beralkohol langsung ke sela-sela tombol.'
      ];
    } else if (text.includes('baterai') || text.includes('drop') || text.includes('habis')) {
      penyebabUtama = 'Degradasi Kapasitas Kimia Sel Baterai Lithium';
      detailPenyebab = [
        'Kesehatan baterai telah menurun drastis melewati batas siklus pengisian normal',
        'Indikasi kebocoran resistansi internal pada salah satu sel baterai'
      ];
      tingkatKeparahan = 'Sedang (Waspada jika kembung)';
      estimasiRentang = 'Rp 160.000 – Rp 350.000 (Penggantian baterai unit)';
      saranKonsumen = [
        'Jika bodi bawah terasa kembung atau trackpad terdorong naik, segera matikan unit untuk mencegah kebocoran sel kimia.',
        'Gunakan selalu charger adaptor original.'
      ];
    } else if (text.includes('mati total') || text.includes('tidak mau menyala') || text.includes('tidak bisa di-charge') || text.includes('konslet')) {
      penyebabUtama = 'Kegagalan Sirkuit Daya Utama / Port DC-In / IC Power';
      detailPenyebab = [
        'Kerusakan soket jack adaptor atau kabel charger putus di dalam',
        'Korsleting kapasitor keramik pada jalur utama 19 Volt',
        'Chip kontrol distribusi daya (Power Management IC) bermasalah'
      ];
      tingkatKeparahan = 'Kritis';
      estimasiRentang = 'Rp 150.000 – Rp 450.000 (Perbaikan sirkuit power motherboard)';
      saranKonsumen = [
        'Cabut charger segera dan jangan memaksakan dicolok berulang kali.',
        'Bawa serta adaptor charger bawaan untuk diperiksa teknisi menggunakan multimeter.'
      ];
    } else {
      penyebabUtama = 'Anomali Perangkat & Indikasi Penurunan Hardware';
      detailPenyebab = [
        'Gejala membutuhkan verifikasi menyeluruh pada jalur sirkuit dan kestabilan sistem',
        'Perlu pengujian multi-titik di meja teknisi'
      ];
      tingkatKeparahan = 'Sedang';
      estimasiRentang = 'Rp 75.000 – Rp 200.000 (Biaya pemeriksaan & penanganan standar)';
      saranKonsumen = [
        'Cadangkan file penting Anda ke cloud atau flashdisk jika perangkat masih sempat menyala.',
        'Catat kapan kendala paling sering muncul untuk disampaikan ke teknisi saat penyerahan unit.'
      ];
    }

    const now = new Date();
    const waktuStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB, ' + this.formatIndoDate(now.toISOString().split('T')[0]);

    return {
      waktu: waktuStr,
      penyebabUtama,
      detailPenyebab,
      tingkatKeparahan,
      estimasiRentang,
      saranKonsumen
    };
  }
};

// Inisialisasi otomatis saat script dimuat
ReHubStorage.init();
