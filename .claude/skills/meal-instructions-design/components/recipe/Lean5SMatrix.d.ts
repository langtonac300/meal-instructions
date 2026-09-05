export interface Lean5SMatrixProps {
  /** e.g. "400°F (204°C)" */
  cookTemp: string;
  totalMinutes: number;
  proteinGrams?: number;
  /** e.g. "165°F" — when present, shown as the 4th cell (Target Probe). */
  internalTemp?: string;
  flipMinutes?: number;
  restMinutes?: number;
  servings?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Lean5SMatrix(props: Lean5SMatrixProps): JSX.Element;
