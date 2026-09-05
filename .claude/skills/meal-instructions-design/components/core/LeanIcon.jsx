import React from 'react';
/** Resolve the design-system root from the linked styles.css or the loaded bundle. */
export function dsRoot() {
  if (typeof document === 'undefined') return '';
  const link = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find((l) => /styles\.css(\?|$)/.test(l.getAttribute('href') || ''));
  const script = Array.from(document.querySelectorAll('script[src]')).find((s) => /_ds_bundle\.js(\?|$)/.test(s.getAttribute('src') || ''));
  const href = (link && link.getAttribute('href')) || (script && script.getAttribute('src')) || '';
  return href.replace(/[^/]*$/, '');
}
export const LEAN_ICONS = ['appliance-air-fryer','appliance-grill','appliance-instant-pot','appliance-sheet-pan','appliance-skillet','appliance-slow-cooker','appliance-smoker','clock','flame','flip-action','fork-knife','fork','heat-waves','lightning-fast','oil-spray','pan-heat','portion-plate','protein-all','protein-beef','protein-chicken','protein-dairy-eggs','protein-lamb','protein-pork','protein-seafood','protein-turkey','protein-vegetarian','rest-time','safety-shield','scale-weight','thermometer-probe','timer-stopwatch'];
const ALIASES = { chicken:'protein-chicken', beef:'protein-beef', pork:'protein-pork', seafood:'protein-seafood', fish:'protein-seafood', turkey:'protein-turkey', lamb:'protein-lamb', vegetarian:'protein-vegetarian', 'dairy-eggs':'protein-dairy-eggs', all:'protein-all', 'air-fryer':'appliance-air-fryer', grill:'appliance-grill', 'instant-pot':'appliance-instant-pot', 'sheet-pan':'appliance-sheet-pan', skillet:'appliance-skillet', 'cast-iron':'appliance-skillet', 'slow-cooker':'appliance-slow-cooker', smoker:'appliance-smoker', oven:'appliance-sheet-pan', 'dutch-oven':'appliance-slow-cooker', time:'clock', temp:'heat-waves', protein:'fork', probe:'thermometer-probe', flip:'flip-action', rest:'rest-time', spray:'oil-spray', scale:'scale-weight', safety:'safety-shield', speed:'lightning-fast', stopwatch:'timer-stopwatch', utensils:'fork-knife', plate:'portion-plate' };
/** Lean 5S brand icon (28x28 stroke glyph from assets/icons/lean5s). Rendered as a CSS mask so it inherits currentColor. */
export function LeanIcon({ name, size = 24, className = '', style, base, title, ...rest }) {
  const file = ALIASES[name] || name;
  const root = base != null ? base : dsRoot();
  return <span role="img" aria-label={title || file} className={'lean-icon ' + className} style={{ width: size, height: size, ['--icon']: 'url(' + root + 'assets/icons/lean5s/' + file + '.svg)', ...style }} {...rest} />;
}
