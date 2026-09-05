import * as React from 'react';
export interface CrisisPreset { id: string; title: string; subtitle: string; category?: string; maxMinutes?: number; }
export interface CrisisTriageBarProps {
  activePreset?: string | null;
  onSelectPreset?: (preset: CrisisPreset | null) => void;
  presets?: CrisisPreset[];
  /** Match count per preset id. */
  counts?: Record<string, number>;
  className?: string;
  style?: React.CSSProperties;
}
export declare function CrisisTriageBar(props: CrisisTriageBarProps): JSX.Element;
export declare const CRISIS_PRESETS: CrisisPreset[];
