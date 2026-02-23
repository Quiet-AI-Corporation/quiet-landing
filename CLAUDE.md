# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for Quiet AI (www.tryquiet.ai) — an accounts payable automation product. This is a single-page React app with animated demos, deployed to GitHub Pages.

## Commands

- `npm run dev` — Start dev server on port 5174
- `npm run build` — TypeScript check + Vite production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally

There are no tests or linting configured.

## Architecture

- **Vite + React 18 + TypeScript** with Tailwind CSS for styling
- **Single page app**: `src/main.tsx` renders `src/pages/LandingPage.tsx`
- **Path alias**: `@/` maps to `./src/` (configured in `vite.config.ts` and `tsconfig.json`)
- **UI components**: shadcn/ui pattern in `src/components/ui/` (uses `class-variance-authority`, `clsx`, `tailwind-merge` via `src/lib/utils.ts`)
- **Animations**: Framer Motion used in `src/components/landing/InvoiceProcessingAnimation.tsx` with sequenced timing constants at the top of the file
- **Tailwind theme**: Uses CSS custom properties (HSL color tokens) defined in `src/index.css`, extended in `tailwind.config.js`

## Deployment

- Deployed to GitHub Pages via the `main` branch
- Custom domain: `www.tryquiet.ai` (see `CNAME`)
- `_config.yml` configures Jekyll to exclude `.md` files and only serve static assets
- Static pages (`eula.html`, `privacy-policy.html`) exist both at root and in `public/` — the root copies are for GitHub Pages, the `public/` copies are served by Vite dev server
- The app URL (for sign-in/sign-up redirects) is `https://tryquiet.app`
