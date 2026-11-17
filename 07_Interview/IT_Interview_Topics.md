# IT-Stream Interview Topics — tech questions in a regulator's room

Panels mix HR + SEBI-knowledge + your stream. For IT they ask tech you can *apply*
to SEBI's problems — not textbook definitions (they had the exam for that).

## Likely questions → answer angles

**"How can SEBI use AI/ML?"**
> Surveillance anomaly detection (pump-and-dump patterns), insider-trading network
> graphs, complaint triage on SCORES, circular summarization. Caveat to add:
> model risk + explainability — a regulator can't act on a black-box flag.

**"What is CSCRF and why does it matter?"**
> SEBI's Cybersecurity & Cyber Resilience Framework (2024) — mandatory controls,
> audits, incident reporting for regulated entities. Your angle: compliance you
> can TEST beats compliance you can only document.

**"T+1/T+0 settlement — what changed technically?"**
> Compression of post-trade pipeline; reconciliation, margining, and fail-handling
> all shrink into hours. Angle: faster settlement = smaller counterparty risk
> window — but zero slack for ops errors.

**"Should India regulate crypto? SEBI or RBI?"**
> Know both sides: SEBI proposed multi-regulator oversight for VDAs; RBI views
> private crypto as a monetary-stability risk. Balanced answer: classify first
> (security vs currency), then assign the matching regulator.

**"How would you detect insider trading with data?"**
> Trade-pattern anomalies around price-sensitive events, relation graphs between
> traders, timing correlation with announcements — then human investigators take over.

**"Blockchain/tokenization in securities — hype or real?"**
> Real where settlement/custody costs are high (bonds, unlisted assets); hype where
> a normal DB suffices. SEBI's regulatory sandbox is the honest middle path.

**"Explain [your favorite Phase-2 topic] to a non-technical board member."**
> Practice one 60-second plain-English version of: hashing/digital signatures,
> B+ trees, normalization. If you can't simplify it, you don't own it.

**"A SEBI system goes down during a volatile session — your first hour?"**
> Incident triage: isolate → communicate (status page/circular) → failover →
> root-cause later. Regulator transparency during outage = credibility.

## Format

Same 90-second rule: define → why it matters to SEBI specifically → your take →
one real example. Generic tech answers are what CS grads give; you give
regulator-shaped ones.
