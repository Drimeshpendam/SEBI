# DBMS & SQL — Full Study Notes (20% of Paper 2 combined: DB Concepts 10% + SQL 10%)

> **Official syllabus:** ER model · relational model (relational algebra, tuple calculus) · integrity constraints · normal forms · file organization · indexing (B & B+ trees) · transactions & concurrency control — **plus** SQL: SELECT, VIEW, TRUNCATE, DELETE, UPDATE, ALTER, inner/outer joins, aggregates, UNION/INTERSECT/EXCEPT, IN & EXISTS, nested queries.
>
> **How SEBI tests it (real style):** SQL output questions, "which normal form?" given FDs, candidate keys via closure, ACID/isolation scenario MCQs, B-Tree used for DB indexing (real recalled Q), difference MCQs (DELETE/TRUNCATE/DROP, WHERE/HAVING, clustered/non-clustered).

**How to read these notes:** every concept follows the same loop — *what it is in plain words → a tiny example you can see → the exam rule/trap*. Read the example tables slowly; the rules make sense only after the example clicks.

---

## PART 1 — DATABASE CONCEPTS

### 1. ER Model (Entity–Relationship)

**What it is (plain words):** Before anyone builds database tables, they draw a picture of what the business has — *things* (entities), *facts about those things* (attributes), and *how things connect* (relationships). The ER model is that picture. SEBI asks how the picture converts into tables.

**Example — a college database:**
- **Entity** = a real-world "thing" we store: `STUDENT`, `COURSE`. A **weak entity** can't exist alone: a `DEPENDENT` (employee's child) means nothing without its owner `EMPLOYEE` — it has no full key of its own, so it borrows the owner's key.
- **Attributes** — types are asked directly:
  - simple vs composite → `name` can split into `first_name` + `last_name` (composite)
  - stored vs derived → we store `DOB`; `age` is *derived* (computed, not stored)
  - single vs **multivalued** → one student can have 3 phone numbers → in tables, multivalued attributes become their own table
- **Relationship cardinalities** = how many of one side connect to the other:
  - 1:1 — one person : one passport
  - 1:N — one department : many employees
  - M:N — many students : many courses

**ER → tables mapping (THE exam question):**
| In the picture | Becomes |
|---|---|
| Strong entity | its own table |
| Weak entity | table containing the owner's PK as part of its key |
| **M:N relationship** | **always its OWN table** (e.g. ENROLLS with both PKs) |
| 1:N relationship | NO new table — put the FK on the "many" side |
| Multivalued attribute | separate table (entity PK + the value) |

*Why:* an M:N can't live inside either table — where would "student X took course Y" go without repeating everything? So it gets its own table. REMEMBER: *"Many-to-many gets its own table; one-to-many borrows the key."*

### 2. Relational Model & Keys

**Plain words:** a *relation* = a table. **Tuple** = row, **attribute** = column. Two vocabulary traps SEBI loves: **degree** = number of COLUMNS, **cardinality** = number of ROWS (backwards from intuition — a table with 5 columns and 100 rows has degree 5, cardinality 100).

**Keys — learn them on one example.** Table EMP:

| emp_id | email | dept | name |
|---|---|---|---|
| E1 | a@x.com | IT | Asha |
| E2 | b@x.com | HR | Bala |

- **Super key** = ANY combination that uniquely identifies a row: `{emp_id}`, `{emp_id, name}`, `{email, dept}`… lots of them.
- **Candidate key** = the *minimal* ones — remove any attribute and it stops working: `{emp_id}` and `{email}` (assuming emails unique). `{emp_id, name}` is a super key but NOT candidate — `name` is dead weight.
- **Primary key** = the one candidate key you actually pick → `emp_id`. UNIQUE + NOT NULL.
- **Alternate key** = the runner-up candidates → `email`.
- **Foreign key** = a column that points at another table's PK (dept → DEPT table). CAN be NULL; the column it points to MUST be unique.
- REMEMBER: *"Super is the family, candidates are the minimal members, primary is the chosen one, alternate are the leftovers."*

**Integrity constraints = rules the DB enforces automatically:**
- Entity integrity — PK can never be NULL (a row with no identity isn't a row)
- Referential integrity — an FK must point at a real PK or be NULL (can't put an employee in a department that doesn't exist)
- Domain constraint — values inside the column's allowed set (age can't be -5)
- `ON DELETE CASCADE` (delete the parent → children die too) vs `SET NULL` vs `RESTRICT` — MCQ territory.

### 3. Functional Dependencies & Closure

**Plain words:** `X → Y` means *"if you know X, you know Y."* In table terms: **whenever two rows agree on X, they must agree on Y.**

**See it:**
| sid | course | instructor |
|---|---|---|
| S1 | DBMS | Rao |
| S2 | DBMS | Rao |
| S3 | OS | Iyer |

Here `course → instructor` holds (every DBMS row says Rao). `sid → course` does NOT (S1's sid is unique, nothing repeats to prove it — but the real test is: two S1 rows could legally have different courses). "Trivial" FD = Y is a subset of X (`{A,B}→A`) — always true, never interesting.

**Attribute closure (X)⁺ = everything X determines — THE tool for candidate keys:**
1. Attributes that appear ONLY on left sides of FDs (or nowhere) → they MUST be in every key (nothing can produce them).
2. Grow a set: write X, keep adding whatever its FDs produce, until you have all attributes.
- **Worked example:** FDs `A→B`, `B→C`, attributes {A,B,C,D}: start with A → A gives B → B gives C → A⁺={A,B,C}. D appears on no right side → D must be in the key. Try AD: AD⁺={A,B,C,D} ✓ → **AD is the candidate key** (full solve in Ex 1).
- **Prime attribute** = belongs to SOME candidate key — needed for the 3NF rule below.

### 4. Normalization — "which normal form?" questions

**Plain words:** normalization = rules for splitting fat tables into smaller ones so data isn't repeated. Repeated data = three classic disasters: **insertion anomaly** (can't record "new dept HR" until it has an employee), **deletion anomaly** (firing the last HR employee erases the dept), **update anomaly** (dept phone stored 100 times → change it 100 times, miss one → inconsistent).

**See each NF as a broken table:**

**1NF — every cell holds ONE value.** Violation:
| sid | phones |
|---|---|
| S1 | 90001, 90002 | ← list in a cell = NOT 1NF

Fix: one phone per row (or a PHONES table).

**2NF — 1NF + no partial dependency.** Only bites when the PK is *composite* (multiple columns). A non-key column must depend on the WHOLE key, not a piece of it.
| sid | course | sname | ← key {sid,course}; but sname needs only sid
Fix: split → STUDENT(sid, sname) + ENROLL(sid, course). *Think: "don't let part of a composite key carry facts alone."*

**3NF — 2NF + no transitive dependency.** A non-key column must not depend on ANOTHER non-key column.
| eid | dept | dept_loc | ← eid→dept and dept→dept_loc, so eid→dept_loc transitively
Fix: EMP(eid, dept) + DEPT(dept, dept_loc). *Formal rule: every FD X→Y needs X a superkey OR Y prime.*

**BCNF — the strict version: for EVERY non-trivial FD X→Y, X must be a superkey. No exceptions.** 3NF tolerates a non-superkey LHS when Y is prime; BCNF doesn't. Cost: **BCNF can lose dependency preservation; 3NF never does** (classic MCQ line).

**The chain:** each NF adds a rule — 3NF ⊃ 2NF ⊃ 1NF (can't be 3NF without 2NF). **Lossless join** = split tables must rebuild the original exactly (required); **dependency preserving** = all FDs still checkable inside the pieces (desired).

**Quick decision tree for "which NF?":** non-atomic cell? → violates 1NF. Part-of-key dependency? → only 1NF. Non-key→non-key FD? → only 2NF. FD whose LHS isn't a superkey but RHS is prime? → 3NF, not BCNF. Every LHS a superkey? → BCNF.

### 5. Relational Algebra & Tuple Calculus

**Plain words:** relational algebra is the *math underneath SQL* — operators that take tables and return tables. You only need symbol → meaning:

| Symbol | Name | Means | SQL cousin |
|---|---|---|---|
| σ | select | pick ROWS by condition | `WHERE` |
| π | project | pick COLUMNS | `SELECT col` |
| ⋈ | join | combine tables on a condition | `JOIN` |
| ∪ ∩ − | set ops | union, intersection, difference | `UNION/INTERSECT/EXCEPT` |
| × | cartesian product | every row × every row | `CROSS JOIN` |
| ÷ | division | "for ALL" queries | (no direct SQL — the trick) |

- **Division ÷ is the MCQ favourite:** "students enrolled in ALL courses" is exactly division — `ENROLLS ÷ COURSES`.
- **Natural join** ⋈ matches same-named columns automatically and keeps only one copy of the join column.
- **Tuple relational calculus** = the *declarative* cousin ("what to get", not "how to get it") — `{t | P(t)}`. Domain calculus = same idea with column variables. Recalled pattern: "which is non-procedural?" → **tuple calculus**.

### 6. File Organization & Indexing (B/B+ trees — named in the syllabus)

**Plain words:** without an index, finding row #5,000,000 means reading all 5 million — a "full table scan." An index is a separate sorted structure that points to rows, like a book's index pointing to pages.

- **Ordered index types:** *primary* (index on the sorted key field), *clustered* (index on a sorted NON-key field — groups equal values), *secondary* (index on an unordered field — needs a dense index: one entry per record).
- **Dense** = an index entry for every record · **sparse** = one per disk block (only possible when data is sorted).
- **Clustered index = the table's physical row order follows the index → only ONE per table.** Non-clustered = a side structure with pointers → many allowed. *Think: a dictionary is "clustered" on the word; its index of topics is "non-clustered."*

**B-Tree vs B+ Tree — the exam pair:**
- B-Tree: keys AND record-pointers live in every node.
- **B+ Tree: record-pointers live ONLY in the leaves, and the leaves are linked like a chain.** Internal nodes are pure signposts → more keys fit per node → shorter, faster tree; and following the leaf-chain makes **range queries** ("salary 50k–80k") trivial — find 50k, walk right.
- *That's why every real DBMS uses B+ trees.* Real recalled Q: "data structure for database indexing" → **B-Tree (B+ family)**.
- **Hash index:** perfect for `=` lookups O(1), useless for ranges (nothing is sorted) — another recalled pattern.

### 7. Transactions & Concurrency

**Plain words:** a *transaction* = a unit of work that must behave as one indivisible action. The classic story: transferring ₹500 = debit A + credit B. If the power dies between them, money vanishes — transactions exist so that can't happen.

**ACID — on that transfer:**
- **A**tomicity — both updates happen or neither does (ROLLBACK undoes partial work)
- **C**onsistency — the DB moves only valid-state → valid-state (total money conserved)
- **I**solation — two simultaneous transfers behave as if they ran one-after-another
- **D**urability — once COMMIT says "done", even a crash can't undo it (log/WAL)
- REMEMBER: *"All Complete Isolated Data persists."*

**Concurrency problems — see each as a tiny timeline:**
- **Dirty read** — T2 writes X=50 (not committed), T1 reads 50, T2 rolls back → T1 believed a value that never officially existed. *Read = uncommitted.*
- **Non-repeatable read** — T1 reads X=10; T2 UPDATEs X=20 and commits; T1 reads X again → 20. Same query, different answer. *Changed, not newborn.*
- **Phantom read** — T1 runs `WHERE age>30` → 5 rows; T2 INSERTs an age-40 row; T1 re-runs → 6 rows. A new ROW appeared, not a changed value. *Phantom = newborn row.*
- REMEMBER: *"Dirty = uncommitted, non-repeatable = changed, phantom = newborn."*

**Isolation levels (weakest → strongest) — memorize the ladder:**
`Read Uncommitted` (allows dirty) → `Read Committed` (stops dirty) → `Repeatable Read` (stops non-repeatable) → `Serializable` (stops everything, incl. phantom). MCQs ask "which level prevents X?" — walk the ladder.

**Serializability:** a schedule is correct if it's equivalent to running the transactions in some serial order. Test: draw a **precedence graph** (arrow T1→T2 when T1's conflicting op comes first); **a cycle = NOT serializable.**

**Recoverable < cascadeless < strict** (strictness order is an MCQ): recoverable = nobody commits before the transactions they read uncommitted data from commit; cascadeless = only ever read committed data; strict = read AND write only committed values.

**Locks:** **S**hared (for reading — many can hold S together) vs e**X**clusive (for writing — nobody else can hold anything). S+S compatible; X with nothing.
- **2PL (two-phase locking):** growing phase (take locks, release none) → shrinking phase (release, take none). Guarantees serializability but CAN deadlock. **Strict 2PL** = keep X locks until commit → also cascadeless.
- **Deadlock** = circular waiting (T1 holds A wants B; T2 holds B wants A). Detect via a cycle in the *wait-for graph*. Timestamp fixes: **wait-die** (older transaction waits; younger is killed — polite, non-preemptive) vs **wound-wait** (older KILLS younger — aggressive, preemptive). "Wound" = the elder wounds the young.

---

## PART 2 — SQL QUERIES (10% — the most practical section)

### Execution order — the mental model (learn this and every output question gets easy)

SQL is written in one order but EXECUTED in another:
```
FROM (incl. JOINs) → WHERE (filter rows) → GROUP BY → HAVING (filter groups)
→ SELECT (incl. aggregates) → DISTINCT → ORDER BY → LIMIT/OFFSET
```
**Why this matters:** aggregates exist only *after* GROUP BY — so `WHERE` can't see them (WHERE runs earlier). That's the entire reason **HAVING exists**: WHERE filters *rows*, HAVING filters *groups*. Every WHERE-vs-HAVING MCQ is this one fact.
REMEMBER: **"Freddie Wore Green Hats, So Dad Ordered Lunch."**

### SELECT & filtering — small rules that are direct questions
- `WHERE col IS NULL` — never `= NULL`. NULL means "unknown," and even `NULL = NULL` evaluates false → classic trap.
- `BETWEEN a AND b` is INCLUSIVE of both ends.
- `LIKE '%x'` = ends with x · `_` = exactly one wildcard char.
- `NOT IN` with a NULL inside the list → returns NOTHING (NULL poisons the comparison).
- `DISTINCT` removes duplicate rows.

### Joins — what survives

| Join | Returns |
|---|---|
| INNER | only rows that match on both sides |
| LEFT [OUTER] | ALL left rows + matches (NULLs fill the right side) |
| RIGHT [OUTER] | ALL right rows + matches |
| FULL [OUTER] | everything from both sides |
| CROSS | cartesian product (m×n rows) |
| SELF | table joined to itself (employee ↔ manager) |
| NATURAL | auto-matches same-named columns, drops the duplicate column |

- **Count the preserved side:** LEFT JOIN with 5 left rows, only 3 matching → result still has **5 rows** (left always survives). That's the whole "how many rows?" trick.
- Trap: a `WHERE` condition on the right-side column of a LEFT JOIN silently throws away the NULL-padded rows → converts it back to an INNER JOIN. Keep right-side conditions in `ON` instead.

### Aggregates & GROUP BY
- `COUNT(*)` counts ALL rows (NULLs included) · `COUNT(col)` skips NULLs · `COUNT(DISTINCT col)` = unique non-nulls — the difference is asked every cycle.
- `SUM`/`AVG`/`MAX`/`MIN` silently skip NULLs (AVG of {10, NULL} = 10, not 5).
- Rule: every non-aggregated column in SELECT must appear in GROUP BY.
```sql
SELECT dept, COUNT(*) FROM emp
WHERE salary > 30000          -- row filter FIRST
GROUP BY dept
HAVING COUNT(*) > 5;          -- group filter SECOND
```

### Nested queries & set ops
- `IN` — value is in the subquery's list · `EXISTS` — the subquery returns ≥1 row · `ANY/SOME` — true if it beats ANY member · `ALL` — true only vs EVERY member.
- **Correlated subquery** references the outer row → re-runs once PER OUTER ROW (slower, more powerful). `EXISTS` questions are usually correlated.
- `UNION` dedupes · `UNION ALL` keeps duplicates (faster) · `INTERSECT` common rows only · `EXCEPT`/`MINUS` = left minus right. Column counts & types must match.
- Classic output trap: `UNION` of 3+3 rows sharing 1 identical value → **5 rows, not 6**.

### DML / DDL / DCL / TCL — the classification MCQ
- **DDL** (structure): CREATE, ALTER, DROP, TRUNCATE, RENAME — auto-commit, can't roll back.
- **DML** (data): INSERT, UPDATE, DELETE (SELECT is sometimes its own DQL) — transactional, roll-back-able.
- **DCL** (permissions): GRANT, REVOKE.
- **TCL** (transactions): COMMIT, ROLLBACK, SAVEPOINT.
- **DELETE vs TRUNCATE vs DROP (asked every cycle):**
  | | DELETE | TRUNCATE | DROP |
  |---|---|---|---|
  | Removes | chosen rows | ALL rows | table + structure |
  | WHERE? | yes | no | n/a |
  | Type | DML, logged, rollback-able | DDL, fast, resets identity | DDL |
  | REMEMBER | *"Delete picks rows, Truncate empties the box, Drop burns the box."* |

### Views & misc
- **View** = a stored query — a *virtual* table holding no data. **Materialized view** = the result physically stored → fast reads but needs refreshing.
- `WITH CHECK OPTION` — blocks inserts/updates through the view that would violate the view's own WHERE.
- `ALTER` ops: ADD / DROP / MODIFY column. `UPDATE ... SET ... WHERE` — forget the WHERE and you update EVERY row.
- `LIMIT n` / `FETCH FIRST n` / `TOP n` = dialect variants for top-N.
- **Nth highest salary (the classic):** `SELECT DISTINCT sal FROM emp ORDER BY sal DESC LIMIT 1 OFFSET n-1`, or correlated `WHERE n-1 = (SELECT COUNT(DISTINCT s2) FROM emp WHERE s2 > sal)` — reads "exactly n-1 salaries are bigger."
- **Find duplicates:** `GROUP BY col HAVING COUNT(*) > 1`.

---

## Question types SEBI asks here (mapped to drills)
1. **SQL output** — trace with execution order; watch COUNT variants, joins, NULLs.
2. **"Which NF?"** — run the decision tree on the FDs.
3. **Candidate key via closure** — left-only attributes first.
4. **ACID / isolation-level scenarios** — dirty/non-repeatable/phantom matching.
5. **Difference MCQs** — DELETE/TRUNCATE/DROP, WHERE/HAVING, clustered/non-clustered, B vs B+.
6. **Real recalled:** "data structure for DB indexing" → B-Tree. "JSON→string in Python" → json.dumps() (cross-topic alert).

## Drills (Days 1–6)
- Day 1–2: keys + closure problems (5) + NF decision tree (5).
- Day 3–4: hand-write 15 SQL — joins, group-by/having, nested, nth-highest, duplicates, self-join. Run them free at TrySQL (see Practice Links).
- Day 5: indexing + transactions MCQs (GATE CS DBMS on GateOverflow — identical depth).
- Day 6: Testbook chapter tests "DB Concepts" + "SQL Queries" — log every miss with the rule number.

---

## Worked Examples — 10 solved in exam pattern

**Ex 1 — candidate key via closure.** R(A,B,C,D), FDs: A→B, B→C. Find the key.
**Ans: AD.** A⁺={A,B,C} — D never appears on any right side, so D must be in EVERY key. AD⁺={A,B,C,D} covers all → AD is the candidate key. *(Rule: whatever no FD produces must be in the key.)*

**Ex 2 — which normal form?** STUDENT(sid, sname, course, instructor), key={sid,course}, FD: sid→sname.
**Ans: 1NF only — violates 2NF.** sname depends on PART of the composite key (sid alone). Fix: split into STUDENT(sid,sname) + ENROLL(sid,course,instructor). *(Rule: 2NF = no partial dependency on part of a composite key.)*

**Ex 3 — transitive dependency → 3NF.** EMP(eid, dept, dept_loc), eid→dept, dept→dept_loc.
**Ans: violates 3NF.** dept_loc depends on dept which depends on eid — a transitive chain. Fix: EMP(eid,dept) + DEPT(dept,dept_loc).

**Ex 4 — SQL output.** `SELECT dept, COUNT(*) FROM emp WHERE sal>50000 GROUP BY dept HAVING COUNT(*)>3;`
**Ans: departments having MORE THAN 3 employees who earn >50k.** Trap: HAVING filters groups AFTER grouping; WHERE filters rows BEFORE. Can't use WHERE for COUNT.

**Ex 5 — JOIN row count.** emp has 10 rows (each with dept_id), dept has 3 rows, every dept_id matches.
**Ans: INNER JOIN → 10 rows; CROSS JOIN → 30 rows.** Trap answer: inner join = 13 (that's a UNION-style guess).

**Ex 6 — DELETE vs TRUNCATE vs DROP.** "Remove all rows fast, keep the table structure, no rollback needed?"
**Ans: TRUNCATE.** DELETE removes row-by-row (logged, can rollback, WHERE allowed); TRUNCATE deallocates (fast, no WHERE); DROP removes the table itself.

**Ex 7 — ER mapping.** A M:N relationship between STUDENT and COURSE — how many tables?
**Ans: 3** (STUDENT, COURSE, + ENROLLS relationship table with both FKs). For 1:N, NO extra table — put the FK on the N (many) side.

**Ex 8 — ACID identification.** "Either the whole transfer happens or nothing does" / "a committed change survives a crash."
**Ans: Atomicity / Durability.** Map: all-or-nothing=A, valid-state-to-valid-state=C, concurrent-as-if-serial=I, survives-crash=D.

**Ex 9 — index type.** "Queries are mostly range scans (salary BETWEEN x AND y) — B+ tree or hash index?"
**Ans: B+ tree.** Hash indexes only support equality lookups; B+ trees keep data sorted → ranges work. Also: clustered index changes physical row order → only ONE per table.

**Ex 10 — concurrency problem.** "T1 reads a value, T2 updates it, T1 re-reads and gets a different value."
**Ans: non-repeatable read.** (Dirty read = read uncommitted data; phantom = re-query returns new ROWS.) Isolation fix: repeatable-read level or higher.
