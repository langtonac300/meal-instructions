import React from 'react';
import { MicroLabel } from '../core/MicroLabel.jsx';
export const CRISIS_PRESETS = [
  { id:'no-thaw', title:'Forgot To Thaw', subtitle:'Cook direct from frozen', category:'no-thaw' }, { id:'sub-15', title:'Sub-15 Min Rush', subtitle:'Dinner before meltdown', maxMinutes:15 }, { id:'picky-kids', title:'Picky Eater Proof', subtitle:'Zero table negotiation', category:'kid-approved' },
  { id:'one-pan', title:'Zero Dish Duty', subtitle:'Sheet pan & 1-skillet only', category:'one-pan' }, { id:'high-protein', title:'High Protein (30g+)', subtitle:'Pure muscle & satiety', category:'high-protein' }, { id:'budget', title:'Under $12 Budget', subtitle:'Pantry staple savings', category:'budget' }];
/** DINNER CRISIS TRIAGE band: six "PRESET // 0n" tiles with count badge, uppercase sans title and mono subtitle. Active = bg-ink. */
export function CrisisTriageBar({ activePreset = null, onSelectPreset, presets = CRISIS_PRESETS, counts = {}, style, className = '' }) {
  return (
    <div className={className} style={{ width:'100%', background:'var(--paper-100)', borderBottom:'1px solid var(--hairline)', padding:'12px 32px', userSelect:'none', ...style }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <MicroLabel color="ink" dot pulse={false}>DINNER CRISIS TRIAGE <span style={{ color:'rgba(90,88,84,.7)', fontWeight:400, marginLeft:8 }}>— SELECT YOUR IMMEDIATE SITUATION</span></MicroLabel>
          {activePreset && <button type="button" onClick={() => onSelectPreset && onSelectPreset(null)} className="mi-hover-underline" style={{ fontSize:10, fontFamily:'var(--font-mono)', fontWeight:700, color:'var(--accent)', textTransform:'uppercase', background:'none', border:0, cursor:'pointer' }}>Reset Triage</button>}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6, minmax(0,1fr))', gap:8, fontFamily:'var(--font-mono)' }}>
          {presets.map((p, i) => { const on = activePreset === p.id; return (
            <button key={p.id} type="button" onClick={() => onSelectPreset && onSelectPreset(on ? null : p)} className={'mi-tile mi-tile--rounded mi-tile--ring' + (on ? ' is-active' : '')} style={{ padding:10, textAlign:'left', background: on ? 'var(--ink)' : 'var(--paper-50)', color: on ? 'var(--paper)' : 'var(--ink)', borderColor: on ? 'var(--ink)' : undefined, boxShadow: on ? 'var(--shadow-sm)' : 'none', fontFamily:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}><span style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color: on ? 'var(--accent)' : 'var(--ink-subtle)' }}>PRESET // 0{i + 1}</span><span style={{ fontSize:10, fontWeight:700, padding:'0 6px', borderRadius:4, background: on ? 'var(--accent)' : 'var(--paper-200)', color: on ? '#fff' : 'var(--ink-muted)' }}>{counts[p.id] != null ? counts[p.id] : ''}</span></div>
              <div><div className="mi-tile__title" style={{ fontSize:12, fontWeight:700, fontFamily:'var(--font-sans)', textTransform:'uppercase', letterSpacing:'-.01em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.title}</div><div style={{ fontSize:10, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color: on ? 'rgba(245,244,240,.7)' : 'var(--ink-muted)' }}>{p.subtitle}</div></div>
            </button>); })}
        </div>
      </div>
    </div>);
}
