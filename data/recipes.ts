import type { Recipe } from '../lib/types.ts';
import recipesJson from './recipes.json';

export const RECIPES: Recipe[] = recipesJson as Recipe[];

export const RECIPE_BY_SLUG: Record<string, Recipe> = RECIPES.reduce((acc, recipe) => {
  acc[recipe.slug] = recipe;
  return acc;
}, {} as Record<string, Recipe>);

export const RECIPE_BY_ID: Record<string, Recipe> = RECIPES.reduce((acc, recipe) => {
  acc[recipe.id] = recipe;
  return acc;
}, {} as Record<string, Recipe>);

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPE_BY_SLUG[slug];
}

export function getAllRecipes(): Recipe[] {
  return RECIPES;
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
