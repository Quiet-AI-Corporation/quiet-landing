/**
 * Pre-render script: generates static HTML for each route after Vite build.
 *
 * 1. Serves the built dist/ folder locally
 * 2. Visits each route with Puppeteer
 * 3. Saves the rendered HTML as index.html in each route's directory
 * 4. Copies dist/index.html → dist/404.html for GitHub Pages SPA fallback
 */
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import puppeteer from 'puppeteer'

const DIST = new URL('../dist', import.meta.url).pathname

const routes = [
  '/',
  '/accounts-payable',
  '/po-lifecycle',
  '/three-way-match',
  '/cash-management',
  '/fraud-prevention',
  '/pricing',
  '/about',
  '/demo',
  '/purchasing-demo',
]

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

// Simple static file server for dist/
function createStaticServer() {
  return createServer((req, res) => {
    let filePath = join(DIST, req.url === '/' ? '/index.html' : req.url)

    // SPA fallback: if file doesn't exist and no extension, serve index.html
    if (!existsSync(filePath) && !extname(filePath)) {
      filePath = join(DIST, 'index.html')
    }

    try {
      const content = readFileSync(filePath)
      const ext = extname(filePath)
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
      res.end(content)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  })
}

async function prerender() {
  console.log('Starting pre-render...')

  const server = createStaticServer()
  await new Promise(resolve => server.listen(0, resolve))
  const port = server.address().port
  const origin = `http://localhost:${port}`

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  for (const route of routes) {
    const url = `${origin}${route}`
    console.log(`  Rendering ${route}`)
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Wait a bit for animations to settle and content to render
    await page.waitForSelector('#root > *', { timeout: 10000 })

    const html = await page.content()

    // Write to dist/<route>/index.html
    if (route === '/') {
      writeFileSync(join(DIST, 'index.html'), html)
    } else {
      const dir = join(DIST, route)
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'index.html'), html)
    }
  }

  await browser.close()
  server.close()

  // Copy index.html to 404.html for GitHub Pages SPA fallback
  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')
  writeFileSync(join(DIST, '404.html'), indexHtml)

  console.log('Pre-render complete! Generated static HTML for all routes.')
}

prerender().catch(err => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
