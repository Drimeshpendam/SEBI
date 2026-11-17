# Data Structures & Algorithms — Full Study Notes (10% Paper 2 · ~55% of Mains PYQs)

> **Official syllabus (Paper 2):** tree & graph traversals · connected components · spanning trees · shortest paths · hashing · sorting · searching · design techniques (greedy, DP, divide-and-conquer).
>
> **Why this file is huge:** it's only 10% of Phase-1 Paper 2, but memory-based Mains PYQs show **~55% of Phase-2 IT questions come from here** (sorting, trees, graphs, hashing). Every hour spent here pays twice — once in Phase 1, again in Phase 2 where it's 2/3 of your final score.

## 📅 DAY MAP — which sections match your plan day

| Plan day | Target | Read these sections | Then do |
|---|---|---|---|
| **D29** | arrays/strings, stack/queue/LL + infix→postfix | Part 2 — all linear structures + postfix method | 10 infix→postfix conversions by hand |
| **D30** | trees — traversals, BST, heap, AVL | Part 4 — all of it | draw traversals ×5, AVL rotation ×3 |
| **D31** | graphs (BFS/DFS/MST/Dijkstra) + hashing | Part 5 + Part 3 | trace BFS/DFS order on a drawn graph |
| **D32** | complexity + sort/search table + paradigms | Part 1 → Part 6 → Part 7 | memorize the master sorting table cold |
| **D34** | DSA + Prog combined test | whole file skim → lock-list | 30-Q test + redo wrongs |

---

**How to read:** every structure is a physical thing — array = a row of numbered boxes, linked list = a treasure hunt, stack = a pile of plates, queue = a ticket line, hash table = a locker wall. Learn the picture first, then the table of facts.

---

## PART 1 — COMPLEXITY & BIG-O

**Plain words:** Big-O answers "if my input doubles, how much slower does the code get?" — the worst-case growth curve. You drop constants and small terms because for big n they don't matter: O(2n+100) = O(n) — at n=1,000,000, doubling is doubling.

- **The ladder (memorise cold):** O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).
- **See the loop rules:**
  ```python
  for i in range(n):          # n steps → O(n)
  for i in range(n):
      for j in range(n//2):   # n × n/2 steps → still O(n²) — constants die (real Q)
  i = n
  while i > 1: i //= 2        # halves each time → O(log n)
  i = 1
  while i < n: i *= 2         # doubles each time → O(log n)
  ```
- **Recurrences:** T(n) = 2T(n/2) + O(n) → **merge sort = O(n log n)** — splitting in half + linear merge work = n log n (real recalled Q — know this recurrence by sight).
- Binary search halves the space each step → O(log n). Naive recursive Fibonacci recomputes → O(2ⁿ).
- Ω = best case, Θ = tight bound (both asked interchangeably).

---

## PART 2 — LINEAR STRUCTURES

### Arrays — a row of numbered boxes
**Plain words:** contiguous memory — every element sits shoulder-to-shoulder, so jumping to `a[i]` is instant math (`base + i×size`) → **O(1) access** (real Q). The price: inserting in the middle means shoving everyone down → O(n).
- `a[i]` ≡ `*(a+i)`; `a[3][4]` third element of first row = `a[0][2]` — zero-indexed (real Q).

### Linked List — a treasure hunt
**Plain words:** nodes scattered in memory, each holding data + a pointer to the next. To find node 50 you follow the chain → O(n) search (no random access). But inserting at the head means just rewiring one pointer → **O(1)** (real Q).
- Singly (next) / doubly (next + prev — backward traversal, more memory) / circular.
- Slow-fast pointer tricks: fast moves 2×, slow lands on the middle; if they ever meet, there's a cycle (Floyd's).

### Stack (LIFO) & Queue (FIFO)
- **Stack = a pile of plates:** last one placed comes off first — `push, pop, peek` (real Q). Wherever "undo" or "go back" logic exists → stack: function calls/recursion, infix→postfix conversion, bracket matching, **DFS** (real Q).
- **Queue = a ticket line:** first in, first served — `enqueue, dequeue, front` (real Q). Wherever "serve in arrival order" exists → queue: **BFS**, CPU scheduling, buffers. Java's `LinkedList` implements Queue (real Q).
- **Infix→postfix (real Q):** scan left→right; operands go straight to output; on an operator → **pop while stack-top has ≥ precedence**, then push; `(` pushes, `)` pops until `(`.
- Priority queue = a heap underneath. Deque = insert/delete at both ends.

---

## PART 3 — HASHING (recalled heavily)

**Plain words:** a hash table is a wall of numbered lockers. A hash function maps each key → a locker number → average **O(1) insert/search** (real Q: best-case search = O(1)). The problem: two keys can map to the SAME locker — a **collision** — and how you handle it is the exam question.

- **Separate chaining** — each locker holds a **linked list** of whatever landed there (real Q). Load factor α = n/m (items ÷ slots) — **can exceed 1** (real Q — chains just grow).
- **Open addressing** — keep everything in the table; if your slot's taken, probe for the next free one: linear probing (i+1, i+2… creates primary clustering — long runs of taken slots), quadratic (i² jumps → secondary clustering), double hashing (best spread). Load factor must stay < 1 or there's no free slot to find.
- **Why hash tables are bad at range queries:** they maintain no order — "all keys between 100 and 200" means scanning everything → O(n) (real Q — that's why databases use B+ trees).
- Good hash = uniform spread; `h(k) = k mod m` with prime m is the classic choice.

---

## PART 4 — TREES (the recalled-PYQ goldmine)

**Plain words:** a tree = a hierarchy — one root, children below, no cycles. A binary tree caps every node at 2 children.

### Terminology & formulas (memorise — 4+ real Qs from here)
- Binary tree with N nodes → **N−1 edges** (every node except root has exactly one parent — real Q).
- Max nodes in a binary tree of height h = **2^(h+1) − 1** (a perfect tree — real Q, exact phrasing).
- Min height with n nodes = ⌊log₂ n⌋; a complete tree packs nodes left-to-right.
- **Strict/full binary tree** (every node has 0 or 2 children): leaves L → total nodes = **2L − 1**. Real Q: 8 leaves → **15 nodes**.
- **Traversals — learn on one tree:**
  ```
        A              preorder  A B D E C   (Root→L→R — used to COPY trees)
       / \             inorder   D B E A C   (L→Root→R — SORTED order in a BST!)
      B   C            postorder D E B C A   (L→R→Root — used to DELETE trees: real Q)
     / \               level     A B C D E   (BFS with a queue)
    D   E
  ```
- **BST rebuild drill (real Q — verbatim SEBI pattern):** given preorder of a BST `16, 11, 13, 12, 17, 20, 21`, find postorder. Method: first element = root (16); everything < 16 goes left `{11,13,12}`, everything > 16 goes right `{17,20,21}`; recurse inside each; then read postorder → `12, 13, 11, 21, 20, 17, 16`. **Practice this — it's a verbatim pattern.**

### BST — binary search tree
Left < node < right at every node → an inorder walk always yields sorted order. Search/insert/delete O(h): O(log n) when balanced, O(n) when skewed — sorted input `1,2,3,4,5` degenerates into a leaning list (why self-balancing trees exist).

### AVL (self-balancing BST)
**Plain words:** a BST that rotates itself back into balance whenever any node gets too lopsided.
- **Balance factor** = height(left) − height(right) ∈ **{−1, 0, +1}** at EVERY node (real Q: "balance factor −1/0/1" → AVL).
- Fix violations by rotation: LL → right rotate; RR → left rotate; LR → left+right; RL → right+left.
- Height stays ~1.44·log₂(n+2) → real Q: **max height with 12 nodes = 4**.

### Heap
- Complete binary tree stored in an array: parent at ⌊i/2⌋, children at 2i, 2i+1.
- Min-heap → smallest always at root (priority queues, heapsort). Build-heap O(n); insert/extract O(log n).

### B-Tree / B+ Tree
- M-way search tree, all leaves at the same level → keeps DB indexes shallow → **real Q: B-Tree = the data structure for database indexing**. B+ stores data only in leaves + links them for range scans (full story in DBMS notes §6).

---

## PART 5 — GRAPHS (heavily recalled)

**Plain words:** a graph = dots (vertices) and lines (edges) — cities and roads, people and friendships. Two questions dominate: how to walk it (BFS/DFS) and how to represent it.

### Representation
- **Adjacency matrix** — V×V grid marking edges — O(1) "is there an edge?" but V² space → **best for DENSE graphs** (real Q).
- **Adjacency list** — each vertex lists its neighbours — V+E space → best for sparse graphs.

### Traversals — two ways to walk the same map
- **BFS** — a queue; visit the start, then ALL its neighbours, then THEIR neighbours — ripple outward level by level → finds shortest path in UNWEIGHTED graphs. (Real Q: "traversal unique for binary tree" → BFS/level-order.)
- **DFS** — a stack/recursion; dive as deep as possible down one path, backtrack → cycle detection, topological sort, connected components.
- **Connected components** (syllabus line) = how many separate "islands" exist — count restarts of DFS/BFS on unvisited vertices.

### Graph formulas (3 real Qs!)
- **Euler's formula for planar graphs: V − E + F = 2.** Real Q: E=30, F=20 → V = 2+E−F = **12**.
- **k-regular graph** (every vertex has degree k): edges = n·k/2. Real Q: 5-regular, 6 vertices → 5×6/2 = **15 edges** — handshaking lemma in disguise.
- Handshaking: Σdegrees = 2E (every edge touches two vertices). Complete graph Kₙ = n(n−1)/2 edges.
- Indegree zero for ALL vertices → edgeless/null graph (real Q). Regular = every vertex same degree (real Q — definition).

### Spanning trees & shortest paths
- **MST** = the cheapest way to connect all cities — V−1 edges, minimum total weight.
  - **Prim's** — grow one tree: repeatedly add the cheapest edge leaving the tree. **Greedy** (real Q: "Prim's works on which principle?").
  - **Kruskal's** — sort ALL edges, add cheapest that doesn't close a cycle (union-find). Greedy too.
- **Dijkstra** — shortest path from ONE source, greedy — **no negative weights allowed** (greedy can't revisit decisions). O((V+E) log V) with a heap.
  **How to trace it (the exam asks the ORDER nodes are finalized):**
  ```
  Graph: A-B:4, A-C:2, C-B:1, B-D:5, C-D:8
  Start A: dist = {A:0, B:inf, C:inf, D:inf}
  Pick smallest unfinalized -> C(2): relax -> B:4->3, D:inf->10
  Pick smallest -> B(3): relax -> D:10->8
  Pick -> D(8) done.  Final order: A,C,B,D.  Path to D = A->C->B->D = 8.
  ```
  Rule: each round, lock the closest unvisited node and relax its edges - "greedy means you never undo a lock." 
- **Bellman-Ford** — the fix for negative edges — relaxes every edge V−1 times; also detects negative cycles. DP-flavoured.
- **Floyd-Warshall** — shortest paths between ALL pairs — triple loop, O(V³).
- **Topological sort** — linear ordering of a DAG (finish prerequisites before dependents); DFS finish-times or Kahn's indegree-0 queue.

---

## PART 6 — SORTING & SEARCHING (the #1 recalled block)

### The master sorting table (memorise entirely — multiple real Qs from it)

**How each works in one line:** Bubble = swap wrong-order neighbours, biggest bubbles to the end. Selection = repeatedly pick the minimum, place it at front. Insertion = take each card, slip it into its place in the sorted hand. Merge = split in halves, sort each, zip together. Quick = pick a pivot, smaller left / bigger right, recurse. Heap = build a heap, keep extracting the root.

| Algorithm | Best | Avg | Worst | Space | Stable? | Key idea |
|---|---|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes | swap adjacent if wrong order; biggest bubbles to end |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No | pick min of unsorted, swap to front (real Q) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes | insert each element into sorted left part (real Q) |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | **Yes** (real Q) | divide, sort halves, merge; T(n)=2T(n/2)+O(n) |
| Quick | O(n log n) | O(n log n) | **O(n²)** | O(log n) | No | partition around pivot |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No | extract-min/max repeatedly |

- **Stable** = equal elements keep their original order. Stable trio: Bubble, Insertion, Merge — "BIM keeps twins in line."
- **Real recalled answers:** QuickSort worst case = O(n²) — when the pivot is always smallest/largest (sorted array + bad pivot). "Why merge over quick?" → **stability + guaranteed O(n log n)**.
- **Bucket sort / radix sort** — near-linear O(n+k) **only when elements are uniformly distributed** (real recalled Q). Counting sort: O(n+k), needs a small integer range.

### Searching
- Linear: O(n), works anywhere. Binary: O(log n), SORTED arrays only (real Q: large sorted random-access array → binary).
- **Interpolation search** — guesses position by value (like opening a dictionary near "S") — best for **uniformly distributed** data (real Q — this exact fact appeared twice!).
- Jump search O(√n); exponential search = find the range, then binary inside.

### String matching (in mains PYQs)
- Naive O(nm). **KMP** precomputes the **LPS array** (longest proper prefix that's also a suffix) → skips re-matching → O(n+m) (real Q). **Rabin-Karp** = rolling hash → **used in plagiarism detection** (real Q).

---

## PART 7 — DESIGN TECHNIQUES (syllabus line, real Qs)

| Technique | Idea | Examples | SEBI fact |
|---|---|---|---|
| **Divide & Conquer** | split → solve each → combine | merge/quick sort, binary search, Strassen | Strassen matrix mult = **O(n^log₂7) ≈ O(n^2.81)** (real Q) |
| **Greedy** | take the locally best choice every step | Prim, Kruskal, Dijkstra, Huffman, fractional knapsack, activity selection | works only when the greedy-choice property holds |
| **Dynamic Programming** | overlapping subproblems → cache answers (memo/table) | 0/1 knapsack, LCS, coin change, Fibonacci-memo | key property = **optimal substructure** (real Q — exact wording) |
| **Backtracking** | try → hit dead end → undo & try next | N-queens, Sudoku, graph coloring | N-queens rule: no shared row/col/diagonal (real Q) |

- REMEMBER DP vs D&C: *"D&C subproblems are independent; DP's overlap — that's why it caches."*
- Greedy vs DP: greedy never revisits choices; DP explores & combines sub-solutions — when choices interact (0/1 knapsack: taking item A changes whether B is worth it), greedy fails and you need DP.

---

## Real recalled SEBI questions — the lock-list
DFS→stack · queue ops (enqueue/dequeue/front) · stack ops (push/pop/peek) · infix-lower-precedence pop rule · LinkedList implements Queue · LL head-insert O(1) · binary search O(log n) · interpolation for uniform data · N×N/2 loops = O(N²) · merge sort recurrence 2T(n/2)+O(n) · merge sort stable · quicksort worst O(n²) when bad pivots · bubble sort avg O(n²) · Strassen O(n^2.81) · Rabin-Karp plagiarism · KMP LPS array · DP optimal substructure · N-Queen backtracking · separate chaining linked list · α=n/m can >1 · hash search O(1) · hash bad for ranges · B-tree = DB index · AVL balance {−1,0,1} · AVL 12 nodes → height 4 · tree nodes 2^(k+1)−1 · N nodes → N−1 edges · strict tree 8 leaves → 15 · postorder L-R-Root · preorder-BST→postorder rebuild · BFS unique for binary tree · adjacency matrix for dense graphs · 5-regular 6V → 15 edges · planar E=30 F=20 → V=12 · all-indegree-0 → null graph · regular = same degree · Prim's = greedy.

## Question types + drills
1. Complexity identification (loops, recurrences).
2. Traversal outputs + BST reconstruction — do 5 preorder→postorder rebuilds.
3. Sorting table MCQs (stability, worst case, space) — rewrite the table from memory weekly.
4. Graph formula plug-ins (Euler, handshaking, regular) — 10 drills.
5. Hashing concept MCQs.
6. GATE CS DSA PYQs on GateOverflow + Testbook "Data Structures" chapter tests.

---

## Worked Examples — 10 solved in exam pattern

**Ex 1 — best algorithm for nearly-sorted data.** "Array is already 90% sorted — fastest simple sort?"
**Ans: Insertion sort — O(n) on nearly-sorted input.** Its inner while-loop barely moves when elements are near their place. Trap: picking quicksort (its worst case is sorted input with bad pivots).

**Ex 2 — stability question.** "Which of these is stable: merge sort, quick sort, heap sort, selection sort?"
**Ans: merge sort.** Equal elements keep their original order. Quick/heap/selection are all unstable. *(REMEMBER stable trio: Bubble, Insertion, Merge — "BIM keeps twins in line".)*

**Ex 3 — BST traversal output.** Insert 50, 30, 70, 20, 40, 60, 80 into a BST. What does inorder give?
**Ans: 20 30 40 50 60 70 80 — always sorted order for a BST.** That's the free mark: inorder(BST) = sorted. Preorder would start 50 30 20…

**Ex 4 — AVL height bound.** "Min number of nodes in an AVL tree of height 3?"
**Ans: 7** via N(h) = N(h-1) + N(h-2) + 1 with N(0)=1, N(1)=2 → N(2)=4, N(3)=7. Fibonacci-style — the reason AVL stays O(log n).

**Ex 5 — infix to postfix.** Convert `A + B * C`.
**Ans: `A B C * +`.** `*` has higher precedence → applied first in postfix. Parenthesized `(A+B)*C` → `A B + C *`. Different answers — precedence/parens decide, not left-to-right.

**Ex 6 — postfix evaluation.** Evaluate `2 3 4 * +`.
**Ans: 14.** Stack: push 2, push 3, push 4; `*` pops 4,3 → push 12; `+` pops 12,2 → 14. *(Rule: operands push, operators pop-two-compute-push.)*

**Ex 7 — graph edge counts.** "Complete undirected graph on 10 vertices — how many edges? A tree on 10 vertices?"
**Ans: 45 and 9.** Complete = n(n−1)/2; tree = n−1 always. (Also: connected graph needs ≥ n−1 edges.)

**Ex 8 — heap extract.** Min-heap {2, 5, 9, 7, 6}: extract-min twice — what comes out, what remains at root?
**Ans: removes 2 then 5; root becomes 6.** After each extraction the LAST element moves to root and sift-down restores the heap — trace the swaps, don't guess.

**Ex 9 — Big-O of code.** `for(i=1;i<n;i*=2)` — how many iterations?
**Ans: O(log n)** — i doubles each step: 1,2,4,8… reaches n in log₂n steps. *(Rule: multiply/shrink by a constant → log n; +k steps → linear.)*

**Ex 10 — collision resolution.** Hash table size 10, hash(x)=x mod 10, linear probing. Insert 12, 22, 32.
**Ans: slots 2, 3, 4.** All hash to slot 2 → probe forward to next free slot (22→3, 32→4). Clustering is the weakness linear probing is famous for.
