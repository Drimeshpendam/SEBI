# Software Engineering — Study Notes (supporting topic)

> SE is not a named section in the official Paper 2 syllabus, but "software development security" (InfoSec), project-process and design-principle questions do appear — and real mains PYQs asked **"high cohesion, low coupling"**. Cover the famous models + testing levels + a few metrics; that's enough.

## DAY MAP - which sections match your plan day

| Plan day | Target | Read |
|---|---|---|
| **D40** | trivia buffer — one-pager cram | this WHOLE file, once through, definition-recall style |
| any | Phase-2 prep / weak-spot patch | sections per the syllabus line being tested |

---

**How to read:** software engineering is just "how do teams build big software without chaos?" Every model below is a different answer to that — learn the story each model tells, and the matching MCQs become trivial.

---

## 1. SDLC models — match model to description (the classic MCQ format)

**Plain words:** SDLC = Software Development Life Cycle — the pipeline: requirements → design → build → test → deploy → maintain. The models differ in *how strictly* you walk it.

| Model | The story | Use when |
|---|---|---|
| **Waterfall** | like building a house — finish blueprints before laying bricks; once a phase ends, no going back | requirements fully known & fixed |
| **V-model** | waterfall bent into a V — every build stage on the left has a matching test stage on the right (design ↔ system test, code ↔ unit test) | high-reliability systems |
| **Iterative/Incremental** | build v1.0 rough, then keep improving in cycles — like releasing an app then patching it | evolving requirements |
| **Spiral** | iterate, but every loop starts with risk analysis — "what could kill this project this round?" | large, risky projects |
| **Prototyping** | build a quick throwaway mock first so the client can say "yes, that" or "not that" | unclear requirements |
| **Agile** | short sprints shipping working pieces + constant customer feedback | changing requirements |
| **RAD** | rapid prototyping + heavy reuse of existing components | tight deadlines |

- REMEMBER: *"Waterfall never looks back, Spiral fears risk, Agile sprints."*

## 2. Agile (the most-asked modern model)

**Plain words:** instead of 18 months of silence then a big reveal, Agile ships working software every few weeks and lets the customer steer.

- **Manifesto:** individuals & interactions > processes · working software > documentation · customer collaboration > contracts · responding to change > following plans. (The ">" matters — it says "value left over right," not "right is worthless.")
- **Scrum:** work happens in **sprints** (2–4 weeks). Roles: **Product Owner** (owns the backlog — the prioritized feature list), **Scrum Master** (removes blockers — a servant-leader, not a boss), the team. Ceremonies: daily stand-up (15 min), sprint planning, review, retrospective.
- **XP (Extreme Programming):** pair programming, TDD (write the test FIRST, then code), continuous integration, small releases.
- **Kanban** = a visual board of work-in-progress with WIP limits — pull work only when a slot frees.

## 3. Testing — level order is the question

**Plain words:** test small pieces first, then pieces-together, then the whole machine, then hand it to the customer.
**Unit → Integration → System → Acceptance** — REMEMBER: **"U-I-S-A — unit inside, acceptance outside."**

- **Unit** = one function/module alone (the dev does it).
- **Integration** = do the modules talk correctly? Top-down (test high-level first, fake the missing lower pieces with **stubs**) vs bottom-up (test leaves first, fake the missing callers with **drivers**). *Stub = below you, driver = above you* — an MCQ pair.
- **System** = whole product vs the spec. **Acceptance** (UAT) = the customer signs off.
- **Black-box** = test inputs/outputs WITHOUT seeing code — techniques: equivalence partitioning (group inputs into classes), **boundary value analysis** (test at the edges — the favourite term). **White-box** = test with the code visible — path/statement/branch coverage.
- **Regression** = re-test after any change (did we break old stuff?). **Smoke** = quick sanity build check. **Alpha** = in-house users, **Beta** = real outside users.
- **Cyclomatic complexity** V(G) = number of independent paths through the code = the MINIMUM tests for full coverage. Easiest formula: **decision points + 1** (equivalent: E − N + 2 on the flow graph).
- **Verification** vs **Validation** (V&V wording MCQ): verification = "are we building it RIGHT?" (reviews, against spec) · validation = "did we build the RIGHT THING?" (actual testing, against user needs).

## 4. Design principles & metrics

- **High cohesion, low coupling** (real recalled mains Q!) — the golden rule of module design. **Cohesion** = how focused a module is internally (does it do ONE thing?). **Coupling** = how tangled modules are with each other. You want laser-focused modules that barely know each other exist.
  - Cohesion ranked best→worst: functional > sequential > communicational > procedural > temporal > logical > coincidental.
  - Coupling ranked best→worst: data < stamp < control < external < common < content.
- **UML diagrams (name-level):** use-case (actors & goals), class (static structure), sequence (time-ordered messages), activity (the flowchart-looking one), ER.
- **COCOMO** = effort/cost estimation (basic/intermediate/detailed). **Function points** = sizing a system by its inputs/outputs/files.
- **Software quality (ISO 9126/SQuaRE):** reliability, usability, efficiency, maintainability, portability — memorise the set.
- **Maintenance types:** corrective (fix bugs), adaptive (survive new OS/environment), perfective (add improvements), preventive (future-proof) — match-the-type MCQ.
- **CMMI maturity ladder:** 1 Initial → 2 Managed → 3 Defined → 4 Quantitatively Managed → 5 Optimizing.

## Question types
1. Model ↔ description matching. 2. Testing-level order + black/white techniques. 3. Cyclomatic numeric. 4. Cohesion/coupling + maintenance types. 5. Agile terms (sprint, backlog, scrum master).

## Drills (Days 36–37 — light)
- Write the model table + testing levels from memory once; 15 MCQs (GATE-SE / Testbook SE chapter); cyclomatic on 2 flow graphs.

---

## Worked Examples — 8 solved in exam pattern

**Ex 1 — pick the model.** "Requirements are fixed, well-understood, and changes are costly" vs "high-risk project needing risk analysis each loop" vs "client wants a quick visual demo first."
**Ans: Waterfall / Spiral / Prototype.** Waterfall = rigid sequential; Spiral = risk-driven iterations; Prototype = build a throwaway mock-up to clarify requirements.

**Ex 2 — cyclomatic complexity.** Code has 3 decision points (2 ifs + 1 loop). V(G) = ?
**Ans: 4.** V(G) = number of predicates + 1. (Equivalent: E − N + 2 on the flow graph.) It counts independent paths = minimum test cases for full branch coverage.

**Ex 3 — testing level.** "Dev tests one function alone" / "two modules' interaction verified" / "whole system vs the spec" / "client runs it before sign-off."
**Ans: unit / integration / system / acceptance (UAT).** Order: unit → integration → system → acceptance.

**Ex 4 — black vs white box.** "Tester checks outputs for input classes WITHOUT seeing code" vs "tester designs tests to cover every branch of the code."
**Ans: black-box (equivalence partitioning / boundary value) / white-box (statement, branch, path coverage).**

**Ex 5 — stub vs driver.** "Testing a top module before the lower module exists — what stands in?"
**Ans: a STUB** (fake lower module, top-down). Driver = fake CALLING module for bottom-up. Stub is below you, driver is above you.

**Ex 6 — agile facts.** "In Scrum, who owns the product backlog? How long is a daily standup? What ends each sprint?"
**Ans: Product Owner / 15 minutes / sprint review + retrospective.** Scrum Master removes blockers — doesn't manage the team.

**Ex 7 — UML diagram.** "Diagram showing objects and their relationships" vs "showing time-ordered message exchange" vs "user goals/actors."
**Ans: class / sequence / use-case.** Activity diagram = flowchart of logic — the one that looks like a flowchart.

**Ex 8 — CMMI level.** "Processes are quantitatively measured & statistically controlled — which CMMI level?"
**Ans: Level 4 (Quantitatively Managed).** Ladder: 1 Initial, 2 Managed, 3 Defined, 4 Quantitatively Managed, 5 Optimizing.
