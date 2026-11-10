/**
 * ReHub — Riwayat Servis Perangkat (Client-Side JS)
 * Menangani tampilan linimasa riwayat servis per perangkat / pelanggan.
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const serialQuery = urlParams.get('serial') || '';
  const namaQuery = urlParams.get('nama') || '';

  if (!serialQuery && !namaQuery) return;

  const tickets = ReHubStorage.getAllTickets();
  const matched = tickets.filter(t => {
    if (serialQuery && t.serial && t.serial.toLowerCase().includes(serialQuery.toLowerCase())) return true;
    if (namaQuery && t.nama && t.nama.toLowerCase().includes(namaQuery.toLowerCase())) return true;
    return false;
  });

  if (matched.length > 0) {
    const primary = matched[0];
    const h2Dev = document.getElementById('h-dev');
    if (h2Dev) {
      h2Dev.textContent = primary.perangkat || `${primary.merek} ${primary.model}`;
    }

    const factsDl = document.querySelectorAll('section[aria-labelledby="h-dev"] dl dd');
    if (factsDl.length >= 4) {
      factsDl[0].textContent = primary.nama;
      factsDl[1].textContent = primary.kategori;
      factsDl[2].textContent = primary.serial || 'Tidak tercatat';
      factsDl[3].textContent = matched.length;
    }

    const olTimeline = document.querySelector('ol.timeline');
    if (olTimeline) {
      olTimeline.innerHTML = matched.map(t => {
        return `
          <li>
            <p class="when"><time datetime="${t.masukIso || ''}">${t.masuk || t.tanggal}</time> · <span class="badge ${t.status || 'diagnosis'}">${t.statusLabel || ReHubStorage.getStatusLabel(t.status)}</span></p>
            <h3><a href="tiket-detail.html?id=${encodeURIComponent(t.id)}">${t.id}</a></h3>
            <p>${t.keluhan}</p>
            <dl class="facts">
              <div><dt>Estimasi Biaya</dt><dd>${t.estimasiBiaya || 'Belum diisi'}</dd></div>
              <div><dt>Biaya Disetujui</dt><dd>${t.biayaDisetujui || 'Belum diisi'}</dd></div>
              <div><dt>Teknisi</dt><dd>${t.teknisi || 'Teknisi Bengkel'}</dd></div>
            </dl>
          </li>
        `;
      }).join('');
    }
  }
});

