// Cook-time datasheet — recreation of app/how-long/[appliance]/[food]/page.tsx
(() => {
const { LeanSpecBadge, StartCookButton, Button, Pill, Icon, Panel, MicroLabel } = window.MealInstructionsDesignSystem_767cb5;
const dmono = { fontFamily:'var(--font-mono)' };
const HEAT = { 'air-fryer':'Convection Heat', oven:'Radiant Heat', 'instant-pot':'Pressure Level', skillet:'Stovetop Heat', 'sheet-pan':'Radiant Heat', 'cast-iron':'Stovetop Sear', grill:'Direct Flame', 'dutch-oven':'Stovetop / Oven', 'slow-cooker':'Low & Slow', smoker:'Indirect Smoke', boiling:'Stovetop Boil' };
function DatasheetScreen({ D, slug, go }) {
  const s = D.datasheets.find((d) => d.slug === slug) || D.datasheets[0];
  const a = s.appliance.replace('-', ' '); const food = s.food.toLowerCase(); const oil = s.oilSprayRequired ? ' Spray lightly with high-smoke-point oil.' : '';
  const prep = 'Preheat ' + s.appliance + ' to ' + s.tempFormatted + '. Place ' + food + ' (' + s.cutOrPrep + ') in a single layer with space between items for convection airflow.' + oil;
  const cook = s.flipAtMinutes > 0 ? 'Cook for ' + s.timeFormatted + '. Flip or shake basket at the ' + s.flipAtMinutes + '-minute mark for even browning.' : 'Cook for ' + s.timeFormatted + '. Do not flip; allow surface to develop undisturbed.';
  const rest = s.donenessCue + (s.internalTempTargetFormatted ? ' Confirm internal temperature reaches ' + s.internalTempTargetFormatted + '.' : '') + ' Rest for ' + s.restMinutes + ' minutes before serving.';
  const Step = ({ n, title, text }) => <div className="hairline-border" style={{ display:'flex', alignItems:'flex-start', gap:12, padding:16, background:'var(--paper)' }}><span style={{ width:20, height:20, borderRadius:'50%', background:'var(--ink)', color:'var(--paper)', display:'flex', alignItems:'center', justifyContent:'center', ...dmono, fontSize:12, fontWeight:700, flexShrink:0, marginTop:2 }}>{n}</span><div><strong style={{ display:'block', color:'var(--ink)', fontSize:14 }}>{title}</strong><p style={{ margin:'2px 0 0', fontSize:12, color:'var(--ink-muted)', lineHeight:1.625 }}>{text}</p></div></div>;
  const others = D.datasheets.filter((d) => d.appliance === s.appliance && d.slug !== s.slug).slice(0, 6);
  const rel = D.recipes.find((r) => r.slug === s.relatedRecipeSlug);
  return (
    <div style={{ maxWidth:896, margin:'0 auto', padding:'48px 32px', display:'flex', flexDirection:'column', gap:40 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12, ...dmono, color:'var(--ink-subtle)' }}><a href="#" onClick={(e) => { e.preventDefault(); go('home'); }} className="mi-hover-ink" style={{ display:'inline-flex', alignItems:'center', gap:4, textTransform:'uppercase', color:'inherit' }}><Icon name="arrow-left" size={14} /><span>{s.appliance} Charts</span></a><span style={{ textTransform:'uppercase', color:'var(--ink-muted)' }}>DATASHEET // {s.id}</span></div>
      <Panel as="section" padding="xl" style={{ padding:40, display:'flex', flexDirection:'column', gap:24 }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, ...dmono, fontSize:12, textTransform:'uppercase' }}><Pill bold style={{ fontSize:12, padding:'4px 10px' }}>{s.appliance}</Pill><Pill variant="muted" style={{ fontSize:12, padding:'4px 10px' }}>STATE: {s.state.toUpperCase()}</Pill><Pill variant="verified-soft" style={{ fontSize:12, padding:'4px 10px' }}>VERIFIED DATASHEET</Pill></div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}><h1 style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:36, fontWeight:700, letterSpacing:'-.01em', textTransform:'uppercase', color:'var(--ink)', lineHeight:1.25 }}>How Long to Cook {s.food} in the {a}</h1><p style={{ margin:0, fontSize:16, color:'var(--ink-muted)', lineHeight:1.625 }}>Specification: {s.cutOrPrep}</p></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:12 }}>
          <LeanSpecBadge type="temp" label="Target Temp" value={s.tempFormatted} sub={HEAT[s.appliance] || 'Heat'} accent />
          <LeanSpecBadge type="time" label="Total Time" value={s.timeFormatted} sub="Total Cook Window" />
          <LeanSpecBadge type="flip" label="Flip Mark" value={s.flipAtMinutes > 0 ? s.flipAtMinutes + 'm' : 'No Flip'} sub={s.flipAtMinutes > 0 ? 'Turnover Point' : 'Continuous Cook'} />
          <LeanSpecBadge type="probe" label="Internal Safe Temp" value={s.internalTempTargetFormatted || '—'} sub="USDA Safe Pull" />
        </div>
        <div className="hairline-border" style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, background:'var(--paper)', padding:16 }}><div style={{ display:'flex', flexDirection:'column', gap:2 }}><MicroLabel color="accent">COOK MODE</MicroLabel><div style={{ fontSize:12, ...dmono, color:'var(--ink-muted)', textTransform:'uppercase' }}>Live timer · flip prompt · target temp · rest stage</div></div><StartCookButton appliance={s.appliance} foodSlug={s.foodSlug} onClick={(e) => e.preventDefault()} /></div>
        <div style={{ display:'flex', flexDirection:'column', gap:16, fontSize:14 }}><h2 style={{ margin:0, fontSize:16, fontWeight:700, textTransform:'uppercase', letterSpacing:'-.01em', color:'var(--ink)', ...dmono, borderBottom:'1px solid var(--hairline)', paddingBottom:8 }}>3-Step Execution Protocol</h2><div style={{ display:'flex', flexDirection:'column', gap:12 }}><Step n={1} title="Preheat & Prep" text={prep} /><Step n={2} title={s.flipAtMinutes > 0 ? 'Cook & Flip' : 'Cook'} text={cook} /><Step n={3} title="Check & Rest" text={rest} /></div></div>
        <div className="hairline-border" style={{ background:'var(--paper)', padding:16, ...dmono, fontSize:12, display:'flex', flexDirection:'column', gap:8 }}><div style={{ display:'flex', alignItems:'center', gap:6, fontWeight:700, textTransform:'uppercase', color:'var(--ink)' }}><Icon name="shield-check" size={16} style={{ color:'var(--verified)' }} /><span>Verification Basis &amp; Testing Rig</span></div><p style={{ margin:0, fontSize:12, color:'var(--ink-muted)', fontFamily:'var(--font-sans)' }}>{s.verificationBasis}</p><div style={{ paddingTop:8, borderTop:'1px solid var(--hairline)', fontSize:11, color:'var(--ink-subtle)' }}><strong>Pro Tip:</strong> {s.proTip || '—'}</div></div>
        {rel && <div style={{ borderTop:'1px solid var(--hairline)', paddingTop:16, display:'flex', alignItems:'center', justifyContent:'space-between', ...dmono, fontSize:12 }}><span style={{ color:'var(--ink-muted)' }}>Want the complete meal with seasoning &amp; sides?</span><Button iconRight="arrow-up-right" onClick={() => go('recipe', rel.slug)}>View Full Recipe</Button></div>}
      </Panel>
      <section style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <h3 style={{ margin:0, fontSize:14, fontWeight:700, textTransform:'uppercase', letterSpacing:'-.01em', color:'var(--ink)', ...dmono }}>Related {a} Cook Times</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:12, ...dmono, fontSize:12 }}>{others.map((o) => <a key={o.slug} href="#" onClick={(e) => { e.preventDefault(); go('datasheet', o.slug); }} className="mi-tile" style={{ padding:12 }}><div style={{ fontWeight:700, color:'var(--ink)', fontSize:12, fontFamily:'var(--font-sans)', marginBottom:4 }}>{o.food}</div><div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--ink-muted)', borderTop:'1px solid var(--hairline)', paddingTop:8, marginTop:8 }}><span>{o.tempFormatted}</span><span>{o.timeFormatted}</span></div></a>)}</div>
      </section>
    </div>);
}
window.DatasheetScreen = DatasheetScreen;
})();
