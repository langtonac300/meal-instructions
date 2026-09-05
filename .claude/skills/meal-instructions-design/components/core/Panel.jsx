import React from 'react';
/** bg-paper-card + hairline box. Square/no shadow on recipe pages; rounded+shadow on home. dark = ink manifesto strip. verified = emerald 2px left rule. */
export function Panel({ variant = 'card', padding = 'lg', rounded = false, shadow = false, hover = false, verified = false, as = 'div', className = '', children, style, ...rest }) {
  const Tag = as;
  const pad = { none: '', sm: 'mi-panel--sm', md: 'mi-panel--md', lg: '', xl: 'mi-panel--lg' }[padding] || '';
  const cls = ['mi-panel', variant !== 'card' ? 'mi-panel--' + variant : '', pad, rounded === true ? 'mi-panel--rounded' : rounded === 'lg' ? 'mi-panel--rounded-lg' : '', shadow === true ? 'mi-panel--shadow' : shadow === 'float' ? 'mi-panel--float' : '', hover ? 'mi-panel--hover' : '', verified ? 'mi-panel--verified' : '', className].filter(Boolean).join(' ');
  return <Tag className={cls} style={{ ...(padding === 'none' ? { padding: 0 } : null), ...style }} {...rest}>{children}</Tag>;
}
