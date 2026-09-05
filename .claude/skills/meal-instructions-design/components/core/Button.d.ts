import * as React from 'react';
import type { IconName } from './Icon';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ink: bg-ink text-paper hover:bg-accent (primary). accent: bg-accent hover:accent-dark (live/CTA). outline: bg-paper hairline hover:border-ink. outline-muted: same, ink-muted text. card: bg-paper-50 hover:paper-200. paper: paper on ink strips (hover accent). ghost: text only. caution: amber (paused). inset: bg-paper-200 (+1 MIN). */
  variant?: 'ink' | 'accent' | 'outline' | 'outline-muted' | 'card' | 'paper' | 'ghost' | 'caution' | 'inset';
  /** sm 4x8/10px, md 6x12/12px (default), lg 10x16, xl 12x24. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 4px radius (home-page controls). Default square (recipe/datasheet pages). */
  rounded?: boolean;
  /** Leading Lucide icon name or node. */
  icon?: IconName | React.ReactNode;
  iconRight?: IconName | React.ReactNode;
  iconSize?: number;
  iconOnly?: boolean;
  /** Render as <a>. */
  href?: string;
  as?: any;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
