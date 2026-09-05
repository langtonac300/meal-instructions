import * as React from 'react';
export type IconName = 'search'|'x'|'menu'|'zap'|'book-open'|'clock'|'flame'|'play'|'pause'|'rotate-ccw'|'printer'|'share-2'|'copy'|'check'|'shield-check'|'arrow-left'|'arrow-right'|'arrow-up-right'|'arrow-up-down'|'layout-grid'|'list-filter'|'dices'|'bookmark'|'bookmark-check'|'star'|'log-in'|'log-out'|'users'|'volume-2'|'external-link'|'check-circle-2'|'x-circle'|'message-square'|'pencil'|'bell'|'sparkles'|'thermometer'|'sliders-horizontal'|'shield-alert'|'scale';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Lucide icon name (kebab-case). */
  name: IconName;
  /** Pixel size. Codebase uses 12 (w-3), 14 (w-3.5), 16 (w-4), 20 (w-5). Default 16. */
  size?: number;
  strokeWidth?: number;
  /** 'currentColor' to fill (e.g. rated stars). Default 'none'. */
  fill?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
export declare const LUCIDE: Record<IconName, Array<[string, Record<string, string | number>]>>;
