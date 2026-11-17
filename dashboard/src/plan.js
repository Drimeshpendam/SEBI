// 49-day plan data — mirrors ClickUp tasks + Study_Plan.md
// mk = estimated marks of the 100-mark Phase-1 Paper-2 paper this day's topic covers
// (weights: Prog 30 · DBMS+SQL 20 · DA/DW/Shell 20 · Networks 10 · InfoSec 10 · DSA 10;
//  test days show the block they verify; Weekly/Blitz days show the paper they simulate)
export const days = [
  { d: 1,  date: 'Nov 13', title: 'DBMS: keys, closure, normalization (1NF–BCNF)', sub: 'DBMS', tb: '', mk: '≈6' , mkqs: 'NF ~2-3Q · keys/closure ~1-2Q · FD ~1Q' },
  { d: 2,  date: 'Nov 14', title: 'DBMS: SQL part 1 (SELECT, joins)', sub: 'DBMS', tb: '', mk: '≈4' , mkqs: 'joins ~1Q · SELECT/output ~1Q' },
  { d: 3,  date: 'Nov 15', title: 'DBMS: SQL part 2 (GROUP BY/HAVING, subqueries)', sub: 'DBMS', tb: '', mk: '≈4' , mkqs: 'GROUP BY/HAVING ~1Q · subquery/set-ops ~1Q' },
  { d: 4,  date: 'Nov 16', title: 'DBMS: ACID, isolation, locks, 2PL', sub: 'DBMS', tb: '', mk: '≈3' , mkqs: 'ACID/isolation ~1-2Q · locks/2PL ~0-1Q' },
  { d: 5,  date: 'Nov 17', title: 'DBMS: indexing, ER→tables + 20 GATE PYQs', sub: 'DBMS', tb: '', mk: '≈3' , mkqs: 'indexing B/B+ ~1Q · ER->tables ~1Q' },
  { d: 6,  date: 'Nov 18', title: 'DBMS topic test (25 Qs) + redo wrongs', sub: 'DBMS', tb: 'Chapter Tests — DB Concepts + SQL Queries', mk: 'test: 20' },
  { d: 7,  date: 'Nov 21', title: 'WEEKLY (Sat): mini IT mock + Reasoning sectional + Essay #1', sub: 'Weekly', tb: 'Chapter Tests — Reasoning', mk: 'P1 100 sim' },
  { d: 8,  date: 'Nov 20', title: 'Networks: OSI vs TCP/IP layers + full port table', sub: 'Networks', tb: '', mk: '≈4' , mkqs: 'OSI/device-layer ~1-2Q · ports ~1Q' },
  { d: 9,  date: 'Nov 21', title: 'Networks: subnetting + IP addressing (10 drills)', sub: 'Networks', tb: '', mk: '≈3' , mkqs: 'subnetting numeric ~1-2Q' },
  { d: 10, date: 'Nov 22', title: 'Networks: TCP vs UDP, routing, devices/firewall/DMZ', sub: 'Networks', tb: '', mk: '≈3' , mkqs: 'TCP/UDP ~1Q · devices/firewall ~1Q' },
  { d: 11, date: 'Nov 23', title: 'Networks topic test (25 Qs) + redo wrongs', sub: 'Networks', tb: 'Chapter Test — Networking', mk: 'test: 10' },
  { d: 12, date: 'Nov 24', title: 'Prog-1: control flow, loops, operators — 20 dry-runs', sub: 'Prog', tb: '', mk: '≈4' , mkqs: 'loop/control dry-runs ~2Q' },
  { d: 13, date: 'Nov 25', title: 'Prog-2: functions, scope/binding, param passing + recursion', sub: 'Prog', tb: '', mk: '≈4' , mkqs: 'scope/binding ~1Q · param-passing ~1Q' },
  { d: 14, date: 'Nov 28', title: 'WEEKLY (Sat): Paper 1 timed sectional + Precis #1', sub: 'Weekly', tb: 'Full Test (Phase I) #1', mk: 'P1 100 sim' },
  { d: 15, date: 'Nov 27', title: 'InfoSec: CIA triad + symmetric/asymmetric crypto', sub: 'InfoSec', tb: '', mk: '≈3' , mkqs: 'CIA ~1Q · sym/asym ~1Q' },
  { d: 16, date: 'Nov 28', title: 'InfoSec: hashing, digital signatures, certs/PKI', sub: 'InfoSec', tb: '', mk: '≈3' , mkqs: 'hash/sig/PKI ~1-2Q' },
  { d: 17, date: 'Nov 29', title: 'InfoSec: attacks + defenses + access control (merged)', sub: 'InfoSec', tb: '', mk: '≈4' , mkqs: 'attacks ~2Q · access control ~1Q' },
  { d: 18, date: 'Nov 30', title: 'InfoSec topic test (25 Qs) + redo wrongs', sub: 'InfoSec', tb: 'Chapter Test — Cyber Security', mk: 'test: 10' },
  { d: 19, date: 'Dec 1',  title: 'Prog-3: OOP pillars — constructors, inheritance, polymorphism', sub: 'Prog', tb: '', mk: '≈5' , mkqs: 'OOP pillars ~2-3Q' },
  { d: 20, date: 'Dec 2',  title: 'Prog-4: exceptions, overloading + output-prediction drills', sub: 'Prog', tb: '', mk: '≈4' , mkqs: 'exceptions ~1Q · overload vs override ~1-2Q' },
  { d: 21, date: 'Dec 5',  title: 'WEEKLY (Sat): full Paper 1 timed + Essay #2', sub: 'Weekly', tb: 'Full Test (Phase I) #2', mk: 'P1 100 sim' },
  { d: 22, date: 'Dec 4',  title: 'Prog-5: C pointers + pointer tracing (15)', sub: 'Prog', tb: '', mk: '≈4' , mkqs: 'pointer tracing ~2Q' },
  { d: 23, date: 'Dec 5',  title: 'Prog-6: Java/Python idioms + output traps', sub: 'Prog', tb: '', mk: '≈3' , mkqs: 'Java/Python output ~1-2Q' },
  { d: 24, date: 'Dec 6',  title: 'Prog-7: recursion + backtracking dry-runs', sub: 'Prog', tb: '', mk: '≈2' , mkqs: 'recursion trace ~1Q' },
  { d: 25, date: 'Dec 7',  title: 'DA-1: pandas slicing, dict/set ops, regex, file modes', sub: 'DA/Shell/DW', tb: 'Chapter Test — Data Analytics', mk: '≈6' , mkqs: 'pandas/slicing ~2-3Q · regex/files ~1Q' },
  { d: 26, date: 'Dec 8',  title: 'Prog-8: output marathon — 50 C/Java/Python traces', sub: 'Prog', tb: '', mk: '≈2' , mkqs: 'output traces ~1-2Q' },
  { d: 27, date: 'Dec 9',  title: 'Programming topic test (30 Qs, output-heavy) + redo wrongs', sub: 'Prog', tb: 'Chapter Tests — Programming Concepts', mk: 'test: 30' },
  { d: 28, date: 'Dec 12', title: 'WEEKLY (Sat): Paper 1 sectional + IT sectional + Precis #2', sub: 'Weekly', tb: 'Full Test (Phase I) #3', mk: 'P1 100 sim' },
  { d: 29, date: 'Dec 11', title: 'DS: arrays/strings, stack/queue/LL + infix→postfix drills', sub: 'DSA', tb: '', mk: '≈3' , mkqs: 'stack/queue/LL ~1-2Q · postfix ~0-1Q' },
  { d: 30, date: 'Dec 12', title: 'DS: trees — traversals, BST ops, heap trace, AVL rotations', sub: 'DSA', tb: '', mk: '≈3' , mkqs: 'trees/BST/AVL/heap ~1-2Q' },
  { d: 31, date: 'Dec 13', title: 'DS: graphs (BFS/DFS/MST/Dijkstra) + hashing', sub: 'DSA', tb: '', mk: '≈2' , mkqs: 'graphs ~1Q · hashing ~1Q' },
  { d: 32, date: 'Dec 14', title: 'Algo: complexity + sort/search table + paradigms', sub: 'DSA', tb: '', mk: '≈2' , mkqs: 'sorting/complexity ~1-2Q' },
  { d: 33, date: 'Dec 15', title: 'Programming: C pointer/output tracing (15) + debugging MCQs', sub: 'Prog', tb: '', mk: '≈2' , mkqs: 'pointer/output ~1Q' },
  { d: 34, date: 'Dec 16', title: 'DSA + Programming combined test (30 Qs) + redo wrongs', sub: 'DSA', tb: 'Chapter Tests — Programming + Algos + Python', mk: 'test: 10' },
  { d: 35, date: 'Dec 19', title: 'WEEKLY (Sat): FULL mock (both papers) + Essay #3', sub: 'Weekly', tb: 'Full Test (Phase I) #4 + Subject Test IT', mk: 'both 200' },
  { d: 36, date: 'Dec 18', title: 'DW cram: ETL, OLAP, star/snowflake, SCD — definitions cold', sub: 'DA/Shell/DW', tb: 'Chapter Test — Data Warehouse', mk: '≈5' , mkqs: 'ETL/OLAP/schemas ~2-3Q' },
  { d: 37, date: 'Dec 19', title: 'DA-2: reshaping, groupby/merge, charts, R basics', sub: 'DA/Shell/DW', tb: '', mk: '≈4' , mkqs: 'reshaping/groupby ~1-2Q · R ~0-1Q' },
  { d: 38, date: 'Dec 20', title: 'Shell cram: grep/awk/sed/chmod/cron + 15 command drills', sub: 'DA/Shell/DW', tb: 'Chapter Test — Shell', mk: '≈5' , mkqs: 'grep/awk/sed/chmod ~2-3Q' },
  { d: 39, date: 'Dec 21', title: 'Phase-2 drills: logic-flow, debugging MCQs + coding insurance', sub: 'Ph2Drills', tb: '', mk: 'Phase-2 prep' },
  { d: 40, date: 'Dec 22', title: 'Trivia buffer: OS/SE/Emerg one-pagers + mixed IT-trivia drill', sub: 'Trivia', tb: '', mk: '≈2 (stray Qs)' , mkqs: 'OS/SE/Emerg trivia ~1-2Q' },
  { d: 41, date: 'Dec 23', title: 'FULL Paper-2 timed test (50 Qs) + redo wrongs', sub: 'Prog', tb: 'Subject Test — IT (full Paper 2)', mk: 'P2 100 sim' },
  { d: 42, date: 'Dec 26', title: 'WEEKLY (Sat): FULL Phase-1 sim mock + Essay #4', sub: 'Weekly', tb: 'Full Test (Phase I) #5 + FT English Descriptive', mk: 'P1 100 sim' },
  { d: 43, date: 'Dec 25', title: 'PYQ set 1 (both papers, timed) + log errors', sub: 'Blitz', tb: 'SEBI PYQs + Full Test (Phase I)', mk: 'both 200' },
  { d: 44, date: 'Dec 26', title: 'PYQ set 2 + redo error log 14+ days', sub: 'Blitz', tb: 'Full Test (Phase II) IT + English Descriptive', mk: 'both 200' },
  { d: 45, date: 'Dec 27', title: 'Deep-patch weakest 3 topics + GA intensive', sub: 'Blitz', tb: '', mk: 'error-log' },
  { d: 46, date: 'Dec 28', title: 'SEBI_Markets_Notes + all tables from memory', sub: 'Blitz', tb: '', mk: 'P1 GA 40' },
  { d: 47, date: 'Dec 29', title: 'PYQ set 3 + timed Essay #5 + Precis #3', sub: 'Blitz', tb: 'Full Test (Phase II) IT + Descriptive #2', mk: 'both 200' },
  { d: 48, date: 'Dec 30', title: 'Full revision: skim all Notes + error log + GA', sub: 'Blitz', tb: '', mk: 'revision' },
  { d: 49, date: 'Dec 31', title: 'SYLLABUS COMPLETE — light tables + Jan plan', sub: 'Milestone', tb: 'MBT 1 + MBT 2', mk: 'milestone' },
]

// Paper-2 section weightage (of 100 marks) — official split
export const sectionMarks = [
  { name: 'Programming', marks: 30, subs: ['Prog'] },
  { name: 'DBMS + SQL', marks: 20, subs: ['DBMS'] },
  { name: 'DA + DW + Shell', marks: 20, subs: ['DA/Shell/DW'] },
  { name: 'Networks', marks: 10, subs: ['Networks'] },
  { name: 'InfoSec', marks: 10, subs: ['InfoSec'] },
  { name: 'DSA', marks: 10, subs: ['DSA'] },
]
export const marksForSub = (sub) => sectionMarks.find((s) => s.subs.includes(sub))

export const subjectColors = {
  DBMS: '#388d3c', Networks: '#0f9d9f', InfoSec: '#4466ff',
  'DA/Shell/DW': '#ff9800', DSA: '#795548', Prog: '#9c6dd9',
  Ph2Drills: '#ff6d00', Trivia: '#607d8b', Weekly: '#f8ae00',
  Blitz: '#1b5e20', Milestone: '#e040fb',
}

// Back-revision: always revise the subject FINISHED the week before (15 min/day, write-from-memory)
export const backRevision = (day) => {
  if (day <= 7)  return null
  if (day <= 14) return { sub: 'DBMS & SQL', path: '02_Phase1_Paper2_IT/DBMS_SQL/Notes.md' }
  if (day <= 21) return { sub: 'Networks', path: '02_Phase1_Paper2_IT/Computer_Networks/Notes.md' }
  if (day <= 28) return { sub: 'InfoSec', path: '02_Phase1_Paper2_IT/Information_Security/Notes.md' }
  if (day <= 35) return { sub: 'Programming + Data Analytics', path: '02_Phase1_Paper2_IT/Programming_Concepts/Notes.md' }
  if (day <= 42) return { sub: 'DSA', path: '02_Phase1_Paper2_IT/Data_Structures_Algorithms/Notes.md' }
  return { sub: 'Weakest topics (error log)', path: '06_Mocks_and_Practice/Error_Log.md' }
}

// Paper-1 rotation by weekday — label + the actual material to open
const P1_MONTH = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
const gaLog = (m) => ({ name: `GA log (${m})`, path: `01_Phase1_Paper1/General_Awareness/Monthly_Logs/${m}_2026.md` })
const P1_MAT = {
  quant: '01_Phase1_Paper1/Quantitative_Aptitude/Formula_Sheet.md',
  rsn: '01_Phase1_Paper1/Reasoning/Tricks.md',
  eng: '01_Phase1_Paper1/English_Language/Rules_And_Vocab.md',
  desc: '03_Phase2_Paper1_English/Descriptive_Guide.md',
  markets: '01_Phase1_Paper1/General_Awareness/Financial_Awareness/SEBI_Markets_Notes.md',
  ga: '01_Phase1_Paper1/General_Awareness/GA_Checklist.md',
}
// Day-specific topic rotation — same sequence as the DRILL BANK card topic map.
// Ordinal = Nth occurrence of that weekday in the plan, so it can never contradict the date.
const P1_QR = [ // Mon/Wed/Fri GLOBAL sequence — matches DRILL BANK card topic map exactly
  'approximation ~5Q + wrong no. series ~5Q · syllogism ~1-2Q · linear-order puzzle ~4-5Q',       // D1
  'quadratic compare ~2-3Q + approximation ~5Q · blood relations ~2-3Q · month-table puzzle ~4-5Q', // D4
  'right/wrong series ~5Q + mini DI ~4Q · coding-decoding ~1-2Q · box-stack puzzle ~3-4Q',        // D6
  'approximation ~5Q + DI set ~4-5Q · inequality ~1-2Q · box-stack puzzle ~3-4Q',                   // D8
  'wrong series ~5Q + quadratic compare ~2-3Q · direction-ranking ~1Q · height-order ~3-5Q',      // D11
  'approximation ~5Q + DI set ~4-5Q · alphanumeric series ~1-3Q · circular puzzle ~4-5Q',           // D13
  'approximation ~5Q + DI set ~4-5Q · statement-assumption ~2-3Q · circular puzzle ~4-5Q',          // D15
  'series ~5Q + quadratic compare ~2-3Q · data sufficiency ~1-2Q · floor puzzle ~4-5Q',             // D18
  'approximation ~5Q + DI set ~4-5Q · odd-one-out ~1Q · mixed set ~4-5Q',                         // D20
  'series ~5Q + approximation ~5Q · syllogism ~1-2Q · linear-order puzzle ~4-5Q',                 // D22
  'arithmetic: P&L + SI-CI ~4-5Q · blood relations ~2-3Q · month-table puzzle ~4-5Q',           // D25
  'arithmetic ~4-5Q + DI ~4-5Q · coding-decoding ~1-2Q · box-stack puzzle ~3-4Q',                     // D27
  'series ~5Q + approximation ~5Q · direction-ranking ~1Q · height-order ~3-5Q',                // D29
  'arithmetic: T&W + TSD ~4-5Q · alphanumeric series ~1-3Q · circular puzzle ~4-5Q',            // D32
  'approximation ~5Q + DI set ~4-5Q · statement-assumption ~2-3Q · floor puzzle ~4-5Q',             // D34
  'series ~5Q + approximation ~5Q · data sufficiency ~1-2Q · linear-order puzzle ~4-5Q',          // D36
  'arithmetic: ages + mixture ~4-5Q · odd-one-out ~1Q · month-table puzzle ~4-5Q',            // D39
  'approximation ~5Q + DI set ~4-5Q · weakest single ~2Q · weakest puzzle type ~4-5Q',            // D41
  'series ~5Q + quadratic compare ~2-3Q · weakest single ~2Q · box-stack puzzle ~3-4Q',           // D43
  'approximation ~5Q + DI set ~4-5Q · weakest single ~2Q · height-order puzzle ~3-5Q',            // D46
  'series ~5Q + quadratic compare ~2-3Q · weakest single ~2Q · weakest puzzle ~4-5Q',             // D48
]
const P1_MKT = [ // Saturdays (non-weekly): which section of SEBI_Markets_Notes
  'SEBI Essentials — who/what/why, objectives, powers',
  'laws & regulations — SEBI Act, SCRA, Depositories Act',
  'market infrastructure — exchanges, depositories, clearing corps',
  'recent trends — T+1 settlement, F&O changes, new products',
  'RBI + economy — rates, inflation, banking basics',
  'weak-section re-read (from your error log)',
  'full-notes pass — every section, quick recall',
]
const P1_RC = [ // Sundays: passage type + GA recall
  'economy passage + last-week GA fact recall',
  'markets passage + last-week GA fact recall',
  'tech/policy passage + last-week GA fact recall',
  'economy passage — vocab-in-context focus',
  'markets passage — inference-question focus',
  'timed RC pair (2 passages) + full GA recall',
  'weakest passage type (from your error log)',
]
const P1_ENG = [ // Tuesdays: archetype + vocab theme + scored descriptive rep
  'error spotting + collocations vocab + precis para (score /10)',
  'double fillers + idioms vocab + precis para (score /10)',
  'phrasal verbs + para jumble + comprehension answers (score /10)',
  'sentence improvement + one-word subs + precis (score /10)',
  'root-words vocab + cloze test + comprehension answers (score /10)',
  'mixed review — weakest archetype + precis (score /10)',
  'timed English section (20 Q) + essay outline (score /10)',
]
const isWeekly = (d) => /weekly/i.test(d.title)
const p1Weekday = (day) => {
  const [m, dd] = day.date.trim().split(/\s+/)
  return new Date(2026, P1_MONTH[m], +dd).getDay()
}
// Paper-1 section weightage (of 100 marks) — 4 equal sections, 20 Qs × 1.25 each
export const p1Sections = [
  { name: 'GA', marks: 25 },
  { name: 'English', marks: 25 },
  { name: 'Quant', marks: 25 },
  { name: 'Reasoning', marks: 25 },
]

export const p1For = (day) => {
  if (isWeekly(day)) return { label: 'weekly test day (Paper-1 IS the task)', detail: '', links: [], patterns: false, sections: ['GA', 'English', 'Quant', 'Reasoning'] }
  const [m] = day.date.trim().split(/\s+/)
  const wd = p1Weekday(day)
  const cls = [1, 3, 5].includes(wd) ? 'qr' : wd // Q+R rotation is one sequence across Mon/Wed/Fri
  const nth = days.slice(0, days.indexOf(day)).filter((d) => {
    if (isWeekly(d)) return false
    const w = p1Weekday(d)
    return (cls === 'qr' ? [1, 3, 5].includes(w) : w === wd)
  }).length
  const pick = (arr) => arr[Math.min(nth, arr.length - 1)]
  switch (wd) {
    case 0: return { label: 'RC set (~8-10Q in paper) + GA recall (20Q)', detail: pick(P1_RC), links: [{ name: 'English Rules & Vocab', path: P1_MAT.eng }, gaLog(m)], patterns: true, sections: ['English', 'GA'] }
    case 2: return { label: 'English drills (~12Q error/fillers/vocab) + descriptive', detail: pick(P1_ENG), links: [{ name: 'English Rules & Vocab', path: P1_MAT.eng }, { name: 'Descriptive Guide', path: P1_MAT.desc }], patterns: true, sections: ['English'] }
    case 4: return { label: 'GA + mixed drills (GA = 20Q, cheapest marks)', detail: 'redo the week\'s error log + weekly GA recall', links: [{ name: 'GA Checklist', path: P1_MAT.ga }, gaLog(m)], patterns: false, sections: ['GA'] }
    case 6: return { label: 'Markets + drill bank (SEBI/markets ~4-5 of GA\'s 20Q)', detail: `SEBI_Markets_Notes — ${pick(P1_MKT)}`, links: [{ name: 'SEBI Markets Notes', path: P1_MAT.markets }, gaLog(m)], patterns: false, sections: ['GA'] }
    default: return { label: 'Quant + Reasoning', detail: pick(P1_QR), links: [{ name: 'Quant Formula Sheet', path: P1_MAT.quant }, { name: 'Reasoning Tricks', path: P1_MAT.rsn }], patterns: true, sections: ['Quant', 'Reasoning'] }
  }
}

// GA test series — each plan day maps to a 10-Q day inside the 7 weekly files
const GA_TEST_FILES = [
  'Week1_June_SEBI_Static.md', 'Week2_July.md', 'Week3_August.md', 'Week4_September.md',
  'Week5_October.md', 'Week6_November.md', 'Week7_Mixed.md',
]
export const gaTestFor = (day) => {
  const testDay = ((day.d - 1) % 7) + 1
  const file = GA_TEST_FILES[Math.ceil(day.d / 7) - 1]
  return { label: `GA Test · Day ${testDay} (10 Qs)`, path: `01_Phase1_Paper1/General_Awareness/Test_Series/${file}` }
}

// "Marks covered today" — estimated marks of the paper today's work touches.
// P1: sums the ~Q annotations in the day's rotation (each Q = 1.25 marks); fixed
// estimates for non-QR days. P2: the day's mk value (topic weight in the 100-mark paper).
// Realistic marks actually covered per day (not ceiling):
// P1 — drills+GA touch ~4-5 questions of the paper ≈ 5 marks
// P2 — 1-2 questions typically come from one day's topic ≈ ~4 marks (capped at mk)
export const p1Cover = (day) => (isWeekly(day) ? 100 : 5)
export const p2Cover = (day) => {
  const m = day.mk ? day.mk.match(/\d+/) : null
  const v = m ? +m[0] : 0
  return /test|sim|200/.test(day.mk || '') ? v : Math.min(v, 4)
}
// Weekly rollup — average marks covered per study day in this 7-day block
export const weekCover = (day) => {
  // numbered blocks — the Weekly day closes the block it verifies
  const wk = days.filter((d) => Math.ceil(d.d / 7) === Math.ceil(day.d / 7))
  const study = wk.filter((d) => !isWeekly(d))
  const p1 = Math.round(study.reduce((a, d) => a + p1Cover(d), 0) / (study.length || 1))
  const p2 = Math.round(study.reduce((a, d) => a + p2Cover(d), 0) / (study.length || 1))
  return { p1, p2 }
}

export const checkpoints = [
  { day: 14, test: 'Full Test (Phase I) #1', target: 'Baseline — just record it' },
  { day: 21, test: 'Full Test (Phase I) #2', target: '≥ +10 over baseline' },
  { day: 28, test: 'Paper 2 IT tests + 50-Q Phase-2 set', target: '>= 50% raw; Phase-2 set >= 45%' },
  { day: 35, test: 'Full Test (Phase I) #4 + 100-Q Phase-2 set', target: '>= +20 over baseline; Phase-2 set >= 50%' },
  { day: 42, test: 'Full Phase-1 sim + 100-Q Phase-2 set', target: 'Paper 1 >= 60%, Paper 2 >= 55-60%; Phase-2 set >= 55%' },
]

export const notesForSubject = {
  DBMS: '02_Phase1_Paper2_IT/DBMS_SQL/Notes.md',
  Networks: '02_Phase1_Paper2_IT/Computer_Networks/Notes.md',
  InfoSec: '02_Phase1_Paper2_IT/Information_Security/Notes.md',
  'DA/Shell/DW': '02_Phase1_Paper2_IT/Data_Analytics_Shell_DW/Notes.md',
  DSA: '02_Phase1_Paper2_IT/Data_Structures_Algorithms/Notes.md',
  Prog: '02_Phase1_Paper2_IT/Programming_Concepts/Notes.md',
  Ph2Drills: '04_Phase2_Paper2_IT/Practice_Questions.md',
  Trivia: '02_Phase1_Paper2_IT/Emerging_Tech/Notes.md',
  Weekly: '00_Overview/Progress_Tracker.md',
  Blitz: '05_PYQs/Question_Patterns.md',
  Milestone: '00_Overview/Study_Plan.md',
}
