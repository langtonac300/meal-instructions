import * as React from 'react';
export interface SegmentedOption { value: string | number | null; label?: React.ReactNode; icon?: React.ReactNode; note?: React.ReactNode; title?: string; }
export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedOption[];
  value: string | number | null;
  onChange?: (value: any) => void;
  /** pill: bg-paper-200 toggle (servings 2/4/6/8, grid/table view). square: full-width 2-col mode selector. hairline: separate hairline boxes (portion multiplier). */
  variant?: 'pill' | 'square' | 'hairline';
  /** Icon-only buttons (p-1.5). */
  icon?: boolean;
}
export declare function Segmented(props: SegmentedProps): JSX.Element;
