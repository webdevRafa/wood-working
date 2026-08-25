import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore'
import { validateGuides } from './lib/content-validation.mjs'

const args = new Set(process.argv.slice(2))
const commit = args.has('--commit')
const fileArgIndex = process.argv.indexOf('--file')
const file = resolve(fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const expectedProject = process.env.VITE_FIREBASE_PROJECT_ID || 'wood-working-c2184'
const guides = JSON.parse(await readFile(file, 'utf8'))
const validation = validateGuides(guides)

if (validation.errors.length) {
  console.error(validation.errors.slice(0, 50).join('\n'))
  throw new Error(`Import stopped: ${validation.errors.length} validation errors.`)
}

console.log(`Validated ${validation.stats.count} guides (${validation.stats.words} words).`)
if (!commit) {
  console.log('Dry run complete. No Firestore writes were made.')
  process.exit(0)
}

const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
let credential
let credentialProject
if (keyPath) {
  const serviceAccount = JSON.parse(await readFile(resolve(keyPath), 'utf8'))
  credentialProject = serviceAccount.project_id
  if (credentialProject !== expectedProject) throw new Error(`Service-account project mismatch: expected ${expectedProject}; received ${credentialProject}.`)
  credential = cert(serviceAccount)
} else {
  credential = applicationDefault()
}

const app = getApps()[0] ?? initializeApp({ credential, projectId: expectedProject })
const db = getFirestore(app)
const writer = db.bulkWriter()
let written = 0
let indexWritten = 0

writer.onWriteError((error) => {
  if (error.failedAttempts < 3) return true
  console.error(`Write failed for ${error.documentRef.path}: ${error.message}`)
  return false
})

for (const guide of guides) {
  const data = {
    ...guide,
    createdAt: Timestamp.fromDate(new Date(guide.createdAt)),
    updatedAt: Timestamp.fromDate(new Date(guide.updatedAt)),
    publishedAt: guide.publishedAt ? Timestamp.fromDate(new Date(guide.publishedAt)) : null,
    importedAt: FieldValue.serverTimestamp(),
  }
  writer.set(db.collection('guides').doc(guide.id), data, { merge: true })
  const indexData = {
    id: guide.id,
    slug: guide.slug,
    canonicalPath: guide.canonicalPath,
    type: guide.type,
    status: guide.status,
    indexStatus: guide.indexStatus,
    title: guide.title,
    dek: guide.dek,
    categoryId: guide.categoryId,
    clusterId: guide.clusterId,
    tags: guide.tags,
    intent: guide.intent,
    skillLevel: guide.skillLevel ?? null,
    activeMinutes: guide.activeMinutes ?? null,
    totalMinutes: guide.totalMinutes ?? null,
    costBand: guide.costBand ?? null,
    evidenceStatus: guide.evidenceStatus,
    updatedAt: Timestamp.fromDate(new Date(guide.updatedAt)),
    publishedAt: guide.publishedAt ? Timestamp.fromDate(new Date(guide.publishedAt)) : null,
    importedAt: FieldValue.serverTimestamp(),
  }
  writer.set(db.collection('guideIndex').doc(guide.id), indexData, { merge: true })
  written += 1
  indexWritten += 1
}

await writer.close()
const importId = `guides-${new Date().toISOString().replace(/[:.]/g, '-')}`
await db.collection('imports').doc(importId).set({
  collection: 'guides',
  sourceFile: file.split(/[\\/]/).pop(),
  guideCount: written,
  guideIndexCount: indexWritten,
  projectId: credentialProject ?? expectedProject,
  completedAt: FieldValue.serverTimestamp(),
  mode: 'merge',
})
console.log(`Imported ${written} guides and ${indexWritten} discovery records into ${expectedProject} with merge semantics. No documents were deleted.`)
