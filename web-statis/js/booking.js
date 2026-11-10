/**
 * ReHub — Booking & Cek Tiket Script (Client-Side JS)
 * Menangani:
 * 1. Restriksi tanggal & kalkulasi toleransi keterlambatan (+1 jam)
 * 2. Sinkronisasi chip DP (Rp50.000, Rp100.000, dst)
 * 3. Penerbitan tiket booking baru & penyimpanan ke localStorage
 * 4. Asisten Diagnosis Mandiri AI untuk Konsumen (pada struk & cek tiket)
 * 5. Pencarian status tiket mandiri di panel 'Cek Tiket Saya'
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Inisialisasi Tanggal Minimum & Kalkulasi Toleransi Waktu (+1 Jam)
  // =========================================================================
  const inputTanggal = document.getElementById('b-tanggal');
  const selectJam = document.getElementById('b-jam');
  const previewToleransi = document.getElementById('preview-toleransi');

  if (inputTanggal) {
    const today = new Date().toISOString().split('T')[0];
    inputTanggal.min = today;
    if (!inputTanggal.value) {
      inputTanggal.value = today;
    }
  }

  function hitungToleransi(jamStr) {
    if (!jamStr) return '—';
    const [jam, menit] = jamStr.split(':').map(Number);
    const jamPlusSatu = (jam + 1) % 24;
    const jamFormat = String(jamPlusSatu).padStart(2, '0');
    const menitFormat = String(menit).padStart(2, '0');
    return `${jamFormat}:${menitFormat} WIB`;
  }

  function updatePreviewToleransi() {
    if (!selectJam || !previewToleransi) return;
    const jamPilihan = selectJam.value;
    if (jamPilihan) {
      const batasToleransi = hitungToleransi(jamPilihan);
      previewToleransi.innerHTML = `
        <span>⏱️ <strong>Batas Toleransi Kedatangan: ${batasToleransi}</strong></span>
        <div class="callout-note">
          Anda memilih jadwal jam <strong>${jamPilihan} WIB</strong>. Batas maksimal tiba di bengkel adalah <strong>${batasToleransi} (+1 jam)</strong>. Lewat dari waktu tersebut tanpa konfirmasi, slot antrean dibatalkan dan uang DP dinyatakan hangus.
        </div>
      `;
    } else {
      previewToleransi.innerHTML = `
        <span>⏱️ <strong>Ketentuan Toleransi Waktu (+1 Jam):</strong> Kami memberikan batas toleransi keterlambatan maksimal <strong>1 jam</strong> dari jam jadwal kedatangan yang Anda pilih.</span>
        <div class="callout-note">Pilih jam kedatangan untuk melihat batas maksimal toleransi kehadiran Anda.</div>
      `;
    }
  }

  if (selectJam) {
    selectJam.addEventListener('change', updatePreviewToleransi);
    updatePreviewToleransi();
  }

  // =========================================================================
  // 2. Sinkronisasi Pilihan Chip Nominal DP
  // =========================================================================
  const inputNominalDp = document.getElementById('b-nominal-dp');
  const dpChips = document.querySelectorAll('input[name="pilihan_dp"]');

  if (inputNominalDp && dpChips.length > 0) {
    dpChips.forEach(chip => {
      chip.addEventListener('change', (e) => {
        if (e.target.checked) {
          inputNominalDp.value = e.target.value;
        }
      });
    });

    inputNominalDp.addEventListener('input', (e) => {
      const val = e.target.value;
      let matched = false;
      dpChips.forEach(chip => {
        if (chip.value === val) {
          chip.checked = true;
          matched = true;
        } else {
          chip.checked = false;
        }
      });
      if (!matched) {
        dpChips.forEach(chip => { chip.checked = false; });
      }
    });
  }

  // =========================================================================
  // 3. Form Booking Submission & Penerbitan Struk Tiket
  // =========================================================================
  const bookingForm = document.getElementById('booking-form');
  const bookingReceipt = document.getElementById('booking-receipt');
  let currentReceiptTicketId = 'RH-2026-BOK01';

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('b-nama').value.trim();
      const telepon = document.getElementById('b-telepon').value.trim();
      const email = document.getElementById('b-email')?.value.trim() || '';
      const kategori = document.getElementById('b-kategori').value;
      const merekModel = document.getElementById('b-merek-model').value.trim();
      const keluhan = document.getElementById('b-keluhan').value.trim();
      const tanggal = document.getElementById('b-tanggal').value;
      const jam = document.getElementById('b-jam').value;
      const nominalDp = Number(inputNominalDp?.value || 50000);
      
      const metodeBayarChecked = document.querySelector('input[name="metode_bayar"]:checked');
      const metodeBayar = metodeBayarChecked ? metodeBayarChecked.value : 'QRIS';

      if (!nama || !telepon || !kategori || !merekModel || !keluhan || !tanggal || !jam) {
        alert('Mohon lengkapi semua kolom yang wajib diisi.');
        return;
      }

      if (nominalDp < 50000) {
        alert('Nominal DP minimal adalah Rp50.000.');
        return;
      }

      // Hitung kode tiket unik
      const allTickets = ReHubStorage.getAllTickets();
      const bookingCount = allTickets.filter(t => t.id.includes('BOK')).length + 1;
      const kodeTiket = `RH-2026-BOK${String(bookingCount).padStart(2, '0')}`;
      currentReceiptTicketId = kodeTiket;
      const toleransiJam = hitungToleransi(jam);

      // Pisahkan merek dan model sederhana
      const merekParts = merekModel.split(' ');
      const merek = merekParts[0] || kategori;
      const model = merekParts.slice(1).join(' ') || merekModel;

      const newTicket = {
        id: kodeTiket,
        nama: nama,
        telepon: telepon,
        email: email,
        kategori: kategori,
        perangkat: `${kategori} ${merekModel}`,
        merek: merek,
        model: model,
        serial: '',
        keluhan: `${keluhan} — (Jadwal: ${jam} WIB, toleransi: ${toleransiJam})`,
        tanggal: tanggal,
        jam: jam,
        toleransi: toleransiJam,
        dp: nominalDp,
        metodeBayar: metodeBayar,
        status: 'diagnosis',
        statusLabel: 'Booking Online',
        masuk: 'Hari ini',
        masukIso: tanggal,
        teknisi: 'Menunggu konfirmasi',
        estimasiBiaya: 'Belum diisi',
        biayaDisetujui: 'Belum diisi',
        isRepeatCase: false,
        repeatCaseId: null,
        aiDiagnosis: null // Konsumen bisa menanyakannya di struk
      };

      // Simpan ke localStorage
      ReHubStorage.addTicket(newTicket);

      // Render data ke elemen struk
      const resTiketKode = document.getElementById('res-tiket-kode');
      if (resTiketKode) resTiketKode.textContent = kodeTiket;

      const monoTicketEls = bookingReceipt.querySelectorAll('.mono-ticket');
      monoTicketEls.forEach(el => { el.textContent = kodeTiket; });

      const resNama = document.getElementById('res-nama');
      if (resNama) resNama.textContent = nama;

      const resTelepon = document.getElementById('res-telepon');
      if (resTelepon) resTelepon.textContent = telepon;

      const resPerangkat = document.getElementById('res-perangkat');
      if (resPerangkat) resPerangkat.textContent = `${kategori} · ${merekModel}`;

      const resKeluhan = document.getElementById('res-keluhan');
      if (resKeluhan) resKeluhan.textContent = keluhan;

      const resJadwal = document.getElementById('res-jadwal');
      if (resJadwal) resJadwal.textContent = `${ReHubStorage.formatIndoDate(tanggal)} pukul ${jam} WIB`;

      const resBatasToleransi = document.getElementById('res-batas-toleransi');
      if (resBatasToleransi) resBatasToleransi.textContent = `Pukul ${toleransiJam} (+1 Jam Toleransi Maksimal)`;

      const resDp = document.getElementById('res-dp');
      if (resDp) resDp.textContent = `${ReHubStorage.formatRupiah(nominalDp)} (Terkonfirmasi)`;

      const resMetode = document.getElementById('res-metode');
      if (resMetode) resMetode.textContent = metodeBayar;

      // Reset tampilan kotak AI di struk
      const aiResultBox = document.getElementById('customer-ai-result');
      const btnAskAi = document.getElementById('btn-customer-ask-ai');
      if (aiResultBox) {
        aiResultBox.style.display = 'none';
        aiResultBox.innerHTML = '';
      }
      if (btnAskAi) {
        btnAskAi.disabled = false;
        btnAskAi.textContent = '✨ Tanyakan Diagnosis ke AI';
      }

      // Update tautan WhatsApp dengan pesan kustom
      const btnWa = document.getElementById('btn-wa-confirm');
      if (btnWa) {
        const pesanWa = `Halo Admin ReHub, saya sudah booking tiket ${kodeTiket} untuk ${kategori} ${merekModel}. Jadwal: ${tanggal} jam ${jam} WIB (Toleransi: ${toleransiJam}). DP: ${ReHubStorage.formatRupiah(nominalDp)} via ${metodeBayar}. Mohon konfirmasi slot teknisi.`;
        btnWa.href = `https://wa.me/6281234567890?text=${encodeURIComponent(pesanWa)}`;
      }

      // Aktifkan struk via hash URL (:target CSS)
      window.location.hash = 'booking-receipt';
      if (bookingReceipt) {
        bookingReceipt.scrollIntoView({ behavior: 'smooth' });
      }

      // Beri umpan balik bahwa tiket berhasil disimpan ke sistem
      const protoNote = bookingReceipt.querySelector('.proto-note');
      if (protoNote) {
        protoNote.innerHTML = `✅ <strong>Berhasil Disimpan:</strong> Tiket <code>${kodeTiket}</code> telah tersimpan ke sistem ReHub dan siap dicek di Area Teknisi!`;
        protoNote.style.borderColor = 'var(--signal)';
        protoNote.style.color = 'var(--ink-900)';
      }
    });
  }

  // =========================================================================
  // 4. Asisten Diagnosis Mandiri AI di Sisi Konsumen (Pada Struk Booking)
  // =========================================================================
  const btnCustomerAskAi = document.getElementById('btn-customer-ask-ai');
  const customerAiResult = document.getElementById('customer-ai-result');

  function renderCustomerAiResult(container, diagnosis) {
    if (!container || !diagnosis) return;
    container.style.display = 'block';
    container.innerHTML = `
      <div style="background: var(--surface); padding: 1rem; border-radius: var(--radius); border: 1px solid var(--line);">
        <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem;">
          <strong>Perkiraan Bagian yang Bermasalah:</strong><br>
          <span style="color: var(--signal); font-weight: 600; font-size: 1.05rem;">${diagnosis.penyebabUtama}</span>
          <span class="badge ${diagnosis.tingkatKeparahan.includes('Kritis') ? 'testing' : 'diagnosis'}" style="margin-left: 0.5rem;">${diagnosis.tingkatKeparahan}</span>
        </p>

        <div style="margin: 0.75rem 0;">
          <strong style="font-size: 0.85rem; color: var(--ink-700);">Kemungkinan Gejala Penyebab:</strong>
          <ul style="margin: 0.35rem 0 0.75rem 1.25rem; padding: 0; font-size: 0.88rem;">
            ${diagnosis.detailPenyebab.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>

        <div style="background: var(--surface-sunken); padding: 0.75rem; border-radius: var(--radius); margin-bottom: 0.75rem;">
          <p style="margin: 0; font-size: 0.9rem;">
            💰 <strong>Perkiraan Rentang Biaya:</strong> <strong style="color: var(--signal);">${diagnosis.estimasiRentang}</strong>
          </p>
          <small class="muted">Perkiraan ini bukan tagihan final; biaya final diputuskan setelah teknisi membongkar &amp; menguji unit.</small>
        </div>

        <div>
          <strong style="font-size: 0.85rem; color: var(--ink-700);">Saran Sebelum Membawa ke Bengkel:</strong>
          <ul style="margin: 0.35rem 0 0.5rem 1.25rem; padding: 0; font-size: 0.88rem;">
            ${diagnosis.saranKonsumen.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div class="notice" style="margin-top: 0.75rem; font-size: 0.85rem; border-left: 3px solid var(--signal);">
          🚀 <strong>Tersambung ke Teknisi:</strong> Hasil diagnosis mandiri Anda ini telah dicatat ke data tiket dan akan langsung terlihat oleh teknisi ReHub saat Anda tiba di bengkel!
        </div>
      </div>
    `;
  }

  if (btnCustomerAskAi) {
    btnCustomerAskAi.addEventListener('click', () => {
      const ticketIdToDiagnose = currentReceiptTicketId || document.getElementById('res-tiket-kode')?.textContent || 'RH-2026-BOK01';
      const ticket = ReHubStorage.getTicketById(ticketIdToDiagnose);

      if (!ticket) {
        alert('Data tiket tidak ditemukan.');
        return;
      }

      btnCustomerAskAi.disabled = true;
      btnCustomerAskAi.textContent = '⏳ AI sedang menganalisis gejala perangkat Anda...';

      setTimeout(() => {
        const diagnosis = ReHubStorage.generateCustomerDiagnosis(ticket.keluhan, ticket.kategori, ticket.perangkat);
        ReHubStorage.updateTicket(ticket.id, { aiDiagnosis: diagnosis });

        renderCustomerAiResult(customerAiResult, diagnosis);

        btnCustomerAskAi.textContent = 'Hasil Diagnosis AI Telah Diteruskan ke Teknisi ✔';
        btnCustomerAskAi.classList.remove('btn-outline');
        btnCustomerAskAi.classList.add('btn-solid');
      }, 500);
    });
  }

  // Tombol cetak bukti tiket
  const btnCetak = bookingReceipt?.querySelector('button[title*="Ctrl+P"]');
  if (btnCetak) {
    btnCetak.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 5. Panel Cek Status Tiket Mandiri Konsumen
  // =========================================================================
  const formCek = document.querySelector('#panel-cek form');
  const inputCek = document.getElementById('cek-input');
  const containerHasilCek = document.getElementById('daftar-tiket-tersimpan');

  function renderHasilCariTiket(query = '') {
    if (!containerHasilCek) return;
    const hasil = ReHubStorage.searchTickets(query);

    if (hasil.length === 0) {
      containerHasilCek.innerHTML = `
        <article class="card card-ticket-item" style="text-align: center; padding: 2.5rem 1rem;">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">🔍 <strong>Tiket Tidak Ditemukan</strong></p>
          <p class="muted">Tidak ada tiket dengan kata kunci <em>"${query}"</em>. Pastikan nomor tiket (contoh: <code>RH-2026-BOK01</code>) atau nomor WhatsApp Anda sudah tepat.</p>
        </article>
      `;
      return;
    }

    containerHasilCek.innerHTML = hasil.map(t => {
      const badgeClass = t.status || 'diagnosis';
      const badgeText = t.statusLabel || ReHubStorage.getStatusLabel(t.status);
      const isBooking = t.id.includes('BOK') || t.jam;

      const aiSectionHtml = t.aiDiagnosis ? `
        <div class="notice" style="margin-top: 0.75rem; border-left: 3px solid var(--signal);">
          <p style="margin: 0 0 0.35rem 0;">
            <strong>🤖 Hasil Perkiraan AI Anda:</strong> ${t.aiDiagnosis.penyebabUtama}
          </p>
          <p style="margin: 0 0 0.35rem 0; font-size: 0.85rem;" class="muted">
            <strong>Estimasi Biaya:</strong> ${t.aiDiagnosis.estimasiRentang} · 
            <span class="badge ${t.aiDiagnosis.tingkatKeparahan.includes('Kritis') ? 'testing' : 'diagnosis'}">${t.aiDiagnosis.tingkatKeparahan}</span>
          </p>
          <details style="margin-top: 0.5rem; font-size: 0.85rem;">
            <summary style="cursor: pointer; color: var(--link);">Lihat saran penanganan mandiri</summary>
            <ul style="margin: 0.35rem 0 0 1.25rem; padding: 0;">
              ${t.aiDiagnosis.saranKonsumen.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </details>
        </div>
      ` : `
        <div style="margin-top: 0.75rem;">
          <button class="btn btn-outline btn-sm btn-ask-ai-item" data-id="${t.id}">✨ Tanya Diagnosis AI untuk Tiket Ini</button>
        </div>
      `;

      return `
        <article class="card card-ticket-item" id="item-${t.id}">
          <div class="ticket-item-header">
            <strong class="mono-ticket-lg">${t.id}</strong>
            <span class="badge ${badgeClass}">${badgeText}</span>
          </div>
          <p><strong>${t.nama}</strong> · ${t.perangkat || t.merek + ' ' + t.model}</p>
          <p class="muted ticket-item-desc">${t.keluhan || 'Tidak ada catatan keluhan.'}</p>
          <div class="notice ticket-item-notice">
            ${isBooking && t.jam ? `<div>🕒 <strong>Jadwal:</strong> ${t.masuk || t.tanggal} pukul ${t.jam} WIB</div>` : `<div>🕒 <strong>Tanggal Masuk:</strong> ${t.masuk || t.tanggal}</div>`}
            ${t.toleransi ? `<div>⏱️ <strong>Toleransi Maksimal:</strong> pukul ${t.toleransi} (setelah ini DP hangus)</div>` : ''}
            <div>💰 <strong>Biaya / DP:</strong> ${t.dp ? ReHubStorage.formatRupiah(t.dp) + ' via ' + (t.metodeBayar || 'QRIS') : (t.biayaDisetujui || t.estimasiBiaya || 'Menunggu diagnosis')}</div>
            ${t.teknisi ? `<div>🔧 <strong>Teknisi:</strong> ${t.teknisi}</div>` : ''}
          </div>
          ${aiSectionHtml}
        </article>
      `;
    }).join('');

    // Listener untuk tombol Tanya AI dari kartu tiket
    containerHasilCek.querySelectorAll('.btn-ask-ai-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tId = e.target.getAttribute('data-id');
        const targetTicket = ReHubStorage.getTicketById(tId);
        if (!targetTicket) return;

        e.target.disabled = true;
        e.target.textContent = '⏳ Menganalisis...';

        setTimeout(() => {
          const diag = ReHubStorage.generateCustomerDiagnosis(targetTicket.keluhan, targetTicket.kategori, targetTicket.perangkat);
          ReHubStorage.updateTicket(tId, { aiDiagnosis: diag });
          renderHasilCariTiket(inputCek ? inputCek.value.trim() : '');
        }, 500);
      });
    });
  }

  if (formCek) {
    formCek.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = inputCek ? inputCek.value.trim() : '';
      renderHasilCariTiket(q);
    });
  }

  if (inputCek) {
    inputCek.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (q.length === 0 || q.length >= 3) {
        renderHasilCariTiket(q);
      }
    });
  }

  // Tampilkan data awal di panel cek saat halaman dibuka
  renderHasilCariTiket('');
});
