# Software Engineering — Study Notes (supporting topic)

> SE is not a named section in the official Paper 2 syllabus, but "software development security" (InfoSec), project-process and design-principle questions do appear — and real mains PYQs asked **"high cohesion, low coupling"**. Cover the famous models + testing levels + a few metrics; that's enough.

---

## 1. SDLC models — match model to description (the classic MCQ format)
| Model | One-liner | Use when |
|---|---|---|
| **Waterfall** | strict sequential phases, no going back | requirements fully known & fixed |
| **V-model** | waterfall bent — each dev stage has a matching test stage | high-reliability systems |
| **Iterative/Incremental** | build in repeated small versions | evolving requirements |
| **Spiral** | iterative + risk analysis each loop | large, risky projects |
| **Prototyping** | quick mock → feedback → refine | unclear requirements |
| **Agile** | short sprints, working software, customer feedback | changing requirements |
| **RAD** | rapid prototyping + reuse | tight deadlines |

- REMEMBER: *"Waterfall never looks back, Spiral fears risk, Agile sprints."*

## 2. Agile (the most-asked modern model)
- Manifesto: individuals > processes, working software > documentation, customer collaboration > contracts, responding to change > plans.
- **Scrum:** sprints (2–4 wks), roles = Product Owner / Scrum Master / team, ceremonies = daily stand-up, sprint planning, review, retrospective. Backlog = prioritized feature list.
- **XP:** pair programming, TDD (test first), continuous integration, small releases.
- Kanban = visual flow board, WIP limits.

## 3. Testing — level order is the question
**Unit → Integration → System → Acceptance** (REMEMBER: **"U-I-S-A — unit inside, acceptance outside"**).
- Unit = single module/function (dev does it). Integration = module interfaces (top-down/bottom-up/sandwich; stubs simulate called-modules, drivers simulate callers — stub/driver is an MCQ pair).
- **Black-box** testing = no knowledge of internals (equivalence partitioning, boundary value analysis — BVA is the favourite term). **White-box** = internal logic (path/statement coverage, cyclomatic).
- Regression = re-test after changes. Smoke = quick sanity. Alpha = in-house users, Beta = real users outside.
- **Cyclomatic complexity** V(G) = E − N + 2 = number of independent paths = min tests for full coverage (compute it once — edges, nodes of flow graph).
- Verification ("are we building it right?") vs Validation ("did we build the right thing?") — V&V wording MCQ.

## 4. Design principles & metrics
- **High cohesion, low coupling** (real recalled mains Q!) — modules do one focused thing with minimal interdependence. Cohesion types ranked best→worst: functional > sequential > communicational > procedural > temporal > logical > coincidental. Coupling best→worst: data < stamp < control < external < common < content.
- UML diagrams (name-level): use-case (who does what), class (static structure), sequence (time-ordered messages), activity (flowchart), ER.
- COCOMO = effort/cost estimation model (basic/intermediate/detailed). Function points = size by inputs/outputs/files.
- **Software quality:** ISO 9126/SQuaRE attributes — reliability, usability, efficiency, maintainability, portability (memorise the set).
- Maintenance types: corrective (fix bugs), adaptive (new environment), perfective (improve), preventive (future-proof) — match-the-type MCQ.

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
