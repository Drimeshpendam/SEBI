const fs = require('fs');
const lines = fs.readFileSync('src/concepts.js', 'utf8').split('\n');
for (let i = 1564; i < 1598; i++) {
  const l = lines[i];
  let depth = 0, inStr = null, esc = false;
  for (const c of l) {
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === '[' || c === '(' || c === '{') depth++;
    if (c === ']' || c === ')' || c === '}') depth--;
  }
  console.log(i + 1, 'depth=' + depth, inStr ? 'OPEN STR:' + inStr : '', '|', l.slice(0, 60));
}
