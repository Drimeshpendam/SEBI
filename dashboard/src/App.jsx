import { useState, useMemo, useEffect, useRef } from 'react'
import { marked } from 'marked'
import { docTree, allDocs, getDoc } from './content.js'
import { days, subjectColors, notesForSubject, backRevision, checkpoints, p1For, gaTestFor, sectionMarks, marksForSub, p1Sections, p1Cover, p2Cover, weekCover } from './plan.js'
import { practiceLinks } from './links.js'
import { paper1, paper2 } from './patterns.js'
import { examples } from './examples.js'
import { quizzes, reserve } from './quiz.js'
import { conceptSections, poolFor } from './concepts.js'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

function ExQ({ ex, qi }) {
  return (
    <div className="exq">
      <div className="exq-q">Q{qi + 1}. {ex.q}</div>
      <div className="exq-opts">{ex.o.map((opt, j) => <span key={j} className="exq-opt">({LETTERS[j]}) {opt}</span>)}</div>
      <details className="exq-ans"><summary>Answer &amp; trick →</summary><span><strong>Ans ({LETTERS[ex.a]}) {ex.o[ex.a]}</strong> — {ex.x}</span></details>
    </div>
  )
}

marked.setOptions({ gfm: true, breaks: true })

const loadDone = () => {
  try { return new Set(JSON.parse(localStorage.getItem('sebi-done') || '[]')) }
  catch { return new Set() }
}

export default function App() {
  const [view, setView] = useState({ type: 'home' })
  const [done, setDone] = useState(loadDone)
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 860)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return allDocs.filter((d) => (d.name + ' ' + d.path).toLowerCase().includes(q))
  }, [query])

  const nav = (v) => {
    setView(v)
    if (window.innerWidth <= 860) setSidebarOpen(false)
  }

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
          <NavItem label="Today" active={view.type === 'home'} onClick={() => nav({ type: 'home' })} />
          <NavItem label="Study Plan (49 days)" active={view.type === 'plan'} onClick={() => nav({ type: 'plan' })} />
          <NavItem label="Question Patterns" active={view.type === 'patterns'} onClick={() => nav({ type: 'patterns' })} />
          <NavItem label="Playbooks" active={view.type === 'doc' && view.path === '00_Overview/Question_Playbooks.md'} onClick={() => nav({ type: 'doc', path: '00_Overview/Question_Playbooks.md' })} />
          <NavItem label="Exam Strategy" active={view.type === 'strategy'} onClick={() => nav({ type: 'strategy' })} />
          <NavItem label="Practice Sites" active={view.type === 'links'} onClick={() => nav({ type: 'links' })} />
          <NavItem label="Take a Test" active={view.type === 'quiz'} onClick={() => nav({ type: 'quiz' })} />
          <NavItem label="W1 · Practice 100" active={view.type === 'practice'} onClick={() => nav({ type: 'practice' })} />
          <a className="nav-item nav-pdf" href={`/api/daily-pdf?date=${new Date().toISOString().slice(0, 10)}`} target="_blank" rel="noreferrer">Revision PDF ↗</a>
          <a className="nav-item nav-pdf" href="/api/daily-pdf?date=cram" target="_blank" rel="noreferrer">Cram Sheet PDF ↗</a>
          <input
            className="nav-search"
            placeholder="Search notes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filtered ? (
            <div className="nav-group">
              <div className="nav-group-label">{filtered.length} result{filtered.length === 1 ? '' : 's'}</div>
              {filtered.map((d) => (
                <NavItem
                  key={d.path}
                  label={d.name}
                  sub
                  active={view.type === 'doc' && view.path === d.path}
                  onClick={() => nav({ type: 'doc', path: d.path })}
                />
              ))}
            </div>
          ) : (
            <>
              <div className="nav-divider" />
              {docTree.map((g) => (
                <NavGroup key={g.folder} g={g} view={view} nav={nav} />
              ))}
              <NavItem label="README" sub active={view.type === 'doc' && view.path === 'README.md'} onClick={() => nav({ type: 'doc', path: 'README.md' })} />
            </>
          )}
        </nav>
      </aside>

      {sidebarOpen && <div className="scrim" onClick={() => setSidebarOpen(false)} />}

      <main>
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? '✕' : '☰'}</button>
        {view.type === 'home' && <Home done={done} go={setView} />}
        {view.type === 'plan' && <Plan done={done} toggleDone={toggleDone} go={setView} />}
        {view.type === 'links' && <Links />}
        {view.type === 'patterns' && <Patterns />}
        {view.type === 'strategy' && <Strategy go={setView} />}
        {view.type === 'doc' && <DocView path={view.path} go={setView} />}
        {view.type === 'quiz' && <QuizView />}
        {view.type === 'practice' && <Practice100 week={1} />}
      </main>
    </div>
  )
}

function NavItem({ label, active, onClick, sub, deep }) {
  return (
    <button className={`nav-item ${sub ? 'sub' : ''} ${deep ? 'deep' + deep : ''} ${active ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  )
}

function NavGroup({ g, view, nav }) {
  const hasActive = g.docs.some((d) => view.type === 'doc' && view.path === d.path)
  const [open, setOpen] = useState(hasActive)
  useEffect(() => {
    if (hasActive) setOpen(true)
  }, [hasActive])
  const rootDocs = g.groups.find((sg) => sg.sub === '')?.docs || []
  const parents = new Map()
  g.groups
    .filter((sg) => sg.sub !== '')
    .forEach((sg) => {
      const head = sg.sub.split('/')[0]
      if (!parents.has(head)) parents.set(head, [])
      parents.get(head).push(sg)
    })
  const renderDoc = (d, deep) => (
    <NavItem
      key={d.path}
      label={d.name}
      sub
      deep={deep}
      active={view.type === 'doc' && view.path === d.path}
      onClick={() => nav({ type: 'doc', path: d.path })}
    />
  )
  return (
    <div className="nav-group">
      <button className={`nav-group-head ${hasActive ? 'cur' : ''}`} onClick={() => setOpen(!open)}>
        <span className="chev">{open ? '▾' : '▸'}</span>
        <span>{g.label}</span>
        <span className="nav-count">{g.docs.length}</span>
      </button>
      {open && (
        <div className="nav-children">
          {rootDocs.map((d) => renderDoc(d, 1))}
          {[...parents.entries()].map(([head, sgs]) => (
            <NavSub key={head} title={head.replace(/_/g, ' ')} groups={sgs} view={view} nav={nav} renderDoc={renderDoc} />
          ))}
        </div>
      )}
    </div>
  )
}

function NavSub({ title, groups, view, nav, renderDoc }) {
  const all = groups.flatMap((sg) => sg.docs)
  const hasActive = all.some((d) => view.type === 'doc' && view.path === d.path)
  const [open, setOpen] = useState(hasActive)
  useEffect(() => {
    if (hasActive) setOpen(true)
  }, [hasActive])
  return (
    <div className="nav-sub">
      <button className={`nav-sub-head ${hasActive ? 'cur' : ''}`} onClick={() => setOpen(!open)}>
        <span className="chev">{open ? '▾' : '▸'}</span>
        <span>{title}</span>
        <span className="nav-count">{all.length}</span>
      </button>
      {open &&
        groups.map((sg) =>
          sg.sub.includes('/') ? (
            <div key={sg.sub}>
              <div className="nav-sub2-label">{sg.sub.split('/').pop().replace(/_/g, ' ')}</div>
              {sg.docs.map((d) => renderDoc(d, 2))}
            </div>
          ) : (
            <div key={sg.sub}>{sg.docs.map((d) => renderDoc(d, 2))}</div>
          )
        )}
    </div>
  )
}

function Home({ done, go }) {
  const pct = Math.round((done.size / 49) * 100)
  const nextDay = days.find((d) => !done.has(d.d)) || days[days.length - 1]
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const MONTH_IDX = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
  const toDate = (lbl) => { const [m, dd] = lbl.trim().split(/\s+/); return new Date(2026, MONTH_IDX[m], +dd) }
  const todaysTasks = days.filter((dy) => toDate(dy.date).getTime() === today.getTime())
  const todayDay = todaysTasks.find((dy) => /weekly/i.test(dy.title)) || todaysTasks[0] || null
  const alsoToday = todaysTasks.filter((dy) => dy !== todayDay)
  const upcoming = days.find((dy) => toDate(dy.date).getTime() > today.getTime())
  const started = today >= toDate(days[0].date)
  const ended = today > toDate(days[days.length - 1].date)
  const refDay = todayDay ? todayDay.d : (upcoming ? upcoming.d : 49)
  const backRev = backRevision(refDay)
  const nextCp = checkpoints.find((c) => c.day >= refDay)

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
        {!started ? (
          <>
            <div className="hero-label">PLAN STARTS {days[0].date.toUpperCase()}</div>
            <h2>Day {days[0].d}: {days[0].title}</h2>
            <p className="muted">Preview — the 49-day clock begins {days[0].date}. First day is light on purpose: set up files, skim DBMS notes, log GA.</p>
          </>
        ) : ended ? (
          <>
            <div className="hero-label">PLAN COMPLETE</div>
            <h2>All 49 days done</h2>
            <p className="muted">Revision + mocks continue from here — use the tracker and error log to drive the remaining days.</p>
          </>
        ) : todayDay ? (
          <>
            <div className="hero-label">TODAY — Day {todayDay.d} · {todayDay.date}</div>
            <h2>{todayDay.title}</h2>
            <div className="chips">
              <Chip color={subjectColors[todayDay.sub]}>{todayDay.sub}</Chip>
              {todayDay.mk && <span className="mk-chip" title="Estimated marks of the 100-mark Paper-2 paper this day covers">{todayDay.mk} marks</span>}
              {todayDay.tb && <span className="chip tb">Testbook: {todayDay.tb}</span>}
            </div>
            {todayDay.mkqs && <div className="mkqs-line">Qs from this topic: {todayDay.mkqs}</div>}
            <div className="cover-line">
              Today covers ≈ <b>P1 {p1Cover(todayDay)}m</b> + <b>P2 {p2Cover(todayDay)}m</b>
              {/weekly/i.test(todayDay.title) && (() => { const w = weekCover(todayDay); return ` — week avg ≈ P1 ${w.p1}m + P2 ${w.p2}m/day` })()}
            </div>
            <div className="marks-split">
              P1 sections:&nbsp;
              {p1Sections.map((s, i) => (
                <span key={s.name} className={p1For(todayDay).sections.includes(s.name) ? 'mk-part on' : 'mk-part'}>
                  {s.name} {s.marks}{i < p1Sections.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
            <div className="marks-split">
              P2 sections:&nbsp;
              {sectionMarks.map((s, i) => (
                <span key={s.name} className={s.subs.includes(todayDay.sub) ? 'mk-part on' : 'mk-part'}>
                  {s.name} {s.marks}{i < sectionMarks.length - 1 ? ' · ' : ''}
                </span>
              ))}
              {marksForSub(todayDay.sub) && todayDay.mk && !isNaN(parseInt(todayDay.mk.replace(/[^\d]/g,''))) && (
                <span className="mk-today"> — today ≈{todayDay.mk.replace(/[^\d]/g,'')} of {marksForSub(todayDay.sub).name}'s {marksForSub(todayDay.sub).marks}</span>
              )}
            </div>
            <div className="hero-block">
              <div><strong>90m</strong> IT topic</div>
              <div><strong>15m</strong> Back-revision{backRev ? ` — ${backRev.sub}` : ' (extra drills)'}</div>
              <div><strong>45m</strong> Paper 1 ({p1For(todayDay).sections.join(' + ')}) — {p1For(todayDay).label}</div>
              <div><strong>20m</strong> GA drip + {gaTestFor(todayDay).label}</div>
              <div><strong>5m</strong> Error log</div>
            </div>
            <div className="drill-card">
              <div className="drill-head">Today's drill — what to practise now</div>
              <div className="drill-line"><span className="drill-sec">P1 focus ({p1For(todayDay).sections.join(' + ')})</span> {p1For(todayDay).label}{p1For(todayDay).detail && ` — ${p1For(todayDay).detail}`}</div>
              <div className="drill-line"><span className="drill-sec">Timed set</span> 40 Qs — 10 Quant + 10 Reasoning + 10 English + 10 GA (~90s each)</div>
              <div className="drill-line"><span className="drill-sec">GA test</span> {gaTestFor(todayDay).label} → <button className="link" onClick={() => go({ type: 'doc', path: gaTestFor(todayDay).path })}>open test</button></div>
              <div className="drill-line"><span className="drill-sec">Practice</span> <button className="link" onClick={() => go({ type: 'quiz' })}>DBMS Day-1 test (15 Qs)</button> · <button className="link" onClick={() => go({ type: 'patterns' })}>pattern drills</button></div>
              <div className="drill-line"><span className="drill-sec">Revision PDF</span> <a className="link" href={`/api/daily-pdf?date=${new Date().toISOString().slice(0, 10)}`} target="_blank" rel="noreferrer">open today's PDF in browser →</a> · <a className="link" href="/api/daily-pdf?date=cram" target="_blank" rel="noreferrer">cram sheet PDF →</a></div>
            </div>
            {alsoToday.map((dy) => (
              <div className="backrev-line" key={dy.d}>Also scheduled today — Day {dy.d}: {dy.title}</div>
            ))}
            {p1For(todayDay).links.length > 0 && (
              <div className="row">
                {p1For(todayDay).links.map((l) => (
                  <button key={l.path} className="btn" onClick={() => go({ type: 'doc', path: l.path })}>Open {l.name} →</button>
                ))}
                {p1For(todayDay).patterns && (
                  <button className="btn" onClick={() => go({ type: 'patterns' })}>Practice patterns →</button>
                )}
                <button className="btn" onClick={() => go({ type: 'doc', path: gaTestFor(todayDay).path })}>Open {gaTestFor(todayDay).label} →</button>
              </div>
            )}
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
          </>
        ) : (
          <>
            <div className="hero-label">TODAY — Buffer / catch-up day</div>
            <h2>No new topic — clear the week's backlog</h2>
            <div className="hero-block">
              <div><strong>45m</strong> Finish pending drills</div>
              <div><strong>30m</strong> Redo error log</div>
              <div><strong>20m</strong> Weekly GA recall</div>
            </div>
            {upcoming && <p className="muted">Next: Day {upcoming.d} — {upcoming.title} ({upcoming.date})</p>}
            <div className="row">
              <button className="btn" onClick={() => go({ type: 'plan' })}>Full plan</button>
            </div>
          </>
        )}
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

      <div className="card">
        <div className="hero-label">CUT-OFF GATES — NO SECTIONAL CUTOFF</div>
        <div className="gates">
          <div className="gate-col">
            <div className="gate-title">Phase 1 · Screening <span className="muted">(marks not counted in merit)</span></div>
            <div className="gate-row"><span>Paper 1 — aptitude (60 min)</span><strong>≥ 30/100</strong></div>
            <div className="gate-row"><span>Paper 2 — IT (40 min)</span><strong>≥ 40/100</strong></div>
            <div className="gate-row"><span>Aggregate (P1 + P2)</span><strong>≥ 80/200</strong></div>
          </div>
          <div className="gate-col">
            <div className="gate-title">Phase 2 · Mains <span className="muted">(85% of final merit)</span></div>
            <div className="gate-row"><span>Paper 1 — English descriptive</span><strong>≥ 30/100</strong></div>
            <div className="gate-row"><span>Paper 2 — IT (180 min)</span><strong>≥ 40/100</strong></div>
            <div className="gate-row"><span>TWS = P1×⅓ + P2×⅔</span><strong>≥ 50/100</strong></div>
          </div>
        </div>
        <p className="muted" style={{ marginTop: '0.7rem' }}>
          Each gate applies to the whole paper — no per-section bar exists. Final merit = Phase 2 TWS (85%) + Interview (15%).
          <br /><br />
          Min. attempts at ~85% accuracy: <strong>P1 ≈ 52–61 of 80 Qs</strong> (GA 16–18 · Eng 15–17 · Reasoning 12–14 · Quant 9–12), <strong>P2-IT ≈ 38–42 of 50 Qs</strong> · Phase 2: all 3 descriptive answers + <strong>~90 of 100 IT Qs</strong> for a merit-level score (~75–85 TWS; 50 is the floor, not the target). Blind guessing is −¼ — skip unless you can eliminate 2+ options.
        </p>
        <button className="link" onClick={() => go({ type: 'doc', path: '00_Overview/Exam_Pattern.md' })}>full exam pattern →</button>
      </div>

      <AttemptPlan />

      <ScoreTracker />
    </div>
  )
}

function AttemptPlan() {
  return (
    <div className="card">
      <div className="hero-label">EXAM-DAY ATTEMPT PLAN — Phase 1</div>
      <div className="gate-title" style={{ marginTop: '.5rem' }}>Paper 1 · Aptitude — 80 Qs (20/section) · 60 min · need 30/100 · ~55 attempts</div>
      <div className="tbl-wrap">
        <table className="score-table">
          <thead><tr><th>Section</th><th>Avail</th><th>Attempt</th><th>Time</th><th>Order</th></tr></thead>
          <tbody>
            <tr><td>GA + Financial Awareness</td><td>20</td><td><strong>16–18</strong></td><td>~10m</td><td>1st — cheapest marks, 30s/Q, skip pure blanks</td></tr>
            <tr><td>English</td><td>20</td><td><strong>15–17</strong></td><td>~12m</td><td>2nd — RC + error/fillers, high accuracy</td></tr>
            <tr><td>Reasoning</td><td>20</td><td><strong>12–14</strong></td><td>~18m</td><td>3rd — all singles first, 1 easy puzzle, skip hardest set</td></tr>
            <tr><td>Quant</td><td>20</td><td><strong>9–12</strong></td><td>~15m</td><td>4th — only fast wins (approx, series, easy DI), skip long arithmetic</td></tr>
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ fontSize: '.8rem', marginTop: '.5rem' }}>GA + English alone ≈ 33 attempts → ~34 marks at 85% = clears the 30-gate by themselves. Accuracy beats volume: 10 Quant @90% &gt; 15 Quant @60%.</p>

      <div className="gate-title" style={{ marginTop: '1rem' }}>Paper 2 · IT — 50 Qs × 2 marks · 40 min · need 40/100 · ~38–42 attempts</div>
      <div className="tbl-wrap">
        <table className="score-table">
          <thead><tr><th>Block</th><th>~Qs</th><th>Attempt</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>Programming + output traces</td><td>~15</td><td><strong>13–14</strong></td><td>9 prep days — dry-runs are mechanical marks</td></tr>
            <tr><td>DBMS + SQL</td><td>~10</td><td><strong>8–9</strong></td><td>First block studied — freshest</td></tr>
            <tr><td>DSA + Algorithms</td><td>~10</td><td><strong>8–9</strong></td><td>Traces + complexity — predictable</td></tr>
            <tr><td>Networks + InfoSec</td><td>~10</td><td><strong>7–8</strong></td><td>Definition-ish — fast if known, skip if not</td></tr>
            <tr><td>DA / DW / Shell + trivia</td><td>~5</td><td><strong>3–4</strong></td><td>Smallest weight — sure ones only</td></tr>
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ fontSize: '.8rem', marginTop: '.5rem' }}>
        <strong>Guessing rule:</strong> Paper 1 −¼ → guess only when 2+ options eliminated. Paper 2 at 2 marks/Q → eliminated-2 guess is <em>positive</em> EV, so guess more there; zero-idea still = skip.<br />
        <strong>Aggregate target:</strong> P1 ~55 + P2 ~55–62 ≈ <strong>110–117/200 vs 80 needed</strong> — clears the gate with margin.
      </p>
      <div className="gate-title" style={{ marginTop: '1rem' }}>Rough sheet — WRITE these in the first 2 min (memorize formulas; write lookups)</div>
      <table className="score-table">
        <thead><tr><th>#</th><th>Write</th><th>Time</th><th>Pays off in</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>Fraction↔% families (1/2→1/16, 1/3→1/12, 1/5→1/20, 1/7, 1/9, 1/11, 1/13)</td><td>~35s</td><td>Every approximation + DI %</td></tr>
          <tr><td>B</td><td>Squares 11–30 + cubes 1–15 (answers only)</td><td>~40s</td><td>Series + roots in approximation</td></tr>
          <tr><td>C</td><td>EJOTY anchors (E5 J10 O15 T20 Y25)</td><td>~10s</td><td>Letter→position in coding/series</td></tr>
          <tr><td>D</td><td>Primes 2–97 + facing map (N: L=W R=E | S: L=E R=W)</td><td>~30s</td><td>Series spot-check + circular puzzles</td></tr>
          <tr><td>+</td><td>Your 2–3 personal fumble formulas (e.g. ab/(a+b), CI−SI = P(R/100)²)</td><td>~15s</td><td>Whichever arithmetic Q catches you</td></tr>
        </tbody>
      </table>
    </div>
  )
}

function Strategy({ go }) {
  return (
    <div className="page">
      <h1>Exam Strategy</h1>
      <p className="muted">Phase-1 attempt plan — what to attempt, in what order, and when to guess. No sectional cutoffs: split = marks-maximising, not quota.</p>
      <AttemptPlan />
      <div className="card">
        <div className="hero-label">ROUGH SHEET — THE 2-MINUTE PRE-WRITE</div>
        <p className="muted" style={{ fontSize: '.85rem' }}>
          First ~2 min of the exam: write 4 blocks (fraction↔% families, squares+cubes, EJOTY letter positions, primes+facing map). Every question after costs less — GA/English barely need paper; Reasoning lives on Block D, Quant on Blocks A–C.
        </p>
        <button className="link" onClick={() => go({ type: 'doc', path: '01_Phase1_Paper1/Rough_Sheet_Playbook.md' })}>open the full playbook →</button>
      </div>
      <div className="card">
        <div className="hero-label">PAPER-2 GUESSING MATH (why you guess MORE there)</div>
        <p className="muted" style={{ fontSize: '.85rem' }}>
          A 2-mark question: right = +2, wrong = −0.5. Random guess (25%): 0.25×2 − 0.75×0.5 = <strong>+0.125 EV — break-even-ish</strong>.
          Eliminate 2 options (50%): 0.5×2 − 0.5×0.5 = <strong>+0.75 EV — always take it</strong>.
          Zero idea = skip (donate −0.5 otherwise). On Paper 1 (1.25-mark Qs, −0.3125) a 2-option guess is still positive (+0.47) but pure guesses are negative — stricter there.
        </p>
      </div>
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
        <div className="tbl-wrap">
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
        </div>
      )}
    </div>
  )
}

function Chip({ color, children }) {
  return <span className="chip" style={{ background: color + '22', color, borderColor: color + '55' }}>{children}</span>
}

function Plan({ done, toggleDone, go }) {
  const weeks = useMemo(() => {
    // weeks = numbered blocks (Days 1–7, 8–14, ...) — the Weekly day closes the
    // block it verifies even though it's dated on the following Saturday.
    const MONTH = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
    const dateOf = (d) => { const [m, dd] = d.date.trim().split(/\s+/); return new Date(2026, MONTH[m], +dd) }
    const w = []
    for (let i = 0; i < 49; i += 7) w.push(days.slice(i, i + 7))
    const fmt = (x) => x.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
    return w.map((week) => {
      const study = week.filter((d) => !/weekly|milestone/i.test(d.sub))
      const test = week.find((d) => /weekly|milestone/i.test(d.sub))
      const ds = study.map(dateOf).sort((a, b) => a - b)
      return {
        days: week,
        range: `${fmt(ds[0])} — ${fmt(ds[ds.length - 1])}${test ? ` · test ${fmt(dateOf(test))}` : ''}`,
      }
    })
  }, [])

  return (
    <div className="page">
      <h1>Study Plan � 49 Days</h1>
      <p className="muted">Click a day to mark done — saves locally. Click a day card's notes link to open the material.</p>
      {weeks.map((week, i) => (
        <div key={i} className="week">
          <div className="week-label">Week {i + 1} · Days {week.days[0].d}–{week.days[week.days.length - 1].d} · {week.range}</div>
          <div className="day-grid">
            {week.days.map((d) => (
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
                {d.mkqs && <div className="mkqs-line">Qs: {d.mkqs}</div>}
                <div className="cover-line">covers ≈ P1 {p1Cover(d)}m + P2 {p2Cover(d)}m{/weekly/i.test(d.title) && (() => { const w = weekCover(d); return ` · wk avg ${w.p1}+${w.p2}/day` })()}</div>
                <div className="chips">
                  <Chip color={subjectColors[d.sub]}>{d.sub}</Chip>
                  {d.mk && <span className="mk-chip" title="Estimated marks of the 100-mark Paper-2 paper this day covers">{d.mk} marks</span>}
                </div>
                <div className="p1-mini">P1: {p1For(d).label}{p1For(d).detail && ` — ${p1For(d).detail}`}</div>
                <div className="p1-mini">GA: {gaTestFor(d).label}</div>
                <button className="link p1-link" onClick={() => go({ type: 'doc', path: gaTestFor(d).path })}>open {gaTestFor(d).label} →</button>
                {p1For(d).links.map((l) => (
                  <button key={l.path} className="link p1-link" onClick={() => go({ type: 'doc', path: l.path })}>open {l.name} →</button>
                ))}
                {p1For(d).patterns && (
                  <button className="link p1-link" onClick={() => go({ type: 'patterns' })}>practice patterns →</button>
                )}
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

function Links() {
  return (
    <div className="page">
      <h1>Practice Sites</h1>
      <p className="muted">Free MCQ banks &amp; SEBI-specific sources for Phase 1 Paper 2 — click any card to open in a new tab. Full details: PYQs → Practice Links doc.</p>
      {practiceLinks.map((g) => (
        <div key={g.group}>
          <div className="week-label" style={{ marginTop: '1.4rem' }}>{g.group}</div>
          <div className="link-grid">
            {g.links.map((l) => (
              <a key={l.url} className="link-card" href={l.url} target="_blank" rel="noopener noreferrer">
                <div className="link-name">{l.name}</div>
                {l.note && <div className="link-note">{l.note}</div>}
                <div className="link-arrow">open ↗</div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Patterns() {
  const [open, setOpen] = useState(null)
  const toggle = (k) => setOpen(open === k ? null : k)
  return (
    <div className="page">
      <h1>Question Patterns</h1>
      <p className="muted">Topic → the question patterns actually asked. Click a topic to expand. Sources: Jan-2026 official handout, 2024/2026 exam analyses (Oliveboard, BankersAdda, EduTap), memory-based PYQs.</p>

      <div className="week-label" style={{ marginTop: '1.4rem' }}>PHASE 1 · PAPER 1 — aptitude (20 Qs each · 25 marks · 1.25/Q)</div>
      {paper1.map((s, si) => (
        <div key={s.section} className="card pat-section">
          <div className="pat-sec-head">
            <span className="pat-dot" style={{ background: s.color }} />
            <h3>{s.section}</h3>
            <span className="muted">20 Qs · 25 marks</span>
          </div>
          {s.note && <p className="pat-note">{s.note}</p>}
          {s.daily && <p className="pat-note p1-daily"><strong>📅 Daily map:</strong> {s.daily}</p>}
          {s.topics.map((t, ti) => {
            const k = 'p1-' + si + '-' + ti
            return (
              <div key={t.name} className="pat-topic">
                <button className="pat-topic-head" onClick={() => toggle(k)}>
                  <span className="pat-caret">{open === k ? '▾' : '▸'}</span>
                  <span className="pat-topic-name">{t.name}</span>
                  <span className="pat-qs">{t.qs} Qs</span>
                  {t.tag && <span className="pat-tag">{t.tag}</span>}
                </button>
                {open === k && (
                  <div className="pat-list">
                    {t.patterns.map(([p, e], pi) => (
                      <div key={p} className="pat-row">
                        <div className="pat-pname">{p}</div>
                        <div className="pat-pdet muted">{e}</div>
                        <div className="ex-list">
                          {(examples[`${si}-${ti}-${pi}`] || []).map((ex, qi) => <ExQ key={qi} ex={ex} qi={qi} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}

      <div className="week-label" style={{ marginTop: '1.4rem' }}>PHASE 1 · PAPER 2 — IT (50 Qs · 100 marks · official weightages)</div>
      <div className="card pat-section">
        {paper2.map((t, ti) => {
          const k = 'p2-' + ti
          return (
            <div key={t.topic} className="pat-topic">
              <button className="pat-topic-head" onClick={() => toggle(k)}>
                <span className="pat-caret">{open === k ? '▾' : '▸'}</span>
                <span className="pat-dot" style={{ background: t.color }} />
                <span className="pat-topic-name">{t.topic}</span>
                <span className="pat-qs">{t.qs} Qs</span>
                <span className="pat-tag">{t.weight}</span>
              </button>
              {open === k && (
                <div className="pat-list">
                  {t.note && <p className="pat-note">{t.note}</p>}
                  {t.patterns.map(([p, e], pi) => (
                    <div key={p} className="pat-row">
                      <div className="pat-pname">{p}</div>
                      <div className="pat-pdet muted">{e}</div>
                      <div className="ex-list">
                        {(examples[`p2-${ti}-${pi}`] || []).map((ex, qi) => <ExQ key={qi} ex={ex} qi={qi} />)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SCORES_KEY = 'sebiScores'
const GEN_KEY = 'sebiGenRequests'
const loadScores = () => { try { return JSON.parse(localStorage.getItem(SCORES_KEY) || '[]') } catch { return [] } }
const saveScore = (rec) => { const all = [...loadScores(), rec]; localStorage.setItem(SCORES_KEY, JSON.stringify(all)); return all }
const loadGenReqs = () => { try { return JSON.parse(localStorage.getItem(GEN_KEY) || '[]') } catch { return [] } }
const saveGenReqs = (all) => { localStorage.setItem(GEN_KEY, JSON.stringify(all)); return all }
const GEN_TESTS_KEY = 'sebiGenTests'
const USED_RES_KEY = 'sebiUsedReserve'
const loadGenTests = () => { try { return JSON.parse(localStorage.getItem(GEN_TESTS_KEY) || '[]') } catch { return [] } }
const saveGenTests = (all) => { localStorage.setItem(GEN_TESTS_KEY, JSON.stringify(all)); return all }
const loadUsedRes = () => { try { return new Set(JSON.parse(localStorage.getItem(USED_RES_KEY) || '[]')) } catch { return new Set() } }
const saveUsedRes = (s) => { localStorage.setItem(USED_RES_KEY, JSON.stringify([...s])); return s }

const sectionOf = (tag) => (tag || 'General').split(':')[0].trim()

function QuizView() {
  const [picked, setPicked] = useState({})
  const [quizIdx, setQuizIdx] = useState(-1)
  const [day, setDay] = useState('')
  const [section, setSection] = useState('')
  const [topic, setTopic] = useState('')
  const [mins, setMins] = useState('')
  const [timeLeft, setTimeLeft] = useState(null)
  const [scores, setScores] = useState(loadScores)
  const [saved, setSaved] = useState(false)
  const [genReqs, setGenReqs] = useState(loadGenReqs)
  const [genTopic, setGenTopic] = useState('')
  const [genCopied, setGenCopied] = useState(null)
  const [genTests, setGenTests] = useState(loadGenTests)
  const [usedRes, setUsedRes] = useState(loadUsedRes)
  const [genSel, setGenSel] = useState(-1)
  const [genEmpty, setGenEmpty] = useState(false)

  const addGenReq = () => {
    const t = (genTopic || topic || section || '').trim()
    if (!t) return
    // draw unused questions for this topic from the reserve pool
    // (loose match: exact tag, tag contains query, or query contains tag suffix)
    const tl = t.toLowerCase()
    const match = (q) => {
      const tag = (q.t || '').toLowerCase()
      return tag === tl || tag.includes(tl) || tl.includes(tag)
    }
    // reserve first; if dry, fall back to unused bank questions for the topic
    let fresh = reserve.filter((q) => match(q) && !usedRes.has(q.q)).slice(0, 10)
    let fromBank = false
    if (!fresh.length) {
      fresh = quizzes.flatMap((qz) => qz.questions).filter((q) => match(q) && !usedRes.has(q.q)).slice(0, 10)
      fromBank = true
    }
    if (fresh.length) {
      const g = { id: `gen-${Date.now()}`, title: `${t} — generated set ${genTests.filter((x) => x.topic === t).length + 1}`, tag: `${fresh.length} Qs · auto-generated${fromBank ? ' (bank)' : ''}`, questions: fresh, topic: t, day: day || '' }
      setGenTests(saveGenTests([...genTests, g]))
      setUsedRes(saveUsedRes(new Set([...usedRes, ...fresh.map((q) => q.q)])))
      setGenSel(genTests.length); setQuizIdx(-1); setGenEmpty(false); retake(); setGenTopic('')
    } else {
      // reserve dry — queue a refill request for Devin
      const req = { topic: `refill reserve: ${t}`, day: day || '', date: new Date().toISOString().slice(0, 10) }
      fetch('/api/gen-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req) }).catch(() => {})
      setGenReqs(saveGenReqs([...genReqs, req])); setGenEmpty(true)
    }
  }
  const removeGenReq = (i) => setGenReqs(saveGenReqs(genReqs.filter((_, j) => j !== i)))
  const copyAsk = (req, i) => {
    navigator.clipboard?.writeText(`generate test for ${req.topic}${req.day ? ` (Day ${req.day})` : ''}`)
    setGenCopied(i); setTimeout(() => setGenCopied(null), 1500)
  }

  // Day → Section → Topic drill tree, built from every question in the bank.
  // Day options come from the 49-day plan (plan.js `days`) so the picker mirrors the day cards.
  const planDays = days.map((p) => p.d)
  const testDays = new Set(quizzes.map((q) => q.day).filter(Boolean))
  const dayQs = quizzes.filter((q) => !day || q.day === +day).flatMap((q) => q.questions)
  const sections = [...new Set(dayQs.map((q) => sectionOf(q.t)))].sort()
  const secQs = dayQs.filter((q) => !section || sectionOf(q.t) === section)
  const topics = [...new Set(secQs.map((q) => q.t))].sort()
  const drillQs = secQs.filter((q) => !topic || q.t === topic)

  const named = quizIdx >= 0 ? quizzes[quizIdx] : null
  const genTest = genSel >= 0 ? genTests[genSel] : null
  const drillQuiz = drillQs.length
    ? { id: `drill-d${day || 'all'}-${topic || section || 'all'}`, title: topic || `${section || 'All sections'} · Day ${day || 'all'}`, tag: `${drillQs.length} Qs pooled from the bank`, questions: drillQs }
    : null
  const quiz = genTest || named || drillQuiz
  const answered = Object.keys(picked).length
  const doneAll = quiz && answered === quiz.questions.length
  const correct = quiz ? Object.entries(picked).filter(([qi, a]) => quiz.questions[+qi].a === a).length : 0

  const pick = (qi, j) => { if (qi in picked) return; setPicked({ ...picked, [qi]: j }) }
  const retake = (m = mins) => { setPicked({}); setSaved(false); setTimeLeft(m ? +m * 60 : null) }

  const finish = (force) => {
    if (saved || !quiz || (!doneAll && !force) || answered === 0) return
    const byTopic = {}
    quiz.questions.forEach((qu, qi) => {
      const t = qu.t || 'General'
      byTopic[t] = byTopic[t] || { c: 0, n: 0 }
      byTopic[t].n++
      if (picked[qi] === qu.a) byTopic[t].c++
    })
    const rec = { quizId: quiz.id, title: quiz.title, date: new Date().toISOString().slice(0, 10), correct, total: quiz.questions.length, byTopic }
    setScores(saveScore(rec)); setSaved(true); setTimeLeft(null)
  }

  useEffect(() => {
    if (timeLeft == null) return
    if (timeLeft <= 0) { finish(true); return }
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  // per-topic mastery across all saved attempts
  const topicMastery = {}
  scores.forEach((r) => Object.entries(r.byTopic || {}).forEach(([t, v]) => {
    topicMastery[t] = topicMastery[t] || { c: 0, n: 0 }
    topicMastery[t].c += v.c; topicMastery[t].n += v.n
  }))

  return (
    <div className="page">
      <h1>Take a Test</h1>
      <p className="muted">{quiz ? `${quiz.title} — ${quiz.tag}` : 'Pick a day → section → topic, or a named test.'}</p>

      <div className="card quiz-picker drill-picker">
        <div className="drill-row">
          <label>Day
            <select className="quiz-select" value={day} disabled={!!named} onChange={(e) => { setDay(e.target.value); setSection(''); setTopic(''); setQuizIdx(-1); setGenSel(-1); retake() }}>
              <option value="">All days</option>
              {planDays.map((d) => {
                const p = days.find((x) => x.d === d)
                const n = quizzes.filter((q) => q.day === d).flatMap((q) => q.questions).length
                return <option key={d} value={d}>Day {d} — {p?.title || ''} {n ? `(${n} Qs)` : '(no test yet)'}</option>
              })}
            </select>
          </label>
          <label>Section
            <select className="quiz-select" value={section} disabled={!!named} onChange={(e) => { const s = e.target.value; setSection(s); setTopic(''); setQuizIdx(-1); setGenSel(-1); setMins(s === 'GA' ? '10' : ''); retake(s === 'GA' ? '10' : '') }}>
              <option value="">All sections</option>
              {sections.map((s) => <option key={s} value={s}>{s} ({dayQs.filter((q) => sectionOf(q.t) === s).length})</option>)}
            </select>
          </label>
          <label>Topic
            <select className="quiz-select" value={topic} disabled={!!named} onChange={(e) => { setTopic(e.target.value); setQuizIdx(-1); setGenSel(-1); retake() }}>
              <option value="">All topics</option>
              {topics.map((t) => <option key={t} value={t}>{t.split(':')[1]?.trim() || t} ({secQs.filter((q) => q.t === t).length})</option>)}
            </select>
          </label>
          <label>Timer (min){section === 'GA' || (named && named.id.startsWith('ga-')) ? ' — GA auto: 10' : ''}
            <input className="quiz-select timer-input" type="number" min="0" placeholder="off" value={mins} onChange={(e) => setMins(e.target.value)} onBlur={() => retake()} />
          </label>
        </div>
        {quiz && <p className="muted small drill-info">Loaded: <strong>{quiz.questions.length} Qs</strong> — {quiz.title}</p>}
        {!named && !quiz && day && <p className="muted small drill-info">No questions banked for Day {day} yet — tell Devin <em>"generate Day {day} test"</em>.</p>}
      </div>

      <div className="card quiz-picker">
        <span className="muted small" style={{ alignSelf: 'center' }}>Named tests:</span>
        <select
          className="quiz-select"
          value={quizIdx}
          onChange={(e) => { const v = +e.target.value; setQuizIdx(v); setGenSel(-1); if (v >= 0) { setDay(''); setSection(''); setTopic(''); setMins(quizzes[v].id.startsWith('ga-') ? '10' : '') } retake(v >= 0 && quizzes[v].id.startsWith('ga-') ? '10' : '') }}
        >
          <option value={-1}>— pick a named test (or use drill picker above) —</option>
          {quizzes.map((q, i) => (
            <option key={q.id} value={i}>
              Day {q.day || '—'} · {q.title} · {scores.filter((s) => s.quizId === q.id).map((s) => `${s.correct}/${s.total}`).slice(-1)[0] || 'new'}
            </option>
          ))}
        </select>
      </div>
      {genTests.length > 0 && (
        <div className="card quiz-picker">
          <span className="muted small" style={{ alignSelf: 'center' }}>Generated sets:</span>
          <select
            className="quiz-select"
            value={genSel}
            onChange={(e) => { const v = +e.target.value; setGenSel(v); if (v >= 0) { setQuizIdx(-1); setDay(''); setSection(''); setTopic('') } retake() }}
          >
            <option value={-1}>— archived generated tests ({genTests.length}) —</option>
            {genTests.map((g, i) => (
              <option key={g.id} value={i}>
                {g.title} · {scores.filter((s) => s.quizId === g.id).map((s) => `${s.correct}/${s.total}`).slice(-1)[0] || 'new'}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="card quiz-picker gen-req">
        <span className="muted small" style={{ alignSelf: 'center' }}>Need fresh questions?</span>
        <input
          className="quiz-select"
          placeholder={topic || section ? `${topic || section}` : 'type a topic…'}
          value={genTopic}
          onChange={(e) => setGenTopic(e.target.value)}
        />
        <button className="btn primary" onClick={addGenReq}>+ Generate new</button>
        <span className="muted small">{genEmpty ? 'reserve dry for this topic — refill request queued for Devin.' : 'pulls 10 unused questions from the reserve into a new generated set (archives below).'}</span>
      </div>
      {genReqs.length > 0 && (
        <div className="card gen-req-list">
          <span className="muted small"><strong>Pending requests:</strong></span>
          {genReqs.map((r, i) => (
            <div key={i} className="gen-req-row">
              <span>{r.topic}{r.day ? ` · Day ${r.day}` : ''} <span className="muted">({r.date})</span></span>
              <button className="link" onClick={() => copyAsk(r, i)}>{genCopied === i ? 'copied ✓' : 'copy ask'}</button>
              <button className="link" onClick={() => removeGenReq(i)}>done ✕</button>
            </div>
          ))}
        </div>
      )}

      {quiz && (
      <div className="card quiz-score">
        {timeLeft != null && <div className={`stat-num timer ${timeLeft < 60 ? 'timer-low' : ''}`}>⏱ {fmt(timeLeft)}</div>}
        <div className="stat-num">{correct}<span className="muted small">/{answered || quiz.questions.length}</span></div>
        <div className="muted">correct{answered ? ` · ${answered} attempted` : ''}</div>
        {answered > 0 && !saved && <button className="btn primary" onClick={() => finish(!doneAll)}>{doneAll ? 'Finish & save score' : 'End test & save'}</button>}
        {saved && <span className="quiz-saved">Saved to scoreboard ✓</span>}
        {answered > 0 && <button className="btn" onClick={retake}>Retake test</button>}
      </div>
      )}

      {quiz && quiz.questions.map((qu, qi) => {
        const sel = picked[qi]
        const doneQ = sel !== undefined
        return (
          <div key={qi} className="card exq">
            <div className="exq-q">Q{qi + 1}. {qu.q} <span className="quiz-topic muted">{qu.t}</span></div>
            <div className="exq-opts quiz-opts">
              {qu.o.map((opt, j) => {
                let cls = 'exq-opt quiz-opt'
                if (doneQ) {
                  if (j === qu.a) cls += ' right'
                  else if (j === sel) cls += ' wrong'
                  else cls += ' dim'
                }
                return (
                  <button key={j} className={cls} onClick={() => pick(qi, j)} disabled={doneQ}>
                    ({LETTERS[j]}) {opt}
                  </button>
                )
              })}
            </div>
            {doneQ && (
              <div className={`quiz-why ${sel === qu.a ? 'ok' : 'bad'}`}>
                <strong>{sel === qu.a ? '✓ Correct' : `✗ Wrong — answer is (${LETTERS[qu.a]}) ${qu.o[qu.a]}`}</strong>
                <span> — {qu.x}</span>
              </div>
            )}
          </div>
        )
      })}

      {scores.length > 0 && (
        <div className="card scoreboard">
          <h3>Scoreboard — daily performance</h3>
          <table className="score-tbl">
            <thead><tr><th>Date</th><th>Test</th><th>Score</th></tr></thead>
            <tbody>
              {scores.slice().reverse().map((r, i) => (
                <tr key={i}><td>{r.date}</td><td>{r.title}</td><td><strong>{r.correct}/{r.total}</strong> ({Math.round(100 * r.correct / r.total)}%)</td></tr>
              ))}
            </tbody>
          </table>
          {Object.keys(topicMastery).length > 0 && (
            <>
              <h4>Topic mastery (all attempts)</h4>
              <table className="score-tbl">
                <thead><tr><th>Topic</th><th>Right</th><th>Mastery</th></tr></thead>
                <tbody>
                  {Object.entries(topicMastery).sort((a, b) => a[1].c / a[1].n - b[1].c / b[1].n).map(([t, v]) => (
                    <tr key={t} className={v.c / v.n < 0.6 ? 'weak' : ''}>
                      <td>{t}</td><td>{v.c}/{v.n}</td>
                      <td>{Math.round(100 * v.c / v.n)}%{v.c / v.n < 0.6 ? ' ← weak spot' : ''} <button className="link" onClick={() => { setDay(''); setSection(sectionOf(t)); setTopic(t); setQuizIdx(-1); retake(); window.scrollTo(0, 0) }}>practise more →</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  )
}

const p100Key = (w) => 'sebi-p100-w' + w
const loadP100 = (w) => {
  try {
    const cur = JSON.parse(localStorage.getItem(p100Key(w)) || '{}')
    if (Object.keys(cur).length || w !== 1) return cur
    return JSON.parse(localStorage.getItem('sebi-p100') || '{}')
  } catch { return {} }
}
const saveP100 = (w, m) => { localStorage.setItem(p100Key(w), JSON.stringify(m)); return m }

function Practice100({ week = 1 }) {
  const [cid, setCid] = useState(null)
  const [picked, setPicked] = useState({})
  const [progress, setProgress] = useState(loadP100(week))
  const [saved, setSaved] = useState(false)

  const concept = cid ? conceptSections.flatMap((s) => s.concepts).find((c) => c.id === cid) : null
  const qs = useMemo(() => (concept ? poolFor(concept, concept.target) : []), [cid])
  const my = progress[cid] || {}
  const answered = Object.keys(my).length
  const correctN = Object.values(my).filter((v) => v === 1).length

  const pickOpt = (qi, j) => {
    if (qi in picked) return
    const right = qs[qi].a === j ? 1 : 0
    setPicked({ ...picked, [qi]: j })
    const next = { ...progress, [cid]: { ...my, [qs[qi].q]: right } }
    setProgress(saveP100(week, next))
  }

  const resetConcept = () => {
    const next = { ...progress, [cid]: {} }
    setProgress(saveP100(week, next)); setPicked({}); setSaved(false)
  }

  return (
    <div className="page">
      <div className="week-label">Week {week}</div>
      <h1>Practice 100</h1>
      <p className="muted">Week {week} syllabus — 100 questions per concept, teach-card on top, easy→hard, click an option to check. Progress saves locally.</p>

      {!concept && conceptSections.map((s) => (
        <div key={s.name}>
          <div className="week-label" style={{ marginTop: '1.4rem' }}>{s.name}</div>
          <div className="link-grid">
            {s.concepts.map((c) => {
              const p = progress[c.id] || {}
              const done = Object.keys(p).length
              const corr = Object.values(p).filter((v) => v === 1).length
              const acc = done ? Math.round(100 * corr / done) : null
              return (
                <button key={c.id} className="link-card p100-card" onClick={() => { setCid(c.id); setPicked({}); setSaved(false) }}>
                  <div className="link-name">{c.name}</div>
                  <div className="link-note">{done}/{c.target} done{acc !== null ? ` · ${acc}%` : ''}</div>
                  <div className="link-arrow">{done >= c.target ? 'complete ✓' : 'open →'}</div>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {concept && (
        <>
          <button className="btn" onClick={() => setCid(null)}>← All concepts</button>
          <div className="card" style={{ marginTop: '1rem' }}>
            <div className="hero-label">{concept.name.toUpperCase()} — the card</div>
            <div className="p100-lesson" dangerouslySetInnerHTML={{ __html: marked.parse(concept.lesson) }} />
            <p className="muted small">{answered}/{concept.target} answered · {correctN} correct{answered ? ` (${Math.round(100 * correctN / answered)}%)` : ''} · {qs.length} Qs in pool{saved ? ' · saved ✓' : ''}</p>
            <button className="link" onClick={resetConcept}>reset progress</button>
          </div>
          {qs.map((qu, qi) => {
            const sel = picked[qi]
            const doneQ = sel !== undefined
            return (
              <div key={qi} className="card exq">
                <div className="exq-q">Q{qi + 1}. {qu.q} <span className="quiz-topic muted">{qu.d}</span></div>
                <div className="exq-opts quiz-opts">
                  {qu.o.map((opt, j) => {
                    let cls = 'exq-opt quiz-opt'
                    if (doneQ) {
                      if (j === qu.a) cls += ' right'
                      else if (j === sel) cls += ' wrong'
                      else cls += ' dim'
                    }
                    return (
                      <button key={j} className={cls} onClick={() => pickOpt(qi, j)} disabled={doneQ}>
                        ({LETTERS[j]}) {opt}
                      </button>
                    )
                  })}
                </div>
                {doneQ && (
                  <div className={`quiz-why ${sel === qu.a ? 'ok' : 'bad'}`}>
                    <strong>{sel === qu.a ? '✓ Correct' : `✗ Wrong — answer is (${LETTERS[qu.a]}) ${qu.o[qu.a]}`}</strong>
                    <span> — {qu.x}</span>
                  </div>
                )}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

function DocView({ path, go }) {
  const doc = getDoc(path)
  const html = useMemo(() => (doc ? marked.parse(doc.text) : '<p>Not found.</p>'), [path])
  const artRef = useRef(null)

  useEffect(() => { window.scrollTo(0, 0) }, [path])
  useEffect(() => {
    artRef.current?.querySelectorAll('a[href^="http"]').forEach((a) => {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    })
  }, [html])

  return (
    <div className="page doc">
      <div className="doc-path">{path}</div>
      <article ref={artRef} dangerouslySetInnerHTML={{ __html: html }} />
      <button className="btn" style={{ marginTop: '2rem' }} onClick={() => go({ type: 'plan' })}>← Back to plan</button>
    </div>
  )
}
