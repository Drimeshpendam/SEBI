# Quantitative Aptitude — Learn the Tricks (Understand + Remember version)

> Phase 1 Paper 1 Quant = **20 questions**. Good attempt: 15–16.
> **Real exam split (2024 + Jan-2026):** DI ~10 Qs (line graph + caselet + table) · Wrong-number series 4–5 · Approximation 5 · Quadratic-compare 0–4 · Arithmetic 5–6.
>
> **Every trick below: WHY it works → REMEMBER hook → example. Understand once, remember forever.**

---

# PART 0 — SPEED FOUNDATION (memorise until reflex)

## The fraction table — learn it as FAMILIES, not 20 numbers
- WHY: Every fraction in a family is half of the one before it. Memorise the parent's % and halve your way down.
- **1/3 family:** 1/3 = 33.33% → 1/6 = 16.66% (half) → 1/12 = 8.33% (half) → 1/24 = 4.17%
- **1/4 family:** 1/4 = 25% → 1/8 = 12.5% → 1/16 = 6.25%
- **1/5 family:** 1/5 = 20% → 1/10 = 10% → 1/20 = 5%
- **1/7 family:** 1/7 = 14.28% → 1/14 = 7.14% (→1/21 ≈ 4.76%)
- **1/9 family:** 1/9 = 11.11% → 1/11 = 9.09% (close cousin — remember "9 gives 11", "11 gives 9")
- Remaining singles: 1/13 = 7.69% · 1/15 = 6.66% · 1/17 = 5.88% · 1/19 = 5.26% · 1/25 = 4%
- REMEMBER: **"Halve the family, halve the percent."** Only ~6 parents to memorise.
- USAGE: 8.33% of 240 = 240÷12 = **20**. Any ugly % → nearest fraction → single division.

## Squares/cubes — the only numbers worth memorising
- Squares 1–30, cubes 1–15. Drill daily until they're reflex, like tables.
- Squaring near-100: 97² — WHY: (100−3)² = 100² − 2·100·3 + 3². In practice: **97 is 3 below 100 → subtract 3 → 94, then square the 3 → 09 → 9409.** (103² → add 3 → 106, +09 → 10609.)
- Numbers ending in 5: 75² = 7×8=56, stick 25 → **5625**. WHY: (10a+5)² = 100a(a+1)+25 — the "25" is free, just do a×(a+1).
- REMEMBER: **"5 at the end → multiply the front by itself-plus-one, glue a 25."**
- Cube-root reverse: last digit of the answer ↔ last digit of the cube (1↔1, 8↔2, 2↔8, 7↔3, 3↔7, 4↔4, 5↔5, 6↔6, 9↔9, 0↔0). WHY: each digit cubes to a unique last digit — the mapping is a lookup, not a computation.

## Fast multiply — each has one idea behind it
- **×5:** 5 is half of 10 → ×10 then ÷2. 48×5 = 480/2 = **240**. REMEMBER: *"add a zero, cut in half."*
- **×25:** 25 is a quarter of 100 → ×100 then ÷4. 36×25 = 3600/4 = **900**. REMEMBER: *"two zeros, quarter it."*
- **×125:** 125 is an eighth of 1000 → ×1000 then ÷8. 64×125 = 64000/8 = **8000**.
- **×11:** WHY it works — 11 = 10+1, so a×11 = a×10 + a → digits sandwich their sum. 43×11 = 4 | (4+3) | 3 = **473**. Middle ≥10 carries: 79×11 = 7|16|9 = **869**.
- **×99/×999:** WHY — 99 = 100−1 → overpay by 100 then refund the number. 47×99 = 4700−47 = **4653**.
- **Same-tens pair (units sum to 10):** 53×57 → tens 5, units 3+7=10 → front 5×6=30, back 3×7=21 → **3021**. WHY: (50+3)(50+7) = 50·50 + 50·(3+7) + 21 = 50·60+21. REMEMBER: *"front jumps to next ten, backs multiply."*

## % change — the two traps SEBI loves
- **Successive a% then b%** → net = a + b + ab/100. WHY: the second % acts on the NEW bigger/smaller amount, not the original — the ab/100 term is that overlap.
  - 20%↑ then 30%↑ → 20+30+6 = **56%** (not 50%).
- **+a% then −a% always LOSES** = −a²/100. WHY: the discount applies to the inflated amount, so you fall below start. +20%→−20% = −4%. REMEMBER: *"Up then down never lands back home."*
- **"A is x% MORE than B" → B is x/(100+x)% LESS than A.** WHY: the base flipped — same gap measured against a bigger number. A is 25% more → B is 25/125 = **20%** less. REMEMBER: *"Percentages are relative to WHOSE size you're measuring."* (Exam trap of the decade.)

---

# PART 1 — THE QUESTION TYPES (format + trick + worked example)

## TYPE 1 — Approximation (5 Qs — free marks, bank all of them)
**Format:** `89.9% of 460 + 13.2 × 8.9 ≈ ?` — options far apart on purpose.
**WHY the trick works:** the paper WANTS you to round — spaced-out options mean precision is wasted effort.
**Method:** round each number to a friendly cousin (table-fraction, perfect square, multiple of 5) → compute → pick closest.
**Example:** 15.9% of 299.8 + √168.7 × 2.9 ≈ 16% of 300 + 13×3 = 50+39 = **89**.
**Cap:** 35 sec/question. This is where marks-per-second is highest.

## TYPE 2 — Wrong Number Series (4–5 Qs every year)
**Format:** one term breaks the pattern — find it.
**The hunt order — check patterns in this sequence (covers ~95%):**
1. **Gaps:** write differences above. Constant? Growing by fixed steps? (Most common.)
2. **×k:** each term ≈ k× previous (×2, ×3, ×1.5).
3. **×k+c:** ×2+1, ×2+2, ×2+3… — SEBI's favourite.
4. **Squares/cubes ± k:** n²+1, n³−2.
5. **Sum of previous:** each = sum of last two (Fibonacci-type).
6. **Two interleaved series:** odd positions one rule, even another.

**WHY this order:** patterns are ordered by frequency in real bank/SEBI papers — checking in this order finds the rule fastest on average.
**Example:** `7, 12, 22, 38, 57, 82` → gaps 5,10,**16**,20,25 — expected 15 → **38 is wrong** (should be 37).
**REMEMBER: "Gaps first, multiply second, square third."** If none works, interleave or second-difference.

## TYPE 3 — Quadratic Compare (4 Qs in 2024)
**Format:** `I. x²−7x+12=0   II. y²−9y+20=0` → compare x and y.
**WHY the shortcut works:** in `x² − Sx + P`, the roots are two numbers that ADD to S and MULTIPLY to P — factoring is just un-wrapping that pair.
**Sign decoder (learn as a poem):**
- `−Sx +P` → **both roots positive** ("minus middle, positive pair")
- `+Sx +P` → **both roots negative**
- `±Sx −P` → **one + one −** (bigger root takes the middle sign)
**Example:** I: roots 3,4 (3+4=7, 3×4=12). II: roots 4,5. Every x ≤ every y → **x ≤ y**. If ranges overlap (x∈{3,6}, y∈{4,5}) → **no relation/CND** — don't force it.
**Cap:** 45 sec. Factoring drill: 10 pairs/day ("two numbers: sum 7, product 12 → 3,4").

## TYPE 4 — Data Interpretation (~10 Qs = HALF the section)
**Formats:** line graph, table, caselet (paragraph of numbers → YOU build the table), pie/bar occasionally.
**Universal method:**
1. **Units first** — lakh vs thousand, % vs absolute, per-month vs cumulative. This is where most marks actually die.
2. Read questions → they tell you which 4–5 numbers matter; ignore the rest.
3. Any % → fraction table. "X exceeded Y by what %" = (X−Y)/**Y** ×100 — the classic trap is dividing by X. REMEMBER: **"Compare against what it was, not what it became."**
4. Ratios → cancel before multiplying.
5. Caselet → write the mini-table while reading, never in your head.
**Cap:** 4 min per 5-Q set. Do DI last — a stubborn caselet eats the section.

## TYPE 5 — Arithmetic (5–6 Qs, one per classic topic)

### Profit & Loss — THE spine: `MP −discount→ SP →vs CP = profit`
- WHY everything hangs on CP: **profit% is measured against what you PAID** — CP is always the base.
- Successive discounts d₁,d₂ → effective = d₁+d₂−d₁d₂/100. WHY same overlap idea as % change — second discount hits the already-reduced price.
- "Marked x% above CP, sold at d% off" → profit% = **x−d−xd/100**. (Mark-up then mark-down = the +x,−d overlap formula.)
- Dishonest dealer (sells "at cost" with 900g weights for 1kg): profit% = shortfall/given ×100 = 100/900 = **11.11%**. WHY: he profits on what he DOESN'T give, measured against what he gives.
- Same SP, one at +p%, one at −p% → **always a net loss** = p²/100. WHY: the loss is computed on a bigger CP than the gain.

### SI & CI
- SI = PRT/100 — interest is a flat % of P per year.
- CI = P(1+R/100)ᵀ − P.
- **The golden gap trick:** CI−SI over 2 years = P(R/100)². WHY: CI's extra over SI is just interest-on-first-year's-interest = (PR/100)·(R/100). REMEMBER: *"The gap is interest on the interest."* Given CI−SI and R → solve P in one line.
- SI: doubles in T yrs → triples in 2T (interest is linear — each T adds one P).

### Time & Work — think in WORK UNITS, not fractions
- WHY LCM: A in 12d does 1/12 per day, B in 15d does 1/15 — ugly fractions. Define total work = LCM(12,15)=60 units → A does 5u/day, B does 4u/day → together 9u/day → 60/9 = 6⅔ days. REMEMBER: **"Convert days into units — like converting currencies before adding."**
- M₁D₁H₁ = M₂D₂H₂ (men×days×hours are interchangeable for same work).
- Pipes: inlet +, outlet −, net rate = sum.

### Speed & Distance
- Equal-distance average speed = 2ab/(a+b), NOT (a+b)/2. WHY: you spend more TIME at the slower speed, so the average leans low. REMEMBER: *"average speed is always less than the halfway point."*
- **Trains — the one idea: "a pole is a dot."** Crossing a pole → distance = train length only. Crossing a platform → train + platform (the platform also must pass). Two trains opposite → speeds ADD (they approach each other); same direction → SUBTRACT.
- **Boats — "downstream the river helps, upstream it fights":** down = b+s, up = b−s → **boat speed = (down+up)/2, stream = (down−up)/2** — just average and half-difference.
- km/h ↔ m/s: ×18/5 down, ×5/18 up — pure reflex needed in train problems.

### Mixture & Alligation — the diagonal cross
- WHY it works: quantities balance around the mean like a seesaw — the farther a price is from the mean, the LESS of it you need.
```
   dearer d        cheaper c
        \          /
          mean m
        /          \
 qty(d) : qty(c)  =  (m−c) : (d−m)     ← differences on the diagonal, FLIPPED
```
- Example: ₹40 and ₹60 rice → ₹52 mix: (60−52):(52−40) = 8:12 = **2:3** (the ₹40 rice gets the ₹60-side difference — cross is the point).
- Replacement problems: replace fraction f, n times → remaining = V(1−f)ⁿ.

### Percentage / Ratio / Averages / Ages / Partnership / Mensuration
- Income–expenditure–savings: sav = inc − exp; % questions chain through ratios.
- Bridging ratios: A:B = 2:3 and B:C = 4:5 → make B equal (LCM 12): A:B:C = 8:12:15. REMEMBER: *"the shared term wears the same number in both ratios."*
- Averages: SUM = avg×n — "one person joins/leaves" problems track the total's change, not the person's.
- Ages: write the equation in ONE time frame; "k years ago" shifts every age by k.
- Partnership: profit split ∝ capital × months.
- Mensuration (formula-only, 1–2 Qs): rectangle ab, triangle ½bh, circle πr²/2πr, cuboid lbh, cylinder πr²h, cone ⅓πr²h, sphere 4/3πr³. Path/fencing/painting cost → perimeter or area × rate.

---

# PART 2 — EXAM-DAY GAME PLAN

**Order:** approximation (3 min) → series (4) → arithmetic easy-picks (4) → DI last (4 per set, pick the clean table/line graph over the caselet).
**Hard cap: ~15 min.** Any DI set with no table forming in 3 min = skip.

**Daily drill:**
- 10 min — fraction families + squares/cubes from memory (reflex, not recall).
- 10 series + 10 approximation, ≤40 sec each.
- 5 arithmetic rotating topics (P&L → SI/CI → T&W → TSD → mixture).
- 1 DI set twice a week.
- Error log: name WHICH trick failed — "didn't recall 1/16", "checked gaps but not ×k+c" — that's your fix-list.
