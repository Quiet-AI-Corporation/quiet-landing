---
name: verify
description: How to verify changes to this landing page at runtime (dev server + puppeteer screenshots)
---

# Verifying quiet-landing changes

Surface is a browser GUI. Puppeteer is already a devDependency — no installs needed.

## Recipe

1. `npm run dev > /tmp/dev.log 2>&1 &` — Vite picks the next free port if 5174 is taken; read the actual port from the log.
2. Drive with a Node ESM script from the scratchpad. Puppeteer must be resolved from this repo:
   ```js
   import { createRequire } from 'module'
   const require = createRequire('/path/to/quiet-landing/package.json')
   const puppeteer = require('puppeteer')
   ```
3. Viewport 1440×900 for desktop; `page.goto(url, { waitUntil: 'networkidle0' })`, then take timed screenshots.

## Gotchas

- The hero animation (`LivingDashboardAnimation`) starts its timer cycle on React mount, ~0.5s before `networkidle0` resolves — expect that much skew when timing screenshots against the `EVENTS` `at:` values.
- The animation only runs on desktop widths with no reduced-motion preference. Probe both fallbacks: `page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])` and a 375px viewport — both must show the static dashboard with no flying chips.
- Loop-seamlessness check: the cash figure must read exactly $128,400 shortly after each cycle restart (CYCLE_DURATION in the component file). Read it with `page.evaluate` by regex-matching span text `^\$[\d,]+$`.
