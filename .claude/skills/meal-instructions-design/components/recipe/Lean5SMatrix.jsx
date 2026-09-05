import React from 'react';
import { LeanSpecBadge } from './LeanSpecBadge.jsx';
import { MicroLabel } from '../core/MicroLabel.jsx';
/** 4-cell "LEAN 5S SPECIFICATION MATRIX" under a recipe header: temp (accent), time, protein, then probe | flip | rest | verified. */
export function Lean5SMatrix({ cookTemp, totalMinutes, proteinGrams, internalTemp, flipMinutes, restMinutes, servings, className = '', style }) {
  const fourth = internalTemp ? <LeanSpecBadge type="probe" label="Target Probe" value={internalTemp} sub="USDA Safe Pull" />
    : flipMinutes > 0 ? <LeanSpecBadge type="flip" label="Flip / Shake" value={flipMinutes + ' MIN'} sub="Turnover Mark" />
    : restMinutes > 0 ? <LeanSpecBadge type="rest" label="Rest Duration" value={restMinutes + ' MIN'} sub="Juice Retention" />
    : <LeanSpecBadge type="safety" label="Standard" value="VERIFIED" sub="Zero Fluff" />;
  return (
    <div className={className} style={{ display:'flex', flexDirection:'column', gap:8, ...style }}>
      <MicroLabel color="subtle" note="AT-A-GLANCE PROCESS METRICS" style={{ letterSpacing:'.08em', fontWeight:400 }}>LEAN 5S SPECIFICATION MATRIX</MicroLabel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:10 }}>
        <LeanSpecBadge type="temp" label="Cook Temp" value={cookTemp} sub="Preheat Required" accent />
        <LeanSpecBadge type="time" label="Total Time" value={totalMinutes + ' MIN'} sub="Floor-to-Plate" />
        {proteinGrams !== undefined && <LeanSpecBadge type="protein" label="Protein / Serv" value={proteinGrams + 'G'} sub={servings ? 'Yield: ' + servings + ' Servings' : 'Macro-Dense'} />}
        {fourth}
      </div>
    </div>);
}
