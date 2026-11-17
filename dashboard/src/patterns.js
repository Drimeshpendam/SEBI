// Question-pattern matrix — compiled from Jan-2026 official handout,
// SEBI Grade A 2024/2026 exam analyses (Oliveboard, BankersAdda, EduTap),
// memory-based PYQs (2024, Feb-2026 Phase-2 paper). Verify at 2027 notification.

export const paper1 = [
  {
    section: 'Quantitative Aptitude', qs: 20, marks: 25, color: '#f59e0b',
    note: 'Mon/Wed/Fri days. First 10 min: rewrite formula card from memory.',
    daily: 'D1 Approximation + Wrong Series · D4 Quadratic + Approx · D6 Series + mini-DI · D8 Approx + DI · D11 Series + Quad · D13/15/20 Approx + DI · D25 Arith (P&L + SI/CI) · D32 Arith (T&W + Speed) · D39 Arith (Ages + Mixture) · D41–48 weakest type (error log)',
    topics: [
      {
        name: 'Approximation', qs: 5, tag: 'free marks — bank all',
        patterns: [
          ['% of number + product', '15.9% of 299.8 + 13.2 × 8.9 → round to 16% of 300 + 13×9'],
          ['Division with decimals', 'Round BOTH sides to a clean pair: 449.8 ÷ 14.95 → 450 ÷ 15'],
          ['√ / ³√ inside expression', 'Park at nearest perfect square/cube first: √168.7 → √169 = 13'],
          ['Chained +−× in one line', 'Round each term to a friendly cousin, compute, pick closest option'],
        ],
      },
      {
        name: 'Wrong Number Series', qs: '4–5', tag: 'hunt patterns in order',
        patterns: [
          ['Differences growing', 'Write the gaps — the wrong term corrupts two gaps'],
          ['×k multiplier', '5, 15, 45, 135, 415 — all ×3 → 415 wrong (should be 405)'],
          ['×k + c (SEBI favourite)', '×2+1, ×2+2, ×2+3… check right after gaps'],
          ['n²/n³ ± k', 'Terms hugging famous squares: 5, 10, 17, 26, 37, 49 → 49 wrong'],
          ['Sum of previous / interleaved', 'Fibonacci-type; if no rule fits, split odd/even positions'],
        ],
      },
      {
        name: 'Arithmetic word problems', qs: '5–6', tag: 'pick the easy ones first',
        patterns: [
          ['Profit & Loss', 'CP/SP/markup/discount, successive discount, dishonest dealer using false weights'],
          ['SI & CI', 'Difference between SI and CI for 2 yrs, half-yearly compounding, effective rate'],
          ['Mixture & Alligation', 'Replacement problems (milk-water), alligation cross for two prices/concentrations'],
          ['Mensuration', 'Area/volume formula plug-in — cylinder, cone, sphere; sometimes "ratio of volumes"'],
          ['Percentage-family', 'Successive % change (x+y+xy/100), salary/election/population two-step problems'],
          ['T&W / TSD / Ages (roster)', 'Efficiency-ratio work, train-crossing speed, ratio-based ages — whichever topic rotates in'],
        ],
      },
      {
        name: 'DI — Line Graph', qs: 5, tag: 'units check first',
        patterns: [
          ['YoY % change', 'Biggest % jump year — cancel to fractions (84/420 = 1/5), don\'t compute decimals'],
          ['Average of years/companies', 'Add the 4–5 relevant values only — read question before the graph'],
          ['Ratio of two years/lines', 'Cancel before multiplying'],
          ['% of total', 'X as % of sum — watch lakh vs thousand, % vs absolute unit traps'],
        ],
      },
      {
        name: 'DI — Caselet', qs: 5, tag: 'build table → every Q free',
        patterns: [
          ['Paragraph → table', '60 sec building the mini-table while reading; never hold it in your head'],
          ['Two-category split', '"60% boys; 40% of boys play cricket…" → fill boys/girls × cricket/chess cells'],
          ['% more/less — base trap', '"A is what % less than B" divides by B — the wrong base sits in options'],
          ['Multi-step lookup', 'Once table exists, all 5 Qs are lookups — slowest start, fastest finish'],
        ],
      },
      {
        name: 'Quadratic compare', qs: '0–4', tag: 'swings year to year',
        patterns: [
          ['Sign-decoder instant kill', 'x²+8x+15=0 → both roots negative vs y²−8y+15 → both positive: x<y without factoring'],
          ['Factor & compare', 'Roots add to S, multiply to P — unwrap the pair'],
          ['CND overlap trap', 'Ranges overlapping = "cannot be determined" — most-picked wrong answer'],
        ],
      },
    ],
  },
  {
    section: 'Reasoning Ability', qs: 20, marks: 25, color: '#8b5cf6',
    note: '~15 Qs come in puzzle sets of 3–5; only ~5 are standalone. Sets decide the section.',
    daily: 'Mon/Wed/Fri days — one puzzle skeleton + one single: D1 Linear-row + Syllogism · D4 Month-table + Blood Rel · D6 Box-stack + Coding · D8 Box-stack + Inequality · D11 Height-rank + Direction · D13/15 Circular + singles · D18 Floor + Data Suff · D22–48 cycle repeats, last days = weakest type',
    topics: [
      {
        name: 'Puzzle — Month/attribute table', qs: '4–5', tag: 'Jan-2026: month+subject+6 persons',
        patterns: [
          ['Fixed-grid puzzle', 'N persons × months/dates × one attribute — lock direct clues, derive rest'],
          ['Two-condition clue', '"A attends before B but after the Physics exam" — order + category combined'],
          ['Between/count clue', '"Exactly 2 persons between X and Y" — position maths, not trial-and-error'],
        ],
      },
      {
        name: 'Puzzle — Box + colour stack', qs: '2–3', tag: 'floor/box ordering',
        patterns: [
          ['Vertical ordering', 'Boxes stacked 1–8; colour + item attributes — draw the column, mark fixed cells'],
          ['Gap clues', '"Two boxes between red and blue" — same position-maths family as seating gaps'],
        ],
      },
      {
        name: 'Seating — linear / double row', qs: '4–5', tag: 'direction facing matters',
        patterns: [
          ['Single row, mixed facing', 'Some face north, some south — left/right flips per person'],
          ['Two rows facing each other', 'Row A south-facing vs Row B north-facing — "opposite of" adds a pairing dimension'],
          ['End/position clues', '"Sits second to the left of the one at extreme end" — anchor from edges inward'],
        ],
      },
      {
        name: 'Puzzle — height/order ranking', qs: '3–5', tag: 'pure ordering',
        patterns: [
          ['Height/weight/rank ordering', 'N persons ranked; clues are relative ("taller than A but shorter than B")'],
          ['Definite-position clue', '"Third tallest wears red" — bridge between order and attribute'],
        ],
      },
      {
        name: 'Singles (rotating)', qs: '3–5', tag: 'cheap marks — do first',
        patterns: [
          ['Statement & Assumption', 'Jan-2026: 3 Qs — "is the assumption implicit?" — learn the definitely-follows test'],
          ['Syllogism', '2–3 statements; only-a-few/all-being types — Venn or 50-100 rule'],
          ['Blood relations', 'Coded or paragraph — draw the family tree, watch gender-unstated traps'],
          ['Coding / alphanumeric series', 'Letter-shift, word-coding, or mixed alpha-num term finding — 2024 had 1–2 each'],
          ['Direction sense', 'Walk + turns → final distance/direction — trace on paper, 2023 had 2–3'],
        ],
      },
    ],
  },
  {
    section: 'English Language', qs: 20, marks: 25, color: '#10b981',
    note: 'Easiest section per 2024 analysis (10 easy Qs). Most scoring of the QRE trio.',
    daily: 'Tuesdays only: D5 error-spotting + agreement/tense rules · D12 fillers + prep/connector · D19 mixed + phrasal verbs · D26 improvement + one-word subs · D33 fillers+improvement + root words · D40 weakest type. Every Sunday: RC set + week vocab quiz. Jumbles/cloze/match-column: drilled whenever they hit the error log',
    topics: [
      {
        name: 'Reading Comprehension', qs: '5–7', tag: 'eco/tech/abstract theme',
        patterns: [
          ['Direct factual', 'Most Qs answerable straight from the passage — no inference gymnastics'],
          ['Vocab-in-context', 'Synonym/antonym of a word AS USED in the passage — not the dictionary sense'],
          ['Inference / tone / title', '1–2 per passage — "author\'s attitude", "best title" — eliminate extremes'],
        ],
      },
      {
        name: 'Error spotting', qs: '4–5', tag: '4-5 part split sentence',
        patterns: [
          ['Subject-verb agreement', 'The trap verb sits far from its subject — find the real subject first'],
          ['Tense/parallelism', '"has given rise for" — wrong preposition/tense mixing (real handout Q)'],
          ['Article/preposition/idiom', '"gain access to", "lack the means" — collocation errors, not grammar logic'],
          ['No-error option', '~1 in 5 sentences is clean — option E is a real answer, not a trap'],
        ],
      },
      {
        name: 'Fillers (single/double)', qs: '4–5', tag: 'vocab + connector fit',
        patterns: [
          ['Double fillers', 'Pick the PAIR — each word alone may fit one blank, only one pair fits both'],
          ['Context clue word', '"most depressing" tells you the blank needs a negative word — eliminate by polarity'],
          ['Connector fillers', 'although/therefore/moreover — read the logic flow, not just grammar'],
        ],
      },
      {
        name: 'Sentence improvement', qs: '3–4', tag: 'phrase replacement',
        patterns: [
          ['Idiomatic replacement', 'Underlined phrase → choose the grammatically + idiomatically correct version'],
          ['Redundancy/conciseness', 'Right answer is often the SHORTEST correct option'],
        ],
      },
      {
        name: 'Para jumble', qs: '4–5', tag: '5-6 sentence ordering',
        patterns: [
          ['Opener identification', 'Definite article/pronoun can\'t open — "This policy…" needs an earlier antecedent'],
          ['Mandatory pairs', 'Find the pair that must stay together (pronoun→noun, cause→effect) then check options'],
          ['2024: 4 Qs as "Rearrangement"', 'Listed separately from jumbles — same skill, sentence-level'],
        ],
      },
      {
        name: 'Odd one / match column (roster)', qs: '0–2', tag: '2024: zero asked',
        patterns: [
          ['Cloze test', 'Passage with numbered blanks — appeared in 2022, absent 2024 — keep it warm, don\'t over-invest'],
          ['Match the column', 'Phrase pairs / sentence starters — in official syllabus, low frequency'],
        ],
      },
    ],
  },
  {
    section: 'General Awareness', qs: 20, marks: 25, color: '#ef4444',
    note: 'Pure recall — zero solving time. Most Qs from 3–4 months back, some 5–8 months. No statement-based questions in 2024.',
    daily: '10 MCQs EVERY day: D1–7 June + SEBI statics · D8–14 July · D15–21 Aug · D22–28 Sep · D29–35 Oct · D36–42 Nov · D43–49 mixed mock (all months shuffled). Plus 20-min GA drip → monthly log bullets',
    topics: [
      {
        name: 'Government schemes', qs: 4, tag: 'largest single source',
        patterns: [
          ['Scheme → ministry/feature', '"S in SID stands for?" (Scheme), NSC max limit, Atal incubation timeline'],
          ['Eligibility/limit', 'ITR-4 income cap ₹50L — numeric limits are favourite facts'],
          ['Finance-linked schemes', 'Prioritise schemes touching markets/banking over general welfare'],
        ],
      },
      {
        name: 'Finance static', qs: 4, tag: 'SEBI-home territory',
        patterns: [
          ['Regulator → domain', '"Who regulates REITs?" → SEBI (real 2024 Q) — map every regulator to its products'],
          ['Market terms', 'T+1 settlement, IPO types, MF basics, depositories ("CDSL promoted by BSE" — real Q)'],
          ['Banking products', 'Recurring deposit rules, DigiLocker scope — product-level facts'],
        ],
      },
      {
        name: 'Awards / firsts / sports / places', qs: '~8', tag: 'who-what-where recall',
        patterns: [
          ['Award → recipient', 'Abel Prize → Varadhan; Mandela Lifetime → first Indian recipient (both real 2024 Qs)'],
          ['First-in-news', '"First Indian city in UNESCO City of Literature" → Kozhikode'],
          ['Sports events/hosts', 'FIFA Women\'s WC 2027 host → Brazil; medal counts, winners'],
          ['Places in news', 'Highest bridge → Chenab; summits, exercises, index-linked cities'],
        ],
      },
      {
        name: 'Finance current affairs + reports', qs: '2+2', tag: 'RBI/SEBI + indices',
        patterns: [
          ['Regulator actions', 'RBI repo decisions, SEBI circulars, new regulations in the window'],
          ['Index → rank + publisher', 'Tourism Index, brand valuations ("Kroll → Virat Kohli" — real Q) — always learn rank + who publishes'],
          ['Org facts', 'BIS members, WTO — "all of the above" answers appear repeatedly'],
        ],
      },
    ],
  },
]

export const paper2 = [
  {
    topic: 'Programming Concepts (Java / C / C++)', weight: '30%', qs: '~15', color: '#38bdf8',
    note: 'Official #1 weightage. Also feeds Phase-2 Paper 2 — studied twice, paid twice.',
    patterns: [
      ['Code output / dry-run (dominant)', 'Short snippet → "what does it print?" — trace variable state line by line'],
      ['OOP concepts', 'Inheritance types, polymorphism (overloading vs overriding), constructor call order, virtual functions'],
      ['Exception handling', 'try/catch flow — which line runs, output when exception thrown, finally behaviour'],
      ['Recursion trace', 'Unwind call stack on paper — base case first, then count returns'],
      ['Scope & parameter passing', 'Local vs global shadowing, call-by-value vs reference — pointer/reference trap is the classic'],
      ['Operator precedence / string ops', '++i vs i++, bitwise ops, string functions in C/Java'],
      ['IT trivia mixed in', '"UNIX mounting means…", "full form of ADS" — broad computer-awareness MCQs ride along'],
    ],
  },
  {
    topic: 'DBMS Concepts', weight: '10%', qs: '~5', color: '#34d399',
    patterns: [
      ['Normal forms identification', 'Given dependencies → which NF violated? 2NF (partial dep), 3NF (transitive), BCNF'],
      ['Keys', 'Count candidate keys; super vs primary vs foreign — small-relation exercises'],
      ['Indexing — B/B+ trees', 'Real Feb-2026 Qs: "which DS implements DB indexes" → B-Tree; B+ Tree for range queries (vs hash = point lookup only)'],
      ['ACID / transactions', 'Property identification by scenario; serializability, locks, deadlock basics'],
      ['ER → relations', 'Weak entities, mapping cardinality, attributes → schema'],
    ],
  },
  {
    topic: 'SQL Queries', weight: '10%', qs: '~5', color: '#34d399',
    patterns: [
      ['Query output prediction', 'THE dominant pattern — given tables + query → pick resulting rows/count'],
      ['Joins', 'INNER vs LEFT JOIN row counts; NULL-padding; self-join for manager-style relations'],
      ['Aggregates + GROUP BY/HAVING', 'COUNT(*) vs COUNT(col) NULL trap; HAVING vs WHERE order-of-execution'],
      ['Set ops', 'UNION vs UNION ALL (dedup!), INTERSECT, EXCEPT/MINUS'],
      ['Subqueries', 'IN vs EXISTS, correlated subquery evaluation order'],
      ['DDL/DML/TCL classify', 'DELETE vs TRUNCATE vs DROP — rollback-able or not is the trap'],
    ],
  },
  {
    topic: 'Data Analytics (Python / R)', weight: '10%', qs: '~5', color: '#f472b6',
    patterns: [
      ['Pandas code output', 'df.loc/iloc slicing, groupby→agg result, merge — predict the DataFrame'],
      ['Python data structures', 'dict/set/list ops, comprehension output — real Feb-2026 Q: json.dumps() → returns a STRING'],
      ['Regex', 'Pattern matching MCQs — what does r"\\d+" capture'],
      ['File handling', 'open() modes r/w/a/r+, read vs readlines'],
      ['Data-mining defs', 'Clustering vs classification vs association — definition-matching MCQs'],
    ],
  },
  {
    topic: 'Algorithms', weight: '10%', qs: '~5', color: '#fbbf24',
    patterns: [
      ['Complexity identification', 'Big-O of a given sort/search/loop — best vs worst case is the trap axis'],
      ['Sort pass-by-pass', 'State of array after N passes of bubble/selection/insertion'],
      ['Traversal output', 'Inorder/preorder/postorder of a drawn tree; BFS vs DFS order'],
      ['Which algorithm?', '"Shortest path in weighted graph" → Dijkstra; MST → Kruskal/Prim — map problem→algo'],
      ['Paradigm classify', 'Greedy vs DP vs Divide&Conquer — real Phase-2 asks incl. Strassen\'s, quicksort/mergesort'],
    ],
  },
  {
    topic: 'Computer Networks', weight: '10%', qs: '~5', color: '#fb923c',
    patterns: [
      ['OSI layer mapping', '"Which layer handles routing/encryption/framing?" — the #1 pattern every year'],
      ['TCP vs UDP', 'Connectionless vs oriented, reliability, which app uses which (DNS uses both!)'],
      ['Protocol → port/purpose', 'HTTP 80, DNS 53, SMTP 25, POP3 110, FTP 21 — plus what each does'],
      ['Device → layer', 'Hub=physical, switch=data-link, router=network — matching MCQs'],
      ['IP basics', 'Class A/B/C ranges, private IPs, simple subnetting'],
    ],
  },
  {
    topic: 'Info & Cyber Security', weight: '10%', qs: '~5', color: '#f87171',
    patterns: [
      ['Attack identification', 'Scenario → name the attack: phishing, MITM, SQLi, DDoS, ransomware — the dominant pattern'],
      ['CIA triad', 'Confidentiality/Integrity/Availability — which property does a control protect'],
      ['Crypto basics', 'Symmetric vs asymmetric, digital signatures (authenticity+integrity), hashing vs encryption'],
      ['Authentication', 'Factor types — something you know/have/are; 2FA combos'],
      ['Security controls/audit', 'Firewall types, IDS vs IPS, system-audit purpose'],
    ],
  },
  {
    topic: 'Data Warehousing', weight: '5%', qs: '2–3', color: '#a78bfa',
    patterns: [
      ['OLAP operations', 'Roll-up / drill-down / slice / dice — scenario → operation name is THE classic'],
      ['ETL steps', 'Extract→Transform→Load order and what happens in each'],
      ['Schema types', 'Star vs snowflake — dimension normalisation difference'],
      ['Mart vs warehouse', 'Subject-specific subset vs enterprise-wide'],
    ],
  },
  {
    topic: 'Shell Programming', weight: '5%', qs: '2–3', color: '#a78bfa',
    patterns: [
      ['Command → purpose', 'grep/chmod/ls flags/awk basics — "which command does X"'],
      ['Permissions', 'chmod 755 → rwxr-xr-x — octal permission decoding'],
      ['Script syntax', '$var, #!/bin/sh, positional params $1 $2, loop/condition syntax'],
    ],
  },
  {
    topic: 'CS trivia buffer (non-syllabus)', weight: '0–3 Qs', qs: '0–3', color: '#64748b',
    note: 'OS/SE/Emerging-tech aren\'t in the official syllabus — they surface only as trivia. Don\'t budget study days.',
    patterns: [
      ['Number conversions', 'Real PYQs: decimal 59 → hex (3B), A3D → decimal, binary ↔ octal ↔ hex'],
      ['History/inventors', 'C by Dennis Ritchie 1972 — real PYQ'],
      ['Fundamentals', 'ASCII 7-bit, compiler vs interpreter, machine-language translator'],
      ['OS trivia', 'UNIX mounting, file-system basics — appear but tiny share'],
    ],
  },
]
