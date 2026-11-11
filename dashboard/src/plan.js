// 49-day plan data — mirrors ClickUp tasks + Study_Plan.md
export const days = [
  { d: 1,  date: 'Nov 13', title: 'DBMS: keys, closure, normalization (1NF–BCNF)', sub: 'DBMS', tb: '' },
  { d: 2,  date: 'Nov 14', title: 'DBMS: SQL part 1 (SELECT, joins)', sub: 'DBMS', tb: '' },
  { d: 3,  date: 'Nov 15', title: 'DBMS: SQL part 2 (GROUP BY/HAVING, subqueries)', sub: 'DBMS', tb: '' },
  { d: 4,  date: 'Nov 16', title: 'DBMS: ACID, isolation, locks, 2PL', sub: 'DBMS', tb: '' },
  { d: 5,  date: 'Nov 17', title: 'DBMS: indexing, ER→tables + 20 GATE PYQs', sub: 'DBMS', tb: '' },
  { d: 6,  date: 'Nov 18', title: 'DBMS topic test (25 Qs) + redo wrongs', sub: 'DBMS', tb: 'Chapter Tests — DB Concepts + SQL Queries' },
  { d: 7,  date: 'Nov 19', title: 'WEEKLY: mini IT mock + Reasoning sectional + Essay #1', sub: 'Weekly', tb: 'Chapter Tests — Reasoning' },
  { d: 8,  date: 'Nov 20', title: 'Networks: OSI vs TCP/IP (layers from memory)', sub: 'Networks', tb: '' },
  { d: 9,  date: 'Nov 21', title: 'Networks: subnetting (10 drills)', sub: 'Networks', tb: '' },
  { d: 10, date: 'Nov 22', title: 'Networks: TCP vs UDP + port table', sub: 'Networks', tb: '' },
  { d: 11, date: 'Nov 23', title: 'Networks: routing + data link', sub: 'Networks', tb: '' },
  { d: 12, date: 'Nov 24', title: 'Networks: devices/firewall/DMZ + 20 GATE PYQs', sub: 'Networks', tb: '' },
  { d: 13, date: 'Nov 25', title: 'Networks topic test (25 Qs) + redo wrongs', sub: 'Networks', tb: 'Chapter Test — Networking' },
  { d: 14, date: 'Nov 26', title: 'WEEKLY: Paper 1 timed sectional + Precis #1', sub: 'Weekly', tb: 'Full Test (Phase I) #1' },
  { d: 15, date: 'Nov 27', title: 'InfoSec: CIA triad + symmetric/asymmetric crypto', sub: 'InfoSec', tb: '' },
  { d: 16, date: 'Nov 28', title: 'InfoSec: hashing, digital signatures, PKI', sub: 'InfoSec', tb: '' },
  { d: 17, date: 'Nov 29', title: 'InfoSec: attacks (write full list from memory)', sub: 'InfoSec', tb: '' },
  { d: 18, date: 'Nov 30', title: 'InfoSec: defenses (firewall, IDS/IPS, VPN, TLS)', sub: 'InfoSec', tb: '' },
  { d: 19, date: 'Dec 1',  title: 'InfoSec: access control, biometrics + 20 PYQs', sub: 'InfoSec', tb: '' },
  { d: 20, date: 'Dec 2',  title: 'InfoSec topic test (25 Qs) + redo wrongs', sub: 'InfoSec', tb: 'Chapter Test — Cyber Security' },
  { d: 21, date: 'Dec 3',  title: 'WEEKLY: full Paper 1 timed + Essay #2', sub: 'Weekly', tb: 'Full Test (Phase I) #2' },
  { d: 22, date: 'Dec 4',  title: 'OS: process states, threads, IPC, fork()', sub: 'OS', tb: '' },
  { d: 23, date: 'Dec 5',  title: 'OS: scheduling numerics (5 Gantt problems)', sub: 'OS', tb: '' },
  { d: 24, date: 'Dec 6',  title: 'OS: semaphores, deadlock, Banker\'s algorithm', sub: 'OS', tb: '' },
  { d: 25, date: 'Dec 7',  title: 'OS: paging/TLB + RAID + Linux commands & permissions', sub: 'OS', tb: '' },
  { d: 26, date: 'Dec 8',  title: 'Data Analytics + Shell + Data Warehousing (20%!)', sub: 'DA/Shell/DW', tb: 'Chapter Tests — Data Analytics + Shell + DW' },
  { d: 27, date: 'Dec 9',  title: 'Combined topic test: OS + DA/Shell/DW (30 Qs)', sub: 'OS+DA/DW', tb: 'Remaining IT chapter tests' },
  { d: 28, date: 'Dec 10', title: 'WEEKLY: Paper 1 sectional + Precis #2', sub: 'Weekly', tb: 'Full Test (Phase I) #3' },
  { d: 29, date: 'Dec 11', title: 'DSA: complexity + sorting table (mains depth)', sub: 'DSA', tb: '' },
  { d: 30, date: 'Dec 12', title: 'DSA: stack/queue/LL + infix→postfix drills', sub: 'DSA', tb: '' },
  { d: 31, date: 'Dec 13', title: 'DSA: trees — traversals, BST, heap, AVL', sub: 'DSA', tb: '' },
  { d: 32, date: 'Dec 14', title: 'DSA: graphs + hashing + paradigms', sub: 'DSA', tb: '' },
  { d: 33, date: 'Dec 15', title: 'Programming: OOP pillars + Java keyword table', sub: 'Prog', tb: '' },
  { d: 34, date: 'Dec 16', title: 'Programming: C output tracing (15) + topic test', sub: 'Prog', tb: 'Chapter Tests — Programming + Algos + Python' },
  { d: 35, date: 'Dec 17', title: 'WEEKLY: FULL mock (both papers) + Essay #3', sub: 'Weekly', tb: 'Full Test (Phase I) #4 + Subject Test IT' },
  { d: 36, date: 'Dec 18', title: 'SE: SDLC models + agile/scrum/xp', sub: 'SoftEngg', tb: '' },
  { d: 37, date: 'Dec 19', title: 'SE: testing levels + cyclomatic complexity', sub: 'SoftEngg', tb: '' },
  { d: 38, date: 'Dec 20', title: 'SE: UML/metrics + Cloud (IaaS/PaaS/SaaS)', sub: 'SE+Emerg', tb: '' },
  { d: 39, date: 'Dec 21', title: 'Emerging: big data + AI/ML', sub: 'Emerging', tb: '' },
  { d: 40, date: 'Dec 22', title: 'Emerging: blockchain + payments (UPI/NEFT/RTGS)', sub: 'Emerging', tb: '' },
  { d: 41, date: 'Dec 23', title: 'SE + Emerging combined topic test (30 Qs)', sub: 'SE+Emerg', tb: 'Subject Test — IT (full Paper 2)' },
  { d: 42, date: 'Dec 24', title: 'WEEKLY: FULL Phase-1 sim mock + Essay #4', sub: 'Weekly', tb: 'Full Test (Phase I) #5 + FT English Descriptive' },
  { d: 43, date: 'Dec 25', title: 'PYQ set 1 (both papers, timed) + log errors', sub: 'Blitz', tb: 'SEBI PYQs + Full Test (Phase I)' },
  { d: 44, date: 'Dec 26', title: 'PYQ set 2 + redo error log 14+ days', sub: 'Blitz', tb: 'Full Test (Phase II) IT + English Descriptive' },
  { d: 45, date: 'Dec 27', title: 'Deep-patch weakest 3 topics + GA intensive', sub: 'Blitz', tb: '' },
  { d: 46, date: 'Dec 28', title: 'SEBI_Markets_Notes + all tables from memory', sub: 'Blitz', tb: '' },
  { d: 47, date: 'Dec 29', title: 'PYQ set 3 + timed Essay #5 + Precis #3', sub: 'Blitz', tb: 'Full Test (Phase II) IT + Descriptive #2' },
  { d: 48, date: 'Dec 30', title: 'Full revision: skim all Notes + error log + GA', sub: 'Blitz', tb: '' },
  { d: 49, date: 'Dec 31', title: 'SYLLABUS COMPLETE — light tables + Jan plan', sub: 'Milestone', tb: 'MBT 1 + MBT 2' },
]

export const subjectColors = {
  DBMS: '#388d3c', Networks: '#0f9d9f', InfoSec: '#4466ff', OS: '#ff5251',
  'DA/Shell/DW': '#ff9800', 'OS+DA/DW': '#ff6d00', DSA: '#795548', Prog: '#9c6dd9',
  SoftEngg: '#c51162', 'SE+Emerg': '#b83280', Emerging: '#304ffe', Weekly: '#f8ae00',
  Blitz: '#1b5e20', Milestone: '#e040fb',
}

// Back-revision: always revise the subject FINISHED the week before (15 min/day, write-from-memory)
export const backRevision = (day) => {
  if (day <= 7)  return null
  if (day <= 14) return { sub: 'DBMS & SQL', path: '02_Phase1_Paper2_IT/DBMS_SQL/Notes.md' }
  if (day <= 21) return { sub: 'Networks', path: '02_Phase1_Paper2_IT/Computer_Networks/Notes.md' }
  if (day <= 28) return { sub: 'InfoSec', path: '02_Phase1_Paper2_IT/Information_Security/Notes.md' }
  if (day <= 35) return { sub: 'OS + DA/Shell/DW', path: '02_Phase1_Paper2_IT/Data_Analytics_Shell_DW/Notes.md' }
  if (day <= 42) return { sub: 'DSA + Programming', path: '02_Phase1_Paper2_IT/Programming_Concepts/Notes.md' }
  return { sub: 'Weakest topics (error log)', path: '06_Mocks_and_Practice/Error_Log.md' }
}

export const checkpoints = [
  { day: 14, test: 'Full Test (Phase I) #1', target: 'Baseline — just record it' },
  { day: 21, test: 'Full Test (Phase I) #2', target: '≥ +10 over baseline' },
  { day: 28, test: 'Paper 2 IT tests', target: '≥ 50% raw' },
  { day: 35, test: 'Full Test (Phase I) #4', target: '≥ +20 over baseline, all sections above cutoff' },
  { day: 42, test: 'Full Phase-1 sim', target: 'Paper 1 ≥ 60%, Paper 2 ≥ 55–60%' },
]

export const notesForSubject = {
  DBMS: '02_Phase1_Paper2_IT/DBMS_SQL/Notes.md',
  Networks: '02_Phase1_Paper2_IT/Computer_Networks/Notes.md',
  InfoSec: '02_Phase1_Paper2_IT/Information_Security/Notes.md',
  OS: '02_Phase1_Paper2_IT/Operating_Systems/Notes.md',
  'DA/Shell/DW': '02_Phase1_Paper2_IT/Data_Analytics_Shell_DW/Notes.md',
  'OS+DA/DW': '02_Phase1_Paper2_IT/Data_Analytics_Shell_DW/Notes.md',
  DSA: '02_Phase1_Paper2_IT/Data_Structures_Algorithms/Notes.md',
  Prog: '02_Phase1_Paper2_IT/Programming_Concepts/Notes.md',
  SoftEngg: '02_Phase1_Paper2_IT/Software_Engineering/Notes.md',
  'SE+Emerg': '02_Phase1_Paper2_IT/Emerging_Tech/Notes.md',
  Emerging: '02_Phase1_Paper2_IT/Emerging_Tech/Notes.md',
  Weekly: '00_Overview/Progress_Tracker.md',
  Blitz: '05_PYQs/Question_Patterns.md',
  Milestone: '00_Overview/Study_Plan.md',
}
