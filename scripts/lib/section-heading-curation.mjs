export const PLACEHOLDER_LEARN_HEADINGS = new Set([
  'Start with the useful answer',
  'Understand what changes the result',
  'Use a repeatable shop method',
  'Read the evidence left by the operation',
  'Troubleshoot from the first changed reference',
  'Practice the skill in a real project',
  'Where each method earns its place',
])

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const lowerFirst = (value) => `${value.charAt(0).toLowerCase()}${value.slice(1)}`
const upperFirst = (value) => `${value.charAt(0).toUpperCase()}${value.slice(1)}`

function subjectFor(title) {
  let subject = title
  if (/^how to\s+/i.test(subject)) subject = subject.replace(/^how to\s+/i, '')
  else subject = subject.replace(/^(?:build|make)\s+/i, '')
  return subject
    .replace(/^the beginner(?:’|')?s guide to\s+/i, '')
    .replace(/[.?!]+$/, '')
    .split(':')[0]
    .trim()
}

function removeEditorialScaffolding(value, title) {
  const subject = subjectFor(title).toLowerCase()
  const escapedSubject = escapeRegExp(subject)
  const prefixes = [
    new RegExp(`^For ${escapedSubject},\\s*`, 'i'),
    new RegExp(`^With ${escapedSubject},\\s*`, 'i'),
    new RegExp(`^In this guide to ${escapedSubject},\\s*`, 'i'),
    new RegExp(`^A sound approach to ${escapedSubject} starts here:\\s*`, 'i'),
    new RegExp(`^To keep ${escapedSubject} grounded in the work,\\s*`, 'i'),
    new RegExp(`^The shop-level test for ${escapedSubject} is practical:\\s*`, 'i'),
    new RegExp(`^Start ${escapedSubject} by\\s*`, 'i'),
    new RegExp(`^Treat ${escapedSubject} as a shop operation:\\s*`, 'i'),
  ]
  let text = value.trim().replace(/^(?:Check|Verify|Also check):\s*/i, '')
  for (const pattern of prefixes) text = text.replace(pattern, '')
  return text
    .replace(/^begin this work by\s*/i, 'Begin by ')
    .replace(/^begin this work with\s*/i, 'Begin with ')
    .replace(/^use the method on\s*/i, 'Use ')
}

function firstSentence(value) {
  const match = value.match(/^.*?[.!?](?=\s|$)/)
  return match?.[0] ?? value
}

function compactHeading(value, maximum = 168) {
  let heading = upperFirst(value.replace(/\s+/g, ' ').trim()).replace(/[.;:]$/, '')
  if (heading.length <= maximum) return heading

  const separators = [', and ', '; ', ' — ', ', then ', ', but ', ', before ', ' so ', ', ']
  const candidates = separators
    .map((separator) => heading.lastIndexOf(separator, maximum))
    .filter((index) => index >= 62)
  const cutAt = candidates.length ? Math.max(...candidates) : heading.lastIndexOf(' ', maximum)
  heading = heading.slice(0, cutAt > 0 ? cutAt : maximum)
    .replace(/[,:;—-]+$/, '')
    .replace(/\b(?:and|or|the|a|an|to|with|from|for|by|on|in|at|of|is|that|which|as|too)$/i, '')
    .trim()
  return heading
}

function headingSource(section) {
  if (section.id === 'what-matters') return section.bullets?.[0] ?? section.paragraphs?.[0]
  return section.paragraphs?.[0] ?? section.bullets?.[0]
}

function optionHeading(section) {
  const labels = (section.bullets ?? [])
    .map((bullet) => bullet.split(':')[0].trim())
    .filter(Boolean)
    .slice(0, 4)
  if (labels.length < 2) return 'Compare each method by its reference, setup burden, and failure mode'
  const options = labels.length === 2 ? labels.join(' and ') : `${labels.slice(0, -1).join(', ')}, and ${labels.at(-1)}`
  return compactHeading(`${options}: compare the reference, setup burden, and failure mode`)
}

function methodHeadings(guide) {
  const value = guide.title.toLowerCase()
  const special = {
    '010': {
      'what-matters': 'Impact noise, vibration paths, dust migration, and building quiet hours matter more than square footage',
      'working-method': 'Schedule short noisy steps, isolate vibration, and capture dust where it starts',
      'read-the-result': 'No transmitted vibration, clean shared spaces, and predictable stopping times are the real test',
      troubleshooting: 'When sound travels, isolate contact points and change the operation before adding foam',
      'next-project': 'Build one small hand-tool-led project and log the two loudest operations',
    },
    '041': {
      'what-matters': 'Veneer face, blade geometry, full-sheet support, cut direction, and scoring determine where fibers break',
      'working-method': 'Support both sides, orient the good face for the blade, and prove the cut on an offcut',
      'read-the-result': 'The first chipped fibers show whether support, tooth direction, or feed caused the failure',
      troubleshooting: 'Change one variable—blade, support, scoring, or feed—before recutting the sheet',
      'next-project': 'Break down one plywood panel with labeled test cuts at both grain directions',
    },
    '068': {
      'what-matters': 'Core quality, edge thickness, load direction, and visible edge treatment determine the plywood joint',
      'working-method': 'Choose a rabbet, dado, spline, cleat, or solid edge that leaves enough sound plies',
      'read-the-result': 'A dry joint should register square without crushing veneer or splitting thin plies',
      troubleshooting: 'If the edge swells, splits, or telegraphs fasteners, remake the joint instead of burying it',
      'next-project': 'Join two plywood offcuts at a corner and load the dry assembly by hand',
    },
    '149': {
      'what-matters': 'Hidden metal, dirty fibers, blade selection, support, and the salvage line control a reclaimed-lumber cut',
      'working-method': 'Scan for metal, mark the salvage boundary, support both sides, and cut outside the final dimension',
      'read-the-result': 'Changing sound, sparks, blade deflection, and vibration are reasons to stop immediately',
      troubleshooting: 'If the blade wanders or binds, restore support and inspect for metal before forcing the cut',
      'next-project': 'Free one clean blank from a reclaimed board, then mill it to a verified reference',
    },
    '150': {
      'what-matters': 'Pitch buildup, tooth damage, rust, and storage contact determine blade life',
      'working-method': 'Remove the blade, inspect every tooth, clean with a maker-safe solution, dry it, and protect the carbide',
      'read-the-result': 'A clean sound blade should cut without new burning, vibration, or chipped carbide',
      troubleshooting: 'If cutting stays poor after cleaning, inspect tooth damage, runout, alignment, feed, and stock',
      'next-project': 'Clean and label one blade, then compare its next cut with the pre-cleaning sample',
    },
    '187': {
      'what-matters': 'Stock flatness, grain, moisture, and reference sequence decide how much thickness survives milling',
      'working-method': 'Flatten one face, square one edge, plane to thickness, rip to width, and crosscut to length',
      'read-the-result': 'The board should rest without rocking and keep one square edge against its flattened face',
      troubleshooting: 'If stock moves after a pass, let it rest and reassess instead of chasing it thinner',
      'next-project': 'Mill one rough board, label each reference, and measure it again after it rests',
    },
    '274': {
      'what-matters': 'Power shutoff, fire response, first aid, exact location details, and clear exit access must remain obvious under stress',
      'working-method': 'Walk the shop, mark hazards and shutoffs, and place supplies along a clear exit route',
      'read-the-result': 'A visitor should find the exit, shutoff, extinguisher, first-aid kit, and phone without asking',
      troubleshooting: 'Remove blocked access, expired supplies, and ambiguous labels before adding another emergency item',
      'next-project': 'Run a two-minute emergency walkthrough with power off and record the first missed item',
    },
  }[guide.id]
  if (special) return special
  if (/garage shop heating|garage shop cooling/i.test(value)) return {
    'what-matters': 'Temperature, humidity, ventilation, wood moisture, and finish limits control whether the shop can work safely',
    'working-method': 'Condition the work zone first, then verify wood, finish, and machine limits before starting',
    'read-the-result': 'Condensation, slow cure, brittle fingers, and moving stock show that the environment is outside the workable range',
    troubleshooting: 'Correct temperature, humidity, and air exchange before changing the material or finish schedule',
    'next-project': 'Record temperature and humidity through one milling, glue, or finish session',
  }
  if (/safety|emergency|first-aid|first aid/i.test(value)) return {
    'what-matters': 'Stock control, guards, body position, exposure controls, and emergency access define a safe setup',
    'working-method': 'Identify the hazard, preserve the guard or control, and rehearse the stop before cutting',
    'read-the-result': 'A safe setup controls the stock, offcut, cutter path, body position, and exit',
    troubleshooting: 'Stop when control depends on defeating a guard or improvising around unstable support',
    'next-project': 'Walk through the checklist on one real setup before the machine is energized',
  }
  if (/sandpaper|\bsand(?:ing)?\b|abrasive|grit|card scraper/i.test(value)) return {
    'what-matters': 'Defect depth, grit sequence, pressure, extraction, and raking light control the surface',
    'working-method': 'Remove the defect with the lightest effective grit sequence',
    'read-the-result': 'Uniform scratches and a clean crosshatch show when each grit is finished',
    troubleshooting: 'Pigtails and surviving scratches point to debris, worn abrasive, or a skipped grit',
    'next-project': 'Compare two labeled grit sequences on matching scrap',
  }
  if (/finish|stain|polyurethane|oil|shellac|lacquer|dye|paint|spray|epoxy|glue|adhesive/i.test(value)) return {
    'what-matters': 'Surface preparation, compatibility, coat thickness, temperature, and full cure control the result',
    'working-method': 'Prove the complete finish or adhesive schedule on matching offcuts',
    'read-the-result': 'Judge color, adhesion, and cure under the light and exposure the project will face',
    troubleshooting: 'Stop adding material while contamination, timing, or compatibility is unresolved',
    'next-project': 'Finish a small tray, box, or shelf and keep the labeled sample',
  }
  if (/\bjoint(?:s)?\b|\bjoinery\b|dovetail|mortise|tenon|dado|rabbet|groove|spline|dowel|biscuit|domino|half-lap|pocket hole/i.test(value)) return {
    'what-matters': 'Load direction, grain orientation, shoulders, and registration determine whether the joint works',
    'working-method': 'Mill one reference face, cut a matching-scrap joint, and preserve the accepted setup',
    'read-the-result': 'Shoulders, cheeks, and registration faces reveal different fit errors',
    troubleshooting: 'Mark the high spot; never hide a loose structural fit with extra glue',
    'next-project': 'Cut four matching corners in a small frame or box',
  }
  if (/table saw|miter saw|circular saw|track saw|bandsaw|jigsaw|scroll saw|router|jointer|planer|drill press|drill a|lathe|cnc|sander|power tool|reciprocating saw/i.test(value)) return {
    'what-matters': 'Stock support, cutter condition, alignment, feed, and guarding determine the cut',
    'working-method': 'Set up with power disconnected, then rehearse support, feed, and hand position',
    'read-the-result': 'Taper, burning, tearout, chatter, and breakout identify different setup faults',
    troubleshooting: 'Restore the baseline before changing cutter, alignment, support, or feed',
    'next-project': 'Repeat one accepted setup across a small batch and compare the first part with the last',
  }
  if (/sharpen|hone|grind|chisel|hand plane|handsaw|hand saw|spokeshave|drawknife|brace and bit|rasp|file|surform/i.test(value)) return {
    'what-matters': 'Edge geometry, sharpness, workholding, grain direction, and body position control the cut',
    'working-method': 'Secure the work, repair the reference surface, and test the edge with the shortest controlled cut',
    'read-the-result': 'Force, chatter, crushed fibers, and a drifting cut reveal what the edge needs',
    troubleshooting: 'Return to the flat stone, straight plate, clean sole, or secure workpiece first',
    'next-project': 'Practice the cut on a small hook, frame, or box with visible reference lines',
  }
  if (/measure|layout|square|cut list|diagram|plan|kerf|story stick|template|angle|board.?foot|estimate|scale|marking|center on/i.test(value)) return {
    'what-matters': 'Reference edges, tool accuracy, kerf, and accumulated dimensions control the layout',
    'working-method': 'Choose one reference, solve one part completely, and transfer repeated dimensions',
    'read-the-result': 'Flip tests, stacked parts, and matching diagonals expose layout error',
    troubleshooting: 'Trace the error back through units, zero points, kerf, and accumulated dimensions',
    'next-project': 'Lay out a five-part box from one story stick and compare the dry-fit diagonals',
  }
  if (/lumber|straight boards|wood species|grain|moisture|plywood|mdf|particleboard|veneer|hardwood|softwood|oak|maple|walnut|poplar|pine|cedar|movement|tabletop|rough board|reclaimed/i.test(value)) return {
    'what-matters': 'Moisture, grain, defects, flatness, and milling sequence determine usable yield',
    'working-method': 'Map the cut list onto the actual stock before milling a representative part',
    'read-the-result': 'Movement after the first cut reveals stress, moisture difference, and changing grain',
    troubleshooting: 'If the stock moves, stop milling and reassess the usable dimensions',
    'next-project': 'Map one board around its defects and compare predicted yield with the milled parts',
  }
  if (/apartment|garage|woodshop|workshop|shop space|shop flow|inventory|electrical|lighting|heating|cooling|ventilation|emergency|safety checklist|dust collection|dust collector|respirator/i.test(value)) return {
    'what-matters': 'Material flow, operating clearances, lighting, dust, power, and storage define workable space',
    'working-method': 'Map material travel, operating clearances, utilities, and the return-to-storage path',
    'read-the-result': 'A workable shop preserves infeed, outfeed, exits, visibility, and cleanup access',
    troubleshooting: 'Move the workflow bottleneck before adding another machine or storage system',
    'next-project': 'Rehearse one complete project cycle from lumber entry through cleanup',
  }
  if (/cabinet|drawer|built-in|shel(?:f|ves)|hardware|hinge|alcove|crooked wall/i.test(value)) return {
    'what-matters': 'Case squareness, hardware drawings, installed openings, and reveals control the fit',
    'working-method': 'Square the case first, then fit hardware and scribes to the installed opening',
    'read-the-result': 'Diagonals, reveals, and full hardware travel expose where the case is wrong',
    troubleshooting: 'Correct the box or installation before trimming every door, drawer, or scribe',
    'next-project': 'Dry-fit one small cabinet or frame and record the shims and reveal',
  }
  if (/absolute beginner|first safe weekend|practice woodworking|practice plan|mistakes that waste|first five|real cost/i.test(value)) return {
    'what-matters': 'Workholding, one reference, safe setup, and a small part count keep the first build under control',
    'working-method': 'Mark one reference, practice in scrap, and dry-fit before glue',
    'read-the-result': 'Square parts, clean holes, and a stable dry fit show that the sequence worked',
    troubleshooting: 'Return to the last verified reference instead of correcting several parts at once',
    'next-project': 'Finish one small project with fewer than twelve parts',
  }
  if (/workbench|bench-dog|shop-made jig/i.test(value)) return {
    'what-matters': 'Height, overhang, workholding, dog-hole paths, and racking resistance define a useful bench',
    'working-method': 'Set height, overhang, workholding, and dog-hole paths from the operations the bench must support',
    'read-the-result': 'Racking under planing force and blocked clamp access reveal a poor bench layout',
    troubleshooting: 'Correct the base, floor contact, or workholding path before adding mass',
    'next-project': 'Mock up the bench height and clamp access before drilling the first dog hole',
  }
  return {
    'what-matters': 'Stock condition, reference choice, support, and the first measurable check control the result',
    'working-method': 'Define the measurable result, prove the uncertain step in scrap, and preserve one reference',
    'read-the-result': 'Inspect the first departure from the drawing, fit, surface, or load path',
    troubleshooting: 'Restore the last known-good reference and change one variable at a time',
    'next-project': 'Use the method on one small project where the result stays visible and measurable',
  }
}

function substantiveHeading(guide, section) {
  const answerOverrides = {
    '010': 'Keep apartment woodworking quieter with hand-tool-first operations, short daytime sessions, vibration isolation, and contained cleanup',
    '030': 'Use one story stick to transfer every repeated dimension from the same physical reference',
    '041': 'Prevent veneer chipping by fully supporting the sheet, using a clean-cut blade, and protecting the visible face',
    '052': 'Use pocket holes when speed and hidden mechanical fastening matter—not when screw direction, movement, or appearance works against the joint',
    '068': 'Join plywood edges with geometry or solid edging that carries the load through sound plies—not screws hidden in a thin edge',
    '149': 'Use a reciprocating saw for dirty demolition cuts and hidden fasteners—not accurate furniture sizing',
    '150': 'Clean pitch before it creates heat, dry the blade completely, protect the teeth, and keep carbide away from metal in storage',
    '187': 'Mill rough lumber in order: flatten one face, square one edge, plane the opposite face, rip to width, then crosscut to length',
    '201': 'Set bench height from the primary work, then verify overhang, clamp access, and vise clearance',
    '269': 'Heat the shop for safe hands and stable materials—not just a comfortable air temperature',
    '270': 'Control heat and fumes together by pairing exhaust with deliberate make-up air',
    '274': 'Keep the shutoff, extinguisher, first-aid kit, phone, and exit reachable under stress',
    '275': 'Before every cut, confirm the guard, stock support, offcut path, hand position, and stop plan',
    '330': 'Keep a tabletop flat by controlling moisture, milling sequence, panel construction, and attachment',
    '331': 'Fix the tabletop at one reference point and let both sides move across the grain',
  }
  if (section.id === 'answer-first' && answerOverrides[guide.id]) return answerOverrides[guide.id]
  if (section.id === 'option-by-option') return optionHeading(section)
  const profiledHeading = methodHeadings(guide)[section.id]
  if (profiledHeading) return profiledHeading
  const source = headingSource(section)
  if (!source) return `${subjectFor(guide.title)}: the shop checks that decide the result`
  const core = compactHeading(firstSentence(removeEditorialScaffolding(source, guide.title)))
  return core
}

export function curateLearnSectionHeadings(guides) {
  let replacedHeadings = 0
  let affectedGuides = 0
  const replacedKeys = new Set()
  const curated = guides.map((guide) => {
    let guideChanged = false
    const sections = (guide.sections ?? []).map((section) => {
      if (!PLACEHOLDER_LEARN_HEADINGS.has(section.heading)) return section
      guideChanged = true
      replacedHeadings += 1
      replacedKeys.add(`${guide.id}:${section.id}`)
      return { ...section, heading: substantiveHeading(guide, section) }
    })
    if (guideChanged) affectedGuides += 1
    return guideChanged ? { ...guide, sections } : guide
  })

  const headingOwners = new Map()
  for (const guide of curated) {
    for (const section of guide.sections ?? []) {
      const owners = headingOwners.get(section.heading) ?? []
      owners.push({ guide, section, replaced: replacedKeys.has(`${guide.id}:${section.id}`) })
      headingOwners.set(section.heading, owners)
    }
  }

  const repeatedCuratedHeadings = new Set(
    [...headingOwners]
      .filter(([, owners]) => owners.length > 1 && owners.some(({ replaced }) => replaced))
      .map(([heading]) => heading),
  )

  let disambiguatedHeadings = 0
  const disambiguated = curated.map((guide) => ({
    ...guide,
    sections: (guide.sections ?? []).map((section) => {
      if (!repeatedCuratedHeadings.has(section.heading) || !replacedKeys.has(`${guide.id}:${section.id}`)) return section
      disambiguatedHeadings += 1
      return { ...section, heading: compactHeading(`${subjectFor(guide.title)}: ${lowerFirst(section.heading)}`, 240) }
    }),
  }))

  return {
    guides: disambiguated,
    report: { affectedGuides, replacedHeadings, disambiguatedHeadings },
  }
}
