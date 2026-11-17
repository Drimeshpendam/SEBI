# Closure & Candidate Keys — the card (freeze this, never relearn)

**The engine (used by BOTH questions):**
> Hold your starting letters → scan every arrow → if you hold ALL of its left
> side, take its right side → rescan till a full round adds nothing.

## Type 1 — CLOSURE of X (X⁺)

Start holding {X} → run engine → report the pocket. Done.

| Round | Arrow | Holds ALL left? | Pocket |
|---|---|---|---|
| | `A→B` | hold A ✓ → take B | {A,B} |
| | `B→C` | hold B ✓ → take C | {A,B,C} |
| | both | nothing new → stop | **{A,B,C}** |

## Type 2 — CANDIDATE KEY

- **Step A:** mark every letter NEVER on a right side → those MUST start
- **Step B:** start holding just those → run engine
- **Step C:** got every letter? → that's the key. Missing some? → add ONE starter, retry

| Letter | Produced? | Must start? |
|---|---|---|
| A | no | **YES** |
| B | yes (A→B) | no |
| C | yes (B→C) | no |
| D | no | **YES** |

Start {A,D} → A→B → B→C → all four → **key = AD**

## The 4 traps (all burned once)

1. **Partial LHS = dead arrow** — `BC→D` needs BOTH B and C held
2. **Dead ends count** — a collected letter that produces nothing still sits in the pocket
3. **Rescan after every collect** — dead arrows can come ALIVE when a partner arrives
4. **Free letters are never starters** — if an arrow produces it, don't put it in the key

## Key-counting recipe (multi-key questions)

Forced letters (never produced) + test EACH possible partner → count every
minimal set that reaches all. Cycle members each work; never-produced letters
ride in EVERY key.

REMEMBER: *letter list ≠ pocket — only arrow outputs get collected.*
