import * as React from 'react';
export type LeanSpecType = 'time'|'temp'|'protein'|'probe'|'flip'|'rest'|'spray'|'scale'|'safety'|'flame'|'speed';
export interface LeanSpecBadgeProps {
  type: LeanSpecType;
  value: string | number;
  label: string;
  /** Secondary line (e.g. "Preheat Required", "USDA Safe Pull"). */
  sub?: string;
  /** cell (default): spec matrix card. row: label/value bar. inline: chip. compact: centered mini cell. */
  variant?: 'cell' | 'row' | 'inline' | 'compact';
  /** Accent-colored value + icon (the live/critical metric, usually temp). */
  accent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function LeanSpecBadge(props: LeanSpecBadgeProps): JSX.Element;
