# Data Analytics (Python/R) + Shell + Data Warehousing — Full Study Notes (20% combined)

> **Official weightage:** Data Analytics Languages (Python/R) 10% · Data Warehousing 5% · Shell Programming 5%. Together = **a fifth of Paper 2** — and it was missing from early prep plans, so most candidates lose these marks.
>
> **How SEBI tests it (real recalled):** Python slicing `abc[1:4]`, slicing time complexity O(k), triple-quoted multiline strings, `__init__`, `json.dumps()` returns `str`, pandas/DataFrame basics, shell variables, OLAP operations, star schema.

---

# PART A — PYTHON (the bulk of the 10%)

## 1. Core data types — the recall table
| Type | Ordered? | Mutable? | Syntax | Use |
|---|---|---|---|---|
| `list` | yes | yes | `[1,2,3]` | general sequences |
| `tuple` | yes | **no** | `(1,2,3)` | fixed records, dict keys |
| `dict` | yes (insertion order, Py3.7+) | yes | `{'k':v}` | key→value maps |
| `set` | no | yes | `{1,2,3}` | unique members, fast membership |
| `str` | yes | **no** | `'abc'` | text |
| `frozenset` | no | **no** | `frozenset()` | hashable set |

- REMEMBER mutability: **"Lists change, tuples stay."** Strings/tuples/frozensets are immutable — that's why `s[0]='x'` errors but `l[0]='x'` works (classic MCQ).
- dict keys must be hashable (immutable) → lists can't be keys, tuples can.

## 2. Slicing — SEBI's favourite Python question
`s[start:stop:step]` — **stop is EXCLUSIVE** (the one fact that decides most slicing MCQs).
```python
s = 'abcdef'
s[1:4]   → 'bcd'      # real recalled Q
s[:3]    → 'abc'
s[::2]   → 'ace'      # step
s[::-1]  → 'fedcba'   # reverse trick — memorise
s[-1]    → 'f'        # negative = from right
```
- Slicing a list of size k → **O(k)** time (real recalled Q — it copies).
- Multiline strings use **triple quotes `'''` or `"""`** (real recalled Q).

## 3. Comprehensions, dicts, sets
- `[x*x for x in range(5)]` → `[0,1,4,9,16]`; with filter `[x for x in l if x%2==0]`.
- dict comprehension `{k:v for ...}`; set comprehension `{...}`.
- dict methods: `.keys() .values() .items() .get(k, default) .pop(k)`; `d['k']=v` adds/updates.
- set ops: `|` union, `&` intersection, `-` difference, `^` symmetric diff; `.add() .remove()`; dedupe trick `list(set(l))`.

## 4. Functions, classes, files
- `def f(a, *args, **kwargs)` — args = extra positionals (tuple), kwargs = keyword dict.
- `lambda x: x*2` — anonymous one-liners; used with `map/filter/sorted(key=...)`.
- `map(f, l)` applies f; `filter(f, l)` keeps True; `zip(l1,l2)` pairs up.
- Class: `__init__` = constructor (real Q), `self` = the instance (explicit in Python). Child overrides parent method → child's version runs (real Q).
- File I/O: `with open('f.txt','r') as f:` — modes `r w a r+ rb wb`; `read() readline() readlines()`; `with` auto-closes (why it's preferred — MCQ).
- `json.dumps(obj)` → **str** (real Q); `json.loads(str)` → Python object. dumps = "dump to String".

## 5. pandas & data (the "data analytics" part)
- `pd.DataFrame(d)` = table; `pd.Series` = one column.
- Read/write: `pd.read_csv() .to_csv() .read_excel() .read_json()` — import/export is a syllabus line.
- Selection: `df['col']`, `df.loc[row_label, col]` (label-based), `df.iloc[0:5, 1:3]` (position-based — real distinction).
- Reshaping: `.groupby().agg() .pivot() .melt() .merge() .concat() .sort_values() .dropna() .fillna()` — "data reshaping" is a syllabus keyword; know these names.
- `.head() .describe() .value_counts() .shape .dtypes` — inspection basics.
- Charts: `matplotlib.pyplot` → `plt.plot() .bar() .hist() .scatter() .show()`; seaborn wraps it prettier. (Syllabus: "charts and graphs" — name-level.)

## 6. R (lighter coverage — a few Qs possible)
- Vectors `c(1,2,3)`, lists, `data.frame`, factors; `<-` assignment; `sapply/lapply`; `ggplot2` for charts; `dplyr` (`filter() select() mutate() group_by() summarise()`); `read.csv()`. Know names + what they do.

## 7. Regex (syllabus line — know the symbols)
| Symbol | Meaning | Symbol | Meaning |
|---|---|---|---|
| `.` | any char | `\d` `\w` `\s` | digit / word char / space |
| `*` `+` `?` | 0+ / 1+ / 0-or-1 | `^` `$` | start / end |
| `[abc]` `[^abc]` | set / not-set | `{n,m}` | repeat range |
| `()` | group | `|` | or |

- Python: `re.search() .match() .findall() .sub()`; match = from string start only, search = anywhere (asked difference).

---

# PART B — DATA WAREHOUSING (5%)

## Core concepts
- **Data warehouse** = central store of integrated, historical, non-volatile data for ANALYSIS. **OLAP** (online analytical processing — reads, aggregates) vs **OLTP** (online transaction processing — daily operations, writes). THE comparison MCQ:
  | OLTP | OLAP |
  |---|---|
  | current data, small transactions | historical, complex analysis |
  | normalized, many small writes | denormalized, bulk reads |
  | fast single-row ops | aggregations over millions |
- **ETL** = Extract → Transform → Load (data in, cleaned, into DW). ELT = load first, transform inside (modern cloud). Order is the MCQ.
- **Data mart** = smaller, subject-specific slice of the DW (sales mart, HR mart) — "DW for a department".
- **Metadata** = data about the data (schemas, lineage, definitions) — literally a syllabus keyword.

## Schemas — the diagram questions
- **Star schema:** one central FACT table (measures: sales, amounts) surrounded by DIMENSION tables (who/what/when/where) — looks like a star. Denormalized, fast joins.
- **Snowflake schema:** dimensions further normalized into sub-tables — "snowflake" branches. Saves space, more joins.
- REMEMBER: *"Star = flat dimensions around the fact; snowflake = the points of the star split further."*

## Data cube & OLAP operations (recalled pattern — know all five)
- **Data cube** = multidimensional view (e.g., sales by product × region × time).
- **Roll-up** — zoom OUT, aggregate to coarser level (city → country).
- **Drill-down** — zoom IN, finer detail (year → quarter).
- **Slice** — fix ONE dimension (sales where year=2024) → cuts a "slice" off the cube.
- **Dice** — fix MULTIPLE dimensions (year=2024 AND region=West) → sub-cube.
- **Pivot/rotate** — swap rows↔columns, change viewpoint.
- REMEMBER: *"Roll-up climbs the hierarchy, drill-down digs into it, slice picks one layer, dice picks a box."*

## Data models & misc
- Fact table = numeric measures + FKs; dimension = descriptive context.
- Slowly Changing Dimensions (SCD) Type 1 (overwrite) vs Type 2 (keep history, new row) vs Type 3 (extra column) — occasional MCQ.
- Data cleaning (handle missing/dupes/outliers), transformation (formats, aggregations), loading (full vs incremental) — the ETL sub-steps are the syllabus itself.

---

# PART C — SHELL PROGRAMMING (5%)

## Essentials — the likely-asked lines
- Shebang `#!/bin/bash` — first line, tells OS which interpreter.
- Variables: `x=10` (NO spaces around `=` — classic trap); use it as `$x` or `${x}`.
- `echo $x` prints. `read name` takes input. `$0` script name, `$1 $2…` arguments, `$#` arg count, `$?` last exit code (0=success — MCQ fact), `$$` PID, `$@` all args.
- Command substitution: `$(cmd)` or backticks — captures output into a variable.
- Quotes: `"$x"` expands variables; `'$x'` literal (no expansion — the difference is asked).
- Conditionals: `if [ "$x" -gt 5 ]; then … fi` — numeric compares: `-eq -ne -lt -le -gt -ge`; string compares `= != -z`(empty) `-n`; file tests `-f -d -e -r -w -x`.
- Loops: `for i in 1 2 3; do … done` · `while [ cond ]; do … done` · `until`.
- `expr` or `$(( ))` for arithmetic: `sum=$((a + b))`.
- **grep** finds patterns · `sed` edits streams (`sed 's/old/new/'`) · `awk` field processing (`awk '{print $1}'`) · `cut -d: -f1` columns · `sort` `uniq -c` `wc -l` — the core toolset, know each one's job.
- Pipes `|` chain stdout→stdin; `>` overwrite redirect, `>>` append, `2>` errors, `<` input.
- Permissions: `chmod 755 file` → rwx r-x r-x (owner/group/other = 4+2+1 bits — `chmod 644` = rw-r--r--; octal math is the MCQ).
- `cron` schedules; `ps` processes; `kill` signals; `top` monitor; `df`/`du` disk; `find` search; `env`/`export` env vars (`export PATH` — child shells inherit).

## Tiny script archetypes they test
- Sum 1..n loop, file-exists check `[-f name]`, word count `wc -w`, print args `$@`.
- "What does `echo $?` show after success?" → **0**.

---

## Real recalled cross-topic Qs (in this file's scope)
- Python slice `abc[1:4]` → `'bcd'` · slicing O(k) · triple-quote multiline · `__init__` · child method wins · `json.dumps()` → `str`.
- B-Tree for DB indexing (DBMS notes), adjacency matrix for dense graphs (DSA notes) — mains mixes topics; revise all tables together.

## Drills (Day 26)
- Python: trace 15 slicing/dict/comprehension snippets; write json + file + pandas snippets by hand.
- DW: draw star vs snowflake from memory; drill the 5 OLAP ops.
- Shell: memorize variable/`$?`/permission/loop basics + what grep/sed/awk each do.
- Testbook chapter tests: "Data Analytics" + "Shell Programming" + "Data Warehousing".

---

## Worked Examples — 10 solved in exam pattern

**Ex 1 — Python slicing.** `s = "PROGRAM"; s[1:4]`, `s[::2]`, `s[::-1]`?
**Ans: `ROG`, `PORM`, `MARGORP`.** slice = [start:stop:step]; stop is EXCLUDED. `::-1` = reversed — the classic "reverse a string" answer.

**Ex 2 — list comprehension.** `[x*x for x in range(5) if x % 2]`?
**Ans: `[1, 9]`.** range(5)=0..4; odd x only (x%2 is truthy) → 1² and 3².

**Ex 3 — mutability trap.** `t = (1, 2, 3); t[0] = 9` — what happens?
**Ans: TypeError — tuples are immutable.** Lists mutate, tuples and strings don't. "Which is immutable?" is the recurring MCQ.

**Ex 4 — pandas.** `df[df['sal'] > 50000]['name']` — what does it return?
**Ans: names of rows where sal > 50000.** Boolean filter inside brackets; second bracket picks the column. `groupby('dept')['sal'].mean()` = average salary per department — the workhorse pattern.

**Ex 5 — shell variables.** `echo $?` after a successful command? What are `$0`, `$1`, `$#`?
**Ans: 0 (exit status — 0 = success, non-zero = failed); script name; first argument; argument count.** `$?` is THE most-asked shell variable.

**Ex 6 — right command for the job.** "Print only the 2nd column of a file / replace 'old' with 'new' / find lines containing ERROR."
**Ans: `awk '{print $2}'` / `sed 's/old/new/'` / `grep ERROR`.** awk=columns, sed=substitute, grep=find lines.

**Ex 7 — OLAP operation.** "Analyst zooms from yearly sales → quarterly → monthly" vs "pulls out just the Electronics category" vs "swaps rows and columns."
**Ans: drill-down / slice / pivot (rotate).** Up = roll-up (aggregate), down = drill-down (detail), slice = one dimension fixed, dice = sub-cube, pivot = rotate view.

**Ex 8 — star vs snowflake.** "Dim tables further normalized into sub-tables — which schema? Denormalized single-level dims — which?"
**Ans: snowflake / star.** Star = denormalized (fewer joins, more storage); snowflake = normalized (saves space, more joins).

**Ex 9 — ETL order.** "Data pulled from sources, cleaned & converted, stored in warehouse — name the stages."
**Ans: Extract → Transform → Load.** A data MART = smaller warehouse for one department (subset of warehouse — direction gets tested).

**Ex 10 — regex.** `^[0-9]+$` — what does it match?
**Ans: strings that are entirely digits.** `^`=start, `[0-9]`=digit class, `+`=one or more, `$`=end. `.*` = anything.
