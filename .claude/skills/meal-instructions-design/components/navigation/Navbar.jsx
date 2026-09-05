import React, { useState } from 'react';
import { Logo } from '../core/Logo.jsx';
import { Icon } from '../core/Icon.jsx';
import { Kbd } from '../core/Kbd.jsx';
import { StatusDot } from '../core/StatusDot.jsx';
import { Button } from '../core/Button.jsx';
export const NAV_LINKS = [
  { href:'/appliances/air-fryer', label:'Air Fryer' }, { href:'/categories/15-minute', label:'15-Minute Dinners' }, { href:'/categories/high-protein', label:'High Protein' }, { href:'/categories/kid-approved', label:'Kid Approved' },
  { href:'/blog', label:'Field Guides' }, { href:'/tools', label:'Tools & Calcs' }, { href:'/shop', label:'Merch & Tools', badge:'24' }, { href:'/how-long', label:'Cook Times' }, { href:'/storage', label:'Food Storage' }, { href:'/cheat-sheet', label:'Temp Cheatsheet' }];
/** Ink ticker ("228 VERIFIED MEALS · 603 USDA COOK-TIME DATASHEETS" + MANIFESTO / LLMS.TXT) over the sticky 64px paper/90 blurred header: Logo, mono uppercase nav, Search ⌘K, Sign in. */
export function Navbar({ recipeCount = 228, datasheetCount = 603, activeHref = '/', links = NAV_LINKS, onNavigate, onSearch, onSignIn, signedIn = false, sticky = true, showTicker = true, style, className = '' }) {
  const [menu, setMenu] = useState(false);
  const nav = (href) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(href); } };
  return (
    <div className={className} style={style}>
      {showTicker && <div className="hairline-b" style={{ background:'var(--ink)', color:'var(--paper)', padding:'6px 32px', fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.08em', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}><StatusDot color="live" pulse /><span style={{ textTransform:'uppercase', color:'var(--neutral-300)' }}>{recipeCount} verified meals · {datasheetCount} USDA cook-time datasheets</span></div>
        <div style={{ display:'flex', alignItems:'center', gap:16, color:'var(--neutral-400)' }}><a href="#/about" onClick={nav('/about')} className="mi-ticker-link">MANIFESTO</a><span>/</span><a href="#/llms.txt" onClick={nav('/llms.txt')} className="mi-ticker-link">AI SCRAPER (LLMS.TXT)</a></div>
      </div>}
      <header className="hairline-b" style={{ position: sticky ? 'sticky' : 'relative', top:0, zIndex:40, background:'rgba(245,244,240,.9)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <a href="#/" onClick={nav('/')} style={{ display:'inline-flex', textDecoration:'none' }}><Logo size="md" /></a>
          <nav style={{ display:'flex', alignItems:'center', gap:24, overflow:'hidden' }}>
            {links.map((l) => <a key={l.href} href={'#' + l.href} onClick={nav(l.href)} className={'mi-navlink' + (activeHref === l.href || (l.href !== '/' && activeHref.startsWith(l.href)) ? ' is-active' : '')} style={{ display:'inline-flex', alignItems:'center', gap:4 }}><span>{l.label}</span>{l.badge && <span style={{ fontSize:9, padding:'0 4px', background:'var(--ink)', color:'var(--paper)', fontWeight:700 }}>{l.badge}</span>}</a>)}
          </nav>
          <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
            <button type="button" onClick={onSearch} className="mi-btn mi-btn--outline-muted" title="Search recipes, cook times, and 50 field guides" style={{ background:'var(--paper-50)', padding:'6px 12px', fontSize:12, textTransform:'none', letterSpacing:0, gap:8 }}><Icon name="search" size={14} style={{ color:'var(--ink-subtle)' }} /><span>Search</span><Kbd>⌘K</Kbd></button>
            {signedIn ? <Button variant="outline" size="sm" icon="bookmark" href="#/account" onClick={nav('/account')} style={{ fontWeight:400, fontSize:12, padding:'6px 10px', background:'var(--paper-50)' }} className="mi-hover-accent">Saved meals</Button>
              : <Button variant="ink" icon="log-in" onClick={onSignIn} style={{ padding:'6px 12px' }}>Sign in</Button>}
            <button type="button" className="mi-icon-btn" aria-label="Toggle Menu" onClick={() => setMenu(!menu)} style={{ padding:8 }}><Icon name={menu ? 'x' : 'menu'} size={20} /></button>
          </div>
        </div>
        {menu && <div className="hairline-t hairline-b" style={{ background:'var(--paper-50)', padding:16, display:'flex', flexDirection:'column', gap:12, fontFamily:'var(--font-mono)', fontSize:12, textTransform:'uppercase', letterSpacing:'.08em' }}>
          {links.map((l) => <a key={l.href} href={'#' + l.href} onClick={(e) => { setMenu(false); nav(l.href)(e); }} className="mi-hover-accent" style={{ padding:'6px 0', color:'var(--ink)', textDecoration:'none' }}>{l.label}</a>)}
        </div>}
      </header>
    </div>);
}
