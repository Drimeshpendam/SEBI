# Phase 2 Practice — Mains-style Questions

Two sections: **A** = 2026-format MCQs (dry run / debug / logic fill) and
**B** = 2024-format coding problems (practice as insurance — SEBI has flipped formats).

**How the sets map to the plan (same as ClickUp cards):**
- **SET-1 = 50 Qs** → Day 21 Saturday, 90 min timed. Target ≥ 45%.
- **SET-2 = 50 Qs** → Day 28 Saturday, 90 min timed. Target ≥ 45%.
- **SET-3 = 100 Qs** → Day 35 Sunday, 180 min timed (full mains simulation). Target ≥ 50%.
- **SET-4 = 100 Qs** → Day 42 Sunday, 180 min timed. Target ≥ 55%.
- **Daily pool (A-POOL)** → 3–5/day from Day 29 onward, untimed, error-log every miss.
- Q1–Q10 below = warm-up pool (any day).

Topic mix inside every set follows the Phase-2 model: DS ~40% · Algorithms ~30% · OOP/language ~20% · Strings + SQL/analytics ~10%. 5 options, -0.25 real marking when self-scoring.

## A. Warm-up pool + timed sets

**Q1.** Output of:
```c
int a[] = {4, 9, 1, 7, 3}; int m = a[0];
for (int i = 1; i < 5; i++) if (a[i] < m) m = a[i];
printf("%d", m);
```
(1) 9 (2) 1 (3) 4 (4) 7 (5) 3

**Q2.** Debug — function should return sum of even numbers:
```c
int sumEven(int a[], int n) {
    int s;
    for (int i = 0; i <= n; i++)
        if (a[i] % 2 = 0) s += a[i];
    return s;
}
```
How many distinct bugs? (1) 1 (2) 2 (3) 3 (4) 4 (5) 0

**Q3.** Fill the blank to reverse the array:
```c
for (i = 0; i < n / 2; i++) { int t = a[i]; a[i] = _____; a[n-1-i] = t; }
```
(1) a[n-i] (2) a[n-1-i] (3) a[i-1] (4) a[n] (5) a[i+1]

**Q4.** Dry run recursion:
```c
int f(int n) { if (n <= 1) return 1; return n * f(n - 2); }
```
`f(6)` returns? (1) 48 (2) 720 (3) 15 (4) 30 (5) 6

**Q5.** Java output:
```java
String s = "SEBI"; s.concat("2027"); System.out.println(s);
```
(1) SEBI2027 (2) SEBI (3) compile error (4) 2027 (5) null

**Q6.** Python output: `print("abcdef"[::2] + "x"[0:0])`
(1) 'ace' (2) 'bdf' (3) 'acex' (4) 'ace ' (5) error

**Q7.** Which bug makes this print nothing?
```c
int i = 0;
while (i < 5); { printf("%d", i); i++; }
```
(1) `while` needs {} (2) semicolon after while (3) i never initialized
(4) printf wrong (5) no bug

**Q8.** AVL: insert 30, 20, 10 into empty tree. Rotation needed at root 30?
(1) RR (2) LL (3) LR (4) RL (5) none

**Q9.** Postfix of `a + b * c - d` :
(1) abc*+d- (2) ab+cd*- (3) abc+*d- (4) -+a*bcd (5) abcd+*-

**Q10.** Dry run: linked list `1→2→3→4`, code moves `p` two steps at a time printing each visited node's data starting at head. Output?
(1) 1 2 3 4 (2) 1 3 (3) 2 4 (4) 1 2 3 (5) 1 3 4

## B. Coding-test problems (2024 format: Simple 10M / Moderate 20M / Hard 30M)

Write in your strongest language (C++/Java/Python). Time-box: simple 15 min, moderate 25 min, hard 40 min.

### Simple tier
- **B1.** Nth Fibonacci via DP (2024 PYQ — n ≤ 30)
- **B2.** Reverse a singly linked list (iterative)
- **B3.** Check palindrome string ignoring non-alphanumerics & case
- **B4.** Count frequency of each char in a string (hashing)

### Moderate tier
- **B5.** Implement queue using two stacks; analyze per-op complexity
- **B6.** Kth largest element in array (heap or quickselect)
- **B7.** Detect cycle in linked list + return cycle start node
- **B8.** Coin change: min coins for amount (DP table by hand first)
- **B9.** Inorder tree traversal iteratively (no recursion)

### Hard tier
- **B10.** Longest common subsequence of two strings + print the LCS
- **B11.** 0/1 knapsack — max value + which items chosen
- **B12.** Merge k sorted arrays efficiently (heap)
- **B13.** Regex-free: validate email format (rules you define)

---

## Answers

**A1**-(2) tracks minimum · **A2**-(3) bugs: `s` uninitialized, `i<=n` overrun, `=` vs `==` → 3 · **A3**-(2) · **A4**-(1) 6×4×2×1=48 · **A5**-(2) Strings immutable; concat result discarded — classic trap · **A6**-(1) "x"[0:0] is empty string · **A7**-(2) `;` makes while empty → infinite/empty body (prints nothing) · **A8**-(2) LL rotation · **A9**-(1) · **A10**-(2) visits nodes 1 and 3

**B-tier approach hints:** B1 — memo/tab array, base 0,1 · B2 — prev/curr/next pointers · B3 — two pointers · B4 — int freq[256] or dict · B5 — enqueue stack1, dequeue via stack2 transfer-on-empty · B6 — min-heap of size k · B7 — Floyd's then reset ptr to head · B8 — dp[a] = min(dp[a-coin]+1) · B9 — stack + go-left loop · B10 — classic 2D table, backtrack for string · B11 — 2D table w[i][W], backtrack picks · B12 — min-heap of (val, arrayIdx, elemIdx) · B13 — check single @, dot after @, valid chars

---

## SET-1 — 50 Qs, 90 min timed (Day 21). Target >= 45%.

**S1-1.** Inorder traversal of BST built by inserting 50, 30, 70, 20, 40, 60, 80 in that order gives:
(1) 50 30 20 40 70 60 80 (2) 20 30 40 50 60 70 80 (3) 20 40 30 60 80 70 50 (4) 50 30 70 20 40 60 80 (5) 80 60 70 40 20 30 50

**S1-2.** Stack ops: push 1, push 2, push 3, pop, push 4, pop, pop. Values popped in order:
(1) 3 4 1 (2) 3 4 2 (3) 4 3 2 (4) 3 2 4 (5) 1 4 3

**S1-3.** Queue: enqueue 5, 6, 7; dequeue once; enqueue 8. Front element?
(1) 5 (2) 7 (3) 6 (4) 8 (5) queue empty

**S1-4.** Slow/fast pointer finds the middle of `1→2→3→4→5`. Middle node value:
(1) 2 (2) 4 (3) 3 (4) 5 (5) cannot determine

**S1-5.** Binary search for 16 in `[2,5,8,12,16,23,38]` takes how many comparisons?
(1) 2 (2) 4 (3) 3 (4) 5 (5) 1

**S1-6.** Chaining hash table, `h(k)=k mod 10`. Keys 12, 18, 13, 2, 3, 23, 5, 15. Keys in bucket 3:
(1) 13 (2) 13, 3 (3) 13, 3, 23 (4) 3, 23 (5) 13, 23

**S1-7.** Min-heap `[10,20,15,40,50,100]`. After one delete-min, root is:
(1) 20 (2) 100 (3) 15 (4) 40 (5) 50

**S1-8.** Tree: root 1; left child 2 has children 4,5; right child 3. Postorder:
(1) 1 2 3 4 5 (2) 4 5 2 3 1 (3) 4 2 5 3 1 (4) 1 3 2 5 4 (5) 4 5 3 2 1

**S1-9.** In a max-heap, the second-largest element is always:
(1) last leaf (2) a child of the root (3) rightmost node (4) root's right child only (5) anywhere

**S1-10.** Circular queue, size 5, front=0, rear=4. After 2 successful enqueues, rear =
(1) 0 (2) 1 (3) 4 (4) 2 (5) overflow

**S1-11.** Any tree with 10 nodes has exactly how many edges?
(1) 10 (2) 11 (3) 9 (4) 8 (5) depends on shape

**S1-12.** Inorder predecessor of node 40 in BST [50,30,70,20,40,60,80]:
(1) 20 (2) 50 (3) 30 (4) 60 (5) none

**S1-13.** Evaluate postfix `2 3 4 * +` :
(1) 24 (2) 9 (3) 14 (4) 20 (5) 10

**S1-14.** Evaluate prefix `- * 2 3 4` :
(1) 24 (2) 2 (3) -24 (4) 10 (5) 6

**S1-15.** O(1) random access is guaranteed by:
(1) singly linked list (2) stack (3) array (4) queue (5) BST

**S1-16.** DFS on an undirected graph uses which structure (explicitly or via recursion)?
(1) queue (2) heap (3) stack (4) hash map only (5) deque

**S1-17.** A complete binary tree with 10 nodes stored in a 1-indexed array: children of node at index 3 are at:
(1) 4,5 (2) 6,7 (3) 7,8 (4) 5,6 (5) 3,4

**S1-18.** `p` walks list `1→2→3→4→5→6` printing every node, moving one step at a time but skipping each node whose data is even. Output:
(1) 1 3 5 (2) 2 4 6 (3) 1 2 3 4 5 6 (4) 1 3 (5) 1 5

**S1-19.** Deleting the only node between head and tail in `1→2→3` requires updating which pointer(s)?
(1) tail only (2) head only (3) node's own next (4) head.next (5) none

**S1-20.** BFS from A in graph A-B, A-C, B-C (alphabetical neighbor order):
(1) A C B (2) A B C (3) B A C (4) C A B (5) A B C A

**S1-21.** Bubble sort on 5 elements, worst case, number of passes:
(1) 5 (2) 4 (3) 6 (4) 3 (5) 10

**S1-22.** Merge sort time complexity in ALL cases:
(1) O(n^2) (2) O(n) (3) O(n log n) (4) O(log n) (5) O(n^3)

**S1-23.** Quicksort hits O(n^2) when the pivot is consistently:
(1) median (2) random (3) smallest or largest element (4) middle index (5) duplicated

**S1-24.** Which sort is stable?
(1) quicksort (2) selection sort (3) heap sort (4) merge sort (5) none

**S1-25.** Counting sort runs in O(n+k) and is best when:
(1) k >> n (2) k is small relative to n (3) data is float (4) data is reverse-sorted (5) n is even

**S1-26.** Insertion sort best case (already sorted input):
(1) O(n log n) (2) O(n^2) (3) O(1) (4) O(n) (5) O(log n)

**S1-27.** Selection sort on n elements performs at most how many swaps?
(1) n^2 (2) n (3) n-1 (4) 2n (5) n/2

**S1-28.** DP applies when a problem has:
(1) sorted input (2) overlapping subproblems + optimal substructure (3) no recursion (4) unique elements (5) cycles

**S1-29.** Greedy gives optimal for fractional knapsack but NOT for:
(1) activity selection (2) Huffman coding (3) 0/1 knapsack (4) MST (5) coin change with canonical coins

**S1-30.** `f(n) = 3n^2 + 2n + 5` is:
(1) O(n) (2) O(n^3) (3) Theta(n^2) (4) O(2^n) (5) O(log n)

**S1-31.** `T(n) = 2T(n/2) + n` solves to:
(1) O(n) (2) O(n log n) (3) O(n^2) (4) O(log n) (5) O(1)

**S1-32.** `T(n) = T(n/2) + 1` solves to:
(1) O(n) (2) O(n log n) (3) O(log n) (4) O(1) (5) O(n^2)

**S1-33.** Merge step in merge sort of two sorted halves of sizes 3 and 4 takes at most how many comparisons?
(1) 7 (2) 6 (3) 12 (4) 4 (5) 3

**S1-34.** Binary search on 1000 elements needs at most about:
(1) 100 comparisons (2) 50 (3) 10 (4) 500 (5) 32

**S1-35.** Which is TRUE about linear vs binary search?
(1) binary works on unsorted (2) linear needs sorted (3) binary needs sorted; linear does not (4) both need sorted (5) binary is always slower

**S1-36.** Java: `int x = 7 / 2;` gives x =
(1) 3.5 (2) 4 (3) 3 (4) error (5) 0

**S1-37.** Java: `"hi" == "hi"` (both literals) evaluates to:
(1) false (2) true (3) compile error (4) runtime error (5) undefined

**S1-38.** Java: `new String("hi") == new String("hi")` evaluates to:
(1) true (2) false (3) compile error (4) NaN (5) exception

**S1-39.** C: `int *p; *p = 5;` — this is:
(1) fine (2) compile error (3) undefined behavior — p uninitialized (4) prints 5 (5) stack overflow

**S1-40.** In C, `sizeof('a')` returns:
(1) 1 (2) 2 (3) 4 (4) 8 (5) compile error

**S1-41.** Python: `print(2 ** 3 ** 2)` outputs:
(1) 64 (2) 512 (3) 36 (4) error (5) 12

**S1-42.** Python: `x=[1,2,3]; y=x; y[0]=9; print(x[0])` outputs:
(1) 1 (2) 9 (3) error (4) [9,2,3] (5) None

**S1-43.** Same method signature redefined in a subclass is:
(1) overloading (2) overriding (3) shadowing a field (4) abstraction (5) compile error

**S1-44.** Python: `print(type([]) is list)` outputs:
(1) False (2) True (3) error (4) list (5) None

**S1-45.** A constructor in Java/C++ runs:
(1) at class load only (2) on every method call (3) once per object at creation (4) at program end (5) only with new

**S1-46.** Python: `"SEBI"[::-1]` gives:
(1) 'IBES' (2) 'SEBI' (3) error (4) 'BES' (5) 'SEB'

**S1-47.** C: `strlen("a\0bc")` returns:
(1) 4 (2) 3 (3) 1 (4) 0 (5) compile error

**S1-48.** Correct SQL to count rows where `col` is NULL:
(1) COUNT(col=NULL) (2) WHERE col = NULL (3) WHERE col IS NULL (4) WHERE col == NULL (5) WHERE NULL(col)

**S1-49.** pandas `df['col'].mean()` by default:
(1) errors on NaN (2) counts NaN as 0 (3) skips NaN (4) returns NaN always (5) drops the column

**S1-50.** `json.dumps({'a':1})` returns a value of type:
(1) dict (2) bytes (3) str (4) JSON object (5) list

### SET-1 Answer Key
1-(2) inorder of BST = sorted · 2-(2) pop order 3,4,2 · 3-(3) 5 leaves, front=6 · 4-(3) slow lands on 3 · 5-(3) mid 12→23→16 = 3 probes · 6-(3) 13,3,23 all mod 10 = 3 · 7-(3) 100 sinks, 15 rises · 8-(2) left-right-root · 9-(2) second largest is a level-1 node · 10-(2) wraps to index 1 · 11-(3) tree = n-1 edges · 12-(3) inorder: 20,30,40 — predecessor 30 · 13-(3) 3*4+2 = 14 · 14-(2) (2*3)-4 = 2 · 15-(3) · 16-(3) · 17-(2) children at 2i,2i+1 = 6,7 · 18-(1) skips evens → 1 3 5 · 19-(4) head.next must bypass node 2 · 20-(2) · 21-(2) n-1 passes · 22-(3) · 23-(3) extreme pivot → O(n^2) · 24-(4) merge is stable · 25-(2) · 26-(4) sorted input = n-1 comparisons · 27-(3) one swap per pass · 28-(2) · 29-(3) 0/1 knapsack needs DP · 30-(3) · 31-(2) master theorem case 2 · 32-(3) · 33-(2) m+n-1 = 6 max · 34-(3) log2(1000) ~ 10 · 35-(3) · 36-(3) integer division · 37-(2) string pool shares literal · 38-(2) new objects = different refs · 39-(3) wild pointer · 40-(3) char literal is int in C · 41-(2) right-assoc: 2^9=512 · 42-(2) alias, not copy · 43-(2) · 44-(2) · 45-(3) · 46-(1) reverse slice · 47-(3) strlen stops at \0 · 48-(3) NULL needs IS · 49-(3) NaN skipped · 50-(3) dumps → string (real PYQ)

---

## SET-2 — 50 Qs, 90 min timed (Day 28). Target >= 45%.

**S2-1.** Insert 10, 5, 15, 3, 7 into an empty BST. Root-to-leaf path to reach 7:
(1) 10-5-7 (2) 10-15-7 (3) 5-7 (4) 10-5-3-7 (5) 10-3-7

**S2-2.** B-tree (min degree t=2) can hold at most how many keys per node?
(1) 2 (2) 4 (3) 3 (4) 1 (5) 5

**S2-3.** Inorder successor of node 30 in BST [50,30,70,20,40,60,80]:
(1) 20 (2) 40 (3) 50 (4) 35 (5) none

**S2-4.** Heap-sort on max-heap `[50,30,40,10,20]`: after first extract-max + heapify, array root =
(1) 30 (2) 40 (3) 20 (4) 10 (5) 50

**S2-5.** A trie is preferred over a hash table when you need:
(1) O(1) lookup (2) prefix queries like autocomplete (3) sorted deletion (4) less memory always (5) numeric keys

**S2-6.** Adjacency matrix of a graph with V vertices uses space:
(1) O(V) (2) O(E) (3) O(V^2) (4) O(V+E) (5) O(1)

**S2-7.** In a doubly linked list, deleting middle node `n` (not head/tail) updates how many pointers?
(1) 1 (2) 4 (3) 2 (4) 3 (5) 0

**S2-8.** Deque allows O(1) operations at:
(1) front only (2) rear only (3) both ends (4) middle (5) none

**S2-9.** Deleting a node with TWO children in a BST replaces its key with:
(1) largest in right subtree (2) smallest in left subtree (3) inorder successor (smallest of right subtree) (4) parent key (5) any leaf

**S2-10.** A full binary tree with 15 internal nodes has how many leaves?
(1) 15 (2) 16 (3) 14 (4) 30 (5) 8

**S2-11.** Open addressing probe sequence `h(k)+1, +2, +3...` describes:
(1) chaining (2) quadratic probing (3) linear probing (4) double hashing (5) rehashing

**S2-12.** In array heap (1-indexed), parent of index 7 is:
(1) 4 (2) 3 (3) 14 (4) 6 (5) 2

**S2-13.** Level-order traversal of a tree equals which graph traversal?
(1) DFS (2) BFS (3) inorder (4) topological (5) none

**S2-14.** `for (i=0;i<n;i++) for(j=0;j<i;j++)` runs the inner body how many times total?
(1) n^2 (2) n(n-1)/2 (3) n log n (4) 2n (5) n-1

**S2-15.** Stack `push 5,push 3,push 8,pop,push 1`: top =
(1) 8 (2) 3 (3) 1 (4) 5 (5) empty

**S2-16.** Queue of `A,B,C,D`: dequeue, dequeue, enqueue E, dequeue. Remaining front-to-rear:
(1) C D (2) D E (3) B C (4) E (5) C D E

**S2-17.** Worst structure for repeatedly finding "minimum then delete it":
(1) min-heap (2) unsorted array (3) BST (4) sorted LL (5) deque

**S2-18.** Cycle detection in linked list: Floyd's uses:
(1) two pointers same speed (2) visited-array (3) slow+fast pointers (4) recursion stack (5) hashing only

**S2-19.** Singly linked list `1→2→3→4`, reverse gives head =
(1) 1 (2) 4 (3) 3 (4) 2 (5) unchanged

**S2-20.** Balanced BST height for n=1000 is about:
(1) 1000 (2) 500 (3) 10 (4) 100 (5) 31

**S2-21.** Merge sort on `[38,27,43,3]`: after first full merge pass the array is:
(1) 27 38 3 43 (2) 3 27 38 43 (3) 38 27 43 3 (4) 27 38 43 3 (5) 3 43 38 27

**S2-22.** Dijkstra's algorithm fails when the graph has:
(1) cycles (2) negative edge weights (3) few edges (4) undirected edges (5) self loops only

**S2-23.** BFS/DFS on a graph with V vertices, E edges (adjacency list): O(?)
(1) O(V^2) (2) O(E) (3) O(V+E) (4) O(V*E) (5) O(log V)

**S2-24.** Topological sort applies to:
(1) any graph (2) undirected only (3) DAG only (4) trees only (5) complete graphs

**S2-25.** Kruskal's MST algorithm is a classic example of:
(1) dynamic programming (2) divide & conquer (3) greedy (4) backtracking (5) branch & bound

**S2-26.** Binary search fails on `[5,3,8,1]` because:
(1) duplicates (2) not sorted (3) too small (4) odd length (5) works fine actually

**S2-27.** Insertion at HEAD of singly linked list is:
(1) O(n) (2) O(log n) (3) O(1) (4) O(n log n) (5) O(n^2)

**S2-28.** `O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)` — correct ordering is:
(1) as written (2) log n before 1 (3) n log n before n (4) 2^n before n^2 (5) n^2 before n log n

**S2-29.** Recursion without a base case leads to:
(1) heap overflow (2) stack overflow (3) compile error (4) infinite CPU-free loop (5) wrong answer only

**S2-30.** Space complexity of merge sort (auxiliary):
(1) O(1) (2) O(log n) (3) O(n) (4) O(n log n) (5) O(n^2)

**S2-31.** Quick sort average case:
(1) O(n^2) (2) O(n) (3) O(n log n) (4) O(log n) (5) O(n^3)

**S2-32.** Partition (Lomuto) of `[3,8,2,5,1]` with pivot 1 gives pivot final index (0-based):
(1) 4 (2) 0 (3) 2 (4) 1 (5) 3

**S2-33.** Huffman coding assigns shortest codes to:
(1) rarest symbols (2) first symbols (3) most frequent symbols (4) all equal (5) last symbols

**S2-34.** Fibonacci naive recursion `f(n)=f(n-1)+f(n-2)` is roughly:
(1) O(n) (2) O(n^2) (3) O(2^n) (4) O(log n) (5) O(n log n)

**S2-35.** Memoizing fib reduces it to:
(1) O(2^n) (2) O(n^2) (3) O(n) (4) O(1) (5) O(log n)

**S2-36.** Python mutable-default trap: `def f(x=[]): x.append(1); return x`. Calling `f(); f(); f()` returns:
(1) [1] (2) [1,1,1] (3) [] (4) error (5) None

**S2-37.** Java: `finally` block after try/catch runs:
(1) only on exception (2) only on success (3) always (4) never (5) only with return

**S2-38.** C++: `int& r = x; r = 10;` — x becomes:
(1) unchanged (2) 10 (3) error (4) address of r (5) copy

**S2-39.** Java autoboxing converts `int` to:
(1) Object (2) Integer (3) Long (4) String (5) Number only

**S2-40.** `static` method in Java can access directly:
(1) instance fields (2) this (3) only static members (4) any field (5) local vars of main

**S2-41.** A `virtual` function in C++ enables:
(1) compile-time binding (2) runtime polymorphism (3) faster code always (4) private access (5) templates

**S2-42.** Python generator function differs by using:
(1) return (2) yield (3) gen() (4) async only (5) lambda

**S2-43.** Python: `print(bool('0'))` outputs:
(1) False (2) True (3) 0 (4) error (5) None

**S2-44.** `this` in Java refers to:
(1) parent class (2) current object (3) static class (4) caller method (5) package

**S2-45.** Python: `list('abc') == ['a','b','c']` gives:
(1) False (2) True (3) error (4) None (5) 'abc'

**S2-46.** `"race"` and `"care"` are anagrams — fastest check is comparing:
(1) lengths only (2) sorted characters / char frequency (3) first letters (4) hashes of raw strings (5) substring test

**S2-47.** C: `char s[]="abc"; s[1]='X';` then s is:
(1) "abc" (2) "aXc" (3) error (4) "Xbc" (5) "abX"

**S2-48.** SQL: `GROUP BY dept HAVING COUNT(*) > 5` filters:
(1) rows before grouping (2) groups after aggregation (3) columns (4) joins (5) nulls only

**S2-49.** `INNER JOIN` returns:
(1) all rows both tables (2) only matching rows (3) left table all (4) right table all (5) cartesian product

**S2-50.** pandas `pd.merge(df1,df2,on='id',how='left')` keeps:
(1) only matches (2) all df2 rows (3) all df1 rows (4) union of both (5) intersection

### SET-2 Answer Key
1-(1) 7 < 10 → left; > 5 → right of 5 · 2-(3) max keys = 2t-1 = 3 · 3-(2) inorder ...30,40... · 4-(2) 50 out, 40 rises · 5-(2) prefix = trie's edge · 6-(3) V×V matrix · 7-(3) prev.next + next.prev = 2 · 8-(3) deque = double-ended · 9-(3) inorder successor · 10-(2) leaves = internal+1 = 16 · 11-(3) linear probing · 12-(2) floor(7/2)=3 · 13-(2) level-order = BFS · 14-(2) sum 0..n-1 · 15-(3) top=1 · 16-(2) A,B out; C out; D,E left → D E · 17-(2) O(n) scan each time — worst · 18-(3) slow/fast meet = cycle · 19-(2) reversed head = old tail · 20-(3) log2(1000) ~ 10 · 21-(1) pairs merged: [27 38][3 43] · 22-(2) negative weights break greedy · 23-(3) · 24-(3) DAG only · 25-(3) · 26-(2) · 27-(3) · 28-(1) · 29-(2) · 30-(3) merge needs O(n) aux · 31-(3) · 32-(2) pivot 1 is smallest → index 0 · 33-(3) frequent → short codes · 34-(3) exponential tree · 35-(3) memo = linear · 36-(2) default list persists — classic trap · 37-(3) finally always runs · 38-(2) reference = alias · 39-(2) int→Integer · 40-(3) static can't touch instance · 41-(2) vtable → runtime dispatch · 42-(2) yield makes generator · 43-(2) non-empty string = truthy · 44-(2) · 45-(2) list('abc') explodes to chars · 46-(2) sort/freq compare · 47-(2) mutable char array · 48-(2) HAVING = post-aggregation filter · 49-(2) · 50-(3) left join keeps all left rows

---

## SET-3 — 100 Qs, 180 min timed (Day 35 — full mains sim). Target >= 50%.

**S3-1.** Dry run:
```c
int i, s = 0;
for (i = 1; i <= 4; i++) s += i * i;
printf("%d", s);
```
(1) 10 (2) 30 (3) 24 (4) 55 (5) 16

**S3-2.** Dry run:
```c
int a = 5, b = 2;
printf("%d", a / b * b + a % b);
```
(1) 5 (2) 4 (3) 6 (4) 7 (5) 2

**S3-3.** Output:
```c
int x = 10;
{ int x = 20; printf("%d ", x); }
printf("%d", x);
```
(1) 10 10 (2) 20 20 (3) 20 10 (4) 10 20 (5) error

**S3-4.** `int f(int n){ return n==0?0:n+f(n-1);}` — f(4) returns:
(1) 4 (2) 10 (3) 6 (4) 24 (5) infinite

**S3-5.** Debug — should print 1..5 but prints 1 forever:
```c
int i = 1;
while (i <= 5)
    printf("%d ", i);
    i++;
```
Bug is:
(1) wrong loop (2) missing braces — i++ outside loop (3) i never init (4) printf wrong (5) no bug

**S3-6.** Fill blank so `isSorted` returns 1 for ascending array:
```c
for (i = 0; i < n - 1; i++)
    if (a[i] > a[i+1]) return ____;
return 1;
```
(1) 1 (2) -1 (3) 0 (4) i (5) break

**S3-7.** Python: `print([x*2 for x in range(5) if x%2==0])` outputs:
(1) [0,2,4,6,8] (2) [0,4,8] (3) [2,4] (4) [0,2,4] (5) error

**S3-8.** Python: `d={'a':1}; d.get('b',5)` returns:
(1) None (2) KeyError (3) 5 (4) 1 (5) 'b'

**S3-9.** Java:
```java
int[] a = {1,2,3};
System.out.println(a[3]);
```
(1) 3 (2) 0 (3) ArrayIndexOutOfBoundsException (4) null (5) compile error

**S3-10.** Output:
```c
int i = 0;
do { printf("%d ", i); i++; } while (i < 3);
```
(1) 0 1 2 (2) 1 2 3 (3) 0 1 2 3 (4) nothing (5) infinite

**S3-11.** Swap gone wrong:
```c
void swap(int a, int b) { int t = a; a = b; b = t; }
```
After `swap(x,y)` the caller's x,y are:
(1) swapped (2) unchanged — pass by value (3) compile error (4) x only swapped (5) undefined

**S3-12.** Python: `print(10 // 3, 10 % 3)` outputs:
(1) 3 1 (2) 3.33 1 (3) 3 3 (4) 4 1 (5) error

**S3-13.** Recursion trace: `int g(int n){ if(n<1) return 0; return 1 + g(n/2);}` — g(8) =
(1) 8 (2) 4 (3) 3 (4) 2 (5) 1

**S3-14.** Python string: `s='hello'; s[0]='H'` causes:
(1) 'Hello' (2) TypeError — strings immutable (3) 'hello' (4) 'H' (5) works fine

**S3-15.** Java: `ArrayList<Integer> l = new ArrayList<>(); l.add(1); l.add(2); l.remove(0);` then l.get(0) =
(1) 1 (2) 2 (3) 0 (4) exception (5) null

**S3-16.** Two-sum style: `a=[2,7,11,15], t=9` — indexes summing to t:
(1) 1,2 (2) 0,1 (3) 2,3 (4) 0,3 (5) none

**S3-17.** `while` loop that must run AT LEAST once should be:
(1) while (2) for (3) do-while (4) if (5) recursion

**S3-18.** Python: `print(len('a\tb'))` outputs:
(1) 4 (2) 3 (3) 2 (4) 5 (5) error

**S3-19.** C pointers: `int a=5; int *p=&a; *p=9;` — a is now:
(1) 5 (2) 9 (3) address (4) error (5) 0

**S3-20.** `int arr[5]={1,2,3};` — arr[4] is:
(1) garbage (2) 3 (3) 0 (4) error (5) 1

**S3-21.** BST: minimum element is always at:
(1) root (2) rightmost node (3) leftmost node (4) deepest leaf (5) any leaf

**S3-22.** Tree with only left children (skewed) of 5 nodes: inorder prints:
(1) reverse of insertion (2) sorted ascending (3) deepest first (4) root last always (5) depends

**S3-23.** AVL rotations: after inserting 1,2,3 into empty AVL tree, root is:
(1) 1 (2) 3 (3) 2 (4) unbalanced 1 (5) 0

**S3-24.** Max nodes at level L (root = level 0) of binary tree:
(1) 2^L (2) L^2 (3) 2L (4) L (5) 2^(L-1)

**S3-25.** Detecting if a number is power of 2 in O(1) uses:
(1) n % 2 (2) n & (n-1) == 0 (3) n / 2 (4) log loop only (5) n | 1

**S3-26.** Stack is best suited for:
(1) BFS (2) undo feature / expression eval (3) priority scheduling (4) hashing (5) sorting

**S3-27.** Which data structure for "serving print jobs in arrival order":
(1) stack (2) heap (3) queue (4) tree (5) hash

**S3-28.** `p->next->next = p` in a 3-node list 1→2→3 creates:
(1) deletion (2) cycle 2→3→2 (3) null (4) copy (5) error

**S3-29.** Time to find element in balanced BST, worst case:
(1) O(n) (2) O(log n) (3) O(1) (4) O(n log n) (5) O(n^2)

**S3-30.** Skewed BST (sorted inserts) search degrades to:
(1) O(log n) (2) O(1) (3) O(n) (4) O(n log n) (5) O(n^2)

**S3-31.** DFS of triangle graph A-B, B-C, C-A starting at A (alphabetical neighbors) visits:
(1) A B C (2) A C B (3) B A C (4) depends — both A B C possible (5) A B C A

**S3-32.** Dijkstra from A: edges A-B=2, A-C=5, B-C=1. Shortest A→C:
(1) 5 (2) 3 (3) 6 (4) 2 (5) 1

**S3-33.** MST of a connected graph with V vertices has exactly:
(1) V edges (2) V-1 edges (3) V+1 edges (4) E edges (5) depends

**S3-34.** Which finds shortest path in UNWEIGHTED graph optimally:
(1) DFS (2) Dijkstra needed (3) BFS (4) A* only (5) Prim

**S3-35.** Topological order of A→B, A→C, B→D, C→D (one valid):
(1) A B C D (2) D C B A (3) B A C D (4) A D B C (5) none exists

**S3-36.** Backtracking classic example:
(1) merge sort (2) N-Queens (3) binary search (4) hashing (5) BFS

**S3-37.** Best structure for LRU cache:
(1) array only (2) hash map + doubly linked list (3) stack (4) BST (5) trie

**S3-38.** Amortized cost of dynamic-array append:
(1) O(n) always (2) O(1) amortized (3) O(log n) (4) O(n^2) (5) O(n!) worst

**S3-39.** Two pointers on sorted array find pair summing to T in:
(1) O(n^2) (2) O(n log n) (3) O(n) (4) O(log n) (5) O(1)

**S3-40.** Sliding window of size 3 on array of 7 produces how many windows:
(1) 7 (2) 5 (3) 4 (4) 3 (5) 21

**S3-41.** SQL `SELECT DISTINCT dept FROM emp` returns:
(1) all rows (2) unique dept values (3) first row only (4) count (5) error

**S3-42.** `WHERE salary > 50000 AND dept='IT' OR dept='HR'` — precedence bug? Rows from dept HR with low salary included because:
(1) syntax error (2) AND binds tighter than OR (3) OR binds tighter (4) no issue (5) NULL

**S3-43.** 2NF requires 1NF plus:
(1) no transitive deps (2) no partial dependency on part of composite key (3) BCNF first (4) unique index (5) FK mandatory

**S3-44.** Transitive dependency (A→B→C, so A→C indirectly) violates:
(1) 1NF (2) 2NF (3) 3NF (4) BCNF only (5) none

**S3-45.** `DELETE` vs `TRUNCATE`: key difference is:
(1) same (2) DELETE can have WHERE & logs rows; TRUNCATE removes all, faster (3) TRUNCATE keeps rows (4) DELETE is DDL (5) TRUNCATE is DML

**S3-46.** Primary key vs unique key: PK additionally means:
(1) allows NULL (2) no NULL + only one per table (3) duplicates ok (4) many allowed (5) indexed twice

**S3-47.** Foreign key enforces:
(1) uniqueness (2) referential integrity (3) fast search (4) default values (5) sorting

**S3-48.** `SELECT e.name, d.name FROM emp e LEFT JOIN dept d ON e.did=d.id` — employees with no dept show dept:
(1) excluded (2) NULL (3) error (4) 'unknown' (5) 0

**S3-49.** `COUNT(col)` vs `COUNT(*)` differ because:
(1) same (2) COUNT(col) skips NULLs (3) COUNT(*) skips NULLs (4) COUNT(col) counts distinct (5) error

**S3-50.** ACID's Isolation means:
(1) all-or-nothing (2) concurrent txns don't see each other's partial work (3) durability after crash (4) constraints hold (5) logging

### SET-3 (part 1) continues below — Q51–Q100 next block.

**S3-51.** OSI model has how many layers:
(1) 4 (2) 5 (3) 7 (4) 6 (5) 8

**S3-52.** TCP vs UDP: TCP provides:
(1) faster delivery (2) connectionless (3) reliable ordered delivery (4) broadcast (5) no handshake

**S3-53.** HTTPS default port:
(1) 80 (2) 21 (3) 443 (4) 22 (5) 25

**S3-54.** DNS translates:
(1) IP→MAC (2) domain→IP (3) port→service (4) MAC→IP (5) URL→file

**S3-55.** Subnet mask 255.255.255.0 means host portion is:
(1) first 8 bits (2) last 8 bits (3) 16 bits (4) whole (5) none

**S3-56.** In OSI, routing happens at which layer:
(1) data link (2) transport (3) network (4) session (5) application

**S3-57.** Symmetric vs asymmetric crypto: asymmetric uses:
(1) one shared key (2) public/private key pair (3) no keys (4) hashing only (5) faster speed

**S3-58.** Hashing (SHA-256) is mainly used for:
(1) encryption (2) integrity/one-way verification (3) compression (4) authentication of sender identity (5) key exchange

**S3-59.** SQL injection is prevented mainly by:
(1) encryption (2) parameterized queries/prepared statements (3) firewalls (4) HTTPS (5) hashing input

**S3-60.** A digital signature provides:
(1) confidentiality only (2) integrity + authenticity + non-repudiation (3) availability (4) compression (5) anonymity

**S3-61.** Phishing primarily exploits:
(1) protocol flaw (2) human factor/social engineering (3) buffer overflow (4) SQL (5) weak crypto

**S3-62.** Firewall operates mainly by:
(1) encrypting traffic (2) filtering packets by rules (3) routing (4) resolving DNS (5) compression

**S3-63.** Two-factor authentication adds which factor type:
(1) same type twice (2) something you have/are beyond password (3) longer password (4) VPN (5) encryption

**S3-64.** pandas: `df.groupby('dept')['sal'].mean()` produces:
(1) new df rows (2) Series of per-group means (3) scalar (4) error (5) sorted df

**S3-65.** pandas `df.dropna()` default drops:
(1) columns with NaN (2) rows with any NaN (3) nothing (4) duplicates (5) first row

**S3-66.** `df[df['x']>5]` returns:
(1) count (2) filtered DataFrame (3) Series of bools only (4) error (5) first match

**S3-67.** `pd.read_csv` default treats first row as:
(1) data (2) header (3) index (4) skipped (5) types

**S3-68.** Data warehouse vs OLTP DB: DW is optimized for:
(1) transactions (2) analytics/aggregates on history (3) small writes (4) real-time ops (5) single row reads

**S3-69.** Star schema center table is the:
(1) dimension (2) fact table (3) bridge (4) lookup (5) index

**S3-70.** ETL order is:
(1) extract-load-transform (2) transform-extract-load (3) extract-transform-load (4) load-extract-transform (5) none

**S3-71.** Shell: `grep 'error' log.txt | wc -l` does:
(1) prints errors (2) counts matching lines (3) deletes lines (4) sorts (5) counts words only

**S3-72.** Shell: `chmod 755 file` gives owner:
(1) read only (2) rwx (3) rw- (4) --x (5) none

**S3-73.** Shell `ls -l | awk '{print $9}'` prints:
(1) sizes (2) filenames column (3) permissions (4) dates (5) first row

**S3-74.** `find . -name "*.log"` does:
(1) deletes logs (2) lists matching files recursively (3) greps content (4) archives (5) errors

**S3-75.** Shell pipe `cmd1 | cmd2` sends:
(1) stderr (2) stdout of cmd1 to stdin of cmd2 (3) files (4) return code (5) args

**S3-76.** Python: `def f(a, b=2, *args, **kwargs)` — calling `f(1,2,3,4,x=5)` puts 3,4 in:
(1) b (2) kwargs (3) args tuple (4) error (5) x

**S3-77.** Java: method signature that can be overloaded differs in:
(1) return type only (2) parameter list (3) access modifier (4) name (5) throws

**S3-78.** OOP: encapsulation is enforced mainly via:
(1) inheritance (2) private fields + public accessors (3) static (4) abstract (5) packages

**S3-79.** Abstract class vs interface (Java 8+): interface can now have:
(1) constructors (2) instance fields (3) default methods (4) multiple inheritance of state (5) none

**S3-80.** `super()` in a Java/Python subclass calls:
(1) this method (2) parent constructor/method (3) static block (4) main (5) destructor

**S3-81.** C++ object slicing happens when:
(1) pointer used (2) derived assigned to base BY VALUE (3) virtual called (4) new fails (5) delete twice

**S3-82.** Python `self` refers to:
(1) class (2) instance (3) module (4) parent (5) nothing — optional

**S3-83.** Constructor overloading allows:
(1) two identical ctors (2) multiple ctors with different params (3) ctor in interface (4) virtual ctor (5) none

**S3-84.** Python: `is` vs `==` — `is` compares:
(1) values (2) identity (same object) (3) types (4) length (5) hash

**S3-85.** Java `StringBuilder` vs `String` in loops — preferred because:
(1) immutable (2) mutable — avoids object churn (3) faster compile (4) thread-safe always (5) shorter

**S3-86.** Python tuple vs list: tuple is:
(1) mutable (2) immutable (3) slower always (4) unordered (5) string-only

**S3-87.** `try/except/finally` in Python: finally skipped when:
(1) exception (2) return (3) os._exit() or interpreter kill (4) break (5) never skipped

**S3-88.** Exception raised but not caught leads to:
(1) silent continue (2) program termination with traceback (3) retry (4) compile error (5) warning

**S3-89.** Java checked vs unchecked: checked exceptions must be:
(1) ignored (2) declared or caught at compile time (3) runtime only (4) logged (5) static

**S3-90.** Python `with open('f') as fp:` guarantees:
(1) faster read (2) file closed even on error (3) binary mode (4) append (5) lock

**S3-91.** String `"a2b3"` → expand to `"aabbb"` — first step is:
(1) regex replace (2) iterate char+digit pairs (3) sort (4) split (5) hash

**S3-92.** Python `'abcabc'.find('bc')` returns:
(1) 1 (2) 2 (3) -1 (4) 0 (5) 4

**S3-93.** C string compare: `strcmp("apple","apply")` returns:
(1) 0 (2) positive (3) negative (4) true (5) 1

**S3-94.** Reversing words in "the sky blue" → "blue sky the" best uses:
(1) char array only (2) split + reverse list + join (3) regex (4) stack of chars (5) sort

**S3-95.** Longest common prefix of ["flower","flow","flight"]:
(1) "fl" (2) "flow" (3) "flo" (4) "f" (5) ""

**S3-96.** `int f(int n){int c=0; while(n){c+=n%10; n/=10;} return c;}` — f(1234) returns:
(1) 1234 (2) 10 (3) 24 (4) 4 (5) 0

**S3-97.** Count set bits in n=13 (binary 1101):
(1) 2 (2) 3 (3) 4 (4) 13 (5) 1

**S3-98.** `x = a & b; y = a | b;` for a=12 (1100), b=10 (1010): x,y =
(1) 8,14 (2) 14,8 (3) 4,10 (4) 12,10 (5) 0,22

**S3-99.** Missing number in array 0..n with one absent — XOR trick gives it in:
(1) O(n^2) (2) O(n) time O(1) space (3) O(log n) (4) O(n log n) (5) needs sort

**S3-100.** Kadane's algorithm finds:
(1) sort order (2) max subarray sum in O(n) (3) median (4) min element (5) duplicates

### SET-3 Answer Key (all 100)
1-(2) 1+4+9+16=30 · 2-(1) (5/2)*2 + 1 = 4+1=5 · 3-(3) inner shadows, outer stays 10 · 4-(2) 4+3+2+1=10 · 5-(2) missing braces = infinite loop · 6-(3) return 0 on inversion · 7-(2) evens*2 = 0,4,8 · 8-(3) get default 5 · 9-(3) AIOOBE · 10-(1) do-while runs first · 11-(2) pass by value — caller unchanged (trap) · 12-(1) 3 and 1 · 13-(3) 8→4→2→1 = 3 levels · 14-(2) immutable strings · 15-(2) [2] left · 16-(2) 2+7=9 · 17-(3) do-while · 18-(2) \t is one char → 3 · 19-(2) *p writes through · 20-(3) partial init → rest 0 · 21-(3) leftmost = min · 22-(3) left-skew inorder = deepest/last inserted first · 23-(3) LL case → right rotate → root 2 · 24-(1) 2^L · 25-(2) n&(n-1) clears lowest bit · 26-(2) LIFO = undo/eval · 27-(3) FIFO · 28-(2) 2.next.next=2 loops 2↔3 · 29-(2) · 30-(3) skewed = linked list · 31-(1) DFS A→B→C via stack · 32-(2) 2+1=3 via B · 33-(2) V-1 edges in MST · 34-(3) BFS = shortest hops unweighted · 35-(1) A,B,C,D valid topo · 36-(2) N-Queens = backtracking · 37-(2) O(1) both ops · 38-(2) doubling → amortized O(1) · 39-(3) converge two pointers · 40-(2) n-k+1 = 5 · 41-(2) · 42-(2) AND first → HR rows bypass salary check (trap) · 43-(2) no partial dep on composite key · 44-(3) transitive → 3NF · 45-(2) DELETE logged/WHERE vs TRUNCATE wholesale · 46-(2) PK: not null, unique, one per table · 47-(2) referential integrity · 48-(2) LEFT join → NULL dept · 49-(2) COUNT(col) skips nulls · 50-(2) isolation = concurrent invisibility · 51-(3) 7 layers · 52-(3) TCP reliable/ordered · 53-(3) 443 · 54-(2) domain→IP · 55-(2) /24 = last octet hosts · 56-(3) network layer routes · 57-(2) pub/priv pair · 58-(2) integrity one-way · 59-(2) parameterized queries · 60-(2) sign = integrity+auth+nonrepudiation · 61-(2) social engineering · 62-(2) packet filtering · 63-(2) different factor class · 64-(2) groupby+agg = Series · 65-(2) drops NaN rows · 66-(2) boolean mask → filtered df · 67-(2) header row · 68-(2) analytics vs OLTP ops · 69-(2) fact table center · 70-(3) E-T-L · 71-(2) count matching lines · 72-(2) 7=rwx owner · 73-(2) $9 = filename col · 74-(2) recursive find · 75-(2) stdout→stdin · 76-(3) *args catches extra positionals · 77-(2) overload = param list differs · 78-(2) private+getters = encapsulation · 79-(3) default methods since Java 8 · 80-(2) super() = parent · 81-(2) value copy slices derived part · 82-(2) instance ref · 83-(2) differing params allowed · 84-(2) is = identity · 85-(2) mutable avoids copies · 86-(2) tuple immutable · 87-(3) hard exit kills finally · 88-(2) uncaught → traceback exit · 89-(2) checked = compile-time must · 90-(2) context manager closes · 91-(2) pair char+count loop · 92-(1) index 1 · 93-(3) 'e'<'y' → negative · 94-(2) split-reverse-join · 95-(1) common prefix "fl" · 96-(2) digit sum 1+2+3+4=10 · 97-(2) 1101 has 3 bits · 98-(1) AND=8, OR=14 · 99-(2) XOR all = O(n)/O(1) · 100-(2) Kadane max subarray

---

## SET-4 — 100 Qs, 180 min timed (Day 42). Target >= 55%.

**S4-1.** Dry run:
```c
int a[] = {5, 2, 9, 1, 7}, i, m = a[0];
for (i = 1; i < 5; i++) if (a[i] > m) m = a[i];
printf("%d", m);
```
(1) 1 (2) 5 (3) 9 (4) 7 (5) 24

**S4-2.** Output:
```c
int i;
for (i = 0; i < 3; i++);
printf("%d", i);
```
(1) 0 (2) 2 (3) 3 (4) compile error (5) 012

**S4-3.** Dry run:
```c
int x = 1;
while (x < 100) x *= 10;
printf("%d", x);
```
(1) 10 (2) 100 (3) 90 (4) infinite (5) 1

**S4-4.** `int f(int n){if(n<=0)return 0; return n%10+f(n/10);}` — f(987) =
(1) 987 (2) 24 (3) 17 (4) 789 (5) 3

**S4-5.** Debug — should copy array but corrupts:
```c
for (i = 0; i <= n; i++) b[i] = a[i];
```
Bug:
(1) wrong direction (2) off-by-one — a[n],b[n] out of bounds (3) type mismatch (4) no bug (5) needs pointer

**S4-6.** Fill blank — binary search update when target > mid element:
```c
if (a[mid] < t) _____; else hi = mid - 1;
```
(1) hi = mid (2) lo = mid (3) lo = mid + 1 (4) return mid (5) hi = mid + 1

**S4-7.** Python: `print(sorted('dcba'))` outputs:
(1) 'abcd' (2) ['a','b','c','d'] (3) ['d','c','b','a'] (4) error (5) 'dcba'

**S4-8.** Python: `print({1,2,3} & {2,3,4})` outputs:
(1) {1,2,3,4} (2) {2,3} (3) error (4) {1,4} (5) True

**S4-9.** Java: `int x = (int)9.99;` gives:
(1) 10 (2) 9 (3) 9.99 (4) error (5) 0

**S4-10.** Output:
```java
String s = "ab";
s = s + "cd" + 12;
System.out.println(s);
```
(1) abcd12 (2) ab16 (3) abcd3 (4) error (5) abcd

**S4-11.** Recursion:
```c
int h(int n){ if(n==1) return 1; return 2*h(n-1); }
```
h(5) = 
(1) 10 (2) 16 (3) 32 (4) 25 (5) 5

**S4-12.** Which terminates: `int i=10; while(i>=0) i-=3;` prints sequence ending when i is:
(1) 0 (2) -2 (3) 1 (4) -1 (5) infinite

**S4-13.** Python: `print(list(range(2,10,3)))` outputs:
(1) [2,5,8] (2) [2,6,9] (3) [3,6,9] (4) [2,10] (5) [5,8]

**S4-14.** C: `printf("%d", 5 > 3 > 1)` gives:
(1) 1 (2) 0 (3) error (4) true (5) 5

**S4-15.** Ternary: `printf("%c", (4%2==0) ? 'E' : 'O')` prints:
(1) E (2) O (3) 0 (4) error (5) 4

**S4-16.** Python: `x = [1,2]*2; print(x)` outputs:
(1) [2,4] (2) [1,2,1,2] (3) [1,2,2] (4) error (5) [[1,2],[1,2]]

**S4-17.** Off-by-one: printing first n elements should loop:
(1) i<=n (2) i<n starting i=0 (3) i<n starting i=1 (4) i<=n-1 starting 1 (5) any

**S4-18.** Java: `char c = 'A' + 1;` c is:
(1) 'A' (2) 'B' (3) 66 only as int — needs cast, compile error (4) '1' (5) error-free prints B always

**S4-19.** Python: `print('5' + '3')` vs `print(5 + 3)`:
(1) 8 and 8 (2) 53 and 8 (3) error both (4) 8 and 53 (5) 53 and 53

**S4-20.** `int a=1,b=2; a ^= b; b ^= a; a ^= b;` — a,b are now:
(1) 1,2 (2) 2,1 (3) 0,3 (4) 3,0 (5) 2,2

**S4-21.** Height of empty tree vs single node (edges convention):
(1) 0,0 (2) -1,0 (3) 1,1 (4) 0,1 (5) undefined,0

**S4-22.** Insertion order 40,20,60,10,30,50,70 into BST — tree is:
(1) skewed (2) perfectly balanced (3) random (4) heap (5) linear

**S4-23.** Which traversal prints BST keys in descending order:
(1) inorder (2) reverse inorder (right-root-left) (3) preorder (4) postorder (5) level

**S4-24.** Heap after inserting 40,35,30,10 into max-heap — root:
(1) 35 (2) 30 (3) 40 (4) 10 (5) depends

**S4-25.** Building heap from n-element array (bottom-up heapify) costs:
(1) O(n log n) (2) O(n) (3) O(log n) (4) O(n^2) (5) O(1)

**S4-26.** Undirected graph max edges with V vertices:
(1) V (2) V-1 (3) V(V-1)/2 (4) V^2 (5) 2V

**S4-27.** A graph with V=5, E=8 is:
(1) sparse (2) tree (3) dense-ish but valid (4) impossible (> max 10? no—possible) (5) must have cycle

**S4-28.** Linked list vs array for frequent mid-insertions:
(1) array (2) linked list (3) equal (4) hash (5) stack

**S4-29.** Reversing a stack's effect on sequence is best done using:
(1) queue (2) another stack or recursion (3) heap (4) array only (5) hash

**S4-30.** Sparse matrix is best stored as:
(1) full 2D array (2) list of (row,col,val) triples (3) tree (4) stack (5) queue

**S4-31.** Hash collision resolution that keeps all entries inside table:
(1) chaining (2) open addressing (3) rehashing to new table (4) linked tables (5) none

**S4-32.** Load factor of hash table = 
(1) size/keys (2) keys/tableSize (3) collisions/size (4) probes/keys (5) size*keys

**S4-33.** Doubly vs singly linked list main advantage:
(1) less memory (2) backward traversal + O(1) delete-given-node (3) faster search (4) sorting (5) none

**S4-34.** Tree traversal that gives postfix expression from expression tree:
(1) inorder (2) preorder (3) postorder (4) level (5) none

**S4-35.** In a complete binary tree array (1-indexed), node i's parent:
(1) 2i (2) i/2 (3) i-1 (4) 2i+1 (5) i+1

**S4-36.** BFS uses queue; using a stack instead produces:
(1) BFS still (2) DFS order (3) random (4) error (5) heap order

**S4-37.** Minimum comparison sort on n elements lower bound:
(1) O(n) (2) O(n log n) (3) O(log n) (4) O(n^2) (5) O(1)

**S4-38.** Radix sort complexity with d digits, base b:
(1) O(n^2) (2) O(d*(n+b)) (3) O(n log n) (4) O(d^n) (5) O(b)

**S4-39.** Activity selection greedy picks next activity by:
(1) earliest start (2) shortest duration (3) earliest finish (4) latest start (5) random

**S4-40.** Memoization vs tabulation:
(1) same (2) top-down recursion + cache vs bottom-up table (3) memo is iterative (4) tab uses stack (5) tab slower

**S4-41.** `T(n) = T(n-1) + n` solves to:
(1) O(n) (2) O(n^2) (3) O(log n) (4) O(n log n) (5) O(1)

**S4-42.** `T(n) = 2T(n/2) + 1` solves to:
(1) O(n) (2) O(n log n) (3) O(log n) (4) O(n^2) (5) O(1)

**S4-43.** Which is NOT divide & conquer:
(1) merge sort (2) quicksort (3) binary search (4) bubble sort (5) Karatsuba

**S4-44.** Finding kth smallest — quickselect average:
(1) O(n log n) (2) O(n) (3) O(k log n) (4) O(n^2) always (5) O(k)

**S4-45.** Prim's MST differs from Kruskal mainly in:
(1) result differs (2) grows one tree from a vertex vs forest of edges (3) works on DAG only (4) uses BFS (5) slower always

**S4-46.** Detect cycle in DIRECTED graph needs DFS plus:
(1) queue (2) recursion-stack (on-path) marking (3) sorting (4) BFS only (5) heap

**S4-47.** Bellman-Ford over Dijkstra is needed when:
(1) unweighted (2) negative edges present (3) dense (4) small graph (5) DAG

**S4-48.** Floyd-Warshall computes:
(1) single-source shortest (2) all-pairs shortest paths (3) MST (4) topo order (5) cycles only

**S4-49.** Amortized stack with multipop remains:
(1) O(n) per op (2) O(1) amortized per op (3) O(log n) (4) O(n^2) (5) undefined

**S4-50.** Hashing average lookup assumes:
(1) sorted keys (2) uniform hash distribution + low load factor (3) chaining banned (4) prime keys (5) small table

### SET-4 part 1 ends — Q51–Q100 next.

**S4-51.** SQL: which finds employees paid more than their manager:
(1) self-join on emp/mgr (2) GROUP BY (3) UNION (4) subquery on dept only (5) impossible

**S4-52.** Second-highest salary — correct approach:
(1) MAX(salary) (2) LIMIT 1 OFFSET 1 on DESC distinct / MAX < overall max (3) AVG (4) MIN (5) COUNT

**S4-53.** `IN` vs `EXISTS`: EXISTS is usually better for:
(1) small lists (2) correlated subquery existence checks (3) constants (4) joins (5) indexes

**S4-54.** Index speeds up SELECT but slows:
(1) reads (2) INSERT/UPDATE/DELETE (3) commit (4) nothing (5) joins only

**S4-55.** BCNF stricter than 3NF because:
(1) no transitive at all (2) every determinant must be a candidate key (3) allows partial deps (4) more tables (5) denormalized

**S4-56.** ACID Atomicity means:
(1) visible instantly (2) all-or-nothing transaction (3) no locks (4) logged (5) replicated

**S4-57.** Dirty read happens when txn reads:
(1) committed data (2) uncommitted data of another txn (3) own writes (4) index (5) nulls

**S4-58.** `SELECT dept, AVG(sal) FROM emp GROUP BY dept` — non-aggregated column in SELECT not in GROUP BY causes:
(1) wrong avg (2) SQL error in strict mode (3) nulls (4) crash (5) first value

**S4-59.** Natural join matches on:
(1) specified columns (2) all same-named columns (3) PK only (4) first column (5) none

**S4-60.** Denormalization in a warehouse is done for:
(1) integrity (2) fewer joins → faster reads (3) less storage (4) security (5) transactions

**S4-61.** TCP three-way handshake order:
(1) SYN, SYN-ACK, ACK (2) ACK, SYN, FIN (3) SYN, ACK, FIN (4) FIN, ACK, SYN (5) SYN, ACK, ACK

**S4-62.** MAC address operates at which OSI layer:
(1) physical (2) data link (3) network (4) transport (5) session

**S4-63.** Private IP range includes:
(1) 8.8.8.8 (2) 192.168.x.x (3) 172.33.x.x (4) 11.0.0.1 (5) 200.1.1.1

**S4-64.** `ping` uses which protocol:
(1) TCP (2) UDP (3) ICMP (4) HTTP (5) ARP

**S4-65.** Subnet /26 leaves how many usable host addresses per subnet (roughly):
(1) 64 (2) 62 (3) 30 (4) 126 (5) 32

**S4-66.** SSL/TLS sits conceptually between:
(1) app and transport (2) data link and network (3) physical (4) above app (5) inside TCP

**S4-67.** ARP resolves:
(1) domain→IP (2) IP→MAC (3) MAC→IP (4) port→IP (5) host→domain

**S4-68.** Default port of SSH:
(1) 21 (2) 23 (3) 22 (4) 25 (5) 80

**S4-69.** Diffie-Hellman solves:
(1) authentication (2) key exchange over insecure channel (3) hashing (4) signing (5) compression

**S4-70.** Brute-force defense that slows each login attempt:
(1) MD5 (2) bcrypt/PBKDF2 + rate limiting (3) base64 (4) ROT13 (5) CRC

**S4-71.** XSS injects malicious:
(1) SQL (2) client-side script into pages others view (3) packets (4) headers only (5) emails

**S4-72.** CSRF exploits:
(1) stolen password (2) authenticated user's browser session (3) open ports (4) weak TLS (5) SQL

**S4-73.** Principle of least privilege means:
(1) admin for all (2) minimum access needed for the task (3) no access (4) shared accounts (5) root daily

**S4-74.** Certificate Authority's role:
(1) encrypts data (2) vouches public key ownership via signed certs (3) blocks ports (4) issues IPs (5) scans viruses

**S4-75.** Honeypot is a:
(1) firewall rule (2) decoy system to study/lure attackers (3) antivirus (4) VPN (5) proxy

**S4-76.** pandas `df.iloc[0]` vs `df.loc[0]`:
(1) same always (2) iloc = position, loc = label (3) loc faster (4) iloc = label (5) error

**S4-77.** `df.isnull().sum()` shows:
(1) total rows (2) NaN count per column (3) dtypes (4) memory (5) shape

**S4-78.** pandas `df['a'].fillna(0)`:
(1) drops NaN (2) replaces NaN with 0 (3) errors (4) converts to str (5) sorts

**S4-79.** `pd.concat([a,b])` vs merge:
(1) same (2) concat stacks rows/cols; merge joins on keys (3) concat joins on keys (4) merge stacks (5) error

**S4-80.** `df.corr()` returns:
(1) column names (2) pairwise correlation matrix (3) sums (4) groups (5) covariance scalar

**S4-81.** OLAP cube operation that summarizes upward:
(1) drill-down (2) roll-up (3) slice (4) pivot (5) dice

**S4-82.** Slowly changing dimension (SCD) Type 2 keeps:
(1) latest only (2) full history via new rows (3) separate table only (4) no history (5) flags only

**S4-83.** Snowflake vs star schema: snowflake has:
(1) denormalized dims (2) normalized dimension tables (3) no facts (4) fewer tables (5) no PKs

**S4-84.** Shell `echo $?` shows:
(1) PID (2) last command's exit status (3) date (4) user (5) path

**S4-85.** Shell `command > file 2>&1` does:
(1) only stdout (2) stdout+stderr to file (3) stderr to screen (4) append (5) error

**S4-86.** `sed 's/old/new/g' file` replaces:
(1) first match per file (2) all matches per line (3) deletes lines (4) renames file (5) case-sensitive only flag needed

**S4-87.** `tail -f log` is used for:
(1) first lines (2) live-follow file growth (3) delete (4) search (5) sort

**S4-88.** `xargs` primarily:
(1) kills process (2) builds command args from stdin (3) exports vars (4) archives (5) loops

**S4-89.** `crontab` schedules:
(1) one-time tasks (2) recurring jobs (3) users (4) kernels (5) backups only

**S4-90.** `awk -F: '{print $1}' /etc/passwd` prints:
(1) UIDs (2) usernames (3) shells (4) home dirs (5) GIDs

**S4-91.** Python: `"a-b-c".split('-', 1)` returns:
(1) ['a','b','c'] (2) ['a','b-c'] (3) ['a-b','c'] (4) 'a' (5) error

**S4-92.** First unique char in "aabbcdd" is at index:
(1) 0 (2) 4 (3) 3 (4) 2 (5) none

**S4-93.** Palindrome check ignoring case for "Level" returns:
(1) False (2) True (3) error (4) 'level' (5) 0

**S4-94.** `'abc'.upper().isupper()` in Python:
(1) False (2) True (3) error (4) None (5) 'ABC'

**S4-95.** Longest palindromic substring of "babad" could be:
(1) bab or aba (2) babad (3) ab (4) d (5) none

**S4-96.** Bitwise: `n << 1` equals:
(1) n/2 (2) n*2 (3) n+1 (4) n^2 (5) -n

**S4-97.** Swap last two digits logic for n=1234 → extract last digit uses:
(1) n/10 (2) n%10 (3) n-4 (4) n>>1 (5) n&1

**S4-98.** Counting duplicates in array via hash map costs:
(1) O(n^2) (2) O(n) time O(n) space (3) O(1) (4) O(log n) (5) sort first required

**S4-99.** Dutch national flag (3-way partition) sorts 0s/1s/2s in:
(1) O(n log n) (2) O(n) single pass (3) O(n^2) (4) O(1) (5) O(2^n)

**S4-100.** Reservoir/two-sum variant needing O(1) extra space on sorted input uses:
(1) hash map (2) two pointers (3) heap (4) DFS (5) stack

### SET-4 Answer Key (all 100)
1-(3) max = 9 · 2-(3) `for...;` empty body — i ends at 3 (classic trap) · 3-(2) 1→10→100 stops · 4-(2) 7+8+9 = 24 digit sum · 5-(2) i<=n writes one past end · 6-(3) lo = mid+1 when target right · 7-(2) sorted returns list of chars · 8-(2) & = set intersection · 9-(2) cast truncates · 10-(1) string concat left-to-right · 11-(2) 2^4 = 16 · 12-(4) 10,7,4,1,-2 — ends at -2 wait 1-3 = -2 → option (4)-1? compute: 10-3=7, 7-3=4, 4-3=1, 1-3=-2 stops → last i = -2; but option (4) is -1 — sequence actually: while i>=0 prints? no print inside — i ends -2; closest listed: (4) -1 is wrong, (2) -2 correct → 12-(2) · 13-(1) step 3 from 2 → 2,5,8 · 14-(2) (5>3)=1, 1>1 = 0 — chained compare trap in C · 15-(1) 4%2==0 → 'E' · 16-(2) list repeat · 17-(2) i<n from 0 covers n items · 18-(3) char+int needs cast in Java — 'A'+1 is int 66; assigning to char without cast = compile error → 18-(3) · 19-(2) '53' vs 8 · 20-(2) XOR swap → 2,1 · 21-(2) convention: empty=-1, single=0 edges · 22-(2) median-first inserts → balanced · 23-(2) right-root-left · 24-(3) 40 stays root · 25-(2) heapify = O(n) · 26-(3) V(V-1)/2 · 27-(5) tree max V-1=4 edges; 8 edges must contain cycles → also valid graph, but (5) guaranteed · 28-(2) pointer fix vs shifting · 29-(2) stack reverses → another stack/recursion · 30-(2) triples save space · 31-(2) open addressing stays in table · 32-(2) n/size · 33-(2) backward walk + O(1) delete node · 34-(3) postorder = postfix · 35-(2) i/2 · 36-(2) stack → DFS · 37-(2) comparison-sort bound · 38-(2) O(d(n+b)) · 39-(3) earliest finish = optimal · 40-(2) top-down vs bottom-up · 41-(2) sum 1..n · 42-(1) n leaves, O(n) work total · 43-(4) bubble doesn't divide · 44-(2) avg O(n) · 45-(2) vertex-grown vs edge-forest · 46-(2) gray/black marking catches back-edge · 47-(2) negative weights · 48-(2) all-pairs · 49-(2) amortized constant · 50-(2) uniform + low α · 51-(1) self-join e.mgr = m.id · 52-(2) second distinct max · 53-(2) correlated existence · 54-(2) writes must update index · 55-(2) every determinant = candidate key · 56-(2) all-or-nothing · 57-(2) uncommitted data = dirty · 58-(2) strict mode errors — must aggregate or group it · 59-(2) same-named cols · 60-(2) read speed · 61-(1) SYN→SYN-ACK→ACK · 62-(2) data link = MAC · 63-(2) 192.168.x.x private · 64-(3) ICMP echo · 65-(2) /26 → 64-2 = 62 usable · 66-(1) between app & transport · 67-(2) IP→MAC · 68-(3) SSH = 22 · 69-(2) key agreement · 70-(2) slow KDF + throttle · 71-(2) script injection · 72-(2) rides user's session · 73-(2) least privilege · 74-(2) CA binds key→identity · 75-(2) decoy · 76-(2) iloc positional / loc label · 77-(2) per-column NaN counts · 78-(2) fill NaN with 0 · 79-(2) stacking vs key join · 80-(2) correlation matrix · 81-(2) roll-up aggregates up · 82-(2) Type 2 = versioned rows · 83-(2) normalized dims · 84-(2) $? = exit status · 85-(2) 2>&1 merges stderr · 86-(2) g flag = per-line global · 87-(2) follow mode · 88-(2) stdin → args · 89-(2) recurring cron jobs · 90-(2) field 1 = username · 91-(2) maxsplit=1 → ['a','b-c'] · 92-(2) 'c' at index 4 is unique first · 93-(2) casefold compare = True · 94-(2) 'ABC'.isupper() True · 95-(1) 'bab' or 'aba' both valid · 96-(2) left shift doubles · 97-(2) %10 = last digit · 98-(2) single pass hash · 99-(2) DNF = one pass 3 pointers · 100-(2) sorted + two pointers = O(1) space

---

## A-POOL — Daily practice (3-5/day from Day 29, untimed, error-log every miss)

**P1.** `int f(int n){return n<2?n:f(n-1)+f(n-2);}` — f(6) = (1) 8 (2) 13 (3) 5 (4) 21 (5) 6
**P2.** Python `print(7//2*2)` = (1) 7 (2) 6 (3) 7.0 (4) 6.0 (5) 8
**P3.** Java `int a = 1; a += a++ + ++a;` a = (1) 4 (2) 5 (3) 6 (4) 3 (5) undefined
**P4.** Stack pop sequence of pushed 1,2,3,4 fully: (1) 1,2,3,4 (2) 4,3,2,1 (3) 2,1,4,3 (4) any (5) 1,3,4,2
**P5.** Inorder of BST [8,3,10,1,6,14] = (1) sorted 1 3 6 8 10 14 (2) 8 3 1 6 10 14 (3) 1 3 6 8 14 10 (4) random (5) 14 10 8 6 3 1
**P6.** `printf("%d", 'a')` in C prints (1) a (2) 97 (3) error (4) 0 (5) address
**P7.** Python `print('ab'*0)` = (1) 'ab' (2) '' (3) error (4) 0 (5) None
**P8.** Queue dequeue on empty = (1) null always (2) underflow/error (3) last item (4) wraps (5) 0
**P9.** Binary search requires data: (1) linked (2) sorted + random access ideally (3) hashed (4) reversed (5) unsorted ok
**P10.** `T(n)=T(n-1)+1` = (1) O(n) (2) O(1) (3) O(log n) (4) O(n^2) (5) O(2^n)
**P11.** Java `System.out.println(1 + 2 + "3")` = (1) "33" (2) "123" (3) "15" (4) error (5) 6
**P12.** But `println("1" + 2 + 3)` = (1) "15" (2) "33" (3) "123" (4) 6 (5) error
**P13.** Python `print(bool([]))` = (1) True (2) False (3) error (4) None (5) []
**P14.** Leaf count of full binary tree with 7 nodes: (1) 3 (2) 4 (3) 7 (4) 2 (5) 1
**P15.** `while(n)` in C loops until n is (1) negative (2) 0 (3) 1 (4) true (5) even
**P16.** Python `a, b = b, a` performs (1) error (2) swap via tuple packing (3) copy (4) alias (5) sort
**P17.** Quick worst on already-sorted w/ last-element pivot: (1) O(n log n) (2) O(n^2) (3) O(n) (4) O(log n) (5) O(1)
**P18.** Stable sort preserves (1) speed (2) relative order of equal keys (3) memory (4) duplicates (5) indexes
**P19.** `int *p = malloc(4); free(p); *p=1;` = (1) fine (2) use-after-free UB (3) compile error (4) leak (5) realloc
**P20.** DFS on tree pre/in/post — preorder prints root (1) last (2) first (3) middle (4) never (5) twice
**P21.** Python `d={'x':1,'y':2}; list(d)` = (1) values (2) keys (3) pairs (4) error (5) sorted keys
**P22.** `O(log n)` algorithms halve the problem each step — example: (1) linear (2) binary search (3) bubble (4) merge full (5) DFS
**P23.** C `for(;;)` is (1) error (2) infinite loop (3) skips body (4) runs once (5) zero loops
**P24.** Which is a collision-resolution method: (1) indexing (2) chaining (3) sorting (4) paging (5) caching
**P25.** Java `int[] a = new int[3]; a[3]=1;` (1) ok (2) AIOOBE (3) 1 stored (4) null (5) compile error
**P26.** Python `s = 'hello'; s[1:4]` = (1) 'ell' (2) 'hel' (3) 'ello' (4) 'llo' (5) error
**P27.** Priority queue best implemented via (1) stack (2) heap (3) array scan (4) LL (5) deque
**P28.** `n % 2 == 0` tests (1) odd (2) even (3) prime (4) divisible 4 (5) positive
**P29.** Tree edges for 21 nodes: (1) 21 (2) 20 (3) 22 (4) 19 (5) 10
**P30.** C `a++` vs `++a` difference matters when (1) never (2) value is used in expression (3) loops only (4) pointers (5) chars
**P31.** Java `Math.floor(-2.5)` = (1) -2 (2) -3 (3) -2.5 (4) 2 (5) -2.0→-3.0 same? floor(-2.5)=-3.0
**P32.** Python `'abc' in 'xabcy'` = (1) False (2) True (3) error (4) 1 (5) index
**P33.** Depth-first on DAG for topo sort uses finish times ordered (1) ascending (2) descending (3) random (4) by edges (5) equal
**P34.** Linked list tail insertion WITHOUT tail pointer costs (1) O(1) (2) O(n) (3) O(log n) (4) O(n^2) (5) 0
**P35.** `int x = 5 / 0` in Java (1) inf (2) ArithmeticException (3) 0 (4) NaN (5) compile error
**P36.** But `5.0 / 0` in Java gives (1) exception (2) Infinity (3) 0 (4) NaN (5) error
**P37.** Python `divmod(17,5)` = (1) (3,2) (2) (2,3) (3) 3 (4) (5,17) (5) error
**P38.** XOR of a number with itself = (1) n (2) 0 (3) 1 (4) -n (5) 2n
**P39.** BFS shortest-path guarantee holds only when edges are (1) weighted (2) unweighted/unit cost (3) negative (4) directed (5) dense
**P40.** `sizeof(int)` typically on 64-bit Linux gcc = (1) 8 (2) 4 (3) 2 (4) 16 (5) 64
**P41.** Python `print(0.1+0.2==0.3)` = (1) True (2) False — float trap (3) 0.3 (4) error (5) None
**P42.** C `char *s="abc"; s[0]='x';` = (1) "xbc" (2) UB — string literal (3) fine (4) error (5) copies
**P43.** Java interface can contain (1) instance fields (2) abstract + default/static methods (3) constructors (4) private state (5) main only
**P44.** Number of comparisons to find max AND min together (pairwise trick) ≈ (1) 2n (2) 1.5n (3) n log n (4) n^2 (5) 3n
**P45.** `deque.appendleft()` exists in (1) Java only (2) Python collections (3) C std (4) JS array (5) none
**P46.** Postfix `5 1 2 + 4 * + 3 -` = (1) 14 (2) 40 (3) 11 (4) 10 (5) 23
**P47.** `git`-like undo via two stacks models (1) queue (2) undo/redo (3) heap (4) trie (5) hash
**P48.** Recursion depth of balanced-BST search = (1) n (2) log n (3) 1 (4) n^2 (5) 2^n
**P49.** Python `{x: x*x for x in range(3)}` = (1) {0:0,1:1,2:4} (2) [0,1,4] (3) {0,1,4} (4) error (5) {(0,0)}
**P50.** Which DS for phone-book prefix search "sho"→"shobhit,shona": (1) hash (2) trie (3) stack (4) queue (5) array
**P51.** SQL `WHERE x IN (SELECT ...)` returns rows matching (1) all (2) any listed (3) none (4) distinct only (5) sums
**P52.** `UNION` vs `UNION ALL`: UNION removes (1) nulls (2) duplicates (3) columns (4) order (5) rows
**P53.** Java `String s=null; s.length()` = (1) 0 (2) NullPointerException (3) null (4) error compile (5) -1
**P54.** Python `sorted(d.items(), key=lambda x: x[1])` sorts dict by (1) key (2) value (3) index (4) length (5) hash
**P55.** Adjacency list space = (1) O(V^2) (2) O(V+E) (3) O(E^2) (4) O(V) (5) O(1)
**P56.** C `int a[]={1,2,3}; printf("%d", *(a+1))` = (1) 1 (2) 2 (3) 3 (4) address (5) error
**P57.** Deadlock needs which condition among: (1) no locks (2) circular wait (3) fast CPU (4) single thread (5) GC
**P58.** Python `l.sort()` vs `sorted(l)`: sort() (1) returns new list (2) sorts in place, returns None (3) same (4) errors (5) copies
**P59.** Which traversal detects a cycle via "back edge" in DFS: (1) white/gray/black coloring (2) BFS level (3) inorder (4) heap (5) none
**P60.** Merging two sorted linked lists efficiently uses (1) sort again (2) two-pointer merge O(m+n) (3) hash (4) stack (5) O(m*n)

### A-POOL Answer Key
P1-(1) fib(6)=8 · P2-(2) 7//2=3, *2=6 int math · P3-(2) Java: a += (1)+(3) → 1+1+3=5 (eval order trap) · P4-(2) LIFO · P5-(1) · P6-(2) char literal → int 97 · P7-(2) *0 = empty · P8-(2) underflow · P9-(2) · P10-(1) linear · P11-(1) 3 then concat → "33" · P12-(3) "1"+2+3 = "123" (left-to-right) · P13-(2) empty list falsy · P14-(2) (7+1)/2 = 4 · P15-(2) · P16-(2) tuple swap · P17-(2) · P18-(2) · P19-(2) use-after-free · P20-(2) pre = root first · P21-(2) iter(dict) = keys · P22-(2) · P23-(2) · P24-(2) · P25-(2) index 3 OOB · P26-(1) slice 1..3 = 'ell' · P27-(2) heap = O(log n) · P28-(2) · P29-(2) n-1 · P30-(2) pre/post differ in expr value · P31-(2) floor goes DOWN = -3.0 · P32-(2) substring test · P33-(2) descending finish times · P34-(2) must walk to end · P35-(2) int /0 throws · P36-(2) float /0 = Infinity · P37-(1) (3,2) · P38-(2) x^x=0 · P39-(2) unit costs only · P40-(2) int stays 4B · P41-(2) 0.1+0.2 = 0.30000000000000004 · P42-(2) literal in read-only · P43-(2) abstract+default+static ok · P44-(2) 3n/2 pairwise · P45-(2) collections.deque · P46-(1) 5+12-3 = 14 · P47-(2) two stacks = undo/redo · P48-(2) depth = height ~ log n · P49-(1) dict comprehension · P50-(2) trie prefix · P51-(2) · P52-(2) UNION dedupes · P53-(2) NPE on null · P54-(2) sort by value · P55-(2) · P56-(2) *(a+1) = a[1] = 2 · P57-(2) circular wait = deadlock condition · P58-(2) in-place, returns None (trap) · P59-(1) gray→gray edge = cycle · P60-(2) merge walk O(m+n)

---

## B. Coding-test problems — extended set

Same rules: Simple 15 min / Moderate 25 / Hard 40. Added mains-insurance problems:

### Simple tier (new)
- **B14.** Move all zeros to end, keep order (two pointers)
- **B15.** First non-repeating char in string
- **B16.** Merge two sorted arrays in place/into result
- **B17.** Valid parentheses via stack
- **B18.** Count digits / sum digits / reverse integer (overflow care)

### Moderate tier (new)
- **B19.** Rotate array right by k (reversal algorithm)
- **B20.** Two-sum on sorted array + unsorted (both variants)
- **B21.** Level-order traversal printing each level on its own line
- **B22.** Find cycle start in linked list + count cycle length
- **B23.** LRU-cache skeleton (describe hash+DLL design, implement ops)
- **B24.** Group anagrams from word list (hash by sorted key)
- **B25.** Next greater element for each array position (monotonic stack)

### Hard tier (new)
- **B26.** Kth largest in a stream (running input) — size-k min-heap
- **B27.** LCA of two nodes in BST + in plain binary tree
- **B28.** Serialize/deserialize BST or binary tree (explain format)
- **B29.** Max sliding-window values (deque) — describe the deque invariant
- **B30.** Edit distance between two strings (DP table)

**B-hints:** B14 write-pointer swap · B15 freq map + second scan · B16 two-pointer walk · B17 push open, pop on close · B18 careful: reverse can overflow → use long/build in result type · B19 reverse thrice · B20 sorted→2ptr, unsorted→hash · B21 queue + level-size counter · B22 Floyd's + reset · B23 map→node, DLL for order · B24 sorted-string key · B25 stack holds indexes of pending smaller elements · B26 min-heap of k seen so far · B27 BST: split point; BT: recursion returns node or null · B28 preorder + nulls markers · B29 deque stores decreasing candidates; front = max · B30 dp[i][j] = min(insert,delete,replace)+1
