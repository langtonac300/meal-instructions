import * as React from 'react';
export interface RecipeSummary {
  id: string; slug: string; title: string; tagline: string;
  /** 'chicken'|'beef'|'pork'|'seafood'|'turkey'|'lamb'|'vegetarian'|'dairy-eggs' */
  protein: string;
  /** 'air-fryer'|'sheet-pan'|'cast-iron'|'skillet'|'grill'|'instant-pot'|'slow-cooker'|'smoker'|'oven'|'dutch-oven'|'boiling' */
  appliance: string;
  /** e.g. "400°F (204°C)" — card shows the first token. */
  cookTemp: string;
  totalMinutes: number;
  /** e.g. "Dead Simple" */
  difficulty: string;
  nutrition?: { proteinGrams?: number; calories?: number; carbsGrams?: number; fatGrams?: number; source?: string };
  image?: string;
  categories?: string[];
}
export interface RecipeCardProps {
  recipe: RecipeSummary;
  /** Dinner-roulette highlight: accent 2px border + 4px ring + float shadow. */
  isHighlighted?: boolean;
  /** Link target (default #/recipes/<slug>). */
  href?: string;
  /** Intercepts navigation for prototypes. */
  onOpen?: (recipe: RecipeSummary) => void;
  /** Image URL override. */
  image?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function RecipeCard(props: RecipeCardProps): JSX.Element;
