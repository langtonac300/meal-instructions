import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';
const cap = { fontFamily:'var(--font-mono)', fontSize:11, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-subtle)' };
/** Save / rate / suggest-edit block under a recipe (components/MealActions.tsx). signedIn=false shows the Google sign-in prompt. */
export function MealActions({ recipeTitle = 'this meal', signedIn = false, saved: savedProp = false, stars: starsProp = 0, onSignIn, onSave, onRate, onSuggest, className = '', style }) {
  const [saved, setSaved] = useState(savedProp); const [stars, setStars] = useState(starsProp); const [hover, setHover] = useState(0); const [review, setReview] = useState(''); const [open, setOpen] = useState(false); const [body, setBody] = useState(''); const [sent, setSent] = useState(false);
  const box = { marginTop:32, padding:16, background:'var(--paper-50)', border:'1px solid var(--hairline)' };
  if (!signedIn) return (
    <section className={className} style={{ ...box, ...style }}>
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12 }}>
        <div><div style={cap}>Save &amp; Rate</div><p style={{ fontSize:14, color:'var(--ink)', margin:'4px 0 0' }}>Sign in with Google to save <strong>{recipeTitle}</strong>, rate it after you cook, and suggest edits to the instructions.</p></div>
        <Button variant="ink" size="lg" onClick={onSignIn} style={{ fontWeight:400, fontSize:11, padding:'8px 16px' }} className="mi-opacity-link">Sign in with Google</Button>
      </div>
    </section>);
  return (
    <section className={className} style={{ ...box, display:'flex', flexDirection:'column', gap:16, ...style }}>
      <div style={cap}>Your notes on this meal</div>
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:16 }}>
        <button type="button" onClick={() => { setSaved(!saved); onSave && onSave(!saved); }} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 12px', border:'1px solid var(--ink)', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'var(--font-sans)', background: saved ? 'var(--ink)' : 'var(--paper)', color: saved ? 'var(--paper)' : 'var(--ink)', transition:'all .2s' }}><Icon name={saved ? 'bookmark-check' : 'bookmark'} size={16} />{saved ? 'Saved' : 'Save this meal'}</button>
        {saved && <a href="#/account" className="mi-hover-ink" style={{ ...cap, textDecoration:'none' }}>View saved meals →</a>}
        <div style={{ display:'flex', alignItems:'center', gap:4 }} onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Rate this recipe">
          {[1, 2, 3, 4, 5].map((n) => { const filled = (hover || stars) >= n; return <button key={n} type="button" className="mi-star" onMouseEnter={() => setHover(n)} onClick={() => { setStars(n); onRate && onRate(n); }} aria-label={n + ' star' + (n > 1 ? 's' : '')}><Icon name="star" size={20} fill={filled ? 'currentColor' : 'none'} style={{ color: filled ? 'var(--ink)' : 'var(--ink-subtle)', transition:'color .2s' }} /></button>; })}
          {stars > 0 && <span style={{ ...cap, marginLeft:8 }}>You rated {stars}/5</span>}
        </div>
      </div>
      {stars > 0 && <div style={{ display:'flex', flexDirection:'column', gap:8 }}><label style={{ ...cap, fontSize:10 }}>Review (optional)</label><textarea className="mi-textarea" rows={2} maxLength={2000} value={review} onChange={(e) => setReview(e.target.value)} placeholder="How did it turn out? What would you do differently?" /></div>}
      <div className="hairline-t" style={{ paddingTop:16 }}>
        <button type="button" onClick={() => setOpen(!open)} className="mi-opacity-link" style={{ ...cap, color:'var(--ink)', display:'inline-flex', alignItems:'center', gap:8, background:'none', border:0, cursor:'pointer', padding:0 }}><Icon name="pencil" size={14} />{open ? 'Close suggestion' : 'Something wrong? Suggest an edit'}</button>
        {open && <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
          <textarea className="mi-textarea" rows={4} maxLength={4000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="What should change? (e.g. 'Step 3 should say 400°F, not 375°F' or 'The salt amount is way too high for 2 lb of chicken.')" />
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}><span style={{ ...cap, fontSize:10 }}>{body.length}/4000</span><Button variant="ink" size="sm" disabled={!body.trim()} onClick={() => { onSuggest && onSuggest(body); setSent(true); setBody(''); setTimeout(() => setSent(false), 4000); }} style={{ fontWeight:400, fontSize:11, padding:'6px 12px' }}>Send suggestion</Button></div>
          {sent && <div style={cap}>Thanks — logged.</div>}
        </div>}
      </div>
    </section>);
}
