// Tools & Calcs directory — recreation of components/tools/ToolsDirectory.tsx
(() => {
const { LeanIcon, Icon, Panel, MicroLabel } = window.MealInstructionsDesignSystem_767cb5;
const tmono = { fontFamily:'var(--font-mono)' };
const CATS = [['all', 'All 30 Engines'], ['temperature', 'Temperature & Searing'], ['ratios', 'Ratios & Math'], ['bbq', 'BBQ & Meat Science'], ['planning', 'Planning & Timelines'], ['emergency', 'Emergency & Rescue']];
function ToolsScreen({ D, go }) {
  const [cat, setCat] = React.useState('all'); const [q, setQ] = React.useState('');
  const tools = D.tools.filter((t) => (cat === 'all' || t.category === cat) && (t.title + t.description + t.badge).toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 32px', display:'flex', flexDirection:'column', gap:32 }}>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}><MicroLabel color="accent">PARAMETRIC UTILITIES</MicroLabel><h1 style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:36, fontWeight:700, letterSpacing:'-.01em', textTransform:'uppercase', color:'var(--ink)' }}>Kitchen Tools &amp; Calculators</h1><p style={{ margin:0, fontSize:16, color:'var(--ink-muted)', lineHeight:1.625, maxWidth:768 }}>30 tactile kitchen engines. Enter your numbers, get the exact temperature, time or weight. No accounts, no ads between you and the answer.</p></div>
      <Panel padding="lg" style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>{CATS.map(([id, label]) => <button key={id} type="button" onClick={() => setCat(id)} className={'mi-chip mi-chip--square' + (cat === id ? ' is-active' : '')} style={{ padding:'6px 12px', fontSize:12 }}>{label}</button>)}</div>
        <div style={{ position:'relative' }}><Icon name="search" size={16} style={{ color:'var(--ink-subtle)', position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }} /><input className="mi-input mi-input--square" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all 30 kitchen engines (e.g. Smoke Points, Brisket, Baker's %, Sous Vide, Egg, Reheat)..." style={{ padding:'10px 12px 10px 36px' }} /></div>
      </Panel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:16 }}>
        {tools.map((t) => <a key={t.href} href="#" onClick={(e) => e.preventDefault()} className="mi-tile" style={{ padding:24, gap:12 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}><div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}><MicroLabel color="accent">{t.badge}</MicroLabel><div className="hairline-border" style={{ padding:6, background:'var(--paper)', display:'flex' }}><LeanIcon name={t.icon} size={24} style={{ color:'var(--ink-muted)' }} /></div></div><h2 className="mi-tile__title" style={{ margin:0, fontSize:20, fontWeight:700, color:'var(--ink)', textTransform:'uppercase', letterSpacing:'-.01em' }}>{t.title}</h2><p style={{ margin:0, fontSize:14, color:'var(--ink-muted)', lineHeight:1.625 }}>{t.description}</p></div>
          <div className="mi-tile__go" style={{ ...tmono, fontSize:12, fontWeight:700, color:'var(--ink)', textTransform:'uppercase', paddingTop:8, display:'flex', gap:4 }}><span>Launch Engine</span><span>→</span></div>
        </a>)}
      </div>
    </div>);
}
window.ToolsScreen = ToolsScreen;
})();
