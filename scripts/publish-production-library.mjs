import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { publishProductionCorpus } from './lib/production-editorial.mjs'
import { validateGuides } from './lib/content-validation.mjs'

const fileArgIndex = process.argv.indexOf('--file')
const file = resolve(fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const current = JSON.parse(await readFile(file, 'utf8'))
const publishedAt = new Date().toISOString()
const guides = publishProductionCorpus(current, publishedAt)
const report = validateGuides(guides, current.length)

if (report.errors.length) {
  throw new Error(`Production library validation failed (${report.errors.length}): ${report.errors.slice(0, 30).join(' ')}`)
}

await writeFile(file, `${JSON.stringify(guides, null, 2)}\n`)
console.log(`Published ${guides.length} source-backed production guides to ${file}.`)
console.log(JSON.stringify({ ...report.stats, warnings: report.warnings.length, publishedAt }, null, 2))
