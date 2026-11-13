# Daily Revision PDFs

One short revision PDF per study day, for quick revision.

## How it works

1. **During/after each study session**, Devin writes the day's cram notes to
   `YYYY-MM-DD.md` in this folder (see the `sebi-daily-revision` skill for the format).
2. **Every day at 11:00 PM**, Windows Task Scheduler task `SEBI-Daily-Revision-PDF`
   runs `.tools\build_daily_revision.py`, which renders that day's `.md` into
   `YYYY-MM-DD_Revision.pdf` next to it.
3. No notes file for a day → no PDF (the job skips quietly).

## Manual run

```powershell
D:\Devin\My_AI_Work\.tools\yt-venv\Scripts\python.exe D:\Devin\My_AI_Work\.tools\build_daily_revision.py            # today
D:\Devin\My_AI_Work\.tools\yt-venv\Scripts\python.exe D:\Devin\My_AI_Work\.tools\build_daily_revision.py --date 2026-11-13  # a specific day
```

Log: `.tools\daily_revision.log`
