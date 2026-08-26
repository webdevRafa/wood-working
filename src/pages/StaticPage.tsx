import { Link } from 'react-router'
import { usePageMeta } from '../hooks/usePageMeta'

type StaticPageKey =
  | 'testing'
  | 'editorial'
  | 'disclosure'
  | 'corrections'
  | 'privacy'
  | 'terms'
  | 'accessibility'

const pages: Record<StaticPageKey, { eyebrow: string; title: string; description: string; sections: Array<{ heading: string; body: string[] }> }> = {
  testing: {
    eyebrow: 'Trust is the product',
    title: 'How we test, research, and make recommendations',
    description: 'A recommendation earns its place through a clear use case, relevant evidence, real limitations, and an honest alternative.',
    sections: [
      { heading: 'Claims must match the evidence', body: ['We describe a tool as tested only when the model, setup, material, consumables, date, repeated results, and limitations were documented. Otherwise, the guidance is presented as research and decision criteria—not borrowed first-hand authority.', 'A useful comparison separates current manufacturer specifications from observations that would require hands-on work. It also states who should skip the purchase and what lower-cost method solves the same problem.'] },
      { heading: 'We choose by reader fit', body: ['Products are selected because they are relevant to the buyer decision—not because the commission is attractive. We explain who should choose the product, who should skip it, and what less-expensive route solves the same problem.'] },
      { heading: 'We count ownership cost', body: ['The usable system includes blades, bits, batteries, rails, adapters, dust collection, stands, required accessories, floor space, power, and recurring consumables. Those details matter more than a sale sticker.'] },
      { heading: 'We revisit the verdict', body: ['A model change, recall, meaningful price-class change, discontinued part, or strong reader correction triggers review. Dates change only when the substance changes.'] },
    ],
  },
  editorial: {
    eyebrow: 'Editorial policy', title: 'Useful enough to finish the job', description: 'Every indexable guide must help a real reader complete a task without returning to search for missing basics.',
    sections: [
      { heading: 'Original value is required', body: ['A page must add a verified build, measurement, calculation, diagram, test, failure analysis, decision framework, or qualified experience. Rephrasing existing search results is not enough.'] },
      { heading: 'The title is a contract', body: ['A numbered title contains the promised number of useful items. A budget guide contains a real line-item budget. A project includes starting dimensions, materials, a cut list, an assembly order, and mistakes to avoid. A comparison explains the tradeoffs instead of manufacturing a universal winner.'] },
      { heading: 'Specific beats padded', body: ['Guides prioritize measurements, compatibility, grain, cutter or abrasive choices, setup references, cost, and visible success checks. Repeated filler and interchangeable conclusions are removed even when that produces a shorter page.'] },
      { heading: 'Corrections stay visible', body: ['We correct consequential errors promptly and maintain a change note on material revisions. Readers can report unclear steps, wrong dimensions, broken links, or unsafe guidance from every guide.'] },
    ],
  },
  disclosure: {
    eyebrow: 'Affiliate disclosure', title: 'Some links can earn us a commission', description: 'If you buy through a qualifying link, Built True Workshop may earn a commission at no extra cost to you.',
    sections: [
      { heading: 'What the relationship means', body: ['Affiliate programs pay a publisher when a reader follows a tracked link and completes a qualifying action. The merchant—not the reader—pays the commission.', 'We place a clear disclosure before monetized links and near recommendations so the relationship is understandable at the point of decision.'] },
      { heading: 'What it does not change', body: ['Commission does not make a weak product a good fit. Editorial decisions, evidence labels, downsides, and alternatives remain separate from merchant terms. A program can be removed when quality, availability, safety, or trust changes.'] },
      { heading: 'Prices and availability', body: ['Merchant price, stock, shipping, warranty, and return information can change. Verify the final terms at the merchant before purchasing.'] },
    ],
  },
  corrections: {
    eyebrow: 'Corrections', title: 'Help us make the guide better', description: 'Woodworking instructions should improve when a reader finds a clearer, safer, or more accurate path.',
    sections: [
      { heading: 'What to report', body: ['Tell us the guide URL, the exact step or claim, what you observed, and—when relevant—the actual dimensions, tool model, material, or finish conditions. Never put private credentials or account information in a report.'] },
      { heading: 'What happens next', body: ['We reproduce or verify the issue where possible, consult a qualified reviewer for safety-critical claims, correct the page, and update the change note when the correction is material.'] },
    ],
  },
  privacy: {
    eyebrow: 'Privacy', title: 'Collect less. Explain the rest.', description: 'How Built True Workshop handles account, saved-guide, newsletter, and usage information.',
    sections: [
      { heading: 'Data you choose to provide', body: ['An account may store your display name, email address, saved guides, progress, and private notes. Newsletter signup stores the email and consent preferences needed to deliver it.'] },
      { heading: 'Usage information', body: ['The site may measure page views, completion events, search terms, outbound affiliate clicks, and errors. Analytics should avoid unnecessary personal data and follow the consent requirements that apply to the visitor.'] },
      { heading: 'Controls', body: ['Users should be able to export or delete their saved content and unsubscribe from marketing email. Retention periods, subprocessors, contact details, and jurisdiction-specific rights must be finalized before launch.'] },
    ],
  },
  terms: {
    eyebrow: 'Terms', title: 'Use the workshop guidance responsibly', description: 'The rules for using Built True Workshop educational guidance and third-party product information.',
    sections: [
      { heading: 'Educational information', body: ['Guides are educational and cannot account for every tool, material, shop, building condition, code, or skill level. Manufacturer instructions and applicable professional or code requirements take priority.'] },
      { heading: 'Safety and professional work', body: ['Stop when an operation is unclear or cannot be performed with guards, stable workholding, and controlled body position. Electrical, structural, ventilation, code, and high-risk work may require a qualified professional.'] },
      { heading: 'Third-party products', body: ['Merchants control product price, stock, warranty, returns, and fulfillment. Verify those terms before buying. Product names and trademarks belong to their respective owners.'] },
    ],
  },
  accessibility: {
    eyebrow: 'Accessibility', title: 'A workshop guide should work for more people', description: 'We aim for keyboard access, readable contrast, useful structure, and alternatives to image-only instruction.',
    sections: [
      { heading: 'Current standard', body: ['The design targets WCAG AA contrast, visible focus, semantic headings, descriptive links, labeled controls, reduced-motion support, and alt text for informative images. Instructions should not depend on color alone.'] },
      { heading: 'Known work', body: ['Downloads, diagrams, captions, validation errors, authentication, and future user submissions require continued accessibility review. Report a barrier through the corrections path and include the page, device, browser, and assistive technology when comfortable.'] },
    ],
  },
}

export function StaticPage({ pageKey }: { pageKey: StaticPageKey }) {
  const page = pages[pageKey]
  usePageMeta(`${page.title} | Built True Workshop`, page.description)
  return <main><header className="bg-sawdust py-16 sm:py-24"><div className="mx-auto max-w-4xl px-5 sm:px-8"><p className="section-label">{page.eyebrow}</p><h1 className="mt-4 font-display text-[clamp(3rem,7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.05em] text-walnut">{page.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-steel">{page.description}</p></div></header><div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">{page.sections.map((section) => <section key={section.heading} className="border-t border-walnut/10 py-9 first:border-0 first:pt-0"><h2 className="font-display text-3xl font-black tracking-tight text-walnut">{section.heading}</h2>{section.body.map((paragraph) => <p key={paragraph} className="mt-5 max-w-3xl text-[17px] leading-8 text-charcoal/85">{paragraph}</p>)}</section>)}<div className="mt-8 rounded-2xl bg-walnut p-7 text-paper"><p className="font-display text-2xl font-black">Something unclear or wrong?</p><p className="mt-2 text-sm leading-6 text-paper/65">We would rather correct the record than defend a weak sentence.</p><Link to="/corrections/" className="mt-5 inline-flex rounded-full bg-amber px-5 py-3 text-sm font-black text-walnut">Open the corrections guide</Link></div></div></main>
}
