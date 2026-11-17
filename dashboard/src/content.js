// Loads every .md in the SEBI folder (outside dashboard root — allowed via vite fs.allow)
const raw = import.meta.glob(['../../**/*.md', '!../../dashboard/**'], { query: '?raw', import: 'default', eager: true })

// Internal files that should exist on disk but not appear in study navigation
const EXCLUDED_FILES = new Set(['clickup_task_ids'])

const docs = Object.entries(raw).map(([path, text]) => {
  const rel = path.replace(/^\.\.\/\.\.\//, '')
  const parts = rel.split('/')
  const file = parts[parts.length - 1].replace('.md', '')
  const parent = parts.length > 1 ? parts[parts.length - 2] : ''
  // Generic filenames (Notes.md etc.) display as their parent folder's name
  const generic = ['notes', 'index', 'readme'].includes(file.toLowerCase())
  return {
    path: rel,
    folder: parts[0],
    sub: parts.slice(1, -1).join('/'),
    name: (generic && parent ? parent : file).replace(/_/g, ' '),
    text,
  }
}).filter((d) => !d.path.split('/').pop().startsWith('_') && !EXCLUDED_FILES.has(d.path.split('/').pop().replace('.md', '')))

export const folderLabels = {
  '00_Overview': 'Overview & Plan',
  '01_Phase1_Paper1': 'Phase 1 — Paper 1 (Aptitude)',
  '02_Phase1_Paper2_IT': 'Phase 1 — Paper 2 (IT)',
  '03_Phase2_Paper1_English': 'Phase 2 — English Descriptive',
  '04_Phase2_Paper2_IT': 'Phase 2 — IT Mains',
  '05_PYQs': 'PYQs & Patterns',
  '06_Mocks_and_Practice': 'Mocks & Error Log',
  '07_Interview': 'Interview',
  '08_Resources': 'Resources',
}

const subLabel = (s) => s.split('/').map((p) => p.replace(/_/g, ' ')).join(' › ')

export const docTree = Object.keys(folderLabels)
  .map((folder) => {
    const fdocs = docs
      .filter((d) => d.folder === folder)
      .sort((a, b) => a.path.localeCompare(b.path))
    const subs = [...new Set(fdocs.map((d) => d.sub))]
      .sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b)))
    return {
      folder,
      label: folderLabels[folder],
      docs: fdocs,
      groups: subs.map((s) => ({
        sub: s,
        label: s ? subLabel(s) : '',
        docs: fdocs.filter((d) => d.sub === s),
      })),
    }
  })
  .filter((g) => g.docs.length > 0)

export const allDocs = docs

export function getDoc(path) {
  return docs.find((d) => d.path === path)
}
