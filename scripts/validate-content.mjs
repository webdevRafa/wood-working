import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { validateGuides } from './lib/content-validation.mjs'

const file = resolve(process.argv[2] ?? 'content/guides.json')
const guides = JSON.parse(await readFile(file, 'utf8'))
const expectedArg = process.argv.find((argument) => argument.startsWith('--expected='))
const expectedCount = expectedArg ? Number(expectedArg.split('=')[1]) : undefined
const result = validateGuides(guides, { expectedCount })

console.log(JSON.stringify(result.stats, null, 2))
if (result.warnings.length) {
  console.warn(`Warnings (${result.warnings.length}):`)
  console.warn(result.warnings.slice(0, 30).join('\n'))
  if (result.warnings.length > 30) console.warn(`…and ${result.warnings.length - 30} more warnings.`)
}
if (result.errors.length) {
  console.error(`Errors (${result.errors.length}):`)
  console.error(result.errors.slice(0, 50).join('\n'))
  process.exitCode = 1
} else {
  console.log(`Content validation passed for ${file}.`)
}
