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

// 1. HR-5: Recipe count ceiling
if (recipes.length > 150) {
  errors.push(`Hard Rule Violation: Total recipe count (${recipes.length}) exceeds 150 ceiling.`);
}

// 2. Declared types contract from lib/types.ts
const validAppliances = ['air-fryer', 'skillet', 'sheet-pan', 'cast-iron', 'grill', 'dutch-oven', 'slow-cooker', 'smoker'];
const validCategories = ['15-minute', 'high-protein', 'kid-approved', 'budget', 'no-thaw', 'one-pan', 'five-ingredient', 'sides', 'snacks', 'game-day', 'breakfast', 'weekend'];

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
const datasheetSlugs = new Set();
const datasheetRegex = /{\s*id:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*food:\s*'([^']+)',[\s\S]*?appliance:\s*'([^']+)',[\s\S]*?timeMinMinutes:\s*([0-9]+),[\s\S]*?timeMaxMinutes:\s*([0-9]+),[\s\S]*?internalTempTargetF:\s*([0-9]+),[\s\S]*?verificationBasis:\s*'([^']+)',/g;

let match;
let datasheetCount = 0;

while ((match = datasheetRegex.exec(cookTimesContent)) !== null) {
  datasheetCount++;
  const [_, id, slug, food, appliance, timeMin, timeMax, internalTemp, basis] = match;

  // Check duplicate slug
  if (datasheetSlugs.has(slug)) {
    errors.push(`[Datasheet: ${slug}] Duplicate slug across datasheets.`);
  }
  datasheetSlugs.add(slug);

  // Check valid appliance
  if (!validAppliances.includes(appliance)) {
    errors.push(`[Datasheet: ${slug}] Invalid appliance '${appliance}'.`);
  }

  // Check valid time bounds
  const minM = parseInt(timeMin, 10);
  const maxM = parseInt(timeMax, 10);
  if (minM <= 0 || maxM < minM) {
    errors.push(`[Datasheet: ${slug}] Invalid time range (${minM}-${maxM} mins).`);
  }

  // Check verification basis
  if (!basis || basis.trim().length === 0) {
    errors.push(`[Datasheet: ${slug}] Missing verificationBasis.`);
  }

  // Check safe internal temperature for poultry/ground beef
  const tempF = parseInt(internalTemp, 10);
  const foodLower = food.toLowerCase();
  if ((foodLower.includes('chicken') || foodLower.includes('turkey') || foodLower.includes('wings') || foodLower.includes('tenders') || foodLower.includes('poultry')) && tempF < 165) {
    errors.push(`[Datasheet: ${slug}] Poultry internalTempTargetF (${tempF}°F) is below USDA safe minimum (165°F).`);
  }
  if ((foodLower.includes('burger') || foodLower.includes('ground beef') || foodLower.includes('meatball')) && tempF < 160) {
    errors.push(`[Datasheet: ${slug}] Ground meat internalTempTargetF (${tempF}°F) is below USDA safe minimum (160°F).`);
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
  if (!toolsContent.includes('gramsPerTeaspoon: 5.7')) {
    errors.push('Table salt density must be calibrated to 5.7g/tsp.');
  }

  console.log('Audited quick tools dataset (Reheat, Frozen, Meat Math, Internal Temp, Salt, Troubleshoot).');
}

if (errors.length > 0) {
  console.error(`\n❌ CONTENT AUDIT FAILED with ${errors.length} error(s):\n`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ CONTENT AUDIT PASSED: ${recipes.length} recipes, ${datasheetCount} datasheets, and tools dataset verified.\n`);
  process.exit(0);
}
