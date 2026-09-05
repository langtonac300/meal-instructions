import * as React from 'react';
export interface CategoryMeta { slug: string; name: string; heroTag: string; image?: string; count?: number; }
export interface CategoryGridProps {
  categories: CategoryMeta[];
  /** Selected slug ('all' = none). */
  selected?: string;
  onSelect?: (slug: string) => void;
  counts?: Record<string, number>;
  /** Prefix for relative image paths. */
  imageBase?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function CategoryGrid(props: CategoryGridProps): JSX.Element;
