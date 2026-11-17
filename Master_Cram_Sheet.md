# Master Cram Sheet — the daily glance paper

> One sheet to look at every morning. Tables → tricks → pattern→solution maps → GA stories.
> Add new lines here as we learn them; this file GROWS all 49 days.

---

# 1 · QUANT — speed tables (memorise to reflex)

## Fraction families — halve down, don't memorise each

| Family | Chain |
|---|---|
| **1/3** = 33.33% | → 1/6 = 16.66% → 1/12 = 8.33% → 1/24 = 4.17% |
| **1/4** = 25% | → 1/8 = 12.5% → 1/16 = 6.25% |
| **1/5** = 20% | → 1/10 = 10% → 1/20 = 5% |
| **1/7** = 14.28% | → 1/14 = 7.14% → 1/21 ≈ 4.76% |
| **1/9** = 11.11% | 1/11 = 9.09% ("9 gives 11, 11 gives 9") |
| Singles | 1/13 = 7.69% · 1/15 = 6.66% · 1/17 = 5.88% · 1/19 = 5.26% · 1/25 = 4% |

**Use:** `8.33% of 240 = 240 ÷ 12 = 20` — ugly % → nearest fraction → one division.

## Squares 1–30 (the reflex set)

11²=121 · 12²=144 · 13²=169 · 14²=196 · 15²=225 · 16²=256 · 17²=289 · 18²=324 · 19²=361 · 20²=400 · 21²=441 · 22²=484 · 23²=529 · 24²=576 · 25²=625 · 26²=676 · 27²=729 · 28²=784 · 29²=841 · 30²=900

**Ending-in-5 trick:** 75² → 7×8=56, glue 25 → **5625**. *(front × itself+1, then "25")*
**Near-100:** 97² → 100−3 → 94, glue 3² → **9409**.

## Cubes 1–15

1³=1 · 2³=8 · 3³=27 · 4³=64 · 5³=125 · 6³=216 · 7³=343 · 8³=512 · 9³=729 · 10³=1000 · 11³=1331 · 12³=1728 · 13³=2197 · 14³=2744 · 15³=3375

**Cube-root digit map:** answer's last digit ↔ cube's last digit: 1↔1 · 8↔2 · 2↔8 · 7↔3 · 3↔7 · 4↔4 · 5↔5 · 6↔6 · 9↔9 · 0↔0.

## Fast multiply

| × | Idea | Example |
|---|---|---|
| ×5 | ×10 then ÷2 | 48×5 = 480/2 = 240 |
| ×25 | ×100 then ÷4 | 36×25 = 3600/4 = 900 |
| ×125 | ×1000 then ÷8 | 64×125 = 8000 |
| ×11 | digits sandwich their sum | 43×11 = 4│7│3 = 473 |
| ×99 | ×100 minus the number | 47×99 = 4700−47 = 4653 |
| same-tens, units sum 10 | front jumps +1, backs multiply | 53×57 → 5×6=30, 3×7=21 → 3021 |

## % change — the two exam traps

- **Successive a% then b%** → net = `a + b + ab/100`. (20↑ + 30↑ = 56%, not 50)
- **+a% then −a% always loses** = −a²/100. (+20%→−20% = −4% — "up then down never lands home")
- **"A is x% more than B" → B is x/(100+x)% less than A.** (25% more → 20% less)

---

# 2 · QUANT — question types → the solving trick

| Type (~Qs) | The trick | Cap |
|---|---|---|
| **Approximation (~5)** | Round each number to friendly cousin (fraction/perfect square/×5) → compute → pick closest. √parks at nearest perfect square; ÷ rounds BOTH sides together | 35s |
| **Wrong no. series (4–5)** | Hunt in order: **gaps → ×k → ×k+c → squares±k → Fibonacci → interleaved**. One wrong term corrupts TWO gaps — culprit sits between them | 40s |
| **Quadratic (0–4)** | Sign poem: `−Sx +P` → both + · `+Sx +P` → both − · `±Sx −P` → one each (bigger takes middle sign). All-neg vs all-pos = instant answer. Overlapping ranges = **CND** | 45s |
| **Arithmetic (5–6)** | ONE formula each: P&L `MP→discount→SP vs CP` · SI/CI gap `P·r²/100²` · T&W in work-units · TSD `upstream+downstream` · mixture diagonal-cross | pick easy |
| **DI (~10)** | Build the table first. Clean line/table graph > caselet. No table in 3 min = skip | ~4/set |

**Exam attack order:** approximation → series → quadratic → easy arithmetic → DI.

---

# 3 · REASONING — patterns → the trap each

## Syllogism — step 1: translate the statement

| Paper writes | You read it as |
|---|---|
| Only A are B | **All B are A** (direction flips) |
| Only a few A are B | Some A are B **and** Some A are not B |
| At least some A are B | Some A are B |
| X can never be Y | "No X is Y" must be true |

## Syllogism — step 2: judge with the MUST test

| Conclusion type | Follows when… | Fails when… |
|---|---|---|
| Definite ("Some A are C") | MUST be true | only MAYBE true |
| Possibility ("…is a possibility") | not impossible | a "No" wall blocks it |
| Either-or pair | both fail alone + same two terms + one positive/one negative | either one already follows |

## Syllogism — step 3: the combo map (statements A–B and B–C)

| Two statements | Example | What follows | Why |
|---|---|---|---|
| All + All | All cats are dogs. All dogs are animals. | **All cats are animals** (+ Some cats are animals, Some animals are cats) | chain: cats inside dogs inside animals |
| Some + All | Some pens are books. All books are cheap. | **Some pens are cheap** (+ Some cheap are pens) | the overlap people ride inside books→cheap |
| All + No | All cats are dogs. No dog is a fish. | **No cat is a fish** (+ No fish is a cat, Some cats are not fish) | cats trapped in dogs, dogs walled off from fish |
| Some + No | Some bids are fake. No fake is valid. | **Some bids are not valid** | the fake-bids sit inside the walled zone |
| No + All | No cat is a dog. All dogs are animals. | **Some animals are not cats** | the dog-animals can never be cats |
| All + Some | All cats are pets. Some pets are birds. | nothing definite | the pet-birds may be the non-cat pets |
| Some + Some | Some pens are books. Some books are desks. | nothing definite | two floating overlaps — may never meet (R1) |
| No + No | No cat is a dog. No dog is a fish. | nothing definite | cats and fish both dodge dogs — nothing between THEM (R2) |
| No + Some | No cat is a dog. Some dogs are pets. | nothing definite | cats vs pets = unknown |
| All + Some-not | All pens are books. Some books are not desks. | nothing definite | pens may land in the desk-free part or not |
| Some + Some-not | Some pens are books. Some books are not desks. | nothing definite | the "not" part floats free |

## Syllogism — step 4: free flips (automatic conclusions)

| Given | Also true? | Verdict |
|---|---|---|
| All A are B | Some B are A | YES — always |
| Some A are B | Some B are A | YES — flips free |
| No A is B | No B is A | YES — flips free |
| All A are B | All B are A | NO — the #1 trap |

## Puzzle types → the ONE trap

| Type | Skeleton | THE trap |
|---|---|---|
| A · Linear/Double-row | numbered seats; double-row = mirrored | **South-facing left = YOUR right** — draw arrows first |
| B · Month+variable | table, one row per month | boundary months kill cases — "2 after May" impossible |
| C · Box stack | position 1→top | **"somewhere above" = order only · "immediately above" = glued** |
| D · Height/rank | one `A > B > C` chain, weld at shared names | "Q between T and R" = BOTH directions until a clue fixes it |
| E · Circular | fix one anchor — no ends | facing centre: person's left = YOUR clockwise; mixed facing = last |
| F · Floor | numbered floors, 8=top | same "somewhere vs immediately" trap as boxes |
| G · Scheduling | day table | "2 days between" → \|diff\| = 3, not 2 |

**Universal method:** anchor clue → "between" clues branch cases → glued pairs need adjacent cells → negative clues last → answer only what survives ALL cases.

## Singles (cheap marks, do first)

- **Alphanumeric/word series** — 20s each, bank them
- **Blood relations** — draw ♂/□, ♀/○; "only son/daughter" = sole sibling
- **Direction-ranking** — one chain, same as Type D
- **Inequality / Data sufficiency** — small drills

---

# 4 · ENGLISH — the 25 golden rules (compressed)

**Agreement:**
1. Verb follows the SUBJECT — cross out `of/along with` middles *(the list of items IS)*
2. each / every / one of / either / neither → **singular**
3. **A** number of = plural · **THE** number of = singular
4. along with / as well as / together with → verb follows FIRST subject only
5. team / jury / committee / board → singular

**Nouns:**
6. Uncountables never take s: furniture, information, advice, luggage, news
7. Always plural: scissors, trousers, premises, police, cattle, people
8. "The + adjective" = plural group (the poor = poor people)

**Tense:**
9. **since** = starting point · **for** = length — both take *has/have worked*
10. yesterday / ago / last week / in 2020 → **simple past only, kill "has"**
11. Two past actions → earlier one wears **had** · pairs: *No sooner…than · Hardly/Scarcely…when*

**Structure:**
12. Parallel list = same uniform (reading, writing, swimming)
13. Correlative pairs: either→or · neither→nor · not only→but also (verb follows NEARER subject)
14. "an" goes by SOUND not letter (a university · an MBA · an hour)

**Comparison:**
15. than needs ONE comparative — never "more faster"
16. senior/junior/superior/inferior/prefer → **to**, not than

**Prepositions:**
17. Married pairs: differ-from · comply-with · consist-of · insist-on · depend-on · good-at · interested-in · capable-of · accused-of · suffer-from · married-to · listen-to · look forward to + **V-ing**
18. Verbs with built-in preposition — add nothing: discuss(about✗) · enter(into✗) · reach(at✗) · comprise(of✗) · order(for✗)

**Connectors:**
19. **Unless = if-NOT** — never add another negative
20. One bridge per gap: although…yet✗ · because…so✗ · since…therefore✗

**Pronouns/modifiers:**
21. After preposition → object form (between you and **me**, to **whom**)
22. Dangling modifier — doer stands right after the comma
23. everyone/each/someone → singular pronoun

**Traps:**
24. Redundancy dirty dozen: return back · repeat again · revert back · free gift · past history · true fact · advance planning · both alike
25. Linking verbs take adjectives (he feels **bad**, not badly)

---

# 5 · DBMS (Day-1) — question types → solution method

| Type | Method | Trap |
|---|---|---|
| **Candidate key via closure** | Attributes never on any FD's right side → must be IN the key. Grow (X)⁺ until all attributes; drop members one by one → minimal = candidate | `{A,B}` candidate ⇒ `{A,B,C}` = super key NOT candidate |
| **"Which NF?"** | cells → halves → chains → arrow-left-is-key. First rung that BREAKS is the answer | single-col key can't break 2NF (no halves exist); all-prime table = 3NF not BCNF (RHS-prime escape) |
| **Prime attributes** | find ALL candidate keys → every attribute inside any key | a non-key column can still be prime if it's in some other key |
| **Key vocab** | degree = columns, cardinality = rows · primary = chosen candidate · alternate = the non-chosen candidates | exam swaps degree/cardinality |
| **Anomalies** | insertion = nowhere to write a new fact · deletion = fact dies with last row · update = fix N rows, miss one | name the anomaly by WHO suffers |
| **Dependency type** | partial = non-key on HALF a composite key (2NF) · transitive = non-key→non-key chain (3NF) · trivial = Y ⊂ X | halves vs middleman — different diseases |
| **Integrity** | PK never NULL (entity integrity) · FK may be NULL but must point at a real unique key · ON DELETE CASCADE kills children / SET NULL orphans them / RESTRICT blocks | FK doesn't need to be unique itself |
| **Decomposition** | each FD gets its own table (left side = key) + one table keeps the original composite key | BCNF can lose dependency preservation — 3NF keeps it |
| **FD inference** | Armstrong: X→Y & Y→Z ⇒ X→Z (transitivity); X→Y ⇒ XZ→YZ (augmentation); X→YZ ⇒ X→Y & X→Z (decomposition) | reverse transitivity does NOT hold |

**NF memory:** `3NF lets arrows land on family; BCNF makes arrows start at family.`

---

# 6 · GA — story threads (revise the chain, not facts)

- **Settlement lifecycle:** consultation → Board #3 (Sep 24) → notified Oct 6 (new body **RRT**) → **in force Nov 7** → first case: Eight Innovate Fund II (Nov 11). Formula: `Base × (S+R+G+A−M) + Legal Costs`. Post-SCN window 60→**90 days**.
- **Rate cycle:** MPC 61 (Jun) hold 5.25% → Jul 16 hold → MPC 62 (Aug) hold → **MPC 63 (Oct 5–7): +25bps → 5.50%**, first hike since Feb 2023, stance **calibrated tightening**, CRR daily-avg 90→99%.
- **Finfluencer crackdown:** 62% investors influenced by finfluencers → **Project SUDARSAN** (SupTech scanner) + **SEBI Check** + **@valid UPI handles** (mandatory Oct 1) + Play verified-app label → **Niveshak Shivir** Nov 17 Delhi.
- **Paytm PB saga:** licence cancelled Apr 24 (Sec 22(4) BR Act) → Delhi HC winding up Jul 8 → liquidator **Girikumar M Nair** Jul 28.
- **AIF arc:** Jun 16 winding-up rules + "Inoperative Fund" status → Jul 30 **GARUDA** fast-track → Sep 24 investor-protection extended to all AIFs.
- **PMS 2026:** consult Jul 23 → approved Sep 24 → PMS can buy IPOs/primary debt; discretionary ≤**10% AUM** in unlisted IG NCDs.
- **MF plumbing:** intraday borrowing (Jul 10) · SWP/STP to demat (Jul 17) · **NDCF for InvITs** (Aug 14) · DRs on REIT/InvIT (Nov 2) · net-settlement (Nov 5).

*(Append new threads each week — this section grows as GA logs grow.)*

---

# 7 · HOW TO USE THIS SHEET (daily 5 min)

1. Morning glance: fraction families + squares + cubes row (60s)
2. One combo read: syllogism map + puzzle traps
3. One rule block: English (5 rules/day — covers all 25 in a week)
4. One thread: GA story read as a narrative
5. Before drills: re-read the question-type→trick row you're drilling today
