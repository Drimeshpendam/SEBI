// Practice-100 bank — 43 concepts, each carrying a teach-card + question pool.
// Question format: { q, o: [5 options], a: correctIndex, x: why, d: 'easy|med|hard', t: tag }
// gen(n) → n unique generated variants; bank → curated fixed questions.
// Page target = 100/concept; pools fill toward it.

const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const shuffle = (arr) => arr.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map((x) => x[1])

const FILL = ['None of these', 'All of these', 'Cannot be determined', 'Insufficient data', 'Either of these']
const mkq = (q, correct, distractors, x, d, t) => {
  const ds = [...new Set(distractors.filter((v) => v !== correct))]
  let i = 0
  while (ds.length < 4 && i < FILL.length) ds.push(FILL[i++])
  const opts = shuffle([correct, ...ds.slice(0, 4)])
  return { q, o: opts, a: opts.indexOf(correct), x, d, t }
}

// ── FD engine ─────────────────────────────────────────────────────────────
const close = (start, fds) => {
  const s = new Set(start.split(''))
  let grown = true
  while (grown) {
    grown = false
    for (const [l, r] of fds) {
      if (l.split('').every((x) => s.has(x))) {
        for (const x of r.split('')) if (!s.has(x)) { s.add(x); grown = true }
      }
    }
  }
  return [...s].sort().join('')
}
const allKeys = (attrs, fds) => {
  const keys = []
  const subs = (arr) => { const out = [[]]; arr.forEach((x) => out.push(...out.map((s) => [...s, x]))); return out }
  for (const sub of subs(attrs.split(''))) {
    if (!sub.length) continue
    const c = close(sub.join(''), fds)
    if (c !== attrs.split('').sort().join('')) continue
    const smaller = subs(sub).some((ss) => ss.length < sub.length && close(ss.join(''), fds) === c)
    if (!smaller) keys.push(sub.join(''))
  }
  return keys
}
const fmtSet = (s) => '{' + s.split('').join(',') + '}'
const fmtKey = (k) => k.split('').join('')

// ── DBMS generators ────────────────────────────────────────────────────────

const CLOSURE_PATTERNS = [
  // [fds, attrs] — varied shapes
  [['A B', 'B C'], 'ABCD'],
  [['A B', 'B C', 'C D'], 'ABCDE'],
  [['A B', 'B C', 'C A'], 'ABC'],
  [['A B', 'B C', 'C D', 'D A'], 'ABCD'],
  [['A B', 'BC D'], 'ABCD'],
  [['A B', 'AB C'], 'ABCD'],
  [['A B', 'B C', 'AC D'], 'ABCDE'],
  [['P Q', 'Q R'], 'PQRS'],
  [['X Y', 'YZ W'], 'XYZW'],
  [['M N', 'NO P'], 'MNOP'],
  [['A BC', 'C D'], 'ABCD'],
  [['P Q', 'Q R', 'R P'], 'PQR'],
  [['A B', 'B A'], 'ABCD'],
  [['M N', 'N M'], 'MNO'],
  [['A B', 'B C', 'C D', 'D E'], 'ABCDE'],
  [['P Q', 'QR S', 'S T'], 'PQRST'],
  [['A B', 'C D'], 'ABCD'],
  [['X Y', 'Y Z', 'Z W'], 'XYZW'],
  [['A B', 'B C', 'D E'], 'ABCDE'],
  [['A B', 'B C', 'AB D'], 'ABCD'],
]
const fdsOf = (pairs) => pairs.map(([l, r]) => [l.replace(/ /g, ''), r.replace(/ /g, '')])

const genClosure = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [pfds, attrs] = pick(CLOSURE_PATTERNS)
    const fds = fdsOf(pfds.map((s) => s.split(' ')))
    const mode = rand(0, 2)
    if (mode === 0) {
      // closure of a random single attr
      const x = pick(attrs.split(''))
      const ans = close(x, fds)
      const wrong1 = attrs.split('').sort().join('')
      const wrong2 = ans.length > 1 ? ans.slice(0, -1) : attrs.split('').sort().join('')
      const wrong3 = ans + pick(attrs.split('').filter((c) => !ans.includes(c)) || ['X'])
      const wrong4 = x
      const q = `FDs: ${fds.map(([l, r]) => `${l}→${r}`).join(', ')} on R(${attrs.split('').join(',')}). What is ${x}⁺?`
      out.set(q, mkq(q, fmtSet(ans), [fmtSet(wrong1), fmtSet(wrong2), fmtSet(wrong3), fmtSet(x === ans ? attrs.split('').sort().join('') : x)], `Run the engine: hold {${x}} → fire every arrow whose full left side you hold → rescan till nothing new. Reaches ${fmtSet(ans)}.`, 'med', t))
    } else if (mode === 1) {
      // candidate key
      const keys = allKeys(attrs, fds)
      const ans = fmtKey(keys[0])
      const distr = shuffle([attrs.slice(0, 2), attrs.slice(0, 3), keys[0] + attrs[attrs.length - 1], attrs[0], attrs.slice(-2)].map((s) => fmtKey(s)))
      const q = `FDs: ${fds.map(([l, r]) => `${l}→${r}`).join(', ')} on R(${attrs.split('').join(',')}). The candidate key is:`
      out.set(q, mkq(q, ans, distr, `Letters never on any right side must be starters; run the engine — ${ans} alone reaches all attributes.`, 'med', t))
    } else {
      // how many keys
      const cnt = String(allKeys(attrs, fds).length)
      const q = `FDs: ${fds.map(([l, r]) => `${l}→${r}`).join(', ')} on R(${attrs.split('').join(',')}). How many candidate keys exist?`
      out.set(q, mkq(q, cnt, ['1', '2', '3', '4', '5', '0'].filter((x) => x !== cnt).slice(0, 4), `Count every minimal start-set whose closure covers all attributes — cycles give each member a key; never-produced letters must start.`, 'hard', t))
    }
  }
  return [...out.values()]
}

const NF_T = [
  // [description builder, correct NF]
  [() => `${pick(['EMP', 'STUDENT', 'PRODUCT', 'EMPLOYEE', 'COURSE', 'MEMBER'])}(${pick(['skills', 'courses', 'tags', 'phones', 'emails'])}) stores a comma-list like "a, b, c" inside one cell. Highest NF?`, 'not even 1NF'],
  [() => `${pick(['ENROLL', 'ASSIGN', 'BOOKING', 'TEACHING', 'SHIFT'])}(${pick(['roll', 'emp', 'driver'])}, ${pick(['course', 'project', 'route'])} → ${pick(['grade', 'hours', 'fare'])}) — key = the pair; FD ${pick(['roll', 'emp', 'driver'])} → ${pick(['name', 'city', 'phone'])} also holds. Highest NF?`, '1NF'],
  [() => `${pick(['EMP', 'ORDER', 'STUDENT', 'PRODUCT'])}(${pick(['emp_id', 'order_no', 'roll'])} → ${pick(['dept', 'item', 'hostel'])}) — single-attr key; FD ${pick(['dept', 'item', 'hostel'])} → ${pick(['dept_city', 'price', 'warden'])} also holds. Highest NF?`, '2NF'],
  [() => `${pick(['TEACH', 'ZONE', 'ADDR', 'ROSTER'])}(a, b → c) — key = (a, b); FD c → b also holds (all attributes prime). Highest NF?`, '3NF'],
  [() => `${pick(['EMP', 'PRODUCT', 'MEMBER', 'ACCT'])}: ${pick(['emp_id', 'sku', 'member_id'])} → name AND ${pick(['email', 'serial', 'login'])} → ${pick(['emp_id', 'sku', 'member_id'])}, every LHS is a candidate key. Highest NF?`, 'BCNF'],
]
const genNF = (n, t) => {
  const levels = ['1NF', '2NF', '3NF', 'BCNF', 'not even 1NF']
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [mk, ans] = pick(NF_T)
    const q = mk()
    out.set(q, mkq(q, ans, levels.filter((l) => l !== ans), 'Walk the tree top→down: cell lists → not 1NF · half-key lean → 1NF · non-key→non-key chain → 2NF · LHS not key but RHS prime → 3NF · every LHS superkey → BCNF.', 'med', t))
  }
  return [...out.values()]
}

const genJoins = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const a = rand(8, 15), b = rand(4, 8), m = rand(1, Math.min(a, b) - 1)
    const type = pick(['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'])
    const ans = { 'INNER JOIN': m, 'LEFT JOIN': a, 'RIGHT JOIN': b, 'FULL OUTER JOIN': a + b - m, 'CROSS JOIN': a * b }[type]
    const q = `Table A has ${a} rows, B has ${b} rows, ${m} rows match on the join key. A ${type} B returns how many rows?`
    const pool = [m, a, b, a + b - m, a * b, a + b, a - m, b - m].filter((v) => v !== ans && v > 0)
    out.set(q, mkq(q, String(ans), shuffle(pool).slice(0, 4).map(String), 'INNER=matches · LEFT=|A| · RIGHT=|B| · FULL=|A|+|B|−matches · CROSS=|A|×|B|.', 'easy', t))
  }
  return [...out.values()]
}

const genSetOps = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const a = rand(3, 8), b = rand(3, 8), s = rand(0, Math.min(a, b))
    const op = pick(['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'])
    const ans = { UNION: a + b - s, 'UNION ALL': a + b, INTERSECT: s, EXCEPT: a - s }[op]
    const q = `Q1 returns ${a} rows, Q2 returns ${b} rows; ${s} rows appear in both. Q1 ${op} Q2 returns?`
    const pool = [a + b - s, a + b, s, a - s, a, b].filter((v) => v !== ans)
    out.set(q, mkq(q, String(ans), shuffle(pool).slice(0, 4).map(String), 'UNION=a+b−shared (dedupes) · UNION ALL=a+b · INTERSECT=shared only · EXCEPT=a−shared.', 'easy', t))
  }
  return [...out.values()]
}

const genSqlOut = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const col = pick(['comm', 'bonus', 'mgr_id', 'phone'])
    const vals = shuffle([rand(3, 9) * 1000, rand(3, 9) * 1000, null, null, rand(3, 9) * 1000, rand(3, 9) * 1000]).slice(0, rand(5, 6))
    const cmp = pick(vals.filter((v) => v !== null))
    const op = pick(['<>', '>', '<'])
    const survivors = vals.filter((v) => v !== null && (op === '<>' ? v !== cmp : op === '>' ? v > cmp : v < cmp)).length
    const q = `Column ${col} = {${vals.map((v) => (v === null ? 'NULL' : v)).join(', ')}}. SELECT COUNT(*) FROM T WHERE ${col} ${op} ${cmp} returns?`
    const pool = [vals.length, vals.filter((v) => v !== null).length, survivors + 1, survivors - 1, vals.length - 1].filter((v) => v !== survivors && v >= 0)
    out.set(q, mkq(q, String(survivors), shuffle(pool).slice(0, 4).map(String), 'NULL fails EVERY comparison — NULL ≠ anything → NULL rows are silently dropped by WHERE.', 'med', t))
  }
  return [...out.values()]
}

const genDDL = (n, t) => {
  const fams = { DDL: ['CREATE', 'ALTER', 'DROP', 'TRUNCATE', 'RENAME'], DML: ['INSERT', 'UPDATE', 'DELETE', 'MERGE'], DCL: ['GRANT', 'REVOKE'], TCL: ['COMMIT', 'ROLLBACK', 'SAVEPOINT'] }
  const phs = ['belongs to which family', 'is classified as', 'falls under which category', 'is part of which group', 'is a member of which family']
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const fam = pick(Object.keys(fams))
    const cmd = pick(fams[fam])
    if (rand(0, 2) === 0) {
      const others = shuffle(Object.keys(fams).filter((f) => f !== fam)).slice(0, 3).flatMap((f) => [pick(fams[f]), 'DQL' === f ? 'SELECT' : ''])
      const q2 = `Which command is NOT ${fam}?`
      const wrongCmd = pick(fams[pick(Object.keys(fams).filter((f) => f !== fam))])
      const correctCmd = pick(fams[fam])
      out.set(q2 + '|' + cmd, mkq(q2, wrongCmd, [correctCmd, pick(fams[fam]), 'GRANT' === wrongCmd ? 'REVOKE' : 'GRANT', 'SELECT'], `${wrongCmd} belongs to a different family; ${correctCmd} is ${fam}.`, 'med', t))
      continue
    }
    const q = `The SQL command ${cmd} ${pick(phs)}?`
    out.set(q, mkq(q, fam, [...Object.keys(fams).filter((f) => f !== fam), 'DQL'], 'DDL=structure (auto-commit) · DML=data rows (rollback-able) · DCL=permissions · TCL=transaction control.', 'easy', t))
  }
  return [...out.values()]
}

const DTD_SCEN = [
  ['Remove ALL rows fast, keep structure, no rollback needed, reset identity column', 'TRUNCATE'],
  ['Remove only rows matching a condition, must be rollback-able', 'DELETE'],
  ['Remove the table structure AND its data completely', 'DROP'],
  ['Fire row-level triggers / log each deleted row', 'DELETE'],
  ['Free the storage pages of a huge table instantly', 'TRUNCATE'],
  ['Delete the table so a future INSERT must first CREATE it', 'DROP'],
  ['Remove yesterday\'s stale rows but keep today\'s', 'DELETE'],
]
const genDTD = (n, t) => {
  const out = new Map()
  let guard = 0
  const tbls = ['EMP', 'ORDERS', 'LOGS', 'TEMP_DATA', 'ARCHIVE']
  const phs = ['Task', 'Requirement', 'Goal', 'Operation']
  while (out.size < n && guard++ < n * 30) {
    const [sc, ans] = pick(DTD_SCEN)
    const q = `${pick(phs)} on table ${pick(tbls)}: "${sc}." Which command?`
    out.set(q, mkq(q, ans, ['DELETE', 'TRUNCATE', 'DROP'].filter((x) => x !== ans).concat(['SELECT', 'REMOVE']).slice(0, 4), 'DELETE=pick rows (WHERE, DML, rollback-able) · TRUNCATE=empty the box (DDL, no WHERE, resets identity) · DROP=burn the box (structure + data gone).', 'med', t))
  }
  return [...out.values()]
}

const ACID_SCEN = [
  ['Either the whole transfer happens or nothing at all happens', 'Atomicity'],
  ['A committed row must still exist after a server crash', 'Durability'],
  ['Concurrent users must see data as if transactions ran serially', 'Isolation'],
  ['A write must never leave the database in an invalid state', 'Consistency'],
  ['T1 re-reads a row T2 updated — sees a different value', 'Non-repeatable read'],
  ['T1 re-queries and NEW rows appeared that were not there before', 'Phantom read'],
  ['T1 reads a value T2 wrote but has not committed yet', 'Dirty read'],
  ['Money debits A but never credits B — system rolls back both', 'Atomicity'],
  ['Balance stays valid even though power failed mid-write', 'Durability'],
  ['Two simultaneous transfers must not see each other\'s partial work', 'Isolation'],
  ['A sal column can\'t end up holding text after a txn', 'Consistency'],
  ['T1 reads rows, T2 inserts a new matching row — T1\'s re-read finds it', 'Phantom read'],
  ['T1 sees T2\'s UPDATE that T2 later rolls back', 'Dirty read'],
  ['Salary re-read differs after T2 commits in between', 'Non-repeatable read'],
]
const genACID = (n, t) => {
  const out = new Map()
  let guard = 0
  const txns = ['T1', 'T2', 'Tx-A', 'Tx-B']
  const tbls = ['EMP', 'ORDERS', 'ACCOUNTS', 'STOCKS']
  while (out.size < n && guard++ < n * 30) {
    const [sc, ans] = pick(ACID_SCEN)
    const t1 = pick(txns), t2 = pick(txns.filter((x) => x !== t1)), tbl = pick(tbls)
    const phrased = sc
      .replace(/T1/g, t1).replace(/T2/g, t2)
      + ` [on table ${tbl}]`
    const pool = ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Dirty read', 'Non-repeatable read', 'Phantom read', 'Lost update'].filter((x) => x !== ans)
    out.set(phrased, mkq(`Scenario: "${phrased}." Which ACID property / concurrency phenomenon?`, ans, shuffle(pool).slice(0, 4), 'dirty=read uncommitted · non-repeatable=same row changed · phantom=new ROWS appeared · A=all-or-nothing · C=valid→valid · I=as-if-serial · D=survives crash.', 'med', t))
  }
  return [...out.values()]
}

const ANOM_SCEN = [
  ['Cannot add a new department because it has no employees yet', 'insertion'],
  ['Deleting the last employee of a dept erases the dept from the DB', 'deletion'],
  ['Same fact stored in 5 rows — updated in 4, missed 1 → inconsistent', 'update'],
  ['Must create a dummy order row just to record a new supplier', 'insertion'],
  ['Removing the last student of a course deletes the course record', 'deletion'],
  ['Cannot register a supplier until it has an order row', 'insertion'],
  ['Removing the last member of a team deletes the team record', 'deletion'],
  ['Supplier city stored in every order row — one stale copy survives an update', 'update'],
]
const genAnomaly = (n, t) => {
  const out = new Map()
  let guard = 0
  const tbls = ['EMP_DEPT', 'STUDENT_COURSE', 'ORDER_SUPPLIER', 'MEMBER_TEAM', 'PATIENT_WARD', 'EMP_PROJ', 'CUST_ACCT']
  const phs = ['Which anomaly?', 'Identify the anomaly', 'This is an example of', 'Classify this problem']
  while (out.size < n && guard++ < n * 30) {
    const [sc, ans] = pick(ANOM_SCEN)
    const q = `In table ${pick(tbls)}: "${sc}." ${pick(phs)}`
    out.set(q, mkq(q, ans + ' anomaly', ['insertion anomaly', 'deletion anomaly', 'update anomaly', 'referential failure'].filter((x) => x !== ans + ' anomaly').concat(['transitive dependency']).slice(0, 4), 'Can\'t write new fact=insertion · deleting last row kills a fact=deletion · editing many copies, miss one=update.', 'med', t))
  }
  return [...out.values()]
}

const genNth = (n, t) => {
  const out = new Map()
  let guard = 0
  const cols = ['sal', 'price', 'marks', 'score']
  const tbls = ['EMP', 'PRODUCT', 'STUDENT', 'TRADE']
  const phs = ['highest', 'largest', 'topmost']
  while (out.size < n && guard++ < n * 30) {
    const mode = rand(0, 4)
    const col = pick(cols), tbl = pick(tbls), ph = pick(phs)
    let q, ans
    if (mode === 0) {
      const k = rand(2, 8)
      q = `${k}th-${ph} ${col}: SELECT ${col} FROM ${tbl} ORDER BY ${col} DESC LIMIT 1 OFFSET ?`
      ans = String(k - 1)
      out.set(q, mkq(q, ans, [String(k), String(k + 1), String(k - 2), '0', String(k + 2)].filter((x) => x !== ans && +x >= 0), 'OFFSET is always n−1 — the offset counts rows to SKIP before the one you want.', 'easy', t))
    } else if (mode === 1) {
      const k = rand(2, 8)
      q = `Correlated nth-${ph}: WHERE (SELECT COUNT(*) FROM ${tbl} e2 WHERE e2.${col} > e1.${col}) = ? gives the ${k}th ${ph}`
      ans = String(k - 1)
      out.set(q, mkq(q, ans, [String(k), String(k + 1), String(k - 2), '0'].filter((x) => x !== ans && +x >= 0), 'Count bigger values — n−1 bigger means nth.', 'med', t))
    } else if (mode === 2) {
      const m = rand(1, 7)
      q = `ORDER BY ${col} DESC LIMIT 1 OFFSET ${m} returns the:`
      ans = `${m + 1}th ${ph}`
      out.set(q, mkq(q, ans, [`${m}th ${ph}`, `${m}th lowest`, `${m + 2}th ${ph}`, `${m + 1}th lowest`, 'last row'].filter((x) => x !== ans), `DESC + skip ${m} → ${m + 1}th from the top.`, 'easy', t))
    } else if (mode === 3) {
      const k = rand(2, 7)
      q = `${k}th-${ph} ${col} via LIMIT x,y syntax: ORDER BY ${col} DESC LIMIT ?, 1`
      ans = String(k - 1)
      out.set(q, mkq(q, ans, [String(k), String(k + 1), String(k - 2), '0'].filter((x) => x !== ans && +x >= 0), 'LIMIT offset,count — offset = n−1.', 'easy', t))
    } else {
      q = `Two rows share the max ${col} in ${tbl}. The 2nd-${ph} DISTINCT value equals:`
      ans = 'the next distinct value below the max'
      out.set(q + '|' + col + tbl, mkq(q, ans, ['the same max value', 'NULL', 'unreachable', 'the minimum', 'zero'], 'Nth-${ph} counts DISTINCT values — a shared max still ranks #1.', 'hard', t))
    }
  }
  return [...out.values()]
}

const genHaving = (n, t) => {
  const out = new Map()
  let guard = 0
  const valid = [
    'SELECT dept, COUNT(*) FROM EMP GROUP BY dept HAVING COUNT(*) > 3',
    'SELECT dept FROM EMP GROUP BY dept HAVING AVG(sal) > 50000',
    'SELECT dept, SUM(sal) FROM EMP WHERE city="Mumbai" GROUP BY dept HAVING SUM(sal) > 100000',
    'SELECT dept, MAX(sal) FROM EMP GROUP BY dept HAVING MAX(sal) > 90000',
    'SELECT dept, MIN(sal) FROM EMP GROUP BY dept HAVING MIN(sal) < 20000',
    'SELECT dept FROM EMP WHERE sal > 30000 GROUP BY dept HAVING COUNT(*) > 2',
    'SELECT dept, AVG(sal) FROM EMP GROUP BY dept HAVING AVG(sal) BETWEEN 40000 AND 80000',
    'SELECT COUNT(*) FROM EMP HAVING COUNT(*) > 50',
  ]
  const invalid = [
    'SELECT dept FROM EMP WHERE COUNT(*) > 3 GROUP BY dept',
    'SELECT dept, COUNT(*) FROM EMP WHERE COUNT(*) > 2 GROUP BY dept',
    'SELECT dept HAVING COUNT(*) > 3 FROM EMP GROUP BY dept',
    'SELECT dept FROM EMP GROUP BY COUNT(*) > 3',
    'SELECT dept FROM EMP WHERE AVG(sal) > 60000 GROUP BY dept',
    'SELECT dept FROM EMP WHERE MAX(sal) > 90000 GROUP BY dept',
    'SELECT dept FROM EMP WHERE SUM(sal) > 500000 GROUP BY dept',
    'SELECT dept FROM EMP WHERE MIN(sal) < 20000 GROUP BY dept HAVING COUNT(*) > 1',
  ]
  while (out.size < n && guard++ < n * 30) {
    const mode = rand(0, 2)
    if (mode === 0) {
      const v = pick(valid)
      const q = `Which is VALID SQL?\n(A) ${v}\n(B) ${pick(invalid)}`
      out.set(q, mkq(q, 'Option (A)', ['Option (B)', 'Both', 'Neither', 'Both valid only inside a stored proc'], 'Aggregates belong in HAVING after GROUP BY — never in WHERE (groups don\'t exist yet).', 'med', t))
    } else if (mode === 1) {
      const iv = pick(invalid)
      const q = `Why is \`${iv}\` invalid?`
      out.set(q, mkq(q, 'Aggregate used in WHERE — groups don\'t exist at that stage', ['HAVING must precede GROUP BY', 'GROUP BY needs an ORDER BY', 'Aggregates need subqueries', 'COUNT needs a column'], 'Run order: FROM→WHERE→GROUP BY→HAVING. WHERE filters rows before any group exists → aggregates are illegal there.', 'med', t))
    } else {
      const iv = pick(invalid)
      const q = `Which is INVALID SQL?\n(A) ${iv}\n(B) ${pick(valid)}`
      out.set(q, mkq(q, 'Option (A)', ['Option (B)', 'Both', 'Neither', 'Both invalid only inside triggers'], 'Aggregates illegal in WHERE — groups don\'t exist at that stage.', 'med', t))
    }
  }
  return [...out.values()]
}

const ACID_REV = [
  ['All-or-nothing — partial work rolls back', 'Atomicity'],
  ['Valid state → valid state, never invalid', 'Consistency'],
  ['Concurrent txns behave as-if-serial', 'Isolation'],
  ['Committed data survives crashes', 'Durability'],
  ['T1 sees uncommitted value T2 wrote', 'Dirty read'],
  ['Same row re-read, different value', 'Non-repeatable read'],
  ['Re-query returns rows that did not exist before', 'Phantom read'],
  ['Transaction treated as one indivisible unit', 'Atomicity'],
  ['Integrity constraints preserved across txns', 'Consistency'],
  ['Isolation level prevents uncommitted reads', 'Dirty read prevention'],
  ['New matching rows appearing on re-execution', 'Phantom read'],
  ['WHERE clause row changing between two reads', 'Non-repeatable read'],
]
const genACIDRev = (n, t) => {
  const out = new Map()
  let guard = 0
  const tbls = ['EMP', 'ORDERS', 'ACCOUNTS', 'TRADES']
  while (out.size < n && guard++ < n * 30) {
    const [sc, ans] = pick(ACID_REV)
    const key = `${sc} | table ${pick(tbls)}`
    const pool = ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Dirty read', 'Non-repeatable read', 'Phantom read', 'Lost update'].filter((x) => x !== ans)
    out.set(key, mkq(`Which term means "${sc}" (context: ${pick(tbls)} table)?`, ans, shuffle(pool).slice(0, 4), 'dirty=uncommitted · non-repeatable=value changed · phantom=NEW rows · A=all-or-nothing · C=valid→valid · I=serial · D=crash-proof.', 'med', t))
  }
  return [...out.values()]
}

const genDecomp = (n, t) => {
  const out = new Map()
  let guard = 0
  const cases = [
    ['R(A,B,C) split into R1(A,B) + R2(B,C) with FD B→C', 'Lossless — B determines all of R2'],
    ['R(A,B,C,D) split into R1(A,B) + R2(C,D) — no shared column', 'Lossy — no common attribute'],
    ['R(A,B,C) split into R1(A,B) + R2(A,C) with FD A→C', 'Lossless — A determines all of R2'],
    ['R(A,B,C) split into R1(A,C) + R2(B,C) with FD C→A', 'Lossless — C determines A in R1'],
    ['R(A,B,C,D) split into R1(A,B) + R2(B,C,D) with FD B→CD', 'Lossless — B determines all of R2'],
    ['R(P,Q,R) split into R1(P,Q) + R2(Q,R) with FD Q→R', 'Lossless — Q determines all of R2'],
    ['R(P,Q,R,S) split into R1(P,Q) + R2(R,S) — nothing shared', 'Lossy — no common attribute'],
    ['R(A,B,C) split into R1(A,B) + R2(B,C) with FD A→B', 'Lossless — B shared and A→B makes A superkey of R1'],
    ['R(X,Y,Z) split into R1(X,Y) + R2(Y,Z) with FD Y→Z', 'Lossless — Y determines all of R2'],
    ['R(X,Y,Z,W) split into R1(X,Y) + R2(Z,W)', 'Lossy — no common attribute'],
    ['R(A,B,C,D) split into R1(A,B,C) + R2(C,D) with FD C→D', 'Lossless — C determines all of R2'],
    ['R(A,B,C) split into R1(A,B) + R2(B,C) with FD AB→BC', 'Lossless — AB (shared B plus A) determines R2'],
    ['R(P,Q,R,S) split into R1(P,Q,R) + R2(R,S) with FD R→S', 'Lossless — R determines all of R2'],
    ['R(A,B) split into R1(A) + R2(B)', 'Lossy — no common attribute'],
  ]
  const phs = ['Is the decomposition lossless?', 'Classify this decomposition', 'Lossless or lossy?']
  while (out.size < n && guard++ < n * 30) {
    const [sc, ans] = pick(cases)
    const q = `${sc}. ${pick(phs)}`
    out.set(q, mkq(q, ans, ['Lossy — spurious rows on rejoin', 'Lossless — B determines all of R2', 'Lossy — no common attribute', 'Lossless — A determines all of R2', 'Lossless — C determines A in R1', 'Lossless — Q determines all of R2', 'Lossless — Y determines all of R2'].filter((x) => x !== ans), 'Lossless test: the shared attribute must determine one whole side of the split. No shared column → always lossy.', 'med', t))
  }
  return [...out.values()]
}

const IDX_MORE = [
  ['Index stored in sorted order matching the data file\'s physical order', 'Clustered index'],
  ['Fast equality lookups via a hash function on the key', 'Hash index'],
  ['Balanced sorted tree ideal for range queries', 'B+ tree index'],
  ['Column has only a few distinct values, mostly equality counts', 'Bitmap index'],
  ['Secondary index keeping row pointers, data file unordered', 'Non-clustered index'],
  ['Only one allowed per table; dictates row storage order', 'Clustered index'],
  ['Many allowed per table; stores pointers to rows', 'Non-clustered index'],
  ['Best for BETWEEN / > / < queries', 'B+ tree index'],
  ['Best for = equality probes', 'Hash index'],
]
const genIndexRev = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [sc, ans] = pick(IDX_MORE)
    out.set(sc + '|' + rand(0, 99), mkq(`"${sc}" describes a:`, ans, ['B+ tree index', 'Hash index', 'Clustered index', 'Non-clustered index', 'Bitmap index'].filter((x) => x !== ans), 'Range→B+ · equality→hash · clustered=physical order (one per table) · bitmap=low cardinality.', 'med', t))
  }
  return [...out.values()]
}

const genDTDRev = (n, t) => {
  const out = new Map()
  let guard = 0
  const facts = [
    ['DELETE', 'row-by-row removal, WHERE allowed, rollback-able, fires triggers'],
    ['TRUNCATE', 'empties table instantly, no WHERE, resets identity, DDL'],
    ['DROP', 'removes structure + data permanently, DDL'],
  ]
  while (out.size < n && guard++ < n * 30) {
    const [ans, desc] = pick(facts)
    const q = `"${desc}" — which command?`
    out.set(q, mkq(q, ans, ['DELETE', 'TRUNCATE', 'DROP', 'UPDATE', 'ALTER'].filter((x) => x !== ans), 'DELETE=pick rows · TRUNCATE=empty box fast · DROP=burn the box.', 'easy', t))
  }
  return [...out.values()]
}

const genSubq = (n, t) => {
  const out = new Map()
  let guard = 0
  const qs = [
    ['Inner query references an outer-row column → runs once per outer row', 'Correlated subquery'],
    ['Inner query returns ONE value used with = or >', 'Scalar subquery'],
    ['Inner query returns a set used with IN', 'Set-valued subquery'],
    ['EXISTS checks whether the inner query returns at least one row', 'Correlated subquery (usually)'],
    ['Inner query has no outer references → runs once', 'Uncorrelated subquery'],
    ['WHERE sal = (SELECT MAX(sal) FROM EMP) — inner yields one value', 'Scalar subquery'],
    ['WHERE EXISTS(SELECT 1 FROM ORD WHERE ORD.eid = EMP.eid)', 'Correlated subquery'],
    ['WHERE dept_id IN (SELECT did FROM DEPT)', 'Uncorrelated subquery'],
    ['Inner references EMP.dno from outer row', 'Correlated subquery'],
    ['SELECT (SELECT AVG(sal) FROM EMP) AS avg_sal — one value in SELECT', 'Scalar subquery'],
  ]
  const phs = ['which subquery type', 'classify this subquery', 'identify the pattern']
  const tbls = ['EMP/DEPT', 'ORD/CUST', 'STU/CRS']
  while (out.size < n && guard++ < n * 30) {
    const [desc, ans] = pick(qs)
    const q = `"${desc}" on ${pick(tbls)} — ${pick(phs)}?`
    out.set(q, mkq(q, ans, ['Correlated subquery', 'Scalar subquery', 'Set-valued subquery', 'Uncorrelated subquery', 'Join predicate'].filter((x) => x !== ans), 'Correlated=references outer row, re-runs per row · scalar=one value · IN-list=set.', 'med', t))
  }
  return [...out.values()]
}

const genAnomalyRev = (n, t) => {
  const out = new Map()
  let guard = 0
  const defs = [
    ['Cannot record a new fact without unrelated data', 'insertion anomaly'],
    ['Deleting the last row destroys an unrelated fact', 'deletion anomaly'],
    ['Same fact copied in many rows — updating misses some', 'update anomaly'],
    ['Recording a fact requires unrelated data to exist first', 'insertion anomaly'],
    ['Removing a row removes a different fact along with it', 'deletion anomaly'],
    ['Updating a fact must touch many rows; missed copies diverge', 'update anomaly'],
  ]
  const phs2 = ['is the definition of', 'describes', 'is called', 'is known as']
  while (out.size < n && guard++ < n * 30) {
    const [desc, ans] = pick(defs)
    const q = `"${desc}" ${pick(phs2)}:`
    out.set(q, mkq(q, ans, ['insertion anomaly', 'deletion anomaly', 'update anomaly', 'transitive dependency', 'partial dependency'].filter((x) => x !== ans), 'Insert=can\'t add · delete=lost fact · update=copies diverge.', 'easy', t))
  }
  return [...out.values()]
}

const IDX_SCEN = [
  ['Queries are mostly range filters: sal BETWEEN x AND y', 'B+ tree index'],
  ['Lookups are exact-match only: emp_id = 4021', 'Hash index'],
  ['Need physical row order to match the index order (one per table max)', 'Clustered index'],
  ['Need a fast pointer map without reordering stored rows', 'Non-clustered index'],
  ['Reporting column with 3 distinct values, mostly equality counts', 'Bitmap index'],
  ['ORDER BY + range scans on a high-cardinality column', 'B+ tree index'],
  ['Point lookups on user_id, never ranges', 'Hash index'],
  ['Want rows physically sorted by join key', 'Clustered index'],
  ['Gender/status column with very few distinct values', 'Bitmap index'],
  ['Secondary search path without touching data layout', 'Non-clustered index'],
]
const genIndexing = (n, t) => {
  const out = new Map()
  let guard = 0
  const cols = ['sal', 'emp_id', 'status', 'order_date', 'region']
  const phs = ['Scenario', 'Workload', 'Query pattern']
  while (out.size < n && guard++ < n * 30) {
    const [sc, ans] = pick(IDX_SCEN)
    const q = `${pick(phs)} on column ${pick(cols)}: "${sc}." Best index type?`
    out.set(q, mkq(q, ans, ['B+ tree index', 'Hash index', 'Clustered index', 'Non-clustered index', 'Bitmap index'].filter((x) => x !== ans), 'Range→B+ tree (sorted) · equality-only→hash · clustered=physical order (ONE per table) · bitmap=low-cardinality columns.', 'med', t))
  }
  return [...out.values()]
}

// ── DBMS curated banks ─────────────────────────────────────────────────────
const B = (q, o, a, x, d, t) => ({ q, o, a, x, d, t })

const bankSubq = (t) => [
  B('`WHERE EXISTS (SELECT 1 FROM ORDERS WHERE ORDERS.cid = CUST.cid)` — the inner query is:', ['scalar subquery', 'correlated subquery', 'uncorrelated subquery', 'join', 'set operation'], 1, 'Inner references the OUTER row (CUST.cid) → re-runs per outer row → correlated.', 'med', t),
  B('`WHERE sal = (SELECT AVG(sal) FROM EMP)` — the inner query is a:', ['correlated subquery', 'scalar subquery', 'join predicate', 'table expression', 'cursor'], 1, 'Returns ONE value used with = → scalar; runs once.', 'easy', t),
  B('`WHERE dept_id IN (SELECT did FROM DEPT WHERE city="Mumbai")` — the IN list returns:', ['one value', 'a set of values', 'a row', 'a table alias', 'a boolean'], 1, 'IN compares against a set — the subquery can return many rows.', 'easy', t),
  B('In a correlated subquery, the inner query runs:', ['once before the outer', 'once per outer row', 'in parallel always', 'only once ever', 'never'], 1, 'It references outer-row columns → must re-execute for each outer row.', 'med', t),
  B('`SELECT name FROM EMP WHERE EXISTS(SELECT 1 FROM ORD WHERE ORD.eid=EMP.eid)` returns employees who:', ['have orders', 'have no orders', 'have the biggest order', 'joined recently', 'have NULL dept'], 0, 'EXISTS tests presence — employees having at least one order.', 'med', t),
  B('Which operator is typically correlated?', ['IN', 'EXISTS', '=', '>', 'LIKE'], 1, 'EXISTS subqueries usually reference the outer row → correlated.', 'med', t),
]

const bankNth = (t) => [
  B('2nd-highest salary via LIMIT/OFFSET: `ORDER BY sal DESC LIMIT 1 OFFSET ?`', ['0', '1', '2', 'n', 'n+1'], 1, 'OFFSET is always n−1 — 2nd highest → offset 1.', 'easy', t),
  B('3rd-highest salary — LIMIT 1 OFFSET:', ['1', '2', '3', '4', '0'], 1, 'n−1 = 2.', 'easy', t),
  B('Correlated pattern for nth-highest:', ['WHERE n = COUNT of smaller salaries', 'WHERE n−1 = COUNT of bigger salaries', 'WHERE sal = MAX(sal)', 'GROUP BY sal', 'HAVING n=1'], 1, 'Count how many salaries are bigger — n−1 bigger means nth.', 'med', t),
  B('`ORDER BY sal DESC LIMIT 1 OFFSET 4` returns the:', ['4th lowest', '4th highest', '5th highest', '5th lowest', 'last row'], 2, 'DESC + offset 4 = skip 4 biggest → 5th highest.', 'med', t),
  B('To get 2nd highest WITHOUT LIMIT (older SQL):', ['MIN(sal)', 'MAX(sal) WHERE sal < MAX(sal)', 'AVG of top 2', 'ROWNUM=2 always', 'RANK()=1'], 1, 'Max of the rows below the max = runner-up.', 'med', t),
  B('Ties in "nth highest" — two rows share the max salary. 2nd highest is:', ['the same max value', 'the next distinct value', 'unreachable', 'NULL', 'random'], 1, 'Nth-highest counts DISTINCT values — a shared max still ranks #1.', 'hard', t),
]

const bankDecomp = (t) => [
  B('R(A,B,C), B→C. Split R1(A,B), R2(B,C). The decomposition is lossless because:', ['B is a key of R1', 'common attr B determines all of R2', 'both tables are small', 'A is unique', 'C is prime'], 1, 'Lossless test: the shared column must be a superkey of at least one side.', 'med', t),
  B('A decomposition is dependency-preserving when:', ['every FD checkable inside one decomposed table', 'no table has >3 columns', 'all keys survive', 'no NULLs appear', 'join is natural'], 0, 'Each FD must be testable within a single decomposed relation.', 'med', t),
  B('Lossless join requires the common attribute to be:', ['indexed', 'a candidate key of one side', 'nullable', 'a foreign key of both', 'unique in both tables always'], 1, 'Shared attr determining a whole side → no spurious rows on rejoin.', 'med', t),
  B('R(A,B,C,D) decomposed to R1(A,B) + R2(C,D) with NO common attribute is:', ['lossless', 'lossy', 'BCNF', 'always safe', 'dependency-preserving'], 1, 'No shared column → rejoin produces a cross product → spurious rows.', 'med', t),
  B('Lossy decomposition symptom:', ['fewer rows after rejoin', 'extra spurious rows after rejoin', 'NULLs appear', 'keys disappear', 'data compresses'], 1, 'Lossy = the natural join invents rows that never existed.', 'med', t),
]

const bankER = (t) => [
  B('In ER→table mapping, a weak entity\'s key is built from:', ['its own attributes only', 'partial key + owner entity\'s key', 'a surrogate always', 'foreign key only', 'no key'], 1, 'Weak entities can\'t self-identify — they borrow the owner\'s key.', 'med', t),
  B('An M:N relationship maps to:', ['a column in either table', 'a separate relation with both keys', 'a view', 'a trigger', 'nothing — merge tables'], 1, 'Many-to-many needs its own table holding both entity keys.', 'med', t),
  B('A 1:N relationship usually maps by:', ['new relation always', 'FK on the N side pointing to the 1 side', 'merging both entities', 'a lookup view', 'a trigger'], 1, 'The many side carries the foreign key to the one side.', 'med', t),
  B('Multivalued attribute in ER maps to:', ['a comma-separated column', 'a separate table keyed by entity+value', 'an array column is standard', 'dropped', 'a CHECK constraint'], 1, 'Multivalued attrs normalize into their own relation.', 'med', t),
  B('A 1:1 relationship is normally implemented as:', ['three tables', 'FK in either table + UNIQUE', 'a trigger', 'a view', 'merge forbidden'], 1, 'Either side can hold the FK; UNIQUE enforces the 1:1.', 'med', t),
]

const bankHaving = (t) => [
  B('Which query is VALID?', ['SELECT dept FROM EMP WHERE COUNT(*)>5 GROUP BY dept', 'SELECT dept, COUNT(*) FROM EMP GROUP BY dept HAVING COUNT(*)>5', 'SELECT dept HAVING COUNT(*)>5', 'SELECT COUNT(*) WHERE dept="IT"', 'SELECT dept GROUP BY COUNT(*)>5'], 1, 'Aggregates are illegal in WHERE (no groups yet) — legal only in HAVING after GROUP BY.', 'med', t),
  B('`WHERE AVG(sal) > 60000` is illegal because:', ['AVG needs GROUP BY first', 'aggregates run before rows exist', 'WHERE sees groups not rows', 'AVG is not a function', 'sal is not numeric'], 0, 'WHERE filters rows BEFORE grouping — aggregates need the groups to exist.', 'med', t),
  B('Fix for `WHERE sal > (SELECT AVG(sal) FROM EMP)`:', ['it is already valid', 'move AVG into HAVING', 'wrap sal in SUM()', 'add GROUP BY', 'drop WHERE'], 0, 'A scalar subquery in WHERE is legal — it returns one value per check.', 'med', t),
  B('HAVING without GROUP BY is:', ['always illegal', 'legal — applies to the whole table as one group', 'same as WHERE', 'deprecated', 'faster'], 1, 'Without GROUP BY the entire table is one implicit group — HAVING can filter it.', 'hard', t),
  B('Execution order — which runs FIRST?', ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY'], 1, 'FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY — written order ≠ run order.', 'easy', t),
  B('`SELECT dept FROM EMP GROUP BY dept` returns:', ['all rows', 'one row per distinct dept', 'only the biggest dept', 'an error', 'sorted employees'], 1, 'GROUP BY collapses each group to one output row.', 'easy', t),
]

// ── Quant generators ───────────────────────────────────────────────────────
const genApprox = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const mode = rand(0, 3)
    let q, ans
    if (mode === 0) {
      const x = rand(3, 9) + rand(1, 9) / 10, N = rand(2, 9) * 100 + rand(1, 9) / 10, a = rand(2, 5) + rand(1, 9) / 10, b = rand(4, 9) + rand(1, 9) / 10
      ans = Math.round(Math.round(x / 10) * 10 / 100 * Math.round(N) + Math.round(a) * Math.round(b))
      q = `${x}% of ${N} + ${a} × ${b} ≈ ?`
    } else if (mode === 1) {
      const a = rand(11, 29), b = rand(11, 29), c = rand(2, 5) * 100
      ans = a * a + b * b - c
      q = `(${a}.9)² + (${b}.1)² − ${c}.5 ≈ ?`
    } else if (mode === 2) {
      const N = rand(3, 9) * 100, d = rand(2, 5) * 5, a = rand(3, 9), b = rand(4, 9)
      ans = Math.round(N / d) + a * b
      q = `${N}.5 ÷ ${d}.95 + ${a}.1 × ${b}.9 ≈ ?`
    } else {
      const p1 = pick([50, 62.5, 75, 80, 87.5]), p2 = pick([10, 12.5, 20, 25, 33.3])
      const N1 = rand(4, 9) * 100, N2 = rand(2, 7) * 100
      ans = Math.round(p1 / 100 * N1 - p2 / 100 * N2)
      q = `${p1}% of ${N1}.5 − ${p2}% of ${N2}.8 ≈ ?`
    }
    const pool = [ans - 10, ans + 10, ans - 20, ans + 20, ans + 5, ans - 5].filter((v) => v !== ans && v > 0)
    out.set(q, mkq(q, String(ans), shuffle(pool).slice(0, 4).map(String), 'Park each number at its friendly cousin (%, squares, multiples of 5) → compute with cousins → pick the closest option.', 'easy', t))
  }
  return [...out.values()]
}

const genSeries = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const mode = rand(0, 4)
    let terms, next
    if (mode === 0) { // growing gaps
      let x = rand(2, 8); let gap = rand(3, 5); terms = [x]
      for (let i = 0; i < 5; i++) { x += gap; terms.push(x); gap += 2 }
      next = x + gap
    } else if (mode === 1) { // n²±k
      const k = rand(0, 3); terms = [2, 3, 4, 5, 6].map((i) => i * i - k); next = 49 - k
    } else if (mode === 2) { // ×k+c
      let x = rand(2, 5); const k = rand(2, 3), c = rand(1, 3); terms = [x]
      for (let i = 0; i < 5; i++) { x = x * k + c; terms.push(x) }
      next = x * k + c
    } else if (mode === 3) { // sum of previous
      let a = rand(1, 4), b = a + rand(1, 3); terms = [a, b]
      for (let i = 0; i < 4; i++) { terms.push(terms[i] + terms[i + 1]) }
      next = terms[4] + terms[5]
    } else { // wrong-term: gaps +k
      let x = rand(3, 9); const gap = rand(4, 6); terms = [x]
      for (let i = 0; i < 5; i++) { x += gap; terms.push(x) }
      const badIdx = rand(2, 4); const badVal = terms[badIdx] + pick([1, -1, 2])
      const shown = terms.map((v, i) => (i === badIdx ? badVal : v))
      const q2 = `Find the wrong term: ${shown.join(', ')}`
      const pool = shown.filter((v) => v !== badVal)
      out.set(q2, mkq(q2, String(badVal), shuffle(pool).slice(0, 4).map(String), `Expected constant gap of ${gap} — one term corrupts TWO gaps; the culprit sits between the broken gaps.`, 'med', t))
      continue
    }
    const q = `Missing term: ${terms.join(', ')}, ?`
    const pool = [next - 1, next + 1, next + 2, next - 2, next + 3].filter((v) => v !== next)
    out.set(q, mkq(q, String(next), shuffle(pool).slice(0, 4).map(String), 'Ladder: gaps → ratios → ×k+c → n²±k → sum-of-previous. Check in order.', 'easy', t))
  }
  return [...out.values()]
}

const genQuadratic = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const r1 = rand(2, 6), r2 = r1 + rand(1, 4), s1 = rand(2, 6), s2 = s1 + rand(1, 4)
    const ans = r2 < s1 ? 'x < y' : s2 < r1 ? 'x > y' : r2 === s1 ? 'x ≤ y' : 'CND'
    const q = `I. x² − ${r1 + r2}x + ${r1 * r2} = 0   II. y² − ${s1 + s2}y + ${s1 * s2} = 0`
    out.set(q, mkq(q, ans, ['x > y', 'x < y', 'x ≤ y', 'x ≥ y', 'CND'].filter((x) => x !== ans), `I roots ${r1},${r2} · II roots ${s1},${s2} — compare RANGES: strict separation → </> · touching roots → ≤/≥ · overlap → CND.`, 'med', t))
  }
  return [...out.values()]
}

const genDI = (n, t) => {
  const out = new Map()
  const ents = ['A', 'B', 'C', 'D']
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const vals = ents.map(() => rand(4, 9) * 10)
    const mode = rand(0, 2)
    let q, ans
    if (mode === 0) {
      let i = rand(0, 2)
      if (vals[i + 1] <= vals[i]) { const tmp = vals[i]; vals[i] = vals[i + 1]; vals[i + 1] = tmp }
      ans = Math.round((vals[i + 1] - vals[i]) / vals[i] * 100)
      q = `Sales: A=${vals[0]}, B=${vals[1]}, C=${vals[2]}, D=${vals[3]} (thousand). Rise % from ${ents[i]} to ${ents[i + 1]}?`
    } else if (mode === 1) {
      ans = vals.reduce((a, b) => a + b, 0)
      q = `Sales: A=${vals[0]}, B=${vals[1]}, C=${vals[2]}, D=${vals[3]} (thousand). Total sales?`
    } else {
      const i = rand(0, 3)
      ans = Math.round(vals[i] / vals.reduce((a, b) => a + b, 0) * 100)
      q = `Sales: A=${vals[0]}, B=${vals[1]}, C=${vals[2]}, D=${vals[3]} (thousand). ${ents[i]}'s share % of total?`
    }
    const pool = [ans - 5, ans + 5, ans - 10, ans + 10, ans + 3].filter((v) => v !== ans && v > 0)
    out.set(q, mkq(q, String(ans), shuffle(pool).slice(0, 4).map(String), 'DI: units first → read the question → only the named numbers matter. "Rise %" divides by the OLD value.', 'med', t))
  }
  return [...out.values()]
}

const genArith = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const mode = rand(0, 3)
    let q, ans
    if (mode === 0) {
      const P = rand(2, 9) * 1000, R = rand(4, 12), T = rand(2, 5)
      ans = P * R * T / 100
      q = `SI on ₹${P} at ${R}% p.a. for ${T} years = ?`
    } else if (mode === 1) {
      const cp = rand(2, 9) * 100, pct = rand(10, 30)
      ans = cp + cp * pct / 100
      q = `A trader buys at ₹${cp} and sells at ${pct}% profit. Selling price?`
    } else if (mode === 2) {
      const d = rand(20, 60), s = rand(3, 9)
      ans = d / s
      q = `A car covers ${d} km in ${s} hours. Speed in km/hr?`
    } else {
      const a = rand(5, 10), b = rand(5, 10), c = rand(3, 8)
      ans = (a + b + c) / 3 % 1 === 0 ? (a + b + c) / 3 : Math.round((a + b + c) / 3)
      q = `Three friends weigh ${a}0, ${b}0, ${c}0 kg. Average weight?`
    }
    const pool = [ans - 10, ans + 10, ans * 2, ans / 2, ans + 20].map((v) => Math.round(v)).filter((v) => v !== ans && v > 0)
    out.set(q, mkq(q, String(ans), shuffle(pool).slice(0, 4).map(String), 'Direct formula — SI = PRT/100 · SP = CP(1+p%) · speed = d/t.', 'easy', t))
  }
  return [...out.values()]
}

// ── Reasoning generators ───────────────────────────────────────────────────
const NOUNS = [
  ['audits', 'checks', 'logged items'],
  ['schemes', 'new policies', 'complex rules'],
  ['filings', 'electronic records', 'stored data'],
  ['reports', 'drafts', 'final documents'],
  ['accounts', 'verified users', 'active members'],
  ['brokers', 'intermediaries', 'registered entities'],
  ['circulars', 'guidelines', 'mandatory norms'],
  ['funds', 'listed companies', 'traded securities'],
  ['traders', 'investors', 'market participants'],
  ['forms', 'declarations', 'submissions'],
  ['warnings', 'alerts', 'flagged trades'],
  ['clerks', 'officers', 'managers'],
]
const SYL_T = [
  // [stmts, concl1, concl2, correctOption]
  ['All {0} are {1}. All {1} are {2}.', 'All {0} are {2}', 'Some {2} are {0}', 'Both follow'],
  ['All {0} are {1}. No {1} is {2}.', 'No {0} is {2}', 'Some {0} are {2}', 'Only 1 follows'],
  ['Some {0} are {1}. No {1} is {2}.', 'Some {0} are not {2}', 'Some {0} are {2}', 'Only 1 follows'],
  ['All {0} are {1}. Some {1} are {2}.', 'Some {0} are {2}', 'Some {1} are {0}', 'Only 2 follows'],
  ['No {0} is {1}. All {1} are {2}.', 'No {0} is {2}', 'Some {2} are {1}', 'Only 2 follows'],
  ['Some {0} are {1}. All {1} are {2}.', 'Some {0} are {2}', 'All {0} are {2}', 'Only 1 follows'],
  ['All {0} are {1}. All {0} are {2}.', 'Some {1} are {2}', 'All {1} are {2}', 'Only 1 follows'],
  ['No {0} is {1}. No {1} is {2}.', 'No {0} is {2}', 'Some {0} are {2}', 'Neither follows'],
  ['Some {0} are {1}. Some {1} are {2}.', 'Some {0} are {2}', 'Some {2} are {0}', 'Neither follows'],
  ['All {0} are {1}. No {0} is {2}.', 'No {1} is {2}', 'Some {1} are not {2}', 'Only 2 follows'],
]
const genSyllogism = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [s, c1, c2, ans] = pick(SYL_T)
    const nouns = pick(NOUNS)
    const fill = (str) => str.replace('{0}', nouns[0]).replace('{1}', nouns[1]).replace('{2}', nouns[2])
    const q = `Statements: ${fill(s)} Conclusions: (1) ${fill(c1)} (2) ${fill(c2)}`
    out.set(q, mkq(q, ans, ['Only 1 follows', 'Only 2 follows', 'Both follow', 'Neither follows', 'Either 1 or 2'].filter((x) => x !== ans).slice(0, 4), 'MUST/MAYBE test — a conclusion is true only if it holds in EVERY legal diagram. All+All→All · Some+No→Some-not · Some+Some→maybe.', 'med', t))
  }
  return [...out.values()]
}

const BR_T = [
  ['"A is B\'s brother. B is C\'s mother." How is A related to C?', ['Maternal uncle', 'Father', 'Brother', 'Cousin', 'Nephew'], 'A=B\'s brother → A male, same generation as mother C → maternal uncle.'],
  ['"P is Q\'s sister. Q is R\'s father." How is P related to R?', ['Aunt', 'Mother', 'Sister', 'Grandmother', 'Niece'], 'P = sister of R\'s father → aunt.'],
  ['"She is the daughter of my grandfather\'s only son." Who is she?', ['My sister', 'My cousin', 'My aunt', 'My mother', 'My niece'], 'Grandfather\'s only son = my father → his daughter = my sister.'],
  ['"X\'s mother is the only daughter of Y\'s mother." How is Y related to X?', ['Mother', 'Aunt', 'Sister', 'Grandmother', 'Cousin'], 'X\'s mother = only daughter of Y\'s mother → X\'s mother IS Y (or Y is her sibling\'s… read: Y = X\'s mother).'],
  ['"M is the son of P\'s only daughter." How is M related to P?', ['Grandson', 'Son', 'Nephew', 'Brother', 'Uncle'], 'P\'s daughter\'s son = grandson.'],
  ['"D is E\'s father. E is F\'s brother." How is D related to F?', ['Father', 'Uncle', 'Grandfather', 'Brother', 'Cousin'], 'E and F are siblings; D is E\'s father → D is F\'s father.'],
  ['"G is the mother of H\'s father." How is G related to H?', ['Grandmother', 'Mother', 'Aunt', 'Sister', 'Niece'], 'H\'s father\'s mother = paternal grandmother.'],
  ['"J is K\'s daughter. K is L\'s wife." How is L related to J?', ['Father', 'Uncle', 'Brother', 'Grandfather', 'Cousin'], 'K\'s wife = L is J\'s other parent → father.'],
  ['"He is the son of my mother\'s only brother." Who is he?', ['My cousin', 'My brother', 'My uncle', 'My nephew', 'My father'], 'Mother\'s brother = maternal uncle → his son = cousin.'],
  ['"R is the brother of S\'s mother." How is R related to S?', ['Maternal uncle', 'Father', 'Grandfather', 'Cousin', 'Nephew'], 'Mother\'s brother = maternal uncle.'],
]
const NAMES = [['A', 'B', 'C'], ['X', 'Y', 'Z'], ['P', 'Q', 'R'], ['M', 'N', 'O'], ['R', 'S', 'T'], ['D', 'E', 'F'], ['G', 'H', 'J'], ['K', 'L', 'M'], ['U', 'V', 'W']]
const genBlood = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [tmpl, opts, x] = pick(BR_T)
    const ns = pick(NAMES)
    const q = tmpl.replace(/\bA\b/g, ns[0]).replace(/\bB\b/g, ns[1]).replace(/\bC\b/g, ns[2]).replace(/\bP\b/g, ns[0]).replace(/\bQ\b/g, ns[1]).replace(/\bR\b/g, ns[2]).replace(/\bX\b/g, ns[0]).replace(/\bY\b/g, ns[1]).replace(/\bM\b/g, ns[0]).replace(/\bD\b/g, ns[0]).replace(/\bE\b/g, ns[1]).replace(/\bF\b/g, ns[2]).replace(/\bG\b/g, ns[0]).replace(/\bH\b/g, ns[1]).replace(/\bJ\b/g, ns[0]).replace(/\bK\b/g, ns[1]).replace(/\bL\b/g, ns[2])
    const ans = opts[0]
    out.set(q, mkq(q, ans, shuffle(opts.slice(1)).slice(0, 4), x + ' Decode to a tree — generations top→down.', 'easy', t))
  }
  return [...out.values()]
}

const genDirection = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const n1 = rand(3, 7), w1 = rand(2, 5), s1 = rand(3, 7)
    const e1 = rand(2, 5)
    const mode = rand(0, 1)
    let q, ans
    if (mode === 0) {
      const netNS = n1 - s1
      const dir = netNS > 0 ? 'North' : 'South'; const amt = Math.abs(netNS)
      q = `A man walks ${n1} km North, turns left and walks ${w1} km, turns left again and walks ${s1} km. Net North-South displacement?`
      ans = `${amt} km ${dir}`
      const pool = [`${n1 - s1 + 2} km ${dir}`, `${amt + 3} km ${dir}`, `${amt} km South`, `${w1} km West`]
      out.set(q, mkq(q, ans, shuffle(pool.filter((x) => x !== ans)).slice(0, 4), 'Plot each leg → N-S legs cancel each other; "left" = face current direction first, then turn.', 'med', t))
    } else {
      q = `A woman walks ${n1} km North, turns left ${w1} km, turns left ${s1} km South equivalent, turns left ${e1} km. Final position relative to start?`
      const net = e1 - w1
      ans = net === 0 ? 'Back at start' : `${Math.abs(net)} km ${net > 0 ? 'East' : 'West'}`
      const pool = ['Back at start', `${n1} km North`, `${w1 + e1} km East`, `${s1} km South`]
      out.set(q, mkq(q, ans, shuffle(pool.filter((x) => x !== ans)).slice(0, 4), 'Opposite-direction legs cancel; track net displacement per axis.', 'med', t))
    }
  }
  return [...out.values()]
}

const genRanking = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const top = rand(8, 20), bot = rand(8, 20)
    const ans = top + bot - 1
    const q = `In a row, Ram ranks ${top}th from the top and ${bot}th from the bottom. Total people?`
    const pool = [ans - 1, ans + 1, ans - 2, top + bot + 1, top * 2].filter((v) => v !== ans && v > 0)
    out.set(q, mkq(q, String(ans), shuffle(pool).slice(0, 4).map(String), 'Total = top + bottom − 1 (Ram counted twice).', 'easy', t))
  }
  return [...out.values()]
}

const genCoding = (n, t) => {
  const out = new Map()
  let guard = 0
  const words = ['CAT', 'DOG', 'SEBI', 'FUND', 'BOND', 'RISK', 'AUDIT', 'TRADE', 'MARKET', 'SHARE', 'STOCK', 'DEBT', 'EQUITY', 'TRUST', 'RULE', 'CODE', 'BANK', 'LOAN', 'GOLD', 'CASH', 'RATE', 'FINE', 'BROKER', 'INVEST', 'PRICE', 'ORDER']
  while (out.size < n && guard++ < n * 30) {
    const mode = rand(0, 2)
    const w = pick(words)
    let q, ans
    if (mode === 0) {
      const k = rand(1, 4)
      const code = w.split('').map((c) => String.fromCharCode(((c.charCodeAt(0) - 65 + k) % 26) + 65)).join('')
      q = `If ${w} is coded with each letter shifted +${k}, the code is:`
      ans = code
      const wrong = w.split('').map((c) => String.fromCharCode(((c.charCodeAt(0) - 65 + k + 1) % 26) + 65)).join('')
      const wrong2 = w.split('').map((c) => String.fromCharCode(((c.charCodeAt(0) - 65 + k - 1 + 26) % 26) + 65)).join('')
      const pool = [wrong, wrong2, w.split('').reverse().join(''), w]
      out.set(q, mkq(q, ans, shuffle(pool.filter((x) => x !== ans)).slice(0, 4), `Fixed letter-shift: each letter moves +${k} positions.`, 'easy', t))
    } else if (mode === 1) {
      const code = w.split('').map((c) => String.fromCharCode(90 - (c.charCodeAt(0) - 65))).join('')
      q = `${w} is coded as ${code}. The cipher used is:`
      ans = 'Opposite letters (A↔Z reversal)'
      const pool = ['+2 letter shift', 'Position numbers', 'Letter reversal of word', 'Vowel swap']
      out.set(q, mkq(q, ans, shuffle(pool).slice(0, 4), 'A↔Z, B↔Y, C↔X… each letter maps to its alphabet mirror.', 'med', t))
    } else {
      const nums = w.split('').map((c) => c.charCodeAt(0) - 64).join('')
      q = `${w} is coded as ${nums}. What does ${w.slice(0, 3)} code to?`
      ans = w.slice(0, 3).split('').map((c) => c.charCodeAt(0) - 64).join('')
      const pool = [nums.slice(0, 2), String(w.charCodeAt(0) - 64), nums.slice(1), nums]
      out.set(q, mkq(q, ans, shuffle(pool.filter((x) => x !== ans)).slice(0, 4), 'Digit substitution — each letter = its alphabet position (A=1, B=2…).', 'med', t))
    }
  }
  return [...out.values()]
}

const genIneq = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const a = pick(['P', 'A', 'X']), b = pick(['Q', 'B', 'Y']), c = pick(['R', 'C', 'Z']), d = pick(['S', 'D', 'W'])
    const mode = rand(0, 1)
    let q, ans
    if (mode === 0) {
      q = `${a} > ${b} > ${c}, ${c} = ${d}. Conclusion: ${a} > ${d}`
      ans = 'True'
      out.set(q, mkq(q, ans, ['False', 'CND', 'Either', 'Cannot be determined'].filter((x) => x !== ans), `Unbroken compatible chain ${a}>${b}>${c}=${d} → ${a}>${d} holds.`, 'easy', t))
    } else {
      q = `${a} > ${b}, ${b} < ${c}. Conclusion: ${a} > ${c}`
      ans = 'CND'
      out.set(q, mkq(q, ans, ['True', 'False', 'Definitely true', 'Always'].filter((x) => x !== ans), 'Opposite signs break the chain — no unbroken path between the compared letters → CND.', 'med', t))
    }
  }
  return [...out.values()]
}

const genAlpha = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const els = shuffle(['A1', 'B2', 'C3', 'D4', 'E5', 'F6', 'G7']).slice(0, 5)
    const idx = rand(0, 4), k = rand(1, 3)
    const mode = rand(0, 1)
    let q, ans
    if (mode === 0) {
      const tgt = Math.min(4, idx + k)
      q = `Series: ${els.join(' ')}. Which element is ${k} to the right of ${els[idx]}?`
      ans = els[tgt]
    } else {
      q = `Series: ${els.join(' ')}. Position of ${els[idx]}?`
      ans = String(idx + 1)
      const pool2 = [String(idx), String(idx + 2), String(idx + 3), String(5 - idx)]
      out.set(q, mkq(q, ans, shuffle(pool2.filter((x) => x !== ans)).slice(0, 4), 'Number every element\'s position — "kth right of X" = posX+k.', 'easy', t))
      continue
    }
    const pool = els.filter((x) => x !== ans)
    out.set(q, mkq(q, ans, shuffle(pool).slice(0, 4), '"kth right of X" = posX + k — number positions first.', 'easy', t))
  }
  return [...out.values()]
}

// generated seating: linear row with anchor clues
const genAttr = (n, t) => {
  const out = new Map()
  const pplSets = [['A', 'B', 'C', 'D', 'E'], ['P', 'Q', 'R', 'S', 'T'], ['M', 'N', 'O', 'K', 'L'], ['X', 'Y', 'Z', 'W', 'V']]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const phs = ['Who is born in', 'Which person was born in', 'Identify the person born in']
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const ppl = pick(pplSets)
    const mode = rand(0, 2)
    if (mode === 0) {
      const i = rand(0, 4), j = (i + 1) % 5
      const q = `${ppl.join(', ')} born in ${months.slice(0, 5).join('/')} respectively. ${ppl[i]} is born in ${months[i]}. ${pick(phs)} ${months[j]}?`
      out.set(q, mkq(q, ppl[j], shuffle(ppl.filter((x) => x !== ppl[j])).slice(0, 4), 'Direct grid lookup — definite cells fill first.', 'easy', t))
    } else if (mode === 1) {
      const a = rand(1, 5), b = a + rand(2, 3)
      const q = `In a grid puzzle, "${b - 1} cells between person at position ${a} and another person" — the other person is at position:`
      const ans = String(a + b - 1 + 1)
      out.set(q + '|' + a + b, mkq(q, String(a + b), [String(a + b - 1), String(a + b + 1), String(a + b - 2), String(a + 2)], '"N cells between" → position gap = N+1.', 'easy', t))
    } else {
      const i = rand(0, 3), k = rand(1, 3)
      const q = `${ppl.join(', ')} sit in positions 1–5. ${ppl[i]} is at position ${i + 1}. "Three spots to the right of ${ppl[i]}" is position:`
      out.set(q, mkq(q, String(i + 1 + k), [String(i + k), String(i + 2 + k), String(i + 3 + k), String(i + 4)].filter((v) => v !== String(i + 1 + k) && +v >= 1 && +v <= 5), 'pos + k — "kth right of X" = posX + k.', 'easy', t))
    }
  }
  return [...out.values()]
}

const genSeating = (n, t) => {
  const out = new Map()
  const ppl = ['P', 'Q', 'R', 'S', 'T', 'U']
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const arr = shuffle([...ppl])
    const a = arr[0], b = arr[arr.length - 1], mid = arr[rand(1, 4)]
    const mode = rand(0, 1)
    let q, ans
    if (mode === 0) {
      q = `${ppl.join(', ')} sit in a row facing north. ${a} sits at the left extreme; ${b} sits at the right extreme. Who sits at the LEFT extreme?`
      ans = a
    } else {
      q = `${ppl.join(', ')} sit in a row facing north. ${a} sits at the left extreme; ${b} sits at the right extreme; ${mid} sits exactly in the middle. Who sits at the RIGHT extreme?`
      ans = b
    }
    const pool = ppl.filter((x) => x !== ans)
    out.set(q, mkq(q, ans, shuffle(pool).slice(0, 4), 'Place ABSOLUTE anchors first ("at the extreme") → chain relative clues onto anchors.', 'easy', t))
  }
  return [...out.values()]
}

const genStack = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const fl = rand(4, 8)
    const a = rand(1, fl - 3), b = a + 3
    const q = `${fl} floors numbered 1–${fl}. "Three floors between box ${pick(['A', 'X', 'M'])} on floor ${a} and box ${pick(['B', 'Y', 'N'])}." The second box sits on floor:`
    const ans = String(b)
    const pool = [String(b - 1), String(b + 1), String(a + 2), String(a + 4)].filter((x) => x !== ans && +x >= 1 && +x <= fl)
    out.set(q, mkq(q, ans, shuffle(pool).slice(0, 4), '"N floors between X and Y" = |posX − posY| = N+1 — count the empty slots between.', 'easy', t))
  }
  return [...out.values()]
}

// ── Reasoning curated banks ────────────────────────────────────────────────
const bankStmt = (t) => [
  B('"Employees should attend the workshop to improve skills." Implicit assumption?', ['All employees lack skills', 'Skills can be improved through workshops', 'The workshop is free', 'Everyone wants promotion', 'Attendance is mandatory'], 1, 'Necessity test — the statement collapses unless skills are workshop-improvable → implicit.', 'med', t),
  B('"Buy product X — the best in its class." Implicit assumption?', ['Product X is cheap', 'Consumers can compare product classes', 'X has no rivals', 'Ads never lie', 'Everyone needs X'], 1, 'The "best in class" pitch presumes buyers can evaluate/compare classes.', 'med', t),
  B('"Take vitamin C daily to avoid colds." Implicit assumption?', ['Colds are fatal', 'Vitamin C affects cold risk', 'Doctors recommend it', 'It is cheap', 'Nobody takes it'], 1, 'The advice presumes a causal link between vitamin C and cold prevention.', 'med', t),
  B('"The company shifted to remote work to cut costs." Implicit assumption?', ['Remote work is unpopular', 'Remote work reduces costs', 'All staff have laptops', 'Offices are closed', 'Costs were high always'], 1, 'The stated reason presumes remote work actually lowers cost.', 'med', t),
  B('"Join our bank — the safest place for your savings." Implicit assumption?', ['All banks are unsafe', 'Safety matters to depositors', 'We pay the most interest', 'We are the oldest bank', 'Nobody saves'], 1, 'The pitch presumes depositors value safety.', 'med', t),
  B('"Read the fine print before signing." Implicit assumption?', ['Contracts are long', 'Important terms may hide in fine print', 'Lawyers are expensive', 'Print is small', 'Everyone signs blindly'], 1, 'The advice presumes risk lives in unread terms.', 'med', t),
  B('"Install the app to track your portfolio daily." Implicit assumption?', ['All investors own phones', 'Daily tracking is useful/valued', 'Apps are free', 'Portfolios are large', 'Tracking is mandatory'], 1, 'The recommendation presumes the benefit of daily tracking.', 'med', t),
  B('Statement-assumption questions punish assumptions that are:', ['necessary', 'extraneous/too strong', 'short', 'verifiable', 'obvious'], 1, 'Only NECESSARY assumptions are implicit — "all/must/never" claims usually overshoot.', 'med', t),
  B('"The regulator warned investors about risky products." Implicit assumption?', ['All products are risky', 'Some products carry risk investors may miss', 'Investors read warnings', 'The regulator audits daily', 'Warnings are rare'], 1, 'The warning presumes under-recognized risk exists.', 'med', t),
]

const genDS = (n, t) => {
  const out = new Map()
  let guard = 0
  const vars = ['x', 'y', 'n', 'p', 'm']
  const DS_OPTS = ['I alone sufficient', 'II alone sufficient', 'Both together needed', 'Each alone sufficient', 'Neither sufficient']
  while (out.size < n && guard++ < n * 30) {
    const v = pick(vars)
    const mode = rand(0, 4)
    let q, ans, x
    if (mode === 0) {
      const a = rand(2, 9), b = rand(2, 9)
      q = `What is ${v}? I. ${v}+${a} = ${a + b}  II. ${v}² = ${b * b}`
      ans = 'I alone sufficient'
      x = `I alone → ${v}=${b} ✓ · II alone → ${v}=±${b} → ambiguous → insufficient alone.`
    } else if (mode === 1) {
      const a = rand(3, 9)
      q = `Is ${v} even? I. ${v} is divisible by ${a * 2}  II. ${v}/2 is a whole number`
      ans = 'Each alone sufficient'
      x = 'Either statement alone forces even → each alone sufficient.'
    } else if (mode === 2) {
      const a = rand(2, 9), b = rand(2, 9)
      q = `What is ${v}+w? I. ${v}=${a}  II. w=${b}`
      ans = 'Both together needed'
      x = 'Each statement gives only one variable — combine both.'
    } else if (mode === 3) {
      const b = rand(4, 9)
      q = `Is ${v} > 0? I. ${v}² = ${b * b}  II. ${v} > 0`
      ans = 'II alone sufficient'
      x = `II states it directly. I gives ${v}=±${b} → ambiguous alone.`
    } else {
      const a = rand(3, 9)
      q = `Is ${v} odd? I. ${v} is divisible by 2  II. ${v} = 2k+1`
      ans = 'Each alone sufficient'
      x = 'I alone → even → answers "no" (sufficient) · II alone → odd (sufficient).'
    }
    out.set(q, mkq(q, ans, DS_OPTS.filter((o) => o !== ans), x, 'med', t))
  }
  return [...out.values()]
}

const bankDS = (t) => [
  B('Is x > 5? I. x² = 36  II. x > 0', ['I alone sufficient', 'II alone sufficient', 'Both together needed', 'Each alone sufficient', 'Neither sufficient'], 2, 'I alone → x=±6 (sign unknown). II alone → any positive. Together → x=6 → sufficient together.', 'med', t),
  B('What is the value of p+q? I. p=4  II. q=7', ['I alone', 'II alone', 'Both needed', 'Each alone', 'Neither'], 2, 'Each gives one variable — need both to compute p+q.', 'easy', t),
  B('Is n even? I. n is divisible by 4  II. n/2 is an integer', ['I alone sufficient', 'II alone sufficient', 'Both needed', 'Neither', 'Each alone sufficient'], 4, 'Either statement alone forces even → each alone sufficient.', 'med', t),
  B('Data sufficiency asks you to find:', ['the answer to the question', 'whether statements suffice to solve', 'the fastest method', 'the units', 'the graph'], 1, 'You test sufficiency — stop at "solvable", never solve fully.', 'easy', t),
  B('Is triangle ABC equilateral? I. All sides equal  II. All angles equal', ['I alone', 'II alone', 'Both needed', 'Each alone sufficient', 'Neither'], 4, 'Either property alone forces equilateral → each alone sufficient.', 'med', t),
  B('What is x? I. x+y=10  II. x−y=2', ['I alone', 'II alone', 'Both together', 'Each alone', 'Neither'], 2, 'Two equations, two unknowns — need both.', 'easy', t),
  B('Is n prime? I. n is odd  II. n > 20', ['I alone', 'II alone', 'Both together', 'Each alone', 'Neither sufficient'], 4, 'Odd + >20 still includes 21,25,27… — not sufficient even together.', 'med', t),
  B('What is the profit %? I. CP = ₹500  II. SP = ₹600', ['I alone', 'II alone', 'Both together', 'Each alone', 'Neither'], 2, 'Profit% needs both CP and SP.', 'easy', t),
  B('The DS trap is:', ['solving instead of testing sufficiency', 'reading too fast', 'using formulas', 'checking options', 'writing steps'], 0, 'You never need the final answer — only whether it CAN be found.', 'easy', t),
]

const bankAttr = (t) => [
  B('"7 people each born in a different month…" — the standard attack:', ['guess assignments', 'grid: rows=people, cols=attributes → fill definite cells first', 'start with the maybe cells', 'random order', 'last clue first'], 1, 'Grid + definite cells → maybe cells marked differently → eliminate when forced.', 'easy', t),
  B('In an attribute-grid puzzle, MAYBE cells should be written:', ['as facts', 'marked differently from confirmed cells', 'ignored', 'erased', 'circled as final'], 1, 'Writing maybes as facts = the classic self-sabotage.', 'easy', t),
  B('"Two people between X and Y" means the position gap is:', ['2', '3', '4', '1', '5'], 1, 'Gap of 3 positions — count the empty slots BETWEEN them.', 'easy', t),
  B('A puzzle clue you should place FIRST:', ['floating relative clue', 'absolute anchor ("C at extreme")', 'negative clue', 'color clue', 'a maybe clue'], 1, 'Anchors first — relative clues chain onto fixed points.', 'easy', t),
  B('"X is immediately left of Y" in a row puzzle means:', ['one gap between them', 'adjacent, X then Y', 'adjacent, Y then X', 'X at extreme', 'Y at extreme'], 1, '"Immediately left of" = directly adjacent, X before Y.', 'easy', t),
  B('"X sits somewhere to the left of Y" means:', ['adjacent', 'any position left of Y — not necessarily adjacent', 'X at extreme left', 'X before the middle', 'Y before X'], 1, '"Somewhere to the left" = positional, not adjacent.', 'easy', t),
  B('"X is third to the right of Y" — position gap:', ['2', '3', '4', '1', 'depends'], 1, 'posX = posY + 3.', 'easy', t),
  B('When a grid puzzle stalls, the correct move is:', ['guess harder', 're-scan unfilled columns for forced eliminations', 'restart', 'pick the first maybe', 'skip'], 1, 'Forced elimination: when only one cell remains possible for an attribute, it lands.', 'med', t),
  B('"X is between A and B" in a row means:', ['X adjacent to both', 'position strictly between — not necessarily adjacent', 'X in the exact middle', 'X at an end', 'X equidistant'], 1, '"Between" = positional window, not adjacency.', 'med', t),
  B('A negative clue ("A does NOT sit in March") should be recorded as:', ['a fact cell', 'an elimination mark in that cell', 'ignored', 'a maybe', 'a new row'], 1, 'Negatives eliminate cells — mark the X.', 'easy', t),
]

// ── English generators + banks ─────────────────────────────────────────────
const ERR_T = [
  ['The list of items are lying on the desk', 'are → is', 'subject is "list" (singular) — the plural noun is the planted distractor'],
  ['Each of the boys have submitted the form', 'have → has', '"each of" + plural noun still takes a singular verb'],
  ['He is working here since 2020', 'is working → has been working', 'since + point in time + duration-continuing → present perfect continuous'],
  ['One of my friend is a banker', 'friend → friends', '"one of" + plural noun — the many, of which one'],
  ['Neither of the options were correct', 'were → was', 'neither/either of → singular verb'],
  ['The committee have submitted its report', 'have → has', 'collective noun acting as a unit → singular'],
  ['I have seen him yesterday', 'have seen → saw', 'definite past time marker (yesterday) forbids present perfect'],
  ['She did not went to office', 'went → go', 'did not + base form — past already carried by "did"'],
  ['The number of applicants are increasing', 'are → is', '"the number of" → singular verb'],
  ['A number of complaints was received', 'was → were', '"a number of" → plural verb'],
  ['He is more smarter than his brother', 'more smarter → smarter', 'double comparative — never "more + -er"'],
  ['She is senior than me', 'than → to', 'senior/junior/superior/prefer → "to", not "than"'],
  ['I prefer coffee than tea', 'than → to', 'prefer → to'],
  ['He is one of the best employee', 'employee → employees', '"one of the" + plural noun'],
  ['The scissor is on the table', 'is → are', 'scissors/trousers/goggles → plural'],
  ['Neither he nor his friends was present', 'was → were', 'neither/nor → verb agrees with the NEARER subject'],
  ['Every student and every teacher were present', 'were → was', 'each/every + each/every → singular'],
  ['Bread and butter are my favourite breakfast', 'are → is', 'paired single items → singular'],
  ['He has been living here since five years', 'since → for', 'duration → "for"; point in time → "since"'],
  ['The furnitures are new', 'furnitures → furniture', 'furniture/information/equipment → uncountable, singular'],
  ['He told to me a story', 'told to me → told me', 'tell + object directly — no "to"'],
  ['I and Ram went to school', 'I and Ram → Ram and I', 'politeness order — others first'],
  ['Much people attended the rally', 'Much → Many', 'much=uncountable · many=countable'],
  ['He is working hardly these days', 'hardly → hard', 'hardly = "barely" — wrong word entirely'],
]
const genError = (n, t) => {
  const out = new Map()
  let guard = 0
  const phs = ['Correct the error', 'Spot the error', 'Identify the fix', 'Which correction makes this grammatical']
  while (out.size < n && guard++ < n * 30) {
    const [sent, fix, why] = pick(ERR_T)
    const wrong = pick(ERR_T.filter((x) => x[0] !== sent))[1]
    const wrong2 = pick(ERR_T.filter((x) => x[1] !== fix && x[1] !== wrong))[1]
    const q = `${pick(phs)}: "${sent}"`
    out.set(q, mkq(q, fix, [wrong, wrong2, 'no error', 'no change needed'], why, 'med', t))
  }
  return [...out.values()]
}

const VOCAB = [
  ['stringent', 'strict', 'lenient', 'vague', 'optional', 'flexible'],
  ['scrutiny', 'examination', 'neglect', 'summary', 'approval', 'delay'],
  ['volatile', 'unstable', 'steady', 'fixed', 'calm', 'dull'],
  ['compliance', 'adherence', 'violation', 'delay', 'refusal', 'dispute'],
  ['fiduciary', 'trust-based', 'fraudulent', 'minor', 'unrelated', 'illegal'],
  ['liquidation', 'winding up', 'creation', 'growth', 'funding', 'expansion'],
  ['diligence', 'care', 'haste', 'neglect', 'delay', 'risk'],
  ['surveillance', 'monitoring', 'ignoring', 'trading', 'settling', 'listing'],
  ['disclosure', 'revealing', 'hiding', 'trading', 'auditing', 'pricing'],
  ['deterrent', 'discourager', 'encourager', 'promoter', 'facilitator', 'enabler'],
  ['fraudulent', 'deceitful', 'honest', 'legal', 'clean', 'verified'],
  ['arbitration', 'dispute resolution', 'pricing', 'listing', 'trading', 'auditing'],
  ['mandate', 'instruction', 'suggestion', 'request', 'ban', 'report'],
  ['intermediary', 'middleman', 'regulator', 'investor', 'auditor', 'issuer'],
  ['penalty', 'fine', 'reward', 'bonus', 'license', 'contract'],
  ['redemption', 'buyback', 'issue', 'listing', 'merger', 'split'],
  ['underwriting', 'guaranteeing issue', 'auditing', 'trading', 'settling', 'rating'],
  ['collateral', 'security pledged', 'profit', 'dividend', 'fee', 'tax'],
  ['leverage', 'borrowed funds use', 'cash balance', 'insurance', 'audit', 'listing'],
  ['accrual', 'accumulation', 'reduction', 'payment', 'audit', 'listing'],
  ['amendment', 'modification', 'creation', 'deletion', 'approval', 'appeal'],
  ['remedial', 'corrective', 'damaging', 'neutral', 'punitive', 'initial'],
  ['provisional', 'temporary', 'permanent', 'final', 'binding', 'mandatory'],
  ['exhaustive', 'complete', 'partial', 'brief', 'vague', 'optional'],
  ['proponent', 'supporter', 'opponent', 'critic', 'auditor', 'rival'],
]
const genVocab = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [w, syn, d1, d2, d3, d4] = pick(VOCAB)
    const mode = rand(0, 3)
    const q = [
      `Synonym of "${w}":`,
      `Antonym of "${w}":`,
      `Choose the word closest in meaning to "${w}":`,
      `Choose the word most OPPOSITE in meaning to "${w}":`,
    ][mode]
    const ans = mode % 2 === 0 ? syn : d1
    const distr = mode % 2 === 0 ? [d1, d2, d3, d4] : [syn, d2, d3, d4]
    out.set(q, mkq(q, ans, distr, `${w} ↔ ${syn} — financial/regulatory vocabulary.`, 'easy', t))
  }
  return [...out.values()]
}

const FILL_T = [
  ['The auditors ______ the accounts thoroughly', 'examined', ['examine', 'are examining', 'has examined', 'examines'], 'Completed act → past tense.'],
  ['SEBI ______ several reforms this year', 'introduced', ['introduces', 'is introducing', 'introduce', 'will introduces'], 'Completed act → past tense.'],
  ['Trading ______ suspended during the halt', 'was', ['were', 'is', 'be', 'being'], 'Trading = singular subject.'],
  ['All brokers ______ register with SEBI', 'must', ['should must', 'might must', 'can must', 'will must'], 'Modal verb — one only.'],
  ['The circular takes effect ______ Monday', 'from', ['since', 'at', 'on Monday onwards', 'during'], '"Takes effect from" — fixed collocation.'],
  ['Complaints must be filed ______ 30 days', 'within', ['during', 'inside', 'in between', 'at'], '"Within" = inside a time window.'],
  ['The penalty was ______ on the violator', 'imposed', ['imposing', 'impose', 'imposes', 'impost'], 'Passive — was + V3.'],
  ['Shares ______ traded on both exchanges', 'are', ['is', 'was', 'be', 'being'], 'Shares = plural.'],
  ['The case ______ under investigation', 'is', ['are', 'were', 'be', 'have'], 'The case = singular.'],
  ['An appeal lies ______ the tribunal', 'to', ['at', 'for', 'on', 'in'], '"Appeal lies to" the tribunal.'],
  ['The fund ______ diversified across sectors', 'is', ['are', 'were', 'have', 'be'], 'The fund = singular.'],
  ['Regulations ______ amended twice last year', 'were', ['was', 'is', 'has', 'be'], 'Regulations = plural.'],
  ['The exchange ______ closed on holidays', 'remains', ['remain', 'are remaining', 'were remain', 'is remaining'], 'Habitual present — remains.'],
  ['Investor protection ______ a core mandate', 'is', ['are', 'were', 'be', 'have'], 'Singular subject.'],
  ['The board ______ its decision next week', 'announces', ['announce', 'is announce', 'will announcing', 'announced soon'], 'Scheduled future → present or will announce.'],
  ['Penalties ______ doubled under the new rules', 'have', ['has been doubled wrongly', 'were double', 'is doubled', 'be doubled'], '"Have doubled" — present perfect, plural.'],
  ['The tribunal ______ appeals within 90 days', 'hears', ['hear', 'is hear', 'hearing', 'heard always'], 'Singular + habitual → hears.'],
  ['Compliance ______ mandatory for all intermediaries', 'is', ['are', 'were', 'be', 'have'], 'Singular subject.'],
  ['The norms apply ______ all listed companies', 'to', ['for', 'on', 'at', 'in'], '"Apply to" — fixed collocation.'],
  ['Investors were warned ______ the risks', 'about', ['for', 'on', 'at', 'of about'], '"Warned about" — fixed collocation.'],
  ['The committee ______ its report yesterday', 'submitted', ['submits', 'has submitted', 'is submitting', 'will submit'], '"Yesterday" → simple past.'],
  ['The regulator ______ a circular on disclosure norms', 'issued', ['issues', 'was issuing', 'has been issuing', 'issue'], 'Single completed act → simple past.'],
  ['SEBI was established ______ 1988', 'in', ['on', 'at', 'since', 'for'], 'Year → "in".'],
  ['Investors rely ______ accurate disclosures', 'on', ['in', 'at', 'for', 'with'], '"Rely on" — fixed collocation.'],
  ['The company complied ______ the regulations', 'with', ['to', 'for', 'at', 'on'], '"Complied with" — fixed collocation.'],
  ['She is good ______ data analysis', 'at', ['in', 'for', 'on', 'with'], '"Good at" — fixed collocation.'],
  ['The deal fell ______ at the last minute', 'through', ['down', 'apart', 'off', 'out'], '"Fell through" = collapsed.'],
  ['He has been working here ______ 2019', 'since', ['for', 'from', 'at', 'in'], '"Since" + point in time; "for" + duration.'],
  ['The market reacted sharply ______ the news', 'to', ['for', 'at', 'on', 'with'], '"Reacted to" — fixed collocation.'],
  ['The shares were listed ______ the exchange', 'on', ['in', 'at', 'to', 'with'], '"Listed on" the exchange.'],
  ['The fund invests primarily ______ equities', 'in', ['on', 'at', 'for', 'with'], '"Invests in" — fixed collocation.'],
  ['The firm was accused ______ insider trading', 'of', ['for', 'with', 'in', 'about'], '"Accused of" — fixed collocation.'],
  ['The regulator is empowered ______ impose penalties', 'to', ['for', 'at', 'on', 'with'], '"Empowered to" — infinitive.'],
  ['Demand for the IPO shares ______ expectations', 'exceeded', ['exceeds', 'is exceeding', 'has exceeded beyond', 'exceed'], 'Past event → simple past.'],
  ['Neither the broker nor the clients ______ informed', 'were', ['was', 'is', 'has been', 'be'], 'Neither/nor → verb agrees with nearer subject.'],
  ['The penalty ______ imposed last quarter', 'was', ['is', 'were', 'has', 'had being'], 'Passive past — was + V3.'],
  ['Each investor ______ a unique folio number', 'has', ['have', 'having', 'are having', 'hold'], 'Each → singular verb.'],
  ['The data ______ reviewed before filing', 'was', ['were', 'are', 'have', 'being'], 'Data as mass noun → singular (formal usage).'],
  ['A number of complaints ______ received', 'were', ['was', 'is', 'has', 'be'], '"A number of" → plural verb.'],
  ['The number of complaints ______ rising', 'is', ['are', 'were', 'have', 'be'], '"The number of" → singular verb.'],
]
const genFillers = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [stem, ans, distr, x] = pick(FILL_T)
    const q = pick(['Fill the blank', 'Choose the correct option', 'Complete the sentence']) + `: "${stem}."`
    out.set(q, mkq(q, ans, distr, x, 'easy', t))
  }
  return [...out.values()]
}

const bankFillers = (t) => [
  B('The regulator ______ a circular tightening disclosure norms for FPIs.', ['issued', 'was issuing', 'has been issuing', 'issue', 'issues weekly'], 0, 'Single completed act → simple past.', 'easy', t),
  B('The committee ______ its report yesterday.', ['submits', 'submitted', 'has submitted', 'is submitting', 'will submit'], 1, '"Yesterday" forces past tense before vocab matters.', 'easy', t),
  B('SEBI was established ______ 1988.', ['in', 'on', 'at', 'since', 'for'], 0, 'Year → "in". Point in time + "since" would need continuing context.', 'easy', t),
  B('The market reacted sharply ______ the announcement.', ['to', 'for', 'at', 'on', 'with'], 0, '"Reacted to" — fixed collocation.', 'easy', t),
  B('Investors rely ______ accurate disclosures.', ['on', 'in', 'at', 'for', 'with'], 0, '"Rely on" — fixed collocation.', 'easy', t),
  B('The company complied ______ the new regulations.', ['with', 'to', 'for', 'at', 'on'], 0, '"Complied with" — fixed collocation.', 'easy', t),
  B('The deal fell ______ at the last minute.', ['through', 'down', 'apart', 'off', 'out'], 0, '"Fell through" = collapsed — phrasal verb.', 'med', t),
  B('She is good ______ data analysis.', ['at', 'in', 'for', 'on', 'with'], 0, '"Good at" — fixed collocation.', 'easy', t),
]

const bankVocab = (t) => [
  B('Synonym of "stringent":', ['strict', 'loose', 'flexible', 'mild', 'optional'], 0, 'Stringent = tight/strict — regulator adjective.', 'easy', t),
  B('Synonym of "transparency":', ['openness', 'secrecy', 'complexity', 'opacity', 'delay'], 0, 'Transparency = openness/clarity of disclosure.', 'easy', t),
  B('Antonym of "surge":', ['decline', 'rise', 'jump', 'spike', 'climb'], 0, 'Surge↔decline — market vocab pair.', 'easy', t),
  B('Synonym of "scrutiny":', ['examination', 'neglect', 'approval', 'summary', 'ignorance'], 0, 'Scrutiny = close examination — compliance vocab.', 'easy', t),
  B('Synonym of "volatile":', ['unstable', 'steady', 'fixed', 'calm', 'predictable'], 0, 'Volatile = unstable/changeable — market vocab.', 'easy', t),
  B('Antonym of "compliance":', ['violation', 'obedience', 'agreement', 'adherence', 'conformity'], 0, 'Compliance↔violation — core regulator pair.', 'easy', t),
  B('Synonym of "liquidation":', ['winding up', 'creation', 'expansion', 'funding', 'growth'], 0, 'Liquidation = winding up / asset sell-off.', 'med', t),
  B('Synonym of "fiduciary":', ['trustee-like', 'fraudulent', 'temporary', 'minor', 'unrelated'], 0, 'Fiduciary = involving trust — e.g., fiduciary duty of directors.', 'med', t),
]

const bankPara = (t) => [
  B('Arrange into a coherent paragraph: (a) It was set up in 1988. (b) SEBI is India\'s market regulator. (c) Its mandate is investor protection. (d) The Act of 1992 made it statutory.', ['b-d-a-c', 'a-b-c-d', 'b-c-d-a', 'd-b-a-c', 'b-a-d-c'], 4, 'Opener = defines topic (b). "It" in (a) needs SEBI named earlier → (a) can\'t open.', 'med', t),
  B('Para jumble first move:', ['read middle sentence', 'find the opener — defines topic, no orphan pronouns', 'find the conclusion', 'count sentences', 'pick the longest'], 1, 'The opener stands alone; pronouns ("it", "this") must follow their noun.', 'easy', t),
  B('A sentence starting "This approach, however," is likely:', ['an opener', 'a contrast continuation', 'a conclusion', 'irrelevant', 'a definition'], 1, '"However" + demonstrative = mid-paragraph pivot — never opens.', 'easy', t),
  B('A sentence beginning "For example, in 2019" should follow:', ['a general claim it illustrates', 'the conclusion', 'a question', 'a definition of terms', 'nothing — it opens'], 0, '"For example" attaches to the claim it exemplifies.', 'easy', t),
  B('Two sentences sharing "investors" — the one defining the term should come:', ['first', 'second', 'anywhere', 'last', 'deleted'], 0, 'Define before you reference — pronouns point backward.', 'easy', t),
  B('"Moreover" / "In addition" signals:', ['a supporting continuation', 'an opener', 'a contradiction', 'a conclusion', 'a question'], 0, 'Additive connectors link to the previous sentence\'s point.', 'easy', t),
  B('"In conclusion" / "Thus" marks:', ['the paragraph closer', 'the opener', 'a definition', 'an example', 'a pivot'], 0, 'Conclusion-signal words = closers.', 'easy', t),
  B('If sentence (a) says "These measures reduced fraud" — it most likely follows:', ['a sentence listing the measures', 'the opener', 'a question', 'a date', 'a definition'], 0, '"These measures" needs its noun earlier in the paragraph.', 'med', t),
  B('Which CAN open a paragraph?', ['"It also reduced costs."', '"SEBI regulates India\'s securities markets."', '"This, however, failed."', '"Moreover, traders agreed."', '"Such steps helped."'], 1, 'An opener stands alone — no orphan pronouns/demonstratives.', 'med', t),
  B('Arrange: (a) Investors gained confidence. (b) SEBI tightened disclosure norms. (c) Fraud cases fell. (d) Enforcement became stricter.', ['b-d-c-a', 'a-b-c-d', 'b-a-d-c', 'd-b-a-c', 'c-a-b-d'], 0, 'Action (b) → stricter enforcement (d) → fraud fell (c) → confidence rose (a).', 'med', t),
  B('A sentence with "Initially, the plan faced resistance" typically comes:', ['early — sets up a contrast arc', 'last', 'never used', 'as an example', 'as a conclusion'], 0, '"Initially" marks the start of a before/after sequence.', 'med', t),
  B('"As a result, volumes doubled" must follow:', ['a cause sentence', 'an opener', 'a definition', 'a question', 'the closer alone'], 0, '"As a result" needs its cause earlier.', 'easy', t),
  B('Jumble-solving second step (after finding the opener):', ['find the conclusion', 'chain pronouns to their nouns', 'count words', 'alphabetize', 'guess'], 1, 'Pronouns point backward — link each to its noun.', 'easy', t),
]

const bankCloze = (t) => [
  B('"He is working here since 2020" — the correct verb form:', ['is working', 'has been working', 'was working', 'had worked', 'works'], 1, 'since + point in time + still continuing → present perfect continuous.', 'med', t),
  B('"The report needs ______ before Friday."', ['finalise', 'finalising', 'to be finalised', 'finalised being', 'being final'], 2, 'Passive infinitive — the report receives the action.', 'med', t),
  B('"Neither the broker nor the clients ______ informed."', ['was', 'were', 'is', 'has been', 'be'], 1, 'Neither/nor → verb agrees with the NEARER subject (clients).', 'hard', t),
  B('"One of the reasons ______ clear."', ['are', 'is', 'were', 'be', 'being'], 1, 'Subject = "one" — singular verb.', 'easy', t),
  B('"The data ______ accurate before submission."', ['ensure', 'ensures', 'must be ensured is', 'ensuring', 'must ensure being'], 1, '"Data ensures" — plural subject, base verb.', 'med', t),
  B('"Improve: The meeting was held on last Monday."', ['held on Monday', 'held last Monday', 'held at last Monday', 'held in last Monday', 'no improvement'], 1, '"Last Monday" takes no preposition.', 'med', t),
  B('"Improve: He did not went to office."', ['did not go', 'did not goes', 'does not went', 'did not gone', 'no improvement'], 0, '"Did not" carries the past — verb returns to base form.', 'med', t),
  B('"Improve: I have seen him yesterday."', ['saw him yesterday', 'have seen him before yesterday', 'had saw him yesterday', 'see him yesterday', 'no improvement'], 0, '"Yesterday" blocks present perfect → simple past.', 'med', t),
  B('"Each of the options ______ checked."', ['were', 'was', 'are', 'be', 'have'], 1, '"Each of" → singular verb.', 'easy', t),
  B('"The committee ______ its findings."', ['have submitted', 'has submitted', 'is submitting their', 'were submitting', 'submit'], 1, 'Committee acting as a unit → singular.', 'med', t),
  B('"Neither the manager nor the employees ______ satisfied."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Neither/nor → nearer subject (employees) → plural.', 'hard', t),
  B('"Improve: He is more smarter than others."', ['smarter', 'most smarter', 'more smart', 'smartest than', 'no improvement'], 0, 'Double comparative — never "more + -er".', 'med', t),
  B('"Improve: She is senior than me."', ['senior to me', 'senior then me', 'senior from me', 'most senior than me', 'no improvement'], 0, 'senior/junior/superior → "to", not "than".', 'med', t),
  B('"Much people attended."', ['Many people', 'Much peoples', 'A much people', 'More much', 'no improvement'], 0, 'much=uncountable · many=countable.', 'easy', t),
  B('"The furnitures arrived."', ['The furniture arrived', 'The furnitures was arrived', 'A furniture arrived', 'Furnitures are arriving', 'no improvement'], 0, 'Furniture is uncountable → singular.', 'med', t),
  B('"He told to me a story."', ['He told me a story', 'He told me to a story', 'He told a story to I', 'He told at me', 'no improvement'], 0, 'tell + object — no "to".', 'easy', t),
  B('"He has been living here since five years."', ['for five years', 'from five years', 'since five year', 'during five years', 'no improvement'], 0, 'Duration → "for"; point → "since".', 'easy', t),
]

// ── GA curated banks ───────────────────────────────────────────────────────
const bankSEBI = (t) => [
  B('SEBI was established (non-statutory) in:', ['1985', '1988', '1992', '1995', '2000'], 1, '1988 non-statutory → statutory via SEBI Act 1992.', 'easy', t),
  B('SEBI became a statutory body through:', ['Companies Act 1956', 'SEBI Act 1992', 'RBI Act 1934', 'SCRA 1956', 'FEMA 1999'], 1, 'SEBI Act, 1992 — the powers Act.', 'easy', t),
  B('SEBI headquarters is located at:', ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Ahmedabad'], 1, 'Bandra Kurla Complex, Mumbai.', 'easy', t),
  B('SEBI reports to which ministry?', ['Commerce', 'Finance', 'Corporate Affairs', 'Home', 'Law'], 1, 'Ministry of Finance.', 'easy', t),
  B('SEBI\'s core mandate triad:', ['tax, audit, license', 'protect investors, develop market, regulate it', 'print currency, lend, settle', 'rate, insure, bank', 'trade, export, import'], 1, 'Protect investors · develop the market · regulate it.', 'easy', t),
  B('SEBI\'s investor grievance portal:', ['SAARTHI', 'SCORES', 'CRONOS', 'SAT', 'MCX'], 1, 'SCORES (web + app); Saa₹thi is the education app.', 'easy', t),
  B('SEBI\'s investor-education mobile app:', ['SCORES', 'Saa₹thi', 'DigiLocker', 'UMANG', 'BHIM'], 1, 'Saa₹thi = education app — SCORES = grievances. The exam swaps them.', 'easy', t),
  B('SEBI\'s 2024 cybersecurity framework for regulated entities:', ['CSCRF', 'CERT-In', 'DPDP', 'NIST', 'ISO 27001'], 0, 'Cybersecurity & Cyber Resilience Framework — audits, incident reporting.', 'med', t),
  B('India\'s settlement cycle after the T+1 rollout:', ['T+3', 'T+2', 'T+1 (with T+0 beta pilot)', 'T+0 only', 'T+7'], 2, 'Full T+1 from 2023; T+0 beta pilot since 2024.', 'med', t),
  B('BRSR reporting is mandatory for:', ['all companies', 'top-1000 listed companies', 'only banks', 'only PSUs', 'unlisted firms'], 1, 'Business Responsibility & Sustainability Report — top-1000 listed cos.', 'med', t),
  B('PIT Regulations (2015) cover:', ['takeovers', 'insider trading', 'listing obligations', 'depositories', 'mutual funds'], 1, 'Prohibition of Insider Trading — PIT Regs 2015.', 'easy', t),
  B('SAST 2011 regulates:', ['takeovers/substantial acquisition', 'insider trading', 'IPOs', 'FPI registration', 'credit rating'], 0, 'Substantial Acquisition of Shares & Takeovers — the takeover code.', 'med', t),
  B('LODR regulations govern:', ['takeovers', 'listing obligations & disclosure requirements', 'insider lists', 'mutual fund NAV', 'bonds only'], 1, 'Listing Obligations and Disclosure Requirements — listed-cos\' disclosure duty.', 'med', t),
  B('Depositories in India are:', ['NSDL & CDSL', 'NSE & BSE', 'NSC & KVP', 'NABARD & SIDBI', 'RBI & SEBI'], 0, 'Two depositories — NSDL and CDSL (Depositories Act 1996).', 'easy', t),
  B('The appellate tribunal for SEBI orders:', ['NCLT', 'SAT', 'DRAT', 'CESTAT', 'TDSAT'], 1, 'Securities Appellate Tribunal — appeals against SEBI orders.', 'med', t),
  B('SEBI board includes members from:', ['RBI + MoF + GoI nominees', 'only industry', 'only RBI', 'only courts', 'stock exchanges'], 0, 'Chairman + GoI/RBI nominees + members.', 'med', t),
  B('SEBI\'s regional offices include:', ['New Delhi, Kolkata, Chennai, Ahmedabad', 'only Mumbai', 'all state capitals', 'Delhi only', 'Bengaluru only'], 0, 'Four regional offices besides Mumbai HQ.', 'med', t),
  B('SEBI Grade A exam recruits:', ['officers for regulatory functions', 'traders', 'brokers', 'auditors for listed cos', 'bankers'], 0, 'Officer Grade A — the exam you\'re preparing for.', 'easy', t),
  B('Demat accounts are held with:', ['depository participants of NSDL/CDSL', 'RBI directly', 'SEBI directly', 'banks only', 'brokers only'], 0, 'DPs front-end; depositories hold the records.', 'easy', t),
  B('KYC registration agencies (KRAs) in markets are registered with:', ['SEBI', 'RBI', 'UIDAI', 'MCA', 'CBDT'], 0, 'SEBI-registered KRAs maintain investor KYC.', 'med', t),
]

const RC_PASSAGE2 = 'Algorithmic trading now accounts for a majority of order flow on Indian exchanges. High-frequency firms co-locate servers near exchange matching engines to shave microseconds off execution. SEBI has mandated algo-approval workflows, order-to-trade ratio limits, and kill-switch obligations for brokers. Yet the structural gap persists: retail participants without co-location access face systematically worse fills, raising fairness questions the regulator has yet to fully resolve.'
const rc2Q = (q) => '"' + RC_PASSAGE2 + '" — ' + q

const bankRC = (t) => [
  B(rcQ('What does SEBI use to detect abnormal trading?'), ['manual audits', 'algorithmic monitoring', 'court orders', 'newspaper tips', 'yearly reviews'], 1, 'Stated directly in the passage — answers come from the text, not your opinion.', 'easy', t),
  B(rcQ('The critics\' concern is that automated flags:'), ['are too slow', 'need human judgment before enforcement', 'cost too much', 'miss all schemes', 'are illegal'], 1, 'Inference stays CLOSE to the text — false positives → human review needed.', 'med', t),
  B(rcQ('SEBI\'s response was to:'), ['drop automation', 'add a mandatory human-review stage', 'increase fines', 'hire more brokers', 'delay orders'], 1, 'Stated: pairing detection with mandatory human review.', 'easy', t),
  B(rcQ('The tone of the passage toward surveillance is:'), ['hostile', 'balanced/neutral-positive', 'mocking', 'indifferent', 'celebratory'], 1, 'Both capability AND caveat are presented → balanced.', 'med', t),
  B(rcQ('"Pump-and-dump" refers to:'), ['a pricing model', 'a manipulation scheme', 'a settlement type', 'an audit method', 'a tax rule'], 1, 'Vocab-in-context — manipulation scheme flagged by monitoring.', 'easy', t),
  B(rc2Q('Why do HFT firms co-locate servers near exchanges?'), ['cheaper rent', 'to shave microseconds off execution', 'legal mandate', 'better security', 'backup power'], 1, 'Stated directly — proximity reduces latency.', 'easy', t),
  B(rc2Q('SEBI has mandated which of the following?'), ['algo-approval workflows + order-to-trade limits + kill-switches', 'a trading ban', 'free co-location for all', 'manual-only trading', 'daily audits'], 0, 'All three obligations appear in the passage.', 'med', t),
  B(rc2Q('The "structural gap" refers to:'), ['worse fills for retail without co-location', 'too many brokers', 'slow internet', 'weak audits', 'exchange outages'], 0, 'Implied fairness asymmetry — retail participants face systematically worse fills.', 'med', t),
  B(rc2Q('The passage\'s stance on algo-trading regulation is:'), ['fully resolved', 'partially addressed, questions remain', 'opposed entirely', 'celebratory', 'silent'], 1, 'SEBI acted but "yet to fully resolve" → partial.', 'med', t),
  B(rc2Q('"Kill-switch" most likely means:'), ['an emergency stop mechanism for algos', 'a power backup', 'a trading bonus', 'an audit report', 'a broker fee'], 0, 'Vocab-in-context — an algo kill-switch halts runaway trading.', 'easy', t),
  B(rc3Q('Settlement moved from T+2 to:'), ['T+5', 'T+1 with T+0 pilot', 'T+3', 'instantaneous only', 'weekly'], 1, 'Stated: T+1 standard plus T+0 pilot for select securities.', 'easy', t),
  B(rc3Q('A benefit of shorter settlement cycles is:'), ['more paperwork', 'collateral freed faster + less counterparty risk', 'slower trades', 'higher fees', 'longer queues'], 1, 'Stated directly in the passage.', 'easy', t),
  B(rc3Q('The downside flagged is:'), ['higher taxes', 'compressed reconciliation windows / operational lags punished', 'slower matching engines', 'fewer trades', 'no liquidity'], 1, 'Implied — compressed timelines squeeze back-office work.', 'med', t),
  B(rc3Q('Custodians had to re-engineer batch processes into:'), ['paper records', 'near-continuous pipelines', 'monthly reports', 'manual ledgers', 'slower queues'], 1, 'Stated: batch → near-continuous pipelines.', 'easy', t),
  B(rc3Q('"Compressed" timelines most nearly means:'), ['lengthened', 'shortened/squeezed', 'cancelled', 'paused', 'doubled'], 1, 'Vocab-in-context — compressed = squeezed shorter.', 'easy', t),
]

const RC_PASSAGE3 = 'India\'s push toward a single settlement standard has compressed equity settlement from T+2 to T+1 and piloted same-day T+0 for select securities. Shorter cycles free collateral faster and cut counterparty risk, but compressed timelines squeeze back-office reconciliation windows and punish operational lags. Custodians and clearing corporations have had to re-engineer batch processes into near-continuous pipelines to keep pace.'
const rc3Q = (q) => '"' + RC_PASSAGE3 + '" — ' + q

const RC_PASSAGE = 'SEBI\'s surveillance systems increasingly rely on algorithmic monitoring to detect abnormal trading patterns. Real-time analytics flag insider-trading signatures and pump-and-dump schemes within minutes of occurrence. Critics argue that automated flags still demand human judgment before enforcement, since false positives can destroy reputations. The regulator has responded by pairing its detection stack with a mandatory human-review stage before any order is issued.'
const rcQ = (q) => '"' + RC_PASSAGE + '" — ' + q

const bankReg = (t) => [
  B('Who registers and regulates FPIs in India?', ['RBI', 'SEBI', 'IRDAI', 'PFRDA', 'NABARD'], 1, 'SEBI registers/regulates FPIs; RBI handles the banking/forex side.', 'easy', t),
  B('Banking regulation + monetary policy belongs to:', ['SEBI', 'RBI', 'IRDAI', 'PFRDA', 'Finance Ministry'], 1, 'RBI = banks, rates, currency.', 'easy', t),
  B('Insurance sector regulator:', ['RBI', 'SEBI', 'IRDAI', 'PFRDA', 'CCI'], 2, 'IRDAI — Insurance Regulatory and Development Authority.', 'easy', t),
  B('Pension funds are regulated by:', ['SEBI', 'RBI', 'IRDAI', 'PFRDA', 'EPFO'], 3, 'PFRDA — Pension Fund Regulatory & Development Authority.', 'easy', t),
  B('Competition/anti-trust watchdog:', ['CCI', 'SEBI', 'TRAI', 'FSSAI', 'NCLT'], 0, 'Competition Commission of India — mergers & anti-competitive conduct.', 'easy', t),
  B('Commodity derivatives regulation moved to SEBI from:', ['FMC', 'RBI', 'DGFT', 'NABARD', 'MCA'], 0, 'Forward Markets Commission merged into SEBI in 2015.', 'med', t),
  B('NBFCs are primarily regulated by:', ['SEBI', 'RBI', 'IRDAI', 'SIDBI', 'NHB'], 1, 'RBI regulates NBFCs — the non-bank lending trap question.', 'med', t),
  B('Stock exchanges (NSE/BSE) are regulated by:', ['RBI', 'SEBI', 'MCA', 'Finance Ministry', 'CCI'], 1, 'SEBI regulates exchanges, brokers, intermediaries.', 'easy', t),
  B('Mutual funds in India are regulated by:', ['RBI', 'SEBI', 'IRDAI', 'AMFI only', 'PFRDA'], 1, 'SEBI regulates MFs; AMFI is the industry association, not a regulator.', 'easy', t),
  B('Credit rating agencies are regulated by:', ['SEBI', 'RBI', 'IRDAI', 'MCA', 'NABARD'], 0, 'SEBI (Credit Rating Agencies) Regulations — CRAs like CRISIL/ICRA.', 'med', t),
  B('Payment systems/UPI come under:', ['RBI', 'SEBI', 'NPCI itself', 'MeitY', 'TRAI'], 0, 'RBI under the Payment and Settlement Systems Act 2007.', 'med', t),
  B('Government securities market is managed by:', ['SEBI', 'RBI', 'NSE', 'Finance Ministry', 'NSDL'], 1, 'RBI manages G-secs and public debt.', 'med', t),
  B('Foreign exchange regulation falls under:', ['RBI (FEMA)', 'SEBI', 'DGFT', 'CBDT', 'ED'], 0, 'FEMA 1999 administered by RBI.', 'med', t),
]

const GA_FACTS = [
  ['PM Jan Dhan Yojana', 'Ministry of Finance', '2014', 'bank accounts for all households'],
  ['PM-KISAN', 'Ministry of Agriculture', '2019', '₹6,000/yr direct income to farmers'],
  ['Ayushman Bharat (PM-JAY)', 'Ministry of Health', '2018', '₹5 lakh/yr health cover per family'],
  ['PM MUDRA Yojana', 'Ministry of Finance', '2015', 'micro-enterprise loans'],
  ['Stand-Up India', 'Ministry of Finance', '2016', 'loans to women & SC/ST entrepreneurs'],
  ['Sukanya Samriddhi', 'Ministry of Finance', '2015', 'girl-child savings'],
  ['PM SVANidhi', 'Ministry of Housing & Urban Affairs', '2020', 'street-vendor micro-credit'],
  ['Atal Pension Yojana', 'Ministry of Finance', '2015', 'unorganised-sector pensions'],
  ['Make in India', 'DPIIT / MoCI', '2014', 'domestic manufacturing push'],
  ['Startup India', 'DPIIT', '2016', 'startup ecosystem incentives'],
  ['PM Awas Yojana', 'MoHUA', '2015', 'housing for all'],
  ['Skill India (PMKVY)', 'MSDE', '2015', 'vocational skill training'],
  ['Digital India', 'MeitY', '2015', 'digital infrastructure & services'],
  ['Swachh Bharat', 'MoJS / MoHUA', '2014', 'sanitation & cleanliness'],
  ['PMJJBY', 'Ministry of Finance', '2015', 'life insurance ₹2 lakh cover'],
  ['PMSBY', 'Ministry of Finance', '2015', 'accident insurance ₹2 lakh cover'],
]
const SEBI_FACTS = [
  ['SEBI established (non-statutory)', '1988'],
  ['SEBI Act passed', '1992'],
  ['SEBI headquarters', 'Mumbai (Bandra Kurla Complex)'],
  ['SEBI ministry', 'Ministry of Finance'],
  ['Grievance portal', 'SCORES'],
  ['Investor education app', 'Saa₹thi'],
  ['Cybersecurity framework (2024)', 'CSCRF'],
  ['Settlement cycle', 'T+1 (T+0 beta pilot)'],
  ['BRSR applies to', 'top-1000 listed companies'],
  ['Insider trading rules', 'PIT Regulations 2015'],
  ['Takeover code', 'SAST 2011'],
  ['Listing obligations', 'LODR 2015'],
  ['Depositories', 'NSDL & CDSL'],
  ['Depositories Act', '1996'],
  ['Appellate tribunal', 'SAT'],
  ['Chairman term', '~3 years'],
]
const genSEBIFacts = (n, t) => genPairBank(n, t, SEBI_FACTS, '{} is:', 0, 1)

const GA_REG_FACTS = [
  ['SEBI', 'securities markets & intermediaries'],
  ['RBI', 'banking, monetary policy & currency'],
  ['IRDAI', 'insurance sector'],
  ['PFRDA', 'pension funds & NPS'],
  ['CCI', 'competition & anti-trust'],
  ['NABARD', 'agriculture & rural credit'],
  ['NHB', 'housing finance'],
  ['SIDBI', 'MSME finance'],
  ['TRAI', 'telecom & broadcasting'],
  ['FSSAI', 'food safety'],
  ['MCA', 'companies & corporate law'],
  ['EPFO', 'provident fund'],
  ['CERC', 'electricity regulation'],
  ['PNGRB', 'petroleum & natural gas'],
]
const GA_REP_FACTS = [
  ['Global Innovation Index', 'WIPO'],
  ['Human Development Index', 'UNDP'],
  ['Global Financial Stability Report', 'IMF'],
  ['World Economic Outlook', 'IMF'],
  ['Financial Stability Report (India)', 'RBI'],
  ['Global Competitiveness Report', 'WEF'],
  ['World Development Report', 'World Bank'],
  ['Corruption Perceptions Index', 'Transparency International'],
  ['Global Hunger Index', 'Concern Worldwide + Welthungerhilfe'],
  ['Global Peace Index', 'Institute for Economics & Peace'],
  ['Ease of Doing Business (discontinued)', 'World Bank'],
  ['Global Gender Gap Report', 'WEF'],
  ['World Happiness Report', 'UN SDSN'],
  ['Global Findex (financial inclusion)', 'World Bank'],
]
const GA_APPT_FACTS = [
  ['SEBI Chairman', 'Tuhin Kanta Pandey'],
  ['RBI Governor', 'Sanjay Malhotra'],
  ['Finance Minister', 'Nirmala Sitharaman'],
  ['CAG', 'K. Sanjay Murthy'],
  ['Chief Economic Advisor', 'V. Anantha Nageswaran'],
  ['NITI Aayog CEO', 'B.V.R. Subrahmanyam'],
  ['Supreme Court CJI', 'B.R. Gavai'],
  ['Election Commissioner (CEC)', 'Gyanesh Kumar'],
  ['NSDL/CDSL depositories regulator', 'SEBI'],
]
const genPairBank = (n, t, facts, qTemplate, aIdx, dIdx) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [name, val] = pick(facts)
    const mode = rand(0, 1)
    if (mode === 0) {
      const q = qTemplate.replace('{}', name)
      out.set(q, mkq(q, val, shuffle(facts.map((f) => f[1]).filter((v) => v !== val)).slice(0, 4), `${name} → ${val}.`, 'easy', t))
    } else {
      const q = `Which pairs with "${val}"?`
      out.set(q + '|' + name, mkq(q, name, shuffle(facts.map((f) => f[0]).filter((v) => v !== name)).slice(0, 4), `${val} → ${name}.`, 'easy', t))
    }
  }
  return [...out.values()]
}

const genGAFacts = (n, t, dims) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [name, ministry, year, purpose] = pick(GA_FACTS)
    const mode = pick(dims)
    let q, ans, distr
    if (mode === 'ministry') {
      q = `${name} is administered by which ministry?`
      ans = ministry
      distr = shuffle(GA_FACTS.map((f) => f[1]).filter((m) => m !== ministry)).slice(0, 4)
    } else if (mode === 'year') {
      q = `${name} was launched in which year?`
      ans = year
      distr = shuffle(['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'].filter((y) => y !== year)).slice(0, 4)
    } else if (mode === 'purpose') {
      q = `${name} primarily provides:`
      ans = purpose
      distr = shuffle(GA_FACTS.map((f) => f[3]).filter((p) => p !== purpose)).slice(0, 4)
    } else {
      q = `Which scheme gives "${purpose}"?`
      ans = name
      distr = shuffle(GA_FACTS.map((f) => f[0]).filter((s) => s !== name)).slice(0, 4)
    }
    out.set(q, mkq(q, ans, distr, `The triad — ministry + beneficiary + year: ${name} = ${ministry}, ${year}, ${purpose}.`, 'easy', t))
  }
  return [...out.values()]
}

const bankSchemes = (t) => [
  B('PM Jan Dhan Yojana — ministry & year:', ['MoF, 2014', 'MoH, 2015', 'MoR, 2016', 'MoF, 2016', 'NITI, 2014'], 0, 'Ministry of Finance, 2014 — bank accounts for all. The triad: ministry+beneficiary+year.', 'easy', t),
  B('PMJJBY and PMSBY are:', ['pension schemes', 'insurance schemes', 'loan schemes', 'tax schemes', 'market schemes'], 1, 'Pradhan Mantri Jeevan Jyoti Bima & Suraksha Bima — insurance pair.', 'easy', t),
  B('APY stands for:', ['Atal Pension Yojana', 'Annual Payment Yield', 'Asset Purchase Year', 'Agri Policy Yardstick', 'None'], 0, 'Atal Pension Yojana — unorganised-sector pension scheme (2015).', 'easy', t),
  B('PMMY relates to:', ['micro enterprise loans (MUDRA)', 'metro rail', 'monetary policy', 'mutual funds', 'minerals'], 0, 'Pradhan Mantri MUDRA Yojana — micro/small enterprise loans, 2015.', 'med', t),
  B('Stand-Up India scheme targets:', ['women + SC/ST entrepreneurs', 'all startups', 'PSU banks', 'exporters', 'farmers only'], 0, 'Bank loans ₹10L–1Cr to women & SC/ST entrepreneurs, 2016.', 'med', t),
  B('Sovereign Gold Bonds are issued by:', ['SEBI', 'RBI on behalf of GoI', 'NSE', 'Post offices only', 'LIC'], 1, 'RBI issues SGBs on behalf of the Government of India.', 'med', t),
  B('PM-KISAN provides:', ['₹6,000/year direct income support to farmers', 'crop loans', 'crop insurance', 'irrigation subsidy', 'tractor subsidy'], 0, 'PM-KISAN (2019) — ₹6,000/yr in 3 instalments to farmer households.', 'med', t),
  B('Ayushman Bharat (PM-JAY) is a:', ['health insurance scheme', 'pension scheme', 'housing scheme', 'education scheme', 'loan scheme'], 0, 'World\'s largest health cover — ₹5 lakh/family/year, 2018.', 'easy', t),
  B('PM SVANidhi scheme covers:', ['street vendors\' micro-credit', 'students', 'farmers', 'exporters', 'startups'], 0, 'Street vendors — collateral-free working capital loans, 2020.', 'med', t),
  B('PM Awas Yojana targets:', ['housing for all', 'jobs for all', 'loans for all', 'food for all', 'power for all'], 0, 'Housing for All — urban (2015) & Gramin variants.', 'easy', t),
  B('Sukanya Samriddhi Yojana is for:', ['girl child savings', 'senior citizens', 'farmers', 'taxpayers', 'exporters'], 0, 'Girl-child savings under Beti Bachao Beti Padhao, 2015.', 'med', t),
  B('National Pension System regulator:', ['PFRDA', 'RBI', 'SEBI', 'IRDAI', 'EPFO'], 0, 'PFRDA regulates NPS & pension funds.', 'med', t),
  B('Make in India launch year:', ['2014', '2015', '2016', '2013', '2017'], 0, 'September 2014 — manufacturing push.', 'easy', t),
  B('Skill India / PMKVY targets:', ['vocational skill training', 'farm loans', 'housing', 'exports', 'tax relief'], 0, 'Pradhan Mantri Kaushal Vikas Yojana — skill certification.', 'med', t),
  B('Startup India initiative year:', ['2016', '2014', '2015', '2018', '2020'], 0, 'January 2016 — DPIIT-recognised startup ecosystem.', 'med', t),
]

const bankReports = (t) => [
  B('Global Innovation Index is published by:', ['WIPO', 'WEF', 'IMF', 'World Bank', 'UNDP'], 0, 'WIPO — World Intellectual Property Organization; India ~39-40th recently.', 'easy', t),
  B('Ease of Doing Business index was published by:', ['WEF', 'World Bank', 'IMF', 'OECD', 'ADB'], 1, 'World Bank (discontinued 2021 — trap: still asked in GK sets).', 'med', t),
  B('Human Development Index is published by:', ['UNDP', 'WHO', 'UNICEF', 'WEF', 'ILO'], 0, 'UNDP — HDI = health + education + income composite.', 'easy', t),
  B('Global Financial Stability Report comes from:', ['World Bank', 'IMF', 'BIS', 'OECD', 'RBI'], 1, 'IMF — the markets/stability trap with World Bank.', 'med', t),
  B('Financial Stability Report (India-specific) is released by:', ['SEBI', 'RBI', 'NITI Aayog', 'Finance Ministry', 'NSO'], 1, 'RBI\'s half-yearly FSR — Indian financial system health.', 'easy', t),
  B('World Economic Outlook is published by:', ['WEF', 'IMF', 'World Bank', 'UNCTAD', 'ADB'], 1, 'IMF — WEO vs WEF (the forum) is the planted swap.', 'easy', t),
  B('Global Competitiveness Report came from:', ['WEF', 'IMF', 'World Bank', 'OECD', 'UNDP'], 0, 'World Economic Forum — the forum, not the fund.', 'med', t),
  B('Global Hunger Index is published by:', ['FAO', 'Concern Worldwide + Welthungerhilfe', 'WHO', 'UNICEF', 'WFP'], 1, 'NGO pair — the UN-agency trap.', 'med', t),
  B('World Bank\'s flagship annual report:', ['World Development Report', 'Global Economic Prospects only', 'Doing Business', 'Poverty Report', 'WEO'], 0, 'WDR — plus Global Economic Prospects.', 'med', t),
  B('Corruption Perceptions Index publisher:', ['Transparency International', 'World Bank', 'UN', 'OECD', 'WEF'], 0, 'TI — Berlin-based NGO.', 'easy', t),
  B('Global Peace Index publisher:', ['Institute for Economics & Peace', 'UN', 'WEF', 'SIPRI', 'Amnesty'], 0, 'IEP — Australia-based think tank.', 'med', t),
  B('India\'s CPI inflation data is released by:', ['NSO (MoSPI)', 'RBI', 'Finance Ministry', 'NITI Aayog', 'CSO-old'], 0, 'National Statistical Office under MoSPI.', 'med', t),
]

const bankAppt = (t) => [
  B('SEBI Chairman (as of 2025–26):', ['Madhabi Puri Buch', 'Tuhin Kanta Pandey', 'Ajay Tyagi', 'U.K. Sinha', 'Shaktikanta Das'], 1, 'Tuhin Kanta Pandey took charge Mar 2025 — verify at exam time.', 'easy', t),
  B('RBI Governor (2025–26):', ['Shaktikanta Das', 'Sanjay Malhotra', 'Urjit Patel', 'Raghuram Rajan', 'Y.V. Reddy'], 1, 'Sanjay Malhotra succeeded Shaktikanta Das (Dec 2024).', 'easy', t),
  B('IRDAI chairman appointment questions test:', ['regulator→person pairing', 'tenure math', 'salary', 'HQ city', 'act names'], 0, 'Appointments = person→post pairs — memory drip from the GA log.', 'easy', t),
  B('Who appoints the SEBI Chairman?', ['President', 'Appointments Committee of Cabinet / GoI', 'RBI board', 'SEBI board', 'Supreme Court'], 1, 'Government of India appoints the chair — standard GK fact.', 'med', t),
  B('SEBI chairman\'s typical term length:', ['2 years', '3 years', '5 years', '6 years', '10 years'], 1, 'Typically a 3-year term.', 'med', t),
  B('RBI Deputy Governors maximum count:', ['2', '3', '4', '5', '6'], 2, 'RBI Act allows up to 4 deputy governors.', 'med', t),
  B('NITI Aayog full form:', ['National Institution for Transforming India', 'National Institute of Trade & Industry', 'National IT Association', 'None', 'New India Think-tank Agency'], 0, 'Replaced Planning Commission in 2015.', 'easy', t),
  B('Finance Commission is constituted every:', ['3 years', '5 years', '7 years', '10 years', 'annually'], 1, 'Article 280 — every 5 years for tax devolution.', 'med', t),
  B('The CAG of India is appointed by:', ['PM', 'President', 'Parliament', 'Finance Minister', 'CJI'], 1, 'Comptroller & Auditor General — presidential appointment, Art 148.', 'med', t),
]

const bankCurrent = (t) => [
  B('SEBI\'s F&O study finding that made headlines:', ['retail F&O traders profit widely', '~9 of 10 retail F&O traders lose money', 'F&O is banned', 'institutions lose', 'options are risk-free'], 1, 'SEBI study: ~90%+ of retail F&O traders lose money — investor-protection ammunition.', 'med', t),
  B('T+0 settlement pilot status:', ['cancelled', 'beta pilot since 2024', 'fully live 2020', 'T+3 era', 'paper only'], 1, 'Beta pilot for a limited security set — instant-settlement frontier.', 'med', t),
  B('Finfluencer regulation (2024-25) direction:', ['fully deregulated', 'regulated entities restricted from associating with unregistered finfluencers', 'mandatory for all influencers', 'banned', 'left to exchanges'], 1, 'SEBI restricted regulated entities\' dealings with unregistered advisers/finfluencers.', 'med', t),
  B('SEBI\'s stance on crypto/VDAs:', ['ban all', 'multi-regulator oversight approach', 'SEBI sole regulator', 'RBI owns it', 'no stance'], 1, 'SEBI proposed multi-regulator oversight; RBI views private crypto as stability risk.', 'med', t),
  B('Regulatory sandbox purpose at SEBI:', ['punish violators', 'test market-tech innovation under controlled conditions', 'list IPOs', 'rate bonds', 'train brokers'], 1, 'Sandbox = controlled testing ground for market innovation.', 'easy', t),
  B('SEBI\'s peak-margin / upfront-margin rule applies to:', ['intraday derivatives', 'government bonds', 'FDs', 'PPF', 'NPS'], 0, 'Intraday F&O margins — investor protection push.', 'med', t),
  B('SEBI\'s graded surveillance measures target:', ['stocks with abnormal price/volume moves', 'all blue chips', 'only IPOs', 'mutual funds', 'bonds'], 0, 'GSM framework flags manipulation-prone securities.', 'med', t),
  B('The 2024-25 SEBI consultation on derivatives aimed at:', ['curbing retail F&O speculation', 'banning options', 'increasing lot sizes only', 'taxing trades', 'closing F&O'], 0, 'Index derivatives tightening after the retail-loss study.', 'med', t),
  B('SEBI\'s " accredited investor" framework relaxes rules for:', ['sophisticated/high-net-worth investors', 'all retail', 'foreigners only', 'PSUs', 'banks'], 0, 'Accredited investors get lighter-touch compliance.', 'med', t),
  B('SEBI\'s SCORES 2.0 upgrade focused on:', ['faster grievance redressal timelines', 'trading speed', 'IPO pricing', 'bond listing', 'margin rules'], 0, 'SCORES 2.0 — automated routing + defined timelines for complaints.', 'med', t),
  B('SEBI\'s recent ESG disclosure regime is called:', ['BRSR', 'ESGR', 'SustainX', 'GRI-India', 'CSR-Plus'], 0, 'Business Responsibility & Sustainability Report — top-1000 listed cos.', 'med', t),
  B('SEBI\'s same-day (T+0) settlement is:', ['optional beta for select securities', 'mandatory for all', 'cancelled', 'for bonds only', 'for F&O only'], 0, 'Voluntary beta pilot — brokers can opt in for a small security set.', 'med', t),
  B('SEBI\'s approach to AI in surveillance:', ['ignored', 'expanded algo-monitoring + analytics', 'banned', 'outsourced', 'manual only'], 1, 'SEBI expanded algorithmic surveillance of trading patterns.', 'med', t),
  B('SEBI\'s rule on related-party transactions:', ['tightened disclosure + approval norms', 'deregulated', 'banned', 'optional', 'unchanged'], 0, 'RPT norms tightened — audit committee + shareholder approvals.', 'med', t),
]

// ── The 43 concepts ────────────────────────────────────────────────────────
export const conceptSections = [
  {
    name: 'DBMS & SQL',
    concepts: [
      {
        id: 'dbms-closure', name: 'Closure & candidate keys', target: 100,
        lesson: `**Engine:** hold start letters → fire every arrow whose full LHS you hold → rescan till nothing new.
- **Closure X⁺** = the pocket after the walk.
- **Key** = smallest start-set reaching ALL — letters never on any RHS must start.
- **Traps:** composite LHS needs ALL parts · dead ends count · rescan after every collect.`,
        gen: (n) => genClosure(n, 'DBMS: closure & keys'),
        bank: [],
      },
      {
        id: 'dbms-nf', name: 'NF decision tree', target: 100,
        lesson: `**Tree top→down, stop at first failure:** cell lists→not 1NF · composite key + half-key lean→1NF · non-key→non-key chain→2NF · LHS not key but RHS prime→3NF · every LHS superkey→BCNF.
*Single-attr key = step 2 auto-passes.*`,
        gen: (n) => genNF(n, 'DBMS: normal forms'),
        bank: [],
      },
      {
        id: 'dbms-sqlout', name: 'SQL output prediction', target: 100,
        lesson: `**Trace in run-order:** FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY.
**NULL is invisible** — every comparison drops it. COUNT(col) skips NULLs; COUNT(*) counts rows.`,
        gen: (n) => genSqlOut(n, 'DBMS: SQL output'),
        bank: [],
      },
      {
        id: 'dbms-joins', name: 'Join row counts', target: 100,
        lesson: `INNER=matches · LEFT=|A| · RIGHT=|B| · FULL=|A|+|B|−matches · CROSS=|A|×|B|.
*A matched row appears once per match it gets — dept 10 matched twice shows twice.*`,
        gen: (n) => genJoins(n, 'DBMS: joins'),
        bank: [],
      },
      {
        id: 'dbms-having', name: 'GROUP BY vs HAVING', target: 100,
        lesson: `Aggregates illegal in WHERE (no groups exist yet) — legal only in HAVING.
Run order: FROM→WHERE→GROUP BY→HAVING→SELECT.`,
        gen: (n) => genHaving(n, 'DBMS: GROUP BY/HAVING'), bank: bankHaving('DBMS: GROUP BY/HAVING'),
      },
      {
        id: 'dbms-subq', name: 'Subqueries (scalar/IN/correlated)', target: 100,
        lesson: `Scalar (= (SELECT AVG…)) runs once · IN-list returns a set · **correlated** references the outer row → re-runs per row. EXISTS is usually correlated.`,
        gen: (n) => genSubq(n, 'DBMS: subqueries'), bank: bankSubq('DBMS: subqueries'),
      },
      {
        id: 'dbms-nth', name: 'Nth-highest pattern', target: 100,
        lesson: `ORDER BY sal DESC LIMIT 1 OFFSET **n−1**. Correlated: WHERE n−1 = COUNT of bigger salaries. Ties count as one rank.`,
        gen: (n) => genNth(n, 'DBMS: nth-highest'), bank: bankNth('DBMS: nth-highest'),
      },
      {
        id: 'dbms-setops', name: 'Set ops counting', target: 100,
        lesson: `UNION=a+b−shared (dedupes) · UNION ALL=a+b · INTERSECT=shared · EXCEPT=a−shared.`,
        gen: (n) => genSetOps(n, 'DBMS: set ops'),
        bank: [],
      },
      {
        id: 'dbms-ddl', name: 'DDL/DML/DCL/TCL classification', target: 100,
        lesson: `DDL=structure (CREATE/ALTER/DROP/TRUNCATE — auto-commit) · DML=data (INSERT/UPDATE/DELETE — rollback-able) · DCL=permissions (GRANT/REVOKE) · TCL=transactions (COMMIT/ROLLBACK/SAVEPOINT).`,
        gen: (n) => genDDL(n, 'DBMS: classification'),
        bank: [],
      },
      {
        id: 'dbms-dtd', name: 'DELETE vs TRUNCATE vs DROP', target: 100,
        lesson: `DELETE=pick rows (WHERE, DML, rollback) · TRUNCATE=empty box (DDL, identity reset) · DROP=burn the box (table+structure gone).`,
        gen: (n) => [...genDTD(n, 'DBMS: DELETE/TRUNCATE'), ...genDTDRev(Math.floor(n / 2), 'DBMS: DELETE/TRUNCATE')],
        bank: [],
      },
      {
        id: 'dbms-acid', name: 'ACID & isolation phenomena', target: 100,
        lesson: `dirty=read uncommitted · non-repeatable=same row changed · phantom=new ROWS appeared.
A=all-or-nothing · C=valid→valid · I=as-if-serial · D=survives crash.`,
        gen: (n) => [...genACID(n, 'DBMS: ACID/isolation'), ...genACIDRev(Math.floor(n / 2), 'DBMS: ACID/isolation')],
        bank: [],
      },
      {
        id: 'dbms-anomaly', name: 'Anomaly identification', target: 100,
        lesson: `Can\'t write new fact=insertion · deleting last row kills a fact=deletion · editing many copies, miss one=update.`,
        gen: (n) => [...genAnomaly(n, 'DBMS: anomalies'), ...genAnomalyRev(Math.floor(n / 2), 'DBMS: anomalies')],
        bank: [],
      },
      {
        id: 'dbms-decomp', name: 'Decomposition (lossless/dep-preserving)', target: 100,
        lesson: `Lossless=common attr determines one whole side · dep-preserving=every FD checkable inside one decomposed table. No shared column → lossy (cross-product rejoin).`,
        gen: (n) => genDecomp(n, 'DBMS: decomposition'), bank: bankDecomp('DBMS: decomposition'),
      },
      {
        id: 'dbms-index', name: 'Indexing & ER→tables', target: 100,
        lesson: `Range→B+ tree · equality→hash · clustered=physical order (ONE per table) · non-clustered=pointer map.
ER→tables: weak entity borrows owner\'s key · M:N→own relation · 1:N→FK on N side · multivalued→own table.`,
        gen: (n) => [...genIndexing(n, 'DBMS: indexing'), ...genIndexRev(Math.floor(n / 2), 'DBMS: indexing')],
        bank: bankER('DBMS: ER→tables'),
      },
    ],
  },
  {
    name: 'Quant',
    concepts: [
      {
        id: 'q-approx', name: 'Approximation', target: 100,
        lesson: `Park each number at its friendly cousin — fraction family (12.5%=1/8, 62.5%=5/8), perfect square, multiple of 5 → compute with cousins → closest option. *Over-refining is the trap — off-by-8 doesn\'t matter when options are 50 apart.*`,
        gen: (n) => genApprox(n, 'Quant: approximation'),
        bank: [],
      },
      {
        id: 'q-series', name: 'Number series (missing + wrong)', target: 100,
        lesson: `The ladder, in order: gaps → ratios → ×k+c → n²±k → sum-of-previous / interleaved. One wrong term corrupts TWO gaps — culprit sits between them.`,
        gen: (n) => genSeries(n, 'Quant: series'),
        bank: [],
      },
      {
        id: 'q-quad', name: 'Quadratic compare', target: 100,
        lesson: `Sign poem first may kill without factoring → factor: roots ADD to S, MULTIPLY to P → compare RANGES: strict separation → </> · touching → ≤/≥ · overlap → CND.`,
        gen: (n) => genQuadratic(n, 'Quant: quadratic'),
        bank: [],
      },
      {
        id: 'q-di', name: 'Data Interpretation', target: 100,
        lesson: `UNITS FIRST (lakh vs thousand, % vs absolute) → read QUESTIONS → they name the numbers that matter → % change divides by the OLD value.`,
        gen: (n) => genDI(n, 'Quant: DI'),
        bank: [],
      },
      {
        id: 'q-arith', name: 'Arithmetic word problems', target: 100,
        lesson: `Direct formulas: SI=PRT/100 · SP=CP(1+p%) · speed=d/t · avg=sum/n. Attempt only types you know cold — max 3.`,
        gen: (n) => genArith(n, 'Quant: arithmetic'),
        bank: [],
      },
    ],
  },
  {
    name: 'Reasoning',
    concepts: [
      {
        id: 'r-syll', name: 'Syllogism', target: 100,
        lesson: `MUST/MAYBE test — a conclusion is TRUE only if it holds in every legal diagram. All+All→All · Some+No→Some-not · Some+Some→maybe ✗ · either-or=both fail+same terms+one ± pair.`,
        gen: (n) => genSyllogism(n, 'Reasoning: syllogism'),
        bank: [],
      },
      {
        id: 'r-seat', name: 'Seating puzzles', target: 100,
        lesson: `8 empty boxes → place ABSOLUTE anchors first ("C at extreme") → chain relative clues onto anchors → leftover clue lands last. Never start with a floating clue.`,
        gen: (n) => genSeating(n, 'Reasoning: seating'),
        bank: [],
      },
      {
        id: 'r-attr', name: 'Attribute tables / month grids', target: 100,
        lesson: `Grid: rows=people, cols=attributes → fill definite cells → mark MAYBE cells differently → eliminate when forced. *Writing maybes as facts = the classic fail.*`,
        gen: (n) => genAttr(n, 'Reasoning: attribute tables'),
        bank: bankAttr('Reasoning: attribute tables'),
      },
      {
        id: 'r-stack', name: 'Box/floor stack', target: 100,
        lesson: `Number the stack → place absolutes → "N between X and Y" = |posX−posY| = N+1 — count empty slots between.`,
        gen: (n) => genStack(n, 'Reasoning: box/floor'),
        bank: [],
      },
      {
        id: 'r-blood', name: 'Blood relations', target: 100,
        lesson: `Decode to a tree — generations top→down, male=□ female=○ → trace the path. The side lives in the PARENT\'s gender.`,
        gen: (n) => genBlood(n, 'Reasoning: blood relations'),
        bank: [],
      },
      {
        id: 'r-rank', name: 'Ranking / height order', target: 100,
        lesson: `Total = top + bottom − 1 (person counted twice). Between two = |pos1−pos2|−1.`,
        gen: (n) => genRanking(n, 'Reasoning: ranking'),
        bank: [],
      },
      {
        id: 'r-coding', name: 'Coding-decoding', target: 100,
        lesson: `Check in order: fixed letter-shift (+k) → reversal (A↔Z opposite) → word↔word mapping → digit substitution (A=1).`,
        gen: (n) => genCoding(n, 'Reasoning: coding'),
        bank: [],
      },
      {
        id: 'r-ineq', name: 'Inequality', target: 100,
        lesson: `Chain symbols — conclusion survives only with an unbroken compatible path. Opposite signs → CND.`,
        gen: (n) => genIneq(n, 'Reasoning: inequality'),
        bank: [],
      },
      {
        id: 'r-dir', name: 'Direction sense', target: 100,
        lesson: `Draw N-E-S-W → plot each leg → net displacement = answer. "Left" = face current direction first, then turn.`,
        gen: (n) => genDirection(n, 'Reasoning: directions'),
        bank: [],
      },
      {
        id: 'r-stmt', name: 'Statement–assumption', target: 100,
        lesson: `Necessity test — the assumption is implicit ONLY if the statement COLLAPSES without it.`,
        gen: null, bank: bankStmt('Reasoning: statement-assumption'),
      },
      {
        id: 'r-alpha', name: 'Alphanumeric series', target: 100,
        lesson: `Number every element\'s position → "kth right of X" = posX+k.`,
        gen: (n) => genAlpha(n, 'Reasoning: alphanumeric'),
        bank: [],
      },
      {
        id: 'r-ds', name: 'Data sufficiency', target: 100,
        lesson: `Test each ALONE, then together — you\'re asked sufficiency, not the answer. Stop at "solvable."`,
        gen: (n) => genDS(n, 'Reasoning: data sufficiency'),
        bank: bankDS('Reasoning: data sufficiency'),
      },
    ],
  },
  {
    name: 'English',
    concepts: [
      {
        id: 'e-rc', name: 'Reading comprehension', target: 100,
        lesson: `Read QUESTIONS first → vocab-in-context = exact line ±1 · inference=IMPLIED not stated · tone=author\'s adjectives. Answers TRUE in the world but not asked = trap.`,
        gen: null, bank: bankRC('English: RC'),
      },
      {
        id: 'e-error', name: 'Error spotting', target: 100,
        lesson: `Check order: subject-verb agreement → tense consistency → articles/prepositions → parallelism → pronouns.`,
        gen: (n) => genError(n, 'English: error spotting'),
        bank: [],
      },
      {
        id: 'e-fill', name: 'Fillers', target: 100,
        lesson: `Polarity first (+/− slot?) → collocation (which word lives with the neighbours) → grammar fit. Tense markers beat vocab.`,
        gen: (n) => genFillers(n, 'English: fillers'), bank: bankFillers('English: fillers'),
      },
      {
        id: 'e-jumble', name: 'Para jumble', target: 100,
        lesson: `Find the OPENER (defines topic, no orphan pronouns) → chain by pronouns → chronology → conclusion-signal closers.`,
        gen: null, bank: bankPara('English: para jumble'),
      },
      {
        id: 'e-cloze', name: 'Cloze / improvement', target: 100,
        lesson: `Name the rule being tested → eliminate options keeping the same error.`,
        gen: null, bank: bankCloze('English: cloze'),
      },
      {
        id: 'e-vocab', name: 'Vocabulary', target: 100,
        lesson: `Synonym/antonym pairs — financial/regulatory vocab first: stringent, scrutiny, volatile, compliance, fiduciary.`,
        gen: (n) => genVocab(n, 'English: vocab'), bank: bankVocab('English: vocab'),
      },
    ],
  },
  {
    name: 'GA',
    concepts: [
      {
        id: 'ga-schemes', name: 'Schemes triad', target: 100,
        lesson: `The triad — Ministry + beneficiary + year. Recall by ministry; scheme names blur.`,
        gen: (n) => genGAFacts(n, 'GA: schemes', ['ministry', 'year', 'purpose', 'reverse']),
        bank: bankSchemes('GA: schemes'),
      },
      {
        id: 'ga-reg', name: 'Regulator pairs', target: 100,
        lesson: `Regulator→function pairs cold: SEBI=securities · RBI=banking+rates+currency · IRDAI=insurance · PFRDA=pensions · CCI=competition.`,
        gen: (n) => genPairBank(n, 'GA: regulator pairs', GA_REG_FACTS, 'Which body regulates {}?', 0, 1),
        bank: bankReg('GA: regulator pairs'),
      },
      {
        id: 'ga-reports', name: 'Reports & indices', target: 100,
        lesson: `Publishing body + India\'s rank — headline number only. WIPO≠WEF≠IMF is the planted swap.`,
        gen: (n) => genPairBank(n, 'GA: reports/indices', GA_REP_FACTS, '{} is published by?', 0, 1),
        bank: bankReports('GA: reports/indices'),
      },
      {
        id: 'ga-appt', name: 'Appointments & awards', target: 100,
        lesson: `Person→post pairs from the daily GA log — memory drip, not reasoning.`,
        gen: (n) => genPairBank(n, 'GA: appointments', GA_APPT_FACTS, 'Who holds the post of {}?', 0, 1),
        bank: bankAppt('GA: appointments'),
      },
      {
        id: 'ga-sebi', name: 'SEBI static', target: 100,
        lesson: `1988→1992 · Mumbai · mandate triad · SCORES vs Saa₹thi · CSCRF · T+1/T+0 · PIT/SAST/LODR · NSDL/CDSL · SAT.`,
        gen: (n) => genSEBIFacts(n, 'GA: SEBI static'),
        bank: bankSEBI('GA: SEBI static'),
      },
      {
        id: 'ga-current', name: 'Current affairs', target: 100,
        lesson: `Last ~6 months: SEBI studies (F&O losses), settlements, finfluencer rules, crypto stance, sandbox — from your GA monthly logs.`,
        gen: null, bank: bankCurrent('GA: current'),
      },
    ],
  },
]

// question pool per concept: generated variants + bank, deduped by question text
export const poolFor = (concept, target = 100) => {
  const seen = new Set()
  const out = []
  if (concept.gen) {
    for (const q of concept.gen(target)) {
      const k = q.q
      if (!seen.has(k)) { seen.add(k); out.push(q) }
    }
  }
  for (const q of concept.bank || []) {
    const k = q.q
    if (!seen.has(k)) { seen.add(k); out.push(q) }
  }
  const order = { easy: 0, med: 1, hard: 2 }
  return out.slice(0, target).sort((a, b) => (order[a.d] || 1) - (order[b.d] || 1))
}
