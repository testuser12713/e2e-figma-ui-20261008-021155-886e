/* Business Handler — static sample data + de-DE formatting helpers.
   No backend, no network. Everything the mockup shows is defined here. */
(function () {
  "use strict";

  function parseISO(s) {
    var p = s.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  var moneyFmt = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
  var dateFmt = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  var MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

  function formatMoney(v) { return moneyFmt.format(v); }
  function formatDate(iso) { return dateFmt.format(parseISO(iso)); }
  function formatMonth(ym) {
    var p = ym.split("-");
    return MONTHS[Number(p[1]) - 1] + " " + p[0];
  }
  function compactMoney(v) {
    return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(Math.round(v)) + " €";
  }

  var AVATAR_COLORS = ["#3B4FD8", "#5A6BE0", "#7C8CF0", "#46586B", "#6E7C93", "#2F41B8"];
  function avatarColor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) { h = (h * 31 + name.charCodeAt(i)) >>> 0; }
    return AVATAR_COLORS[h % AVATAR_COLORS.length];
  }
  function initials(name) {
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) { return parts[0].slice(0, 2).toUpperCase(); }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  var customers = [
    {
      id: "K-1001",
      name: "Anna Schmidt",
      company: "Schmidt & Söhne GmbH",
      city: "Hamburg",
      email: "anna.schmidt@schmidt-soehne.de",
      phone: "+49 40 555 88 12",
      status: "aktiv",
      revenue: 28450.00,
      since: "2019-03-15",
      orders: [
        { id: "A-2612", date: "2026-10-06", description: "Erweiterung Berichtswesen", amount: 11150.00, status: "pending" },
        { id: "A-2601", date: "2026-09-28", description: "Jahreswartung Lagerverwaltung", amount: 4800.00, status: "completed" },
        { id: "A-2587", date: "2026-07-14", description: "Migration ERP-Modul auf Version 5", amount: 12500.00, status: "completed" }
      ],
      notes: [
        { date: "2026-10-08", text: "Bevorzugt Termine vormittags. Ansprechpartner für ERP-Themen: Herr Brandt (Technik)." },
        { date: "2026-09-28", text: "Folgetermin zum Berichtswesen am 20.10.2026 vereinbart." }
      ]
    },
    {
      id: "K-1002",
      name: "Markus Weber",
      company: "Weber Logistik GmbH",
      city: "München",
      email: "m.weber@weber-logistik.de",
      phone: "+49 89 221 45 67",
      status: "aktiv",
      revenue: 41200.00,
      since: "2020-08-04",
      orders: [
        { id: "A-2609", date: "2026-10-01", description: "Rollout Tablet-Kommissionierung", amount: 17200.00, status: "pending" },
        { id: "A-2590", date: "2026-09-02", description: "Schnittstelle Versandsoftware", amount: 9800.00, status: "completed" },
        { id: "A-2554", date: "2026-06-18", description: "Projektanalyse Tourenplanung", amount: 14200.00, status: "completed" }
      ],
      notes: [
        { date: "2026-09-02", text: "Zweiter Standort in Nürnberg geplant – Bedarf an Mandantenfähigkeit prüfen." }
      ]
    },
    {
      id: "K-1003",
      name: "Julia Fischer",
      company: "Fischer Consulting",
      city: "Berlin",
      email: "julia.fischer@fischer-consulting.de",
      phone: "+49 30 887 12 34",
      status: "aktiv",
      revenue: 19800.00,
      since: "2022-01-20",
      orders: [
        { id: "A-2582", date: "2026-08-22", description: "Workshop Prozessoptimierung", amount: 6400.00, status: "completed" },
        { id: "A-2540", date: "2026-05-30", description: "Einführung CRM-Basis", amount: 8500.00, status: "completed" },
        { id: "A-2571", date: "2026-07-11", description: "Zusatzmodul Marketing", amount: 4900.00, status: "cancelled" }
      ],
      notes: []
    },
    {
      id: "K-1004",
      name: "Thomas Wagner",
      company: "Wagner Immobilien",
      city: "Köln",
      email: "t.wagner@wagner-immobilien.de",
      phone: "+49 221 765 44 20",
      status: "inaktiv",
      revenue: 12500.00,
      since: "2018-11-09",
      orders: [
        { id: "A-2418", date: "2025-12-15", description: "Schulung Mitarbeiterportal", amount: 4900.00, status: "completed" },
        { id: "A-2406", date: "2025-11-20", description: "Migration Altdatenbestand", amount: 7600.00, status: "completed" }
      ],
      notes: [
        { date: "2026-01-05", text: "Vertrag ruht seit Q4 2025. Reaktivierung bei neuem Bauprojekt möglich." }
      ]
    },
    {
      id: "K-1005",
      name: "Lisa Becker",
      company: "Becker Dentaltechnik",
      city: "Frankfurt am Main",
      email: "l.becker@becker-dental.de",
      phone: "+49 69 554 88 01",
      status: "aktiv",
      revenue: 22800.00,
      since: "2021-05-17",
      orders: [
        { id: "A-2607", date: "2026-09-29", description: "Erweiterung Chargenverfolgung", amount: 6500.00, status: "pending" },
        { id: "A-2597", date: "2026-09-15", description: "Bestellmodul Dentallabor", amount: 9200.00, status: "completed" },
        { id: "A-2533", date: "2026-04-08", description: "Schnittstelle Röntgenbilder", amount: 7100.00, status: "completed" }
      ],
      notes: [
        { date: "2026-09-15", text: "Neue Röntgen-Schnittstelle läuft stabil. Lob für schnelle Umsetzung." }
      ]
    },
    {
      id: "K-1006",
      name: "Peter Hoffmann",
      company: "Hoffmann Maschinenbau",
      city: "Stuttgart",
      email: "p.hoffmann@hoffmann-maschinenbau.de",
      phone: "+49 711 332 90 18",
      status: "aktiv",
      revenue: 54800.00,
      since: "2017-02-28",
      orders: [
        { id: "A-2588", date: "2026-08-05", description: "Wartungsplaner Maschinenpark", amount: 18600.00, status: "completed" },
        { id: "A-2562", date: "2026-07-19", description: "Kennzahlen-Dashboard", amount: 13800.00, status: "completed" },
        { id: "A-2517", date: "2026-03-21", description: "Anbindung CNC-Steuerung", amount: 22400.00, status: "completed" }
      ],
      notes: [
        { date: "2026-08-05", text: "Größter Einzelkunde. Rahmenvertrag bis 2027. Persönlicher Kontakt: Frau Seidel (Einkauf)." }
      ]
    },
    {
      id: "K-1007",
      name: "Sabine Koch",
      company: "Koch & Partner Steuerberatung",
      city: "Düsseldorf",
      email: "s.koch@koch-partner.de",
      phone: "+49 211 889 55 32",
      status: "aktiv",
      revenue: 16300.00,
      since: "2020-10-12",
      orders: [
        { id: "A-2594", date: "2026-09-09", description: "Mandanten-Datenübernahme", amount: 5800.00, status: "completed" },
        { id: "A-2546", date: "2026-06-02", description: "Beleganalyse-Tool", amount: 10500.00, status: "completed" }
      ],
      notes: [
        { date: "2026-09-09", text: "Jahresabschluss-Saison beachten: Oktober–Januar besonders terminintensiv." }
      ]
    },
    {
      id: "K-1008",
      name: "Daniel Richter",
      company: "Richter IT-Service",
      city: "Leipzig",
      email: "d.richter@richter-it.de",
      phone: "+49 341 556 77 90",
      status: "inaktiv",
      revenue: 9800.00,
      since: "2019-06-25",
      orders: [
        { id: "A-2502", date: "2026-01-12", description: "Server-Umzug Support", amount: 5600.00, status: "cancelled" },
        { id: "A-2439", date: "2025-10-14", description: "Ticket-System Einrichtung", amount: 4200.00, status: "completed" }
      ],
      notes: [
        { date: "2026-02-02", text: "Preissensibel, mehrere Vergleichsangebote. Inaktiv wegen Anbieterwechsel." }
      ]
    },
    {
      id: "K-1009",
      name: "Katrin Wolf",
      company: "Wolf Designbüro",
      city: "Dresden",
      email: "k.wolf@wolf-design.de",
      phone: "+49 351 440 12 86",
      status: "aktiv",
      revenue: 21450.00,
      since: "2022-09-01",
      orders: [
        { id: "A-2608", date: "2026-10-03", description: "Agentur-Portal", amount: 5750.00, status: "pending" },
        { id: "A-2599", date: "2026-09-20", description: "Projektverwaltung Zeiterfassung", amount: 8900.00, status: "completed" },
        { id: "A-2548", date: "2026-05-11", description: "Rechnungsmodul", amount: 6800.00, status: "completed" }
      ],
      notes: [
        { date: "2026-10-03", text: "Kreative Agentur – bevorzugt visuelle Abstimmung per Videoanruf." }
      ]
    },
    {
      id: "K-1010",
      name: "Stefan Braun",
      company: "Braun Elektrotechnik",
      city: "Nürnberg",
      email: "s.braun@braun-elektro.de",
      phone: "+49 911 667 33 24",
      status: "aktiv",
      revenue: 37200.00,
      since: "2020-04-13",
      orders: [
        { id: "A-2586", date: "2026-08-28", description: "Auftrags-App Montageteams", amount: 15600.00, status: "completed" },
        { id: "A-2560", date: "2026-07-01", description: "Mitarbeiterzeiterfassung", amount: 9800.00, status: "completed" },
        { id: "A-2524", date: "2026-04-17", description: "Lager-Bestandsführung", amount: 11800.00, status: "completed" }
      ],
      notes: [
        { date: "2026-08-28", text: "Monteure brauchen Offline-Funktionalität für die Auftrags-App." }
      ]
    },
    {
      id: "K-1011",
      name: "Melanie Krüger",
      company: "Krüger Personalberatung",
      city: "Hannover",
      email: "m.krueger@krueger-personal.de",
      phone: "+49 511 998 66 41",
      status: "inaktiv",
      revenue: 8700.00,
      since: "2018-03-30",
      orders: [
        { id: "A-2428", date: "2025-10-22", description: "Abrechnungs-Export", amount: 3100.00, status: "completed" },
        { id: "A-2411", date: "2025-09-03", description: "Bewerbermanagement Basis", amount: 5600.00, status: "completed" }
      ],
      notes: [
        { date: "2026-01-20", text: "Inaktiv seit 2025. Ansprechpartner gewechselt, Kontakt neu aufbauen." }
      ]
    },
    {
      id: "K-1012",
      name: "Robert Lang",
      company: "Lang Baustoffe",
      city: "Bremen",
      email: "r.lang@lang-baustoffe.de",
      phone: "+49 421 334 88 73",
      status: "aktiv",
      revenue: 30600.00,
      since: "2021-11-08",
      orders: [
        { id: "A-2610", date: "2026-10-05", description: "Schnittstelle Buchhaltung", amount: 9100.00, status: "pending" },
        { id: "A-2600", date: "2026-09-25", description: "Preislisten-Import", amount: 7200.00, status: "completed" },
        { id: "A-2545", date: "2026-05-08", description: "Kundenportal Baustoffe", amount: 14300.00, status: "completed" }
      ],
      notes: [
        { date: "2026-10-05", text: "Buchhaltung stellt zum Jahreswechsel auf neues System um." }
      ]
    }
  ];

  var revenueByMonth = [
    { ym: "2026-03", value: 31800 },
    { ym: "2026-04", value: 29450 },
    { ym: "2026-05", value: 35200 },
    { ym: "2026-06", value: 38100 },
    { ym: "2026-07", value: 36600 },
    { ym: "2026-08", value: 41200 },
    { ym: "2026-09", value: 43800 },
    { ym: "2026-10", value: 47250 }
  ];

  var activities = [
    { date: "2026-10-08", customerId: "K-1001", customerName: "Anna Schmidt", text: "Neuer Auftrag „Erweiterung Berichtswesen“ über 11.150,00 € erfasst" },
    { date: "2026-10-05", customerId: "K-1012", customerName: "Robert Lang", text: "Auftrag „Schnittstelle Buchhaltung“ angelegt" },
    { date: "2026-10-03", customerId: "K-1009", customerName: "Katrin Wolf", text: "Angebot „Agentur-Portal“ versendet" },
    { date: "2026-10-01", customerId: "K-1002", customerName: "Markus Weber", text: "Auftrag „Rollout Tablet-Kommissionierung“ bestätigt" },
    { date: "2026-09-28", customerId: "K-1001", customerName: "Anna Schmidt", text: "Jahreswartung abgeschlossen, Rechnung gestellt" },
    { date: "2026-09-25", customerId: "K-1012", customerName: "Robert Lang", text: "Preislisten-Import abgeschlossen" },
    { date: "2026-09-20", customerId: "K-1009", customerName: "Katrin Wolf", text: "Projekt „Zeiterfassung“ abgeschlossen" }
  ];

  var orderStatus = {
    completed: { label: "Abgeschlossen", cls: "completed" },
    pending: { label: "Offen", cls: "pending" },
    cancelled: { label: "Storniert", cls: "cancelled" }
  };

  var customerStatus = {
    aktiv: { label: "Aktiv", cls: "active" },
    inaktiv: { label: "Inaktiv", cls: "inactive" }
  };

  window.BH = {
    customers: customers,
    revenueByMonth: revenueByMonth,
    activities: activities,
    orderStatus: orderStatus,
    customerStatus: customerStatus,
    formatMoney: formatMoney,
    formatDate: formatDate,
    formatMonth: formatMonth,
    compactMoney: compactMoney,
    avatarColor: avatarColor,
    initials: initials,
    getCustomerById: function (id) {
      for (var i = 0; i < customers.length; i++) {
        if (customers[i].id === id) { return customers[i]; }
      }
      return null;
    }
  };
})();
