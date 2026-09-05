import * as React from 'react';
export interface ProteinOption { slug: string; label: string; sublabel?: string; }
export interface ProteinSelectorBarProps {
  /** 'all' or a protein slug. */
  selected?: string;
  onSelect?: (slug: string) => void;
  /** Recipe count per protein slug. */
  counts?: Record<string, number>;
  total?: number;
  options?: ProteinOption[];
  className?: string;
  style?: React.CSSProperties;
}
export declare function ProteinSelectorBar(props: ProteinSelectorBarProps): JSX.Element;
export declare const PROTEIN_OPTIONS: ProteinOption[];
