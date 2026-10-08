# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Calm, light B2B workspace: generous white space, a single deep-indigo accent, crisp tabular data and soft-shadowed cards — Stripe/Linear clarity rather than decorative chrome.

## Colors

- `--color-bg`: **#F6F7F9**
- `--color-surface`: **#FFFFFF**
- `--color-surface-sunken`: **#EEF0F4**
- `--color-fg`: **#141922**
- `--color-fg-muted`: **#5B6572**
- `--color-fg-subtle`: **#8A93A0**
- `--color-accent`: **#3B4FD8**
- `--color-accent-hover`: **#2F41B8**
- `--color-accent-active`: **#26359B**
- `--color-accent-soft`: **#ECEEFC**
- `--color-accent-contrast`: **#FFFFFF**
- `--color-border`: **#DFE3EA**
- `--color-border-strong`: **#C3C9D4**
- `--color-success`: **#1F7A55**
- `--color-success-soft`: **#E4F4EC**
- `--color-warning`: **#9A6412**
- `--color-warning-soft`: **#FBF0DC**
- `--color-danger`: **#B3352F**
- `--color-danger-soft`: **#FBE9E7**
- `--color-chart-1`: **#3B4FD8**
- `--color-chart-2`: **#7C8CF0**
- `--color-chart-3`: **#9AA5B8**
- `--color-focus-ring`: **#3B4FD8**
- `--color-overlay`: **rgba(20, 25, 34, 0.44)**

## Typography

- `font_family`: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `font_family_mono`: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
- `heading_weight`: 600
- `body_weight`: 400
- `label_weight`: 500
- `size-xs`: 12px
- `size-sm`: 13px
- `size-base`: 14px
- `size-md`: 16px
- `size-lg`: 20px
- `size-xl`: 26px
- `size-2xl`: 32px
- `line-tight`: 1.25
- `line-body`: 1.5
- `letter-tight`: -0.01em

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 6px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-pill`: 999px

## Components

### Button

Sizes: md (min-height 44px, padding 10px 20px, font 14px/500, radius md) and sm (min-height 36px, padding 6px 14px — desktop table/toolbar only, never the primary action on mobile). Variants: primary (bg=accent, fg=accent-contrast, border none; hover bg=accent-hover; active bg=accent-active + translateY(1px); focus 2px focus-ring, offset 2px), secondary (bg=surface, fg=fg, border 1px border; hover bg=surface-sunken + border-strong; active accent-soft), ghost (bg transparent, fg=fg-muted; hover bg=surface-sunken, fg=fg). Disabled: opacity 0.55, cursor not-allowed, no hover/active change, color stays readable (contrast >= 4.5:1 against surface). 'Coming soon' controls use the plain disabled style plus a visible label 'Coming soon' as text or a pill right of the label — never a silent no-op. Icon-only buttons: 44x44 target, aria-label mandatory. All variants: transition base, text never wraps, label may not be truncated.

### Navigation (AppShell sidebar)

Left sidebar, fixed width 232px, full height, bg=surface, right edge hairline. App title block at top (16px/600, 24px padding bottom). Items: 'Dashboard' (/) and 'Customers' (/customers), height 44px, padding 0 12px, radius md, font 14px/500, fg=fg-muted. Hover: bg=surface-sunken, fg=fg. Active (route match, including /customers/:id): bg=accent-soft, fg=accent, 2px accent bar on the left edge. Focus: 2px focus-ring offset -2px (inside item). Content area: bg=bg, padding 32px, max-width 1280px, centered grows to fill remaining width. Below 1024px the sidebar collapses to icons-only (64px) with tooltips; header stays one row.

### Topbar / Page header

Per screen: h1 20px/600 (size-lg) + optional subtitle 13px fg-muted, 24px gap below. Right side holds screen actions (search, filters, buttons). Sticky at top of the content area with bg=bg and a 1px divider that appears only when scrolled. Height 64px, padding 0 32px.

### Card / KPI tile

Card: bg=surface, border hairline, radius lg, shadow card, padding 24px. KPI tile: grid of 4 columns (24px gap) above 1024px, 2 columns between 640 and 1024px. Tile content: label 12px/500 fg-muted uppercase letter-spacing 0.02em, value 26px/600 fg (size-xl, tabular-nums), delta line 13px (success or danger, arrow glyph + de-DE percent). Delta is decorative unless it carries text. Tiles are non-interactive and must not look clickable (no hover lift). Interactive cards (client rows in dashboard lists) get hover border-strong + shadow raised and are keyboard focusable.

### Chart (revenue trend)

Wrapped in a Card, height 320px (280px below 1024px), plot padding 16px. Line or area: stroke chart-1 2px, area fill chart-1 at 12% opacity. Axis labels 12px fg-muted, no gridlines except horizontal dashed lines in border color; axis line border. Y axis: amounts in de-DE compact form ('12.500 €'). X axis: months as 'Okt 2025' (short month + year, de-DE). Minimum 6 points. Hit area/tooltip: surface card with shadow raised, radius md, 12px font, value above label, date full '08.10.2026'. Never rely on color alone — tooltip carries the text. Legend 12px fg-muted above the plot when more than one series.

### Table (customers)

Full-width card, radius lg, hairline border, overflow hidden. Header row: bg=surface-sunken, 12px/500 fg-muted uppercase, height 40px, padding 0 16px, sortable-looking columns get a chevron only if actually sortable (otherwise no affordance). Body rows: height 52px (min 44px hit target), padding 0 16px, divider 1px surface-sunken between rows. Hover: bg=accent-soft 40%. Row is clickable → cursor pointer, role=link/button semantics, focus 2px focus-ring inset, Enter/Space opens the detail. Columns: Name (avatar 32px + name 14px/500 fg, client id 12px fg-subtle under it), Company (13px fg-muted), City (13px fg-muted), Revenue (right-aligned, tabular-nums, '1.234,50 €'), Status badge right-aligned. Numbers right, text left, badges center-right — consistent across all tables. Horizontal overflow never happens down to 1024px: city column may be hidden below 1100px via a documented rule.

### Status badge

Pill, radius pill, padding 2px 10px, font 12px/500, no border. Active: bg=success-soft, fg=success. Inactive: bg=surface-sunken, fg=fg-muted. Order statuses reuse the same shape: Completed=success, Pending=warning-soft/warning, Cancelled=danger-soft/danger. Always carries the word, color is secondary. Focusable only when it acts as a control; otherwise plain text semantics with a visually hidden prefix ('Status:').

### Search input & filter

Input: bg=surface, border hairline, radius md, height 44px, padding 0 12px (leading search icon 16px fg-subtle, 8px gap), font 14px, placeholder fg-subtle ('Kunden suchen…' — content stays de-DE). Focus: border accent + 2px focus-ring offset 2px. Filter as a segmented control on the right of the search field: three options Alle/Aktiv/Inaktiv, height 36px, container bg surface-sunken, radius md, active segment bg surface + shadow card + fg accent, inactive fg-muted, focus-ring inset, group role=radiogroup with arrow-key support. Search and filter sit in one toolbar row (gap 12px, wraps to two rows below 900px). Reset control: ghost button 'Filter zurücksetzen', 44px target, enabled only when at least one filter is non-neutral.

### Tabs (customer detail)

Underline tabs in one row, height 44px, gap 24px, font 14px/500. Inactive: fg-muted, transparent 2px bottom border. Hover: fg=fg. Active: fg=accent with a 2px accent bottom border, plus role=tab with aria-selected. Focus: 2px focus-ring offset 2px. Full-width 1px bottom divider under the row. Labels: Übersicht, Aufträge, Notizen. Tab change swaps only the panel, does not scroll horizontally and does not reset the header.

### Avatar (initials placeholder)

Local only, no CDN. Sizes 32px (table) and 56px (customer header, radius lg). Shape: circle for rows, radius lg card for the header. Background from a 6-step palette derived from the accent (accent, #5A6BE0, #7C8CF0, #46586B, #6E7C93, #2F41B8), foreground white, initials 12px/600 (32px) or 20px/600 (56px). Deterministic pick: hash of the customer name. Decorative duplicates get alt="" and aria-hidden; the header avatar gets alt="Avatar von <Name>" or a visually hidden equivalent. Abstract case/empty illustrations are inline SVG using accent/accent-soft/border at 1.5px stroke — never an external URL.

### Empty state

Centered block inside the table card, padding 48px 24px, max-width 380px. Inline SVG illustration 96px (accent-soft shapes, border strokes), 16px gap, headline 16px/600 fg ('Keine Kunden gefunden'), body 13px fg-muted explaining that search and status filter are combined, then a primary or secondary Button 'Filter zurücksetzen' (44px). Shown only when at least one filter is active — neutral initial state shows plain table content, never this block. Same component covers 'Kunde nicht gefunden' with a 'Zur Kundenliste' button as the single exit.

### Section / list row (activities, orders)

List inside a Card, rows 56px minimum, padding 12px 16px, divider between rows. Layout: left date 13px fg-muted tabular-nums fixed 96px, then customer name 14px/500, then activity text 13px fg-muted truncated to one line with ellipsis and full text as title/aria-label. Right side optional value 14px/500 tabular-nums right-aligned and a status badge. Hover: bg=surface-sunken, only if the row leads somewhere (then cursor pointer + focus ring).

### Toolbar / filter summary

Slim row above the table showing applied filters as text ('3 von 12 Kunden') 13px fg-muted, right-aligned counter. Never show raw query strings; always de-DE number formatting for the count.

### Feedback & overlay

Overlay for future modals: bg=overlay, modal surface bg=surface radius lg shadow raised padding 24px max-width 560px. Not in this sprint's screens; specified so the shell stays consistent. Disabled 'coming soon' affordances use the Button disabled style plus the visible 'Coming soon' label rule.

## Layout Principles

- Single token source: every color, font family/size, spacing and radius value comes from the CSS variables in tokens.css (:root) — no literals inside component CSS modules; components may only compose var(...) values.
- Shell: sidebar 232px fixed (icons-only 64px below 1024px) + content column; content max-width 1280px, horizontal padding 32px desktop / 24px at 1024px, vertical rhythm 32px between sections, 16px inside a card cluster.
- Breakpoints (content-first, desktop to 1024px is the guaranteed range): 1440px full, 1200px tighter table columns, 1024px sidebar collapses and KPI grid drops to 2x2, 640px single column. No horizontal scrolling anywhere in 1024px+; below that, wrap instead of scroll.
- Grid: 12-column fluid grid, 24px gutters, 8px base unit — every gap and padding is a multiple of the spacing scale (4/8/12/16/24/32/48).
- One consistent formatting contract for every value the product displays, so parallel tickets render identically: money = Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}) → '1.234,50 €'; dates = Intl.DateTimeFormat('de-DE', {day:'2-digit', month:'2-digit', year:'numeric'}) → '08.10.2026'; month on chart axes = short month + year → 'Okt 2025'; percentages = one decimal + non-breaking space → '+12,4 %'; counts = de-DE thousand grouping → '1.250'. Use tabular-nums on every numeric cell so columns align.
- Every number gets its unit in the same visual position: right-aligned inside tables and KPI tiles, label above value in tiles, value left in list rows — never mixed within one surface.
- Status is always expressed twice: colored badge plus the written status word; color alone never carries meaning (also true for chart series, which are labelled in the legend/tooltip).
- Keyboard and focus are first-class: visible 2px focus ring (offset 2px, inset for rows/segments) on nav items, table rows, tabs, inputs and buttons; logical DOM order matches visual order; semantic landmarks (nav, main, table, tablist) and alt text on every avatar/illustration.
- Depth is minimal: one hairline border + one soft shadow per card; only genuinely interactive surfaces (clickable rows, clickable cards) get a hover change, so nothing looks clickable that is not.
- Failure and empty states live inside the surface they belong to (empty state inside the table card, 'customer not found' inside the detail shell) with exactly one clear exit action — never a bare error line.
