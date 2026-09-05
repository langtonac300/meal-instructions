import * as React from 'react';
export interface LogoProps {
  /** Mark size: sm 24px (footer), md 32px (navbar), lg 44px, xl 64px. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'mark-only' | 'horizontal' | 'stacked';
  /** Paper wordmark for use on ink backgrounds. */
  inverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
