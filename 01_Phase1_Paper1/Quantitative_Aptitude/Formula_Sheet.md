# Quantitative Aptitude — Learn the Tricks (Understand + Remember version)

> Phase 1 Paper 1 Quant = **20 questions**. Good attempt: 15–16.
> **Real exam split (2024 + Jan-2026):** DI ~10 Qs (line graph + caselet + table) · Wrong-number series 4–5 · Approximation 5 · Quadratic-compare 0–4 · Arithmetic 5–6.
>
> **Every trick below: WHY it works → REMEMBER hook → worked examples covering each pattern the exam actually uses.**

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

# PART 1 — THE QUESTION TYPES (format + patterns + worked examples)

## TYPE 1 — Approximation (5 Qs — free marks, bank all of them)
**Format:** `89.9% of 460 + 13.2 × 8.9 ≈ ?` — options far apart on purpose.
**WHY the trick works:** the paper WANTS you to round — spaced-out options mean precision is wasted effort.
**Patterns asked:** (a) % of a number + product, (b) ÷ with decimals, (c) √ or cube inside, (d) chained +−×.
**Method:** round each number to a friendly cousin (table-fraction, perfect square, multiple of 5) → compute → pick closest.

**WORKED EXAMPLES:**
1. `15.9% of 299.8 + √168.7 × 2.9` ≈ 16% of 300 + 13×3 = 48+39 = **87** → √168.7 ≈ √169 = 13. *Rule: park roots at nearest perfect square first.*
2. `449.8 ÷ 14.95 + 12.1 × 7.9` ≈ 450÷15 + 12×8 = 30+96 = **126**. *Rule: division rounds BOTH sides together — 450÷15 is clean.*
3. `79.9% of 599.5 − 24.9% of 239.8` ≈ 80% of 600 − 25% of 240 = 480−60 = **420**. *Rule: each % maps to its fraction family (80%=4/5, 25%=1/4).*
4. `(17.9)² + (12.1)² − 219.8` ≈ 18² + 12² − 220 = 324+144−220 = **248**. *Rule: squares round to nearest integer you know cold.*

**Cap:** 35 sec/question — highest marks-per-second in the section.

## TYPE 2 — Wrong Number Series (4–5 Qs every year)
**Format:** one term breaks the pattern — find it.
**The hunt order — check patterns in this sequence (covers ~95%):**
1. **Gaps:** differences constant or growing by fixed steps (most common).
2. **×k:** each term ≈ k× previous (×2, ×3, ×1.5).
3. **×k+c:** ×2+1, ×2+2, ×2+3… — SEBI's favourite.
4. **Squares/cubes ± k:** n²+1, n³−2.
5. **Sum of previous:** each = sum of last two (Fibonacci-type).
6. **Two interleaved series:** odd positions one rule, even another.

**WHY this order:** patterns ranked by frequency in real papers — checking in this order finds the rule fastest on average.

**WORKED EXAMPLES — one per pattern:**
1. **Gaps:** `7, 12, 22, 38, 57, 82` → gaps 5,10,**16**,20,25 — expected 15 → **38 is wrong** (should be 37). *Rule: write the gaps; one wrong term corrupts TWO gaps — the term between the two bad gaps is the culprit.*
2. **×k:** `5, 15, 45, 135, 415, 1215` → all ×3; 135×3 = 405 ≠ 415 → **415 wrong**.
3. **×k+c:** `3, 8, 18, 38, 78, 160` → ×2+2 each; 78×2+2 = 158 ≠ 160 → **160 wrong**. *Rule: SEBI's favourite — check this right after gaps.*
4. **Squares ±k:** `5, 10, 17, 26, 37, 49` → n²+1 (2²+1=5 … 7²+1=50) → **49 wrong** (should be 50). *Spot: terms hug famous squares.*
5. **Fibonacci:** `4, 6, 10, 16, 26, 44` → each = sum of previous two; 16+26 = 42 ≠ 44 → **44 wrong**.
6. **Interleaved:** `2, 5, 4, 10, 6, 15, 10, 20` → odd positions ×2 (2,4,6→8?) — actually odd: 2,4,6,10 should be 8 → **10 wrong**. *Rule: if no single rule fits, split odd/even positions.*

**REMEMBER: "Gaps first, multiply second, square third."** If none works, interleave or second-difference.

## TYPE 3 — Quadratic Compare (0–4 Qs)
**Format:** `I. x²−7x+12=0   II. y²−9y+20=0` → compare x and y.
**WHY the shortcut works:** in `x² − Sx + P`, roots ADD to S, MULTIPLY to P — factoring is just un-wrapping that pair.
**Sign decoder (learn as a poem):**
- `−Sx +P` → **both roots positive** ("minus middle, positive pair")
- `+Sx +P` → **both roots negative**
- `±Sx −P` → **one + one −** (bigger root takes the middle sign)

**WORKED EXAMPLES — all four answer outcomes:**
1. **x < y:** I: x²−7x+12=0 → 3,4. II: y²−9y+20=0 → 4,5 → every x ≤ y, and x=4=y → **x ≤ y**. *Trap: equal counts — it's ≤, not <.*
2. **x > y:** I: x²−11x+30=0 → 5,6. II: y²−5y+6=0 → 2,3 → **x > y**.
3. **No relation (CND):** I: x²−9x+18=0 → 3,6. II: y²−9y+20=0 → 4,5 → y sits INSIDE x's range → **CND**. *Rule: overlapping ranges = cannot determine, always.*
4. **Sign trick instant-kill:** I: x²+8x+15=0 → both negative (−3,−5). II: y²−8y+15=0 → both positive (3,5) → **x < y without factoring fully**. *Rule: all-negative vs all-positive answers itself.*

**Cap:** 45 sec. Daily drill: 10 factor-pairs ("sum 7, product 12 → 3,4").

## TYPE 4 — Data Interpretation (~10 Qs = HALF the section)
**Formats actually asked:** (a) line graph (two companies over years — most frequent), (b) caselet (paragraph → YOU build the table), (c) table, (d) pie/bar occasionally.
**Universal method:**
1. **Units first** — lakh vs thousand, % vs absolute, per-month vs cumulative. Most marks die here.
2. Read questions → they tell you which 4–5 numbers matter; ignore the rest.
3. Any % → fraction table. "X exceeded Y by what %" = (X−Y)/**Y** ×100 — the classic trap is dividing by X. REMEMBER: **"Compare against what it was, not what it became."**
4. Ratios → cancel before multiplying.
5. Caselet → write the mini-table while reading, never in your head.

**WORKED EXAMPLES — one per sub-format:**

**Ex 1 — Table Q (the "which base" trap):**
Table: Company A sold 840 units, B sold 1050, C sold 630. *Q: A sold what % less than B?*
Base = B (the thing after "than"): (1050−840)/1050 = 210/1050 = 1/5 = **20%**. *Trap: dividing by A gives 25% — the wrong answer sitting in the options. Identify the base BEFORE computing.*

**Ex 2 — Line graph (% increase YoY):**
Sales: 2023: 420, 2024: 504, 2025: 630. *Q: biggest % jump year?*
2024: 84/420 = 20%. 2025: 126/504 = 25% (=1/4 — fraction table!). **2025**. *Rule: don't compute decimals — 84/420 cancels to 1/5 instantly.*

**Ex 3 — Caselet (the marks-eater — build the table):**
*"A school has 1200 students. 60% are boys. 40% of boys play cricket; 30% of girls play cricket; rest play chess."*
Build: Boys 720 (cricket 288, chess 432) · Girls 480 (cricket 144, chess 336).
Now ANY question = lookup: total cricketers 432, chess 768, boys-in-chess as % of girls-in-cricket = 432/144 = **300%**. *Rule: caselet = 60 sec building the table, then every question is free.*

**Ex 4 — Pie chart (% of total):**
Expenses pie: Rent 25%, Food 30%, Travel 15%, Misc 30%. Total ₹40,000. *Q: Food+Travel spent?*
45% of 40,000 = 45/100 × 40000 — use fraction: 40,000 × 0.45 = **₹18,000**. *Rule: add pie-% first, THEN multiply once — never two multiplications.*

**Cap:** 4 min per 5-Q set. Do DI last — a stubborn caselet eats the section.

## TYPE 5 — Arithmetic (5–6 Qs, one per classic topic)

### Profit & Loss — THE spine: `MP −discount→ SP →vs CP = profit`
**Patterns usually asked:** (a) find CP or SP given profit%, (b) marked above + sold at discount, (c) successive discounts, (d) dishonest dealer / false weights, (e) same SP, +p% and −p% → net loss.
- WHY everything hangs on CP: **profit% is measured against what you PAID** — CP is always the base.
- Successive discounts d₁,d₂ → effective = d₁+d₂−d₁d₂/100 (same overlap idea as % change).
- "Marked x% above CP, sold at d% off" → profit% = **x−d−xd/100**.
- Dishonest dealer (sells "at cost" but gives 900g for 1kg): profit% = shortfall/given ×100 = 100/900 = **11.11%**. WHY: he profits on what he DOESN'T give, measured against what he gives.
- Same SP, one at +p%, one at −p% → **always net loss** = p²/100.

**WORKED EXAMPLES:**
1. *SP ₹540 at 20% profit → CP?* CP = 540/1.2 = **₹450**. *Rule: divide by (1+p/100) — never take 20% of SP.*
2. *MP marked 40% above CP, sold at 20% discount → profit%?* 40−20−(40×20)/100 = 40−20−8 = **12%**.
3. *Two discounts 10% then 20% — better than single 30%?* Effective = 10+20−2 = **28%** — the single 30% is CHEAPER for the buyer. *Rule: successive discounts always shrink — the overlap term saves the seller.*
4. *Two items each sold ₹990 — one +10%, one −10% → net?* Loss = 10²/100 = **1% → ₹20 loss** (CPs were 900 + 1100 = 2000; sold 1980).
5. *Trader uses 800g weight for 1kg, sells "at cost" → profit%?* 200/800 = **25%**. *Trap: denominator is what he GIVES, not what he claims.*

### SI & CI
**Patterns asked:** (a) direct SI/CI compute, (b) CI−SI gap → find P, (c) amount doubling/tripling time, (d) CI when compounding half-yearly (R halves, T doubles).
- SI = PRT/100; CI = P(1+R/100)ᵀ − P.
- **CI−SI over 2 yrs = P(R/100)²** — "the gap is interest on the interest."
- Half-yearly: rate ÷2, time ×2.

**WORKED EXAMPLES:**
1. *SI on ₹8,000 at 6% for 3 yrs?* 8000×6×3/100 = **₹1,440**.
2. *CI−SI for 2 yrs at 10% = ₹200 → P?* 200 = P(0.1)² = P/100 → **P = ₹20,000**. *Rule: the gap formula solves P in one line.*
3. *SI doubles in 8 yrs → triples in?* **16 yrs** (interest is linear — each 8 yrs adds one P).
4. *₹10,000 at 20% p.a. compounded half-yearly for 1 yr → CI?* Rate 10%/half-yr, 2 periods: 10000×1.1² = 12,100 → CI = **₹2,100**. *Rule: half-yearly = the sneaky version — always convert BOTH R and T.*

### Time & Work — think in WORK UNITS, not fractions
**Patterns asked:** (a) A+B together, (b) A leaves midway, (c) M₁D₁H₁ chains, (d) pipes with inlet+outlet.
- WHY LCM: convert days → units. A in 12d, B in 15d → work = LCM(12,15) = 60 units; A = 5u/d, B = 4u/d.
- Pipes: inlet +, outlet −, net rate = sum.

**WORKED EXAMPLES:**
1. *A in 12d, B in 15d — together?* 60u; A=5, B=4 → 9u/d → **6⅔ days**.
2. *A in 10d, B in 15d; both work 4d, then A leaves → B alone?* Work = 30u; A=3, B=2. 4 days together = 20u done, 10u left → B takes 10/2 = **5 more days**. *Pattern: "leaves midway" = split the work into two phases.*
3. *6 men in 12 days → 8 men?* 6×12 = 8×D → **9 days** (MDH inverse — more men, fewer days).
4. *Pipe A fills in 6h, B empties in 10h → tank fills?* In 30 units: A=+5/h, B=−3/h → net +2/h → **15 hours**. *Trap: outlet goes NEGATIVE — forgetting the sign is the #1 pipes error.*

### Speed & Distance
**Patterns asked:** (a) average speed equal distances, (b) train crossing pole vs platform, (c) two trains opposite/same direction, (d) boat up/downstream.
- Equal-distance avg speed = 2ab/(a+b) — harmonic, leans LOW (more time at slow speed).
- **"A pole is a dot"**: pole → distance = train length; platform → train + platform.
- Opposite direction → speeds ADD; same direction → SUBTRACT.
- Boat = (down+up)/2; stream = (down−up)/2.
- km/h ↔ m/s: ×5/18 to convert TO m/s; ×18/5 back.

**WORKED EXAMPLES:**
1. *60 km/h out, 40 km/h back → avg speed?* 2×60×40/100 = **48 km/h** — NOT 50. *Rule: avg < midpoint, always.*
2. *Train 240m crosses a pole in 8s → speed?* 240/8 = 30 m/s × 18/5 = **108 km/h**.
3. *Same train (108 km/h, 240m) crosses 320m platform → time?* Distance = 240+320 = 560m; 560/30 = **18.67 s**. *Rule: platform problems add BOTH lengths.*
4. *Boat: down 18 km/h, up 12 km/h → boat & stream?* Boat = (18+12)/2 = **15 km/h**; stream = (18−12)/2 = **3 km/h**.

### Mixture & Alligation — the diagonal cross
**Patterns asked:** (a) mix two priced items to hit a mean price, (b) milk-water ratio via alligation, (c) repeated replacement (V(1−f)ⁿ).
```
   dearer d        cheaper c
        \          /
          mean m
        /          \
 qty(d) : qty(c)  =  (m−c) : (d−m)     ← differences on the diagonal, FLIPPED
```

**WORKED EXAMPLES:**
1. *₹40 & ₹60 rice → ₹52 mix, ratio?* (60−52):(52−40) = 8:12 = **2:3** — ₹40 rice gets the ₹60-side difference (cross is the point).
2. *Free water + milk ₹48/L → ₹40 mix, water:milk?* Water costs 0: (48−40):(40−0) = 8:40 = **1:5** water:milk. *Rule: free ingredient = price 0 — alligation handles it the same.*
3. *20L milk; 4L removed & replaced by water, twice → milk left?* 20×(1−4/20)² = 20×(0.8)² = **12.8 L**. *Rule: V(1−f)ⁿ — f is the FRACTION removed each round.*

### Percentage / Ratio / Averages / Ages / Partnership / Mensuration
**Patterns asked:** (a) bridging ratios, (b) join/leave average shifts, (c) age equations in one timeframe, (d) partnership capital×months, (e) formula-only mensuration.

**WORKED EXAMPLES:**
1. *A:B = 2:3, B:C = 4:5 → A:B:C?* Equalize B → A:B:C = 8:12:15. *Rule: shared term wears same number in both ratios.*
2. *Avg age of 10 players = 25; a 40-yr-old leaves and a newcomer joins → new avg = 24. Newcomer's age?* Old total = 250; after leaver = 210; new total = 10×24 = 240 → newcomer = 240−210 = **30**. *Rule: track the SUM through each step, not the person.*
3. *Father : son = 7:3 now; after 10 yrs ratio 9:5 → father's age?* 7x+10 : 3x+10 = 9:5 → 35x+50 = 27x+90 → 8x = 40 → x=5 → father = **35**.
4. *A puts ₹8,000 for 12m, B ₹12,000 for 6m → profit ₹7,700, A's share?* Capitals×months: 96:72 = 4:3 → A = 7700×4/7 = **₹4,400**.
5. *Path 2m wide around 12×8m garden → path area?* Outer = 16×12 = 192; garden = 96 → path = **96 m²**. *Rule: path area = outer − inner; extend BOTH sides by twice the width.*

---

# PART 2 — EXAM-DAY GAME PLAN

**Order:** approximation (3 min) → series (4) → arithmetic easy-picks (4) → DI last (4 per set, pick the clean table/line graph over the caselet).
**Hard cap: ~15 min.** Any DI set with no table forming in 3 min = skip.

**Daily drill:**
- 10 min — fraction families + squares/cubes from memory (reflex, not recall).
- 10 series + 10 approximation, ≤40 sec each.
- 5 arithmetic rotating topics (P&L → SI/CI → T&W → TSD → mixture).
- 1 DI set twice a week.
- Error log: name WHICH trick failed — "didn't recall 1/16", "checked gaps but not ×k+c", "forgot the outlet goes negative" — that's your fix-list.

---

# APPENDIX — PATTERN FREQUENCY CHEAT SHEET (what SEBI actually asks)

| Type | Qs | Top sub-patterns (in order) |
|---|---|---|
| DI | ~10 | line graph YoY %s · caselet table-build · table ratios/% · pie |
| Wrong series | 4–5 | gaps → ×k+c → squares±k → Fibonacci → interleaved |
| Approximation | ~5 | %-of + product · ÷ decimals · √ park · chained ops |
| Quadratic | 0–4 | both-positive · both-negative · mixed (instant-kill) · CND overlap |
| Arithmetic | 5–6 | P&L (mark-up+discount, dishonest dealer) · SI/CI (gap formula) · T&W (leaves midway) · TSD (trains/boats) · mixture (replacement) · ages/partnership |
