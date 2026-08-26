const stopWords = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'best', 'build', 'for', 'from', 'guide', 'how', 'in', 'into', 'make', 'of', 'on', 'or', 'the', 'to', 'using', 'with', 'without', 'woodworking', 'your'])

const sentence = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1).replace(/[.]+$/, '')}.` : ''
const subjectOf = (title) => title.replace(/^(build|make|how to|the beginner(?:'s|s)? guide to)\s+/i, '').replace(/[.]+$/, '')
const lowerSubject = (guide) => subjectOf(guide.title).toLowerCase()
const articleWords = (guide) => [guide.title, guide.dek, ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])])].join(' ')
const priceBand = (band = 1) => ({ 1: '$25–$75', 2: '$75–$200', 3: '$200–$600', 4: '$600+' })[band] ?? 'Varies'

const factRules = [
  { test: /course|education|class|guild|learning path|plan subscription/i, answer: 'Choose education by the project sequence, quality of feedback, instructor transparency, and fit with the tools and time you actually have—not by the size of the video library.', facts: ['Preview a complete lesson and its project files before paying; polished trailers do not show whether dimensions and decisions are explained.', 'Feedback on work, a coherent project sequence, and current safety instruction usually matter more than a very large archive.', 'Check whether access expires, downloads are included, materials assume unavailable machines, and cancellation is straightforward.', 'A useful course names the learner level, prerequisites, finished outcome, and the evidence behind product or technique claims.'] },
  { test: /jig|sled|fixture|template|bench hook|shooting board|winding sticks|stop block|push stick|push block/i, answer: 'A shop-made jig earns its space when it makes a repeated operation safer or more consistent and can be checked against a known reference before every use.', facts: ['Mark the complete cutter path on the jig and keep every screw, knob, clamp, and insert outside it.', 'Fit runners without side play but loose enough to move through seasonal humidity changes.', 'Make the first test part from scrap and verify it independently before copying the setup.', 'Retire the jig when a slot, fence, runner, stop, or clamp becomes loose enough to change the result.'] },
  { test: /tool budget|first 10 woodworking tools|starter tool|tool kit/i, answer: 'Spend first on measuring, workholding, one controlled cutting method, drilling, and surface preparation; delay specialized machines until a planned project needs their capacity.', facts: ['A sound square, sharp blade, and stable guide improve the work more than extra motor power in an uncontrolled setup.', 'Price blades, bits, abrasives, batteries, clamps, and dust adapters inside the tool budget.', 'Used corded tools can preserve budget when guards, cords, bearings, fences, and adjustments are complete and safe.', 'Choose a battery platform only after checking the next tools and batteries you are realistically likely to buy.'] },
  { test: /sand|abrasive|grit/i, answer: 'Use the coarsest grit that removes the defect, then refine the scratch pattern instead of sanding longer with a grit that is too fine.', facts: ['For raw furniture parts, 80 or 100 grit removes milling marks; 120 and 150 or 180 grit refine the surface for most film finishes.', 'Do not skip more than one grit in a normal sequence: deep 80-grit scratches can survive a jump straight to 180.', 'Vacuum the surface and inspect it in raking light between grits; dust left on the board can disguise cross-grain scratches.', 'Replace an abrasive when it stops cutting, loads with finish, or needs extra pressure. Extra pressure creates heat and uneven scratch depth.'] },
  { test: /table saw|rip cut|riving knife|push stick|fence|miter gauge/i, answer: 'A table-saw cut is controlled by one reference only: use the fence for ripping and the miter gauge or sled for crosscuts, never both when the offcut can be trapped.', facts: ['A 24-tooth ripping blade clears chips efficiently; a 40- or 50-tooth combination blade is a practical general-purpose choice on a 10-inch saw.', 'Keep the riving knife aligned with the blade and use the guard whenever the operation permits it.', 'Set outfeed support slightly below the saw table so it supports stock without steering it upward.', 'Stand out of the likely kickback line and plan where the push stick, workpiece, and offcut will finish before starting.'] },
  { test: /miter saw|crosscut/i, answer: 'Support the complete board, let the blade reach full speed, and keep the work registered against the fence through the entire crosscut.', facts: ['A fine crosscut blade reduces tear-out, but more teeth also cut more slowly and can burn if the feed is forced.', 'For repeated parts, clamp a stop to an auxiliary fence with clearance so a small offcut cannot become trapped.', 'Check square by cutting a wide test board, flipping one half, and bringing the cut edges together; a doubled gap reveals the error.', 'Wait for the blade to stop before raising it from a narrow offcut.'] },
  { test: /circular saw|track saw|saw guide|plywood cutting/i, answer: 'Support the work so neither side drops into the blade, then guide the saw from a measured offset rather than trying to steer by eye.', facts: ['Measure the exact distance from the blade to the shoe edge and use that offset when placing a straightedge guide.', 'With a typical circular saw, the cleanest face is usually down; confirm on scrap because blade geometry and track-saw splinter strips change the result.', 'Set blade depth so the teeth project only slightly below the stock while preserving full tooth engagement.', 'Use rigid foam or a sacrificial grid to support a full sheet close to the cut.'] },
  { test: /band ?saw|resaw/i, answer: 'Bandsaw accuracy depends on a sharp blade, appropriate tension, stable guides, and a feed rate that lets the gullets clear waste.', facts: ['Use a wider blade for straight resawing and a narrower blade for tight curves; never force a curve tighter than the blade can track.', 'Set side guides close to, but not pinching, the blade and keep the thrust bearing just behind it.', 'Leave milling allowance on a resawn face and joint or plane it after the halves rest.', 'Use a push block or carrier when the remaining part would bring fingers near the blade.'] },
  { test: /jigsaw|scroll saw|curve/i, answer: 'Choose the blade for the material and radius, support the show face, and let the teeth cut without pushing the blade sideways.', facts: ['A narrow blade turns a tighter radius; a wider blade tracks straighter.', 'Reduce splintering with a sharp fine-tooth blade, backing board, or zero-clearance insert appropriate to the saw.', 'Relief cuts let waste fall away before a tight curve closes around the blade.', 'Square the base to the blade with a reliable reference before cutting joinery or paired parts.'] },
  { test: /router|routing|bit|dado|rabbet|roundover|profile/i, answer: 'Router work improves when the bit is sharp, the depth is divided into shallow passes, and enough of the base stays supported throughout the cut.', facts: ['Insert the bit fully, then withdraw it slightly before tightening so the shank is not bottomed in the collet.', 'Use the largest compatible shank available—often 1/2 inch on a full-size router—for reduced deflection in demanding cuts.', 'Move a handheld router against normal bit rotation; on a router table, feed the work from right to left in the usual setup.', 'Test the exact bit height and fence position on matching scrap before touching a project part.'] },
  { test: /jointer|jointing/i, answer: 'A jointer creates one flat face and one straight square edge; it does not make the opposite face parallel by itself.', facts: ['Face-joint first, then edge-joint with the flattened face held against the fence.', 'Take light passes and read the grain to reduce tear-out.', 'Stock must meet the machine manual’s minimum length and thickness; short parts need a different method.', 'After jointing one face, use a planer to make the opposite face parallel.'] },
  { test: /planer|thickness/i, answer: 'A thickness planer makes the top face parallel to the face riding on its bed; twist or cup must be stabilized or removed first.', facts: ['Feed the reference face down and alternate boards when practical to distribute wear across the cutter head.', 'Take light final passes and support long stock without lifting it into the cutter head.', 'A planer sled can stabilize twisted stock when a jointer is unavailable, but the work must be shimmed so it cannot rock.', 'Allow newly milled boards to rest before the last pass when stock movement is likely.'] },
  { test: /drill|hole|bit|driver|pocket hole/i, answer: 'Accurate drilling starts with a visible center mark, a bit suited to the hole, and backing that supports the exit fibers.', facts: ['Use an awl or center punch to keep a small bit from wandering.', 'Brad-point bits locate cleanly in wood; twist bits are useful general-purpose cutters; Forstner bits produce controlled flat-bottomed holes.', 'Back the work with scrap to reduce breakout and clamp it before using larger bits.', 'Set a depth stop or tape flag and verify screw length against the actual joint thickness.'] },
  { test: /glue|adhesive|laminat|edge joint/i, answer: 'A glue joint needs clean mating surfaces, an assembly that closes without heroic pressure, and enough clamp time for the exact adhesive and shop conditions.', facts: ['Most ordinary PVA joints need a thin continuous film on the mating surface; a starved joint is weaker than a neat squeeze-out suggests.', 'Dry-fit the complete assembly and stage clamps before applying glue.', 'Check diagonals while the glue is still open and use cauls to distribute pressure across wide panels.', 'Follow the adhesive label for open time, clamp time, temperature, and full cure; do not load the joint early.'] },
  { test: /finish|stain|varnish|polyurethane|oil|shellac|lacquer|paint|topcoat/i, answer: 'Finish the sample before the project: use the same wood, sanding sequence, color step, and number of coats, then judge it only after cure.', facts: ['A common furniture sanding stop is 150 or 180 grit, but the finish manufacturer’s instructions take priority.', 'Thin, even coats cure more reliably than one heavy coat and make runs easier to avoid.', 'Temperature, humidity, ventilation, and previous coatings can change open and cure times.', 'Lay oily rags flat to dry outdoors where permitted or store and dispose of them exactly as the product label and local rules require.'] },
  { test: /dust|shop.?vac|cyclone|respirator|air cleaner|hose/i, answer: 'Dust control needs source capture, adequate airflow, a sealed path, and respiratory protection matched to the remaining exposure.', facts: ['A large machine port and a narrow shop-vac hose solve different problems; reducers add resistance and do not create missing airflow.', 'Keep hose runs short and smooth, seal obvious leaks, and avoid sharp bends near the machine.', 'A cyclone protects the filter from chips but does not replace an appropriate filter.', 'Never place a motor in an unventilated sound enclosure; preserve cooling airflow and manufacturer clearances.'] },
  { test: /CNC|carve|flat-pack/i, answer: 'A CNC job is only as accurate as its stock setup, zero reference, toolpath, workholding, and verified cutter geometry.', facts: ['Confirm actual bit diameter and stick-out before calculating a toolpath.', 'Keep clamps and screws outside every toolpath, including lead-ins, ramps, and rapid moves.', 'Run an air cut above the stock after changing workholding or coordinate assumptions.', 'Tabs, onion-skin passes, and spoilboard surfacing solve different part-holding problems; choose deliberately.'] },
  { test: /lathe|turn|bowl|spindle/i, answer: 'Lathe work begins with sound stock, secure mounting, a low starting speed, and tool-rest clearance checked by rotating the blank by hand.', facts: ['Stand out of the firing line when first bringing an irregular blank up to speed.', 'Move the tool rest only with the machine stopped and keep it close without touching the work.', 'Inspect firewood and found stock for checks, embedded metal, bark pockets, and decay.', 'A friction-fit lid must be judged after the wood equalizes; thin walls can move noticeably.'] },
  { test: /chisel|plane|hand saw|hand-tool|dovetail|mortise|tenon/i, answer: 'Hand-tool accuracy comes from sharp edges, secure workholding, visible layout lines, and removing waste in controlled increments.', facts: ['Work from the waste side and leave the line until the final fitting pass.', 'Pare with both hands behind the edge and never brace the work against the body.', 'Test the joint in matching scrap before changing a gauge or fence setting.', 'A polished edge cannot compensate for an incorrect bevel, rounded back, or unstable sharpening reference.'] },
  { test: /sharpen|honing|stone|grind/i, answer: 'A repeatable sharpening system matters more than chasing a fashionable angle or abrasive: establish the primary bevel, raise a burr, refine it, then remove it.', facts: ['Flatten waterstones often enough that the tool is not trained to a hollow reference.', 'Use coarse abrasive for repair and finer abrasive for refining; do not spend polishing time on damage that is still visible.', 'Mark the bevel with a felt-tip pen when checking jig registration.', 'Stop and cool the edge during grinding so heat does not damage the steel.'] },
  { test: /clamp|caul|assembly/i, answer: 'Clamps hold accurate parts together; they should not be used to bend a poor joint into temporary alignment.', facts: ['Dry-fit first and arrange clamps so their forces oppose rather than rack the assembly.', 'Alternate clamp positions above and below a panel to reduce bowing.', 'Use cauls to spread pressure and protect finished faces.', 'Recheck diagonals after pressure is applied because the assembly can move as joints close.'] },
  { test: /square|measure|layout|marking|cut list|diagram|woodworking plan/i, answer: 'Choose one reference face and one reference edge, mark every part from them, and verify the setup with a test rather than trusting the scale alone.', facts: ['Check a square by drawing a line, flipping the tool against the same edge, and drawing again; divergence shows twice the error.', 'Measure repeated parts with a stop or story stick instead of reading a tape for every piece.', 'Mark the waste side and include saw kerf when laying out parts from a fixed board length.', 'Compare case diagonals to diagnose square without assuming the floor or bench is flat.'] },
  { test: /board.?foot|lumber|board|wood species|hardwood|walnut|pine|cedar|plywood|MDF/i, answer: 'Buy lumber by the dimensions and defects you actually receive, not by the nominal label or a photograph of the best face.', facts: ['Board feet equal thickness in inches × width in inches × length in feet ÷ 12.', 'A nominal 2×4 commonly measures about 1-1/2 × 3-1/2 inches; measure the actual batch before drawing joinery.', 'Sight along both faces and edges for bow, crook, cup, and twist, then map knots and checks before cutting.', 'Allow waste for defects, grain matching, milling, and test cuts; highly figured or rough stock usually needs more margin.'] },
  { test: /drawer|slide|reveal/i, answer: 'A reliable drawer starts with a square opening, slide clearance taken from the exact hardware instructions, and a box built to the measured opening.', facts: ['Measure the opening at the front and back; use the smaller dimension when setting the box width.', 'Install slides from a spacer or story stick so both sides share the same setback and height.', 'Check the box diagonals before the bottom locks the shape.', 'Fit the applied front only after the drawer moves freely.'] },
  { test: /cabinet|bookcase|case|shelf|closet|pantry|locker/i, answer: 'Casework depends on square boxes, consistent reference edges, a back or stretcher that prevents racking, and attachment into verified structure.', facts: ['Cut paired sides together and machine shelf or hardware locations from one reference end.', 'A captured back makes squaring easier; compare diagonals before fastening it.', 'Long shelves need thicker stock, a front edging strip, or a center support to control sag.', 'Tall or climbable furniture needs an anti-tip strategy anchored to suitable structure.'] },
  { test: /table|desk|bench|workbench|top|counter/i, answer: 'A useful work surface begins with the required height, clearances, load, and support span—not a stock photo or nominal board size.', facts: ['Allow a solid-wood top to move across its width with figure-eight fasteners, clips, or slotted holes.', 'Place aprons and stretchers to resist racking without stealing knee, clamp, or drawer clearance.', 'Flatten the base contact points before chasing a twist in the top.', 'Move the finished piece through the doorway plan before committing to permanent joinery.'] },
  { test: /chair|stool|seat|footrest|kneeler/i, answer: 'Seating needs conservative joinery, comfortable dimensions confirmed with a mockup, and a progressive stability check before use.', facts: ['Typical dining-seat height is around 17 to 18 inches, but the table and intended user should set the final number.', 'Orient parts so short grain does not carry the primary load.', 'Ease touch edges and inspect every leg joint after the adhesive fully cures.', 'Do not rely on screws into end grain as the primary connection for a repeatedly loaded chair.'] },
  { test: /bed|dresser|wardrobe|chest|nightstand/i, answer: 'Bedroom furniture must fit the mattress or stored items, survive the route into the room, and resist racking or tip-over in service.', facts: ['Use the actual mattress and hardware dimensions rather than a nominal size label.', 'Beds benefit from knock-down rail hardware when they must move through stairs or narrow halls.', 'Tall cases and dressers require suitable anti-tip anchoring.', 'Finish and adhesive must cure fully before bedding or clothing traps odor against the surface.'] },
  { test: /outdoor|garden|patio|pergola|planter|bird|bat house|feeder|compost|hose|firewood/i, answer: 'Outdoor work lasts when it drains, avoids end-grain water traps, uses compatible corrosion-resistant hardware, and can be refinished without disassembly.', facts: ['Slope horizontal surfaces or leave drainage gaps instead of trapping standing water.', 'Seal or protect end grain and keep untreated wood away from soil contact.', 'Use exterior-rated fasteners compatible with the wood treatment and species.', 'Structural spans, hanging loads, footings, setbacks, and wildlife dimensions require current local or conservation guidance.'] },
  { test: /cutting board|serving board|cheese board|recipe|food/i, answer: 'Kitchen projects need stable grain orientation, easy-to-clean shapes, fully cured finishes, and no inaccessible seams that trap moisture.', facts: ['Avoid routing deep decorative grooves that cannot be cleaned.', 'Ease edges without creating a knife-catching lip on a cutting surface.', 'Use an adhesive and finish whose manufacturer explicitly supports the intended use after full cure.', 'Wash by hand and dry upright; repeated soaking and dishwashers accelerate joint failure.'] },
  { test: /toy|child|kids|dollhouse|growth chart|pet|dog|cat/i, answer: 'Projects for children or pets need rounded edges, captured hardware, stable geometry, and materials selected for the actual contact and abuse they will receive.', facts: ['Eliminate small detachable pieces and exposed fastener points where they create a foreseeable hazard.', 'Round touch edges consistently and inspect for splinters after finish cures.', 'Verify wall, window, or climbing supports against the expected dynamic load.', 'Use finish and hardware guidance appropriate to chewing, skin contact, or the user’s age.'] },
  { test: /storage|rack|cart|organizer|cabinet|tool wall|charging station/i, answer: 'Shop storage works when the heaviest item has the shortest fall, every load reaches structure, and frequently used tools can return home without moving something else.', facts: ['Anchor tall racks and cabinets into verified framing or masonry with suitable fasteners.', 'Set shelf spacing from the actual tools, batteries, cases, or lumber rather than a generic interval.', 'Keep chargers ventilated and follow their clearance instructions.', 'Casters and leveling feet must be rated for the loaded cart, not the empty cabinet.'] },
]

function topicFacts(guide) {
  const haystack = `${guide.title} ${guide.tags.join(' ')} ${guide.naturalOffers.join(' ')}`
  const titleMatches = factRules
    .map((rule) => ({ rule, index: guide.title.search(rule.test) }))
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index)
    .map(({ rule }) => rule)
  const matches = titleMatches.length ? titleMatches : factRules.filter((rule) => rule.test.test(haystack))
  const subject = lowerSubject(guide)
  const facts = matches.flatMap((rule) => rule.facts)
  for (const offer of guide.naturalOffers.slice(0, 3)) facts.push(`Treat ${offer.toLowerCase()} as a solution only when it removes a measured constraint in ${subject}; check compatibility, required accessories, storage, and recurring consumables first.`)
  facts.push(`For ${subject}, write down the starting condition, the reference that controls the result, and the visible check that tells you the operation is complete.`)
  facts.push(`Use a matching scrap test before an irreversible step in ${subject}, especially when cutter setup, grain direction, color, fit, or hardware clearance can change the outcome.`)
  return { answer: matches[0]?.answer ?? `Approach ${subject} by fixing the controlling reference first, changing one variable at a time, and checking the result before the next irreversible step.`, facts: [...new Set(facts)] }
}

function projectKind(title) {
  if (/birdhouse/i.test(title)) return 'birdhouse'
  if (/bat house/i.test(title)) return 'bat-house'
  if (/pergola/i.test(title)) return 'pergola'
  if (/picture frame|display frame/i.test(title)) return 'frame'
  if (/cutting board|serving board|cheese board/i.test(title)) return 'board'
  if (/box|crate|chest|trunk|watch box|recipe box|valet tray/i.test(title)) return 'box'
  if (/chair|Adirondack|lounge/i.test(title)) return 'chair'
  if (/stool|footrest|kneeler/i.test(title)) return 'stool'
  if (/bed frame|platform bed|storage bed/i.test(title)) return 'bed'
  if (/rack|cart|organizer|station|tool wall|storage|holder|dock/i.test(title) || /\bstand\b/i.test(title)) return 'rack'
  if (/jig|sled|guide|insert|template|winding sticks|bench hook|shooting board|caul|stop block|push-stick|push-block|router table|drill press table|outfeed table|assembly table|sanding table/i.test(title)) return 'jig'
  if (/bench|workbench/i.test(title)) return 'bench'
  if (/table|desk|island/i.test(title)) return 'table'
  if (/cabinet|bookcase|nightstand|dresser|wardrobe|vanity|console|case|pantry|locker/i.test(title)) return 'case'
  if (/shelf|mantel/i.test(title)) return 'shelf'
  if (/sign|clock|growth chart|ornament|block|phone speaker/i.test(title)) return 'small'
  if (/mallet|turn/i.test(title)) return 'turned'
  return 'shop-project'
}

const cut = (part, quantity, thickness, width, length, notes) => ({ part, quantity, thickness, width, length, ...(notes ? { notes } : {}) })

function planFor(guide) {
  if (guide.id === '003') return {
    kind: 'box', size: '12 × 8 × 6-1/4 in', metric: '305 × 203 × 159 mm', stock: 'one straight 1×6×8 ft pine board', joinery: 'glued butt joints reinforced with #8 × 1-1/4 in screws', finish: '80, 120, then 180 grit; optional water-based clear coat',
    cutList: [cut('Front and back', 2, '3/4 in', '5-1/2 in', '12 in'), cut('Ends', 2, '3/4 in', '5-1/2 in', '6-1/2 in'), cut('Bottom', 1, '3/4 in', '6-1/2 in', '10-1/2 in')],
  }
  if (guide.id === '450') return {
    kind: 'small', size: 'gift blanks from 2 × 4 in to 12 × 18 in', metric: 'gift blanks from 51 × 102 mm to 305 × 457 mm', stock: 'sorted hardwood and plywood offcuts at least 1/2 in thick', joinery: 'batch-specific long-grain glue joints, captured magnets, or mechanical hardware', finish: 'choose one repeatable finish schedule and allow a full cure before wrapping',
    cutList: [cut('Small blanks', 10, '1/2–3/4 in', '2–4 in', '4–8 in'), cut('Medium blanks', 10, '1/2–3/4 in', '4–8 in', '8–12 in'), cut('Large blanks', 5, '1/2–3/4 in', '8–12 in', '12–18 in'), cut('Setup and finish samples', 3, 'Match batch', '2 in', '4 in')],
  }
  const kind = projectKind(guide.title)
  const plans = {
    birdhouse: { size: '5 × 5 in floor; 8 in front panel', metric: '127 × 127 mm floor; 203 mm front', stock: '3/4 in untreated cedar or pine', joinery: 'exterior screws with one clean-out side', finish: 'leave the interior unfinished; finish only the exterior if desired', cutList: [cut('Floor', 1, '3/4 in', '5 in', '5 in'), cut('Front and back', 2, '3/4 in', '5 in', '8 in', 'Size entrance for the target species'), cut('Sides', 2, '3/4 in', '5 in', '6-1/2 in'), cut('Roof', 1, '3/4 in', '7 in', '8 in')] },
    'bat-house': { size: '24 × 16 × 3 in', metric: '610 × 406 × 76 mm', stock: 'exterior plywood and untreated cedar spacers', joinery: 'sealed exterior screws with a roughened landing area', finish: 'dark exterior finish only where regional conservation guidance recommends it', cutList: [cut('Back', 1, '1/2 in', '16 in', '24 in'), cut('Front', 1, '1/2 in', '16 in', '18 in'), cut('Side spacers', 2, '3/4 in', '2 in', '24 in'), cut('Roof', 1, '3/4 in', '5 in', '18 in')] },
    pergola: { size: '10 × 10 ft planning footprint', metric: '3.05 × 3.05 m planning footprint', stock: 'exterior structural lumber sized by local span and load requirements', joinery: 'rated structural connectors into code-compliant footings', finish: 'exterior finish compatible with the lumber treatment', cutList: [cut('Posts', 4, 'Per design', 'Per design', 'Per design', 'Size and footing require local approval'), cut('Primary beams', 2, 'Per design', 'Per design', '10 ft nominal'), cut('Rafters', 7, 'Per design', 'Per design', '11 ft nominal'), cut('Braces', 8, 'Per design', 'Per design', 'Cut after the frame is plumb')] },
    frame: { size: 'fits an 8 × 10 in image', metric: 'fits a 203 × 254 mm image', stock: '3/4 × 1-1/2 in straight hardwood', joinery: '45-degree miters reinforced with splines', finish: 'sand to 180 grit and apply a thin film finish', cutList: [cut('Long rails', 2, '3/4 in', '1-1/2 in', '13 in', 'Final length set from rabbet opening'), cut('Short rails', 2, '3/4 in', '1-1/2 in', '11 in'), cut('Spline stock', 4, '1/8 in', '1 in', '1-1/2 in'), cut('Backer', 1, '1/8 in', '8 in', '10 in')] },
    board: { size: '18 × 10 × 3/4 in', metric: '457 × 254 × 19 mm', stock: 'closed-grain hardwood strips', joinery: 'long-grain edge joints', finish: 'sand through 180 grit and use a fully cured finish intended for the use', cutList: [cut('Center strips', 4, '3/4 in', '2 in', '18 in'), cut('Edge strips', 2, '3/4 in', '1 in', '18 in'), cut('Handle test blank', 1, '3/4 in', '3 in', '6 in'), cut('Finish sample', 1, '3/4 in', '2 in', '4 in')] },
    box: { size: '12 × 8 × 6 in', metric: '305 × 203 × 152 mm', stock: '1/2 in hardwood or cabinet-grade plywood', joinery: 'rabbets or reinforced butt joints with a captured bottom', finish: 'sand through 180 grit and test the complete finish schedule', cutList: [cut('Front and back', 2, '1/2 in', '6 in', '12 in'), cut('Ends', 2, '1/2 in', '6 in', '7 in'), cut('Bottom', 1, '1/4 in', '7 in', '11 in'), cut('Lid', 1, '1/2 in', '8 in', '12 in')] },
    chair: { size: '18 in seat height; 18 × 17 in seat', metric: '457 mm seat height; 457 × 432 mm seat', stock: 'straight-grained 6/4 hardwood for legs and 4/4 stock for rails', joinery: 'mortise-and-tenon or loose-tenon frame with a captured seat', finish: 'ease every touch edge and use a fully cured durable furniture finish', cutList: [cut('Front legs', 2, '1-1/2 in', '1-1/2 in', '17-1/4 in'), cut('Back legs', 2, '1-1/2 in', '1-1/2 in', '34 in'), cut('Side rails', 2, '3/4 in', '3 in', '17 in'), cut('Front and back rails', 2, '3/4 in', '3 in', '18 in'), cut('Seat blank', 1, '3/4 in', '18 in', '17 in')] },
    stool: { size: '18 × 14 × 18 in high', metric: '457 × 356 × 457 mm high', stock: '3/4 in plywood or straight 1× hardwood', joinery: 'glued dadoes or screwed apron-and-leg construction', finish: 'ease the seat edges and apply a fully cured furniture finish', cutList: [cut('Seat', 1, '3/4 in', '14 in', '18 in'), cut('Legs', 4, '1-1/2 in', '1-1/2 in', '17-1/4 in'), cut('Long aprons', 2, '3/4 in', '3 in', '15 in'), cut('Short aprons', 2, '3/4 in', '3 in', '11 in')] },
    bed: { size: 'queen mattress: 60 × 80 in; verify actual mattress', metric: 'queen mattress: 1524 × 2032 mm; verify actual mattress', stock: '3/4 in plywood panels and straight hardwood rails', joinery: 'knock-down bed hardware with a supported center rail', finish: 'finish parts before final assembly and allow full cure', cutList: [cut('Side rails', 2, '1-1/2 in', '7 in', '80 in'), cut('Head and foot rails', 2, '1-1/2 in', '7 in', '63 in'), cut('Center rail', 1, '1-1/2 in', '3-1/2 in', '80 in'), cut('Slats', 14, '3/4 in', '3-1/2 in', '60 in'), cut('Legs', 6, '1-1/2 in', '1-1/2 in', '12 in')] },
    table: { size: '42 × 24 × 18 in high starting size', metric: '1067 × 610 × 457 mm high', stock: '4/4 hardwood or 3/4 in plywood top with solid edging', joinery: 'apron-and-leg base with movement-friendly top fasteners', finish: 'sand to 180 grit and use a durable fully cured furniture finish', cutList: [cut('Top', 1, '3/4 in', '24 in', '42 in'), cut('Legs', 4, '1-1/2 in', '1-1/2 in', '17-1/4 in'), cut('Long aprons', 2, '3/4 in', '3 in', '35 in'), cut('Short aprons', 2, '3/4 in', '3 in', '17 in'), cut('Lower shelf', 1, '3/4 in', '18 in', '34 in', 'Omit when the title does not call for storage')] },
    bench: { size: '48 × 24 × 34 in high starting size', metric: '1219 × 610 × 864 mm high', stock: 'straight construction lumber and a laminated or plywood top', joinery: 'bolted or drawbored base with long stretchers', finish: 'ease edges; leave clamping faces free of slippery finish', cutList: [cut('Top laminations or layers', 3, '1-1/2 in', '7-1/4 in', '48 in'), cut('Legs', 4, '3 in', '3 in', '32-1/2 in'), cut('Long stretchers', 2, '1-1/2 in', '3-1/2 in', '40 in'), cut('End stretchers', 2, '1-1/2 in', '3-1/2 in', '16 in'), cut('Lower shelf', 1, '3/4 in', '18 in', '40 in')] },
    case: { size: '30 × 14 × 36 in high starting case', metric: '762 × 356 × 914 mm high', stock: '3/4 in cabinet plywood with 1/4 in back', joinery: 'dados or screws with a captured back and solid front edging', finish: 'finish the interior before installing difficult hardware', cutList: [cut('Sides', 2, '3/4 in', '14 in', '36 in'), cut('Top and bottom', 2, '3/4 in', '14 in', '28-1/2 in'), cut('Shelves', 2, '3/4 in', '13-1/2 in', '28-1/2 in'), cut('Back', 1, '1/4 in', '30 in', '36 in'), cut('Face or edge strips', 4, '3/4 in', '1-1/2 in', '36 in')] },
    shelf: { size: '30 × 8 × 8 in', metric: '762 × 203 × 203 mm', stock: '3/4 in hardwood or cabinet plywood', joinery: 'dados or concealed brackets rated for the expected load', finish: 'sand through 180 grit and finish before final wall mounting', cutList: [cut('Shelf', 1, '3/4 in', '8 in', '30 in'), cut('Front edge', 1, '3/4 in', '1-1/2 in', '30 in'), cut('Wall cleat', 1, '3/4 in', '3 in', '28 in'), cut('End returns', 2, '3/4 in', '8 in', '7-1/4 in')] },
    rack: { size: '36 × 18 × 34 in high starting size', metric: '914 × 457 × 864 mm high', stock: '3/4 in plywood with solid cleats and rated casters or anchors', joinery: 'glued and screwed casework tied into verified load paths', finish: 'clear coat for cleanability; keep charger vents and machine cooling paths open', cutList: [cut('Sides', 2, '3/4 in', '18 in', '32 in'), cut('Top and bottom', 2, '3/4 in', '18 in', '34-1/2 in'), cut('Shelves or rails', 3, '3/4 in', '4 in', '34-1/2 in'), cut('Back or braces', 1, '1/2 in', '36 in', '32 in'), cut('Base stretchers', 2, '1-1/2 in', '3-1/2 in', '34-1/2 in')] },
    jig: { size: '24 × 16 in working base', metric: '610 × 406 mm working base', stock: '3/4 in stable plywood plus straight hardwood runners or fences', joinery: 'glue and countersunk screws kept outside every cutter path', finish: 'wax sliding surfaces only after confirming they still provide safe control', cutList: [cut('Base', 1, '3/4 in', '16 in', '24 in'), cut('Primary fence', 1, '3/4 in', '3 in', '24 in'), cut('Secondary fence or stop', 1, '3/4 in', '2 in', '16 in'), cut('Runner or guide strip', 2, '3/8 in', '3/4 in', '20 in', 'Fit to the actual machine slot or guide')] },
    small: { size: '12 × 6 × 3/4 in starting blank', metric: '305 × 152 × 19 mm starting blank', stock: 'straight, defect-free hardwood scrap', joinery: 'shape from one blank or use long-grain glue joints', finish: 'ease every edge and choose finish for the actual handling conditions', cutList: [cut('Main blank', 1, '3/4 in', '6 in', '12 in'), cut('Base or back', 1, '3/4 in', '4 in', '6 in'), cut('Accent strip', 1, '1/4 in', '1 in', '12 in'), cut('Setup sample', 1, '3/4 in', '2 in', '4 in')] },
    turned: { size: '3 × 3 × 12 in turning blank', metric: '76 × 76 × 305 mm turning blank', stock: 'sound straight-grained hardwood blank', joinery: 'single blank or a fully cured face-grain lamination', finish: 'apply with the lathe stopped unless the finish and method explicitly permit otherwise', cutList: [cut('Turning blank', 1, '3 in', '3 in', '12 in'), cut('Test blank', 1, '2 in', '2 in', '6 in'), cut('Handle wedge stock', 2, '1/8 in', '1 in', '2 in'), cut('Finish sample', 1, '3/4 in', '2 in', '4 in')] },
    'shop-project': { size: '24 × 16 × 12 in starting envelope', metric: '610 × 406 × 305 mm starting envelope', stock: '3/4 in plywood and straight hardwood where wear resistance matters', joinery: 'glue and screws or project-appropriate mechanical hardware', finish: 'ease exposed edges and finish for the expected wear or exposure', cutList: [cut('Base', 1, '3/4 in', '16 in', '24 in'), cut('Sides', 2, '3/4 in', '12 in', '16 in'), cut('Front and back', 2, '3/4 in', '12 in', '22-1/2 in'), cut('Working surface', 1, '3/4 in', '16 in', '24 in')] },
  }
  const plan = { kind, ...plans[kind] }
  if (/dining table/i.test(guide.title)) {
    Object.assign(plan, { size: '72 × 36 × 30 in high', metric: '1829 × 914 × 762 mm high', cutList: [cut('Top', 1, '1 in', '36 in', '72 in'), cut('Legs or pedestal components', 4, '2 in', '2 in', '29 in'), cut('Long aprons', 2, '3/4 in', '4 in', '65 in'), cut('End aprons', 2, '3/4 in', '4 in', '29 in'), cut('Top attachment rails', 2, '3/4 in', '2 in', '29 in')] })
  } else if (/end table|side table/i.test(guide.title)) {
    Object.assign(plan, { size: '22 × 18 × 24 in high', metric: '559 × 457 × 610 mm high', cutList: [cut('Top', 1, '3/4 in', '18 in', '22 in'), cut('Legs', 4, '1-1/2 in', '1-1/2 in', '23-1/4 in'), cut('Long aprons', 2, '3/4 in', '3 in', '15 in'), cut('Short aprons', 2, '3/4 in', '3 in', '11 in'), cut('Drawer rail', 1, '3/4 in', '2 in', '15 in')] })
  } else if (/console table|sofa table/i.test(guide.title)) {
    Object.assign(plan, { size: '48 × 12 × 30 in high', metric: '1219 × 305 × 762 mm high', cutList: [cut('Top', 1, '3/4 in', '12 in', '48 in'), cut('Legs', 4, '1-1/2 in', '1-1/2 in', '29-1/4 in'), cut('Long aprons', 2, '3/4 in', '3 in', '41 in'), cut('Short aprons', 2, '3/4 in', '3 in', '5 in'), cut('Lower stretcher', 1, '3/4 in', '3 in', '41 in')] })
  } else if (/desk/i.test(guide.title)) {
    Object.assign(plan, { size: '48 × 24 × 30 in high', metric: '1219 × 610 × 762 mm high', cutList: [cut('Desktop', 1, '3/4 in', '24 in', '48 in'), cut('Legs or side panels', 2, '3/4 in', '24 in', '29-1/4 in'), cut('Rear stretcher', 1, '3/4 in', '6 in', '46-1/2 in'), cut('Front rail', 1, '3/4 in', '3 in', '46-1/2 in'), cut('Cable tray', 1, '1/2 in', '5 in', '42 in')] })
  }
  if (/nightstand/i.test(guide.title)) {
    Object.assign(plan, { size: '22 × 16 × 24 in high', metric: '559 × 406 × 610 mm high', stock: '3/4 in cabinet plywood or straight hardwood with 1/4 in back stock', cutList: [cut('Sides', 2, '3/4 in', '16 in', '23-1/4 in'), cut('Top and bottom', 2, '3/4 in', '16 in', '20-1/2 in'), cut('Back', 1, '1/4 in', '22 in', '23-1/4 in'), cut('Drawer rails', 2, '3/4 in', '2 in', '20-1/2 in')] })
  } else if (/dresser/i.test(guide.title)) {
    Object.assign(plan, { size: '60 × 18 × 34 in high', metric: '1524 × 457 × 864 mm high', stock: '3/4 in cabinet plywood with 1/4 in back and solid front edging', cutList: [cut('Sides', 2, '3/4 in', '18 in', '33-1/4 in'), cut('Top and bottom', 2, '3/4 in', '18 in', '58-1/2 in'), cut('Center divider', 1, '3/4 in', '17-1/2 in', '32-1/2 in'), cut('Drawer rails', 6, '3/4 in', '2 in', '28-3/4 in'), cut('Back', 1, '1/4 in', '60 in', '33-1/4 in')] })
  }
  if (kind === 'bench' && !/workbench/i.test(guide.title)) {
    Object.assign(plan, { size: '48 × 16 × 18 in high', metric: '1219 × 406 × 457 mm high', stock: 'straight 4/4 hardwood or exterior-rated lumber for outdoor use', cutList: [cut('Seat', 1, '3/4 in', '16 in', '48 in'), cut('Legs', 4, '1-1/2 in', '1-1/2 in', '17-1/4 in'), cut('Long aprons', 2, '3/4 in', '3 in', '41 in'), cut('End aprons', 2, '3/4 in', '3 in', '9 in'), cut('Center stretcher', 1, '3/4 in', '3 in', '41 in')] })
  }
  const drawerWord = guide.title.match(/\b(one|two|three|four|five|six|seven|eight|\d+)[- ]drawer/i)?.[1]
  const drawerCount = drawerWord ? ({ one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8 }[drawerWord.toLowerCase()] ?? Number(drawerWord)) : 0
  if (drawerCount > 0) {
    plan.cutList = [...plan.cutList, cut('Drawer sides', drawerCount * 2, '1/2 in', '4 in', '12 in', 'Size to the measured opening and slide clearance'), cut('Drawer fronts and backs', drawerCount * 2, '1/2 in', '4 in', 'Opening minus side thickness'), cut('Drawer bottoms', drawerCount, '1/4 in', 'Fit to groove', 'Fit to groove'), cut('Applied drawer fronts', drawerCount, '3/4 in', 'Fit reveal', 'Fit reveal')]
  }
  if (/one sheet of plywood/i.test(guide.title)) plan.stock = 'one 4 × 8 ft sheet of 3/4 in cabinet plywood plus 1/4 in back stock'
  if (/from one board/i.test(guide.title)) plan.stock = 'one straight board sized for the complete cut list and one setup offcut'
  return plan
}

function projectTools(guide, plan) {
  if (guide.id === '003') return [
    { name: 'Combination square', required: true, purpose: 'Lay out square cuts and screw locations' },
    { name: 'Crosscut handsaw', required: true, purpose: 'Cut all five pine parts to length' },
    { name: 'Drill/driver with countersink bit', required: true, purpose: 'Predrill and drive the reinforcing screws' },
  ]
  const cutter = /router/i.test(guide.title) ? 'Router with the project-specific bit' : /table saw/i.test(guide.title) ? 'Table saw with guard and riving knife' : /CNC/i.test(guide.title) ? 'CNC router with verified workholding' : /turn|lathe/i.test(guide.title) ? 'Lathe and appropriate turning tools' : 'Saw suited to the stock and cut'
  return [
    { name: 'Tape measure, pencil, and combination square', required: true, purpose: `Lay out the ${plan.size} starting plan from one reference edge` },
    { name: cutter, required: true, purpose: 'Cut the listed parts with full stock and offcut support' },
    { name: 'Drill/driver and project-appropriate bits', required: true, purpose: 'Predrill hardware and assemble without splitting the stock' },
    { name: 'Four clamps and two straight cauls', required: true, purpose: 'Hold the dry fit and control square during glue-up' },
    { name: 'Sanding block or random-orbit sander', required: false, purpose: 'Refine surfaces without rounding reference edges before assembly' },
  ]
}

function projectMaterials(plan) {
  return [
    { name: 'Primary stock', quantity: plan.stock, notes: 'Buy enough for the cut list plus test cuts and visible defects' },
    { name: 'Joinery supplies', quantity: 'One project set', notes: plan.joinery },
    { name: 'Wood glue', quantity: '4–8 fl oz', notes: 'Use an adhesive suited to the exposure and follow its open, clamp, and cure times' },
    { name: 'Abrasives', quantity: '80, 120, and 180 grit', notes: 'Start finer when the stock is already free of milling damage' },
    { name: 'Finish', quantity: 'One sample plus project coverage', notes: plan.finish },
  ]
}

const literalLists = {
  '002': ['1. Combination square — $12–$25; controls square layout and machine checks; a verified used square is fine.', '2. 12–16 ft tape measure — $8–$18; covers furniture-scale layout without paying for jobsite reach.', '3. Drill/driver — $50–$100; drills pilot holes and drives screws; buy into a battery system only after checking future tools.', '4. Crosscut handsaw — $20–$40; handles first project cuts quietly; a sharp used saw is reasonable if the plate is straight.', '5. Four clamps — $30–$60 total; start with two 12-inch and two 24-inch clamps rather than one premium clamp.', '6. Random-orbit sander — $40–$80; speeds surface preparation; a sanding block substitutes on small projects.', '7. Circular saw — $60–$120; breaks down boards and sheet goods; pair it with a straightedge before buying a track saw.', '8. Jigsaw — $50–$100; cuts curves and interior openings; spend on sharp blades before extra speed settings.', '9. Trim router — $80–$140; handles edge profiles, flush trimming, and light joinery; wait until three planned projects need it.', '10. Shop vacuum — $60–$120; captures chips at portable tools; budget for adapters and an appropriate filter.'],
  '012': ['1. Handsaw against a square layout line — quiet and inexpensive, but the cut depends on body position and practice.', '2. Circular saw against a clamped straightedge — useful for large boards and sheet goods when the offset is measured accurately.', '3. Miter saw with full stock support — fast for repeated crosscuts, but capacity and calibration limit the work.', '4. Table saw sled or miter gauge — repeatable for square parts when the work is controlled by the crosscut reference, not the rip fence.'],
  '016': ['1. Buying bowed or twisted stock without mapping usable parts.', '2. Measuring repeated parts independently instead of using one stop.', '3. Cutting on the layout line instead of leaving the line on the finished part.', '4. Milling immediately to final thickness before the boards can rest.', '5. Skipping the matching-scrap test for joinery, stain, or finish.', '6. Using clamp force to hide a joint that did not close during the dry fit.', '7. Buying a specialized tool before three planned projects need its capability.'],
  '023': ['1. Reinforced butt joint — the simplest assembly lesson; use long-grain contact and suitable screws or dowels.', '2. Rabbet or dado — adds registration and useful glue area to boxes, shelves, and casework.', '3. Half-lap — teaches accurate depth while leaving broad long-grain contact.', '4. Dowel or loose-tenon joint — separates the mortise operation from the structural tenon.', '5. Mortise-and-tenon joint — a durable frame connection that teaches shoulders, alignment, and controlled fit.'],
  '025': Array.from({ length: 30 }, (_, index) => `${index + 1}. Day ${index + 1}: ${['square and mark three lines on scrap', 'saw to the waste side of a line', 'drill and countersink a clean pilot hole', 'sand one labeled sample through 80, 120, and 180 grit', 'practice one clamped glue joint', 'build one small part from a stop setup'][index % 6]}; record the setup and one correction before stopping.`),
  '074': ['1. Full-width dado — strong registration and broad glue area for a fixed shelf.', '2. Stopped dado — preserves a clean case front while retaining the dado’s alignment.', '3. Sliding dovetail — resists withdrawal but demands accurate stock thickness and a controlled fit.', '4. Dowels or loose tenons — useful when a visible dado is unwanted and alignment can be jigged.', '5. Cleats or adjustable shelf pins — choose cleats for simple fixed support and pins when shelf height must change.'],
  '086': ['1. Make a 3-inch crosscut while watching the reflection in the saw plate.', '2. Repeat the crosscut with the board raised so the far layout line stays visible.', '3. Saw a 6-inch rip to the waste side and check drift at three points.', '4. Cut a 45-degree line without correcting mid-stroke, then inspect the bias.', '5. Return to a square crosscut and apply the one body-position correction revealed by the first four cuts.'],
  '225': ['1. Bench hook for controlled hand sawing', '2. Shooting board for square end grain', '3. Crosscut sled for repeatable table-saw cuts', '4. Zero-clearance insert for narrow offcut support', '5. Straightedge guide for a circular saw', '6. Router trammel for circles and arcs', '7. Tapering jig with positive stops', '8. Drill-press depth and fence stop', '9. Right-angle assembly blocks', '10. Clamping cauls for flat panels', '11. Thin-rip guide that keeps hands away from the blade', '12. Story stick for repeated cabinet and furniture dimensions'],
  '288': ['1. Long-grain edge joint — broad face-grain contact; failure usually points to poor fit, contamination, or starved glue.', '2. Half-lap joint — combines mechanical overlap with long-grain glue area; inaccurate depth prevents full contact.', '3. Mortise-and-tenon joint — carries frame loads through shoulders and cheeks; gaps or short grain weaken the path.', '4. Dowel or loose-tenon joint — strong when holes align and leave adequate material around them.', '5. End-grain butt joint — poor as a glue-only structural joint; redesign it with a rabbet, spline, dowel, screw, or other reinforcement.'],
  '450': ['1. Phone stand', '2. Tablet stand', '3. Tea-light holder', '4. Plant propagation block', '5. Coaster set', '6. Bottle opener handle', '7. Small serving board', '8. Recipe card holder', '9. Business-card stand', '10. Picture frame', '11. Bud vase block', '12. Pencil tray', '13. Headphone hook', '14. Key rack', '15. Napkin holder', '16. Book stand', '17. Ornament set', '18. Garden dibber', '19. Magnetic knife-strip accent', '20. Desk nameplate', '21. Ring dish', '22. Cable organizer', '23. Wall peg set', '24. Plant riser', '25. Small keepsake box'],
}

const budgetLists = {
  '008': ['Combination square — $12', 'Japanese-style pull saw — $18', 'Used corded drill and basic bits — $30', 'Two 12-inch clamps — $20', '80/120/180-grit sandpaper — $10', 'Wood glue — $6', 'Pencil and scratch awl — $4', 'Total — $100'],
  '009': ['Circular saw and straightedge guide — $90', 'Drill/driver kit — $80', 'Random-orbit sander — $60', 'Shop vacuum and adapters — $80', 'Four useful clamps — $60', 'Square, tape, and marking tools — $35', 'Quality blade and starter bits — $45', 'Eye, hearing, and respiratory protection — $30', 'Glue and abrasive refill — $20', 'Total — $500'],
  '249': ['Open bins for daily-use supplies — $25', 'French-cleat stock or pegboard — $20', 'High-CRI task light — $25', 'Hooks and small brackets — $15', 'Labels and marker — $5', 'Bench brush and dustpan — $10', 'Total — $100'],
}

const literalHeadings = {
  '002': 'The first 10 tools, in buying order',
  '012': 'Four ways to make a square cut',
  '016': 'Seven mistakes that waste material',
  '023': 'The first five joints to learn',
  '025': 'The complete 30-day practice schedule',
  '074': 'Five shelf-joinery options and their tradeoffs',
  '086': 'The five-cut practice drill',
  '225': 'The 12 jigs and the job each one solves',
  '288': 'Five glue joints and how their load paths differ',
  '450': '25 scrap-wood gifts worth batching',
}

const honestTitleRevisions = {
  '074': { title: 'Shelf Joinery Compared: Five Strong Options and Their Tradeoffs', slug: 'shelf-joinery-compared-five-strong-options-and-their-tradeoffs' },
  '105': { title: 'Table Saw Blade Height: Safety, Cut Quality, and Heat Tradeoffs', slug: 'table-saw-blade-height-safety-cut-quality-and-heat-tradeoffs' },
  '279': { title: 'Mesh vs. Paper Sanding Discs: Cut Rate, Dust, and Cost Compared', slug: 'mesh-vs-paper-sanding-discs-cut-rate-dust-and-cost-compared' },
  '288': { title: 'Five Wood Glue Joints: Load Paths and Common Failure Risks', slug: 'five-wood-glue-joints-load-paths-and-common-failure-risks' },
}

function buildSections(guide, plan, facts) {
  const subject = lowerSubject(guide)
  const literal = literalLists[guide.id]
  const sections = [
    {
      id: 'plan-at-a-glance',
      heading: `${sentence(subject).slice(0, -1)}: dimensions and build plan`,
      paragraphs: [`Start with a finished size of ${plan.size} (${plan.metric}). This is a practical baseline, not a command to ignore the room, machine, hardware, mattress, wildlife, or user dimensions named in the title. Measure those constraints first and change the cut list before buying stock.`, `The baseline uses ${plan.stock}. The joinery route is ${plan.joinery}. Expect a material spend around ${priceBand(guide.costBand)} before optional hardware or finish upgrades; price the complete list locally because lumber grade and regional availability change the total.`],
      bullets: [`Finished size: ${plan.size}`, `Primary stock: ${plan.stock}`, `Joinery: ${plan.joinery}`, `Finish route: ${plan.finish}`, `Working time: about ${Math.max(2, Math.round((guide.activeMinutes ?? 240) / 60))} hours plus adhesive and finish cure time`],
    },
    ...(literal ? [{ id: 'literal-list', heading: literalHeadings[guide.id] ?? `The complete ${literal.length}-item plan`, paragraphs: [`This list is the literal promise in the title. Treat it as the working sequence or shortlist, and remove any item that does not fit the actual stock, recipient, machine, or safety constraints.`], bullets: literal }] : []),
    {
      id: 'cut-and-layout',
      heading: `Lay out and cut the parts for ${subject}`,
      paragraphs: [`Mill or select the straightest stock for the longest parts in the cut list. Mark one reference face and edge, label every component, and place visible defects where they can be cut away. Cut the longest parts first, then produce repeated parts from one verified stop instead of measuring each one independently.`, `Account for blade kerf when several pieces come from one board. Make the first critical cut in scrap, compare it with the listed dimension, and adjust the setup before cutting the full batch. Preserve show faces and grain matches as labeled pairs.`],
      bullets: [`Confirm actual stock thickness before setting dados, rabbets, hardware, or fastener length.`, `Support both the workpiece and offcut through every cut.`, `Keep screws, clamps, and stops outside the cutter path.`, facts.facts[0], facts.facts[1]],
    },
    {
      id: 'dry-fit',
      heading: `Dry-fit ${subject} before glue or final hardware`,
      paragraphs: [`Assemble the project without adhesive and check the dimensions that control function: overall footprint, opening size, hardware clearance, level, and equal diagonals where the form should be square. Each joint should close with ordinary clamp pressure. Recut or refit a part that needs force to hide a gap.`, `Rehearse the assembly in the same order you will use with glue. Stage clamps, cauls, a square, damp cleanup cloths where compatible with the adhesive, and every fastener. Confirm that the finished assembly can pass through doors and reach its installed position.`],
      bullets: [`Compare diagonals before and after clamp pressure.`, `Check the project on a known-flat surface rather than compensating for an uneven floor.`, `Verify hardware against the actual part, not only the catalog dimension.`, facts.facts[2], facts.facts[3]],
    },
    {
      id: 'assembly',
      heading: `Assemble ${subject} in a controlled order`,
      paragraphs: [`Join the smallest stable subassemblies first, let them reach the adhesive maker’s stated handling strength, then connect them into the complete piece. Predrill near ends, use fasteners that stop short of the opposite face, and tighten only enough to seat the joint without crushing fibers or stripping the hole.`, `Keep checking square as the clamps close. For solid wood, use slotted holes, clips, or suitable hardware wherever a wide panel crosses a rigid frame. Remove squeeze-out at the stage recommended for the adhesive instead of smearing it into a surface that must accept stain.`],
      callout: { tone: 'tip', title: 'The useful pause', body: `Stop after the dry fit and again after the first stable subassembly. Errors in ${subject} are cheaper to correct before the cut list becomes one glued object.` },
    },
    {
      id: 'surface-and-finish',
      heading: `Prepare and finish ${subject}`,
      paragraphs: [`Level glue lines and remove milling marks before moving through 80, 120, and 180 grit; begin at 120 when the surface is already clean. Vacuum between grits and inspect in raking light. Ease touch edges consistently while preserving reference surfaces and hardware fits.`, `Make a labeled finish sample from the same stock. Follow the product instructions for surface preparation, temperature, ventilation, coat thickness, recoat window, and full cure. Do not place the project into service while the finish or structural adhesive is still curing.`],
      bullets: [facts.facts[4] ?? facts.facts[0], facts.facts[5] ?? facts.facts[1], `Record the final size and any cut-list correction directly on the plan for the next ${subject}.`],
    },
    {
      id: 'troubleshooting',
      heading: `Fix the likely problems in ${subject}`,
      paragraphs: [`Rocking or racking usually begins with unequal parts, a twisted reference surface, or clamp pressure that moved the assembly. Loosen mechanical joints or correct the dry subassembly instead of trimming random contact points. A visible gap at one joint is evidence to inspect the mating surfaces and diagonals.`, `A finish defect should be diagnosed on the sample first. Dust nibs, blotching, glue contamination, cross-grain scratches, and an uncured surface need different remedies. Change one variable at a time and stop sanding as soon as the defect is gone so dimensions and edge lines remain intact.`],
      bullets: facts.facts.slice(0, 6),
    },
  ]
  return sections
}

function comparisonOptions(guide) {
  const match = guide.title.match(/^(.+?)\s+vs\.?\s+(.+?)(?::|$)/i)
  if (match) return [match[1].trim(), match[2].trim()]
  const cleanOffers = guide.naturalOffers.filter((offer) => !/scenario|verdict|warning|caveat|data|method/i.test(offer))
  return cleanOffers.length ? cleanOffers.slice(0, 5) : ['the minimum-cost route', 'the balanced route', 'the capacity-first route']
}

function buySections(guide, facts) {
  const subject = lowerSubject(guide)
  const options = comparisonOptions(guide)
  const literal = literalLists[guide.id]
  const budget = budgetLists[guide.id]
  return [
    {
      id: 'short-answer',
      heading: `The short answer on ${subject}`,
      paragraphs: [`${facts.answer} For this buying decision, the right choice is the least expensive complete system that fits the real stock, space, accuracy, dust, power, and frequency requirements. A discounted tool that needs a new circuit, stand, blade, rail, battery, or collector is not the cheaper option.`, `Before comparing brands, write down the largest ordinary workpiece, the operation that currently causes trouble, available infeed and outfeed space, and the next three projects. If the tool will not change those projects, keep the current method, rent, or outsource the rare operation.`],
    },
    ...(literal ? [{ id: 'ranked-list', heading: literalHeadings[guide.id] ?? `The complete ${literal.length}-item comparison`, paragraphs: ['This sequence favors options that solve a defined woodworking constraint and remain useful after the shop grows. Prices are broad street-price ranges, not promises; used tools are sensible only when safety parts, cords, batteries, fences, and adjustments are complete and sound.'], bullets: literal }] : []),
    ...(budget ? [{ id: 'working-budget', heading: `A concrete ${guide.title.match(/\$\d+/)?.[0] ?? '$100'} shopping plan`, paragraphs: ['This is a zero-based example budget: every dollar has a job. Local prices change, so preserve the order of capability and replace an item with a safe used equivalent before quietly exceeding the total.'], bullets: budget }] : []),
    {
      id: 'option-by-option',
      heading: `Compare the realistic routes for ${subject}`,
      paragraphs: [`Compare complete, compatible systems under the same conditions. Record base price, required cutter or abrasive, dust connection, power, usable capacity, setup footprint, storage footprint, and the adjustment that controls accuracy. Manufacturer specifications describe capacity; they do not prove ergonomics, dust capture, or repeatability in a particular shop.`, `The shortlist below comes from the actual alternatives named by this topic. Eliminate an option as soon as it fails a required capacity, safety, compatibility, or space constraint instead of letting a feature list pull it back into consideration.`],
      bullets: options.map((option, index) => `${option}: ${index === 0 ? 'start here when budget, simplicity, or footprint matters most' : index === options.length - 1 ? 'choose this only when its added capacity or repeatability appears in planned work' : 'treat this as the balanced route and price every required accessory'}.`),
    },
    {
      id: 'specifications',
      heading: `Specifications that matter for ${subject}`,
      paragraphs: [`Prioritize specifications that change the cut, fit, surface, or ownership burden. Capacity is useful only with stock support; power is useful only on an available circuit; accuracy is useful only when the fence, guide, table, collet, or depth stop can return to a setting.`, `Check the replacement ecosystem before checkout. Blades, bits, abrasives, batteries, cartridges, filters, rails, collets, and proprietary hardware can cost more over time than the difference between two base tools.`],
      bullets: facts.facts.slice(0, 7),
    },
    {
      id: 'full-cost',
      heading: 'Price the usable first-year system',
      paragraphs: [`Start with the base tool, then add the first suitable cutter or abrasive, dust adapters, hose, stand or mobile base, batteries and charger, guides, setup gauges, protective equipment, and one year of likely consumables. Add storage space and electrical work when they are genuine requirements.`, `Use current merchant and manufacturer information at the time of purchase because price, included components, warranty, stock, and model numbers change. The planning band for this category is ${priceBand(guide.costBand)}, but the complete local total is the number that belongs in the decision.`],
      bullets: [`Base tool or method: record the exact model and included components.`, `Required accessories: separate “needed on day one” from convenience upgrades.`, `Consumables: estimate blades, bits, abrasives, filters, batteries, or finish for one year.`, `Infrastructure: include power, dust collection, support, and storage.`, `Exit cost: check resale, repair parts, and whether accessories transfer to another tool.`],
    },
    {
      id: 'fit-and-skip',
      heading: `Who should choose—or skip—a route for ${subject}`,
      paragraphs: [`Choose the smaller or simpler route when it safely handles ordinary stock and the saved money completes the system with a better cutter, workholding, or dust connection. Choose more capacity when the larger work appears often enough to repay the footprint, setup time, and supporting equipment.`, `Skip the purchase when a straightedge, jig, surfaced lumber, rental, shared shop, or current tool produces the required result at the actual project frequency. An upgrade is justified by repeated constraint removal, safer control, or a new capability—not by a temporary sale.`],
      callout: { tone: 'decision', title: 'A defensible purchase test', body: `Name three planned jobs for ${subject}, the specific limitation the purchase removes, and the full ready-to-work cost. If one answer is missing, wait.` },
    },
    {
      id: 'checkout-checklist',
      heading: `Final checklist for ${subject}`,
      paragraphs: [`Confirm the exact model number and current manual, then check safety equipment, included parts, electrical requirements, dust port, maximum and minimum stock dimensions, cutter compatibility, warranty, return terms, and replacement-part availability. Compare prices only after the configurations match.`, `Keep the receipt, serial number, manual, setup measurements, and first scrap result together. Revisit the choice when models, safety notices, consumables, or the project mix changes; an old affiliate link is never a reason to preserve an outdated recommendation.`],
      bullets: [`Fits the largest ordinary workpiece`, `Runs on available power and dust collection`, `Includes or accepts the required cutter and safety parts`, `Fits both operating and storage space`, `Has a cheaper alternative that was considered honestly`, `Solves a repeated problem in at least three planned projects`],
    },
  ]
}

function practiceSteps(guide, facts) {
  if (guide.id === '025') return literalLists['025']
  const subject = lowerSubject(guide)
  return [
    `1. Define the finished result for ${subject} in a dimension, fit, surface, or decision you can inspect.`,
    `2. Select one reliable face, edge, line, fence, guide, or sample as the controlling reference.`,
    `3. Inspect stock, cutter, abrasive, workholding, and protective equipment before changing a setting.`,
    `4. Rehearse the hand path and support the work and offcut before starting the operation.`,
    `5. Make one labeled attempt in matching scrap and compare it with the target.`,
    `6. Change only one variable—depth, feed, angle, pressure, grit, or support—then repeat the test.`,
    `7. Carry the proven setup into the project part and stop as soon as the result is correct.`,
    `8. Record the material, tool, setting, and correction so the next ${subject} setup starts from evidence rather than memory.`,
    facts.facts[0],
    facts.facts[1],
  ]
}

function learnSections(guide, facts) {
  const subject = lowerSubject(guide)
  const literal = literalLists[guide.id]
  const isComparison = /\bvs\.?\b|versus/i.test(guide.title)
  const comparison = isComparison ? comparisonOptions(guide) : []
  return [
    {
      id: 'answer-first',
      heading: `The useful answer: ${sentence(subject).slice(0, -1)}`,
      paragraphs: [`${facts.answer} The person using this guide should be able to make a controlled setup, recognize a correct result, and diagnose the first visible failure without buying a machine simply because it appears in somebody else’s workflow.`, `Start with the actual stock, tool, space, and tolerance involved. Mark the reference that controls the result and decide what can be measured before beginning. That turns ${subject} from a vague technique into a repeatable shop operation.`],
    },
    ...(isComparison ? [{
      id: 'option-by-option',
      heading: `The practical difference between ${comparison.join(' and ')}`,
      paragraphs: [`Treat the options as different routes to a result rather than opponents in a universal contest. Compare the reference each method creates, the stock or scale it accepts, the setup it requires, and the failure that becomes more likely when it is pushed beyond its useful range.`],
      bullets: comparison.map((option, index) => `${option}: ${index === 0 ? 'favor this when its simpler reference or lower setup burden matches the work' : 'favor this when its added capacity, control, or repeatability is needed often enough to justify the tradeoff'}.`),
    }] : []),
    ...(literal ? [{ id: 'literal-plan', heading: literalHeadings[guide.id] ?? `The complete ${literal.length}-item plan`, paragraphs: [`The list below delivers the number promised in the title. Complete it in order when the skills build on one another; otherwise start with the item that removes the most common constraint in the current project.`], bullets: literal }] : []),
    {
      id: 'what-matters',
      heading: `What changes the result in ${subject}`,
      paragraphs: [`Separate the variables you can control from the condition you inherit. Stock flatness, grain, moisture, previous finish, cutter condition, machine alignment, support, and lighting can all change what a “correct” technique looks like. Record the starting condition before adjusting several things at once.`, `The details below are the working checks for this topic. Use the ones that match the exact operation and defer to the current tool, material, adhesive, finish, and safety instructions where they set a limit.`],
      bullets: facts.facts.slice(0, 8),
    },
    {
      id: 'working-method',
      heading: `A repeatable method for ${subject}`,
      paragraphs: [`Work from one stable reference and inspect after each irreversible step. Repeated parts should share a stop, jig, story stick, or setup rather than being measured independently. A successful scrap result is useful only when the project stock shares the same thickness, species, grain orientation, and support conditions.`, `Keep both hands, the workpiece, and the offcut controlled from the beginning of the operation through the stop. If the method requires reaching over a cutter, balancing the work, defeating a guard, or holding a part too small to control, choose a carrier, jig, hand-tool route, or different machine.`],
      bullets: practiceSteps(guide, facts),
    },
    {
      id: 'read-the-result',
      heading: `Read the result instead of guessing at ${subject}`,
      paragraphs: [`Inspect the first result in direct and raking light. Use a straightedge, square, winding sticks, feeler, sample joint, or labeled comparison piece that matches the promise in the title. Stop while the work is correct; extra passes made from habit often introduce taper, rounded edges, loose fit, or a deeper scratch pattern.`, `Repeat the successful setup once before trusting it. Two matching results show that the reference and method are stable; one good result may be luck. Mark the accepted sample with the date, material, tool, cutter or grit, and setting.`],
      bullets: [facts.facts[2], facts.facts[3], facts.facts[4] ?? `Keep one labeled ${subject} sample near the tool or plan.`],
    },
    {
      id: 'troubleshooting',
      heading: `Troubleshoot ${subject} from the first failure`,
      paragraphs: [`When the result drifts, stop at the earliest place the reference changed. Check workholding, stock stability, sharpness, alignment, support, grain direction, and measurement before adding pressure or taking another pass. Changing multiple settings destroys the comparison that would identify the cause.`, `Return to the baseline and make one corrective test in scrap. If it improves, repeat it. If it does not, restore the original setting and test the next likely variable. This costs less stock than compensating with filler, clamp force, extra sanding, or a more complicated jig.`],
      bullets: facts.facts.slice(0, 6).map((fact) => `Check: ${fact}`),
    },
    {
      id: 'next-project',
      heading: `Put ${subject} to work in a real project`,
      paragraphs: [`Choose a small project where this skill controls one visible result but does not carry the entire safety or structural load. Complete the operation with the minimum reliable setup, then decide whether a tool or jig upgrade would save meaningful time on the next three planned builds.`, `Keep the labeled practice pieces and note what changed between the baseline and accepted result. A physical reference made with the actual tools and stock is more useful than a generic chart when the next ${subject} decision appears.`],
    },
  ]
}

function seoTitle(title) {
  if (title.length <= 52) return `${title} | Built True`
  const shortened = title.slice(0, 51).replace(/\s+\S*$/, '')
  return `${shortened} | Built True`
}

function descriptionFor(guide) {
  const subject = lowerSubject(guide)
  const value = guide.intent === 'build'
    ? `Build ${subject} with starting dimensions, a cut list, materials, assembly steps, finish guidance, and practical fixes.`
    : guide.intent === 'buy'
      ? `Choose ${subject} by comparing useful specifications, complete ownership cost, limitations, compatibility, and reasons to skip.`
      : `Learn ${subject} with a direct answer, controlled method, specific setup checks, common mistakes, and a practical next step.`
  return value.length <= 160 ? value : `${value.slice(0, 157).replace(/\s+\S*$/, '')}…`
}

function dekFor(guide) {
  const subject = lowerSubject(guide)
  if (guide.intent === 'build') return `A complete starting plan for ${subject}, including finished dimensions, a cut list, required materials, build order, safety checks, and fixes for the mistakes most likely to derail the project.`
  if (guide.intent === 'buy') return `A practical decision guide to ${subject}, focused on who each route fits, what the complete system costs, which specifications matter, and when the better move is to wait.`
  return `A direct, practical guide to ${subject}, with concrete setup details, a repeatable method, visible success checks, and focused troubleshooting.`
}

function safetyFor(guide, facts) {
  const subject = lowerSubject(guide)
  const machine = /table saw|miter saw|circular saw|bandsaw|router|jointer|planer|lathe|CNC|drill press/i.test(guide.title)
  return [
    machine
      ? `For ${subject}, keep every supplied guard and safety device in place, support the full workpiece, and follow the current manual for the exact machine and accessory.`
      : `For ${subject}, clamp or otherwise secure the work, protect eyes and hearing where the operation requires it, and keep hands behind or away from cutting edges.`,
    `Stop whenever work on ${subject} reaches a point where the stock, offcut, cutter path, body position, ventilation, or load cannot be controlled without improvising around a safety feature.`,
    facts.facts[0],
  ]
}

function guideTokens(guide) {
  return new Set(`${guide.title} ${guide.tags.join(' ')}`.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((word) => word.length > 3 && !stopWords.has(word)))
}

function assignRelated(guides) {
  const tokenMap = new Map(guides.map((guide) => [guide.id, guideTokens(guide)]))
  for (const guide of guides) {
    const own = tokenMap.get(guide.id)
    guide.relatedGuideIds = guides
      .filter((candidate) => candidate.id !== guide.id)
      .map((candidate) => {
        const shared = [...own].filter((word) => tokenMap.get(candidate.id).has(word)).length
        const score = shared * 5 + (candidate.clusterId === guide.clusterId ? 3 : 0) + (candidate.type === guide.type ? 1 : 0)
        return { id: candidate.id, score }
      })
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id, undefined, { numeric: true }))
      .slice(0, 3)
      .map(({ id }) => id)
  }
}

function personalizeSections(guide, sections, facts) {
  const subject = lowerSubject(guide)
  const lead = subject.charAt(0).toUpperCase() + subject.slice(1)
  const variants = [
    (paragraph, fact) => `${lead}: ${paragraph.charAt(0).toLowerCase()}${paragraph.slice(1)} ${fact}`,
    (paragraph, fact) => `For ${subject}, ${paragraph.charAt(0).toLowerCase()}${paragraph.slice(1)} The practical check is specific: ${fact}`,
    (paragraph, fact) => `Applied to ${subject}, ${paragraph.charAt(0).toLowerCase()}${paragraph.slice(1)} ${fact}`,
    (paragraph, fact) => `${paragraph} For ${subject}, use this additional check: ${fact}`,
    (paragraph, fact) => `${paragraph} The next ${subject} decision should also account for this: ${fact}`,
    (paragraph, fact) => `When working through ${subject}, ${paragraph.charAt(0).toLowerCase()}${paragraph.slice(1)} ${fact}`,
  ]
  return sections.map((section, sectionIndex) => ({
    ...section,
    paragraphs: section.paragraphs.map((paragraph, paragraphIndex) => {
      if (paragraph.toLowerCase().includes(subject.slice(0, Math.min(32, subject.length)))) return paragraph
      const fact = facts.facts[(sectionIndex * 2 + paragraphIndex) % facts.facts.length]
      return variants[(Number(guide.id) + sectionIndex + paragraphIndex) % variants.length](paragraph, fact)
    }),
  }))
}

export function upgradeGuideCorpus(inputGuides) {
  const now = new Date().toISOString()
  const guides = inputGuides.map((source) => {
    const guide = structuredClone(source)
    const honestRevision = honestTitleRevisions[guide.id]
    if (honestRevision) {
      const section = guide.canonicalPath.split('/').filter(Boolean)[0]
      guide.title = honestRevision.title
      guide.slug = honestRevision.slug
      guide.canonicalPath = `/${section}/${honestRevision.slug}/`
    }
    guide.tags = guide.tags.filter((tag) => !/^(?:test|tested|test-data|testing)$/i.test(tag))
    guide.naturalOffers = guide.naturalOffers.filter((offer) => !/\b(?:test data|test protocol|testing claims?)\b/i.test(offer))
    const facts = topicFacts(guide)
    guide.status = 'review'
    guide.indexStatus = 'index'
    guide.dek = dekFor(guide)
    guide.seoTitle = seoTitle(guide.title)
    guide.metaDescription = descriptionFor(guide)
    guide.safetyNotes = safetyFor(guide, facts)
    guide.sources = []
    guide.reviewerIds = []
    guide.evidenceStatus = 'brief'
    guide.updatedAt = now
    guide.contentVersion = 2
    delete guide.editorial
    delete guide.publishedAt

    if (guide.intent === 'build') {
      const plan = planFor(guide)
      guide.dimensions = { imperial: plan.size, metric: plan.metric }
      guide.cutList = plan.cutList
      guide.tools = projectTools(guide, plan)
      guide.materials = projectMaterials(plan)
      guide.sections = personalizeSections(guide, buildSections(guide, plan, facts), facts)
    } else {
      delete guide.dimensions
      delete guide.cutList
      guide.materials = []
      guide.tools = guide.naturalOffers.slice(0, 6).map((name) => ({ name: sentence(name).slice(0, -1), required: false, purpose: `Evaluate this option against the capacity, compatibility, space, and cost constraints in ${lowerSubject(guide)}` }))
      guide.sections = personalizeSections(guide, guide.intent === 'buy' ? buySections(guide, facts) : learnSections(guide, facts), facts)
    }
    return guide
  })
  assignRelated(guides)
  return guides
}

export function publicGuideText(guide) {
  return [guide.title, guide.dek, guide.metaDescription, ...guide.safetyNotes, ...guide.tools.flatMap((tool) => [tool.name, tool.purpose, tool.substitute ?? '']), ...guide.materials.flatMap((material) => [material.name, material.quantity, material.notes ?? '']), ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? []), section.callout?.title ?? '', section.callout?.body ?? ''])].join('\n')
}

export function countGuideWords(guide) {
  return articleWords(guide).trim().split(/\s+/).filter(Boolean).length
}
