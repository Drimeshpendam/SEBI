import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const DR_DIR = path.resolve(__dirname, '..', 'Daily_Revision')
const BUILDER = path.resolve(__dirname, '..', '..', '.tools', 'build_daily_revision.py')

// POST /api/gen-request {topic, day} → appends to gen-requests.json so the
// next Devin session sees pending test-generation asks (read by sebi-daily-test skill)
const genRequests = () => ({
  name: 'gen-requests',
  configureServer(server) {
    server.middlewares.use('/api/gen-request', (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
      let body = ''
      req.on('data', (c) => { body += c })
      req.on('end', () => {
        try {
          const item = JSON.parse(body)
          const file = path.resolve(__dirname, 'gen-requests.json')
          const all = JSON.parse(fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '[]')
          all.push({ ...item, date: new Date().toISOString().slice(0, 10), status: 'pending' })
          fs.writeFileSync(file, JSON.stringify(all, null, 2))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, count: all.length }))
        } catch { res.statusCode = 400; res.end('bad request') }
      })
    })

    // GET /api/daily-pdf?date=YYYY-MM-DD — serve (or build then serve) the day's
    // revision PDF so it opens in the browser straight from the dashboard
    server.middlewares.use('/api/daily-pdf', (req, res) => {
      const url = new URL(req.url, 'http://x')
      const date = url.searchParams.get('date') || new Date().toISOString().slice(0, 10)
      const pdf = date === 'cram'
        ? path.join(DR_DIR, 'Master_Cram_Sheet_Revision.pdf')
        : path.join(DR_DIR, `${date}_Revision.pdf`)
      if (date !== 'cram' && !/^\d{4}-\d{2}-\d{2}$/.test(date)) { res.statusCode = 400; res.end('bad date'); return }
      if (!fs.existsSync(pdf) && date !== 'cram') {
        // try building it on the fly from the day's markdown
        try { execFileSync('python', [BUILDER, '--date', date], { stdio: 'pipe' }) } catch {}
      }
      if (!fs.existsSync(pdf)) { res.statusCode = 404; res.end('No revision PDF for ' + date); return }
      res.setHeader('Content-Type', 'application/pdf')
      fs.createReadStream(pdf).pipe(res)
    })

    // GET /api/daily-pdfs — list available revision PDF dates (for a picker)
    server.middlewares.use('/api/daily-pdfs', (req, res) => {
      const files = fs.existsSync(DR_DIR) ? fs.readdirSync(DR_DIR).filter((f) => f.endsWith('.pdf')) : []
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(files.map((f) => f.replace('.pdf', ''))))
    })
  },
})

export default defineConfig({
  base: '/sebi-dashboard/',
  plugins: [react(), genRequests()],
  server: {
    fs: { allow: ['..'] },
    port: 5173
  }
})
