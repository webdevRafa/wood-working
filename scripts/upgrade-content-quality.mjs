import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { upgradeGuideCorpus } from './lib/content-quality.mjs'

const fileArgIndex = process.argv.indexOf('--file')
const file = resolve(fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const guides = JSON.parse(await readFile(file, 'utf8'))
const upgraded = upgradeGuideCorpus(guides)
await writeFile(file, `${JSON.stringify(upgraded, null, 2)}\n`, 'utf8')
console.log(`Upgraded ${upgraded.length} guides with reader-facing copy, topic-specific sections, literal title fulfillment, project plans, and contextual related reading.`)
