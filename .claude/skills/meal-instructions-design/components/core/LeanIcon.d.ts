import * as React from 'react';
export type LeanIconName = 'appliance-air-fryer'|'appliance-grill'|'appliance-instant-pot'|'appliance-sheet-pan'|'appliance-skillet'|'appliance-slow-cooker'|'appliance-smoker'|'clock'|'flame'|'flip-action'|'fork-knife'|'fork'|'heat-waves'|'lightning-fast'|'oil-spray'|'pan-heat'|'portion-plate'|'protein-all'|'protein-beef'|'protein-chicken'|'protein-dairy-eggs'|'protein-lamb'|'protein-pork'|'protein-seafood'|'protein-turkey'|'protein-vegetarian'|'rest-time'|'safety-shield'|'scale-weight'|'thermometer-probe'|'timer-stopwatch'
  | 'chicken'|'beef'|'pork'|'seafood'|'turkey'|'lamb'|'vegetarian'|'dairy-eggs'|'all'|'air-fryer'|'grill'|'instant-pot'|'sheet-pan'|'skillet'|'cast-iron'|'slow-cooker'|'smoker'|'time'|'temp'|'protein'|'probe'|'flip'|'rest'|'spray'|'scale'|'safety'|'speed'|'stopwatch'|'utensils'|'plate';
export interface LeanIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Glyph file name or a protein/appliance/metric alias (e.g. 'chicken', 'air-fryer', 'temp'). */
  name: LeanIconName;
  /** Pixel size - 11 to 28 in the product. Default 24. */
  size?: number;
  /** Override the design-system root URL (defaults to the directory of the linked styles.css). */
  base?: string;
}
export declare function LeanIcon(props: LeanIconProps): JSX.Element;
export declare function dsRoot(): string;
export declare const LEAN_ICONS: string[];
