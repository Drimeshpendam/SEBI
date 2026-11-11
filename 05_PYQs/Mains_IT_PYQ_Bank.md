# SEBI IT Mains PYQ Bank — Real Memory-Based Questions (Phase 2 Paper 2)

> Source: recalled questions from actual SEBI Grade A IT Mains candidates (2025–2026 cycle), grouped by topic with verified answers. These are **real exam questions** — the pattern, phrasing, and difficulty you'll actually face. Drill these until every answer is reflex.
>
> **Distribution from recall:** DSA ~55% · OOP (C++/Java/Python) ~25% · Complexity/algorithm design ~12% · DBMS/indexing ~8%.
> Phase 2 IT = 100 MCQs in 180 min, −¼ negative marking, cutoff 40%, weightage 2/3 of final merit.

---

## 01 · Sorting (answer after covering)

| Q | A |
|---|---|
| How does Insertion Sort work? | Inserts each element into its correct position in the sorted part |
| How does Selection Sort work? | Repeatedly selects the minimum of the unsorted part and swaps it in |
| Is Merge Sort stable? | Yes |
| Why prefer Merge Sort over Quick Sort? | Stability + guaranteed O(n log n) |
| Worst-case time complexity of Quick Sort? | O(n²) |
| When does Quick Sort hit worst case? | Pivot always smallest/largest → unbalanced partitions (e.g., sorted input) |
| Average time complexity of Bubble Sort? | O(n²) |
| Time complexity of Merge Sort? | O(n log n) |
| Recurrence relation of Merge Sort? | T(n) = 2T(n/2) + O(n) |
| Sort efficient only when elements are uniformly distributed? | Bucket sort |

## 02 · Searching & Complexity
| Q | A |
|---|---|
| Time complexity of Binary Search? | O(log n) |
| Best search for uniformly distributed data? | Interpolation search |
| Best search for large sorted random-access array? | Binary search |
| Nested loops N × N/2 complexity? | O(N²) |
| Strassen's matrix multiplication complexity? | O(n^log₂7) ≈ O(n^2.81) |
| Algorithm used in plagiarism detection? | Rabin–Karp |
| Which algorithm uses the LPS array? | KMP |
| Key property of Dynamic Programming? | Optimal substructure |
| Technique for Sudoku / N-Queen? | Backtracking |
| N-Queen valid-placement condition? | No two queens share row, column, or diagonal |

## 03 · Hashing
| Q | A |
|---|---|
| Hashing technique using linked lists? | Separate chaining |
| Load factor in separate chaining? | α = n/m, can exceed 1 |
| Hash table best-case search? | O(1) |
| Why are range queries slow in hash tables? | Order not maintained → O(n) |

## 04 · Stacks, Queues, Linked Lists
| Q | A |
|---|---|
| DFS uses which data structure? | Stack |
| Stack operations? | Push, Pop, Peek |
| In infix→postfix, lower-precedence operator arrives → ? | Pop higher-precedence ops until stack top is lower or '(' found |
| Queue operations? | Enqueue, Dequeue, Front |
| Java class implementing Queue? | LinkedList |
| Insert at beginning of linked list? | O(1) |

## 05 · Trees (BST, AVL, B-Tree)
| Q | A |
|---|---|
| Max height of AVL with 12 nodes? | 4 (AVL height ≈ 1.44·log₂(n+2)) |
| 2^(k+1) − 1 represents? | Max nodes in binary tree of height k |
| Binary tree with N nodes → edges? | N − 1 |
| Strict/full binary tree, 8 leaves → total nodes? | 15 |
| Balance factor −1, 0, +1 at every node? | AVL tree |
| Data structure for database indexing? | B-Tree |
| Postorder traversal order? | Left → Right → Root |
| BST preorder 16,11,13,12,17,20,21 → postorder? | 12, 13, 11, 21, 20, 17, 16 |
| Traversal unique for binary tree? | BFS (level-order) |

## 06 · Graphs
| Q | A |
|---|---|
| Best representation for a dense graph? | Adjacency matrix |
| 5-regular graph, 6 vertices → edges? | 15 (= 5×6/2) |
| Planar graph E=30, F=20 → vertices? | 12 (Euler: V − E + F = 2) |
| Indegree zero for all vertices? | Edgeless/null graph |
| What is a regular graph? | Every vertex has the same degree |
| Prim's MST works on which principle? | Greedy — adds nearest vertex not in MST |

## 07 · OOP — C++, Java, Python
| Q | A |
|---|---|
| Virtual function in C++ used for? | Runtime polymorphism |
| Pure virtual function? | `=0`; makes class abstract, must be overridden |
| Encapsulation means? | Binding data + the methods operating on it together |
| NOT part of OOP? | Anything outside the 4 pillars (abstraction, encapsulation, inheritance, polymorphism) |
| Good software design principle? | High cohesion, low coupling |
| Java multiple inheritance? | Only through interfaces |
| Java 8 keyword for concrete interface methods? | `default` |
| Java Anonymous Inner Class? | Unnamed one-time implementation of interface/subclass |
| Hierarchical inheritance? | One base class → multiple derived classes |
| Static method in base & derived, called via base reference → ? | Parent's version runs (statics are hidden, not overridden) |

## 08 · Strings & Language Functions
| Q | A |
|---|---|
| C++ substring function? | `substr()` |
| C++ string length? | `length()` / `size()` |
| C string length? | `strlen()` |
| C first occurrence of a char? | `strchr()` |
| Java substring index? | `indexOf()` |

## 09 · Arrays, Python, JSON
| Q | A |
|---|---|
| 1D array storage in C? | Contiguous memory |
| a[3][4]: third element of first row? | `a[0][2]` |
| Java 2D array — column length of a row? | `array[row].length` |
| Python slicing example? | `abc[1:4]` → `'bcd'` |
| Python slice of size k — complexity? | O(k) |
| Python multiline strings? | Triple quotes `'''` or `"""` |
| Python constructor? | `__init__()` |
| Child calls shared method name (Python)? | Child's version runs |
| JSON → string in Python? | `json.dumps()` → returns `str` |

## 10 · Dry-run / Logic-flow pattern (new Mains format)
The Feb-2026 notification defines the IT paper as: *"logic flow completion, program dry-run outputs, debugging, syntax understanding, data analysis."* Expect questions like:

```c
int next_even(void) {
    static int n = 0;
    n = n + 2;
    return n;
}
void update(int a, int *b) { int t = a; a = *b; *b = t; }
int main(void) {
    int x = 3, y = 7;
    update(x, &y);
    next_even();
    printf("%d %d %d", x, y, next_even());
}
```
**Answer: `3 3 4`** — x passed by value stays 3; *b writes 3 into y; static n persists: first call returns 2 (discarded), second returns 4.

```java
Base b = new Child();
// b.name → "base"   (field follows reference type)
// b.who() → "Child.who"  (method follows object type — overridden)
// Base.tag() → "Base.tag" (static follows compile-time class)
```

**Drill protocol:** cover the answer column, go top-to-bottom, check each. Any hesitation → re-read that section in the Notes file. Repeat until the whole bank is reflex — these exact one-liners ARE the exam.
