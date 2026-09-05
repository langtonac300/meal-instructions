import * as React from 'react';
export interface FooterProps {
  categories?: string[];
  appliances?: string[];
  datasheetCount?: number;
  onNavigate?: (href: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Footer(props: FooterProps): JSX.Element;
