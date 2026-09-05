import * as React from 'react';
export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'accent' | 'ink' | 'muted' | 'verified' | 'live';
  /** animate-pulse (section kickers, ticker). */
  pulse?: boolean;
  /** animate-ping (running timer). */
  ping?: boolean;
  size?: 'md' | 'lg';
}
export declare function StatusDot(props: StatusDotProps): JSX.Element;
