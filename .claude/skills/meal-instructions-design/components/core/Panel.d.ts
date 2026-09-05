import * as React from 'react';
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** card = bg-paper-card (default), inset = bg-paper-100, paper = bg-paper (nested cells), dark = bg-ink text-paper rounded-lg. */
  variant?: 'card' | 'inset' | 'paper' | 'dark';
  /** none 0, sm 12, md 16, lg 24 (default), xl 32. */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** true = 4px, 'lg' = 8px. */
  rounded?: boolean | 'lg';
  /** true = shadow-subtle, 'float' = shadow-float. */
  shadow?: boolean | 'float';
  /** Border to ink on hover. */
  hover?: boolean;
  /** Emerald 2px left rule (verified datasheet cross-link). */
  verified?: boolean;
  as?: any;
  children?: React.ReactNode;
}
export declare function Panel(props: PanelProps): JSX.Element;
