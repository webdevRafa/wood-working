import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { guides } from '../src/data/guides'
import type { Guide } from '../src/types/content'

const outputDir = join(process.cwd(), 'dist')
const template = await readFile(join(outputDir, 'index.html'), 'utf8')
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = (process.env.VITE_SITE_URL || (productionHost ? `https://${productionHost}` : 'http://localhost:5173')).replace(/\/$/, '')

type Page = {
  path: string
  title: string
  description: string
  noindex?: boolean
  body: string
  jsonLd?: Record<string, unknown>
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] ?? character)
const absolute = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

function guideBody(guide: Guide) {
  const sectionPath = guide.canonicalPath.split('/').filter(Boolean)[0]
  return `<main data-prerendered="guide"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/${sectionPath}/">${escapeHtml(sectionPath)}</a></nav><article><p>${escapeHtml(guide.type)} · ${escapeHtml(guide.intent)}</p><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.dek)}</p><p>${escapeHtml(guide.affiliateDisclosure)}</p>${guide.safetyNotes.length ? `<section><h2>Before you start</h2><ul>${guide.safetyNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul></section>` : ''}${guide.sections.map((section) => `<section id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('')}</article></main>`
}

function articleJsonLd(guide: Guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedAt ?? guide.createdAt,
    dateModified: guide.updatedAt,
    mainEntityOfPage: absolute(guide.canonicalPath),
    author: { '@type': 'Organization', name: 'Built True Workshop' },
    publisher: { '@type': 'Organization', name: 'Built True Workshop' },
    image: absolute('/og.png'),
  }
}

const hubs = [
  { path: '/', title: 'Built True Workshop | Build with confidence', description: 'Practical woodworking projects, honest tool guidance, and shop-tested skills for building with confidence.', types: [] as string[] },
  { path: '/start-here/', title: 'Start Here | Built True Workshop', description: 'Find a practical woodworking starting point based on your experience, time, and goal.', types: [] as string[] },
  { path: '/projects/', title: 'Projects | Built True Workshop', description: 'Measured woodworking builds with realistic difficulty, cut lists, minimum-tool paths, and recovery notes.', types: ['project'] },
  { path: '/skills/', title: 'Skills | Built True Workshop', description: 'Plain-language woodworking lessons for measuring, cutting, joinery, sanding, finishing, and troubleshooting.', types: ['skill', 'troubleshooting'] },
  { path: '/tools/', title: 'Tool Decisions | Built True Workshop', description: 'Honest woodworking tool comparisons based on fit, ownership cost, shop constraints, and reasons to skip.', types: ['review', 'comparison'] },
  { path: '/shop/', title: 'Shop Setup | Built True Workshop', description: 'Workbenches, storage, dust collection, lighting, and workflow for practical home woodshops.', types: ['shop'] },
  { path: '/materials/', title: 'Materials & Finishes | Built True Workshop', description: 'Wood, sheet goods, adhesives, abrasives, stains, and finishes explained through real project decisions.', types: ['material'] },
  { path: '/plans/', title: 'Woodworking Plans | Built True Workshop', description: 'Woodworking plans built around verified cut lists, sensible material use, and minimum-tool routes.', types: ['project'] },
]

const pages: Page[] = hubs.map((hub) => {
  const links = hub.types.length ? guides.filter((guide) => hub.types.includes(guide.type)) : guides.slice(0, 8)
  return {
    ...hub,
    body: `<main data-prerendered="hub"><h1>${escapeHtml(hub.title.split(' | ')[0])}</h1><p>${escapeHtml(hub.description)}</p><nav aria-label="Guide directory"><ul>${links.map((guide) => `<li><a href="${escapeHtml(guide.canonicalPath)}">${escapeHtml(guide.title)}</a></li>`).join('')}</ul></nav></main>`,
  }
})

const staticPages = [
  ['/about/testing-method/', 'Testing Method | Built True Workshop', 'How Built True Workshop tests, researches, and updates tool recommendations.'],
  ['/about/editorial-policy/', 'Editorial Policy | Built True Workshop', 'The quality and evidence standards every Built True Workshop guide must pass.'],
  ['/affiliate-disclosure/', 'Affiliate Disclosure | Built True Workshop', 'How affiliate links support Built True Workshop and how paid relationships are disclosed.'],
  ['/corrections/', 'Corrections | Built True Workshop', 'How to report a problem and how Built True Workshop reviews and corrects its guidance.'],
  ['/accessibility/', 'Accessibility | Built True Workshop', 'Built True Workshop accessibility standards and how to report a barrier.'],
] as const

for (const [path, title, description] of staticPages) pages.push({ path, title, description, body: `<main data-prerendered="static"><h1>${escapeHtml(title.split(' | ')[0])}</h1><p>${escapeHtml(description)}</p></main>` })
for (const [path, title, description] of [
  ['/privacy/', 'Privacy | Built True Workshop', 'Built True Workshop privacy policy draft.'],
  ['/terms/', 'Terms | Built True Workshop', 'Built True Workshop terms of use draft.'],
  ['/saved/', 'Saved Guides | Built True Workshop', 'Your private saved woodworking guides.'],
] as const) pages.push({ path, title, description, noindex: true, body: `<main data-prerendered="private"><h1>${escapeHtml(title.split(' | ')[0])}</h1><p>${escapeHtml(description)}</p></main>` })

for (const guide of guides) {
  pages.push({
    path: guide.canonicalPath,
    title: guide.seoTitle,
    description: guide.metaDescription,
    noindex: guide.indexStatus !== 'index',
    body: guideBody(guide),
    jsonLd: articleJsonLd(guide),
  })
}

function render(page: Page) {
  const canonical = absolute(page.path)
  const image = absolute('/og.png')
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${escapeHtml(image)}" />`)
    .replace(/<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta\s+name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${escapeHtml(image)}" />`)
    .replace('<div id="root"></div>', `<div id="root">${page.body}</div>`)

  const headExtras = `<link rel="canonical" href="${escapeHtml(canonical)}" /><meta name="robots" content="${page.noindex ? 'noindex,follow' : 'index,follow'}" />${page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')}</script>` : ''}`
  html = html.replace('</head>', `    ${headExtras}\n  </head>`)
  return html
}

for (const page of pages) {
  const target = page.path === '/' ? join(outputDir, 'index.html') : join(outputDir, page.path.replace(/^\//, ''), 'index.html')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, render(page), 'utf8')
}

const sitemapPages = pages.filter((page) => !page.noindex)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map((page) => `  <url><loc>${escapeHtml(absolute(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(join(outputDir, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(join(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`, 'utf8')
console.log(`Prerendered ${pages.length} routes and ${sitemapPages.length} sitemap URLs for ${siteUrl}.`)
