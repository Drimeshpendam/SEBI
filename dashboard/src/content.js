// Loads every .md in the SEBI folder (outside dashboard root — allowed via vite fs.allow)
const raw = import.meta.glob(['../../**/*.md', '!../../dashboard/**'], { query: '?raw', import: 'default', eager: true })

const docs = Object.entries(raw).map(([path, text]) => {
  const rel = path.replace(/^\.\.\/\.\.\//, '')
  const parts = rel.split('/')
  return {
    path: rel,
    folder: parts[0],
    name: parts[parts.length - 1].replace(/_/g, ' ').replace('.md', ''),
    text,
  }
})

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

export const docTree = Object.keys(folderLabels)
  .map((folder) => ({
    folder,
    label: folderLabels[folder],
    docs: docs
      .filter((d) => d.folder === folder)
      .sort((a, b) => a.path.localeCompare(b.path)),
  }))
  .filter((g) => g.docs.length > 0)

export const allDocs = docs

export function getDoc(path) {
  return docs.find((d) => d.path === path)
}
