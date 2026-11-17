# Question Playbooks — one attack-card per exam pattern

**How to use:** in the exam you never improvise. You RECOGNIZE the shape → run the card.
Each card: **RECOGNIZE** (the signal) → **DO** (fixed steps) → **EX** (the card running on a real question) → **TRAP** → **CAP** (seconds).

---

## SECTION 1 — QUANT (25 marks · 20 Qs)

### QUANT-1 · Approximation
**RECOGNIZE:** `x% of N + a×b ≈ ?`, decimals everywhere, options spaced wide.
**DO:**
1. Park each number at its friendly cousin — fraction family (12.5%=1/8, 33.3%=1/3, 62.5%=5/8), perfect square (√168.7→√169=13), multiple of 5.
2. Compute with the cousins only — never touch the decimals.
3. Pick the closest option.
**EX:** `79.9% of 599.5 − 24.9% of 239.8` → 80% of 600 − 25% of 240 = 480−60 = **420**. Options 400/420/440 — done in 20s.
**TRAP:** over-refining. Off-by-8 doesn't matter when options are 50 apart.
**CAP:** 35s. Highest marks-per-second in the paper.

### QUANT-2 · Wrong/Missing Number Series
**RECOGNIZE:** `3, 8, 15, 24, 35, ?` or "find the wrong term."
**DO — the ladder, in order:**
1. **10-second look:** slow growth→gaps · exploding→×k · near squares→n²±k · two stories→interleaved.
2. **Gaps:** write differences. Patterned = done (~60% die here).
3. **Ratios:** term ≈ k×previous? Divide to check (~15%).
4. **×k+c:** ratio hovers near one number → addend is the story (~15%).
5. **n²±k / n³±k:** subtract nearest famous square; leftovers patterned? (~5%).
6. **Sum-of-previous / interleaved / second differences** (~5%).
**EX:** `7,12,22,38,57,82` → gaps **5,10,16,20,25** — expected step +5 → 16 and 20 are the broken gaps → the term BETWEEN them (**38**) is wrong; should be 37 (gaps 15,20). Culprit rule: one wrong term corrupts TWO gaps — culprit sits between them.
**EX (missing):** `3,8,15,24,35,?` → gaps 5,7,9,11 (odds) → next gap 13 → **? = 48**.
**TRAP:** testing patterns out of order = burning 3 minutes. Gaps first, always.
**CAP:** 40s.

### QUANT-3 · Quadratic Compare
**RECOGNIZE:** `I. x²−Sx+P=0  II. y²…=0` → compare x vs y.
**DO:**
1. **Sign poem first** — may kill without factoring: `−Sx+P`→both + · `+Sx+P`→both − · `±Sx−P`→one each (bigger takes middle sign).
2. All-negative vs all-positive → answers itself.
3. Factor: roots ADD to S, MULTIPLY to P.
4. Compare ranges: strict separation → >/< · overlap → **CND always**.
**EX:** `I. x²+8x+15=0  II. y²−8y+15=0` → sign poem: I both negative (−3,−5), II both positive (3,5) → **x<y** without computing a thing.
**EX:** `I. x²−7x+12 → 3,4 · II. y²−9y+20 → 4,5` → x=4 equals y=4 → answer is **x≤y**, not x<y.
**TRAP:** touching roots → ≤/≥ never </>. Overlapping ranges → CND.
**CAP:** 45s. Daily: 10 factor-pairs ("sum 9 product 20 → 4,5").

### QUANT-4 · Data Interpretation (~10Q = half the section)
**RECOGNIZE:** line graph / table / pie / caselet (paragraph→you build the table).
**DO:**
1. **UNITS FIRST** — lakh vs thousand, % vs absolute, per-month vs cumulative.
2. Read QUESTIONS → they name the 4–5 numbers that matter; ignore the rest.
3. % → fraction table. "X exceeded Y by %" = (X−Y)/**Y**×100.
4. Caselet → write the mini-table while reading.
5. Pick the clean table/line set; skip the ugly caselet.
**EX:** "A's sales rose from 40L to 52L — rise %?" → (52−40)/**40**×100 = 30%. The trap answer divides by 52 → 23% — wrong base.
**TRAP:** "exceeded BY what %" divides by the OLD value — *"compare against what it was, not what it became."*
**CAP:** 60–90s/question; one clean set only.

### QUANT-5 · Arithmetic
**RECOGNIZE:** P&L, SI/CI, TSD, ages, mixtures — word problems.
**DO:** scan all 5–6 → attempt ONLY types you know cold → skip the rest.
**EX:** SI question: "₹6000 at 8% for 3 yrs" → 6000×8×3/100 = **1440**. Formula direct — 30s bank.
**CAP:** 90–120s, max 3 attempted.

---

## SECTION 2 — REASONING (25 marks · 20 Qs)

### REAS-1 · Syllogism
**RECOGNIZE:** "Statements: All A are B… Conclusions: (1)…(2)…"
**DO:** MUST/MAYBE test — a conclusion is TRUE only if it MUST hold in every legal diagram. One breaking arrangement → false.
**Quick rules:** All A→B ⇒ Some B→A ✓ · All+All→All ✓ · Some+No→Some-not ✓ · Some+Some→maybe ✗ · either-or = both fail + same terms + one ± pair.
**EX:** "All audits are checks. All checks are logged. → All audits are logged?" → MUST: audits ⊂ checks ⊂ logged → **YES**. "Some logged are audits?" → a thing can be logged without being an audit → MAYBE… but All A⊂B ⇒ Some B are A → **YES too.**
**CAP:** 60s.

### REAS-2 · Linear Seating Puzzle
**RECOGNIZE:** "8 people in a row facing north…"
**DO:** 8 empty boxes → place ABSOLUTE anchors first ("C at extreme") → chain relative clues onto anchors → leftover clue lands in the empty slot last. Never start with a floating clue.
**EX:** "C at left extreme. A is 3rd right of C." → boxes `C _ _ A _ _ _ _` → then "two between A and E" → E at 7 → `C _ _ A _ _ E _` → keep chaining.
**CAP:** 90s.

### REAS-3 · Month/Attribute Table
**RECOGNIZE:** "7 people born in different months, each likes a colour…"
**DO:** grid — rows=people, cols=attributes → fill definite cells → mark MAYBE cells differently → eliminate when forced.
**EX:** "A born in March; the March person likes blue" → cell A×March=✓, March×blue=✓ — two constraints, one row, one column.
**TRAP:** writing maybe-cells as facts.
**CAP:** 90–120s.

### REAS-4 · Box/Floor Stack
**RECOGNIZE:** "boxes stacked" / "floors 1–8."
**DO:** number the stack → place absolutes → "two boxes between X and Y" = **gap of 3** → build vertically.
**EX:** "3 floors between A and B" → |posA−posB| = **4**, not 3 — count the empty slots between.
**CAP:** 90s.

### REAS-5 · Blood Relations
**RECOGNIZE:** "A is B's brother… how is X related to Y?"
**DO:** decode to a tree — generations top→down, male=□ female=○ → trace the path. The side (maternal/paternal) lives in the PARENT's gender.
**EX:** "She is the daughter of my grandfather's only son" → grandfather's only son = my father → his daughter = **my sister**.
**CAP:** 40s.

### REAS-6 · Ranking / Height Order
**RECOGNIZE:** "A ranks 15th from top, 20th from bottom."
**DO:** total = top + bottom − 1 → 15+20−1 = **34**. Between two = |pos1−pos2|−1.
**EX:** "X is 15th from top, 20th from bottom; how many in line?" → 34.
**CAP:** 30s.

### REAS-7 · Coding-Decoding
**RECOGNIZE:** "CAT is coded as XZG" / "DOG=415…"
**DO:** check in order: fixed letter-shift (+2: A→C) → reversal (A↔Z) → word↔word mapping via common words → digit substitution per letter.
**EX:** "CAT→XZG" → C↔X? A↔Z? T↔G? — reversal (opposite letters: A-Z, B-Y, C-X, T-G) → **reversal code**. Now TIGER → GRTVI.
**CAP:** 60s.

### REAS-8 · Inequality
**RECOGNIZE:** "P≥Q>R≤S… conclusion P>S."
**DO:** chain symbols — conclusion survives only with an unbroken compatible path. A ≤ blocking a > path kills it. Opposite signs → CND.
**EX:** "P>Q>R, S>R → P>S?" → P>…>R and S>R but P and S never meet → **CND**.
**CAP:** 40s.

### REAS-9 · Direction Sense
**RECOGNIZE:** "walks 5km north, turns left…"
**DO:** draw N-E-S-W → plot each leg → net displacement = answer. "Left" = face current direction first, then turn.
**EX:** "5km N, left 3km, left 5km" → 5N → 3W → 5S → back to start column, 3km west of origin → **3 km West**.
**CAP:** 45s.

### REAS-10 · Statement–Assumption
**RECOGNIZE:** "which assumption is implicit?"
**DO:** necessity test — assumption implicit ONLY if the statement COLLAPSES without it.
**EX:** "Attend the workshop to improve skills" → implicit: "skills can be improved by workshops" — remove it and the sentence is meaningless → **implicit**. "Everyone wants skills" → not needed → **not implicit**.
**CAP:** 45s.

### REAS-11 · Alphanumeric Series
**RECOGNIZE:** "A1 B2 C3… 5th to the right of…"
**DO:** number every element's position → "5th right of X" = posX+5.
**EX:** `A1 B2 C3 D4 E5` → "3rd to right of B2" → pos 2+3 = 5 → **E5**.
**CAP:** 40s.

### REAS-12 · Data Sufficiency
**RECOGNIZE:** "is/are the statement(s) sufficient?"
**DO:** test each ALONE, then together — you're asked sufficiency, not the answer. Stop at "solvable."
**EX:** "Is x>5? I: x²=36 II: x>0" → I alone → x=±6, can't tell sign → insufficient. I+II → x=6 → **sufficient together**.
**CAP:** 60s.

---

## SECTION 3 — ENGLISH (25 marks · 20 Qs)

### ENG-1 · Reading Comprehension (5–7Q)
**DO:**
1. Read QUESTIONS first — they tell you what to hunt.
2. Vocab-in-context → that exact line ±1 sentence.
3. Inference → IMPLIED not stated. "The author suggests" = between the lines.
4. Tone → list the author's adjectives.
**EX:** passage says "regulators increasingly rely on real-time surveillance" → Q "author's view of surveillance?" → positive/neutral tool — pick the option matching the TONE, not your opinion.
**TRAP:** answers TRUE in the world but not asked — match the question type.
**CAP:** 6–8 min total.

### ENG-2 · Error Spotting (4–5Q)
**DO — check order:**
1. Subject–verb agreement (#1 source — "each of the boys **have**" ✗→has)
2. Tense consistency inside the sentence
3. Articles + preposition collocation
4. Parallel structure ("eating, sleeping, **to run**" ✗→running)
5. Pronoun agreement
**EX:** "The list of items **are** on the desk" → subject is "list" (singular) → **"is"** — the plural "items" is the planted distractor.
**CAP:** 40s.

### ENG-3 · Fillers (4–5Q)
**DO:** polarity first (+ or − slot?) → collocation (which word lives with the neighbours) → grammar fit.
**EX:** "The committee ___ its report yesterday" → "submitted" not "submits" — yesterday forces past tense before vocab even matters.
**CAP:** 30s.

### ENG-4 · Para Jumble (4–5Q)
**DO:** find the OPENER (defines topic, no orphan pronouns) → chain by pronouns ("this/it/they" must follow their noun) → chronology markers → conclusion-signal closers ("thus/therefore").
**EX:** sentences about SEBI — one starts "It was set up in 1988" — "it" needs SEBI named earlier → it CAN'T be the opener. The sentence containing "SEBI was established…" opens.
**CAP:** 90s.

### ENG-5 · Sentence Improvement / Cloze
**DO:** name the rule being tested (tense/idiom/conciseness) → eliminate options keeping the same error.
**EX:** "He is working here **since** 2020" → **"since"→"for"?** No — since + point in time is correct. The error is "is working" → **"has been working"** (duration continues to now).
**CAP:** 35s.

---

## SECTION 4 — GA (20 Qs · pure recall)

### GA-1 · Schemes
**DO:** the triad — **Ministry + beneficiary + year**. Recall by ministry; scheme names blur.
**EX:** "PM Jan Dhan Yojana — ministry?" → Finance (MoF), 2014, bank accounts for all → the triad.
### GA-2 · Finance Static
**DO:** regulator→function pairs cold: SEBI=securities · RBI=banking+rates+currency · IRDAI=insurance · PFRDA=pensions. Half of GA-finance = "whose job is this."
**EX:** "Who registers FPIs?" → SEBI (RBI does banking/forex side) — the split-of-jobs trap.
### GA-3 · Reports/Indices
**DO:** publishing body + India's rank — headline number only.
**EX:** "Global Innovation Index publisher?" → WIPO; India's rank ~39 — that's the whole question.
### GA-4 · Appointments/Awards
**DO:** person→post pairs from the daily log — memory drip, not reasoning.
**CAP for all GA:** 20s — know it or don't, never linger.

---

## SECTION 5 — DBMS + SQL (Paper 2 · ~20 marks)

### DB-1 · Candidate Key via Closure
**RECOGNIZE:** "R(A,B,C,D), FDs: A→B, B→C. Find the key."
**DO:**
1. **Left-only hunt:** attribute never on a right side MUST be in every key → start there.
2. Seed closure → keep adding what LHS attrs reach → loop till full.
3. Covers all = candidate key, minimal by construction.
**EX:** `A→B, B→C` over R(A,B,C,D) → D never produced → key contains D. A⁺={A,B,C} — need D → **AD**. AD⁺ = all four ✓.
**CAP:** 60s.

### DB-2 · "Which Normal Form?"
**RECOGNIZE:** table + FDs → "highest NF?"
**DO — the decision tree:**
1. Lists/multi-values in a cell → **not even 1NF**.
2. Composite key + attr leaning on HALF → **1NF only** (partial dep). Single-col key → auto-pass, skip to 3.
3. Non-key→non-key chain (A→B→C, B not key) → **2NF only** (transitive).
4. Every FD's LHS a superkey → **BCNF** · LHS not key but RHS prime → 3NF escape → **3NF**.
**EX:** `EMP(eid→dept, dept→dept_loc)` → chain eid→dept→dept_loc, dept isn't a key → transitive → **2NF**.
**EX:** `{teacher,subject}→room, room→subject` → all attrs prime → room→subject has prime RHS → 3NF escape → **3NF** (BCNF dies since room isn't a key).
**CAP:** 75s.

### DB-3 · SQL Output Prediction ⭐ most-asked
**RECOGNIZE:** tables + query → "what comes back?"
**DO:** trace in execution order — FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT. Write survivors at each stage.
**EX:** `WHERE comm <> 5` on comms {NULL,5,8,NULL,NULL,3} → keeps 8 and 3 = **2 rows** — the three NULLs die silently, never shown.
**TRAPS planted:** COUNT(col) skips NULLs · NULL≠anything · AND before OR · BETWEEN inclusive · LIKE `_`=1 char.
**CAP:** 60s.

### DB-4 · Join Row Count
**RECOGNIZE:** "A has 10 rows, B has 5, 8 match — LEFT JOIN?"
**DO:** INNER=matches · LEFT=|A| · RIGHT=|B| · FULL=|A|+|B|−matches · CROSS=|A|×|B|.
**EX:** 10-row EMP × 5-row DEPT, 8 match → INNER=8 · LEFT=10 · RIGHT=5 · FULL=10+5−8=**7** · CROSS=50.
**CAP:** 20s.

### DB-5 · WHERE vs HAVING
**RECOGNIZE:** "which query is valid/invalid?"
**DO:** aggregates ILLEGAL in WHERE (no groups exist yet) → legal only in HAVING.
**EX:** `WHERE AVG(sal)>60000` → **error**. Fix: `WHERE sal > (SELECT AVG(sal) FROM EMP)` or `GROUP BY… HAVING AVG(sal)>60000`.
**CAP:** 30s.

### DB-6 · Set Ops Counting
**RECOGNIZE:** "result1=3 rows, result2=3 sharing 1 — UNION?"
**DO:** UNION=a+b−shared · UNION ALL=a+b · INTERSECT=shared · EXCEPT=a−shared.
**EX:** {A,B,C} ∪ {B,C,D} → **4** (deduped); UNION ALL → **6**; INTERSECT → {B,C}=**2**; EXCEPT → {A}=**1**.
**CAP:** 25s.

### DB-7 · Classification (DDL/DML/DCL/TCL)
**DO:** DDL=structure (CREATE/ALTER/DROP/TRUNCATE/RENAME — auto-commit) · DML=data (INSERT/UPDATE/DELETE — rollback-able) · DCL=permissions (GRANT/REVOKE) · TCL=transactions (COMMIT/ROLLBACK/SAVEPOINT).
**EX:** "TRUNCATE is which family?" → **DDL** — it deletes rows but deallocates pages, fires no row logic, resets identity.
**CAP:** 15s — cheapest marks in the paper.

### DB-8 · DELETE / TRUNCATE / DROP
**DO:** DELETE=pick rows (WHERE, DML, rollback) · TRUNCATE=empty box (no WHERE, DDL, identity reset) · DROP=burn the box (table+structure gone).
**EX:** "remove all rows fast, keep structure, no rollback" → **TRUNCATE**.
**CAP:** 20s.

### DB-9 · Subquery Reading
**DO:** scalar (`= (SELECT AVG…)`) runs once · IN-list returns a set · **correlated** references the outer row → re-runs per row (EXISTS is usually correlated).
**EX:** `WHERE EXISTS (SELECT 1 FROM ORDERS WHERE ORDERS.cid = CUST.cid)` → the inner uses CUST's row → per-row loop → "customers having orders."
**CAP:** 45s.

### DB-10 · Nth-Highest
**DO:** `ORDER BY sal DESC LIMIT 1 OFFSET n−1` — offset is **always n−1**. Correlated: `WHERE n−1 = COUNT of bigger salaries`.
**EX:** salaries 90,80,72 → 2nd highest → OFFSET **1** → 80.
**CAP:** 40s.

### DB-11 · ACID / Isolation Scenario
**RECOGNIZE:** "T1 reads, T2 updates, T1 re-reads differently" → phenomenon?
**DO:** dirty read=read uncommitted · non-repeatable=same row changed · phantom=new ROWS appeared. A=all-or-nothing · C=valid→valid · I=as-if-serial · D=survives crash.
**EX:** "either the whole transfer happens or nothing" → **Atomicity**. "re-query returns new rows that weren't there" → **phantom**.
**CAP:** 40s.

### DB-12 · Anomaly ID
**DO:** can't write new fact=**insertion** · deleting last row kills a fact=**deletion** · editing many copies, miss one=**update**.
**EX:** "firing the last HR employee erases the department" → **deletion**.
**CAP:** 30s.

### DB-13 · Decomposition
**DO:** lossless = common attrs determine one whole side · dependency-preserving = every FD checkable inside one decomposed table.
**EX:** R(A,B,C), B→C → split R1(A,B), R2(B,C) → common B determines all of R2 → **lossless**.
**CAP:** 60s.

### DB-14 · Indexing
**DO:** range queries→**B+ tree** (sorted) · equality-only→hash · clustered changes physical order→**only ONE per table** · non-clustered=pointer map.
**EX:** "queries are mostly sal BETWEEN x AND y" → **B+ tree**, not hash (hash can't do ranges).
**CAP:** 30s.

---

## SECTION 6 — INFOSEC + EMERGING TECH (Paper 2 · ~10 marks)

### SEC-1 · Name-the-Attack ⭐ asked last cycle
**RECOGNIZE:** a scenario — "fake email steals passwords" / "software locks files for money."
**DO — ask the axes:**
1. **How does it spread?** virus=rides a host file · worm=self-spreads · trojan=disguised legit app
2. **What channel?** email=phishing · personalized=spear phishing · CEO target=whaling · call=vishing · SMS=smishing
3. **Who's the victim?** SQLi→**database** · XSS→**other users** via the page · CSRF→**your logged-in session**
4. **What does it do?** ransomware=locks files for money · spyware=secretly watches (keylogger=keys) · rootkit=hides in the kernel · adware=pop-ups
5. **Scale?** DoS=one source flood · DDoS=botnet army flood · brute=every combo · dictionary=word list · spraying=one password, many accounts
**EX:** "malware encrypts your files, demands crypto to unlock" → **ransomware**. "Infected machines flood the server" → **DDoS via botnet**.
**TRAP:** virus/worm/trojan triple — *"virus rides a file, worm walks alone, trojan wears a disguise."*
**CAP:** 25s.

### SEC-2 · CIA Scenario Match
**RECOGNIZE:** "attacker floods server / edits balance / reads data" → which pillar?
**DO:** stolen=**C** · altered=**I** · knocked offline=**A**.
**EX:** "hacker edits ₹500→₹50,000" → **Integrity**.
**CAP:** 20s.

### SEC-3 · AI / Emerging-Tech Buzzword Match ⭐ trending
**RECOGNIZE:** "which technology produces new content / grounds answers in company docs / creates fake videos?"
**DO:** LLM=generates text · GenAI=creates NEW content · RAG=answers from your documents · agentic=acts autonomously · hallucination=confident lies · deepfake=fake video/audio · fine-tuning=adapts a foundation model · XAI=explains its decisions.
**EX:** "AI that takes actions to complete goals, not just chat" → **agentic AI**. "Model invents a citation that doesn't exist" → **hallucination**.
**CAP:** 20s.

### SEC-4 · Crypto Type ID
**DO:** symmetric=one shared key (AES, DES — fast) · asymmetric=key pair public/private (RSA — slow, solves key exchange) · hash=one-way fingerprint (SHA — integrity, not secrecy).
**EX:** "same key encrypts and decrypts" → **symmetric**. "verify a file wasn't changed" → **hash**.
**CAP:** 25s.

---

## The meta-rule

> **Never improvise.** See the shape → name the card → run the steps → move on.
> A question matching no card in 15 seconds = SKIP, bank it for the end.
> In SEBI, marks aren't for hard questions — they're for clean execution of the shapes you know.
