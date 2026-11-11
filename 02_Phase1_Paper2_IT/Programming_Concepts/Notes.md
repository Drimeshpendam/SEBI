# Programming Concepts — Full Study Notes (30% of Paper 2 — the biggest topic)

> **Official syllabus:** program control (iteration, recursion, functions) · scope & binding of variables · parameter passing · functional & logic programming · OOP (classes, objects, inheritance, constructors) · exception handling — across **Java, C, C++**.
>
> **How SEBI tests it (real recalled questions):** program dry-run output (C static vars, pointers, Java overridden vs hidden methods), pure-virtual functions, interface `default` methods, anonymous inner classes, hierarchical inheritance, static method hiding, `substr()`/`strlen()`/`indexOf()` function names.
>
> **30% of the paper = ~15 of 50 questions. This file is your single highest-ROI study material in Paper 2.**

---

## 1. Program Control: loops, recursion, functions

### Loops — the dry-run skill (SEBI's #1 format)
A dry-run question gives you code and asks the output. Method:
1. Trace variables in a table — one column per variable, one row per iteration.
2. Watch **loop boundaries**: `i < n` runs n times (0..n−1); `i <= n` runs n+1.
3. Watch **post/pre increment**: `i++` uses-then-adds; `++i` adds-then-uses.

**Worked:**
```c
int s = 0;
for (int i = 1; i <= 5; i++) s += i;
// i:1→s:1 · i:2→s:3 · i:3→s:6 · i:4→s:10 · i:5→s:15 → prints 15
```

### Recursion — always trace with a call-stack drawing
- Every recursion needs: **base case** (stops) + **recursive case** (smaller input).
- Missing base case → stack overflow (infinite recursion).
- Trace: write each call on a stack, resolve top-down on return.

**Worked (classic SEBI style):**
```c
int f(int n) { return n <= 1 ? 1 : n * f(n-1); }
// f(4): 4*f(3) → 4*3*f(2) → 4*3*2*f(1)=1 → returns 24 (factorial)
```
- Tail recursion: recursive call is the LAST statement → compilers can optimize to a loop.
- Fibonacci naive recursion = O(2ⁿ) — a favorite complexity MCQ.
- **Real SEBI-style MCQ:** "Recursion uses which data structure internally?" → **Stack** (the call stack — memorise this one-liner).

### Functions
- `return` exits immediately — code after it in the branch never runs.
- C: no function overloading. C++/Java: overloading allowed (same name, different params — resolved at COMPILE time = static polymorphism).

---

## 2. Scope, Binding, Parameter Passing (directly in the syllabus — expect 3–4 Qs)

### Scope of variables
- **Local:** alive inside its block/function only. **Global:** whole file, visible everywhere (dangerous name-shadowing).
- **Static local (C):** initialized ONCE, keeps value between calls — SEBI's favorite trick.
```c
int next_even(void) {
    static int n = 0;   // runs once only
    n += 2; return n;
}
// call 1 → 2, call 2 → 4, call 3 → 6   ← real recalled SEBI question pattern
```
- **Shadowing:** inner-scope variable hides outer one with same name.
- **Block scope (Java/C++):** variable dies at its closing `}`.

### Binding
- **Static (early) binding:** decided at compile time — overloaded functions, `static`/`private`/`final` methods in Java, non-virtual functions in C++.
- **Dynamic (late) binding:** decided at runtime — virtual functions (C++), overridden instance methods (Java).
- **REMEMBER:** *"Compile-time binding = overload, runtime binding = override."*

### Parameter passing — the #1 dry-run trap
- **Pass by value (C, Java primitives):** callee gets a COPY — original never changes.
- **Pass by reference (C++ `&`, C pointers):** callee modifies the ORIGINAL.
- **Java is ALWAYS pass-by-value** — but for objects, the *reference* is copied: you can modify the object's fields but can't reseat the caller's reference. Classic exam trap.

**Real recalled SEBI question (Phase-1 style):**
```c
void update(int a, int *b) { int t = a; a = *b; *b = t; }
int main() { int x = 3, y = 7; update(x, &y); printf("%d %d", x, y); }
// x passed by VALUE → stays 3.  b points to y → *b = 3 sets y = 3.
// Output: 3 3
```
WHY: swapping needs the address; value-params only swap copies.

---

## 3. C Output-Tracing — the drills that win 30%

**Pointer facts (memorise):**
- `*p` dereferences; `&x` takes address; `int *p = &x`.
- `p++` on an `int*` moves by `sizeof(int)` (usually 4) — pointer arithmetic is in ELEMENTS not bytes.
- Array name ≈ pointer to first element; `a[i]` ≡ `*(a+i)` — so `i[a]` also compiles (exam trick!).
- 1D arrays are stored **contiguously** (real recalled Q).
- `a[3][4]` — third element of first row = `a[0][2]` (real recalled Q — indexing starts at 0).

**String functions table (recalled directly):**
| Function | Lang | Returns |
|---|---|---|
| `strlen(s)` | C | length (no null) |
| `strchr(s,c)` | C | first occurrence of char |
| `strcpy/strncpy` | C | copy string |
| `strcmp` | C | 0 if equal, <0/>,0 else |
| `substr(pos,len)` | C++ | substring |
| `length()` / `size()` | C++ | string length |
| `indexOf()` | Java | index of substring |
| `charAt(i)` | Java | char at index |
| `substring(a,b)` | Java | chars a..b−1 (b EXCLUSIVE — trap) |

**Common C dry-run traps:**
- `printf` returns number of chars printed — `printf("%d", printf("hi"))` prints `hi2`.
- `=` vs `==` inside `if` — `if(x=5)` assigns and is always true.
- `sizeof` is compile-time; `sizeof('a')` in C = 4 (char literal is int), in C++ = 1.
- Integer division: `7/2 = 3` (truncates); `7.0/2 = 3.5`.
- `static` inside function persists (above); `register` suggests CPU storage.

---

## 4. OOP — The Four Pillars (2/3 of Phase-2 questions touch these)

| Pillar | Plain meaning | Keyword/mechanism | SEBI trap |
|---|---|---|---|
| **Encapsulation** | bundle data + the methods operating on it | private fields + getters/setters | real Q: "Encapsulation = binding data and methods together" |
| **Abstraction** | show WHAT, hide HOW | abstract class, interface | abstract class can't be instantiated |
| **Inheritance** | child reuses parent's members | `extends` (Java), `:` (C++) | Java: NO multiple class inheritance — only via interfaces (real Q) |
| **Polymorphism** | same name, different behavior | overload (compile) / override (runtime) | virtual functions = runtime polymorphism (real Q) |

### Inheritance types (real Q: hierarchical = one base → many derived)
- Single: A→B · Multilevel: A→B→C · Hierarchical: A→{B,C} · Multiple (C++ only): {A,B}→C · Hybrid: mix.
- Java forbids multiple CLASS inheritance (diamond ambiguity) — interfaces solve it.
- Java 8 `default` keyword → interfaces CAN have concrete methods (real recalled Q — memorise).
- Constructor call order: **parent constructor runs FIRST, then child** — top-down chain.
- Destructor order (C++): child first, then parent — reverse.

### Overriding vs overloading vs hiding (the dry-run goldmine)
- **Overload:** same name, different SIGNATURE, same class → compile-time.
- **Override:** same signature, parent↔child, instance method → runtime (Java dynamic dispatch via vtable).
- **Hiding:** `static` method in both — called via BASE reference → **base's version runs** (statics are NOT overridden). **Real recalled SEBI Q.**
- Fields (variables) are also hidden, not overridden — `base.name` gives base's field even when object is child. Real Q pattern:
```java
Base b = new Child();
b.name  → "base"      // field: reference type wins
b.who() → "Child.who" // method: object type wins (overridden)
Base.tag() → "Base.tag" // static: always compile-time class
```
REMEMBER: *"Methods follow the OBJECT, fields & statics follow the REFERENCE."*

### C++ specifics
- `virtual` → enables runtime dispatch (vtable). **Real Q: virtual function = runtime polymorphism.**
- **Pure virtual:** `virtual void f() = 0;` → makes class **abstract** — can't instantiate; derived MUST override (real Q).
- Friend function: non-member accessing privates — breaks encapsulation (viva/MCQ fact).
- `this` pointer; `new`/`delete` vs `malloc`/`free` (new calls constructor — MCQ fact).

### Java specifics
- **Anonymous inner class** = unnamed one-time implementation of interface/subclass (real Q).
- `final` on class → can't extend; on method → can't override; on variable → constant.
- Abstract class vs interface: abstract can have state+ctors, interface is pure contract (pre-Java8 all methods abstract; Java8+ `default`/`static`; Java9+ `private`).
- `super()` calls parent ctor (must be first line); `super.x` accesses parent member.
- String is IMMUTABLE in Java — every concat creates new object (use StringBuilder for loops).
- `LinkedList` implements `Queue` (real recalled Q).
- **Exception handling:** `try-catch-finally` — finally ALWAYS runs (except System.exit). Checked exceptions (IOException) must be declared/caught; unchecked (NullPointer, ArithmeticException /0) are runtime. `throw` raises, `throws` declares. Multiple catch = specific BEFORE general (unreachable code error otherwise — classic MCQ).

### Python OOP (for DA + mains)
- Constructor = `__init__()` (real Q). Child overrides parent method → child version called (real Q). `self` is explicit first param. Slicing `s[1:4]` excludes index 4 (real Q).

### Functional & logic programming (syllabus line — 1 Q possible)
- Functional programming: pure functions, no side effects, first-class functions, immutability (Haskell/Lisp; Java lambdas, Python `map/filter/lambda`).
- Logic programming: facts + rules + queries — Prolog. Resolution/unification. One-line facts are enough.

---

## 5. Exception Handling — quick rules
- try→catch→finally; `finally` runs regardless (classic "what prints" trap: catch returns, finally still runs).
- Java: `throw` (raise one exception object) vs `throws` (declare in signature).
- C++: `try/catch(...)` ellipsis catches all; `throw` any type.
- Order catches child→parent, else compile error.

---

## Real recalled SEBI questions — lock these answers
| Q | A |
|---|---|
| Virtual function used for? | Runtime polymorphism |
| Pure virtual function? | `=0`, makes class abstract |
| Encapsulation = ? | Binding data + methods together |
| NOT an OOP pillar? | (the 4: abstraction, encapsulation, inheritance, polymorphism — anything else is wrong) |
| Good design principle? | High cohesion, low coupling |
| Java multiple inheritance? | Only via interfaces |
| Java 8 concrete interface methods? | `default` keyword |
| Anonymous inner class? | Unnamed one-time interface/subclass impl |
| Hierarchical inheritance? | One base → multiple derived |
| Static method via base ref? | Parent's version runs (not overridden) |
| C++ substring / length | `substr()` / `length()` or `size()` |
| C string length / find char | `strlen()` / `strchr()` |
| Java substring index | `indexOf()` |
| Python constructor | `__init__()` |
| Child calls shared method name (Python) | Child's version runs |
| Java class implementing Queue | `LinkedList` |

## Question types SEBI asks here
1. **Dry-run output** (C pointers/static/loop, Java override-vs-field-vs-static) — trace in a table.
2. **Function-name recall** (substr, strlen, indexOf…).
3. **Concept one-liners** (encapsulation, cohesion/coupling, pillars).
4. **Spot-the-error** (unreachable catch, = vs ==).
5. **Pick-correct-syntax** (pure virtual decl, default method, __init__).

## Drills
- Hand-trace 15 C pointer/static programs + 10 Java override programs per week (Testbook chapter tests — Programming).
- Write the 4 pillars + real-Q table from memory every Programming day.
- GATE CS C-programming PYQs (GateOverflow) — same depth.

---

## Worked Examples — 10 solved in exam pattern

**Ex 1 — pointer output (C).** `int x=10; int *p=&x; *p=20; printf("%d",x);`
**Ans: 20.** `*p=20` writes through the pointer into x itself. *(Rule: `*p` IS x — same memory.)*

**Ex 2 — pre/post increment.** `int a=5; int b=a++; printf("%d %d",a,b);`
**Ans: 6 5.** `a++` hands over the OLD value (5) then increments. With `++a` it'd be 6 6. *(REMEMBER: post = "use first, grow later".)*

**Ex 3 — static local variable.** `void f(){ static int c=0; c++; printf("%d ",c);} int main(){f();f();f();}`
**Ans: 1 2 3.** `static` keeps its value between calls — initialised once, lives for the whole program. Trap answer: `1 1 1` (that's a normal local).

**Ex 4 — Java dynamic dispatch.** `class P{void show(){print("P")}} class C extends P{void show(){print("C")}} P obj = new C(); obj.show();`
**Ans: C.** Instance methods resolve by the OBJECT (right side of `new`), not the reference type. *(Rule: fields/statics use the LEFT type; instance methods use the RIGHT type.)*

**Ex 5 — the flip side: field hiding.** Same setup but `int x=1` in P and `int x=2` in C; print `obj.x`.
**Ans: 1.** Fields don't polymorph — reference type P wins. This is the #1 "gotcha" paired with Ex 4.

**Ex 6 — constructor chain.** `new C()` where C extends P, both have constructors printing their name.
**Ans: prints P then C.** Parent constructor always runs first (implicit `super()` on line 1 of child ctor).

**Ex 7 — String immutability.** `String s="abc"; s.concat("def"); print(s);`
**Ans: abc.** `concat` returns a NEW string — without `s = s.concat(...)`, the result is thrown away. Strings never change in place.

**Ex 8 — exception flow.** `try{ int x=1/0; print("A"); } catch(ArithmeticException e){ print("B"); } finally{ print("C"); }`
**Ans: B C.** "A" is skipped (exception aborts try), matching catch runs, and `finally` ALWAYS runs — even on exception, even on `return`.

**Ex 9 — overload vs override resolution.** `void m(int i)` and `void m(double d)` exist; call `m(5)`.
**Ans: m(int).** Overloads resolve at COMPILE time by the declared argument types — exact match wins over widening. (Override resolves at RUN time — don't confuse the two.)

**Ex 10 — abstract/interface legality.** "Which is legal? (a) `new AbstractClass()` (b) `new Interface()` (c) class extending a `final` class (d) class implementing an interface"
**Ans: only (d).** Abstract classes and interfaces can't be instantiated; `final` blocks inheritance.
