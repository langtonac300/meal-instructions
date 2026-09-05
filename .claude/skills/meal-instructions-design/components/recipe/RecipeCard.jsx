import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { LeanIcon } from '../core/LeanIcon.jsx';
import { Pill } from '../core/Pill.jsx';
import { StatusDot } from '../core/StatusDot.jsx';
const APPL = { 'air-fryer':'accent-soft', 'cast-iron':'zinc' };
/** Directory recipe card: index #, protein + appliance chips, 176px photo, title, tagline, 3-cell spec matrix (TEMP/TIME/PROTEIN), difficulty + DIRECTIONS footer. */
export function RecipeCard({ recipe, isHighlighted = false, href, onOpen, image, style, className = '' }) {
  const r = recipe;
  const link = href || ('#/recipes/' + r.slug);
  const img = image || r.image;
  const go = (e) => { if (onOpen) { e.preventDefault(); onOpen(r); } };
  const cell = (icon, iconColor, label, val, valColor) => (
    <div style={{ background:'var(--paper-100)', padding:8, borderRadius:4, border:'1px solid rgba(223,220,206,.6)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between' }}>
      <LeanIcon name={icon} size={20} style={{ color:iconColor, marginBottom:4 }} /><span style={{ display:'block', fontSize:8, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-subtle)' }}>{label}</span><span style={{ fontSize:11, fontWeight:700, color:valColor }}>{val}</span>
    </div>);
  return (
    <article id={'recipe-' + r.slug} className={'mi-card ' + (isHighlighted ? 'is-highlighted ' : '') + className} style={style}>
      <div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.14em', color:'var(--ink-muted)', marginBottom:12 }}>
          <span className="mi-card__id" style={{ fontWeight:700, color:'var(--ink)' }}>{r.id}</span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <Pill size="xs" rounded bold style={{ color:'var(--ink-muted)', fontWeight:600, letterSpacing:0 }} icon={<LeanIcon name={r.protein} size={12} style={{ color:'var(--accent)' }} />}>{r.protein.replace('-', ' ')}</Pill>
            <Pill size="xs" rounded variant={APPL[r.appliance] || 'inset'} style={{ padding:'2px 8px', fontWeight:600, letterSpacing:0 }}>{r.appliance.replace('-', ' ')}</Pill>
          </div>
        </div>
        {img && <a href={link} onClick={go} className="mi-card__img"><img src={img} alt={r.title} /></a>}
        <a href={link} onClick={go} style={{ display:'block', textDecoration:'none' }}><h3 className="mi-card__title" style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:20, fontWeight:700, letterSpacing:'-.01em', color:'var(--ink)', lineHeight:1.375 }}>{r.title}</h3></a>
        <p style={{ fontSize:14, color:'var(--ink-muted)', marginTop:8, marginBottom:0, lineHeight:1.625, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{r.tagline}</p>
        <div style={{ marginTop:16, paddingTop:12, borderTop:'1px solid var(--hairline)', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, textAlign:'center', fontFamily:'var(--font-mono)' }}>
          {cell('heat-waves', 'var(--ink-muted)', 'TEMP', String(r.cookTemp).split(' ')[0], 'var(--ink)')}
          {cell('clock', 'var(--ink-muted)', 'TIME', r.totalMinutes + ' MIN', 'var(--ink)')}
          {cell('fork', 'var(--accent)', 'PROTEIN', ((r.nutrition && r.nutrition.proteinGrams) || 30) + 'G', 'var(--accent)')}
        </div>
      </div>
      <div style={{ marginTop:16, paddingTop:12, borderTop:'1px solid rgba(223,220,206,.6)', display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:11, fontFamily:'var(--font-mono)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, color:'var(--ink-muted)', fontSize:10 }}><StatusDot color="verified" /><span>{r.difficulty}</span></div>
        <a href={link} onClick={go} className="mi-card__cta" style={{ display:'inline-flex', alignItems:'center', gap:4, color:'var(--ink)', fontWeight:600, fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', textDecoration:'none' }}><span>DIRECTIONS</span><Icon name="arrow-up-right" size={14} className="mi-card__arrow" /></a>
      </div>
    </article>);
}
