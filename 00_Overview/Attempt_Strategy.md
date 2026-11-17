# Attempt Strategy — how to play the paper, not just know it

`Question_Playbooks.md` = how to kill ONE question.
This file = how to run the WHOLE paper — order, pacing, when to skip, when to guess.

Score isn't accuracy alone. It's **attempts × accuracy × time discipline**. Two candidates
with the same knowledge finish 15+ marks apart because one ran the paper and the other
wandered through it.

## The A/B/C tag — the atomic move

Every question gets a decision inside its first look:

| Tag | Meaning | Rule |
|---|---|---|
| **A — Insta** | You know it / one clean step | Answer now. Never re-visit. |
| **B — Banked** | Solvable but slow (calc, trace, set-based) | Mark it, move on. Pass 2 works these. |
| **C — Skip** | No card matches, blind guess only | Mark it. Pass 3 decides: eliminate ≥2 options → guess; else leave blank. |

The skill isn't solving — it's **deciding the tag in 10–15 seconds and trusting it**.
A B-tag that eats 4 minutes in Pass 1 is the single biggest score-leak in this exam.

## Phase 1 — Paper 1 (80 Qs · 60 min · GA/Eng/Quant/Reas × 20)

**Section order is a choice, not a rule — this is the default, tuned for recall-first:**

| Pass | Window | What |
|---|---|---|
| GA sweep | 0–7 min | All 20 GA Qs at ~20s each. Know it or mark C — never linger. Pure recall = cheapest marks. |
| English | 7–18 min | Fillers → error-spotting → cloze first; RC LAST (it's the time sink — do it with a hard 8-min cap). |
| Reasoning | 18–40 min | Pass 1: kill the A's (syllogism, inequality, blood rel, direction — 30–60s cards). B-tag every puzzle/set. Pass 2: ONE clean puzzle set max. |
| Quant | 40–55 min | Pass 1: approximation, quadratic compare, series (fast cards). Pass 2: ONE clean DI set. Arithmetic only if the type is known cold — max 3. |
| Buffer | 55–60 min | Pass 3: revisit C-tags — guess ONLY where ≥2 options are eliminated. Fill nothing blind. |

**Checkpoint at 30 min:** GA + English done, ~10–12 Reasoning banked. If you're behind,
the adjustment is fewer B-tags, not faster guessing.

**Attempt math (from Exam_Pattern.md):** need ~50–60 total attempts at ~85% to land
50+ marks. GA + English should supply ~30–35 of those — Quant/Reas only need ~20–25
clean kills between them. That means you're ALLOWED to skip half of Quant+Reasoning —
the sections you fear are supposed to be half-skipped.

## Phase 1 — Paper 2 IT (50 Qs · 40 min · ~48s/Q)

- **Pass 1 (~15 min):** every instant-recall Q — theory, definitions, classification,
  port numbers, attack names. These are sub-30s. Expect 20–25 of them.
- **Pass 2 (~18 min):** trace questions — SQL output, code dry-runs, subnetting,
  closure/NF trees. These earn marks but burn 60–90s. Work them in order.
- **Pass 3 (~7 min):** C-tags → eliminate-and-guess where possible.
- **Trap:** SQL/code-trace questions placed early steal your Pass-1 rhythm. Tag them B
  on sight, even if they look easy.

## Phase 2 — Paper 2 IT (100 Qs · 180 min · 108s/Q)

This is the merit paper (2/3 of TWS) — here you attempt **90+, not 40**. The math
flips: at ~85% accuracy, 90 attempts ≈ 73–80 marks = the real merit zone.

- **Pass 1 (~45 min):** all instant theory/definitions — maybe 35–45 Qs.
- **Pass 2 (~90 min):** dry-runs, debugging, code-completion, DS trace — the bulk.
  Budget ~100s each; a question over 2.5 min gets re-tagged C.
- **Pass 3 (~30 min):** revisit banked + C-tags; this paper rewards grinding.
- **15-min checkpoint:** at min 90 you should be ~55–60 questions deep. Behind →
  tighten B-tag discipline, not solve-speed.

## Phase 2 — Paper 1 Descriptive (60 min · Essay 30 + Precis 30 + Comp 40)

Typed, no negative marking, ALL three compulsory. Suggested order:

1. **Comprehension first (20 min)** — mechanical warm-up; answers live in the passage.
2. **Essay second (22 min)** — while mind is fresh: 3 min outline (thesis + 2 bodies +
   close), 15 min typing, 4 min proofread. Word limit is a hard gate.
3. **Precis last (15 min)** — needs max concentration; read twice, title, 1/3 length.
4. **Final 3 min:** spell-check pass on everything typed.

Never let one piece eat another's slot — an unfinished comprehension (−20+ marks)
hurts more than a mediocre essay (−5).

## The guess rule (negative marking −¼)

Expected value per guess: at 1.25 marks, eliminating 2 options → 50% hit ≈ +0.31 EV;
eliminating 1 → +0.09; eliminating 0 → −0.05. **Two eliminated = guess; fewer = leave blank.**
In Phase 2 Paper 2 (1-mark Qs) the same ratio holds — merit volume justifies slightly
more risk there than in Phase 1.

## How to TRAIN this (not just read it)

Attempt strategy only exists if it's drilled — practice lives in the daily drill:

1. **Every 35-min timed drill runs in two passes.** Tag each question A/B/C on your
   rough sheet before solving (or mark mentally per 5-Q chunk).
2. **After the drill, audit (2 min):**
   - C-tags that turned out solvable → "regret skips" (your tagging was too timid)
   - B-tags that ate >2× their card's CAP → "time sinks" (should've been C)
   - A-tags you got wrong → concept gap → Error_Log
3. **Every timed mock/sectional gets a Mock_Review** (`06_Mocks_and_Practice/Mock_Review_Template.md`)
   — score + attempt audit + regret list. Log it in Progress_Tracker.
4. **Weekly check:** attempts rising? accuracy holding ≥85%? regret-skips shrinking?
   Those three numbers ARE the smart-attempt metric — score alone can't see them.

## The meta-rule

> In the exam hall you never improvise the PLAN — only the answers.
> Order is fixed. Caps are fixed. The tag is decided in 15 seconds.
> Marks come from clean execution of the shapes you know — and refusing the ones you don't.
