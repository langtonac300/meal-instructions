import { Recipe, Ingredient } from './types';
import { RECIPES } from '@/data/recipes';
import { SITE_URL, SITE_NAME, abs } from './site';
import { videoSchema, type RecipeVideo } from './recipe-video';

export function getAllRecipes(): Recipe[] {
  return RECIPES;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}

export function getRecipesByCategory(category: string): Recipe[] {
  return RECIPES.filter((r) => (r.categories as string[]).includes(category));
}

export function getRecipesByAppliance(appliance: string): Recipe[] {
  return RECIPES.filter((r) => r.appliance === appliance);
}

export function getRecipesByProtein(protein: string): Recipe[] {
  return RECIPES.filter((r) => r.protein === protein);
}

export function getRelatedRecipes(recipe: Recipe, limit = 3): Recipe[] {
  return RECIPES.filter(
    (r) =>
      r.slug !== recipe.slug &&
      (r.appliance === recipe.appliance ||
        r.categories.some((c) => (recipe.categories as string[]).includes(c)) ||
        r.protein === recipe.protein)
  ).slice(0, limit);
}

/**
 * Formats a scaled ingredient amount into clean fractions or decimals (HR-14)
 */
export function formatScaledAmount(baseAmount: number, multiplier: number): string {
  const total = baseAmount * multiplier;
  if (total === 0) return '';

  if (Math.abs(total - 0.25) < 0.05) return '1/4';
  if (Math.abs(total - 0.33) < 0.05) return '1/3';
  if (Math.abs(total - 0.5) < 0.05) return '1/2';
  if (Math.abs(total - 0.66) < 0.05) return '2/3';
  if (Math.abs(total - 0.75) < 0.05) return '3/4';
  if (Math.abs(total - 1.25) < 0.05) return '1 1/4';
  if (Math.abs(total - 1.5) < 0.05) return '1 1/2';
  if (Math.abs(total - 1.75) < 0.05) return '1 3/4';
  if (Math.abs(total - 2.5) < 0.05) return '2 1/2';

  if (Number.isInteger(total)) return total.toString();
  return (Math.round(total * 10) / 10).toString();
}

/**
 * Builds a clean, SMS-friendly text message for spouse / grocery run
 */
export function buildSmsShareText(recipe: Recipe): string {
  const ingredientsList = recipe.ingredients
    .map((i) => `• ${i.qty} ${i.unit} ${i.item}${i.notes ? ` (${i.notes})` : ''}`)
    .join('\n');

  return `🔥 ${recipe.title.toUpperCase()}
⏱️ ${recipe.cookTemp} | ${recipe.totalMinutes} mins total

GROCERY LIST:
${ingredientsList}

QUICK STEPS:
${recipe.quickVersion.bullets.map((b, i) => `${i + 1}. ${b}`).join('\n')}

🔗 Full recipe: ${abs(`/recipes/${recipe.slug}`)}`;
}

export function generateRecipeSchema(
  recipe: Recipe,
  opts: { imageUrl?: string; video?: RecipeVideo } = {}
) {
  const imageUrl = opts.imageUrl ?? abs('/opengraph-image.png');
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    headline: recipe.title,
    description: recipe.tagline,
    url: abs(`/recipes/${recipe.slug}`),
    image: [imageUrl],
    author: [
      {
        '@type': 'Person',
        name: 'Meal Instructions Kitchen',
        url: abs('/about'),
      },
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: abs('/logo-512.png'),
      },
    },
    datePublished: recipe.datePublished,
    prepTime: `PT${recipe.prepMinutes}M`,
    cookTime: `PT${recipe.cookMinutes}M`,
    totalTime: `PT${recipe.totalMinutes}M`,
    keywords: recipe.keywords.join(', '),
    recipeYield: `${recipe.defaultServings} servings`,
    recipeCategory: recipe.categories.join(', '),
    recipeCuisine: 'American',
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.qty} ${ing.unit} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`
    ),
    recipeInstructions: recipe.detailedSteps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: `${step.instruction}${step.proTip ? ` Tip: ${step.proTip}` : ''}`,
      url: abs(`/recipes/${recipe.slug}#step-${step.stepNumber}`),
    })),
    // HR-2: no aggregateRating until real, verifiable user reviews exist.
    // Synthetic or site-wide-identical review markup violates Google's
    // structured data policy and is manual-action eligible. Do not re-add
    // this with randomised values — that is the same violation.
  };

  // A curated clip, when this recipe has one. videoSchema() returns null rather
  // than a half-built object if any field Google requires is missing: incomplete
  // markup fails validation on a page that would otherwise pass.
  if (opts.video) {
    const video = videoSchema(opts.video);
    if (video) schema.video = video;
  }

  if (recipe.nutrition) {
    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.proteinGrams} g`,
      carbohydrateContent: `${recipe.nutrition.carbsGrams} g`,
      fatContent: `${recipe.nutrition.fatGrams} g`,
    };
  }

  return schema;
}

export function recipeToMarkdown(recipe: Recipe): string {
  const ingredientsList = recipe.ingredients
    .map((ing) => `- ${ing.qty} ${ing.unit} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`)
    .join('\n');

  const detailedStepsList = recipe.detailedSteps
    .map(
      (step) =>
        `### Step ${step.stepNumber}: ${step.title}\n${step.instruction}\n${
          step.proTip ? `> **Dad Pro Tip**: ${step.proTip}\n` : ''
        }`
    )
    .join('\n\n');

  const quickBullets = recipe.quickVersion.bullets.map((b, i) => `${i + 1}. ${b}`).join('\n');

  return `---
title: ${recipe.title}
id: ${recipe.id}
appliance: ${recipe.appliance}
cook_temp: ${recipe.cookTemp}
prep_time: ${recipe.prepMinutes} mins
cook_time: ${recipe.cookMinutes} mins
total_time: ${recipe.totalMinutes} mins
servings: ${recipe.defaultServings}
protein: ${recipe.nutrition?.proteinGrams ?? 30}g
calories: ${recipe.nutrition?.calories ?? 400}
basis: ${recipe.basis}
---

# ${recipe.title}
*${recipe.tagline}*

## ⚡ GET TO THE POINT (Ultra-Concise)
- **Temp**: ${recipe.quickVersion.temp}
- **Time**: ${recipe.quickVersion.totalTime}
- **Timer**: ${recipe.quickVersion.timerMinutes} mins${
    recipe.quickVersion.flipAtMinutes ? ` (Flip at ${recipe.quickVersion.flipAtMinutes} mins)` : ''
  }

${quickBullets}

## 🛒 Ingredients (${recipe.defaultServings} Servings)
${ingredientsList}

## 📖 Step-by-Step Instructions
${detailedStepsList}

## 💡 Dad Pro Tip
${recipe.dadProTip}

${recipe.kidAdjustment ? `## 👶 Kid & Picky Eater Adjustment\n${recipe.kidAdjustment}\n` : ''}
## 🔄 Reheating Instructions
${recipe.reheatInstructions}
`;
}
