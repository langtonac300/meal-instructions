import React from 'react';
import { LeanIcon } from '../core/LeanIcon.jsx';
import { MicroLabel } from '../core/MicroLabel.jsx';
export const PROTEIN_OPTIONS = [
  { slug:'all', label:'All Cuts', sublabel:'Complete Index' }, { slug:'chicken', label:'Chicken', sublabel:'Poultry' }, { slug:'beef', label:'Beef', sublabel:'Steaks & Ground' }, { slug:'pork', label:'Pork', sublabel:'Chops & Bacon' },
  { slug:'seafood', label:'Seafood', sublabel:'Fish & Shrimp' }, { slug:'turkey', label:'Turkey', sublabel:'Lean Poultry' }, { slug:'lamb', label:'Lamb', sublabel:'Chops & Roasts' }, { slug:'vegetarian', label:'Plant / Veg', sublabel:'Meatless' }, { slug:'dairy-eggs', label:'Dairy & Eggs', sublabel:'Fast Skillets' }];
/** PRIMARY PROTEIN SELECTOR band: horizontal row of "tactile specimen" buttons (Lean 5S glyph, label, count badge, sublabel). Active = bg-ink with accent icon/count. */
export function ProteinSelectorBar({ selected = 'all', onSelect, counts = {}, total, options = PROTEIN_OPTIONS, style, className = '' }) {
  const all = total != null ? total : Object.values(counts).reduce((a, b) => a + b, 0);
  return (
    <div className={'hairline-b ' + className} style={{ width:'100%', background:'var(--paper)', ...style }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'12px 32px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
          <MicroLabel color="ink" dot style={{ letterSpacing:'.14em' }}>PRIMARY PROTEIN SELECTOR <span style={{ color:'rgba(90,88,84,.6)', fontWeight:400, marginLeft:8 }}>— FILTER BY WHAT'S IN YOUR FRIDGE</span></MicroLabel>
          <span style={{ fontSize:10, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-muted)' }}>{selected === 'all' ? 'SHOWING ALL ' + all + ' MEALS' : 'FILTERED: ' + selected.toUpperCase()}</span>
        </div>
        <div className="scrollbar-none" style={{ display:'flex', alignItems:'center', gap:8, overflowX:'auto', paddingBottom:6, paddingTop:2 }}>
          {options.map((o) => { const on = selected === o.slug; const c = o.slug === 'all' ? all : (counts[o.slug] || 0); if (!c && o.slug !== 'all') return null; return (
            <button key={o.slug} type="button" title={'Filter recipes by ' + o.label} onClick={() => onSelect && onSelect(on && o.slug !== 'all' ? 'all' : o.slug)} className={'mi-chip mi-chip--card' + (on ? ' is-active' : '')} style={{ padding:'8px 12px', gap:10, flexShrink:0, textTransform:'none', letterSpacing:0, fontWeight:400, boxShadow: on ? '0 0 0 1px var(--ink), var(--shadow-sm)' : 'none' }}>
              <span style={{ padding:4, borderRadius:4, display:'flex', color: on ? 'var(--accent)' : 'var(--ink-muted)', background: on ? 'rgba(245,244,240,.1)' : 'transparent' }}><LeanIcon name={o.slug} size={20} /></span>
              <span style={{ textAlign:'left' }}>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', whiteSpace:'nowrap' }}>{o.label}</span><span style={{ fontSize:10, fontWeight:700, padding:'0 4px', borderRadius:4, background: on ? 'var(--accent)' : 'var(--paper-200)', color: on ? '#fff' : 'var(--ink-subtle)' }}>{c}</span></span>
                {o.sublabel && <span style={{ display:'block', fontSize:9, textTransform:'uppercase', letterSpacing:'-.01em', color: on ? 'rgba(245,244,240,.7)' : 'rgba(90,88,84,.7)' }}>{o.sublabel}</span>}
              </span>
            </button>); })}
        </div>
      </div>
    </div>);
}
