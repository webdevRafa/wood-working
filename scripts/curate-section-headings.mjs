import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { curateLearnSectionHeadings, PLACEHOLDER_LEARN_HEADINGS } from './lib/section-heading-curation.mjs'

const fileArgIndex = process.argv.indexOf('--file')
const file = resolve(fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const write = process.argv.includes('--write')
const current = JSON.parse(await readFile(file, 'utf8'))
const affectedGuideIds = new Set(current
  .filter((guide) => (guide.sections ?? []).some((section) => PLACEHOLDER_LEARN_HEADINGS.has(section.heading)))
  .map((guide) => guide.id))
const { guides, report } = curateLearnSectionHeadings(current)
const remainingPlaceholders = guides.flatMap((guide) => guide.sections ?? []).filter((section) => PLACEHOLDER_LEARN_HEADINGS.has(section.heading))

if (remainingPlaceholders.length) throw new Error(`${remainingPlaceholders.length} placeholder headings remain after curation.`)

const headingOwners = new Map()
for (const guide of guides) {
  for (const section of guide.sections ?? []) {
    const owners = headingOwners.get(section.heading) ?? []
    owners.push(guide.id)
    headingOwners.set(section.heading, owners)
  }
}
const repeatedLearnHeadings = [...headingOwners]
  .filter(([, owners]) => owners.length > 1)
  .filter(([heading]) => ![
    'Prepare and cut the parts from shared references',
    'Cut the joinery and prove the dry fit',
    'Assemble in a sequence that preserves access and square',
    'Fix the first cause, not the last symptom',
    'The short answer',
    'Compare the realistic routes',
    'Specifications that change real work',
    'Price the ready-to-work system',
    'Who should buy—and who should wait',
    'Verify the current product before checkout',
    'Where each method earns its place',
    'A concrete $100 shopping plan',
  ].includes(heading))

if (repeatedLearnHeadings.length) {
  throw new Error(`Repeated curated headings remain: ${repeatedLearnHeadings.slice(0, 10).map(([heading, owners]) => `${heading} (${owners.join(', ')})`).join('; ')}`)
}

if (write) {
  const revisedAt = new Date().toISOString()
  const updated = guides.map((guide) => affectedGuideIds.has(guide.id) ? { ...guide, updatedAt: revisedAt, contentVersion: Math.max(5, Number(guide.contentVersion ?? 0)) } : guide)
  await writeFile(file, `${JSON.stringify(updated, null, 2)}\n`)
}

console.log(JSON.stringify({ ...report, remainingPlaceholders: remainingPlaceholders.length, repeatedCuratedHeadings: repeatedLearnHeadings.length, wroteFile: write }, null, 2))
