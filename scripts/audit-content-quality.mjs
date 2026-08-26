import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { countGuideWords, publicGuideText } from './lib/content-quality.mjs'

const fileArgIndex = process.argv.indexOf('--file')
const file = resolve(fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const expectedArg = process.argv.find((argument) => argument.startsWith('--expected='))
const expected = expectedArg ? Number(expectedArg.split('=')[1]) : undefined
const guides = JSON.parse(await readFile(file, 'utf8'))
const errors = []
const warnings = []
const paragraphOwners = new Map()
const dekOwners = new Map()

const bannedPatterns = [
  [/\bdo not publish\b/i, 'internal publishing instruction'],
  [/\bthis (?:editorial )?draft\b/i, 'draft language'],
  [/\beditorial (?:draft|preview)\b/i, 'editorial-preview language'],
  [/\bbefore publication\b/i, 'publication reminder'],
  [/\bworkshop-ready editorial\b/i, 'generation language'],
  [/\b(?:the writer|the editor) should\b/i, 'writer/editor instruction'],
  [/\b(?:research|fact-checking|evidence) (?:needed|required)\b/i, 'research reminder'],
  [/\b(?:I|we) (?:tested|built|used|bought|compared|ran)\b/i, 'unsupported first-hand claim'],
  [/\bin today'?s world\b|\bat the end of the day\b|\bwhether you(?:'re| are) a beginner or/i, 'generic filler'],
  [/\bthe (?:a|an)\b/i, 'article grammar error'],
]

const normalizedTokens = (value) => new Set(value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((word) => word.length > 4 && !['build', 'guide', 'woodworking', 'beginner', 'using', 'without', 'about', 'their', 'first'].includes(word)))
const requiredLiteralCounts = new Map([['002', 10], ['012', 4], ['016', 7], ['023', 5], ['025', 30], ['074', 5], ['086', 5], ['225', 12], ['288', 5], ['450', 25]])

if (expected !== undefined && guides.length !== expected) errors.push(`Expected ${expected} guides; found ${guides.length}.`)

for (const guide of guides) {
  const label = `${guide.id} (${guide.title})`
  const text = publicGuideText(guide)
  const bodyLower = text.toLowerCase()
  const words = countGuideWords(guide)

  if (guide.status === 'draft') errors.push(`${label}: remains in draft status.`)
  if (guide.indexStatus !== 'index') errors.push(`${label}: is not indexable.`)
  if (words < 750) errors.push(`${label}: has ${words} words; expected at least 750 substantive words.`)
  if (!Array.isArray(guide.relatedGuideIds) || guide.relatedGuideIds.length !== 3 || guide.relatedGuideIds.includes(guide.id)) errors.push(`${label}: needs three non-self related guides.`)
  if (new Set(guide.relatedGuideIds ?? []).size !== (guide.relatedGuideIds ?? []).length) errors.push(`${label}: contains duplicate related guides.`)

  for (const [pattern, description] of bannedPatterns) {
    if (pattern.test(text)) errors.push(`${label}: contains ${description}.`)
  }

  const titleTokens = normalizedTokens(guide.title)
  const coveredTokens = [...titleTokens].filter((token) => bodyLower.includes(token))
  if (coveredTokens.length < Math.min(3, titleTokens.size)) errors.push(`${label}: body does not make the title topic sufficiently explicit.`)

  if (guide.intent === 'build') {
    if (!guide.dimensions?.imperial || !guide.dimensions?.metric) errors.push(`${label}: project has no concrete starting dimensions.`)
    if (!Array.isArray(guide.cutList) || guide.cutList.length < 3) errors.push(`${label}: project needs a usable cut list.`)
    if (!Array.isArray(guide.materials) || guide.materials.length < 4) errors.push(`${label}: project needs a concrete materials list.`)
    if (!Array.isArray(guide.tools) || guide.tools.length < 3) errors.push(`${label}: project needs a concrete tool path.`)
    if (/only (?:three|3) tools/i.test(guide.title) && guide.tools.length !== 3) errors.push(`${label}: title promises only three tools but the tool list contains ${guide.tools.length}.`)
  }

  if (guide.intent === 'buy') {
    if (!guide.sections.some((section) => section.id === 'full-cost')) errors.push(`${label}: buying guide does not calculate complete ownership cost.`)
    if (!guide.sections.some((section) => section.id === 'fit-and-skip')) errors.push(`${label}: buying guide does not identify who should buy or skip.`)
  }

  if (/\bvs\.?\b|versus/i.test(guide.title) && !guide.sections.some((section) => section.id === 'option-by-option')) errors.push(`${label}: comparison title lacks an option-by-option section.`)
  if (/^How to\b/i.test(guide.title) && !guide.sections.some((section) => (section.bullets ?? []).length >= 6)) errors.push(`${label}: how-to title lacks an actionable step sequence.`)
  if (/\$\d+/.test(guide.title)) {
    const amount = guide.title.match(/\$\d+/)?.[0]
    const budget = guide.sections.find((section) => section.id === 'working-budget')
    if (!budget || !budget.bullets?.some((bullet) => bullet.includes(`Total — ${amount}`))) errors.push(`${label}: budget title lacks a line-item total of ${amount}.`)
  }

  const literalCount = requiredLiteralCounts.get(guide.id)
  if (literalCount) {
    const literalSection = guide.sections.find((section) => ['ranked-list', 'literal-plan', 'literal-list'].includes(section.id))
    if (literalSection?.bullets?.length !== literalCount) errors.push(`${label}: title promises ${literalCount} items but the literal section contains ${literalSection?.bullets?.length ?? 0}.`)
  }

  if (dekOwners.has(guide.dek)) errors.push(`${label}: duplicates the description used by ${dekOwners.get(guide.dek)}.`)
  dekOwners.set(guide.dek, guide.id)

  for (const paragraph of guide.sections.flatMap((section) => section.paragraphs)) {
    const normalized = paragraph.toLowerCase().replace(/\s+/g, ' ').trim()
    const owners = paragraphOwners.get(normalized) ?? []
    owners.push(guide.id)
    paragraphOwners.set(normalized, owners)
  }
}

for (const [paragraph, owners] of paragraphOwners) {
  if (owners.length > 1 && paragraph.split(/\s+/).length >= 20) errors.push(`Repeated article paragraph appears in guides ${owners.join(', ')}: ${paragraph.slice(0, 100)}…`)
}

for (let index = 0; index < guides.length; index += 1) {
  const a = guides[index]
  const aTokens = normalizedTokens(a.title)
  for (let otherIndex = index + 1; otherIndex < guides.length; otherIndex += 1) {
    const b = guides[otherIndex]
    const bTokens = normalizedTokens(b.title)
    const intersection = [...aTokens].filter((token) => bTokens.has(token)).length
    const union = new Set([...aTokens, ...bTokens]).size
    if (union >= 3 && intersection / union >= 0.85) warnings.push(`Potential search-intent overlap: ${a.id} “${a.title}” and ${b.id} “${b.title}”.`)
  }
}

const wordCounts = guides.map(countGuideWords)
console.log(JSON.stringify({
  guides: guides.length,
  words: wordCounts.reduce((sum, value) => sum + value, 0),
  minimumGuideWords: Math.min(...wordCounts),
  averageGuideWords: Math.round(wordCounts.reduce((sum, value) => sum + value, 0) / wordCounts.length),
  readerFacingGuides: guides.filter((guide) => guide.status !== 'draft').length,
  projectsWithPlans: guides.filter((guide) => guide.intent === 'build' && guide.cutList?.length && guide.dimensions).length,
  buyingGuidesWithDecisionCriteria: guides.filter((guide) => guide.intent === 'buy' && guide.sections.some((section) => section.id === 'full-cost') && guide.sections.some((section) => section.id === 'fit-and-skip')).length,
  repeatedPublicParagraphs: [...paragraphOwners.values()].filter((owners) => owners.length > 1).length,
  potentialIntentOverlaps: warnings.length,
}, null, 2))

if (warnings.length) console.warn(`Content overlap review notes (${warnings.length}):\n${warnings.slice(0, 20).join('\n')}`)
if (errors.length) throw new Error(`Content-quality audit failed (${errors.length}): ${errors.slice(0, 30).join(' ')}`)
console.log('Content-quality audit passed for the complete public guide library.')
