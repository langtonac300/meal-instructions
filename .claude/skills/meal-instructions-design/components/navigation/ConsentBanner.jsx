import React, { useState } from 'react';
import { Button } from '../core/Button.jsx';
/** Fixed bottom cookie-consent bar (Google Consent Mode v2): sentence-case sans copy + "Reject non-essential" outline / "Accept all" ink. */
export function ConsentBanner({ onDecide, fixed = true, style, className = '' }) {
  const [state, setState] = useState('unset');
  if (state !== 'unset') return null;
  const pick = (v) => { setState(v); onDecide && onDecide(v); };
  return (
    <div role="dialog" aria-label="Cookie consent" className={'hairline-t ' + className} style={{ position: fixed ? 'fixed' : 'relative', bottom:0, left:0, right:0, zIndex:50, background:'var(--paper-50)', boxShadow:'0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)', ...style }}>
      <div style={{ maxWidth:1024, margin:'0 auto', padding:'16px 24px', display:'flex', alignItems:'center', gap:24 }}>
        <p style={{ margin:0, fontSize:14, color:'var(--ink)', lineHeight:1.625 }}>We use cookies for essential site functions, aggregate analytics, and personalized advertising served by Google and its partners. You can accept all, reject non-essential, or read our <a href="#/privacy" style={{ textDecoration:'underline' }}>Privacy Policy</a>.</p>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <Button variant="outline" onClick={() => pick('denied')} style={{ fontSize:11, padding:'8px 12px' }}>Reject non-essential</Button>
          <Button variant="ink" onClick={() => pick('granted')} style={{ fontSize:11, padding:'8px 12px', fontWeight:400 }}>Accept all</Button>
        </div>
      </div>
    </div>);
}
