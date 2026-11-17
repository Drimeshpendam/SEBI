const fs = require('fs');
const src = fs.readFileSync('src/concepts.js', 'utf8');
let depth = 0, inStr = null, esc = false, line = 1, template = false;
for (let i = 0; i < src.length; i++) {
  const c = src[i];
  if (c === '\n') line++;
  if (inStr) {
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === inStr) inStr = null;
    continue;
  }
  if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
  if (c === '[' || c === '(' || c === '{') depth++;
  if (c === ']' || c === ')' || c === '}') {
    depth--;
    if (depth < 0) { console.log('DEPTH WENT NEGATIVE at line', line, 'char', c); process.exit(0); }
  }
}
console.log('final depth:', depth);
