# Emerging Tech & Misc — Study Notes (supporting topic)

> Cloud, big data, AI/ML, blockchain, payments — SEBI sprinkles 1–3 "awareness" questions. Pure recall — cheap marks. One focused read + the memory tables below is enough.

## DAY MAP - which sections match your plan day

| Plan day | Target | Read |
|---|---|---|
| **D40** | trivia buffer — one-pager cram | this WHOLE file, once through, definition-recall style |
| any | Phase-2 prep / weak-spot patch | sections per the syllabus line being tested |

---

**How to read:** these are buzzword questions — you only need to know what each thing IS plus one distinguishing fact. Every entry below gives the plain-English idea, then the exam hook.

---

## 1. Cloud Computing

**Plain words:** cloud = renting computing over the internet instead of buying machines. The three service models are best seen as a **pizza**:
- **IaaS** (Infrastructure) = buy the ingredients and cook at home — you rent raw machines/storage (AWS EC2), you manage everything above the metal.
- **PaaS** (Platform) = they provide base + oven — you bring your code, they manage servers (Heroku, Google App Engine).
- **SaaS** (Software) = pizza delivered — finished software you just use (Gmail, Salesforce).

REMEMBER: *"IaaS = hardware, PaaS = platform, SaaS = software."* Each layer up = you manage less, they manage more.

- **Deployment models:** public (shared provider) / private (one org only — banks) / hybrid (both — the standard MCQ scenario) / community (several orgs with shared concerns).
- NIST traits: on-demand, elasticity (grow/shrink instantly), pay-per-use, resource pooling, measured service.
- **Virtualization** = the tech underneath — one physical machine pretending to be many. Hypervisor Type-1 = bare-metal (runs on hardware); Type-2 = hosted (runs on an OS).

## 2. Big Data

**Plain words:** big data = datasets too large/fast/messy for normal databases. The "V's" describe what makes it "big":
- **Volume** (how much), **Velocity** (how fast it arrives), **Variety** (how many shapes — text, video, logs) — the classic "3 V's" answer; Veracity & Value get added sometimes.

- **Hadoop** = the classic big-data framework: **HDFS** stores (splits files across machines — NameNode is the master/index, DataNodes hold chunks) + **MapReduce** processes (batch jobs — map the work out, reduce results together). **Spark** = the faster successor — in-memory processing, handles streaming.
- **NoSQL types — match DB→type:** key-value (Redis — a giant dictionary), document (MongoDB — JSON blobs), column-family (Cassandra/HBase — huge sparse tables), graph (Neo4j — relationships first).
- **Data lake vs warehouse (the pair):** lake = raw data dumped as-is, schema decided when you READ (flexible, cheap); warehouse = cleaned structured data, schema decided when you WRITE (fast queries).

## 3. AI / ML

**Plain words:** machine learning = programs that learn patterns from data instead of being hand-coded with rules. Three learning styles:
- **Supervised** — learn from LABELED examples (10,000 emails marked spam/not-spam → filter). Classification (categories) and regression (numbers).
- **Unsupervised** — no labels, find structure yourself (cluster customers into segments — k-means).
- **Reinforcement** — learn by reward/penalty like training a dog (game agents, robots).

- **Key terms:** training/test split (never judge on the data it memorized), **overfitting** (99% on training, fails new data — memorized, didn't generalize), NLP (language), LLM/GenAI (text generators), hallucination (confident wrong answers).
- **SEBI-flavored AI:** algo trading, market surveillance for manipulation, robo-advisory — plausible "application" MCQ.

### GenAI / trending terms (2025–26 papers love these)

| Term | The idea | Exam hook |
|---|---|---|
| **LLM** (Large Language Model) | a model trained on massive text that generates language — GPT, Gemini, Claude, Llama | "LLM = predicts the next token/word" |
| **Generative AI** | AI that CREATES content — text, images, code, audio — vs predictive AI that only classifies/forecasts | "which produces NEW content?" → GenAI |
| **Hallucination** | the model states false things confidently — made-up citations, fake facts | the #1 GenAI risk asked |
| **Prompt engineering** | crafting inputs to steer the model's output | "the skill of writing effective instructions to an LLM" |
| **RAG** (Retrieval-Augmented Generation) | LLM answers from YOUR documents — it retrieves relevant chunks, then generates | cures hallucination/staleness — "AI grounded in company data" |
| **Agentic AI** | AI that plans + acts autonomously — books meetings, runs tools, multi-step goals | "AI that takes actions, not just answers" |
| **Deepfake** | AI-generated fake video/audio indistinguishable from real — KYC-fraud weapon | SEBI-adjacent: fake CEO videos, market-manipulation hoaxes |
| **Foundation model** | one huge pre-trained model fine-tuned for many tasks (vs trained per-task) | GPT-family = foundation models |
| **Fine-tuning** | extra training of a foundation model on your domain data | "adapting a general model to legal/finance text" |
| **Bias in AI** | model inherits skews in its training data — unfair loan/fraud scoring | governance MCQ — "why does AI need audit?" |
| **Explainable AI (XAI)** | models that can justify their outputs — required where decisions affect people (credit, surveillance) | regulator concern = explainability |
| **AI governance / responsible AI** | the framework of rules making AI safe, fair, auditable | SEBI's consultation papers on AI in markets |
| **Token** | the chunk an LLM reads — ~¾ of a word | usage/billing unit of LLMs |
| **Turing test** | the classic "can a machine fool a human judge" benchmark | origin: Alan Turing |

REMEMBER: *"LLM writes, RAG grounds, agentic acts, hallucination lies, deepfake fakes."*

## 4. Blockchain

**Plain words:** a shared ledger copied across many computers. Each new "block" of transactions contains the previous block's **hash** — so editing history breaks every link after it; tampering is instantly visible. That's the whole security idea.

- **Consensus = how the network agrees on the next block:**
  - **PoW** (Proof of Work) — miners race to solve a puzzle; energy-hungry (Bitcoin).
  - **PoS** (Proof of Stake) — validators lock coins as collateral (Ethereum now).
  - PBFT — for permissioned chains.
- **Public** (Bitcoin — anyone joins) vs **private/permissioned** (Hyperledger — invited members only).
- **Smart contracts** = self-executing code on the chain (Ethereum pioneered — Bitcoin doesn't have full ones).
- **CBDC (Digital Rupee/e₹)** = RBI-issued digital currency — CENTRALIZED, not a cryptocurrency (a nice SEBI-adjacent trap).

## 5. Payments & fintech (SEBI-adjacent recall)

**Plain words:** India has several payment "rails" — they differ on speed and amount:

- **UPI** — NPCI's instant 24×7 transfer using a VPA handle (name@bank); runs on IMPS rails.
- **NEFT** — settles in batches (half-hourly windows, now 24×7) — not truly instant.
- **RTGS** — real-time gross settlement — each transaction settles individually, instantly — built for BIG amounts (min ₹2 lakh).
- **IMPS** — instant, 24×7, any amount.
- REMEMBER: *"NEFT batches, RTGS settles big instantly, IMPS/UPI instant small."*
- Also know: NACH (bulk debits/credits), AePS (Aadhaar-enabled payments), BBPS (bill payments), eKYC.
- **Regulators map (asked):** RBI (payments, banks, monetary policy) · SEBI (securities markets) · IRDAI (insurance) · PFRDA (pensions) · NPCI (operates retail payment systems — an operator, NOT a regulator).

## 6. Quick tech trivia (seen in papers)
- IoT = sensors + connectivity (MQTT is its lightweight messaging protocol). Edge computing = process data near where it's generated. 5G traits: low latency, high bandwidth, network slicing.
- Digital signature (crypto-based) vs generic e-signature; OTP-based eKYC.
- Cyber terms live in the InfoSec notes — don't double-study.

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
**Ans: UPI or IMPS (instant) / RTGS (≥₹2 lakh, real-time gross) / NEFT (was batch, now 24×7 but settles in half-hour windows).** UPI runs ON IMPS rails — NPCI operates both.

**Ex 8 — deployment model.** "Bank's private cloud for core systems + public cloud for the marketing site."
**Ans: hybrid cloud.** Private = one org only; public = shared provider; community = several orgs with shared concerns; hybrid = mix.
