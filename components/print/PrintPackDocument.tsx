import type { Recipe } from '@/lib/types';
import PrintPackCover, { type PackVariant } from './PrintPackCover';
import RecipePrintCard from './RecipePrintCard';

interface Props {
  recipes: Recipe[];
  variant: PackVariant;
}

/** The paged document: cover, then one sheet per recipe. Server-rendered; nothing here is interactive. */
export default function PrintPackDocument({ recipes, variant }: Props) {
  const total = recipes.length + 1;
  return (
    <div className="pp-stack">
      <PrintPackCover recipes={recipes} total={total} variant={variant} />
      {recipes.map((recipe, i) => (
        <RecipePrintCard key={recipe.slug} recipe={recipe} page={i + 2} total={total} />
      ))}
    </div>
  );
}
