# Nexus Agency OS app

This folder contains the React/Vite application for Nexus Agency OS. The repository-level [README](../README.md) contains the product overview, architecture, database notes, and full setup guide.

## Commands

Run these commands from this folder:

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

The same commands are available from the repository root through wrapper scripts.

## App structure

- `src/app/` — routing, layouts, and route guards
- `src/components/` — shared UI components
- `src/features/` — admin, client, developer, request, and public flows
- `src/hooks/` — React Query and domain hooks
- `src/services/` — Supabase service layer
- `supabase/migrations/` — database schema and security migrations
