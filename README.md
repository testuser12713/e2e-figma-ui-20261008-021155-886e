# Business Handler – klickbarer UI-Prototyp

Der Business Handler ist ein klickbarer Frontend-Prototyp einer B2B-Anwendung für
Kundenverwaltung. Er zeigt die drei Kern-Screens **Dashboard**, **Kundenliste** und
**Kundendetail** und lädt sämtliche Inhalte aus statischen TypeScript-Datenmodulen im
Code – es gibt kein Backend und keinen einzigen Netzwerkaufruf. Umsätze und Datumsangaben
werden mit `Intl` in de-DE formatiert.

## Tech-Stack

- TypeScript
- React 18 + Vite
- react-router-dom (`BrowserRouter`)
- recharts (Umsatzverlauf)
- zentrales Token-Set als CSS-Variablen + CSS Module pro Komponente
- Vitest + @testing-library/react (jsdom)
- statische Beispieldaten unter `src/data/`, kein Backend

## Installation

```bash
npm ci
```

## Entwicklung starten

```bash
npm run dev
```

Danach im Browser `http://localhost:5173` öffnen.

## Produktions-Build

```bash
npm run build
```

Der Build liegt anschließend in `dist/`. Zum Ansehen des gebauten Stands:

```bash
npm run preview
```

## Tests

```bash
npm test
```

## Verwendung

Die Anwendung besteht aus drei Screens, die über die linke Navigation erreichbar sind:

- **Dashboard** (`/`): Kennzahlen-Kacheln, der Umsatzverlauf der letzten Monate und die
  letzten Aktivitäten. Alle Werte werden aus den lokalen Datenmodulen berechnet.
- **Kundenliste** (`/customers`): die Tabelle aller Beispielkunden mit Name, Firma, Ort,
  Umsatz und Status-Badge. Ein Klick auf eine Tabellenzeile öffnet das jeweilige
  Kundendetail.
- **Kundendetail** (`/customers/:customerId`): Kopfbereich mit Kontaktdaten und Status
  sowie die Tabs „Übersicht“, „Aufträge“ und „Notizen“. Eine unbekannte Kunden-ID zeigt
  eine „Kunde nicht gefunden“-Ansicht mit Rückweg zur Kundenliste.

Der Wechsel zwischen den Screens läuft client-seitig ohne vollständiges Neuladen der Seite.

## Features

- Drei Screens (Dashboard, Kundenliste, Kundendetail) mit sichtbarer Navigation
- Umsatzverlauf als Chart über mindestens sechs Monate
- KPI-Kacheln und Aktivitätenliste auf dem Dashboard
- Kundentabelle mit Live-Suche, Statusfilter und Leer-Zustand
- Kundendetail mit Tab-Wechsel (Übersicht, Aufträge, Notizen)
- de-DE-Formatierung für Beträge und Datumsangaben
- Vollständige Tastaturbedienung mit sichtbarem Fokus-Zustand und Alternativtexten
- Zentrales Design-Token-Set als CSS-Variablen
