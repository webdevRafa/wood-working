export type ShopCategoryId =
  | 'power-tools'
  | 'cutting'
  | 'joinery'
  | 'routing'
  | 'workholding'
  | 'sanding-finishing'
  | 'measuring-layout'
  | 'dust-safety'

export type ShopCategory = {
  id: ShopCategoryId
  label: string
  shortLabel: string
  description: string
  subcategories: Array<{ id: string; label: string }>
  guideTerms: string[]
}

export type ShopProduct = {
  id: string
  categoryId: ShopCategoryId
  subcategoryId: string
  brand: string
  name: string
  model: string
  useCase: string
  editorialNote: string
  amazonUrl: string
  manufacturerUrl?: string
  guideTerms: string[]
}

const amazonSearch = (query: string) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}`

export const shopCategories: ShopCategory[] = [
  {
    id: 'power-tools',
    label: 'Power tools',
    shortLabel: 'Power tools',
    description: 'Core machines for ripping, milling, routing, drilling, and repeatable shop work.',
    subcategories: [
      { id: 'table-saws', label: 'Table saws' },
      { id: 'thickness-planers', label: 'Thickness planers' },
      { id: 'compact-routers', label: 'Compact routers' },
    ],
    guideTerms: ['table saw', 'planer', 'jointer', 'drill', 'power tool'],
  },
  {
    id: 'cutting',
    label: 'Sawing & cutting',
    shortLabel: 'Cutting',
    description: 'Blades, guides, and cutting systems chosen around the cut—not the catalog aisle.',
    subcategories: [
      { id: 'general-purpose-blades', label: 'General-purpose blades' },
      { id: 'fine-finish-blades', label: 'Fine-finish blades' },
      { id: 'circular-saw-guides', label: 'Circular-saw guides' },
    ],
    guideTerms: ['saw blade', 'circular saw', 'track saw', 'crosscut', 'rip cut'],
  },
  {
    id: 'joinery',
    label: 'Joinery',
    shortLabel: 'Joinery',
    description: 'Jigs and machines for pocket holes, dowels, biscuits, and loose-tenon work.',
    subcategories: [
      { id: 'pocket-hole-jigs', label: 'Pocket-hole jigs' },
      { id: 'doweling-jigs', label: 'Doweling jigs' },
      { id: 'plate-joiners', label: 'Plate joiners' },
    ],
    guideTerms: ['joinery', 'pocket hole', 'dowel', 'biscuit', 'loose tenon'],
  },
  {
    id: 'routing',
    label: 'Routing',
    shortLabel: 'Routing',
    description: 'Routers, bits, tables, and guides for profiles, dados, templates, and joinery.',
    subcategories: [
      { id: 'combination-routers', label: 'Combination routers' },
      { id: 'router-bit-sets', label: 'Router-bit sets' },
      { id: 'router-tables', label: 'Router tables' },
    ],
    guideTerms: ['router', 'routing', 'router bit', 'dado', 'template'],
  },
  {
    id: 'workholding',
    label: 'Clamping & workholding',
    shortLabel: 'Clamping',
    description: 'Clamps and bench accessories that hold assemblies square and workpieces safely.',
    subcategories: [
      { id: 'parallel-clamps', label: 'Parallel clamps' },
      { id: 'corner-clamps', label: 'Corner clamps' },
      { id: 'work-supports', label: 'Work supports' },
    ],
    guideTerms: ['clamp', 'clamping', 'workholding', 'assembly table', 'bench dog'],
  },
  {
    id: 'sanding-finishing',
    label: 'Sanding & finishing',
    shortLabel: 'Finishing',
    description: 'Abrasives, sanders, adhesives, and finishing supplies for the last 20 percent of a build.',
    subcategories: [
      { id: 'random-orbit-sanders', label: 'Random-orbit sanders' },
      { id: 'abrasive-discs', label: 'Abrasive discs' },
      { id: 'wood-glue', label: 'Wood glue' },
    ],
    guideTerms: ['sanding', 'sandpaper', 'finish', 'wood glue', 'abrasive'],
  },
  {
    id: 'measuring-layout',
    label: 'Measuring & layout',
    shortLabel: 'Measuring',
    description: 'Squares, gauges, and layout tools that make accuracy easier to repeat.',
    subcategories: [
      { id: 'squares', label: 'Squares' },
      { id: 'angle-gauges', label: 'Angle gauges' },
      { id: 'tape-measures', label: 'Tape measures' },
    ],
    guideTerms: ['measuring', 'layout', 'square', 'angle gauge', 'marking'],
  },
  {
    id: 'dust-safety',
    label: 'Dust control & safety',
    shortLabel: 'Dust & safety',
    description: 'Extraction, separation, and protective equipment for a cleaner, more workable shop.',
    subcategories: [
      { id: 'dust-collectors', label: 'Dust collectors' },
      { id: 'cyclone-separators', label: 'Cyclone separators' },
      { id: 'hearing-protection', label: 'Hearing protection' },
    ],
    guideTerms: ['dust collection', 'dust extractor', 'shop safety', 'hearing protection', 'respirator'],
  },
]

export const shopProducts: ShopProduct[] = [
  {
    id: 'dewalt-dwe7491rs', categoryId: 'power-tools', subcategoryId: 'table-saws', brand: 'DeWalt', name: '10-inch Jobsite Table Saw with Rolling Stand', model: 'DWE7491RS',
    useCase: 'Portable ripping and crosscutting with a rack-and-pinion fence.',
    editorialNote: 'A useful reference model when you need jobsite portability and wider rip capacity; compare footprint and power requirements before buying.',
    amazonUrl: amazonSearch('DEWALT DWE7491RS table saw'),
    manufacturerUrl: 'https://www.dewalt.com/en-us/product/dwe7491rs/10-jobsite-table-saw-and-rolling-stand',
    guideTerms: ['table saw', 'jobsite saw', 'rip capacity'],
  },
  {
    id: 'dewalt-dw735x', categoryId: 'power-tools', subcategoryId: 'thickness-planers', brand: 'DeWalt', name: '13-inch Two-Speed Thickness Planer Package', model: 'DW735X',
    useCase: 'Dimensioning rough or oversized stock to a repeatable thickness.',
    editorialNote: 'Worth comparing when surfaced lumber costs are driving the decision; budget for dust collection and infeed/outfeed support too.',
    amazonUrl: amazonSearch('DEWALT DW735X thickness planer'),
    manufacturerUrl: 'https://www.dewalt.com/en-us/product/dw735x/13-3-knife-two-speed-thickness-planer',
    guideTerms: ['planer', 'milling lumber', 'rough lumber'],
  },
  {
    id: 'makita-rt0701c', categoryId: 'power-tools', subcategoryId: 'compact-routers', brand: 'Makita', name: '1-1/4 HP Compact Router', model: 'RT0701C',
    useCase: 'Edge profiles, small dados, templates, and light joinery.',
    editorialNote: 'A compact corded reference point for first-router comparisons; bit capacity and plunge-base needs matter more than peak horsepower alone.',
    amazonUrl: amazonSearch('Makita RT0701C compact router'),
    manufacturerUrl: 'https://www.makitatools.com/products/details/RT0701C',
    guideTerms: ['compact router', 'trim router', 'first router'],
  },
  {
    id: 'diablo-d1040x', categoryId: 'cutting', subcategoryId: 'general-purpose-blades', brand: 'Diablo', name: '10-inch 40-Tooth General-Purpose Saw Blade', model: 'D1040X',
    useCase: 'One-blade compromise for common ripping and crosscutting in wood.',
    editorialNote: 'A practical baseline blade, but stock thickness, tooth geometry, saw power, and the finish you expect should drive the final choice.',
    amazonUrl: amazonSearch('Diablo D1040X 10 inch 40 tooth saw blade'),
    manufacturerUrl: 'https://www.diablotools.com/products/D1040X',
    guideTerms: ['saw blade', 'combination blade', 'table saw blade'],
  },
  {
    id: 'diablo-d1060x', categoryId: 'cutting', subcategoryId: 'fine-finish-blades', brand: 'Diablo', name: '10-inch 60-Tooth Fine-Finish Saw Blade', model: 'D1060X',
    useCase: 'Cleaner crosscuts in hardwood, softwood, and sheet goods.',
    editorialNote: 'A finish-cut reference when edge quality matters more than feed speed; do not assume it is the right blade for heavy ripping.',
    amazonUrl: amazonSearch('Diablo D1060X 10 inch 60 tooth saw blade'),
    manufacturerUrl: 'https://www.diablotools.com/products/D1060X',
    guideTerms: ['crosscut blade', 'fine finish blade', 'plywood blade'],
  },
  {
    id: 'kreg-kma2700', categoryId: 'cutting', subcategoryId: 'circular-saw-guides', brand: 'Kreg', name: 'Accu-Cut Circular Saw Track Guide', model: 'KMA2700',
    useCase: 'Guided straight cuts in plywood without a track saw.',
    editorialNote: 'Useful to compare against a shop-made straightedge and a dedicated track saw; confirm compatibility with your circular saw base.',
    amazonUrl: amazonSearch('Kreg KMA2700 Accu-Cut'),
    manufacturerUrl: 'https://www.kregtool.com/shop/cutting/circular-saw-cutting/accu-cut/KMA2700.html',
    guideTerms: ['circular saw guide', 'sheet goods', 'track saw alternative'],
  },
  {
    id: 'kreg-kphj720pro', categoryId: 'joinery', subcategoryId: 'pocket-hole-jigs', brand: 'Kreg', name: 'Pocket-Hole Jig 720PRO', model: 'KPHJ720PRO',
    useCase: 'Repeat pocket-hole joinery across changing material thicknesses.',
    editorialNote: 'A higher-throughput pocket-hole option; smaller jigs remain sensible when storage space and project volume are limited.',
    amazonUrl: amazonSearch('Kreg KPHJ720PRO pocket hole jig'),
    manufacturerUrl: 'https://www.kregtool.com/shop/pocket-hole-joinery/pocket-hole-jigs/kreg-pocket-hole-jig-720pro/KPHJ720PRO.html',
    guideTerms: ['pocket hole', 'pocket screw', 'cabinet joinery'],
  },
  {
    id: 'milescraft-1319', categoryId: 'joinery', subcategoryId: 'doweling-jigs', brand: 'Milescraft', name: 'JointMate Handheld Doweling Jig', model: '1319',
    useCase: 'Simple edge, corner, and surface dowel joints without a large jig body.',
    editorialNote: 'A modest entry point for occasional doweling; setup discipline and matching drill bits still control the result.',
    amazonUrl: amazonSearch('Milescraft 1319 JointMate doweling jig'),
    manufacturerUrl: 'https://www.milescraft.com/product/jointmate/',
    guideTerms: ['dowel jig', 'dowel joinery', 'alignment'],
  },
  {
    id: 'dewalt-dw682k', categoryId: 'joinery', subcategoryId: 'plate-joiners', brand: 'DeWalt', name: 'Plate Joiner Kit', model: 'DW682K',
    useCase: 'Fast alignment slots for panels, face frames, and casework.',
    editorialNote: 'Best evaluated as an alignment tool first; a biscuit is not automatically a structural upgrade for every joint.',
    amazonUrl: amazonSearch('DEWALT DW682K plate joiner'),
    manufacturerUrl: 'https://www.dewalt.com/GLOBALBOM/QU/DW682K/1/Instruction_Manual/EN/154527-00_DW682.pdf',
    guideTerms: ['biscuit joiner', 'plate joiner', 'panel alignment'],
  },
  {
    id: 'bosch-1617evspk', categoryId: 'routing', subcategoryId: 'combination-routers', brand: 'Bosch', name: '2.25 HP Combination Router Kit', model: '1617EVSPK',
    useCase: 'A fixed/plunge kit for dados, mortises, profiles, and router-table work.',
    editorialNote: 'A full-size reference for buyers who need both bases; compare it with a compact router if most work is light edge treatment.',
    amazonUrl: amazonSearch('Bosch 1617EVSPK router kit'),
    manufacturerUrl: 'https://www.boschtools.com/us/en/products/1617EVSPK-0601617768',
    guideTerms: ['full size router', 'plunge router', 'router table'],
  },
  {
    id: 'freud-91-100', categoryId: 'routing', subcategoryId: 'router-bit-sets', brand: 'Freud', name: '13-Piece Super Router Bit Set', model: '91-100',
    useCase: 'A starter assortment of common profile and straight-cut bits.',
    editorialNote: 'Sets are convenient only when the profiles match your work; a few project-specific bits can be the better buy.',
    amazonUrl: amazonSearch('Freud 91-100 router bit set'),
    manufacturerUrl: 'https://www.freudtools.com/products/91-100',
    guideTerms: ['router bits', 'starter bit set', 'router profiles'],
  },
  {
    id: 'kreg-prs2100', categoryId: 'routing', subcategoryId: 'router-tables', brand: 'Kreg', name: 'Benchtop Router Table', model: 'PRS2100',
    useCase: 'Table-mounted routing when floor space is limited.',
    editorialNote: 'A compact route to safer small-part profiling; verify router fit, fence needs, dust pickup, and storage before choosing it.',
    amazonUrl: amazonSearch('Kreg PRS2100 benchtop router table'),
    manufacturerUrl: 'https://www.kregtool.com/shop/routing/router-tables/precision-benchtop-router-table/PRS2100.html',
    guideTerms: ['router table', 'benchtop router table', 'small shop'],
  },
  {
    id: 'bessey-kre3531', categoryId: 'workholding', subcategoryId: 'parallel-clamps', brand: 'Bessey', name: 'K Body REVO Parallel Clamp', model: 'KRE3531',
    useCase: 'Cabinet and panel glue-ups that benefit from parallel jaws.',
    editorialNote: 'A strong reference clamp for casework; jaw capacity, weight, and how many clamps the assembly needs matter as much as force.',
    amazonUrl: amazonSearch('Bessey KRE3531 parallel clamp'),
    manufacturerUrl: 'https://besseytools.com/en-us/bessey-tools-north-america/products/clamping-tools/parallel-clamps/k-body-revo',
    guideTerms: ['parallel clamp', 'panel glue up', 'cabinet assembly'],
  },
  {
    id: 'kreg-khccc', categoryId: 'workholding', subcategoryId: 'corner-clamps', brand: 'Kreg', name: '90-Degree Corner Clamp', model: 'KHCCC',
    useCase: 'Holding case corners and T-joints while fastening or checking square.',
    editorialNote: 'Useful for one-person assembly, but it does not replace checking diagonals or confirming that panels were cut square.',
    amazonUrl: amazonSearch('Kreg KHCCC 90 degree corner clamp'),
    manufacturerUrl: 'https://www.kregtool.com/shop/clamping/clamps/90-corner-clamp/KHCCC.html',
    guideTerms: ['corner clamp', 'cabinet assembly', 'square assembly'],
  },
  {
    id: 'rockler-bench-cookie', categoryId: 'workholding', subcategoryId: 'work-supports', brand: 'Rockler', name: 'Bench Cookie Plus Work Grippers', model: 'Bench Cookie Plus',
    useCase: 'Elevating and gripping parts for routing, sanding, and finishing.',
    editorialNote: 'A convenient support accessory when clamps would obstruct the work; use proper restraint for operations that can pull or kick a part.',
    amazonUrl: amazonSearch('Rockler Bench Cookie Plus work grippers'),
    manufacturerUrl: 'https://www.rockler.com/bench-cookie-plus-work-grippers',
    guideTerms: ['bench cookie', 'work support', 'sanding support'],
  },
  {
    id: 'bosch-ros20vsc', categoryId: 'sanding-finishing', subcategoryId: 'random-orbit-sanders', brand: 'Bosch', name: '5-inch Variable-Speed Random-Orbit Sander', model: 'ROS20VSC',
    useCase: 'General surface preparation and finish sanding with hook-and-loop discs.',
    editorialNote: 'A common corded reference model; dust collection, vibration, pad availability, and grip comfort deserve more weight than amperage alone.',
    amazonUrl: amazonSearch('Bosch ROS20VSC random orbit sander'),
    manufacturerUrl: 'https://www.boschtools.com/us/en/products/ros20vsc-0601387514',
    guideTerms: ['random orbit sander', 'sanding', 'dust collection'],
  },
  {
    id: '3m-710w', categoryId: 'sanding-finishing', subcategoryId: 'abrasive-discs', brand: '3M', name: 'Xtract Cubitron II Net Disc 710W', model: '710W',
    useCase: 'Mesh abrasive discs designed for high dust extraction across the disc face.',
    editorialNote: 'A consumable worth comparing by cost per finished surface, not pack price; match diameter, hole pattern, and grit sequence to your sander.',
    amazonUrl: amazonSearch('3M Xtract Cubitron II 710W 5 inch sanding discs'),
    manufacturerUrl: 'https://www.3m.com/3M/en_US/p/d/b5005161005/',
    guideTerms: ['sandpaper grit', 'mesh abrasive', 'sanding disc'],
  },
  {
    id: 'titebond-iii', categoryId: 'sanding-finishing', subcategoryId: 'wood-glue', brand: 'Titebond', name: 'Titebond III Ultimate Wood Glue', model: '1416',
    useCase: 'Interior and exterior woodworking where longer open time or water resistance is useful.',
    editorialNote: 'Choose glue around joint fit, assembly time, temperature, finish plan, and exposure—not a blanket “strongest glue” claim.',
    amazonUrl: amazonSearch('Titebond III 1416 wood glue 1 gallon'),
    manufacturerUrl: 'https://www.titebond.com/product/glues/210c3bc7-3f06-4c7f-b8dd-0abce9a47f16',
    guideTerms: ['wood glue', 'titebond', 'glue up'],
  },
  {
    id: 'swanson-s0101', categoryId: 'measuring-layout', subcategoryId: 'squares', brand: 'Swanson', name: '7-inch Speed Square', model: 'S0101',
    useCase: 'Fast 90-degree and 45-degree layout, saw guidance, and basic angle work.',
    editorialNote: 'A compact layout staple, but it should be checked against a known straight reference before precision work.',
    amazonUrl: amazonSearch('Swanson S0101 7 inch Speed Square'),
    manufacturerUrl: 'https://swansontoolco.com/product/speed-square/',
    guideTerms: ['speed square', 'layout', 'marking square'],
  },
  {
    id: 'klein-935dag', categoryId: 'measuring-layout', subcategoryId: 'angle-gauges', brand: 'Klein Tools', name: 'Digital Level and Angle Gauge', model: '935DAG',
    useCase: 'Checking blade, fence, jig, and workpiece angles with a digital readout.',
    editorialNote: 'Useful for repeatability, but zeroing surface, debris, magnet seating, and calibration still control the reading.',
    amazonUrl: amazonSearch('Klein Tools 935DAG digital angle gauge'),
    manufacturerUrl: 'https://www.kleintools.com/catalog/digital-levels/digital-level-electronic-angle-gauge',
    guideTerms: ['digital angle gauge', 'table saw setup', 'blade angle'],
  },
  {
    id: 'fastcap-pms-16', categoryId: 'measuring-layout', subcategoryId: 'tape-measures', brand: 'FastCap', name: 'ProCarpenter Standard Reverse Tape Measure', model: 'PSSR-16',
    useCase: 'Cabinet and furniture layout with readable measurements from either direction.',
    editorialNote: 'A workflow-focused tape rather than a precision instrument; choose scale, hook style, and readability for the work you actually do.',
    amazonUrl: amazonSearch('FastCap PSSR-16 tape measure'),
    manufacturerUrl: 'https://www.fastcap.com/product/procarpenter-tape-measure',
    guideTerms: ['tape measure', 'cabinet layout', 'measuring'],
  },
  {
    id: 'wen-dc3401', categoryId: 'dust-safety', subcategoryId: 'dust-collectors', brand: 'WEN', name: '5.7-Amp Rolling Dust Collector', model: 'DC3401',
    useCase: 'Portable chip collection for one compatible machine at a time.',
    editorialNote: 'Treat airflow claims as only one input; hose diameter, run length, filtration, machine port size, and fine-dust control all matter.',
    amazonUrl: amazonSearch('WEN DC3401 dust collector'),
    manufacturerUrl: 'https://wenproducts.com/products/wen-dc3401-5-7-amp-660-cfm-rolling-dust-collector-with-12-gallon-bag-and-optional-wall-mount',
    guideTerms: ['dust collector', 'small shop dust collection', 'chip collection'],
  },
  {
    id: 'oneida-dust-deputy', categoryId: 'dust-safety', subcategoryId: 'cyclone-separators', brand: 'Oneida Air Systems', name: 'Dust Deputy 2.5 Deluxe Cyclone Kit', model: 'DD 2.5 Deluxe',
    useCase: 'Separating chips and much of the dust before it reaches a shop vacuum filter.',
    editorialNote: 'A separator can reduce filter loading, but it does not turn a shop vacuum into a whole-shop collector or replace fine-dust protection.',
    amazonUrl: amazonSearch('Oneida Dust Deputy 2.5 Deluxe cyclone separator'),
    manufacturerUrl: 'https://www.oneida-air.com/dust-deputy-2-5-deluxe-cyclone-separator-kit',
    guideTerms: ['cyclone separator', 'shop vacuum', 'dust separator'],
  },
  {
    id: '3m-worktunes', categoryId: 'dust-safety', subcategoryId: 'hearing-protection', brand: '3M', name: 'WorkTunes Connect Hearing Protector', model: '90543',
    useCase: 'Over-ear hearing protection with Bluetooth audio for shop sessions.',
    editorialNote: 'Comfort and consistent wear matter, but always verify the current NRR and match protection to measured exposure and tool instructions.',
    amazonUrl: amazonSearch('3M WorkTunes Connect 90543 hearing protector'),
    manufacturerUrl: 'https://www.3m.com/3M/en_US/p/d/cbgnawus1754/',
    guideTerms: ['hearing protection', 'shop safety', 'earmuffs'],
  },
]

export function productsForCategory(categoryId: ShopCategoryId) {
  return shopProducts.filter((product) => product.categoryId === categoryId)
}

export function productsForSubcategory(categoryId: ShopCategoryId, subcategoryId?: string | null) {
  return shopProducts.filter((product) => product.categoryId === categoryId && (!subcategoryId || product.subcategoryId === subcategoryId))
}
