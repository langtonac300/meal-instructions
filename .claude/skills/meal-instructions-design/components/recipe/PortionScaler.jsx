import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Segmented } from '../core/Segmented.jsx';
/** SERVINGS: 2 / 4 / 6 / 8★ pill toggle (components/PortionScaler.tsx). variant="multiplier" renders the recipe-page hairline boxes 2 (0.5x)…8 (2x). */
export function PortionScaler({ currentServings = 4, onChange, variant = 'pill', className = '', style }) {
  if (variant === 'multiplier') return (
    <div className={className} style={{ display:'flex', alignItems:'center', gap:4, fontFamily:'var(--font-mono)', fontSize:12, ...style }}>
      <span style={{ fontSize:10, color:'var(--ink-subtle)', textTransform:'uppercase', marginRight:8 }}>Servings:</span>
      <Segmented variant="hairline" value={currentServings} onChange={onChange} options={[{ value:2, label:'2 (0.5x)' }, { value:4, label:'4 (1x)' }, { value:6, label:'6 (1.5x)' }, { value:8, label:'8 (2x)' }]} />
    </div>);
  return (
    <div className={className} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--font-mono)', fontSize:12, userSelect:'none', ...style }}>
      <div style={{ display:'flex', alignItems:'center', gap:4, color:'var(--ink-muted)', fontSize:10, textTransform:'uppercase', letterSpacing:'.08em' }}><Icon name="users" size={14} /><span>SERVINGS:</span></div>
      <Segmented value={currentServings} onChange={onChange} options={[2, 4, 6, 8].map((n) => ({ value:n, label:<span>{n}{n === 8 && <span style={{ marginLeft:2, fontSize:8, color:'var(--accent)' }}>★</span>}</span> }))} />
    </div>);
}
