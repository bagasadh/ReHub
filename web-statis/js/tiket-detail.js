/**
 * ReHub — Detail Tiket & Hasil Estimasi Gejala Mandiri (Client-Side JS)
 * Menangani:
 * 1. Muat data tiket dinamis berdasarkan parameter URL (?id=...)
 * 2. Menampilkan hasil estimasi gejala yang diajukan oleh pelanggan
 * 3. Pembaruan status tiket secara persisten ke localStorage
 * 4. Penyimpanan checklist pemeriksaan & catatan teknisi
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ticketId = urlParams.get('id') || 'RH-2026-00008';
  let ticket = ReHubStorage.getTicketById(ticketId);

  // Jika tidak ditemukan di localStorage, buat fallback dari default
  if (!ticket) {
    ticket = {
      id: ticketId,
      nama: 'Budi Santoso',
      telepon: '0811-2233-4455',
      kategori: 'Laptop',
      perangkat: 'Laptop Lenovo IdeaPad 3',
      merek: 'Lenovo',
      model: 'IdeaPad 3',
      serial: 'LNV-DEMO-001',
      keluhan: 'Laptop hidup tapi layar hitam lagi, kipas berputar.',
      status: 'diagnosis',
      statusLabel: 'Diagnosis',
      masuk: '17 Okt 2026',
      masukIso: '2026-10-17',
      teknisi: 'Teknisi Demo',
      estimasiBiaya: 'Belum diisi',
      biayaDisetujui: 'Belum diisi',
      isRepeatCase: true,
      repeatCaseId: 'RH-2026-00001',
      aiDiagnosis: null
    };
  }

  // =========================================================================
  // 1. Render Informasi Tiket ke Antarmuka
  // =========================================================================
  const h1El = document.querySelector('.page-head h1');
  if (h1El) {
    h1El.innerHTML = `${ticket.id} <span class="badge ${ticket.status || 'diagnosis'}">${ticket.statusLabel || ReHubStorage.getStatusLabel(ticket.status)}</span>`;
  }

  // Update informasi fakta tiket
  const factsDls = document.querySelectorAll('.facts.cols dd');
  if (factsDls.length >= 6) {
    factsDls[0].innerHTML = `<a href="riwayat.html?nama=${encodeURIComponent(ticket.nama)}">${ticket.nama}</a>`;
    factsDls[1].innerHTML = `<a href="riwayat.html?serial=${encodeURIComponent(ticket.serial || '')}">${ticket.perangkat || ticket.merek + ' ' + ticket.model}</a>`;
    factsDls[2].textContent = ticket.teknisi || 'Teknisi Bengkel';
    factsDls[3].innerHTML = `<time datetime="${ticket.masukIso || ''}">${ticket.masuk || 'Hari ini'}</time>`;
    factsDls[4].textContent = ticket.estimasiBiaya || 'Belum diisi';
    factsDls[5].textContent = ticket.biayaDisetujui || 'Belum diisi';
  }

  // Update lead keluhan
  const leadKeluhan = document.getElementById('detail-keluhan') || document.querySelector('.lead');
  if (leadKeluhan && ticket.keluhan) {
    leadKeluhan.textContent = `“${ticket.keluhan}”`;
  }

  // Sinkronisasi dropdown Ubah Status
  const selectStatus = document.getElementById('ubah-status');
  if (selectStatus) {
    selectStatus.innerHTML = `
      <option value="received" ${ticket.status === 'received' ? 'selected' : ''}>Diterima</option>
      <option value="diagnosis" ${ticket.status === 'diagnosis' ? 'selected' : ''}>Diagnosis</option>
      <option value="waiting" ${ticket.status === 'waiting' ? 'selected' : ''}>Menunggu persetujuan</option>
      <option value="repair" ${ticket.status === 'repair' ? 'selected' : ''}>Dikerjakan</option>
      <option value="testing" ${ticket.status === 'testing' ? 'selected' : ''}>Diuji</option>
      <option value="completed" ${ticket.status === 'completed' ? 'selected' : ''}>Selesai</option>
      <option value="returned" ${ticket.status === 'returned' ? 'selected' : ''}>Sudah diambil</option>
    `;
  }

  // Form ubah status handler
  const formStatus = document.querySelector('.inline-form');
  if (formStatus && selectStatus) {
    formStatus.addEventListener('submit', (e) => {
      e.preventDefault();
      const newStatus = selectStatus.value;
      const updated = ReHubStorage.updateTicket(ticket.id, { status: newStatus });
      if (updated) {
        ticket = updated;
        if (h1El) {
          h1El.innerHTML = `${ticket.id} <span class="badge ${ticket.status}">${ticket.statusLabel}</span>`;
        }
        alert(`✅ Status tiket ${ticket.id} berhasil diubah menjadi "${ticket.statusLabel}"! Data tersimpan di sistem.`);
      }
    });
  }

  // =========================================================================
  // 2. Render Hasil Estimasi Kerusakan Mandiri Pelanggan
  // =========================================================================
  const statusSummaryEl = document.getElementById('diagnosis-status-summary');
  const detailWrapEl = document.getElementById('diagnosis-detail-wrap');
  const btnSyncChecklist = document.getElementById('btn-sync-checklist');

  function renderDiagnosisSection() {
    if (!detailWrapEl || !statusSummaryEl) return;

    const diag = ticket.estimasiKerusakan;

    if (diag) {
      statusSummaryEl.innerHTML = `Pelanggan telah melakukan pengecekan gejala mandiri pada <strong>${diag.waktu}</strong> sebelum menyerahkan unit.`;

      detailWrapEl.innerHTML = `
        <div>
          <h3>Perkiraan Kerusakan yang Dilihat Pelanggan:</h3>
          <p style="margin: 0.25rem 0 0.5rem 0;">
            <strong style="color: var(--signal); font-size: 1.05rem;">${diag.penyebabUtama}</strong>
            <span class="badge ${diag.tingkatKeparahan.includes('Kritis') ? 'testing' : 'diagnosis'}" style="margin-left: 0.5rem;">${diag.tingkatKeparahan}</span>
          </p>
          <ul style="margin: 0.35rem 0 0.75rem 1.25rem; padding: 0;">
            ${diag.detailPenyebab.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h3>Ekspektasi Biaya &amp; Edukasi Pelanggan:</h3>
          <p style="margin: 0.25rem 0 0.5rem 0;">
            <strong>Estimasi Biaya Diinformasikan:</strong> <br>
            <span style="color: var(--signal); font-weight: 600;">${diag.estimasiRentang}</span>
          </p>
          <p style="margin: 0.5rem 0 0.25rem 0; font-size: 0.85rem; color: var(--ink-700);"><strong>Saran Awal yang Diterima Pelanggan:</strong></p>
          <ul style="margin: 0.25rem 0 0 1.25rem; padding: 0; font-size: 0.88rem;">
            ${diag.saranKonsumen.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      `;

      if (btnSyncChecklist) {
        btnSyncChecklist.style.display = 'inline-block';
        btnSyncChecklist.textContent = 'Salin Temuan ke Catatan Pemeriksaan';
      }
    } else {
      statusSummaryEl.innerHTML = `<em>Pelanggan tidak mengisi pengecekan gejala mandiri saat booking tiket.</em>`;
      detailWrapEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 0.75rem; background: var(--surface); border-radius: var(--radius);">
          <p style="margin: 0 0 0.5rem 0;">Teknisi dapat melihat estimasi pola kerusakan berdasarkan keluhan unit dengan tombol di bawah:</p>
          <button class="btn btn-outline btn-sm" type="button" id="btn-simulate-preview">Lihat Pratinjau Estimasi Gejala</button>
        </div>
      `;

      if (btnSyncChecklist) {
        btnSyncChecklist.style.display = 'none';
      }

      const btnSimulate = document.getElementById('btn-simulate-preview');
      if (btnSimulate) {
        btnSimulate.addEventListener('click', () => {
          const newDiag = ReHubStorage.generateCustomerDiagnosis(ticket.keluhan, ticket.kategori, ticket.perangkat);
          ticket.estimasiKerusakan = newDiag;
          ReHubStorage.updateTicket(ticket.id, { estimasiKerusakan: newDiag });
          renderDiagnosisSection();
        });
      }
    }
  }

  renderDiagnosisSection();

  if (btnSyncChecklist) {
    btnSyncChecklist.addEventListener('click', () => {
      const currentDiag = ticket.estimasiKerusakan;
      if (!currentDiag) return;
      const c1n = document.getElementById('c1n');
      if (c1n) {
        c1n.value = `[Estimasi Gejala]: ${currentDiag.penyebabUtama}`;
        alert('✅ Referensi estimasi gejala pelanggan telah disalin ke baris catatan checklist!');
        c1n.focus();
      }
    });
  }

  // =========================================================================
  // 3. Penyimpanan Checklist Pemeriksaan
  // =========================================================================
  const formChecklist = document.querySelector('section[aria-labelledby="h-cek"] form');
  const checklistKey = `rehub_checklist_${ticket.id}`;

  if (formChecklist) {
    // Muat data checklist tersimpan jika ada
    const savedChecklist = localStorage.getItem(checklistKey);
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        Object.keys(parsed).forEach(fieldName => {
          const field = formChecklist.elements[fieldName];
          if (field) field.value = parsed[fieldName];
        });
      } catch (err) {
        console.error('Gagal membaca saved checklist:', err);
      }
    }

    formChecklist.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {};
      const inputs = formChecklist.querySelectorAll('select, input');
      inputs.forEach(input => {
        if (input.name) formData[input.name] = input.value;
      });

      localStorage.setItem(checklistKey, JSON.stringify(formData));
      alert(`✅ Checklist pemeriksaan tiket ${ticket.id} berhasil disimpan ke sistem!`);
    });
  }

  // =========================================================================
  // 4. Catatan Diagnosis & Tindakan Baru
  // =========================================================================
  const formCatatan = document.querySelector('section[aria-labelledby="h-catatan"] form');
  const catatanKey = `rehub_catatan_${ticket.id}`;
  const pCatatanMuted = document.querySelector('section[aria-labelledby="h-catatan"] .muted');

  function muatCatatan() {
    const raw = localStorage.getItem(catatanKey);
    if (raw && pCatatanMuted) {
      try {
        const arr = JSON.parse(raw);
        if (arr.length > 0) {
          pCatatanMuted.innerHTML = arr.map(c => `<div style="margin-bottom:0.75rem; border-left: 2px solid var(--signal); padding-left: 0.5rem;"><small class="muted">${c.waktu}</small><p style="margin: 0.25rem 0;">${c.teks}</p></div>`).join('');
        }
      } catch (e) {}
    }
  }
  muatCatatan();

  if (formCatatan) {
    formCatatan.addEventListener('submit', (e) => {
      e.preventDefault();
      const txt = document.getElementById('catatan');
      if (txt && txt.value.trim()) {
        const raw = localStorage.getItem(catatanKey);
        const arr = raw ? JSON.parse(raw) : [];
        arr.push({ teks: txt.value.trim(), waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' });
        localStorage.setItem(catatanKey, JSON.stringify(arr));
        txt.value = '';
        muatCatatan();
        alert('✅ Catatan diagnosis berhasil ditambahkan.');
      }
    });
  }
});
