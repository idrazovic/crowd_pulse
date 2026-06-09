# Current Feature

Feed UI Phase 2

## Status

Completed

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-06-07** — Initial Next.js 16 project setup (Create Next App, TypeScript, Tailwind CSS v4, App Router). Added project context files: `project-overview.md`, `coding-standards.md`, `ai-interaction.md`, `current-feature.md`.
- **2026-06-09** — Feed UI Phase 1: initialized ShadCN UI (canary, Tailwind v4 compatible), installed Avatar/Badge/Button components, created `/feed` route with sticky TopBar (logo, search, bell, avatar), hero heading with "Live Crowd Signal" tag, Vibe/Country filter chips, and 2-column responsive LineupCard grid using mock data. Dark mode enabled globally.
- **2026-06-09** — Feed UI Phase 2: logo navigates to `/feed`; search icon toggles inline search bar with X close; notifications bell opens dropdown with dummy notifications from mock-data; profile avatar opens dropdown with Profile (→ `/user/[id]`) and Sign Out; Vibe/Country filter chips open dropdowns from mock-data; lineup cards link to `/lineup/[id]`; stub pages for `/lineup/[id]` and `/user/[id]` added. Installed ShadCN dropdown-menu (Base UI canary).
