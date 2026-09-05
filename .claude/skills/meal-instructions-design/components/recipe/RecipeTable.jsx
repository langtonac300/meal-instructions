import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { LeanIcon } from '../core/LeanIcon.jsx';
/** Index-table view of the directory: sortable INDEX # / TITLE / PROTEIN / APPLIANCE / TEMP / TIME / PROTEIN (G) / ACTION. */
export function RecipeTable({ recipes, onOpen, href = (r) => '#/recipes/' + r.slug, style, className = '' }) {
  const [field, setField] = useState('id'); const [asc, setAsc] = useState(true);
  const sort = (f) => { if (field === f) setAsc(!asc); else { setField(f); setAsc(true); } };
  const rows = [...recipes].sort((a, b) => { let c = 0; if (field === 'id') c = a.id.localeCompare(b.id); if (field === 'title') c = a.title.localeCompare(b.title); if (field === 'time') c = a.totalMinutes - b.totalMinutes; if (field === 'protein') c = ((a.nutrition && a.nutrition.proteinGrams) || 0) - ((b.nutrition && b.nutrition.proteinGrams) || 0); if (field === 'temp') c = (a.cookTempF || 0) - (b.cookTempF || 0); return asc ? c : -c; });
  const th = { padding:'12px 16px' };
  const Th = ({ f, children, right }) => <th className={f ? 'mi-th' : ''} onClick={f ? () => sort(f) : undefined} style={{ ...th, textAlign: right ? 'right' : 'left', fontWeight:400 }}><div style={{ display:'flex', alignItems:'center', gap: right ? 6 : 4, justifyContent: right ? 'flex-end' : 'flex-start' }}>{children}{f && <Icon name="arrow-up-down" size={12} style={{ color:'var(--ink-subtle)' }} />}</div></th>;
  const chip = (icon, iconColor, text) => <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'2px 8px', borderRadius:4, fontSize:9, textTransform:'uppercase', background:'var(--paper)', border:'1px solid var(--hairline)', color:'var(--ink)' }}><LeanIcon name={icon} size={14} style={{ color:iconColor }} />{text}</span>;
  return (
    <div className={className} style={{ width:'100%', overflowX:'auto', background:'var(--paper-50)', border:'1px solid var(--hairline)', borderRadius:4, boxShadow:'var(--shadow-subtle)', ...style }}>
      <table style={{ width:'100%', textAlign:'left', borderCollapse:'collapse' }}>
        <thead><tr style={{ borderBottom:'1px solid var(--hairline)', background:'rgba(236,233,225,.7)', fontSize:10, textTransform:'uppercase', fontFamily:'var(--font-mono)', letterSpacing:'.14em', color:'var(--ink)' }}>
          <Th f="id">INDEX #</Th><Th f="title">RECIPE TITLE</Th><Th>PROTEIN</Th><Th>APPLIANCE</Th>
          <Th f="temp" right><LeanIcon name="heat-waves" size={14} style={{ color:'var(--accent)' }} />TEMP</Th>
          <Th f="time" right><LeanIcon name="clock" size={14} style={{ color:'var(--ink-subtle)' }} />TIME</Th>
          <Th f="protein" right><LeanIcon name="fork" size={14} style={{ color:'var(--accent)' }} />PROTEIN (G)</Th>
          <th style={{ ...th, textAlign:'center', fontWeight:400 }}>ACTION</th></tr></thead>
        <tbody style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>
          {rows.map((r) => { const go = (e) => { if (onOpen) { e.preventDefault(); onOpen(r); } }; return (
            <tr key={r.id} className="mi-row" style={{ borderTop:'1px solid rgba(223,220,206,.6)' }} onClick={() => onOpen && onOpen(r)}>
              <td className="mi-row__t" style={{ ...th, fontWeight:700, color:'var(--ink)' }}>{r.id}</td>
              <td style={th}><a href={href(r)} onClick={go} className="mi-row__t" style={{ display:'block', fontFamily:'var(--font-sans)', fontWeight:600, fontSize:14, color:'var(--ink)', textDecoration:'none' }}>{r.title}</a><span style={{ fontSize:11, fontFamily:'var(--font-sans)', color:'var(--ink-muted)', display:'block', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:360 }}>{r.tagline}</span></td>
              <td style={th}>{chip(r.protein, 'var(--accent)', r.protein.replace('-', ' '))}</td>
              <td style={th}>{chip(r.appliance, 'var(--ink-muted)', r.appliance.replace('-', ' '))}</td>
              <td style={{ ...th, textAlign:'right', fontWeight:600, color:'var(--ink)' }}>{String(r.cookTemp).split(' ')[0]}</td>
              <td style={{ ...th, textAlign:'right', color:'var(--ink)' }}>{r.totalMinutes}m</td>
              <td style={{ ...th, textAlign:'right', fontWeight:700, color:'var(--accent)' }}>{(r.nutrition && r.nutrition.proteinGrams) || 30}g</td>
              <td style={{ ...th, textAlign:'center' }}><a href={href(r)} onClick={go} className="mi-row__t mi-hover-underline" style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:600, color:'var(--ink)', textTransform:'uppercase', textDecoration:'none' }}><span>GO</span><Icon name="arrow-right" size={12} /></a></td>
            </tr>); })}
        </tbody>
      </table>
    </div>);
}
