import { planFor, topicFacts } from './content-quality.mjs'
import { humanLearnCoverage, humanLearnGuide } from './human-learn-guides.mjs'
import { productionMaterials, productionPlanFor, productionTools } from './production-plans.mjs'
import { curateLearnSectionHeadings } from './section-heading-curation.mjs'

const DISCLOSURE = 'We may earn a commission from purchases made through links in this guide, at no extra cost to you. Recommendations are selected for fit and usefulness, not commission.'

const sources = {
  wood: { title: 'USDA Forest Products Laboratory — Wood Handbook', url: 'https://research.fs.usda.gov/fpl/wood-handbook' },
  woodPdf: { title: 'USDA Forest Products Laboratory — Wood Handbook, 2021 edition', url: 'https://www.fpl.fs.usda.gov/documnts/fplgtr/fplgtr282/fpl_gtr282.pdf' },
  finish: { title: 'USDA Forest Products Laboratory — Finishing Wood', url: 'https://www.fpl.fs.usda.gov/documnts/fplgtr/fplgtr282/chapter_16_fpl_gtr282.pdf' },
  lumber: { title: 'NIST — American Softwood Lumber Standard PS 20-20', url: 'https://www.nist.gov/document/doc-ps-20-20-american-softwood-lumber-standard-revision-1-oct-2021' },
  osha: { title: 'OSHA — Woodworking Machinery Requirements', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.213' },
  tableSaw: { title: 'OSHA — Table Saws', url: 'https://www.osha.gov/etools/woodworking/production/machines-tools/table-saws' },
  pti: { title: 'Power Tool Institute — Safety Resources', url: 'https://www.powertoolinstitute.com/' },
  dust: { title: 'NIOSH — Wood Dust', url: 'https://www.cdc.gov/niosh/npg/npgd0667.html' },
  tableSawDust: { title: 'NIOSH — Control of Wood Dust From Table Saws', url: 'https://www.cdc.gov/niosh/docs/hazardcontrol/hc10.html' },
  sanderDust: { title: 'NIOSH — Control of Wood Dust From Random Orbital Hand Sanders', url: 'https://www.cdc.gov/niosh/engcontrols/ecd/detail46.html' },
  glue: { title: 'Titebond — Original Wood Glue Application Guidelines', url: 'https://www.titebond.com/print/product/d4d28015-603f-4dfc-a7d9-f684acc71207' },
  treated: { title: 'USDA Forest Products Laboratory — Selection and Use of Pressure-Treated Wood', url: 'https://research.fs.usda.gov/treesearch/59612' },
  tipover: { title: 'U.S. Consumer Product Safety Commission — Anchor It!', url: 'https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/AnchorItgov' },
  bird: { title: 'Cornell Lab NestWatch — Right Bird, Right House', url: 'https://nestwatch.org/learn/all-about-birdhouses/right-bird-right-house/' },
  birdFeeder: { title: 'Project FeederWatch — How to Clean Your Feeders', url: 'https://feederwatch.org/learn/feeding-birds/how-to-clean-your-feeders/' },
  bat: { title: 'Bat Conservation International — Bat House Guidelines', url: 'https://www.batcon.org/about-bats/bat-house-guidelines/' },
  pollinator: { title: 'Xerces Society — Nesting Resources for Pollinators', url: 'https://xerces.org/pollinator-conservation/nesting-resources' },
  dewaltRouter: { title: 'DEWALT — DCW600B Cordless Compact Router', url: 'https://www.dewalt.com/en-us/product/dcw600b/20v-max-xr-brushless-cordless-router-tool-only' },
  makitaRouter: { title: 'Makita — XTR01Z Cordless Compact Router', url: 'https://makitatools.com/products/details/XTR01Z' },
  sawstop: { title: 'SawStop — Professional Cabinet Saw Owner’s Manual', url: 'https://www.sawstop.com/wp-content/uploads/2021/10/Owners-Manual-Professional-Cabinet-Saw-175.pdf' },
  hearing: { title: 'NIOSH — Provide Hearing Protection', url: 'https://www.cdc.gov/niosh/noise/prevent/ppe.html' },
  respiratory: { title: 'OSHA — Respiratory Protection, 29 CFR 1910.134', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134' },
  eye: { title: 'OSHA — Eye and Face Protection, 29 CFR 1910.133', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.133/' },
  extensionCord: { title: 'U.S. Consumer Product Safety Commission — Extension Cords', url: 'https://www.cpsc.gov/FAQ/Extension-Cords' },
  flammable: { title: 'OSHA — Flammable Liquids, 29 CFR 1910.106', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.106' },
  oilyRags: { title: 'National Fire Protection Association — Safety With Oily Rags', url: 'https://www.nfpa.org/-/media/project/storefront/catalog/files/safety-tip-sheets/oilyragssafetytips.pdf' },
  composite: { title: 'U.S. EPA — Formaldehyde Standards for Composite Wood Products', url: 'https://www.epa.gov/formaldehyde/formaldehyde-emission-standards-composite-wood-products' },
}

const titleRevisions = {
  '350': 'Dining-Table Finish Comparison: Heat, Water, and Scratch Tradeoffs',
  '425': 'Outdoor Wood Finishes Compared for Sun, Water, and Maintenance',
  '477': 'How to Choose a Cabinet Table Saw for a Serious Home Shop',
  '479': 'How to Choose a Benchtop Thickness Planer for Furniture Projects',
  '481': 'How to Choose an 8-Inch Jointer for a Garage Shop',
  '482': 'How to Choose a Dust Collector for a Small Woodshop',
  '483': 'How to Choose a Dust Extractor for Sanding and Track Saws',
  '484': 'Router Table Systems Compared: Benchtop, Cast Iron, and Shop-Built',
  '485': 'How to Choose a CNC Router for a First Small Business',
  '486': 'Desktop CNC Routers Compared: Work Area, Rigidity, Software, and Support',
  '491': 'Premium vs. Budget Chisels: Steel, Grinding, Handles, and Value',
  '492': 'Premium vs. Budget Parallel Clamps: Pressure, Deflection, and Value',
  '493': 'Wood Glue by Use Case: Furniture, Outdoor Work, and Long Open Time',
  '494': 'Saw Blade Selection for Plywood, Ripping, and Furniture Work',
  '495': 'Router Bits Worth Buying Individually Instead of in a Giant Set',
  '496': 'Choose a Sandpaper System by Sander, Wood, and Finish Schedule',
  '499': 'Giant Woodworking Plan Bundles: Are They Worth It? A Quality-Control Checklist',
}

const learnLiteralLists = {
  '012': { id: 'literal-list', heading: 'Four dependable ways to cut square', bullets: ['Miter saw: register a straight edge against the fence and verify the 90-degree detent with paired test cuts.', 'Table saw: use a square miter gauge or crosscut sled; never trap the offcut between the blade and rip fence.', 'Circular saw: support both pieces and run the base against a clamped guide set from the actual blade offset.', 'Hand saw: mark around the stock, saw on the waste side, then true the end with a shooting board when the fit requires it.'] },
  '016': { id: 'literal-list', heading: 'Seven mistakes that turn good stock into scrap', bullets: ['Cutting before the final dimensions and reference faces are marked.', 'Laying critical parts through checks, knots, pith, or severe grain runout.', 'Treating nominal lumber or plywood thickness as an exact measurement.', 'Skipping the matching-scrap test for a cutter, joint, or finish.', 'Forcing a joint instead of finding the local high spot.', 'Starting a glue-up before clamps, cauls, and the assembly order are rehearsed.', 'Applying finish to the project before the complete schedule works on an offcut.'] },
  '023': { id: 'literal-list', heading: 'Five joints worth learning first', bullets: ['A reinforced butt joint for simple shop fixtures and learning square assembly.', 'A rabbet for case backs, box corners, and registering one part at an edge.', 'A dado for shelves and dividers that need a housed shoulder.', 'A half-lap for frames and crossings with broad long-grain contact.', 'A mortise-and-tenon for frames that must resist racking and repeated load.'] },
  '025': { id: 'literal-plan', heading: 'A 30-day practice schedule', bullets: Array.from({ length: 30 }, (_, index) => {
    const days = ['Set up a safe bench area and practice clamping.', 'Mark reference faces and edges on five scraps.', 'Check a square with the flip test.', 'Measure and mark five identical lengths.', 'Saw five lines by hand and label the error.', 'Drill square holes with a backer.', 'Practice countersinks and pilot holes.', 'Plane one edge straight.', 'Sharpen one chisel and pare end grain.', 'Cut four square end blocks.', 'Make a simple butt-jointed frame.', 'Cut two accurate rabbets.', 'Cut two dados to fit actual plywood.', 'Practice a half-lap in matching stock.', 'Dry-fit a small box.', 'Glue the box and compare diagonals.', 'Remove glue without damaging the surface.', 'Sand one panel through a tested grit sequence.', 'Apply finish to divided sample boards.', 'Build a bench hook or simple stop.', 'Repeat the five hand-saw cuts.', 'Make four matching frame parts from one stop.', 'Cut and fit one mortise-and-tenon sample.', 'Lay out a small shelf from a story stick.', 'Build the shelf without finish.', 'Inspect the shelf for square, level, and racking.', 'Finish the shelf from the accepted sample schedule.', 'Write down the three mistakes that cost the most time.', 'Repeat the weakest joint or machine setup.', 'Photograph the finished work and plan the next project from the skill that needs practice.']
    return `Day ${index + 1}: ${days[index]}`
  }) },
  '086': { id: 'literal-plan', heading: 'The five-cut straight-sawing drill', bullets: ['Cut 1: start a shallow kerf on the waste side without correcting it.', 'Cut 2: watch the top line for the full stroke.', 'Cut 3: alternate attention between the top and front lines.', 'Cut 4: repeat with a lighter grip and longer relaxed strokes.', 'Cut 5: use the best body and work position, then compare all five ends with a square.'] },
  '225': { id: 'literal-list', heading: 'Twelve shop-made jigs that earn their storage space', bullets: ['Crosscut sled', 'Taper jig with positive workholding', 'Straight-line rip carrier', 'Thin-rip guide', 'Zero-clearance insert', 'Router trammel', 'Mortising guide', 'Perpendicular drilling guide', 'Box-joint jig', 'Circle-cutting jig', 'Assembly square or corner fixture', 'Repeatable stop block'] },
}

const projectRules = [
  { test: /^(?!.*\b(?:box-joint jig|drawer box|planter box)\b).*(?:\bbox\b|crate|chest|trunk|valet tray)/i, focus: 'A box succeeds when the opposite parts match, the bottom has room to fit without forcing the case out of square, and the lid or opening is fitted only after the body is stable.', sequence: ['Mill the paired sides together.', 'Prepare the listed bottom route—captured, rabbeted, or fastened beneath—before assembly.', 'Dry-clamp the case and compare diagonals.', 'Fit the lid, tray, or dividers to the assembled opening.'], checks: ['Opposite sides match in length.', 'The bottom seats without bowing the case.', 'Both diagonals agree before glue.', 'The lid clears evenly after the finish cures.'], failure: 'A box that twists usually started with mismatched side lengths, an over-tight bottom, or clamp pressure applied before the joints were fully seated.' },
  { test: /coffee table|end table|side table|console table|dining table|pedestal table|card table|drop-leaf|bar table/i, focus: 'For a table, the base must resist racking while the top is allowed to move across its grain. Height, knee room, overhang, and the route through the doorway matter as much as the joinery.', sequence: ['Build and square the base first.', 'Flatten the bearing points at the top of the base.', 'Fit the top fasteners in elongated or movement-friendly holes.', 'Level the finished table by correcting the base, not randomly sanding the top.'], checks: ['The base stands without rocking before the top is attached.', 'Aprons and stretchers leave the promised clearance.', 'Top fasteners permit cross-grain movement.', 'The piece fits its doorway and final room.'], failure: 'Cracked tops and opened breadboard joints usually come from restraining seasonal movement; rocking usually belongs to the base or floor, not to a corner of the top.' },
  { test: /workbench|assembly table|outfeed table|portable workbench/i, focus: 'A workbench is a workholding system. Its height, overhang, dog-hole pattern, vise clearance, mass, and access for clamps should be decided from the operations it must support.', sequence: ['Choose height from the primary work, not a universal chart.', 'Build a rigid base and level its contact points.', 'Laminate or layer the top on a flat reference.', 'Add vises, stops, and dog holes only after checking their hardware paths.'], checks: ['The base does not rack under planing pressure.', 'Clamps can reach the intended edges.', 'Dog holes miss bolts, screws, and aprons.', 'The bench can be moved or disassembled as planned.'], failure: 'A heavy bench can still be poor if the base racks, the top blocks clamps, or vise hardware collides with a leg or fastener.' },
  { test: /^(?!.*\b(?:bench hook|shooting board|workbench|outfeed bench|assembly bench)\b).*(?:chair|Adirondack|lounge chair|stool|\bbench\b|kneeler|footrest)/i, focus: 'Seating is repeatedly and dynamically loaded. Use straight grain through legs and rails, conservative joinery, eased edges, and a full-size mockup for seat height, depth, back angle, and foot placement.', sequence: ['Mock up the posture and principal angles.', 'Make paired legs and rails from shared setups.', 'Dry-fit the complete frame on a flat floor.', 'Test stability progressively after the adhesive reaches full cure.'], checks: ['No primary load crosses short grain.', 'Joints close without using screws to pull them together.', 'All feet touch before the seat is installed.', 'The finished piece receives a cautious progressive load test.'], failure: 'A loose chair is a structural warning, not a cosmetic nuisance. Stop using it and inspect the load path, especially end-grain screws, short-grain shoulders, and undersized joints.' },
  { test: /bed frame|platform bed|storage bed/i, focus: 'A bed must match the actual mattress, support the manufacturer’s required slat spacing, resist side-to-side racking, and come apart for the route through doors and stairs.', sequence: ['Measure the mattress and hardware in hand.', 'Build the head, foot, and rail assemblies separately.', 'Install a supported center rail for a wide mattress.', 'Assemble in the room and confirm every connector is fully engaged.'], checks: ['Mattress clearance is intentional, not guessed.', 'Slat spacing follows the mattress requirements.', 'Center support reaches the floor without lifting the rails.', 'Knock-down fittings cannot loosen unnoticed.'], failure: 'Squeaks usually identify movement at a connector, slat, or center support; adding random screws can hide the symptom while making the bed harder to service.' },
  { test: /cabinet|bookcase|nightstand|dresser|wardrobe|vanity|console|pantry|locker|medicine cabinet|built-in/i, focus: 'Casework begins with a square box. Paired sides should be machined together, the back should lock the case square, and doors or drawers should be fitted only after the installed opening is measured.', sequence: ['Cut paired sides from one setup.', 'Machine shelf and hardware locations from one reference end.', 'Square the case before fastening the back.', 'Fit doors, drawers, and scribes to the installed case.'], checks: ['Case diagonals agree before the back is fixed.', 'Shelf spans are appropriate for the expected load.', 'Hardware clearances come from the exact manufacturer drawing.', 'Tall or climbable furniture has a suitable anti-tip connection.'], failure: 'Uneven reveals are often a case-squareness problem. Correct the box and installation before trimming every door or drawer to a crooked opening.' },
  { test: /drawer/i, focus: 'A drawer is sized from the measured opening and the exact slide requirement. Build the box square first, prove that it travels freely, and fit the applied front last.', sequence: ['Measure the opening at the front and back.', 'Subtract the exact slide clearance.', 'Build the box and compare diagonals.', 'Install the slides from matching spacers, then fit the front.'], checks: ['The box width uses the smaller measured opening.', 'The bottom does not force the box out of square.', 'Slides share the same setback and elevation.', 'The applied front has an even reveal through its travel.'], failure: 'A drawer that binds seasonally may be swelling, a racked case, or misaligned slides. Identify which surface is rubbing before planing the drawer smaller.' },
  { test: /shelf|mantel|pot rack|key holder/i, focus: 'A wall-mounted project is only as reliable as its load path. Size the shelf for sag, locate verified framing or masonry, and use brackets and fasteners rated for the wall and expected load.', sequence: ['Measure the wall and locate structure.', 'Choose the span and support spacing from the intended load.', 'Build the shelf or carcass square.', 'Install the support first and prove it level before loading.'], checks: ['Fasteners enter verified structure or an appropriate rated anchor.', 'The shelf cannot lift off its concealed support.', 'Long spans have edging, thickness, or intermediate support.', 'The installation is checked after the first period of use.'], failure: 'A level-looking shelf can still fail if the fastener only grips drywall or if the bracket rating assumes a different wall and screw pattern.' },
  { test: /\bjig\b|sled|\b(?:cutting|router|drilling|layout|saw) guide\b|template|insert|bench hook|shooting board|winding sticks|caul|stop block|push-block|push-stick/i, focus: 'A jig earns its place by making one repeated operation safer or more repeatable. Its references must be adjustable or replaceable, and every screw, clamp, knob, and runner must stay outside the complete cutter path.', sequence: ['Draw the cutter path on the base.', 'Fit the guide or runner without side play.', 'Square the working fence from an actual test cut.', 'Label limits and retire the jig when wear changes the result.'], checks: ['Hardware clears the cutter at every setting.', 'The work cannot pivot or lift during the cut.', 'A scrap test verifies the jig independently.', 'Stops and fences remain tight after repeated use.'], failure: 'Do not compensate for a loose runner or worn kerf by steering the work. Repair or replace the reference before using the jig again.' },
  { test: /cart|rack|organizer|tool wall|storage|charging station|cabinet|dock/i, focus: 'Shop storage should put the heaviest item low, connect every load to a clear structure, preserve ventilation around chargers and motors, and make frequently used tools easy to return.', sequence: ['Measure the actual tools and cases.', 'Map the loaded center of gravity and anchor points.', 'Build the frame or case with a racking-resistant back.', 'Load it gradually and recheck fasteners and caster locks.'], checks: ['Casters and feet are rated for the loaded project.', 'Tall storage is anchored to suitable structure.', 'Chargers and machines retain required airflow.', 'Nothing can fall into an aisle or onto an operator.'], failure: 'A mobile cabinet that is stable while empty can become dangerous when a heavy machine or lumber raises its center of gravity.' },
  { test: /bird feeder/i, focus: 'A bird feeder should keep seed dry, drain rain, come apart without fighting hidden fasteners, and expose every food-contact surface for regular cleaning. The roof and tray matter less than a cleanable design that does not collect moldy seed.', sequence: ['Choose the seed and feeding style before sizing openings.', 'Build a removable tray or roof that exposes the interior.', 'Add drainage and keep joints from trapping wet seed.', 'Install where the feeder can be taken down and cleaned safely.'], checks: ['Old seed and droppings can be removed from every surface.', 'Rain drains without soaking the seed supply.', 'Edges and fasteners cannot injure visiting birds.', 'The filled feeder remains stable on its mount.'], failure: 'A feeder that looks clean from outside can still hold wet seed and droppings in an inaccessible corner. Redesign the cleanout instead of sealing that pocket permanently.' },
  { test: /birdhouse/i, focus: 'Choose the target bird before cutting the entrance. Floor size, hole diameter, height above the floor, habitat, drainage, ventilation, predator protection, and placement should follow current species guidance.', sequence: ['Select a local cavity-nesting species.', 'Download the current species plan.', 'Cut untreated stock with a rough interior below the entrance.', 'Provide drainage and a clean-out panel, then install in suitable habitat.'], checks: ['Entrance dimensions match the target species.', 'No perch helps predators reach the opening.', 'The interior is unfinished and can drain.', 'The box can be opened and cleaned safely.'], failure: 'A generic hole can exclude the intended bird or admit competitors and predators. The conservation plan—not the decorative style—sets the critical dimensions.' },
  { test: /bat house/i, focus: 'Bat houses are climate-sensitive habitat structures, not ordinary bird boxes. Current guidance favors tall, multi-chamber designs, rough untreated interior surfaces, sealed seams, regional color choices, and carefully planned mounting.', sequence: ['Select a current regional design.', 'Build narrow chambers from untreated wood.', 'Seal exterior seams while leaving landing surfaces grippable.', 'Mount with adequate open space below and monitor temperature and occupancy.'], checks: ['Roosting gaps do not exceed current conservation guidance.', 'Interior surfaces contain no mesh that can trap bats.', 'Color and sun exposure suit the climate.', 'The mounting reaches solid structure and leaves a clear flight path.'], failure: 'A poorly placed or overheated bat house can remain empty or harm bats. Preserve natural habitat and treat a house as a carefully monitored supplement.' },
  { test: /pollinator hotel/i, focus: 'A pollinator hotel should be small, sheltered, and built around replaceable nesting material. Natural stems, snags, bare ground, and diverse native plants usually provide better habitat; an artificial nest requires regular maintenance to limit mites and disease.', sequence: ['Choose a sheltered location near useful flowering habitat.', 'Use clean replaceable hollow stems or a maintained nesting-block design.', 'Protect openings from rain without sealing ventilation.', 'Replace or clean nesting material on the conservation schedule.'], checks: ['Tunnels are smooth, dry, and closed at the back.', 'Nesting material can be removed without destroying the frame.', 'The structure stays secure while remaining small enough to maintain.', 'No pesticide-treated or contaminated material is used.'], failure: 'A large permanent bundle can concentrate parasites and disease. If the nesting material cannot be replaced or cleaned, the decorative hotel is not a maintainable habitat feature.' },
  { test: /outdoor|garden|patio|planter|raised bed|pergola|porch swing|hammock|firewood|hose hanger|compost/i, focus: 'Outdoor work lasts by shedding water, protecting end grain, keeping vulnerable wood out of ground contact, and using corrosion-resistant hardware compatible with the lumber treatment.', sequence: ['Confirm site, drainage, loads, and local requirements.', 'Choose naturally durable or correctly treated stock.', 'Detail joints so water can leave and air can circulate.', 'Plan inspection and refinishing access before assembly.'], checks: ['Horizontal surfaces slope or drain.', 'End grain and feet avoid standing water.', 'Fasteners are compatible with the wood and exposure.', 'Structural and hanging loads use rated hardware and approved support.'], failure: 'Trapped water causes more failures than rain alone. A beautiful joint that forms a cup, ledge, or sealed pocket outdoors is a maintenance problem.' },
  { test: /cutting board|serving board|cheese board|recipe box/i, focus: 'Kitchen projects should be easy to clean, stable through moisture cycles, and free of inaccessible grooves. Use sound stock, suitable adhesive, and a fully cured finish whose maker supports the intended use.', sequence: ['Arrange stable grain and remove defects.', 'Glue only joints that close without force.', 'Shape handles and edges without creating dirt traps.', 'Finish, cure fully, wash by hand, and dry upright.'], checks: ['No open knot, crack, or seam can hold food or water.', 'The board rests without rocking.', 'Edges are comfortable but do not catch a knife.', 'Care instructions match the finish and construction.'], failure: 'Dishwashers, soaking, and uneven drying accelerate movement and glue-line failure even when the original assembly was sound.' },
  { test: /toy|kids|child|dollhouse|growth chart|pet|dog|cat/i, focus: 'Projects for children or pets require rounded edges, captured hardware, stable geometry, and finishes selected for the actual age, contact, chewing, climbing, and cleaning conditions.', sequence: ['Identify foreseeable climbing, pinching, and detachable-part hazards.', 'Choose stable dimensions and a conservative load path.', 'Round every touch edge before finish.', 'Inspect after cure and periodically during use.'], checks: ['No small detachable part or exposed fastener creates a hazard.', 'The project cannot tip during normal foreseeable use.', 'Wall or window supports are rated and enter suitable structure.', 'Finish and adhesive are fully cured before contact.'], failure: 'A furniture-style joint or decorative fastener is not automatically suitable for a climbing child or moving animal; the actual use controls the design.' },
  { test: /turn|lathe/i, focus: 'Turning starts with sound stock, secure mounting, the slowest appropriate startup speed, and tool-rest clearance checked by rotating the blank by hand.', sequence: ['Inspect and balance the blank.', 'Mount it with the correct center, chuck, or faceplate.', 'Set the rest close and rotate by hand.', 'Start out of the firing line and refine the shape with controlled cuts.'], checks: ['The blank has no dangerous checks, bark pockets, or embedded metal.', 'Mounting surfaces are sound and fully seated.', 'The rest never touches the rotating work.', 'Wall thickness and friction fits are checked after the wood rests.'], failure: 'Stop immediately when a blank loosens, changes sound, or develops a crack. Retightening a damaged mounting surface is not a repair.' },
  { test: /CNC|carve|flat-pack|hardwood sign/i, focus: 'A CNC result depends on stock preparation, a known zero, verified cutter geometry, secure workholding, and a toolpath checked for clamps, screws, lead-ins, and rapid moves.', sequence: ['Prepare flat, stable stock and surface the spoilboard when needed.', 'Measure the actual cutter and set a deliberate origin.', 'Simulate the complete toolpath and run an air cut.', 'Cut with enough workholding, then verify the first critical feature.'], checks: ['Every clamp and screw clears every machine move.', 'The toolpath uses the actual cutter and stock thickness.', 'Tabs or an onion skin retain parts through the final pass.', 'Joinery is tested in the real sheet material before production.'], failure: 'A correct drawing can still cut badly when zero, cutter diameter, stock thickness, or workholding differs from the CAM assumptions.' },
  { test: /frame|clock|sign|ornament|phone stand|tablet stand|speaker|lamp|gift/i, focus: 'Small projects reveal layout errors quickly. Make a full-size pattern, preserve a clean show face, use a stop for repeated pieces, and test hardware recesses and finish on an offcut.', sequence: ['Draw or print the project full size.', 'Prepare one reference edge and make repeated parts together.', 'Cut joinery and hardware recesses before final shaping.', 'Dry-fit, ease touch edges, and finish from a labeled sample.'], checks: ['Repeated parts match without individual measuring.', 'Hardware sits flush without breaking through.', 'The project stands or hangs without rocking.', 'Edges and finish suit repeated handling.'], failure: 'Small parts become unsafe when held too close to a cutter. Use a carrier, handsaw, or different sequence rather than shrinking a machine setup beyond control.' },
]

const pick = (guide, values, salt = 0) => values[(Number(guide.id) + salt) % values.length]
const cleanSubject = (title) => title.replace(/^(?:(?:build|make|how to|the beginner(?:’|')?s guide to)\s+)+/i, '').replace(/[.?!:]+$/, '')
const lowerFirst = (value) => `${value.charAt(0).toLowerCase()}${value.slice(1)}`
const decisionSubject = (title) => cleanSubject(title).replace(/^choose\s+/i, '').toLowerCase()

function headingFrom(value, maximum = 170) {
  const sentence = (value.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? value).replace(/[.!?]+$/, '').trim()
  if (sentence.length <= maximum) return sentence
  const cut = sentence.lastIndexOf(' ', maximum)
  return `${sentence.slice(0, cut > 70 ? cut : maximum).replace(/[,;:\s]+$/, '')}…`
}
const sentenceSubject = (value) => value.toLowerCase()
  .replace(/\bdewalt\b/g, 'DeWalt').replace(/\bmakita\b/g, 'Makita').replace(/\bsawstop\b/g, 'SawStop')
  .replace(/\bcnc\b/g, 'CNC').replace(/\bmdf\b/g, 'MDF').replace(/\bhepa\b/g, 'HEPA').replace(/\bhvlp\b/g, 'HVLP')
const uniqueSources = (items) => [...new Map(items.map((item) => [item.url, item])).values()]
const specificFacts = {
  '478': [
    'SawStop’s brake system monitors a small electrical signal on the blade and is designed to stop and retract the blade when contact changes that signal; it reduces injury severity but does not replace guards, a riving knife, or safe technique.',
    'A brake activation normally means replacing the single-use cartridge and inspecting or replacing the blade; include that downtime and replacement cost in the ownership comparison.',
    'Conductive or wet material can require the manual’s bypass procedure. Bypass mode disables the contact-response protection and must not become a shortcut for ordinary cutting.',
    'Confirm blade diameter, kerf, plate thickness, cartridge type, dado compatibility, and current manual requirements for the exact saw before purchasing cutters.',
  ],
  '487': [
    'DEWALT lists the DCW600B with a 16,000–25,500 rpm variable-speed range, dual LEDs, a 1/4-inch collet, soft start, and electronic speed control; verify the current kit contents because the bare-tool listing does not include a battery or charger.',
    'Makita lists the XTR01Z with a 10,000–30,000 rpm variable-speed range, a 1/4-inch collet, dual LEDs, soft start, and electronic speed control; the tool-only listing likewise excludes the battery and charger.',
    'Both choices make more sense when their battery platform is already in the shop. Price the required battery, charger, compatible bases, edge guide, dust nozzle, and first useful bits before comparing totals.',
    'Neither manufacturer specification can tell you which grip, switch placement, depth adjustment, or dust setup feels better. Handle both with the battery and intended base installed when possible.',
  ],
  '499': [
    'Open several complete plans before paying and verify that dimensions reconcile between drawings, cut lists, and written steps.',
    'Reject a bundle that hides authorship, revision dates, sample pages, licensing terms, refund rules, or a way to report corrections.',
    'A smaller library with coherent drawings, material assumptions, safety notes, and tested hardware details is more valuable than thousands of scraped or duplicated titles.',
    'Search a distinctive sentence and inspect preview images for repeated diagrams; obvious duplication is a warning that the quantity claim is the product.',
  ],
}
const usefulFacts = (guide) => [...(specificFacts[guide.id] ?? []), ...topicFacts(guide).facts.filter((fact) => !/^(Treat |For .+write down|Use a matching scrap)/i.test(fact))].slice(0, 8)

const nonToolOffer = /^(?:current-model retest required|no unsafe retrofit implication|engineering caveats|evidence and licensing review|scenario-based verdicts|independently build sample projects|manufacturer\/agency sources|official safety sources|published test method|safety-source review)$/i
const legacyToolPurpose = /^(?:Evaluate this option|Supply the dimensions|Set or verify the controlling|Make or refine the cut|Perform the main|Hold and control|Control the dust|Create, reinforce|Prepare, test|Provide representative|Create a repeatable|Support, position|Use this item)/i

function toolPurpose(name, guide) {
  const value = name.toLowerCase()
  const activity = activityPhrase(guide)
  if (/square|rule|ruler|tape|caliper|gauge|indicator|protractor|angle finder|straightedge|level|story stick|center finder|calibration/.test(value)) return `Use ${value} to set or verify the controlling dimension and reference while ${activity}`
  if (/blade|bit|cutter|knife|knives|iron|chisel|scraper|rasp|file|auger|forstner|dado stack|abrasive|disc|pad|sandpaper|stone|strop/.test(value)) return `Use ${value} to make or refine the required cut, surface, or edge while ${activity}`
  if (/saw|router|jointer|planer|drill|lathe|cnc|sander|plane|grinder|machine|spindle/.test(value)) return `Use ${value} for the main cutting, shaping, drilling, or surfacing operation in ${guide.title}`
  if (/clamp|caul|vise|hold-down|push block|push stick|push shoe|featherboard|workholding/.test(value)) return `Use ${value} to hold and control the work through the complete operation in ${guide.title}`
  if (/dust|vacuum|extractor|collector|filter|respirator|ppe|eye|hearing|face shield|extinguisher|eyewash|first-aid|safety|ventilation|rag can/.test(value)) return `Use ${value} to control the dust, exposure, or emergency hazard identified in ${guide.title}`
  if (/glue|adhesive|epoxy|dowel|biscuit|domino|screw|fastener|hinge|slide|insert|connector|plug|bow tie|tabletop fastener/.test(value)) return `Use ${value} to create, reinforce, or test the connection described in ${guide.title}`
  if (/finish|stain|dye|pigment|shellac|oil|wax|applicator|brush|roller|sprayer|compound|conditioner|primer|filler|repair kit/.test(value)) return `Use ${value} to prepare, test, apply, or maintain the finish system in ${guide.title}`
  if (/lumber|plywood|sheet goods|veneer|wood|sample|material|stock|foam|backer board/.test(value)) return `Use ${value} as representative stock or a safe test piece for ${guide.title}`
  if (/jig|guide|template|sled|fence|stop|rail|track|setup block|tramm|circle|splinter strip/.test(value)) return `Use ${value} to create a repeatable reference or support the work while ${activity}`
  if (/plan|course|bundle|membership|chart|calculator|worksheet|design subscription|download|reference/.test(value)) return `Use ${value} for the dimensions, sequence, or comparison details in ${guide.title}`
  if (/storage|rack|base|stand|table|bench|cart|bin|cabinet|lighting|task light|cord management/.test(value)) return `Use ${value} to support, position, illuminate, or store the setup in ${guide.title}`
  return `Use ${value} for the setup, test, or comparison described in ${guide.title}`
}

function cleanEditorialTools(guide) {
  return (guide.tools ?? [])
    .filter((tool) => tool?.name && !nonToolOffer.test(tool.name))
    .map((tool) => legacyToolPurpose.test(tool.purpose ?? '') ? { ...tool, purpose: toolPurpose(tool.name, guide) } : tool)
}

function activityPhrase(guide) {
  const subject = cleanSubject(guide.title)
  const lower = sentenceSubject(subject)
  if (/\bvs\.?\b|versus|comparison|compared|showdown/i.test(guide.title)) return `comparing ${lower}`
  if (/wood sandpaper grits explained/i.test(subject)) return 'choosing and sequencing sandpaper grits'
  const verbs = [
    ['Set Up ', 'setting up '], ['Lay Out ', 'laying out '], ['Read ', 'reading '], ['Align ', 'aligning '], ['Size ', 'sizing '],
    ['Make ', 'making '], ['Choose ', 'choosing '], ['Drill ', 'drilling '], ['Cut ', 'cutting '],
    ['Use ', 'using '], ['Avoid ', 'avoiding '], ['Prevent ', 'preventing '], ['Create ', 'creating '],
    ['Scale ', 'scaling '], ['Transfer ', 'transferring '], ['Account ', 'accounting '], ['Divide ', 'dividing '],
    ['Find ', 'finding '], ['Estimate ', 'estimating '], ['Check ', 'checking '], ['Sharpen ', 'sharpening '],
    ['Flatten ', 'flattening '], ['Joint ', 'jointing '], ['Mill ', 'milling '], ['Plane ', 'planing '],
    ['Repair ', 'repairing '], ['Fix ', 'fixing '], ['Install ', 'installing '], ['Attach ', 'attaching '],
    ['Reduce ', 'reducing '], ['Restore ', 'restoring '], ['Label ', 'labeling '], ['Turn ', 'turning '],
    ['Optimize ', 'optimizing '], ['Predict ', 'predicting '], ['Acclimate ', 'acclimating '], ['Calibrate ', 'calibrating '],
    ['Measure ', 'measuring '], ['Mark ', 'marking '], ['Fit ', 'fitting '], ['Route ', 'routing '],
    ['Sand ', 'sanding '], ['Resaw ', 'resawing '], ['Scribe ', 'scribing '], ['Stabilize ', 'stabilizing '],
    ['Tram ', 'tramming '], ['Tune ', 'tuning '], ['Select ', 'selecting '], ['Inspect ', 'inspecting '],
  ]
  const match = verbs.find(([verb]) => subject.toLowerCase().startsWith(verb.toLowerCase()))
  if (match) {
    let activity = `${match[1]}${sentenceSubject(subject.slice(match[0].length))}`
    for (const [verb, gerund] of verbs) {
      activity = activity.replace(new RegExp(`\\band\\s+${verb.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'), `and ${gerund.trim()}`)
    }
    return activity
  }
  if (/^are giant woodworking plan bundles worth it/i.test(subject)) return 'evaluating giant woodworking plan bundles'
  return guide.intent === 'buy' ? `choosing ${lower}` : `working through ${lower}`
}

function sourcesFor(guide) {
  const title = guide.title.toLowerCase()
  const selected = [sources.wood]
  if (/lumber|board.?foot|nominal|plywood|mdf|particleboard|wood movement|grain|moisture|oak|maple|walnut|poplar|pine|cedar/i.test(title)) selected.push(sources.lumber)
  if (/finish|stain|polyurethane|oil|shellac|dye|spray|scratch|white ring/i.test(title)) selected.push(sources.finish)
  if (/glue|adhesive|epoxy|joint|laminat/i.test(title)) selected.push(sources.glue)
  if (/table saw/i.test(title)) selected.push(sources.tableSaw, sources.tableSawDust)
  else if (/saw|router|jointer|planer|drill press|lathe|cnc|sander|machine|power tool/i.test(title)) selected.push(sources.osha, sources.pti)
  if (/dust|respirator|sander|sanding|shop vacuum|dust collector|cyclone|hose/i.test(title)) selected.push(sources.dust)
  if (/sander|sandpaper|sanding/i.test(title)) selected.push(sources.sanderDust)
  if (/hearing|earmuff|earplug|noise/i.test(title)) selected.push(sources.hearing)
  if (/respirator|respiratory/i.test(title)) selected.push(sources.respiratory)
  if (/safety glasses|goggles|face shield|eye protection/i.test(title)) selected.push(sources.eye)
  if (/extension cord|power cord/i.test(title)) selected.push(sources.extensionCord)
  if (/fire extinguisher|oily.?rag|flammable|combustible|finishing-supply/i.test(title)) selected.push(sources.flammable, sources.oilyRags)
  if (/MDF|particleboard|composite wood/i.test(guide.title)) selected.push(sources.composite)
  if (guide.intent === 'build' && /dresser|bookcase|wardrobe|cabinet|media console|locker|child|kids|toy|pet|cat window/i.test(title)) selected.push(sources.tipover)
  if (/outdoor|garden|patio|planter|raised bed|pergola|porch|hammock|firewood|compost/i.test(title)) selected.push(sources.treated)
  if (/birdhouse/i.test(title)) selected.push(sources.bird)
  if (/bird feeder/i.test(title)) selected.push(sources.birdFeeder)
  if (/bat house/i.test(title)) selected.push(sources.bat)
  if (/pollinator hotel/i.test(title)) selected.push(sources.pollinator)
  if (/dewalt.*makita.*router/i.test(title)) selected.push(sources.dewaltRouter, sources.makitaRouter)
  if (/sawstop/i.test(title)) selected.push(sources.sawstop)
  if (selected.length < 2) selected.push(sources.pti)
  return uniqueSources(selected).slice(0, 5)
}

function projectProfile(guide) {
  return projectRules.find((rule) => rule.test.test(guide.title)) ?? {
    focus: 'Start with the controlling dimensions and one reliable reference face and edge. The project becomes predictable when repeated parts share a setup, joints close during the dry fit, and hardware is fitted from the item actually in hand.',
    sequence: ['Confirm the finished dimensions and use conditions.', 'Prepare paired and repeated parts from shared setups.', 'Dry-fit the complete assembly before glue or final hardware.', 'Finish a sample, then assemble and inspect the project in service.'],
    checks: ['Parts are labeled from one reference face.', 'Joints close with ordinary clamp pressure.', 'Hardware fits without weakening an edge.', 'The completed project is stable in its intended location.'],
    failure: 'When the result drifts, return to the first changed reference—stock flatness, part length, setup, or hardware location—instead of trimming unrelated parts.',
  }
}

function articleIntro(guide, subject) {
  const label = subject.toLowerCase().split(':')[0]
  return pick(guide, [
    `The work gets easier when ${label} is reduced to decisions that can be measured before the first irreversible step.`,
    `Start ${label} by settling the dimensions, references, and likely failure points before buying stock or changing a setup.`,
    `A reliable ${label} result comes from one controlled reference and an inspection after each irreversible step—not from forcing a part that no longer fits.`,
    `Treat ${label} as a shop operation: define the result, prove the uncertain setup in scrap, and carry that evidence into the workpiece.`,
  ])
}

function skillMethod(guide) {
  const title = guide.title.toLowerCase()
  if (/sandpaper|sanding|abrasive|grit|card scraper/i.test(title)) return {
    start: (activity) => `Begin ${activity} by naming the defect that must disappear: milling marks, glue residue, a previous scratch pattern, raised grain, or a finish flaw. Start with the finest grit that removes that defect at a useful rate, and connect extraction before creating dust.`,
    test: () => `Divide a matching offcut into labeled lanes. Sand one lane through the proposed sequence and leave the adjacent lane one step coarser; vacuum both, wipe only when the finish permits it, and inspect across the grain in raking light.`,
    read: () => `Fresh abrasive cuts with light pressure and leaves a uniform scratch pattern. Replace it when it loads, stops cutting, or needs extra pressure. Pigtails point to trapped debris or a damaged disc; deep scratches that survive the next grit mean the previous step was not complete.`,
    confirm: () => `Pencil a light crosshatch on the sample before each grit. Stop when the marks and the previous scratch pattern are gone—not when a timer expires—and check edges by hand so they are not quietly rounded over.`,
    troubleshoot: () => `If scratches reappear after finish, return to a labeled sample. Check grit jumps, contaminated abrasives, cross-grain strokes, dust left on the surface, and raking-light inspection before changing the finish itself.`,
    practice: () => `Prepare a small shelf or box lid with one face divided into 80–120–180 and 100–150–180 sequences. Finish the sample and keep it as a shop reference for the same wood and coating.`,
  }
  if (/finish|stain|polyurethane|oil|shellac|lacquer|dye|paint|spray|epoxy|glue|adhesive/i.test(title)) return {
    start: (activity) => `Begin ${activity} by reading the current label and safety data for every product in the schedule. Confirm ventilation, temperature, humidity, compatible previous coatings, personal protection, and a safe plan for wet rags or solvent waste before opening a container.`,
    test: () => `Prepare at least two labeled offcuts from the same board and sand them exactly like the project. Apply the complete schedule to one sample and change only one variable on the other—color, dilution, coat thickness, sanding between coats, or drying time—so the comparison has meaning.`,
    read: () => `Judge the sample only after the stated cure, under the light where the project will live. Lap marks, blotching, fish-eyes, soft film, cloudy color, glue spots, or dust nibs have different causes; note where the defect begins instead of covering it with another heavy coat.`,
    confirm: () => `Rub the cured sample with a clean cloth, test an inconspicuous edge with a fingernail, and expose a spare section to the moisture or handling expected in service. A dry-looking surface is not proof that the film underneath has cured.`,
    troubleshoot: () => `When a coating misbehaves, stop adding material. Check contamination, coat thickness, temperature, ventilation, recoat timing, and product compatibility in that order, then reproduce the correction on a fresh sample before touching the project.`,
    practice: () => `Practice on a small tray, box, or shelf made from the same species. Keep the sample board with the product name, lot or color, preparation grits, coat count, and dates written on the back.`,
  }
  if (/joint|dovetail|mortise|tenon|dado|rabbet|groove|spline|dowel|biscuit|domino|half-lap|pocket hole/i.test(title)) return {
    start: (activity) => `Begin ${activity} with stock milled to the same thickness and one reference face marked on every piece. Lay out the shoulders from one gauge setting, mark the waste, and arrange workholding so the cutting edge always moves away from the hand that controls the part.`,
    test: () => `Make a complete test joint in matching scrap, not a partial cut in random softwood. Saw or rout just to the waste side, pare or adjust in small increments, and keep the accepted sample beside the setup until every project joint is cut.`,
    read: () => `Read the fit at the shoulders, cheeks, and registration faces separately. A gap at one shoulder points to layout or squareness; a joint that stops halfway points to taper, debris, or a local high spot; a joint that slides freely but racks is simply too loose.`,
    confirm: () => `Seat the dry joint by hand, mark its depth, pull it apart, and inspect the burnished contact. It should close without pounding or heroic clamp pressure and leave enough material around the joint to carry the expected load.`,
    troubleshoot: () => `If the joint is tight, mark the contact with pencil or chalk and remove only the high point. If it is loose, preserve the reference faces and remake the mating part or use a deliberate repair; do not disguise a structural gap with extra glue.`,
    practice: () => `Use the joint in a small frame or box where every shoulder remains visible during the dry fit. Make four matching corners from one setup so repeatability—not one lucky fit—is the lesson.`,
  }
  if (/table saw|miter saw|circular saw|track saw|bandsaw|jigsaw|scroll saw|router|jointer|planer|drill press|lathe|cnc|sander|power tool/i.test(title)) return {
    start: (activity) => `Begin ${activity} with the machine disconnected from power. Clean the reference surfaces, inspect the cutter and supplied safety devices, support the whole workpiece and offcut, and rehearse the feed path and final hand position before reconnecting power.`,
    test: () => `Use straight, defect-free scrap that matches the project thickness. Make one conservative test, disconnect power before adjusting, and measure the result from the same reference that controlled the cut. Repeat the accepted setting once before using it on finished stock.`,
    read: () => `Inspect the test for the defect the setup can actually create: taper, out-of-square ends, burning, torn grain, chatter, ridges, breakout, inconsistent depth, or a wandering cut. Mark where the defect starts because its location often identifies support, feed, alignment, or cutter condition.`,
    confirm: () => `Verify the result with a square, straightedge, calipers, mating sample, or measured diagonal as appropriate. A scale or fence cursor is a convenience; the workpiece is the evidence that the complete setup is correct.`,
    troubleshoot: () => `When the result drifts, stop the machine and restore the baseline. Check workholding and stock, then cutter condition, alignment, support, feed direction, and measurement—one variable at a time—before making another test.`,
    practice: () => `Choose a small shop fixture or simple project with repeated parts. Label the first accepted test, use the unchanged setup for the batch, and compare the first and last parts to see whether the reference remained stable.`,
  }
  if (/sharpen|hone|grind|chisel|hand plane|handsaw|hand saw|spokeshave|drawknife|scraper|rasp|file|surform/i.test(title)) return {
    start: (activity) => `Begin ${activity} with stable workholding, good light, and a close inspection of the edge, sole, back, teeth, or cutting surface. Repair damage with a coarse step first; polishing cannot remove a rounded reference or deep nick efficiently.`,
    test: () => `Make the shortest controlled test that reveals the edge: pare end grain, take a thin shaving, saw beside a line, or shape a known curve. Note force, surface quality, and whether the tool follows its reference before changing an angle or abrasive.`,
    read: () => `Look at both the cut surface and the tool. Chatter, a shiny wear line, crushed fibers, a drifting kerf, torn grain, or a burr that will not disappear each points to a different correction. Extra force is a warning, not a sharpening strategy.`,
    confirm: () => `Repeat the same cut in the same scrap after the correction. The edge should start predictably, require less force, and leave a surface appropriate to the operation without losing control at the end of the stroke.`,
    troubleshoot: () => `Return to the reference surface first: a flat stone, registered guide, straight saw plate, clean sole, or secure workpiece. Change one angle, abrasive, or body-position variable and repeat the identical test.`,
    practice: () => `Practice on a small hook, frame, or box whose joints can be checked with a square and straightedge. Keep one labeled offcut that records the accepted edge preparation and body position.`,
  }
  if (/measure|layout|square|cut list|diagram|plan|kerf|story|template|angle|board.?foot|estimate|scale|marking/i.test(title)) return {
    start: (activity) => `Begin ${activity} by writing the finished dimension and choosing the one face, edge, centerline, or full-size pattern that will control it. Check the measuring tool against a known reference before transferring the value to stock.`,
    test: () => `Solve one representative part completely: include actual stock thickness, saw kerf, milling allowance, joinery shoulders, hardware clearance, and the waste needed around defects. Then make or mock up that part and compare the physical result with the drawing.`,
    read: () => `When parts disagree, do not average the error. Trace both measurements back to their reference edges, tool offsets, and sequence. A repeated error points to the setup; a random error points to marking, stock movement, or reading the wrong face.`,
    confirm: () => `Close the loop with a physical check: flip-test a square, compare case diagonals, stack repeated parts, fit the hardware, or place the story stick against the actual opening. Record the correction on the plan before cutting the batch.`,
    troubleshoot: () => `Return to the last dimension that can be verified independently. Check units, nominal versus actual size, zero points, blade-side allowance, and accumulated dimensions before changing a part that may already be correct.`,
    practice: () => `Lay out a five-part box or frame from one story stick, then stack the repeated pieces and compare diagonals in the dry assembly. The exercise exposes transfer errors without risking expensive stock.`,
  }
  if (/lumber|wood species|grain|moisture|plywood|mdf|particleboard|veneer|oak|maple|walnut|poplar|pine|cedar|movement/i.test(title)) return {
    start: (activity) => `Begin ${activity} by inspecting the actual board or panel under good light. Measure thickness and moisture where relevant, sight both faces and edges, mark defects, identify grain direction, and note which surfaces must remain visible.`,
    test: () => `Map the cut list onto the real stock before milling. Leave extra material around checks, knots, end splits, sapwood, veneer damage, and boards that need to straighten; then mill one representative piece and let it rest before committing the batch.`,
    read: () => `Watch what the stock does after the first face or edge is exposed. New bow, cup, or twist signals released stress or a moisture difference; torn grain identifies changing fiber direction; a thin face veneer limits how aggressively a panel can be sanded.`,
    confirm: () => `Measure the rested part again, confirm that the reference face remains flat, and check that the planned joinery leaves enough sound material. For a wide solid-wood part, verify that the attachment allows movement across the grain.`,
    troubleshoot: () => `If stock moves, stop milling it thinner. Let it equalize, reassess the usable dimensions, and decide whether to remill, rip and reglue, shorten the part, or replace it. Do not force unstable stock flat with joinery alone.`,
    practice: () => `Buy one modest board, photograph or sketch both faces, mark a small cut list around its defects, and compare the predicted yield with the milled parts. Save an end-grain offcut as a reference.`,
  }
  return {
    start: (activity) => `Begin ${activity} by defining the finished result, the reference that controls it, and the condition that would make the operation unsafe or unsuccessful. Prepare the actual stock, hardware, drawing, and protection before changing a setup.`,
    test: () => `Use a matching sample or a reversible mockup to test the most uncertain step. Measure the result with the tool that matches the promise, change one variable, and repeat before committing finished material.`,
    read: () => `Inspect the result before continuing. Mark the first point where the work departs from the drawing, fit, surface, or load path; that evidence is more useful than sanding, tightening, or filling until the symptom disappears.`,
    confirm: () => `Repeat the accepted setup once and record the measurement. Two matching results provide a practical check that the reference is stable and the method can be carried into the project.`,
    troubleshoot: () => `Restore the last known-good reference, then check stock condition, workholding, sharpness, alignment, support, sequence, and measurement one at a time.`,
    practice: () => `Use the method on a small, low-risk shop project where the result remains visible and easy to measure. Keep the labeled sample and one note about the correction that mattered.`,
  }
}

function finishAndCommission(guide, subject) {
  const title = guide.title.toLowerCase()
  if (/bird feeder/i.test(title)) return [
    `Ease exposed edges on ${subject}, keep drainage paths open, and make the seed tray, roof, or cleanout removable without special tools. Avoid ledges and closed corners that trap wet seed or droppings.`,
    `Finish only the exterior surfaces with a fully cured outdoor product suited to the wood and exposure, keeping food-contact areas clean. Mount the feeder where it can be taken down safely, then follow current feeder-cleaning guidance and remove it temporarily when disease is observed.`,
  ]
  if (/birdhouse/i.test(title)) return [
    `Ease sharp exterior edges on ${subject}, but leave the interior rough enough for the intended species and do not add a perch. Provide the drainage, ventilation, clean-out access, entrance size, and entrance height from the current species plan before assembly closes those surfaces.`,
    `Leave the interior of ${subject} unfinished. If the conservation plan permits exterior color or coating, test it on an offcut and allow a full cure before installation. Mount it in the specified habitat and height, then clean and monitor it on the recommended schedule.`,
  ]
  if (/bat house/i.test(title)) return [
    `Keep every interior surface of ${subject} untreated, rough, and free of plastic mesh or protruding fasteners. Seal exterior seams against rain while preserving the narrow chamber dimensions and open landing surface in the current conservation design.`,
    `Choose exterior color and sun exposure for the regional climate, not for decoration alone. Mount the cured house to solid structure with the required open flight space below, then monitor temperature and occupancy without disturbing roosting bats.`,
  ]
  if (/pollinator hotel/i.test(title)) return [
    `Leave the replaceable nesting material in ${subject} untreated and protect it with a roof that sheds water. Smooth the exterior frame, but keep nest holes clean, correctly sized for the selected design, and free of ragged fibers.`,
    `Install the cured frame in the recommended orientation and replace soiled or damaged nesting inserts instead of allowing parasites and mold to accumulate. A maintainable small habitat is more useful than a large sealed ornament.`,
  ]
  if (/outdoor|garden|patio|pergola|porch|hammock|planter|raised bed|compost|firewood|hose/i.test(title)) return [
    `Before finishing ${subject}, ease exposed edges and seal vulnerable end grain without blocking drainage or trapping moisture. Keep weep gaps, fastener inspection points, moving joints, and soil or ground clearances open.`,
    `Test the exterior schedule for ${subject} on an offcut and follow its preparation and cure requirements. After installation, wet the project once, confirm that water leaves every horizontal pocket, and inspect finish, splits, fasteners, and supports before seasonal damage becomes structural.`,
  ]
  if (/cutting board|serving board|cheese board|recipe box|butcher-block|kitchen island/i.test(title)) return [
    `Remove glue contamination and ease every handling edge on ${subject} without creating a groove that traps food or water. Sand with the grain to the stopping grit specified for the chosen finish, and keep one labeled sample from the same stock.`,
    `Use only an adhesive and fully cured finish whose maker supports the intended exposure of ${subject}. Wash cutting and serving pieces by hand, dry them upright, and inspect seams and deep knife damage before reuse; soaking and dishwashers accelerate movement and joint failure.`,
  ]
  if (/child|kids|toy|dollhouse|growth chart|pet|dog|cat/i.test(title)) return [
    `Round every touch edge on ${subject}, capture or cover hardware, and inspect for splinters, pinch points, detachable pieces, and climbing leverage before applying finish. Prove the complete schedule on an offcut and allow the stated full cure.`,
    `Commission ${subject} with a cautious, progressive stability check appropriate to its intended use. Anchor top-heavy or climbable work to suitable structure and recheck fasteners, edges, fabric, and finish regularly instead of assuming the first inspection lasts forever.`,
  ]
  if (/jig|sled|guide|template|insert|bench hook|shooting board|winding sticks|cauls|stop block|push-block|push-stick|shop|tool cart|workbench|router table|drill press table/i.test(title)) return [
    `Finish ${subject} only where a coating improves durability without changing a reference. Keep fences, stops, insert edges, clamping faces, cutter clearances, and high-friction workholding surfaces clean; wax sliding faces lightly only after the jig passes its test.`,
    `Label the cutter path, setup limits, date, and accepted calibration directly on ${subject}. Before service, repeat the defining test and inspect every runner, screw, knob, guard, stop, and hold-down; retire the fixture when wear changes the result or control.`,
  ]
  return [
    `Before finishing ${subject}, remove milling marks and glue contamination. A common furniture sequence is 100 or 120, then 150 or 180 grit, but the wood and finish instructions control the stopping point. Vacuum between grits and inspect across the grain in raking light instead of sanding by elapsed time.`,
    `Run the complete finish schedule on an offcut from this project. Record the preparation, color step, coat count, temperature, and cure time. After full cure, commission ${subject} gradually: check stability, moving parts, fasteners, and supports before applying the expected load or placing it into everyday use.`,
  ]
}

function buildSections(guide) {
  const subject = cleanSubject(guide.title)
  const projectLabel = subject.toLowerCase().replace(/^(?:a|an|the)\s+/, '')
  const shortProjectLabel = projectLabel.split(/\s+(?:with|for|from|that|using|in)\s+/i)[0]
  const profile = projectProfile(guide)
  const facts = usefulFacts(guide)
  const plan = guide.dimensions?.imperial ? {
    size: guide.dimensions.imperial,
    metric: guide.dimensions.metric,
    stock: guide.materials?.find((item) => item.name === 'Primary stock')?.quantity ?? 'stock sized to the cut list',
    joinery: guide.materials?.find((item) => item.name === 'Joinery supplies')?.notes ?? 'project-appropriate joinery',
  } : planFor(guide)
  const parts = (guide.cutList ?? []).slice(0, 6).map((part) => `${part.quantity} ${part.part.toLowerCase()} at ${part.thickness} × ${part.width} × ${part.length}`)
  const hours = Math.max(2, Math.round((guide.activeMinutes ?? 240) / 60))
  const promisedList = guide.sections.find((section) => ['literal-list', 'literal-plan', 'ranked-list'].includes(section.id))
  const finishParagraphs = finishAndCommission(guide, `the ${shortProjectLabel}`)
  return [
    {
      id: 'plan-at-a-glance',
      heading: `Plan ${subject.toLowerCase()} before cutting`,
      paragraphs: [
        `The starting dimensions for ${subject.toLowerCase()} are ${plan.size} (${plan.metric}). Before buying stock, verify the actual opening, user, hardware, environment, or installation that controls the project and revise the cut list where needed.`,
        `${profile.focus} This ${shortProjectLabel} uses ${plan.stock} and ${plan.joinery}. Plan on about ${hours} active shop hours, plus the adhesive and finish cure time before the piece goes into service.`,
      ],
      bullets: [`Finished starting size: ${plan.size}`, `Metric reference: ${plan.metric}`, `Primary stock: ${plan.stock}`, `Joinery route: ${plan.joinery}`, `Active shop time: about ${hours} hours`],
    },
    {
      id: 'design-decisions',
      heading: `Resolve the details that make ${subject.toLowerCase()} work`,
      paragraphs: [
        `Before laying out the ${shortProjectLabel}, identify the dimension or condition that controls function. Use the real opening, working height, object, mounting location, or operating clearance and build outward from it instead of scaling a photograph.`,
        `Draw the views needed for ${subject.toLowerCase()} and mark grain direction, the load path, moving parts, and hardware. When a feature depends on proprietary hardware, keep its current drawing beside the cut list and fit a sample before cutting finished parts.`,
      ],
      bullets: profile.checks,
      callout: { tone: 'decision', title: 'What this plan can—and cannot—decide', body: `The dimensions are a practical starting point. Building code, structural spans, hanging loads, child safety, wildlife needs, and manufacturer clearances must be resolved from current local or product-specific guidance.` },
    },
    ...(promisedList ? [{
      id: 'literal-list',
      heading: promisedList.heading,
      paragraphs: [`Treat every item in this ${shortProjectLabel} list as its own small project with defined stock, hardware, safety, and finish requirements. Make one prototype before batching repeated parts.`],
      bullets: promisedList.bullets,
    }] : []),
    {
      id: 'cut-and-layout',
      heading: `Prepare and cut the parts from shared references`,
      paragraphs: [
        `Choose the straightest stock for the longest ${shortProjectLabel} parts, then mark one reference face and edge. Lay out visible defects before cutting, and make paired parts from one stop so a small measuring difference cannot twist the assembly.`,
        `Nest the cut list for ${subject.toLowerCase()} with kerf and milling allowance included. Cut the largest parts first, label show faces immediately, and verify the first repeated part against the drawing before producing the rest.`,
      ],
      bullets: parts.length ? parts : ['Prepare the controlling parts first.', 'Leave setup stock for the critical joint.', 'Label every reference face and mating pair.'],
    },
    {
      id: 'joinery-and-dry-fit',
      heading: `Cut the joinery and prove the dry fit`,
      paragraphs: [
        `Test the chosen joinery and fastening method in matching scrap before touching project stock. The ${shortProjectLabel} uses ${plan.joinery}; use the actual stock thickness and accept only a joint that seats by hand or ordinary clamp pressure.`,
        `Dry-assemble the ${shortProjectLabel} and check its functional dimensions first. Compare diagonals where the form should be square, place the assembly on a known-flat surface, cycle its hardware, and rehearse the real glue-up order.`,
      ],
      bullets: profile.sequence,
    },
    {
      id: 'assembly',
      heading: `Assemble in a sequence that preserves access and square`,
      paragraphs: [
        `Before assembling the ${shortProjectLabel}, stage its clamps, cauls, fasteners, square, and cleanup supplies. Join the smallest stable subassemblies first, recheck them under pressure, and respect the adhesive maker’s handling and cure times.`,
        `Predrill the parts for ${subject.toLowerCase()} near ends and edges, verify every screw length against the real joint, and stop when the parts seat. Where wide solid wood crosses a rigid frame, use hardware or slots that hold it flat while permitting movement across the grain.`,
      ],
      bullets: [`1. Arrange the parts in assembly order.`, `2. Dry-clamp and compare the controlling dimensions.`, `3. Apply a continuous, appropriate adhesive film.`, `4. Close the joints without distorting the assembly.`, `5. Check square, level, and hardware clearance again.`, `6. Leave the assembly undisturbed for the stated clamp and cure schedule.`],
    },
    {
      id: 'finish-and-commission',
      heading: `Finish, cure, and put ${subject.toLowerCase()} into service`,
      paragraphs: finishParagraphs,
      bullets: facts.slice(0, 5),
    },
    {
      id: 'troubleshooting',
      heading: `Fix the first cause, not the last symptom`,
      paragraphs: [
        `${profile.failure} On this ${shortProjectLabel}, mark the contact point or measured error, return to the last known reference, and change one variable at a time. Random sanding, added clamp pressure, and filler can erase the evidence without fixing the cause.`,
        `If the finished ${shortProjectLabel} rocks, binds, racks, or opens a joint after cure, take it out of service when the failure affects a load path. Inspect moisture, fastener engagement, grain direction, hardware alignment, and its floor or wall support before choosing a repair.`,
      ],
      bullets: [...profile.checks.map((check) => `Verify: ${check}`), ...facts.slice(0, 2).map((fact) => `Also check: ${fact}`)].slice(0, 7),
    },
  ]
}

function comparisonOptions(guide) {
  const beforeColon = guide.title.split(':')[0]
  const split = beforeColon.split(/\s+(?:vs\.?|versus)\s+/i).map((value) => value.trim()).filter(Boolean)
  if (split.length >= 2) return split
  if (guide.id === '499') return ['one vetted project plan', 'a curated plans membership', 'a giant undifferentiated bundle']
  if (guide.id === '497') return ['a focused project library', 'a broad plans membership', 'individual premium plans']
  if (guide.id === '498' || guide.id === '500') return ['a structured project course', 'a membership library', 'live or asynchronous feedback']
  const title = guide.title.toLowerCase()
  if (/muffs vs\. plugs/i.test(title)) return ['earmuffs', 'earplugs']
  if (/overarm vs\. cabinet pickup/i.test(title)) return ['overarm capture', 'below-table cabinet pickup', 'combined overarm and cabinet capture']
  if (/traditional vs\. carbide/i.test(title)) return ['traditional turning tools', 'carbide insert tools']
  if (/universal vs\. dedicated bases/i.test(title)) return ['a universal mobile base', 'a dedicated machine base', 'leveling casters on a purpose-built stand']
  if (/workbench top/i.test(title)) return ['MDF', 'plywood', 'construction lumber', 'hardwood']
  if (/wood glue types/i.test(title)) return ['PVA glue', 'polyurethane glue', 'CA glue', 'hide glue', 'epoxy']
  if (/CNC workholding/i.test(guide.title)) return ['mechanical clamps', 'tape with a compatible adhesive method', 'vacuum workholding', 'tabs or an onion skin']
  if (guide.id === '493') return ['ordinary interior PVA', 'exterior-rated adhesive', 'long-open-time glue or epoxy']
  if (guide.id === '494') return ['a dedicated ripping blade', 'a fine plywood or crosscut blade', 'a general-purpose combination blade']
  if (guide.id === '495') return ['straight or spiral bits for grooves', 'a flush-trim bit', 'a roundover or chamfer bit', 'a rabbeting bit with bearings']
  if (guide.id === '496') return ['a matched disc-and-extraction system', 'sheet abrasives for hand blocks', 'specialty abrasives for finishes and contours']
  const explicitOptions = {
    '074': ['screwed cleats', 'housed dados', 'rabbets at case ends', 'sliding dovetails', 'adjustable shelf pins'],
    '076': ['a four-chisel core set', 'two often-used chisels bought individually', 'a larger matched set after the work proves the need'],
    '092': ['a cabinet rasp', 'a half-round file', 'a Surform-style replaceable blade tool'],
    '103': ['a compact jobsite saw', 'a wheeled full-size jobsite saw', 'a stationary contractor or cabinet saw'],
    '123': ['a 6-inch dado set', 'an 8-inch dado set', 'a plywood-focused set with useful shims and chippers'],
    '136': ['one rail long enough for common crosscuts', 'two matching rails with a connector', 'a short and long rail pair'],
    '138': ['a fine clean-cut blade for plywood', 'a wider blade for straight solid-wood cuts', 'a narrow scrolling blade for tight curves'],
    '143': ['a wide low-tooth blade for resawing', 'a medium general-purpose blade', 'a narrow fine-tooth blade for curves'],
    '161': ['accurate above-table adjustment without a lift', 'a basic removable router lift', 'a premium lift with broad motor and insert support'],
    '168': ['V-groove and engraving bits for signs', 'spiral end mills for pockets and joinery', 'ball-nose bits for 3D carving'],
    '183': ['an entry benchtop planer with straight knives', 'a benchtop planer with indexed inserts or a helical-style head', 'buying surfaced stock or paying a mill by the job'],
    '191': ['a compact benchtop drill press', 'a larger benchtop model with more swing and quill travel', 'a floor-standing press for regular large work'],
    '214': ['a small set for boxes and frames', 'a mixed rack for ordinary furniture', 'a dedicated panel and casework set'],
    '249': ['repair and label the storage already owned', 'build wall and under-bench storage from sheet offcuts', 'buy only the hardware or bins that solve measured gaps'],
    '259': ['a verified HEPA-rated extractor system', 'a high-efficiency retrofit filter approved for the exact vacuum', 'ambient filtration used only as a secondary cleanup layer'],
    '263': ['a disposable filtering facepiece selected for the dust task', 'a reusable half-mask with hazard-matched filters or cartridges', 'higher-coverage or powered protection selected with professional guidance'],
    '266': ['a riving knife and blade guard used with sound technique', 'a contact-response braking saw used with the normal guards', 'workholding, push devices, and operation changes that keep hands farther away'],
    '272': ['the shortest listed cord that meets the tool manual', 'a heavier-gauge listed cord for a longer temporary run', 'a properly installed receptacle instead of routine extension-cord use'],
    '273': ['extinguishers selected for the identified shop hazards', 'an approved closed metal container for contaminated rags', 'code-compliant storage for flammable finishing liquids'],
    '277': ['a compact 5-inch random-orbit sander', 'a low-vibration 5- or 6-inch finishing system', 'an extraction-first sander and dust-extractor package'],
    '288': ['close-fitting long-grain edge joints', 'mortise-and-tenon or loose-tenon joints', 'dowel joints', 'housed plywood joints', 'miters reinforced for their actual load'],
    '350': ['a durable film finish such as polyurethane', 'a penetrating oil schedule', 'a hardwax-oil system with planned maintenance'],
    '383': ['side-mount ball-bearing slides', 'concealed undermount slides', 'wood runners or a center-mount route for lighter work'],
    '425': ['a penetrating exterior oil', 'a maintained clear exterior film', 'paint or another opaque protective system'],
    '452': ['veneer-core plywood', 'MDF-core or combination-core plywood', 'face grades selected separately from the core'],
    '457': ['clear cherry allowed to darken naturally', 'sapele or another available darker species', 'a less expensive local hardwood colored on a sample'],
    '461': ['a pin-type moisture meter', 'a pinless scanning meter', 'a combination meter checked against the species and thickness'],
    '476': ['a compact saw that stores against a wall', 'a full-size jobsite saw on a stable wheeled stand', 'a stationary saw that shares outfeed and assembly space'],
    '477': ['a 120-volt cabinet-style saw for ordinary furniture stock', 'a 240-volt 3-horsepower cabinet saw for frequent heavy ripping', 'a larger industrial package only after capacity and throughput justify it'],
    '479': ['an entry straight-knife benchtop planer', 'a three-knife planer with strong feed and support', 'a segmented or helical-head benchtop planer'],
    '481': ['a long-bed 8-inch dovetail-way jointer', 'an 8-inch parallelogram-bed jointer', 'a jointer-planer combination when changeover and service make sense'],
    '484': ['a shop-built router-table top and fence', 'a complete benchtop router table', 'a floor-standing cast-iron table and lift system'],
    '489': ['one long rail sized to the common sheet cut', 'two shorter rails joined for occasional long cuts', 'a multi-rail system with clamps, splinter strips, and service support'],
    '490': ['a value 5-inch sander with effective extraction', 'a low-vibration professional 5-inch sander', 'a 6-inch system for faster broad-surface work'],
  }
  if (explicitOptions[guide.id]) return explicitOptions[guide.id]
  if (/workbench.*build, buy, or improvise/i.test(guide.title)) return ['build a bench around your workholding', 'buy a complete commercial bench', 'improvise on a stable table or portable top']
  if (/safety gear/i.test(title)) return ['day-one eye, hearing, and dust protection', 'task-specific respiratory, face, and hand protection', 'later comfort and convenience upgrades']
  if (/how many clamps|clamps does/i.test(title)) return ['a minimum assembly set', 'a project-led mixed clamp rack', 'a dedicated large-panel setup']
  if (/measuring tools/i.test(title)) return ['a verified square, rule, and tape', 'joinery layout and transfer tools', 'specialized gauges and calipers']
  if (/tool budget|first 10|minimal hand-tool kit|first set|starter set/i.test(title)) return ['the minimum complete kit', 'a balanced project-led kit', 'specialized additions after repeated need']
  if (/dust collection|dust collector|dust extractor|shop vacuum/i.test(title)) return ['portable high-pressure source capture', 'a balanced small-shop system', 'high-volume fixed-machine collection']
  if (/CNC/i.test(guide.title)) return ['a compact learning system', 'a rigid production-ready package', 'a larger machine after proven demand']
  return ['the simplest route that completes the named operation', 'the general-purpose route sized for ordinary projects', 'the higher-capacity route justified by repeated work']
}

function optionNote(guide, option, index, facts) {
  const value = option.toLowerCase()
  const notes = [
    [/day-one eye, hearing, and dust protection/, 'Start with rated eye protection, hearing protection that fits, and source capture suited to the first tools; these controls belong in the initial tool budget.'],
    [/task-specific respiratory, face, and hand protection/, 'Add these only after identifying the task: particulate filters, vapor cartridges, face shields, chemical gloves, and cut-resistant handling gloves solve different hazards and are not interchangeable.'],
    [/later comfort and convenience upgrades/, 'Aprons, anti-fatigue mats, cooling accessories, and premium storage can improve long sessions, but they come after the protection and extraction required to perform the work safely.'],
    [/overarm capture/, 'An upper hood intercepts dust thrown above the table and works best when it remains close to the stock without hiding the cut or displacing the blade guard.'],
    [/below-table cabinet pickup/, 'Cabinet pickup receives chips carried beneath the table; seal major leaks while preserving motor cooling, tilt travel, controls, and service access.'],
    [/combined overarm and cabinet capture/, 'This is the preferred complete route when the collector and branch sizes can maintain useful airflow at both pickups simultaneously.'],
    [/jobsite/, 'Prioritize this route when the saw must move or store compactly; verify fence travel, stand stability, table support, noise, and dust connections.'],
    [/contractor/, 'This middle-weight table-saw route can trade cabinet mass for mobility and service access; compare the actual trunnion, fence, power, and base design.'],
    [/conventional table saw/, 'A conventional saw can provide equal cutting capacity for less initial cost, but it lacks the compared contact-response brake; guards, a riving knife, workholding, and safe technique remain essential on either route.'],
    [/cabinet table saw/, 'Favor this route for frequent ripping and heavy stock when permanent space, adequate power, outfeed support, and dust collection are already solved.'],
    [/sawstop/, 'Value the contact-response brake as an additional layer of injury mitigation, then include cartridge, compatible blade, bypass, maintenance, and purchase-cost tradeoffs.'],
    [/hand tools?/, 'Favor this route for quiet work, a small footprint, direct feedback, and one-off joinery; budget time for sharpening, workholding, and practice.'],
    [/power tools?/, 'Favor this route when repeatability, stock preparation, or production speed matters; include power, guards, extraction, support, and setup space.'],
    [/marking knife/, 'Use this for precise joinery shoulders and cross-grain lines where a cut fiber and a physical registration edge improve the fit.'],
    [/pencil/, 'Use this for rough layout, orientation marks, curves, and work that will be refined from a separate gauge or stop.'],
    [/dowels?/, 'Dowels offer low-cost loose-tenon reinforcement, but hole spacing and perpendicular drilling must be controlled on both parts.'],
    [/biscuits?/, 'Biscuits are most useful for registration and modest racking help in panels; do not treat the compressed plate as a substitute for a sound load path.'],
    [/dominos?/, 'Domino-style loose tenons buy speed, repeatability, and multiple tenon sizes at a much higher system and consumable cost.'],
    [/four-chisel core set/, 'A 1/4-, 1/2-, 3/4-, and 1-inch core set covers narrow joinery, ordinary mortises, cleanup, and broad paring without paying for rarely used intermediate sizes.'],
    [/two often-used chisels/, 'Buying a narrow chisel and a 3/4- or 1-inch chisel individually concentrates the budget on sizes the first projects use and makes brand mixing harmless.'],
    [/larger matched set/, 'Add a larger matched set only when repeated joinery calls for the missing widths; include flattening, grinding, honing, and handle comfort in the comparison.'],
    [/screwed cleats/, 'Cleats are inexpensive, forgiving, and easy to inspect, but they remain visible and need a clear fastener path into the case side or wall structure.'],
    [/housed dados/, 'A dado registers the shelf and resists load through a shoulder; fit it to the actual shelf thickness and leave enough side material beyond the groove.'],
    [/rabbets at case ends/, 'A rabbet supports a top or bottom at the case edge and simplifies assembly, while exposing an edge that may need banding or a face frame.'],
    [/sliding dovetails/, 'A sliding dovetail mechanically resists withdrawal and can align a case, but long joints demand straight stock, controlled taper, and a complete test in matching material.'],
    [/adjustable shelf pins/, 'Shelf pins preserve adjustability; use a repeatable hole jig, respect the hardware setback, and size the shelf span and edge for the expected load.'],
    [/waterstones?/, 'Waterstones cut quickly and provide many grits, but they wear and need a reliable flattening routine and appropriate water management.'],
    [/diamond plates?/, 'Diamond plates stay flat and work well for coarse repair and routine honing, but plate quality, size, and long-term wear affect value.'],
    [/sandpaper sharpening/, 'Abrasive film on a verified flat substrate lowers the entry cost, but sheets are consumables and a soft or dirty backing ruins the reference.'],
    [/rip blade/, 'A ripping blade favors chip clearance and feed efficiency along the grain; use it when ripping volume justifies changing from a combination blade.'],
    [/^crosscut$/, 'A crosscut blade uses more teeth and geometry intended to sever fibers cleanly across the grain; it trades feed speed and chip clearance for a finer crosscut surface.'],
    [/crosscut blade/, 'A crosscut blade favors clean severing across fibers; verify that its tooth count, hook angle, and machine compatibility fit the saw and material.'],
    [/combination blade/, 'A combination blade reduces blade changes and suits mixed ordinary work, but it will not equal a dedicated rip or fine crosscut blade at the extremes.'],
    [/thin-kerf/, 'Thin kerf reduces waste and power demand, but the plate is less resistant to deflection and must suit the riving knife and saw.'],
    [/full-kerf/, 'Full kerf provides a stiffer plate for a capable saw, with more waste and power demand; confirm riving-knife and brake-cartridge compatibility.'],
    [/10-inch/, 'A 10-inch miter saw usually costs and weighs less and can be easier to keep true; test its real crosscut and vertical capacity against planned stock.'],
    [/12-inch/, 'A 12-inch miter saw adds capacity but also blade cost, mass, storage depth, and possible deflection; buy that capacity only when projects use it.'],
    [/non-sliding/, 'A non-sliding saw has fewer moving interfaces and a shallower footprint, but less crosscut capacity.'],
    [/sliding saw|sliding miter/, 'A sliding saw handles wider work, but rail or arm travel, rear clearance, head play, and dust capture deserve a hands-on check.'],
    [/track saw/, 'A track saw excels at supported sheet breakdown and portable straight cuts; include rails, connectors, splinter strips, clamps, and blade cost.'],
    [/table saw/, 'A table saw excels at repeated parallel sizing and jig-based joinery once infeed, outfeed, guarding, power, and footprint are solved.'],
    [/miter saw/, 'A miter saw earns space through repeated crosscuts with full fence and stock support; it does not replace controlled ripping or sheet breakdown.'],
    [/circular saw/, 'A circular saw and straightedge offer low-cost portable breakdown; accuracy depends on support, measured offset, blade quality, and a stable guide.'],
    [/barrel-grip/, 'A barrel grip lowers the hand near the work and can feel controlled in curves, but switch access and comfort depend heavily on the user.'],
    [/top-handle/, 'A top handle offers familiar one-hand positioning and trigger access, but raises the grip above the cut; test visibility and control in actual cutting posture.'],
    [/fine clean-cut blade/, 'Choose a sharp, fine-tooth or suitable reverse-tooth blade for the visible plywood face, then confirm which face stays clean with a test because tooth direction changes the breakout side.'],
    [/wider blade for straight/, 'A wider, thicker blade tracks a straight solid-wood cut better than a scrolling blade; keep the base supported and do not force a turn the blade cannot make.'],
    [/narrow scrolling blade/, 'A narrow blade turns tighter curves; use relief cuts, enough teeth in the stock, and a feed rate that lets the gullets clear without bending the blade.'],
    [/benchtop/, 'Benchtop machines save floor space and entry cost, but shorter tables, lower mass, smaller capacity, and stand stability can limit long or heavy stock.'],
    [/floor-standing|full-size/, 'A floor-standing or full-size machine adds mass, support, and capacity at the cost of permanent space, difficult moving, power, and higher extraction demand.'],
    [/trim router/, 'A trim router is easier to balance for edge work and light joinery; it gives up collet size, plunge options, and sustained heavy-cut capacity.'],
    [/full-size router/, 'A full-size router handles larger shanks and demanding cuts, but weight and base size can make small edge work less comfortable.'],
    [/fixed base/, 'A fixed base is compact and predictable for edge work and table mounting; stopped cuts need a safe entry strategy.'],
    [/plunge router/, 'A plunge base starts and stops cuts inside the work and supports depth staging, with more height, cost, and moving parts.'],
    [/upcut/, 'An upcut spiral clears chips and leaves a cleaner bottom face, while tending to lift fibers at the top and pull lightly held work upward.'],
    [/downcut/, 'A downcut spiral protects the top face and pushes work down, but packs chips into a deep slot unless depth and extraction are controlled.'],
    [/compression/, 'A compression bit can clean both faces only when the cutting depth engages both flute directions; shallow passes may expose the wrong geometry.'],
    [/6-inch dado set/, 'A 6-inch stack reduces rotating mass and supplies ample depth for most cabinet dados when the saw manual permits it; confirm the arbor and available throat plate.'],
    [/8-inch dado set/, 'An 8-inch stack adds depth and rotating mass; choose it only when the exact saw permits the set and planned joinery uses the extra capacity.'],
    [/plywood-focused set/, 'A plywood-focused stack earns its place through useful undersized combinations and fine shims that fit real panel thickness without a loose joint.'],
    [/^desktop$/, 'A desktop CNC keeps cost, power demand, and footprint manageable for signs and small parts; verify the usable work envelope after clamps, spindle clearance, and tool changes.'],
    [/^cnc$/, 'A conventional gantry CNC provides a fixed machine envelope and automated toolpath execution; include spoilboard area, dust control, workholding, software, and supervision in the system.'],
    [/shaper-style handheld/, 'A guided handheld routing system brings digital path correction to work that may be larger than a fixed bed, while operator support, depth staging, workholding, and proprietary files remain central.'],
    [/v-groove and engraving bits/, 'V-bits trade width for depth and suit lettering or chamfers; angle, tip condition, material flatness, and zero accuracy determine line width.'],
    [/spiral end mills for pockets/, 'Upcut, downcut, and compression end mills manage chips and face quality differently; choose flute direction, diameter, and reach from the pocket and sheet material.'],
    [/ball-nose bits/, 'Ball-nose bits leave a smoother 3D toolpath when step-over is small enough; model detail, finishing time, flute length, and machine rigidity set the useful diameter.'],
    [/jointer/, 'A jointer establishes one flat face and one straight square edge; table length, cutter width, guard, fence, power, and dust collection define useful capacity.'],
    [/planer/, 'A planer makes one face parallel to the reference on its bed; it does not remove twist or cup unless the work is first stabilized.'],
    [/helical/, 'A helical or segmented head can reduce noise and localize edge replacement, but insert geometry, head quality, initial cost, and replacement access vary.'],
    [/straight-knife|three-knife/, 'Straight knives offer a lower entry cost and familiar surface, but setup, full-width damage, noise, and sharpening or replacement affect ownership.'],
    [/drill press/, 'A drill press earns its footprint through perpendicular holes, repeatable depth, and controlled larger bits; quill travel, table support, speed change, and runout matter.'],
    [/hand drill/, 'A hand drill remains faster and more flexible for assembly and large work, with guides or jigs needed when perpendicularity and repeated depth control the result.'],
    [/forstner/, 'Forstner bits make controlled flat-bottomed or overlapping holes, but demand secure workholding, appropriate speed, and chip clearing.'],
    [/brad-point/, 'Brad-point bits locate cleanly in wood and reduce wandering; point quality and backing still control the exit surface.'],
    [/twist bits?/, 'Twist bits are versatile and easy to source, but standard geometry may wander or tear more in wood than a sharp brad-point bit.'],
    [/traditional/, 'Traditional turning tools can cut cleanly and offer many profiles, but require a repeatable sharpening system and practiced presentation.'],
    [/carbide/, 'Carbide insert tools simplify edge maintenance and learning, while insert shape, scraping action, replacement cost, and surface quality still matter.'],
    [/\bMDF\b/i, 'MDF is flat and machines to a uniform painted edge, but it is heavy, makes fine dust, dislikes moisture, and needs suitable fasteners and emissions-compliant stock.'],
    [/plywood/, 'Plywood offers a strong weight-to-stiffness balance and better screw holding than MDF edges; core voids, veneer thickness, flatness, and grade vary.'],
    [/hardwood/, 'Solid hardwood provides durable edges and repairability, while adding milling time, movement across the grain, and higher material cost.'],
    [/construction lumber/, 'Laminated construction lumber can make a thick, repairable bench top economically; expect drying, knot, pitch, twist, and milling work, and select every board deliberately.'],
    [/particleboard/, 'Particleboard can be flat and economical under laminate, but edge fasteners, unsupported spans, moisture, weight, and hardware compatibility limit where it belongs.'],
    [/^frameless$/, 'Frameless cabinets use the case sides as the front structure, maximizing access and making panel squareness, edge treatment, and system-hole accuracy highly visible.'],
    [/face-frame cabinets/, 'A face frame stiffens and finishes the cabinet front and tolerates some installation irregularity, while reducing opening width and adding frame joinery and overlay decisions.'],
    [/side-mount ball-bearing slides/, 'Side-mount slides are visible with the drawer open and usually tolerate straightforward installation; box clearance and parallel mounting must match the exact drawing.'],
    [/concealed undermount slides/, 'Undermount slides hide beneath the drawer and can add refined motion, but require slide-specific box dimensions, bottom recesses, locking devices, and careful setback.'],
    [/wood runners|center-mount route/, 'Wood runners keep the mechanism simple and repairable for light drawers; allow seasonal clearance, control wear surfaces, and use stops that cannot release accidentally.'],
    [/pin-type moisture meter/, 'Pin meters can compare surface and deeper readings with appropriate probes and correction, at the cost of small holes and sensitivity to probe orientation and contact.'],
    [/pinless scanning meter/, 'Pinless meters scan quickly without holes, but need flat contact and correct density or species settings and can be affected by thickness and material beneath the board.'],
    [/combination meter/, 'A combination meter is useful when both scanning and targeted probe readings are routine; verify each mode independently instead of assuming they should display identical numbers.'],
    [/leg vise/, 'A leg vise offers deep vertical capacity and strong clamping with simple jaws, but needs a parallel guide or other anti-racking strategy.'],
    [/quick-release/, 'A quick-release vise speeds frequent repositioning, with more mechanism, installation geometry, and maintenance to consider.'],
    [/face vise/, 'A conventional face vise is versatile and widely supported; jaw width, rack resistance, screw placement, and bench clearance set performance.'],
    [/F-clamps?/, 'F-clamps are fast and versatile for small assemblies; pad area, throat depth, bar deflection, and the number needed limit large panels.'],
    [/parallel clamps?/, 'Parallel clamps provide broad jaws and stand-up panel support, with high weight, storage demand, and purchase cost.'],
    [/pipe clamps?/, 'Pipe clamps scale economically by changing pipe length, but weight, staining risk, jaw alignment, and pipe quality require management.'],
    [/shop vacuum/, 'A shop vacuum provides high static pressure through smaller hoses for portable tools, but limited air volume for large machine ports.'],
    [/dust extractor/, 'A dust extractor adds tool-triggering, filtration, and hose systems suited to portable tools, at a higher price and often proprietary accessory cost.'],
    [/dust collector/, 'A dust collector moves higher air volume through larger duct for stationary machines; filters, impeller safety, duct design, noise, and floor space are part of the system.'],
    [/single-stage/, 'A single-stage collector is simpler and cheaper, while chips reach the filter and can reduce airflow quickly.'],
    [/cyclone/, 'A cyclone separates most chips before the filter and supports larger systems, at greater height, cost, and installation complexity.'],
    [/2½-inch/, 'A 2½-inch hose is flexible and suits high-pressure shop-vac sources; it cannot create the air volume expected by a large machine port.'],
    [/4-inch/, 'A 4-inch path supports higher-volume collection when the blower and duct design can supply it; reducers, flex hose, and sharp bends consume capacity.'],
    [/safety glasses/, 'Safety glasses suit routine flying-particle hazards when they carry the applicable impact rating and side coverage.'],
    [/goggles/, 'Goggles add more complete dust or splash sealing, but fogging, ventilation design, and compatibility with a respirator matter.'],
    [/face shields?/, 'A face shield protects more of the face from impact or splash and is worn over—rather than instead of—primary eye protection.'],
    [/earmuffs?/, 'Earmuffs are fast to put on and easier to verify visually, but glasses, hair, respirator straps, heat, and head shape can break comfort or seal.'],
    [/earplugs?/, 'Earplugs are light and compatible with many other protectors, but clean insertion, correct size, training, and individual fit determine real attenuation.'],
    [/universal mobile base/, 'A universal base can fit several footprints at lower cost, but the assembled frame, wheel placement, fasteners, and center of gravity must suit the actual machine.'],
    [/dedicated machine base/, 'A dedicated base usually fits the machine and controls its footprint better, at a higher price and with less reuse if the machine changes.'],
    [/leveling casters/, 'Leveling casters combine mobility with feet that carry the working load; verify total rating, mounting structure, floor clearance, and stability.'],
    [/5-inch/, 'A 5-inch sander offers broad abrasive availability, lower mass, and good control on ordinary furniture parts.'],
    [/6-inch/, 'A 6-inch sander covers area faster and often pairs with professional extraction, but costs more and is less nimble on narrow work.'],
    [/mesh/, 'Mesh abrasives expose more open area to extraction and resist some loading, while edge durability, pad protection, and scratch consistency vary by system.'],
    [/paper sanding/, 'Paper-backed discs are widely available and can cut consistently, but hole alignment, loading, backing tears, and dust path affect life.'],
    [/repair and label the storage/, 'Begin here: discard unsafe scraps, repair drawers and holders, label homes, and change shelf spacing before spending money on another container.'],
    [/build wall and under-bench storage/, 'Use measured offcuts for cleats, dividers, shallow trays, and tool-specific holders; wall loads still need verified framing or suitable masonry anchors.'],
    [/buy only the hardware or bins/, 'Spend the remaining budget on repeatable bins, hooks, labels, or slides that fill dimensions already measured and can be replaced later.'],
    [/card scraper/, 'A tuned card scraper can remove difficult grain without a field of abrasive scratches, but edge preparation and surface flatness require practice.'],
    [/sandpaper/, 'Sandpaper handles broad surfaces and controlled scratch refinement, with dust extraction, grit sequence, and fresh abrasive determining the result.'],
    [/hardwax-oil|hardwax oil/, 'Hardwax oil emphasizes a close-to-wood look and localized maintenance, but water, heat, chemical resistance, and refresh schedules vary by product.'],
    [/penetrating oil/, 'A penetrating oil is easy to renew and keeps a close-to-wood feel, but generally provides less standing-water, heat, and scratch protection than a sound film.'],
    [/durable film finish|oil-based polyurethane/, 'A polyurethane or other suitable film separates the wood from spills and abrasion, while cure time, repair visibility, heat limits, and safe solvent handling remain part of the choice.'],
    [/^oil$/, 'Oil-based polyurethane usually warms the wood color and builds a durable film with longer dry time and stronger solvent-control needs; verify the exact product schedule.'],
    [/polyurethane for tables/, 'Polyurethane creates a more continuous spill- and abrasion-resistant film than hardwax oil, but spot repairs are more visible and full cure still controls service.'],
    [/water-based polyurethane/, 'Water-based polyurethane generally preserves a lighter color and recoats faster, while grain raising, lap control, and product compatibility need a sample.'],
    [/PVA glue/i, 'PVA is the ordinary furniture choice for close-fitting porous wood joints; select the exact formulation by exposure, open time, temperature, and clamp schedule.'],
    [/polyurethane glue/i, 'Polyurethane adhesive tolerates some material and moisture conditions that PVA does not, but foaming does not fill a structural gap and cleanup and skin protection matter.'],
    [/CA glue/i, 'CA glue cures quickly and suits small repairs, jigs, and temporary fixturing; brittleness, gap size, blooming, fumes, and short working time limit structural use.'],
    [/hide glue/i, 'Hide glue offers reversibility and traditional repair advantages, with temperature, gram strength, open time, and fresh preparation affecting the joint.'],
    [/epoxy/, 'Epoxy can bridge controlled gaps and bond varied materials when the exact formulation permits it; ratio, mixing, temperature, sensitization, and full cure are critical.'],
    [/dye/, 'Dye colors wood by dissolved colorant and can emphasize figure, with concentration, solvent, fading, and end-grain absorption controlled on samples.'],
    [/pigment/, 'Pigment lodges in pores and surface texture, making sanding quality, binder, wiping, and grain structure visible in the result.'],
    [/HVLP turbine/i, 'A turbine is a self-contained air source sized as a system; stage count, heat, hose length, noise, and needle/nozzle availability shape the finish.'],
    [/compressor spray/, 'A conversion or compressor-fed gun can be flexible when adequate clean, dry air already exists; compressor duty cycle and air treatment belong in the cost.'],
    [/red oak/, 'Red oak is widely available and open-pored, but its pore structure and decay resistance make it a poor substitute for white oak outdoors.'],
    [/white oak/, 'White oak offers tyloses and better natural durability than red oak, while species verification, movement, weight, and price still matter.'],
    [/poplar/, 'Poplar machines easily and paints well when defects and green or purple color are hidden by an opaque schedule; it dents more readily than many hardwoods.'],
    [/pine/, 'Pine is light, inexpensive, and easy to source, while knots, pitch, softness, and blotching demand selection and a tested paint or color schedule.'],
    [/dewalt/, 'DEWALT’s DCW600 route makes the most sense for a shop already invested in compatible 20V MAX batteries; verify the exact kit, bases, guide, dust accessories, collet, and current manual.'],
    [/makita/, 'Makita’s XTR01 route makes the most sense for a shop already invested in compatible 18V LXT batteries; verify the exact kit, bases, guide, dust accessories, collet, and current manual.'],
    [/corded/, 'Corded routers offer sustained power without battery management, with the cord, outlet, and hose routed so they cannot catch the work.'],
    [/cordless/, 'Cordless routers remove a cord from the cut and suit short mobile work, while battery cost, runtime, balance, and platform commitment shape value.'],
    [/premium/, 'Pay the premium only for a measurable improvement in geometry, durability, adjustment, comfort, warranty, or replacement support that appears in planned work.'],
    [/budget/, 'A budget option can be excellent after flattening, tuning, or setup; include that labor and reject defects that cannot be corrected safely.'],
  ]
  const matched = notes.find(([test]) => test.test(value))?.[1]
  if (matched) return `${option}: ${matched}`
  const fact = facts[index % Math.max(1, facts.length)]
  const title = guide.title.toLowerCase()
  let framing = 'Treat this as a candidate only after its capacity, setup, control, compatibility, consumables, and failure at the limit have been checked against real projects.'
  if (/plan|course|education|membership/.test(title)) framing = 'Judge this route from complete sample material, instructor or author transparency, corrections, access terms, and whether its project sequence fits the learner and shop.'
  else if (/finish|stain|glue|adhesive|sandpaper|abrasive/.test(title)) framing = 'Test this route on matching scrap and compare the complete schedule, cure or wear behavior, compatibility, cleanup, exposure controls, and maintenance—not the container price alone.'
  else if (/safety|dust|respirator|hepa|extinguisher|extension cord/.test(title)) framing = 'Keep this route only when its rating, fit, compatibility, maintenance, and instructions address the hazard or load actually identified in the shop.'
  else if (/plywood|lumber|wood|oak|maple|walnut|poplar|pine|mdf|particleboard/.test(title)) framing = 'Compare this material in the required thickness and grade for movement, strength, edge durability, machining, finish, availability, and waste from the actual cut list.'
  else if (/saw|router|jointer|planer|drill|lathe|sander|machine|tool|clamp|vise/.test(title)) framing = 'Check this route with the largest ordinary workpiece, current power and extraction, safe stock support, adjustment quality, day-one accessories, and available operating space.'
  return `${option}: ${framing}${fact ? ` Shop check: ${fact}` : ''}`
}

function buyingVerdict(guide, knowledge) {
  const title = guide.title.toLowerCase()
  const subject = decisionSubject(guide.title).split(':')[0]
  if (/safety gear/.test(title)) return 'Buy the protection required by the next operation before buying accessories that merely make the shop more comfortable. Add task-specific protection only after the dust, impact, noise, vapor, splash, cut, or entanglement hazard is identified.'
  if (/hand tools? vs\. power tools?/.test(title)) return 'For a first shop, the most useful answer is usually a hybrid: buy one controlled method for cutting and drilling, then use hand tools for fitting and power tools only where they remove a repeated time or capacity constraint.'
  if (/dowels? vs\. biscuits? vs\. dominos?/.test(title)) return 'Choose biscuits when panel registration is the main job, dowels when a carefully indexed jig meets the project frequency and budget, and a Domino-style system when repeated loose-tenon work pays for its speed and proprietary consumables.'
  if (/table saw dust collection/.test(title)) return 'Plan on lower cabinet pickup plus an effective upper guard or hood whenever the operation permits it. Either pickup alone leaves a predictable part of the dust stream uncontrolled.'
  if (/giant woodworking plan bundles/.test(title)) return 'Do not buy a bundle because it advertises thousands of files. Buy only after complete samples prove that the drawings, cut lists, dimensions, safety notes, authorship, and correction process are coherent.'
  if (/vs\.?|compared|comparison|showdown/.test(title)) return `${knowledge.answer} In ${subject}, choose the route whose specific advantage appears in ordinary work often enough to repay its setup, footprint, accessories, and maintenance; do not pay for a theoretical advantage the next three projects will not use.`
  if (/how many clamps/.test(title)) return 'Buy enough clamps to dry-fit and close the largest planned assembly without stretching every clamp to its limit, then add specialized lengths only when a real glue-up exposes the gap.'
  if (/course|education|membership|plans/.test(title)) return `${knowledge.answer} For ${subject}, pay for the smallest program that shows a coherent learning sequence, complete sample material, current safety instruction, and a clear access and refund policy.`
  if (['008', '009', '249'].includes(guide.id)) return `For ${subject}, give the budget to safety, measurement, workholding, one controlled cutting path, drilling, and surface preparation first. A smaller sound kit with blades, bits, and abrasives is more useful than a larger list of bare tools.`
  if (/glue|finish|sandpaper|abrasive|plywood|lumber|wood|oak|maple|walnut|poplar|pine|mdf|particleboard/.test(title)) return `${knowledge.answer} For ${subject}, decide from a sample and the complete use conditions rather than a category label or shelf price.`
  return `${knowledge.answer} For ${subject}, the right purchase is the smallest complete system that clears every required capacity, safety, compatibility, space, and support check for the next three projects.`
}

function learnSections(guide) {
  const spec = humanLearnGuide(guide)
  if (!spec) throw new Error(`Missing hand-written learn guide for ${guide.id}: ${guide.title}`)
  const isComparison = /\bvs\.?\b|versus/i.test(guide.title)
  const options = comparisonOptions(guide)
  const facts = usefulFacts(guide)
  const promisedList = learnLiteralLists[guide.id] ?? guide.sections.find((section) => ['literal-list', 'literal-plan', 'ranked-list'].includes(section.id))
  const methodBullets = [
    ...spec.steps.slice(1).map((step, index) => `${index + 2}. ${step}`),
    ...spec.checks.slice(0, Math.max(0, 7 - spec.steps.length)).map((check) => `Checkpoint: ${check}`),
  ]
  return [
    {
      id: 'answer-first',
      heading: headingFrom(spec.answer),
      paragraphs: [spec.answer],
    },
    ...(isComparison ? [{
      id: 'option-by-option',
      heading: `Compare ${options.join(' and ')}`,
      paragraphs: [`The useful difference appears in the work: ${spec.answer}`],
      bullets: options.map((option, index) => optionNote(guide, option, index, facts)),
    }] : []),
    ...(promisedList ? [{
      id: promisedList.id,
      heading: promisedList.heading,
      paragraphs: [`Use this promised list as the working checklist for ${cleanSubject(guide.title).toLowerCase()}.`],
      bullets: promisedList.bullets,
    }] : []),
    {
      id: 'setup',
      heading: `Set up: ${headingFrom(spec.setup, 150)}`,
      paragraphs: [spec.setup],
    },
    {
      id: 'working-method',
      heading: `First step: ${headingFrom(spec.steps[0], 150)}`,
      paragraphs: [`1. ${spec.steps[0]}`],
      bullets: methodBullets,
    },
    {
      id: 'read-the-result',
      heading: `A correct result: ${headingFrom(spec.checks[0], 150)}`,
      paragraphs: [spec.checks[0]],
      bullets: spec.checks.slice(1),
    },
    {
      id: 'troubleshooting',
      heading: `If it goes wrong: ${headingFrom(spec.fixes[0], 150)}`,
      paragraphs: [spec.fixes[0]],
      bullets: spec.fixes.slice(1),
    },
    {
      id: 'next-project',
      heading: `Practice: ${headingFrom(spec.practice, 150)}`,
      paragraphs: [spec.practice],
    },
  ]
}

function buyerContext(guide) {
  const title = guide.title.toLowerCase()
  if (/course|education|membership|plans|bundle/.test(title)) return {
    compare: `Compare complete sample lessons or plans, not library size and testimonials. Check authorship, revision dates, dimensional consistency, project sequence, feedback, access terms, licensing, correction support, and whether the work fits the tools and space actually available.`,
    specifications: [
      `The useful specifications are editorial: complete samples, drawings that agree with cut lists, clear units, named hardware, current safety instruction, a visible corrections process, and a sequence that builds skills instead of merely accumulating files.`,
      `Confirm whether access expires, downloads remain usable, feedback is personal or community-based, and project files may be used only personally or also in paid work. A large catalog has little value when its first suitable project cannot be found or trusted.`,
    ],
    cost: `Price the learning path through one completed project. Include the course or membership, required plans or software, stock, hardware, cutters, consumables, and any tools the lesson assumes but does not teach.`,
    costItems: ['Subscription or one-time access price', 'Required plans, software, or digital files', 'Stock and hardware for the first complete project', 'Tools, cutters, and consumables the instruction assumes', 'Feedback or coaching included at this tier', 'Cancellation, download, refund, and licensing terms'],
    fit: [`Buy when the next project is clear, the sample teaching makes sense, and the format supplies feedback or structure that free references have not provided.`, `Wait when the offer sells quantity, urgency, or a dramatic discount without complete samples, named authors, correction support, and access terms you can explain in one sentence.`],
    verify: `Before paying, open more than one complete sample and reconcile its drawing, dimensions, cut list, materials, and written sequence. Search for the instructor or publisher, inspect the update history, and save the current access and refund terms.`,
    verifyItems: ['Complete sample project is available', 'Drawings, dimensions, and cut list agree', 'Author and revision information are visible', 'Safety and tool assumptions are current', 'Correction and support channels are clear', 'Access, download, refund, and license terms are acceptable'],
  }
  if (/hearing|respirator|safety glasses|goggles|face shield|safety gear|extension cord|fire extinguisher|oily-rag|hepa filter/.test(title)) return {
    compare: `Start with the identified hazard and eliminate any option that is not rated, compatible, and practical to use for the complete task. Comfort matters because protection left on a shelf provides no protection, but comfort never substitutes for the required rating or a source-control measure.`,
    specifications: [
      `Read the standard, current instructions, markings, limitations, fit requirements, replacement interval, and compatibility with every other protective device worn at the same time. Marketing words such as “shop,” “professional,” or “heavy duty” are not ratings.`,
      `Prefer controls that reduce the hazard at its source, then use personal protective equipment for the exposure that remains. Inspect seals, straps, lenses, cords, cartridges, containers, and safety devices before relying on them.`,
    ],
    cost: `Price a complete, maintainable safety setup rather than one item. Include fit accessories, replacement filters or plugs, storage, inspection supplies, compatible guards or collection fittings, and the replacement schedule required by the maker.`,
    costItems: ['Correct rating for the identified hazard', 'Fit and compatibility accessories', 'Required replacements and consumables', 'Storage that prevents contamination or damage', 'Source-control equipment used with the item', 'Current instructions and local compliance needs'],
    fit: [`Buy before the operation when the hazard assessment calls for the protection or control and the selected product fits the user and task.`, `Do not improvise from a familiar-looking product, mix incompatible components, or use personal protection as permission to remove guards, ignore ventilation, or keep an unsafe process.`],
    verify: `Confirm the exact product marking, model, instructions, condition, fit, and replacement parts before use. For respiratory, electrical, fire, and workplace requirements, current product guidance and applicable professional or regulatory requirements control.`,
    verifyItems: ['Rating matches the identified hazard', 'Fit can be checked on the actual user', 'Works with other required protection', 'Replacement parts are current and available', 'Instructions and limitations are understood', 'Source control and safe work practice remain in place'],
  }
  if (/glue|polyurethane|finish|stain|hardwax|dye|pigment|plywood|mdf|particleboard|oak|maple|walnut|poplar|pine|sandpaper|sanding disc|mesh|card scraper|moisture meter/.test(title)) return {
    compare: `Compare these materials and consumables on matching samples and the actual use conditions. Species, surface preparation, exposure, shelf life, coverage, cure, grit system, panel core, and available replacement stock matter more than a category label or the lowest unit price.`,
    specifications: [
      `Translate the label or grade into a shop consequence: open time, cure, film build, solids, abrasive backing, grit availability, panel flatness, veneer thickness, moisture range, movement, machining, repairability, or expected maintenance.`,
      `Keep the exact product and batch with the sample result. Similar names can hide different chemistry, cores, veneers, adhesives, abrasive standards, or application limits, so do not transfer a result from one product without checking.`,
    ],
    cost: `Price the usable result, not the container or sheet alone. Include sample stock, waste and defects, applicators or backers, compatible thinner or cleaner, required grits, protective equipment, coverage, cure time, and likely maintenance or replacement.`,
    costItems: ['Enough usable material for the cut list or coverage', 'Expected waste, defects, and sample pieces', 'Compatible applicators, backers, or cutters', 'Surface preparation and cleanup supplies', 'Protection, ventilation, and disposal needs', 'Maintenance, shelf life, and replacement availability'],
    fit: [`Choose the option that proves the required color, bond, surface, movement, durability, or cut quality on a representative sample.`, `Wait when the use conditions are unknown, the label does not support the exposure, or the project has no sample stock for a reversible trial.`],
    verify: `Before buying the full quantity, inspect or test the actual board, panel, abrasive, adhesive, or coating. Confirm grade, dimensions, lot or color, storage condition, preparation, compatibility, coverage, cure, and current safety information.`,
    verifyItems: ['Actual sample matches the intended result', 'Grade, dimensions, chemistry, or grit are confirmed', 'Quantity includes realistic waste and tests', 'Preparation and application instructions are workable', 'Exposure and maintenance needs are supported', 'Matching replacements can be obtained if needed'],
  }
  return {
    compare: `Compare complete, compatible tool systems using the same largest ordinary workpiece and accuracy check. Include the cutter, guard, support, dust connection, power source, operating envelope, setup burden, maintenance, and storage—not just the bare-tool specification sheet.`,
    specifications: [
      `Capacity matters only when the stock can be supported through the full operation. Power matters only on the available circuit or battery platform. Accuracy matters only when the fence, guide, table, collet, stop, or workholding returns predictably to the setting.`,
      `Check the replacement ecosystem before choosing. Blades, bits, abrasives, batteries, brake cartridges, filters, rails, collets, and proprietary hardware can cost more over time than the difference between two base tools.`,
    ],
    cost: `Price the ready-to-work system: tool, suitable cutter or abrasive, dust fittings, hose, stand or mobile base, battery and charger, guides, setup gauges, stock support, protection, and a realistic first year of consumables.`,
    costItems: ['Base tool and exact model', 'Required day-one accessories and safety components', 'First suitable blade, bit, cutter, or abrasive', 'Dust, power, workholding, and stock support', 'One year of likely consumables and maintenance', 'Repair parts, warranty, storage, and exit cost'],
    fit: [`Choose the smaller or simpler route when it safely handles ordinary stock and the savings complete the system with better cutters, workholding, support, or dust collection.`, `Pay for more capacity only when larger work appears often enough to repay the footprint, setup time, supporting equipment, and ongoing consumables. Rent, borrow, outsource, or use a sound jig for rare operations.`],
    verify: `Before checkout, confirm the exact model and current manual, supplied guards, included parts, voltage or battery platform, dust port, usable capacity, minimum stock dimensions, cutter compatibility, warranty, return terms, and replacement-part availability.`,
    verifyItems: ['Handles the largest ordinary workpiece safely', 'Runs on available power and dust collection', 'Includes or accepts every required safety component', 'Fits operating and storage space', 'Has a sound lower-cost alternative considered', 'Removes a repeated constraint in three planned projects'],
  }
}

function buySections(guide) {
  const knowledge = topicFacts(guide)
  const facts = usefulFacts(guide)
  const options = comparisonOptions(guide)
  const context = buyerContext(guide)
  const subject = decisionSubject(guide.title)
  const optionNames = options.length === 2 ? `${options[0]} and ${options[1]}` : `${options.slice(0, -1).join(', ')}, and ${options.at(-1)}`
  const band = ({ 1: '$25–$75', 2: '$75–$200', 3: '$200–$600', 4: '$600+' })[guide.costBand ?? 1]
  const promisedList = guide.sections.find((section) => ['literal-list', 'literal-plan', 'ranked-list'].includes(section.id))
  const workingBudget = guide.sections.find((section) => section.id === 'working-budget')
  return [
    {
      id: 'short-answer',
      heading: `The short answer`,
      paragraphs: [buyingVerdict(guide, knowledge)],
    },
    {
      id: 'option-by-option',
      heading: `Compare the realistic routes`,
      paragraphs: [
        `The realistic routes for ${subject} are ${optionNames}. ${context.compare}`,
        `For ${subject}, remove any route that fails the required capacity, safety feature, exposure, electrical limit, compatibility, or shop space. A discount cannot repair a bad fit.`,
      ],
      bullets: options.map((option, index) => optionNote(guide, option, index, facts)),
    },
    ...(promisedList ? [{
      id: 'ranked-list',
      heading: promisedList.heading,
      paragraphs: [`This list for ${subject} favors broad usefulness and a complete working setup. Remove any item that fails the actual stock, space, safety, exposure, or compatibility requirement.`],
      bullets: promisedList.bullets,
    }] : []),
    ...(workingBudget ? [{
      id: 'working-budget',
      heading: workingBudget.heading,
      paragraphs: [`This budget for ${subject} gives every dollar a job. Local prices change, so preserve the order of capability and consider a sound used equivalent before exceeding the total.`],
      bullets: workingBudget.bullets,
    }] : []),
    {
      id: 'specifications',
      heading: `Specifications that change real work`,
      paragraphs: [
        `For ${subject}, ${context.specifications[0].charAt(0).toLowerCase()}${context.specifications[0].slice(1)}`,
        `${context.specifications[1]} For ${subject}, apply that check to ${optionNames} using the same stock, sample, or operating requirement for each route.`,
      ],
      bullets: facts.slice(0, 7),
    },
    {
      id: 'full-cost',
      heading: `Price the ready-to-work system`,
      paragraphs: [
        `${context.cost} For ${subject}, use ${band} only as a planning band and record the exact configuration and date beside every price.`,
      ],
      bullets: context.costItems,
    },
    {
      id: 'fit-and-skip',
      heading: `Who should buy—and who should wait`,
      paragraphs: [`For ${subject}, ${context.fit[0].charAt(0).toLowerCase()}${context.fit[0].slice(1)} ${context.fit[1]}`],
      callout: { tone: 'decision', title: 'The three-project test', body: `Name three planned jobs, the exact limitation this purchase removes in each one, and the complete ready-to-work cost. If one answer is missing, wait.` },
    },
    {
      id: 'checkout-checklist',
      heading: `Verify the current product before checkout`,
      paragraphs: [
        `${context.verify} For ${subject}, keep the exact product or plan identification, receipt or license terms, instructions, setup notes, and first sample result together. Recheck the recommendation when models, safety notices, formulations, access terms, or consumables change.`,
      ],
      bullets: context.verifyItems,
    },
  ]
}

function seoTitle(title) {
  if (title.length <= 52) return `${title} | Built True`
  return `${title.slice(0, 51).replace(/\s+\S*$/, '')} | Built True`
}

function metaDescription(guide) {
  const text = guide.intent === 'build'
    ? `${guide.title}, with practical dimensions, a cut list, assembly order, safety checks, finishing guidance, and fixes for common problems.`
    : guide.intent === 'buy'
      ? `${guide.title}: compare real capacity, compatibility, complete ownership cost, limitations, and clear reasons to buy or wait.`
      : `${guide.title}, explained with a clear setup, exact steps, visible success checks, and specific fixes when the result goes wrong.`
  return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, '')}…`
}

function dek(guide) {
  const subject = guide.intent === 'buy' ? decisionSubject(guide.title) : cleanSubject(guide.title).toLowerCase()
  if (guide.intent === 'build') return `A practical plan for ${subject}, with starting dimensions, a cut list, assembly order, safety decisions, and checks for fit and stability.`
  if (guide.intent === 'buy') return `Compare ${subject} by the work each option changes, the complete setup cost, real limitations, and the reasons to buy now or wait.`
  return humanLearnGuide(guide).answer
}

function safetyNotes(guide) {
  const activity = activityPhrase(guide)
  const machine = /table saw|miter saw|circular saw|bandsaw|router|jointer|planer|lathe|cnc|drill press|sander/i.test(guide.title)
  const notes = [
    machine
      ? `Read the current manual for the exact machine used while ${activity}; keep supplied guards and safety devices in place, disconnect power for setup, and support the complete workpiece and offcut.`
      : `Before ${activity}, identify the operation's hazards, secure any workpiece, keep hands behind cutting edges, and use eye, hearing, respiratory, and skin protection appropriate to the actual operation and product label.`,
    `Stop if the stock, offcut, cutter path, body position, ventilation, electrical load, or finished load path cannot be controlled without improvising around a safety feature.`,
    `Dimensions in this guide are practical starting points. Current hardware drawings, product instructions, local code, structural requirements, conservation guidance, and the needs of the actual user take priority.`,
  ]
  if (/child|kids|toy|dresser|bookcase|wardrobe|cabinet|locker|pet|cat window/i.test(guide.title)) notes.push('Anchor climbable or top-heavy furniture to suitable structure and inspect the installation periodically; use captured hardware and eliminate foreseeable pinch, entrapment, and detachable-part hazards.')
  if (/outdoor|pergola|porch swing|hammock|ceiling|wall-mounted|floating/i.test(guide.title)) notes.push('Use rated fasteners and hardware connected to verified structure. Local code or a qualified professional must resolve structural spans, hanging loads, footings, and site-specific exposure.')
  return notes
}

export function publishProductionCorpus(inputGuides, publishedAt = new Date().toISOString()) {
  const learnCoverage = humanLearnCoverage(inputGuides)
  if (learnCoverage.missing.length) throw new Error(`Missing hand-written learn guides: ${learnCoverage.missing.join(', ')}`)
  const publishedGuides = inputGuides.map((source) => {
    const guide = structuredClone(source)
    guide.title = titleRevisions[guide.id] ?? guide.title
    if (guide.intent === 'build') {
      const plan = productionPlanFor(guide)
      guide.dimensions = { imperial: plan.size, metric: plan.metric }
      guide.cutList = plan.cutList
      guide.tools = productionTools(guide, plan)
      guide.materials = productionMaterials(plan)
    }
    guide.tools = guide.intent === 'buy' ? [] : cleanEditorialTools(guide)
    guide.dek = dek(guide)
    guide.seoTitle = seoTitle(guide.title)
    guide.metaDescription = metaDescription(guide)
    const sections = guide.intent === 'build' ? buildSections(guide) : guide.intent === 'buy' ? buySections(guide) : learnSections(guide)
    guide.sections = sections
    guide.safetyNotes = safetyNotes(guide)
    guide.affiliateDisclosure = DISCLOSURE
    guide.sources = sourcesFor(guide)
    guide.status = 'published'
    guide.indexStatus = 'index'
    guide.evidenceStatus = 'research-reviewed'
    guide.authorId = 'built-true-editors'
    guide.reviewerIds = ['built-true-editorial-review']
    guide.updatedAt = publishedAt
    guide.publishedAt = guide.publishedAt ?? publishedAt
    guide.contentVersion = 5
    return guide
  })
  return curateLearnSectionHeadings(publishedGuides).guides
}
