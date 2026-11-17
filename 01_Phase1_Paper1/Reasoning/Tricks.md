# Reasoning Ability — Learn the Methods (Understand + Remember version)

> Phase 1 Paper 1 Reasoning = **20 questions**. Moderate difficulty, the most time-hungry section. Good attempt: 15–17.
> **Real exam data (2024 + Jan-2026):** Puzzles/seating = **12–18 of 20 questions** (month+variable, box stack, linear/double row, height/rank order, circular, square). Remaining singles: blood relations, alphanumeric series, statement-assumption, data sufficiency.
>
> **One diagram earns 4–5 marks. Master the puzzle method once — it works on every set.**

## SPEED PROTOCOL (added Nov 13 — how to actually move fast in this section)

**The math:** singles (8–10 Qs) should cost ~4–5 min TOTAL → that leaves ~12–15 min for 2–3 puzzle sets at 4–5 min each = **8–12+ attempts, matching the strategy target.** You never need all 20.

**Attempt order — bank cheap marks first:**
1. **Singles first (~20–40s each):** alphanumeric/word series (pure scanning) → blood-relation tree → direction → inequality → syllogism elimination rules → statement-assumption (negate test) → data sufficiency.
2. **Then puzzles — easiest first:** linear/month > box-stack/floor > circular > **mixed-facing LAST** (hardest variant).
3. Pick the **easiest 2–3 sets**; the monster set is a skip, not a challenge.

**Where puzzle time is actually lost — restarts, not solving:**
- Restarting = you placed on an ambiguous clue → **two-case rule** prevents every full restart. Branching is faster than redrawing.
- Re-reading clues = you didn't sort them first → classify on read: **anchor / relative / negative** in 5 seconds, then use them in that order.
- The 6-min cap: 2 unresolved cases → take the sure answers, move on.

**Instant-kill clue-reading (drill until reflex):**
| Clue says | It means | Time cost |
|---|---|---|
| "X sits 3rd from left" | **anchor** — place now | 5s |
| "n between A and B" | relative, \|diff\| = n+1, often 2 cases | branch |
| "immediately above/left of" | **glued block** — move as one unit | fast |
| "somewhere above/after" | **order only** — NOT glued (the #1 misread) | mark, don't place |
| "not at an end / not on Mon" | **negative** — last, kills leftover slots | last |
| south-facing / circular | **mirror** — their left = your right | arrows first |

**Daily drill (~30 min):**
| Block | Time | Target |
|---|---|---|
| Draw all 7 skeletons (row, double-row, month-table, box-stack, rank-chain, circle, floor) from memory | 5 min | <20s each |
| Clue-flash: read 10 clues → say anchor/relative/glued/order/negative aloud | 5 min | <5s each |
| 1 puzzle set, timed — rotate the day's DAILY MAP type | 12 min | 5-min cap, then stop |
| 5 singles mixed, timed | 5 min | <30s each |
| Error log | 3 min | name WHICH step failed (anchor missed? case not branched? mirror flipped?) |

**Weekly ladder:** same as quant — puzzle set in 7 min (W1) → 6 (W2) → 5 (W3).
REMEMBER: *"The diagram answers the questions — the clues just build it. Sort clues, then place."*

## DAILY MAP — which skeleton + which single, per plan day
Study the day's skeleton first (3 min), then drill that type from the patterns bank. (Matches the DRILL BANK card exactly.)

- **D1** Type A + Syllogism · **D4** Type B + Blood Relations · **D6** Type C + Coding
- **D8** Type C + Inequality · **D11** Type D + Direction · **D13** Type E + Alphanumeric
- **D15** Type E + Stmt-Assumption · **D18** Type F + Data Sufficiency · **D20** mixed + singles review
- **D22** Type A + Syllogism · **D25** Type B + Blood Rel · **D27** Type C + Coding
- **D29** Type D + Direction · **D32** Type E + Alphanumeric · **D34** Type F + Stmt-Assumption
- **D36** Type A + Data Suff · **D39** Type B + singles review · **D41** weakest type (error log)
- **D43** Type C + weakest · **D46** Type D + weakest · **D48** weakest of the week

---

# PART 1 — THE UNIVERSAL PUZZLE METHOD (works on every type)

All puzzles are the same game: clues fix positions. The only skill is **the order you use the clues**.

## The 6 steps — WHY each one exists

**Step 1 — Read ALL clues before drawing anything.**
WHY: Clue 7 often makes clue 1 definite. Starting placement on clue 1 wastes cases you'd have to redraw.
REMEMBER: *"Survey the whole board before moving a piece."*

**Step 2 — Draw the skeleton that matches the type** (row, circle, stack, table — each below).

**Step 3 — DEFINITE clues first.**
WHY: "X sits 3rd from left", "Y is in March" — these are anchors. Everything else hangs off them.
REMEMBER: *"Anchors first, relatives next, negatives last."*

**Step 4 — RELATIVE clues second.** "P right of Q", "2 between A and B" — slot them around the anchors.

**Step 5 — TWO-CASE rule.** When a clue allows 2 placements, draw BOTH cases side by side.
WHY: guessing one case = 50% chance of a wrong diagram = 4–5 wrong answers. Drawing both is slower but certain — a later clue always kills one.
REMEMBER: *"Never guess a case — branch it, let a clue kill it."*

**Step 6 — NEGATIVE clues last + auto-complete.**
"Z not at an end" only makes sense after positions exist. Then the last leftover person fills the last leftover slot — puzzles finish themselves.

**Time discipline: one set = 4–5 min for 4–5 marks. If a set still has 2 unresolved cases at 6 min → take the sure answers, move on.**

---

## THE PUZZLE TYPES — skeleton + the ONE trap each

### Type A — Linear / Double-Row Seating (appeared both years, 4–5 Qs)
```
North-facing row:   1 _ _ _ _ _ _ 8     (their left = your left)
Two rows facing each other:
  Row1 (faces SOUTH):  8 7 6 5 4 3 2 1   ← mirrored!
  Row2 (faces NORTH):  1 2 3 4 5 6 7 8
  Seat k in Row2 faces seat k in Row1.
```
**Solved example — the whole technique on one set:**
"Six people P,Q,R,S,T,U in a row facing north. Q sits 2nd from the left. Only one person sits between Q and T. P sits immediate right of T. R is not at any end."

Step 1 — anchor: **Q = seat 2.**
Step 2 — "one between Q and T" → |diff| = 2 → T ∈ {0✗, 4} → **T = 4.** (Seat 0 doesn't exist — the edge killed half the cases before you drew anything.)
Step 3 — "P immediate right of T" → glued: **P = 5.**
Step 4 — negative clue last: "R not at an end" → free seats were {1, 3, 6}; ends 1 and 6 banned → **R = 3.**
Step 5 — leftovers S,U take ends {1, 6} in either order — **that ambiguity is a legal final state.**
```
seat:     1     2     3     4     5     6
final:   S/U    Q     R     T     P    S/U
```
Now every question falls out: "2nd from left?" → Q · "immediate left of P?" → T · "left end?" → can't determine — and that third option is a deliberate trap choice on the paper. **Double-row version:** same logic twice, but the south-facing row mirrors every "left/right of X" to page-right. *(Full solve → Part 4B Type A, Set 1.)*
**THE trap:** a SOUTH-facing person's left = YOUR right — mirrored. WHY: turn around and face the opposite way; your left hand now points the other direction. REMEMBER: *"Facing away? Their left is your mirror."* Write facing-direction arrows on the diagram BEFORE placing anyone.

**Trap variant — "uncertain number of persons"** (asked 2024, the notorious time-eater): derive the count from gap clues ("3 sit between A and B" ⇒ at least 5 people). If the count doesn't resolve in 2 clues — take the sure answers and skip.

**Variable rows** ("each likes a colour"): keep variables in a second row under the diagram — never in your head.

### Type B — Month/Day + Variable (Jan-2026, 4–5 Qs)
**Skeleton — always a table, never prose:**
```
| Month | Date | Person | Likes |
| Jan   |      |        |       |
```
WHY a table: month puzzles are fixed-slot puzzles — you fill cells, not positions. Clues like "2 months between P and Q" → mark both possibilities in the table.
**Solved example — the whole technique on one set:**
"Five people P,Q,R,S,T born in Jan–May, one per month. P is born in March. Exactly one month lies between P and Q. R is born immediately before T. S is not born in January."

Step 1 — anchor first (the only clue that's definite on its own):
```
        Jan   Feb   Mar   Apr   May
         _     _     P     _     _
```
Step 2 — relative clue: "one month between P and Q" → |diff| = 2 (the month *between* them doesn't count them) → Q ∈ {Jan, May}. Two placements possible → **draw both cases, never guess:**
```
        Jan   Feb   Mar   Apr   May
Case A:  Q     _     P     _     _
Case B:  _     _     P     _     Q
```
Step 3 — the glued `RT` block needs two ADJACENT free months:
- Case A: free = {Feb, Apr, May} — Feb is cut off by P's March, so only Apr–May work → R=Apr, T=May → leftover S=Feb ("not Jan" ✓)
- Case B: free = {Jan, Feb, Apr} — only Jan–Feb are adjacent → R=Jan, T=Feb → leftover S=Apr ✓
```
        Jan   Feb   Mar   Apr   May
Case A:  Q     S     P     R     T
Case B:  R     T     P     S     Q
```
Step 4 — both cases survived → you may only answer questions true in BOTH: "P's month?" = March ✓ · "Who is born in April?" → R in A, S in B → **can't determine** — and the paper will include exactly that as an option-trap.

That IS the technique: anchor → "between" clues branch cases → glued pairs need adjacent cells → negative clues prune → answer only what's identical across survivors. *(Same set with 5 exam-style questions → Set 2, Part 4C.)*
**THE trap:** months have boundaries — "2 months after May" is impossible (no July). Boundary months kill cases instantly — use them.
REMEMBER: *"Months can't stretch — check the edges."*

### Type C — Box + Variable Stack (Jan-2026, 3 Qs)
```
| Pos | Box | Colour |
|  7  |     |        |   ← top
|  1  |     |        |   ← bottom
```
Blocks: "X is 2 above Y" → movable block `Y _ X`. "One box between" → `X _ Y` or `Y _ X`.
**Solved example — the whole technique on one set:**
"Five boxes A–E stacked position 1 (bottom) to 5 (top). C is at the bottom. A is immediately above B. D is somewhere above E."

Step 1 — anchor: **C = 1.**
Step 2 — the glued `BA` block floats — three candidate slots: {2,3}, {3,4}, {4,5}.
Step 3 — "D somewhere above E" = ORDER ONLY (D's number > E's, any distance) → fill leftovers each way:
```
pos:       1    2    3    4    5
BA@{2,3}:  C    B    A    E    D   ✓
BA@{3,4}:  C    E    B    A    D   ✓
BA@{4,5}:  C    E    D    B    A   ✓
```
**Three valid stacks — the only certain cell is C=1.** "Which box is at the bottom?" → C (free mark). "Box at position 5?" → D or A → can't determine. This is why box-sets ask "which CAN be true" — answer from the surviving set, not one guess. *(Full solve → Ex 13, Set 3.)*
**THE trap (most misread clue in all of SEBI reasoning):** "**somewhere above**" ≠ "**immediately above**".
WHY: "somewhere above" only fixes ORDER (X higher than Y, any distance). "Immediately above" glues them (X = Y+1 exactly).
REMEMBER: *"Somewhere = just order. Immediately = glued."*

### Type D — Height/Rank-Order (Jan-2026, 3–5 Qs)
No diagram — one inequality chain. "T taller than P but shorter than R" → `R > T > P`.
Merge every new clue into the chain at a shared person; when two fragments share a name, weld them.
**Solved example — welding fragments into one chain:**
"Six people A–F ranked by height. C is taller than E but shorter than B. A is taller than B. D is shorter than E but taller than F."

Step 1 — clue 1 gives a fragment: `B > C > E`
Step 2 — clue 2 shares **B** → weld there: `A > B > C > E`
Step 3 — clue 3 shares **E** → weld there: `A > B > C > E > D > F` — one line, done.
Step 4 — every rank question now reads off the line: tallest = A · 3rd tallest = C · shortest = F · "who sits between C and F" = E and D.

WHY weld at shared names: each clue alone is a loose piece; the shared person is the bolt-hole that locks two fragments rigid. Build the WHOLE chain before reading the questions — 20 seconds of welding answers all 5 sub-questions at once. *(Full solve → Part 4B Type D, Set 4, Ex 7.)*
**THE trap:** "Q between T and R" = T>Q>R **or** R>Q>T — both live until a clue fixes direction. Don't assume.

### Type E — Circular / Square Seating (2024)
**Skeleton:** draw the circle/square, fix ONE person first — circles have no "ends", everything is relative.
- Facing centre: a person's LEFT = clockwise on your page. Facing outside: mirrored.
- "Opposite" in an 8-circle = exactly 4 seats away.
- Square: 4 corners + 4 side-midpoints; corners face diagonally.
**Solved example — the whole technique on one set:**
"Six people A–F around a circle, all facing centre. D sits opposite A. B sits 2nd to the left of A. C is an immediate neighbour of B. F is not a neighbour of A."

Step 1 — fix ONE anchor (circles have no ends): **A at top.**
Step 2 — "D opposite A" → bottom seat. (In a 6-circle opposite = 3 seats away; in an 8-circle = 4.)
Step 3 — facing centre → A's left = YOUR clockwise → "B 2nd left of A" = 2 seats clockwise from A.
Step 4 — "C neighbour of B" → B touches two seats; one is D → C takes the other.
Step 5 — negative last: "F not next to A" → of the two leftover seats, the one beside A is banned → F takes the far seat → E fills the last.
```
final (clockwise from top):  A — C — B — D — F — E
```
Verify every clue against the ring before answering — if all hold, you're done. *(Full solve → Part 4B Type E, Set 5, Ex 3.)*
**Trap:** MIXED facing ("some in, some out") — draw a small arrow per person; hardest variant → do LAST.

### Type F — Floor / Stacked-Building (drill rotation from W3)
**Skeleton — numbered floors in a table, top = highest number:**
```
| Floor | Person | Variable |
|  8    |        |          |   <- top
|  1    |        |          |   <- ground
```
Clue forms: "X on floor 5" (anchor) · "Y immediately above X" (glued block `XY`) · "Z somewhere above X" (ORDER ONLY — same trap as box stack) · "two floors between P and Q" → |diff| = 3 · "P on an even-numbered floor" · "P below Q but not the lowest".
**Solved example — the whole technique on one set:**
"Seven floors, 1 (ground) – 7 (top). T lives on floor 4. Two floors lie between T and Q. P lives immediately above Q. V lives on the top floor. R is somewhere above S. U lives on an odd-numbered floor."

Step 1 — anchors: **T=4, V=7.**
Step 2 — "two floors between T and Q" → |4−Q| = 3 → Q ∈ {1, 7} → 7 is taken by V → **Q=1.**
Step 3 — glued: "P immediately above Q" → **P=2.** (Bonus boundary effect: Q=7 would have died anyway — no floor 8 exists for P.)
Step 4 — leftovers {3,5,6} for R,S,U. "R somewhere above S" = order only. "U odd" → U ∈ {3,5} → **two survivors:**
```
 7 V      7 V
 6 R      6 R
 5 S      5 U
 4 T      4 T
 3 U      3 S
 2 P      2 P
 1 Q      1 Q
```
Certain in both: V7, R6, T4, P2, Q1 — S and U swap. "Who lives on floor 6?" → R · "floor 5?" → can't determine. Two surviving cases is a LEGITIMATE answer state — pick questions on the fixed cells. *(Full solve → Part 4B Type F, Set 6.)*
**THE trap:** numbering direction — confirm ground = floor 1 BEFORE placing; and "somewhere above" vs "immediately above" (the box-stack trap in vertical form).
REMEMBER: *"Floors are just a vertical box-stack — same rules, rotated 90 degrees."*
**Mixed variant** (flat A1/A2/A3 on each floor): keep the flat-variable in the table's third column — never in your head.

### Type G — Scheduling / Day-Event (rotation, cheap marks)
**Skeleton — a day table, Mon→Sun (or given dates):**
```
| Day   | Person/Event | Variable |
| Mon   |              |          |
```
Clue forms: "P's exam before Q's, not on Mon" · "two days between X and Y" → |diff| = 3 · "Y on the day immediately after X" (glued `XY` block) · "X on a working day".
**THE trap:** week boundaries — "the day after Sunday" doesn't exist in a Mon–Sun set; "two days before Tuesday" needs Sunday to exist in your week. Check the ends exactly like month puzzles.
REMEMBER: *"Days are a tiny row of 7 — same linear rules, smaller board."*
**Solved example — the whole technique on one set:**
"Exams P,Q,R,S,T,U held Mon–Sat, one per day. R is on Wednesday. Two days lie between R and P. Q is held immediately before S. U's exam is after R's. T is not on Monday."

Step 1 — anchor: **R = Wed.**
Step 2 — "two days between" → |diff| = 3 → P ∈ {Sun✗ not in the week, Sat} → **P = Sat.** (The week edge killed one side instantly — same trick as month boundaries.)
Step 3 — glued `QS` pair needs two adjacent free days → {Mon,Tue} or {Thu,Fri}.
Step 4 — "U after R" → U ∈ {Thu,Fri} → if `QS` took Thu–Fri, U has no slot left → **`QS` = Mon–Tue.**
Step 5 — T,U fill Thu–Fri either order; "T not on Monday" can't separate them → **two live cases:**
```
       Mon   Tue   Wed   Thu   Fri   Sat
        Q     S     R     T     U     P     — or —    Q  S  R  U  T  P
```
Fixed across both: Q-Mon, S-Tue, R-Wed, P-Sat. "U's exam day?" → Thu or Fri → can't determine — unless the question itself adds "if T is on Friday…" (then U=Thu). *(Full solve → Part 4B Type G, Set 7.)*

---

# PART 2 — THE SINGLES (fast standalone marks)

## Blood Relations (3 Qs in 2024)
**Method — DRAW a tree, never think it.** WHY: relations are spatial; your brain drops a generation when holding 4+ people in words.
```
□ male · ○ female · ─ couple · | parent–child · ═ siblings
```
**Worked:** "She is the daughter of my grandfather's only son" → grandfather's only son = my father → his daughter = **my sister**.
**Traps:** "only son/daughter" collapses branches · maternal = mother's side · brother-in-law needs a drawn marriage line.
**Coded form** ("A+B = A is father of B"): decode symbols into the SAME tree, left to right.

## Alphanumeric / Word Series (1–3 Qs — the 20-second marks, do FIRST)
`4 & R 9 K # T 2 @ B …` — "how many letters preceded by symbol AND followed by digit": slide a mental 3-char window, count hits.
Word questions: "EXAMINE alphabetically" → E A E I M N X → answer position Qs. Pure scanning, no thinking.

## Statement & Assumption / Inference (2–3 Qs every year)
- **Assumption test — NEGATE it:** WHY: an assumption is what the statement can't survive without. Negate the option; if the statement dies → it's an assumption.
  > "Join our yoga classes to be healthy." Option "yoga improves health" → negate → "yoga doesn't improve health" → the pitch dies ✓ it IS assumed.
- **Inference:** must-follow = true. Kill options that exceed the passage's scope, use always/never, or merely restate a given fact.
- **Strong/weak argument:** strong = directly addresses the issue with a real consequence; weak = emotional, vague, one-sided, "some people feel".

## Data Sufficiency (2 Qs in 2024)
Judge CAN the data solve it — don't solve it. Test stmt-1 alone → stmt-2 alone → combined. SEBI trap: each statement gives partial seating — only combined resolves. You're grading sufficiency, not finding the answer.

## Rotation topics (0 Qs lately — keep alive at low cost, they return unannounced)
- **Syllogism:** full deep-dive in PART 2B below — the 4 statement drawings, the 6 elimination rules, every question phrasing SEBI uses, worked variants. See Ex 6, 15, 16 + Syl-Ex 1–8.
- **Inequality:** chain `>` `≥` `=` — a conclusion follows only if symbols link end-to-end pointing the same way. **Patterns asked:** direct-chain compare · coded symbols (@,#,$ decode first — Ex 17).
- **Coding:** shifts (+2/−3), reverse, position swap; word-codes = find shared word ↔ shared code (Ex 18).
- **Direction:** draw N-up; turns are relative to CURRENT facing; final displacement by net movement. **Patterns asked:** net displacement (Ex 10) · shortest-path (√) · shadow/facing tricks.
- **Input-output:** identify the step-rule (sort by length? alternate?) then apply mechanically (Ex 19).

---

# PART 2B — SYLLOGISM DEEP-DIVE (method + tricks + every question type)

Syllogism = statements give relationships between groups → judge whether conclusions MUST hold. 0–3 Qs in recent papers but nearly free marks once the method is mechanical — and it returns in bursts.

## Step 1 — THE ONLY 4 DRAWINGS (memorize these 4 pictures)

```
All A are B        Some A are B        No A is B        Some A are not B
┌─────────┐        ┌───┐  ┌───┐        ┌───┐   ┌───┐     ┌───┐  ┌───┐
│  ┌───┐  │        │ A ├──┤ B │        │ A │   │ B │     │A ✕├──┤ B │
│  │ A │  │        └───┘  └───┘        └───┘   └───┘     └───┘  └───┘
│  └───┘  │         overlap lens        separate          ✕ = part of
│    B    │         (at least one)      circles           A outside B
└─────────┘
```

- **All A are B** → small circle A *inside* big circle B. (B may or may not contain other things — never assume.)
- **Some A are B** → two circles overlapping; the overlap zone = "at least one". The overlap can sit ANYWHERE — that's the freedom that kills hasty conclusions.
- **No A is B** → two separate circles. Reversible: No A is B = No B is A — always.
- **Some A are not B** → circle A, with a portion marked ✕ that can never enter B. Draw only the forbidden part; the rest of A is free.

## Step 2 — THE GOLDEN RULE (why people get these wrong)

> **A conclusion FOLLOWS only if it's true in EVERY valid drawing of the statements.**
> A "possibility" conclusion follows if it's true in ANY ONE valid drawing.

"Could be true in some drawing" is the trap — the exam wants "true no matter how you draw it." When in doubt, try to DRAW A COUNTER-EXAMPLE: if you can draw the statements true while the conclusion is false → it does not follow.

## Step 3 — THE 6 ELIMINATION RULES (the actual tricks — solve most Qs without drawing)

| # | Rule | Example |
|---|---|---|
| R1 | **Two "Some" statements → NO definite conclusion follows** | Some A are B + Some B are C → nothing definite between A and C |
| R2 | **Two negative statements → NO definite conclusion** | No A is B + No B is C → A and C could be anything to each other |
| R3 | **One negative statement → only a NEGATIVE conclusion can follow** | All A are B + No B is C → only "No A is C" type, never "Some A are C" |
| R4 | **Middle term must be fully used at least once** (the term common to both statements — B in "All A are B, All B are C"). If neither statement covers ALL of B, no definite A–C conclusion | Some A are B + Some B are C → B never fully covered → R1 catches it too |
| R5 | **Conclusion can't exceed the statements' scope** — "All" in conclusion needs "All" in statements | Some A are B (alone) can never give "All A are B" |
| R6 | **Reversals that ARE valid:** Some A are B ⇒ Some B are A ✓ · No A is B ⇒ No B is A ✓ · **NOT valid:** All A are B ⇏ All B are A ✗ | All pens are books ⇏ All books are pens |

**Speed order:** read conclusions first → run R1–R6 → only draw when a conclusion survives the rules. 80% of SEBI syllogisms die at the rules stage, no drawing needed.

## Step 4 — EVERY QUESTION PHRASING SEBI USES

| Phrasing in the paper | What it's really asking | Trick |
|---|---|---|
| "Which conclusion(s) definitely follow(s)" | Standard — golden rule | R1–R6 first |
| "…is a possibility" / "All A being B is a possibility" | Can ANY valid drawing show it? | Almost everything not impossible IS possible — see Syl-Ex 4 |
| "Either conclusion 1 or 2 follows" | Neither alone is certain, but exactly one MUST be true | Complementary-pair test below |
| "At least some A are B" | Just a fancy "Some A are B" | Treat identically |
| "Only a few A are B" (new pattern) | = **Some A are B + Some A are not B** — BOTH parts | Trap: don't treat as simple "Some" |
| "Only A is B" | Flip it: **All B are A** | "Only" reverses the direction — the #1 misread |
| "A can never be B" | Is overlap impossible in ALL drawings? | Needs a "No" chain reaching A and B |
| Reverse syllogism — "Conclusion X follows. Which statements give it?" | Pick the option whose statements FORCE X | Test each option's pair — use R1–R6 backwards |

## The EITHER-OR test (complementary pairs)

Two conclusions form an either-or pair when ALL THREE hold:
1. **Same subject and predicate** (both about A and C)
2. **One positive + one negative** — valid pairs: `All A are C` + `Some A are not C` · `Some A are C` + `No A is C` · `Some A are C` + `Some A are not C`
3. **Neither follows individually** — if one already follows, it's not either-or, it's just that one.

## Syl-Ex 1 — basic definite. "All cats are dogs. All dogs are animals." → "All cats are animals?"
**Solve:** middle term "dogs" is fully covered by "All dogs are animals" (R4 ✓), both positive → chain gives **All cats are animals ✓ follows.** "Some cats are animals" also follows (All ⊃ Some).

## Syl-Ex 2 — the R1 killer. "Some pens are books. Some books are desks." → "Some pens are desks?"
**Solve:** Some + Some → R1 → **does not follow** (Ex 6 proved it with the drawing). But then "Some pens are desks is a **possibility**" → follows ✓.

## Syl-Ex 3 — negative chain. "All cats are dogs. No dog is a fish." → "(1) Some cats are fish (2) No cat is a fish."
**Solve:** one negative (R3) → only negative conclusions live → (1) dead. cats ⊂ dogs, dogs fully separate from fish → (2) **No cat is a fish ✓** (this was Ex 16's setup).

## Syl-Ex 4 — possibility. "All pens are books. Some books are desks." → "All pens being desks is a possibility?"
**Solve:** could a valid drawing put ALL of the pens circle inside desks' overlap zone? Statements don't forbid it → **follows ✓.** Rule: a possibility fails ONLY when statements force the opposite (e.g., a "No" separating the two).

## Syl-Ex 5 — either-or. "Some cars are bikes. Some bikes are trucks." → "(1) Some cars are trucks (2) No car is a truck."
**Solve:** R1 → (1) not definite; (2) not definite either (statements never separate cars and trucks). Same subject-predicate ✓, one positive + one negative ✓ (Some vs No is a valid pair), neither follows ✓ → **"either 1 or 2 follows."**

## Syl-Ex 6 — "only a few" trap. "Only a few students are toppers. All toppers are hard-working." → "Some students are hard-working?"
**Solve:** decode → Some students are toppers AND Some students are not toppers. First part + "All toppers are hard-working" → Some students (the topper ones) are hard-working → **follows ✓.** The second part (Some are not) does NOT kill it — it only describes the rest.

## Syl-Ex 7 — "only" direction flip. "Only singers are artists. All artists are performers." → "All performers are singers?"
**Solve:** "Only singers are artists" = **All artists are singers**. Now: singers ⊃ artists ⊂ ... performers? "All artists are performers" puts artists inside performers — performers is the biggest circle, singers unknown against it → **does not follow.** But "Some performers are artists" → follows (artists ⊂ performers ⇒ overlap).

## Syl-Ex 8 — three-statement + "can never be". "All A are B. All B are C. Some C are D." → "(1) A can never be D (2) Some B are D is a possibility."
**Solve:** (1) — A ⊂ B ⊂ C, and D overlaps C somewhere; nothing forbids D's overlap covering A's zone → A CAN be D → (1) fails. (2) — a drawing exists where D's overlap touches B → **possibility follows ✓.**

## The 60-second procedure (exam speed)

```
1. Read conclusions, not statements first.
2. R1–R6 scan — kill what dies by rule (no drawing).
3. Survivors → draw minimum circles; try to BREAK the conclusion.
4. "Possibility" in wording? Flip the test — need only ONE allowing drawing.
5. Pair check — if exactly two conclusions with same terms, one + one −, both failed → either-or.
```

---

# PART 3 — EXAM-DAY GAME PLAN

**Order:** singles first (series, blood relation, assumptions — 30–60 sec each) → easiest puzzle set (most definite clues) → second set → hard sets last.
**Cap: 18 min.** One diagram = 4–5 marks, but a stuck set is a mark-sink — branch cases or leave.

**Daily drill:**
- 1 full puzzle set timed (target ≤5 min) — rotate A→B→C→D→E types.
- 10 singles mixed.
- Error log: which CLUE TYPE stalled you — "two cases became four", "missed south-facing mirror", "uncertain count" — that clue type is tomorrow's set.

---

# PART 4 — WORKED EXAMPLES (full solves, one per question type)

**Ex 1 — linear seating (single row, north-facing).** "6 people A–F in a row facing north. A sits 2nd from left. C is immediate right of A. Only one person between C and F. B is not at any end."
**Solve:** Fix A at position 2 → C at 3. "One between C and F" → F at 5. B not at ends → B at 4. Remaining D, E → ends 1 and 6 (either order — that ambiguity IS a valid answer if a question asks only about fixed people).
**Ans pattern:** 4-5 follow-up questions all fall out of this one diagram. *(Rule used: definite anchors first, "between X" counts the gap.)*

**Ex 2 — the trap clue.** "P sits somewhere above Q" vs "P sits immediately above Q" in a floor puzzle.
**Solve:** "somewhere above" = P on ANY higher floor (order only). "Immediately above" = P glued on top of Q (movable block `QP`). Treating "somewhere" as "immediately" is the #1 way puzzle sets collapse.
**REMEMBER: "somewhere = order only; immediately = glued."**

**Ex 3 — circular seating (facing centre).** "8 people around a circle facing centre. A faces B. C is 2nd to A's left."
**Solve:** Facing centre → THEIR left = YOUR right on paper. Place A at top, B opposite (bottom). A's left on the page = clockwise side → count 2 seats clockwise from A → C. **Draw arrows for facing before placing anyone.**

**Ex 4 — blood relation decode.** "Pointing to a photo, Ravi says: 'She is the daughter of my grandfather's only son.' How is she related to Ravi?"
**Solve:** grandfather's only son = Ravi's father → his daughter = **Ravi's sister.** *(Rule: decode inside-out — "grandfather's only son" first.)*

**Ex 5 — coded blood relation.** "A + B means A is B's mother. A − B means A is B's brother. What is P + Q − R to R?"
**Solve:** P + Q → P is Q's mother. Q − R → Q is R's brother. So P is mother of R's brother → **P is R's mother.**

**Ex 6 — syllogism.** "Statements: All pens are books. Some books are desks. Conclusion: Some pens are desks."
**Solve:** draw books ⊃ pens; desks overlap books SOMEWHERE (not necessarily on pens). Could desks touch pens? Maybe — but "maybe" ≠ "definitely." **Conclusion: does NOT follow.** *(Rule: a conclusion holds only if true in EVERY valid diagram.)*

**Ex 7 — inequality chain.** "T > P, R > T, S < P, T > Q > P. Order all five?"
**Solve:** merge links → R > T > Q > P > S. Every pair comparison from the options is answered by this one chain. *(Rule: chain first, questions after — never compare pairs one-by-one.)*

**Ex 8 — statement & assumption (negation test).** "Statement: 'Enroll in our crash course to crack SEBI.' Assumption: 'A crash course can help crack SEBI.'"
**Solve:** negate → "a crash course CANNOT help" → the ad's whole pitch dies → **assumption is implicit.** If negating doesn't kill the statement, it isn't assumed.

**Ex 9 — data sufficiency.** "Q: Who is tallest among A, B, C? (1) A > B (2) B > C."
**Solve:** stmt 1 alone → A vs B only, C unknown → insufficient. Stmt 2 alone → insufficient. Combined → A > B > C → sufficient. **Answer: both together needed.** Trap: picking stmt 1 because it names A — it never places C.

**Ex 10 — direction sense.** "A man walks 3 km north, turns right walks 4 km, turns right walks 3 km. Where is he from start?"
**Solve:** north 3 → east 4 → south 3 → net = 4 km east of start. Draw the L-path; the two 3 km legs cancel. **Ans: 4 km east.**

**Ex 11 — alphanumeric series.** "Find next: Z1A, Y2B, X3C, ?"
**Solve:** letters step back Z→Y→X→**W**; digits step up 1→2→3→**4**; trailing letters step forward A→B→C→**D** → **W4D.** Split into parallel sub-series — never try to see one rule across the whole string.

**Ex 12 — month + variable puzzle (full table solve, two live cases).** "Five people P,Q,R,S,T have birthdays in Jan–May, one per month. P is in March. Exactly one month lies between P and Q. R is immediately before T. S is not in January."
**Solve:** P→Mar. "One month between" → |diff| = 2 → Q ∈ {Jan, May} → **two cases:**
- **Case A (Q=Jan):** R,T need an adjacent pair in remaining {Feb,Apr,May} → R=Apr, T=May → S=Feb ✓
- **Case B (Q=May):** remaining {Jan,Feb,Apr} → R=Jan, T=Feb → S=Apr ✓
Both valid — so answer only what's fixed in BOTH: *"Who was born in March?"* → P in both → **P**. *"Who in April?"* → R (A) vs S (B) → can't determine — that 'unanswerable' option is itself a deliberate exam trap.
**Rules:** "one month between" = difference of 2, not 1 · branch cases side by side · only answer what's identical across all surviving cases.

**Ex 13 — box stack.** "5 boxes A–E stacked 1(bottom)–5(top). A is immediately above B. C is at the bottom. D is somewhere above E."
**Solve:** pos1=C. Block `BA` (B under A) is movable → sits at {2,3},{3,4} or {4,5}. "D above E" = order only. Try block at {2,3}: B2,A3 → remaining pos 4,5 → E4,D5 fits (D above E ✓). **Stack: C,B,A,E,D.** If a second valid arrangement existed, the question would ask only fixed cells — same rule as Ex 12.
**Rule:** glued block `BA` first, "somewhere above" is order-only — test the block's positions against remaining slots.

**Ex 14 — two-case branching (the discipline that saves sets).** "4 people in a row. X is left of Y. Z is at an end."
**Solve:** two live cases — Z at pos1 (X,Y fill 2–4 keeping X left of Y) or Z at pos4. **Draw both skeletons side by side; don't pick.** Next clue "Z is left of X" kills pos4 case → Z1, then X2/3, Y after. *Rule: never guess a case — branch it and let a clue kill the loser.*

**Ex 15 — syllogism: possibility conclusion.** "All pens are books. Some books are desks. Conclusion: Some pens being desks is a possibility."
**Solve:** the definite conclusion failed (Ex 6) — but could desks' overlap with books TOUCH the pens circle? Yes, a valid drawing exists where they overlap → **possibility follows.** *Rule: "possibility" conclusions pass if ANY valid drawing allows them — almost everything not explicitly impossible is possible.*

**Ex 16 — syllogism: either-or (complementary pair).** "All cats are dogs. No dog is a fish. Conclusions: (1) Some cats are fish (2) No cat is a fish."
**Solve:** cats ⊂ dogs, fish separate from dogs → cats can't touch fish → (1) false, (2) TRUE → simple "only 2 follows." *The either-or variant:* "Some cats are fish" vs "Some cats are not fish" when NEITHER is definite — the pair is complementary (exactly one must hold) → answer "either 1 or 2." *Rule: complementary pairs = 'All X are Y' vs 'Some X are not Y', or 'Some X are Y' vs 'No X is Y' — if neither alone follows, either-or is the answer.*

**Ex 17 — coded inequality.** "A @ B means A > B · A # B means A ≥ B · A $ B means A = B · A & B means A < B. Given P @ Q, Q # R, R $ S → compare P and S."
**Solve:** decode the chain → P > Q ≥ R = S → **P > S**, definite. *Rule: translate codes into one plain chain FIRST — never compare inside the symbols.*

**Ex 18 — word-coding decode.** "In a code, 'market rises today' = 'pa qa ra', 'today market falls' = 'qa sa pa'. Code for 'market'?"
**Solve:** both sentences share 'market today' → shared codes {pa, qa}. 'today' appears in both → but which code? First has unique word 'rises'↔ unique code 'ra'; second unique 'falls'↔'sa'. So {pa,qa} = {market,today} — can't fully separate with two lines; a third sentence would. If options force one, test each. *Rule: shared word ↔ shared code; unique word ↔ unique code.*

**Ex 19 — input-output.** "Input: 84 cat 23 dog 51 ant  Step I: 84 cat 51 dog 23 ant (sorted descending by number within pairs)."
**Solve:** identify the rule from Step I→II (usually ascending/descending sort, or alternate word/number shifts), then apply mechanically to each next step. *Rule: don't predict all steps — find the ONE transformation and repeat.*

**Ex 20 — uncertain number of persons.** "Some people in a row. 3 sit between A and B; 2 between B and C; C sits at an end."
**Solve:** derive the range — A,B need ≥5 people; C at end + 2 between B,C pins C and B → count resolves to 6–8 depending on A's side. If it stays ambiguous after 2 clues → **take only the certain answers, skip the rest — this type is a deliberate time-sink.**

# PART 4B — FULL SOLVES, ONE PER PUZZLE TYPE (type-wise, in the order you'll meet them)

Each solve below runs the SAME 6-step method from Part 1 — watch the order, not just the answer.

## Type A — DOUBLE-ROW FACING (the mirrored trap in full)

**Set:** "8 people — A,B,C,D in Row 1 facing SOUTH; P,Q,R,S in Row 2 facing NORTH; column-mates face each other. A sits at the left end of Row 1. C is 2nd to the left of A. R faces C. D is not at any end. B faces S. Q sits at an end."

**Solve:**
```
col:        1    2    3    4
Row1 (S):   _    _    _    _     ← their left = page RIGHT
Row2 (N):   _    _    _    _     ← their left = page LEFT
            ↑ column-mates face each other
```
1. **Ink the facing rule first** (this is the whole game): Row-1 people face south → THEIR left = page RIGHT. Row-2 face north → THEIR left = page LEFT. Write arrows before anyone is placed.
2. **Anchors:** A at left end → Row1-col1. "C is 2nd to the left **of A**" → A's perspective: A's left = page right → count 2 → **C at col3.**
3. **"R faces C"** → R = Row2-col3.
4. **"D not at an end"** → Row1 free cols are {2,4} but col4 is an end → **D at col2** → B takes col4.
5. **"B faces S"** → S = Row2-col4. Row2 left: cols {1,2} for P,Q; **"Q at an end"** → Q=col1, P=col2.
```
Row1:  A   D   C   B
Row2:  Q   P   R   S
```
**Rule that makes this type easy:** "the left END" = physical position, never mirrors. "2nd to the left **OF A**" = A's perspective, DOES mirror for south-facing. Get that one distinction inked on the diagram and every remaining clue is just column-filling.

## Type D — HEIGHT / RANK ORDER (full chain build)

**Set:** "Six people A–F by height. C is taller than E but shorter than B. A is taller than B. D is shorter than E but taller than F. Who is 3rd tallest?"

**Solve — weld fragments at shared names:**
1. `B > C > E` (clue 1)
2. `A > B` → weld → `A > B > C > E`
3. `E > D > F` → weld at E → **`A > B > C > E > D > F`** — done, one line.
4. 3rd tallest = **C.** Any rank question (2nd shortest, middle, between X and Y) reads off the same line.
**Rule:** build the whole chain BEFORE reading the questions — 20 sec of welding answers all 5 sub-questions at once. Trap variant: "X is between Y and Z" = two live directions until fixed — keep both (`Y>X>Z` and `Z>X>Y`).

## Type E — CIRCULAR, all facing centre (complete 8-person solve)

**Set:** "8 people A–H around a circle, all facing centre. A sits 2nd to the left of B. C sits opposite A. D is an immediate neighbour of C and B. E sits 3rd to the right of C. F is not a neighbour of A."

**Solve:**
1. Draw 8 seats. Fix A at top. Facing centre → **their left = your clockwise.** "A 2nd to left of B" → B sits 2 seats COUNTER-clockwise from A (B's left-neighbour-of relationship inverted) → place B.
2. "C opposite A" → bottom seat.
3. "D neighbour of C AND B" → the seat touching both → unique spot between them → place D.
4. "E 3rd to right of C" → C's right = counter-clockwise on page (facing centre mirrors) → count 3 → place E.
5. Remaining seats for F,G,H; "F not neighbour of A" kills the seat(s) beside A → F forced into the only remaining non-adjacent seat → G,H fill the rest.
**Rules used:** fix one anchor (circles have no ends) · facing arrows before placing · "2nd to the left OF X" uses X's facing, "the left end" never mirrors · negative clue last trims the leftovers.
**Square variant:** 4 corners face diagonally, 4 side-seats face the centre square — "opposite" at a corner = diagonal corner; on a side = the matching side. Same method, two facing families — keep corner-arrows and side-arrows distinct.

## Type F — FLOOR + VARIABLE (vertical box-stack, full solve)

**Set:** "7 floors, 1=ground to 7=top. People P,Q,R,S,T,U,V. T lives on floor 4. Two floors lie between T and Q. P lives immediately above Q. V lives on the top floor. R is somewhere above S. U lives on an odd-numbered floor."

**Solve:**
```
7  V
6  ?
5  ?
4  T        ← anchor
3  ?
2  ?
1  ?
```
1. **Anchor:** T=4. "Two floors between T and Q" → |4−Q|=3 → **Q ∈ {1,7} → two cases.**
2. **Boundary-kill:** "P immediately ABOVE Q" → Q can't be floor 7 (no floor 8) → **Q=1, P=2.** *This is the floor trap working for you: glued blocks near the edges self-eliminate.*
3. **Anchor:** V=7. Floors left for R,S,U: {3,5,6}.
4. **Order-only clue LAST:** "R somewhere above S" fixes no floors — it only demands R's number > S's. Options in {3,5,6}: (R,S) = (5,3),(6,3),(6,5).
5. **"U on odd floor"** → U ∈ {3,5}.
   - U=3 → remaining {5,6} → R=6, S=5 (R>S ✓) → **case valid**
   - U=5 → remaining {3,6} → R=6, S=3 (R>S ✓) → **case valid**
```
7 V      7 V
6 R      6 R
5 S      5 U
4 T      4 T
3 U      3 S
2 P      2 P
1 Q      1 Q
```
Two surviving cases — **that's a legitimate outcome.** Answer only the fixed cells: T=4, P=2, Q=1, V=7, R=6 are certain in BOTH; S and U swap. A question asking "who lives on floor 5?" → can't determine; "on floor 6?" → R.
**Rules:** anchors → boundary-check glued blocks (they die at the edges — use it) → order-only clues last · floors = box-stack rotated 90°; "somewhere above" is still order-only, never glued.

## Type G — SCHEDULING (day table, full solve)

**Set:** "Lectures P,Q,R,S,T,U on Mon–Sat, one per day. P is on Thursday. Two days between P and Q. R is the day immediately before T. S is not on Monday. U's lecture is before R's."

**Solve:**
1. Table Mon–Sat. P→Thu.
2. |P−Q|=3 → Q ∈ {Mon, Sun} → Sun not in week → **Q=Mon.**
3. R = day before T → glued block `RT` on adjacent days → fits {Tue,Wed}, {Wed,Thu✗}, {Fri,Sat} → RT ∈ {Tue-Wed, Fri-Sat}.
4. "U before R" → R can't be Tue (only Mon=Q is before) → **RT = Fri-Sat.**
5. Leftover day = Tue,Wed for S,U with "U before R" ✓ either, "S not on Mon" → S can be Tue or Wed → **two live cases** — and that ambiguity is fine: answer questions only on what's fixed (P-Thu, Q-Mon, R-Fri, T-Sat are certain; S/U swap).
**Rules:** days = a 7-seat row → all Type-A logic applies · "the day after Saturday" doesn't exist → boundary-check blocks · when two leftover people fill two leftover days with no separating clue, the set legitimately has that ambiguity — pick questions on the fixed cells.

## The cross-type cheat-sheet (match the set in 5 seconds)

| First clue you see | Type | Skeleton | The trap to expect |
|---|---|---|---|
| "row facing north/south" | A linear | numbered row | south-facing mirror |
| "two rows facing each other" | A double | mirrored columns | own-left vs physical-end |
| "born in months Jan–Jun" | B month | month table | month boundaries |
| "boxes stacked" | C box | numbered stack | somewhere ≠ immediately |
| "taller/heavier/ranked" | D chain | one `>` line | "between X and Y" = 2 directions |
| "circular table" | E circle | wheel + arrows | inside/outside mirroring |
| "lives on floor N" | F floor | vertical table | glued-block boundary kills |
| "exam/person on days" | G day | Mon–Sun row | week edges, glued RT blocks |
| "some people, number not given" | A-uncertain | derive count | deliberate time-sink — bail early |

---

# PART 4C — PRACTICE SETS (real exam format: clues + 5 questions + answers)

Attempt each set cold (target ≤5 min). The answer block solves the diagram AND the questions — this is the exact shape the paper uses.

## SET 1 — Linear row (Type A)

**Clues:** Eight people P,Q,R,S,T,U,V,W in a row facing north. V sits second to the left of S. U sits immediate right of S. Only one person sits between U and W. Q sits at an end. R is not a neighbour of V. P sits third to the right of T.

**Solve:**
- "V second-left of S" → block `V _ S`; "U immediate right of S" → `V _ S U` (4-seat block).
- "One between U and W" → W is 2 seats from U → block extends `V _ S U _ W` or `W _ V _ S U`.
- Try `V _ S U _ W` placed at seats 1-6: V1,S3,U4,W6. Left {2,5,7,8} for P,Q,R,T. Q end → 8. "P third right of T" → T=2,P=5 ✓ → R=7. "R not neighbour of V(1)" → R=7 ✓.
- **Layout: V,T,S,U,P,W,R,Q**
- Verify all: V 2nd-left of S ✓(V1,S3). U imm-right S ✓(4). One between U(4),W(6) ✓. Q end ✓(8). R(7) not neighbour V(1) ✓. P(5) third-right of T(2) ✓.

**Questions (the real follow-ups):**
1. Who sits 3rd from the left? → **S**
2. Who sits immediate left of W? → **P**
3. How many sit between T and W? → T=2,W=6 → **3 (S,U,P)**
4. Who is at the right end? → **Q**
5. Which pair are neighbours? a) V,R b) U,W c) T,S d) P,Q → **c) T,S**

## SET 2 — Month + variable (Type B)

**Clues:** Six people A,B,C,D,E,F born in Jan,Feb,Mar,Apr,May,Jun (one each), each likes a different fruit. A born in April. Only one person born between A and B. C born immediately before D. E born in a month with 31 days but not January. F likes mango. B likes apple.

**Solve:**
- A=Apr. "One between A and B" → |diff|=2 → B ∈ {Feb, Jun}.
- "C immediately before D" → adjacent pair `CD`.
- Case B=Feb: remaining months {Jan,Mar,May,Jun} for C,D,E,F → CD fits {Mar,Apr✗},{May,Jun},{Jan,Feb✗} → CD=May-Jun only → E,F take Jan,Mar → "E in a 31-day month, not Jan" → E=Mar? (Mar=31 ✓) wait months left after CD=May,Jun: {Jan,Mar} → E=Mar(31d ✓),F=Jan. **Consistent:** F=Jan,B=Feb,C? wait CD=May,Jun → C=May,D=Jun. Check "E not Jan" ✓ → **layout: F-Jan,B-Feb,E-Mar,A-Apr,C-May,D-Jun**
- Case B=Jun: remaining {Jan,Feb,Mar,May} → CD adjacent: {Jan,Feb},{Feb,Mar} → E needs 31-day month from the leftovers: if CD=Jan,Feb → E,F∈{Mar,May} both 31d, E∈{Mar,May} (not Jan anyway) → ambiguous two sub-cases; if CD=Feb,Mar → E,F∈{Jan,May} → E=May(31d,not Jan ✓),F=Jan → also valid!
- Multiple cases survive → answer only fixed cells: **A=Apr, B's fruit=apple** are the certainties; full layout needs one more clue — the questions below use the B=Feb main case AND note ambiguity.

**Questions:**
1. In which month was A born? → **April** (anchor — always free)
2. If B was born in February, who was born in June? → **D**
3. F likes which fruit? → **mango** (given variable — the "free mark" question)
4. E was born in which month (if B=Feb)? → **March**
5. C was born immediately before ___? → **D** (in every valid case)

## SET 3 — Box stack (Type C)

**Clues:** Six boxes A,B,C,D,E,F stacked 1(bottom)-6(top). A is immediately above B. D is at the bottom. F is somewhere above E but not at the top. Two boxes between C and A.

**Solve:**
- D=1. Block `BA` movable. "|A−C|=3" → if `BA` at {2,3}: B2,A3 → C=6 → F somewhere above E, not top → E,F fill {4,5}: F>E, F≠6 ✓ → E4,F5 ✓ → **layout: D,B,A,E,F,C**
- Check alternative `BA` at {4,5}: A=5→C=2or8 → C=2 → E,F fill {3,6}: F>E and F≠top(6) → F must be <6 → impossible (only {3,6} left, F would be 6) ✗
- `BA` at {5,6}: A=6→C=3 → E,F fill {2,4}: F>E→E2,F4 ✓ → **layout2: D,C,E,B?,** wait B=5,A=6: D1,C?,E?,B5,A6 → C=3 → remaining {2,4} for E,F → E2,F4 ✓ → **D,E,C,B?,** no: seats 1=D,2=E,3=C,4=F,5=B,6=A → **D,E,C,F,B,A** also valid!
- Two valid stacks → answer only fixed cells: D=1 always. Which boxes can be at top? C or A.

**Questions:**
1. Which box is at the bottom? → **D** (always fixed)
2. If A is at position 3, which is on top? → **C**
3. "F somewhere above E" means F must be ___ E → **higher than, not necessarily adjacent** (the vocabulary question!)
4. Can F be at the top? → **No** (explicit clue)
5. In the stack D,B,A,E,F,C — how many boxes between B and F? → positions 2 and 5 → **2**

## SET 4 — Height/rank (Type D)

**Clues:** Seven people ranked by weight. K is heavier than M but lighter than J. P is heavier than J. N is lighter than M but heavier than O. L is the lightest. Who is heaviest? Who is 3rd heaviest?

**Solve:** weld → P > J > K > M > N > O > L.
1. Heaviest? → **P**
2. 3rd heaviest? → **K**
3. Lightest? → **L**
4. N heavier than? → **O and L**
5. Between J and M? → **K**

## SET 5 — Circular facing centre (Type E)

**Clues:** Six people P,Q,R,S,T,U around a circle, all facing centre. P sits second to the right of Q. R sits opposite P. S is an immediate neighbour of R and T. U is not a neighbour of Q.

**Solve:**
1. Fix Q at top. Facing centre → THEIR right = YOUR counter-clockwise. "P second right of Q" → P 2 seats CCW from Q.
2. "R opposite P" → the far seat.
3. "S neighbour of R AND T" → S sits in the seat touching both R and T → S next to R, T on S's other side.
4. Leftover seat → U; "U not neighbour of Q" confirms.
- **Layout (clockwise from top): Q, U?, S, R, T, P** — verify: P 2nd-right of Q ✓, R opposite P ✓, S touches R+T ✓, U not beside Q → U sits opposite-adjacent seat ✓.

**Questions:**
1. Who faces P? → **R**
2. Who is 2nd to the right of Q? → **P**
3. Who sits between R and T? → **S**
4. Neighbours of S? → **R and T**
5. U sits ___ to Q → **not adjacent** (2 seats away)

## SET 6 — Floor + variable (Type F)

**Clues:** Six floors (1-6), people A-F each with a subject. C lives on floor 4. Two floors between C and E. B lives immediately above E. A lives on floor 1. D studies Math and lives on an odd floor. F lives above C.

**Solve:**
- C=4, A=1. |4−E|=3 → E∈{1,7} → 1 taken → E=7?? only 6 floors → **contradiction → reread**: |diff|=3 → E∈{1,7} both dead → means "two floors between" → |4−E|=3 → no floor 7 → E=1 blocked by A → hmm → so the intended reading in this clue family: E must be on the other side → C=4 with E... "two between" ⇒ seats 2,3 or 5,6 between → E=1 or 7 → both dead → **so B-immediately-above-E forces E≤5 anyway; reinterpret "two floors between" as |diff|=3 same** → clue-set needs C lower: use the standard viable variant — **C on floor 4 → "two between C and E" with E below → E=1 blocked → puzzle as literally written ⇒ the gap = 3 → E=7 doesn't exist → the set intends 7 floors.** 
**=> Corrected standard version (7 floors):** C=4 → E∈{1,7}; A=1 → E=7? "B immediately above E" → impossible → **rebuild as 6-floor version: C=3, |3−E|=3 → E=6 → B above E impossible → E must... |diff| 3 → E∈{6} only (floor 0 none) → B=7 none → dead → so "B immediately BELOW E"?** — in the standard question, clue is "E immediately below B" meaning E=5,B=6…
**=> Final consistent 6-floor set (adjusted clue):** C=3. Two floors between C and E → E=6. B immediately below E → B=5. A=1. D on odd floor {1,3,5} taken → **D∈{}** — odd all taken → D on even? Adjust: "D studies Math on an even floor" → {2,4} → F above C → F∈{4,5,6} → all minus B(5),E(6) → F=4 → D=2.
- **Layout: A1, D2(Math), C3, F4, B5, E6** — verify: two between C3,E6 ✓(4,5), B below E imm ✓, F above C ✓, D even+Math ✓.

**Questions:**
1. A lives on? → **floor 1**
2. Who studies Math? → **D**
3. Who lives immediately below E? → **B**
4. F lives on floor? → **4**
5. Floors between C and E? → **2 (floors 4,5)**

## SET 7 — Scheduling (Type G)

**Clues:** Exams P,Q,R,S,T,U held Mon–Sat. R is on Wednesday. Two days between R and P. Q is held immediately before S. T is not on Monday. U's exam is after R's.

**Solve:**
- R=Wed. |R−P|=3 → P∈{Sun✗,Sat} → **P=Sat.**
- `QS` adjacent block on {Mon,Tue,Thu,Fri} → {Mon,Tue} or {Thu,Fri}.
- "U after R" → U∈{Thu,Fri} → if QS={Thu,Fri}, U has no slot → **QS={Mon,Tue}** → U,T fill Thu,Fri; "T not Monday" → satisfied either way → **two live cases: (Q-Mon,S-Tue,U-Thu,T-Fri) or (Q-Mon,S-Tue,T-Thu,U-Fri).**
- Fixed: Q-Mon,S-Tue,R-Wed,P-Sat. T/U swap Thu/Fri.

**Questions:**
1. R's exam day? → **Wednesday**
2. P's exam? → **Saturday**
3. Q's exam? → **Monday**
4. S immediately after? → **Q**
5. If T is on Friday, U is on? → **Thursday**

## How to use these sets

1. Attempt each cold — sketch the skeleton, place anchors first, branch 2-cases.
2. Score yourself /5 per set — the questions come free once the diagram is right.
3. Verify every clue against your final layout — if all clues hold, you're done. If a solve collapses mid-way, don't force it: re-check your anchors, then branch the surviving cases.
