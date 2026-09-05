// Home / directory — recreation of app/HomePageClient.tsx
(() => {
const { ProteinSelectorBar, RecipeScrubber, CrisisTriageBar, CategoryGrid, KitchenHud, RecipeCard, RecipeTable, Button, Pill, MicroLabel, Segmented, Icon, LeanIcon, Panel, StatusDot } = window.MealInstructionsDesignSystem_767cb5;
const wrap = { maxWidth:1280, margin:'0 auto', padding:'0 32px', width:'100%', boxSizing:'border-box' };
const mono = { fontFamily:'var(--font-mono)' };
function HomeScreen({ D, go }) {
  const [protein, setProtein] = React.useState('all'); const [cat, setCat] = React.useState('all'); const [appl, setAppl] = React.useState('all'); const [max, setMax] = React.useState(null); const [view, setView] = React.useState('grid'); const [preset, setPreset] = React.useState(null); const [q, setQ] = React.useState(''); const [sort, setSort] = React.useState('default'); const [hi, setHi] = React.useState(null);
  const APPL = { 'Air Fryer':'air-fryer', 'Standard Home Oven':'oven', 'Instant Pot / Pressure Cooker':'instant-pot', '12-Inch Skillet / Non-Stick':'skillet', 'Sheet Pan (Convection Bake)':'sheet-pan', 'Cast Iron Skillet':'cast-iron', 'Gas or Charcoal Grill':'grill', 'Dutch Oven / Heavy Pot':'dutch-oven', 'Slow Cooker / Crockpot':'slow-cooker', 'Pellet or Charcoal Smoker':'smoker', 'Stovetop Boiling':'boiling' };
  const list = D.recipes.filter((r) => (max == null || r.totalMinutes <= max) && (protein === 'all' || r.protein === protein) && (cat === 'all' || (r.categories || []).includes(cat)) && (appl === 'all' || r.appliance === appl) && (!q || (r.title + r.tagline + r.protein + r.appliance).toLowerCase().includes(q.toLowerCase())))
    .sort((a, b) => sort === 'fastest' ? a.totalMinutes - b.totalMinutes : sort === 'protein' ? (b.nutrition.proteinGrams || 0) - (a.nutrition.proteinGrams || 0) : sort === 'alphabetical' ? a.title.localeCompare(b.title) : 0);
  const countFor = (m) => m == null ? D.recipeCount : Math.round(D.recipeCount * D.recipes.filter((r) => r.totalMinutes <= m).length / D.recipes.length);
  const active = max != null || protein !== 'all' || cat !== 'all' || appl !== 'all' || preset || q;
  const reset = () => { setProtein('all'); setMax(null); setCat('all'); setAppl('all'); setPreset(null); setQ(''); setHi(null); };
  const onPreset = (p) => { if (!p) { setPreset(null); setCat('all'); setMax(null); return; } setPreset(p.id); if (p.category) setCat(p.category); if (p.maxMinutes) setMax(p.maxMinutes); };
  const roll = () => { if (!list.length) return; setHi(list[Math.floor(Math.random() * list.length)].slug); };
  const catCounts = Object.fromEntries(D.categories.map((c) => [c.slug, c.count]));
  const airFryer = D.datasheets.slice(0, 6);
  const open = (r) => go('recipe', r.slug);
  const H2 = ({ children, black }) => <h2 style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:30, fontWeight: black ? 900 : 700, textTransform:'uppercase', letterSpacing:'-.01em', color:'var(--ink)' }}>{children}</h2>;
  return (
    <div style={{ display:'flex', flexDirection:'column', background:'var(--paper)' }}>
      <ProteinSelectorBar selected={protein} onSelect={setProtein} counts={D.proteinCounts} total={D.recipeCount} />
      <RecipeScrubber maxMinutes={max} onTimeChange={setMax} countFor={countFor} sample="Crispy Air Fryer Chicken Tenders (15m)" />
      <section style={{ ...wrap, paddingTop:24, paddingBottom:24, borderBottom:'1px solid var(--hairline)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:24, alignItems:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <MicroLabel color="accent" dot style={{ letterSpacing:'.14em' }}>THE ZERO-FLUFF HOME COOKING ENGINE</MicroLabel>
            <h1 style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:48, fontWeight:900, letterSpacing:'-.01em', textTransform:'uppercase', lineHeight:1, color:'var(--ink)' }}>No fluff. <span style={{ color:'var(--accent)' }}>Just the instructions.</span></h1>
            <p style={{ margin:0, ...mono, fontSize:14, color:'var(--ink-muted)', lineHeight:1.625 }}>Parametric cook-time database and {D.recipeCount} quality-gated weeknight meals. Exact temperatures, verified air fryer datasheets, zero life stories.</p>
          </div>
          <Panel variant="inset" rounded shadow padding="md" style={{ ...mono, fontSize:12 }}>
            <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'.14em', color:'var(--ink-subtle)', borderBottom:'1px solid var(--hairline)', paddingBottom:8, marginBottom:10, display:'flex', justifyContent:'space-between' }}><span>SYSTEM SPECIFICATIONS</span><span style={{ color:'var(--accent)', fontWeight:700 }}>V 2.0 PRECISION</span></div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, color:'var(--ink)' }}>
              {[['TOTAL INDEXED MEALS:', D.recipeCount + ' RECIPES'], ['USDA DATASHEETS:', D.datasheetCount + ' VERIFIED'], ['LIFE STORIES REMOVED:', '100% (0 WORDS)', true]].map(([k, v, a]) => <div key={k} style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:'var(--ink-muted)' }}>{k}</span><span style={{ fontWeight:700, color: a ? 'var(--accent)' : 'var(--ink)' }}>{v}</span></div>)}
              <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:'var(--ink-muted)' }}>AI &amp; LLM TERMINAL:</span><a href="#" className="mi-hover-accent" style={{ fontWeight:700, textDecoration:'underline', color:'var(--ink)' }}>LLMS.TXT READY</a></div>
            </div>
          </Panel>
        </div>
        <div className="scrollbar-none" style={{ marginTop:24, paddingTop:16, borderTop:'1px solid rgba(223,220,206,.8)', display:'flex', alignItems:'center', gap:8, overflowX:'auto', fontSize:11, ...mono, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-muted)' }}>
          <span style={{ flexShrink:0, color:'var(--ink-subtle)', fontWeight:700 }}>POPULAR HARDWARE:</span>
          {D.appliances.map((a) => <button key={a} type="button" onClick={() => setAppl(appl === APPL[a] ? 'all' : APPL[a])} className={'mi-chip mi-chip--card' + (appl === APPL[a] ? ' is-active' : '')} style={{ padding:'4px 12px', flexShrink:0 }}>{a}</button>)}
        </div>
      </section>
      <KitchenHud datasheets={D.datasheets} recipes={D.recipes} presets={D.presets} datasheetCount={D.datasheetCount} recipeCount={D.recipeCount} onOpenRecipe={(r) => go('recipe', r.slug)} onOpenDatasheet={(d) => go('datasheet', d.slug)} />
      <CrisisTriageBar activePreset={preset} onSelectPreset={onPreset} counts={D.crisisCounts} />
      <section style={{ ...wrap, paddingTop:32, paddingBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}><MicroLabel color="ink" dot="ink" pulse={false} style={{ fontSize:12, letterSpacing:'.08em' }}>BROWSE BY INTENT &amp; HARDWARE</MicroLabel><span style={{ fontSize:10, ...mono, color:'var(--ink-muted)' }}>CLICK TO FILTER DIRECTORY</span></div>
        <CategoryGrid categories={D.categories} selected={cat} onSelect={setCat} counts={catCounts} />
      </section>
      <section id="directory" style={{ ...wrap, paddingTop:32, paddingBottom:32 }}>
        {active && <div style={{ marginBottom:16, padding:12, background:'var(--paper-100)', border:'1px solid var(--hairline)', borderRadius:4, display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, fontSize:12, ...mono }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}><span style={{ fontWeight:700, textTransform:'uppercase' }}>ACTIVE FILTERS:</span>
            {protein !== 'all' && <Pill variant="accent" rounded>PROTEIN: {protein.toUpperCase()}</Pill>}{max != null && <Pill variant="ink" rounded>≤ {max} MINS TOTAL</Pill>}{cat !== 'all' && <Pill variant="inset" rounded style={{ textTransform:'uppercase' }}>CATEGORY: {cat}</Pill>}{appl !== 'all' && <Pill variant="inset" rounded>APPLIANCE: {appl}</Pill>}{preset && <Pill variant="accent-soft" rounded bold style={{ background:'var(--accent-15)', borderColor:'var(--accent-30)' }}>CRISIS: {preset.toUpperCase()}</Pill>}{q && <Pill variant="inset" rounded>SEARCH: "{q}"</Pill>}
            <span style={{ color:'var(--ink-muted)' }}>({list.length} of {D.recipeCount} meals match)</span></div>
          <button type="button" onClick={reset} className="mi-hover-underline" style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700, textTransform:'uppercase', color:'var(--accent)', background:'none', border:0, cursor:'pointer', ...mono }}><Icon name="rotate-ccw" size={12} />CLEAR ALL FILTERS</button>
        </div>}
        <div style={{ marginBottom:16, background:'var(--paper-50)', border:'1px solid var(--hairline)', borderRadius:4, padding:12, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, fontSize:12, ...mono }}>
          <div style={{ position:'relative', width:320 }}><Icon name="search" size={14} style={{ color:'var(--ink-subtle)', position:'absolute', left:10, top:'50%', transform:'translateY(-50%)' }} /><input className="mi-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search recipes by name, cut, ingredient..." />{q && <button type="button" className="mi-icon-btn" onClick={() => setQ('')} style={{ position:'absolute', right:4, top:'50%', transform:'translateY(-50%)' }}><Icon name="x" size={12} /></button>}</div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <Button variant="accent" rounded icon="dices" onClick={roll} title="Pick a random dinner from matching results" style={{ fontSize:11, boxShadow:'var(--shadow-subtle)' }}>ROLL DINNER</Button>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11 }}><span style={{ color:'var(--ink-subtle)', textTransform:'uppercase' }}>SORT:</span><select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background:'var(--paper)', border:'1px solid var(--hairline)', borderRadius:4, padding:'4px 8px', color:'var(--ink)', fontWeight:700, textTransform:'uppercase', ...mono, fontSize:11, cursor:'pointer' }}><option value="default">INDEX # (DEFAULT)</option><option value="fastest">⚡ FASTEST (LEAST TIME)</option><option value="protein">🥩 HIGHEST PROTEIN</option><option value="alphabetical">A–Z ALPHABETICAL</option></select></div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, borderBottom:'1px solid var(--hairline)', paddingBottom:16, marginBottom:24 }}>
          <div className="scrollbar-none" style={{ display:'flex', alignItems:'center', gap:6, overflowX:'auto', fontSize:11, ...mono, textTransform:'uppercase', letterSpacing:'.08em' }}>
            <button type="button" onClick={() => setCat('all')} className={'mi-chip mi-chip--sm' + (cat === 'all' ? ' is-active' : '')} style={{ flexShrink:0 }}>ALL [{D.recipeCount}]</button>
            {D.categories.map((c) => <button key={c.slug} type="button" onClick={() => setCat(c.slug)} className={'mi-chip mi-chip--sm' + (cat === c.slug ? ' is-active' : '')} style={{ flexShrink:0 }}>{c.name.replace(' Staples', '').replace(' Meals', '')} [{c.count}]</button>)}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, ...mono, fontSize:12 }}><span style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-subtle)' }}>VIEW:</span><Segmented icon value={view} onChange={setView} options={[{ value:'grid', icon:<Icon name="layout-grid" />, title:'Grid View' }, { value:'table', icon:<Icon name="list-filter" />, title:'Index Table View' }]} /></div>
        </div>
        {view === 'grid' ? <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:24 }}>{list.map((r) => <RecipeCard key={r.id} recipe={r} isHighlighted={r.slug === hi} onOpen={open} />)}</div> : <RecipeTable recipes={list} onOpen={open} />}
        {!list.length && <div style={{ textAlign:'center', padding:64, background:'var(--paper-50)', borderRadius:4, border:'1px solid var(--hairline)', ...mono }}><p style={{ fontSize:16, fontWeight:700, margin:0 }}>No meals match your active filters.</p><Button rounded onClick={reset} style={{ marginTop:12 }}>RESET ALL FILTERS</Button></div>}
      </section>
      <section style={{ ...wrap, paddingTop:40, paddingBottom:40 }}>
        <div style={{ background:'var(--paper-100)', border:'1px solid var(--hairline)', borderRadius:8, padding:32 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, borderBottom:'1px solid var(--hairline)', paddingBottom:16, marginBottom:24 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}><div className="hairline-border" style={{ padding:8, background:'var(--paper)', display:'flex' }}><LeanIcon name="appliance-air-fryer" size={28} style={{ color:'var(--accent)' }} /></div><div><MicroLabel color="accent" style={{ fontWeight:700 }}>INSTANT REFERENCE</MicroLabel><h3 style={{ margin:'2px 0 0', fontFamily:'var(--font-sans)', fontSize:24, fontWeight:700, textTransform:'uppercase', color:'var(--ink)' }}>AIR FRYER QUICK TEMPERATURE MATRIX</h3></div></div>
            <Button rounded size="sm" style={{ fontSize:12 }} onClick={() => go('datasheet', D.datasheets[0].slug)}>VIEW FULL CHEAT SHEET →</Button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6, minmax(0,1fr))', gap:12, ...mono, textAlign:'center' }}>
            {airFryer.map((m) => <a key={m.slug} href="#" onClick={(e) => { e.preventDefault(); go('datasheet', m.slug); }} className="mi-tile mi-tile--rounded" style={{ padding:12, background:'var(--paper-50)' }}>
              <span style={{ fontSize:10, fontWeight:700, color:'var(--ink-subtle)', textTransform:'uppercase', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', display:'block' }}>{m.food}</span>
              <div style={{ margin:'8px 0', display:'flex', flexDirection:'column', gap:2 }}><div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:16, fontWeight:900, color:'var(--ink)' }}><LeanIcon name="heat-waves" size={16} style={{ color:'var(--accent)' }} /><span>{m.tempFormatted.split(' ')[0]}</span></div><div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:12, fontWeight:700, color:'var(--ink-muted)' }}><LeanIcon name="clock" size={13} style={{ color:'var(--ink-subtle)' }} /><span>{m.timeFormatted}</span></div></div>
              <span style={{ fontSize:9, color:'var(--accent)', fontWeight:700, background:'var(--paper-200)', padding:'2px 6px', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}><LeanIcon name="flip-action" size={11} />{m.flipAtMinutes > 0 ? 'Flip ' + m.flipAtMinutes + 'm' : 'No Flip'}</span>
            </a>)}
          </div>
        </div>
      </section>
      <section style={{ ...wrap, paddingTop:40, paddingBottom:40, borderTop:'1px solid var(--hairline)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:24 }}><div><MicroLabel color="accent">PARAMETRIC UTILITIES</MicroLabel><H2>Tactile Kitchen Engines &amp; Tools</H2></div><a href="#" onClick={(e) => { e.preventDefault(); go('tools'); }} className="mi-hover-underline" style={{ ...mono, fontSize:12, fontWeight:700, textTransform:'uppercase', color:'var(--ink)', display:'flex', gap:4 }}><span>View All 30 Tools</span><span>→</span></a></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:12, ...mono, fontSize:12 }}>
          {D.tools.slice(0, 8).map((t) => <a key={t.href} href="#" onClick={(e) => { e.preventDefault(); go('tools'); }} className="mi-tile" style={{ gap:8, justifyContent:'flex-start' }}><div style={{ fontSize:10, color:'var(--accent)', fontWeight:700, textTransform:'uppercase' }}>{t.badge}</div><div className="mi-tile__title" style={{ fontWeight:700, color:'var(--ink)', fontSize:14, fontFamily:'var(--font-sans)' }}>{t.title}</div><p style={{ margin:0, fontSize:11, color:'var(--ink-muted)', fontFamily:'var(--font-sans)' }}>{t.description}</p></a>)}
        </div>
      </section>
      <section style={{ ...wrap, paddingTop:40, paddingBottom:40, borderTop:'1px solid var(--hairline)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}><div><MicroLabel color="accent" dot style={{ fontSize:12, letterSpacing:'.08em', marginBottom:4 }}>20 OPERATIONAL TOP 10 LISTS</MicroLabel><H2 black>Battle-Tested Dad &amp; Home Cook Guides</H2></div><a href="#" className="mi-hover-accent" style={{ ...mono, fontSize:12, color:'var(--ink)', fontWeight:700, textTransform:'uppercase', display:'flex', gap:4 }}><span>View All 20 Guides</span><span>→</span></a></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:16 }}>
          {D.guides.map((g) => <a key={g.slug} href="#" className="mi-tile" style={{ padding:20, gap:10 }}><div style={{ display:'flex', flexDirection:'column', gap:8 }}><div style={{ fontSize:10, color:'var(--accent)', fontWeight:700, textTransform:'uppercase', ...mono }}>{g.ref}</div><h3 className="mi-tile__title" style={{ margin:0, fontWeight:700, color:'var(--ink)', fontSize:14, fontFamily:'var(--font-sans)' }}>{g.title}</h3><p style={{ margin:0, fontSize:11, color:'var(--ink-muted)' }}>{g.desc}</p></div><div style={{ paddingTop:8, borderTop:'1px solid rgba(223,220,206,.6)', fontSize:10, ...mono, color:'var(--ink)', fontWeight:700, textTransform:'uppercase', display:'flex', justifyContent:'space-between' }}><span>4 MIN READ</span><span>READ GUIDE →</span></div></a>)}
        </div>
      </section>
      <section style={{ ...wrap, paddingTop:48, paddingBottom:48, borderTop:'1px solid var(--hairline)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:24 }}><div><MicroLabel color="accent">50 PEER-REVIEWED REFERENCES</MicroLabel><H2>Culinary Physics &amp; Field Guides</H2></div><Button rounded size="sm" style={{ fontSize:12, padding:'6px 14px' }}>VIEW ALL 50 FIELD GUIDES →</Button></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap:16, ...mono, fontSize:12 }}>
          {D.fieldGuides.map((g) => <a key={g.slug} href="#" className="mi-tile mi-tile--rounded" style={{ gap:8, justifyContent:'flex-start' }}><div style={{ fontSize:10, color:'var(--accent)', fontWeight:700, textTransform:'uppercase' }}>{g.badge}</div><div className="mi-tile__title" style={{ fontWeight:700, color:'var(--ink)', fontSize:14, fontFamily:'var(--font-sans)', lineHeight:1.375 }}>{g.title}</div><p style={{ margin:0, fontSize:11, color:'var(--ink-muted)', fontFamily:'var(--font-sans)' }}>{g.desc}</p></a>)}
        </div>
      </section>
      <section style={{ ...wrap, paddingTop:48, paddingBottom:48, borderTop:'1px solid var(--hairline)' }}>
        <Panel variant="dark" padding="xl" style={{ padding:48, position:'relative', overflow:'hidden' }}>
          <div style={{ maxWidth:768 }}>
            <span style={{ display:'block', fontSize:10, ...mono, textTransform:'uppercase', letterSpacing:'.14em', color:'var(--accent)', fontWeight:700, marginBottom:8 }}>WHY MEAL INSTRUCTIONS EXISTS</span>
            <h2 style={{ margin:0, fontFamily:'var(--font-sans)', fontSize:36, fontWeight:700, letterSpacing:'-.01em', textTransform:'uppercase', lineHeight:1.25 }}>NO ESSAYS ABOUT GRANDMOTHER’S CABIN. NO 5-PAGE ADS.</h2>
            <p style={{ fontSize:16, color:'rgba(245,244,240,.8)', marginTop:16, marginBottom:0, lineHeight:1.625 }}>When you have hungry kids asking what’s for dinner at 6:15 PM, you do not need 2,000 words on the cultural significance of chicken tenders. You need to know the temperature, the time, and when to flip the basket. That’s it.</p>
            <div style={{ marginTop:24, display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}><Button variant="paper" rounded style={{ padding:'8px 16px' }}>READ THE MANIFESTO</Button><a href="#" style={{ ...mono, fontSize:12, textTransform:'uppercase', letterSpacing:'.08em', color:'rgba(245,244,240,.7)', textDecoration:'underline', textUnderlineOffset:4 }}>VIEW MACHINE-READABLE LLMS.TXT →</a></div>
          </div>
        </Panel>
      </section>
    </div>);
}
window.HomeScreen = HomeScreen;
})();
