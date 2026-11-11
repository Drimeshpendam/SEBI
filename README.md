# SEBI Grade A 2027 — IT Stream

Study workspace for SEBI Grade A (Assistant Manager) — IT stream.

## Folder map

| Folder | Purpose |
|---|---|
| `00_Overview` | Exam pattern, syllabus, study plan, progress tracker — start here |
| `01_Phase1_Paper1` | Reasoning, Quant, English, General/Financial Awareness (screening paper) |
| `02_Phase1_Paper2_IT` | IT subject-wise notes and topic tests for Phase 1 |
| `03_Phase2_Paper1_English` | Descriptive English: essays, precis, comprehension practice |
| `04_Phase2_Paper2_IT` | Advanced/deeper IT prep for Phase 2 |
| `05_PYQs` | Previous year questions (Phase 1 + Phase 2), sorted by subject |
| `06_Mocks_and_Practice` | Mock test logs, score analysis, error notebook |
| `07_Interview` | HR answers, SEBI knowledge, DAF preparation |
| `08_Resources` | Book list, useful links, reference PDFs |

## Workflow

1. Read `00_Overview/Exam_Pattern.md` and `Syllabus_IT.md` once.
2. Follow `00_Overview/Study_Plan.md` — it's sequenced for someone who has attempted before.
3. Update `00_Overview/Progress_Tracker.md` weekly.
4. Every mock goes in `06_Mocks_and_Practice` with an error log — the error log is the highest-value artifact in this folder.

## Dashboard (React UI)

A visual dashboard lives in `dashboard/` — it reads these `.md` files directly (no duplication), shows the 49-day plan as a clickable tracker, and saves day-completion in your browser.

```powershell
cd dashboard
npm run dev     # then open http://localhost:5173
```
