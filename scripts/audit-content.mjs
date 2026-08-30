import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const recipesJsonPath = path.join(__dirname, '../data/recipes.json');
const appliancesPath = path.join(__dirname, '../data/appliances.ts');
const categoriesPath = path.join(__dirname, '../data/categories.ts');
const typesPath = path.join(__dirname, '../lib/types.ts');
const cookTimesPath = path.join(__dirname, '../data/cook-times.ts');

const recipes = JSON.parse(fs.readFileSync(recipesJsonPath, 'utf-8'));
const typesContent = fs.readFileSync(typesPath, 'utf-8');
const appliancesContent = fs.readFileSync(appliancesPath, 'utf-8');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf-8');
const cookTimesContent = fs.readFileSync(cookTimesPath, 'utf-8');

console.log(`\n--- RUNNING CONTENT AUDIT (npm run audit:content) ---`);
console.log(`Auditing ${recipes.length} recipes and parametric datasheets...\n`);

let errors = [];

// 1. HR-5: Recipe count ceiling (raised 150 → 200 with Alex's sign-off).
if (recipes.length > 200) {
  errors.push(`Hard Rule Violation: Total recipe count (${recipes.length}) exceeds 200 ceiling.`);
}

// 2. Declared types contract — PARSED from lib/types.ts, never copied.
// A hardcoded copy silently goes stale every time a union grows (it did: oven,
// instant-pot and boiling were added to the union but not to this list, so every
// datasheet using them failed the audit while the type-checker was happy).
const parseUnion = (name) => {
  const m = typesContent.match(new RegExp(`export type ${name}\\s*=([^;]+);`));
  if (!m) throw new Error(`audit-content: could not parse union ${name} from lib/types.ts`);
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
};
const validAppliances = parseUnion('Appliance');
const validCategories = parseUnion('Category');

// Check metadata files declare each enum value
for (const app of validAppliances) {
  if (!appliancesContent.includes(`slug: '${app}'`) && !appliancesContent.includes(`slug: "${app}"`)) {
    errors.push(`Appliance '${app}' is declared in types.ts but missing from data/appliances.ts`);
  }
}

for (const cat of validCategories) {
  if (!categoriesContent.includes(`slug: '${cat}'`) && !categoriesContent.includes(`slug: "${cat}"`)) {
    errors.push(`Category '${cat}' is declared in types.ts but missing from data/categories.ts`);
  }
}

// 3. Track uniqueness and veracity across recipes (HR-4, HR-2)
const taglines = new Map();
const stepSequences = new Map();
const dadProTips = new Map();
const reheatInstructions = new Map();
const kidAdjustments = new Map();

for (const r of recipes) {
  const slug = r.slug || r.id;

  // Check basis (HR-2: required non-empty verification basis)
  const basis = r.basis || r.cookTimeBasis;
  if (!basis || typeof basis !== 'string' || basis.trim().length === 0) {
    errors.push(`[${slug}] Missing required 'basis' field naming cook time verification.`);
  }

  // Check nutrition source (HR-2: required if nutrition object is present)
  if (r.nutrition) {
    if (!r.nutrition.source || typeof r.nutrition.source !== 'string' || r.nutrition.source.trim().length === 0) {
      errors.push(`[${slug}] Nutrition object present without a verified 'source' string.`);
    }
  }

  // Check Appliance & Category validity (HR-12 & HR-13)
  if (!validAppliances.includes(r.appliance)) {
    errors.push(`[${slug}] Invalid or undeclared appliance '${r.appliance}'.`);
  }

  for (const cat of r.categories) {
    if (!validCategories.includes(cat)) {
      errors.push(`[${slug}] Invalid or undeclared category '${cat}'.`);
    }
  }

  // Check uniqueness of tagline (HR-4)
  if (taglines.has(r.tagline)) {
    errors.push(`[${slug}] Duplicate tagline shared with '${taglines.get(r.tagline)}': "${r.tagline}"`);
  } else {
    taglines.set(r.tagline, slug);
  }

  // Check uniqueness of step sequences (HR-4)
  const stepTitlesSeq = (r.detailedSteps || []).map((s) => s.title).join(' -> ');
  if (stepTitlesSeq) {
    if (stepSequences.has(stepTitlesSeq)) {
      errors.push(`[${slug}] Duplicate detailed step sequence shared with '${stepSequences.get(stepTitlesSeq)}': "${stepTitlesSeq}"`);
    } else {
      stepSequences.set(stepTitlesSeq, slug);
    }
  }

  // Check uniqueness of dadProTip (HR-4)
  if (r.dadProTip) {
    if (dadProTips.has(r.dadProTip)) {
      errors.push(`[${slug}] Duplicate dadProTip shared with '${dadProTips.get(r.dadProTip)}'`);
    } else {
      dadProTips.set(r.dadProTip, slug);
    }
  }

  // Check uniqueness of reheatInstructions (HR-4)
  if (r.reheatInstructions) {
    if (reheatInstructions.has(r.reheatInstructions)) {
      errors.push(`[${slug}] Duplicate reheatInstructions shared with '${reheatInstructions.get(r.reheatInstructions)}'`);
    } else {
      reheatInstructions.set(r.reheatInstructions, slug);
    }
  }

  // Check uniqueness of kidAdjustment (HR-4)
  if (r.kidAdjustment) {
    if (kidAdjustments.has(r.kidAdjustment)) {
      errors.push(`[${slug}] Duplicate kidAdjustment shared with '${kidAdjustments.get(r.kidAdjustment)}'`);
    } else {
      kidAdjustments.set(r.kidAdjustment, slug);
    }
  }
}

// 4. Audit parametric datasheets in data/cook-times.ts (B8 requirement)
//
// Parsed per-object, NOT with one global regex. Several fields (internalTempTargetF,
// internalTempTargetFormatted) are legitimately absent on entries where internal
// temperature is not the doneness metric — boiled veg and starch. A single
// `[\s\S]*?` regex silently runs past the end of such an object and pairs one
// datasheet's slug with the next datasheet's temperature, so it must not be used.
const datasheetSlugs = new Set();

/** Split the exported array into its top-level object literals. */
const datasheetBlocks = [];
{
  const re = /\n  \{\n/g;
  let m;
  while ((m = re.exec(cookTimesContent)) !== null) {
    const from = m.index;
    const close = cookTimesContent.indexOf('\n  },', from);
    if (close === -1) continue;
    datasheetBlocks.push(cookTimesContent.slice(from, close + 5));
  }
}

const field = (block, name) => {
  const m = block.match(new RegExp(`\\n    ${name}: '((?:[^'\\\\]|\\\\.)*)'`));
  return m ? m[1] : undefined;
};
const numField = (block, name) => {
  const m = block.match(new RegExp(`\\n    ${name}: (-?[0-9]+)`));
  return m ? parseInt(m[1], 10) : undefined;
};

let datasheetCount = 0;

for (const block of datasheetBlocks) {
  const slug = field(block, 'slug');
  if (!slug) continue; // not a datasheet object
  datasheetCount++;

  const food = field(block, 'food') ?? '';
  const appliance = field(block, 'appliance');
  const basis = field(block, 'verificationBasis');
  const minM = numField(block, 'timeMinMinutes');
  const maxM = numField(block, 'timeMaxMinutes');
  const tempF = numField(block, 'internalTempTargetF');
  const restMinutes = numField(block, 'restMinutes');
  const tempFormatted = field(block, 'internalTempTargetFormatted') ?? '';

  // Check duplicate slug
  if (datasheetSlugs.has(slug)) {
    errors.push(`[Datasheet: ${slug}] Duplicate slug across datasheets.`);
  }
  datasheetSlugs.add(slug);

  // Check valid appliance
  if (!appliance || !validAppliances.includes(appliance)) {
    errors.push(`[Datasheet: ${slug}] Invalid appliance '${appliance}'.`);
  }

  // Check valid time bounds
  if (minM === undefined || maxM === undefined || minM <= 0 || maxM < minM) {
    errors.push(`[Datasheet: ${slug}] Invalid time range (${minM}-${maxM} mins).`);
  }

  // Check verification basis (HR-2)
  if (!basis || basis.trim().length === 0) {
    errors.push(`[Datasheet: ${slug}] Missing verificationBasis.`);
  }

  // Check safe internal temperature for poultry / ground meat.
  //
  // A pull temperature below the USDA minimum is allowed ONLY when the entry
  // documents carryover cooking that reaches the safe minimum: it must rest long
  // enough to carry over, and the formatted target must state the final safe temp.
  // A bare "160°F" with no rest and no stated final temp still fails.
  const foodLower = food.toLowerCase();
  const isPoultry = ['chicken', 'turkey', 'wings', 'tenders', 'poultry', 'duck'].some((w) => foodLower.includes(w));
  const isGroundMeat = ['burger', 'ground beef', 'meatball'].some((w) => foodLower.includes(w));

  const carryoverTo = (min) => {
    const stated = [...tempFormatted.matchAll(/([0-9]{3})\s*°?F/g)].map((x) => parseInt(x[1], 10));
    return (restMinutes ?? 0) >= 10 && stated.some((t) => t >= min);
  };

  if (isPoultry && tempF !== undefined && tempF < 165 && !carryoverTo(165)) {
    errors.push(
      `[Datasheet: ${slug}] Poultry internalTempTargetF (${tempF}°F) is below USDA safe minimum (165°F) ` +
        `and does not document carryover to 165°F (needs restMinutes >= 10 and a stated final temp).`
    );
  }
  if (isGroundMeat && tempF !== undefined && tempF < 160 && !carryoverTo(160)) {
    errors.push(
      `[Datasheet: ${slug}] Ground meat internalTempTargetF (${tempF}°F) is below USDA safe minimum (160°F) ` +
        `and does not document carryover to 160°F.`
    );
  }
}

if (datasheetCount < 20) {
  errors.push(`Datasheet audit found only ${datasheetCount} datasheets in data/cook-times.ts. Expected 20+.`);
}

// 5. Audit Tools Dataset in data/tools-data.ts
const toolsDataPath = path.join(__dirname, '../data/tools-data.ts');
if (!fs.existsSync(toolsDataPath)) {
  errors.push('Missing data/tools-data.ts');
} else {
  const toolsContent = fs.readFileSync(toolsDataPath, 'utf-8');

  // Verify REHEAT_ITEMS presence
  if (!toolsContent.includes('REHEAT_ITEMS')) {
    errors.push('REHEAT_ITEMS missing from data/tools-data.ts');
  }

  // Verify FROZEN_ITEMS USDA temps
  if (toolsContent.includes('chicken-breast-boneless') && !toolsContent.includes('internalTargetTemp: 165')) {
    errors.push('Frozen chicken breast internal target temp must be 165°F (USDA FSIS).');
  }

  // Verify SALT_BRANDS physical densities
  if (!toolsContent.includes('gramsPerTeaspoon: 2.8')) {
    errors.push('Diamond Crystal density must be calibrated to 2.8g/tsp.');
  }
  if (!toolsContent.includes('gramsPerTeaspoon: 4.8')) {
    errors.push('Morton Kosher density must be calibrated to 4.8g/tsp.');
  }
  // Verify 20 new tool datasets presence
  const requiredDatasets = [
    'SMOKE_POINTS',
    'STEAK_CUT_SPECS',
    'TURKEY_METHODS',
    'BAKERS_PRESETS',
    'PAN_SPECS',
    'SLOW_COOKER_TIME_MAP',
    'SOUS_VIDE_SPECS',
    'GRILL_FUEL_SPECS',
    'EGG_DONENESS_PROFILES',
    'GRAIN_WATER_SPECS',
    'MARINADE_PROFILES',
    'INGREDIENT_SUBSTITUTIONS',
    'THAW_SPECS',
    'FOOD_COST_PRESETS',
    'MACRO_PROTEIN_SOURCES',
    'COFFEE_EXTRACTION_PROFILES',
    'BRISKET_TIMELINE_SPECS',
    'GROUND_BEEF_FAT_SPECS',
    'DUTCH_OVEN_BREAD_SPECS',
    'CHEESE_MELT_SPECS',
  ];

  for (const ds of requiredDatasets) {
    if (!toolsContent.includes(ds)) {
      errors.push(`Dataset '${ds}' missing from data/tools-data.ts`);
    }
  }

  console.log('Audited all 30 quick tools datasets in data/tools-data.ts.');
}

// 6. Audit 50 Field Guides in data/blog/
const blogPillars = [
  'science-posts.ts',
  'hardware-posts.ts',
  'chemistry-posts.ts',
  'safety-posts.ts',
  'operations-posts.ts',
];

let totalBlogPostsCount = 0;
const blogSlugs = new Set();
const blogTitles = new Set();
const blogSummaries = new Set();

for (const pillarFile of blogPillars) {
  const pPath = path.join(__dirname, '../data/blog', pillarFile);
  if (!fs.existsSync(pPath)) {
    errors.push(`Missing blog pillar file at ${pPath}`);
    continue;
  }

  const pContent = fs.readFileSync(pPath, 'utf-8');
  const postRegex = /{\s*id:\s*'(blog-\d+)',\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)'/g;
  let pMatch;

  while ((pMatch = postRegex.exec(pContent)) !== null) {
    totalBlogPostsCount++;
    const [_, id, slug, title] = pMatch;

    if (blogSlugs.has(slug)) {
      errors.push(`[Blog Post: ${slug}] Duplicate blog post slug.`);
    }
    blogSlugs.add(slug);

    if (blogTitles.has(title)) {
      errors.push(`[Blog Post: ${title}] Duplicate blog post title.`);
    }
    blogTitles.add(title);
  }
}

if (totalBlogPostsCount < 50) {
  errors.push(`Expected 50 blog field guides, but found ${totalBlogPostsCount}.`);
} else {
  console.log(`Audited ${totalBlogPostsCount} field guides and culinary science articles for uniqueness and schema.`);
}


if (errors.length > 0) {
  console.error(`\n❌ CONTENT AUDIT FAILED with ${errors.length} error(s):\n`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ CONTENT AUDIT PASSED: ${recipes.length} recipes, ${datasheetCount} datasheets, ${totalBlogPostsCount} field guides, and tools dataset verified.\n`);
  process.exit(0);
}

