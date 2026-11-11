# Pattern Practice Questions — SEBI IT style

Questions written in the actual SEBI pattern (from PYQ analysis). Work untimed
first, then re-do timed (~48s each). Answers at the bottom — attempt before checking.

## A. Code output / dry run (Programming Concepts — 30% of Paper 2!)

**Q1.** C: What is printed?
```c
void f() { static int i = 0; i++; printf("%d ", i); }
int main() { f(); f(); f(); return 0; }
```
(1) 1 1 1  (2) 1 2 3  (3) 0 1 2  (4) garbage  (5) None

**Q2.** Java: What is printed?
```java
try { int a = 10/0; } catch (ArithmeticException e) { System.out.print("A"); }
finally { System.out.print("F"); }
```
(1) A  (2) F  (3) AF  (4) exception propagates  (5) compile error

**Q3.** Python: `print([x*x for x in range(6) if x % 2])` outputs?
(1) [0,1,4,9,16,25] (2) [1,9,25] (3) [0,4,16] (4) [1,4,9,16,25] (5) error

**Q4.** Python: `s="SEBIGRADE"; print(s[2:6] + s[::-1][:3])` outputs?
(1) BIGEEDA (2) BIGREDA (3) BIGEEDAR (4) BIGEDA (5) BIGEDAR

**Q5.** C: `int a=5; printf("%d %d", a++, ++a);` (assume left-to-right eval)
(1) 5 6 (2) 5 7 (3) 6 7 (4) 6 6 (5) undefined behavior — which is the most precise answer?

## B. SQL (10%)

**Q6.** `emp(id, name, dept, salary)` — which returns the 2nd highest salary?
(1) `SELECT MAX(salary) FROM emp;`
(2) `SELECT MAX(salary) FROM emp WHERE salary < (SELECT MAX(salary) FROM emp);`
(3) `SELECT salary FROM emp ORDER BY salary LIMIT 1;`
(4) `SELECT TOP 2 salary FROM emp;`  (5) None

**Q7.** `SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5` — HAVING filters:
(1) rows before grouping (2) groups after aggregation (3) duplicates only (4) NULLs (5) join results

**Q8.** DELETE vs TRUNCATE: which is TRUE?
(1) DELETE removes schema (2) TRUNCATE can use WHERE (3) DELETE is DDL
(4) TRUNCATE removes all rows, resets identity (5) both identical

## C. DBMS concepts (10%)

**Q9.** R(A,B,C,D), FDs: A→B, B→C, C→D. Candidate key?
(1) A (2) B (3) C (4) D (5) AB

**Q10.** BCNF requires:
(1) no partial dependency (2) no transitive dependency (3) every determinant is a superkey
(4) atomic values only (5) 2NF + unique PK

**Q11.** Dirty read occurs when a transaction reads:
(1) committed data twice (2) uncommitted data of another txn (3) phantom rows (4) locked rows (5) its own writes

## D. Python / Data Analytics (10%)

**Q12.** `re.findall(r"\d+", "a1b22c333")` returns?
(1) ['a','b','c'] (2) ['1','22','333'] (3) [1,22,333] (4) '123' (5) error

**Q13.** pandas: `df.iloc[0, 1]` selects by:
(1) labels (2) integer positions (3) column name only (4) index name (5) regex

**Q14.** `with open("f.txt","a") as f:` mode "a" means:
(1) read only (2) overwrite (3) append, create if missing (4) read+write truncate (5) binary

## E. Algorithms (10%)

**Q15.** Stable sort among these:
(1) quick sort (2) heap sort (3) merge sort (4) selection sort (5) none

**Q16.** BFS uses which DS?
(1) stack (2) queue (3) heap (4) tree (5) hash table

**Q17.** 0/1 knapsack is solved optimally by:
(1) greedy (2) divide & conquer (3) dynamic programming (4) backtracking only (5) BFS

## F. Networks (10%)

**Q18.** Router operates at which OSI layer?
(1) 1 (2) 2 (3) 3 (4) 4 (5) 7

**Q19.** Which protocol uses UDP?
(1) HTTP (2) FTP (3) DNS (4) SMTP (5) SSH

**Q20.** 192.168.1.0/26 — usable hosts?
(1) 64 (2) 62 (3) 32 (4) 30 (5) 126

## G. Security (10%)

**Q21.** "Attacker relays messages between two parties who believe they talk directly" =
(1) phishing (2) MITM (3) replay (4) XSS (5) CSRF

**Q22.** Digital signature provides primarily:
(1) confidentiality (2) integrity + non-repudiation (3) availability (4) anonymity (5) compression

**Q23.** Defense against SQL injection:
(1) HTTPS (2) parameterized queries (3) firewall (4) CAPTCHA (5) patching OS

## H. Data Warehouse + Shell (10%)

**Q24.** "Fixed single dimension showing one slice of the cube" OLAP op =
(1) dice (2) slice (3) roll-up (4) pivot (5) drill-down

**Q25.** Star schema has:
(1) normalized dims (2) denormalized dims around one fact table (3) multiple fact tables only
(4) no fact table (5) only metadata

**Q26.** In shell, `$?` after a command returns:
(1) PID (2) arg count (3) exit status (4) last arg (5) script name

## I. Phase-2-style dry run / debugging (MCQ format per 2026 pattern)

**Q27.** Dry run: `for(i=1;i<=3;i++){ for(j=1;j<=i;j++) printf("*"); }` prints how many `*`?
(1) 3 (2) 6 (3) 9 (4) 5 (5) 4

**Q28.** Debug: `int sum(int a[], int n){ int s; for(i=0;i<n;i++) s+=a[i]; return s; }` — bug?
(1) loop bound wrong (2) `s` uninitialized (3) missing return type (4) a[] should be *a (5) no bug

**Q29.** Logic flow: to find MAX of array, the missing condition `if(___) max=a[i];` is:
(1) a[i] < max (2) a[i] > max (3) a[i] == max (4) a[i] != max (5) i > max

**Q30.** Dry run: `x=0; while(x<100){x=x+40;} print(x)` outputs?
(1) 100 (2) 120 (3) 80 (4) 40 (5) infinite

---

## Answer key
1-(2) static persists · 2-(3) catch then finally · 3-(2) odd x only · 4-(2) s[2:6]="BIGR", s[::-1][:3]="EDA" → "BIGREDA" · 5-(5) UB (sequence point) — SEBI accepts UB as answer when offered · 6-(2) · 7-(2) · 8-(4) · 9-(1) A+ = {A,B,C,D} · 10-(3) · 11-(2) · 12-(2) findall returns strings · 13-(2) · 14-(3) · 15-(3) · 16-(2) · 17-(3) · 18-(3) · 19-(3) DNS uses UDP · 20-(2) · 21-(2) · 22-(2) · 23-(2) · 24-(2) · 25-(2) · 26-(3) · 27-(2) 1+2+3=6 · 28-(2) · 29-(2) · 30-(2) 0→40→80→120

Score: ___/30. Under 20 → redo the corresponding Notes.md sections before topic tests.
