import React, { useEffect, useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';
import { StatusDot } from '../core/StatusDot.jsx';
const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
/** Floating 288px kitchen timer (components/KitchenTimer.tsx): label + status dot, 48px countdown, accent progress bar, +1/+2/+5 MIN, START/PAUSE/RESUME + reset. fixed=false renders inline. */
export function KitchenTimer({ initialMinutes = 10, label = 'Air Fryer Timer', autoStart = false, onClose, fixed = true, className = '', style }) {
  const [total, setTotal] = useState(initialMinutes * 60); const [left, setLeft] = useState(initialMinutes * 60); const [run, setRun] = useState(autoStart); const [done, setDone] = useState(false);
  useEffect(() => { setTotal(initialMinutes * 60); setLeft(initialMinutes * 60); setDone(false); }, [initialMinutes]);
  useEffect(() => { if (!run || left <= 0) return; const t = setInterval(() => setLeft((p) => { if (p <= 1) { setRun(false); setDone(true); chime(); return 0; } return p - 1; }), 1000); return () => clearInterval(t); }, [run, left]);
  const chime = () => { try { const C = window.AudioContext || window.webkitAudioContext; if (!C) return; const ctx = new C(); const now = ctx.currentTime; [[880, 0, 1.2, .4], [1320, .15, 1.5, .3]].forEach(([f, st, en, g]) => { const o = ctx.createOscillator(); const ga = ctx.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f, now + st); ga.gain.setValueAtTime(g, now + st); ga.gain.exponentialRampToValueAtTime(0.001, now + en); o.connect(ga); ga.connect(ctx.destination); o.start(now + st); o.stop(now + en); }); } catch (e) {} };
  const add = (m) => { setTotal((t) => t + m * 60); setLeft((l) => l + m * 60); setDone(false); };
  const progress = total > 0 ? ((total - left) / total) * 100 : 0;
  return (
    <div className={(done ? 'animate-bounce ' : '') + className} style={{ position: fixed ? 'fixed' : 'relative', bottom: fixed ? 16 : undefined, right: fixed ? 16 : undefined, zIndex: fixed ? 50 : undefined, background:'var(--paper-50)', border:'1px solid var(--hairline)', borderRadius:8, boxShadow:'var(--shadow-float)', padding:16, width:288, boxSizing:'border-box', fontFamily:'var(--font-mono)', userSelect:'none', outline: done ? '2px solid var(--accent)' : 'none', ...style }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--hairline)', paddingBottom:8, marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}><StatusDot size="lg" color={run || done ? 'accent' : 'muted'} ping={run} /><span style={{ fontSize:10, textTransform:'uppercase', fontWeight:700, letterSpacing:'.08em', color:'var(--ink)', maxWidth:170, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</span></div>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}><button className="mi-icon-btn" onClick={chime} title="Test Sound"><Icon name="volume-2" size={14} /></button>{onClose && <button className="mi-icon-btn" onClick={onClose}><Icon name="x" size={14} /></button>}</div>
      </div>
      <div style={{ textAlign:'center', margin:'8px 0' }}><div className={done ? 'animate-pulse' : ''} style={{ fontSize:48, fontWeight:900, letterSpacing:'-.01em', lineHeight:1, color: done ? 'var(--accent)' : 'var(--ink)' }}>{fmt(left)}</div>{done && <div style={{ fontSize:12, fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'.14em', marginTop:4 }}>⚡ TIME’S UP! CHECK FOOD!</div>}</div>
      <div style={{ width:'100%', background:'var(--paper-200)', height:6, borderRadius:9999, overflow:'hidden', margin:'12px 0' }}><div style={{ height:'100%', background:'var(--accent)', transition:'width .3s', width: progress + '%' }} /></div>
      <div style={{ display:'flex', gap:4, marginBottom:12 }}>{[1, 2, 5].map((m) => <Button key={m} variant="inset" size="sm" rounded onClick={() => add(m)} style={{ flex:1, letterSpacing:0, fontSize:10, background:'rgba(236,233,225,.8)' }}>+{m} MIN</Button>)}</div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <Button variant={run ? 'caution' : 'ink'} rounded icon={run ? 'pause' : 'play'} onClick={() => setRun(!run)} style={{ flex:1, padding:'8px 12px', background: run ? 'var(--caution)' : undefined, color: run ? '#fff' : undefined, borderColor: run ? 'var(--caution)' : undefined }}>{run ? 'PAUSE' : left === total ? 'START TIMER' : 'RESUME'}</Button>
        <Button variant="inset" rounded iconOnly icon="rotate-ccw" title="Reset" onClick={() => { setRun(false); setLeft(total); setDone(false); }} />
      </div>
    </div>);
}
