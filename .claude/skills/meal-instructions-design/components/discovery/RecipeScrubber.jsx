import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';
export const TIME_STOPS = [{ value:10, label:'10 MINS' }, { value:15, label:'15 MINS' }, { value:20, label:'20 MINS' }, { value:25, label:'25 MINS' }, { value:35, label:'35 MINS' }, { value:null, label:'ALL MEALS' }];
const POS = { 10:'10%', 15:'30%', 20:'50%', 25:'68%', 35:'83%' };
/** TIME BUDGET ruler (components/RecipeScrubber.tsx): paper-100 band, 56px dotted-grid track with 6 tick stops and an accent needle. */
export function RecipeScrubber({ maxMinutes = null, onTimeChange, countFor = () => 0, sample, style, className = '' }) {
  const [hover, setHover] = useState(undefined);
  const active = hover !== undefined ? hover : maxMinutes;
  const n = countFor(active);
  return (
    <div className={className} style={{ width:'100%', background:'var(--paper-100)', borderTop:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)', padding:'16px 32px', userSelect:'none', boxShadow:'var(--shadow-subtle)', ...style }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, fontSize:11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.14em', color:'var(--ink)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            <span className="hairline-border" style={{ display:'flex', alignItems:'center', gap:6, padding:'2px 8px', background:'var(--paper)', fontWeight:700, color:'var(--accent)' }}><Icon name="clock" size={14} /><span>TIME BUDGET:</span><span>{active ? '≤ ' + active + ' MINS' : 'ALL (SHOW ALL)'}</span></span>
            <span style={{ color:'rgba(17,17,17,.3)' }}>—</span><span style={{ fontWeight:600 }}>{n} {n === 1 ? 'MEAL' : 'MEALS'} READY BEFORE MELTDOWN</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0, fontSize:10, color:'var(--ink-muted)' }}>
            {sample && <span style={{ color:'var(--ink-subtle)', maxWidth:320, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>e.g. {sample}</span>}
            {maxMinutes !== null && <Button variant="outline" size="sm" icon={<Icon name="rotate-ccw" size={12} />} onClick={() => onTimeChange && onTimeChange(null)} style={{ padding:'2px 8px', fontSize:10, letterSpacing:'.14em' }}>SHOW ALL</Button>}
          </div>
        </div>
        <div onMouseLeave={() => setHover(undefined)} className="hairline-border" style={{ position:'relative', width:'100%', height:56, background:'rgba(236,233,225,.8)', borderRadius:4, display:'flex', alignItems:'center', padding:'0 12px', overflow:'hidden', boxSizing:'border-box' }}>
          <div style={{ position:'absolute', inset:0, opacity:.1, backgroundImage:'radial-gradient(#111 1px, transparent 1px)', backgroundSize:'8px 8px' }} />
          <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', textAlign:'center' }}>
            {TIME_STOPS.map((s) => { const c = countFor(s.value); return (
              <button key={String(s.value)} type="button" onMouseEnter={() => setHover(s.value)} onClick={() => onTimeChange && onTimeChange(s.value)} className={'mi-tstop' + (maxMinutes === s.value ? ' is-selected' : '') + (hover === s.value ? ' is-hovered' : '')}>
                <div className="mi-tstop__tick" /><div><span className="mi-tstop__lbl">{s.label}</span><span style={{ display:'block', fontSize:9, color:'var(--ink-subtle)', fontFamily:'var(--font-sans)' }}>{c} {c === 1 ? 'meal' : 'meals'}</span></div><div className="mi-tstop__tick mi-tstop__tick--b" />
              </button>); })}
          </div>
          <div style={{ position:'absolute', top:0, bottom:0, left: POS[active] || '95%', transform:'translateX(-50%)', pointerEvents:'none', transition:'all .15s', display:'flex', flexDirection:'column', alignItems:'center', zIndex:20 }}>
            <div style={{ width:8, height:8, background:'var(--accent)', transform:'rotate(45deg)', marginTop:-4, boxShadow:'var(--shadow-sm)' }} /><div style={{ width:2, flex:1, background:'var(--accent)' }} /><div style={{ width:8, height:8, background:'var(--accent)', transform:'rotate(45deg)', marginBottom:-4, boxShadow:'var(--shadow-sm)' }} />
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:9, fontFamily:'var(--font-mono)', color:'var(--ink-subtle)', textTransform:'uppercase', padding:'0 4px' }}><span>⚡ 5-10 MIN RAPID FLASH</span><span>⏱️ 15 MIN WEEKNIGHT SWEET SPOT</span><span>🔥 25-35 MIN FULL ROASTS</span></div>
      </div>
    </div>);
}
