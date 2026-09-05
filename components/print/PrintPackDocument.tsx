import type { Recipe } from '@/lib/types';
import { packPageCount } from '@/lib/print-pack-format';
import PrintPackCover, { type PackVariant } from './PrintPackCover';
import RecipePrintCard from './RecipePrintCard';

interface Props {
  recipes: Recipe[];
  variant: PackVariant;
}

/**
 * The paged document: cover, then one sheet per recipe. A single recipe is
 * one sheet with no cover — a cover page for one card is a wasted print, and
 * that is what the recipe page's PRINT CARD button asks for.
 */
export default function PrintPackDocument({ recipes, variant }: Props) {
  const withCover = recipes.length > 1;
  const total = packPageCount(recipes.length);
  const first = withCover ? 2 : 1;
  return (
    <div className="pp-stack">
      {withCover && <PrintPackCover recipes={recipes} total={total} variant={variant} />}
      {recipes.map((recipe, i) => (
        <RecipePrintCard key={recipe.slug} recipe={recipe} page={i + first} total={total} />
      ))}
    </div>
  );
}
