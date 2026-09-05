import * as React from 'react';
export interface PillProps extends React.HTMLAttributes<HTMLElement> {
  /** outline (default, bg-paper hairline), muted (ink-muted text), ink (inverse), accent (solid), accent-soft (10% tint - air fryer appliance chip / crisis filter), accent-outline (guide badge), verified (emerald text), verified-soft (emerald bg - VERIFIED DATASHEET), info (blue - frozen state / storage), caution (amber - release notice), inset (bg-paper-200), zinc (cast-iron chip), count (bare count badge). */
  variant?: 'outline' | 'muted' | 'ink' | 'accent' | 'accent-soft' | 'accent-outline' | 'verified' | 'verified-soft' | 'info' | 'caution' | 'inset' | 'zinc' | 'count';
  /** md 10px (default) or xs 9px. */
  size?: 'md' | 'xs';
  rounded?: boolean;
  bold?: boolean;
  icon?: React.ReactNode;
  href?: string;
  as?: any;
  children?: React.ReactNode;
}
export declare function Pill(props: PillProps): JSX.Element;
