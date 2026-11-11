# Phase 2 Practice — Mains-style Questions

Two sections: **A** = 2026-format MCQs (dry run / debug / logic fill) and
**B** = 2024-format coding problems (practice as insurance — SEBI has flipped formats).
Do 3–5/day from Day 29 onward. Answers/approaches at bottom.

## A. Dry-run / debug / logic-fill MCQs

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
