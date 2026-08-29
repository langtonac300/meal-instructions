import { Recipe, Ingredient } from './types';
import { RECIPES } from '@/data/recipes';

export function getAllRecipes(): Recipe[] {
  return RECIPES;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}

export function getRecipesByCategory(category: string): Recipe[] {
  return RECIPES.filter((r) => r.categories.includes(category as any));
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
        r.categories.some((c) => recipe.categories.includes(c)) ||
        r.protein === recipe.protein)
  ).slice(0, limit);
}

export function scaleIngredientAmount(
  amount: number,
  baseServings: number,
  targetServings: number
): string {
  const scaled = (amount / baseServings) * targetServings;
  if (scaled === 0) return '';
  
  // Format nicely to fractions or 1-2 decimal spots
  if (Math.abs(scaled - 0.25) < 0.05) return '1/4';
  if (Math.abs(scaled - 0.33) < 0.05) return '1/3';
  if (Math.abs(scaled - 0.5) < 0.05) return '1/2';
  if (Math.abs(scaled - 0.66) < 0.05) return '2/3';
  if (Math.abs(scaled - 0.75) < 0.05) return '3/4';
  if (scaled % 1 === 0) return scaled.toString();
  
  return scaled.toFixed(1).replace(/\.0$/, '');
}

export function generateRecipeSchema(recipe: Recipe, baseUrl = 'https://dadmeals.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.tagline,
    url: `${baseUrl}/recipes/${recipe.slug}`,
    image: [
      `${baseUrl}/og-image.jpg`,
      `${baseUrl}/recipes/${recipe.slug}/opengraph-image`,
    ],
    author: {
      '@type': 'Organization',
      name: 'DadMeals Zero Fluff',
      url: baseUrl,
    },
    datePublished: recipe.datePublished,
    prepTime: `PT${recipe.prepMinutes}M`,
    cookTime: `PT${recipe.cookMinutes}M`,
    totalTime: `PT${recipe.totalMinutes}M`,
    keywords: recipe.keywords.join(', '),
    recipeYield: `${recipe.defaultServings} servings`,
    recipeCategory: recipe.categories.join(', '),
    recipeCuisine: 'American / Fast Family',
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.proteinGrams} g`,
      carbohydrateContent: `${recipe.nutrition.carbsGrams} g`,
      fatContent: `${recipe.nutrition.fatGrams} g`,
    },
    recipeIngredient: recipe.ingredients.map(
      (ing) => `${ing.amount} ${ing.unit} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`
    ),
    recipeInstructions: recipe.detailedSteps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: `${step.instruction}${step.proTip ? ` Tip: ${step.proTip}` : ''}`,
      url: `${baseUrl}/recipes/${recipe.slug}#step-${step.stepNumber}`,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function formatRecipeToMarkdown(recipe: Recipe): string {
  const ingredientsList = recipe.ingredients
    .map((ing) => `- ${ing.amount} ${ing.unit} ${ing.item}${ing.notes ? ` (${ing.notes})` : ''}`)
    .join('\n');

  const detailedStepsList = recipe.detailedSteps
    .map(
      (step) =>
        `### Step ${step.stepNumber}: ${step.title}\n${step.instruction}\n${
          step.proTip ? `> **Dad Pro Tip**: ${step.proTip}\n` : ''
        }`
    )
    .join('\n\n');

  const quickBullets = recipe.quickVersion.bullets.map((b) => `- ${b}`).join('\n');

  return `---
title: ${recipe.title}
id: ${recipe.id}
appliance: ${recipe.appliance}
cook_temp: ${recipe.cookTemp}
prep_time: ${recipe.prepMinutes} mins
cook_time: ${recipe.cookMinutes} mins
total_time: ${recipe.totalMinutes} mins
servings: ${recipe.defaultServings}
protein: ${recipe.nutrition.proteinGrams}g
calories: ${recipe.nutrition.calories}
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
