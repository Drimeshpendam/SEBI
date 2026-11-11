# DBMS & SQL — Full Study Notes (20% of Paper 2 combined: DB Concepts 10% + SQL 10%)

> **Official syllabus:** ER model · relational model (relational algebra, tuple calculus) · integrity constraints · normal forms · file organization · indexing (B & B+ trees) · transactions & concurrency control — **plus** SQL: SELECT, VIEW, TRUNCATE, DELETE, UPDATE, ALTER, inner/outer joins, aggregates, UNION/INTERSECT/EXCEPT, IN & EXISTS, nested queries.
>
> **How SEBI tests it (real style):** SQL output questions, "which normal form?" given FDs, candidate keys via closure, ACID/isolation scenario MCQs, B-Tree used for DB indexing (real recalled Q), difference MCQs (DELETE/TRUNCATE/DROP, WHERE/HAVING, clustered/non-clustered).

---

## PART 1 — DATABASE CONCEPTS

### 1. ER Model (Entity–Relationship)
- **Entity** = a real-world object (Student). **Weak entity** = can't exist without an owner (Dependent needs Employee) — has no full key of its own; uses owner's PK + its own partial key.
- **Attributes:** simple vs composite (name → first+last); stored vs derived (age derived from DOB); single vs **multivalued** (phone numbers → becomes a separate table).
- **Relationship cardinalities:** 1:1 (person–passport), 1:N (dept–employees), M:N (students–courses).
- **ER → tables mapping (frequently asked):**
  - Strong entity → table.
  - Weak entity → table with owner's PK inside it.
  - M:N relationship → **always its own table** (both PKs as composite key).
  - 1:N → put the FK on the N (many) side.
  - Multivalued attribute → separate table (entity PK + the attribute).
- REMEMBER: *"Many-to-many gets its own table; one-to-many borrows the key."*

### 2. Relational Model & Keys
- **Tuple** = row, **attribute** = column, **degree** = #columns, **cardinality** = #rows (exam terms — they ask "degree of relation").
- **Domain** = allowed values for a column.
- **Keys:**
  - **Super key** — any attribute set that uniquely identifies a row. Lots of them.
  - **Candidate key** — *minimal* super key (remove any attribute → stops being unique). Can be several.
  - **Primary key** — the chosen candidate key. UNIQUE + NOT NULL.
  - **Alternate key** — candidate keys not chosen as primary.
  - **Foreign key** — references a candidate/primary key elsewhere (or same table); CAN be NULL; the referenced column must be unique.
  - REMEMBER: *"Super is the family, candidates are the minimal members, primary is the chosen one, alternate are the leftovers."*
- **Integrity constraints:**
  - Entity integrity — PK can't be NULL.
  - Referential integrity — FK must match an existing PK or be NULL.
  - Domain constraint — values within the column's domain.
  - Key constraint — no duplicate PKs.
  - `ON DELETE CASCADE` (delete children too) vs `SET NULL` vs `RESTRICT` — MCQ territory.

### 3. Functional Dependencies & Closure
- FD `X→Y`: X's value determines Y's. "Trivial" FD: Y ⊆ X.
- **Attribute closure (X)⁺** = everything X determines — THE tool for finding candidate keys:
  1. Find attributes that appear ONLY on left sides of FDs (or nowhere) → they must be in EVERY key.
  2. Compute closure of candidate sets until closure = all attributes.
- **Worked example:** FDs: A→B, B→C. Closure(A) = {A,B,C} → A alone is a key. Closure(B) = {B,C} — B can't reach A, so B is not a key.
- Prime attribute = belongs to SOME candidate key (matters for 3NF).

### 4. Normalization — "which normal form?" questions
| NF | Rule | Kills |
|---|---|---|
| **1NF** | All values atomic (no lists/sets in a cell) | multivalued attrs |
| **2NF** | 1NF + no partial dependency (non-key attr depends on WHOLE of a composite key, not part) | partial dependency — only relevant when key is composite |
| **3NF** | 2NF + no transitive dependency (non-key → non-key); formally: every FD X→Y needs X superkey OR Y prime | transitive dependency |
| **BCNF** | For EVERY non-trivial FD X→Y, X must be a superkey — no exceptions | the last anomalies 3NF tolerates |

- WHY the chain works: each NF adds one rule on top of the previous — 3NF ⊃ 2NF ⊃ 1NF. A table can't be 3NF without being 2NF.
- BCNF is stricter than 3NF; **BCNF decomposition can lose dependency preservation; 3NF never does** (classic MCQ line).
- **Anomalies removed by normalization:** insertion (can't add a fact without another), deletion (lose a fact accidentally), update/redundancy (change in many places).
- **Lossless join** = decomposition must rebuild the original table exactly (required). **Dependency preserving** = all FDs checkable within the decomposed tables (desired, BCNF may sacrifice).
- **Quick decision tree for "which NF?":** non-atomic? → violates 1NF. Part-key dependency? → stuck at 1NF. Non-key→non-key FD? → stuck at 2NF. FD whose LHS isn't a superkey? → 3NF, not BCNF. All LHS superkeys? → BCNF.

### 5. Relational Algebra & Tuple Calculus
- σ (sigma) = SELECT rows by condition · π (pi) = PROJECT columns · ⋈ = JOIN · ∪ ∩ − set ops · ρ rename · × cartesian product.
- **Division ÷** = "for ALL" queries ("students enrolled in ALL courses") — the operator MCQs love.
- Natural join ⋈ = joins on same-named columns, drops duplicates of the join column.
- Tuple relational calculus = declarative ("what", not "how") — `{t | P(t)}`; domain calculus uses attribute variables. Know names only — SEBI asks "which is non-procedural?" → tuple calculus.

### 6. File Organization & Indexing (B/B+ trees — in the syllabus by name)
- **Why index:** without it, every lookup = full table scan O(n).
- **Ordered index types:** primary (on ordered key field), clustered (on ordered non-key field), secondary (on unordered field — needs dense index). **Dense** = index entry per record; **sparse** = per block.
- **B-Tree vs B+ Tree (the exam pair):**
  - B-Tree: keys + data pointers at EVERY node.
  - **B+ Tree: data pointers only in LEAVES; leaves are LINKED** → faster range queries, internal nodes are pure signposts → more keys per node → shorter tree. **This is why DBMSs use B+ trees.** Real recalled Q: "data structure for database indexing" → **B-Tree** (B+ family).
- Clustered index = physical row order follows index → **only ONE per table**; non-clustered = separate structure with pointers → many allowed.
- Hash index: O(1) for equality lookup but useless for ranges (no order) — real recalled pattern.

### 7. Transactions & Concurrency
- **ACID:**
  - **A**tomicity — all-or-nothing (ROLLBACK undoes).
  - **C**onsistency — transaction takes DB from one valid state to another.
  - **I**solation — concurrent transactions don't see each other's work.
  - **D**urability — committed survives crashes (via logs/WAL).
  - REMEMBER: *"All Complete Isolated Data persists."*
- **Concurrency problems (memorise the trio):**
  - **Dirty read** — read someone's UNCOMMITTED change.
  - **Non-repeatable read** — same row re-read gives different value (someone UPDATEd).
  - **Phantom read** — re-running a range query returns NEW rows (someone INSERTed).
  - REMEMBER: *"Dirty = uncommitted, non-repeatable = changed, phantom = newborn."*
- **Isolation levels (weakest → strongest):** Read Uncommitted (allows dirty) → Read Committed (stops dirty) → Repeatable Read (stops non-repeatable) → **Serializable** (stops all incl. phantom). Map each problem to the level that fixes it — a favourite MCQ.
- **Serializability:** a schedule is serializable ⟺ conflict-equivalent to some serial schedule → check via **precedence graph** (cycle = NOT serializable — draw it!).
- **Recoverable schedule** (no one commits before everyone they read-uncommitted-from commits) < **cascadeless** (read only committed data) < **strict** (read/write only committed). Strictness order is an MCQ.
- **Locks:** shared (S, read) vs exclusive (X, write). S compatible with S; X with nothing.
- **2PL (two-phase locking):** growing phase (acquire only) → shrinking phase (release only) → guarantees serializability BUT can deadlock. **Strict 2PL** = hold X locks till commit → cascadeless too.
- **Deadlock:** circular wait. Detection: wait-for graph cycle. Timestamp schemes: **wait-die** (older waits, younger dies — non-preemptive) vs **wound-wait** (older kills younger — preemptive). "Wound" = the elder wounds the young.

---

## PART 2 — SQL QUERIES (10% — the most practical section)

### Execution order — the mental model (learn this, every output question becomes easy)
```
FROM (incl. JOINs) → WHERE (filter rows) → GROUP BY → HAVING (filter groups)
→ SELECT (incl. aggregates) → DISTINCT → ORDER BY → LIMIT/OFFSET
```
WHY it matters: WHERE can't use aggregates (groups don't exist yet) → that's why **HAVING exists** — the whole WHERE-vs-HAVING MCQ is this one fact.
REMEMBER: **"Freddie Wore Green Hats, So Dad Ordered Lunch."**

### SELECT & filtering
- `WHERE col IS NULL` — never `= NULL` (NULL = unknown; even NULL=NULL is false → classic trap).
- `BETWEEN a AND b` is INCLUSIVE both ends.
- `LIKE '%x'` any match · `_` exactly one char. `IN (…)` vs `NOT IN` — careful: `NOT IN` with a NULL inside returns nothing!
- `DISTINCT` dedupes rows.

### Joins
| Join | Returns |
|---|---|
| INNER | only matching pairs |
| LEFT [OUTER] | all left rows + matches (NULLs where none) |
| RIGHT [OUTER] | all right rows + matches |
| FULL [OUTER] | all rows both sides |
| CROSS | cartesian product (m×n rows) |
| SELF | table joined to itself (employee–manager) |
| NATURAL | auto-matches same-named columns (drops dup col) |

- **Worked output Q:** LEFT JOIN with 5 left rows, 3 matching → result has **5 rows** (left rows always survive). "How many rows?" questions = count the preserved side.
- Trap: conditions in `ON` vs `WHERE` for outer joins — WHERE on the nullable side converts LEFT JOIN back to INNER (advanced but asked).

### Aggregates & GROUP BY
- `COUNT(*)` counts ALL rows incl. NULLs · `COUNT(col)` skips NULLs · `COUNT(DISTINCT col)` unique non-null — the difference is asked every cycle.
- `SUM`/`AVG`/`MAX`/`MIN` skip NULLs silently.
- Rule: every non-aggregated column in SELECT must be in GROUP BY.
- `WHERE` filters rows BEFORE grouping; `HAVING` filters groups AFTER.
```sql
SELECT dept, COUNT(*) FROM emp
WHERE salary > 30000          -- row filter first
GROUP BY dept
HAVING COUNT(*) > 5;          -- then group filter
```

### Nested queries & set ops
- Subquery in WHERE: `IN` (value list), `EXISTS` (row existence — correlated subqueries reference the outer row), `ANY/SOME` (true if vs ANY member), `ALL`.
- Correlated vs non-correlated: correlated runs once PER OUTER ROW (slow, powerful).
- `UNION` dedupes · `UNION ALL` keeps dupes (faster) · `INTERSECT` common rows · `EXCEPT`/`MINUS` left-minus-right. Columns must match in count and type.
- Classic output trap: `UNION` on 3+3 rows sharing 1 value → 5 rows not 6.
- Scalar subquery in SELECT returns one value per row.

### DML / DDL / DCL / TCL — the classification MCQ
- **DDL** (structure): CREATE, ALTER, DROP, TRUNCATE, RENAME — auto-commit, can't roll back.
- **DML** (data): SELECT (sometimes classed separately as DQL), INSERT, UPDATE, DELETE — transactional, roll-back-able.
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
- **View** = stored query, virtual table (no data). **Materialized view** = stored result, needs refresh (faster reads).
- `WITH CHECK OPTION` — blocks INSERT/UPDATE through the view that would violate the view's WHERE.
- `ALTER` ops: ADD/DROP/MODIFY column. `UPDATE` + `SET` + WHERE (forget WHERE → updates everything!).
- `LIMIT n` / `FETCH FIRST n` / `TOP n` = dialect variants for top-N.
- **Nth highest salary (the classic):** `SELECT DISTINCT sal FROM emp ORDER BY sal DESC LIMIT 1 OFFSET n-1` or correlated `WHERE n-1 = (SELECT COUNT(DISTINCT sal2) FROM emp WHERE sal2 > sal)`.
- **Duplicates:** `GROUP BY col HAVING COUNT(*) > 1`.

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
- Day 3–4: hand-write 15 SQL — joins, group-by/having, nested, nth-highest, duplicates, self-join.
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
