# Data Analytics (Python/R) + Shell + Data Warehousing — Full Study Notes (20% combined)

> **Official weightage:** Data Analytics Languages (Python/R) 10% · Data Warehousing 5% · Shell Programming 5%. Together = **a fifth of Paper 2** — and most candidates skip it, so these are cheap marks for you.
>
> **How SEBI tests it (real recalled):** Python slicing `abc[1:4]`, slicing time complexity O(k), triple-quoted multiline strings, `__init__`, `json.dumps()` returns `str`, pandas/DataFrame basics, shell variables, OLAP operations, star schema.

**How to read:** every snippet below can be traced by hand — do it. Python questions are output-prediction: you only learn them by executing the code mentally line by line.

---

# PART A — PYTHON (the bulk of the 10%)

## 1. Core data types — the recall table

**Plain words:** Python gives you four built-in containers. The only questions that matter: *can you change it after creation (mutable)?* and *does it remember order?*

| Type | Ordered? | Mutable? | Syntax | Use |
|---|---|---|---|---|
| `list` | yes | yes | `[1,2,3]` | general sequences |
| `tuple` | yes | **no** | `(1,2,3)` | fixed records, dict keys |
| `dict` | yes (insertion order, Py3.7+) | yes | `{'k':v}` | key→value maps |
| `set` | no | yes | `{1,2,3}` | unique members, fast membership |
| `str` | yes | **no** | `'abc'` | text |
| `frozenset` | no | **no** | `frozenset()` | hashable set |

- **See the mutability rule in action:**
  ```python
  l = [1, 2, 3];  l[0] = 9   # works → [9, 2, 3]
  t = (1, 2, 3);  t[0] = 9   # TypeError — tuples can't change
  s = 'abc';      s[0] = 'x' # TypeError — strings can't change either
  ```
- REMEMBER: **"Lists change, tuples stay."** That's why `s[0]='x'` errors but `l[0]='x'` works — the classic MCQ.
- dict keys must be *hashable* (immutable) → lists can't be keys, tuples can. `d[['a']] = 1` → TypeError.

## 2. Slicing — SEBI's favourite Python question

**Plain words:** `s[start:stop:step]` cuts a piece of a sequence. Two facts decide every MCQ: indexes start at **0**, and **stop is EXCLUSIVE** — `s[1:4]` grabs positions 1, 2, 3 (never 4).

```python
s = 'abcdef'
#      012345   ← index positions
s[1:4]   → 'bcd'      # real recalled Q — positions 1,2,3
s[:3]    → 'abc'      # empty start = from the beginning
s[::2]   → 'ace'      # every 2nd char
s[::-1]  → 'fedcba'   # negative step = walk backwards → REVERSE (memorise)
s[-1]    → 'f'        # negative index = count from the right
```
- Slicing a list of size k → **O(k)** time (it copies the elements — real recalled Q).
- Multiline strings use **triple quotes `'''` or `"""`** (real recalled Q) — regular quotes can't span lines.

## 3. Comprehensions, dicts, sets

**Plain words:** a comprehension is a one-line for-loop that builds a container. Read `[x*x for x in range(5)]` as "square each x in 0..4" → `[0,1,4,9,16]`.
- With a filter: `[x for x in l if x%2==0]` = "keep only evens" — the `if` acts as a gate.
- dict version `{k: v for ...}`, set version `{...}` (same braces as dict but no colon).
- dict methods: `.keys() .values() .items() .get(k, default)` (safe lookup — no error if missing) `.pop(k)`; `d['k']=v` adds or updates.
- set ops: `|` union, `&` intersection, `-` difference, `^` symmetric difference; `.add() .remove()`; dedupe trick `list(set(l))`.

## 4. Functions, classes, files

- `def f(a, *args, **kwargs)` — `*args` scoops extra positional args into a tuple, `**kwargs` scoops keyword args into a dict. `f(1,2,3,x=4)` → args=(2,3), kwargs={'x':4}.
- `lambda x: x*2` — a one-line anonymous function; used inside `map/filter/sorted(key=...)`.
- `map(f, l)` applies f to everything · `filter(f, l)` keeps items where f is True · `zip(l1, l2)` pairs elements.
- **Classes:** `__init__` = the constructor — runs automatically when you create an object (real Q). `self` = "this object" — Python makes you write it explicitly. A child class that redefines a parent's method → **the child's version wins** (real Q — overriding).
- File I/O: `with open('f.txt','r') as f:` — modes `r w a r+ rb wb`; `read() readline() readlines()`; `with` auto-closes the file even on error — *that's the "why `with`?" MCQ answer*.
- `json.dumps(obj)` → **str** (real Q); `json.loads(str)` → Python object. REMEMBER: dumps = "dump to String".

## 5. pandas & data (the "data analytics" part)

**Plain words:** a `DataFrame` = an Excel table in code (rows × labeled columns). A `Series` = a single column.

- Read/write: `pd.read_csv() .to_csv() .read_excel() .read_json()` — "importing and exporting data" is a syllabus line.
- **Selection — the loc/iloc distinction (asked):** `df['col']` picks a column; `df.loc[row_label, 'col']` selects by LABELS; `df.iloc[0:5, 1:3]` selects by POSITIONS (like slicing). loc = label, iloc = integer index.
- Filtering: `df[df['sal'] > 50000]` keeps rows where the condition is True — a boolean mask.
- Reshaping (syllabus keyword): `.groupby().agg() .pivot() .melt() .merge() .concat() .sort_values() .dropna() .fillna()` — know each name's job.
- Inspection: `.head() .describe() .value_counts() .shape .dtypes`.
- Charts: `matplotlib.pyplot` → `plt.plot() .bar() .hist() .scatter() .show()`; seaborn wraps it prettier (name-level).

## 6. R (lighter coverage — a few Qs possible)
- Vectors `c(1,2,3)`, `data.frame`, factors; `<-` is the assignment arrow; `sapply/lapply` apply functions; `ggplot2` for charts; `dplyr` verbs (`filter() select() mutate() group_by() summarise()`); `read.csv()`. Names + what each does is enough.

## 7. Regex (syllabus line — know the symbols)

**Plain words:** regex = a pattern language for matching text. `^[0-9]+$` reads as: start `^`, digit `[0-9]`, one-or-more `+`, end `$` → "the whole string is digits only."

| Symbol | Meaning | Symbol | Meaning |
|---|---|---|---|
| `.` | any char | `\d` `\w` `\s` | digit / word char / space |
| `*` `+` `?` | 0+ / 1+ / 0-or-1 | `^` `$` | start / end |
| `[abc]` `[^abc]` | set / NOT-set | `{n,m}` | repeat range |
| `()` | group | `|` | or |

- Python: `re.match()` tries matching ONLY at string start; `re.search()` scans anywhere (the asked difference); `re.findall()` returns all matches; `re.sub()` replaces.

---

# PART B — DATA WAREHOUSING (5%)

## Core concepts

**Plain words:** your daily systems (OLTP) record transactions one-by-one — fast, small, current. A **data warehouse** is a separate giant library where all that data gets dumped, cleaned, and organized for ANALYSIS — big slow questions over years of history. That's **OLAP**.

| OLTP | OLAP |
|---|---|
| current data, small transactions | historical, complex analysis |
| normalized, many small writes | denormalized, bulk reads |
| fast single-row ops (a withdrawal) | aggregations over millions (yearly trends) |

- **ETL** = Extract → Transform → Load — pull data out, clean/shape it, store it in the warehouse. **ELT** = load first, transform inside (modern cloud style). The ORDER is the MCQ.
- **Data mart** = a smaller warehouse for ONE subject/department (sales mart, HR mart) — "DW for a department." Direction gets tested: mart ⊂ warehouse.
- **Metadata** = data about data (schemas, definitions, lineage) — literally a syllabus keyword.

## Schemas — the diagram questions

**Plain words:** a warehouse stores business events in a **FACT** table (numbers: sales amount, qty) and the context in **DIMENSION** tables (who/what/when/where: product, store, date).

- **Star schema:** one central fact table with dimensions DIRECTLY attached — looks like a star. Dimensions stay denormalized (wide) → fewer joins, faster.
- **Snowflake schema:** dimensions split further into sub-tables (product → category → department) — the star's "points" branch. Saves space, costs more joins.
- REMEMBER: *"Star = flat dimensions around the fact; snowflake = the points of the star split further."*

## Data cube & OLAP operations (recalled pattern — know all five)

**Plain words:** picture sales data as a 3-D cube — product × region × time. Every OLAP operation is just a way of looking at the cube:

- **Roll-up** — zoom OUT to coarser level (city → country, month → year) — climb the hierarchy, more aggregation.
- **Drill-down** — zoom IN to finer detail (year → quarter → month) — the opposite.
- **Slice** — fix ONE dimension (sales where year=2024) → cut one "slice" off the cube.
- **Dice** — fix MULTIPLE dimensions (year=2024 AND region=West) → a smaller sub-cube.
- **Pivot/rotate** — swap rows↔columns — same data, different viewpoint.
- REMEMBER: *"Roll-up climbs the hierarchy, drill-down digs into it, slice picks one layer, dice picks a box."*

## Data models & misc
- Fact table = numeric measures + foreign keys; dimension = descriptive context.
- **Slowly Changing Dimensions (SCD):** how to handle a customer's changed city — Type 1 overwrites (no history), Type 2 adds a new row (full history), Type 3 adds a column (last value only). Occasional MCQ.
- Data cleaning (missing/dupes/outliers), transformation (formats, aggregations), loading (full vs incremental) — the ETL sub-steps are the syllabus itself.

---

# PART C — SHELL PROGRAMMING (5%)

## Essentials — the likely-asked lines

**Plain words:** a shell script is a text file of terminal commands run top-to-bottom. The odd bits exams probe are its special variables and quoting rules.

- **Shebang** `#!/bin/bash` — first line, tells the OS which interpreter to use.
- Variables: `x=10` — **NO spaces around `=`** (`x = 10` fails — classic trap); use it as `$x` or `${x}`.
- Special variables (memorise the set): `$0` script name · `$1 $2…` arguments · `$#` arg count · **`$?` last command's exit code — 0 = success** (THE most-asked) · `$$` PID · `$@` all args.
- Command substitution `$(cmd)` or backticks — runs a command and captures its output into a variable: `files=$(ls)`.
- **Quotes:** `"$x"` expands the variable; `'$x'` prints the literal text `$x` — the difference is asked.
- Conditionals: `if [ "$x" -gt 5 ]; then … fi` — numeric compares use FLAGS: `-eq -ne -lt -le -gt -ge`; string compares `= != -z`(empty) `-n`; file tests `-f -d -e -r -w -x`.
- Loops: `for i in 1 2 3; do … done` · `while [ cond ]; do … done` · `until`.
- Arithmetic: `$((a + b))` or `expr`.
- **The core toolset — know each one's job:** `grep` finds matching LINES · `sed` edits streams (`sed 's/old/new/'` substitutes) · `awk` processes COLUMNS (`awk '{print $1}'`) · `cut -d: -f1` cuts fields · `sort` `uniq -c` `wc -l` count/sort. *One-line rule: grep=find lines, sed=substitute text, awk=pick columns.*
- **Pipes `|`** chain stdout→stdin — an assembly line: `cat log | grep ERROR | wc -l` = "how many ERROR lines". `>` overwrite · `>>` append · `2>` redirect errors · `<` input.
- Permissions: `chmod 755` → rwx r-x r-x (r=4, w=2, x=1 summed per owner/group/other); `chmod 644` = rw-r--r--; octal math is the MCQ. (Full detail in the OS notes.)
- `cron` schedules jobs; `export VAR` makes a variable visible to child shells.

## Tiny script archetypes they test
- Sum 1..n loop, file-exists check `[ -f name ]`, word count `wc -w`, print args `$@`.
- "What does `echo $?` show after a successful command?" → **0**.

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
**Ans: `[1, 9]`.** range(5)=0..4; odd x only (x%2 is truthy → keeps 1 and 3) → 1² and 3².

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
