# Lucerna

Lucerna is a quiet Catholic prayer companion for daily Mass readings, traditional prayers, and the rhythm of the liturgical year. It is built as a responsive React app with TanStack Start, TanStack Router, Tailwind CSS, and Radix UI primitives.

The app is designed for daily use: open it, see today's Gospel and reflection, pray from a searchable treasury, and keep a simple sense of where the Church is in the liturgical year.

## Features

- Daily home screen with today's Gospel, reflection, liturgical season, and quick prayer links.
- Daily readings page with first reading, responsorial psalm, Gospel, season, and liturgical color.
- Searchable Catholic prayer treasury with category filters.
- Individual prayer pages with support for English and Latin text where available.
- Liturgical calendar overview with the current season highlighted.
- Light and dark themes.
- Adjustable reading experience with font family and font size preferences.
- Local settings persistence through `localStorage`.
- PWA manifest for standalone installation support.
- Responsive layout with desktop navigation and mobile bottom tabs.

## Tech Stack

- React 18
- TypeScript
- Vite
- TanStack Start
- TanStack Router
- TanStack Query
- Tailwind CSS 4
- Radix UI
- lucide-react
- shadcn-style local UI components

## Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Vite will print the local development URL, usually:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

The production server expects the app to have been built first. If the build output path changes, make sure the `start` script in `package.json` points at the generated server entry.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Build the TanStack Start app for production. |
| `npm run start` | Run the configured production server entry after a build. |
| `npm run test` | Placeholder test script. Tests are not configured yet. |

## Project Structure

```text
.
├── public/
│   ├── icon.svg
│   ├── manifest.json
│   └── robot.txt
├── src/
│   ├── components/
│   │   ├── app-layout.tsx
│   │   ├── settings-sheet.tsx
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   ├── daily-readings.ts
│   │   ├── liturgical.ts
│   │   ├── prayers-data.ts
│   │   └── settings-context.tsx
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── readings.tsx
│   │   ├── prayers.tsx
│   │   ├── prayer.$id.tsx
│   │   ├── calendar.tsx
│   │   └── sitemap.xml.ts
│   ├── client.tsx
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Core Routes

| Route | Purpose |
| --- | --- |
| `/` | Daily dashboard with Gospel, reflection, season, and prayer shortcuts. |
| `/readings` | Today's readings and reflection. |
| `/prayers` | Searchable and filterable prayer treasury. |
| `/prayer/$id` | Individual prayer detail page. |
| `/calendar` | Liturgical year overview and current season. |
| `/sitemap.xml` | Sitemap route. |

## Data

The app currently uses local TypeScript data modules:

- `src/lib/prayers-data.ts` for the prayer treasury.
- `src/lib/daily-readings.ts` for daily reading content.
- `src/lib/liturgical.ts` for liturgical season helpers and date formatting.

This keeps the app simple and fast during early development. If the project grows, these modules are natural candidates for an API, CMS, or generated data pipeline.

## Design Notes

Lucerna uses a restrained missal-inspired visual language:

- Serif typography for prayer and reading content.
- Gold accent color for sacred emphasis and navigation states.
- Dark mode by default with a light mode option.
- Mobile-first navigation for devotional use on phones.
- Adjustable reading settings for accessibility and comfort.

Global design tokens live in `src/styles.css`.

## Deployment

The project builds through TanStack Start and Vite:

```bash
npm run build
npm run start
```

Deploy to any host that can run the generated Node server output. For static-only hosting, verify TanStack Start output settings first, since this project currently uses a server entry.

## Current Notes

- Automated tests are not configured yet.
- The `test` script is still a placeholder.
- Daily readings are local sample/static data unless connected to a live readings source.
- The UI brand says `Lumen Officium` in the app header, while the manifest and repository use `Lucerna`.
- `npm run build` currently emits a `dist/` directory; add it to `.gitignore` if build artifacts should stay out of version control.

## License

This project currently uses the `ISC` license as declared in `package.json`.
