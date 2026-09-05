import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../core/Icon.jsx';
const QUICK = ['air fryer','maillard','chicken','dry brine','steak','salmon','storage','reverse sear'];
/** ⌘K global search dialog (components/SearchModal.tsx): ink/60 blurred scrim, 672px paper-card panel, quick tags, result rows (#ID / GUIDE / STORAGE badge, title, tagline, appliance chip, time), key-hint footer. */
export function SearchModal({ isOpen, onClose, items = [], onSelect, placeholder = 'Search recipes, cook times, and 50 science field guides (e.g. maillard, wings, salt, steak)...', inline = false }) {
  const [q, setQ] = useState(''); const [sel, setSel] = useState(0); const ref = useRef(null);
  useEffect(() => { if (isOpen) { setQ(''); setSel(0); setTimeout(() => ref.current && ref.current.focus(), 50); } }, [isOpen]);
  const results = useMemo(() => { const s = q.toLowerCase().trim(); if (!s) return items.slice(0, 8); return items.filter((i) => (i.title + ' ' + (i.subtitle || '') + ' ' + (i.badge || '') + ' ' + (i.keywords || []).join(' ')).toLowerCase().includes(s)).slice(0, 12); }, [q, items]);
  if (!isOpen) return null;
  const key = (e) => { if (e.key === 'Escape') onClose && onClose(); else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((p) => (p + 1) % Math.max(results.length, 1)); } else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((p) => (p - 1 + results.length) % Math.max(results.length, 1)); } else if (e.key === 'Enter' && results[sel]) { onSelect && onSelect(results[sel]); onClose && onClose(); } };
  const badgeStyle = (t) => t === 'guide' ? { background:'var(--paper-200)', color:'var(--accent)', borderColor:'var(--accent-40)' } : t === 'storage' ? { background:'var(--info-soft)', color:'var(--info)', borderColor:'var(--info-border)' } : { background:'var(--paper)', color:'var(--ink-subtle)', borderColor:'var(--hairline)' };
  const panel = (
    <div onClick={(e) => e.stopPropagation()} className="hairline-border" style={{ width:'100%', maxWidth:672, background:'var(--paper-50)', boxShadow:'var(--shadow-float)', overflow:'hidden', display:'flex', flexDirection:'column', maxHeight: inline ? 'none' : '80vh', borderRadius:8 }}>
      <div className="hairline-b" style={{ display:'flex', alignItems:'center', padding:'14px 16px', background:'var(--paper)' }}>
        <Icon name="search" size={16} style={{ color:'var(--ink-muted)', marginRight:12 }} />
        <input ref={ref} type="text" placeholder={placeholder} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={key} className="mi-input mi-input--bare" style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--ink)' }} />
        {q && <button type="button" className="mi-icon-btn" onClick={() => setQ('')}><Icon name="x" size={16} /></button>}
      </div>
      {!q && <div className="hairline-b" style={{ padding:'10px 16px', background:'rgba(236,233,225,.5)', display:'flex', alignItems:'center', gap:8, overflowX:'auto', fontSize:11, fontFamily:'var(--font-mono)' }}><span style={{ color:'var(--ink-subtle)', textTransform:'uppercase' }}>Quick:</span>{QUICK.map((t) => <button key={t} type="button" onClick={() => setQ(t)} className="mi-chip mi-chip--square" style={{ padding:'2px 8px', fontSize:11, borderRadius:4 }}>{t}</button>)}</div>}
      <div style={{ overflowY:'auto' }}>
        {results.length ? results.map((it, i) => (
          <a key={it.type + '-' + it.id} href={it.href || '#'} onClick={(e) => { if (onSelect) { e.preventDefault(); onSelect(it); } onClose && onClose(); }} onMouseEnter={() => setSel(i)} className={'mi-result' + (sel === i ? ' is-selected' : '')} style={{ borderTop: i ? '1px solid var(--hairline)' : 0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:10, fontWeight:700, padding:'2px 6px', borderRadius:4, border:'1px solid', textTransform:'uppercase', ...badgeStyle(it.type) }}>{it.type === 'guide' ? 'GUIDE' : it.type === 'storage' ? 'STORAGE' : '#' + it.id}</span>
              <div><h4 style={{ margin:0, fontWeight:700, fontSize:14, color:'var(--ink)', fontFamily:'var(--font-sans)' }}>{it.title}</h4><p style={{ margin:0, fontSize:12, color:'var(--ink-muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:380 }}>{it.subtitle}</p></div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0, fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-muted)' }}>
              {it.badge && <span className="hairline-border" style={{ padding:'2px 8px', background:'var(--paper)', textTransform:'uppercase', borderRadius:4 }}>{it.badge}</span>}
              <span style={{ display:'flex', alignItems:'center', gap:4 }}><Icon name="clock" size={12} style={{ color:'var(--ink-subtle)' }} />{it.time}</span>
              <Icon name="arrow-right" size={14} style={{ color:'var(--ink-subtle)' }} />
            </div>
          </a>)) : <div style={{ padding:32, textAlign:'center', fontFamily:'var(--font-mono)', fontSize:14, color:'var(--ink-muted)' }}>No results found matching “{q}”.</div>}
      </div>
      <div className="hairline-t" style={{ padding:'8px 16px', background:'var(--paper-200)', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10, fontFamily:'var(--font-mono)', color:'var(--ink-subtle)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}><span>↑↓ to navigate</span><span>•</span><span>↵ to select</span><span>•</span><span>ESC to close</span></div><div>{results.length} RESULTS</div>
      </div>
    </div>);
  if (inline) return panel;
  return <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(17,17,17,.6)', backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:96, paddingLeft:16, paddingRight:16 }}>{panel}</div>;
}
