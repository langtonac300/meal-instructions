import * as React from 'react';
export interface NavLink { href: string; label: string; badge?: string; }
export interface NavbarProps {
  /** Ticker counts. */
  recipeCount?: number;
  datasheetCount?: number;
  /** Highlights the matching nav link (border-b-2 ink, bold). */
  activeHref?: string;
  links?: NavLink[];
  onNavigate?: (href: string) => void;
  /** Opens SearchModal (also bound to ⌘K in the product). */
  onSearch?: () => void;
  onSignIn?: () => void;
  signedIn?: boolean;
  sticky?: boolean;
  showTicker?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Navbar(props: NavbarProps): JSX.Element;
export declare const NAV_LINKS: NavLink[];
