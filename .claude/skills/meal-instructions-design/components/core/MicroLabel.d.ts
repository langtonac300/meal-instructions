import * as React from 'react';
export interface MicroLabelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** accent for kickers (PARAMETRIC UTILITIES), ink for section headers, subtle for meta. Default ink-muted. */
  color?: 'accent' | 'ink' | 'subtle' | string;
  /** Leading 6px status dot: true (accent) or a StatusDot color. */
  dot?: boolean | 'accent' | 'ink' | 'muted' | 'verified' | 'live';
  pulse?: boolean;
  /** Right-aligned secondary note (e.g. "AT-A-GLANCE PROCESS METRICS"). */
  note?: React.ReactNode;
  as?: any;
}
export declare function MicroLabel(props: MicroLabelProps): JSX.Element;
