import React from 'react';
const DIM = { sm: 24, md: 32, lg: 44, xl: 64 };
const TXT = { sm: 12, md: 16, lg: 20, xl: 24 };
/** Meal Instructions lockup - architectural M + gauge-needle I mark with wordmark and tagline (components/Logo.tsx). */
export function Logo({ size = 'md', variant = 'horizontal', inverse = false, className = '', style }) {
  const d = DIM[size] || 32;
  const ink = inverse ? 'var(--paper)' : 'var(--ink)';
  return (
    <div className={'mi-logo ' + className} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, ...style }}>
      <svg width={d} height={d} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} aria-label="Meal Instructions">
        <rect width="48" height="48" rx="8" fill="#111111" /><rect x="0.5" y="0.5" width="47" height="47" rx="7.5" stroke="#262626" strokeWidth="1" />
        <path d="M10 36V14L19 25L28 14V36" stroke="#F5F4F0" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" />
        <line x1="36.5" y1="14" x2="36.5" y2="36" stroke="#F5F4F0" strokeWidth="3.5" strokeLinecap="square" />
        <circle cx="36.5" cy="14" r="2.5" fill="#EA580C" />
        <line x1="4" y1="24" x2="6.5" y2="24" stroke="#404040" strokeWidth="1" /><line x1="41.5" y1="24" x2="44" y2="24" stroke="#404040" strokeWidth="1" /><line x1="24" y1="4" x2="24" y2="6.5" stroke="#404040" strokeWidth="1" /><line x1="24" y1="41.5" x2="24" y2="44" stroke="#404040" strokeWidth="1" />
      </svg>
      {variant !== 'mark-only' && (
        <div style={{ textAlign: variant === 'stacked' ? 'center' : 'left' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: ink, lineHeight: 1.25, fontSize: TXT[size] || 16 }}>MEAL INSTRUCTIONS</span>
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: size === 'sm' ? 8 : 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: inverse ? 'var(--neutral-400)' : 'var(--ink-muted)', marginTop: -2 }}>NO FLUFF, JUST THE INSTRUCTIONS</span>
        </div>
      )}
    </div>
  );
}
