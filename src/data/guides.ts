import type { Guide, GuideIndexItem } from '../types/content'

const disclosure =
  'We may earn a commission from purchases made through links in this guide, at no extra cost to you. Recommendations are selected for fit and usefulness, not commission.'

type GuideInput = Omit<
  Guide,
  | 'canonicalPath'
  | 'status'
  | 'indexStatus'
  | 'affiliateDisclosure'
  | 'prerequisiteIds'
  | 'relatedGuideIds'
  | 'authorId'
  | 'reviewerIds'
  | 'sources'
  | 'createdAt'
  | 'updatedAt'
  | 'contentVersion'
>

function createGuide(input: GuideInput): Guide {
  return {
    ...input,
    canonicalPath: `/${input.type === 'project' ? 'projects' : input.type === 'shop' ? 'shop' : input.type === 'material' ? 'materials' : input.type === 'review' || input.type === 'comparison' ? 'tools' : 'skills'}/${input.slug}/`,
    status: 'review',
    indexStatus: 'index',
    affiliateDisclosure: disclosure,
    prerequisiteIds: [],
    relatedGuideIds: [],
    authorId: 'built-true-editors',
    reviewerIds: [],
    sources: [],
    createdAt: '2026-08-25T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z',
    contentVersion: 1,
  }
}

export const guides: Guide[] = [
  createGuide({
    id: '001',
    slug: 'woodworking-for-absolute-beginners',
    coverImage: '/images/guides/001-beginner-workshop.jpg',
    coverAlt: 'Beginner woodworking crate project surrounded by essential tools on a workshop bench',
    type: 'skill',
    title: 'Woodworking for Absolute Beginners: Your First Safe Weekend in the Shop',
    dek: 'A calm, realistic path from an empty bench to a finished first project—without buying a room full of tools.',
    seoTitle: 'Woodworking for Absolute Beginners | Built True Workshop',
    metaDescription: 'Start woodworking safely with a short tool list, a practical first project, and a weekend plan that builds real skills.',
    categoryId: 'beginner-foundations',
    clusterId: 'beginner-foundations',
    tags: ['beginner', 'safety', 'first project', 'starter tools'],
    intent: 'learn',
    skillLevel: 'beginner',
    activeMinutes: 240,
    totalMinutes: 480,
    costBand: 1,
    evidenceStatus: 'brief',
    naturalOffers: ['eye and hearing protection', 'combination square', 'drill/driver', 'starter plan pack'],
    tools: [
      { name: 'Tape measure', required: true, purpose: 'Basic layout and dimension checks' },
      { name: 'Combination square', required: true, purpose: 'Square lines and tool setup' },
      { name: 'Drill/driver', required: true, purpose: 'Pilot holes, screws, and simple joinery' },
      { name: 'Circular saw or handsaw', required: true, purpose: 'Cut parts to length', substitute: 'Ask the lumberyard to make rough cuts' },
      { name: 'Random-orbit sander', required: false, purpose: 'Faster surface preparation', substitute: 'Hand-sanding block' },
    ],
    materials: [
      { name: 'Straight construction lumber', quantity: '2–3 boards', notes: 'Choose dry boards with minimal twist' },
      { name: 'Wood screws', quantity: '1 small box' },
      { name: 'Wood glue', quantity: '1 bottle' },
      { name: 'Sandpaper', quantity: '80, 120, and 180 grit' },
    ],
    safetyNotes: [
      'Read the manual for every powered tool and keep guards installed.',
      'Wear eye and hearing protection; use dust collection and an appropriate respirator for dusty work.',
      'Clamp the work so both hands can control the tool.',
    ],
    sections: [
      {
        id: 'what-you-are-learning',
        heading: 'The goal is control, not speed',
        paragraphs: [
          'Your first weekend should teach a repeatable sequence: inspect the board, mark from one reference edge, cut just outside the line, test the fit, drill a pilot hole, assemble on a flat surface, and prepare the wood for finish. That sequence matters more than the object you take home.',
          'Start with a small project that tolerates tiny errors. A crate, wall shelf, or shop stool gives you useful practice without requiring perfect drawer gaps or complicated joinery.',
        ],
        callout: {
          tone: 'decision',
          title: 'A good first project has fewer than 12 parts',
          body: 'You should be able to describe every joint before cutting. If the plan requires a tool you have never seen, choose a simpler version first.',
        },
      },
      {
        id: 'before-you-buy',
        heading: 'Buy around the project in front of you',
        paragraphs: [
          'A drill/driver, an accurate square, a saw you can control, several clamps, and a sanding method will complete many beginner projects. Larger stationary machines solve speed, capacity, and repeatability problems that you may not have yet.',
        ],
        bullets: [
          'Buy measuring and safety equipment first because every project uses it.',
          'Borrow or rent a specialty tool before committing floor space and money.',
          'Reserve part of the budget for blades, bits, abrasives, and clamps—the tool alone is rarely the whole cost.',
        ],
      },
      {
        id: 'weekend-plan',
        heading: 'A realistic two-day plan',
        paragraphs: [
          'On day one, set up a clear work area, check the tools, select straight stock, and make practice cuts in scrap. Mill or cut the project parts only after the practice pieces match your marks.',
          'On day two, dry-fit before glue, assemble in a measured order, then sand after the glue has cured. Apply a forgiving wipe-on finish only in the temperature and ventilation range stated by its manufacturer.',
        ],
      },
      {
        id: 'success-check',
        heading: 'What success looks like',
        paragraphs: [
          'The project does not need to look factory-made. It should sit without rocking, have no sharp splinters, and teach you where accuracy mattered. Write one thing you would change on the next build; that note is the beginning of craftsmanship.',
        ],
      },
    ],
  }),
  createGuide({
    id: '002',
    slug: 'first-10-woodworking-tools',
    coverImage: '/images/guides/002-first-tools.jpg',
    coverAlt: 'Essential beginner woodworking tools arranged on a maple workbench',
    type: 'comparison',
    title: 'The First 10 Woodworking Tools to Buy—in the Order They Earn Their Keep',
    dek: 'A project-led purchase order for a small home shop, with the tools you can postpone and the hidden costs to plan for.',
    seoTitle: 'First 10 Woodworking Tools to Buy | Built True Workshop',
    metaDescription: 'Build a useful beginner woodworking kit in the right order, including safety gear, measuring tools, saws, drills, clamps, and sanding.',
    categoryId: 'beginner-foundations',
    clusterId: 'beginner-foundations',
    tags: ['starter tools', 'buying guide', 'beginner shop'],
    intent: 'buy',
    skillLevel: 'beginner',
    costBand: 2,
    evidenceStatus: 'brief',
    naturalOffers: ['PPE', 'combination square', 'drill/driver', 'circular saw', 'random-orbit sander', 'clamps'],
    tools: [],
    materials: [],
    safetyNotes: ['Select safety equipment for the specific hazards and follow each tool manufacturer’s instructions.'],
    sections: [
      {
        id: 'buying-rule',
        heading: 'The buying rule: solve the next repeated problem',
        paragraphs: [
          'Tools earn their place when they solve a problem that appears in several planned projects. A cabinet saw may be exciting, but an accurate square and a stable work surface affect every mark, cut, and assembly.',
          'This list assumes small furniture and household projects in a garage or shared space. A hand-tool-first woodworker can replace the powered cutting and sanding choices with a panel saw, backsaw, planes, and sharpening system.',
        ],
      },
      {
        id: 'the-order',
        heading: 'The first ten purchases',
        paragraphs: ['Buy slowly enough to learn what each purchase changes. The order below protects accuracy, control, and cleanup before speed.'],
        bullets: [
          '1. Eye and hearing protection appropriate to the task.',
          '2. A reliable tape and a square you have checked for accuracy.',
          '3. A stable work surface plus two dependable clamps.',
          '4. A drill/driver and a small set of wood-focused bits.',
          '5. A controlled cutting system: handsaw and bench hook, or circular saw and guide.',
          '6. A sanding block plus 80, 120, and 180 grit paper.',
          '7. Four more clamps sized for the projects you actually build.',
          '8. A random-orbit sander with dust collection.',
          '9. A trim router with straight, flush-trim, and roundover bits.',
          '10. A project-driven saw upgrade: miter, track, table, or bandsaw.',
        ],
      },
      {
        id: 'hidden-costs',
        heading: 'Budget for the working system, not the box',
        paragraphs: [
          'A saw needs an appropriate blade and stable support. A sander needs a recurring supply of abrasives and a vacuum connection. A router needs good collets, a few individual bits, and workholding. Compare the cost of the usable system rather than headline price.',
        ],
        callout: {
          tone: 'tip',
          title: 'Keep 25% of the tool budget unassigned',
          body: 'The first build will reveal the clamp, adapter, blade, or setup aid that removes the real bottleneck.',
        },
      },
      {
        id: 'wait-list',
        heading: 'Tools most beginners can postpone',
        paragraphs: [
          'A jointer, thickness planer, cabinet saw, large dust collector, and CNC machine can be excellent investments after your work repeatedly needs their capacity. Until then, buy surfaced lumber, use a cutting guide, and learn the layout and assembly fundamentals those machines cannot replace.',
        ],
      },
    ],
  }),
  createGuide({
    id: '031',
    slug: 'board-foot-calculator-and-lumber-guide',
    coverImage: '/images/guides/031-board-foot-lumber.jpg',
    coverAlt: 'Rough walnut and oak boards being measured for a board-foot calculation',
    type: 'material',
    title: 'Board-Foot Calculator and Lumber Buying Guide',
    dek: 'Convert rough-lumber dimensions into a realistic purchase quantity, including waste, defects, and milling loss.',
    seoTitle: 'Board-Foot Calculator & Lumber Guide | Built True Workshop',
    metaDescription: 'Calculate board feet and estimate how much rough lumber to buy with practical allowances for defects, grain matching, and milling.',
    categoryId: 'lumber-materials',
    clusterId: 'measuring-layout',
    tags: ['board feet', 'lumber', 'calculator', 'rough lumber'],
    intent: 'learn',
    skillLevel: 'beginner',
    evidenceStatus: 'brief',
    naturalOffers: ['moisture meter', 'tape measure', 'lumber chalk'],
    tools: [{ name: 'Tape measure', required: true, purpose: 'Measure thickness, width, and length' }],
    materials: [],
    safetyNotes: ['Support long or heavy boards and ask the lumberyard for help moving material.'],
    sections: [
      {
        id: 'formula',
        heading: 'The board-foot formula',
        paragraphs: [
          'One board foot is a volume of 144 cubic inches. For dimensions in inches, multiply thickness by width by length, then divide by 144. If length is entered in feet, multiply thickness by width by length and divide by 12.',
          'Rough lumber is commonly tallied using its sold thickness before milling. Confirm the yard’s tally method and whether listed prices are per board foot, per linear foot, or per piece.',
        ],
      },
      {
        id: 'waste',
        heading: 'Add waste for the boards you cannot use',
        paragraphs: [
          'A clean, straight-grained project may need only a modest allowance. A design that requires color matching, long clear parts, or wide panels needs more flexibility. Defects at the end of a board can consume more length than their visible size once checks are trimmed away.',
        ],
        bullets: [
          'Add roughly 15% for simple projects using clear, predictable stock.',
          'Consider 25% for furniture with grain matching or several long parts.',
          'Use 30% or more when boards are heavily figured, lower grade, or defect-rich.',
        ],
      },
      {
        id: 'at-the-yard',
        heading: 'Make a parts map before the lumberyard',
        paragraphs: [
          'Bring the finished part sizes and mark which parts must match. Buy for the longest, widest critical parts first, then nest shorter pieces around them. Photograph or label each selected board so the cutting plan survives the trip home.',
        ],
      },
    ],
  }),
  createGuide({
    id: '101',
    slug: 'table-saw-basics-first-cut',
    coverImage: '/images/guides/101-table-saw-basics.jpg',
    coverAlt: 'Table saw prepared for a safe first cut with its guard, push block, and safety glasses',
    type: 'skill',
    title: 'Table Saw Basics: A Safety-First First Cut',
    dek: 'Understand the cut, set the machine, control the stock, and know when another saw is the safer choice.',
    seoTitle: 'Table Saw Basics: Safety-First First Cut | Built True Workshop',
    metaDescription: 'Learn a safety-first table saw setup: guards, riving knife, fence alignment, stock control, push tools, and shutdown checks.',
    categoryId: 'table-saw',
    clusterId: 'table-saw-mastery',
    tags: ['table saw', 'safety', 'first cut', 'ripping'],
    intent: 'learn',
    skillLevel: 'beginner',
    activeMinutes: 45,
    totalMinutes: 60,
    costBand: 1,
    evidenceStatus: 'brief',
    naturalOffers: ['push block', 'eye and hearing protection', 'combination blade', 'featherboard'],
    tools: [
      { name: 'Table saw with guard and riving knife', required: true, purpose: 'Make the planned rip or crosscut' },
      { name: 'Push stick or push block', required: true, purpose: 'Keep hands away from the blade' },
      { name: 'Combination square', required: true, purpose: 'Check setup with the saw unplugged' },
    ],
    materials: [{ name: 'Straight, flat practice board', quantity: '1', notes: 'Do not begin with warped or twisted stock' }],
    safetyNotes: [
      'This guide supplements, not replaces, the manual and hands-on instruction for your exact saw.',
      'Disconnect power before installing, aligning, or touching a blade.',
      'Never stand directly behind the workpiece in the likely kickback path.',
      'Do not use the rip fence and miter gauge together in a way that traps the offcut.',
    ],
    sections: [
      {
        id: 'before-power',
        heading: 'Make the cut safe before the saw is powered',
        paragraphs: [
          'Identify which finished edge will register against the fence or miter gauge. Check that the stock is flat enough to sit without rocking and straight enough to maintain reference contact. A warped board can rotate into the back of the blade.',
          'With power disconnected, confirm the correct blade is tight and undamaged, the throat plate is flush, the riving knife is aligned, and the guard moves freely. Arrange infeed and outfeed support so neither the workpiece nor offcut will fall and pull you off balance.',
        ],
      },
      {
        id: 'body-position',
        heading: 'Plan hands, body, and the finished movement',
        paragraphs: [
          'Stand balanced and slightly out of the direct line behind the work. Decide where each hand begins, when a push tool takes over, and where your hands finish. If the path requires reaching over the blade, redesign the setup.',
        ],
        callout: {
          tone: 'warning',
          title: 'Stop when the stock loses stable reference contact',
          body: 'Do not twist a wandering board back toward the blade. Switch off, remain still until the blade stops, then reset the operation.',
        },
      },
      {
        id: 'the-cut',
        heading: 'Use steady feed and keep the reference edge registered',
        paragraphs: [
          'Start the saw with the work clear of the blade and let it reach operating speed. Feed at a controlled rate while keeping the stock against the chosen reference surface. Do not pull a partially cut board backward over a spinning blade.',
          'After the work clears, maintain control of the finished piece, move beyond the blade, switch off, and wait for a complete stop before retrieving offcuts near the blade.',
        ],
      },
      {
        id: 'use-another-tool',
        heading: 'When another tool is the better answer',
        paragraphs: [
          'Use a track saw or supported circular saw for large sheet goods that you cannot control on the table. Use a bandsaw or jigsaw for curves and irregular stock. Use a crosscut sled or miter saw for repeat crosscuts when the work cannot register safely against a small miter gauge.',
        ],
      },
    ],
  }),
  createGuide({
    id: '151',
    slug: 'trim-router-vs-full-size-router',
    coverImage: '/images/guides/151-router-comparison.jpg',
    coverAlt: 'Compact trim router and full-size plunge router compared side by side',
    type: 'comparison',
    title: 'Trim Router vs. Full-Size Router: Which Should You Buy First?',
    dek: 'Choose by the cuts you need, not by maximum horsepower or the number of bases in the box.',
    seoTitle: 'Trim Router vs Full-Size Router | Built True Workshop',
    metaDescription: 'Compare trim and full-size routers by control, bit capacity, plunge work, table use, dust collection, and total ownership cost.',
    categoryId: 'routers-cnc',
    clusterId: 'routers-cnc',
    tags: ['router', 'trim router', 'buying guide'],
    intent: 'buy',
    skillLevel: 'beginner',
    costBand: 2,
    evidenceStatus: 'brief',
    naturalOffers: ['trim router', 'full-size router kit', 'edge guide', 'straight bit', 'roundover bit'],
    tools: [],
    materials: [],
    safetyNotes: ['Confirm bit shank, speed range, collet engagement, and base compatibility in the manufacturer’s manual.'],
    sections: [
      {
        id: 'short-answer',
        heading: 'The short answer',
        paragraphs: [
          'Buy a trim router first when your work is mostly edge profiles, flush trimming, shallow hinge mortises, and light template work. It is easier to hold one-handed when the work is securely clamped and usually faster to set up for a small operation.',
          'Buy a full-size plunge-capable kit first when you need deeper dados and mortises, larger-diameter bits within the router’s rating, variable speed over a wider workload, or eventual router-table duty.',
        ],
      },
      {
        id: 'capacity',
        heading: 'Capacity is more than motor rating',
        paragraphs: [
          'Compare collet sizes, plunge travel, base opening, speed range, edge-guide quality, dust collection, switch location, and the availability of compatible bases. A powerful router with a vague depth adjustment can be less useful for joinery than a smaller system that repeats settings cleanly.',
        ],
      },
      {
        id: 'ownership-cost',
        heading: 'Price the complete first-year kit',
        paragraphs: [
          'Include the needed base, edge guide, dust adapter, collets, and two or three quality bits. Large assortments often duplicate profiles you will not use and can hide the performance difference between a precise straight bit and a bargain set.',
        ],
        bullets: [
          'Start with a straight or spiral bit sized to your joinery.',
          'Add a flush-trim or pattern bit for template work.',
          'Add one small roundover bit for touch-friendly edges.',
        ],
      },
      {
        id: 'skip',
        heading: 'Skip both—for now—if the project does not need one',
        paragraphs: [
          'A block plane, chisel, sanding block, or pre-milled profile can handle many early edge and fitting tasks. A router becomes a good purchase when repeatable grooves, templates, or profiles appear across your next several builds.',
        ],
      },
    ],
  }),
  createGuide({
    id: '176',
    slug: 'jointer-vs-planer',
    coverImage: '/images/guides/176-jointer-planer.jpg',
    coverAlt: 'Jointer and thickness planer positioned side by side in a woodworking shop',
    type: 'comparison',
    title: 'Jointer vs. Planer: What Each Machine Actually Makes Flat',
    dek: 'A visual decision guide to reference faces, parallel faces, straight edges, and the machine that creates each one.',
    seoTitle: 'Jointer vs Planer: What Each Machine Does | Built True Workshop',
    metaDescription: 'Understand jointer and planer roles, the correct rough-lumber milling sequence, common misconceptions, and no-jointer alternatives.',
    categoryId: 'stationary-tools',
    clusterId: 'milling-stationary-tools',
    tags: ['jointer', 'planer', 'milling', 'rough lumber'],
    intent: 'buy',
    skillLevel: 'beginner',
    costBand: 3,
    evidenceStatus: 'brief',
    naturalOffers: ['jointer', 'thickness planer', 'push blocks', 'moisture meter', 'planer sled'],
    tools: [],
    materials: [],
    safetyNotes: ['Use guards and push blocks as specified by the manufacturer; do not joint stock below the machine’s minimum dimensions.'],
    sections: [
      {
        id: 'reference-surfaces',
        heading: 'A jointer creates a reference; a planer copies it',
        paragraphs: [
          'A jointer removes high spots while the board passes over two tables and a cutterhead. Used correctly, it creates one flat face, then one straight edge square to that face.',
          'A thickness planer presses a board against its bed and cuts the upper face. It makes that upper face parallel to the lower face, but it does not reliably remove cup or twist when the lower face is not already a stable reference.',
        ],
      },
      {
        id: 'sequence',
        heading: 'The conventional milling sequence',
        paragraphs: [
          'Joint one face, joint one adjacent edge, plane the opposite face parallel, then rip the remaining edge parallel at the table saw. Leave a small amount for final dimensioning after the wood has rested if stability is uncertain.',
        ],
      },
      {
        id: 'without-jointer',
        heading: 'You can begin without owning both machines',
        paragraphs: [
          'A planer sled can support a twisted or cupped board while shims prevent rocking, allowing the planer to establish a first face. A track saw or table-saw jointing jig can then create an edge. Hand planes can establish both references with less floor space and more practice.',
        ],
        callout: {
          tone: 'decision',
          title: 'Buy surfaced lumber when the project is the priority',
          body: 'S3S or S4S stock costs more per board foot but can be cheaper than a machine purchase when you build occasionally or lack dust collection and space.',
        },
      },
      {
        id: 'which-first',
        heading: 'Which machine usually comes first?',
        paragraphs: [
          'For many small shops, a benchtop planer paired with a sled and a straight-edge method unlocks more thickness control per square foot. A jointer earns priority when you process significant rough stock, need faster reference surfaces, and have the footprint, dust collection, and infeed clearance to use it safely.',
        ],
      },
    ],
  }),
  createGuide({
    id: '276',
    slug: 'wood-sandpaper-grits-explained',
    coverImage: '/images/guides/276-sandpaper-grits.jpg',
    coverAlt: 'Coarse, medium, and fine abrasives beside a walnut sanding progression',
    type: 'material',
    title: 'Wood Sandpaper Grits Explained: Start, Stop, and Skip',
    dek: 'Choose a starting grit from the defect—not habit—and stop where your finish schedule needs you to stop.',
    seoTitle: 'Wood Sandpaper Grits Explained | Built True Workshop',
    metaDescription: 'Choose the right sandpaper grit progression for raw wood, stain, clear finish, curves, and random-orbit sanding.',
    categoryId: 'finishing',
    clusterId: 'sanding-finishing',
    tags: ['sandpaper', 'sanding', 'grit', 'finishing'],
    intent: 'learn',
    skillLevel: 'beginner',
    activeMinutes: 45,
    totalMinutes: 60,
    costBand: 1,
    evidenceStatus: 'brief',
    naturalOffers: ['abrasive assortment', 'random-orbit sander', 'hand-sanding block', 'dust extractor'],
    tools: [
      { name: 'Hand-sanding block or random-orbit sander', required: true, purpose: 'Keep abrasive flat and controlled' },
      { name: 'Raking light', required: false, purpose: 'Reveal scratches before finish', substitute: 'Bright portable lamp' },
    ],
    materials: [{ name: 'Quality abrasive sheets or discs', quantity: '80, 120, 150, 180, and 220 grit as needed' }],
    safetyNotes: ['Collect dust at the source and use respiratory protection appropriate to the wood and task.'],
    sections: [
      {
        id: 'start',
        heading: 'Start with the least aggressive grit that removes the defect',
        paragraphs: [
          'Coarse paper removes material quickly but creates deep scratches that every later grit must erase. Begin at 80 grit for milling marks, uneven glue joints, or substantial scratches. Begin at 120 or 150 when the surface is already clean from a sharp plane, scraper, or fine machine cut.',
        ],
      },
      {
        id: 'progression',
        heading: 'Do not make heroic jumps',
        paragraphs: [
          'Each grit should remove the scratch pattern from the previous grit. A reliable furniture progression is 80–120–150–180 when 80 is truly needed. If you start at 120, continue to 150 or 180. Vacuum the surface and inspect under low-angle light between stages.',
        ],
        bullets: [
          'Pencil a light squiggle across broad surfaces to reveal missed low spots.',
          'Slow the sander and let the abrasive cut; heavy pressure increases heat and pigtails.',
          'Replace a loaded or dull disc instead of extending the session with pressure.',
        ],
      },
      {
        id: 'stop',
        heading: 'Stop for the finish you plan to use',
        paragraphs: [
          'Many clear finishes look good over wood sanded to 180 or 220, but the manufacturer’s preparation instructions take priority. Pigment stain may absorb unevenly when the wood is polished too finely. Test the entire schedule—including sanding, stain, sealer, and topcoat—on an offcut from the project.',
        ],
      },
      {
        id: 'edges',
        heading: 'Treat edges and profiles separately',
        paragraphs: [
          'A powered sander can round a crisp edge in seconds. Hand-sand profiles with a shaped block that supports the paper and make fewer passes on edges than faces. Mark veneer thickness mentally and avoid aggressive grits that can cut through a thin face layer.',
        ],
      },
    ],
  }),
  createGuide({
    id: '301',
    slug: 'beginner-coffee-table-with-shelf',
    coverImage: '/images/guides/301-coffee-table.jpg',
    coverAlt: 'Finished walnut coffee table with a lower shelf in a warm living room',
    type: 'project',
    title: 'Build a Beginner Coffee Table With a Lower Shelf',
    dek: 'A forgiving weekend build with a stable base, useful storage, and three tool paths for different shops.',
    seoTitle: 'Beginner Coffee Table Plans With Shelf | Built True Workshop',
    metaDescription: 'Build a simple 42-by-22-inch coffee table with a lower shelf, complete cut list, tool alternatives, assembly order, and finish guidance.',
    categoryId: 'living-room-projects',
    clusterId: 'living-room-furniture',
    tags: ['coffee table', 'beginner project', 'living room', 'furniture'],
    intent: 'build',
    skillLevel: 'beginner',
    activeMinutes: 360,
    totalMinutes: 720,
    costBand: 2,
    dimensions: { imperial: '42 in W × 22 in D × 17 in H', metric: '1067 × 559 × 432 mm' },
    evidenceStatus: 'brief',
    naturalOffers: ['circular or miter saw', 'pocket-hole jig', 'random-orbit sander', 'clamps', 'wood glue', 'finish'],
    tools: [
      { name: 'Saw with a square-cut guide', required: true, purpose: 'Cut legs, rails, and top parts' },
      { name: 'Drill/driver', required: true, purpose: 'Pilot holes and assembly' },
      { name: 'Combination square', required: true, purpose: 'Layout and squareness checks' },
      { name: 'Four clamps', required: true, purpose: 'Control the base and top glue-up' },
      { name: 'Random-orbit sander', required: false, purpose: 'Prepare broad surfaces efficiently', substitute: 'Hand-sanding block' },
    ],
    materials: [
      { name: '1×6 straight boards', quantity: '4 × 8 ft', notes: 'Top and shelf slats' },
      { name: '2×2 straight boards', quantity: '3 × 8 ft', notes: 'Legs and base rails' },
      { name: '1¼-inch pocket screws or approved joinery alternative', quantity: '1 box' },
      { name: 'Wood glue', quantity: '1 bottle' },
      { name: 'Finish', quantity: '1 pint', notes: 'Confirm coverage and application instructions' },
    ],
    cutList: [
      { part: 'Top boards', quantity: 4, thickness: '3/4 in', width: '5 1/2 in', length: '42 in' },
      { part: 'Legs', quantity: 4, thickness: '1 1/2 in', width: '1 1/2 in', length: '16 1/4 in' },
      { part: 'Long rails', quantity: 4, thickness: '1 1/2 in', width: '1 1/2 in', length: '36 in' },
      { part: 'End rails', quantity: 4, thickness: '1 1/2 in', width: '1 1/2 in', length: '16 in' },
      { part: 'Shelf boards', quantity: 4, thickness: '3/4 in', width: '5 1/2 in', length: '36 in', notes: 'Rip final board to fit after dry assembly' },
    ],
    safetyNotes: [
      'Secure every board before drilling or sanding and support long stock during cuts.',
      'Use the saw’s guard and follow its manual; wait for the blade to stop before moving offcuts.',
      'Apply finish with the ventilation, PPE, temperature, and oily-rag handling stated by the manufacturer.',
    ],
    sections: [
      {
        id: 'design',
        heading: 'Why this design works for a first table',
        paragraphs: [
          'The rectangular base uses repeated lengths, so one stop block can make matching parts. The lower shelf helps resist racking while adding useful storage. The top overhang gives you room to hide small alignment errors in the base.',
          'The plan can be assembled with pocket screws, dowels, or loose tenons. Pocket holes are the most accessible route; place them on hidden faces and do not use them to force a warped board flat.',
        ],
      },
      {
        id: 'prepare-parts',
        heading: '1. Prepare and label every part',
        paragraphs: [
          'Choose one clean reference edge on each board. Cut repeated parts with a stop rather than measuring each piece independently. Label the legs and rails as front-left, front-right, and so on before drilling joinery.',
          'Dry-lay the top boards and shelf boards. Rotate and reorder them until neighboring grain and color feel intentional. Mark a large triangle across each panel so the order survives sanding and glue-up.',
        ],
      },
      {
        id: 'assemble-ends',
        heading: '2. Build two square end frames',
        paragraphs: [
          'Join each pair of legs with an upper and lower end rail. Work on the flattest surface available, use equal spacers to position the rails, and compare both diagonals before the glue begins to set. Equal diagonals mean the frame is square.',
        ],
        callout: {
          tone: 'tip',
          title: 'Do not chase square with maximum clamp pressure',
          body: 'Loosen the clamps, shift the longer diagonal inward, remeasure, then apply only enough pressure to close the joints.',
        },
      },
      {
        id: 'connect-base',
        heading: '3. Connect the end frames',
        paragraphs: [
          'Add the long upper and lower rails between the completed ends. Check diagonals at the top and bottom. Sight across the feet; if the base rocks on a verified flat surface, correct the assembly before the glue cures rather than sanding a leg short later.',
        ],
      },
      {
        id: 'top-and-shelf',
        heading: '4. Build the top and fit the shelf',
        paragraphs: [
          'Glue the top boards on a flat surface with alternating clamps above and below. Use cauls if needed to keep faces aligned. Scrape the glue after it reaches a firm, rubbery stage or let it cure fully; wiping wet glue across open grain can spread contamination.',
          'Fit the shelf only after the base is assembled. Leave small, consistent gaps between shelf boards and fasten in a way that allows solid wood to move across its width.',
        ],
      },
      {
        id: 'finish-attach',
        heading: '5. Sand, finish, and attach the top',
        paragraphs: [
          'Ease touchable edges, sand through an appropriate progression, and inspect under raking light. Test the complete finish schedule on an offcut. Attach the top with figure-eight fasteners, Z-clips, or elongated holes that permit seasonal movement across the grain.',
        ],
      },
      {
        id: 'final-check',
        heading: 'The five-minute final check',
        paragraphs: [
          'Confirm the table does not rock, hardware is tight, no fastener tip is exposed, all edges are comfortable to touch, and the finish has cured for the manufacturer’s stated period before regular use.',
        ],
      },
    ],
  }),
]

for (const guide of guides) {
  const related = guides
    .filter((candidate) => candidate.id !== guide.id && candidate.clusterId === guide.clusterId)
    .slice(0, 3)
    .map((candidate) => candidate.id)
  guide.relatedGuideIds = related
}

export const guideIndex: GuideIndexItem[] = guides.map((guide) => ({
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

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getGuideById(id: string) {
  return guides.find((guide) => guide.id === id)
}
