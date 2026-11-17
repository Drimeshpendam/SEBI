import re, json

raw = open(r'D:\Devin\My_AI_Work\SEBI\05_PYQs\pyq_full_text.txt', encoding='utf-8', errors='replace').read()

# strip page markers
raw = re.sub(r'=====+ PAGE \d+ =====+', '', raw)
raw = re.sub(r'\d+ \| P a g e', '', raw)

# section headers
sec_pat = re.compile(r'(Quant|Reasoning|English Language|General Awareness|Paper 2)[^(\n]*\((\d{4}(?:-\d{4})?)\)', re.I)

lines = raw.split('\n')
sections = []  # (section, year)
cur = None
for ln in lines:
    m = sec_pat.search(ln)
    if m:
        cur = {'section': m.group(1).strip().lower(), 'year': m.group(2), 'text': []}
        sections.append(cur)
    elif cur is not None:
        cur['text'].append(ln)

qs = []
for s in sections:
    txt = '\n'.join(s['text'])
    # split on Qn. markers
    blocks = re.split(r'\n\s*Q\.?\s*(\d+)\.', txt)
    # blocks[0] = preamble; then alternating (qnum, body)
    for i in range(1, len(blocks) - 1, 2):
        body = blocks[i + 1]
        ans_m = re.search(r'Answer\s*-\s*([A-E])', body)
        opts = {}
        for om in re.finditer(r'\b([A-E])\.\s*([^\n]+)', body):
            opts[om.group(1)] = om.group(2).strip()
        # question text = body up to first option or Directions line
        qtext = body.split('A.')[0].split('Answer')[0]
        qtext = re.sub(r'\s+', ' ', qtext).strip()
        qs.append({
            'section': s['section'], 'year': s['year'],
            'q': qtext[:400], 'opts': opts, 'ans': ans_m.group(1) if ans_m else None,
        })

print('parsed:', len(qs))
from collections import Counter
print(Counter((q['section'], q['year']) for q in qs))
ok = [q for q in qs if q['ans'] and len(q['opts']) == 5]
print('well-formed:', len(ok))
json.dump(qs, open(r'D:\Devin\My_AI_Work\SEBI\05_PYQs\pyq_parsed.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
