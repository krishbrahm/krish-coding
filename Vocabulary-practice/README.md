# Vocabulary Practice

A React, TypeScript, and Vite app using Supabase.

## Setup

```sh
npm install
cp .env.example .env.local
npm run dev
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` before starting the app. Keep this local file private; Git ignores it. The `.env.example` file documents the required keys without containing credentials.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build in `dist/`.
- `npm run lint` runs ESLint.
- `npm run preview` previews the production build locally.
