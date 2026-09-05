import React from 'react';
import { StatusDot } from './StatusDot.jsx';
/** .micro-label - 10px mono, 0.14em tracking, uppercase, 600. Section kicker with optional pulsing dot and trailing note. */
export function MicroLabel({ children, color, dot, pulse = true, note, as = 'div', className = '', style, ...rest }) {
  const Tag = as;
  const c = color === 'accent' ? 'var(--accent)' : color === 'ink' ? 'var(--ink)' : color === 'subtle' ? 'var(--ink-subtle)' : color || undefined;
  return (
    <Tag className={'micro-label ' + className} style={{ display: 'flex', alignItems: 'center', justifyContent: note ? 'space-between' : 'flex-start', gap: 8, color: c, ...style }} {...rest}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{dot && <StatusDot color={dot === true ? 'accent' : dot} pulse={pulse} />}<span style={{ fontWeight: dot ? 700 : undefined }}>{children}</span></span>
      {note && <span style={{ color: 'var(--ink-subtle)', fontWeight: 400 }}>{note}</span>}
    </Tag>
  );
}
