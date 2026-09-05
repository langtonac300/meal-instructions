import React, { useMemo, useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { LeanIcon } from '../core/LeanIcon.jsx';
import { Button } from '../core/Button.jsx';
import { Pill } from '../core/Pill.jsx';
import { MicroLabel } from '../core/MicroLabel.jsx';
import { Kbd } from '../core/Kbd.jsx';
/** PRECISION KITCHEN HUD / "The 5-Second Cook-Time Terminal": omni-search (2px ink border), TOP QUERIES pills, and the active datasheet read-out with 5 telemetry cells. */
export function KitchenHud({ datasheets = [], recipes = [], presets, activeSlug, onActiveChange, onOpenRecipe, onOpenDatasheet, datasheetCount, recipeCount, style, className = '' }) {
  const [q, setQ] = useState(''); const [focus, setFocus] = useState(false); const [slug, setSlug] = useState(activeSlug || (datasheets[0] && datasheets[0].slug));
  const active = datasheets.find((d) => d.slug === (activeSlug || slug)) || datasheets[0];
  const pick = (s) => { setSlug(s); onActiveChange && onActiveChange(s); setFocus(false); };
  const top = presets || datasheets.slice(0, 8).map((d) => ({ label: d.food, slug: d.slug }));
  const res = useMemo(() => { const s = q.toLowerCase().trim(); if (!s) return { ds: [], rc: [] }; return { ds: datasheets.filter((d) => (d.food + ' ' + d.appliance + ' ' + d.state).toLowerCase().includes(s)).slice(0, 5), rc: recipes.filter((r) => (r.title + ' ' + r.protein + ' ' + r.appliance).toLowerCase().includes(s)).slice(0, 5) }; }, [q, datasheets, recipes]);
  const cell = (label, icon, iconColor, big, sub, bigColor, span) => (
    <div style={{ background:'var(--paper)', padding:12, borderRadius:4, border:'1px solid var(--hairline)', display:'flex', flexDirection:'column', justifyContent:'space-between', gridColumn: span }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', color:'var(--ink-subtle)', fontSize:10, textTransform:'uppercase', fontWeight:700 }}><span>{label}</span><LeanIcon name={icon} size={16} style={{ color:iconColor }} /></div>
      <div style={{ margin:'4px 0', fontSize:20, fontWeight:900, color: bigColor || 'var(--ink)' }}>{big}</div>
      <div style={{ fontSize:9, color:'var(--ink-muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{sub}</div>
    </div>);
  if (!active) return null;
  return (
    <div className={className} style={{ width:'100%', background:'var(--paper)', borderBottom:'1px solid var(--hairline)', padding:'24px 32px', ...style }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexDirection:'column', gap:20 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <div><MicroLabel color="ink" dot style={{ letterSpacing:'.14em' }}>PRECISION KITCHEN HUD <span style={{ color:'rgba(90,88,84,.7)', fontWeight:400, marginLeft:8 }}>— INSTANT TEMPERATURE, TIME &amp; SAFETY LOOKUP</span></MicroLabel><h2 style={{ margin:'2px 0 0', fontFamily:'var(--font-sans)', fontSize:24, fontWeight:900, textTransform:'uppercase', letterSpacing:'-.01em', color:'var(--ink)' }}>The 5-Second Cook-Time Terminal</h2></div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, display:'flex', gap:12 }}><Pill variant="inset" rounded bold style={{ background:'var(--paper-100)', fontSize:11, textTransform:'uppercase' }}>{datasheetCount || datasheets.length} USDA DATASHEETS</Pill><Pill variant="inset" rounded bold style={{ background:'var(--paper-100)', fontSize:11 }}>{recipeCount || recipes.length} MEALS</Pill></div>
        </div>
        <div style={{ position:'relative', width:'100%' }}>
          <div style={{ position:'relative', display:'flex', alignItems:'center', background:'var(--paper-50)', border:'2px solid var(--ink)', borderRadius:4, boxShadow:'var(--shadow-subtle)' }}>
            <div style={{ padding:'0 8px 0 16px', display:'flex' }}><Icon name="search" size={20} style={{ color:'var(--accent)' }} /></div>
            <input type="text" value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)} placeholder="Instant food lookup: type 'chicken breast', 'salmon', 'frozen burger', 'bacon', 'wings'..." className="mi-input mi-input--bare" style={{ padding:'12px 40px 12px 0', fontFamily:'var(--font-mono)', fontSize:14 }} />
            {q && <button type="button" className="mi-icon-btn" onClick={() => setQ('')} style={{ marginRight:8 }}><Icon name="x" size={16} /></button>}
            <div style={{ display:'flex', alignItems:'center', gap:4, paddingRight:12, fontSize:10, fontFamily:'var(--font-mono)', color:'var(--ink-subtle)', textTransform:'uppercase' }}><Kbd>LIVE</Kbd><span>LOOKUP</span></div>
          </div>
          {focus && q.trim().length > 1 && <div style={{ position:'absolute', top:'100%', left:0, right:0, marginTop:4, background:'var(--paper)', border:'2px solid var(--ink)', borderRadius:4, boxShadow:'var(--shadow-float)', zIndex:50, maxHeight:384, overflowY:'auto', fontFamily:'var(--font-mono)', fontSize:12 }}>
            {res.ds.length || res.rc.length ? <>
              {res.ds.length > 0 && <div style={{ padding:8 }}><div style={{ padding:'4px 8px', fontSize:10, fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'.08em', display:'flex', justifyContent:'space-between' }}><span>VERIFIED COOK-TIME DATASHEETS</span><span>{res.ds.length} MATCHES</span></div>
                {res.ds.map((d) => <div key={d.slug} onMouseDown={() => pick(d.slug)} className="mi-hud-result"><div style={{ display:'flex', alignItems:'center', gap:10 }}><Pill variant="ink" size="xs" rounded>{d.appliance}</Pill><span className="mi-row__t" style={{ fontWeight:700, color:'var(--ink)' }}>{d.food}</span><span style={{ fontSize:10, color:'var(--ink-subtle)', textTransform:'uppercase' }}>({d.state})</span></div><div style={{ display:'flex', alignItems:'center', gap:12 }}><span style={{ fontWeight:700 }}>{String(d.tempFormatted).split(' ')[0]}</span><span style={{ color:'var(--ink-muted)' }}>{d.timeFormatted}</span><span style={{ fontSize:10, color:'var(--accent)', fontWeight:700 }}>LOAD →</span></div></div>)}</div>}
              {res.rc.length > 0 && <div style={{ padding:8, background:'var(--paper-50)', borderTop:'1px solid var(--hairline)' }}><div style={{ padding:'4px 8px', fontSize:10, fontWeight:700, color:'var(--ink-subtle)', textTransform:'uppercase', letterSpacing:'.08em', display:'flex', justifyContent:'space-between' }}><span>MATCHING WEEKNIGHT RECIPES</span><span>{res.rc.length} MATCHES</span></div>
                {res.rc.map((r) => <a key={r.slug} href={'#/recipes/' + r.slug} onMouseDown={(e) => { if (onOpenRecipe) { e.preventDefault(); onOpenRecipe(r); } }} className="mi-hud-result"><div style={{ display:'flex', alignItems:'center', gap:8 }}><Pill variant="inset" size="xs" rounded bold style={{ background:'var(--paper-300)', border:0 }}>RECIPE</Pill><span className="mi-row__t" style={{ fontWeight:700, color:'var(--ink)', fontFamily:'var(--font-sans)' }}>{r.title}</span></div><div style={{ display:'flex', alignItems:'center', gap:12, color:'var(--ink-muted)' }}><span>{r.totalMinutes} MIN</span><span style={{ fontSize:10, color:'var(--accent)', fontWeight:700 }}>VIEW →</span></div></a>)}</div>}
            </> : <div style={{ padding:24, textAlign:'center', color:'var(--ink-muted)' }}><p style={{ margin:0, fontWeight:700 }}>No exact match for "{q}"</p><p style={{ margin:'4px 0 0', fontSize:11, color:'var(--ink-subtle)' }}>Try searching by ingredient (e.g. 'chicken', 'beef', 'salmon') or appliance.</p></div>}
          </div>}
        </div>
        <div className="scrollbar-none" style={{ display:'flex', alignItems:'center', gap:6, overflowX:'auto', paddingBottom:4, fontSize:11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.08em' }}>
          <span style={{ flexShrink:0, color:'var(--ink-subtle)', fontWeight:700, marginRight:4 }}>TOP QUERIES:</span>
          {top.map((p) => <button key={p.slug} type="button" onClick={() => pick(p.slug)} className={'mi-chip mi-chip--accent' + (active.slug === p.slug ? ' is-active' : '')} style={{ padding:'4px 10px', flexShrink:0 }}>{p.label}</button>)}
        </div>
        <div className="mi-panel--hover" style={{ background:'var(--paper-100)', border:'2px solid var(--hairline)', borderRadius:8, padding:24, boxShadow:'var(--shadow-subtle)', transition:'border-color .2s' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, borderBottom:'1px solid var(--hairline)', paddingBottom:16, marginBottom:16 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}><Pill variant="ink" size="xs" rounded style={{ letterSpacing:'.08em' }}>{active.appliance.replace('-', ' ')}</Pill><Pill variant="inset" size="xs" rounded bold>STATE: {String(active.state).toUpperCase()}</Pill><span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--ink-subtle)' }}>REF ID: {active.id}</span></div>
              <h3 style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:24, fontWeight:900, textTransform:'uppercase', letterSpacing:'-.01em', color:'var(--ink)' }}>{active.food}</h3>
              <p style={{ margin:'2px 0 0', fontSize:12, color:'var(--ink-muted)' }}>{active.cutOrPrep}</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
              {active.relatedRecipeSlug && <Button variant="ink" rounded iconRight="arrow-right" onClick={() => onOpenRecipe && onOpenRecipe(recipes.find((r) => r.slug === active.relatedRecipeSlug) || { slug: active.relatedRecipeSlug })} style={{ padding:'6px 14px' }}>Cook Recipe</Button>}
              <Button variant="card" rounded iconRight={<Icon name="external-link" size={12} style={{ color:'var(--ink-muted)' }} />} onClick={() => onOpenDatasheet && onOpenDatasheet(active)}>Full Datasheet</Button>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5, minmax(0,1fr))', gap:12, fontFamily:'var(--font-mono)' }}>
            {cell('COOK TEMP', 'heat-waves', 'var(--accent)', String(active.tempFormatted).split(' ')[0], (active.tempC || '') + '°C CONVECTION')}
            {cell('TOTAL TIME', 'clock', 'var(--ink-muted)', active.timeFormatted, (active.timeMinMinutes || '') + '–' + (active.timeMaxMinutes || '') + ' MIN RANGE')}
            {cell('MIDPOINT FLIP', 'flip-action', 'var(--accent)', active.flipAtMinutes > 0 ? '@ ' + active.flipAtMinutes + 'm' : 'No Flip', active.flipAtMinutes > 0 ? 'SHAKE / TURN OVER' : 'SINGLE SIDE COOK')}
            {cell('INTERNAL TARGET', 'thermometer-probe', 'var(--accent)', active.internalTempTargetF > 0 ? active.internalTempTargetF + '°F' : 'Visual Cue', active.internalTempTargetFormatted || 'Check doneness cue', 'var(--accent)')}
            {cell('REST & SPRAY', 'timer-stopwatch', 'var(--ink-muted)', (active.restMinutes || 0) + 'm REST', 'OIL SPRAY: ' + (active.oilSprayRequired ? 'REQUIRED' : 'NONE'))}
          </div>
          <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid rgba(223,220,206,.7)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, fontSize:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}><Pill variant="inset" size="xs" rounded bold style={{ border:0, letterSpacing:0 }}>DONENESS CUE</Pill><span style={{ color:'var(--ink-muted)', fontWeight:500 }}>{active.donenessCue}</span></div>
            <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--ink-subtle)', flexShrink:0, maxWidth:360, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>BASIS: {active.verificationBasis}</div>
          </div>
        </div>
      </div>
    </div>);
}
