import * as React from 'react';
export interface RecipeScrubberProps {
  /** Active time budget in minutes, or null for ALL MEALS. */
  maxMinutes: number | null;
  onTimeChange?: (minutes: number | null) => void;
  /** Returns how many meals fit a budget (null = all). */
  countFor?: (minutes: number | null) => number;
  /** "e.g. Air Fryer Bacon (8m)" preview text. */
  sample?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function RecipeScrubber(props: RecipeScrubberProps): JSX.Element;
export declare const TIME_STOPS: { value: number | null; label: string }[];
