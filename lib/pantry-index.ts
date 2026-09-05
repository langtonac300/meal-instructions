import { RECIPES } from '@/data/recipes';
import { resolveRecipeImage } from './recipe-image';
import { classifyRecipe, type PantryRecipe } from './pantry-match';

/**
 * Server only (reads the image directory). The slim index /what-can-i-make
 * hands its client island: every recipe, already split into required and
 * flex pantry items, in id order.
 */
export function pantryIndex(): PantryRecipe[] {
  return [...RECIPES]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((r) => {
      const { required, anyOf, flex } = classifyRecipe(r);
      return {
        id: r.id,
        slug: r.slug,
        title: r.title,
        appliance: r.appliance,
        protein: r.protein,
        totalMinutes: r.totalMinutes,
        image: resolveRecipeImage(r.image),
        required,
        flex,
        ...(anyOf.length > 0 ? { anyOf } : {}),
      };
    });
}
