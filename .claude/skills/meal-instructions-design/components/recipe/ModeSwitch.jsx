import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Segmented } from '../core/Segmented.jsx';
/** HR-7 sticky inline segmented mode selector: "Execution Mode / Applied via CSS Visibility" caption + 2-col ink toggle. sticky=true pins at top-16 with paper-card/95 blur. */
export function ModeSwitch({ mode = 'fast', onChange, sticky = true, top = 64, className = '', style }) {
  return (
    <div className={'hairline-b ' + className} style={{ display:'flex', flexDirection:'column', gap:8, padding:'12px 0', background:'rgba(250,249,246,.95)', backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)', position: sticky ? 'sticky' : 'relative', top: sticky ? top : undefined, zIndex: sticky ? 30 : undefined, ...style }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10, fontFamily:'var(--font-mono)', color:'var(--ink-subtle)', textTransform:'uppercase' }}><span>Execution Mode</span><span>Applied via CSS Visibility</span></div>
      <div className="hairline-border" style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>
        <Segmented variant="square" value={mode} onChange={onChange} style={{ border:0 }} options={[
          { value:'fast', icon:<Icon name="zap" size={14} style={{ color:'var(--accent)' }} />, label:'⚡ GET TO THE POINT', note:'(20 Words)' },
          { value:'detailed', icon:<Icon name="book-open" size={14} style={{ color:'var(--ink-subtle)' }} />, label:'📖 STEP-BY-STEP', note:'(Guided Steps)' }]} />
      </div>
    </div>);
}
/** Card-style picker used above content ("CHOOSE YOUR COOKING MODE") — components/RecipeModeSwitch.tsx. */
export function ModeSwitchCards({ mode = 'quick', onChange, className = '', style }) {
  const opt = (v, icon, activeBg, title, desc) => { const on = mode === v; return (
    <button type="button" onClick={() => onChange && onChange(v)} style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', padding:12, borderRadius:6, cursor:'pointer', textAlign:'left', transition:'all .2s', background: on ? 'var(--paper-50)' : 'transparent', border: on ? '1px solid rgba(17,17,17,.2)' : '1px solid transparent', boxShadow: on ? 'var(--shadow-subtle), 0 0 0 1px var(--accent-30)' : 'none', color: on ? 'var(--ink)' : 'var(--ink-muted)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ padding:4, borderRadius:4, background: on ? activeBg : 'var(--paper-300)', color: on ? (v === 'quick' ? '#fff' : 'var(--paper)') : 'var(--ink-muted)', display:'flex' }}><Icon name={icon} size={16} /></div><span style={{ fontFamily:'var(--font-mono)', fontWeight:700, fontSize:14, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ink)' }}>{title}</span></div>
      <span style={{ fontSize:11, color:'var(--ink-muted)', marginTop:4 }}>{desc}</span>
    </button>); };
  return (
    <div className={className} style={{ width:'100%', padding:6, background:'var(--paper-200)', borderRadius:8, border:'1px solid var(--hairline)', userSelect:'none', boxSizing:'border-box', ...style }}>
      <div style={{ fontSize:10, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.14em', color:'var(--ink-muted)', padding:'4px 8px', display:'flex', justifyContent:'space-between' }}><span>CHOOSE YOUR COOKING MODE:</span><span style={{ fontSize:9, color:'var(--ink-subtle)' }}>PREFERENCE SAVED AUTOMATICALLY</span></div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginTop:4 }}>
        {opt('quick', 'zap', 'var(--accent)', 'GET TO THE POINT', 'Ultra-concise telegram format. Temp, time, flip marker, zero fluff.')}
        {opt('detailed', 'book-open', 'var(--ink)', 'STEP-BY-STEP', 'Fluff-free guided instructions with doneness cues and pro tips.')}
      </div>
    </div>);
}
