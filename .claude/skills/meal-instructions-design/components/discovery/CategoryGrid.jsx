import React from 'react';
/** BROWSE BY INTENT & HARDWARE: 6-col grid of image tiles (96–112px photo, ink bottom gradient, "n Meals" pill, uppercase name, mono heroTag). */
export function CategoryGrid({ categories = [], selected, onSelect, counts = {}, imageBase = '', style, className = '' }) {
  return (
    <div className={className} style={{ display:'grid', gridTemplateColumns:'repeat(6, minmax(0,1fr))', gap:12, ...style }}>
      {categories.map((c) => { const n = counts[c.slug] != null ? counts[c.slug] : c.count || 0; const on = selected === c.slug; const img = c.image ? (/^https?:/.test(c.image) ? c.image : imageBase + c.image) : null; return (
        <div key={c.slug} onClick={() => onSelect && onSelect(on ? 'all' : c.slug)} className={'mi-tile mi-tile--ring' + (on ? ' is-active' : '')} style={{ padding:0, overflow:'hidden', cursor:'pointer' }}>
          {img ? <div style={{ position:'relative', width:'100%', height:112, overflow:'hidden', background:'var(--paper-200)' }}><img src={img} alt={c.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .3s' }} className="mi-cat-img" /><div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(17,17,17,.7), rgba(17,17,17,.2), transparent)' }} /><span style={{ position:'absolute', bottom:8, left:8, fontSize:9, fontFamily:'var(--font-mono)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--paper)', background:'rgba(17,17,17,.8)', padding:'2px 6px', borderRadius:4 }}>{n} {n === 1 ? 'Meal' : 'Meals'}</span></div>
            : <div style={{ width:'100%', height:96, background:'var(--paper-200)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:10, color:'var(--ink-muted)', textTransform:'uppercase' }}>{n} Meals</div>}
          <div style={{ padding:10, display:'flex', flexDirection:'column', gap:4 }}>
            <h4 className="mi-tile__title" style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:14, fontWeight:700, textTransform:'uppercase', color:'var(--ink)', lineHeight:1.25, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name.replace(' Staples', '').replace(' Meals', '')}</h4>
            <p style={{ margin:0, fontSize:10, color:'var(--ink-muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.08em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.heroTag}</p>
          </div>
        </div>); })}
    </div>);
}
