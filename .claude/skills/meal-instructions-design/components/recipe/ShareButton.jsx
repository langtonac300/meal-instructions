import React, { useState } from 'react';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
/** Recipe action toolbar: SMS TO SPOUSE (copies telegram text), AI / LLM MARKDOWN, PRINT CARD. Copies flip to "COPIED FOR SMS!" / "MD COPIED!" for 3s. */
export function ShareButton({ smsText = '', markdown = '', onPrint, showMarkdown = true, compact = false, className = '', style }) {
  const [sms, setSms] = useState(false); const [md, setMd] = useState(false);
  const copy = async (t, set) => { try { await navigator.clipboard.writeText(t); } catch (e) {} set(true); setTimeout(() => set(false), 3000); };
  const ok = <Icon name="check" size={14} style={{ color:'var(--verified-check)' }} />;
  if (compact) return (
    <div className={className} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase', letterSpacing:'.08em', ...style }}>
      <Button variant="outline" size="sm" icon={sms ? ok : <Icon name="message-square" size={14} style={{ color:'var(--ink-muted)' }} />} onClick={() => copy(smsText, setSms)} title="Copy short text for SMS / iMessage" style={{ letterSpacing:'.08em', fontSize:10, color: sms ? 'var(--verified-strong)' : undefined, fontWeight: sms ? 700 : 400 }}>{sms ? 'COPIED FOR SMS!' : 'COPY FOR SMS'}</Button>
      <Button variant="outline" size="sm" icon={<Icon name="printer" size={14} style={{ color:'var(--ink-muted)' }} />} onClick={onPrint || (() => window.print())} title="Print clean 1-page recipe card" style={{ fontSize:10 }}>PRINT</Button>
    </div>);
  return (
    <div className={'hairline-t ' + className} style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, paddingTop:8, fontFamily:'var(--font-mono)', fontSize:12, ...style }}>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <Button variant="outline" icon={sms ? ok : 'share-2'} onClick={() => copy(smsText, setSms)}>{sms ? 'COPIED FOR SMS!' : 'SMS TO SPOUSE'}</Button>
        {showMarkdown && <Button variant="outline-muted" icon={md ? ok : 'copy'} onClick={() => copy(markdown, setMd)} title="Copy clean markdown for ChatGPT, Claude, or Perplexity">{md ? 'MD COPIED!' : 'AI / LLM MARKDOWN'}</Button>}
      </div>
      <Button variant="outline-muted" icon="printer" onClick={onPrint || (() => window.print())}>PRINT CARD</Button>
    </div>);
}
