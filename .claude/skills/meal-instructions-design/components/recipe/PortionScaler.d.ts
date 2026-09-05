import * as React from 'react';
export interface PortionScalerProps {
  currentServings: number;
  onChange?: (servings: number) => void;
  /** pill (default, SERVINGS: 2/4/6/8★) or multiplier (hairline boxes "4 (1x)"). */
  variant?: 'pill' | 'multiplier';
  className?: string;
  style?: React.CSSProperties;
}
export declare function PortionScaler(props: PortionScalerProps): JSX.Element;
