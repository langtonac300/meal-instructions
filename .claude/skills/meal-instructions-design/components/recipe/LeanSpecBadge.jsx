import React from 'react';
import { LeanIcon } from '../core/LeanIcon.jsx';
const ICON = { time:'clock', temp:'heat-waves', protein:'fork', probe:'thermometer-probe', flip:'flip-action', rest:'rest-time', spray:'oil-spray', scale:'scale-weight', safety:'safety-shield', flame:'flame', speed:'lightning-fast' };
const FIXED = { safety:'var(--verified-strong)', flame:'var(--accent)', speed:'var(--accent)' };
/** Spec badge with a Lean 5S glyph. cell (default) = quick spec matrix card; row = label/value bar; inline = chip; compact = centered mini cell. */
export function LeanSpecBadge({ type = 'time', value, label, sub, variant = 'cell', accent = false, className = '', style }) {
  const color = FIXED[type] || (accent ? 'var(--accent)' : 'var(--ink)');
  const ico = (s) => <LeanIcon name={ICON[type] || 'clock'} size={s} style={{ color }} />;
  const vColor = accent ? 'var(--accent)' : 'var(--ink)';
  const M = 'var(--font-mono)';
  if (variant === 'inline') return (
    <span className={'hairline-border ' + className} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'2px 8px', background:'var(--paper)', fontFamily:M, fontSize:12, ...style }}>
      {ico(16)}<span style={{ color:'var(--ink-subtle)', textTransform:'uppercase', fontSize:10 }}>{label}:</span><span style={{ fontWeight:700, color:vColor }}>{value}</span>
    </span>);
  if (variant === 'row') return (
    <div className={'hairline-border ' + className} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:12, background:'var(--paper)', fontFamily:M, fontSize:12, ...style }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}><div className="hairline-border" style={{ padding:6, background:'var(--paper-50)', display:'flex' }}>{ico(22)}</div><div><span style={{ display:'block', fontSize:10, textTransform:'uppercase', color:'var(--ink-subtle)', letterSpacing:'.08em' }}>{label}</span>{sub && <span style={{ display:'block', fontSize:9, color:'var(--ink-muted)' }}>{sub}</span>}</div></div>
      <span style={{ fontSize:16, fontWeight:700, letterSpacing:'-.01em', color:vColor }}>{value}</span>
    </div>);
  if (variant === 'compact') return (
    <div className={'hairline-border ' + className} style={{ padding:8, background:'var(--paper)', fontFamily:M, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, ...style }}>
      {ico(20)}<span style={{ fontSize:8, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-subtle)', lineHeight:1 }}>{label}</span><span style={{ fontSize:12, fontWeight:700, lineHeight:1.25, color:vColor }}>{value}</span>
    </div>);
  return (
    <div className={'hairline-border mi-panel--hover ' + className} style={{ padding:12, background:'var(--paper)', fontFamily:M, display:'flex', flexDirection:'column', gap:8, position:'relative', overflow:'hidden', transition:'border-color .2s', ...style }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}><span style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-subtle)', fontWeight:600 }}>{label}</span><div style={{ opacity:.8 }}>{ico(24)}</div></div>
      <div><div style={{ fontSize:18, fontWeight:700, letterSpacing:'-.01em', color:vColor, lineHeight:1.4 }}>{value}</div>{sub && <div style={{ fontSize:9, color:'var(--ink-muted)', lineHeight:1.25, marginTop:2 }}>{sub}</div>}</div>
    </div>);
}
