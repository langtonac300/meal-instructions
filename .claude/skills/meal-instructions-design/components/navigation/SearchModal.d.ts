import * as React from 'react';
export interface SearchItem { type: 'recipe' | 'guide' | 'storage'; id: string; title: string; subtitle?: string; /** appliance / FIELD GUIDE / STORAGE */ badge?: string; /** "24m", "6m read" */ time?: string; href?: string; keywords?: string[]; }
export interface SearchModalProps {
  isOpen: boolean;
  onClose?: () => void;
  /** Searchable items (recipes, guides, storage). Empty query shows the first 8. */
  items?: SearchItem[];
  onSelect?: (item: SearchItem) => void;
  placeholder?: string;
  /** Render the panel without the fixed scrim (for cards/docs). */
  inline?: boolean;
}
export declare function SearchModal(props: SearchModalProps): JSX.Element | null;
