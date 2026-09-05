// Shell: Navbar + hash router + Footer + ⌘K search + consent + floating timer
(() => {
const { Navbar, Footer, SearchModal, ConsentBanner, KitchenTimer } = window.MealInstructionsDesignSystem_767cb5;
function parseHash() { const h = (location.hash || '#/').replace(/^#/, ''); const m = h.match(/^\/recipes\/([^/?]+)/); if (m) return { screen:'recipe', slug:m[1] }; const d = h.match(/^\/how-long\/([^/]+)\/([^/?]+)/); if (d) return { screen:'datasheet', slug: d[1] + '-' + d[2] }; if (h.startsWith('/tools')) return { screen:'tools' }; return { screen:'home' }; }
function App() {
  const D = window.MI_DATA;
  const [route, setRoute] = React.useState(parseHash());
  const [search, setSearch] = React.useState(false); const [timer, setTimer] = React.useState(false); const [signedIn, setSignedIn] = React.useState(false);
  React.useEffect(() => { const f = () => setRoute(parseHash()); window.addEventListener('hashchange', f); const k = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearch((s) => !s); } }; window.addEventListener('keydown', k); return () => { window.removeEventListener('hashchange', f); window.removeEventListener('keydown', k); }; }, []);
  const go = (screen, slug) => { if (screen === 'recipe') location.hash = '#/recipes/' + slug; else if (screen === 'datasheet') { const d = D.datasheets.find((x) => x.slug === slug); location.hash = d ? '#/how-long/' + d.appliance + '/' + d.foodSlug : '#/how-long/' + slug; } else if (screen === 'tools') location.hash = '#/tools'; else location.hash = '#/'; window.scrollTo(0, 0); };
  const nav = (href) => { if (href === '/') go('home'); else if (href === '/tools') go('tools'); else if (href === '/how-long' || href === '/cheat-sheet' || href === '/appliances/air-fryer') go('datasheet', D.datasheets[0].slug); else if (href.startsWith('/categories')) go('home'); else go('home'); };
  const active = route.screen === 'tools' ? '/tools' : route.screen === 'datasheet' ? '/how-long' : '/';
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--paper)', color:'var(--ink)' }}>
      <Navbar activeHref={active} onNavigate={nav} onSearch={() => setSearch(true)} onSignIn={() => setSignedIn(true)} signedIn={signedIn} recipeCount={D.recipeCount} datasheetCount={D.datasheetCount} />
      <main style={{ flex:1 }}>
        {route.screen === 'home' && <window.HomeScreen D={D} go={go} />}
        {route.screen === 'recipe' && <window.RecipeScreen D={D} slug={route.slug} go={go} />}
        {route.screen === 'datasheet' && <window.DatasheetScreen D={D} slug={route.slug} go={go} />}
        {route.screen === 'tools' && <window.ToolsScreen D={D} go={go} />}
      </main>
      <Footer datasheetCount={D.datasheetCount} onNavigate={nav} />
      <SearchModal isOpen={search} onClose={() => setSearch(false)} items={D.searchItems} onSelect={(it) => { location.hash = it.href; window.scrollTo(0, 0); }} />
      <ConsentBanner />
      {timer && <KitchenTimer initialMinutes={12} label="Air Fryer Timer" onClose={() => setTimer(false)} />}
      {!timer && <button type="button" onClick={() => setTimer(true)} className="mi-btn mi-btn--ink mi-btn--rounded" style={{ position:'fixed', bottom:16, right:16, zIndex:49, boxShadow:'var(--shadow-float)' }}>⏱️ OPEN TIMER</button>}
    </div>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
