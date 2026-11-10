/**
 * ReHub — Area Teknisi Script (Client-Side JS)
 * Menangani:
 * 1. Kalkulasi statistik dinamis di dashboard.html
 * 2. Render 5 tiket terbaru di dashboard.html
 * 3. Live search & filter status instan di tiket.html
 */

document.addEventListener('DOMContentLoaded', () => {
  const isDashboard = document.body.classList.contains('staff') && window.location.pathname.includes('dashboard.html');
  const isTiketList = document.body.classList.contains('staff') && (window.location.pathname.includes('tiket.html') || (!window.location.pathname.includes('tiket-') && window.location.pathname.endsWith('tiket.html')));

  // =========================================================================
  // 1. Logika Halaman Dashboard (dashboard.html)
  // =========================================================================
  if (document.querySelector('ul.stats') && document.querySelector('ul.status-row')) {
    const tickets = ReHubStorage.getAllTickets();

    const totalTiket = tickets.length;
    const tiketAktif = tickets.filter(t => t.status !== 'returned' && t.status !== 'completed').length;
    const repairMemory = tickets.filter(t => t.status === 'returned').length;

    // Update ringkasan angka
    const statsItems = document.querySelectorAll('ul.stats li strong');
    if (statsItems.length >= 3) {
      statsItems[0].textContent = totalTiket;
      statsItems[1].textContent = tiketAktif;
      statsItems[2].textContent = repairMemory;
    }

    // Hitung status breakdown
    const statusCounts = {
      received: 0,
      diagnosis: 0,
      waiting: 0,
      repair: 0,
      testing: 0,
      completed: 0,
      returned: 0
    };

    tickets.forEach(t => {
      if (statusCounts[t.status] !== undefined) {
        statusCounts[t.status]++;
      } else {
        statusCounts.diagnosis++;
      }
    });

    const statusRowLinks = document.querySelectorAll('ul.status-row li a');
    statusRowLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const match = href.match(/status=([a-z]+)/);
      if (match && match[1] && statusCounts[match[1]] !== undefined) {
        const strongEl = link.querySelector('strong');
        if (strongEl) {
          strongEl.textContent = statusCounts[match[1]];
        }
      }
    });

    // Render 5 tiket terbaru ke tabel dashboard
    const tbodyDashboard = document.querySelector('section[aria-labelledby="h-terbaru"] tbody');
    if (tbodyDashboard) {
      const top5 = tickets.slice(0, 5);
      tbodyDashboard.innerHTML = top5.map(t => {
        const badgeClass = t.status || 'diagnosis';
        const badgeText = t.statusLabel || ReHubStorage.getStatusLabel(t.status);
        return `
          <tr>
            <td><a href="tiket-detail.html?id=${encodeURIComponent(t.id)}">${t.id}</a></td>
            <td>${t.perangkat || (t.merek + ' ' + t.model)}</td>
            <td>${t.nama}</td>
            <td>${t.keluhan}</td>
            <td><span class="badge ${badgeClass}">${badgeText}</span></td>
            <td><time datetime="${t.masukIso || ''}">${t.masuk || 'Hari ini'}</time></td>
          </tr>
        `;
      }).join('');
    }
  }

  // =========================================================================
  // 2. Logika Halaman Daftar Tiket (tiket.html)
  // =========================================================================
  const filterForm = document.querySelector('form.filters');
  const inputSearch = document.getElementById('q');
  const selectStatus = document.getElementById('status');
  const tbodyTiket = document.querySelector('section[aria-label="Daftar tiket"] tbody');

  if (tbodyTiket && filterForm) {
    // Ambil parameter status awal dari URL (misal: ?status=received dari dashboard)
    const urlParams = new URLSearchParams(window.location.search);
    const initialStatus = urlParams.get('status') || '';
    const initialQ = urlParams.get('q') || '';

    if (selectStatus && initialStatus) {
      selectStatus.value = initialStatus;
    }
    if (inputSearch && initialQ) {
      inputSearch.value = initialQ;
    }

    function renderTabelTiket() {
      const q = inputSearch ? inputSearch.value.trim().toLowerCase() : '';
      const statusFilter = selectStatus ? selectStatus.value : '';

      let list = ReHubStorage.getAllTickets();

      if (statusFilter) {
        list = list.filter(t => t.status === statusFilter);
      }

      if (q) {
        list = list.filter(t => 
          t.id.toLowerCase().includes(q) ||
          (t.nama && t.nama.toLowerCase().includes(q)) ||
          (t.perangkat && t.perangkat.toLowerCase().includes(q)) ||
          (t.keluhan && t.keluhan.toLowerCase().includes(q)) ||
          (t.serial && t.serial.toLowerCase().includes(q))
        );
      }

      if (list.length === 0) {
        tbodyTiket.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; padding: 2.5rem 1rem;" class="muted">
              Tidak ada tiket servis yang sesuai dengan filter pencarian.
            </td>
          </tr>
        `;
        return;
      }

      tbodyTiket.innerHTML = list.map(t => {
        const badgeClass = t.status || 'diagnosis';
        const badgeText = t.statusLabel || ReHubStorage.getStatusLabel(t.status);
        return `
          <tr>
            <td><a href="tiket-detail.html?id=${encodeURIComponent(t.id)}">${t.id}</a></td>
            <td>${t.perangkat || (t.merek + ' ' + t.model)}</td>
            <td>${t.nama}</td>
            <td>${t.keluhan}</td>
            <td><span class="badge ${badgeClass}">${badgeText}</span></td>
            <td><time datetime="${t.masukIso || ''}">${t.masuk || 'Hari ini'}</time></td>
          </tr>
        `;
      }).join('');
    }

    // Event listener live search & filter tanpa reload halaman
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      renderTabelTiket();
    });

    if (inputSearch) {
      inputSearch.addEventListener('input', renderTabelTiket);
    }

    if (selectStatus) {
      selectStatus.addEventListener('change', renderTabelTiket);
    }

    // Render data pertama kali saat dimuat
    renderTabelTiket();
  }
});

