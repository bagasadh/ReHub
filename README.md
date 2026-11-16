# ReHub — Repair Shop Website & Service Booking

Business profile and self-service repair booking site for a laptop, PC, and smartphone repair shop in Depok. Built for a Web Programming coursework assignment using semantic HTML5, modular native CSS, and Vanilla JavaScript.

## Features

### Public Site (Customers)
- Home page and portfolio gallery comparing devices before and after repair.
- Service booking (`booking.html`): pick a time slot with a 1-hour arrival grace period, choose a down payment (DP) via quick buttons or custom input, generate a booking receipt, and send the reservation details to the shop's WhatsApp.
- Symptom checker: estimates likely faulty components, repair cost range, and prep steps before bringing a device in.
- Ticket tracker: check repair progress by entering a ticket number or WhatsApp number.

### Technician Area
- Dashboard summarizing active tickets and items needing review.
- Ticket list with live search and status filters (Received, Diagnosis, Waiting for Approval, In Progress, Ready for Pickup, Completed) without page reloads.
- Inspection sheet (`tiket-detail.html`): shows customer complaints, hardware checklist (external display, RAM, charger, etc.), a button to copy symptom notes into the inspection log, and persistent status updates.
- Service history (`riwayat.html`): per-customer repair timeline that flags potential repeat issues.

## Technical Notes
- **HTML5 & Accessibility (WCAG 2.2 AA):** uses semantic landmarks (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`, `<figure>`), skip links, explicit form labels, and `:focus-visible` outlines.
- **Modular CSS:** written without frameworks like Tailwind or Bootstrap, using `:root` custom properties in `base.css` alongside `layout.css`, `components.css`, and page-specific stylesheets.
- **Storage:** tickets and history persist in `localStorage`, seeded with sample data on first load.
- **Fonts:** self-hosted *IBM Plex Sans* and *IBM Plex Mono* (OFL) in `fonts/`.

## Directory Structure

```text
ReHub/
├── web-statis/                    # Web app files
│   ├── index.html                 # Home & portfolio preview
│   ├── booking.html               # Booking form & ticket tracker
│   ├── portofolio.html            # Before/after repair gallery
│   ├── kontak.html                # Shop info, hours & location
│   ├── dashboard.html             # Technician: shop status summary
│   ├── tiket.html                 # Technician: ticket list & search
│   ├── tiket-baru.html            # Technician: self-booking SOP
│   ├── tiket-detail.html          # Technician: inspection checklist & status updates
│   ├── riwayat.html               # Technician: customer repair timeline
│   ├── css/
│   │   ├── style.css              # Master stylesheet
│   │   ├── base.css               # Reset, @font-face, color & theme variables
│   │   ├── layout.css             # Page layout, navigation, grid & footer
│   │   ├── components.css         # Buttons, status badges, cards & form fields
│   │   ├── beranda.css            # Hero & portfolio slider layout
│   │   ├── portofolio.css         # Before/after comparison grid
│   │   ├── booking.css            # Booking tabs, DP rules & receipt
│   │   └── teknisi.css            # Ticket table, checklist & diagnosis box
│   ├── js/
│   │   ├── storage.js             # Seed data, localStorage CRUD & symptom logic
│   │   ├── booking.js             # Booking flow, grace period, DP & ticket lookup
│   │   ├── teknisi.js             # Dashboard stats & live search/filter
│   │   ├── tiket-detail.js        # Inspection checklist & status updates
│   │   └── riwayat.js             # Repair history timeline
│   ├── fonts/                     # IBM Plex Sans & IBM Plex Mono (woff2)
│   └── img/                       # Visual assets, logo & portfolio SVGs
├── DESIGN.md                      # Design tokens, colors & typography guide
├── AUDIT.md                       # Accessibility & usability audit report
├── .gitignore
└── README.md
```

## Running Locally

Open `web-statis/index.html` directly in a browser, or serve it over a local HTTP server so font paths and CSS modules load cleanly:

```bash
python3 -m http.server 8000 --directory web-statis
```

Then open `http://localhost:8000` (or use VS Code's Live Server extension on `web-statis/index.html`).

## License
IBM Plex fonts are licensed under the SIL Open Font License 1.1 (`fonts/LICENSE-IBM-Plex.txt`).
