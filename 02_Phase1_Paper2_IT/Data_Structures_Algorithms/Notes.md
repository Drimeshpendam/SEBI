# Data Structures & Algorithms — Full Study Notes (10% Paper 2 · ~55% of Mains PYQs)

> **Official syllabus (Paper 2):** tree & graph traversals · connected components · spanning trees · shortest paths · hashing · sorting · searching · design techniques (greedy, DP, divide-and-conquer).
>
> **Why this file is huge:** it's only 10% of Phase-1 Paper 2, but memory-based Mains PYQs show **~55% of Phase-2 IT questions come from here** (sorting, trees, graphs, hashing, OOP aside). Every hour spent here pays twice — once in Phase 1, again in Phase 2 where it's 2/3 of your final score.

---

## PART 1 — COMPLEXITY & BIG-O

- Big-O = worst-case growth rate. Drop constants and small terms: O(2n+100) = O(n).
- **Ladder (memorise cold):** O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).
- Nested loops N × N/2 → still **O(N²)** (real recalled Q — constants die).
- Loop halving each time (`i /= 2`) → O(log n). Loop doubling → O(log n).
- **Recurrences:** T(n) = 2T(n/2) + O(n) → **merge sort = O(n log n)** (real recalled Q — know this recurrence by sight). Master theorem intuition: splitting in half + linear merge = n log n.
- Binary search halves → O(log n). Naive recursion Fibonacci → O(2ⁿ).
- Ω = best case, Θ = tight bound. Exam asks all three interchangeably.

---

## PART 2 — LINEAR STRUCTURES

### Arrays
- Contiguous memory (real recalled Q), O(1) index access, O(n) insert/delete middle.
- `a[i]` ≡ `*(a+i)`; `a[3][4]` third element of first row = `a[0][2]` (real Q).

### Linked List
- Nodes = data + pointer(s). Insert/delete at head = **O(1)** (real Q); search = O(n) (no random access).
- Singly (next) / doubly (next+prev — enables backward traversal, more memory) / circular.
- Slow-fast pointer tricks: find middle (fast 2×, slow lands mid), detect cycle (Floyd's — if they meet, cycle exists).

### Stack (LIFO) & Queue (FIFO)
- Stack ops: **push, pop, peek** (real Q). Applications: **DFS** (real Q), function calls/recursion, infix→postfix, balanced-parenthesis check, undo.
- Queue ops: **enqueue, dequeue, front** (real Q). Applications: **BFS**, scheduling, buffers. Java's `LinkedList` implements Queue (real Q).
- **Infix→postfix (real Q):** scan left→right; operands → output; on an operator → **pop while stack-top has ≥ precedence** (then push); `(` pushes, `)` pops until `(`. Real recalled wording: "on a lower-precedence operator, pop higher-precedence ops until stack top is lower or '(' found."
- Priority queue = heap underneath.
- Deque = insert/delete both ends.

---

## PART 3 — HASHING (recalled heavily)

- Hash function maps key → index. Goal: O(1) average insert/search (real Q: best-case search = **O(1)**).
- **Collision resolution:**
  - **Separate chaining** — each slot holds a **linked list** (real Q). Load factor α = n/m, **can exceed 1** (real Q — chains just grow).
  - **Open addressing** — probe for next empty slot: linear probing (i+1, i+2… → primary clustering), quadratic (i² jumps → secondary clustering), double hashing (best). Load factor must stay < 1.
- **Why range queries are slow in hash tables:** order isn't maintained → O(n) (real Q — that's why DBs use B+ trees for ranges).
- Good hash = uniform distribution; `h(k) = k mod m` with prime m is the classic.

---

## PART 4 — TREES (the recalled-PYQ goldmine)

### Terminology & formulas (memorise — 4+ real Qs from here)
- Binary tree with N nodes → **N−1 edges** (real Q).
- Max nodes in binary tree of height h = **2^(h+1) − 1** (real Q — exactly this phrasing).
- Min height with n nodes = ⌊log₂ n⌋; complete tree packs left-to-right.
- **Strict/full binary tree** (every node 0 or 2 children): leaves L → total nodes = **2L − 1**. Real Q: 8 leaves → **15 nodes**.
- Traversals:
  - **Preorder:** Root → Left → Right (used to COPY trees).
  - **Inorder:** Left → Root → Right (**gives sorted order in a BST** — key fact).
  - **Postorder:** Left → Right → Root (real Q — used to DELETE trees).
  - Level-order = BFS using queue.
- **BST rebuild drill (real Q):** given preorder of BST `16, 11, 13, 12, 17, 20, 21` → postorder `12, 13, 11, 21, 20, 17, 16`. Method: reconstruct BST (first = root, split rest into <root left-subtree, >root right-subtree, recurse), then read postorder. **Practice this — it's a verbatim SEBI pattern.**

### BST
- Left < node < right. Search/insert/delete O(h) — O(log n) balanced, O(n) skewed (sorted input degenerates to a list — why balancing exists).

### AVL (self-balancing BST)
- Balance factor = height(left) − height(right) ∈ {−1, 0, +1} at EVERY node (real Q: "balance factor −1/0/1" → **AVL**).
- Fix violations with rotations: LL → right rotate; RR → left rotate; LR → left+right; RL → right+left.
- Height stays ~1.44·log₂(n+2) → real Q: **max height with 12 nodes = 4**.
- Insert/delete still O(log n) thanks to rebalancing.

### Heap
- Complete binary tree in an array: parent at ⌊i/2⌋, children 2i, 2i+1.
- Min-heap → root is smallest (priority queues, heapsort). Build-heap O(n); insert/extract O(log n).

### B-Tree / B+ Tree
- M-way search tree, all leaves same level, keeps DB indexes shallow → **real Q: B-Tree = database indexing**. B+ stores data only in leaves, linked leaves for ranges (see DBMS notes §6).

---

## PART 5 — GRAPHS (heavily recalled)

### Representation
- **Adjacency matrix** — V² space, O(1) edge check → **best for DENSE graphs** (real Q).
- **Adjacency list** — V+E space → best for sparse graphs.

### Traversals
- **BFS** — queue, level by level → shortest path in UNWEIGHTED graphs. Unique for a binary tree (real Q: "traversal unique for binary tree" → BFS/level-order).
- **DFS** — stack (or recursion), depth first → cycle detection, topological sort, connected components.
- **Connected components** = number of DFS/BFS restarts needed to cover all vertices (syllabus line — count components by restarting traversal on unvisited nodes).

### Graph formulas (3 real Qs!)
- **Euler's formula for planar graphs: V − E + F = 2.** Real Q: E=30, F=20 → V = 2+E−F = **12**.
- **k-regular graph** (every vertex degree k): edges = n·k/2. Real Q: 5-regular, 6 vertices → 5×6/2 = **15 edges**.
- **Indegree zero for all vertices** → edgeless/null graph (real Q).
- Regular graph = every vertex same degree (real Q — definition).
- Handshaking: Σdegrees = 2E. Complete graph Kₙ: n(n−1)/2 edges.

### Spanning trees & shortest paths
- **MST:** V−1 edges, min total weight.
  - **Prim's** — grows one tree by repeatedly adding the cheapest edge leaving the tree. **Greedy** (real Q: "Prim's works on which principle" → greedy).
  - **Kruskal's** — sort all edges, add cheapest that doesn't form a cycle (union-find). Greedy too.
- **Dijkstra** — shortest paths from one source, NO negative weights (greedy). O((V+E) log V) with heap.
- **Bellman-Ford** — handles negative edges, detects negative cycles. DP-flavored.
- **Floyd-Warshall** — all-pairs shortest paths, O(V³), triple loop.
- Topological sort — ordering of DAG vertices (dependency resolution); via DFS finish times or Kahn's (indegree-0 queue).

---

## PART 6 — SORTING & SEARCHING (the #1 recalled block)

### The master sorting table (memorise entirely — multiple real Qs from it)
| Algorithm | Best | Avg | Worst | Space | Stable? | Key idea |
|---|---|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes | swap adjacent if wrong order; biggest bubbles to end |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No | pick min of unsorted, swap to front (real Q — definition) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes | insert each element into sorted left part (real Q) |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | **Yes** (real Q) | divide, sort halves, merge; T(n)=2T(n/2)+O(n) |
| Quick | O(n log n) | O(n log n) | **O(n²)** | O(log n) | No | partition around pivot |
| Heap | O(n log n) | O(n log n) | O(n log n) | O(1) | No | extract-min/max repeatedly |

- **Real recalled answers:** QuickSort worst case = O(n²) — happens when pivot is always smallest/largest (sorted array + bad pivot). "Why merge over quick?" → **stability + guaranteed O(n log n)** (both real Qs).
- **Bucket sort / radix sort:** near-linear O(n+k) **only when elements uniformly distributed** (real recalled Q — "works efficiently only when uniformly distributed" → bucket sort).
- Counting sort: O(n+k), needs small integer range.

### Searching
- Linear: O(n) any array. Binary: O(log n), sorted only (real Q: best for large sorted random-access array → binary).
- **Interpolation search** — best for **uniformly distributed** data (real Q — same fact twice in PYQs!).
- Jump search O(√n). Exponential search = find range then binary.

### String matching (in mains PYQs)
- Naive O(nm). **KMP uses the LPS array** (longest prefix-suffix) → O(n+m) (real Q). **Rabin-Karp** = rolling hash → **used in plagiarism detection** (real Q).

---

## PART 7 — DESIGN TECHNIQUES (syllabus line, real Qs)

| Technique | Idea | Examples | SEBI fact |
|---|---|---|---|
| **Divide & Conquer** | split → solve → combine | merge/quick sort, binary search, Strassen | Strassen matrix mult = **O(n^log₂7) ≈ O(n^2.81)** (real Q) |
| **Greedy** | locally best choice each step | Prim, Kruskal, Dijkstra, Huffman, fractional knapsack, activity selection | works only when greedy-choice property holds |
| **Dynamic Programming** | overlapping subproblems → memoize/tabulate | 0/1 knapsack, LCS, coin change, Fibonacci-memo | key property = **optimal substructure** (real Q — exact wording) |
| **Backtracking** | try → undo on dead end | N-queens, Sudoku, graph coloring | N-queens rule: no shared row/col/diagonal (real Q) |

- REMEMBER DP vs D&C: *"D&C subproblems are independent; DP's overlap — that's why it caches."*
- Greedy vs DP: greedy never revisits; DP explores & combines sub-solutions — pick DP when choices interact (0/1 knapsack can't be greedy).

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
