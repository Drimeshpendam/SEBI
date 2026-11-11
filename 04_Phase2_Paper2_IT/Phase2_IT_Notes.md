# Phase 2 Paper 2 — IT Mains Notes

Official weightage: **Data Structures 40% | Algorithms 30% | OOP 20% | String Manipulation 10%**

Format (Feb-2026 notification): MCQs — logic flow completion, program dry-run
outputs, debugging, syntax understanding, data analysis. 100 marks, 180 min, 40% cutoff.
Older format (≤2024) was a descriptive coding test — keep light coding practice as insurance.

Depth level: everything in `02_Phase1_Paper2_IT/` PLUS the below. Phase 2 assumes
Phase 1 notes are already solid — these are the "second layer" topics.

## 1. Data Structures (40% — the core of this paper)

### Must be able to trace by hand
- Linked list: reverse (iterative+recursive), detect/return cycle start, merge 2 sorted, remove nth-from-end, palindrome check, middle node — know the pointer dance cold
- Stacks/queues: 2-stack queue, 2-queue stack, min-stack (O(1) getMin), balanced parens variants, next-greater-element (monotonic stack)
- Trees: build from inorder+preorder/postorder, level-order via queue, LCA in BST and binary tree, diameter, height-balanced check, kth smallest in BST (inorder count), mirror/invert
- BST: insert+delete trace, floor/ceil, validate BST (min/max bounds — NOT just parent check)
- Heaps: heapify trace, extract-max sequence, kth largest/smallest, merge k sorted lists concept, median of stream (two heaps)
- AVL: insert a sequence and name each rotation (LL/RR/LR/RL) — SEBI loves AVL insert traces
- Hashing: collision-resolution trace (linear/quadratic probing, chaining), first non-repeating char
- Tries: insert/search, autocomplete concept
- Graph DS adjacency list vs matrix: when which, BFS/DFS output order given a graph, topo sort output, connected components count

### Dry-run hotspots
- Recursion into trees (print order of calls), pointer updates in LL code, in-place array ops (rotate, dedupe, two-pointer)
- Postfix/prefix conversions, infix→both directions
- Sorting trace: state of array after k passes of selection/bubble/insertion; quicksort partition result

## 2. Algorithms (30%)

- Sorting internals (not just table): partition step trace, merge step, counting/radix passes
- Searching variants: binary search on rotated array, first/last occurrence, peak element
- **DP patterns** (know the recurrence for each): fibonacci (2024 PYQ!), climbing stairs, coin change (min coins + count ways), 0/1 knapsack, LCS, LIS, edit distance, matrix chain (concept), subset sum — practice filling the DP table by hand
- Greedy: activity selection, fractional knapsack, Huffman codes, job sequencing — and know WHEN greedy fails (0/1 knapsack counterexample)
- D&C: binary search, merge/quick sort, max-subarray (Kadane is also DP — know both), Strassen concept
- Backtracking: N-queens placements, subsets/permutations generation order, sudoku logic
- Graph algos: BFS/DFS, topo sort (Kahn + DFS), Dijkstra trace (table of distances), Bellman-Ford vs Dijkstra, Prim vs Kruskal trace, union-find operations
- String algos: KMP prefix table, Rabin-Karp hashing idea, naive pattern match complexity
- Complexity: recurrences via Master theorem, amortized analysis basics

## 3. OOP (20%)

- Beyond definitions: predict behavior — virtual function dispatch (C++ vtable vs Java dynamic dispatch), constructor call order in inheritance chains (base→derived), destructor order
- Overloading resolution: which method called for `f(int)` vs `f(double)` vs `f(long)`; default args; ambiguity errors
- Abstract class vs interface deep: Java 8 default/static interface methods, diamond problem, `super()` chaining
- Copy semantics: shallow vs deep copy, copy constructor, C++ rule of three
- Access specifiers table (C++ vs Java), `final`/`finally`/`finalize`, static binding vs dynamic binding
- Design-level: singleton implementation, composition vs inheritance ("prefer composition"), SOLID basics (know each letter + 1-line meaning)

## 4. String Manipulation (10%)

- C: `strlen/strcpy/strcat/strcmp/strncpy/strchr/strstr` — return values & edge cases; `strcmp` sign convention
- Java: immutability traps, `StringBuilder` methods, `equals` vs `==` vs `compareTo`, `split/join/substring/charAt`, `String.format`
- Python: slicing idioms, `split/join/replace/find/count`, `strip`, f-strings
- Common problems: reverse words in sentence, palindrome variants, anagram check (count array), longest common prefix, remove duplicates, run-length encode
- Regex in code: validation problems (email, phone), find/replace semantics

## 5. Dry-run / debug technique (the 2026 MCQ format)

- **Dry run**: build a variable-state table per iteration — write it, don't do it in your head. Options usually include off-by-one answers.
- **Debug questions**: look for the classic bug family first — uninitialized var, wrong loop bound (`<=` vs `<`), missing break in switch, `=` vs `==` in condition, integer division, shadowed variable, missing return, pointer/reference misuse.
- **Logic flow completion**: read the 3 lines around the blank — variable usage usually pins it down; check the "else" side too.
- **Output of recursive functions**: draw the call tree; note print placement (before/after recursive call).

## Where Phase 1 notes end vs where this starts
Phase 1 = "what is it + simple trace". Phase 2 = "multi-step trace, bug hunt,
produce code/logic yourself". Drill `Practice_Questions.md` weekly from Day 29 on.

---

## Worked Examples — mains-level solves (the 2026 MCQ format)

**Ex 1 — AVL insert trace.** Insert 30, 20, 10 into an empty AVL tree — which rotation fixes it?
**Solve:** 30 root; 20 goes left; 10 goes left-of-20 → left-left chain, balance factor +2 at 30 → **single right rotation (LL case)** → 20 becomes root, 10 left, 30 right. Continue inserting and name each rotation — SEBI asks "after inserting X, which rotation occurred?"

**Ex 2 — DP table by hand.** Fibonacci with memoization — what does the table hold at fib(5)?
**Solve:** fill bottom-up: f(0)=0, f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5 → **5.** Recurrence f(n)=f(n-1)+f(n-2). This was a literal 2024 PYQ — DP questions at mains are recurrence + table-fill, not theory.

**Ex 3 — dry-run with state table.** `int s=0; for(i=1;i<=4;i++) s+=i*i; printf(s);`
**Solve:** i:1→s=1, i:2→s=5, i:3→s=14, i:4→s=30 → **30.** Write the table; options will include 28/32 (off-by-one bait).

**Ex 4 — quicksort partition result.** Array [8,3,7,1,5] pivot=last(5), one Lomuto partition — array after?
**Solve:** scan placing elements ≤5 left of pivot slot: swap 3 forward, then 1 → [3,1,8,7,5] → swap pivot into place → **[3,1,5,8,7].** "Array state after k partitions/passes" is a recurring mains format.

**Ex 5 — bug hunt.** `for(i=0;i<=n;i++) sum+=a[i];` on an n-element array — what's wrong?
**Ans: `<=` should be `<`** — reads one past the end (a[n]). The debug family: off-by-one bounds, `=` vs `==`, missing `break`, uninitialized var, integer division `5/2=2`.

**Ex 6 — overload resolution.** `f(int)` and `f(double)` exist; call `f(5)` vs `f(5.0)` vs `f(5L)`.
**Ans: int version / double version / double version** (long widens to double — no long overload). Compile-time matching by declared arg types — don't confuse with runtime dispatch.

**Ex 7 — recursion trace.** `void f(int n){ if(n==0)return; print(n); f(n-1); print(n);} f(3)` — output?
**Solve:** descend printing 3,2,1 → hit n=0 → ascend printing 1,2,3 → **3 2 1 1 2 3.** Print placement before vs after the recursive call is the whole game — draw the call tree.

**Ex 8 — Dijkstra trace.** Graph A→B(4), A→C(1), C→B(2), B→D(1), C→D(5). Shortest A→D?
**Solve:** dist[C]=1 first; relax C→B: 1+2=3 <4 update; relax C→D: 1+5=6. Then B: B→D = 3+1=**4.** Trace the table — greedy picks smallest unvisited each round; never revisit.
