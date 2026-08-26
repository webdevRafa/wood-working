import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Guide, GuideIndexItem } from '../src/types/content'

const outputDir = join(process.cwd(), 'dist')
const template = await readFile(join(outputDir, 'index.html'), 'utf8')
const guides = JSON.parse(await readFile(join(process.cwd(), 'content', 'guides.json'), 'utf8')) as Guide[]
const guideById = new Map(guides.map((guide) => [guide.id, guide]))
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = (process.env.VITE_SITE_URL || (productionHost ? `https://${productionHost}` : 'http://localhost:5173')).replace(/\/$/, '')

type Page = {
  path: string
  title: string
  description: string
  image?: string
  lastmod?: string
  noindex?: boolean
  body: string
  jsonLd?: Record<string, unknown>
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] ?? character)
const absolute = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

function guideBody(guide: Guide) {
  const sectionPath = guide.canonicalPath.split('/').filter(Boolean)[0]
  const sourceBacked = guide.status === 'published' && guide.evidenceStatus === 'research-reviewed'
  const cover = guide.coverImage
    ? `<figure class="mt-10 overflow-hidden rounded-2xl bg-sawdust"><img src="${escapeHtml(guide.coverImage)}" alt="${escapeHtml(guide.coverAlt ?? '')}" width="1200" height="800" class="aspect-[3/2] w-full object-cover" /></figure>`
    : ''
  const tools = guide.tools.length ? `<section class="mt-12"><h2>Tools</h2><ul>${guide.tools.map((tool) => `<li><strong>${escapeHtml(tool.name)}</strong>${tool.required ? ' — required' : ' — optional'}: ${escapeHtml(tool.purpose)}${tool.substitute ? ` Substitute: ${escapeHtml(tool.substitute)}` : ''}</li>`).join('')}</ul></section>` : ''
  const materials = guide.materials.length ? `<section class="mt-12"><h2>Materials</h2><ul>${guide.materials.map((material) => `<li><strong>${escapeHtml(material.name)}</strong> — ${escapeHtml(material.quantity)}${material.notes ? `: ${escapeHtml(material.notes)}` : ''}</li>`).join('')}</ul></section>` : ''
  const cutList = guide.cutList?.length ? `<section class="mt-12"><h2>Cut list</h2><table><thead><tr><th>Part</th><th>Qty</th><th>Thickness</th><th>Width</th><th>Length</th></tr></thead><tbody>${guide.cutList.map((item) => `<tr><td>${escapeHtml(item.part)}${item.notes ? ` — ${escapeHtml(item.notes)}` : ''}</td><td>${item.quantity}</td><td>${escapeHtml(item.thickness)}</td><td>${escapeHtml(item.width)}</td><td>${escapeHtml(item.length)}</td></tr>`).join('')}</tbody></table></section>` : ''
  const related = guide.relatedGuideIds.map((id) => guideById.get(id)).filter((item) => item !== undefined)
  const evidence = sourceBacked
    ? '<p class="mt-5 rounded-xl border border-pine/20 bg-sawdust p-5 text-sm leading-6"><strong>Evidence status:</strong> Central guidance was reviewed against the sources listed below. No hands-on testing is claimed.</p>'
    : '<p class="mt-5 rounded-xl border border-red-300 bg-red-50 p-5 text-sm leading-6"><strong>Working draft:</strong> This accessible research draft is not included in the search index. Treat dimensions, loads, compatibility, and product details as unverified.</p>'
  const sources = sourceBacked && guide.sources.length
    ? `<section id="sources" class="mt-12 border-t border-walnut/10 pt-8"><h2 class="font-display text-3xl font-black">Sources and limits</h2><p class="mt-4 text-lg leading-8 text-steel">These sources support the general principles in this guide. Current product instructions, technical data, hardware drawings, and local requirements take priority.</p><ul>${guide.sources.map((source) => `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.title)}</a></li>`).join('')}</ul></section>`
    : ''
  return `<main data-prerendered="guide" class="min-h-screen bg-paper text-walnut"><header class="border-b border-walnut/10 bg-white"><div class="mx-auto flex max-w-[1180px] items-center gap-3 px-5 py-5 sm:px-8"><span class="grid h-11 w-11 place-items-center rounded-[0.45rem] bg-amber font-display text-sm font-black text-walnut ring-1 ring-walnut/10">BT</span><strong class="font-display text-lg font-black">Built True Workshop</strong></div></header><article class="mx-auto max-w-[900px] px-5 py-14 sm:px-8 sm:py-20"><nav aria-label="Breadcrumb" class="text-xs font-bold uppercase tracking-[0.12em] text-steel"><a class="text-pine" href="/">Home</a> / <a class="text-pine" href="/${sectionPath}/">${escapeHtml(sectionPath)}</a></nav><p class="mt-10 text-[10px] font-black uppercase tracking-[0.18em] text-amber">${escapeHtml(guide.type)} · ${escapeHtml(guide.intent)} · ${sourceBacked ? 'source-backed guide' : 'working draft'}</p><h1 class="mt-4 font-display text-[clamp(3rem,7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.055em]">${escapeHtml(guide.title)}</h1><p class="mt-6 max-w-3xl text-xl leading-8 text-steel">${escapeHtml(guide.dek)}</p>${cover}<p class="mt-8 rounded-xl border border-amber/25 bg-sawdust p-5 text-sm leading-6"><strong>Affiliate disclosure:</strong> ${escapeHtml(guide.affiliateDisclosure)}</p>${evidence}${tools}${materials}${cutList}${guide.safetyNotes.length ? `<section class="mt-12"><h2 class="font-display text-3xl font-black">Before you start</h2><ul class="mt-5 grid gap-3 text-steel">${guide.safetyNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul></section>` : ''}${guide.sections.map((section) => `<section id="${escapeHtml(section.id)}" class="mt-12 border-t border-walnut/10 pt-8"><h2 class="font-display text-3xl font-black">${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p class="mt-4 text-lg leading-8 text-steel">${escapeHtml(paragraph)}</p>`).join('')}${section.bullets ? `<ul class="mt-5 grid gap-3 text-steel">${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('')}${sources}${related.length ? `<aside class="mt-14 border-t border-walnut/10 pt-8"><h2>Continue learning</h2><ul>${related.map((item) => `<li><a href="${escapeHtml(item.canonicalPath)}">${escapeHtml(item.title)}</a></li>`).join('')}</ul></aside>` : ''}</article></main>`
}

function articleJsonLd(guide: Guide) {
  const sectionPath = guide.canonicalPath.split('/').filter(Boolean)[0]
  const article: Record<string, unknown> = {
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    dateModified: guide.updatedAt,
    mainEntityOfPage: absolute(guide.canonicalPath),
    author: { '@type': 'Organization', name: 'Built True Workshop', url: absolute('/about/') },
    publisher: { '@type': 'Organization', name: 'Built True Workshop', url: absolute('/') },
    image: absolute(guide.coverImage ?? '/og.png'),
    isAccessibleForFree: true,
    citation: guide.sources.map((source) => source.url),
  }
  if (guide.publishedAt) article.datePublished = guide.publishedAt
  return {
    '@context': 'https://schema.org',
    '@graph': [
      article,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
          { '@type': 'ListItem', position: 2, name: sectionPath, item: absolute(`/${sectionPath}/`) },
          { '@type': 'ListItem', position: 3, name: guide.title, item: absolute(guide.canonicalPath) },
        ],
      },
    ],
  }
}

const hubs = [
  { path: '/', title: 'Built True Workshop | Build with confidence', description: 'Source-backed woodworking starter guides, practical project references, and honest tool decisions.', types: [] as string[] },
  { path: '/start-here/', title: 'Start Here | Built True Workshop', description: 'Find a practical woodworking starting point based on your experience, time, and goal.', types: [] as string[] },
  { path: '/projects/', title: 'Projects | Built True Workshop', description: 'Woodworking project references with clear evidence labels, realistic difficulty, cut lists where reviewed, and safer next steps.', types: ['project'] },
  { path: '/skills/', title: 'Skills | Built True Workshop', description: 'Plain-language woodworking lessons for measuring, cutting, joinery, sanding, finishing, and troubleshooting.', types: ['skill', 'troubleshooting'] },
  { path: '/tools/', title: 'Tool Decisions | Built True Workshop', description: 'Honest woodworking tool comparisons based on fit, ownership cost, shop constraints, and reasons to skip.', types: ['review', 'comparison'] },
  { path: '/shop/', title: 'Shop Setup | Built True Workshop', description: 'Workbenches, storage, dust collection, lighting, and workflow for practical home woodshops.', types: ['shop'] },
  { path: '/materials/', title: 'Materials & Finishes | Built True Workshop', description: 'Wood, sheet goods, adhesives, abrasives, stains, and finishes explained through real project decisions.', types: ['material'] },
  { path: '/plans/', title: 'Woodworking Plans | Built True Workshop', description: 'Source-backed woodworking plans organized around coherent dimensions, materials, cut lists, assembly decisions, and safer tool routes.', types: ['project'] },
]

const pages: Page[] = hubs.map((hub) => {
  const links = hub.types.length ? guides.filter((guide) => hub.types.includes(guide.type)) : guides.slice(0, 8)
  return {
    ...hub,
    body: `<main data-prerendered="hub" class="min-h-screen bg-paper text-walnut"><header class="border-b border-walnut/10 bg-white"><div class="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 py-5 sm:px-8"><a href="/" class="flex items-center gap-3"><span class="grid h-11 w-11 place-items-center rounded-[0.45rem] bg-amber font-display text-sm font-black text-walnut ring-1 ring-walnut/10">BT</span><strong class="font-display text-lg font-black">Built True Workshop</strong></a><span class="text-xs font-black uppercase tracking-[0.14em] text-pine">Build with confidence</span></div></header><section class="border-b border-walnut/10 bg-sawdust"><div class="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24"><p class="text-[10px] font-black uppercase tracking-[0.18em] text-pine">Practical woodworking, honestly taught</p><h1 class="mt-4 max-w-5xl font-display text-[clamp(3.2rem,8vw,6.2rem)] font-black leading-[0.9] tracking-[-0.06em]">${escapeHtml(hub.title.split(' | ')[0])}</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-steel">${escapeHtml(hub.description)}</p></div></section><nav aria-label="Guide directory" class="mx-auto max-w-[1280px] px-5 py-12 sm:px-8"><p class="text-[10px] font-black uppercase tracking-[0.18em] text-amber">Start at the bench</p><ul class="mt-5 grid gap-4 md:grid-cols-2">${links.map((guide) => `<li><a class="block rounded-xl border border-walnut/10 bg-white p-5 font-display text-xl font-black leading-tight hover:border-pine" href="${escapeHtml(guide.canonicalPath)}">${escapeHtml(guide.title)}</a></li>`).join('')}</ul></nav></main>`,
  }
})

const staticPages = [
  ['/about/', 'About Built True Workshop', 'How Built True Workshop reviews woodworking guidance, labels evidence, corrects errors, and separates editorial decisions from commercial relationships.'],
  ['/about/testing-method/', 'Testing Method | Built True Workshop', 'How Built True Workshop tests, researches, and updates tool recommendations.'],
  ['/about/editorial-policy/', 'Editorial Policy | Built True Workshop', 'The quality and evidence standards every Built True Workshop guide must pass.'],
  ['/affiliate-disclosure/', 'Affiliate Disclosure | Built True Workshop', 'How affiliate links support Built True Workshop and how paid relationships are disclosed.'],
  ['/corrections/', 'Corrections | Built True Workshop', 'How to report a problem and how Built True Workshop reviews and corrects its guidance.'],
  ['/accessibility/', 'Accessibility | Built True Workshop', 'Built True Workshop accessibility standards and how to report a barrier.'],
  ['/privacy/', 'Privacy | Built True Workshop', 'How Built True Workshop handles account, saved-guide, and usage data.'],
  ['/terms/', 'Terms | Built True Workshop', 'Terms for using Built True Workshop guides and third-party product information.'],
] as const

for (const [path, title, description] of staticPages) pages.push({ path, title, description, body: `<main data-prerendered="static"><h1>${escapeHtml(title.split(' | ')[0])}</h1><p>${escapeHtml(description)}</p></main>` })
for (const [path, title, description] of [
  ['/saved/', 'Saved Guides | Built True Workshop', 'Your private saved woodworking guides.'],
  ['/search/', 'Search Woodworking Guides | Built True Workshop', 'Search the complete Built True Workshop guide library.'],
] as const) pages.push({ path, title, description, noindex: true, body: `<main data-prerendered="private"><h1>${escapeHtml(title.split(' | ')[0])}</h1><p>${escapeHtml(description)}</p></main>` })

for (const guide of guides) {
  pages.push({
    path: guide.canonicalPath,
    title: guide.seoTitle,
    description: guide.metaDescription,
    image: guide.coverImage,
    lastmod: guide.updatedAt,
    noindex: guide.indexStatus !== 'index',
    body: guideBody(guide),
    jsonLd: articleJsonLd(guide),
  })
}

function render(page: Page) {
  const canonical = absolute(page.path)
  const image = absolute(page.image ?? '/og.png')
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

  const headExtras = `<link rel="canonical" href="${escapeHtml(canonical)}" /><meta property="og:url" content="${escapeHtml(canonical)}" /><meta name="robots" content="${page.noindex ? 'noindex,follow' : 'index,follow'}" />${page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')}</script>` : ''}`
  html = html.replace('</head>', `    ${headExtras}\n  </head>`)
  return html
}

for (const page of pages) {
  const target = page.path === '/' ? join(outputDir, 'index.html') : join(outputDir, page.path.replace(/^\//, ''), 'index.html')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, render(page), 'utf8')
}

const guideDataDir = join(outputDir, 'data', 'guides')
await mkdir(guideDataDir, { recursive: true })
const guideIndex: GuideIndexItem[] = guides.map((guide) => ({
  id: guide.id,
  slug: guide.slug,
  canonicalPath: guide.canonicalPath,
  type: guide.type,
  status: guide.status,
  indexStatus: guide.indexStatus,
  title: guide.title,
  dek: guide.dek,
  coverImage: guide.coverImage,
  coverAlt: guide.coverAlt,
  categoryId: guide.categoryId,
  clusterId: guide.clusterId,
  tags: guide.tags,
  intent: guide.intent,
  skillLevel: guide.skillLevel,
  activeMinutes: guide.activeMinutes,
  totalMinutes: guide.totalMinutes,
  costBand: guide.costBand,
  evidenceStatus: guide.evidenceStatus,
  updatedAt: guide.updatedAt,
}))
await writeFile(join(outputDir, 'data', 'guide-index.json'), JSON.stringify(guideIndex), 'utf8')
await Promise.all(guides.map((guide) => writeFile(join(guideDataDir, `${guide.slug}.json`), JSON.stringify(guide), 'utf8')))

const sitemapPages = pages.filter((page) => !page.noindex)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map((page) => `  <url><loc>${escapeHtml(absolute(page.path))}</loc>${page.lastmod ? `<lastmod>${escapeHtml(page.lastmod.slice(0, 10))}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`
await writeFile(join(outputDir, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(join(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`, 'utf8')
console.log(`Prerendered ${pages.length} routes, ${sitemapPages.length} sitemap URLs, and ${guides.length} resilient guide-data fallbacks for ${siteUrl}.`)
