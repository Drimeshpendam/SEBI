# Emerging Tech & Misc — Study Notes (supporting topic)

> Cloud, big data, AI/ML, blockchain, payments — SEBI sprinkles 1–3 "awareness" questions. Pure recall — cheap marks. One focused read + the memory tables below is enough.

---

## 1. Cloud Computing
- **Service models:** IaaS (rent machines — AWS EC2), PaaS (rent a platform to build on — Heroku, GAE), SaaS (rent finished software — Gmail, Salesforce). REMEMBER: *"IaaS = hardware, PaaS = platform, SaaS = software."* On-prem = you do everything; each layer up outsources more.
- **Deployment:** public / private / hybrid / community.
- Traits: on-demand, elasticity, pay-per-use, resource pooling, measured service (NIST definition).
- Virtualization = the tech under it (hypervisor Type-1 bare-metal vs Type-2 hosted).

## 2. Big Data
- **The V's:** Volume, Velocity, Variety (+ Veracity, Value). "3 V's" is the classic answer.
- Hadoop = HDFS (storage) + MapReduce (processing) — batch. Spark = in-memory, faster, does streaming.
- NoSQL types: key-value (Redis), document (MongoDB), column (Cassandra/HBase), graph (Neo4j) — match DB→type.
- Data lake (raw, schema-on-read) vs data warehouse (structured, schema-on-write) — the pair.

## 3. AI / ML
- ML types: supervised (labeled data — classification/regression), unsupervised (unlabeled — clustering, k-means), reinforcement (reward/penalty — game agents).
- Terms: training/test split, overfitting (memorised, fails new data), NLP, LLM/GenAI, hallucination.
- AI in markets (SEBI-flavored): algo trading, surveillance for manipulation, robo-advisory.

## 4. Blockchain
- Distributed immutable ledger; blocks chained via previous-block **hash** (tampering breaks the chain — the security idea).
- Consensus: **PoW** (mining, energy-heavy — Bitcoin), **PoS** (stakers validate — Ethereum now), PBFT (permissioned).
- Public (Bitcoin) vs private/permissioned (Hyperledger) chains.
- Smart contracts = self-executing code on chain. CBDC (Digital Rupee/e₹) = RBI-issued digital currency — centralized, NOT a crypto (nice SEBI-adjacent point).

## 5. Payments & fintech (SEBI-adjacent recall)
- **UPI** — NPCI's instant 24×7 transfer, VPA handles, UPI 2.0/3.0 features.
- **NEFT** — batch-settled (now 24×7, half-hourly); **RTGS** — real-time gross settlement, big amounts, min ₹2 lakh; **IMPS** — instant, 24×7.
- REMEMBER: *"NEFT batches, RTGS settles big instantly, IMPS/UPI instant small."*
- NACH (bulk debits/credits), AePS (Aadhaar-enabled payments), BBPS (bill payments), eKYC.
- Regulators map: RBI (payments, banks, monetary) · SEBI (securities markets) · IRDAI (insurance) · PFRDA (pensions) · NPCI (retail payment systems — not a regulator, an operator).

## 6. Quick tech trivia (seen in papers)
- IoT = sensors+connectivity (MQTT protocol name worth knowing). Edge computing = process near the source. 5G traits: low latency, high bandwidth, network slicing.
- Digital signature ≠ e-signature nuance; OTP-based eKYC.
- Cyber terms already in InfoSec notes (don't double-study).

## Drills (Days 38–40 — light)
- Write the 3 tables (cloud models, V's, payments) from memory; 10 recall MCQs on Testbook/GA overlap.

---

## Worked Examples — 8 solved in exam pattern

**Ex 1 — cloud service model.** "AWS EC2 (rent virtual machines) / Google App Engine (deploy code, they manage servers) / Gmail."
**Ans: IaaS / PaaS / SaaS.** *(REMEMBER the pizza analogy: IaaS = buy ingredients, PaaS = base+oven provided, SaaS = pizza delivered.)*

**Ex 2 — NoSQL type.** "MongoDB / Redis / Cassandra / Neo4j — which category each?"
**Ans: document / key-value / column-family / graph.** Pick by data shape: JSON docs→document, cache→key-value, huge columns→column, relationships→graph.

**Ex 3 — ML type.** "Email labeled spam/not-spam learns a filter" / "customers grouped into segments with no labels" / "game agent learns by reward."
**Ans: supervised (classification) / unsupervised (clustering) / reinforcement.** Labeled data = supervised; finding groups = clustering; reward/punishment = RL.

**Ex 4 — overfitting.** "Model scores 99% on training data, 60% on new data — problem? Fix?"
**Ans: overfitting — it memorized, didn't generalize.** Fixes: more data, regularization, simpler model, cross-validation, dropout.

**Ex 5 — Hadoop component.** "Where does data live vs where is it processed in Hadoop?"
**Ans: HDFS stores (NameNode = master metadata, DataNodes = workers) / MapReduce or Spark processes.** NameNode down = cluster blind — single point of failure in classic Hadoop.

**Ex 6 — blockchain consensus.** "Bitcoin's miners solving puzzles vs Ethereum's validators staking coins."
**Ans: Proof of Work / Proof of Stake.** Smart contract = self-executing code on the chain (Ethereum pioneered it — Bitcoin doesn't have full ones).

**Ex 7 — payment rails.** "Instant 24×7 UPI transfer vs high-value ₹5 lakh corporate payment vs old batch-wise settlement."
**Ans: UPI or IMPS (instant) / RTGS (≥₹2 lakh, real-time gross) / NEFT (was batch, now 24×7 but settles in half-hour windows).** UPI runs ON IMPS rails — NCPI operates both.

**Ex 8 — deployment model.** "Bank's private cloud for core systems + public cloud for the marketing site."
**Ans: hybrid cloud.** Private = one org only; public = shared provider; community = several orgs with shared concerns; hybrid = mix.
