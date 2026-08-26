import { readFile } from 'node:fs/promises'
import { deleteApp, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, limit, query, terminate, where } from 'firebase/firestore'

const expectedArg = process.argv.find((argument) => argument.startsWith('--expected='))
const expected = expectedArg ? Number(expectedArg.split('=')[1]) : undefined

function parseEnvironment(source) {
  return Object.fromEntries(
    source
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=')
        return [line.slice(0, separator), line.slice(separator + 1)]
      }),
  )
}

let localEnvironment = {}
try {
  localEnvironment = parseEnvironment(await readFile('.env.local', 'utf8'))
} catch {
  // CI and deployment environments supply these values directly.
}
const environment = { ...localEnvironment, ...process.env }
const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]
const missingKeys = requiredKeys.filter((key) => !environment[key])
if (missingKeys.length) throw new Error(`Missing Firebase client configuration: ${missingKeys.join(', ')}`)

const app = initializeApp({
  apiKey: environment.VITE_FIREBASE_API_KEY,
  authDomain: environment.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: environment.VITE_FIREBASE_PROJECT_ID,
  storageBucket: environment.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.VITE_FIREBASE_APP_ID,
})
const db = getFirestore(app)
const publicStatuses = ['draft', 'review', 'published']

try {
  const [indexSnapshot, guideSnapshot] = await Promise.all([
    getDocs(query(collection(db, 'guideIndex'), where('status', 'in', publicStatuses), limit(500))),
    getDocs(query(collection(db, 'guides'), where('status', 'in', publicStatuses), limit(500))),
  ])
  const guideById = new Map(guideSnapshot.docs.map((document) => [document.id, document.data()]))
  const routeProblems = []
  let indexableGuides = 0

  for (const indexDocument of indexSnapshot.docs) {
    const indexGuide = indexDocument.data()
    const guide = guideById.get(indexDocument.id)
    if (!guide) {
      routeProblems.push(`${indexDocument.id}: full guide is missing`)
      continue
    }
    if (guide.slug !== indexGuide.slug) routeProblems.push(`${indexDocument.id}: discovery and guide slugs differ`)
    if (guide.canonicalPath !== indexGuide.canonicalPath) routeProblems.push(`${indexDocument.id}: canonical paths differ`)
    if (!guide.coverImage || !guide.coverAlt) routeProblems.push(`${indexDocument.id}: cover metadata is missing`)
    if (guide.indexStatus !== 'index' || indexGuide.indexStatus !== 'index') routeProblems.push(`${indexDocument.id}: guide and discovery records must both be indexable`)
    else indexableGuides += 1
  }

  const sampleIndexes = [...new Set([0, Math.floor(indexSnapshot.size / 2), indexSnapshot.size - 1])]
  for (const sampleIndex of sampleIndexes) {
    const sample = indexSnapshot.docs[sampleIndex]?.data()
    if (!sample?.slug) continue
    const slugSnapshot = await getDocs(query(
      collection(db, 'guides'),
      where('slug', '==', sample.slug),
      where('status', 'in', publicStatuses),
      limit(1),
    ))
    if (slugSnapshot.empty) routeProblems.push(`Slug lookup failed for ${sample.slug}`)
  }

  const stats = {
    discoveryRecords: indexSnapshot.size,
    fullGuides: guideSnapshot.size,
    indexableGuides,
    openableRoutes: indexSnapshot.size - routeProblems.length,
    routeProblems: routeProblems.length,
  }
  console.log(JSON.stringify(stats, null, 2))
  if (expected !== undefined && indexSnapshot.size !== expected) throw new Error(`Expected ${expected} public discovery records; found ${indexSnapshot.size}.`)
  if (expected !== undefined && guideSnapshot.size !== expected) throw new Error(`Expected ${expected} public guides; found ${guideSnapshot.size}.`)
  if (expected !== undefined && indexableGuides !== expected) throw new Error(`Expected ${expected} indexable public guides; found ${indexableGuides}.`)
  if (routeProblems.length) throw new Error(`Public library verification failed: ${routeProblems.slice(0, 20).join('; ')}`)
  console.log('Public Firebase guide verification passed.')
} finally {
  await terminate(db)
  await deleteApp(app)
}
