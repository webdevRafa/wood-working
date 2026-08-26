import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const expectedArg = process.argv.find((argument) => argument.startsWith('--expected='))
const expected = expectedArg ? Number(expectedArg.split('=')[1]) : undefined
const root = process.cwd()
const outputDir = join(root, 'dist')
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = (process.env.VITE_SITE_URL || (productionHost ? `https://${productionHost}` : 'http://localhost:5173')).replace(/\/$/, '')
const guides = JSON.parse(await readFile(join(root, 'content', 'guides.json'), 'utf8'))
const sitemap = await readFile(join(outputDir, 'sitemap.xml'), 'utf8')
const robots = await readFile(join(outputDir, 'robots.txt'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'))
const sitemapSet = new Set(sitemapUrls)
const failures = []

const expectedUrl = (path) => `${siteUrl}${path}`
const htmlFor = (path) => readFile(path === '/' ? join(outputDir, 'index.html') : join(outputDir, path.replace(/^\//, ''), 'index.html'), 'utf8')

if (expected !== undefined && guides.length !== expected) failures.push(`Expected ${expected} guides; found ${guides.length}.`)
if (sitemapSet.size !== sitemapUrls.length) failures.push('The sitemap contains duplicate URLs.')
if (!robots.includes('User-agent: *\nAllow: /')) failures.push('robots.txt does not explicitly allow public crawling.')
if (!robots.includes(`Sitemap: ${expectedUrl('/sitemap.xml')}`)) failures.push('robots.txt does not advertise the absolute sitemap URL.')

let indexableGuides = 0
for (const guide of guides) {
  const label = `${guide.id} (${guide.slug})`
  const canonical = expectedUrl(guide.canonicalPath)
  if (guide.indexStatus !== 'index') failures.push(`${label}: indexStatus is ${guide.indexStatus}.`)
  else indexableGuides += 1
  if (!sitemapSet.has(canonical)) failures.push(`${label}: canonical URL is missing from sitemap.xml.`)

  let html
  try {
    html = await htmlFor(guide.canonicalPath)
  } catch {
    failures.push(`${label}: prerendered HTML route is missing.`)
    continue
  }
  if (!html.includes('<meta name="robots" content="index,follow" />')) failures.push(`${label}: prerendered robots directive is not index,follow.`)
  if (html.includes('<meta name="robots" content="noindex')) failures.push(`${label}: prerendered HTML still contains noindex.`)
  if (!html.includes(`<link rel="canonical" href="${canonical}" />`)) failures.push(`${label}: self-referential canonical is missing or incorrect.`)
  if (!html.includes(`<meta property="og:url" content="${canonical}" />`)) failures.push(`${label}: Open Graph URL is missing or incorrect.`)
  if (!html.includes('<script type="application/ld+json">')) failures.push(`${label}: Article structured data is missing.`)
  if (!html.includes('data-prerendered="guide"')) failures.push(`${label}: guide content was not included in the initial HTML.`)
}

const requiredPublicPaths = [
  '/', '/start-here/', '/projects/', '/skills/', '/tools/', '/shop/', '/materials/', '/plans/',
  '/about/testing-method/', '/about/editorial-policy/', '/affiliate-disclosure/', '/corrections/',
  '/accessibility/', '/privacy/', '/terms/',
]

for (const path of requiredPublicPaths) {
  const canonical = expectedUrl(path)
  if (!sitemapSet.has(canonical)) failures.push(`${path}: public route is missing from sitemap.xml.`)
  try {
    const html = await htmlFor(path)
    if (!html.includes('<meta name="robots" content="index,follow" />')) failures.push(`${path}: public route is not index,follow.`)
    if (!html.includes(`<link rel="canonical" href="${canonical}" />`)) failures.push(`${path}: self-referential canonical is missing or incorrect.`)
  } catch {
    failures.push(`${path}: prerendered public route is missing.`)
  }
}

const savedUrl = expectedUrl('/saved/')
if (sitemapSet.has(savedUrl)) failures.push('/saved/: personalized route must not be included in the sitemap.')
try {
  const savedHtml = await htmlFor('/saved/')
  if (!savedHtml.includes('<meta name="robots" content="noindex,follow" />')) failures.push('/saved/: personalized route must remain noindex,follow.')
} catch {
  failures.push('/saved/: prerendered personalized route is missing.')
}

const expectedSitemapUrls = guides.length + requiredPublicPaths.length
if (sitemapUrls.length !== expectedSitemapUrls) failures.push(`Expected ${expectedSitemapUrls} sitemap URLs; found ${sitemapUrls.length}.`)
for (const url of sitemapUrls) {
  if (!url.startsWith(`${siteUrl}/`) && url !== `${siteUrl}/`) failures.push(`Sitemap URL is not an absolute canonical on ${siteUrl}: ${url}`)
}

console.log(JSON.stringify({
  guides: guides.length,
  indexableGuides,
  prerenderedPublicRoutes: guides.length + requiredPublicPaths.length,
  sitemapUrls: sitemapUrls.length,
  privateNoindexRoutes: 1,
  siteUrl,
}, null, 2))

if (failures.length) throw new Error(`SEO verification failed (${failures.length}): ${failures.slice(0, 25).join(' ')}`)
console.log('SEO verification passed: every public guide has crawlable HTML, index directives, a self-canonical, structured data, and sitemap coverage.')
