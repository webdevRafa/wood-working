# Built True Workshop — Product, Brand, UX, SEO, and Content Blueprint

> Working strategy for the Vite/React/TypeScript woodworking affiliate site. Last reviewed: August 25, 2026.
>
> **Working brand:** Built True Workshop  
> **Promise:** Practical woodworking guidance that helps people build confidently and buy only what earns a place in their shop.  
> **Tagline:** Build it once. Build it right.

## 1. Executive direction

Built True Workshop should not feel like a catalog wearing a blog costume. It should feel like a calm, experienced shop partner: show the build, explain the decision, prevent the mistake, and recommend the right tool only when it materially improves the outcome.

### Business model

1. Attract readers with genuinely complete DIY builds, troubleshooting guides, and skill lessons.
2. Move readers to commercial pages only when their project creates a real buying need.
3. Monetize with relevant physical products: stationary power tools, portable tools, dust collection, jigs, blades, bits, abrasives, glue, finishes, hardware, and safety equipment.
4. Add vetted digital plans, project bundles, classes, and courses where they provide real value. Never recommend a digital product because its commission is high. Independently check product quality, refund terms, vendor reputation, cookie window, brand bidding rules, and current commission terms before promotion.
5. Build an owned audience with useful lead magnets, saved projects, material calculators, and a short, project-based email sequence.

### Primary audiences

- **Curious beginner:** wants a safe first win, plain language, a short shopping list, and no assumed shop.
- **Weekend improver:** owns a few tools and wants cleaner joinery, better finishes, and smarter upgrades.
- **Small-shop optimizer:** has limited space/power and values mobile bases, dust control, and multipurpose tools.
- **Project-led buyer:** has chosen a build and now needs the exact blade, bit, jig, hardware, or finish.
- **Upgrade-ready enthusiast:** compares table saws, planers, jointers, routers, CNC machines, and dust collectors.
- **Gift/build-to-sell maker:** wants repeatable small projects, batch workflows, and realistic pricing.

### Strategic principles

- **Help first, monetize second.** Every recommendation must answer a reader need created by the page.
- **Show receipts.** Use original build photos, measurements, cut diagrams, test cuts, dust readings where feasible, finish samples, failure notes, and dates tested.
- **Recommend by fit, not hype.** Name the best choice for a situation, the tradeoff, and who should skip it.
- **Create journeys, not dead ends.** Each guide links to one prerequisite, one next skill, one related build, and one appropriate buyer guide.
- **Earn the email.** Offer a useful asset tied to the page, not a generic newsletter interruption.
- **Do not fake experience.** Label research-based roundups as such. Reserve “tested,” ratings, and first-person claims for products and techniques actually tested.

### North-star metrics

- Completed-guide rate and scroll depth, segmented by content template.
- Return visits within 30 days and saved-project rate.
- Email signup rate by lead magnet and source page.
- Affiliate outbound click-through rate, earnings per click, and revenue per 1,000 sessions.
- Search impressions/clicks by topic cluster, not only by page.
- Percentage of published guides with original evidence and a documented expert review.
- Correction rate, broken-link rate, offer freshness, and reader-reported successful builds.

## 2. Brand system

### Brand name and voice

**Built True Workshop** is the recommended working name. It communicates workmanship, honesty, and an ongoing place to learn. Before public launch, perform trademark, social-handle, and domain clearance; the name is a strategy recommendation, not a legal availability claim.

Voice attributes:

- **Capable:** specific, measured, and useful.
- **Straight-talking:** no “game-changing,” fake urgency, or miracle-tool language.
- **Encouraging:** acknowledge imperfect shops and budgets without talking down to beginners.
- **Safety-minded:** state the hazard and mitigation where the task introduces it.
- **Opinionated with reasons:** give a verdict, evidence, limitations, and alternatives.

Preferred microcopy:

- “See the cut list” instead of “Learn more.”
- “Choose the right blade” instead of “Shop now.”
- “Why this earned our pick” instead of “Best overall.”
- “Skip this if…” near every consequential recommendation.
- “Price and availability can change” where live offers appear.

### Visual direction

The visual idea is **editorial field guide meets working shop**: generous warm space, crisp diagrams, honest photography, pencil-like annotations, and restrained industrial accents. Avoid faux-rustic textures, wall-to-wall brown, hazard-stripe clichés, and cluttered storefront cards.

#### Color tokens

| Role | Name | Hex | Usage |
|---|---|---:|---|
| Primary dark | Walnut Ink | `#241A15` | Headlines, footer, high-contrast surfaces |
| Primary | Pine Green | `#315445` | Navigation, primary buttons, active states |
| Accent | Workshop Amber | `#D47A1F` | Highlights, key CTA, measurement marks; never body text on light backgrounds |
| Canvas | Plan Paper | `#FAF7F0` | Main background |
| Surface | Sawdust | `#EFE4D2` | Cards, diagrams, callouts |
| Cool neutral | Tool Steel | `#66716D` | Secondary text, borders, metadata |
| Text | Charcoal | `#292724` | Body copy |
| Success | Finish Green | `#26734D` | Verified, in-stock, passed checks |
| Warning | Safety Red | `#B33A2B` | Safety warnings and destructive actions only |

All text/background pairs must meet WCAG AA. Do not communicate comparison winners, safety levels, stock, or ratings by color alone.

#### Type and imagery

- Headings: a warm, sturdy slab-serif or editorial serif (for example, Roboto Slab), self-hosted if licensing allows.
- Body/UI: Inter or Source Sans 3, self-hosted to avoid layout shifts and unnecessary third-party requests.
- Measurements/code: IBM Plex Mono or a system monospace face.
- Use real 4:3 or 3:2 shop photography with a consistent warm-neutral grade. Every key build needs a finished-result image, materials layout, at least one critical-step close-up, and a mistake/fit detail where useful.
- Diagrams use a white/Plan Paper field, Tool Steel line work, Workshop Amber dimensions, and high-contrast labels.

### Logo direction

A simple wordmark paired with a square-and-pencil or bench-dog negative-space mark. It must read at favicon size, work in one color, and avoid crossed-saw/blade imagery that makes the brand feel like a generic contractor logo.

## 3. Information architecture

### Primary navigation

`Projects` · `Skills` · `Tools` · `Shop Setup` · `Materials & Finishes` · `Plans` · search icon

Utility navigation: `Start Here` · `About & Testing` · `Newsletter` · account/saved projects.

Core URL system:

- `/start-here/`
- `/projects/{room-or-type}/`
- `/projects/{slug}/`
- `/skills/{discipline}/`
- `/skills/{slug}/`
- `/tools/{category}/`
- `/tools/{category}/{slug}/`
- `/shop/{slug}/`
- `/materials/{slug}/`
- `/plans/{slug}/`
- `/authors/{name}/`
- `/about/testing-method/`, `/about/editorial-policy/`, `/affiliate-disclosure/`, `/corrections/`

Use one permanent canonical URL per intent. Tags and filters support discovery but should default to `noindex,follow` unless they become deliberately curated, unique landing pages.

### Topic-cluster architecture

Each cluster has:

1. A strong, editorially written hub page that answers the broad intent.
2. Supporting learn/build/buy pages.
3. Breadcrumbs and crawlable HTML links between hub and child pages.
4. A “what to learn next” sequence based on actual prerequisites.
5. One or more ethical monetization bridges, never a link dump.

No important guide may be discoverable only through Firestore search, infinite scroll, or a client-side filter. It must be linked with a normal `<a href>` from a crawlable hub and included in the XML sitemap.

## 4. Page wireframes

### 4.1 Global shell

1. Slim disclosure/utility strip only when contextually needed; do not run perpetual fake-sale banners.
2. Sticky header after the reader begins scrolling: logo, primary nav, search, “Start here.”
3. Main content with a desktop max-width around 1200–1280 px and a 680–760 px reading column.
4. On long guides: sticky desktop table of contents; compact mobile “In this guide” drawer.
5. Footer: cluster links, About/Testing, editorial policy, affiliate disclosure, privacy, terms, accessibility, contact, corrections, newsletter.

### 4.2 Home page

1. **Hero:** “Build with confidence. Buy tools with a reason.” Two paths: “Find a project” and “Set up my shop.” Show a real finished build plus in-progress detail.
2. **Project finder:** skill level, time, space, tool access, room/use, budget. Results are crawlable guide links; the personalized state itself need not be indexed.
3. **Start with a win:** three beginner builds with time, cost band, and minimum-tool icons.
4. **Current workshop lesson:** one substantial skill guide.
5. **Tool decisions without the hype:** three evidence-based buyer guides, each showing “tested,” “researched,” or “updated” status.
6. **Choose your path:** first project, first bench, small-shop setup, furniture, outdoor, CNC.
7. **Free lead magnet:** “The First 10 Shop Purchases—in the Order They Earn Their Keep.”
8. **Proof and standards:** testing method, corrections link, author experience, affiliate promise.
9. **Latest/updated:** prefer meaningful updates over an endless chronological blog roll.

### 4.3 Cluster/category hub

1. Cluster promise and who it serves.
2. “Start here” sequence of 3–5 pages.
3. Filter controls for level, duration, budget, space, and required tools.
4. Curated sections: foundational skills, projects, troubleshooting, tool decisions.
5. Original explanatory copy and decision tree; not just a grid of duplicate cards.
6. FAQ based on real reader questions.
7. Newsletter/lead magnet aligned to the cluster.

### 4.4 DIY project guide

1. Breadcrumbs.
2. H1 plus outcome-first deck: what it is, who can build it, and the main constraint.
3. Visible affiliate disclosure before the first monetized link: “We may earn a commission from purchases made through links in this guide, at no extra cost to you.”
4. Result gallery and facts bar: difficulty, active time, total time, estimated material cost range/date, dimensions, finish, minimum space.
5. “Before you start”: safety, material choice, what can be substituted, prerequisite skill links.
6. Tool tiers: minimum viable, easier/faster upgrade, and shop version. Never imply all three are required.
7. Bill of materials, hardware, cut list, downloadable/print view, and waste allowance.
8. Diagram and sequential steps. Each step includes action, success cue, common mistake, and recovery path.
9. Contextual product modules only at the point of need: why it helps, who it fits, tradeoff, alternative, CTA.
10. Fit/finish checks, troubleshooting, and variations.
11. Final cost/time recap and “what I would change next time.”
12. Next build, prerequisite skill, relevant buyer guide, and email capture.
13. Author/reviewer, build date, update log, sources, comments/corrections.

### 4.5 Tool review or comparison

1. Query-matching H1 and one-screen verdict.
2. Affiliate disclosure and test-status badge.
3. “Choose X if / choose Y if / skip both if.”
4. Comparison table based on buyer-relevant dimensions—not copied spec-sheet trivia.
5. Method: material, blade/bit, settings, repetitions, measuring tools, date, unit source, limitations.
6. Original photos/video and results.
7. Safety, dust, noise, ergonomics, setup/calibration, consumables, warranty/service caveats.
8. Total cost of ownership: accessories required, replacement consumables, footprint, power, collection compatibility.
9. Pros, cons, best use, poor fit, alternatives, final verdict.
10. Offers from approved merchants with freshness timestamp; never fabricate price, availability, rating, or review count.

### 4.6 Shop setup page

1. Space/power/airflow constraints.
2. Scaled plan and workflow zones.
3. Good/better/best build lists.
4. Upgrade sequence and “buy later” list.
5. Dust and electrical safety reviewed by a qualified professional where claims enter professional territory.
6. Related mobile-base, storage, lighting, and machine comparisons.

### 4.7 Search, account, and saved projects

- Search suggestions group results by projects, skills, tools, and materials.
- A guide remains fully readable without authentication.
- Google sign-in is optional and used for saves, progress, notes, and email preferences—not as an SEO/content gate.
- Saved projects show materials checklist and completed steps. Make destructive actions explicit and reversible.

## 5. Conversion and engagement system

### CTA hierarchy

1. **Task CTA:** print cut list, open calculator, mark step complete.
2. **Progress CTA:** learn prerequisite, view next step, save project.
3. **Commerce CTA:** choose the right blade/bit/tool; appears at the moment of relevance.
4. **Retention CTA:** download a project-specific asset or join a matching sequence.

Do not place multiple bright purchase buttons above the first useful answer. A product card should include recommendation reason, fit, tradeoff, merchant, price-check date if shown, and a text link that makes destination intent clear.

### Lead magnets and email paths

- First-shop purchase order → 7-email beginner setup sequence.
- Printable cut-list + board-foot calculator → project planning sequence.
- Table-saw setup checklist → calibration, blade selection, jigs, dust collection.
- Finish sample log → sanding, stain/blotch control, topcoats.
- Small-shop floor-plan kit → storage, mobile bases, dust, lighting.
- “Weekend Build Pack” → three progressive projects and their minimum tools.

Email sequence shape: deliver asset immediately, help complete one task, solve the next obstacle, invite a reply, then make one relevant recommendation. Segment by declared project and tool access; do not blast every subscriber with every offer.

### Trust and affiliate rules

- Put a clear disclosure close to recommendations and before affiliate links; “affiliate link” alone may not explain the paid relationship.
- Add `rel="sponsored"` to paid/affiliate outbound links; add `nofollow` too where the program requires it.
- Never use fabricated scarcity, countdowns, crossed-out prices, fake reviews, auto-selected add-ons, or misleading buttons.
- Separate editorial score from merchant data. User reviews must be genuine, moderated, and never marked up as editorial testing.
- Log merchant, program, destination, campaign, placement, click ID, and content version without collecting unnecessary personal data.
- Maintain a kill switch for expired, unsafe, recalled, unavailable, or disallowed offers.

## 6. SEO and discoverability requirements

### Rendering and crawlability

The current starter is a client-rendered Vite React application. Google can render JavaScript, but 500 Firestore-fed pages should not rely on an empty HTML shell and a later client fetch. Generate meaningful HTML for every public guide at build time (or render it server-side), including title, description, canonical, headings, body, internal links, image metadata, disclosure, and structured data. Hydrate only the interactive features.

Recommended Vercel flow:

1. Firestore is the editorial source of truth.
2. A build-time Admin SDK script fetches only `status = published` documents using server credentials stored in Vercel environment variables.
3. A Vite-compatible prerender/SSG layer emits a real `index.html` for each canonical route.
4. The same published dataset generates sitemap files, RSS, hub pages, and a broken-link report.
5. On publish/update, a secured build hook triggers a new immutable deployment.
6. Client Firestore reads are reserved for freshness/interactive features; core article copy remains in delivered HTML.

Never put the Firebase service-account key in the repository, browser bundle, Firestore document, or chat transcript committed to Git. Use least-privilege server credentials and locked-down Firestore/Storage rules.

### On-page requirements

- Unique, accurate H1, `<title>`, meta description, canonical, Open Graph, and social image.
- One page per genuine intent; consolidate near-duplicates instead of targeting trivial keyword variants.
- Descriptive alt text for informative images; empty alt for decorative images.
- Consistent author and expert-review information, dates first published/meaningfully updated, and a visible change log.
- Crawlable breadcrumbs and contextual internal links with natural anchor text.
- Table of contents with stable fragment IDs.
- US/metric measurements where helpful; state nominal versus actual lumber dimensions.
- `Article`/`BlogPosting`, `BreadcrumbList`, and `Organization` JSON-LD where accurate. Add `VideoObject` only for an embedded matching video. Add `Product`/`Review` only when the visible page and genuine evidence satisfy Google's rules. Do not invent ratings.
- XML sitemap contains only canonical, indexable, published URLs and uses truthful `lastmod` dates. Maintain a human-readable HTML directory too.
- Useful 404, redirect ledger, lowercase kebab-case slugs, and permanent 301s for changed slugs.

### Content quality gate before `index`

Every guide must pass all of these:

- Search intent and target reader are distinct from existing pages.
- The project/technique is actually validated, or the page is transparently labeled as research awaiting a build and kept `noindex`.
- Original value is present: photos, diagrams, measurements, test data, calculations, decision framework, or expert experience.
- Steps, cut list, dimensions, and material math agree.
- A knowledgeable human reviews technical accuracy; high-risk safety/electrical claims receive qualified review.
- Recommendations reflect evidence and include meaningful downsides/alternatives.
- Affiliate and AI/automation disclosures are correct for the page.
- Sources are cited, image rights are recorded, and claims are not copied.
- Mobile layout, keyboard path, contrast, print view, links, metadata, and structured data are verified.
- The reader can complete the promised task without returning to search for missing basics.

Publishing 500 shallow, automatically generated pages for rankings would create a scaled-content risk. Treat the list below as an editorial backlog. Publish in measured batches only after the quality gate; prune, merge, or leave `noindex` when a topic cannot add distinct value.

### Internal-link recipe

Each published guide should link to:

- Its parent hub and breadcrumbs.
- One prerequisite skill and one next skill.
- One related project using the same technique/tool.
- One troubleshooting page for the most likely failure.
- At most one primary money page per decisive purchase need, plus contextual consumables as appropriate.

Hub pages should link back to every child through paginated, crawlable links. “Related” modules are editorially selected first, then behaviorally refined; do not make links dependent on personalization.

## 7. Firestore-ready editorial model

Use consistent, validated fields even though Firestore is schemaless. Keep sensitive offer administration separate from public content.

```ts
type Guide = {
  id: string
  slug: string
  canonicalPath: string
  type: 'project' | 'skill' | 'troubleshooting' | 'review' | 'comparison' | 'shop' | 'material'
  status: 'draft' | 'review' | 'published' | 'archived'
  indexStatus: 'index' | 'noindex'
  title: string
  dek: string
  seoTitle: string
  metaDescription: string
  categoryId: string
  clusterId: string
  tags: string[]
  intent: 'learn' | 'build' | 'buy'
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'
  activeMinutes?: number
  totalMinutes?: number
  costBand?: 1 | 2 | 3 | 4
  dimensions?: { imperial: string; metric: string }
  heroImage: MediaRef
  blocks: ContentBlock[]
  tools: ToolRequirement[]
  materials: MaterialRequirement[]
  cutList?: CutItem[]
  safetyNotes: SafetyNote[]
  affiliateDisclosure: string
  offerIds: string[]
  prerequisiteIds: string[]
  relatedGuideIds: string[]
  authorId: string
  reviewerIds: string[]
  evidence: EvidenceRef[]
  sourceRefs: SourceRef[]
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt?: Timestamp
  contentVersion: number
}
```

Suggested top-level collections: `guides`, `categories`, `authors`, `products`, `offersPrivate`, `media`, `redirects`, `users`, and `events`. Public product facts and editorial verdicts can be exported into the build dataset; program secrets, private merchant fields, and service credentials cannot.

Store images in Firebase Storage with derivative sizes, dimensions, crop/focal point, alt text, caption, creator, license, and hash. Keep user saves/notes under user-owned paths. Begin Firestore and Storage rules in locked mode, write rules alongside each path, and test with the Emulator Suite before deployment.

## 8. Editorial templates

### Tutorial/project acceptance brief

- Search job and reader situation.
- Finished outcome and why this design solves the situation.
- Minimum viable tools versus convenience upgrades.
- Verified material/cut list with waste and kerf assumptions.
- Step sequence, success cues, likely failures, and repairs.
- Safety review and manufacturer-manual links for machine-specific operations.
- Original proof package: build photos, dimensioned diagram, fit checks, final cost/date.
- Natural product moments and a non-affiliate alternative where practical.
- Prerequisite, next project, buyer guide, and lead magnet.

### Comparison acceptance brief

- Specific buyer decision and disqualifying constraints.
- Products selected by market relevance, not commission.
- Comparable setup, repeatable method, raw results, test date, and limitations.
- Winner by scenario; no universal winner when evidence does not support one.
- Required accessories and ongoing consumables.
- Ownership cost, warranty/service information sourced to manufacturers.
- Clear update trigger for model, price class, recall, or availability change.

## 9. The 500-page editorial backlog

Legend: **Learn** = informational skill/problem intent; **Build** = project intent; **Buy** = commercial investigation. “Natural offer” identifies products that can help without forcing a sale. Titles are working headlines; final briefs must validate distinct intent and avoid cannibalization.

### Cluster A — Beginner foundations (001–025)

001. **Woodworking for Absolute Beginners: Your First Safe Weekend in the Shop** — Learn → safety gear, square, tape, starter course.
002. **The First 10 Woodworking Tools to Buy—in the Order They Earn Their Keep** — Buy → starter tool kit, digital checklist.
003. **Build a Useful Box With Only Three Tools** — Build → handsaw, drill/driver, sanding kit, glue.
004. **How to Read a Woodworking Plan, Cut List, and Diagram** — Learn → plan bundle, ruler, marking tools.
005. **Nominal vs. Actual Lumber Sizes Without the Confusion** — Learn → tape, caliper, lumber chart download.
006. **How to Choose Straight Boards at the Home Center** — Learn → moisture meter, straightedge, lumber guide.
007. **Your First Workbench: Build, Buy, or Improvise?** — Buy → bench hardware, portable bench, plans.
008. **Woodworking on a $100 Tool Budget** — Buy → hand tools, clamps, starter abrasives.
009. **Woodworking on a $500 Tool Budget** — Buy → circular saw, drill, random-orbit sander, guide rail.
010. **Woodworking in an Apartment Without Annoying the Neighbors** — Learn → hand tools, quiet vacuum, folding bench.
011. **A One-Car-Garage Woodshop That Still Fits the Car** — Learn → mobile bases, wall storage, compact dust collection.
012. **How to Make a Square Cut: Four Methods Compared** — Learn → speed square, miter box, circular-saw guide, miter saw.
013. **How to Drill a Straight Hole Without a Drill Press** — Learn → drill guide, brad-point bits, square.
014. **Woodworking Safety Gear You Need—and What Can Wait** — Buy → eye, hearing, respiratory protection.
015. **The Beginner’s Guide to Wood Grain Direction** — Learn → hand plane, card scraper, sample kit.
016. **Seven Woodworking Mistakes That Waste the Most Material** — Learn → stop blocks, marking knife, glue accessories.
017. **How to Practice Woodworking With Scrap Instead of Expensive Lumber** — Learn → blade, glue, small-project plans.
018. **Hand Tools vs. Power Tools: The Best Starting Path for You** — Buy → curated starter bundles, course.
019. **How Much Space Do You Really Need for Woodworking?** — Learn → layout template, folding tools, mobile stands.
020. **Build Your First Shop Stool in One Afternoon** — Build → jigsaw/circular saw, screws, glue, finish.
021. **Build a Beginner-Friendly Wall Shelf With Hidden Brackets** — Build → drill, level, anchors, finish.
022. **Build a Simple Pine Crate That Actually Comes Out Square** — Build → clamps, square, brad nailer, glue.
023. **The First Five Joints Every Woodworker Should Learn** — Learn → chisels, saw, practice plan pack.
024. **How to Estimate the Real Cost of a Woodworking Project** — Learn → calculator lead magnet, plans, material suppliers.
025. **A 30-Day Woodworking Practice Plan for Beginners** — Learn → digital course, progressive plan bundle.

### Cluster B — Measuring, marking, layout, and cut planning (026–050)

026. **Tape Measure Accuracy: Burn an Inch, Hook It, or Use a Story Stick?** — Learn → quality tape, story-stick blanks.
027. **Combination Square Setup, Testing, and Everyday Uses** — Learn → combination squares, marking knife.
028. **How to Check Any Square for Accuracy in 60 Seconds** — Learn → precision squares, calibration tools.
029. **Marking Knife vs. Pencil: When the Line Changes the Joint** — Buy → knives, pencils, gauges.
030. **How to Make and Use a Story Stick for Repeatable Furniture Parts** — Learn → marking tools, plan bundle.
031. **Board-Foot Calculator and Lumber Buying Guide** — Learn → interactive calculator, moisture meter.
032. **How to Plan Cuts Around Knots, Checks, and Grain** — Learn → chalk, marking tools, rough-lumber guide.
033. **How to Account for Saw Kerf in a Cut List** — Learn → blades, caliper, cut-list template.
034. **How to Lay Out Angles Without Guessing** — Learn → bevel gauge, protractor, digital angle finder.
035. **Dividing a Board Into Equal Parts Without Fractions** — Learn → dividers, rules, marking gauges.
036. **How to Find Center on Any Board or Dowel** — Learn → center finder, combination square.
037. **The Best Measuring Tools for Furniture Accuracy** — Buy → premium squares, rules, calipers.
038. **How to Transfer Measurements Without Using Numbers** — Learn → dividers, story sticks, marking knife.
039. **Make a Reusable Full-Size Furniture Layout Rod** — Build → sheet goods, marking tools, plan paper.
040. **How to Read a Cut List and Optimize a Plywood Sheet** — Learn → cut optimizer, track saw, blades.
041. **How to Break Down Plywood Without Chipping the Veneer** — Learn → track/circular saw, fine-tooth blade, foam board.
042. **How to Mark Mortises and Tenons From One Reference Face** — Learn → mortise gauge, chisels.
043. **How to Lay Out Cabinet Hardware So Every Pull Matches** — Learn → hardware jig, drill bits, pulls.
044. **How to Measure an Out-of-Square Alcove for Built-Ins** — Learn → laser, scribing tools, templates.
045. **How to Make a Template for Curves and Irregular Shapes** — Learn → template material, flush-trim bit, jigsaw.
046. **How to Scale a Furniture Photo Into a Buildable Design** — Learn → design course, graph paper, CAD tool.
047. **How to Create a Cut List From a Sketch** — Learn → cut-list worksheet, planning course.
048. **Imperial vs. Metric Woodworking: Which Is Easier in the Shop?** — Learn → metric tapes/rules, conversion chart.
049. **How to Avoid Cumulative Error in Repeated Parts** — Learn → stop blocks, setup blocks, calipers.
050. **Build a Shop-Made Marking Gauge From Scrap** — Build → marking knife, small hardware, finish.

### Cluster C — Joinery (051–075)

051. **Butt Joints That Stay Square: Glue, Screws, and Clamping Order** — Learn → glue, screws, clamps.
052. **Pocket Holes: When They’re Smart and When They’re Not** — Learn → pocket-hole jig, screws, plugs.
053. **Dowels vs. Biscuits vs. Dominos: Which Alignment System Fits Your Work?** — Buy → doweling jig, biscuit joiner, loose-tenon tool.
054. **How to Cut a Half-Lap Joint With a Circular Saw** — Learn → circular-saw blade, square, chisel.
055. **How to Cut a Half-Lap Joint on the Table Saw** — Learn → dado stack, crosscut sled, clamps.
056. **Mortise-and-Tenon Joinery by Hand** — Learn → mortise chisels, tenon saw, marking gauge.
057. **Router-Cut Mortise-and-Tenon Joinery for Repeatable Furniture** — Learn → plunge router, spiral bit, edge guide.
058. **Loose-Tenon Joinery With a Shop-Made Router Jig** — Build → router, guide bushing, spiral bit.
059. **Dovetails for Beginners: A Practice Box That Teaches the Joint** — Build → dovetail saw, chisels, marking gauge.
060. **Box Joints on the Table Saw: Jig, Setup, and Fit** — Learn → dado blade, jig hardware, setup blocks.
061. **Rabbet Joints With a Router or Table Saw** — Learn → rabbeting bit set, dado blade.
062. **Dados and Grooves: Grain Direction, Fit, and Tool Choice** — Learn → router bits, dado stack, plywood setup gauge.
063. **Tongue-and-Groove Joinery for Panels and Cabinet Backs** — Learn → matched bits, featherboards.
064. **Splined Miters That Close Cleanly and Stay Strong** — Learn → spline jig, thin-kerf blade, clamps.
065. **How to Glue Up a Mitered Box Without the Parts Sliding** — Learn → band clamp, tape, slow-set glue.
066. **Knock-Down Joinery for Furniture That Has to Move** — Learn → threaded inserts, connector bolts, installation jig.
067. **Breadboard Ends Without Splitting the Tabletop** — Learn → router plane, dowels, elongated-hole method.
068. **How to Join Plywood Edges Without Ugly Fasteners** — Learn → edge banding, biscuits/dowels, glue.
069. **How to Edge-Join Boards for a Flat Panel** — Learn → clamps, jointer plane, glue.
070. **How Many Clamps Does a Panel Glue-Up Really Need?** — Buy → parallel clamps, cauls, glue accessories.
071. **Repairing a Loose Chair Joint Without Making It Worse** — Learn → injectors, hide/PVA glue, clamps.
072. **How to Peg a Mortise and Tenon** — Learn → brad-point bits, dowels, chisels.
073. **Frame-and-Panel Joinery: Allowing Wood to Move** — Learn → router-bit set, space balls, finish.
074. **Shelf Joinery Compared: Five Strong Options and Their Tradeoffs** — Buy → bits, dado stack, doweling tools.
075. **Joinery Decision Chart: Pick the Right Joint for the Load** — Learn → downloadable chart, joinery course.

### Cluster D — Hand tools and unplugged skills (076–100)

076. **How to Choose Your First Set of Bench Chisels** — Buy → chisels, honing guide, stones.
077. **Sharpen a Chisel From Dull to Hair-Shaving Sharp** — Learn → diamond stones, strop, honing guide.
078. **Waterstones vs. Diamond Plates vs. Sandpaper Sharpening** — Buy → sharpening systems, consumables.
079. **Set Up a New Hand Plane Before Its First Shaving** — Learn → plane, stones, screwdriver set.
080. **Block Plane vs. No. 4 Smoother: Which Should You Buy First?** — Buy → planes, sharpening kit.
081. **How to Read Grain and Avoid Hand-Plane Tearout** — Learn → smoothing plane, card scraper.
082. **Flatten a Board With Hand Planes** — Learn → jack/jointer plane, winding sticks.
083. **Joint an Edge by Hand That Glues Without Gaps** — Learn → jointer plane, straightedge.
084. **How to Use a Card Scraper Without Burning Your Thumbs** — Learn → scrapers, burnisher, holder.
085. **Western vs. Japanese Saws for a Beginner Shop** — Buy → saws, guides, replacement blades.
086. **How to Saw Straight by Hand: A Five-Cut Practice Drill** — Learn → backsaw, bench hook.
087. **Build a Bench Hook for Safer, Straighter Hand Sawing** — Build → hand saw, square, glue.
088. **Build a Shooting Board for Perfect End Grain** — Build → hand plane, track material, plans.
089. **How to Pare Precisely With a Chisel** — Learn → chisels, sharpening supplies.
090. **How to Chop a Mortise Without Bruising the Edges** — Learn → mortise chisel, mallet, gauge.
091. **Spokeshave Basics: Shaping Curves by Feel** — Learn → spokeshave, rasps, scraper.
092. **Rasps, Files, and Surforms: Which Shaping Tool When?** — Buy → rasps/files, handles, brush.
093. **Build a Wooden Mallet From Firewood or Scrap** — Build → hand saw, chisels, finish.
094. **How to Use a Brace and Bit for Clean, Controlled Holes** — Learn → brace, auger bits.
095. **Drawknife and Shaving Horse Basics for Green Woodworking** — Learn → drawknife, plans, safety gear.
096. **Make and Use Winding Sticks to Find Twist** — Build → contrasting wood, plane.
097. **How to Restore a Rusty Vintage Hand Plane** — Learn → abrasives, rust remover, replacement iron.
098. **How to Camber a Plane Iron for Fast Stock Removal** — Learn → grinder, honing guide, stones.
099. **Build a Portable Hand-Tool Tote With Dovetails** — Build → dovetail tools, handles, finish.
100. **The Minimal Hand-Tool Kit for Furniture Making** — Buy → curated kit, tool chest plan, course.

### Cluster E — Table saw mastery (101–125)

101. **Table Saw Basics: A Safety-First First Cut** — Learn → PPE, push blocks, beginner blade.
102. **Jobsite vs. Contractor vs. Cabinet Table Saw** — Buy → saws, mobile bases, dust accessories.
103. **How to Choose the Right Table Saw for a Small Shop** — Buy → compact saws, stands, outfeed solutions.
104. **How to Align a Table Saw Blade, Fence, and Miter Slot** — Learn → dial indicator, calibration plate, squares.
105. **Table Saw Blade Height: Safety, Cut Quality, and Heat Tradeoffs** — Learn → blades, setup gauges.
106. **Rip Blade vs. Crosscut vs. Combination Blade** — Buy → blade sets, blade storage.
107. **Thin-Kerf vs. Full-Kerf Blades: Power, Waste, and Deflection** — Buy → blades, stabilizers where compatible.
108. **How to Prevent Table Saw Burn Marks** — Learn → blade cleaner, alignment tools, replacement blade.
109. **How to Prevent Kickback on the Table Saw** — Learn → riving knife, push blocks, featherboards.
110. **Build a Dead-Flat Table Saw Crosscut Sled** — Build → plywood, runners, hardware, plans.
111. **Build a Compact Crosscut Sled for a Jobsite Saw** — Build → runners, stop hardware, blade.
112. **Build a Table Saw Tapering Jig With Positive Stops** — Build → toggle clamps, hardware, plan.
113. **Build a Box-Joint Jig for the Table Saw** — Build → dado blade, micro-adjust hardware.
114. **Build a Thin-Rip Jig for Safe Repeat Strips** — Build → bearings, knobs, plans.
115. **Build a Table Saw Jointing Jig for Rough Edges** — Build → clamps, plywood, fasteners.
116. **Build an Outfeed Table That Doubles as an Assembly Bench** — Build → casters, sheet goods, plans.
117. **Build a Folding Outfeed Table for a One-Car Garage** — Build → folding brackets, casters, hardware.
118. **How to Cut Dados on a Table Saw Without Tearout** — Learn → dado stack, zero-clearance insert.
119. **How to Cut Tenons Safely on the Table Saw** — Learn → tenoning jig, dado blade, stop block.
120. **How to Cut Bevels Without Trapping the Offcut** — Learn → push blocks, digital angle gauge.
121. **How to Rip Narrow Strips Without Risky Fence Setups** — Learn → thin-rip jig, push shoe.
122. **Zero-Clearance Inserts: Build, Fit, and Use Them Safely** — Build → insert blanks, leveling screws.
123. **Dado Stack Buying Guide: Fit, Chip Quality, and Compatibility** — Buy → dado stacks, shims, storage case.
124. **Table Saw Dust Collection: Overarm vs. Cabinet Pickup** — Buy → collectors, hoses, overarm guards.
125. **When You Should Not Use a Table Saw** — Learn → track saw, bandsaw, jigsaw alternatives.

### Cluster F — Portable and specialty saws (126–150)

126. **Miter Saw vs. Circular Saw: Which One Solves Your Projects?** — Buy → saws, blades, guide systems.
127. **10-Inch vs. 12-Inch Miter Saw: Capacity, Accuracy, and Space** — Buy → miter saws, stands.
128. **Sliding vs. Non-Sliding Miter Saw for Furniture Work** — Buy → saws, blades, dust hoods.
129. **How to Calibrate a Miter Saw for Gap-Free Frames** — Learn → calibration square, test material, blade.
130. **Build a Space-Saving Miter Saw Station With Wings** — Build → T-track, stop blocks, plans.
131. **Build a Miter Saw Dust Hood That Still Allows Full Travel** — Build → hose, fittings, sheet goods.
132. **How to Cut Crown Molding Flat on a Miter Saw** — Learn → angle finder, stops, finish blade.
133. **Circular Saw Basics: Straight, Square Cuts Without a Table Saw** — Learn → saw, blade, guide.
134. **Build a Zero-Clearance Circular Saw Guide** — Build → plywood/MDF, clamps, blade.
135. **Track Saw vs. Table Saw for Breaking Down Sheet Goods** — Buy → track saws, rails, blades.
136. **How to Choose Track-Saw Rail Lengths and Connectors** — Buy → rails, connectors, carrying case.
137. **How to Make Chip-Free Plywood Cuts With a Track Saw** — Learn → blades, splinter strip, foam support.
138. **Jigsaw Blade Guide: Clean Curves in Solid Wood and Plywood** — Buy → blade assortment, splinter insert.
139. **How to Cut a Perfect Circle With a Jigsaw** — Learn → circle jig, blades, sanding tools.
140. **Barrel-Grip vs. Top-Handle Jigsaw** — Buy → jigsaws, blades, dust adapters.
141. **Bandsaw Basics: Setup, Tracking, Tension, and First Cut** — Learn → blades, gauge, safety accessories.
142. **Benchtop vs. Floor-Standing Bandsaw** — Buy → bandsaws, mobile base, dust collection.
143. **Bandsaw Blade Width and Tooth Count Explained** — Buy → blades, storage, tension guide.
144. **How to Resaw Lumber on a Bandsaw** — Learn → resaw blade, tall fence, featherboard.
145. **Build a Bandsaw Circle-Cutting Jig** — Build → runner, pivot hardware, plan.
146. **Build a Bandsaw Sled for Small and Awkward Parts** — Build → clamps, runners, sheet goods.
147. **Scroll Saw Basics for Intricate Wood Projects** — Learn → scroll saw, blades, light/magnifier.
148. **Scroll Saw vs. Band Saw vs. Jigsaw for Curves** — Buy → saws, blade starter packs.
149. **Reciprocating Saw for Reclaimed Lumber: Where It Helps** — Learn → demolition blades, nail detector, PPE.
150. **Saw Blade Cleaning and Storage That Extends Blade Life** — Learn → cleaner, storage rack, pitch scraper.

### Cluster G — Routers, router tables, and CNC (151–175)

151. **Trim Router vs. Full-Size Router: Which Should You Buy First?** — Buy → routers, base kits, bits.
152. **Fixed Base vs. Plunge Router for Furniture Projects** — Buy → router kits, edge guides.
153. **Router Bit Starter Set: The Few Profiles You’ll Actually Use** — Buy → quality bits, storage, collets.
154. **Upcut vs. Downcut vs. Compression Spiral Bits** — Buy → spiral bits, dust collection.
155. **How to Avoid Router Tearout and Burning** — Learn → bits, speed control, cleaner.
156. **How to Route a Clean Dado With an Edge Guide** — Learn → plunge router, undersized plywood bits.
157. **How to Pattern-Route Safely With Templates** — Learn → pattern bits, template tape, shields.
158. **Build a Simple Router Table Into a Workbench Wing** — Build → router plate/lift, switch, fence hardware.
159. **Router Table vs. Handheld Router: Which Operation Goes Where?** — Learn → table, lift, bases.
160. **Build a Micro-Adjust Router Table Fence** — Build → T-track, knobs, dust port, plans.
161. **Router Lift Buying Guide: Convenience vs. Real Accuracy** — Buy → lifts, plates, compatible routers.
162. **How to Cut Locking Rabbets for Drawers With a Router Table** — Learn → straight bit, setup blocks.
163. **How to Make Cope-and-Stick Cabinet Doors** — Learn → matched bit set, coping sled, clamps.
164. **How to Route Perfect Mortises With a Plunge Router** — Learn → spiral bit, edge guide, jig.
165. **How to Flush-Trim Edge Banding Without Chipping Veneer** — Learn → trim router, flush bit, plane.
166. **CNC Router Basics: What a First-Time Buyer Really Needs** — Buy → CNC machines, bits, dust shoe, course.
167. **Desktop vs. Full-Size CNC for a Garage Shop** — Buy → CNC systems, enclosure, spoilboard.
168. **CNC Bits Explained for Signs, Joinery, and 3D Carving** — Buy → bit sets, collets, storage.
169. **How to Surface a CNC Spoilboard** — Learn → surfacing bit, tramming tools, dust shoe.
170. **How to Tram a CNC Router for Flat Pockets** — Learn → indicator, tramming plate, wrench set.
171. **CNC Workholding: Clamps, Tape, Vacuum, and Tabs** — Buy → clamps, tape/CA glue, vacuum fixtures.
172. **Build a CNC Dust Shoe With Replaceable Brushes** — Build → magnets, brush strip, hose.
173. **Design and Carve a Personalized Hardwood Sign** — Build → V-bits, blanks, finish, design files.
174. **Cut Flat-Pack Furniture Joinery on a CNC** — Build → compression bits, sheet goods, digital plans.
175. **CNC vs. Shaper-Style Handheld Routing System** — Buy → machines, accessories, design subscriptions.

### Cluster H — Milling, drilling, turning, and stationary tools (176–200)

176. **Jointer vs. Planer: What Each Machine Actually Makes Flat** — Buy → jointers, planers, measuring tools.
177. **Benchtop vs. Floor-Standing Jointer for a Small Shop** — Buy → jointers, mobile bases, cutters.
178. **6-Inch vs. 8-Inch Jointer: Capacity and Real Shop Cost** — Buy → jointers, dust fittings.
179. **Helical vs. Straight-Knife Cutterheads** — Buy → machines, retrofit heads, replacement inserts.
180. **How to Set Jointer Knives and Tables** — Learn → setup jig, dial indicator, knives.
181. **How to Face-Joint a Board Safely** — Learn → push blocks, jointer, dust collection.
182. **How to Joint an Edge Square to a Face** — Learn → square, push blocks, blade guards.
183. **Thickness Planer Buying Guide for Weekend Woodworkers** — Buy → planers, stands, dust adapters.
184. **How to Reduce Planer Snipe** — Learn → infeed/outfeed support, gauges, planer stand.
185. **How to Plane Thin Stock With a Carrier Board** — Learn → planer, carrier, double-sided tape.
186. **Planer Maintenance: Rollers, Bed, Knives, and Wax** — Learn → wax, knives/inserts, cleaning kit.
187. **Milling Rough Lumber: Jointer-Planer-Table Saw Workflow** — Learn → stationary machines, moisture meter.
188. **How to Mill Rough Lumber Without a Jointer** — Learn → planer sled, router sled, table-saw jig.
189. **Build a Router Sled for Flattening Slabs** — Build → surfacing bit, rails, dust PPE.
190. **Drill Press vs. Hand Drill: When Precision Justifies the Space** — Buy → drill presses, drill guides.
191. **Benchtop Drill Press Buying Guide** — Buy → drill presses, vises, brad-point/Forstner bits.
192. **How to Set Up a Drill Press Table and Fence** — Learn → table, T-track, hold-downs.
193. **Build a Drill Press Table With Replaceable Inserts** — Build → T-track, knobs, plans.
194. **Forstner vs. Brad-Point vs. Twist Bits in Wood** — Buy → bit sets, sharpening tools.
195. **How to Drill Large Holes Without Tearout** — Learn → Forstner bits, backer boards, clamps.
196. **Lathe Basics: Your First Spindle Turning** — Learn → lathe, turning tools, face shield.
197. **Mini vs. Full-Size Wood Lathe** — Buy → lathes, chucks, stands.
198. **Woodturning Tool Starter Set: Traditional vs. Carbide** — Buy → turning tools, sharpening system.
199. **Turn a Simple Hardwood Mallet** — Build → lathe tools, blank, finish.
200. **Turn a Lidded Box With a Friction-Fit Lid** — Build → chuck, gouges, calipers, finish.

### Cluster I — Workbenches, jigs, and workholding (201–225)

201. **How High and How Deep Should Your Workbench Be?** — Learn → ergonomic worksheet, bench plans.
202. **Build a Rock-Solid 2×4 Workbench** — Build → construction lumber, screws, casters, plans.
203. **Build a Knock-Down Workbench for Renters** — Build → bolts, inserts, portable vise, plans.
204. **Build a Compact Roubo-Style Workbench** — Build → vise hardware, holdfasts, premium plan.
205. **Build a Nicholson Workbench for Hand Tools** — Build → holdfasts, planing stop, plans.
206. **Workbench Top: MDF, Plywood, Construction Lumber, or Hardwood?** — Buy → materials, finishes, bench plans.
207. **Leg Vise vs. Face Vise vs. Quick-Release Vise** — Buy → vise hardware, bench accessories.
208. **How to Lay Out Bench-Dog Holes** — Learn → auger/Forstner bit, drilling guide, dogs.
209. **Build a Removable Moxon Vise for Joinery** — Build → vise screws, hardwood, plans.
210. **Build a Planing Stop and Doe’s Foot Workholding Kit** — Build → holdfast, bench accessories.
211. **Build a Portable Workbench Top for a Folding Table** — Build → sheet goods, clamps, plan.
212. **Build a Low Roman Workbench for Hand-Tool Work** — Build → holdfasts, plan, hand tools.
213. **F-Clamps vs. Parallel Clamps vs. Pipe Clamps** — Buy → clamp sets, pads, racks.
214. **How Many Woodworking Clamps Do You Need?** — Buy → phased clamp kit, rack plan.
215. **Build a Wall-Mounted Clamp Rack** — Build → brackets, screws, plan.
216. **Build Clamping Cauls That Keep Panels Flat** — Build → packing tape, clamps, straight stock.
217. **Build a Right-Angle Assembly Jig** — Build → toggle clamps, plywood, hardware.
218. **Build a Cabinet Assembly Platform With Leveling Feet** — Build → levelers, casters, plans.
219. **Build a Universal T-Track Stop Block** — Build → T-track, knobs, flip stops.
220. **Build a Straightedge Jig for Routers and Circular Saws** — Build → clamps, sheet goods, guide bushings.
221. **Build a Dowel-Joint Alignment Jig** — Build → bushings, drill bits, plans.
222. **Build a Hinge-Mortising Router Template** — Build → template guides, router bit, template stock.
223. **Build a Corner-Clamping Jig for Boxes and Frames** — Build → knobs, plywood, clamp pads.
224. **Build a Sanding-Disc Jig for Perfect Small-Part Angles** — Build → disc sander, miter hardware.
225. **The 12 Shop-Made Jigs That Save the Most Time** — Learn → jig plan bundle, T-track, knobs.

### Cluster J — Shop layout, storage, and organization (226–250)

226. **How to Lay Out a Woodshop for Smooth Material Flow** — Learn → floor-plan kit, mobile bases.
227. **Plan a Woodshop in 100 Square Feet** — Learn → compact tools, folding bench, wall storage.
228. **Plan a Woodshop in Half of a Two-Car Garage** — Learn → mobile bases, curtains, storage.
229. **Build a Flip-Top Tool Cart for Two Benchtop Machines** — Build → locking hardware, casters, plans.
230. **Build a Mobile Planer Cart With Folding Infeed Support** — Build → casters, rollers, plans.
231. **Build a Mobile Table Saw Workstation** — Build → casters, dust fittings, plans.
232. **Build a Modular French-Cleat Tool Wall** — Build → plywood, hangers, cleat accessories.
233. **Build a Rolling Lumber Cart for Boards and Sheet Goods** — Build → casters, plywood, plans.
234. **Build a Vertical Plywood Storage Rack** — Build → sheet goods, casters, plans.
235. **Build a Horizontal Lumber Rack With Safe Load Ratings** — Build → brackets, fasteners, stud finder.
236. **Build an Under-Bench Offcut Organizer** — Build → bins, dividers, labels.
237. **Build a Rolling Scrap-Wood Sorting Cart** — Build → casters, plywood, plan.
238. **Build a Small-Parts Hardware Cabinet** — Build → drawer hardware, labels, plans.
239. **Build a Wall Cabinet for Router Bits and Blades** — Build → hinges, bit inserts, blade sleeves.
240. **Build a Charging Station for Cordless Tools** — Build → power strip, brackets, cable management.
241. **Build a Hand-Tool Cabinet With Plane Till and Chisel Rack** — Build → hinges, magnets, plans.
242. **Build a Sandpaper Storage Cabinet by Grit and Format** — Build → dividers, labels, abrasives.
243. **Build a Mobile Clamp Cart** — Build → casters, plywood, plans.
244. **Build a Finishing-Supply Cabinet With Metal Safety Storage Rules** — Build → compliant storage products, labels; qualified safety review.
245. **Build a Fold-Down Assembly Table** — Build → heavy-duty hinges, folding brackets, plans.
246. **Build a Ceiling-Mounted Storage Rack for Light Materials** — Build → rated hardware, stud finder; load-warning review.
247. **Build a Shop-Vac Accessory Dock** — Build → hose adapters, wall fittings, plan.
248. **Label and Inventory Your Shop Without Creating Busywork** — Learn → labeler, bins, downloadable inventory.
249. **Shop Organization on a $100 Budget** — Buy → bins, pegboard/cleats, lighting.
250. **The Mobile-Base Buying Guide: Universal vs. Dedicated Bases** — Buy → mobile bases, leveling casters.

### Cluster K — Dust, safety, lighting, and shop utilities (251–275)

251. **Wood Dust Basics: What Collection and Respirators Each Do** — Learn → respirators, collectors; safety-source review.
252. **Shop Vacuum vs. Dust Extractor vs. Dust Collector** — Buy → vacuums, extractors, collectors.
253. **Single-Stage vs. Cyclone Dust Collector** — Buy → collectors, separators, filters.
254. **Dust Collector Sizing Without Magical CFM Claims** — Learn → collectors, duct components; engineering caveats.
255. **Build a Cyclone Separator Cart for a Shop Vacuum** — Build → separator, hoses, casters.
256. **Build a Quiet Shop-Vac Muffler Cabinet Without Overheating It** — Build → acoustic material, vent parts; manufacturer-clearance checks.
257. **2½-Inch vs. 4-Inch Dust Hose in a Small Shop** — Buy → hoses, blast gates, adapters.
258. **Build a Dust-Collection Duct Map for a Garage Shop** — Learn → ducting, gates, grounding guidance from manufacturers.
259. **HEPA Filters for Woodworking: Labels and Fit Explained** — Buy → certified filters, extractors, respirators.
260. **Build an Overarm Table Saw Dust Hood** — Build → clear guard material, hose, hardware.
261. **Build a Downdraft Sanding Table** — Build → filters, blower/collector connection, plans.
262. **Hearing Protection for Woodworking: Muffs vs. Plugs** — Buy → rated hearing protection.
263. **Respirator Buying Guide for Dust and Finishing Tasks** — Buy → appropriately rated PPE; manufacturer/agency sources.
264. **Safety Glasses vs. Goggles vs. Face Shields in the Shop** — Buy → eye/face protection.
265. **Build a Push-Block and Push-Stick Safety Set** — Build → grippy material, replaceable heels, plans.
266. **Table Saw Safety Systems: Riving Knives, Guards, and Flesh Detection** — Buy → saws/accessories; no unsafe retrofit implication.
267. **How to Light a Workshop Without Shadows at the Blade** — Learn → high-CRI fixtures, task lights.
268. **Build an Adjustable Magnetic Task Light for Stationary Tools** — Build → low-voltage light, magnetic base.
269. **Garage Shop Heating: Protecting Wood, Finish, and Fingers** — Learn → safe heaters, thermometer/hygrometer.
270. **Garage Shop Cooling and Ventilation for Finish Days** — Learn → fans, monitors, manufacturer-safe ventilation.
271. **Workshop Electrical Planning: Loads, Circuits, and When to Call an Electrician** — Learn → monitors, cord management; electrician review.
272. **Extension Cords for Power Tools: Gauge and Length Explained** — Buy → properly rated cords; manufacturer/electrical sources.
273. **Fire Extinguishers and Oily-Rag Storage for a Woodshop** — Buy → rated extinguisher, approved waste can; official safety sources.
274. **Create a Woodshop Emergency Plan and First-Aid Station** — Learn → first-aid kit, eyewash, signage.
275. **The Pre-Cut Machine Safety Checklist** — Learn → printable checklist, push tools, PPE.

### Cluster L — Sanding, adhesives, stains, and finishes (276–300)

276. **Wood Sandpaper Grits Explained: Start, Stop, and Skip** — Buy → abrasive assortments, storage.
277. **Random-Orbit Sander Buying Guide: Stroke, Speed, and Dust** — Buy → sanders, extractors, discs.
278. **5-Inch vs. 6-Inch Random-Orbit Sander** — Buy → sanders, interface pads, discs.
279. **Mesh vs. Paper Sanding Discs: Cut Rate, Dust, and Cost Compared** — Buy → abrasives, pad protectors.
280. **How to Sand Without Pigtails** — Learn → sander, abrasives, vacuum adapters.
281. **How to Sand Curves, Profiles, and Tight Corners** — Learn → sanding sponges, detail tools, scrapers.
282. **Build a Hand-Sanding Block Set From Scrap** — Build → adhesive-backed abrasive, cork, plan.
283. **Card Scraper vs. Sandpaper for Difficult Grain** — Buy → scrapers, burnisher, abrasives.
284. **Wood Glue Types: PVA, Polyurethane, CA, Hide Glue, and Epoxy** — Buy → adhesives, applicators.
285. **How Much Wood Glue Is Enough?** — Learn → glue bottles, rollers, cleanup tools.
286. **Open Time vs. Clamp Time vs. Cure Time** — Learn → slow/fast-set glues, timers, clamps.
287. **How to Keep Glue Squeeze-Out From Ruining Finish** — Learn → glue, tape, scrapers.
288. **Five Wood Glue Joints: Load Paths and Common Failure Risks** — Buy → adhesives, clamps; transparent comparison criteria.
289. **Epoxy Basics for Filling Knots and Small Voids** — Learn → epoxy, pigments, PPE.
290. **How to Make a Finish Sample Board Library** — Build → sample kit, labels, finishes.
291. **Oil vs. Water-Based Polyurethane** — Buy → finishes, brushes, respirator where appropriate.
292. **Wipe-On Finish for Beginners: A Low-Stress Schedule** — Learn → finish, applicators, approved rag can.
293. **Hardwax Oil vs. Polyurethane for Tables** — Buy → finishes, maintenance kits.
294. **Shellac as a Sealer, Barrier Coat, and Repair Finish** — Learn → shellac, flakes, brushes; safe handling.
295. **How to Avoid Blotchy Stain on Pine, Cherry, and Maple** — Learn → conditioners, dye/gel stain, sample boards.
296. **Dye vs. Pigment Stain: What Changes the Grain** — Buy → dyes, stains, applicators.
297. **How to Spray Water-Based Finish in a Small Shop** — Learn → sprayer, filters, PPE; ventilation review.
298. **HVLP Turbine vs. Compressor Spray Gun for Furniture** — Buy → spray systems, needles, filters.
299. **How to Rub Out a Finish From Satin to Gloss** — Learn → abrasives, compounds, pads.
300. **Repair Scratches, White Rings, and Worn Spots in a Clear Finish** — Learn → repair kits, finish, abrasives.

### Cluster M — Living-room furniture and media (301–325)

301. **Build a Beginner Coffee Table With a Lower Shelf** — Build → miter/circular saw, pocket-hole jig, sander, finish.
302. **Build a Modern Coffee Table With Floating-Look Top** — Build → doweling/loose-tenon tool, clamps, plans.
303. **Build a Lift-Top Coffee Table With Hidden Storage** — Build → lift hardware, edge banding, plywood, plans.
304. **Build a Round Coffee Table With a Router Circle Jig** — Build → router, circle jig, finish.
305. **Build a Waterfall-Edge Plywood Coffee Table** — Build → track saw, splines/dominos, veneer tape.
306. **Build a Live-Edge Coffee Table Without Trapping Moisture** — Build → slab, moisture meter, flattening/finish tools.
307. **Build a Simple End Table With One Drawer** — Build → drawer slides, router, hardware, plans.
308. **Build a C-Shaped Sofa Table for a Small Living Room** — Build → dowels/pocket holes, finish, feet.
309. **Build a Narrow Console Table for an Entry or Sofa** — Build → joinery tools, finish, plans.
310. **Build a Hall Tree With Bench and Shoe Storage** — Build → plywood, hooks, hinges, finish.
311. **Build a Slatted Entry Bench With a Shoe Shelf** — Build → saw, spacers, sander, finish.
312. **Build a Mid-Century Record Console** — Build → plywood, edge banding, legs, slides/hinges.
313. **Build a Vinyl Record Crate With Handholds** — Build → jigsaw/router, glue, finish.
314. **Build a Low Media Console With Sliding Doors** — Build → track hardware, cable grommets, finish.
315. **Build a Floating TV Console With Ventilation and Cable Access** — Build → wall hardware, plywood, grommets; load review.
316. **Build a Speaker Stand Filled for Stability** — Build → sheet goods, spikes/feet, filler, finish.
317. **Build a Turntable Stand With Record Storage** — Build → plywood, isolation feet, hardware.
318. **Build a Ladder Shelf That Doesn’t Rack** — Build → joinery system, wall anchors, finish.
319. **Build a Modular Cube Bookcase** — Build → plywood, edge banding, connectors.
320. **Build a Solid-Wood Bookcase With Adjustable Shelves** — Build → shelf-pin jig, joinery tools, finish.
321. **Build a Barrister-Style Bookcase With Lift Doors** — Build → door hardware, glass/acrylic, plans.
322. **Build Floating Shelves With a Hidden Steel Bracket** — Build → rated brackets, drill guide, level.
323. **Build a Fireplace Mantel Over a Cleat** — Build → trim tools, fasteners, finish; clearance/code caveat.
324. **Build a Blanket Ladder Without Pocket-Hole Plugs Showing** — Build → doweling jig, sander, finish.
325. **Build a Sofa Arm Tray From One Board** — Build → saw, router, cork, finish.

### Cluster N — Tables, seating, and dining (326–350)

326. **Build a Farmhouse Dining Table Without Breadboard-End Cracks** — Build → joinery tools, clamps, finish, plans.
327. **Build a Trestle Dining Table With Knock-Down Hardware** — Build → connector hardware, drill guide, plans.
328. **Build a Modern Pedestal Dining Table** — Build → template routing, fasteners, finish.
329. **Build a Round Dining Table With a Stable Base** — Build → circle jig, joinery hardware, plans.
330. **Build a Tabletop That Stays Flat Through the Seasons** — Learn → moisture meter, clamps, tabletop fasteners.
331. **How to Attach a Solid-Wood Tabletop for Seasonal Movement** — Learn → figure-eight/Z-clips, slot-cutting tools.
332. **Build a Dining Bench With Wedged Through-Tenons** — Build → hand tools, wedges, finish.
333. **Build a Simple Dining Bench With Tapered Legs** — Build → taper jig, joinery tools, plans.
334. **Build a Shaker-Style Side Table** — Build → mortise/tenon tools, drawer hardware, plans.
335. **Build a Parsons Table With Crisp Shadow Lines** — Build → loose-tenon/dowel tools, clamps, finish.
336. **Build a Folding Card Table for Small Spaces** — Build → folding hardware, hinges, plans.
337. **Build a Drop-Leaf Table With Rule Joints** — Build → router-bit set, hinges, supports.
338. **Build a Sofa Table That Converts Into a Dining Table** — Build → extension hardware, plans, joinery tools.
339. **Build a Counter-Height Bar Table** — Build → joinery hardware, foot rail, finish.
340. **Build a Backless Shop or Kitchen Stool** — Build → joinery tools, footrest hardware, finish.
341. **Build a Saddle-Seat Stool With Shaped Top** — Build → angle grinder carving disc/rasps, sander, PPE.
342. **Build a Step Stool With Handhold and Non-Slip Feet** — Build → saw, router, grippy feet, finish.
343. **Build an Adirondack Chair From Templates** — Build → jigsaw/bandsaw, stainless screws, outdoor finish.
344. **Build a Simple Dining Chair With Upholstered Seat** — Build → joinery tools, foam/fabric, stapler.
345. **Build a Windsor-Inspired Stick Chair With Power Tools** — Build → angle drilling jig, reamer, plans.
346. **Build a Bent-Lamination Stool** — Build → thin-stock blade, form materials, epoxy/glue, clamps.
347. **Build a Plywood Lounge Chair From Full-Size Templates** — Build → jigsaw/router, templates, finish.
348. **Build a Child’s Table and Chair Set With Rounded Edges** — Build → roundover bit, non-toxic finish, plans.
349. **Build a Folding Camp Stool With a Canvas Seat** — Build → hardware, canvas/leather, finish.
350. **Dining-Table Finish Comparison: Heat, Water, and Scratch Tests** — Buy → finishes, applicators; published test method.

### Cluster O — Bedroom, storage, and home office (351–375)

351. **Build a Platform Bed With Hidden Fasteners** — Build → bed hardware, joinery tools, plans.
352. **Build a Knock-Down Bed Frame That Survives a Move** — Build → bed bolts, inserts, drill guide.
353. **Build a Storage Bed With Full-Extension Drawers** — Build → slides, plywood, hardware, plans.
354. **Build a Floating Nightstand With One Drawer** — Build → wall hardware, drawer slides, finish.
355. **Build a Simple Two-Drawer Nightstand** — Build → slides, pulls, plywood/solid wood.
356. **Build a Blanket Chest With Safe Lid Supports** — Build → lid stays, hinges, cedar lining.
357. **Build a Cedar-Lined Wardrobe Trunk** — Build → aromatic cedar, hardware, finish.
358. **Build a Six-Drawer Dresser Carcass That Stays Square** — Build → plywood, slides, assembly jigs, plans.
359. **Build Graduated Dresser Drawers With Consistent Reveals** — Build → slide jig, setup spacers, pulls.
360. **Build a Freestanding Clothing Rack With Shoe Shelf** — Build → dowels/pipe, casters, finish.
361. **Build a Closet Organizer That Can Be Removed Later** — Build → plywood, cleats, shelf hardware.
362. **Build Under-Bed Storage Drawers on Casters** — Build → casters, pulls, plywood.
363. **Build a Wall-Mounted Fold-Down Desk** — Build → rated hinges/brackets, wall anchors, plans.
364. **Build a Compact Writing Desk With Cable Management** — Build → grommets, drawer hardware, finish.
365. **Build a Standing Desk Base With Electric Legs** — Build → powered base, cable tray, finish.
366. **Build a Solid-Wood Desktop That Won’t Cup** — Build → moisture meter, clamps, fasteners, finish.
367. **Build a Mobile Printer Cart With Paper Storage** — Build → casters, slides, plywood.
368. **Build a File Cabinet for Letter and Legal Folders** — Build → file rails, slides, lock, plans.
369. **Build a Bookcase Desk Wall From Modular Boxes** — Build → plywood, edge banding, connectors.
370. **Build a Monitor Riser With Keyboard Storage** — Build → saw, cork feet, finish.
371. **Build a Laptop Stand With Adjustable Angles** — Build → hinges, stops, non-slip pads.
372. **Build a Desk Organizer From Scrap Hardwood** — Build → small bits, felt, finish.
373. **Build a Headphone Stand With a Bent-Lamination Arch** — Build → veneer/thin stock, form, glue.
374. **Build an Ergonomic Footrest With Adjustable Tilt** — Build → pivot hardware, non-slip mat.
375. **Build a Murphy Desk With Integrated Lighting** — Build → hinges, LED system, cable routing, plans.

### Cluster P — Kitchen, bath, cabinetry, and built-ins (376–400)

376. **Build a Base Cabinet Carcass From Plywood** — Build → track/table saw, confirmat/pocket screws, plans.
377. **Build a Wall Cabinet Carcass and Hang It on a French Cleat** — Build → cabinet screws, level, cleat.
378. **Frameless vs. Face-Frame Cabinets for a DIY Shop** — Learn → jigs, hinges, cabinetry course.
379. **Build Shaker Cabinet Doors With a Router Table** — Build → cope-and-stick bits, coping sled, clamps.
380. **Build Shaker Doors With a Table Saw and No Specialty Bits** — Build → dado blade, push tools, clamps.
381. **Build Flat Slab Cabinet Doors That Stay Flat** — Build → plywood/MDF, edge banding, hinges.
382. **How to Size and Install Concealed Cabinet Hinges** — Learn → hinge jig, Forstner bit, hinges.
383. **How to Choose and Install Drawer Slides** — Buy → side/undermount slides, jigs, spacers.
384. **Build a Drawer Box With Locking Rabbets** — Build → router/table saw, slides, plywood.
385. **Build a Dovetailed Drawer by Hand** — Build → dovetail tools, bottom material, finish.
386. **How to Install Inset Drawer Fronts With Even Reveals** — Learn → spacers, double-sided tape, hardware jig.
387. **Build a Pull-Out Trash Cabinet** — Build → pullout hardware, slides, plywood.
388. **Build a Narrow Rolling Pantry Cart** — Build → casters, plywood, handle.
389. **Build a Kitchen Island With Seating Overhang** — Build → cabinets, countertop fasteners, finish, plans.
390. **Build a Butcher-Block Countertop and Finish It for Use** — Build → clamps, food-contact-appropriate finish, fasteners.
391. **Build a Cutting Board With Safe Grain Orientation** — Build → clamps, food-contact-appropriate glue/finish.
392. **Build an End-Grain Cutting Board Without Gaps** — Build → table saw/planer workflow, clamps, finish.
393. **Build a Wall-Mounted Pot Rack With Wooden Rails** — Build → hooks, rated anchors, finish.
394. **Build a Bathroom Vanity With Moisture-Resistant Details** — Build → plywood, hinges/slides, water-resistant finish.
395. **Build a Floating Bathroom Shelf That Resists Humidity** — Build → brackets, anchors, finish.
396. **Build a Medicine Cabinet With a Mirror Door** — Build → mirror, hinges, shelf pins, plans.
397. **Build a Laundry Pedestal With Storage** — Build → plywood, anti-vibration pads; appliance/load caveats.
398. **Build a Mudroom Locker Wall With a Bench** — Build → plywood, hooks, hinges, plans.
399. **How to Scribe a Cabinet to a Crooked Wall** — Learn → compass, block plane/jigsaw, filler strips.
400. **How to Install Built-In Shelves Without Visible Gaps** — Learn → scribing tools, trim nailer, caulk/finish.

### Cluster Q — Outdoor, deck, patio, and garden builds (401–425)

401. **Build a Cedar Planter Box With Replaceable Liner** — Build → cedar, exterior screws, liner, finish.
402. **Build a Self-Watering Raised Garden Bed** — Build → exterior lumber, reservoir parts, plans.
403. **Build a Raised Garden Bed That Resists Bowing** — Build → rated exterior fasteners, brackets, finish.
404. **Build a Potting Bench With a Removable Soil Bin** — Build → cedar, bin, hooks, exterior finish.
405. **Build a Folding Garden Kneeler and Seat** — Build → dowels/hardware, outdoor fabric, finish.
406. **Build an Outdoor Dining Table With Drainage Gaps** — Build → exterior lumber, spacers, fasteners, finish.
407. **Build an Outdoor Bench With a Contoured Seat** — Build → jigsaw/bandsaw, templates, exterior hardware.
408. **Build a Patio Storage Bench With a Water-Shedding Lid** — Build → exterior plywood/lumber, lid supports, seals.
409. **Build a Modular Outdoor Sectional** — Build → exterior screws, cushions, plans.
410. **Build a Porch Swing With Rated Hanging Hardware** — Build → swing hardware, exterior finish; load/structure review.
411. **Build a Hammock Stand From Construction Lumber** — Build → structural fasteners, finish; load-test caveat.
412. **Build a Folding Adirondack Chair** — Build → stainless hardware, templates, outdoor finish.
413. **Build a Patio Cooler Cart With Drainage** — Build → cooler, casters, plumbing fittings, finish.
414. **Build a Grill Cart With a Removable Prep Top** — Build → casters, hooks, food-safe work surface; heat-clearance caveat.
415. **Build a Firewood Rack With a Rain-Shedding Roof** — Build → exterior fasteners, roofing, finish.
416. **Build a Simple Pergola: Planning, Joinery, and Code Questions** — Build → structural hardware, plans; permit/engineer caveat.
417. **Build a Garden Tool Rack for Long-Handled Tools** — Build → hooks, wall anchors, exterior finish.
418. **Build a Hose Hanger With a Hidden Shelf** — Build → exterior hardware, anchors, finish.
419. **Build a Birdhouse With Species-Appropriate Dimensions** — Build → cedar, exterior screws, predator guard; conservation sources.
420. **Build a Bird Feeder That Is Easy to Clean** — Build → cedar, stainless hardware, safe finish.
421. **Build a Bat House Using Conservation Guidelines** — Build → exterior plywood, dark finish, mounting hardware; conservation sources.
422. **Build a Pollinator Hotel That Can Be Maintained** — Build → untreated materials, replaceable inserts; conservation review.
423. **Build a Cedar Compost-Screening Frame** — Build → hardware cloth, exterior screws, handles.
424. **Build a Folding Outdoor Serving Tray With Stand** — Build → hinges, dowels, exterior finish.
425. **Outdoor Wood Finishes Compared After Sun and Water Exposure** — Buy → outdoor finishes, applicators; long-term test log.

### Cluster R — Gifts, decor, kids, and scrap-wood projects (426–450)

426. **Build a Hardwood Serving Board With Routed Handles** — Build → router bit, food-contact-appropriate finish.
427. **Build a Cheese Board With a Removable Wire Cutter** — Build → cutter hardware, drill bits, finish.
428. **Build a Wooden Recipe Box With Dividers** — Build → small hinges, cards, finish.
429. **Build a Keepsake Box With a Sliding Lid** — Build → router/table saw, liner, finish.
430. **Build a Mitered Jewelry Box With Velvet Trays** — Build → spline jig, hinges, lining, finish.
431. **Build a Wooden Watch Box With Dividers** — Build → small hardware, glass/acrylic, lining.
432. **Build a Valet Tray From a Single Hardwood Blank** — Build → bowl/tray bit, router, finish.
433. **Build a Wall-Mounted Key Holder With Mail Shelf** — Build → hooks, anchors, finish.
434. **Build a Picture Frame With Perfect Miters and Splines** — Build → miter saw/sled, clamps, frame hardware.
435. **Build a Floating Display Frame for Art or Vinyl** — Build → acrylic/glass, turn buttons, finish.
436. **Build a Hardwood Phone Stand With Charging Slot** — Build → drill/router, cork, finish.
437. **Build a Tablet Stand for Recipes and Video Calls** — Build → saw/router, non-slip pads, finish.
438. **Build a Passive Wooden Phone Speaker** — Build → Forstner bits/router, templates, finish.
439. **Build a Desk Lamp With a Wooden Articulating Arm** — Build → low-voltage listed light kit, knobs, wire management.
440. **Build a Wooden Wall Clock With Clean Numeral Layout** — Build → clock movement, template, finish.
441. **Build a Growth Chart Ruler That Moves With the Family** — Build → stencil/template, finish, mounting hardware.
442. **Build a Toy Car Ramp From Plywood Offcuts** — Build → plywood, roundover bit, child-safe finish.
443. **Build Wooden Building Blocks With Rounded Edges** — Build → hardwood, sanding tools, child-safe finish.
444. **Build a Kids’ Step Tower With Guard Rails** — Build → plywood, non-slip feet, finish; stability/supervision warning.
445. **Build a Dollhouse Bookcase From One Sheet of Plywood** — Build → plywood, jigsaw, child-safe finish.
446. **Build a Pet Feeding Station With Removable Bowls** — Build → bowls, finish, non-slip feet.
447. **Build a Raised Dog Bed With Washable Fabric** — Build → canvas, fasteners, finish.
448. **Build a Cat Window Perch With Rated Supports** — Build → brackets, fabric, anchors; load review.
449. **Build a Set of Shop-Made Wooden Christmas Ornaments** — Build → scroll saw/CNC, blades/bits, finish.
450. **25 Scrap-Wood Gifts to Batch Before the Holidays** — Build → project bundle, abrasives, finish, packaging.

### Cluster S — Lumber, sheet goods, defects, repair, and troubleshooting (451–475)

451. **Hardwood vs. Softwood: What the Names Do and Don’t Tell You** — Learn → species sample kit, lumber guide.
452. **Plywood Grades, Veneer Cores, and Face Grades Explained** — Buy → sheet goods, track-saw blades.
453. **MDF vs. Plywood vs. Particleboard for Cabinets** — Buy → sheet goods, fasteners, respiratory protection.
454. **Baltic Birch vs. Domestic Veneer-Core Plywood** — Buy → plywood, blades, edge treatments.
455. **Red Oak vs. White Oak for Furniture and Outdoor Use** — Buy → lumber, finishes, sample pack.
456. **Hard Maple vs. Soft Maple: Color, Hardness, and Workability** — Buy → lumber, blades/bits, finishes.
457. **Walnut Alternatives: Similar Look at Different Budgets** — Buy → lumber sources, dyes, finishes.
458. **Poplar vs. Pine for Painted Furniture** — Buy → lumber, primer, filler.
459. **How to Buy Rough Lumber at a Hardwood Dealer** — Learn → moisture meter, tape, board-foot calculator.
460. **Air-Dried vs. Kiln-Dried Lumber** — Learn → moisture meter, storage stickers.
461. **How to Use a Moisture Meter Before a Build** — Buy → pin/pinless meters, calibration block.
462. **How to Acclimate Lumber Without Turning the Shop Into Storage** — Learn → rack, stickers, hygrometer.
463. **Wood Movement Calculator and Furniture Rules** — Learn → calculator, hygrometer, reference chart.
464. **Flat-Sawn vs. Rift-Sawn vs. Quarter-Sawn Boards** — Learn → sample kit, lumber sources.
465. **How to Read End Grain and Predict Board Movement** — Learn → hand lens, moisture meter.
466. **How to Stabilize a Checked or Split Board** — Learn → bow ties, router template, epoxy.
467. **How to Inlay a Butterfly Key Across a Crack** — Learn → template, router/chisels, contrasting wood.
468. **How to Remove a Cup From a Board With Minimal Thickness Loss** — Learn → planer sled, hand planes.
469. **How to Fix Twist in a Board** — Learn → winding sticks, jointer/plane, sled.
470. **How to Repair Stripped Screw Holes in Wood** — Learn → dowels, drill bits, repair kit.
471. **How to Repair a Split Tabletop** — Learn → clamps, glue/epoxy, movement-friendly fasteners.
472. **How to Patch Plywood Veneer Without Making It Obvious** — Learn → veneer, knives, adhesive.
473. **How to Fix a Drawer That Sticks Seasonally** — Learn → plane, wax, slide alternatives.
474. **How to Fix a Wobbly Table or Chair** — Learn → glue, clamps, corner blocks, leveling feet.
475. **Reclaimed Lumber: Finding Metal, Dirt, Bugs, and Bad Surprises** — Learn → metal detector, brushes, blades, PPE.

### Cluster T — High-intent buying decisions and digital learning (476–500)

476. **Best Table Saw for a One-Car Garage: Decision Guide and Test Protocol** — Buy → saws, mobile bases, blades.
477. **Best Cabinet Table Saw for a Serious Home Shop** — Buy → cabinet saws, dust collection, power accessories.
478. **SawStop vs. Conventional Table Saw: Safety System, Cost, and Tradeoffs** — Buy → table saws, cartridges, blades.
479. **Best Benchtop Thickness Planer for Furniture Projects** — Buy → planers, stands, replacement cutters.
480. **DeWalt-Style Three-Knife Planer vs. Helical-Head Benchtop Planer** — Buy → planers, cutters, dust adapters.
481. **Best 8-Inch Jointer for a Garage Shop** — Buy → jointers, mobile bases, dust fittings.
482. **Best Dust Collector for a Small Woodshop** — Buy → collectors, separators, filters, ducting.
483. **Best Dust Extractor for Sanding and Track Saws** — Buy → extractors, hoses, adapters, abrasives.
484. **Best Router Table System: Benchtop, Cast-Iron, or Shop-Built** — Buy → tables, lifts, fences, routers.
485. **Best CNC Router for a First Small Business** — Buy → CNC systems, spindle/router, dust, training.
486. **Desktop CNC Showdown: Work Area, Rigidity, Software, and Support** — Buy → CNCs, bits, enclosures.
487. **DeWalt vs. Makita Cordless Compact Router** — Buy → routers, batteries, bases, bits; current-model retest required.
488. **Corded vs. Cordless Router for a Furniture Shop** — Buy → routers, battery systems, dust accessories.
489. **Track Saw System Comparison: Accuracy, Dust, Rails, and Blade Cost** — Buy → track saws, rails, blades.
490. **Random-Orbit Sander Showdown: Finish Quality, Vibration, and Dust** — Buy → sanders, extractors, discs.
491. **Premium vs. Budget Chisels After Sharpening and Use** — Buy → chisels, stones, honing guides.
492. **Premium vs. Budget Parallel Clamps Under Load** — Buy → clamps, clamp racks, pads.
493. **Best Wood Glue for Furniture, Outdoor Projects, and Long Open Time** — Buy → adhesives, applicators.
494. **Best Saw Blade for Plywood, Ripping, and General Furniture Work** — Buy → blades, cleaner, storage.
495. **Best Router Bits to Buy Individually Instead of in a Giant Set** — Buy → bits, collets, storage.
496. **Best Sandpaper System by Sander, Wood, and Finish Schedule** — Buy → abrasives, pad protectors, storage.
497. **Woodworking Plans Memberships Compared: Clarity, Accuracy, and Value** — Buy → vetted memberships; independently build sample projects.
498. **Woodworking Online Courses Compared for Beginners** — Buy → vetted courses; curriculum/refund/instructor audit.
499. **Are Giant Woodworking Plan Bundles Worth It? A Build-and-Accuracy Audit** — Buy → vetted plan libraries only; evidence and licensing review.
500. **The Best Paid Woodworking Education Path for Your Goal and Budget** — Buy → courses, guilds, plan subscriptions; scenario-based verdicts.

## 10. Monetization map by reader need

| Reader moment | Primary value | Natural revenue | Guardrail |
|---|---|---|---|
| Choosing a first project | Confidence and minimum-tool path | Starter tools, plan pack | Always offer a low-tool route |
| Preparing stock | Flat, square, predictable parts | Jointer, planer, blades, meters | Explain outsourcing/S4S alternative |
| Making a joint | Fit and repeatability | Jig, bit, blade, glue, clamps | Tool must solve a documented constraint |
| Sanding/finishing | Surface quality and finish durability | Abrasives, sander, dust extraction, finishes | Use sample boards and disclose conditions |
| Small-shop bottleneck | Space, power, dust, workflow | Mobile bases, compact machines, storage plans | State footprint and infrastructure cost |
| Upgrade decision | Faster/better/safer outcome | High-ticket stationary tool | Test by scenario; include “keep what you own” |
| Skills gap | Guided practice and feedback | Course, membership, plan bundle | Audit curriculum, teacher, refunds, and accuracy |
| Consumable refill | Correct compatibility | Blades, bits, glue, sandpaper, finish | Keep compatibility/current-model data fresh |

One tutorial may naturally reference many items, but link count is not a goal. A coffee-table guide can appropriately connect to a saw, joinery aid, sander, abrasives, glue, fasteners, and topcoat only when each appears in the actual verified build and the minimum-tool option remains clear.

## 11. Launch and publishing roadmap

### Phase 0 — Foundation

- Confirm brand/domain/trademark direction.
- Install Tailwind and establish tokens/components only when implementation starts.
- Add routing and the prerender pipeline before publishing Firestore content.
- Implement analytics consent, affiliate click events, Search Console, sitemap generation, error monitoring, security rules, Emulator tests, and environment separation.
- Publish About, author, testing method, editorial policy, affiliate disclosure, corrections, privacy, terms, contact, and accessibility pages.
- Build one complete guide through JSON → Firestore emulator → prerendered route → Vercel preview to validate the content contract.

### Phase 1 — First 30 pages

Prioritize IDs `001, 002, 004, 006, 007, 012, 014, 015, 023, 031, 041, 051, 052, 069, 076, 077, 101, 106, 109, 133, 151, 176, 183, 202, 251, 252, 276, 284, 290, 301` plus the required trust pages. This creates a beginner journey, a representative project, useful consumable needs, and the beginnings of tool authority.

### Phase 2 — Reach 100 excellent pages

- Deepen only the clusters showing reader completion, saves, newsletter response, and qualified search impressions.
- Publish paired content: one skill, one build that uses it, one troubleshooting answer, and one buyer decision.
- Add at least one original comparative test per priority tool category.
- Refresh internal links and hub copy after every 20–25 new pages.

### Phase 3 — Reach 250 pages

- Add project finder, calculators, saved projects, and a structured update queue.
- Commission qualified safety/electrical review where required.
- Expand photography/video and reader build submissions with documented rights.
- Use Search Console data to merge cannibalizing pages and improve weak satisfaction paths—not to clone query variations.

### Phase 4 — Reach up to 500 pages

- Proceed only where the remaining brief adds distinct, demonstrable value.
- Run a quarterly content-decay audit: outdated models/offers, unsafe guidance, stale dates, thin evidence, broken media, and orphaned pages.
- Archive/redirect content that cannot be maintained. Keeping all 500 live is not a success metric.

### Minimum launch scorecard

- Zero broken internal links or indexable empty routes.
- 100% of indexable pages have canonical metadata, disclosure where applicable, author/reviewer, update dates, sitemap inclusion, and crawlable hub links.
- 100% of project dimensions/cut lists independently checked.
- 100% of affiliate links labeled and mapped to an approved merchant record.
- Core Web Vitals tested on representative low-end mobile hardware and throttled connections.
- No service credentials or unrestricted production rules in source control.

## 12. Decision log for the future article-generation/import phase

Before generating article JSON, lock these decisions:

1. `Guide` schema and portable rich-content block types.
2. Slug/canonical ownership and redirect policy.
3. Source/evidence, image-rights, safety-review, affiliate, and AI-assistance fields.
4. Validation rules for cut lists, units, required blocks, and cross-references.
5. Draft/review/published workflow; bulk-import defaults to `draft` + `noindex`.
6. Idempotent import keyed by stable `id`, with dry run, validation report, versioning, and backup/export.
7. Build-hook behavior and rollback plan.
8. Firestore/Storage rules, service-account least privilege, and secret delivery outside Git.

The import script must never treat “successfully written to Firestore” as “ready to index.” Publication is a separate, reviewed state transition.

## 13. Primary standards and references

These sources informed the non-negotiable requirements above. Recheck them during implementation because search features, platform behavior, and legal guidance evolve.

- [Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search Central: Spam policies, including scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central: Ecommerce site structure and crawlable links](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure)
- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central: Structured data gallery and supported features](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Google Search Central: Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [FTC: Endorsement Guides—affiliate disclosures and material connections](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking)
- [Vercel: Prerendering for performance and SEO](https://vercel.com/kb/guide/how-can-i-prerender-my-application-on-vercel)
- [Vercel: Vite deployments](https://vercel.com/docs/frameworks/frontend/vite)
- [Firebase: Cloud Firestore data model](https://firebase.google.com/docs/firestore/data-model)
- [Firebase: Security checklist](https://firebase.google.com/support/guides/security-checklist)
- [Firebase: Secure Firestore queries and rules](https://firebase.google.com/docs/firestore/security/rules-query)

---

**Document owner:** Product/editorial lead  
**Review cadence:** Monthly during launch; quarterly after content operations stabilize  
**Next implementation artifact:** a route/content contract and one end-to-end reference guide before bulk article creation
