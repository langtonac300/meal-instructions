import * as React from 'react';
export interface MealActionsProps {
  recipeTitle?: string;
  /** false = "Sign in with Google" prompt; true = save / 5-star rate / suggest edit. */
  signedIn?: boolean;
  saved?: boolean;
  stars?: number;
  onSignIn?: () => void;
  onSave?: (saved: boolean) => void;
  onRate?: (stars: number) => void;
  onSuggest?: (body: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
export declare function MealActions(props: MealActionsProps): JSX.Element;
