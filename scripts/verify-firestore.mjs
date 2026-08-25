import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const expectedArg = process.argv.find((argument) => argument.startsWith('--expected='))
const expected = expectedArg ? Number(expectedArg.split('=')[1]) : undefined
const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
if (!keyPath) throw new Error('Set FIREBASE_SERVICE_ACCOUNT_PATH before verifying Firestore.')
const serviceAccount = JSON.parse(await readFile(resolve(keyPath), 'utf8'))
if (serviceAccount.project_id !== 'wood-working-c2184') throw new Error('Service-account project mismatch.')
const app = getApps()[0] ?? initializeApp({ credential: cert(serviceAccount), projectId: serviceAccount.project_id })
const db = getFirestore(app)
const [all, drafts, published, allIndex, draftIndex, publishedIndex] = await Promise.all([
  db.collection('guides').count().get(),
  db.collection('guides').where('status', '==', 'draft').count().get(),
  db.collection('guides').where('status', '==', 'published').count().get(),
  db.collection('guideIndex').count().get(),
  db.collection('guideIndex').where('status', '==', 'draft').count().get(),
  db.collection('guideIndex').where('status', '==', 'published').count().get(),
])
const stats = {
  guides: { total: all.data().count, drafts: drafts.data().count, published: published.data().count },
  guideIndex: { total: allIndex.data().count, drafts: draftIndex.data().count, published: publishedIndex.data().count },
}
console.log(JSON.stringify(stats, null, 2))
if (expected !== undefined && stats.guides.total < expected) throw new Error(`Expected at least ${expected} Firestore guides; found ${stats.guides.total}.`)
if (expected !== undefined && stats.guideIndex.total < expected) throw new Error(`Expected at least ${expected} Firestore discovery records; found ${stats.guideIndex.total}.`)
if (stats.guides.drafts !== stats.guideIndex.drafts || stats.guides.published !== stats.guideIndex.published) throw new Error('Guide and discovery publication counts do not match.')
console.log(`Firestore verification passed for ${serviceAccount.project_id}.`)
