import React from 'react';
import { Logo } from '../core/Logo.jsx';
import { MicroLabel } from '../core/MicroLabel.jsx';
const L = ({ href, children, v = '', onNavigate }) => <li style={{ margin:0 }}><a href={'#' + href} onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(href); } : undefined} className={'mi-footlink ' + v}>{children}</a></li>;
const UL = ({ children }) => <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:6, fontSize:12, fontFamily:'var(--font-mono)' }}>{children}</ul>;
/** Six-column paper-card footer (components/Footer.tsx): brand manifesto, Kitchen Engines, Browse by Category, Appliance Guides, AI & Machine Endpoints, Company & Legal + colophon bar. */
export function Footer({ categories = ['15-Minute Meals','High Protein / Lean','Kid & Toddler Approved','Budget & Pantry Staples','No-Thaw / From Frozen','One-Pan & Sheet Pan','Five-Ingredient Staples'], appliances = ['Air Fryer','Sheet Pan','Cast Iron'], datasheetCount = 603, onNavigate, style, className = '' }) {
  const n = onNavigate;
  return (
    <footer className={'hairline-t ' + className} style={{ background:'var(--paper-50)', marginTop:80, color:'var(--ink)', ...style }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6, minmax(0,1fr))', gap:32 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <a href="#/" onClick={n ? (e) => { e.preventDefault(); n('/'); } : undefined} style={{ display:'inline-flex' }}><Logo size="sm" /></a>
            <p style={{ margin:0, fontSize:12, color:'var(--ink-muted)', lineHeight:1.625 }}>Engineered for busy cooks and parents. Instant directions, exact temps, and 20-word execution. No popups, no interstitials, no 12-paragraph essays about childhood summers. No fluff, just the instructions.</p>
            <div style={{ paddingTop:8 }}><a href="#/about" onClick={n ? (e) => { e.preventDefault(); n('/about'); } : undefined} className="mi-opacity-link" style={{ display:'inline-block', fontSize:12, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink)', borderBottom:'1px solid var(--ink)', textDecoration:'none' }}>Read The Zero-Fluff Manifesto →</a></div>
          </div>
          <div><MicroLabel color="accent" style={{ marginBottom:16 }}>Kitchen Engines</MicroLabel><UL>
            <L href="/shop" v="mi-footlink--accent" onNavigate={n}>👕 Merch &amp; Useless Tools (24 Specs)</L><L href="/tools" v="mi-footlink--bold" onNavigate={n}>🛠️ All Tools (30 Engines)</L>
            {[['/reheat','Takeout Revive'],['/frozen-cook','Freezer Cook Matrix'],['/dinner-sync','Dinner Sync Timer'],['/meat-math','Meat Math Scaler'],['/internal-temp','Thermometer Pull Guide'],['/salt-math','Salt & Dry-Brine Math'],['/kid-split','Picky Kid Deconstructor'],['/troubleshoot','5-Sec Dinner Rescue']].map(([h, t]) => <L key={h} href={h} onNavigate={n}>{t}</L>)}</UL></div>
          <div><MicroLabel color="ink" style={{ marginBottom:16 }}>Browse by Category</MicroLabel><UL>{categories.map((c) => <L key={c} href={'/categories/' + c.toLowerCase().replace(/[^a-z0-9]+/g, '-')} onNavigate={n}>{c}</L>)}</UL></div>
          <div><MicroLabel color="ink" style={{ marginBottom:16 }}>Appliance Guides</MicroLabel><UL>{appliances.map((a) => <L key={a} href={'/appliances/' + a.toLowerCase().replace(/ /g, '-')} onNavigate={n}>{a} Guide</L>)}<li style={{ paddingTop:8 }}><a href="#/how-long" onClick={n ? (e) => { e.preventDefault(); n('/how-long'); } : undefined} className="mi-footlink mi-footlink--accent">🔥 All Cook Times ({datasheetCount})</a></li><L href="/cheat-sheet" v="mi-footlink--accent" onNavigate={n}>⚡ All-Appliance Cheatsheet</L></UL></div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}><MicroLabel color="ink">AI &amp; Machine Endpoints</MicroLabel><p style={{ margin:0, fontSize:12, color:'var(--ink-muted)', lineHeight:1.625 }}>Standardized AI scraper manifests for ChatGPT, Claude, and Perplexity:</p><UL>
            <L href="/guides" v="mi-footlink--bold" onNavigate={n}><span style={{ textTransform:'none' }}>📚 Top 10 Guides (20)</span></L><L href="/blog" v="mi-footlink--accent" onNavigate={n}><span style={{ textTransform:'none' }}>🔬 Field Guides (55)</span></L>
            {[['/llms.txt','📄 /llms.txt (AI Index)'],['/llms-full.txt','📚 /llms-full.txt (Markdown)'],['/.well-known/mcp/server-card.json','🔌 MCP Server Card (AI Tools)'],['/sitemap.xml','🗺️ /sitemap.xml (Sitemap)'],['/robots.txt','🤖 /robots.txt']].map(([h, t]) => <L key={h} href={h} v="mi-footlink--ink" onNavigate={n}><span style={{ textTransform:'none' }}>{t}</span></L>)}</UL></div>
          <div><MicroLabel color="ink" style={{ marginBottom:16 }}>Company &amp; Legal</MicroLabel><UL>{[['/about','About','mi-footlink--ink'],['/contact','Contact','mi-footlink--ink'],['/privacy','Privacy Policy','mi-footlink--ink'],['/terms','Terms of Service','mi-footlink--ink'],['/shipping','Shipping',''],['/refunds','Refunds & Returns','']].map(([h, t, v]) => <L key={h} href={h} v={v} onNavigate={n}>{t}</L>)}</UL></div>
        </div>
        <div className="hairline-t" style={{ marginTop:48, paddingTop:32, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:11, fontFamily:'var(--font-mono)', color:'var(--ink-subtle)', gap:16, flexWrap:'wrap' }}>
          <div>© 2026 MEAL INSTRUCTIONS // ALL RECIPES VALIDATED WITH SCHEMA.ORG JSON-LD.</div>
          <div style={{ display:'flex', alignItems:'center', gap:24, textTransform:'uppercase' }}>{['About','Contact','Privacy Policy','Terms'].map((t, i) => <React.Fragment key={t}>{i > 0 && <span>•</span>}<a href="#" className="mi-hover-ink" style={{ color:'inherit', textDecoration:'none', transition:'color .2s' }}>{t}</a></React.Fragment>)}</div>
        </div>
      </div>
    </footer>);
}
