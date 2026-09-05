import React from 'react';
import { Icon } from './Icon.jsx';
/** Mono, uppercase, tracked button. Variants map to the codebase's repeated class combos: ink (bg-ink > hover:bg-accent), accent (> accent-dark), outline (hairline > hover:border-ink), card, paper, ghost, caution, inset. Square corners by default; rounded=4px on home-page controls. */
export function Button({ variant = 'ink', size = 'md', rounded = false, icon, iconRight, iconSize, children, className = '', href, as, iconOnly = false, ...rest }) {
  const Tag = as || (href ? 'a' : 'button');
  const cls = ['mi-btn', 'mi-btn--' + variant, 'mi-btn--' + size, rounded ? 'mi-btn--rounded' : '', iconOnly ? 'mi-btn--icon' : '', className].filter(Boolean).join(' ');
  const isz = iconSize || (size === 'sm' ? 12 : 14);
  return (
    <Tag className={cls} href={href} type={Tag === 'button' ? (rest.type || 'button') : undefined} {...rest}>
      {icon && (typeof icon === 'string' ? <Icon name={icon} size={isz} /> : icon)}
      {children && <span>{children}</span>}
      {iconRight && (typeof iconRight === 'string' ? <Icon name={iconRight} size={isz} /> : iconRight)}
    </Tag>
  );
}
