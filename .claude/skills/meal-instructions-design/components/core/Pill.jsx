import React from 'react';
/** Mono uppercase tag/badge: px-2 py-0.5, 10px (xs=9px), hairline border. Variants for ink/accent/verified/info/caution states. */
export function Pill({ variant = 'outline', size = 'md', rounded = false, bold = false, icon, children, className = '', href, as, ...rest }) {
  const Tag = as || (href ? 'a' : 'span');
  const cls = ['mi-pill', variant !== 'outline' ? 'mi-pill--' + variant : '', size === 'xs' ? 'mi-pill--xs' : '', rounded ? 'mi-pill--rounded' : '', bold ? 'mi-pill--bold' : '', className].filter(Boolean).join(' ');
  return <Tag className={cls} href={href} {...rest}>{icon}{children}</Tag>;
}
