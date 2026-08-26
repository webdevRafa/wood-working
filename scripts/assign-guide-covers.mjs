import { access, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDirectory, '..')
const fileArgIndex = process.argv.indexOf('--file')
const contentFile = resolve(projectRoot, fileArgIndex >= 0 ? process.argv[fileArgIndex + 1] : 'content/guides.json')
const dryRun = process.argv.includes('--dry-run')
const showDetails = process.argv.includes('--details')

const coverCatalog = {
  'plan-reading-design': ['/images/library/plan-reading-design.jpg', 'Woodworking plans, cut-list sketches, measuring tools, and a joinery sample on a workbench'],
  'lumber-selection': ['/images/library/lumber-selection.jpg', 'A selection of rough and surfaced lumber being inspected on a workshop bench'],
  'measuring-layout': ['/images/library/measuring-layout.jpg', 'Precision measuring and layout tools arranged around a marked hardwood board'],
  'basic-boxes-crates': ['/images/library/basic-boxes-crates.jpg', 'Several useful handmade wooden boxes and crates arranged in a warm workshop'],
  'stool-chair': ['/images/library/stool-chair.jpg', 'A compact handmade shop stool with visible solid-wood joinery'],
  shelving: ['/images/library/shelving.jpg', 'Handmade floating and bracketed wood shelves displayed in a workshop setting'],
  joinery: ['/images/library/joinery.jpg', 'A study of precisely fitted dovetail, mortise-and-tenon, and dado joints'],
  'hand-tools-sharpening': ['/images/library/hand-tools-sharpening.jpg', 'Sharp chisels, waterstones, and honing tools arranged for hand-tool maintenance'],
  'hand-saw-planes': ['/images/library/hand-saw-planes.jpg', 'Traditional hand saws and hand planes on a shavings-covered workbench'],
  'table-saw-jigs': ['/images/library/table-saw-jigs.jpg', 'A table saw with a crosscut sled and precision shop-made cutting jigs'],
  'miter-circular-track-saws': ['/images/library/miter-circular-track-saws.jpg', 'Miter, circular, and track saw cutting setups in a tidy woodworking shop'],
  'bandsaw-curves': ['/images/library/bandsaw-curves.jpg', 'A bandsaw and curved wooden parts prepared for shaped cuts'],
  cnc: ['/images/library/cnc.jpg', 'A compact CNC router cutting a precise pattern into a hardwood panel'],
  'drill-press': ['/images/library/drill-press.jpg', 'A drill press, drilling jig, and selection of woodworking bits on a bench'],
  'lathe-turning': ['/images/library/lathe-turning.jpg', 'A wood lathe surrounded by turned bowls, spindles, and fresh shavings'],
  workbench: ['/images/library/workbench.jpg', 'A heavy handmade workbench with vises, bench dogs, and planing accessories'],
  'clamps-assembly-jigs': ['/images/library/clamps-assembly-jigs.jpg', 'Clamps, cauls, and assembly jigs holding a furniture glue-up square'],
  'shop-layout': ['/images/library/shop-layout.jpg', 'An efficient small woodworking shop with clear work zones and machine placement'],
  'shop-storage': ['/images/library/shop-storage.jpg', 'Organized wall storage, lumber racks, rolling carts, and tool cabinets in a small shop'],
  'dust-safety': ['/images/library/dust-safety.jpg', 'Woodworking dust collection equipment and essential shop safety gear'],
  'lighting-electrical': ['/images/library/lighting-electrical.jpg', 'Bright workshop lighting and safely organized electrical service above a workbench'],
  'glue-up': ['/images/library/glue-up.jpg', 'A carefully clamped furniture glue-up with wood glue and alignment cauls'],
  finishing: ['/images/library/finishing.jpg', 'Wood finish being applied to rich hardwood samples beside finishing supplies'],
  repair: ['/images/library/repair.jpg', 'A damaged wooden furniture joint being carefully repaired on a workbench'],
  'living-room-furniture': ['/images/library/living-room-furniture.jpg', 'Handmade coffee, end, and console tables in a warm living-room setting'],
  'bookcases-media': ['/images/library/bookcases-media.jpg', 'A handmade bookcase and low media console with refined solid-wood details'],
  'dining-tables': ['/images/library/dining-tables.jpg', 'A handcrafted solid-wood dining table with a matching bench'],
  'chairs-seating': ['/images/library/chairs-seating.jpg', 'Handmade dining, Adirondack, and shop seating displayed together'],
  'bedroom-furniture': ['/images/library/bedroom-furniture.jpg', 'A handmade platform bed, nightstand, and dresser built from warm hardwood'],
  'office-furniture': ['/images/library/office-furniture.jpg', 'A handmade walnut desk, monitor riser, and rolling file cabinet'],
  'cabinets-drawers': ['/images/library/cabinets-drawers.jpg', 'A Shaker cabinet with an open door and a dovetailed drawer'],
  'kitchen-bath': ['/images/library/kitchen-bath.jpg', 'A handcrafted butcher-block island and compact wood vanity cabinet'],
  'planters-garden': ['/images/library/planters-garden.jpg', 'Cedar raised beds, planters, and a potting bench in a garden workshop'],
  'outdoor-furniture': ['/images/library/outdoor-furniture.jpg', 'Handmade cedar patio seating and a slatted outdoor side table'],
  'wildlife-garden': ['/images/library/wildlife-garden.jpg', 'Cedar bird, bat, feeder, and pollinator houses on a workbench'],
  'small-gifts-boxes': ['/images/library/small-gifts-boxes.jpg', 'A walnut keepsake box, jewelry box, serving board, and valet tray'],
  'frames-displays': ['/images/library/frames-displays.jpg', 'Handmade picture frames, a shadow box, wood clock, and key holder'],
  'desk-accessories-decor': ['/images/library/desk-accessories-decor.jpg', 'Handmade wood phone, tablet, and headphone stands with a desk lamp and organizer'],
  'kids-toys': ['/images/library/kids-toys.jpg', 'Smooth wooden blocks, child seating, a step stool, and a toy ramp'],
  'pet-furniture': ['/images/library/pet-furniture.jpg', 'A raised pet feeder, wood pet bed, and padded cat window perch'],
  'wood-species': ['/images/library/wood-species.jpg', 'Walnut, oak, maple, cherry, poplar, and pine boards showing distinct grain'],
  'plywood-sheet-goods': ['/images/library/plywood-sheet-goods.jpg', 'Plywood, MDF, veneer-core, and particleboard samples showing their edges'],
  'wood-movement': ['/images/library/wood-movement.jpg', 'Boards showing different grain orientations and one example of wood movement'],
  'power-tool-buying': ['/images/library/power-tool-buying.jpg', 'A table saw, planer, jointer, router, and dust extractor in a small workshop'],
  'woodworking-education': ['/images/library/woodworking-education.jpg', 'Plans, drafting tools, joinery samples, and a tablet arranged for woodworking study'],
  'beginner-workshop': ['/images/guides/001-beginner-workshop.jpg', 'Beginner woodworking crate project surrounded by essential tools on a workshop bench'],
  'first-tools': ['/images/guides/002-first-tools.jpg', 'Essential beginner woodworking tools arranged on a maple workbench'],
  'board-foot-lumber': ['/images/guides/031-board-foot-lumber.jpg', 'Rough walnut and oak boards being measured for a board-foot calculation'],
  'table-saw-basics': ['/images/guides/101-table-saw-basics.jpg', 'Table saw prepared for a safe first cut with its guard, push block, and safety glasses'],
  router: ['/images/guides/151-router-comparison.jpg', 'Compact trim router and full-size plunge router compared side by side'],
  'jointer-planer': ['/images/guides/176-jointer-planer.jpg', 'Jointer and thickness planer positioned side by side in a woodworking shop'],
  sanding: ['/images/guides/276-sandpaper-grits.jpg', 'Coarse, medium, and fine abrasives beside a walnut sanding progression'],
  'coffee-table': ['/images/guides/301-coffee-table.jpg', 'Finished walnut coffee table with a lower shelf in a warm living room'],
}

const featuredGuideCovers = new Map([
  ['001', 'beginner-workshop'],
  ['002', 'first-tools'],
  ['031', 'board-foot-lumber'],
  ['101', 'table-saw-basics'],
  ['151', 'router'],
  ['176', 'jointer-planer'],
  ['276', 'sanding'],
  ['301', 'coffee-table'],
  ['020', 'stool-chair'],
])

const projectRules = [
  ['kids-toys', /\bkid|child|toddler|toy|dollhouse|building blocks|learning tower|step tower|rocking horse|play table/],
  ['frames-displays', /picture frame|photo frame|shadow box|display frame|wall clock|key holder|growth chart|sign frame|mirror frame|art display/],
  ['shop-storage', /tool storage|shop storage|lumber rack|sheet.goods rack|rolling cart|mobile base|tool wall|french cleat|pegboard|charging station|offcut|scrap storage|clamp rack|bit cabinet|blade storage|sandpaper storage|hardware cabinet|finishing.supply cabinet|hand.tool cabinet|shop cabinet|tool cabinet|mobile tool stand/],
  ['pet-furniture', /\bpet\b|\bdog\b|\bcat\b|feeding station|pet bed|cat perch|cat tree|dog crate/],
  ['wildlife-garden', /birdhouse|bird house|bird feeder|bat house|pollinator|bee hotel|insect hotel|butterfly house/],
  ['planters-garden', /planter|raised garden|raised bed|potting bench|garden bed|garden kneeler|window box|herb garden|trellis/],
  ['outdoor-furniture', /outdoor|patio|porch|adirondack|garden bench|picnic table|pergola|hammock|porch swing|camp stool|deck box|firewood rack|grill cart|outdoor sectional|outdoor sofa|compost/],
  ['bedroom-furniture', /platform bed|bed frame|headboard|nightstand|bedside table|dresser|wardrobe|armoire|closet organizer|clothing rack|under.bed|blanket chest|cedar chest|storage bed/],
  ['office-furniture', /writing desk|computer desk|standing desk|desktop|fold.down desk|murphy desk|printer|file cabinet|monitor riser|laptop stand|desk organizer|footrest|home office|keyboard tray/],
  ['kitchen-bath', /kitchen island|butcher.block|cutting board|vanity|bathroom|medicine cabinet|laundry|mudroom|pot rack|towel rack|spice rack|wine rack|plate rack/],
  ['bookcases-media', /bookcase|bookshelf|media console|tv console|record cabinet|record console|vinyl|turntable|speaker stand|audio rack|entertainment center|display cabinet/],
  ['shelving', /shelf|shelves|floating shelf|wall shelf|mantel|blanket ladder|ladder shelf/],
  ['dining-tables', /dining table|trestle table|pedestal table|drop.leaf|gateleg|card table|bar table|breakfast table|farmhouse table|tabletop|table top|dining bench|parsons table/],
  ['chairs-seating', /dining chair|armchair|lounge chair|rocking chair|windsor.*chair|stick chair|morris chair|side chair|upholstered chair|stool|footstool|seating|bench seat|chair build|chairmaking/],
  ['living-room-furniture', /coffee table|end table|side table|sofa table|console table|entry table|hall tree|nesting table|ottoman tray|living.room/],
  ['desk-accessories-decor', /phone stand|tablet stand|headphone stand|desk lamp|wooden lamp|speaker dock|phone speaker|mail organizer|pen holder|book stand|recipe stand|music stand|candle holder|plant stand/],
  ['small-gifts-boxes', /keepsake|jewelry box|watch box|valet tray|recipe box|memory box|ring box|gift box|serving board|serving tray|cheese board|coaster|ornament|wooden gift|scrap.wood gift|small box/],
  ['cabinets-drawers', /cabinet|drawer|shaker door|cabinet door|hinge|face frame|frameless construction|toe kick|raised.panel door|inset door|overlay door|casework|pantry/],
  ['basic-boxes-crates', /\bbox\b|crate|utility bin|storage bin|simple tote|tool tote|garden tote/],
]

const rules = [
  ['woodworking-education', /course|class|membership|instruction|lesson plan|online woodworking|digital plan|plan bundle|blueprint|paid woodworking|woodworking school|woodworkers guild|ted.s woodworking/],
  ['cnc', /\bcnc\b|computer numerical|toolpath|v-carv|work zero|dust shoe|spoilboard/],
  ['lathe-turning', /\blathe\b|woodturn|spindle turning|first spindle|turning tool|bowl gouge|parting tool|faceplate|chuck jaw/],
  ['router', /\brouter\b|roundover|chamfer bit|flush.trim|pattern bit|straight bit|spiral bit|rail.and.stile|cope.and.stick/],
  ['jointer-planer', /\bjointer\b|\bplaner\b|cutterhead|straight.knife|face.joint|edge.joint|joint.*edge|milling rough lumber|mill rough lumber|flatten.*board|parallel faces|plane thin stock|snipe/],
  ['sanding', /sandpaper|\bsanding\b|\bsander\b|abrasive|grit progression|card scraper|random.orbit|belt sander|spindle sander|disc sander/],
  ['table-saw-jigs', /table saw|crosscut sled|thin.rip|dado stack|dado blade|zero.clearance|box.joint jig|taper jig|push block|sawstop|cabinet saw|jobsite saw|hybrid saw/],
  ['miter-circular-track-saws', /miter saw|mitre saw|circular saw|track saw|crown molding|compound angle|saw guide|cutting sheet goods.*saw/],
  ['bandsaw-curves', /bandsaw|band saw|jigsaw|scroll saw|reciprocating saw|coping saw|cutting curves|curved cut|resaw/],
  ['drill-press', /drill press|drill.*hole|cordless drill|impact driver|forstner|brad.point|twist bit|auger bit|countersink|pocket.hole jig|doweling jig|drilling straight|hole saw/],
  ['hand-tools-sharpening', /sharpen|honing|waterstone|diamond plate|grinding wheel|chisel set|bevel.edge chisel|mortise chisel/],
  ['hand-saw-planes', /hand plane|block plane|jack plane|smoothing plane|hand saw|western saw|japanese saw|spokeshave|drawknife|brace and bit|rasp|cabinet file|bench hook|shooting board|winding stick|scrub plane/],
  ['dust-safety', /dust collect|dust extract|shop vacuum|cyclone|air filtr|respirator|hearing protect|safety gear|safety glasses|goggles|face shield|kickback|machine guard|blade guard|riving knife|first.aid|fire extinguisher|oily rag|shop safety|emergency stop|noise level|silica|fine dust/],
  ['lighting-electrical', /shop light|task light|lighting|electrical|extension cord|power strip|outlet|heating|cooling|ventilation|dehumidif|humidity control|mini.split/],
  ['workbench', /workbench|work bench|bench[ -]dog|bench vise|bench vice|moxon|planing stop|holdfast|roman bench|torsion.box assembly table|outfeed table/],
  ['glue-up', /wood glue|glue.up|\bgluing\b|clamp time|cure time|squeeze.out|\bepoxy\b|hide glue|pva glue|ca glue|cyanoacrylate|biscuits.*glue/],
  ['finishing', /\bfinish\b|finishing|stain|polyurethane|shellac|lacquer|hardwax|hard wax|danish oil|tung oil|linseed|wood dye|grain filler|spray gun|hvlp|topcoat|rubbed.out|water.based|oil.based|painted furniture|milk paint|wax polish/],
  ['repair', /\brepair\b|\bfix\b|restor|refinish|loose joint|sticky drawer|drawer sticks|stripped screw|wood split|crack|dent|scratch|water ring|white ring|wobbl|patch|veneer damage|chair rung|broken/],
  ['wood-movement', /wood movement|seasonal movement|expansion|contraction|cupped|cupping|twist|bowed|warped|quarter.sawn|rift.sawn|flat.sawn|end grain|grain direction|moisture meter|moisture content|acclimat/],
  ['plywood-sheet-goods', /plywood|sheet goods|mdf|particleboard|baltic birch|veneer core|melamine|hardboard|edge band/],
  ['wood-species', /wood species|white oak|red oak|hard maple|soft maple|walnut|cherry|poplar|southern yellow pine|cedar vs|oak vs|maple vs|pine vs|exotic wood|domestic hardwood|softwood|hardwood selection/],
  ['lumber-selection', /lumber|board.foot|home.center board|straight boards|rough.sawn|rough lumber|kiln.dried|air.dried|live edge|selecting boards|buying wood|grain matching|reading grain|knots|checking board|milling stock/],
  ['joinery', /joinery|\bjoints\b|dovetail|mortise|tenon|rabbet|\bdado\b|tongue.and.groove|spline|box joint|finger joint|bridle joint|half.lap|butt joint|miter joint|biscuit join|domino join|dowel joint|breadboard end|floating tenon|wedged tenon|drawbore|cope.and.stick/],
  ['clamps-assembly-jigs', /\bclamp\b|clamping|assembly jig|shop jig|caul|t.track|stop block|template making|drill guide|sanding.disc jig|corner jig|featherboard|hold.down|repeatable setup/],
  ['shop-storage', /tool storage|shop storage|lumber rack|sheet.goods rack|rolling cart|mobile base|tool wall|french cleat|pegboard|charging station|offcut|scrap storage|clamp rack|bit cabinet|blade storage|sandpaper cabinet|hardware organizer|shop cabinet|tool cabinet|small.parts organizer|mobile tool stand/],
  ['shop-layout', /shop layout|garage shop|one.car.garage woodshop|small shop|one.car garage|two.car garage|basement shop|shared shop|apartment woodworking|100.square.foot|how much space|work zone|machine placement|material flow|shop floor|neighbor|noise control|starter shop|setting up.*shop/],
  ['bedroom-furniture', /platform bed|bed frame|headboard|nightstand|bedside table|dresser|wardrobe|armoire|closet organizer|clothing rack|under.bed|blanket chest|cedar chest|storage bed/],
  ['office-furniture', /writing desk|computer desk|standing desk|executive desk|secretary desk|murphy desk|printer stand|file cabinet|monitor riser|laptop riser|desk organizer|home office|keyboard tray/],
  ['kids-toys', /\bkid|child|toddler|toy|dollhouse|building blocks|learning tower|step tower|rocking horse|play table|toy box|crayon|bookshelf for children/],
  ['pet-furniture', /\bpet\b|\bdog\b|\bcat\b|feeding station|pet bed|cat perch|cat tree|dog crate/],
  ['wildlife-garden', /birdhouse|bird house|bird feeder|bat house|pollinator|bee hotel|insect hotel|butterfly house|compost bin/],
  ['planters-garden', /planter|raised garden|raised bed|potting bench|garden bed|garden kneeler|window box|herb garden|trellis/],
  ['outdoor-furniture', /outdoor|patio|porch|adirondack|garden bench|picnic table|pergola|hammock|porch swing|camp stool|deck box|firewood rack|grill cart|outdoor sectional|outdoor sofa/],
  ['chairs-seating', /dining chair|armchair|lounge chair|rocking chair|windsor chair|morris chair|side chair|upholstered chair|stool|footstool|seating|bench seat|chair build|chairmaking/],
  ['cabinets-drawers', /cabinet|drawer|shaker door|cabinet door|hinge|drawer slide|face frame|frameless construction|toe kick|raised.panel door|inset door|overlay door|dovetailed drawer|casework/],
  ['kitchen-bath', /kitchen island|butcher block|cutting board|charcuterie|vanity|bathroom|medicine cabinet|laundry|mudroom|pot rack|towel rack|spice rack|wine rack|plate rack/],
  ['bookcases-media', /bookcase|bookshelf|media console|tv console|record cabinet|vinyl|turntable|speaker stand|audio rack|entertainment center|display cabinet/],
  ['shelving', /shelf|shelves|floating shelf|wall shelf|mantel|blanket ladder|ladder shelf/],
  ['dining-tables', /dining table|trestle table|pedestal table|drop.leaf|gateleg|card table|bar table|breakfast table|farmhouse table|tabletop|table top|dining bench/],
  ['living-room-furniture', /coffee table|end table|side table|sofa table|console table|entry table|hall tree|nesting table|ottoman tray|living.room/],
  ['frames-displays', /picture frame|photo frame|shadow box|display frame|wall clock|key holder|growth chart|sign frame|mirror frame|art display/],
  ['desk-accessories-decor', /phone stand|tablet stand|headphone stand|desk lamp|wooden lamp|speaker dock|mail organizer|pen holder|book stand|recipe stand|music stand|candle holder|plant stand/],
  ['small-gifts-boxes', /keepsake|jewelry box|watch box|valet tray|recipe box|memory box|ring box|gift box|serving board|serving tray|cheese board|coaster|ornament|wooden gift|small box/],
  ['basic-boxes-crates', /\bbox\b|crate|utility bin|storage bin|simple tote|tool tote|garden tote/],
  ['measuring-layout', /measure|layout|marking|square|tape measure|story stick|center finder|angle finder|bevel gauge|compass|divider|imperial|metric|cutting list|cut list|dimension|caliper/],
  ['plan-reading-design', /design|plan reading|read.*plan|drawing|sketch|prototype|mockup|scale model|project planning|material list|exploded view|diagram|templates/],
  ['power-tool-buying', /best tool|tool buying|buying guide|first tools|tool kit|tool budget|cordless platform|dewalt|makita|milwaukee|bosch|festool|saw blade|router bit|drill bit set|parallel clamp|dust collector|air cleaner|power tool|stationary tool/],
]

function coverKeyFor(guide) {
  const featured = featuredGuideCovers.get(guide.id)
  if (featured) return featured

  const title = guide.title.toLowerCase()
  if (/^turn\b/.test(title)) return 'lathe-turning'
  if (guide.type === 'project') for (const [key, pattern] of projectRules) if (pattern.test(title)) return key
  for (const [key, pattern] of rules) if (pattern.test(title)) return key

  const metadata = [guide.categoryId, guide.clusterId, ...(guide.tags ?? [])].join(' ').toLowerCase()
  if (guide.type === 'project') for (const [key, pattern] of projectRules) if (pattern.test(metadata)) return key
  for (const [key, pattern] of rules) if (pattern.test(metadata)) return key

  if (guide.type === 'material') return 'wood-species'
  if (guide.type === 'shop') return 'shop-layout'
  if (guide.type === 'troubleshooting') return 'repair'
  if (guide.type === 'review' || guide.type === 'comparison' || guide.intent === 'buy') return 'power-tool-buying'
  if (guide.type === 'skill') return 'measuring-layout'
  return 'basic-boxes-crates'
}

const guides = JSON.parse(await readFile(contentFile, 'utf8'))
const assignments = new Map()
const details = []
for (const guide of guides) {
  const key = coverKeyFor(guide)
  const cover = coverCatalog[key]
  if (!cover) throw new Error(`Unknown cover family ${key} for guide ${guide.id}.`)
  guide.coverImage = cover[0]
  guide.coverAlt = cover[1]
  assignments.set(key, (assignments.get(key) ?? 0) + 1)
  details.push({ id: guide.id, key, title: guide.title })
}

for (const [key, [imagePath]] of Object.entries(coverCatalog)) {
  if (!assignments.has(key)) continue
  await access(resolve(projectRoot, 'public', imagePath.replace(/^\//, '')))
}

if (!dryRun) await writeFile(contentFile, `${JSON.stringify(guides, null, 2)}\n`, 'utf8')

console.log(`${dryRun ? 'Checked' : 'Assigned'} cover images for ${guides.length} guides across ${assignments.size} subject families.`)
for (const [key, count] of [...assignments].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) console.log(`${String(count).padStart(3)}  ${key}`)
if (showDetails) for (const detail of details) console.log(`${detail.id}  ${detail.key.padEnd(28)}  ${detail.title}`)
console.log(dryRun ? 'Dry run complete. No content was changed.' : `Updated ${contentFile}.`)
