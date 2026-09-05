import React from 'react';
import { Button } from '../core/Button.jsx';
/** Small ink "PRINT 1-PAGE SHEET" button (rounded, hover accent). */
export function PrintButton({ label = 'PRINT 1-PAGE SHEET', onClick, className = '', style }) {
  return <Button variant="ink" size="sm" rounded icon="printer" iconSize={14} onClick={onClick || (() => window.print())} className={className} style={{ fontSize:12, fontWeight:400, letterSpacing:0, textTransform:'none', padding:'4px 12px', ...style }}>{label}</Button>;
}
