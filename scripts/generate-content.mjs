import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { upgradeGuideCorpus } from './lib/content-quality.mjs'

const blueprintPath = resolve('PROJECT_BLUEPRINT.md')
const outputPath = resolve('content/guides.json')
const limitArg = process.argv.find((argument) => argument.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) : 500
const blueprint = await readFile(blueprintPath, 'utf8')

const profiles = {
  A: { focus: 'safe sequencing, a minimal tool path, and a first success that teaches transferable control', variables: 'available space, tool access, stock straightness, and the learner’s ability to hold the work securely', failure: 'buying ahead of the project or rushing past a practice cut', proof: 'a practice result, a completed checklist, and a short note about what changed between the first and final attempt', safety: 'Keep the first operation simple, clamp the work, and follow the exact tool manual before powering any machine.' },
  B: { focus: 'one reliable reference face or edge, clear marks, and a cut plan that prevents accumulated error', variables: 'kerf, measuring reference, grain direction, stock defects, and whether repeated parts share one setup', failure: 'measuring every part independently and allowing tiny differences to compound', proof: 'matching repeated parts, equal diagonals, and a measured offcut that confirms the setup before valuable stock is cut', safety: 'Support the full workpiece, keep layout tools away from moving cutters, and stop the machine before checking a measurement.' },
  C: { focus: 'joint fit, long-grain glue area, load direction, and seasonal wood movement', variables: 'grain orientation, moisture, shoulder accuracy, adhesive open time, and clamping direction', failure: 'using clamp pressure to disguise a poor fit or preventing a solid-wood panel from moving', proof: 'a dry-fit that closes by hand, square assemblies, and a sample joint cut from the same stock', safety: 'Dry-fit before glue, control small parts with a jig or clamp, and keep hands out of the cutter path.' },
  D: { focus: 'sharp edges, body position, reference surfaces, and feedback from the shaving or cut', variables: 'grain direction, edge condition, bevel geometry, workholding, and the amount removed per pass', failure: 'forcing a dull edge or chasing a layout line without stable workholding', proof: 'consistent shavings or saw kerfs, a flat reference surface, and a tool edge inspected under direct light', safety: 'Secure the work, keep both hands behind cutting edges when the operation allows, and cover or store sharp tools immediately after use.' },
  E: { focus: 'table-saw reference control, stock stability, guarded cutting, and a planned hand path', variables: 'blade type, fence or miter reference, riving-knife alignment, stock flatness, and infeed/outfeed support', failure: 'trapping an offcut, losing fence contact, or standing in the likely kickback line', proof: 'an unplugged alignment check, a scrap test cut, and a finished piece that stays consistent end to end', safety: 'Use the guard and riving knife, plan the complete feed path, use push tools, and follow the manual for the exact saw.' },
  F: { focus: 'full stock support, the right blade, a visible cut line, and a guide that cannot shift', variables: 'blade tooth geometry, base or table alignment, workpiece support, splinter direction, and offcut control', failure: 'letting the offcut close on the blade or beginning a cut before the work is stable', proof: 'a square scrap cut, a clean show face, and a guide measurement checked at both ends', safety: 'Clamp the work and guide, support both sides appropriately, and wait for the blade to stop before setting the saw down or reaching near the cut.' },
  G: { focus: 'router support, bit selection, controlled depth, feed direction, and chip evacuation', variables: 'bit diameter, cut depth, grain direction, router speed, collet engagement, and template stability', failure: 'taking a full-depth pass or letting too little base remain supported', proof: 'a test profile in matching scrap, a clean exit edge, and a depth setting recorded for the repeat pass', safety: 'Disconnect power for bit changes, seat the bit correctly, make shallow passes, and avoid climb cutting unless a documented operation specifically requires controlled use.' },
  H: { focus: 'flat reference surfaces, machine setup, grain reading, and a milling sequence that preserves thickness', variables: 'cup, bow, twist, moisture, cutter condition, stock length, and infeed/outfeed support', failure: 'asking a planer to remove twist without a stable reference or milling to final size before the wood rests', proof: 'winding-stick checks, consistent thickness measurements, and faces that register without rocking', safety: 'Stay above machine minimum stock dimensions, use guards and push blocks, and support long stock without pulling it through the cutter.' },
  I: { focus: 'rigid workholding, flat assembly surfaces, repeatable stops, and jigs that fail safely', variables: 'clamping force, fastener location, jig wear, reference edges, and cutter clearance', failure: 'building a jig around an inaccurate first part or placing hardware in the cutter path', proof: 'a measured test part, repeat results, and an inspection showing that all fasteners clear the blade or bit', safety: 'Mark cutter paths on every jig, use guards where compatible, and retire a jig when slots, runners, or clamps become loose.' },
  J: { focus: 'material flow, access, stable storage, load paths, and reclaiming shared space after work', variables: 'door and vehicle clearance, infeed length, floor level, wall structure, machine footprint, and mobile-base stability', failure: 'optimizing a floor plan for machines instead of the stock’s full travel path', proof: 'a scaled layout, a cardboard or tape mockup, and an unobstructed route from lumber storage to assembly', safety: 'Anchor tall storage, respect rated loads, lock mobile bases before use, and verify wall or ceiling structure before mounting.' },
  K: { focus: 'risk reduction through source control, ventilation, protective equipment, and qualified review where required', variables: 'dust size, airflow, filter rating, noise exposure, electrical load, ignition sources, and manufacturer clearances', failure: 'treating a vacuum, respirator, filter, or extension cord as universally suitable', proof: 'manufacturer documentation, an inspected setup, and measurements from appropriate instruments when claims depend on performance', safety: 'Use current manufacturer and official safety guidance; electrical, structural, and hazardous-air decisions may require a qualified professional.' },
  L: { focus: 'a deliberate surface-preparation schedule, compatibility testing, thin controlled coats, and a labeled sample board', variables: 'wood species, previous coating, abrasive pattern, temperature, humidity, open time, cure time, and ventilation', failure: 'changing several variables at once or judging a finish before it has cured', proof: 'a same-board sample, raking-light inspection, recorded coat times, and a cured surface tested in the intended conditions', safety: 'Read the product label and safety data, control ignition and ventilation, wear specified PPE, and store or dispose of oily materials in an approved manner.' },
  M: { focus: 'useful proportions, anti-racking structure, touch-friendly edges, and hardware or joinery that permits maintenance', variables: 'room scale, load, cable or media access, solid-wood movement, floor level, and the path through doorways', failure: 'designing the finished piece before checking how it will move into the room or how the top can move seasonally', proof: 'full-size critical measurements, equal case diagonals, a rock-free base, and a finish sample viewed in the room light', safety: 'Support large panels and assemblies, verify wall attachment and tip resistance, and round or ease exposed touch edges.' },
  N: { focus: 'human scale, stable bases, seasonal top movement, and joinery that carries repeated sitting or dining loads', variables: 'seat height, knee clearance, top overhang, racking force, floor variation, and fastening across grain', failure: 'locking a wide solid-wood top to a rigid base or treating a seating joint like decorative casework', proof: 'a full-size mockup, diagonal measurements, progressive load checks, and movement-friendly tabletop fasteners', safety: 'Use conservative joinery for seating, inspect for cracks and looseness, and do not put a new piece into service before glue and finish have fully cured.' },
  O: { focus: 'repeatable cases, square drawer openings, reliable hardware reveals, and furniture that can be moved or anchored', variables: 'mattress or equipment dimensions, wall clearance, drawer-slide specification, cable access, and tip-over risk', failure: 'building from nominal sizes or installing hardware before the case is square', proof: 'measured diagonals, consistent reveals, full-extension checks, and wall anchoring where tip risk exists', safety: 'Anchor tall furniture, use rated bed and wall hardware, and control large sheet goods with adequate support and help.' },
  P: { focus: 'square cabinet boxes, consistent reveals, wall scribing, moisture details, and hardware installed to its actual specification', variables: 'opening dimensions, wall plumb, appliance clearance, hinge overlay, slide setback, plumbing, and humidity', failure: 'assuming a wall or opening is square or sizing a door from a catalog description instead of the installed case', proof: 'a measured opening map, dry-fitted hardware, matched reveals, and attachment into verified structure', safety: 'Locate utilities before drilling, use rated cabinet fasteners, and involve qualified trades for plumbing, electrical, or structural changes.' },
  Q: { focus: 'drainage, weather exposure, corrosion-resistant hardware, ground clearance, and maintainable outdoor finishes', variables: 'sun, standing water, soil contact, local climate, wood durability, fastener material, and seasonal movement', failure: 'creating water traps or sealing only the visible faces', proof: 'drain paths, eased edges, protected end grain, compatible hardware, and a dated exposure sample', safety: 'Verify structural loads, hanging points, permits, and clearances; use exterior-rated materials and follow finish and fastener instructions.' },
  R: { focus: 'small-part control, gift-worthy surface quality, safe edges, repeatable batch setups, and the recipient’s actual use', variables: 'part size, grain weakness, food or child contact, hardware clearance, finish cure, and packaging', failure: 'machining a part too small to hold safely or choosing a finish without checking the use case', proof: 'a full-size prototype, a small-part holding jig, eased edges, and a cured finish inspected under direct light', safety: 'Use a carrier or jig for small parts, avoid freehand cuts near a blade or bit, and verify finish and hardware suitability for children, pets, or food contact.' },
  S: { focus: 'species and sheet-good behavior, moisture, defect reading, compatible repair methods, and honest material substitution', variables: 'grain orientation, cut, density, moisture, veneer thickness, adhesive compatibility, and the cause of the defect', failure: 'treating a symptom before identifying whether movement, load, moisture, or a failed joint caused it', proof: 'moisture and flatness checks, a hidden-area test, and a repair that survives a complete seasonal or use cycle where possible', safety: 'Check reclaimed stock for metal and contamination, control fine dust, and follow adhesive or finish safety instructions.' },
  T: { focus: 'a specific buyer decision, comparable test conditions, total ownership cost, and scenario-based conclusions', variables: 'current model, capacity, accuracy, dust, vibration, ergonomics, service, required accessories, consumable cost, and shop infrastructure', failure: 'declaring one universal winner from copied specifications or a single unrepeatable cut', proof: 'dated model identification, repeated tests on comparable material, raw observations, limitations, and a clear reason each buyer should choose or skip the product', safety: 'Use every product within its manual, compare safety features without staging dangerous tests, and monitor recalls or manufacturer notices.' },
}

const clusters = []
let currentCluster = null
for (const line of blueprint.split(/\r?\n/)) {
  const heading = line.match(/^### Cluster ([A-T]) — (.+?) \(\d{3}–\d{3}\)$/)
  if (heading) {
    currentCluster = { letter: heading[1], name: heading[2] }
    clusters.push(currentCluster)
    continue
  }
  const item = line.match(/^(\d{3})\. \*\*(.+?)\*\* — (Learn|Build|Buy) → (.+?)\.$/)
  if (item && currentCluster) {
    currentCluster.items ??= []
    currentCluster.items.push({ id: item[1], title: item[2], intentLabel: item[3], offers: item[4] })
  }
}

const allItems = clusters.flatMap((cluster) => (cluster.items ?? []).map((item) => ({ ...item, cluster })))
if (allItems.length !== 500) throw new Error(`Expected 500 blueprint items; found ${allItems.length}.`)

const slugify = (value) => value.normalize('NFKD').replace(/[’']/g, '').replace(/&/g, ' and ').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 110).replace(/-$/g, '')
const titleSubject = (title) => title.replace(/^(How to|Build|Make|Best|The Beginner’s Guide to|The Beginner's Guide to|The|A)\s+/i, '').replace(/\?$/, '')
const sentence = (value) => value.charAt(0).toUpperCase() + value.slice(1).replace(/[?.!]+$/, '') + '.'
const date = '2026-08-25T00:00:00.000Z'

function inferType(title, intent, letter) {
  if (intent === 'build') return 'project'
  if (/repair|fix|avoid|prevent|reduce|remove|without gaps|without chipping|without tearout|without burning|doesn.t rack/i.test(title)) return 'troubleshooting'
  if (intent === 'buy' || /\b(vs\.?|versus|compared|comparison|showdown|buying guide|which should|best\b)/i.test(title)) return 'comparison'
  if (['J', 'K'].includes(letter)) return 'shop'
  if (['L', 'S'].includes(letter)) return 'material'
  return 'skill'
}

function canonicalSection(type) {
  if (type === 'project') return 'projects'
  if (type === 'shop') return 'shop'
  if (type === 'material') return 'materials'
  if (['comparison', 'review'].includes(type)) return 'tools'
  return 'skills'
}

function costBand(title, offers) {
  if (/CNC|cabinet table saw|jointer|dust collector|lathe|planer|full-size|pergola|built-in|bed|dresser|kitchen island/i.test(`${title} ${offers}`)) return 4
  if (/table saw|miter saw|track saw|bandsaw|router table|drill press|workbench|dining table|vanity/i.test(`${title} ${offers}`)) return 3
  if (/router|sander|circular saw|jigsaw|hardware|finish|clamp/i.test(`${title} ${offers}`)) return 2
  return 1
}

function timing(title, intent) {
  if (intent !== 'build') return {}
  if (/ornament|stand|tray|block|mallet|rack|holder|jig|box|board|shelf|stool/i.test(title)) return { activeMinutes: 180, totalMinutes: 360 }
  if (/cabinet|bed|dresser|table|sectional|built-in|pergola|vanity|wardrobe/i.test(title)) return { activeMinutes: 720, totalMinutes: 1440 }
  return { activeMinutes: 420, totalMinutes: 840 }
}

function toolList(intent, offers) {
  const candidates = offers.split(/,|;/).map((value) => value.trim()).filter(Boolean).filter((value) => !/review|source|caveat|warning|test data|method|course|plan bundle|qualified|download/i.test(value))
  const inferred = candidates.slice(0, 6).map((name) => ({ name: sentence(name).slice(0, -1), required: false, purpose: 'A convenience or quality upgrade to evaluate against the minimum-tool route' }))
  if (intent !== 'build') return inferred
  return [
    { name: 'Verified measuring and marking kit', required: true, purpose: 'Establish reference faces, square lines, and repeat dimensions' },
    { name: 'Stable workholding', required: true, purpose: 'Keep the work controlled through layout, cutting, drilling, and assembly' },
    { name: 'Project-appropriate cutting method', required: true, purpose: 'Cut parts with adequate support and guarding', substitute: 'Use a hand-tool or lumberyard cutting route when the plan permits' },
    ...inferred,
  ]
}

function materialList(intent, letter) {
  if (intent !== 'build') return []
  const materials = [
    { name: 'Project stock', quantity: 'Per verified cut list', notes: 'Buy only after checking actual dimensions, defects, grain, and moisture' },
    { name: 'Compatible fasteners or joinery supplies', quantity: 'Per verified plan', notes: 'Confirm length, corrosion resistance, and movement allowance' },
    { name: 'Adhesive and finish', quantity: 'Per manufacturer coverage', notes: 'Test the full schedule on matching scrap' },
  ]
  if (letter === 'Q') materials.push({ name: 'Exterior-rated hardware and materials', quantity: 'As required', notes: 'Match exposure, structure, and local conditions' })
  return materials
}

function buildSections(subject, profile, offers) {
  return [
    { id: 'design-brief', heading: 'Define the finished job before buying material', paragraphs: [`A successful ${subject.toLowerCase()} starts with the place and job it must serve. Record the available footprint, expected load, clearances, touch points, and the route the finished piece must take into position. The design priority for this project is ${profile.focus}. Those constraints decide dimensions and joinery before a tool list does.`, `Draw the front, side, and top views, then mark every part that carries load or controls square. Make a full-size mockup of any human-fit, hardware, or wall interface. Keep ${profile.variables} visible on the drawing so a cosmetic choice cannot quietly undermine the structure or the build sequence.`] },
    { id: 'material-plan', heading: 'Turn the sketch into a material and cut plan', paragraphs: [`Build the cut list from finished dimensions and add the milling allowance that your stock actually needs. Select the longest, widest, most visible, or most structurally important parts first; shorter parts can come from the remaining clear areas. Label each part and its reference face before cutting, and include a realistic waste allowance rather than forcing a defective area into the project.`, `Treat ${offers.toLowerCase()} as possible helpers, not automatic requirements. Separate the minimum tool path from speed or convenience upgrades. Price blades, bits, abrasives, glue, finish, hardware, adapters, and workholding with the main tool so the plan reflects the usable system rather than the box price.`] },
    { id: 'safe-setup', heading: 'Prove the setup on scrap', paragraphs: [`Arrange support for the entire workpiece and its offcut, then mark the cutter path and the planned position of both hands. Check guards, fences, guides, clamps, stops, and dust collection with power disconnected. Make the critical setup in scrap from the same material thickness before committing a finished part.`, `${profile.safety} The test piece should confirm the dimension, fit, show-face quality, and safe feed path. If the operation requires improvising around a guard, balancing stock, reaching over a cutter, or holding a part too small for control, stop and choose a carrier, jig, hand-tool method, or different machine.`] },
    { id: 'build-sequence', heading: 'Build from references, not from accumulated measurements', paragraphs: [`Create one reliable reference face or edge and make related parts from the same setup whenever possible. Cut repeated pieces against a stop after verifying the first piece. Dry-assemble the major subassemblies, compare diagonals, and inspect contact at every joint before opening the glue bottle.`, `The predictable failure here is ${profile.failure}. Do not use screws or clamp pressure to pull an inaccurate assembly into submission. Correct the reference, recut a replaceable part, or change the joint while the project is still dry. Record the setup that produced the correct piece so a replacement does not require guesswork.`] },
    { id: 'assembly-finish', heading: 'Assemble in a controlled order and test the finish', paragraphs: [`Choose an assembly order that gives clamps direct access and lets you measure square before the adhesive sets. Rehearse the sequence, lay out every clamp and caul, protect visible faces, and use only enough pressure to close sound joints. Allow solid wood to move across its grain at wide tops, panels, shelves, and outdoor details.`, `Prepare a finish sample on an offcut that went through the same sanding schedule. Judge color, clarity, raised grain, and sheen only after the stated cure time. Follow the product label for temperature, ventilation, protective equipment, ignition control, and disposal. Ease touch edges without erasing deliberate joinery or changing hardware fit.`] },
    { id: 'quality-gate', heading: 'Run the final quality and safety gate', paragraphs: [`Before use, verify ${profile.proof}. Check for rocking, racking, sharp edges, exposed fastener points, trapped cords, pinching hardware, loose parts, and finish that has not cured. For anything mounted, suspended, climbed, sat on, or structurally loaded, verify the attachment and load path with the appropriate qualified guidance.`, `Photograph the finished piece, the critical joints, the attachment method, and one imperfection worth learning from. Record final dimensions, material used, active time, total elapsed time, and the change you would make on version two. Those notes turn this ${subject.toLowerCase()} from a one-off object into a reliable guide.`] },
  ]
}

function learnSections(subject, profile, offers) {
  return [
    { id: 'outcome', heading: 'Define the result, not just the motion', paragraphs: [`The useful goal of ${subject.toLowerCase()} is a result you can inspect and repeat. Begin by describing the finished surface, fit, dimension, or decision in observable terms. For this topic, keep attention on ${profile.focus}. Speed is only useful after the reference and success check are reliable.`, `Write down the starting condition and the allowed change. Include ${profile.variables}. That turns a vague technique into a controlled operation and makes it easier to identify whether the tool, setup, material, or sequence caused the result.`] },
    { id: 'minimum-kit', heading: 'Use the minimum kit that gives control', paragraphs: [`A minimum setup needs accurate layout, stable workholding, and a way to inspect the result. Possible upgrades such as ${offers.toLowerCase()} should solve a specific capacity, repeatability, safety, or surface-quality problem. Do not add a machine merely because it appears in someone else’s workflow.`, `Inspect the measuring references and cutting edges before practice. Confirm that accessories fit the exact tool or material, and reserve budget for the blade, bit, abrasive, adapter, or guide that performs the work. A less-expensive tool with a sound reference often outperforms a premium tool used in an unstable setup.`] },
    { id: 'practice', heading: 'Practice one variable at a time', paragraphs: [`Use scrap that matches the project species, thickness, and grain orientation. Make a baseline attempt, label it, then change only one variable—depth, feed, grit, pressure, angle, support, or cutter condition. Keep samples in order so the comparison remains visible after the operation.`, `${profile.safety} Plan where both hands and the offcut will finish before starting. If the operation cannot be rehearsed slowly and described clearly, get hands-on instruction or use a lower-risk method before working on the project part.`] },
    { id: 'method', heading: 'Work from a stable reference', paragraphs: [`Establish the face, edge, line, fence, guide, or story stick that controls the result. Register every related operation from that same reference and inspect after each irreversible step. Repeated parts should share one verified setup rather than being measured independently.`, `Aim for ${profile.proof}. Stop while the result is still correct; extra passes made from habit often introduce the very error the setup was meant to prevent. Record the successful setting in a shop note, on the jig, or on a labeled sample.`] },
    { id: 'troubleshoot', heading: 'Diagnose the first visible failure', paragraphs: [`The common trap is ${profile.failure}. When the result drifts, stop and identify the first point where the reference changed. Check stock stability, sharpness, alignment, support, grain, and measurement before changing several settings at once.`, `Make one corrective test in scrap. If the new result improves, repeat it to prove the change was not luck. If it does not, return to the baseline and investigate the next variable. This approach costs less material than compensating with pressure, filler, extra sanding, or an increasingly complex jig.`] },
    { id: 'next-step', heading: 'Carry the skill into a real project', paragraphs: [`Choose a small build or repair where ${subject.toLowerCase()} affects one visible result but does not control the safety of the whole project. Complete it with the minimum route, then decide whether a tool upgrade would save meaningful time or improve repeatability on the next three planned builds.`, `Keep the labeled practice pieces and add the date, material, tool, and setting. A small physical reference library becomes more useful than a generic chart because it captures the way your tools, stock, and finish behave in your shop.`] },
  ]
}

function buySections(subject, profile, offers) {
  return [
    { id: 'decision', heading: 'Name the buyer decision precisely', paragraphs: [`The question behind ${subject.toLowerCase()} is not which product has the longest specification list. It is which option removes a repeated constraint in a particular shop and project mix. This comparison centers ${profile.focus}. Define the material, capacity, accuracy, footprint, power, dust, and budget limits before building a shortlist.`, `Write a disqualifier list first. A product that cannot fit the space, run on available power, collect dust acceptably, support the required stock, or accept available consumables does not return to the list because it is discounted. Include the perfectly valid option of keeping the current method or outsourcing the rare operation.`] },
    { id: 'shortlist', heading: 'Build a comparable shortlist', paragraphs: [`Confirm current model numbers and distinguish a base tool from bundles that add batteries, stands, rails, fences, bases, or cutters. The natural offer set for this decision may include ${offers.toLowerCase()}, but every item must be tied to a real use case. Record manufacturer-stated limits and verify whether required accessories are included.`, `Separate facts from observations. Capacity, voltage, dimensions, warranty terms, and included components should come from current primary documentation. Control quality, vibration, dust behavior, setup clarity, and ergonomics require a documented test or transparently labeled user experience.`] },
    { id: 'test-plan', heading: 'Compare the work, not the showroom', paragraphs: [`Use comparable material, consumables, settings, and repetitions. Inspect calibration time, the first acceptable result, repeatability, surface quality, dust left at the source, adjustment drift, and the body position required throughout the operation. Record limitations instead of converting a short trial into a universal conclusion.`, `${profile.safety} The evidence target is ${profile.proof}. Do not stage a jam, defeat a guard, exceed a rated capacity, or imitate a safety-system demonstration. A test should show ordinary ownership and project performance, not create a spectacle.`] },
    { id: 'ownership-cost', heading: 'Calculate the usable first-year system', paragraphs: [`Add the required blade or bit, batteries and chargers, stand or mobile base, rails and connectors, dust adapters, hoses, collets, fences, maintenance parts, and recurring consumables. Consider whether the shop needs a circuit, floor space, infeed clearance, storage, or a different collector before the tool can do its promised work.`, `Estimate how often the operation appears in planned projects and how much time the upgrade actually saves. A high fixed cost makes sense when repeat use, safer control, or new capability pays it back. For occasional work, surfaced lumber, a rental, a shared shop, or a well-made jig can be the better investment.`] },
    { id: 'fit', heading: 'Choose by scenario and name who should skip it', paragraphs: [`Recommend an option for each distinct buyer: the beginner protecting budget and space, the weekend furniture maker seeking repeatability, the small-shop owner solving a footprint problem, and the high-throughput user who can support the infrastructure. Explain the tradeoff attached to every gain.`, `The common analytical failure is ${profile.failure}. A winner without a clear buyer is an advertisement, not guidance. State when the least expensive option is sufficient and when neither option changes the reader’s work enough to justify a purchase.`] },
    { id: 'verdict', heading: 'Publish a dated, reversible verdict', paragraphs: [`Summarize the decision as “choose this if,” “choose that if,” and “skip both if.” Attach the test or research date, exact model, material, accessories, and conditions. Link warranty, safety, and recall information to current primary sources and identify any evidence that remains incomplete.`, `Set a review trigger for model changes, recalls, discontinued consumables, major price-class shifts, or recurring reader reports. The verdict should change when the evidence changes; an old affiliate link is never a reason to preserve outdated advice.`] },
  ]
}

const entries = allItems.slice(0, limit).map(({ id, title, intentLabel, offers, cluster }) => {
  const intent = intentLabel.toLowerCase()
  const type = inferType(title, intent, cluster.letter)
  const slug = slugify(title)
  const subject = titleSubject(title)
  const profile = profiles[cluster.letter]
  const sections = intent === 'build' ? buildSections(subject, profile, offers) : intent === 'buy' ? buySections(subject, profile, offers) : learnSections(subject, profile, offers)
  const descriptionLead = intent === 'build' ? 'Plan and build' : intent === 'buy' ? 'Compare and choose' : 'Learn'
  const metaDescription = `${descriptionLead} ${subject.toLowerCase()} with a clear setup, safety checks, common-failure fixes, and an honest minimum-tool path.`.slice(0, 160)
  const skillLevel = /advanced|dovetail|Windsor|bent|CNC|spray|mortise|Roubo|Nicholson|barrister|cabinet table saw/i.test(title) ? 'advanced' : /beginner|first|simple|basics|starter|absolute/i.test(title) ? 'beginner' : 'intermediate'
  return {
    id,
    slug,
    canonicalPath: `/${canonicalSection(type)}/${slug}/`,
    type,
    status: 'review',
    indexStatus: 'index',
    title,
    dek: `A practical, reader-facing guide to ${subject.toLowerCase()} with concrete decisions, controlled steps, and useful troubleshooting.`,
    seoTitle: title.length <= 57 ? `${title} | Built True` : `${title.slice(0, 54).replace(/\s+\S*$/, '')} | Built True`,
    metaDescription,
    categoryId: slugify(cluster.name),
    clusterId: `cluster-${cluster.letter.toLowerCase()}`,
    tags: [...new Set([slugify(cluster.name), ...subject.toLowerCase().split(/\s+/).filter((word) => word.length > 4).slice(0, 5)])],
    intent,
    skillLevel,
    ...timing(title, intent),
    costBand: costBand(title, offers),
    sections,
    tools: toolList(intent, offers),
    materials: materialList(intent, cluster.letter),
    safetyNotes: [profile.safety, `Use the exact tool, material, load, and manufacturer instructions that apply to ${subject.toLowerCase()}.`],
    affiliateDisclosure: 'We may earn a commission from purchases made through links in this guide, at no extra cost to you. Recommendations must be selected for fit and usefulness, not commission.',
    naturalOffers: offers.split(/,|;/).map((value) => value.trim()).filter(Boolean),
    prerequisiteIds: [],
    relatedGuideIds: [],
    authorId: 'built-true-editors',
    reviewerIds: [],
    evidenceStatus: 'brief',
    sources: [],
    createdAt: date,
    updatedAt: date,
    contentVersion: 1,
  }
})

const byCluster = new Map()
for (const guide of entries) {
  const siblings = byCluster.get(guide.clusterId) ?? []
  siblings.push(guide)
  byCluster.set(guide.clusterId, siblings)
}
for (const guide of entries) {
  const siblings = byCluster.get(guide.clusterId) ?? []
  const index = siblings.findIndex((candidate) => candidate.id === guide.id)
  guide.relatedGuideIds = [siblings[(index + 1) % siblings.length]?.id, siblings[(index + 2) % siblings.length]?.id].filter((value) => value && value !== guide.id)
  if (index > 0) guide.prerequisiteIds = [siblings[index - 1].id]
}

const upgradedEntries = upgradeGuideCorpus(entries)
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(upgradedEntries, null, 2)}\n`, 'utf8')
console.log(`Generated ${upgradedEntries.length} reader-facing, indexable guides at ${outputPath}.`)
