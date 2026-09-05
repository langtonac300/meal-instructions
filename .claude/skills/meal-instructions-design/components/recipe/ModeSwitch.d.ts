import * as React from 'react';
export interface ModeSwitchProps {
  /** 'fast' (⚡ GET TO THE POINT) or 'detailed' (📖 STEP-BY-STEP). */
  mode: 'fast' | 'detailed';
  onChange?: (mode: 'fast' | 'detailed') => void;
  /** Pin below the 64px header (default true). */
  sticky?: boolean;
  top?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function ModeSwitch(props: ModeSwitchProps): JSX.Element;
export interface ModeSwitchCardsProps {
  mode: 'quick' | 'detailed';
  onChange?: (mode: 'quick' | 'detailed') => void;
  className?: string;
  style?: React.CSSProperties;
}
/** Card-style "CHOOSE YOUR COOKING MODE" picker (components/RecipeModeSwitch.tsx). */
export declare function ModeSwitchCards(props: ModeSwitchCardsProps): JSX.Element;
