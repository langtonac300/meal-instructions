import * as React from 'react';
import type { RecipeSummary } from './RecipeCard';
export interface RecipeTableProps {
  recipes: (RecipeSummary & { cookTempF?: number })[];
  onOpen?: (recipe: RecipeSummary) => void;
  href?: (recipe: RecipeSummary) => string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function RecipeTable(props: RecipeTableProps): JSX.Element;
