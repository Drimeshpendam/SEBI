# Programming Concepts — Full Study Notes (30% of Paper 2 — the biggest topic)

> **Official syllabus:** program control (iteration, recursion, functions) · scope & binding of variables · parameter passing · functional & logic programming · OOP (classes, objects, inheritance, constructors) · exception handling — across **Java, C, C++**.
>
> **How SEBI tests it (real recalled questions):** program dry-run output (C static vars, pointers, Java overridden vs hidden methods), pure-virtual functions, interface `default` methods, anonymous inner classes, hierarchical inheritance, static method hiding, `substr()`/`strlen()`/`indexOf()` function names.
>
> **30% of the paper = ~15 of 50 questions. This file is your single highest-ROI study material in Paper 2.**

**How to read:** programming questions are dry-runs — you're asked what code prints. You learn that by tracing variables line-by-line, never by guessing. Every concept below: the plain-English idea → a code example you can trace → the exam trap.

---

## 1. Program Control: loops, recursion, functions

### Loops — the dry-run skill (SEBI's #1 format)
A dry-run question hands you code and asks the output. The winning method is boring and foolproof:
1. **Trace variables in a table** — one column per variable, one row per iteration. Never hold values in your head.
2. Watch **loop boundaries**: `i < n` runs n times (0..n−1); `i <= n` runs n+1.
3. Watch **post/pre increment**: `i++` uses-then-adds; `++i` adds-then-uses.

**Worked:**
```c
int s = 0;
for (int i = 1; i <= 5; i++) s += i;
// i:1→s:1 · i:2→s:3 · i:3→s:6 · i:4→s:10 · i:5→s:15 → prints 15
```

### Recursion — always trace with a call-stack drawing
**Plain words:** recursion = a function calling itself with a smaller input until it hits a **base case** that stops it. Like standing between two mirrors — each image smaller, and without a smallest one it goes forever (stack overflow).

- Every recursion needs: **base case** (stops) + **recursive case** (smaller input).
- **Trace method:** stack each call as a frame, resolve on the way back up.

```c
int f(int n) { return n <= 1 ? 1 : n * f(n-1); }
// f(4): 4×f(3) → 4×3×f(2) → 4×3×2×f(1)=1 → unwinds to 24 (factorial)
```
- Tail recursion: the recursive call is the LAST thing the function does → compilers can flatten it to a loop.
- Naive recursive Fibonacci = O(2ⁿ) — every call spawns two more (a favourite complexity MCQ).
- **Real SEBI-style MCQ:** "Recursion uses which data structure internally?" → **Stack** (the call stack — memorise this one-liner).

### Functions
- `return` exits immediately — code after it never runs.
- C has **no function overloading**. C++/Java do (same name, different parameters — resolved at COMPILE time = static polymorphism).

---

## 2. Scope, Binding, Parameter Passing (directly in the syllabus — expect 3–4 Qs)

### Scope of variables
**Plain words:** scope = where a variable is *alive*. Local variables die when their function ends; globals live for the whole file.

- **Local:** exists inside its block/function only. **Global:** visible everywhere (and therefore dangerous — anyone can touch it).
- **Static local (C)** — the hybrid that SEBI loves: declared inside a function but initialized ONCE and keeps its value between calls:
  ```c
  int next_even(void) {
      static int n = 0;   // runs ONCE only — not reset per call
      n += 2; return n;
  }
  // call 1 → 2, call 2 → 4, call 3 → 6   ← real recalled SEBI pattern
  ```
- **Shadowing:** an inner variable with the same name hides the outer one inside its scope.
- **Block scope (Java/C++):** the variable dies at its closing `}`.

### Binding — when the "which function runs?" decision is made
- **Static (early) binding:** decided at COMPILE time — overloaded functions, `static`/`private`/`final` methods in Java, non-virtual functions in C++.
- **Dynamic (late) binding:** decided at RUNTIME by the actual object — virtual functions (C++), overridden instance methods (Java).
- **REMEMBER:** *"Compile-time binding = overload, runtime binding = override."*

### Parameter passing — the #1 dry-run trap

**Plain words — the photocopy vs the house key:**
- **Pass by value** (C default, Java always): the function gets a PHOTOCOPY of your variable. Whatever it scribbles on the copy never touches the original.
- **Pass by reference** (C++ `&`, C pointers): you hand over the actual memory address — the house key. The function writes into YOUR variable.

- **Java is ALWAYS pass-by-value** — the subtlety: for objects, the *reference* is what's copied. So a function can modify the object's fields (it has a copy of the key — same house!) but can't reseat which object the caller's variable points to. Classic exam trap.

**Real recalled SEBI question (Phase-1 style):**
```c
void update(int a, int *b) { int t = a; a = *b; *b = t; }
int main() { int x = 3, y = 7; update(x, &y); printf("%d %d", x, y); }
// x passed by VALUE → the copy swaps, x stays 3.
// b holds y's ADDRESS → *b = 3 writes into y itself.
// Output: 3 3
```
WHY: swapping needs the address; value-params only swap photocopies.

---

## 3. C Output-Tracing — the drills that win 30%

**Pointer facts (memorise):**
- A pointer = a variable that stores a memory ADDRESS. `int *p = &x` (p holds x's address); `*p` dereferences — "go to that address" — so `*p = 20` writes INTO x.
- `p++` on an `int*` advances by `sizeof(int)` (usually 4 bytes) — pointer arithmetic counts in ELEMENTS, not bytes.
- An array name ≈ a pointer to its first element; `a[i]` ≡ `*(a+i)` — which is why `i[a]` also compiles (exam trick!).
- 1D arrays are stored **contiguously** — every element shoulder-to-shoulder (real recalled Q).
- `a[3][4]` — third element of first row = `a[0][2]` (real Q — indexes start at 0).

**String functions table (recalled directly):**
| Function | Lang | Returns |
|---|---|---|
| `strlen(s)` | C | length (excludes '\0') |
| `strchr(s,c)` | C | first occurrence of char |
| `strcpy/strncpy` | C | copy string |
| `strcmp` | C | 0 if equal, <0/>0 else |
| `substr(pos,len)` | C++ | substring |
| `length()` / `size()` | C++ | string length |
| `indexOf()` | Java | index of substring |
| `charAt(i)` | Java | char at index |
| `substring(a,b)` | Java | chars a..b−1 (b EXCLUSIVE — trap) |

**Common C dry-run traps:**
- `printf` RETURNS the number of chars printed — `printf("%d", printf("hi"))` prints `hi2`.
- `=` vs `==` inside `if` — `if(x=5)` ASSIGNS 5 (truthy) → always true.
- `sizeof` is compile-time; `sizeof('a')` = 4 in C (char literals are ints) but 1 in C++.
- Integer division truncates: `7/2 = 3`, `7.0/2 = 3.5`.
- `register` suggests CPU-register storage (hint only, can't take its address).

---

## 4. OOP — The Four Pillars (2/3 of Phase-2 questions touch these)

**Plain words — the analogies that make the names stick:**
- **Encapsulation** = a capsule — data + the methods that touch it sealed together inside one class, outsiders go through the controlled interface (private fields + getters/setters).
- **Abstraction** = a car's steering wheel — you know WHAT turning it does, you don't see HOW the steering rack works (abstract classes & interfaces show the "what", hide the "how").
- **Inheritance** = family — a child class inherits the parent's members and adds its own (`extends` in Java, `:` in C++).
- **Polymorphism** = same name, different behaviour — "drive()" means something different on a Car vs a Plane. Compile-time = overloading; runtime = overriding.

| Pillar | Plain meaning | Mechanism | SEBI trap |
|---|---|---|---|
| **Encapsulation** | bundle data + methods | private + getters/setters | real Q: "Encapsulation = binding data and methods together" |
| **Abstraction** | show WHAT, hide HOW | abstract class, interface | abstract class can't be instantiated |
| **Inheritance** | child reuses parent | `extends` / `:` | Java: NO multiple CLASS inheritance — only via interfaces (real Q) |
| **Polymorphism** | same name, different behavior | overload (compile) / override (runtime) | virtual functions = runtime polymorphism (real Q) |

### Inheritance types (real Q: hierarchical = one base → many derived)
- Single: A→B · Multilevel: A→B→C · **Hierarchical: A→{B,C}** (one parent, many children — the asked one) · Multiple {A,B}→C (C++ only — Java forbids it because of diamond ambiguity) · Hybrid: a mix.
- Java 8's `default` keyword → interfaces CAN carry concrete methods (real recalled Q — memorise).
- **Constructor order: parent runs FIRST, then child** (the child ctor's hidden first line is `super()`). Destructor order in C++ = child first, then parent — the reverse.

### Overriding vs overloading vs hiding (the dry-run goldmine)

**The story:** `Parent p = new Child()` creates a Child object but references it through a Parent variable. What runs depends on WHAT you're calling:

- **Overload:** same name, different SIGNATURE, resolved at COMPILE time — like two different functions sharing a name.
- **Override:** same signature in parent & child, INSTANCE method → at runtime the OBJECT's version wins — the Child's `show()` runs. This is dynamic dispatch (Java/C++ vtable).
- **Hiding:** a `static` method or a FIELD in both classes → follows the REFERENCE type (the left side) — **the parent's version runs** (real recalled SEBI Q — statics aren't overridden, they're hidden).
```java
Base b = new Child();
b.name  → "base"      // field: reference type (left) wins
b.who() → "Child.who" // instance method: object type (right) wins
Base.tag() → "Base.tag" // static: always compile-time class
```
REMEMBER: *"Methods follow the OBJECT, fields & statics follow the REFERENCE."*

### C++ specifics
- `virtual` = opt-in for runtime dispatch (the vtable). **Real Q: virtual function = runtime polymorphism.**
- **Pure virtual** `virtual void f() = 0;` → makes the class **abstract** — can't instantiate, derived classes MUST override it (real Q).
- Friend function: a non-member allowed into the private section — breaks encapsulation (MCQ fact).
- `this` = pointer to the calling object; `new`/`delete` vs `malloc`/`free` — `new` calls the constructor too (MCQ fact).

### Java specifics
- **Anonymous inner class** = an unnamed one-off implementation written inline (real Q — "implement it once, throw it away").
- `final` = "stop": on a class → can't extend; on a method → can't override; on a variable → constant.
- Abstract class vs interface: abstract can hold state + constructors; interface is a pure contract (pre-Java8 all-abstract; Java8+ `default`/`static`; Java9+ `private` methods allowed).
- `super()` calls the parent ctor (must be the first line); `super.x` reaches the parent's member.
- **String is IMMUTABLE** — every concat creates a NEW object; without assignment the change evaporates (use `StringBuilder` in loops).
- `LinkedList` implements `Queue` (real recalled Q).
- **Exceptions:** `try-catch-finally` — finally ALWAYS runs (except System.exit). Checked (IOException) must be caught/declared; unchecked (NullPointer, `/0`) are runtime. `throw` raises an exception; `throws` declares it. Multiple catches: specific BEFORE general — a parent-class catch above a child catch makes the child catch **unreachable** (compile error — classic MCQ).

### Python OOP (for DA + mains)
- Constructor = `__init__()` (real Q — double underscores). Child overrides parent method → child's version runs (real Q). `self` = explicit first parameter.

### Functional & logic programming (syllabus line — 1 Q possible)
- **Functional:** pure functions (same input → same output, no side effects), functions as values, immutability — Haskell/Lisp style; Java lambdas, Python `map/filter/lambda` are the flavour in your languages.
- **Logic:** declare facts + rules, ask queries — Prolog; resolution & unification are the mechanism words. Name-level is enough.

---

## 5. Exception Handling — quick rules
- try→catch→finally; `finally` runs no matter what (the classic trap: even when catch returns, finally still executes).
- Java: `throw` (raise one exception object) vs `throws` (declare it in the signature).
- C++: `catch(...)` — the ellipsis catches anything; `throw` can throw any type.
- Catch order: child→parent — reverse it and the child catch is unreachable code → compile error.

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
- Hand-trace 15 C pointer/static programs + 10 Java override programs per week (Testbook chapter tests — Programming; Sanfoundry C/Java/Python tests for overflow — see Practice Links).
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
