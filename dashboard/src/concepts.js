// Practice-100 bank — 43 concepts, each carrying a teach-card + question pool.
// Question format: { q, o: [5 options], a: correctIndex, x: why, d: 'easy|med|hard', t: tag }
// gen(n) → n unique generated variants; bank → curated fixed questions.
// Page target = 100/concept; pools fill toward it.

const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
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
    const mode = rand(0, 4)
    if (mode === 3) {
      const ddlPick = pick(fams.DDL)
      const nonDDL = shuffle(['INSERT', 'UPDATE', 'DELETE', 'MERGE', 'ROLLBACK', 'SELECT'].filter((c) => c !== ddlPick)).slice(0, 4)
      const q2 = `Which of these commands auto-commits (cannot be rolled back)?`
      out.set(q2 + '|' + ddlPick, mkq(q2, ddlPick, nonDDL, 'DDL auto-commits — structure changes lock instantly; DML waits for COMMIT.', 'med', t))
      continue
    }
    if (mode === 4) {
      const dmlPick = pick(['INSERT', 'UPDATE', 'DELETE', 'MERGE'])
      const ddl4 = shuffle(['CREATE', 'ALTER', 'DROP', 'TRUNCATE', 'RENAME', 'GRANT', 'COMMIT'].filter((c) => c !== dmlPick)).slice(0, 4)
      const q2 = `Which of these commands can be rolled back?`
      out.set(q2 + '|' + dmlPick, mkq(q2, dmlPick, ddl4, 'DML is rollback-able; DDL/DCL/TCL aren\'t.', 'med', t))
      continue
    }
    if (mode === 0) {
      const wrongCmd = pick(fams[pick(Object.keys(fams).filter((f) => f !== fam))])
      const fams4 = shuffle([...fams[fam]]).slice(0, 4)
      const q2 = `Which of the following commands is NOT a ${fam} command? Options drawn: ${shuffle([wrongCmd, ...fams4]).join(', ')}`
      out.set(q2, mkq(q2, wrongCmd, fams4.slice(0, 4), `${wrongCmd} sits in a different family — the rest are ${fam}.`, 'med', t))
      continue
    }
    if (mode === 1) {
      const q2 = `Which list contains ONLY ${fam} commands?`
      const clean = shuffle([...fams[fam]]).slice(0, 3).join(', ')
      const dirty1 = `${pick(fams[fam])}, ${pick(fams[pick(Object.keys(fams).filter((f) => f !== fam))])}, ${pick(fams[fam])}`
      const dirty2 = `${pick(fams[pick(Object.keys(fams).filter((f) => f !== fam))])}, ${pick(fams[fam])}, ${pick(fams[fam])}`
      const dirty3 = `${pick(fams[fam])}, ${pick(fams[fam])}, ${pick(fams[pick(Object.keys(fams).filter((f) => f !== fam))])}`
      out.set(q2 + '|' + clean, mkq(q2, clean, [dirty1, dirty2, dirty3, 'SELECT, SHOW, DESCRIBE'], `Only "${clean}" is pure ${fam} — each wrong list smuggles an outsider.`, 'med', t))
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
    ['R(A,B,C,D) split into R1(A,B,C) + R2(B,C,D) with FD BC→D', 'Lossless — BC shared determines D in R2'],
    ['R(E,F,G,H) split into R1(E,F) + R2(F,G,H) with FD F→GH', 'Lossless — F determines all of R2'],
    ['R(E,F,G) split into R1(E,G) + R2(F,G) — shared G keyless', 'Lossy — shared G determines neither side'],
    ['R(A,B,C,D,E) split into R1(A,B) + R2(A,C,D,E) with FD A→BCDE', 'Lossless — A determines all of R2'],
    ['R(P,Q,R,S,T) split into R1(P,Q) + R2(P,R,S,T) with FD P→QRST', 'Lossless — P determines all of R2'],
    ['R(A,B,C) split into R1(A,B) + R2(A,B,C)', 'Lossless — shared AB is the whole R1'],
    ['R(A,B,C,D) split into R1(A,C) + R2(B,D) — pairs never rejoin', 'Lossy — no common attribute'],
    ['R(J,K,L) split into R1(J,K) + R2(K,L) with FD K→J', 'Lossless — K determines J → superkey of R1'],
    ['R(J,K,L,M) split into R1(J,K,L) + R2(L,M) with FD L→M', 'Lossless — L determines all of R2'],
    ['R(A,B,C) split into R1(A,C) + R2(B,C) with FD C→B', 'Lossless — C determines B → superkey of R2'],
    ['R(M,N,O) split into R1(M,O) + R2(N,O) with FD O→M', 'Lossless — O determines M → superkey of R1'],
    ['R(U,V,W,X) split into R1(U,V) + R2(V,W,X) with FD V→WX', 'Lossless — V determines all of R2'],
    ['R(U,V,W,X) split into R1(U,W) + R2(V,X)', 'Lossy — no common attribute'],
    ['R(A,B,C,D,E) split into R1(A,B,C) + R2(D,E) — nothing shared', 'Lossy — no common attribute'],
    ['R(K,L,M,N) split into R1(K,L,M) + R2(K,N) with FD K→N', 'Lossless — K determines all of R2'],
  ]
  const phs = ['Is the decomposition lossless?', 'Classify this decomposition', 'Lossless or lossy?', 'Does this split lose information on rejoin?', 'The decomposition above is:']
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
    const mode = rand(0, 8)
    let q, ans, x = 'Direct formula — SI = PRT/100 · SP = CP(1+p%) · speed = d/t.'
    if (mode === 0) {
      const P = rand(2, 9) * 1000, R = rand(4, 12), T = rand(2, 5)
      ans = P * R * T / 100
      q = `What is the simple interest on ₹${P} at ${R}% p.a. for ${T} years?`
    } else if (mode === 1) {
      const cp = rand(2, 9) * 100, pct = rand(10, 30)
      ans = cp + cp * pct / 100
      q = `A trader buys an article at ₹${cp} and sells it at ${pct}% profit. What is the selling price?`
    } else if (mode === 2) {
      const mark = pick([40, 50, 60, 80]), d1 = pick([10, 15, 25])
      const cp = rand(2, 8) * 1000
      const mp = cp * (1 + mark / 100)
      const sp1 = Math.round(mp * (1 - d1 / 100))
      const d2 = pick([5, 10, 20])
      ans = Math.round(mp * (1 - d2 / 100))
      q = `A shopkeeper marks an article ${mark}% above its cost price. After offering a ${d1}% discount, he sells it for ₹${sp1}. At what price would it be sold if a ${d2}% discount had been allowed instead?`
      x = `MP = CP×${1 + mark / 100} → back-solve CP = ₹${cp} → SP at ${d2}% off = ₹${ans}. (SEBI 2024 Q1 pattern.)`
    } else if (mode === 3) {
      const milkR = rand(2, 4), watR = milkR + 1
      const tot = (milkR + watR) * pick([22, 33, 44])
      const milk1 = (tot * milkR) / (milkR + watR), wat1 = tot - milk1
      const exW = pick([33, 44, 66])
      const tot2 = pick([160, 220, 200])
      const wat2 = (tot2 + exW) / 2, milk2 = tot2 - wat2
      const gm = milk1 + milk2, gw = wat1 + wat2
      const g = gcd(gm, gw)
      ans = `${gm / g} : ${gw / g}`
      q = `Vessel M contains ${tot} litres of a milk–water mixture in the ratio ${milkR}:${watR}. Vessel N contains ${tot2} litres in which water exceeds milk by ${exW} litres. If both are mixed, what is the ratio of milk to water in the final mixture?`
      x = `M: milk ${milk1}, water ${wat1} · N: milk ${milk2}, water ${wat2} → ${gm}:${gw} = ${ans}. (SEBI 2024 Q2 pattern.)`
    } else if (mode === 4) {
      const total = rand(10, 15) * 1000
      const r = pick([15, 20, 25])
      const grown = Math.round(total * 0.5 * (1 + r / 100) * (1 + r / 100) / 10) * 10
      const inv = Math.round(grown / ((1 + r / 100) * (1 + r / 100)) / 100) * 100
      ans = total - inv
      q = `Out of ₹${total}, Ramlal invested a sum at ${r}% compound interest p.a. for 2 years and kept the rest as savings. If the maturity value was ₹${grown}, how much did he save?`
      x = `CI ×${(1 + r / 100) ** 2} factor → invested = ₹${inv} → saved = ₹${ans}. (SEBI 2024 Q3 pattern.)`
    } else if (mode === 5) {
      const d = rand(20, 60), s = rand(3, 9)
      ans = Math.round(d / s * 10) / 10
      q = `A car covers ${d} km in ${s} hours. What is its speed in km/hr?`
    } else if (mode === 6) {
      const a1 = rand(20, 35), a2 = a1 + rand(4, 9), yrs = rand(3, 6)
      ans = a1 + a2 + 2 * yrs
      q = `The ages of A and B are ${a1} and ${a2} years. What will be the sum of their ages ${yrs} years from now?`
    } else if (mode === 7) {
      const w1 = rand(4, 8), d1 = rand(6, 12), w2 = rand(2, 5)
      ans = Math.round((w1 * d1) / w2)
      q = `${w1} workers finish a job in ${d1} days. In how many days will ${w2} workers finish it (same rate)?`
      x = 'Inverse proportion — workers × days constant.'
    } else {
      const a = rand(5, 10), b = rand(5, 10), c = rand(3, 8)
      ans = Math.round((a + b + c) / 3 * 10) / 10
      q = `Three friends weigh ${a}0, ${b}0 and ${c}0 kg. What is their average weight?`
    }
    const num = typeof ans === 'string' ? null : ans
    const pool = num !== null
      ? [num - 10, num + 10, num * 2, num / 2, num + 20, num * 1.25, num - 5].map((v) => Math.round(v * 10) / 10).filter((v) => v !== num && v > 0)
      : shuffle(['2 : 3', '3 : 5', '5 : 8', '7 : 10', '7 : 11', '4 : 7'].filter((r) => r !== ans)).slice(0, 4)
    out.set(q, mkq(q, String(ans), shuffle(pool).slice(0, 4).map(String), x, mode >= 2 && mode <= 4 ? 'med' : 'easy', t))
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
// ---------- SEBI-style scenario puzzles (Directions block -> sub-questions) ----------
const ORDS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth']
const PPL = shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])

const evalClue = (clue, pos) => {
  switch (clue.k) {
    case 'gap': return Math.abs(pos[clue.a] - pos[clue.b]) === clue.n + 1
    case 'rel': return pos[clue.a] === pos[clue.b] + (clue.d === 'right' ? clue.n : -clue.n)
    case 'imm': return Math.abs(pos[clue.a] - pos[clue.b]) === 1
    case 'end': return pos[clue.a] === 0 || pos[clue.a] === clue.n - 1
    case 'samegap': return Math.abs(pos[clue.a] - pos[clue.b]) === Math.abs(pos[clue.c] - pos[clue.d2])
    default: return true
  }
}
const clueText = (clue) => {
  switch (clue.k) {
    case 'gap': return `There ${clue.n === 1 ? 'is one person' : `are ${clue.n} persons`} between ${clue.a} and ${clue.b}.`
    case 'rel': return clue.n === 1 ? `${clue.a} sits immediately to the ${clue.d} of ${clue.b}.` : `${clue.a} sits ${ORDS[clue.n - 1]} to the ${clue.d} of ${clue.b}.`
    case 'imm': return `${clue.a} sits immediately to the ${clue.d} of ${clue.b}.`
    case 'end': return `${clue.a} sits at one of the extreme ends.`
    case 'samegap': return `The number of persons between ${clue.a} and ${clue.b} is the same as between ${clue.c} and ${clue.d2}.`
  }
}

const permsOf = (arr) => {
  if (arr.length <= 1) return [arr]
  const res = []
  arr.forEach((x, i) => permsOf([...arr.slice(0, i), ...arr.slice(i + 1)]).forEach((p) => res.push([x, ...p])))
  return res
}

const solveUnique = (people, clues) => {
  const perms = permsOf(people)
  const sols = []
  for (const p of perms) {
    const pos = {}
    p.forEach((x, i) => (pos[x] = i))
    if (clues.every((c) => evalClue(c, pos))) sols.push(p)
    if (sols.length > 1) return null
  }
  return sols.length === 1 ? sols[0] : null
}

const randClue = (perm, N) => {
  const pos = {}
  perm.forEach((x, i) => (pos[x] = i))
  const a = pick(perm), b = pick(perm.filter((x) => x !== a))
  const kind = rand(0, 4)
  if (kind === 0 && Math.abs(pos[a] - pos[b]) > 1) return { k: 'gap', a, b, n: Math.abs(pos[a] - pos[b]) - 1 }
  if (kind === 1) { const d = pos[a] > pos[b] ? 'right' : 'left'; return { k: 'rel', a, b, n: Math.abs(pos[a] - pos[b]), d } }
  if (kind === 2) {
    const adj = perm.filter((x) => Math.abs(pos[x] - pos[a]) === 1)
    if (adj.length) { const bb = pick(adj); return { k: 'imm', a, b: bb, d: pos[a] > pos[bb] ? 'right' : 'left' } }
  }
  if (kind === 3) {
    const ends = perm.filter((x) => pos[x] === 0 || pos[x] === N - 1)
    return { k: 'end', a: pick(ends), n: N }
  }
  const c = pick(perm.filter((x) => x !== a && x !== b))
  const d2 = pick(perm.filter((x) => ![a, b, c].includes(x)))
  if (Math.abs(pos[a] - pos[b]) !== Math.abs(pos[c] - pos[d2])) return null
  return { k: 'samegap', a, b, c, d2 }
}

const genSeatRow = (n, t) => {
  const out = []
  let guard = 0
  while (out.length < n && guard++ < n * 40) {
    const N = pick([6, 7, 8])
    const people = shuffle([...PPL]).slice(0, N)
    const perm = shuffle([...people])
    const pos = {}
    perm.forEach((x, i) => (pos[x] = i))
    const clues = []
    let ok = false
    for (let tries = 0; tries < 40 && !ok; tries++) {
      const c = randClue(perm, N)
      if (c && !clues.some((x) => clueText(x) === clueText(c))) {
        clues.push(c)
        const sol = solveUnique(people, clues)
        if (sol && JSON.stringify(sol) === JSON.stringify(perm)) ok = true
      }
    }
    if (!ok || clues.length < 3) continue
    const scen = `Directions: Study the following information carefully and answer the questions. ${N} persons — ${people.join(', ')} — are seated in a straight line, all facing north. ${clues.map(clueText).join(' ')}`
    const subs = []
    const x = pick(perm)
    const k = Math.min(N - 1, rand(1, 3))
    const kword = k === 1 ? 'immediately' : ORDS[k - 1]
    if (pos[x] + k < N) subs.push([`Who sits ${kword} to the right of ${x}?`, perm[pos[x] + k]])
    else if (pos[x] - k >= 0) subs.push([`Who sits ${kword} to the left of ${x}?`, perm[pos[x] - k]])
    const y = pick(perm.filter((p) => p !== x))
    subs.push([`How many persons sit between ${x} and ${y}?`, String(Math.abs(pos[x] - pos[y]) - 1)])
    const ref = pick(perm.filter((p) => p !== x && pos[p] !== pos[x]))
    const rel = pos[x] > pos[ref] ? `${ORDS[pos[x] - pos[ref] - 1]} to the right` : `${ORDS[pos[ref] - pos[x] - 1]} to the left`
    subs.push([`What is the position of ${x} with respect to ${ref}?`, rel])
    subs.push([`Who sits at the extreme left end?`, perm[0]])
    subs.push([`How many people are seated in the row?`, String(N)])
    for (const [sq, ans] of subs) {
      const opts = ans.match(/^\d+$/)
        ? shuffle([ans, String(+ans + 1), String(Math.max(0, +ans - 1)), String(+ans + 2), 'None of these'].filter((v, i, arr) => arr.indexOf(v) === i)).slice(0, 5)
        : ans.includes('left') || ans.includes('right')
          ? shuffle([ans, ...shuffle([`${ORDS[rand(0, 2)]} to the left`, `${ORDS[rand(0, 2)]} to the right`, 'Immediate left', 'Immediate right', 'None of these']).slice(0, 4)])
          : shuffle([ans, ...perm.filter((p) => p !== ans)].slice(0, 5))
      out.push(mkq(`${scen}\n\n${sq}`, ans, opts.filter((o) => o !== ans).slice(0, 4), 'Fix extremes/absolutes first → chain relative clues → verify full row once.', 'med', t))
    }
  }
  return out
}

const MONTHS12 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const genMonths = (n, t) => {
  const out = []
  let guard = 0
  while (out.length < n && guard++ < n * 40) {
    const start = rand(0, 11 - 7)
    const months = MONTHS12.slice(start, start + pick([6, 7]))
    const N = months.length
    const people = shuffle([...PPL]).slice(0, N)
    const perm = shuffle([...people])
    const pos = {}
    perm.forEach((x, i) => (pos[x] = i))
    const clues = []
    let ok = false
    const mClue = () => {
      const a = pick(perm), b = pick(perm.filter((x) => x !== a))
      const kind = rand(0, 2)
      if (kind === 0 && Math.abs(pos[a] - pos[b]) > 1)
        return { txt: `${Math.abs(pos[a] - pos[b]) - 1} ${Math.abs(pos[a] - pos[b]) - 1 === 1 ? 'person was' : 'persons were'} born between ${a} and ${b}.`, test: (p) => Math.abs(p[a] - p[b]) === Math.abs(pos[a] - pos[b]) }
      if (kind === 1) {
        const d = pos[a] > pos[b] ? 'after' : 'before'
        const gap = Math.abs(pos[a] - pos[b])
        return { txt: `${a} was born ${gap === 1 ? 'one month' : `${ORDS[gap - 1].replace('second', 'two').replace('third', 'three').replace('fourth', 'four').replace('fifth', 'five').replace('sixth', 'six')} months`} ${d} ${b}.`, test: (p) => pos[a] - pos[b] === p[a] - p[b] }
      }
      return { txt: `${a} was born in ${months[pos[a]]}.`, test: (p) => p[a] === pos[a] }
    }
    for (let tries = 0; tries < 40 && !ok; tries++) {
      const c = mClue()
      if (clues.some((x) => x.txt === c.txt)) continue
      clues.push(c)
      const sols = permsOf(people).filter((p) => {
        const pp = {}
        p.forEach((x, i) => (pp[x] = i))
        return clues.every((cl) => cl.test(pp))
      })
      if (sols.length === 1 && JSON.stringify(sols[0]) === JSON.stringify(perm)) ok = true
      if (sols.length === 0) clues.pop()
    }
    if (!ok || clues.length < 3) continue
    const scen = `Directions: Study the information carefully and answer the questions. ${N} persons — ${people.join(', ')} — were born in different consecutive months of the same year: ${months.join(', ')}. ${clues.map((c) => c.txt).join(' ')}`
    const subs = []
    const x = pick(perm)
    subs.push([`In which month was ${x} born?`, months[pos[x]]])
    const y = pick(perm.filter((p) => p !== x))
    subs.push([`Who was born in ${months[pos[y]]}?`, y])
    subs.push([`How many persons were born between ${x} and ${y}?`, String(Math.abs(pos[x] - pos[y]) - 1)])
    subs.push([`Who was born in ${months[0]}?`, perm[0]])
    for (const [sq, ans] of subs) {
      const opts = ans.match(/^\d+$/)
        ? shuffle([ans, String(+ans + 1), String(+ans + 2), String(Math.max(0, +ans - 1)), 'None of these'].filter((v, i, arr) => arr.indexOf(v) === i)).slice(0, 5)
        : months.includes(ans)
          ? shuffle([ans, ...months.filter((m) => m !== ans)].slice(0, 5))
          : shuffle([ans, ...perm.filter((p) => p !== ans)].slice(0, 5))
      out.push(mkq(`${scen}\n\n${sq}`, ans, opts.filter((o) => o !== ans).slice(0, 4), 'Anchor the fixed-month clue → chain before/after gaps → grid out the order.', 'med', t))
    }
  }
  return out
}
// ---------- end scenario puzzles ----------

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
    const fill = (str) => str.replaceAll('{0}', nouns[0]).replaceAll('{1}', nouns[1]).replaceAll('{2}', nouns[2])
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
  ['"A is the father of B. C is the daughter of B." How is C related to A?', ['Granddaughter', 'Daughter', 'Niece', 'Sister', 'Cousin'], 'B = A\'s child; C = B\'s daughter → A\'s granddaughter.'],
  ['"P is the mother of Q. R is the brother of Q." How is R related to P?', ['Son', 'Nephew', 'Brother', 'Grandson', 'Father'], 'R = Q\'s brother; Q\'s mother = P → R is P\'s son.'],
  ['"My father\'s wife\'s only son is:" — who?', ['My brother', 'My cousin', 'My uncle', 'My nephew', 'Me or my brother'], 'Father\'s wife = my mother; her son = me or my brother — pick "me or my brother" when listed.'],
  ['"S is the sister of T\'s son." How is S related to T?', ['Daughter', 'Sister', 'Niece', 'Aunt', 'Mother'], 'T\'s son\'s sister = T\'s daughter.'],
  ['"M is the husband of N\'s mother\'s daughter." How is M related to N?', ['Brother-in-law', 'Father', 'Uncle', 'Brother', 'Cousin'], 'N\'s mother\'s daughter = N\'s sister; her husband = brother-in-law.'],
  ['"The only child of my father\'s father is:" — who?', ['My father', 'My uncle', 'My grandfather', 'My brother', 'Me'], 'Grandfather\'s only child = my father.'],
  ['"V is the wife of U\'s father\'s brother." How is V related to U?', ['Aunt', 'Mother', 'Sister', 'Grandmother', 'Cousin'], 'Father\'s brother\'s wife = aunt.'],
  ['"K\'s son is the brother of L\'s mother." How is K related to L?', ['Grandparent', 'Uncle', 'Father', 'Brother', 'Cousin'], 'L\'s mother\'s brother = L\'s uncle; K is that uncle\'s parent → grandparent.'],
  ['"W is the daughter of Z\'s only sibling." How is W related to Z?', ['Niece', 'Daughter', 'Sister', 'Aunt', 'Cousin'], 'Z\'s sibling\'s daughter = niece.'],
  ['"E\'s father is F\'s son." How is E related to F?', ['Grandchild', 'Son', 'Brother', 'Nephew', 'Father'], 'E\'s father = F\'s son → E = F\'s grandchild.'],
  ['"H is the brother of I\'s husband." How is H related to I?', ['Brother-in-law', 'Father', 'Uncle', 'Son', 'Nephew'], 'Husband\'s brother = brother-in-law.'],
  ['"O is the mother-in-law of P\'s wife." How is O related to P?', ['Mother', 'Aunt', 'Grandmother', 'Sister', 'Mother-in-law'], 'P\'s wife\'s mother-in-law = P\'s mother.'],
  ['"Q\'s grandfather\'s only daughter is R." How is R related to Q?', ['Mother or aunt', 'Grandmother', 'Sister', 'Cousin', 'Niece'], 'Grandfather\'s daughter = Q\'s parent or parent\'s sister → mother or aunt.'],
  ['"Y is X\'s maternal uncle." How is X\'s mother related to Y?', ['Sister', 'Wife', 'Daughter', 'Niece', 'Aunt'], 'Maternal uncle = mother\'s brother → mother is his sister.'],
  ['"My sister\'s husband\'s brother is:" — who to me?', ['Brother-in-law', 'Uncle', 'Cousin', 'Nephew', 'Brother'], 'Sister\'s husband = brother-in-law; his brother = also brother-in-law.'],
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
  B('"Enroll early to get the early-bird discount." Implicit assumption?', ['Discounts always exist', 'Enrolling early confers a benefit the offer ties to timing', 'Seats are unlimited', 'Everyone can afford it', 'Late enrolment is banned'], 1, 'The pitch presumes early enrolment is rewarded — the assumption must be NECESSARY.', 'med', t),
  B('"Switch to LED bulbs to cut your electricity bill." Implicit assumption?', ['LEDs are brighter', 'LED bulbs consume less electricity', 'Bills are too high', 'Everyone uses bulbs', 'LEDs last forever'], 1, 'The recommendation presumes LEDs actually reduce consumption.', 'med', t),
  B('"The city needs more flyovers to reduce congestion." Implicit assumption?', ['Congestion is caused by traffic volume exceeding road capacity', 'Flyovers are cheap', 'Cars are banned', 'All roads are narrow', 'Nobody walks'], 0, 'The solution presumes congestion is a capacity problem.', 'hard', t),
  B('"Aspirants should practise mocks weekly to improve scores." Implicit assumption?', ['Mocks are free', 'Scores respond to mock practice', 'All aspirants fail', 'Weekly is the only rhythm', 'Mocks have answers'], 1, 'The advice presumes a causal link: mock practice → score.', 'med', t),
  B('"The bank reduced staff to improve profitability." Implicit assumption?', ['Staff are lazy', 'Reducing staff lowers costs relative to revenue', 'Profitability is low', 'All banks do it', 'Customers prefer automation'], 1, 'The action presumes staff reduction helps the profit equation.', 'med', t),
  B('"Carry an umbrella — it may rain." Implicit assumption?', ['It always rains', 'An umbrella protects against rain', 'Rain is dangerous', 'Weather reports exist', 'Umbrellas are cheap'], 1, 'The instruction presumes umbrellas actually mitigate rain.', 'easy', t),
  B('"Revise the syllabus twice before the exam." Implicit assumption?', ['The syllabus is long', 'Revision improves retention/performance', 'Everyone revises', 'The exam is hard', 'Notes exist'], 1, 'The advice presumes revision causally helps exam performance.', 'med', t),
  B('"Invest in index funds for low-cost diversification." Implicit assumption?', ['Index funds outperform', 'Index funds provide diversification at lower cost', 'All funds are expensive', 'Investors are rich', 'Markets always rise'], 1, 'The pitch presumes the claimed cost+diversification benefit exists.', 'med', t),
  B('"The course includes PYQ analysis to build exam pattern sense." Implicit assumption?', ['PYQs repeat verbatim', 'Studying PYQs builds usable pattern sense', 'The exam is easy', 'All questions are known', 'Analysis is fast'], 1, 'The claim presumes PYQ study translates into pattern awareness.', 'med', t),
  B('"Take the stairs instead of the lift to stay active." Implicit assumption?', ['Lifts are broken', 'Stair-climbing contributes to physical activity', 'Everyone is unfit', 'Buildings are tall', 'Lifts are slow'], 1, 'The advice presumes stairs = exercise.', 'easy', t),
  B('"Advertise the new branch to attract deposits." Implicit assumption?', ['Ads are free', 'Advertising can influence deposit behaviour', 'Nobody has deposits', 'The branch is far', 'All banks advertise'], 1, 'The plan presumes advertising affects deposit inflows.', 'med', t),
  B('"The exam has negative marking — attempt only what you know." Implicit assumption?', ['Negative marking exists', 'Accuracy beats coverage under negative marking', 'All questions are hard', 'Skipping is penalised', 'Marks are low'], 1, 'The strategy presumes accuracy trade-off matters under penalties.', 'med', t),
  B('"Learn shortcuts to finish quant faster." Implicit assumption?', ['Quant is long', 'Shortcuts reduce solving time', 'All questions need shortcuts', 'Speed does not matter', 'Formulas are useless'], 1, 'The advice presumes shortcuts actually compress time.', 'med', t),
  B('"The regulator should disclose its surveillance methods." Implicit assumption?', ['Disclosure is mandatory', 'Transparency in methods serves the interest being argued', 'Methods are secret always', 'Regulators hide everything', 'Disclosure is easy'], 1, 'The demand presumes method-disclosure advances the goal.', 'hard', t),
  B('"Wear a helmet while riding." Implicit assumption?', ['Helmets are stylish', 'Helmets reduce injury risk', 'All riders crash', 'Helmets are mandatory', 'Bikes are fast'], 1, 'The rule presumes helmets mitigate injury.', 'easy', t),
  B('"The company adopted cloud systems to improve resilience." Implicit assumption?', ['Cloud is cheap', 'Cloud systems improve resilience', 'Old systems failed', 'Everyone uses cloud', 'Resilience is low'], 1, 'The decision presumes cloud → resilience benefit.', 'med', t),
  B('"Eat breakfast to stay focused in the morning." Implicit assumption?', ['Breakfast is cheap', 'Breakfast affects morning focus', 'Everyone skips it', 'Focus is impossible otherwise', 'Mornings are hard'], 1, 'The advice presumes the meal-focus link.', 'easy', t),
  B('"Read the passage twice for comprehension." Implicit assumption?', ['Passages are long', 'Re-reading improves comprehension', 'Reading is slow', 'Everyone misreads', 'Answers are hidden'], 1, 'The tactic presumes re-reading helps understanding.', 'easy', t),
  B('"The bank introduced video-KYC to cut onboarding time." Implicit assumption?', ['KYC is optional', 'Video-KYC reduces onboarding time', 'All customers have phones', 'Branches are closed', 'Onboarding is slow always'], 1, 'The change presumes video-KYC is faster.', 'med', t),
  B('"Doctors advise patients to walk 30 minutes daily." Implicit assumption?', ['All patients can walk', 'Daily walking benefits health', '30 minutes is the exact dose', 'Walking is free', 'Doctors walk daily'], 1, 'The advice presumes a walking→health benefit link.', 'easy', t),
  B('"The SEBI circular mandates standardized offer documents." Implicit assumption?', ['Documents were uniform', 'Standardization aids comparability/investor reading', 'SEBI audits daily', 'Issuers objected', 'Documents are long'], 1, 'The mandate presumes standardization serves investors.', 'med', t),
  B('"Traders should set stop-losses on every position." Implicit assumption?', ['All traders profit', 'Stop-losses limit downside', 'Markets always recover', 'Stops are free', 'Positions are small'], 1, 'The rule presumes stop-losses actually limit loss.', 'med', t),
  B('"Students must attempt easy questions first." Implicit assumption?', ['Easy questions exist', 'Attempt order affects score/time outcome', 'All questions are equal', 'Time is unlimited', 'Hard questions are impossible'], 1, 'The strategy presumes ordering affects outcome.', 'med', t),
  B('"The regulator should punish misleading ads." Implicit assumption?', ['All ads mislead', 'Misleading ads harm investors / deterrence works', 'Ads are cheap', 'Punishment is fast', 'Ads are rare'], 1, 'The demand presumes harm exists and deterrence deters.', 'med', t),
  B('"Install two-factor authentication on your account." Implicit assumption?', ['Accounts are hacked', '2FA raises account security', 'Everyone has phones', 'Passwords are weak always', 'It is mandatory'], 1, 'The recommendation presumes 2FA adds real security.', 'easy', t),
  B('"Read the question twice before marking." Implicit assumption?', ['Questions are tricky', 'Re-reading reduces misinterpretation errors', 'Time is plenty', 'Answers are hidden', 'Everyone misreads'], 1, 'The advice presumes re-reading catches misreads.', 'easy', t),
  B('"The exchange introduced circuit breakers after the crash." Implicit assumption?', ['Crashes are frequent', 'Circuit breakers can contain panic selling', 'All crashes are identical', 'Trading is banned', 'Investors demanded it'], 1, 'The response presumes breakers mitigate crash dynamics.', 'med', t),
  B('"Save a portion of every salary." Implicit assumption?', ['Salaries are large', 'Regular saving builds reserves', 'Everyone earns', 'Banks pay interest', 'Spending is bad'], 1, 'The habit advice presumes saving accumulates.', 'easy', t),
  B('"The committee recommended higher margin for F&O." Implicit assumption?', ['Margins are always low', 'Higher margins reduce speculative over-leverage', 'F&O is banned', 'Committees decide margins', 'Traders will comply fully'], 1, 'The recommendation presumes margin hikes curb speculation.', 'hard', t),
  B('"Applicants should submit documents before the deadline." Implicit assumption?', ['Deadlines are arbitrary', 'Late submissions are penalized/rejected', 'Documents exist', 'Everyone applies', 'The deadline is soon'], 1, 'The instruction presumes deadline consequences.', 'easy', t),
  B('"Mutual fund ads must show risk warnings." Implicit assumption?', ['All ads lie', 'Investors may overestimate safety without warnings', 'Funds are risky always', 'Warnings are long', 'SEBI wrote ads'], 1, 'The rule presumes warnings correct a perception gap.', 'med', t),
  B('"Check the answer key after the mock." Implicit assumption?', ['Keys are always right', 'Reviewing answers improves future attempts', 'Mocks are hard', 'All answers are scored', 'Keys are free'], 1, 'The step presumes review feeds improvement.', 'easy', t),
  B('"The government launched a portal to track subsidy leakages." Implicit assumption?', ['Leakages are huge', 'A tracking portal can surface leakages', 'All subsidies leak', 'Portals are cheap', 'Citizens report'], 1, 'The tool presumes visibility of leakages matters.', 'med', t),
  B('"Verify the source before sharing news." Implicit assumption?', ['All news is false', 'Unverified sharing spreads misinformation', 'Sources are hidden', 'Everyone shares', 'Verification is fast'], 1, 'The caution presumes verification prevents spread.', 'easy', t),
  B('"The auditor flagged the transactions as suspicious." Implicit assumption?', ['All transactions are fraud', 'The transactions showed markers worth flagging', 'Auditors flag everything', 'Fraud is certain', 'Flags are rare'], 1, 'The flag presumes observable suspicious markers.', 'med', t),
  B('"Maintain a formula sheet for last-minute revision." Implicit assumption?', ['Formulas are many', 'A consolidated sheet aids quick recall', 'Everyone forgets', 'Revision is hard', 'Sheets are short'], 1, 'The practice presumes consolidation aids recall.', 'easy', t),
  B('"SEBI tightened custody rules for FPIs." Implicit assumption?', ['FPIs are risky always', 'Tighter custody reduces misuse risk', 'All FPIs violate', 'Custody is new', 'Rules were weak always'], 1, 'The tightening presumes custody gaps pose risk.', 'hard', t),
  B('"Attempt the DI set only if the data is clean." Implicit assumption?', ['DI is always easy', 'Messy data slows solving enough to matter', 'All DI is dirty', 'Clean sets exist', 'DI scores high'], 1, 'The filter presumes data quality affects solve time.', 'med', t),
  B('"The bank capped ATM withdrawals." Implicit assumption?', ['ATMs run dry', 'A cap serves the stated purpose (liquidity/fraud)', 'Cash is obsolete', 'Everyone uses ATMs', 'Caps are common'], 1, 'The cap presumes a benefit it\'s meant to produce.', 'med', t),
  B('"Use mnemonics for tricky lists." Implicit assumption?', ['Lists are hard always', 'Mnemonics improve list recall', 'Everyone uses them', 'Lists are short', 'Memory is weak'], 1, 'The tip presumes mnemonic→recall link.', 'easy', t),
  B('"The coach told players to visualize winning." Implicit assumption?', ['Visualization guarantees victory', 'Visualization can aid performance', 'Players never win', 'Coaches visualize too', 'Winning is random'], 1, 'The technique presumes a mental-performance link.', 'med', t),
  B('"The school added a library hour daily." Implicit assumption?', ['Books are expensive', 'A dedicated hour improves reading access', 'Students hate reading', 'Teachers approved it', 'Libraries are small'], 1, 'The scheduling presumes the hour serves its goal.', 'easy', t),
  B('"Investors should diversify across asset classes." Implicit assumption?', ['All assets fall together', 'Diversification reduces portfolio risk', 'Stocks always win', 'Bonds are safe', 'Classes are equal'], 1, 'The advice presumes diversification→risk reduction.', 'med', t),
  B('"The notice period was extended to sixty days." Implicit assumption?', ['Sixty is standard', 'A longer window serves the parties\' needs', 'Employees objected', 'Notice is optional', 'All firms do it'], 1, 'The extension presumes more time helps transitions.', 'med', t),
  B('"Candidates must report thirty minutes early." Implicit assumption?', ['Reporting is complex', 'Early arrival prevents delays/absence issues', 'All candidates are late', 'The exam is early', 'Thirty is arbitrary'], 1, 'The buffer presumes arrival timing matters.', 'easy', t),
  B('"The auditor reconciled accounts monthly." Implicit assumption?', ['Accounts always mismatch', 'Monthly reconciliation catches discrepancies in time', 'Audits are yearly', 'Software reconciles', 'Accounts are simple'], 1, 'The cadence presumes frequency aids detection.', 'med', t),
  B('"Drivers should avoid phones while driving." Implicit assumption?', ['Phones are illegal', 'Phone distraction raises accident risk', 'All drivers use phones', 'Roads are empty', 'Calls are short'], 1, 'The rule presumes distraction→risk.', 'easy', t),
  B('"The fund rebalanced quarterly to manage drift." Implicit assumption?', ['Drift is always bad', 'Quarterly rebalancing controls allocation drift', 'Funds drift daily', 'Rebalancing is free', 'Drift never occurs'], 1, 'The policy presumes scheduled rebalancing works.', 'hard', t),
  B('"Students should sleep eight hours before exams." Implicit assumption?', ['Sleep is cheap', 'Sleep affects exam-day cognition', 'All students sleep poorly', 'Eight is exact', 'Exams are morning'], 1, 'The advice presumes sleep→performance link.', 'easy', t),
  B('"The circular required two independent directors." Implicit assumption?', ['All boards are biased', 'Independent directors strengthen oversight', 'Directors are rare', 'Boards are small', 'Two is enough always'], 1, 'The requirement presumes independence adds oversight.', 'hard', t),
  B('"Traders were advised to log every trade." Implicit assumption?', ['Logs are mandatory', 'Logging enables review/audit of decisions', 'All trades lose', 'Logs are short', 'Trading is risky always'], 1, 'The practice presumes records enable learning/audit.', 'med', t),
  B('"The app sends weekly spending summaries." Implicit assumption?', ['Spending is always high', 'Summaries help users track/control spending', 'Users read emails', 'Weekly is ideal always', 'Apps are free'], 1, 'The feature presumes visibility aids control.', 'easy', t),
  B('"Inspectors must rotate assignments yearly." Implicit assumption?', ['Inspections are boring', 'Rotation prevents capture/familiarity risks', 'All inspectors corrupt', 'Rotation is cheap', 'Assignments are equal'], 1, 'The rotation presumes staleness breeds risk.', 'hard', t),
  B('"The lab recalibrates instruments every month." Implicit assumption?', ['Instruments are broken', 'Instruments drift and need periodic recalibration', 'Calibration is free', 'Labs are strict always', 'Monthly is standard everywhere'], 1, 'The schedule presumes drift exists.', 'med', t),
  B('"New joiners shadow seniors for two weeks." Implicit assumption?', ['Seniors are always right', 'Shadowing transfers practical knowledge', 'All joiners are slow', 'Two weeks suffices always', 'Shadowing is cheap'], 1, 'The practice presumes observation teaches.', 'med', t),
  B('"The committee met weekly during the rollout." Implicit assumption?', ['Meetings are always useful', 'Frequent meetings keep the rollout coordinated', 'Rollouts are rare', 'Members are free', 'Weekly is mandatory'], 1, 'The cadence presumes coordination value.', 'med', t),
  B('"Parents should check the fees receipt carefully." Implicit assumption?', ['Schools err', 'Receipts may carry errors worth catching', 'All receipts are wrong', 'Fees are high always', 'Parents are accountants'], 1, 'The caution presumes receipt errors happen.', 'easy', t),
  B('"The platform flags accounts with unusual logins." Implicit assumption?', ['All logins are fraud', 'Unusual logins can indicate compromise', 'Users travel', 'Flags are free', 'Logins are tracked'], 1, 'The flag presumes anomaly→compromise correlation.', 'med', t),
  B('"Review wrong answers before re-attempting a mock." Implicit assumption?', ['Mocks are hard', 'Reviewing errors prevents repeating them', 'All answers are wrong', 'Mocks repeat questions', 'Review is fast'], 1, 'The workflow presumes error-review prevents recurrence.', 'easy', t),
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
  ['The news are quite alarming', 'are → is', 'news is uncountable — singular'],
  ['Neither of the two boys were present', 'were → was', 'neither of → singular'],
  ['Every student and every teacher were asked', 'were → was', 'every + every → singular'],
  ['He prevented me to go there', 'to go → from going', 'prevent + from + -ing'],
  ['She is capable to handle the task', 'to handle → of handling', 'capable + of + -ing'],
  ['I am interested for this project', 'for → in', 'interested + in'],
  ['He is married with my sister', 'with → to', 'married + to'],
  ['She congratulated me for my success', 'for → on', 'congratulate + on'],
  ['They discussed about the plan', 'about the plan → the plan', 'discuss takes object directly — no "about"'],
  ['He entered into the room quietly', 'into → into/the room', 'enter + room directly — "entered the room"'],
  ['I reached to the station on time', 'to the station → the station', 'reach + place directly — no "to"'],
  ['Despite of the rain, they played', 'Despite of → Despite', 'despite never takes "of" (in spite of does)'],
  ['He is more superior to his junior', 'more superior → superior', 'comparative already built in — no "more"'],
  ['This is most unique design', 'most unique → unique', 'unique is absolute — no comparative'],
  ['Unless you do not work hard, you will fail', 'do not work → work', 'unless already means "if not" — double negative'],
  ['No sooner did he arrive when it rained', 'when → than', 'no sooner + than'],
  ['Hardly had he left than it started raining', 'than → when', 'hardly/scarcely + when'],
  ['He is enough tall to play', 'enough tall → tall enough', 'enough comes AFTER the adjective'],
  ['She sings very much sweetly', 'very much → very', 'very much modifies verbs, not adverbs'],
  ['I am feeling happily today', 'happily → happy', 'feel + adjective, not adverb'],
  ['This book is belonging to me', 'is belonging → belongs', 'belong is a state verb — no continuous'],
  ['I am having a car now', 'am having → have', 'have (ownership) is a state verb — no continuous'],
  ['She is knowing the answer', 'is knowing → knows', 'know is a state verb — no continuous'],
  ['The furnitures in the room are old', 'furnitures → furniture', 'furniture uncountable'],
  ['He gave me many advices', 'advices → advice', 'advice uncountable'],
  ['Informations were shared online', 'Informations → Information', 'information uncountable'],
  ['The children is playing outside', 'is → are', 'children plural'],
  ['Neither the teacher nor the students was ready', 'was → were', 'nearer subject (students) → plural'],
  ['A number of students was absent', 'was → were', 'a number of → plural'],
  ['The number of absentees are growing', 'are → is', 'the number of → singular'],
  ['Fifty percent of the work are done', 'are → is', 'percentage of uncountable → singular'],
  ['Half of the students was absent', 'was → were', 'half of + countable plural → plural'],
  ['He as well as his friends were invited', 'were → was', 'as well as → verb agrees with first subject'],
  ['The captain with his team members were present', 'were → was', '"with" phrase → subject stays singular'],
  ['Each boy and each girl were given a prize', 'were → was', 'each + each → singular'],
  ['Many a soldier have fought bravely', 'have → has', 'many a → singular'],
  ['There is many reasons for failure', 'is → are', 'many reasons → plural'],
  ['He is one of the tallest boy in class', 'boy → boys', 'one of the + plural noun'],
  ['This is the most easiest question', 'most easiest → easiest', 'double superlative'],
  ['He ran fastly to catch the bus', 'fastly → fast', 'fast is both adjective and adverb'],
  ['I and my friend went together', 'I and my friend → my friend and I', 'politeness — others first'],
  ['Between you and I, this is risky', 'you and I → you and me', 'preposition + object pronoun'],
  ['Let us keep this between we two', 'we two → us two', 'between + object pronouns'],
  ['Who does this pen belong to?', 'who → whom', 'object of "to" → whom'],
  ['Whom is knocking at the door?', 'whom → who', 'subject position → who'],
]
const genError = (n, t) => {
  const out = new Map()
  let guard = 0
  while (out.size < n && guard++ < n * 30) {
    const [sent, fix, why] = pick(ERR_T)
    const errPhrase = fix.split('→')[0].trim()
    const words = sent.split(' ')
    const errIdx = words.findIndex((w) => errPhrase.toLowerCase().includes(w.toLowerCase().replace(/[^a-z]/g, '')) || errPhrase.toLowerCase().split(' ').includes(w.toLowerCase().replace(/[^a-z]/g, '')))
    const pivot = errIdx === -1 ? Math.floor(words.length / 2) : errIdx
    const jit = rand(0, 1)
    const pts = [0, Math.max(1, Math.floor(pivot * (jit ? 0.45 : 0.6))), pivot + 1, Math.min(words.length - 1, Math.floor(words.length * (jit ? 0.7 : 0.75))), words.length]
    const dedup = [...new Set(pts)]
    if (dedup.length < 5) dedup.push(words.length)
    const parts = dedup.slice(0, -1).map((s, i) => `${'ABCDE'[i]}) ${words.slice(s, dedup[i + 1]).join(' ')}`).filter((p) => p.split(')')[1].trim().length > 0)
    const errPart = parts.find((p) => errPhrase.toLowerCase().split(' ').some((w) => w.length > 1 && p.toLowerCase().includes(w))) || parts[Math.min(2, parts.length - 1)]
    const errLabel = errPart.split(')')[0]
    const q = `In the following question, a sentence is divided into parts. Find the part that contains an error; if there is no error, mark 'No error'. ${parts.join(' / ')}`
    const opts = shuffle([errLabel, ...'ABCDE'.split('').filter((l) => l !== errLabel).slice(0, 3), 'No error'])
    out.set(q, mkq(q, errLabel, opts.filter((o) => o !== errLabel).slice(0, 4), `${why} → error is in part ${errLabel}: "${errPhrase}" should be "${fix.split('→').slice(-1)[0].trim()}".`, 'med', t))
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
  B('Arrange: (a) This widened the tax base. (b) GST replaced a patchwork of indirect taxes. (c) Compliance became simpler. (d) It unified the national market.', ['b-d-a-c', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'b-c-d-a'], 0, 'Opener = GST reform (b) → unified market (d) → widened base (a) → simpler compliance (c).', 'med', t),
  B('Arrange: (a) Consequently, retail participation surged. (b) Brokers offered zero-brokerage plans. (c) Trading apps became free. (d) Account opening went fully digital.', ['d-c-b-a', 'a-b-c-d', 'c-d-b-a', 'b-a-d-c', 'd-b-c-a'], 0, 'Digital onboarding (d) → free apps (c) → zero-brokerage (b) → surge (a).', 'med', t),
  B('Arrange: (a) The committee submitted its report. (b) SEBI constituted a panel. (c) It recommended tighter norms. (d) The norms were then notified.', ['b-a-c-d', 'a-b-c-d', 'b-c-a-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Panel formed (b) → report submitted (a) → recommendations (c) → notified (d).', 'med', t),
  B('Arrange: (a) However, implementation lagged. (b) The policy promised faster clearances. (c) Backlogs kept growing. (d) Audits later exposed the delay.', ['b-a-c-d', 'a-b-c-d', 'b-c-a-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Promise (b) → "However" pivot (a) → backlog evidence (c) → audit confirmation (d).', 'med', t),
  B('Arrange: (a) Such integration enabled real-time settlement. (b) Payment rails merged with banking APIs. (c) UPI volumes exploded. (d) This transformed retail payments.', ['b-a-c-d', 'a-b-c-d', 'b-c-a-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Rails merged (b) → real-time settlement (a) → volumes exploded (c) → transformation (d).', 'med', t),
  B('Arrange: (a) The regulator responded with graded surveillance. (b) Unusual volumes were flagged. (c) A pump-and-dump scheme emerged. (d) Retail investors bore losses.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Scheme (c) → volumes flagged (b) → losses (d) → regulatory response (a).', 'med', t),
  B('Arrange: (a) Therefore, defaults fell sharply. (b) Banks adopted early-warning systems. (c) Stressed loans were flagged sooner. (d) Recovery improved.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Adopted systems (b) → flagged sooner (c) → recovery improved (d) → defaults fell (a).', 'med', t),
  B('Arrange: (a) The circular mandated disclosures. (b) Mutual funds complained about cost. (c) SEBI defended the investor-first intent. (d) Compliance eventually became routine.', ['a-b-c-d', 'a-c-b-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Mandate (a) → industry pushback (b) → SEBI\'s defense (c) → routine compliance (d).', 'med', t),
  B('Arrange: (a) Initially, settlement took a week. (b) T+2 compressed it. (c) T+1 then became the standard. (d) T+0 pilots now run for select securities.', ['a-b-c-d', 'a-c-b-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Timeline: week → T+2 → T+1 → T+0 pilot — "Initially" marks the start.', 'med', t),
  B('Arrange: (a) The index rallied to new highs. (b) Foreign inflows returned. (c) Global cues turned positive. (d) Domestic investors added positions.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Global cues (c) → FII inflows (b) → domestic buying (d) → highs (a).', 'med', t),
  B('Arrange: (a) Candidates must verify eligibility first. (b) The application window opens in June. (c) Fees are paid online. (d) Admit cards release two weeks before the exam.', ['b-a-c-d', 'a-b-c-d', 'b-c-a-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Window opens (b) → eligibility check (a) → fees (c) → admit cards (d).', 'med', t),
  B('Arrange: (a) This exposed gaps in disclosure. (b) Several IPOs underperformed. (c) Analysts questioned pricing. (d) SEBI tightened offer-document norms.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'IPOs underperformed (b) → analysts questioned (c) → gaps exposed (a) → norms tightened (d).', 'med', t),
  B('Arrange: (a) The passage argues for balanced regulation. (b) Innovation needs room to grow. (c) Yet investor protection cannot slip. (d) The regulator must therefore steer between both.', ['a-b-c-d', 'a-c-b-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Thesis (a) → side 1 (b) → "Yet" pivot (c) → synthesis (d).', 'med', t),
  B('Arrange: (a) Data quality improved dramatically. (b) Firms digitised records. (c) Regulators gained visibility. (d) Audits ran faster.', ['b-a-c-d', 'a-b-c-d', 'b-c-a-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Digitised (b) → quality improved (a) → regulator visibility (c) → faster audits (d).', 'med', t),
  B('Arrange: (a) Moreover, the scheme added insurance cover. (b) The government launched the scheme. (c) Enrolment crossed targets. (d) Beneficiaries reported real payouts.', ['b-a-c-d', 'a-b-c-d', 'b-c-a-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Launch (b) → "Moreover" addition (a) → enrolment (c) → payouts (d).', 'med', t),
  B('Arrange: (a) In this way, liquidity dried up. (b) Lenders tightened standards. (c) Credit growth stalled. (d) Borrowers defaulted in waves.', ['b-d-c-a', 'a-b-c-d', 'b-c-d-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Tightened standards (b) → defaults (d) → credit stalled (c) → liquidity dried (a).', 'med', t),
  B('Arrange: (a) The verdict upheld the provision. (b) Petitioners challenged the law. (c) The court heard arguments for weeks. (d) Appeals then followed.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Challenge (b) → hearings (c) → verdict (a) → appeals (d).', 'med', t),
  B('Arrange: (a) As a result, hiring slowed. (b) Companies faced margin pressure. (c) Input costs kept rising. (d) Demand weakened abroad.', ['d-c-b-a', 'a-b-c-d', 'c-d-b-a', 'd-b-c-a', 'b-a-c-d'], 0, 'Weak demand (d) → rising costs (c) → margin pressure (b) → hiring slowed (a).', 'med', t),
  B('Arrange: (a) The pilot covered five districts. (b) Results were published next quarter. (c) The scheme was first announced. (d) A national rollout followed.', ['c-a-b-d', 'a-b-c-d', 'c-b-a-d', 'd-b-a-c', 'b-a-c-d'], 0, 'Announced (c) → pilot (a) → results (b) → rollout (d).', 'med', t),
  B('Arrange: (a) Such leaks undermined trust. (b) Data breaches surfaced at several firms. (c) Regulators demanded audits. (d) Penalties were imposed.', ['b-a-c-d', 'a-b-c-d', 'b-c-a-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Breaches (b) → trust hit (a) → audits demanded (c) → penalties (d).', 'med', t),
  B('Arrange: (a) Therefore, the clause was dropped. (b) Stakeholders objected to the draft. (c) A consultation paper invited comments. (d) The draft proposed strict timelines.', ['c-d-b-a', 'a-b-c-d', 'd-c-b-a', 'c-b-d-a', 'b-a-c-d'], 0, 'Consultation (c) → draft with timelines (d) → objections (b) → clause dropped (a).', 'med', t),
  B('Arrange: (a) The reforms were then codified. (b) A task force studied global models. (c) Its report recommended phased adoption. (d) Parliament debated the bill.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Study (b) → recommendation (c) → debate (d) → codified (a).', 'med', t),
  B('Arrange: (a) Eventually, the index recovered. (b) Panic selling gripped the market. (c) Circuit breakers halted trading. (d) Value buyers stepped in.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Panic (b) → halts (c) → value buyers (d) → recovery (a).', 'med', t),
  B('Arrange: (a) The merger created the largest lender. (b) Two banks announced a merger. (c) Shareholders approved the plan. (d) Regulators cleared the deal.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Announced (b) → shareholder approval (c) → regulator clearance (d) → largest lender (a).', 'med', t),
  B('Arrange: (a) This sped up investigations. (b) The regulator digitised complaints. (c) A central dashboard tracked each case. (d) Resolution times fell sharply.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Digitised (b) → dashboard tracking (c) → faster probes (a) → times fell (d).', 'med', t),
  B('Arrange: (a) The finding startled policymakers. (b) A survey covered ten thousand households. (c) It revealed low financial literacy. (d) New curriculum changes followed.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Survey (b) → low literacy found (c) → startled policymakers (a) → curriculum changes (d).', 'med', t),
  B('Arrange: (a) Yields then spiked across tenors. (b) The central bank raised the repo rate. (c) Bond prices fell sharply. (d) Traders repriced expectations.', ['b-d-c-a', 'a-b-c-d', 'b-c-d-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Rate hike (b) → repricing (d) → prices fell (c) → yields spiked (a).', 'med', t),
  B('Arrange: (a) Adoption then spread nationwide. (b) The pilot tested biometric payouts. (c) Early results cut leakages. (d) A ministry reviewed the metrics.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Pilot (b) → results (c) → review (d) → nationwide adoption (a).', 'med', t),
  B('Arrange: (a) Consequently, the index surged. (b) Inflation cooled for three months. (c) Rate-cut bets resurfaced. (d) Investors rotated into equities.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Cooling inflation (b) → cut bets (c) → equity rotation (d) → surge (a).', 'med', t),
  B('Arrange: (a) That gap drew scrutiny. (b) The startup promised outsized returns. (c) Auditors found inflated valuations. (d) Investors demanded answers.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Promise (b) → inflated valuations found (c) → gap scrutiny (a) → demands (d).', 'med', t),
  B('Arrange: (a) Reforms gradually restored order. (b) The market fell into disarray. (c) Regulators intervened decisively. (d) Confidence rebuilt over time.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Disarray (b) → intervention (c) → reforms restore (a) → confidence (d).', 'med', t),
  B('Arrange: (a) Hence the report called for change. (b) Experts reviewed the framework. (c) They identified structural gaps. (d) Implementation stayed weak.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Review (b) → gaps found (c) → weak implementation (d) → call for change (a).', 'med', t),
  B('Arrange: (a) This narrowed the trade deficit. (b) Exports grew steadily. (c) Imports shrank under duties. (d) The currency stabilised.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Exports up (b) → imports down (c) → deficit narrowed (a) → currency stable (d).', 'med', t),
  B('Arrange: (a) In response, fines were levied. (b) Companies missed the deadline. (c) A compliance deadline was set. (d) Notices had been issued months earlier.', ['d-c-b-a', 'a-b-c-d', 'c-d-b-a', 'd-b-c-a', 'b-a-c-d'], 0, 'Notices (d) → deadline set (c) → missed (b) → fines (a).', 'med', t),
  B('Arrange: (a) The trend alarmed regulators. (b) Retail leverage kept climbing. (c) Margin books expanded fast. (d) Risk limits were then raised.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Leverage climbing (b) → margin books (c) → alarmed regulators (a) → limits raised (d).', 'med', t),
  B('Arrange: (a) The scheme outgrew its mandate. (b) It began as a pilot. (c) Success metrics were published. (d) Cabinet approval scaled it up.', ['b-c-d-a', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Pilot (b) → metrics (c) → scale-up approval (d) → outgrew mandate (a).', 'med', t),
  B('Arrange: (a) Markets cheered the clarity. (b) The tax regime had confused investors. (c) A new framework was notified. (d) Litigation finally subsided.', ['b-c-d-a', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Confusion (b) → framework (c) → litigation subsided (d) → markets cheered (a).', 'med', t),
  B('Arrange: (a) These findings shaped the reform. (b) Inspectors toured the branches. (c) They documented weak controls. (d) The audit was commissioned.', ['d-b-c-a', 'a-b-c-d', 'd-c-b-a', 'b-a-c-d', 'c-a-b-d'], 0, 'Audit commissioned (d) → inspectors toured (b) → weak controls found (c) → shaped reform (a).', 'med', t),
  B('Arrange: (a) Settlement discipline improved. (b) Penalties for fails were introduced. (c) Fails had been rising for months. (d) Exchanges monitored daily.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Rising fails (c) → penalties (b) → daily monitoring (d) → discipline improved (a).', 'med', t),
  B('Arrange: (a) The platform went live nationally. (b) States signed on gradually. (c) A working group built the spec. (d) The pilot validated throughput.', ['c-d-b-a', 'a-b-c-d', 'c-b-d-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Spec built (c) → pilot validated (d) → states signed (b) → went live (a).', 'med', t),
  B('Arrange: (a) Hence, the circular was withdrawn. (b) Industry flagged impossible deadlines. (c) The regulator sought feedback. (d) The original draft set tight timelines.', ['d-b-c-a', 'a-b-c-d', 'd-c-b-a', 'b-a-c-d', 'c-a-b-d'], 0, 'Draft timelines (d) → industry flagged (b) → feedback sought (c) → withdrawn (a).', 'med', t),
  B('Arrange: (a) Trust returned to the segment. (b) The scam had eroded credibility. (c) Fresh oversight norms arrived. (d) Volumes recovered over quarters.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Credibility eroded (b) → new norms (c) → volumes recovered (d) → trust returned (a).', 'med', t),
  B('Arrange: (a) This attracted foreign partners. (b) The corridor was announced. (c) Regulatory sandboxes ran pilots. (d) Cross-border rails were linked.', ['b-c-d-a', 'a-b-c-d', 'b-d-c-a', 'd-b-a-c', 'c-a-b-d'], 0, 'Corridor announced (b) → sandbox pilots (c) → rails linked (d) → foreign partners (a).', 'med', t),
  B('Arrange: (a) Compliance costs then fell. (b) Filings were consolidated. (c) Multiple forms had burdened firms. (d) A single-window portal launched.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Burden of forms (c) → consolidation (b) → portal launched (d) → costs fell (a).', 'med', t),
  B('Arrange: (a) The court struck the clause down. (b) Petitioners argued it overreached. (c) The amendment had passed quietly. (d) Years of dispute followed.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Amendment passed (c) → petitioners argued (b) → years of dispute (d) → struck down (a).', 'med', t),
  B('Arrange: (a) Losses mounted through the quarter. (b) Demand collapsed overnight. (c) Inventories piled up. (d) Margins were squeezed hard.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Demand collapse (b) → inventories pile (c) → losses mount (a) → margins squeezed (d).', 'med', t),
  B('Arrange: (a) That evidence anchored the case. (b) Investigators gathered records. (c) Whistle-blower tips initiated the probe. (d) Charges were finally filed.', ['c-b-a-d', 'a-b-c-d', 'c-a-b-d', 'd-b-a-c', 'b-a-c-d'], 0, 'Tips (c) → records gathered (b) → evidence anchored (a) → charges filed (d).', 'med', t),
  B('Arrange: (a) Awareness campaigns ran next. (b) Eligibility was widened. (c) Enrolment still lagged targets. (d) The benefit had launched early.', ['d-c-b-a', 'a-b-c-d', 'd-b-c-a', 'c-a-b-d', 'b-a-c-d'], 0, 'Launched (d) → enrolment lagged (c) → eligibility widened (b) → campaigns (a).', 'med', t),
  B('Arrange: (a) The rating was then upgraded. (b) Deleveraging reduced debt. (c) Cash flows stabilised first. (d) Agencies reviewed the profile.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Cash flows stabilised (c) → deleveraging (b) → review (d) → upgrade (a).', 'med', t),
  B('Arrange: (a) The backlog cleared within weeks. (b) A special drive processed pending claims. (c) Complaints had piled up for months. (d) Staffing was temporarily doubled.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Pile-up (c) → special drive (b) → doubled staffing (d) → cleared (a).', 'med', t),
  B('Arrange: (a) The fund reopened for subscriptions. (b) A side-pocket was created for stressed assets. (c) Redemption pressure had forced a freeze. (d) Valuations were marked down first.', ['c-d-b-a', 'a-b-c-d', 'c-b-d-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Freeze (c) → markdowns (d) → side-pocket (b) → reopened (a).', 'med', t),
  B('Arrange: (a) Turnover then doubled. (b) A new category of members was admitted. (c) The exchange had stagnated for years. (d) Listing rules were relaxed slightly.', ['c-d-b-a', 'a-b-c-d', 'c-b-d-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Stagnation (c) → relaxed rules (d) → new members (b) → doubled turnover (a).', 'med', t),
  B('Arrange: (a) The directive took effect next quarter. (b) Comments were solicited publicly. (c) A draft directive was published. (d) Final language incorporated the feedback.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Draft (c) → public comments (b) → final language (d) → took effect (a).', 'med', t),
  B('Arrange: (a) This halved onboarding time. (b) Manual checks were removed. (c) e-KYC integration went live. (d) Verification became automated.', ['c-d-b-a', 'a-b-c-d', 'c-b-d-a', 'd-b-a-c', 'b-a-c-d'], 0, 'e-KYC live (c) → automated verification (d) → manual checks removed (b) → halved time (a).', 'med', t),
  B('Arrange: (a) Appeals piled up in tribunal. (b) The order penalised several firms. (c) An investigation found collusion. (d) Penalties were contested immediately.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Collusion found (c) → order penalised (b) → contested (d) → appeals piled (a).', 'med', t),
  B('Arrange: (a) The default triggered cross-covenants. (b) The issuer missed its coupon. (c) Rating agencies downgraded fast. (d) Bondholders convened urgently.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Missed coupon (b) → downgrades (c) → cross-covenants triggered (a) → holders convened (d).', 'med', t),
  B('Arrange: (a) Surveillance alerts spiked. (b) A coordinated promotion ran on social media. (c) The stock surged on no news. (d) SEBI opened a probe.', ['b-c-a-d', 'a-b-c-d', 'b-a-c-d', 'd-b-a-c', 'c-a-b-d'], 0, 'Promotion (b) → surge on no news (c) → alerts spiked (a) → probe opened (d).', 'med', t),
  B('Arrange: (a) The framework was phased in over two years. (b) Regulators aligned on principles. (c) Cross-border issues demanded coordination. (d) A joint working group was formed.', ['c-d-b-a', 'a-b-c-d', 'c-b-d-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Cross-border need (c) → group formed (d) → principles aligned (b) → phased in (a).', 'med', t),
  B('Arrange: (a) Recovery was uneven across sectors. (b) The economy reopened gradually. (c) Lockdowns had halted activity. (d) Pent-up demand released in spurts.', ['c-b-d-a', 'a-b-c-d', 'c-d-b-a', 'd-b-a-c', 'b-a-c-d'], 0, 'Lockdowns (c) → reopening (b) → pent-up demand (d) → uneven recovery (a).', 'med', t),
  // ── Real 2025 format: arrange labeled phrases into one meaningful sentence ──
  B('Which arrangement forms a meaningful sentence? (A) the way people consume information today (B) the rapid expansion of social media platforms (C) has fundamentally transformed communication habits (D) over the past decade (E) owing to', ['C-D-A-B-E', 'E-B-C-D-A', 'E-B-A-C-D', 'C-E-D-A-B', 'C-D-E-A-B'], 2, 'E-B-A-C-D: "Owing to the rapid expansion of social media platforms the way people consume information today has fundamentally transformed communication habits over the past decade." — actual 2025 paper item.', 'hard', t),
  B('Which arrangement forms a meaningful sentence? (A) by prioritising immediate profits over long-term stability (B) many organisations weaken their own sustainability (C) although the long-term consequences are often foreseeable (D) eventually damaging stakeholder trust (E) for short-term gains', ['B-A-E-D-C', 'E-B-A-C-D', 'B-A-D-E-C', 'E-A-B-D-C', 'A-B-C-D-E'], 0, 'B-A-E-D-C: "Many organisations weaken their own sustainability by prioritising immediate profits over long-term stability for short-term gains, eventually damaging stakeholder trust, although the long-term consequences are often foreseeable." — actual 2025 pattern.', 'hard', t),
  B('Arrange into a coherent sentence: (A) in emerging markets (B) regulatory oversight (C) has struggled to keep pace (D) with the speed of financial innovation', ['B-C-D-A', 'A-B-C-D', 'B-A-C-D', 'C-D-B-A', 'D-B-A-C'], 0, 'B-C-D-A: "Regulatory oversight has struggled to keep pace with the speed of financial innovation in emerging markets."', 'med', t),
  B('Arrange into a coherent sentence: (A) to protect retail participants (B) stricter disclosure norms (C) were introduced by the regulator (D) amid rising derivative losses', ['C-B-D-A', 'B-C-D-A', 'C-D-B-A', 'D-C-B-A', 'B-D-C-A'], 0, 'C-B-D-A: "Stricter disclosure norms were introduced by the regulator amid rising derivative losses to protect retail participants."', 'med', t),
  B('Arrange into a coherent sentence: (A) across rural districts (B) financial literacy programmes (C) have expanded steadily (D) over the last five years', ['B-C-D-A', 'A-B-C-D', 'B-D-C-A', 'C-B-D-A', 'D-C-B-A'], 0, 'B-C-D-A: "Financial literacy programmes have expanded steadily over the last five years across rural districts."', 'med', t),
]

const bankSwap = (t) => [
  // Real-2025-format: which labeled word pair(s) must swap for the sentence to make sense.
  B('The scientist (A) endorsed the hypothesis as (B) untenable, but later (C) dismissed it after fresh evidence proved it (D) plausible.', ['A-C', 'A-B', 'B-D', 'C-D', 'sentence is correct'], 2, 'B<->D: endorsed...as plausible, dismissed after evidence proved it untenable. (Real 2025 pattern.)', 'hard', t),
  B('The manager (A) reprimanded the employees for their (B) exemplary performance and (C) appreciated those who displayed (D) negligence during the audit.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 1, 'B<->D: reprimanded for negligence + appreciated exemplary work. (Real 2025 pattern.)', 'hard', t),
  B('The exchange (A) halted trading amid (B) orderly conditions and (C) resumed once markets turned (D) chaotic.', ['A-C', 'B-D', 'A-B', 'B-C', 'sentence is correct'], 1, 'B<->D: halted amid chaos, resumed once orderly.', 'hard', t),
  B('Investors (A) welcomed the fund\'s (B) erratic track record and (C) avoided schemes showing (D) consistent returns.', ['A-C', 'B-D', 'A-D', 'B-C', 'sentence is correct'], 1, 'B<->D: welcomed consistent returns, avoided erratic funds.', 'hard', t),
  B('Traders (A) ignored the (B) explicit warning and (C) acted on the (D) ambiguous rumour.', ['B-D', 'A-C', 'A-B', 'C-D', 'sentence is correct'], 0, 'B<->D: ignored the ambiguous rumour, acted on the explicit warning.', 'hard', t),
  B('The pilot (A) landed the aircraft in (B) zero visibility and (C) diverted it once the skies turned (D) clear.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 1, 'B<->D: landed in clear skies, diverted at zero visibility.', 'hard', t),
  B('The jury (A) convicted the defendant on (B) forged evidence and (C) acquitted the suspect despite (D) solid proof.', ['A-C', 'B-D', 'A-B', 'B-C', 'sentence is correct'], 1, 'B<->D: convicted on solid proof, acquitted despite forged evidence.', 'hard', t),
  B('The policy (A) accelerated inflation while (B) curbing growth and (C) stabilising the (D) volatile rupee.', ['A-B', 'B-D', 'A-C', 'C-D', 'sentence is correct'], 0, 'A<->B: curbing inflation while accelerating growth + stabilising the rupee.', 'hard', t),
  B('The tribunal (A) upheld the appeal and (B) dismissed the (C) merits while (D) noting procedural flaws.', ['A-B', 'B-D', 'A-C', 'C-D', 'sentence is correct'], 0, 'A<->B: dismissed the appeal while noting flaws.', 'hard', t),
  B('The reform (A) deepened market (B) fragility and (C) weakened overall (D) resilience.', ['B-D', 'A-C', 'A-B', 'C-D', 'sentence is correct'], 0, 'B<->D: deepened resilience + weakened fragility.', 'hard', t),
  B('The audit (A) cleared the (B) irregular entries and (C) questioned the (D) clean ledgers.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 0, 'A<->C: questioned the irregular entries + cleared the clean ledgers.', 'hard', t),
  B('The draft (A) mandated audits for (B) exempt entities and (C) exempted the (D) obligated ones.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 0, 'A<->C: exempted the exempt, mandated the obligated.', 'hard', t),
  B('The analyst (A) overestimated the (B) downside risks and (C) underestimated the (D) upside potential.', ['A-C', 'B-D', 'A-B', 'B-C', 'sentence is correct'], 4, 'Coherent - overestimated downside + underestimated upside is consistent caution.', 'med', t),
  B('The circular (A) relaxed compliance for (B) large issuers and (C) tightened it for (D) small firms.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 4, 'Consistent - asymmetric rules are plausible; no swap.', 'med', t),
  B('The fund (A) outperformed the index during (B) calm markets and (C) underperformed it in (D) volatile phases.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 4, 'Plausible as written - strong calm-market fund, weak in volatility.', 'med', t),
  B('The mentor (A) discouraged questions and (B) rewarded silence, (C) punishing those who (D) spoke up.', ['A-B', 'B-D', 'A-C', 'C-D', 'sentence is correct'], 4, 'Consistent - a punitive mentor; nothing contradicts.', 'med', t),
  B('The regulator (A) tightened norms to (B) curb speculation while (C) easing rules that (D) hampered liquidity.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 4, 'Coherent - tighten to curb + ease what hampered liquidity.', 'med', t),
  B('The clerk (A) filed the report under (B) urgent and (C) archived the memo marked (D) routine.', ['A-C', 'B-D', 'A-B', 'B-C', 'sentence is correct'], 4, 'Sensible as written - urgent filed, routine archived.', 'easy', t),
  B('The coach (A) benched the striker for (B) repeated errors and (C) fielded the defender despite (D) poor form.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 4, 'Internally consistent - benched for errors + fielded despite poor form.', 'med', t),
  B('The report (A) flagged the risk as (B) severe and (C) rated the exposure (D) negligible.', ['A-C', 'B-D', 'A-B', 'C-D', 'sentence is correct'], 4, 'Coherent — severe risk flagged, negligible exposure rated low.', 'med', t),
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
  B('"The manager, along with his team, ______ present."', ['were', 'was', 'are', 'have been', 'be'], 1, '"Along with" phrases don\'t pluralize — subject stays "manager" (singular).', 'hard', t),
  B('"Neither of the answers ______ correct."', ['were', 'was', 'are', 'be', 'have'], 1, 'Neither of → singular.', 'easy', t),
  B('"A pair of scissors ______ on the desk."', ['are', 'is', 'were', 'be', 'have'], 1, '"A pair of" → singular verb.', 'med', t),
  B('"The police ______ arrested the suspect."', ['has', 'have', 'is', 'was', 'be'], 1, 'Police = always plural.', 'med', t),
  B('"Economics ______ a difficult subject."', ['are', 'is', 'were', 'be', 'have'], 1, 'Subjects ending in -ics → singular.', 'easy', t),
  B('"Two-thirds of the work ______ done."', ['are', 'is', 'were', 'be', 'have'], 1, 'Fraction + uncountable → singular.', 'med', t),
  B('"The news ______ shocking."', ['are', 'is', 'were', 'be', 'have'], 1, 'News = uncountable singular.', 'easy', t),
  B('"There ______ a boy and two girls in the room."', ['were', 'was', 'are', 'be', 'have'], 1, 'Proximity rule — verb agrees with nearest subject (a boy).', 'hard', t),
  B('"Either the students or the teacher ______ wrong."', ['are', 'is', 'were', 'be', 'have'], 1, 'Either/or → nearer subject (teacher) → singular.', 'hard', t),
  B('"The majority of voters ______ in favour."', ['was', 'were', 'is', 'be', 'has been'], 1, '"Majority of" + plural → plural verb.', 'med', t),
  B('"Mathematics ______ his strongest subject."', ['are', 'is', 'were', 'be', 'have'], 1, '-ics subjects → singular.', 'easy', t),
  B('"Bread and butter ______ served."', ['are', 'is', 'were', 'be', 'have'], 1, 'One combined dish → singular.', 'med', t),
  B('"The information ______ accurate."', ['are', 'is', 'were', 'be', 'have'], 1, 'Information uncountable → singular.', 'easy', t),
  B('"A group of students ______ protesting."', ['was', 'were', 'is', 'be', 'has'], 1, 'Group acting as one → singular.', 'med', t),
  B('"Fifty rupees ______ a fair price."', ['are', 'is', 'were', 'be', 'have'], 1, 'Sum treated as one amount → singular.', 'med', t),
  B('"The number of complaints ______ rising."', ['are', 'is', 'were', 'be', 'have'], 1, '"The number of" → singular.', 'easy', t),
  B('"Neither my parents nor my sister ______ coming."', ['are', 'is', 'were', 'be', 'have'], 1, 'Nearer subject (sister) → singular.', 'hard', t),
  B('"Scissors ______ sharp."', ['is', 'are', 'was', 'be', 'has'], 1, 'Scissors plural.', 'easy', t),
  B('"Every man and every woman ______ a vote."', ['have', 'has', 'are', 'were', 'be'], 1, 'Every + every → singular.', 'med', t),
  B('"Neither of the two candidates ______ selected."', ['were', 'was', 'are', 'be', 'have'], 1, 'Neither of → singular.', 'easy', t),
  B('"The pair of trousers ______ torn."', ['are', 'is', 'were', 'be', 'have'], 1, '"A pair of" → singular.', 'med', t),
  B('"Physics ______ a tough paper."', ['are', 'is', 'were', 'be', 'have'], 1, '-ics subject → singular.', 'easy', t),
  B('"Half of the apples ______ rotten."', ['was', 'were', 'is', 'be', 'has'], 1, 'Half of + countable plural → plural.', 'hard', t),
  B('"The cattle ______ grazing."', ['is', 'are', 'was', 'be', 'has'], 1, 'Cattle = always plural.', 'med', t),
  B('"Each of the officers ______ a badge."', ['carry', 'carries', 'are carrying', 'be carrying', 'have'], 1, 'Each of → singular.', 'easy', t),
  B('"Many a trainee ______ failed this test."', ['have', 'has', 'are', 'were', 'be'], 1, 'Many a → singular.', 'hard', t),
  B('"Neither the chief nor the deputies ______ notified."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Neither/nor → nearer subject plural.', 'hard', t),
  B('"The staff ______ divided on the issue."', ['is', 'are', 'was', 'be', 'has'], 1, 'Staff acting as individuals → plural.', 'hard', t),
  B('"Either the files or the clerk ______ misplaced."', ['are', 'is', 'were', 'be', 'have'], 1, 'Either/or → nearer subject (clerk) singular.', 'hard', t),
  B('"The series of questions ______ tough."', ['were', 'was', 'are', 'be', 'have'], 1, 'Series = singular.', 'med', t),
  B('"One-third of the seats ______ vacant."', ['was', 'were', 'is', 'be', 'has'], 1, 'Fraction + countable plural → plural.', 'med', t),
  B('"The jury ______ reached a verdict."', ['have', 'has', 'are', 'were', 'be'], 1, 'Jury as one body → singular.', 'med', t),
  B('"Five hundred rupees ______ spent."', ['were', 'was', 'are', 'be', 'have'], 1, 'Amount as single sum → singular.', 'med', t),
  B('"Improve: He did not replied on time."', ['did not reply', 'did not replies', 'does not replied', 'did not replying', 'no improvement'], 0, 'did not + base form.', 'easy', t),
  B('"Improve: She is senior than me in service."', ['senior to me', 'senior then me', 'more senior than me', 'senior from me', 'no improvement'], 0, 'senior → "to".', 'med', t),
  B('"Improve: He is capable to finish it."', ['capable of finishing', 'capable for finishing', 'capable in finishing', 'capable finishing', 'no improvement'], 0, 'capable + of + -ing.', 'med', t),
  B('"Improve: I am interested for the role."', ['interested in', 'interested at', 'interested on', 'interested about', 'no improvement'], 0, 'interested + in.', 'easy', t),
  B('"Improve: They discussed about the report."', ['discussed the report', 'discussed over the report', 'discussed upon the report', 'discussed for the report', 'no improvement'], 0, 'discuss + object directly.', 'med', t),
  B('"Improve: Despite of the delay, it shipped."', ['Despite the delay', 'Despite for the delay', 'Despite in the delay', 'Despite on the delay', 'no improvement'], 0, 'despite never takes "of".', 'med', t),
  B('"Improve: He prevented me to leave."', ['from leaving', 'for leaving', 'in leaving', 'at leaving', 'no improvement'], 0, 'prevent + from + -ing.', 'med', t),
  B('"The number of visitors ______ rising."', ['are', 'is', 'were', 'be', 'have'], 1, '"The number of" → singular.', 'easy', t),
  B('"A number of complaints ______ filed."', ['was', 'were', 'is', 'be', 'has been'], 1, '"A number of" → plural.', 'med', t),
  B('"Neither the officers nor the clerk ______ ready."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Nearer subject (clerk) → singular.', 'hard', t),
  B('"Neither the clerk nor the officers ______ ready."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Nearer subject (officers) → plural.', 'hard', t),
  B('"The news ______ broadcast at nine."', ['were', 'was', 'are', 'be', 'have been'], 1, 'News uncountable → singular.', 'easy', t),
  B('"Politics ______ a rough game."', ['are', 'is', 'were', 'be', 'have'], 1, '-ics subject → singular.', 'easy', t),
  B('"The furniture in the hall ______ new."', ['are', 'is', 'were', 'be', 'have'], 1, 'Furniture uncountable → singular.', 'easy', t),
  B('"The luggage ______ arrived safely."', ['have', 'has', 'are', 'were', 'be'], 1, 'Luggage uncountable → singular.', 'easy', t),
  B('"The advice ______ useful."', ['were', 'was', 'are', 'be', 'have been'], 1, 'Advice uncountable → singular.', 'easy', t),
  B('"Many a candidate ______ failed the test."', ['have', 'has', 'are', 'were', 'be'], 1, 'Many a → singular.', 'hard', t),
  B('"Each of the reports ______ verified."', ['were', 'was', 'are', 'be', 'have been'], 1, 'Each of → singular.', 'easy', t),
  B('"One of the machines ______ broken."', ['are', 'is', 'were', 'be', 'have been'], 1, 'One of → singular.', 'easy', t),
  B('"The majority of members ______ present."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Majority of + plural → plural.', 'med', t),
  B('"Half of the budget ______ spent."', ['were', 'was', 'are', 'be', 'have been'], 1, 'Half of uncountable → singular.', 'med', t),
  B('"Half of the employees ______ absent."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Half of countable → plural.', 'med', t),
  B('"The captain along with players ______ arrived."', ['have', 'has', 'are', 'were', 'be'], 1, '"Along with" → verb follows first subject.', 'hard', t),
  B('"My uncle as well as my cousins ______ here."', ['are', 'is', 'were', 'be', 'have been'], 1, '"As well as" → first subject wins.', 'hard', t),
  B('"There ______ several letters on the desk."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Several letters → plural.', 'easy', t),
  B('"Either she or her brothers ______ invited."', ['was', 'were', 'is', 'be', 'has been'], 1, 'Nearer subject (brothers) → plural.', 'hard', t),
  B('"Either the brothers or she ______ invited."', ['were', 'was', 'are', 'be', 'have been'], 1, 'Nearer subject (she) → singular.', 'hard', t),
  B('"The data ______ analysed carefully."', ['were', 'was', 'are', 'be', 'have been'], 1, 'Data (formal singular) → singular in exam usage.', 'med', t),
  B('"Improve: No sooner did he leave when it rained."', ['than it rained', 'then it rained', 'that it rained', 'as it rained', 'no improvement'], 0, 'no sooner + than.', 'med', t),
  B('"Improve: Hardly had she slept than the phone rang."', ['when the phone rang', 'then the phone rang', 'that the phone rang', 'as the phone rang', 'no improvement'], 0, 'hardly/scarcely + when.', 'med', t),
  B('"Improve: He is enough strong to lift it."', ['strong enough', 'enough strongly', 'strongly enough', 'much strong', 'no improvement'], 0, 'enough comes after the adjective.', 'med', t),
  B('"Improve: She is more taller than him."', ['taller', 'most taller', 'much more taller', 'very taller', 'no improvement'], 0, 'Double comparative — drop "more".', 'easy', t),
  B('"Improve: This is the most unique piece."', ['a unique piece', 'most uniquier', 'more unique', 'very unique', 'no improvement'], 0, 'Unique is absolute.', 'med', t),
  B('"Improve: I reached to the venue early."', ['reached the venue', 'reached at the venue', 'reached for the venue', 'reached in the venue', 'no improvement'], 0, 'reach + place directly.', 'easy', t),
  B('"Improve: He entered into the building."', ['entered the building', 'entered at the building', 'entered in the building', 'entered for the building', 'no improvement'], 0, 'enter + place directly.', 'easy', t),
  B('"Improve: She is married with a banker."', ['married to a banker', 'married for a banker', 'married by a banker', 'married on a banker', 'no improvement'], 0, 'married + to.', 'easy', t),
  B('"Improve: I congratulate you for your win."', ['on your win', 'at your win', 'about your win', 'of your win', 'no improvement'], 0, 'congratulate + on.', 'med', t),
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
  B('Dematerialised securities are issued under which Act?', ['SCRA 1956', 'Depositories Act 1996', 'Companies Act 2013', 'RBI Act 1934', 'FEMA 1999'], 1, 'Depositories Act 1996 — NSDL/CDSL legal base.', 'med', t),
  B('The Securities Contracts (Regulation) Act is of which year?', ['1942', '1956', '1963', '1978', '1992'], 1, 'SCRA 1956 — governs stock exchanges and contracts.', 'med', t),
  B('A Forward Rate Agreement (FRA) primarily lets parties:', ['buy assets at a fixed future date', 'lock an interest rate for a future period on notional principal', 'swap currencies', 'insure credit default', 'settle trades same-day'], 1, 'FRA = interest-rate lock on notional principal — no principal exchange.', 'med', t),
  B('Money lent in the market for more than one day but less than fifteen days is called:', ['call money', 'notice money', 'term money', 'repo', 'reverse repo'], 1, 'Call = overnight; notice = 2–14 days; term = 15 days–1 year.', 'med', t),
  B('The day-count convention generally used for Indian bonds:', ['Actual/360', 'Actual/365', '30/360', 'Actual/Actual', '30/365'], 2, 'Indian bond market uses 30/360 for day counts.', 'hard', t),
  B('IOSCO\'s primary objective is:', ['monitor global financial stability', 'regulate trade policy', 'fund developing economies', 'set global standards for securities regulation', 'enforce tax compliance'], 3, 'IOSCO = the securities regulators\' standard-setter.', 'med', t),
  B('The instrument regarded as risk-free:', ['fixed deposits', 'corporate bonds', 'gilt securities', 'REITs', 'mutual funds'], 2, 'Gilt = government securities — sovereign backing, ~zero default risk.', 'easy', t),
  B('A Commercial Paper issuer must have minimum tangible net worth of:', ['₹1 crore', '₹4 crore', '₹10 crore', '₹15 crore', '₹25 crore'], 1, 'RBI CP directions: minimum tangible net worth ₹4 crore.', 'hard', t),
  B('Microfinance institutions lending to the sector are regulated by:', ['Ministry of Finance', 'RBI', 'NHB', 'NABARD', 'SEBI'], 1, 'RBI regulates the microfinance sector (NBFC-MFIs).', 'med', t),
  B('NABARD directly supervises:', ['primary cooperative banks', 'PACS', 'DCCBs', 'payment banks', 'all of these'], 2, 'NABARD inspects/supervises District Central Cooperative Banks.', 'hard', t),
  B('When RBI raises loans for State Governments it consults the Finance Ministry and:', ['SEBI', 'CAG', 'FIFMDA', 'DIPAM', 'NITI Aayog'], 1, 'CAG — per the Fiscal/statutory consultation requirement.', 'hard', t),
  B('Current yield of a 10% debenture (FV ₹1100) trading at ₹880:', ['10%', '12.5%', '8%', '11%', '80%'], 1, 'Coupon ₹110 / price ₹880 = 12.5%.', 'med', t),
  B('Under Companies Act 2013, loans by a company cannot exceed:', ['50% of paid-up capital + free reserves', '60% of paid-up share capital + free reserves + securities premium, or 100% of free reserves + securities premium — whichever higher', '40% of net worth', '25% of turnover', 'unlimited with board approval'], 1, 'Section 186 limit — 60% or 100%, whichever is higher.', 'hard', t),
  B('Every company must furnish directors\' DIN to the Registrar within:', ['7 days', '15 days', '30 days', '45 days', '60 days'], 1, 'Section 156 — 15 days from intimation.', 'hard', t),
  B('Appeals against Appellate Tribunal orders go to the Supreme Court within:', ['20 days', '30 days', '45 days', '60 days', '90 days'], 3, '60 days from receipt of the order.', 'hard', t),
  B('The "going concern" assumption means:', ['the firm winds up soon', 'operations continue indefinitely / foreseeable future', 'liquidation in 6 months', 'merger is certain', 'assets are sold first'], 1, 'Business continues in the foreseeable future — accounting bedrock.', 'easy', t),
  B('Quick ratio = (Current Assets − Inventory) / Current Liabilities. With CA ₹20L, Inventory ₹8L, CL ₹8L:', ['1.50', '0.75', '1.25', '1.75', '2.50'], 0, '(20−8)/8 = 1.5 — strips inventory out because it\'s the least liquid asset.', 'med', t),
  B('SEBI\'s powers include:', ['register + regulate market intermediaries', 'print currency', 'set repo rate', 'appoint RBI Governor', 'issue bank licences'], 0, 'Registration, regulation, enforcement over securities intermediaries.', 'easy', t),
  B('The SEBI Act was passed in:', ['1992', '1988', '1956', '1996', '2002'], 0, '1992 — statutory powers.', 'easy', t),
  B('SEBI regulates which of the following?', ['stock exchanges, brokers, MFs, AIFs, CRAs', 'only banks', 'only insurers', 'only NBFCs', 'only PSU firms'], 0, 'All capital-market intermediaries.', 'easy', t),
  B('An "insider" under PIT Regs includes:', ['persons with unpublished price-sensitive info', 'any employee', 'only directors', 'brokers only', 'auditors only'], 0, 'UPSI holders — broad definition.', 'med', t),
  B('UPSI stands for:', ['Unpublished Price Sensitive Information', 'Unified Payment Settlement Info', 'Unlisted Public Stock Index', 'Universal Securities Identifier', 'None'], 0, 'The insider-trading definition core.', 'easy', t),
  B('SEBI\'s ICDR Regulations govern:', ['capital & disclosure requirements for public issues', 'insider trading', 'takeovers', 'listing obligations', 'mutual funds'], 0, 'Issue of Capital & Disclosure Requirements — IPO rulebook.', 'med', t),
  B('SEBI (Prohibition of Fraudulent & Unfair Trade Practices) Regulations:', ['2003', '2015', '1992', '2011', '2020'], 0, 'PFUTP 2003 — market manipulation rulebook.', 'hard', t),
  B('A company listing shares must comply with:', ['LODR + ICDR', 'PIT only', 'SAST only', 'FEMA only', 'Companies Act only'], 0, 'ICDR for the issue, LODR for ongoing disclosure.', 'med', t),
  B('SEBI can issue which orders?', ['disgorgement, debarment, monetary penalties', 'imprisonment', 'demonetisation', 'tax revision', 'bank licence cancellation'], 0, 'Civil/administrative enforcement tools.', 'med', t),
  B('Green Shoe option in an IPO is:', ['over-allotment stabilisation option', 'a bonus share', 'a lock-in period', 'a listing fee', 'a dividend plan'], 0, 'Greenshoe — underwriter\'s stabilisation over-allotment.', 'med', t),
  B('Anchor investors in IPOs bid:', ['a day before the issue opens', 'after listing', 'with retail', 'post-allotment', 'at will'], 0, 'Anchor book opens one day before public issue.', 'med', t),
  B('QIB stands for:', ['Qualified Institutional Buyer', 'Quality Investment Body', 'Quoted Interest Bond', 'Quick Issue Book', 'None'], 0, 'Institutional IPO quota — 50%+ typically.', 'easy', t),
  B('ASBA in IPO applications means:', ['Application Supported by Blocked Amount', 'Auto Settlement Banking Account', 'Allotted Share Balance Account', 'Approved Securities Bid Amount', 'None'], 0, 'Funds stay blocked, not debited, until allotment.', 'med', t),
  B('Red Herring Prospectus lacks:', ['final price band/offer size details', 'risk factors', 'business description', 'promoter names', 'financials'], 0, 'RHP has everything except the final price — that\'s the point.', 'med', t),
  B('The book-building IPO price discovery happens via:', ['investor bids within a band', 'fixed lottery', 'SEBI pricing', 'exchange auction', 'promoter choice'], 0, 'Bids build the book within the price band.', 'med', t),
  B('Circuit filters on stocks apply to:', ['intraday price movement limits', 'trading hours', 'margin calls', 'IPO pricing', 'settlement'], 0, 'Price bands halt runaway moves — 5/10/20% typical.', 'med', t),
  B('Call auction sessions are used for:', ['price discovery of illiquid/special securities', 'all trades', 'only F&O', 'only IPOs', 'closing only'], 0, 'Periodic batch auction — SEBI mandates for illiquid scripts.', 'hard', t),
  B('An "unpaid dividend" lying unclaimed 7 years goes to:', ['IEPF', 'SEBI', 'RBI', 'the company', 'exchequer directly'], 0, 'Investor Education & Protection Fund — Section 124-125.', 'med', t),
  B('Block/bulk deals disclosure thresholds are set by:', ['SEBI', 'RBI', 'exchanges only', 'MCA', 'SAT'], 0, 'SEBI defines the reporting thresholds.', 'med', t),
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
  B(rc4Q('SEBI\'s study found approximately what share of retail F&O traders lose money?'), ['half', 'nine in ten', 'one in four', 'almost none', 'two-thirds'], 1, 'Stated: ~9 of 10 individual F&O traders lose.', 'easy', t),
  B(rc4Q('Which measure was NOT among SEBI\'s proposals?'), ['raising minimum contract size', 'one weekly expiry per exchange', 'higher upfront margins', 'a total F&O ban', 'all of these were proposed'], 3, 'A ban was NOT proposed — the three tightening steps were.', 'med', t),
  B(rc4Q('Industry\'s counter-argument to deeper measures was:'), ['they cost nothing', 'they could shrink liquidity', 'they are illegal', 'they help retail', 'they speed settlement'], 1, 'Industry warned of liquidity shrinkage.', 'med', t),
  B(rc4Q('Investor advocates\' criticism of the proposals was that they:'), ['go too far', 'barely dent the structural retail risk', 'ban trading', 'help only institutions', 'are unenforceable'], 1, 'Advocates argued the changes barely dent structural risk.', 'med', t),
  B(rc4Q('The passage\'s tone toward the F&O reforms is:'), ['celebratory', 'balanced — both industry and advocate views aired', 'hostile to SEBI', 'indifferent', 'purely technical'], 1, 'Both sides presented → balanced.', 'med', t),
  B(rc5Q('SEBI\'s regulatory philosophy is built primarily on:'), ['approving issue merits', 'mandated standardised disclosure', 'setting prices', 'guaranteeing returns', 'banning risky issues'], 1, 'Disclosure-based, not merit-based regulation.', 'easy', t),
  B(rc5Q('Merit-regulation critics argue regulators cannot reliably:'), ['print documents', 'judge business quality', 'list companies', 'collect fees', 'detect fraud'], 1, 'Stated directly — quality judgment is unreliable.', 'easy', t),
  B(rc5Q('"Sunlight is the better disinfectant" implies:'), ['punishment works best', 'accurate timely disclosure prevents misconduct', 'audits are useless', 'merit review wins', 'markets self-correct'], 1, 'Transparency as deterrence — the classic Brandeis framing.', 'med', t),
  B(rc5Q('The disclosure framework centres on which instruments?'), ['LODR obligations + prospectus contents + misstatement penalties', 'margin rules', 'settlement cycles', 'algo approvals', 'custodian rules'], 0, 'LODR + prospectus + penalties — the triad.', 'med', t),
  B(rc5Q('"Load-bearing wall" most nearly means:'), ['a minor feature', 'the foundational element', 'a temporary fix', 'a legal loophole', 'a decorative clause'], 1, 'Vocab-in-context — foundational/essential.', 'easy', t),
  B(rcQ('The passage\'s main idea is best captured as:'), ['automation should replace regulation', 'algorithmic surveillance plus human judgment', 'surveillance is unnecessary', 'SEBI lacks technology', 'false positives are rare'], 1, 'Pairing detection with human review = the thesis.', 'med', t),
  B(rcQ('A "false positive" in this context means:'), ['a correct flag', 'an innocent trader flagged wrongly', 'a delayed order', 'a cheap flag', 'a true scheme missed'], 1, 'Automated flags can wrongly accuse — hence human review.', 'med', t),
  B(rc2Q('"Order-to-trade ratio limits" are aimed at curbing:'), ['settlements', 'excessive order spam/cancellation relative to executions', 'IPO pricing', 'margin calls', 'custody'], 1, 'OTR limits penalise spam-ordering behaviour in algos.', 'hard', t),
  B(rc2Q('The passage implies fairness in algo markets requires:'), ['banning HFT', 'closing the co-location advantage gap', 'slower engines', 'more brokers', 'higher fees'], 1, 'The "structural gap" = co-location access asymmetry.', 'med', t),
  B(rc3Q('The passage suggests counterparty risk falls because:'), ['trades are bigger', 'settlement completes faster, shrinking exposure windows', 'fees are lower', 'brokers merge', 'papers are fewer'], 1, 'Shorter cycles = less time for a counterparty to fail.', 'med', t),
  B(rc3Q('"Near-continuous pipelines" replaced which older model?'), ['real-time feeds', 'batch processes', 'manual ledgers', 'weekly reports', 'paper filings'], 1, 'Batch → near-continuous, stated directly.', 'easy', t),
  B(rcQ('The word "signatures" most nearly means:'), ['documents', 'detectable patterns', 'legal marks', 'approvals', 'alerts'], 1, 'Vocab-in-context — insider-trading signatures = patterns.', 'med', t),
  B(rcQ('What risk of automated flags does the passage name?'), ['slow detection', 'destroyed reputations', 'high cost', 'missed trades', 'legal fines'], 1, 'False positives "can destroy reputations" — stated.', 'easy', t),
  B(rcQ('The mandatory stage added was:'), ['appeal hearing', 'human review', 'board sign-off', 'public notice', 'daily audit'], 1, 'Human-review stage before orders.', 'easy', t),
  B(rcQ('The passage implies the main benefit of algo-monitoring is:'), ['lower cost', 'speed of detection', 'fewer brokers', 'simpler rules', 'bigger trades'], 1, 'Flags "within minutes" — speed is the selling point.', 'med', t),
  B(rc2Q('Co-located servers give HFT firms:'), ['more storage', 'microsecond execution advantage', 'cheaper fees', 'legal immunity', 'bigger quotas'], 1, 'Latency shaving = the edge.', 'easy', t),
  B(rc2Q('The passage suggests SEBI\'s algo rules are:'), ['fully settled', 'incomplete — fairness unresolved', 'rolled back', 'voluntary', 'unneeded'], 1, '"Yet to fully resolve" — incomplete.', 'med', t),
  B(rc2Q('Kill-switch obligations sit with:'), ['exchanges', 'brokers', 'retail traders', 'SEBI staff', 'custodians'], 1, 'Brokers carry the kill-switch obligation.', 'easy', t),
  B(rc3Q('T+0 pilot applies to:'), ['all securities', 'select securities', 'bonds only', 'IPO days', 'F&O only'], 1, 'Pilot for select securities.', 'easy', t),
  B(rc3Q('The structural cost of T+1 named is:'), ['higher fees', 'tighter reconciliation windows', 'fewer traders', 'slower matching', 'more paperwork'], 1, 'Back-office squeeze — the tradeoff.', 'med', t),
  B(rc4Q('Weekly expiries were proposed to be limited to:'), ['two per exchange', 'one per exchange', 'none', 'monthly only', 'unlimited'], 1, 'One weekly expiry per exchange.', 'easy', t),
  B(rc4Q('Raising contract sizes primarily affects:'), ['institutions', 'retail minimum position size', 'exchanges', 'settlement', 'taxation'], 1, 'Bigger contracts → higher retail entry cost.', 'med', t),
  B(rc5Q('LODR obligations concern:'), ['listing disclosure requirements', 'margin rules', 'settlement', 'insider lists', 'algo speed'], 0, 'Listing Obligations and Disclosure Requirements.', 'easy', t),
  B(rc5Q('Misstatement under the framework draws:'), ['praise', 'penalties', 'nothing', 'warnings only', 'delisting always'], 1, 'Penalties for misstatement — the teeth.', 'easy', t),
  B(rc6Q('UPSI in the passage refers to:'), ['unpublished price-sensitive information', 'urgent public share issue', 'unified price system index', 'unregistered portfolio securities', 'unpaid share instalments'], 0, 'Unpublished Price Sensitive Information — the PIT core.', 'easy', t),
  B(rc6Q('Trading-window closures prevent designated persons from:'), ['trading during sensitive periods', 'leaving jobs', 'attending meetings', 'hiring staff', 'voting'], 0, 'Windows close around results/sensitive events.', 'easy', t),
  B(rc6Q('The enforcement difficulty identified is:'), ['too few rules', 'proving intent + tipper-tippee chains', 'low fines', 'slow courts only', 'no data'], 1, 'Intent proof + attribution chains — stated.', 'med', t),
  B(rc6Q('"Chains of tippers and tippees" refers to:'), ['communication networks', 'info passed insider→outsider chains', 'trade sequences', 'broker chains', 'audit trails'], 1, 'The passing of UPSI down a chain.', 'med', t),
  B(rc6Q('The passage\'s central claim is that insider trading:'), ['is harmless', 'corrupts the fairness premise of markets', 'helps liquidity', 'is easy to prosecute', 'is rare'], 1, 'Outside investors transfer wealth to the connected.', 'med', t),
  B(rc6Q('"Structured digital databases" track:'), ['trade prices', 'who knew UPSI, when', 'broker fees', 'settlement times', 'IPO bids'], 1, 'UPS I access logs — the attribution tool.', 'med', t),
  B(rcQ('The critics\' worry centers on:'), ['enforcement cost', 'false positives ruining reputations', 'slow audits', 'missing data', 'fewer trades'], 1, 'False positives → reputational damage.', 'easy', t),
  B(rcQ('Real-time analytics flag what within minutes?'), ['settlements', 'insider-trading signatures and pump-and-dump schemes', 'IPO bids', 'margin calls', 'audits'], 1, 'Stated directly.', 'easy', t),
  B(rc2Q('"Microseconds" emphasises that algo edge is about:'), ['volume', 'speed/latency', 'capital', 'leverage', 'data size'], 1, 'Latency is the currency of HFT.', 'med', t),
  B(rc4Q('The passage frames F&O reform as a balance between:'), ['speed vs cost', 'protection vs liquidity', 'retail vs foreign', 'tax vs profit', 'volume vs price'], 1, 'Tighter rules vs liquidity preservation.', 'med', t),
  B(rc5Q('SEBI does NOT judge:'), ['issue merits', 'disclosure completeness', 'misstatements', 'timeliness', 'document format'], 0, 'Disclosure, not merit — that\'s the model.', 'med', t),
]

const RC_PASSAGE3 = 'India\'s push toward a single settlement standard has compressed equity settlement from T+2 to T+1 and piloted same-day T+0 for select securities. Shorter cycles free collateral faster and cut counterparty risk, but compressed timelines squeeze back-office reconciliation windows and punish operational lags. Custodians and clearing corporations have had to re-engineer batch processes into near-continuous pipelines to keep pace.'
const rc3Q = (q) => '"' + RC_PASSAGE3 + '" — ' + q

const RC_PASSAGE = 'SEBI\'s surveillance systems increasingly rely on algorithmic monitoring to detect abnormal trading patterns. Real-time analytics flag insider-trading signatures and pump-and-dump schemes within minutes of occurrence. Critics argue that automated flags still demand human judgment before enforcement, since false positives can destroy reputations. The regulator has responded by pairing its detection stack with a mandatory human-review stage before any order is issued.'
const rcQ = (q) => '"' + RC_PASSAGE + '" — ' + q

const RC_PASSAGE4 = 'Index derivatives account for the bulk of turnover on Indian exchanges, but SEBI\'s own study found that roughly nine in ten individual F&O traders lose money. In response, the regulator proposed raising minimum contract sizes, limiting weekly expiries to one per exchange, and increasing upfront margins. Industry participants warned that deeper measures could shrink liquidity, while investor advocates argued the changes barely dented the structural risk retail traders face.'
const rc4Q = (q) => '"' + RC_PASSAGE4 + '" — ' + q

const RC_PASSAGE5 = 'Disclosure is the load-bearing wall of securities regulation. Rather than approving the merits of an issue, SEBI requires issuers to reveal risks in standardised offer documents, letting informed investors price them. Critics of merit regulation argue that regulators cannot reliably judge business quality, and that sunlight — accurate, timely, standardised disclosure — is the better disinfectant. The framework therefore centres on LODR obligations, prospectus contents, and penalties for misstatement.'
const rc5Q = (q) => '"' + RC_PASSAGE5 + '" — ' + q

const RC_PASSAGE6 = 'Insider trading erodes the premise that markets reward information asymmetries fairly. When corporate insiders trade on unpublished price-sensitive information, outside investors systematically transfer wealth to the connected. SEBI\'s PIT regulations therefore impose trading-window closures, disclosure duties on trades by designated persons, and structured digital databases tracking who knew what when. Enforcement remains difficult: intent is hard to prove, and chains of tippers and tippees complicate attribution.'
const rc6Q = (q) => '"' + RC_PASSAGE6 + '" — ' + q

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
  B('Money market instruments (T-bills, CP, CD) are regulated by:', ['RBI', 'SEBI', 'IRDAI', 'MCA', 'FIMMDA'], 0, 'RBI — money market is its turf.', 'med', t),
  B('Government securities market regulator:', ['RBI', 'SEBI', 'Both share oversight', 'MCA', 'Ministry of Finance'], 0, 'RBI manages G-sec issuance/trading; SEBI oversees listed side.', 'med', t),
  B('Payment systems (UPI, NEFT, RTGS) are regulated by:', ['NPCI alone', 'RBI', 'SEBI', 'MeitY', 'TRAI'], 1, 'RBI under PSS Act 2007; NPCI operates the rails.', 'med', t),
  B('Credit rating agencies in India are regulated by:', ['RBI', 'SEBI', 'IRDAI', 'MCA', 'ICRA itself'], 1, 'SEBI — CRAs are market intermediaries.', 'med', t),
  B('Stock brokers and merchant bankers are regulated by:', ['SEBI', 'RBI', 'MCA', 'exchanges only', 'SAT'], 0, 'SEBI registers + supervises all market intermediaries.', 'easy', t),
  B('Forex reserves and exchange-rate policy belong to:', ['RBI', 'SEBI', 'Finance Ministry', 'EXIM Bank', 'DGFT'], 0, 'RBI manages forex — FEMA 1999 implementation.', 'easy', t),
  B('Foreign exchange dealings (FEMA) are administered by:', ['RBI', 'SEBI', 'CBDT', 'DGFT', 'MEA'], 0, 'RBI administers FEMA 1999.', 'med', t),
  B('The RBI Act year:', ['1934', '1949', '1956', '1969', '1992'], 0, 'RBI Act 1934.', 'easy', t),
  B('Priority-sector lending targets are set by:', ['RBI', 'SEBI', 'NABARD', 'Finance Ministry', 'NITI'], 0, 'RBI sets PSL norms — 40% ANBC target for banks.', 'med', t),
  B('The repo rate is decided by:', ['MPC of RBI', 'SEBI board', 'Finance Minister', 'NITI Aayog', 'Parliament'], 0, 'Monetary Policy Committee — 6 members, RBI Governor chairs.', 'easy', t),
  B('The MPC has how many members?', ['6', '4', '8', '10', '5'], 0, 'Six — three RBI + three government nominees; Governor has casting vote.', 'med', t),
  B('Inflation target band for MPC:', ['4% ± 2%', '6% ± 1%', '5% ± 1%', '3% ± 2%', '7% ± 2%'], 0, 'CPI 4% ± 2% — the medium-term target.', 'med', t),
  B('FSDC (Financial Stability & Development Council) is chaired by:', ['RBI Governor', 'Union Finance Minister', 'SEBI Chairman', 'PM', 'CEA'], 1, 'FM chairs FSDC — apex coordination council of all regulators.', 'med', t),
  B('Deposit insurance (DICGC) covers up to:', ['₹5 lakh/depositor/bank', '₹1 lakh', '₹10 lakh', '₹2 lakh', 'unlimited'], 0, '₹5 lakh since 2020 — per depositor per bank.', 'med', t),
  B('NPCI is owned/promoted by:', ['consortium of banks under RBI guidance', 'SEBI', 'GoI alone', 'RBI alone', 'private firms'], 0, 'Bank consortium umbrella — RBI/IRDAI-era initiative.', 'med', t),
  B('IFSCA regulates:', ['GIFT City IFSC financial services', 'all NBFCs', 'all banks', 'pension funds', 'commodities'], 0, 'International Financial Services Centres Authority — GIFT City unified regulator.', 'med', t),
  B('Cooperative banks in urban areas are regulated by:', ['RBI + Registrar of Cooperatives (dual)', 'SEBI', 'NABARD alone', 'states only', 'MCA'], 0, 'Dual control — RBI for banking ops, state RCS for registration.', 'hard', t),
  B('Chit funds are regulated by:', ['state governments', 'RBI', 'SEBI', 'MCA', 'PFRDA'], 0, 'Chit Funds Act 1982 — state-level regulation.', 'hard', t),
  B('The SARFAESI Act enables banks to:', ['recover NPAs via asset seizure without court', 'print currency', 'issue bonds', 'merge banks', 'set rates'], 0, 'Securitisation & Reconstruction — enforcement of security interests, 2002.', 'med', t),
  B('Alternative Investment Funds (AIFs) register with:', ['SEBI', 'RBI', 'MCA', 'PFRDA', 'IRDAI'], 0, 'SEBI AIF Regulations 2012 — VC/PE/hedge registration.', 'med', t),
  B('Portfolio Managers are regulated by:', ['SEBI', 'RBI', 'PFRDA', 'MCA', 'exchanges'], 0, 'SEBI (Portfolio Managers) Regulations.', 'med', t),
  B('Investment Advisers register under:', ['SEBI IA Regulations 2013', 'RBI Act', 'Companies Act', 'PFRDA Act', 'LODR'], 0, 'SEBI Investment Advisers Regulations 2013.', 'med', t),
  B('REITs and InvITs are regulated by:', ['SEBI', 'RBI', 'RERA', 'MCA', 'NHAI'], 0, 'SEBI REIT/InvIT Regulations — listed real-estate/infra trusts.', 'med', t),
  B('Debenture trustees are regulated by:', ['SEBI', 'RBI', 'MCA', 'SAT', 'CCI'], 0, 'SEBI (Debenture Trustees) Regulations.', 'hard', t),
  B('Custodians of securities register with:', ['SEBI', 'RBI', 'depositories only', 'MCA', 'NSE'], 0, 'SEBI Custodian Regulations.', 'med', t),
  B('Venture Capital Funds register under:', ['SEBI VCF/AIF Regulations', 'RBI Act', 'Companies Act', 'IT Act', 'NITI rules'], 0, 'Now under SEBI AIF Regulations.', 'med', t),
  B('Market-makers and underwriters in issues are:', ['SEBI-registered intermediaries', 'RBI officers', 'MCA nominees', 'exchanges themselves', 'unregulated'], 0, 'Intermediaries under SEBI registration.', 'med', t),
  B('The Securities Appellate Tribunal was constituted under:', ['SEBI Act 1992', 'SCRA 1956', 'Companies Act', 'Depositories Act', 'RBI Act'], 0, 'SEBI Act — appeals from SEBI orders.', 'med', t),
  B('Banks\' KYC/master directions are issued by:', ['RBI', 'SEBI', 'UIDAI', 'MCA', 'IBA'], 0, 'RBI Master Directions on KYC.', 'med', t),
  B('Payment aggregators/gateways are licensed by:', ['RBI under PSS Act', 'SEBI', 'NPCI', 'MeitY', 'TRAI'], 0, 'RBI Payment Aggregator framework.', 'med', t),
  B('Credit information companies (CIBIL etc.) are regulated by:', ['RBI under CICRA 2005', 'SEBI', 'MCA', 'IBA', 'FICCI'], 0, 'Credit Information Companies (Regulation) Act 2005 — RBI.', 'hard', t),
  B('Rural cooperative banks fall under:', ['RBI + NABARD oversight', 'SEBI', 'MCA only', 'states only', 'unregulated'], 0, 'Dual: RBI banking ops + NABARD inspection.', 'hard', t),
  B('International Financial Services Centres Authority (IFSCA) HQ:', ['GIFT City, Gandhinagar', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'], 0, 'GIFT City — unified IFSC regulator.', 'med', t),
  B('The Insolvency & Bankruptcy Code is administered by:', ['IBBI', 'NCLT alone', 'MCA alone', 'SEBI', 'RBI'], 0, 'IBBI regulates IPs/agencies; NCLT is the adjudicating authority.', 'med', t),
  B('NCLT benches are constituted under:', ['Companies Act 2013', 'SEBI Act', 'IBC only', 'SCRA', 'FEMA'], 0, 'Companies Act 2013 — company-law tribunal.', 'med', t),
  B('The Competition Act year:', ['2002', '1999', '2010', '1985', '1992'], 0, 'Competition Act 2002 — CCI\'s statute.', 'med', t),
  B('FRBM Act fiscal-target law year:', ['2003', '1999', '2010', '2016', '1991'], 0, 'Fiscal Responsibility & Budget Management Act 2003.', 'hard', t),
  B('FEMA replaced which law?', ['FERA 1973', 'SCRA', 'Banking Regulation Act', 'MRTP Act', 'COFEPOSA'], 0, 'FEMA 1999 replaced the draconian FERA 1973.', 'med', t),
  B('PMLA (anti-money laundering) year:', ['2002', '1999', '2005', '2010', '1995'], 0, 'Prevention of Money Laundering Act 2002 — ED enforces.', 'med', t),
  B('Credit rating agencies are regulated by:', ['SEBI', 'RBI', 'IRDAI', 'MCA', 'NABARD'], 0, 'SEBI (Credit Rating Agencies) Regulations — CRAs like CRISIL/ICRA.', 'med', t),
  B('Payment systems/UPI come under:', ['RBI', 'SEBI', 'NPCI itself', 'MeitY', 'TRAI'], 0, 'RBI under the Payment and Settlement Systems Act 2007.', 'med', t),
  B('Government securities market is managed by:', ['SEBI', 'RBI', 'NSE', 'Finance Ministry', 'NSDL'], 1, 'RBI manages G-secs and public debt.', 'med', t),
  B('Foreign exchange regulation falls under:', ['RBI (FEMA)', 'SEBI', 'DGFT', 'CBDT', 'ED'], 0, 'FEMA 1999 administered by RBI.', 'med', t),
  // ── Real PYQ-derived (2024 paper, answers independently verified) ──
  B('Microfinance institutions in India are regulated by:', ['Ministry of Finance', 'RBI', 'NHB', 'NABARD', 'SEBI'], 1, 'RBI regulates NBFC-MFIs and the microfinance framework.', 'med', t),
  B('IOSCO\'s primary objective:', ['monitor global financial stability', 'regulate international trade', 'financial aid to developing economies', 'set global standards for securities regulation', 'enforce tax compliance'], 3, 'IOSCO = the global standards body for securities regulators — SEBI is a member.', 'med', t),
  B('Securities are issued in dematerialised form under which Act?', ['SCRA 1956', 'Depositories Act 1996', 'Companies Act 2013', 'RBI Act 1934', 'FEMA 1999'], 1, 'Depositories Act 1996 governs demat — NSDL/CDSL operate under it.', 'med', t),
  B('The day-count convention for Indian government bonds:', ['Actual/360', 'Actual/365', '30/360', 'Actual/Actual', '30/365'], 3, 'Indian G-secs use Actual/Actual — actual days elapsed over actual days in year.', 'hard', t),
  B('A Forward Rate Agreement (FRA) is:', ['an agreement to buy financial assets', 'an obligation to purchase a security', 'a contract locking an interest rate for a future period', 'an exchange of fixed for floating payments', 'a share-purchase contract'], 2, 'FRA locks a forward interest rate between two parties — hedges rate risk.', 'hard', t),
  B('Minimum tangible net worth to issue Commercial Paper:', ['₹10 crore', '₹5 crore', '₹4 crore', '₹2 crore', '₹6 crore'], 2, 'RBI CP Directions: ₹4 crore minimum tangible net worth.', 'hard', t),
  B('The generally regarded risk-free instrument:', ['Fixed Deposits', 'Corporate Bonds', 'Gilt Securities', 'REITs', 'Mutual Funds'], 2, 'Gilts carry sovereign backing — the benchmark risk-free asset.', 'easy', t),
  B('A Rights Issue must stay open for subscription for:', ['20–40 days', '5–15 days', '15–30 days', '30–45 days', '10–20 days'], 2, 'SEBI ICDR: rights issue subscription window is 15–30 days.', 'hard', t),
  B('Unpaid dividend must move to the Unpaid Dividend Account within ___ of the 30-day window expiring:', ['15 days', '7 days', '5 days', '10 days', '12 days'], 1, 'Companies Act s.124 — 7 days after the 30-day payment window lapses.', 'hard', t),
  B('Appeal from NCLT to NCLAT must be filed within:', ['60 days', '45 days', '30 days', '90 days', '120 days'], 1, 'Companies Act s.421 — 45-day appeal window.', 'hard', t),
  B('Lock-in on Sweat Equity Shares under Companies Act s.54:', ['1 year', '2 years', '3 years', '5 years', 'no lock-in'], 2, 'Sweat equity locks in for 3 years from allotment.', 'hard', t),
  B('Removing an auditor before term-end requires:', ['board resolution only', 'special resolution + Central Government approval', 'simple majority', 'ROC notice only', 'shareholder petition'], 1, 'Companies Act s.140 — special resolution plus Central Govt (RD) approval.', 'hard', t),
  B('Minimum notice for a Board Meeting under the Companies Act:', ['7 days', '3 days', '14 days', '21 days', '5 days'], 0, 's.173 — at least 7 days\' notice to every director.', 'med', t),
  B('Maximum age for the NCLAT Chairperson:', ['65 years', '68 years', '70 years', '62 years', '72 years'], 2, 'NCLAT chairperson retires at 70; members at 67.', 'hard', t),
  B('An NBFC accepting public deposits can take them for a minimum period of:', ['6 months', '12 months', '18 months', '24 months', '36 months'], 1, 'NBFC public deposits: 12–60 month window.', 'hard', t),
  B('Money multiplier with CRR = 12%:', ['12', '8.33', '10', '6.25', '7.5'], 1, 'Multiplier = 1/CRR = 1/0.12 ≈ 8.33.', 'med', t),
  B('Depositories Act 1996 process converting physical certificates to electronic:', ['dematerialisation', 'rematerialisation', 'immobilisation', 'tokenisation', 'digitisation'], 0, 'Dematerialisation = physical → electronic; reverse is rematerialisation.', 'med', t),
  B('RBI raising loans on behalf of State Governments consults the Finance Ministry and:', ['SEBI', 'CAG', 'FIFMDA', 'DIPAM', 'NITI Aayog'], 1, 'Consults MoF + CAG on state borrowing programmes.', 'hard', t),
  B('Under a Cash Flow Statement, an investing activity is:', ['dividends paid', 'interest paid on borrowings', 'purchase of equipment', 'sale proceeds of goods', 'admin expenses'], 2, 'Capex flows sit in investing; dividends/interest in financing.', 'med', t),
  B('A Fund Flow Statement\'s key limitation:', ['focuses on non-monetary items', 'cannot show the exact cash position at a date', 'too much cash detail', 'overstates financial strength always', 'all of these'], 1, 'Fund flow ≠ cash position — that\'s its structural blind spot.', 'hard', t),
  B('Royalty paid to State Government per unit of production is a:', ['variable expense', 'capital expense', 'direct expense', 'indirect expense', 'fixed expense'], 0, 'Scales with output quantity → variable.', 'med', t),
  B('If P/V ratio is 30% of sales, the remaining 70% represents:', ['fixed cost', 'profit', 'variable cost', 'margin of safety', 'break-even'], 2, 'P/V = contribution margin; the complement is variable cost.', 'med', t),
  B('In Activity-Based Costing, costs are assigned primarily by:', ['departments', 'activities', 'headcount', 'revenue share', 'output volume'], 1, 'ABC traces overhead through activities, not blanket rates.', 'med', t),
  B('NSE was incorporated in:', ['1994', '1992', '1991', '1990', '1993'], 1, 'NSE incorporated 1992; trading began 1994.', 'med', t),
  B('A 10% debenture (face ₹100) trading at ₹80 has current yield of:', ['10%', '20%', '12.5%', '15%', '8%'], 2, 'Current yield = coupon/price = 10/80 = 12.5%.', 'med', t),
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
  B('PMJJBY provides what cover?', ['life insurance ₹2 lakh @ ~₹436/yr', 'accident insurance', 'crop cover', 'health cover', 'pension'], 0, 'Jeevan Jyoti Bima — life cover ₹2L, renewable annually (18-50 yrs).', 'med', t),
  B('PMSBY provides:', ['accident cover ₹2 lakh @ ~₹20/yr', 'life cover ₹4 lakh', 'health ₹5 lakh', 'pension ₹3k/mo', 'crop cover'], 0, 'Suraksha Bima — accident insurance ₹2L for ~₹20/year.', 'med', t),
  B('PMMY (MUDRA) loan categories in order:', ['Shishu ≤₹50k, Kishore ≤₹5L, Tarun ≤₹10L', 'all equal', 'Tarun ≤₹50k', 'Kishore ≥₹10L', 'no tiers'], 0, 'Shishu/Kishore/Tarun tiers — 50k / 5L / 10L caps.', 'med', t),
  B('PM Vishwakarma scheme targets:', ['traditional artisans & craftspeople', 'IT workers', 'farmers', 'students', 'exporters'], 0, 'Artisans — toolkits, skilling, credit support (2023).', 'med', t),
  B('PM Fasal Bima Yojana covers:', ['crop insurance', 'health', 'life', 'motor', 'property'], 0, 'Crop insurance — PMFBY 2016.', 'easy', t),
  B('PMJDY\'s overdraft facility allows:', ['₹10,000 OD on Jan Dhan accounts', '₹50,000', '₹1 lakh', 'no OD', '₹5,000'], 0, 'OD up to ₹10,000 for eligible account holders.', 'hard', t),
  B('PM-JAY cover per family per year:', ['₹5 lakh', '₹2 lakh', '₹10 lakh', '₹1 lakh', '₹3 lakh'], 0, '₹5L/family/year — Ayushman Bharat hospitalisation cover.', 'easy', t),
  B('Atal Pension Yojana pension band:', ['₹1,000–5,000/month', '₹500–1,000', '₹10,000+', 'flat ₹2,000', 'lumpsum only'], 0, 'Defined pension ₹1k–5k monthly from age 60, entry 18-40.', 'med', t),
  B('PM SVANidhi initial working-capital loan:', ['₹10,000', '₹1,00,000', '₹50,000', '₹5,000', '₹25,000'], 0, '₹10k collateral-free, progressive cycles up to ₹50k.', 'hard', t),
  B('Digital India programme year:', ['2015', '2014', '2016', '2017', '2018'], 0, 'July 2015 — three pillars: infrastructure, services, literacy.', 'med', t),
  B('Skill India Mission launched:', ['2015', '2014', '2016', '2018', '2020'], 0, 'July 2015 — PMKVY anchor scheme.', 'med', t),
  B('Swachh Bharat Mission year:', ['2014', '2015', '2016', '2013', '2017'], 0, 'Oct 2014 — sanitation mission.', 'easy', t),
  B('National Education Policy latest full revision:', ['2020', '1986', '2016', '2021', '2019'], 0, 'NEP 2020 — first full education policy in 34 years.', 'easy', t),
  B('PM Gati Shakti is about:', ['multimodal infrastructure planning', 'speed guns', 'railways only', 'ports only', 'exports'], 0, 'National master plan for multimodal connectivity (2021).', 'med', t),
  B('Production-Linked Incentive (PLI) targets:', ['manufacturing output incentives', 'farm income', 'tax relief', 'pensions', 'insurance'], 0, 'PLI 2020 — sector-wise manufacturing incentives.', 'med', t),
  B('PM-JANMAN scheme covers:', ['particularly vulnerable tribal groups', 'all farmers', 'students', 'MSMEs', 'senior citizens'], 0, 'PVTG development — 75 tribal communities (2023).', 'hard', t),
  B('One Nation One Ration Card enables:', ['portable PDS entitlements across states', 'free ration everywhere', 'cash transfers', 'loan access', 'health cover'], 0, 'Portability of ration benefits nationwide.', 'med', t),
  B('UPI was launched by NPCI in:', ['2016', '2014', '2018', '2015', '2020'], 0, 'April 2016 — instant payment rails.', 'easy', t),
  B('PM-KISAN instalment structure:', ['₹6,000/yr in 3 instalments', '₹12,000 once', '₹2,000 monthly', '₹10,000 twice', 'seasonal'], 0, 'Three ₹2,000 instalments per year.', 'med', t),
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
  B('Global Corruption Report / Bribe Payers Index publisher:', ['Transparency International', 'WEF', 'IMF', 'UN', 'OECD'], 0, 'TI publishes CPI + global corruption research.', 'easy', t),
  B('Global Gender Gap Report publisher:', ['WEF', 'UN Women only', 'World Bank', 'UNDP', 'ILO'], 0, 'World Economic Forum — the Davos forum.', 'med', t),
  B('World Happiness Report publisher:', ['UN Sustainable Development Solutions Network', 'WHO', 'UNICEF', 'World Bank', 'IMF'], 0, 'SDSN — ranks ~150 countries; Finland tops repeatedly.', 'med', t),
  B('Human Capital Index publisher:', ['World Bank', 'UNDP', 'WEF', 'ILO', 'WHO'], 0, 'World Bank — child survival/school/health composite.', 'med', t),
  B('Global Food Policy Report publisher:', ['IFPRI', 'FAO', 'WFP', 'WHO', 'World Bank'], 0, 'International Food Policy Research Institute.', 'hard', t),
  B('Global Terrorism Index publisher:', ['Institute for Economics & Peace', 'UN', 'SIPRI', 'Interpol', 'WEF'], 0, 'IEP — same publisher as Global Peace Index.', 'hard', t),
  B('World Press Freedom Index publisher:', ['Reporters Without Borders (RSF)', 'UNESCO', 'UN', 'Amnesty', 'CPJ'], 0, 'RSF — Paris-based.', 'med', t),
  B('Global Liveability Index publisher:', ['EIU', 'Mercer', 'UN-Habitat', 'WEF', 'Numbeo'], 0, 'Economist Intelligence Unit — Vienna/Copenhagen usual toppers.', 'med', t),
  B('Henley Passport Index tracks:', ['visa-free access by passport', 'airport quality', 'visa fees', 'border queues', 'airline rankings'], 0, 'Passport power — Singapore/Japan habitual toppers.', 'easy', t),
  B('Global Innovation Index latest India rank is roughly:', ['~39-40', '~100', '~10', '~70', '~20'], 0, 'India ~39-40th — mid-rank, steady climb.', 'med', t),
  B('Logistics Performance Index publisher:', ['World Bank', 'WTO', 'UNCTAD', 'IMF', 'ADB'], 0, 'World Bank — trade logistics benchmarking.', 'hard', t),
  B('Global Multidimensional Poverty Index publisher:', ['OPHI + UNDP', 'World Bank', 'IMF', 'FAO', 'WHO'], 0, 'Oxford Poverty & Human Development Initiative with UNDP.', 'hard', t),
  B('Global Energy Transition Index publisher:', ['WEF', 'IEA', 'IRENA', 'UN', 'World Bank'], 0, 'WEF — energy transition benchmarking.', 'hard', t),
  B('Asian Development Bank Outlook comes from:', ['ADB', 'IMF', 'World Bank', 'AIIB', 'UN'], 0, 'ADB — regional growth outlook.', 'easy', t),
  B('India\'s IIP (factory output) released by:', ['NSO (MoSPI)', 'RBI', 'Commerce Ministry', 'NITI', 'DGFT'], 0, 'NSO — monthly IIP release.', 'med', t),
  B('Global Economic Prospects report publisher:', ['World Bank', 'IMF', 'OECD', 'ADB', 'UNCTAD'], 0, 'World Bank\'s growth outlook — WEO belongs to IMF.', 'med', t),
  B('World Investment Report publisher:', ['UNCTAD', 'World Bank', 'IMF', 'WTO', 'WEF'], 0, 'UNCTAD — FDI flows report.', 'med', t),
  B('Trade and Development Report publisher:', ['UNCTAD', 'WTO', 'World Bank', 'IMF', 'OECD'], 0, 'UNCTAD — distinct from the World Investment Report.', 'hard', t),
  B('Global Report on Food Crises publisher:', ['Global Network Against Food Crises (FSIN/WFP)', 'FAO alone', 'WHO', 'UNICEF', 'World Bank'], 0, 'Joint UN-partner publication.', 'hard', t),
  B('State of Food Security and Nutrition (SOFI) publisher:', ['FAO-led UN agencies', 'WFP only', 'WHO only', 'World Bank', 'IMF'], 0, 'FAO+IFAD+UNICEF+WFP+WHO joint flagship.', 'med', t),
  B('Global Financial Development Report publisher:', ['World Bank', 'IMF', 'BIS', 'OECD', 'RBI'], 0, 'World Bank — financial-system depth/access.', 'hard', t),
  B('BIS Annual Economic Report publisher:', ['Bank for International Settlements', 'IMF', 'World Bank', 'OECD', 'WEF'], 0, 'BIS Basel — central banks\' bank.', 'med', t),
  B('Global Monitoring Report (ended 2016) was by:', ['World Bank + IMF', 'UN', 'OECD', 'WTO', 'ADB'], 0, 'Joint WB-IMF publication on development goals.', 'hard', t),
  B('UNCTAD\'s headquarters:', ['Geneva', 'New York', 'Paris', 'Vienna', 'Rome'], 0, 'Geneva — trade & development arm of UN.', 'med', t),
  B('IMF headquarters:', ['Washington DC', 'New York', 'Geneva', 'London', 'Basel'], 0, 'Washington DC — IMF & World Bank both.', 'easy', t),
  B('BIS headquarters:', ['Basel', 'Geneva', 'Zurich', 'Frankfurt', 'London'], 0, 'Basel, Switzerland.', 'med', t),
  B('World Bank headquarters:', ['Washington DC', 'New York', 'Geneva', 'Paris', 'London'], 0, 'Washington DC.', 'easy', t),
  B('WTO headquarters:', ['Geneva', 'New York', 'Paris', 'London', 'Brussels'], 0, 'Geneva.', 'easy', t),
  B('FATF headquarters:', ['Paris (OECD)', 'Basel', 'Geneva', 'Vienna', 'London'], 0, 'Paris — hosted at OECD.', 'med', t),
  B('ADB headquarters:', ['Manila', 'Tokyo', 'Beijing', 'Singapore', 'Bangkok'], 0, 'Manila, Philippines.', 'med', t),
  B('AIIB headquarters:', ['Beijing', 'Shanghai', 'Singapore', 'Tokyo', 'Seoul'], 0, 'Beijing — China-led infra bank.', 'med', t),
  B('NDB (New Development Bank) headquarters:', ['Shanghai', 'Beijing', 'Moscow', 'Delhi', 'Johannesburg'], 0, 'Shanghai — BRICS bank.', 'med', t),
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
  B('SEBI Chairman Tuhin Kanta Pandey previously served as:', ['Finance Secretary', 'RBI Deputy Governor', 'NITI CEO', 'CBIC chief', 'DIPAM secretary'], 0, 'Finance Secretary → SEBI Chairman (Mar 2025).', 'med', t),
  B('RBI Governor Sanjay Malhotra\'s prior role:', ['Revenue Secretary', 'DFS Secretary', 'NABARD chair', 'SEBI member', 'DEA secretary'], 0, 'Revenue Secretary → RBI Governor (Dec 2024).', 'med', t),
  B('IRDAI is headquartered at:', ['Hyderabad', 'Mumbai', 'New Delhi', 'Chennai', 'Kolkata'], 0, 'Hyderabad — insurance regulator HQ.', 'med', t),
  B('PFRDA headquarters:', ['New Delhi', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune'], 0, 'New Delhi.', 'med', t),
  B('NABARD headquarters:', ['Mumbai', 'New Delhi', 'Hyderabad', 'Chennai', 'Lucknow'], 0, 'Mumbai.', 'easy', t),
  B('SIDBI headquarters:', ['Lucknow', 'Mumbai', 'New Delhi', 'Chennai', 'Kolkata'], 0, 'Lucknow — MSME financier.', 'hard', t),
  B('NSE headquarters + MD/CEO pairing:', ['Mumbai + Ashish Chauhan', 'Mumbai + Vikram Limaye', 'Delhi + Chauhan', 'Mumbai + Pandey', 'Delhi + Limaye'], 0, 'Mumbai HQ; Ashish Kumar Chauhan heads NSE.', 'med', t),
  B('NSDL was established in:', ['1996', '1999', '1992', '2000', '1988'], 0, '1996 — first Indian depository.', 'med', t),
  B('CDSL was established in:', ['1999', '1996', '2002', '1992', '2005'], 0, '1999 — promoted by BSE.', 'med', t),
  B('The 16th Finance Commission chairperson:', ['Arvind Panagariya', 'N.K. Singh', 'Y.V. Reddy', 'Raghuram Rajan', 'Vijay Kelkar'], 0, 'Arvind Panagariya chairs the 16th FC (award 2026-31).', 'med', t),
  B('NITI Aayog Vice-Chairperson (recent):', ['Suman Bery', 'Arvind Panagariya', 'Rajiv Kumar', 'V.K. Saraswat', 'Ramesh Chand'], 0, 'Suman Bery — current VC.', 'med', t),
  B('RBI was nationalised in:', ['1949', '1935', '1950', '1947', '1955'], 0, 'RBI est. 1935, nationalised 1949.', 'med', t),
  B('SEBI\'s whole-time members are appointed by:', ['GoI', 'RBI', 'SEBI board', 'Finance Commission', 'SAT'], 0, 'Government appoints chairman + whole-time members.', 'med', t),
  B('Chief Economic Adviser (recent):', ['V. Anantha Nageswaran', 'Arvind Subramanian', 'Kaushik Basu', 'Raghuram Rajan', 'Krishnamurthy Subramanian'], 0, 'Anantha Nageswaran — CEA since 2022.', 'med', t),
  B('SAT (Securities Appellate Tribunal) is located at:', ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Bengaluru'], 0, 'Mumbai — appeals against SEBI orders.', 'med', t),
  B('NSE was founded in:', ['1992', '1988', '1995', '2000', '1985'], 0, '1992 — demutualised exchange era.', 'easy', t),
  B('BSE was founded in:', ['1875', '1900', '1956', '1992', '1947'], 0, '1875 — Asia\'s oldest stock exchange.', 'easy', t),
  B('MCX (commodity exchange) HQ:', ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Ahmedabad'], 0, 'Mumbai.', 'med', t),
  B('NCDEX HQ:', ['Mumbai', 'Delhi', 'Indore', 'Jaipur', 'Surat'], 0, 'Mumbai — agri-commodity exchange.', 'hard', t),
  B('NSDL MD/CEO as of recent:', ['Padmaja Chunduru', 'Nehal Vora', 'Ashish Chauhan', 'Sundararaman Ramamurthy', 'Madhabi Buch'], 0, 'Padmaja Chunduru — NSDL chief.', 'hard', t),
  B('CDSL MD is:', ['Nehal Vora', 'Padmaja Chunduru', 'Ashish Chauhan', 'S Ramamurthy', 'Ajay Tyagi'], 0, 'Nehal Vora — CDSL MD & CEO.', 'hard', t),
  B('NPCI was incorporated in:', ['2008', '2010', '2005', '2015', '2012'], 0, '2008 — payments umbrella under RBI guidance.', 'med', t),
  B('CCI (Competition Commission) is chaired recently by:', ['Ravneet Kaur', 'Ashok Kumar Gupta', 'Devendra Sikri', 'Dhanendra Kumar', 'none'], 0, 'Ravneet Kaur — first woman CCI chair (2023).', 'hard', t),
  B('IBBI\'s role:', ['regulate insolvency professionals/agencies', 'settle trades', 'audit banks', 'rate bonds', 'license NBFCs'], 0, 'Insolvency & Bankruptcy Board of India.', 'med', t),
  B('SEBI chairman before Tuhin Kanta Pandey:', ['Madhabi Puri Buch', 'Ajay Tyagi', 'U.K. Sinha', 'C.B. Bhave', 'G.N. Bajpai'], 0, 'Madhabi Puri Buch served 2022-2025.', 'easy', t),
  B('RBI Governor before Sanjay Malhotra:', ['Shaktikanta Das', 'Urjit Patel', 'Raghuram Rajan', 'D. Subbarao', 'Y.V. Reddy'], 0, 'Das served 2018-2024.', 'easy', t),
  B('IRDAI chairman (recent):', ['Debasish Panda', 'Subhash Khuntia', 'T.S. Vijayan', 'J. Hari Narayan', 'N. Rangachary'], 0, 'Debasish Panda (2022-2025).', 'med', t),
  B('AMFI\'s role:', ['mutual fund industry association — not a regulator', 'regulator', 'depository', 'exchange', 'rating agency'], 0, 'Association of Mutual Funds in India — industry body.', 'easy', t),
  B('IBA stands for:', ['Indian Banks\' Association', 'Indian Banking Authority', 'International Banks Association', 'Indian Board of Auditors', 'None'], 0, 'Industry association of banks.', 'easy', t),
  B('SEBI full form:', ['Securities and Exchange Board of India', 'Stock Exchange Board of India', 'Securities Exchange Bureau of India', 'State Exchange Board', 'None'], 0, 'The full name — exam\'s favourite warm-up.', 'easy', t),
  B('UIDAI administers:', ['Aadhaar', 'PAN', 'GSTIN', 'passports', 'voter IDs'], 0, 'Unique Identification Authority — Aadhaar.', 'easy', t),
  B('CBDT administers:', ['direct taxes', 'indirect taxes', 'customs', 'excise', 'GST'], 0, 'Central Board of Direct Taxes — income tax.', 'med', t),
  B('CBIC administers:', ['indirect taxes + customs', 'direct taxes', 'income tax', 'securities', 'banking'], 0, 'Central Board of Indirect Taxes & Customs — GST/customs.', 'med', t),
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
  B('India\'s first sovereign multilingual + multimodal LLM project highlighted at IIT Bombay:', ['DigiGen', 'IndiaAI', 'BharatGen', 'BhashaAI', 'SanskritAI'], 2, 'BharatGen — sovereign multilingual/multimodal LLM.', 'med', t),
  B('India\'s first indigenous CRISPR-based therapy targets which disease?', ['Thalassemia', 'Sickle Cell Disease', 'Cystic fibrosis', 'Haemophilia', 'Leukaemia'], 1, 'BIRSA 101 — CRISPR therapy for Sickle Cell Disease.', 'med', t),
  B('The world\'s highest railway bridge (~35m taller than the Eiffel Tower) crosses which river?', ['Brahmaputra', 'Chenab', 'Godavari', 'Yamuna', 'Ganga'], 1, 'Chenab bridge — world\'s highest railway bridge.', 'easy', t),
  B('PARI (Public Art of India) nodal implementation agency:', ['Lalit Kala Akademi', 'ICCR', 'National School of Drama', 'Sangeet Natak Akademi', 'ASI'], 1, 'Indian Council for Cultural Relations.', 'med', t),
  B('Pandit Ronu Majumdar is a distinguished exponent of:', ['tabla', 'sarod', 'flute', 'veena', 'sitar'], 2, 'Flute — classical flautist.', 'easy', t),
  B('The committee on conflict-of-interest norms for SEBI officials reported under the chairmanship of:', ['Ashok Lavasa', 'Pratyush Sinha', 'T.V. Somanathan', 'Sanjay Malhotra', 'Ajay Tyagi'], 1, 'Pratyush Sinha committee — SEBI conflict-of-interest norms.', 'hard', t),
  B('The Sixteenth Finance Commission\'s recommendations apply up to FY:', ['2032-33', '2028-29', '2030-31', '2029-30', '2031-32'], 2, 'Award period 2026-27 through 2030-31.', 'hard', t),
  B('Current Chairman of the Bombay Stock Exchange (BSE):', ['Prof. Subhasis Chaudhuri', 'Nirmala Sitharaman', 'Urjit Patel', 'Ashish Kumar Chauhan', 'Shaktikanta Das'], 0, 'Prof. Subhasis Chaudhuri — BSE Chairman.', 'med', t),
  B('Chairman of the Central Board of Indirect Taxes & Customs (CBIC):', ['Vivek Chaturvedi', 'Sanjay Kumar Agarwal', 'Rajiv Mehta', 'Anil Kumar Jain', 'Ramesh Chandra'], 1, 'Sanjay Kumar Agarwal — CBIC Chairman.', 'med', t),
  B('SEBI\'s March 2024 circular on MF offer documents introduced SID — S stands for:', ['Security', 'Standard', 'Scheme', 'Savings', 'Systematic'], 2, 'SID = Scheme Information Document.', 'med', t),
  B('Under AIM, an Established Incubation Centre must operate at least ___ years for scale-up support:', ['5', '2', '3', '1', '4'], 2, 'EIC requires 3 years operational history.', 'hard', t),
  B('Max investment limit under NSC (VIII Issue):', ['₹25 lakh', '₹10 lakh', 'no upper limit', '₹15 lakh', '₹1 lakh'], 2, 'NSC VIII has no upper investment limit.', 'hard', t),
  B('ITR-4 (Sugam) filing annual income ceiling:', ['₹2 crore', '₹75 lakh', '₹50 lakh', '₹25 lakh', '₹1 crore'], 2, 'ITR-4 ceiling — ₹50 lakh.', 'med', t),
  B('DigiLocker lets citizens access which document categories?', ['employment/service docs', 'educational certificates', 'transport documents', 'identity documents', 'all of these'], 4, 'All categories — official digital document store.', 'easy', t),
  B('CDSL was originally promoted by:', ['NSE', 'SEBI', 'RBI', 'BSE Ltd', 'IRDAI'], 3, 'BSE promoted CDSL before the bank consortium.', 'hard', t),
  B('Which about the National Savings Recurring Deposit is INCORRECT?', ['opened individually/jointly up to 4 adults', 'matures after 5 years', 'min monthly deposit ₹100', 'premature closure after 3 years', 'default fee ₹1 per ₹100'], 0, 'Joint holding is capped at 3 adults, not 4 — the planted incorrect statement.', 'hard', t),
  B('SEBI\'s 2024 measure on index derivatives:', ['tighter expiry/lot norms', 'a full ban', 'free margin', 'longer hours', 'nothing'], 0, 'Weekly-expiry limits + higher minimum contract values.', 'med', t),
  B('The "finfluencer" rules restrict SEBI-regulated entities from:', ['associating with unregistered advisers', 'using social media', 'advertising', 'hiring staff', 'running apps'], 0, 'No dealings with unregistered persons for advice.', 'med', t),
  B('SEBI\'s 2024 algo-trading rules for retail:', ['brokers must register retail algos', 'algos banned for retail', 'no change', 'only HFT regulated', 'free API access'], 0, 'Retail algos via broker registration + API standards.', 'med', t),
  B('The CSCRF framework requires regulated entities to:', ['report cyber incidents + run audits', 'buy insurance', 'hire hackers', 'close IT depts', 'outsource security'], 0, 'Cyber resilience — audits, reporting, resilience goals.', 'med', t),
  B('SEBI\'s 2025 mutual fund reform direction included:', ['TER rationalisation + simpler docs', 'TER hikes', 'scheme mergers forced', 'exit-load bans', 'no change'], 0, 'Cost transparency + simplified offer docs push.', 'med', t),
  B('The new SEBI chairman Tuhin Kanta Pandey took charge in:', ['March 2025', 'Jan 2024', 'Dec 2025', 'June 2023', 'Nov 2024'], 0, 'March 2025 — succeeded Madhabi Puri Buch.', 'easy', t),
  B('SEBI\'s 2024 proposal on expanding T+0 covered:', ['top 500 stocks phased in', 'all bonds', 'all IPOs', 'commodities', 'F&O only'], 0, 'Phased optional same-day settlement expansion.', 'med', t),
  B('SEBI\'s conflict-of-interest norms review committee chair (2025):', ['Pratyush Sinha', 'T.V. Somanathan', 'Ajay Tyagi', 'Ashok Lavasa', 'U.K. Sinha'], 0, 'Pratyush Sinha — ex-CVC.', 'hard', t),
  B('SEBI\'s recent move on SME IPO migration:', ['stricter profitability thresholds', 'free migration', 'banned SMEs', 'no change', 'lower fees'], 0, 'Profitability + auditor norms tightened after misuse.', 'med', t),
  B('SEBI\'s graded-surveillance stages target stocks with:', ['abnormal price/volume behaviour', 'large caps', 'only IPOs', 'MFs', 'bonds'], 0, 'GSM — manipulation-prone securities flagged.', 'med', t),
  B('SEBI\'s "Liberalised Remittance" concerns relate to:', ['no — LRS is RBI\'s outward remittance scheme', 'IPO sizing', 'FPI registration', 'bond trading', 'audit norms'], 0, 'LRS = RBI territory — the regulator-swap trap.', 'hard', t),
  B('SEBI\'s market-data/analytics policy push is toward:', ['disclosure + surveillance analytics', 'less data', 'paid-only data', 'no surveillance', 'manual audits'], 0, 'Data-driven surveillance expansion.', 'med', t),
  B('The accredited-investor framework relaxes norms for:', ['HNIs/sophisticated investors', 'all retail', 'foreigners', 'PSUs', 'banks'], 0, 'Lighter-touch compliance for sophisticated money.', 'med', t),
  B('SEBI\'s position paper on expanding the retail algo ecosystem requires brokers to:', ['register + tag retail algos', 'ban retail algos', 'approve every order', 'charge extra', 'nothing'], 0, 'API-based retail algo registration — traced orders.', 'med', t),
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
        lesson: `SEBI format: Directions block — 5–8 interleaved clues → 4–5 sub-questions. Method: draw the row → place absolute/extreme anchors first → chain relative clues ("third to the right", "N between") onto anchors → leftover clue confirms the row → THEN answer all subs from one diagram. Never start with a floating clue.`,
        gen: (n) => genSeatRow(n, 'Reasoning: seating'),
        bank: [],
      },
      {
        id: 'r-attr', name: 'Attribute tables / month grids', target: 100,
        lesson: `Grid: rows=people, cols=attributes → fill definite cells → mark MAYBE cells differently → eliminate when forced. *Writing maybes as facts = the classic fail.*`,
        gen: (n) => genMonths(n, 'Reasoning: month/attribute grids'),
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
        id: 'e-swap', name: 'Word swap (2025 pattern)', target: 100,
        lesson: `New 2025 format — a sentence with labeled (A)(B)(C)(D) words; find which pair must exchange places to make it meaningful. Method: read each clause, name its contradiction, test each pair mentally. Both verb and adjective contradictions exist — pick the swap that fixes BOTH halves.`,
        gen: null, bank: bankSwap('English: word swap'),
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
