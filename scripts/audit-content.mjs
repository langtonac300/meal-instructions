import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const recipesJsonPath = path.join(__dirname, '../data/recipes.json');
const appliancesPath = path.join(__dirname, '../data/appliances.ts');
const categoriesPath = path.join(__dirname, '../data/categories.ts');
const typesPath = path.join(__dirname, '../lib/types.ts');

const recipes = JSON.parse(fs.readFileSync(recipesJsonPath, 'utf-8'));
const typesContent = fs.readFileSync(typesPath, 'utf-8');
const appliancesContent = fs.readFileSync(appliancesPath, 'utf-8');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf-8');

console.log(`\n--- RUNNING CONTENT AUDIT (npm run audit:content) ---`);
console.log(`Auditing ${recipes.length} recipes...\n`);

let errors = [];

// HR-5: Recipe count ceiling
if (recipes.length > 150) {
  errors.push(`Hard Rule Violation: Total recipe count (${recipes.length}) exceeds 150 ceiling.`);
}

// Declared types from lib/types.ts
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

// Track uniqueness (HR-4)
const taglines = new Map();
const stepSequences = new Map();
const dadProTips = new Map();
const reheatInstructions = new Map();
const kidAdjustments = new Map();

for (const r of recipes) {
  const slug = r.slug || r.id;

  // Check basis (HR-2)
  const basis = r.basis || r.cookTimeBasis;
  if (!basis || typeof basis !== 'string' || basis.trim().length === 0) {
    errors.push(`[${slug}] Missing required 'basis' field naming cook time verification.`);
  }

  // Check nutrition source (HR-2)
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

if (errors.length > 0) {
  console.error(`❌ CONTENT AUDIT FAILED with ${errors.length} error(s):\n`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ CONTENT AUDIT PASSED: ${recipes.length} recipes verified against all hard rules.\n`);
  process.exit(0);
}
