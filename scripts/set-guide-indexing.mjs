import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const fileArgIndex = process.argv.indexOf('--file')
const file = resolve(fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const guides = JSON.parse(await readFile(file, 'utf8'))
let changed = 0

for (const guide of guides) {
  if (guide.indexStatus !== 'index') {
    guide.indexStatus = 'index'
    changed += 1
  }
}

await writeFile(file, `${JSON.stringify(guides, null, 2)}\n`, 'utf8')
console.log(`Marked ${guides.length} public guides indexable (${changed} changed) in ${file}.`)
