# SEBI Grade A IT — Question Pattern Bible

Compiled from official SEBI notifications (2024 & Feb-2026), memory-based PYQs
(2020/2022/2024/2025), and prep-platform exam analyses. Verify at the 2027 notification.

---

## PHASE 1 — Paper 1 (General aptitude, 100 marks, 60 min)

Official handout split (Jan-2026, sebi.gov.in): **80 Qs × 1.25 marks — exactly 20 questions per section**, equal 25-mark sections. Cutoffs: Paper-1 total ≥ 30% (NO sectional cutoff) + Paper-2 ≥ 40% + aggregate ≥ 40% (80/200). Negative marking 1/4.

| Section | 20 Qs break down as (Jan-2026 real paper) |
|---|---|
| GA | Last ~6 months affairs; SEBI/RBI/regulator facts (chair, HQ, est.), market terms (T+1, IPO, MF), budget/eco survey, schemes — all direct factual MCQs |
| Reasoning | ~15 puzzle/seating Qs (month+subject, box+color, double-row, height) + ~5 singles (statement-assumption, syllogism, inequality, coding, blood relation, series) |
| Quant | Approximation 5, wrong number series 4–5, arithmetic word problems 5–6, line-graph DI 5, caselet DI 5 |
| English | RC passage 5, error spotting 4–5, double fillers 4–5, sentence improvement 3–4, para jumble 4 |

## PHASE 1 — Paper 2 IT (50 MCQs, 100 marks, 40 min)

~48 seconds/question. Official topic weightage (2024 notification):

| Topic | Weight | ≈Qs | Archetype |
|---|---|---|---|
| **Programming Concepts (Java/C/C++)** | **30%** | **15** | Code output / dry run, scope, parameter passing, OOP, constructors, exception handling, recursion + broad IT trivia (real PYQs: "UNIX mounting means…", "full form of ADS") |
| Database Concepts | 10% | 5 | Normal forms, keys, ER→relations, ACID, indexing (B/B+), concurrency |
| SQL Queries | 10% | 5 | Query output, joins, aggregates, UNION/INTERSECT/EXCEPT, IN/EXISTS, nested queries, DDL vs DML vs TCL |
| Data Analytics (Python/R) | 10% | 5 | Pandas DataFrames, slicing, regex, dict/set ops, file modes, list comprehension, data mining defs |
| Algorithms | 10% | 5 | Traversals, shortest path, MST, hashing, sort/search complexity, greedy vs DP vs D&C |
| Networking | 10% | 5 | OSI stack, TCP vs UDP, IP, switches/routers/gateways, DNS/SMTP/POP/FTP/HTTP, firewalls |
| Info & Cyber Security | 10% | 5 | CIA triad, attack identification, authentication, network+software security, system audit |
| Data Warehousing | 5% | 2–3 | ETL, metadata, data cube/mart, OLAP ops (roll-up, drill-down, slice-dice) |
| Shell Programming | 5% | 2–3 | Basic commands, shell variables, scripting basics |

**Trap 1:** real papers include IT trivia beyond the listed topics (Windows ADS, UNIX
commands) — broad "computer awareness" MCQs. Testbook chapter tests cover these wells.

**Trap 2:** OS, Software Engineering and Emerging Tech are NOT in the official
Phase-1 syllabus — they surface only as ~0–3 stray trivia Qs. Don't budget dedicated
study days for them. Full priority ranking + plan audit: `00_Overview/Topic_Priority.md`.

## PHASE 2 — Paper 1 English Descriptive (100 marks, 60 min, typed)

- Essay: 1 of ~3–4 topics, ~200–270 words
- Precis: 1 passage → 1/3 length + title
- Reading comprehension: ~5 questions
- Past essay topics skew financial: asset reconstruction, financial literacy, market regulation.

## PHASE 2 — Paper 2 IT (100 marks, 180 min, cutoff 40%, weight 2/3) — TWO formats

- **2020–2024: descriptive CODING test** (C++/Java/Python). 9 questions, pick 6:
  4 simple (attempt 3 × 10), 3 moderate (attempt 2 × 20), 2 hard (attempt 1 × 30).
  Topic split: Data Structures 40%, Algorithms 30%, OOP 20%, String manipulation 10%.
  Real 2024 Q: "Nth Fibonacci via DP (10 marks)".
- **Feb-2026 notification (latest): objective MCQs** — "mix of logic flow completion,
  program dry-run outputs, debugging, syntax understanding, data analysis" — 180 min.

**Prep for both:** daily dry-run/debugging drills serve the MCQ format AND sharpen the
coding format. Keep easy–medium hand-coding practice (linked list, strings, sorting,
DP basics) as insurance — SEBI has flipped formats before.

## Practice prescription (pattern → where to drill)

| Pattern | Drill source |
|---|---|
| Code output/dry-run/debugging | Testbook "Programming Concepts" chapter tests + GateOverflow "output" questions + Pattern_Practice_Questions.md |
| SQL query output | Testbook "SQL Queries" chapter test + DBMS notes drills |
| Pandas/Python/regex | New notes file: `02_Phase1_Paper2_IT/Data_Analytics_Shell_DW/Notes.md` |
| DW/OLAP + Shell | Same file (5% each, learn definitions cold) |
| Paper 1 sections | Testbook chapter tests (Reasoning/Quant/English) + Full Tests Phase I |
| Descriptive | Testbook "FT: English Descriptive" (20 tests) — 1/week |
| Everything | 33 Full Tests Phase I + 20 Full Tests Phase II + 2 MBT on Testbook |
