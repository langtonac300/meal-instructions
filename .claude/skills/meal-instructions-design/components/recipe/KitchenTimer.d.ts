import * as React from 'react';
export interface KitchenTimerProps {
  initialMinutes?: number;
  /** e.g. "Air Fryer Timer", "Chicken Breast · Flip @ 6m" */
  label?: string;
  autoStart?: boolean;
  onClose?: () => void;
  /** Fixed bottom-right (default) or inline. */
  fixed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function KitchenTimer(props: KitchenTimerProps): JSX.Element;
