import React from 'react';
import { Button } from '../core/Button.jsx';
/** Accent "Start cook" CTA that deep-links to the live-cook companion (/cook?ds=appliance/food). */
export function StartCookButton({ appliance = 'air-fryer', foodSlug = '', label = 'Start cook', href, onClick, className = '', style }) {
  return <Button variant="accent" size="lg" icon="play" iconSize={16} href={href || ('#/cook?ds=' + appliance + '/' + foodSlug)} onClick={onClick} className={className} style={{ fontSize:12, ...style }}>{label}</Button>;
}
