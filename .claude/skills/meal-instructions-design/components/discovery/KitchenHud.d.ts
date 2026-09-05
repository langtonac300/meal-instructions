import * as React from 'react';
export interface CookTimeDatasheet {
  id: string; slug: string; food: string; foodSlug?: string; appliance: string; state: string; cutOrPrep?: string;
  tempF?: number; tempC?: number; tempFormatted: string; timeFormatted: string; timeMinMinutes?: number; timeMaxMinutes?: number;
  flipAtMinutes?: number; internalTempTargetF?: number; internalTempTargetFormatted?: string; restMinutes?: number; oilSprayRequired?: boolean;
  donenessCue?: string; verificationBasis?: string; proTip?: string; relatedRecipeSlug?: string;
}
export interface KitchenHudProps {
  datasheets: CookTimeDatasheet[];
  recipes?: { slug: string; title: string; protein?: string; appliance?: string; totalMinutes?: number }[];
  /** TOP QUERIES pills; defaults to the first 8 datasheets. */
  presets?: { label: string; slug: string }[];
  activeSlug?: string;
  onActiveChange?: (slug: string) => void;
  onOpenRecipe?: (recipe: any) => void;
  onOpenDatasheet?: (sheet: CookTimeDatasheet) => void;
  datasheetCount?: number;
  recipeCount?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function KitchenHud(props: KitchenHudProps): JSX.Element | null;
