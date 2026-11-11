import { useState, useMemo, useEffect } from 'react'
import { marked } from 'marked'
import { docTree, getDoc } from './content.js'
import { days, subjectColors, notesForSubject, backRevision, checkpoints } from './plan.js'

marked.setOptions({ gfm: true, breaks: true })

const loadDone = () => {
  try { return new Set(JSON.parse(localStorage.getItem('sebi-done') || '[]')) }
  catch { return new Set() }
}

export default function App() {
  const [view, setView] = useState({ type: 'home' })
  const [done, setDone] = useState(loadDone)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleDone = (d) => {
    const next = new Set(done)
    next.has(d) ? next.delete(d) : next.add(d)
    setDone(next)
    localStorage.setItem('sebi-done', JSON.stringify([...next]))
  }

  return (
    <div className="app">
      <aside className={sidebarOpen ? 'sidebar' : 'sidebar closed'}>
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <div className="brand-title">SEBI Grade A</div>
            <div className="brand-sub">IT Stream · 2027</div>
          </div>
        </div>
        <nav>
          <NavItem label="Dashboard" active={view.type === 'home'} onClick={() => setView({ type: 'home' })} />
          <NavItem label="49-Day Plan" active={view.type === 'plan'} onClick={() => setView({ type: 'plan' })} />
          <div className="nav-divider" />
          {docTree.map((g) => (
            <div key={g.folder} className="nav-group">
              <div className="nav-group-label">{g.label}</div>
              {g.docs.map((d) => (
                <NavItem
                  key={d.path}
                  label={d.name}
                  sub
                  active={view.type === 'doc' && view.path === d.path}
                  onClick={() => setView({ type: 'doc', path: d.path })}
                />
              ))}
            </div>
          ))}
          <NavItem label="README" sub active={view.type === 'doc' && view.path === 'README.md'} onClick={() => setView({ type: 'doc', path: 'README.md' })} />
        </nav>
      </aside>

      <main>
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        {view.type === 'home' && <Home done={done} go={setView} />}
        {view.type === 'plan' && <Plan done={done} toggleDone={toggleDone} go={setView} />}
        {view.type === 'doc' && <DocView path={view.path} go={setView} />}
      </main>
    </div>
  )
}

function NavItem({ label, active, onClick, sub }) {
  return (
    <button className={`nav-item ${sub ? 'sub' : ''} ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  )
}

function Home({ done, go }) {
  const pct = Math.round((done.size / 49) * 100)
  const nextDay = days.find((d) => !done.has(d.d)) || days[days.length - 1]
  const today = new Date()
  const todayIdx = Math.max(0, Math.round((today - new Date('2026-11-13')) / 86400000))
  const todayDay = days[Math.min(todayIdx, 48)]
  const backRev = backRevision(todayDay.d)
  const nextCp = checkpoints.find((c) => c.day >= todayDay.d)

  return (
    <div className="page">
      <h1>Mission SEBI 2027</h1>
      <p className="muted">Syllabus deadline: Dec 31, 2026 · 49 days · ~3 hrs/day</p>

      <div className="grid3">
        <div className="card stat">
          <div className="stat-num">{pct}%</div>
          <div className="muted">Plan complete</div>
          <div className="bar"><div className="bar-fill" style={{ width: pct + '%' }} /></div>
        </div>
        <div className="card stat">
          <div className="stat-num">{done.size}<span className="muted small">/49</span></div>
          <div className="muted">Days done</div>
        </div>
        <div className="card stat">
          <div className="stat-num">{49 - done.size}</div>
          <div className="muted">Days remaining</div>
        </div>
      </div>

      <div className="card hero-card">
        <div className="hero-label">TODAY — Day {todayDay.d} · {todayDay.date}</div>
        <h2>{todayDay.title}</h2>
        <div className="chips">
          <Chip color={subjectColors[todayDay.sub]}>{todayDay.sub}</Chip>
          {todayDay.tb && <span className="chip tb">Testbook: {todayDay.tb}</span>}
        </div>
        <div className="hero-block">
          <div><strong>90m</strong> IT topic</div>
          <div><strong>15m</strong> Back-revision{backRev ? ` — ${backRev.sub}` : ' (extra drills)'}</div>
          <div><strong>45m</strong> Paper 1 rotation</div>
          <div><strong>20m</strong> GA drip</div>
          <div><strong>5m</strong> Error log</div>
        </div>
        {backRev && (
          <div className="backrev-line" onClick={() => go({ type: 'doc', path: backRev.path })}>
            ✍️ Back-revision today: <strong>{backRev.sub}</strong> — write one table/section from memory, then check →
          </div>
        )}
        <div className="row">
          {notesForSubject[todayDay.sub] && (
            <button className="btn primary" onClick={() => go({ type: 'doc', path: notesForSubject[todayDay.sub] })}>
              Open today's notes →
            </button>
          )}
          <button className="btn" onClick={() => go({ type: 'plan' })}>Full plan</button>
        </div>
      </div>

      <div className="card">
        <div className="hero-label">NEXT UP — Day {nextDay.d} · {nextDay.date}</div>
        <h3>{nextDay.title}</h3>
      </div>

      {nextCp && (
        <div className="card">
          <div className="hero-label">SCORE CHECKPOINT — Day {nextCp.day}</div>
          <h3>{nextCp.test}</h3>
          <p className="muted">Target: {nextCp.target}. Record every mock score in the tracker below — two misses in a row means the plan bends to your weak area.</p>
        </div>
      )}

      <ScoreTracker />
    </div>
  )
}

function ScoreTracker() {
  const [scores, setScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sebi-scores') || '[]') } catch { return [] }
  })
  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [max, setMax] = useState('')

  const add = () => {
    if (!name.trim() || !score) return
    const entry = { date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), name: name.trim(), score: +score, max: +max || 100 }
    const next = [...scores, entry]
    setScores(next)
    localStorage.setItem('sebi-scores', JSON.stringify(next))
    setName(''); setScore(''); setMax('')
  }
  const del = (i) => {
    const next = scores.filter((_, j) => j !== i)
    setScores(next)
    localStorage.setItem('sebi-scores', JSON.stringify(next))
  }
  const trend = scores.length >= 2
    ? scores[scores.length - 1].score / scores[scores.length - 1].max - scores[0].score / scores[0].max
    : null

  return (
    <div className="card">
      <div className="hero-label">MOCK SCORE TRACKER</div>
      <div className="score-form">
        <input placeholder="Test name (e.g. FT Phase I #1)" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Score" type="number" value={score} onChange={(e) => setScore(e.target.value)} style={{ width: '80px' }} />
        <input placeholder="/100" type="number" value={max} onChange={(e) => setMax(e.target.value)} style={{ width: '70px' }} />
        <button className="btn primary" onClick={add}>Add</button>
      </div>
      {trend !== null && (
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          Trend: {trend >= 0 ? '📈 up' : '📉 down'} {Math.abs(Math.round(trend * 100))}% since first test
        </p>
      )}
      {scores.length > 0 && (
        <table className="score-table">
          <thead><tr><th>Date</th><th>Test</th><th>Score</th><th></th></tr></thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={i}>
                <td className="muted">{s.date}</td>
                <td>{s.name}</td>
                <td><strong>{s.score}</strong><span className="muted">/{s.max} ({Math.round(s.score / s.max * 100)}%)</span></td>
                <td><button className="link" onClick={() => del(i)}>✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function Chip({ color, children }) {
  return <span className="chip" style={{ background: color + '22', color, borderColor: color + '55' }}>{children}</span>
}

function Plan({ done, toggleDone, go }) {
  const weeks = useMemo(() => {
    const w = []
    for (let i = 0; i < 49; i += 7) w.push(days.slice(i, i + 7))
    return w
  }, [])

  return (
    <div className="page">
      <h1>49-Day Plan</h1>
      <p className="muted">Click a day to mark done — saves locally. Click a day card's notes link to open the material.</p>
      {weeks.map((week, i) => (
        <div key={i} className="week">
          <div className="week-label">Week {i + 1} · {week[0].date} — {week[week.length - 1].date}</div>
          <div className="day-grid">
            {week.map((d) => (
              <div key={d.d} className={`day-card ${done.has(d.d) ? 'done' : ''} ${d.sub === 'Weekly' || d.sub === 'Milestone' ? 'weekly' : ''}`}>
                <div className="day-top">
                  <button className={`check ${done.has(d.d) ? 'on' : ''}`} onClick={() => toggleDone(d.d)} aria-label="mark done">
                    {done.has(d.d) ? '✓' : ''}
                  </button>
                  <div>
                    <div className="day-num">Day {d.d}</div>
                    <div className="day-date">{d.date}</div>
                  </div>
                </div>
                <div className="day-title">{d.title}</div>
                <div className="chips">
                  <Chip color={subjectColors[d.sub]}>{d.sub}</Chip>
                </div>
                {d.tb && <div className="tb-line">📋 {d.tb}</div>}
                {backRevision(d.d) && <div className="backrev-mini">✍️ back-rev: {backRevision(d.d).sub}</div>}
                {notesForSubject[d.sub] && (
                  <button className="link" onClick={() => go({ type: 'doc', path: notesForSubject[d.sub] })}>open notes →</button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DocView({ path, go }) {
  const doc = getDoc(path)
  const html = useMemo(() => (doc ? marked.parse(doc.text) : '<p>Not found.</p>'), [path])

  useEffect(() => { window.scrollTo(0, 0) }, [path])

  return (
    <div className="page doc">
      <div className="doc-path">{path}</div>
      <article dangerouslySetInnerHTML={{ __html: html }} />
      <button className="btn" style={{ marginTop: '2rem' }} onClick={() => go({ type: 'plan' })}>← Back to plan</button>
    </div>
  )
}
