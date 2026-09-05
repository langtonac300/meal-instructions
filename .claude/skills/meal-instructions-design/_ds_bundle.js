/* @ds-bundle: {"format":4,"namespace":"MealInstructionsDesignSystem_767cb5","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"LUCIDE","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Kbd","sourcePath":"components/core/Kbd.jsx"},{"name":"LEAN_ICONS","sourcePath":"components/core/LeanIcon.jsx"},{"name":"LeanIcon","sourcePath":"components/core/LeanIcon.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"MicroLabel","sourcePath":"components/core/MicroLabel.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"Segmented","sourcePath":"components/core/Segmented.jsx"},{"name":"StatusDot","sourcePath":"components/core/StatusDot.jsx"},{"name":"CategoryGrid","sourcePath":"components/discovery/CategoryGrid.jsx"},{"name":"CRISIS_PRESETS","sourcePath":"components/discovery/CrisisTriageBar.jsx"},{"name":"CrisisTriageBar","sourcePath":"components/discovery/CrisisTriageBar.jsx"},{"name":"KitchenHud","sourcePath":"components/discovery/KitchenHud.jsx"},{"name":"PROTEIN_OPTIONS","sourcePath":"components/discovery/ProteinSelectorBar.jsx"},{"name":"ProteinSelectorBar","sourcePath":"components/discovery/ProteinSelectorBar.jsx"},{"name":"TIME_STOPS","sourcePath":"components/discovery/RecipeScrubber.jsx"},{"name":"RecipeScrubber","sourcePath":"components/discovery/RecipeScrubber.jsx"},{"name":"ConsentBanner","sourcePath":"components/navigation/ConsentBanner.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NAV_LINKS","sourcePath":"components/navigation/Navbar.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"},{"name":"SearchModal","sourcePath":"components/navigation/SearchModal.jsx"},{"name":"KitchenTimer","sourcePath":"components/recipe/KitchenTimer.jsx"},{"name":"Lean5SMatrix","sourcePath":"components/recipe/Lean5SMatrix.jsx"},{"name":"LeanSpecBadge","sourcePath":"components/recipe/LeanSpecBadge.jsx"},{"name":"MealActions","sourcePath":"components/recipe/MealActions.jsx"},{"name":"ModeSwitch","sourcePath":"components/recipe/ModeSwitch.jsx"},{"name":"ModeSwitchCards","sourcePath":"components/recipe/ModeSwitch.jsx"},{"name":"PortionScaler","sourcePath":"components/recipe/PortionScaler.jsx"},{"name":"PrintButton","sourcePath":"components/recipe/PrintButton.jsx"},{"name":"RecipeCard","sourcePath":"components/recipe/RecipeCard.jsx"},{"name":"RecipeTable","sourcePath":"components/recipe/RecipeTable.jsx"},{"name":"ShareButton","sourcePath":"components/recipe/ShareButton.jsx"},{"name":"StartCookButton","sourcePath":"components/recipe/StartCookButton.jsx"}],"sourceHashes":{"components/core/Button.jsx":"7b7b2b1c1e2d","components/core/Icon.jsx":"2efe297f7666","components/core/Kbd.jsx":"c8987816825e","components/core/LeanIcon.jsx":"f6ee35911279","components/core/Logo.jsx":"58afdb77f179","components/core/MicroLabel.jsx":"c90d18712560","components/core/Panel.jsx":"afc92a53e0ae","components/core/Pill.jsx":"293ffbbb843e","components/core/Segmented.jsx":"88e1abc8559b","components/core/StatusDot.jsx":"a2e9bbb95b2f","components/discovery/CategoryGrid.jsx":"cbcdd2c915ca","components/discovery/CrisisTriageBar.jsx":"1c9158382ff7","components/discovery/KitchenHud.jsx":"13a3ed26b8c9","components/discovery/ProteinSelectorBar.jsx":"f0faffa6a1f9","components/discovery/RecipeScrubber.jsx":"a49e5b54612e","components/navigation/ConsentBanner.jsx":"9ccd7c4dd39c","components/navigation/Footer.jsx":"dfca97819d35","components/navigation/Navbar.jsx":"5844f840f0cc","components/navigation/SearchModal.jsx":"44ca860b701c","components/recipe/KitchenTimer.jsx":"fdaebddc2887","components/recipe/Lean5SMatrix.jsx":"0a4dbdd4c625","components/recipe/LeanSpecBadge.jsx":"517ea514eaca","components/recipe/MealActions.jsx":"4e029a43f66c","components/recipe/ModeSwitch.jsx":"32692ba4a893","components/recipe/PortionScaler.jsx":"b29721c3c672","components/recipe/PrintButton.jsx":"060dd93db848","components/recipe/RecipeCard.jsx":"edad4ee31d9e","components/recipe/RecipeTable.jsx":"d8f084cf0110","components/recipe/ShareButton.jsx":"051cfd920f50","components/recipe/StartCookButton.jsx":"9a3f1798e3b3","components/sample-data.js":"2c69a3537323","ui_kits/web/App.jsx":"40e34c9bef38","ui_kits/web/DatasheetScreen.jsx":"5e69694dfb59","ui_kits/web/HomeScreen.jsx":"ffa80d62fc20","ui_kits/web/RecipeScreen.jsx":"28d0dab24ae1","ui_kits/web/ToolsScreen.jsx":"cef85ac7837f"},"inlinedExternals":[],"unexposedExports":[{"name":"dsRoot","sourcePath":"components/core/LeanIcon.jsx"}]} */

(() => {

const __ds_ns = (window.MealInstructionsDesignSystem_767cb5 = window.MealInstructionsDesignSystem_767cb5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Lucide icon subset used across mealinstructions.com (lucide-react in the repo). Path data inlined so no CDN is required.
const P = d => ['path', {
  d
}];
const LUCIDE = {
  search: [['circle', {
    cx: 11,
    cy: 11,
    r: 8
  }], P('m21 21-4.3-4.3')],
  x: [P('M18 6 6 18'), P('m6 6 12 12')],
  menu: [['line', {
    x1: 4,
    x2: 20,
    y1: 12,
    y2: 12
  }], ['line', {
    x1: 4,
    x2: 20,
    y1: 6,
    y2: 6
  }], ['line', {
    x1: 4,
    x2: 20,
    y1: 18,
    y2: 18
  }]],
  zap: [['polygon', {
    points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2'
  }]],
  'book-open': [P('M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'), P('M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z')],
  clock: [['circle', {
    cx: 12,
    cy: 12,
    r: 10
  }], ['polyline', {
    points: '12 6 12 12 16 14'
  }]],
  flame: [P('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z')],
  play: [['polygon', {
    points: '6 3 20 12 6 21 6 3'
  }]],
  pause: [['rect', {
    x: 14,
    y: 4,
    width: 4,
    height: 16,
    rx: 1
  }], ['rect', {
    x: 6,
    y: 4,
    width: 4,
    height: 16,
    rx: 1
  }]],
  'rotate-ccw': [P('M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'), P('M3 3v5h5')],
  printer: [['polyline', {
    points: '6 9 6 2 18 2 18 9'
  }], P('M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'), ['rect', {
    width: 12,
    height: 8,
    x: 6,
    y: 14
  }]],
  'share-2': [['circle', {
    cx: 18,
    cy: 5,
    r: 3
  }], ['circle', {
    cx: 6,
    cy: 12,
    r: 3
  }], ['circle', {
    cx: 18,
    cy: 19,
    r: 3
  }], ['line', {
    x1: 8.59,
    x2: 15.42,
    y1: 13.51,
    y2: 17.49
  }], ['line', {
    x1: 15.41,
    x2: 8.59,
    y1: 6.51,
    y2: 10.49
  }]],
  copy: [['rect', {
    width: 14,
    height: 14,
    x: 8,
    y: 8,
    rx: 2,
    ry: 2
  }], P('M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2')],
  check: [P('M20 6 9 17l-5-5')],
  'shield-check': [P('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'), P('m9 12 2 2 4-4')],
  'arrow-left': [P('m12 19-7-7 7-7'), P('M19 12H5')],
  'arrow-right': [P('M5 12h14'), P('m12 5 7 7-7 7')],
  'arrow-up-right': [P('M7 7h10v10'), P('M7 17 17 7')],
  'arrow-up-down': [P('m21 16-4 4-4-4'), P('M17 20V4'), P('m3 8 4-4 4 4'), P('M7 4v16')],
  'layout-grid': [['rect', {
    width: 7,
    height: 7,
    x: 3,
    y: 3,
    rx: 1
  }], ['rect', {
    width: 7,
    height: 7,
    x: 14,
    y: 3,
    rx: 1
  }], ['rect', {
    width: 7,
    height: 7,
    x: 14,
    y: 14,
    rx: 1
  }], ['rect', {
    width: 7,
    height: 7,
    x: 3,
    y: 14,
    rx: 1
  }]],
  'list-filter': [P('M3 6h18'), P('M7 12h10'), P('M10 18h4')],
  dices: [['rect', {
    width: 12,
    height: 12,
    x: 2,
    y: 10,
    rx: 2,
    ry: 2
  }], P('m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6'), P('M6 18h.01'), P('M10 14h.01'), P('M15 6h.01'), P('M18 9h.01')],
  bookmark: [P('m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z')],
  'bookmark-check': [P('m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z'), P('m9 10 2 2 4-4')],
  star: [['polygon', {
    points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
  }]],
  'log-in': [P('M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4'), ['polyline', {
    points: '10 17 15 12 10 7'
  }], ['line', {
    x1: 15,
    x2: 3,
    y1: 12,
    y2: 12
  }]],
  'log-out': [P('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'), ['polyline', {
    points: '16 17 21 12 16 7'
  }], ['line', {
    x1: 21,
    x2: 9,
    y1: 12,
    y2: 12
  }]],
  users: [P('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'), ['circle', {
    cx: 9,
    cy: 7,
    r: 4
  }], P('M22 21v-2a4 4 0 0 0-3-3.87'), P('M16 3.13a4 4 0 0 1 0 7.75')],
  'volume-2': [['polygon', {
    points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5'
  }], P('M15.54 8.46a5 5 0 0 1 0 7.07'), P('M19.07 4.93a10 10 0 0 1 0 14.14')],
  'external-link': [P('M15 3h6v6'), P('M10 14 21 3'), P('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6')],
  'check-circle-2': [['circle', {
    cx: 12,
    cy: 12,
    r: 10
  }], P('m9 12 2 2 4-4')],
  'x-circle': [['circle', {
    cx: 12,
    cy: 12,
    r: 10
  }], P('m15 9-6 6'), P('m9 9 6 6')],
  'message-square': [P('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')],
  pencil: [P('M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'), P('m15 5 4 4')],
  bell: [P('M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9'), P('M10.3 21a1.94 1.94 0 0 0 3.4 0')],
  sparkles: [P('M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'), P('M20 3v4'), P('M22 5h-4'), P('M4 17v2'), P('M5 18H3')],
  thermometer: [P('M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z')],
  'sliders-horizontal': [['line', {
    x1: 21,
    x2: 14,
    y1: 4,
    y2: 4
  }], ['line', {
    x1: 10,
    x2: 3,
    y1: 4,
    y2: 4
  }], ['line', {
    x1: 21,
    x2: 12,
    y1: 12,
    y2: 12
  }], ['line', {
    x1: 8,
    x2: 3,
    y1: 12,
    y2: 12
  }], ['line', {
    x1: 21,
    x2: 16,
    y1: 20,
    y2: 20
  }], ['line', {
    x1: 12,
    x2: 3,
    y1: 20,
    y2: 20
  }], ['line', {
    x1: 14,
    x2: 14,
    y1: 2,
    y2: 6
  }], ['line', {
    x1: 8,
    x2: 8,
    y1: 10,
    y2: 14
  }], ['line', {
    x1: 16,
    x2: 16,
    y1: 18,
    y2: 22
  }]],
  'shield-alert': [P('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'), P('M12 8v4'), P('M12 16h.01')],
  scale: [P('m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z'), P('m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z'), P('M7 21h10'), P('M12 3v18'), P('M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2')]
};
/** Lucide icon (24x24, stroke 2, round caps) - the generic UI icon set. size in px; color via CSS color. */
function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  className = '',
  style,
  fill = 'none',
  ...rest
}) {
  const nodes = LUCIDE[name];
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      flexShrink: 0,
      display: 'inline-block',
      ...style
    },
    "aria-hidden": "true"
  }, rest), nodes ? nodes.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })) : /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18"
  }));
}
Object.assign(__ds_scope, { LUCIDE, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mono, uppercase, tracked button. Variants map to the codebase's repeated class combos: ink (bg-ink > hover:bg-accent), accent (> accent-dark), outline (hairline > hover:border-ink), card, paper, ghost, caution, inset. Square corners by default; rounded=4px on home-page controls. */
function Button({
  variant = 'ink',
  size = 'md',
  rounded = false,
  icon,
  iconRight,
  iconSize,
  children,
  className = '',
  href,
  as,
  iconOnly = false,
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'button');
  const cls = ['mi-btn', 'mi-btn--' + variant, 'mi-btn--' + size, rounded ? 'mi-btn--rounded' : '', iconOnly ? 'mi-btn--icon' : '', className].filter(Boolean).join(' ');
  const isz = iconSize || (size === 'sm' ? 12 : 14);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    href: href,
    type: Tag === 'button' ? rest.type || 'button' : undefined
  }, rest), icon && (typeof icon === 'string' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: isz
  }) : icon), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && (typeof iconRight === 'string' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: isz
  }) : iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Kbd.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Keyboard hint chip (cmd-K, LIVE). */
function Kbd({
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("kbd", _extends({
    className: 'mi-kbd ' + className
  }, rest), children);
}
Object.assign(__ds_scope, { Kbd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kbd.jsx", error: String((e && e.message) || e) }); }

// components/core/LeanIcon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Resolve the design-system root from the linked styles.css or the loaded bundle. */
function dsRoot() {
  if (typeof document === 'undefined') return '';
  const link = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(l => /styles\.css(\?|$)/.test(l.getAttribute('href') || ''));
  const script = Array.from(document.querySelectorAll('script[src]')).find(s => /_ds_bundle\.js(\?|$)/.test(s.getAttribute('src') || ''));
  const href = link && link.getAttribute('href') || script && script.getAttribute('src') || '';
  return href.replace(/[^/]*$/, '');
}
const LEAN_ICONS = ['appliance-air-fryer', 'appliance-grill', 'appliance-instant-pot', 'appliance-sheet-pan', 'appliance-skillet', 'appliance-slow-cooker', 'appliance-smoker', 'clock', 'flame', 'flip-action', 'fork-knife', 'fork', 'heat-waves', 'lightning-fast', 'oil-spray', 'pan-heat', 'portion-plate', 'protein-all', 'protein-beef', 'protein-chicken', 'protein-dairy-eggs', 'protein-lamb', 'protein-pork', 'protein-seafood', 'protein-turkey', 'protein-vegetarian', 'rest-time', 'safety-shield', 'scale-weight', 'thermometer-probe', 'timer-stopwatch'];
const ALIASES = {
  chicken: 'protein-chicken',
  beef: 'protein-beef',
  pork: 'protein-pork',
  seafood: 'protein-seafood',
  fish: 'protein-seafood',
  turkey: 'protein-turkey',
  lamb: 'protein-lamb',
  vegetarian: 'protein-vegetarian',
  'dairy-eggs': 'protein-dairy-eggs',
  all: 'protein-all',
  'air-fryer': 'appliance-air-fryer',
  grill: 'appliance-grill',
  'instant-pot': 'appliance-instant-pot',
  'sheet-pan': 'appliance-sheet-pan',
  skillet: 'appliance-skillet',
  'cast-iron': 'appliance-skillet',
  'slow-cooker': 'appliance-slow-cooker',
  smoker: 'appliance-smoker',
  oven: 'appliance-sheet-pan',
  'dutch-oven': 'appliance-slow-cooker',
  time: 'clock',
  temp: 'heat-waves',
  protein: 'fork',
  probe: 'thermometer-probe',
  flip: 'flip-action',
  rest: 'rest-time',
  spray: 'oil-spray',
  scale: 'scale-weight',
  safety: 'safety-shield',
  speed: 'lightning-fast',
  stopwatch: 'timer-stopwatch',
  utensils: 'fork-knife',
  plate: 'portion-plate'
};
/** Lean 5S brand icon (28x28 stroke glyph from assets/icons/lean5s). Rendered as a CSS mask so it inherits currentColor. */
function LeanIcon({
  name,
  size = 24,
  className = '',
  style,
  base,
  title,
  ...rest
}) {
  const file = ALIASES[name] || name;
  const root = base != null ? base : dsRoot();
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": title || file,
    className: 'lean-icon ' + className,
    style: {
      width: size,
      height: size,
      ['--icon']: 'url(' + root + 'assets/icons/lean5s/' + file + '.svg)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { dsRoot, LEAN_ICONS, LeanIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LeanIcon.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
const DIM = {
  sm: 24,
  md: 32,
  lg: 44,
  xl: 64
};
const TXT = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24
};
/** Meal Instructions lockup - architectural M + gauge-needle I mark with wordmark and tagline (components/Logo.tsx). */
function Logo({
  size = 'md',
  variant = 'horizontal',
  inverse = false,
  className = '',
  style
}) {
  const d = DIM[size] || 32;
  const ink = inverse ? 'var(--paper)' : 'var(--ink)';
  return /*#__PURE__*/React.createElement("div", {
    className: 'mi-logo ' + className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: d,
    height: d,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      flexShrink: 0
    },
    "aria-label": "Meal Instructions"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "48",
    height: "48",
    rx: "8",
    fill: "#111111"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "47",
    height: "47",
    rx: "7.5",
    stroke: "#262626",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 36V14L19 25L28 14V36",
    stroke: "#F5F4F0",
    strokeWidth: "3.5",
    strokeLinecap: "square",
    strokeLinejoin: "miter"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "36.5",
    y1: "14",
    x2: "36.5",
    y2: "36",
    stroke: "#F5F4F0",
    strokeWidth: "3.5",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "36.5",
    cy: "14",
    r: "2.5",
    fill: "#EA580C"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "24",
    x2: "6.5",
    y2: "24",
    stroke: "#404040",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "41.5",
    y1: "24",
    x2: "44",
    y2: "24",
    stroke: "#404040",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "24",
    y1: "4",
    x2: "24",
    y2: "6.5",
    stroke: "#404040",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "24",
    y1: "41.5",
    x2: "24",
    y2: "44",
    stroke: "#404040",
    strokeWidth: "1"
  })), variant !== 'mark-only' && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: variant === 'stacked' ? 'center' : 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-sans)',
      fontWeight: 900,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: ink,
      lineHeight: 1.25,
      fontSize: TXT[size] || 16
    }
  }, "MEAL INSTRUCTIONS"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-mono)',
      fontSize: size === 'sm' ? 8 : 9,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: inverse ? 'var(--neutral-400)' : 'var(--ink-muted)',
      marginTop: -2
    }
  }, "NO FLUFF, JUST THE INSTRUCTIONS")));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** bg-paper-card + hairline box. Square/no shadow on recipe pages; rounded+shadow on home. dark = ink manifesto strip. verified = emerald 2px left rule. */
function Panel({
  variant = 'card',
  padding = 'lg',
  rounded = false,
  shadow = false,
  hover = false,
  verified = false,
  as = 'div',
  className = '',
  children,
  style,
  ...rest
}) {
  const Tag = as;
  const pad = {
    none: '',
    sm: 'mi-panel--sm',
    md: 'mi-panel--md',
    lg: '',
    xl: 'mi-panel--lg'
  }[padding] || '';
  const cls = ['mi-panel', variant !== 'card' ? 'mi-panel--' + variant : '', pad, rounded === true ? 'mi-panel--rounded' : rounded === 'lg' ? 'mi-panel--rounded-lg' : '', shadow === true ? 'mi-panel--shadow' : shadow === 'float' ? 'mi-panel--float' : '', hover ? 'mi-panel--hover' : '', verified ? 'mi-panel--verified' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    style: {
      ...(padding === 'none' ? {
        padding: 0
      } : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mono uppercase tag/badge: px-2 py-0.5, 10px (xs=9px), hairline border. Variants for ink/accent/verified/info/caution states. */
function Pill({
  variant = 'outline',
  size = 'md',
  rounded = false,
  bold = false,
  icon,
  children,
  className = '',
  href,
  as,
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'span');
  const cls = ['mi-pill', variant !== 'outline' ? 'mi-pill--' + variant : '', size === 'xs' ? 'mi-pill--xs' : '', rounded ? 'mi-pill--rounded' : '', bold ? 'mi-pill--bold' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    href: href
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/core/Segmented.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle group. pill (default): bg-paper-200 p-0.5 rounded, active = bg-ink. square: recipe mode selector (2-col grid, bg-paper, 10x16 padding). hairline: portion multiplier (separate hairline boxes). */
function Segmented({
  options,
  value,
  onChange,
  variant = 'pill',
  icon = false,
  className = '',
  ...rest
}) {
  const cls = ['mi-seg', variant === 'square' ? 'mi-seg--square' : variant === 'hairline' ? 'mi-seg--hairline' : '', icon ? 'mi-seg--icon' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "tablist"
  }, rest), options.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.value),
      type: "button",
      role: "tab",
      "aria-selected": active,
      title: o.title,
      onClick: () => onChange && onChange(o.value),
      className: 'mi-seg__btn' + (active ? ' is-active' : '')
    }, o.icon, o.label, o.note && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 400,
        opacity: 0.7
      }
    }, o.note));
  }));
}
Object.assign(__ds_scope, { Segmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Segmented.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusDot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 6px round dot (8px lg). accent pulsing = live section kicker; verified/live = ticker & difficulty; ping = running timer. */
function StatusDot({
  color = 'accent',
  pulse = false,
  ping = false,
  size = 'md',
  className = '',
  style,
  ...rest
}) {
  const cls = ['mi-dot', color !== 'accent' ? 'mi-dot--' + color : '', size === 'lg' ? 'mi-dot--lg' : '', pulse ? 'animate-pulse' : '', ping ? 'animate-ping' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: style
  }, rest));
}
Object.assign(__ds_scope, { StatusDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusDot.jsx", error: String((e && e.message) || e) }); }

// components/core/MicroLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** .micro-label - 10px mono, 0.14em tracking, uppercase, 600. Section kicker with optional pulsing dot and trailing note. */
function MicroLabel({
  children,
  color,
  dot,
  pulse = true,
  note,
  as = 'div',
  className = '',
  style,
  ...rest
}) {
  const Tag = as;
  const c = color === 'accent' ? 'var(--accent)' : color === 'ink' ? 'var(--ink)' : color === 'subtle' ? 'var(--ink-subtle)' : color || undefined;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: 'micro-label ' + className,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: note ? 'space-between' : 'flex-start',
      gap: 8,
      color: c,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, dot && /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    color: dot === true ? 'accent' : dot,
    pulse: pulse
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: dot ? 700 : undefined
    }
  }, children)), note && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-subtle)',
      fontWeight: 400
    }
  }, note));
}
Object.assign(__ds_scope, { MicroLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MicroLabel.jsx", error: String((e && e.message) || e) }); }

// components/discovery/CategoryGrid.jsx
try { (() => {
/** BROWSE BY INTENT & HARDWARE: 6-col grid of image tiles (96–112px photo, ink bottom gradient, "n Meals" pill, uppercase name, mono heroTag). */
function CategoryGrid({
  categories = [],
  selected,
  onSelect,
  counts = {},
  imageBase = '',
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, minmax(0,1fr))',
      gap: 12,
      ...style
    }
  }, categories.map(c => {
    const n = counts[c.slug] != null ? counts[c.slug] : c.count || 0;
    const on = selected === c.slug;
    const img = c.image ? /^https?:/.test(c.image) ? c.image : imageBase + c.image : null;
    return /*#__PURE__*/React.createElement("div", {
      key: c.slug,
      onClick: () => onSelect && onSelect(on ? 'all' : c.slug),
      className: 'mi-tile mi-tile--ring' + (on ? ' is-active' : ''),
      style: {
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer'
      }
    }, img ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        height: 112,
        overflow: 'hidden',
        background: 'var(--paper-200)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: img,
      alt: c.name,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        transition: 'transform .3s'
      },
      className: "mi-cat-img"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(17,17,17,.7), rgba(17,17,17,.2), transparent)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        fontSize: 9,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: 'var(--paper)',
        background: 'rgba(17,17,17,.8)',
        padding: '2px 6px',
        borderRadius: 4
      }
    }, n, " ", n === 1 ? 'Meal' : 'Meals')) : /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: 96,
        background: 'var(--paper-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--ink-muted)',
        textTransform: 'uppercase'
      }
    }, n, " Meals"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("h4", {
      className: "mi-tile__title",
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--ink)',
        lineHeight: 1.25,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, c.name.replace(' Staples', '').replace(' Meals', '')), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 10,
        color: 'var(--ink-muted)',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, c.heroTag)));
  }));
}
Object.assign(__ds_scope, { CategoryGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/CategoryGrid.jsx", error: String((e && e.message) || e) }); }

// components/discovery/CrisisTriageBar.jsx
try { (() => {
const CRISIS_PRESETS = [{
  id: 'no-thaw',
  title: 'Forgot To Thaw',
  subtitle: 'Cook direct from frozen',
  category: 'no-thaw'
}, {
  id: 'sub-15',
  title: 'Sub-15 Min Rush',
  subtitle: 'Dinner before meltdown',
  maxMinutes: 15
}, {
  id: 'picky-kids',
  title: 'Picky Eater Proof',
  subtitle: 'Zero table negotiation',
  category: 'kid-approved'
}, {
  id: 'one-pan',
  title: 'Zero Dish Duty',
  subtitle: 'Sheet pan & 1-skillet only',
  category: 'one-pan'
}, {
  id: 'high-protein',
  title: 'High Protein (30g+)',
  subtitle: 'Pure muscle & satiety',
  category: 'high-protein'
}, {
  id: 'budget',
  title: 'Under $12 Budget',
  subtitle: 'Pantry staple savings',
  category: 'budget'
}];
/** DINNER CRISIS TRIAGE band: six "PRESET // 0n" tiles with count badge, uppercase sans title and mono subtitle. Active = bg-ink. */
function CrisisTriageBar({
  activePreset = null,
  onSelectPreset,
  presets = CRISIS_PRESETS,
  counts = {},
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: '100%',
      background: 'var(--paper-100)',
      borderBottom: '1px solid var(--hairline)',
      padding: '12px 32px',
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "ink",
    dot: true,
    pulse: false
  }, "DINNER CRISIS TRIAGE ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(90,88,84,.7)',
      fontWeight: 400,
      marginLeft: 8
    }
  }, "\u2014 SELECT YOUR IMMEDIATE SITUATION")), activePreset && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onSelectPreset && onSelectPreset(null),
    className: "mi-hover-underline",
    style: {
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      color: 'var(--accent)',
      textTransform: 'uppercase',
      background: 'none',
      border: 0,
      cursor: 'pointer'
    }
  }, "Reset Triage")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, minmax(0,1fr))',
      gap: 8,
      fontFamily: 'var(--font-mono)'
    }
  }, presets.map((p, i) => {
    const on = activePreset === p.id;
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      type: "button",
      onClick: () => onSelectPreset && onSelectPreset(on ? null : p),
      className: 'mi-tile mi-tile--rounded mi-tile--ring' + (on ? ' is-active' : ''),
      style: {
        padding: 10,
        textAlign: 'left',
        background: on ? 'var(--ink)' : 'var(--paper-50)',
        color: on ? 'var(--paper)' : 'var(--ink)',
        borderColor: on ? 'var(--ink)' : undefined,
        boxShadow: on ? 'var(--shadow-sm)' : 'none',
        fontFamily: 'inherit'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: on ? 'var(--accent)' : 'var(--ink-subtle)'
      }
    }, "PRESET // 0", i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: '0 6px',
        borderRadius: 4,
        background: on ? 'var(--accent)' : 'var(--paper-200)',
        color: on ? '#fff' : 'var(--ink-muted)'
      }
    }, counts[p.id] != null ? counts[p.id] : '')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "mi-tile__title",
      style: {
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, p.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: on ? 'rgba(245,244,240,.7)' : 'var(--ink-muted)'
      }
    }, p.subtitle)));
  }))));
}
Object.assign(__ds_scope, { CRISIS_PRESETS, CrisisTriageBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/CrisisTriageBar.jsx", error: String((e && e.message) || e) }); }

// components/discovery/KitchenHud.jsx
try { (() => {
const {
  useMemo,
  useState
} = React;
/** PRECISION KITCHEN HUD / "The 5-Second Cook-Time Terminal": omni-search (2px ink border), TOP QUERIES pills, and the active datasheet read-out with 5 telemetry cells. */
function KitchenHud({
  datasheets = [],
  recipes = [],
  presets,
  activeSlug,
  onActiveChange,
  onOpenRecipe,
  onOpenDatasheet,
  datasheetCount,
  recipeCount,
  style,
  className = ''
}) {
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [slug, setSlug] = useState(activeSlug || datasheets[0] && datasheets[0].slug);
  const active = datasheets.find(d => d.slug === (activeSlug || slug)) || datasheets[0];
  const pick = s => {
    setSlug(s);
    onActiveChange && onActiveChange(s);
    setFocus(false);
  };
  const top = presets || datasheets.slice(0, 8).map(d => ({
    label: d.food,
    slug: d.slug
  }));
  const res = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return {
      ds: [],
      rc: []
    };
    return {
      ds: datasheets.filter(d => (d.food + ' ' + d.appliance + ' ' + d.state).toLowerCase().includes(s)).slice(0, 5),
      rc: recipes.filter(r => (r.title + ' ' + r.protein + ' ' + r.appliance).toLowerCase().includes(s)).slice(0, 5)
    };
  }, [q, datasheets, recipes]);
  const cell = (label, icon, iconColor, big, sub, bigColor, span) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      padding: 12,
      borderRadius: 4,
      border: '1px solid var(--hairline)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gridColumn: span
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'var(--ink-subtle)',
      fontSize: 10,
      textTransform: 'uppercase',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
    name: icon,
    size: 16,
    style: {
      color: iconColor
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '4px 0',
      fontSize: 20,
      fontWeight: 900,
      color: bigColor || 'var(--ink)'
    }
  }, big), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--ink-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, sub));
  if (!active) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: '100%',
      background: 'var(--paper)',
      borderBottom: '1px solid var(--hairline)',
      padding: '24px 32px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "ink",
    dot: true,
    style: {
      letterSpacing: '.14em'
    }
  }, "PRECISION KITCHEN HUD ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(90,88,84,.7)',
      fontWeight: 400,
      marginLeft: 8
    }
  }, "\u2014 INSTANT TEMPERATURE, TIME & SAFETY LOOKUP")), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '2px 0 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 24,
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '-.01em',
      color: 'var(--ink)'
    }
  }, "The 5-Second Cook-Time Terminal")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    variant: "inset",
    rounded: true,
    bold: true,
    style: {
      background: 'var(--paper-100)',
      fontSize: 11,
      textTransform: 'uppercase'
    }
  }, datasheetCount || datasheets.length, " USDA DATASHEETS"), /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    variant: "inset",
    rounded: true,
    bold: true,
    style: {
      background: 'var(--paper-100)',
      fontSize: 11
    }
  }, recipeCount || recipes.length, " MEALS"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: 'var(--paper-50)',
      border: '2px solid var(--ink)',
      borderRadius: 4,
      boxShadow: 'var(--shadow-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 8px 0 16px',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 20,
    style: {
      color: 'var(--accent)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: q,
    onChange: e => setQ(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setTimeout(() => setFocus(false), 150),
    placeholder: "Instant food lookup: type 'chicken breast', 'salmon', 'frozen burger', 'bacon', 'wings'...",
    className: "mi-input mi-input--bare",
    style: {
      padding: '12px 40px 12px 0',
      fontFamily: 'var(--font-mono)',
      fontSize: 14
    }
  }), q && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mi-icon-btn",
    onClick: () => setQ(''),
    style: {
      marginRight: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      paddingRight: 12,
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "LIVE"), /*#__PURE__*/React.createElement("span", null, "LOOKUP"))), focus && q.trim().length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 4,
      background: 'var(--paper)',
      border: '2px solid var(--ink)',
      borderRadius: 4,
      boxShadow: 'var(--shadow-float)',
      zIndex: 50,
      maxHeight: 384,
      overflowY: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, res.ds.length || res.rc.length ? /*#__PURE__*/React.createElement(React.Fragment, null, res.ds.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 8px',
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--accent)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "VERIFIED COOK-TIME DATASHEETS"), /*#__PURE__*/React.createElement("span", null, res.ds.length, " MATCHES")), res.ds.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.slug,
    onMouseDown: () => pick(d.slug),
    className: "mi-hud-result"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    variant: "ink",
    size: "xs",
    rounded: true
  }, d.appliance), /*#__PURE__*/React.createElement("span", {
    className: "mi-row__t",
    style: {
      fontWeight: 700,
      color: 'var(--ink)'
    }
  }, d.food), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase'
    }
  }, "(", d.state, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, String(d.tempFormatted).split(' ')[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-muted)'
    }
  }, d.timeFormatted), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--accent)',
      fontWeight: 700
    }
  }, "LOAD \u2192"))))), res.rc.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 8,
      background: 'var(--paper-50)',
      borderTop: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 8px',
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "MATCHING WEEKNIGHT RECIPES"), /*#__PURE__*/React.createElement("span", null, res.rc.length, " MATCHES")), res.rc.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.slug,
    href: '#/recipes/' + r.slug,
    onMouseDown: e => {
      if (onOpenRecipe) {
        e.preventDefault();
        onOpenRecipe(r);
      }
    },
    className: "mi-hud-result"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    variant: "inset",
    size: "xs",
    rounded: true,
    bold: true,
    style: {
      background: 'var(--paper-300)',
      border: 0
    }
  }, "RECIPE"), /*#__PURE__*/React.createElement("span", {
    className: "mi-row__t",
    style: {
      fontWeight: 700,
      color: 'var(--ink)',
      fontFamily: 'var(--font-sans)'
    }
  }, r.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, r.totalMinutes, " MIN"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--accent)',
      fontWeight: 700
    }
  }, "VIEW \u2192")))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      textAlign: 'center',
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 700
    }
  }, "No exact match for \"", q, "\""), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 11,
      color: 'var(--ink-subtle)'
    }
  }, "Try searching by ingredient (e.g. 'chicken', 'beef', 'salmon') or appliance.")))), /*#__PURE__*/React.createElement("div", {
    className: "scrollbar-none",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      overflowX: 'auto',
      paddingBottom: 4,
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '.08em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      color: 'var(--ink-subtle)',
      fontWeight: 700,
      marginRight: 4
    }
  }, "TOP QUERIES:"), top.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.slug,
    type: "button",
    onClick: () => pick(p.slug),
    className: 'mi-chip mi-chip--accent' + (active.slug === p.slug ? ' is-active' : ''),
    style: {
      padding: '4px 10px',
      flexShrink: 0
    }
  }, p.label))), /*#__PURE__*/React.createElement("div", {
    className: "mi-panel--hover",
    style: {
      background: 'var(--paper-100)',
      border: '2px solid var(--hairline)',
      borderRadius: 8,
      padding: 24,
      boxShadow: 'var(--shadow-subtle)',
      transition: 'border-color .2s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      borderBottom: '1px solid var(--hairline)',
      paddingBottom: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    variant: "ink",
    size: "xs",
    rounded: true,
    style: {
      letterSpacing: '.08em'
    }
  }, active.appliance.replace('-', ' ')), /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    variant: "inset",
    size: "xs",
    rounded: true,
    bold: true
  }, "STATE: ", String(active.state).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--ink-subtle)'
    }
  }, "REF ID: ", active.id)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 24,
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '-.01em',
      color: 'var(--ink)'
    }
  }, active.food), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 12,
      color: 'var(--ink-muted)'
    }
  }, active.cutOrPrep)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0
    }
  }, active.relatedRecipeSlug && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ink",
    rounded: true,
    iconRight: "arrow-right",
    onClick: () => onOpenRecipe && onOpenRecipe(recipes.find(r => r.slug === active.relatedRecipeSlug) || {
      slug: active.relatedRecipeSlug
    }),
    style: {
      padding: '6px 14px'
    }
  }, "Cook Recipe"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "card",
    rounded: true,
    iconRight: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "external-link",
      size: 12,
      style: {
        color: 'var(--ink-muted)'
      }
    }),
    onClick: () => onOpenDatasheet && onOpenDatasheet(active)
  }, "Full Datasheet"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(0,1fr))',
      gap: 12,
      fontFamily: 'var(--font-mono)'
    }
  }, cell('COOK TEMP', 'heat-waves', 'var(--accent)', String(active.tempFormatted).split(' ')[0], (active.tempC || '') + '°C CONVECTION'), cell('TOTAL TIME', 'clock', 'var(--ink-muted)', active.timeFormatted, (active.timeMinMinutes || '') + '–' + (active.timeMaxMinutes || '') + ' MIN RANGE'), cell('MIDPOINT FLIP', 'flip-action', 'var(--accent)', active.flipAtMinutes > 0 ? '@ ' + active.flipAtMinutes + 'm' : 'No Flip', active.flipAtMinutes > 0 ? 'SHAKE / TURN OVER' : 'SINGLE SIDE COOK'), cell('INTERNAL TARGET', 'thermometer-probe', 'var(--accent)', active.internalTempTargetF > 0 ? active.internalTempTargetF + '°F' : 'Visual Cue', active.internalTempTargetFormatted || 'Check doneness cue', 'var(--accent)'), cell('REST & SPRAY', 'timer-stopwatch', 'var(--ink-muted)', (active.restMinutes || 0) + 'm REST', 'OIL SPRAY: ' + (active.oilSprayRequired ? 'REQUIRED' : 'NONE'))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid rgba(223,220,206,.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    variant: "inset",
    size: "xs",
    rounded: true,
    bold: true,
    style: {
      border: 0,
      letterSpacing: 0
    }
  }, "DONENESS CUE"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-muted)',
      fontWeight: 500
    }
  }, active.donenessCue)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink-subtle)',
      flexShrink: 0,
      maxWidth: 360,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "BASIS: ", active.verificationBasis)))));
}
Object.assign(__ds_scope, { KitchenHud });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/KitchenHud.jsx", error: String((e && e.message) || e) }); }

// components/discovery/ProteinSelectorBar.jsx
try { (() => {
const PROTEIN_OPTIONS = [{
  slug: 'all',
  label: 'All Cuts',
  sublabel: 'Complete Index'
}, {
  slug: 'chicken',
  label: 'Chicken',
  sublabel: 'Poultry'
}, {
  slug: 'beef',
  label: 'Beef',
  sublabel: 'Steaks & Ground'
}, {
  slug: 'pork',
  label: 'Pork',
  sublabel: 'Chops & Bacon'
}, {
  slug: 'seafood',
  label: 'Seafood',
  sublabel: 'Fish & Shrimp'
}, {
  slug: 'turkey',
  label: 'Turkey',
  sublabel: 'Lean Poultry'
}, {
  slug: 'lamb',
  label: 'Lamb',
  sublabel: 'Chops & Roasts'
}, {
  slug: 'vegetarian',
  label: 'Plant / Veg',
  sublabel: 'Meatless'
}, {
  slug: 'dairy-eggs',
  label: 'Dairy & Eggs',
  sublabel: 'Fast Skillets'
}];
/** PRIMARY PROTEIN SELECTOR band: horizontal row of "tactile specimen" buttons (Lean 5S glyph, label, count badge, sublabel). Active = bg-ink with accent icon/count. */
function ProteinSelectorBar({
  selected = 'all',
  onSelect,
  counts = {},
  total,
  options = PROTEIN_OPTIONS,
  style,
  className = ''
}) {
  const all = total != null ? total : Object.values(counts).reduce((a, b) => a + b, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: 'hairline-b ' + className,
    style: {
      width: '100%',
      background: 'var(--paper)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '12px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "ink",
    dot: true,
    style: {
      letterSpacing: '.14em'
    }
  }, "PRIMARY PROTEIN SELECTOR ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(90,88,84,.6)',
      fontWeight: 400,
      marginLeft: 8
    }
  }, "\u2014 FILTER BY WHAT'S IN YOUR FRIDGE")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      color: 'var(--ink-muted)'
    }
  }, selected === 'all' ? 'SHOWING ALL ' + all + ' MEALS' : 'FILTERED: ' + selected.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    className: "scrollbar-none",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 6,
      paddingTop: 2
    }
  }, options.map(o => {
    const on = selected === o.slug;
    const c = o.slug === 'all' ? all : counts[o.slug] || 0;
    if (!c && o.slug !== 'all') return null;
    return /*#__PURE__*/React.createElement("button", {
      key: o.slug,
      type: "button",
      title: 'Filter recipes by ' + o.label,
      onClick: () => onSelect && onSelect(on && o.slug !== 'all' ? 'all' : o.slug),
      className: 'mi-chip mi-chip--card' + (on ? ' is-active' : ''),
      style: {
        padding: '8px 12px',
        gap: 10,
        flexShrink: 0,
        textTransform: 'none',
        letterSpacing: 0,
        fontWeight: 400,
        boxShadow: on ? '0 0 0 1px var(--ink), var(--shadow-sm)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        padding: 4,
        borderRadius: 4,
        display: 'flex',
        color: on ? 'var(--accent)' : 'var(--ink-muted)',
        background: on ? 'rgba(245,244,240,.1)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
      name: o.slug,
      size: 20
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        whiteSpace: 'nowrap'
      }
    }, o.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: '0 4px',
        borderRadius: 4,
        background: on ? 'var(--accent)' : 'var(--paper-200)',
        color: on ? '#fff' : 'var(--ink-subtle)'
      }
    }, c)), o.sublabel && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        color: on ? 'rgba(245,244,240,.7)' : 'rgba(90,88,84,.7)'
      }
    }, o.sublabel)));
  }))));
}
Object.assign(__ds_scope, { PROTEIN_OPTIONS, ProteinSelectorBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/ProteinSelectorBar.jsx", error: String((e && e.message) || e) }); }

// components/discovery/RecipeScrubber.jsx
try { (() => {
const {
  useState
} = React;
const TIME_STOPS = [{
  value: 10,
  label: '10 MINS'
}, {
  value: 15,
  label: '15 MINS'
}, {
  value: 20,
  label: '20 MINS'
}, {
  value: 25,
  label: '25 MINS'
}, {
  value: 35,
  label: '35 MINS'
}, {
  value: null,
  label: 'ALL MEALS'
}];
const POS = {
  10: '10%',
  15: '30%',
  20: '50%',
  25: '68%',
  35: '83%'
};
/** TIME BUDGET ruler (components/RecipeScrubber.tsx): paper-100 band, 56px dotted-grid track with 6 tick stops and an accent needle. */
function RecipeScrubber({
  maxMinutes = null,
  onTimeChange,
  countFor = () => 0,
  sample,
  style,
  className = ''
}) {
  const [hover, setHover] = useState(undefined);
  const active = hover !== undefined ? hover : maxMinutes;
  const n = countFor(active);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: '100%',
      background: 'var(--paper-100)',
      borderTop: '1px solid var(--hairline)',
      borderBottom: '1px solid var(--hairline)',
      padding: '16px 32px',
      userSelect: 'none',
      boxShadow: 'var(--shadow-subtle)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hairline-border",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '2px 8px',
      background: 'var(--paper)',
      fontWeight: 700,
      color: 'var(--accent)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "TIME BUDGET:"), /*#__PURE__*/React.createElement("span", null, active ? '≤ ' + active + ' MINS' : 'ALL (SHOW ALL)')), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(17,17,17,.3)'
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, n, " ", n === 1 ? 'MEAL' : 'MEALS', " READY BEFORE MELTDOWN")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0,
      fontSize: 10,
      color: 'var(--ink-muted)'
    }
  }, sample && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-subtle)',
      maxWidth: 320,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "e.g. ", sample), maxMinutes !== null && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "rotate-ccw",
      size: 12
    }),
    onClick: () => onTimeChange && onTimeChange(null),
    style: {
      padding: '2px 8px',
      fontSize: 10,
      letterSpacing: '.14em'
    }
  }, "SHOW ALL"))), /*#__PURE__*/React.createElement("div", {
    onMouseLeave: () => setHover(undefined),
    className: "hairline-border",
    style: {
      position: 'relative',
      width: '100%',
      height: 56,
      background: 'rgba(236,233,225,.8)',
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: .1,
      backgroundImage: 'radial-gradient(#111 1px, transparent 1px)',
      backgroundSize: '8px 8px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center'
    }
  }, TIME_STOPS.map(s => {
    const c = countFor(s.value);
    return /*#__PURE__*/React.createElement("button", {
      key: String(s.value),
      type: "button",
      onMouseEnter: () => setHover(s.value),
      onClick: () => onTimeChange && onTimeChange(s.value),
      className: 'mi-tstop' + (maxMinutes === s.value ? ' is-selected' : '') + (hover === s.value ? ' is-hovered' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "mi-tstop__tick"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "mi-tstop__lbl"
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 9,
        color: 'var(--ink-subtle)',
        fontFamily: 'var(--font-sans)'
      }
    }, c, " ", c === 1 ? 'meal' : 'meals')), /*#__PURE__*/React.createElement("div", {
      className: "mi-tstop__tick mi-tstop__tick--b"
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: POS[active] || '95%',
      transform: 'translateX(-50%)',
      pointerEvents: 'none',
      transition: 'all .15s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      background: 'var(--accent)',
      transform: 'rotate(45deg)',
      marginTop: -4,
      boxShadow: 'var(--shadow-sm)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      flex: 1,
      background: 'var(--accent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      background: 'var(--accent)',
      transform: 'rotate(45deg)',
      marginBottom: -4,
      boxShadow: 'var(--shadow-sm)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 9,
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase',
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u26A1 5-10 MIN RAPID FLASH"), /*#__PURE__*/React.createElement("span", null, "\u23F1\uFE0F 15 MIN WEEKNIGHT SWEET SPOT"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD25 25-35 MIN FULL ROASTS"))));
}
Object.assign(__ds_scope, { TIME_STOPS, RecipeScrubber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/RecipeScrubber.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ConsentBanner.jsx
try { (() => {
const {
  useState
} = React;
/** Fixed bottom cookie-consent bar (Google Consent Mode v2): sentence-case sans copy + "Reject non-essential" outline / "Accept all" ink. */
function ConsentBanner({
  onDecide,
  fixed = true,
  style,
  className = ''
}) {
  const [state, setState] = useState('unset');
  if (state !== 'unset') return null;
  const pick = v => {
    setState(v);
    onDecide && onDecide(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Cookie consent",
    className: 'hairline-t ' + className,
    style: {
      position: fixed ? 'fixed' : 'relative',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'var(--paper-50)',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1024,
      margin: '0 auto',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: 'var(--ink)',
      lineHeight: 1.625
    }
  }, "We use cookies for essential site functions, aggregate analytics, and personalized advertising served by Google and its partners. You can accept all, reject non-essential, or read our ", /*#__PURE__*/React.createElement("a", {
    href: "#/privacy",
    style: {
      textDecoration: 'underline'
    }
  }, "Privacy Policy"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    onClick: () => pick('denied'),
    style: {
      fontSize: 11,
      padding: '8px 12px'
    }
  }, "Reject non-essential"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ink",
    onClick: () => pick('granted'),
    style: {
      fontSize: 11,
      padding: '8px 12px',
      fontWeight: 400
    }
  }, "Accept all"))));
}
Object.assign(__ds_scope, { ConsentBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ConsentBanner.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const L = ({
  href,
  children,
  v = '',
  onNavigate
}) => /*#__PURE__*/React.createElement("li", {
  style: {
    margin: 0
  }
}, /*#__PURE__*/React.createElement("a", {
  href: '#' + href,
  onClick: onNavigate ? e => {
    e.preventDefault();
    onNavigate(href);
  } : undefined,
  className: 'mi-footlink ' + v
}, children));
const UL = ({
  children
}) => /*#__PURE__*/React.createElement("ul", {
  style: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontSize: 12,
    fontFamily: 'var(--font-mono)'
  }
}, children);
/** Six-column paper-card footer (components/Footer.tsx): brand manifesto, Kitchen Engines, Browse by Category, Appliance Guides, AI & Machine Endpoints, Company & Legal + colophon bar. */
function Footer({
  categories = ['15-Minute Meals', 'High Protein / Lean', 'Kid & Toddler Approved', 'Budget & Pantry Staples', 'No-Thaw / From Frozen', 'One-Pan & Sheet Pan', 'Five-Ingredient Staples'],
  appliances = ['Air Fryer', 'Sheet Pan', 'Cast Iron'],
  datasheetCount = 603,
  onNavigate,
  style,
  className = ''
}) {
  const n = onNavigate;
  return /*#__PURE__*/React.createElement("footer", {
    className: 'hairline-t ' + className,
    style: {
      background: 'var(--paper-50)',
      marginTop: 80,
      color: 'var(--ink)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '64px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, minmax(0,1fr))',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/",
    onClick: n ? e => {
      e.preventDefault();
      n('/');
    } : undefined,
    style: {
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: "sm"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--ink-muted)',
      lineHeight: 1.625
    }
  }, "Engineered for busy cooks and parents. Instant directions, exact temps, and 20-word execution. No popups, no interstitials, no 12-paragraph essays about childhood summers. No fluff, just the instructions."), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/about",
    onClick: n ? e => {
      e.preventDefault();
      n('/about');
    } : undefined,
    className: "mi-opacity-link",
    style: {
      display: 'inline-block',
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      color: 'var(--ink)',
      borderBottom: '1px solid var(--ink)',
      textDecoration: 'none'
    }
  }, "Read The Zero-Fluff Manifesto \u2192"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "accent",
    style: {
      marginBottom: 16
    }
  }, "Kitchen Engines"), /*#__PURE__*/React.createElement(UL, null, /*#__PURE__*/React.createElement(L, {
    href: "/shop",
    v: "mi-footlink--accent",
    onNavigate: n
  }, "\uD83D\uDC55 Merch & Useless Tools (24 Specs)"), /*#__PURE__*/React.createElement(L, {
    href: "/tools",
    v: "mi-footlink--bold",
    onNavigate: n
  }, "\uD83D\uDEE0\uFE0F All Tools (30 Engines)"), [['/reheat', 'Takeout Revive'], ['/frozen-cook', 'Freezer Cook Matrix'], ['/dinner-sync', 'Dinner Sync Timer'], ['/meat-math', 'Meat Math Scaler'], ['/internal-temp', 'Thermometer Pull Guide'], ['/salt-math', 'Salt & Dry-Brine Math'], ['/kid-split', 'Picky Kid Deconstructor'], ['/troubleshoot', '5-Sec Dinner Rescue']].map(([h, t]) => /*#__PURE__*/React.createElement(L, {
    key: h,
    href: h,
    onNavigate: n
  }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "ink",
    style: {
      marginBottom: 16
    }
  }, "Browse by Category"), /*#__PURE__*/React.createElement(UL, null, categories.map(c => /*#__PURE__*/React.createElement(L, {
    key: c,
    href: '/categories/' + c.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    onNavigate: n
  }, c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "ink",
    style: {
      marginBottom: 16
    }
  }, "Appliance Guides"), /*#__PURE__*/React.createElement(UL, null, appliances.map(a => /*#__PURE__*/React.createElement(L, {
    key: a,
    href: '/appliances/' + a.toLowerCase().replace(/ /g, '-'),
    onNavigate: n
  }, a, " Guide")), /*#__PURE__*/React.createElement("li", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/how-long",
    onClick: n ? e => {
      e.preventDefault();
      n('/how-long');
    } : undefined,
    className: "mi-footlink mi-footlink--accent"
  }, "\uD83D\uDD25 All Cook Times (", datasheetCount, ")")), /*#__PURE__*/React.createElement(L, {
    href: "/cheat-sheet",
    v: "mi-footlink--accent",
    onNavigate: n
  }, "\u26A1 All-Appliance Cheatsheet"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "ink"
  }, "AI & Machine Endpoints"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--ink-muted)',
      lineHeight: 1.625
    }
  }, "Standardized AI scraper manifests for ChatGPT, Claude, and Perplexity:"), /*#__PURE__*/React.createElement(UL, null, /*#__PURE__*/React.createElement(L, {
    href: "/guides",
    v: "mi-footlink--bold",
    onNavigate: n
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'none'
    }
  }, "\uD83D\uDCDA Top 10 Guides (20)")), /*#__PURE__*/React.createElement(L, {
    href: "/blog",
    v: "mi-footlink--accent",
    onNavigate: n
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'none'
    }
  }, "\uD83D\uDD2C Field Guides (55)")), [['/llms.txt', '📄 /llms.txt (AI Index)'], ['/llms-full.txt', '📚 /llms-full.txt (Markdown)'], ['/.well-known/mcp/server-card.json', '🔌 MCP Server Card (AI Tools)'], ['/sitemap.xml', '🗺️ /sitemap.xml (Sitemap)'], ['/robots.txt', '🤖 /robots.txt']].map(([h, t]) => /*#__PURE__*/React.createElement(L, {
    key: h,
    href: h,
    v: "mi-footlink--ink",
    onNavigate: n
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'none'
    }
  }, t))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "ink",
    style: {
      marginBottom: 16
    }
  }, "Company & Legal"), /*#__PURE__*/React.createElement(UL, null, [['/about', 'About', 'mi-footlink--ink'], ['/contact', 'Contact', 'mi-footlink--ink'], ['/privacy', 'Privacy Policy', 'mi-footlink--ink'], ['/terms', 'Terms of Service', 'mi-footlink--ink'], ['/shipping', 'Shipping', ''], ['/refunds', 'Refunds & Returns', '']].map(([h, t, v]) => /*#__PURE__*/React.createElement(L, {
    key: h,
    href: h,
    v: v,
    onNavigate: n
  }, t))))), /*#__PURE__*/React.createElement("div", {
    className: "hairline-t",
    style: {
      marginTop: 48,
      paddingTop: 32,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink-subtle)',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 MEAL INSTRUCTIONS // ALL RECIPES VALIDATED WITH SCHEMA.ORG JSON-LD."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      textTransform: 'uppercase'
    }
  }, ['About', 'Contact', 'Privacy Policy', 'Terms'].map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: t
  }, i > 0 && /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "mi-hover-ink",
    style: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color .2s'
    }
  }, t)))))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
const {
  useState
} = React;
const NAV_LINKS = [{
  href: '/appliances/air-fryer',
  label: 'Air Fryer'
}, {
  href: '/categories/15-minute',
  label: '15-Minute Dinners'
}, {
  href: '/categories/high-protein',
  label: 'High Protein'
}, {
  href: '/categories/kid-approved',
  label: 'Kid Approved'
}, {
  href: '/blog',
  label: 'Field Guides'
}, {
  href: '/tools',
  label: 'Tools & Calcs'
}, {
  href: '/shop',
  label: 'Merch & Tools',
  badge: '24'
}, {
  href: '/how-long',
  label: 'Cook Times'
}, {
  href: '/storage',
  label: 'Food Storage'
}, {
  href: '/cheat-sheet',
  label: 'Temp Cheatsheet'
}];
/** Ink ticker ("228 VERIFIED MEALS · 603 USDA COOK-TIME DATASHEETS" + MANIFESTO / LLMS.TXT) over the sticky 64px paper/90 blurred header: Logo, mono uppercase nav, Search ⌘K, Sign in. */
function Navbar({
  recipeCount = 228,
  datasheetCount = 603,
  activeHref = '/',
  links = NAV_LINKS,
  onNavigate,
  onSearch,
  onSignIn,
  signedIn = false,
  sticky = true,
  showTicker = true,
  style,
  className = ''
}) {
  const [menu, setMenu] = useState(false);
  const nav = href => e => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, showTicker && /*#__PURE__*/React.createElement("div", {
    className: "hairline-b",
    style: {
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '6px 32px',
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '.08em',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    color: "live",
    pulse: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'uppercase',
      color: 'var(--neutral-300)'
    }
  }, recipeCount, " verified meals \xB7 ", datasheetCount, " USDA cook-time datasheets")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      color: 'var(--neutral-400)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/about",
    onClick: nav('/about'),
    className: "mi-ticker-link"
  }, "MANIFESTO"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("a", {
    href: "#/llms.txt",
    onClick: nav('/llms.txt'),
    className: "mi-ticker-link"
  }, "AI SCRAPER (LLMS.TXT)"))), /*#__PURE__*/React.createElement("header", {
    className: "hairline-b",
    style: {
      position: sticky ? 'sticky' : 'relative',
      top: 0,
      zIndex: 40,
      background: 'rgba(245,244,240,.9)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 32px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/",
    onClick: nav('/'),
    style: {
      display: 'inline-flex',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: "md"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      overflow: 'hidden'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: '#' + l.href,
    onClick: nav(l.href),
    className: 'mi-navlink' + (activeHref === l.href || l.href !== '/' && activeHref.startsWith(l.href) ? ' is-active' : ''),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, l.label), l.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      padding: '0 4px',
      background: 'var(--ink)',
      color: 'var(--paper)',
      fontWeight: 700
    }
  }, l.badge)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSearch,
    className: "mi-btn mi-btn--outline-muted",
    title: "Search recipes, cook times, and 50 field guides",
    style: {
      background: 'var(--paper-50)',
      padding: '6px 12px',
      fontSize: 12,
      textTransform: 'none',
      letterSpacing: 0,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 14,
    style: {
      color: 'var(--ink-subtle)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Search"), /*#__PURE__*/React.createElement(__ds_scope.Kbd, null, "\u2318K")), signedIn ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    size: "sm",
    icon: "bookmark",
    href: "#/account",
    onClick: nav('/account'),
    style: {
      fontWeight: 400,
      fontSize: 12,
      padding: '6px 10px',
      background: 'var(--paper-50)'
    },
    className: "mi-hover-accent"
  }, "Saved meals") : /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ink",
    icon: "log-in",
    onClick: onSignIn,
    style: {
      padding: '6px 12px'
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mi-icon-btn",
    "aria-label": "Toggle Menu",
    onClick: () => setMenu(!menu),
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: menu ? 'x' : 'menu',
    size: 20
  })))), menu && /*#__PURE__*/React.createElement("div", {
    className: "hairline-t hairline-b",
    style: {
      background: 'var(--paper-50)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '.08em'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: '#' + l.href,
    onClick: e => {
      setMenu(false);
      nav(l.href)(e);
    },
    className: "mi-hover-accent",
    style: {
      padding: '6px 0',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, l.label)))));
}
Object.assign(__ds_scope, { NAV_LINKS, Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SearchModal.jsx
try { (() => {
const {
  useEffect,
  useMemo,
  useRef,
  useState
} = React;
const QUICK = ['air fryer', 'maillard', 'chicken', 'dry brine', 'steak', 'salmon', 'storage', 'reverse sear'];
/** ⌘K global search dialog (components/SearchModal.tsx): ink/60 blurred scrim, 672px paper-card panel, quick tags, result rows (#ID / GUIDE / STORAGE badge, title, tagline, appliance chip, time), key-hint footer. */
function SearchModal({
  isOpen,
  onClose,
  items = [],
  onSelect,
  placeholder = 'Search recipes, cook times, and 50 science field guides (e.g. maillard, wings, salt, steak)...',
  inline = false
}) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setQ('');
      setSel(0);
      setTimeout(() => ref.current && ref.current.focus(), 50);
    }
  }, [isOpen]);
  const results = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return items.slice(0, 8);
    return items.filter(i => (i.title + ' ' + (i.subtitle || '') + ' ' + (i.badge || '') + ' ' + (i.keywords || []).join(' ')).toLowerCase().includes(s)).slice(0, 12);
  }, [q, items]);
  if (!isOpen) return null;
  const key = e => {
    if (e.key === 'Escape') onClose && onClose();else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel(p => (p + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel(p => (p - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter' && results[sel]) {
      onSelect && onSelect(results[sel]);
      onClose && onClose();
    }
  };
  const badgeStyle = t => t === 'guide' ? {
    background: 'var(--paper-200)',
    color: 'var(--accent)',
    borderColor: 'var(--accent-40)'
  } : t === 'storage' ? {
    background: 'var(--info-soft)',
    color: 'var(--info)',
    borderColor: 'var(--info-border)'
  } : {
    background: 'var(--paper)',
    color: 'var(--ink-subtle)',
    borderColor: 'var(--hairline)'
  };
  const panel = /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "hairline-border",
    style: {
      width: '100%',
      maxWidth: 672,
      background: 'var(--paper-50)',
      boxShadow: 'var(--shadow-float)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: inline ? 'none' : '80vh',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b",
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 16px',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 16,
    style: {
      color: 'var(--ink-muted)',
      marginRight: 12
    }
  }), /*#__PURE__*/React.createElement("input", {
    ref: ref,
    type: "text",
    placeholder: placeholder,
    value: q,
    onChange: e => {
      setQ(e.target.value);
      setSel(0);
    },
    onKeyDown: key,
    className: "mi-input mi-input--bare",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }), q && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mi-icon-btn",
    onClick: () => setQ('')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  }))), !q && /*#__PURE__*/React.createElement("div", {
    className: "hairline-b",
    style: {
      padding: '10px 16px',
      background: 'rgba(236,233,225,.5)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflowX: 'auto',
      fontSize: 11,
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase'
    }
  }, "Quick:"), QUICK.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    onClick: () => setQ(t),
    className: "mi-chip mi-chip--square",
    style: {
      padding: '2px 8px',
      fontSize: 11,
      borderRadius: 4
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto'
    }
  }, results.length ? results.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: it.type + '-' + it.id,
    href: it.href || '#',
    onClick: e => {
      if (onSelect) {
        e.preventDefault();
        onSelect(it);
      }
      onClose && onClose();
    },
    onMouseEnter: () => setSel(i),
    className: 'mi-result' + (sel === i ? ' is-selected' : ''),
    style: {
      borderTop: i ? '1px solid var(--hairline)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      fontWeight: 700,
      padding: '2px 6px',
      borderRadius: 4,
      border: '1px solid',
      textTransform: 'uppercase',
      ...badgeStyle(it.type)
    }
  }, it.type === 'guide' ? 'GUIDE' : it.type === 'storage' ? 'STORAGE' : '#' + it.id), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--ink)',
      fontFamily: 'var(--font-sans)'
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--ink-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 380
    }
  }, it.subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--ink-muted)'
    }
  }, it.badge && /*#__PURE__*/React.createElement("span", {
    className: "hairline-border",
    style: {
      padding: '2px 8px',
      background: 'var(--paper)',
      textTransform: 'uppercase',
      borderRadius: 4
    }
  }, it.badge), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 12,
    style: {
      color: 'var(--ink-subtle)'
    }
  }), it.time), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 14,
    style: {
      color: 'var(--ink-subtle)'
    }
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--ink-muted)'
    }
  }, "No results found matching \u201C", q, "\u201D.")), /*#__PURE__*/React.createElement("div", {
    className: "hairline-t",
    style: {
      padding: '8px 16px',
      background: 'var(--paper-200)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2191\u2193 to navigate"), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, "\u21B5 to select"), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, "ESC to close")), /*#__PURE__*/React.createElement("div", null, results.length, " RESULTS")));
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(17,17,17,.6)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 96,
      paddingLeft: 16,
      paddingRight: 16
    }
  }, panel);
}
Object.assign(__ds_scope, { SearchModal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SearchModal.jsx", error: String((e && e.message) || e) }); }

// components/recipe/KitchenTimer.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
/** Floating 288px kitchen timer (components/KitchenTimer.tsx): label + status dot, 48px countdown, accent progress bar, +1/+2/+5 MIN, START/PAUSE/RESUME + reset. fixed=false renders inline. */
function KitchenTimer({
  initialMinutes = 10,
  label = 'Air Fryer Timer',
  autoStart = false,
  onClose,
  fixed = true,
  className = '',
  style
}) {
  const [total, setTotal] = useState(initialMinutes * 60);
  const [left, setLeft] = useState(initialMinutes * 60);
  const [run, setRun] = useState(autoStart);
  const [done, setDone] = useState(false);
  useEffect(() => {
    setTotal(initialMinutes * 60);
    setLeft(initialMinutes * 60);
    setDone(false);
  }, [initialMinutes]);
  useEffect(() => {
    if (!run || left <= 0) return;
    const t = setInterval(() => setLeft(p => {
      if (p <= 1) {
        setRun(false);
        setDone(true);
        chime();
        return 0;
      }
      return p - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [run, left]);
  const chime = () => {
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      const ctx = new C();
      const now = ctx.currentTime;
      [[880, 0, 1.2, .4], [1320, .15, 1.5, .3]].forEach(([f, st, en, g]) => {
        const o = ctx.createOscillator();
        const ga = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, now + st);
        ga.gain.setValueAtTime(g, now + st);
        ga.gain.exponentialRampToValueAtTime(0.001, now + en);
        o.connect(ga);
        ga.connect(ctx.destination);
        o.start(now + st);
        o.stop(now + en);
      });
    } catch (e) {}
  };
  const add = m => {
    setTotal(t => t + m * 60);
    setLeft(l => l + m * 60);
    setDone(false);
  };
  const progress = total > 0 ? (total - left) / total * 100 : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: (done ? 'animate-bounce ' : '') + className,
    style: {
      position: fixed ? 'fixed' : 'relative',
      bottom: fixed ? 16 : undefined,
      right: fixed ? 16 : undefined,
      zIndex: fixed ? 50 : undefined,
      background: 'var(--paper-50)',
      border: '1px solid var(--hairline)',
      borderRadius: 8,
      boxShadow: 'var(--shadow-float)',
      padding: 16,
      width: 288,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-mono)',
      userSelect: 'none',
      outline: done ? '2px solid var(--accent)' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--hairline)',
      paddingBottom: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    size: "lg",
    color: run || done ? 'accent' : 'muted',
    ping: run
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      fontWeight: 700,
      letterSpacing: '.08em',
      color: 'var(--ink)',
      maxWidth: 170,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "mi-icon-btn",
    onClick: chime,
    title: "Test Sound"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "volume-2",
    size: 14
  })), onClose && /*#__PURE__*/React.createElement("button", {
    className: "mi-icon-btn",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      margin: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: done ? 'animate-pulse' : '',
    style: {
      fontSize: 48,
      fontWeight: 900,
      letterSpacing: '-.01em',
      lineHeight: 1,
      color: done ? 'var(--accent)' : 'var(--ink)'
    }
  }, fmt(left)), done && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--accent)',
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      marginTop: 4
    }
  }, "\u26A1 TIME\u2019S UP! CHECK FOOD!")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: 'var(--paper-200)',
      height: 6,
      borderRadius: 9999,
      overflow: 'hidden',
      margin: '12px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: 'var(--accent)',
      transition: 'width .3s',
      width: progress + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginBottom: 12
    }
  }, [1, 2, 5].map(m => /*#__PURE__*/React.createElement(__ds_scope.Button, {
    key: m,
    variant: "inset",
    size: "sm",
    rounded: true,
    onClick: () => add(m),
    style: {
      flex: 1,
      letterSpacing: 0,
      fontSize: 10,
      background: 'rgba(236,233,225,.8)'
    }
  }, "+", m, " MIN"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: run ? 'caution' : 'ink',
    rounded: true,
    icon: run ? 'pause' : 'play',
    onClick: () => setRun(!run),
    style: {
      flex: 1,
      padding: '8px 12px',
      background: run ? 'var(--caution)' : undefined,
      color: run ? '#fff' : undefined,
      borderColor: run ? 'var(--caution)' : undefined
    }
  }, run ? 'PAUSE' : left === total ? 'START TIMER' : 'RESUME'), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "inset",
    rounded: true,
    iconOnly: true,
    icon: "rotate-ccw",
    title: "Reset",
    onClick: () => {
      setRun(false);
      setLeft(total);
      setDone(false);
    }
  })));
}
Object.assign(__ds_scope, { KitchenTimer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/KitchenTimer.jsx", error: String((e && e.message) || e) }); }

// components/recipe/LeanSpecBadge.jsx
try { (() => {
const ICON = {
  time: 'clock',
  temp: 'heat-waves',
  protein: 'fork',
  probe: 'thermometer-probe',
  flip: 'flip-action',
  rest: 'rest-time',
  spray: 'oil-spray',
  scale: 'scale-weight',
  safety: 'safety-shield',
  flame: 'flame',
  speed: 'lightning-fast'
};
const FIXED = {
  safety: 'var(--verified-strong)',
  flame: 'var(--accent)',
  speed: 'var(--accent)'
};
/** Spec badge with a Lean 5S glyph. cell (default) = quick spec matrix card; row = label/value bar; inline = chip; compact = centered mini cell. */
function LeanSpecBadge({
  type = 'time',
  value,
  label,
  sub,
  variant = 'cell',
  accent = false,
  className = '',
  style
}) {
  const color = FIXED[type] || (accent ? 'var(--accent)' : 'var(--ink)');
  const ico = s => /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
    name: ICON[type] || 'clock',
    size: s,
    style: {
      color
    }
  });
  const vColor = accent ? 'var(--accent)' : 'var(--ink)';
  const M = 'var(--font-mono)';
  if (variant === 'inline') return /*#__PURE__*/React.createElement("span", {
    className: 'hairline-border ' + className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '2px 8px',
      background: 'var(--paper)',
      fontFamily: M,
      fontSize: 12,
      ...style
    }
  }, ico(16), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase',
      fontSize: 10
    }
  }, label, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: vColor
    }
  }, value));
  if (variant === 'row') return /*#__PURE__*/React.createElement("div", {
    className: 'hairline-border ' + className,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      background: 'var(--paper)',
      fontFamily: M,
      fontSize: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-border",
    style: {
      padding: 6,
      background: 'var(--paper-50)',
      display: 'flex'
    }
  }, ico(22)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 10,
      textTransform: 'uppercase',
      color: 'var(--ink-subtle)',
      letterSpacing: '.08em'
    }
  }, label), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 9,
      color: 'var(--ink-muted)'
    }
  }, sub))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: '-.01em',
      color: vColor
    }
  }, value));
  if (variant === 'compact') return /*#__PURE__*/React.createElement("div", {
    className: 'hairline-border ' + className,
    style: {
      padding: 8,
      background: 'var(--paper)',
      fontFamily: M,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      ...style
    }
  }, ico(20), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      color: 'var(--ink-subtle)',
      lineHeight: 1
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.25,
      color: vColor
    }
  }, value));
  return /*#__PURE__*/React.createElement("div", {
    className: 'hairline-border mi-panel--hover ' + className,
    style: {
      padding: 12,
      background: 'var(--paper)',
      fontFamily: M,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      position: 'relative',
      overflow: 'hidden',
      transition: 'border-color .2s',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      color: 'var(--ink-subtle)',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: .8
    }
  }, ico(24))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: '-.01em',
      color: vColor,
      lineHeight: 1.4
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--ink-muted)',
      lineHeight: 1.25,
      marginTop: 2
    }
  }, sub)));
}
Object.assign(__ds_scope, { LeanSpecBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/LeanSpecBadge.jsx", error: String((e && e.message) || e) }); }

// components/recipe/Lean5SMatrix.jsx
try { (() => {
/** 4-cell "LEAN 5S SPECIFICATION MATRIX" under a recipe header: temp (accent), time, protein, then probe | flip | rest | verified. */
function Lean5SMatrix({
  cookTemp,
  totalMinutes,
  proteinGrams,
  internalTemp,
  flipMinutes,
  restMinutes,
  servings,
  className = '',
  style
}) {
  const fourth = internalTemp ? /*#__PURE__*/React.createElement(__ds_scope.LeanSpecBadge, {
    type: "probe",
    label: "Target Probe",
    value: internalTemp,
    sub: "USDA Safe Pull"
  }) : flipMinutes > 0 ? /*#__PURE__*/React.createElement(__ds_scope.LeanSpecBadge, {
    type: "flip",
    label: "Flip / Shake",
    value: flipMinutes + ' MIN',
    sub: "Turnover Mark"
  }) : restMinutes > 0 ? /*#__PURE__*/React.createElement(__ds_scope.LeanSpecBadge, {
    type: "rest",
    label: "Rest Duration",
    value: restMinutes + ' MIN',
    sub: "Juice Retention"
  }) : /*#__PURE__*/React.createElement(__ds_scope.LeanSpecBadge, {
    type: "safety",
    label: "Standard",
    value: "VERIFIED",
    sub: "Zero Fluff"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MicroLabel, {
    color: "subtle",
    note: "AT-A-GLANCE PROCESS METRICS",
    style: {
      letterSpacing: '.08em',
      fontWeight: 400
    }
  }, "LEAN 5S SPECIFICATION MATRIX"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LeanSpecBadge, {
    type: "temp",
    label: "Cook Temp",
    value: cookTemp,
    sub: "Preheat Required",
    accent: true
  }), /*#__PURE__*/React.createElement(__ds_scope.LeanSpecBadge, {
    type: "time",
    label: "Total Time",
    value: totalMinutes + ' MIN',
    sub: "Floor-to-Plate"
  }), proteinGrams !== undefined && /*#__PURE__*/React.createElement(__ds_scope.LeanSpecBadge, {
    type: "protein",
    label: "Protein / Serv",
    value: proteinGrams + 'G',
    sub: servings ? 'Yield: ' + servings + ' Servings' : 'Macro-Dense'
  }), fourth));
}
Object.assign(__ds_scope, { Lean5SMatrix });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/Lean5SMatrix.jsx", error: String((e && e.message) || e) }); }

// components/recipe/MealActions.jsx
try { (() => {
const {
  useState
} = React;
const cap = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '.08em',
  color: 'var(--ink-subtle)'
};
/** Save / rate / suggest-edit block under a recipe (components/MealActions.tsx). signedIn=false shows the Google sign-in prompt. */
function MealActions({
  recipeTitle = 'this meal',
  signedIn = false,
  saved: savedProp = false,
  stars: starsProp = 0,
  onSignIn,
  onSave,
  onRate,
  onSuggest,
  className = '',
  style
}) {
  const [saved, setSaved] = useState(savedProp);
  const [stars, setStars] = useState(starsProp);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);
  const box = {
    marginTop: 32,
    padding: 16,
    background: 'var(--paper-50)',
    border: '1px solid var(--hairline)'
  };
  if (!signedIn) return /*#__PURE__*/React.createElement("section", {
    className: className,
    style: {
      ...box,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: cap
  }, "Save & Rate"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink)',
      margin: '4px 0 0'
    }
  }, "Sign in with Google to save ", /*#__PURE__*/React.createElement("strong", null, recipeTitle), ", rate it after you cook, and suggest edits to the instructions.")), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ink",
    size: "lg",
    onClick: onSignIn,
    style: {
      fontWeight: 400,
      fontSize: 11,
      padding: '8px 16px'
    },
    className: "mi-opacity-link"
  }, "Sign in with Google")));
  return /*#__PURE__*/React.createElement("section", {
    className: className,
    style: {
      ...box,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cap
  }, "Your notes on this meal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setSaved(!saved);
      onSave && onSave(!saved);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      border: '1px solid var(--ink)',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      background: saved ? 'var(--ink)' : 'var(--paper)',
      color: saved ? 'var(--paper)' : 'var(--ink)',
      transition: 'all .2s'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: saved ? 'bookmark-check' : 'bookmark',
    size: 16
  }), saved ? 'Saved' : 'Save this meal'), saved && /*#__PURE__*/React.createElement("a", {
    href: "#/account",
    className: "mi-hover-ink",
    style: {
      ...cap,
      textDecoration: 'none'
    }
  }, "View saved meals \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    },
    onMouseLeave: () => setHover(0),
    role: "radiogroup",
    "aria-label": "Rate this recipe"
  }, [1, 2, 3, 4, 5].map(n => {
    const filled = (hover || stars) >= n;
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      className: "mi-star",
      onMouseEnter: () => setHover(n),
      onClick: () => {
        setStars(n);
        onRate && onRate(n);
      },
      "aria-label": n + ' star' + (n > 1 ? 's' : '')
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "star",
      size: 20,
      fill: filled ? 'currentColor' : 'none',
      style: {
        color: filled ? 'var(--ink)' : 'var(--ink-subtle)',
        transition: 'color .2s'
      }
    }));
  }), stars > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      ...cap,
      marginLeft: 8
    }
  }, "You rated ", stars, "/5"))), stars > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      ...cap,
      fontSize: 10
    }
  }, "Review (optional)"), /*#__PURE__*/React.createElement("textarea", {
    className: "mi-textarea",
    rows: 2,
    maxLength: 2000,
    value: review,
    onChange: e => setReview(e.target.value),
    placeholder: "How did it turn out? What would you do differently?"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hairline-t",
    style: {
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(!open),
    className: "mi-opacity-link",
    style: {
      ...cap,
      color: 'var(--ink)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'none',
      border: 0,
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "pencil",
    size: 14
  }), open ? 'Close suggestion' : 'Something wrong? Suggest an edit'), open && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "mi-textarea",
    rows: 4,
    maxLength: 4000,
    value: body,
    onChange: e => setBody(e.target.value),
    placeholder: "What should change? (e.g. 'Step 3 should say 400\xB0F, not 375\xB0F' or 'The salt amount is way too high for 2 lb of chicken.')"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...cap,
      fontSize: 10
    }
  }, body.length, "/4000"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ink",
    size: "sm",
    disabled: !body.trim(),
    onClick: () => {
      onSuggest && onSuggest(body);
      setSent(true);
      setBody('');
      setTimeout(() => setSent(false), 4000);
    },
    style: {
      fontWeight: 400,
      fontSize: 11,
      padding: '6px 12px'
    }
  }, "Send suggestion")), sent && /*#__PURE__*/React.createElement("div", {
    style: cap
  }, "Thanks \u2014 logged."))));
}
Object.assign(__ds_scope, { MealActions });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/MealActions.jsx", error: String((e && e.message) || e) }); }

// components/recipe/ModeSwitch.jsx
try { (() => {
/** HR-7 sticky inline segmented mode selector: "Execution Mode / Applied via CSS Visibility" caption + 2-col ink toggle. sticky=true pins at top-16 with paper-card/95 blur. */
function ModeSwitch({
  mode = 'fast',
  onChange,
  sticky = true,
  top = 64,
  className = '',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'hairline-b ' + className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '12px 0',
      background: 'rgba(250,249,246,.95)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      position: sticky ? 'sticky' : 'relative',
      top: sticky ? top : undefined,
      zIndex: sticky ? 30 : undefined,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Execution Mode"), /*#__PURE__*/React.createElement("span", null, "Applied via CSS Visibility")), /*#__PURE__*/React.createElement("div", {
    className: "hairline-border",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Segmented, {
    variant: "square",
    value: mode,
    onChange: onChange,
    style: {
      border: 0
    },
    options: [{
      value: 'fast',
      icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
        name: "zap",
        size: 14,
        style: {
          color: 'var(--accent)'
        }
      }),
      label: '⚡ GET TO THE POINT',
      note: '(20 Words)'
    }, {
      value: 'detailed',
      icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
        name: "book-open",
        size: 14,
        style: {
          color: 'var(--ink-subtle)'
        }
      }),
      label: '📖 STEP-BY-STEP',
      note: '(Guided Steps)'
    }]
  })));
}
/** Card-style picker used above content ("CHOOSE YOUR COOKING MODE") — components/RecipeModeSwitch.tsx. */
function ModeSwitchCards({
  mode = 'quick',
  onChange,
  className = '',
  style
}) {
  const opt = (v, icon, activeBg, title, desc) => {
    const on = mode === v;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 6,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all .2s',
        background: on ? 'var(--paper-50)' : 'transparent',
        border: on ? '1px solid rgba(17,17,17,.2)' : '1px solid transparent',
        boxShadow: on ? 'var(--shadow-subtle), 0 0 0 1px var(--accent-30)' : 'none',
        color: on ? 'var(--ink)' : 'var(--ink-muted)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 4,
        borderRadius: 4,
        background: on ? activeBg : 'var(--paper-300)',
        color: on ? v === 'quick' ? '#fff' : 'var(--paper)' : 'var(--ink-muted)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'var(--ink)'
      }
    }, title)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--ink-muted)',
        marginTop: 4
      }
    }, desc));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: '100%',
      padding: 6,
      background: 'var(--paper-200)',
      borderRadius: 8,
      border: '1px solid var(--hairline)',
      userSelect: 'none',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      color: 'var(--ink-muted)',
      padding: '4px 8px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "CHOOSE YOUR COOKING MODE:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: 'var(--ink-subtle)'
    }
  }, "PREFERENCE SAVED AUTOMATICALLY")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      marginTop: 4
    }
  }, opt('quick', 'zap', 'var(--accent)', 'GET TO THE POINT', 'Ultra-concise telegram format. Temp, time, flip marker, zero fluff.'), opt('detailed', 'book-open', 'var(--ink)', 'STEP-BY-STEP', 'Fluff-free guided instructions with doneness cues and pro tips.')));
}
Object.assign(__ds_scope, { ModeSwitch, ModeSwitchCards });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/ModeSwitch.jsx", error: String((e && e.message) || e) }); }

// components/recipe/PortionScaler.jsx
try { (() => {
/** SERVINGS: 2 / 4 / 6 / 8★ pill toggle (components/PortionScaler.tsx). variant="multiplier" renders the recipe-page hairline boxes 2 (0.5x)…8 (2x). */
function PortionScaler({
  currentServings = 4,
  onChange,
  variant = 'pill',
  className = '',
  style
}) {
  if (variant === 'multiplier') return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: 'var(--ink-subtle)',
      textTransform: 'uppercase',
      marginRight: 8
    }
  }, "Servings:"), /*#__PURE__*/React.createElement(__ds_scope.Segmented, {
    variant: "hairline",
    value: currentServings,
    onChange: onChange,
    options: [{
      value: 2,
      label: '2 (0.5x)'
    }, {
      value: 4,
      label: '4 (1x)'
    }, {
      value: 6,
      label: '6 (1.5x)'
    }, {
      value: 8,
      label: '8 (2x)'
    }]
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--ink-muted)',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '.08em'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "users",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "SERVINGS:")), /*#__PURE__*/React.createElement(__ds_scope.Segmented, {
    value: currentServings,
    onChange: onChange,
    options: [2, 4, 6, 8].map(n => ({
      value: n,
      label: /*#__PURE__*/React.createElement("span", null, n, n === 8 && /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 2,
          fontSize: 8,
          color: 'var(--accent)'
        }
      }, "\u2605"))
    }))
  }));
}
Object.assign(__ds_scope, { PortionScaler });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/PortionScaler.jsx", error: String((e && e.message) || e) }); }

// components/recipe/PrintButton.jsx
try { (() => {
/** Small ink "PRINT 1-PAGE SHEET" button (rounded, hover accent). */
function PrintButton({
  label = 'PRINT 1-PAGE SHEET',
  onClick,
  className = '',
  style
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ink",
    size: "sm",
    rounded: true,
    icon: "printer",
    iconSize: 14,
    onClick: onClick || (() => window.print()),
    className: className,
    style: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 0,
      textTransform: 'none',
      padding: '4px 12px',
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { PrintButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/PrintButton.jsx", error: String((e && e.message) || e) }); }

// components/recipe/RecipeCard.jsx
try { (() => {
const APPL = {
  'air-fryer': 'accent-soft',
  'cast-iron': 'zinc'
};
/** Directory recipe card: index #, protein + appliance chips, 176px photo, title, tagline, 3-cell spec matrix (TEMP/TIME/PROTEIN), difficulty + DIRECTIONS footer. */
function RecipeCard({
  recipe,
  isHighlighted = false,
  href,
  onOpen,
  image,
  style,
  className = ''
}) {
  const r = recipe;
  const link = href || '#/recipes/' + r.slug;
  const img = image || r.image;
  const go = e => {
    if (onOpen) {
      e.preventDefault();
      onOpen(r);
    }
  };
  const cell = (icon, iconColor, label, val, valColor) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper-100)',
      padding: 8,
      borderRadius: 4,
      border: '1px solid rgba(223,220,206,.6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
    name: icon,
    size: 20,
    style: {
      color: iconColor,
      marginBottom: 4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 8,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      color: 'var(--ink-subtle)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: valColor
    }
  }, val));
  return /*#__PURE__*/React.createElement("article", {
    id: 'recipe-' + r.slug,
    className: 'mi-card ' + (isHighlighted ? 'is-highlighted ' : '') + className,
    style: style
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '.14em',
      color: 'var(--ink-muted)',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mi-card__id",
    style: {
      fontWeight: 700,
      color: 'var(--ink)'
    }
  }, r.id), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    size: "xs",
    rounded: true,
    bold: true,
    style: {
      color: 'var(--ink-muted)',
      fontWeight: 600,
      letterSpacing: 0
    },
    icon: /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
      name: r.protein,
      size: 12,
      style: {
        color: 'var(--accent)'
      }
    })
  }, r.protein.replace('-', ' ')), /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    size: "xs",
    rounded: true,
    variant: APPL[r.appliance] || 'inset',
    style: {
      padding: '2px 8px',
      fontWeight: 600,
      letterSpacing: 0
    }
  }, r.appliance.replace('-', ' ')))), img && /*#__PURE__*/React.createElement("a", {
    href: link,
    onClick: go,
    className: "mi-card__img"
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: r.title
  })), /*#__PURE__*/React.createElement("a", {
    href: link,
    onClick: go,
    style: {
      display: 'block',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mi-card__title",
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: '-.01em',
      color: 'var(--ink)',
      lineHeight: 1.375
    }
  }, r.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink-muted)',
      marginTop: 8,
      marginBottom: 0,
      lineHeight: 1.625,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, r.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 12,
      borderTop: '1px solid var(--hairline)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 8,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)'
    }
  }, cell('heat-waves', 'var(--ink-muted)', 'TEMP', String(r.cookTemp).split(' ')[0], 'var(--ink)'), cell('clock', 'var(--ink-muted)', 'TIME', r.totalMinutes + ' MIN', 'var(--ink)'), cell('fork', 'var(--accent)', 'PROTEIN', (r.nutrition && r.nutrition.proteinGrams || 30) + 'G', 'var(--accent)'))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 12,
      borderTop: '1px solid rgba(223,220,206,.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 11,
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--ink-muted)',
      fontSize: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    color: "verified"
  }), /*#__PURE__*/React.createElement("span", null, r.difficulty)), /*#__PURE__*/React.createElement("a", {
    href: link,
    onClick: go,
    className: "mi-card__cta",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--ink)',
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", null, "DIRECTIONS"), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right",
    size: 14,
    className: "mi-card__arrow"
  }))));
}
Object.assign(__ds_scope, { RecipeCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/RecipeCard.jsx", error: String((e && e.message) || e) }); }

// components/recipe/RecipeTable.jsx
try { (() => {
const {
  useState
} = React;
/** Index-table view of the directory: sortable INDEX # / TITLE / PROTEIN / APPLIANCE / TEMP / TIME / PROTEIN (G) / ACTION. */
function RecipeTable({
  recipes,
  onOpen,
  href = r => '#/recipes/' + r.slug,
  style,
  className = ''
}) {
  const [field, setField] = useState('id');
  const [asc, setAsc] = useState(true);
  const sort = f => {
    if (field === f) setAsc(!asc);else {
      setField(f);
      setAsc(true);
    }
  };
  const rows = [...recipes].sort((a, b) => {
    let c = 0;
    if (field === 'id') c = a.id.localeCompare(b.id);
    if (field === 'title') c = a.title.localeCompare(b.title);
    if (field === 'time') c = a.totalMinutes - b.totalMinutes;
    if (field === 'protein') c = (a.nutrition && a.nutrition.proteinGrams || 0) - (b.nutrition && b.nutrition.proteinGrams || 0);
    if (field === 'temp') c = (a.cookTempF || 0) - (b.cookTempF || 0);
    return asc ? c : -c;
  });
  const th = {
    padding: '12px 16px'
  };
  const Th = ({
    f,
    children,
    right
  }) => /*#__PURE__*/React.createElement("th", {
    className: f ? 'mi-th' : '',
    onClick: f ? () => sort(f) : undefined,
    style: {
      ...th,
      textAlign: right ? 'right' : 'left',
      fontWeight: 400
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: right ? 6 : 4,
      justifyContent: right ? 'flex-end' : 'flex-start'
    }
  }, children, f && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-down",
    size: 12,
    style: {
      color: 'var(--ink-subtle)'
    }
  })));
  const chip = (icon, iconColor, text) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '2px 8px',
      borderRadius: 4,
      fontSize: 9,
      textTransform: 'uppercase',
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
    name: icon,
    size: 14,
    style: {
      color: iconColor
    }
  }), text);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: '100%',
      overflowX: 'auto',
      background: 'var(--paper-50)',
      border: '1px solid var(--hairline)',
      borderRadius: 4,
      boxShadow: 'var(--shadow-subtle)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      textAlign: 'left',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid var(--hairline)',
      background: 'rgba(236,233,225,.7)',
      fontSize: 10,
      textTransform: 'uppercase',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '.14em',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement(Th, {
    f: "id"
  }, "INDEX #"), /*#__PURE__*/React.createElement(Th, {
    f: "title"
  }, "RECIPE TITLE"), /*#__PURE__*/React.createElement(Th, null, "PROTEIN"), /*#__PURE__*/React.createElement(Th, null, "APPLIANCE"), /*#__PURE__*/React.createElement(Th, {
    f: "temp",
    right: true
  }, /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
    name: "heat-waves",
    size: 14,
    style: {
      color: 'var(--accent)'
    }
  }), "TEMP"), /*#__PURE__*/React.createElement(Th, {
    f: "time",
    right: true
  }, /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
    name: "clock",
    size: 14,
    style: {
      color: 'var(--ink-subtle)'
    }
  }), "TIME"), /*#__PURE__*/React.createElement(Th, {
    f: "protein",
    right: true
  }, /*#__PURE__*/React.createElement(__ds_scope.LeanIcon, {
    name: "fork",
    size: 14,
    style: {
      color: 'var(--accent)'
    }
  }), "PROTEIN (G)"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: 'center',
      fontWeight: 400
    }
  }, "ACTION"))), /*#__PURE__*/React.createElement("tbody", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, rows.map(r => {
    const go = e => {
      if (onOpen) {
        e.preventDefault();
        onOpen(r);
      }
    };
    return /*#__PURE__*/React.createElement("tr", {
      key: r.id,
      className: "mi-row",
      style: {
        borderTop: '1px solid rgba(223,220,206,.6)'
      },
      onClick: () => onOpen && onOpen(r)
    }, /*#__PURE__*/React.createElement("td", {
      className: "mi-row__t",
      style: {
        ...th,
        fontWeight: 700,
        color: 'var(--ink)'
      }
    }, r.id), /*#__PURE__*/React.createElement("td", {
      style: th
    }, /*#__PURE__*/React.createElement("a", {
      href: href(r),
      onClick: go,
      className: "mi-row__t",
      style: {
        display: 'block',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 14,
        color: 'var(--ink)',
        textDecoration: 'none'
      }
    }, r.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontFamily: 'var(--font-sans)',
        color: 'var(--ink-muted)',
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 360
      }
    }, r.tagline)), /*#__PURE__*/React.createElement("td", {
      style: th
    }, chip(r.protein, 'var(--accent)', r.protein.replace('-', ' '))), /*#__PURE__*/React.createElement("td", {
      style: th
    }, chip(r.appliance, 'var(--ink-muted)', r.appliance.replace('-', ' '))), /*#__PURE__*/React.createElement("td", {
      style: {
        ...th,
        textAlign: 'right',
        fontWeight: 600,
        color: 'var(--ink)'
      }
    }, String(r.cookTemp).split(' ')[0]), /*#__PURE__*/React.createElement("td", {
      style: {
        ...th,
        textAlign: 'right',
        color: 'var(--ink)'
      }
    }, r.totalMinutes, "m"), /*#__PURE__*/React.createElement("td", {
      style: {
        ...th,
        textAlign: 'right',
        fontWeight: 700,
        color: 'var(--accent)'
      }
    }, r.nutrition && r.nutrition.proteinGrams || 30, "g"), /*#__PURE__*/React.createElement("td", {
      style: {
        ...th,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: href(r),
      onClick: go,
      className: "mi-row__t mi-hover-underline",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 10,
        fontWeight: 600,
        color: 'var(--ink)',
        textTransform: 'uppercase',
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", null, "GO"), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "arrow-right",
      size: 12
    }))));
  }))));
}
Object.assign(__ds_scope, { RecipeTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/RecipeTable.jsx", error: String((e && e.message) || e) }); }

// components/recipe/ShareButton.jsx
try { (() => {
const {
  useState
} = React;
/** Recipe action toolbar: SMS TO SPOUSE (copies telegram text), AI / LLM MARKDOWN, PRINT CARD. Copies flip to "COPIED FOR SMS!" / "MD COPIED!" for 3s. */
function ShareButton({
  smsText = '',
  markdown = '',
  onPrint,
  showMarkdown = true,
  compact = false,
  className = '',
  style
}) {
  const [sms, setSms] = useState(false);
  const [md, setMd] = useState(false);
  const copy = async (t, set) => {
    try {
      await navigator.clipboard.writeText(t);
    } catch (e) {}
    set(true);
    setTimeout(() => set(false), 3000);
  };
  const ok = /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    style: {
      color: 'var(--verified-check)'
    }
  });
  if (compact) return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    size: "sm",
    icon: sms ? ok : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "message-square",
      size: 14,
      style: {
        color: 'var(--ink-muted)'
      }
    }),
    onClick: () => copy(smsText, setSms),
    title: "Copy short text for SMS / iMessage",
    style: {
      letterSpacing: '.08em',
      fontSize: 10,
      color: sms ? 'var(--verified-strong)' : undefined,
      fontWeight: sms ? 700 : 400
    }
  }, sms ? 'COPIED FOR SMS!' : 'COPY FOR SMS'), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "printer",
      size: 14,
      style: {
        color: 'var(--ink-muted)'
      }
    }),
    onClick: onPrint || (() => window.print()),
    title: "Print clean 1-page recipe card",
    style: {
      fontSize: 10
    }
  }, "PRINT"));
  return /*#__PURE__*/React.createElement("div", {
    className: 'hairline-t ' + className,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      paddingTop: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    icon: sms ? ok : 'share-2',
    onClick: () => copy(smsText, setSms)
  }, sms ? 'COPIED FOR SMS!' : 'SMS TO SPOUSE'), showMarkdown && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline-muted",
    icon: md ? ok : 'copy',
    onClick: () => copy(markdown, setMd),
    title: "Copy clean markdown for ChatGPT, Claude, or Perplexity"
  }, md ? 'MD COPIED!' : 'AI / LLM MARKDOWN')), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline-muted",
    icon: "printer",
    onClick: onPrint || (() => window.print())
  }, "PRINT CARD"));
}
Object.assign(__ds_scope, { ShareButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/ShareButton.jsx", error: String((e && e.message) || e) }); }

// components/recipe/StartCookButton.jsx
try { (() => {
/** Accent "Start cook" CTA that deep-links to the live-cook companion (/cook?ds=appliance/food). */
function StartCookButton({
  appliance = 'air-fryer',
  foodSlug = '',
  label = 'Start cook',
  href,
  onClick,
  className = '',
  style
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    size: "lg",
    icon: "play",
    iconSize: 16,
    href: href || '#/cook?ds=' + appliance + '/' + foodSlug,
    onClick: onClick,
    className: className,
    style: {
      fontSize: 12,
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { StartCookButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/StartCookButton.jsx", error: String((e && e.message) || e) }); }

// components/sample-data.js
try { (() => {
// Sample data for cards + UI kit. Values are copied from the live mealinstructions.com home page (2026-09-05) — recipe cards, HUD datasheet CT-AF-004, category and crisis counts. Datasheets other than CT-AF-004 reuse the matching recipe's published temp/time (marked source:'recipe-card') — they are placeholders, not the cook-time DB.
window.MI_DATA = function () {
  var ROOT = function () {
    var s = document.currentScript && document.currentScript.getAttribute('src') || '';
    return s.replace(/components\/sample-data\.js.*$/, '');
  }();
  var IMG = ROOT + 'assets/images/recipes/';
  var recipes = [{
    id: '0001',
    slug: 'crispy-air-fryer-chicken-tenders',
    title: 'Crispy Air Fryer Chicken Tenders',
    tagline: 'Golden panko crunch outside, juicy inside in 10 minutes with zero hot oil splatter.',
    protein: 'chicken',
    appliance: 'air-fryer',
    cookTemp: '400°F (204°C)',
    cookTempF: 400,
    totalMinutes: 15,
    prepMinutes: 5,
    cookMinutes: 10,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 42,
      calories: 350,
      carbsGrams: 20,
      fatGrams: 10,
      source: 'USDA FoodData Central #171077'
    },
    categories: ['kid-approved', '15-minute', 'high-protein'],
    image: IMG + 'air-fryer-crispy-chicken-tenders.jpg',
    defaultServings: 4,
    safeInternalTempF: 165,
    restMinutes: 2,
    basis: 'Tested in 6-qt basket air fryer at 400°F (204°C) with 1.5-inch raw chicken tenderloins. USDA FSIS 165°F target.',
    datePublished: '2026-08-29',
    quickVersion: {
      timerMinutes: 12,
      flipAtMinutes: 6,
      bullets: ['Set up three bowls: flour with garlic powder, beaten eggs, and panko mixed with parmesan and smoked paprika.', 'Pat 1.5 lbs chicken tenders dry. Dredge in flour, dip in egg, then press into panko mixture.', 'Arrange in a single layer in a greased air fryer basket. Spray tops with cooking spray.', 'Air fry at 400°F for 12 minutes, flipping at 6 minutes, until golden and internal temp hits 165°F.']
    },
    detailedSteps: [{
      stepNumber: 1,
      title: 'Set Up the Breading Station',
      instruction: 'Set up three shallow bowls. Bowl 1: 1/2 cup all-purpose flour mixed with 1/2 tsp garlic powder. Bowl 2: 2 beaten eggs. Bowl 3: 1.5 cups panko breadcrumbs mixed with 1/4 cup grated parmesan cheese, 1/2 tsp smoked paprika, 1/2 tsp salt, and 1/4 tsp black pepper.',
      proTip: 'Adding parmesan to the panko creates an extra layer of savory flavor and helps the crust brown more evenly in the air fryer.'
    }, {
      stepNumber: 2,
      title: 'Bread the Chicken',
      instruction: 'Pat 1.5 lbs chicken tenderloins completely dry with paper towels. Working one at a time, dredge each tender in the seasoned flour, shaking off excess. Dip into beaten egg, letting excess drip off. Press firmly into the panko-parmesan mixture, coating all sides.',
      proTip: 'Use one hand for the dry ingredients and the other for the wet. This prevents your fingers from getting caked with breading that falls off in clumps.'
    }, {
      stepNumber: 3,
      title: 'Air Fry',
      instruction: 'Spray the air fryer basket with cooking spray. Arrange breaded tenders in a single layer with space between each piece. Spray the tops of the tenders lightly with cooking spray. Air fry at 400°F (204°C) for 12 minutes, flipping halfway at 6 minutes.',
      proTip: 'Do not stack or overlap the tenders. Air needs to circulate around each piece for even crisping. Cook in batches if needed.',
      timerMinutes: 12
    }, {
      stepNumber: 4,
      title: 'Check and Rest',
      instruction: 'Confirm internal temperature reaches 165°F using an instant-read thermometer inserted into the thickest part. Transfer to a wire rack and rest for 2 minutes before serving with your favorite dipping sauces.',
      proTip: 'Resting on a wire rack instead of a plate prevents the bottom from getting soggy from trapped steam.',
      timerMinutes: 2
    }],
    ingredients: [{
      item: 'Chicken Tenderloins',
      qty: '1.5',
      qtyNumeric: 1.5,
      unit: 'lbs'
    }, {
      item: 'Panko Breadcrumbs',
      qty: '1.5',
      qtyNumeric: 1.5,
      unit: 'cups'
    }, {
      item: 'Parmesan Cheese',
      qty: '1/4',
      qtyNumeric: .25,
      unit: 'cup',
      notes: 'grated'
    }, {
      item: 'Large Eggs',
      qty: '2',
      qtyNumeric: 2,
      unit: 'pieces',
      notes: 'beaten'
    }, {
      item: 'All-Purpose Flour',
      qty: '1/2',
      qtyNumeric: .5,
      unit: 'cup'
    }, {
      item: 'Garlic Powder',
      qty: '1/2',
      qtyNumeric: .5,
      unit: 'tsp'
    }, {
      item: 'Smoked Paprika',
      qty: '1/2',
      qtyNumeric: .5,
      unit: 'tsp'
    }, {
      item: 'Kosher Salt',
      qty: '1/2',
      qtyNumeric: .5,
      unit: 'tsp'
    }, {
      item: 'Black Pepper',
      qty: '1/4',
      qtyNumeric: .25,
      unit: 'tsp'
    }, {
      item: 'Cooking Spray',
      qty: '1',
      qtyNumeric: 1,
      unit: 'can'
    }],
    dadProTip: 'These taste like restaurant chicken tenders but with a fraction of the oil and none of the deep fryer cleanup. The parmesan in the panko is the secret weapon for next-level crunch.',
    kidAdjustment: 'Serve with a lineup of dipping sauces: honey mustard, ketchup, BBQ sauce, and ranch. Let kids pick their favorites and dip away.',
    sideSuggestions: ['Air fryer french fries', 'Steamed broccoli with cheese', 'Apple slices with caramel dip'],
    reheatInstructions: 'Reheat in the air fryer at 360°F for 3-4 minutes until crispy again. Never microwave or the breading will turn soft and rubbery.'
  }, {
    id: '0002',
    slug: 'air-fryer-juicy-bacon-cheeseburgers',
    title: 'Air Fryer Juicy Bacon Cheeseburgers',
    tagline: 'Diner-grade sear and steakhouse juiciness in 10 minutes with zero stove splatter.',
    protein: 'beef',
    appliance: 'air-fryer',
    cookTemp: '375°F (190°C)',
    cookTempF: 375,
    totalMinutes: 15,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 44
    },
    categories: ['kid-approved', '15-minute', 'high-protein'],
    image: IMG + 'air-fryer-juicy-bacon-cheeseburgers.jpg'
  }, {
    id: '0003',
    slug: 'air-fryer-10-minute-garlic-butter-salmon',
    title: '10-Minute Garlic Butter Air Fryer Salmon',
    tagline: 'Buttery, flaky salmon with crispy skin and garlic herb crust in under 10 minutes.',
    protein: 'seafood',
    appliance: 'air-fryer',
    cookTemp: '400°F (204°C)',
    cookTempF: 400,
    totalMinutes: 11,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 38
    },
    categories: ['15-minute', 'high-protein', 'five-ingredient'],
    image: IMG + 'air-fryer-10-minute-garlic-butter-salmon.jpg'
  }, {
    id: '0004',
    slug: 'cast-iron-lacy-edge-smash-burgers',
    title: 'Cast-Iron Lacy-Edge Smash Burgers',
    tagline: 'Ultra-crispy caramelized edges, double American cheese, and secret burger sauce in 5 minutes.',
    protein: 'beef',
    appliance: 'cast-iron',
    cookTemp: 'Smoking Hot',
    cookTempF: 500,
    totalMinutes: 10,
    difficulty: 'Easy',
    nutrition: {
      proteinGrams: 42
    },
    categories: ['15-minute', 'game-day', 'kid-approved'],
    image: IMG + 'cast-iron-lacy-edge-smash-burgers.jpg'
  }, {
    id: '0005',
    slug: 'sheet-pan-chicken-fajitas',
    title: 'Sheet Pan Sizzling Chicken Fajitas',
    tagline: 'Tender spiced chicken breast, sweet bell peppers, and charred onions on one single pan.',
    protein: 'chicken',
    appliance: 'sheet-pan',
    cookTemp: '425°F (218°C)',
    cookTempF: 425,
    totalMinutes: 23,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 42
    },
    categories: ['one-pan', 'high-protein', 'kid-approved'],
    image: IMG + 'sheet-pan-chicken-fajitas.jpg'
  }, {
    id: '0006',
    slug: 'air-fryer-crispy-garlic-parm-wings',
    title: 'Air Fryer Crispy Garlic Parmesan Wings',
    tagline: 'Deep-fry crunch without hot oil, tossed in melted garlic butter and aged parmesan.',
    protein: 'chicken',
    appliance: 'air-fryer',
    cookTemp: '380°F (193°C)',
    cookTempF: 380,
    totalMinutes: 25,
    difficulty: 'Easy',
    nutrition: {
      proteinGrams: 36
    },
    categories: ['game-day', 'high-protein'],
    image: IMG + 'air-fryer-crispy-garlic-parm-wings.jpg'
  }, {
    id: '0007',
    slug: '15-minute-skillet-beef-taco-meat',
    title: '15-Minute Skillet Ground Beef Taco Meat',
    tagline: 'Juicy, seasoned ground beef from scratch in 12 minutes. Zero packet filler or starch sludge.',
    protein: 'beef',
    appliance: 'skillet',
    cookTemp: 'Medium-High',
    cookTempF: 0,
    totalMinutes: 12,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 34
    },
    categories: ['15-minute', 'budget', 'kid-approved']
  }, {
    id: '0008',
    slug: 'air-fryer-sirloin-steak-bites',
    title: 'Air Fryer Garlic Butter Sirloin Steak Bites',
    tagline: 'Tender, juicy seared steak cubes dripping in melted herb butter in just 7 minutes.',
    protein: 'beef',
    appliance: 'air-fryer',
    cookTemp: '400°F (204°C)',
    cookTempF: 400,
    totalMinutes: 12,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 42
    },
    categories: ['15-minute', 'high-protein', 'five-ingredient']
  }, {
    id: '0009',
    slug: 'sheet-pan-smoked-sausage-peppers-potatoes',
    title: 'Sheet Pan Smoked Sausage, Peppers & Crispy Potatoes',
    tagline: 'Savory sliced sausage, blistered bell peppers, and golden potato cubes with zero scrubbing.',
    protein: 'pork',
    appliance: 'sheet-pan',
    cookTemp: '400°F (204°C)',
    cookTempF: 400,
    totalMinutes: 35,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 20
    },
    categories: ['one-pan', 'budget']
  }, {
    id: '0010',
    slug: 'cast-iron-butter-basted-ribeye',
    title: 'Cast Iron Butter-Basted Ribeye Steak',
    tagline: 'Restaurant-quality steakhouse sear with garlic herb butter pan basting in 8 minutes.',
    protein: 'beef',
    appliance: 'cast-iron',
    cookTemp: 'Smoking Hot',
    cookTempF: 500,
    totalMinutes: 18,
    difficulty: 'Easy',
    nutrition: {
      proteinGrams: 52
    },
    categories: ['high-protein', 'five-ingredient', 'weekend']
  }, {
    id: '0011',
    slug: 'air-fryer-crispy-parmesan-pork-chops',
    title: 'Air Fryer Crispy Parmesan Crusted Pork Chops',
    tagline: 'Juicy bone-in pork chops with a golden garlic parmesan crust in 12 minutes.',
    protein: 'pork',
    appliance: 'air-fryer',
    cookTemp: '380°F (193°C)',
    cookTempF: 380,
    totalMinutes: 17,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 44
    },
    categories: ['high-protein', 'kid-approved']
  }, {
    id: '0012',
    slug: '15-minute-lemon-garlic-butter-shrimp',
    title: '15-Minute Skillet Lemon Garlic Butter Shrimp',
    tagline: 'Sweet jumbo shrimp seared in foaming garlic herb butter with fresh lemon in 6 minutes.',
    protein: 'seafood',
    appliance: 'skillet',
    cookTemp: 'Medium-High',
    cookTempF: 0,
    totalMinutes: 11,
    difficulty: 'Dead Simple',
    nutrition: {
      proteinGrams: 35
    },
    categories: ['15-minute', 'high-protein', 'five-ingredient']
  }];
  var datasheets = [{
    id: 'CT-AF-004',
    slug: 'air-fryer-chicken-breast-boneless',
    foodSlug: 'chicken-breast-boneless',
    food: 'Chicken Breast (Boneless, Skinless)',
    appliance: 'air-fryer',
    state: 'fresh',
    cutOrPrep: '6–8 oz breasts, pounded to even 3/4-inch thickness',
    tempF: 380,
    tempC: 193,
    tempFormatted: '380°F (193°C)',
    timeFormatted: '12–15 mins',
    timeMinMinutes: 12,
    timeMaxMinutes: 15,
    flipAtMinutes: 7,
    internalTempTargetF: 165,
    internalTempTargetFormatted: '165°F (74°C)',
    restMinutes: 5,
    oilSprayRequired: true,
    donenessCue: 'Firm to touch, clear juices, instant read probe at 165°F.',
    verificationBasis: 'Cosori Pro II Technical Guide; USDA FSIS 165°F standard.',
    proTip: 'Pound to an even thickness so the thin end does not dry out before the thick end hits 165°F.',
    relatedRecipeSlug: 'crispy-air-fryer-chicken-tenders',
    source: 'live-hud'
  }, {
    id: 'CT-AF-—',
    slug: 'air-fryer-salmon-fillets-fresh',
    foodSlug: 'salmon-fillets-fresh',
    food: 'Salmon Fillets',
    appliance: 'air-fryer',
    state: 'fresh',
    cutOrPrep: 'Placeholder — values from recipe #0003 card',
    tempF: 400,
    tempC: 204,
    tempFormatted: '400°F (204°C)',
    timeFormatted: '11 mins',
    timeMinMinutes: 8,
    timeMaxMinutes: 11,
    flipAtMinutes: 0,
    internalTempTargetF: 145,
    internalTempTargetFormatted: '145°F (63°C)',
    restMinutes: 2,
    oilSprayRequired: true,
    donenessCue: 'Flakes easily with a fork; opaque center.',
    verificationBasis: 'Placeholder from recipe card — replace with datasheet record.',
    relatedRecipeSlug: 'air-fryer-10-minute-garlic-butter-salmon',
    source: 'recipe-card'
  }, {
    id: 'CT-AF-—',
    slug: 'air-fryer-beef-burger-patties-frozen',
    foodSlug: 'beef-burger-patties-frozen',
    food: 'Frozen Burger Patties',
    appliance: 'air-fryer',
    state: 'frozen',
    cutOrPrep: 'Placeholder — values from recipe #0002 card',
    tempF: 375,
    tempC: 190,
    tempFormatted: '375°F (190°C)',
    timeFormatted: '15 mins',
    timeMinMinutes: 12,
    timeMaxMinutes: 15,
    flipAtMinutes: 7,
    internalTempTargetF: 160,
    internalTempTargetFormatted: '160°F (71°C)',
    restMinutes: 2,
    oilSprayRequired: false,
    donenessCue: 'No pink, juices run clear, probe reads 160°F.',
    verificationBasis: 'Placeholder from recipe card — replace with datasheet record.',
    relatedRecipeSlug: 'air-fryer-juicy-bacon-cheeseburgers',
    source: 'recipe-card'
  }, {
    id: 'CT-AF-—',
    slug: 'air-fryer-bacon-thick-cut',
    foodSlug: 'bacon-thick-cut',
    food: 'Thick-Cut Bacon',
    appliance: 'air-fryer',
    state: 'fresh',
    cutOrPrep: 'Placeholder — values from recipe #0024 card',
    tempF: 375,
    tempC: 190,
    tempFormatted: '375°F (190°C)',
    timeFormatted: '9–10 mins',
    timeMinMinutes: 9,
    timeMaxMinutes: 10,
    flipAtMinutes: 5,
    internalTempTargetF: 0,
    internalTempTargetFormatted: '',
    restMinutes: 1,
    oilSprayRequired: false,
    donenessCue: 'Deep mahogany, fat fully rendered, edges crisp.',
    verificationBasis: 'Placeholder from recipe card — replace with datasheet record.',
    relatedRecipeSlug: 'air-fryer-bacon-no-splatter',
    source: 'recipe-card'
  }, {
    id: 'CT-AF-—',
    slug: 'air-fryer-pork-chops-bone-in',
    foodSlug: 'pork-chops-bone-in',
    food: 'Pork Chops (Bone-In)',
    appliance: 'air-fryer',
    state: 'fresh',
    cutOrPrep: 'Placeholder — values from recipe #0011 card',
    tempF: 380,
    tempC: 193,
    tempFormatted: '380°F (193°C)',
    timeFormatted: '12 mins',
    timeMinMinutes: 10,
    timeMaxMinutes: 12,
    flipAtMinutes: 6,
    internalTempTargetF: 145,
    internalTempTargetFormatted: '145°F (63°C)',
    restMinutes: 3,
    oilSprayRequired: true,
    donenessCue: 'Probe reads 145°F at the bone; juices slightly pink.',
    verificationBasis: 'Placeholder from recipe card — replace with datasheet record.',
    relatedRecipeSlug: 'air-fryer-crispy-parmesan-pork-chops',
    source: 'recipe-card'
  }, {
    id: 'CT-AF-—',
    slug: 'air-fryer-sirloin-steak-bites',
    foodSlug: 'sirloin-steak-bites',
    food: 'Sirloin Steak Bites',
    appliance: 'air-fryer',
    state: 'fresh',
    cutOrPrep: 'Placeholder — values from recipe #0008 card',
    tempF: 400,
    tempC: 204,
    tempFormatted: '400°F (204°C)',
    timeFormatted: '7 mins',
    timeMinMinutes: 6,
    timeMaxMinutes: 7,
    flipAtMinutes: 4,
    internalTempTargetF: 135,
    internalTempTargetFormatted: '135°F (57°C) medium-rare',
    restMinutes: 3,
    oilSprayRequired: false,
    donenessCue: 'Deep brown crust, warm red center.',
    verificationBasis: 'Placeholder from recipe card — replace with datasheet record.',
    relatedRecipeSlug: 'air-fryer-sirloin-steak-bites',
    source: 'recipe-card'
  }, {
    id: 'CT-AF-—',
    slug: 'air-fryer-chicken-wings-fresh',
    foodSlug: 'chicken-wings-fresh',
    food: 'Chicken Wings',
    appliance: 'air-fryer',
    state: 'fresh',
    cutOrPrep: 'Placeholder — values from recipe #0006 card',
    tempF: 380,
    tempC: 193,
    tempFormatted: '380°F (193°C)',
    timeFormatted: '25 mins',
    timeMinMinutes: 22,
    timeMaxMinutes: 25,
    flipAtMinutes: 12,
    internalTempTargetF: 175,
    internalTempTargetFormatted: '175°F (79°C)',
    restMinutes: 2,
    oilSprayRequired: false,
    donenessCue: 'Skin blistered and crisp; probe at 175°F near the bone.',
    verificationBasis: 'Placeholder from recipe card — replace with datasheet record.',
    relatedRecipeSlug: 'air-fryer-crispy-garlic-parm-wings',
    source: 'recipe-card'
  }, {
    id: 'CT-AF-—',
    slug: 'air-fryer-frozen-french-fries',
    foodSlug: 'frozen-french-fries',
    food: 'Frozen French Fries',
    appliance: 'air-fryer',
    state: 'frozen',
    cutOrPrep: 'Placeholder — values from recipe #0021 card',
    tempF: 400,
    tempC: 204,
    tempFormatted: '400°F (204°C)',
    timeFormatted: '13 mins',
    timeMinMinutes: 12,
    timeMaxMinutes: 13,
    flipAtMinutes: 6,
    internalTempTargetF: 0,
    internalTempTargetFormatted: '',
    restMinutes: 0,
    oilSprayRequired: false,
    donenessCue: 'Golden and rigid; shake basket at the flip mark.',
    verificationBasis: 'Placeholder from recipe card — replace with datasheet record.',
    relatedRecipeSlug: 'air-fryer-frozen-chicken-nuggets-and-fries',
    source: 'recipe-card'
  }];
  var presets = [['Chicken Breast', 'air-fryer-chicken-breast-boneless'], ['Salmon Fillets', 'air-fryer-salmon-fillets-fresh'], ['Frozen Burgers', 'air-fryer-beef-burger-patties-frozen'], ['Thick Bacon', 'air-fryer-bacon-thick-cut'], ['Pork Chops', 'air-fryer-pork-chops-bone-in'], ['Steak Bites', 'air-fryer-sirloin-steak-bites'], ['Chicken Wings', 'air-fryer-chicken-wings-fresh'], ['Frozen Fries', 'air-fryer-frozen-french-fries']].map(function (p) {
    return {
      label: p[0],
      slug: p[1]
    };
  });
  var CIMG = ROOT + 'assets/images/categories/';
  var categories = [{
    slug: '15-minute',
    name: '15-Minute Meals',
    heroTag: 'SUB-15 MINUTE EXECUTION',
    image: CIMG + '15-minute-skillet.jpg',
    count: 67
  }, {
    slug: 'high-protein',
    name: 'High Protein / Lean',
    heroTag: '30G+ PROTEIN PER SERVING',
    image: ROOT + 'assets/images/hero/smash-burger.jpg',
    count: 123
  }, {
    slug: 'kid-approved',
    name: 'Kid & Toddler Approved',
    heroTag: 'UNANIMOUS TABLE APPROVAL',
    image: CIMG + 'kid-approved-nuggets.jpg',
    count: 86
  }, {
    slug: 'budget',
    name: 'Budget & Pantry Staples',
    heroTag: 'UNDER $12 FAMILY MEAL',
    image: IMG + 'sheet-pan-chicken-fajitas.jpg',
    count: 68
  }, {
    slug: 'no-thaw',
    name: 'No-Thaw / From Frozen',
    heroTag: 'ZERO DEFROST REQUIRED',
    image: IMG + 'air-fryer-10-minute-garlic-butter-salmon.jpg',
    count: 6
  }, {
    slug: 'one-pan',
    name: 'One-Pan & Sheet Pan',
    heroTag: 'SINGLE VESSEL CLEANUP',
    image: ROOT + 'assets/images/hero/air-fryer-tenders.jpg',
    count: 55
  }, {
    slug: 'five-ingredient',
    name: 'Five-Ingredient Staples',
    heroTag: '5 INGREDIENTS OR FEWER',
    image: IMG + 'cast-iron-lacy-edge-smash-burgers.jpg',
    count: 36
  }, {
    slug: 'sides',
    name: 'Rapid Sides & Veggies',
    heroTag: 'UNDER 10-MIN SIDES',
    count: 19
  }, {
    slug: 'snacks',
    name: 'Late Night Snacks',
    heroTag: 'INSTANT LATE NIGHT BITES',
    count: 8
  }, {
    slug: 'game-day',
    name: 'Game Day & Finger Foods',
    heroTag: 'CROWD-FEEDING APPETIZERS',
    image: IMG + 'air-fryer-crispy-garlic-parm-wings.jpg',
    count: 23
  }, {
    slug: 'breakfast',
    name: 'Dad Weekend Breakfast',
    heroTag: 'WEEKEND GRIDDLE CLASSICS',
    count: 19
  }, {
    slug: 'weekend',
    name: 'Weekend Project Cooks',
    heroTag: 'RELAXED WEEKEND MASTERY',
    image: IMG + 'air-fryer-juicy-bacon-cheeseburgers.jpg',
    count: 66
  }];
  var proteinCounts = {
    chicken: 51,
    beef: 41,
    pork: 38,
    seafood: 23,
    turkey: 12,
    lamb: 2,
    vegetarian: 37,
    'dairy-eggs': 22
  };
  var crisisCounts = {
    'no-thaw': 6,
    'sub-15': 56,
    'picky-kids': 86,
    'one-pan': 55,
    'high-protein': 123,
    budget: 68
  };
  var appliances = ['Air Fryer', 'Standard Home Oven', 'Instant Pot / Pressure Cooker', '12-Inch Skillet / Non-Stick', 'Sheet Pan (Convection Bake)', 'Cast Iron Skillet', 'Gas or Charcoal Grill', 'Dutch Oven / Heavy Pot', 'Slow Cooker / Crockpot', 'Pellet or Charcoal Smoker', 'Stovetop Boiling'];
  var guides = [{
    ref: 'REF-01 // FAMILY LOGISTICS',
    title: '10 Things I Wish I Knew Before Cooking For A Family',
    desc: 'Timeline synchronizing, heat moderation, and why pan crowding boils meat.',
    slug: 'things-i-wish-i-knew-cooking-for-family'
  }, {
    ref: 'REF-02 // PICKY EATERS',
    title: '10 Rules for Getting Picky Kids to Eat Real Food',
    desc: 'Deconstruction plating, dip leverage, and ending short-order cooking.',
    slug: 'rules-picky-kids-eat-real-food'
  }, {
    ref: 'REF-03 // HARDWARE',
    title: '10 Cast Iron Mistakes Dads Make (And What Matters)',
    desc: 'Debunking the soap myth, preheating duration, and dry meat searing.',
    slug: 'cast-iron-mistakes-dads-make'
  }, {
    ref: 'REF-04 // CONVECTION',
    title: '10 Air Fryer Realities Nobody Puts in the Manual',
    desc: 'Stopping white smoke, single-layer airflow, and -25°F conversion math.',
    slug: 'air-fryer-realities-nobody-tells-you'
  }];
  var fieldGuides = [{
    badge: 'FOOD SCIENCE',
    title: 'Why Wet Steaks Never Brown (Maillard Physics)',
    desc: 'Water absorbs 2,260 J/g to vaporize. Stop steaming steaks at 212°F.',
    slug: 'maillard-reaction-steak-searing',
    readMinutes: 6
  }, {
    badge: 'HARDWARE PHYSICS',
    title: 'Air Fryer Convection & Boundary Layers',
    desc: 'How 2,000 RPM airflow strips the boundary layer to cook 20% faster.',
    slug: 'air-fryer-convection-airflow-physics',
    readMinutes: 5
  }, {
    badge: 'SALT DENSITY',
    title: 'Equilibrium Salting (Diamond vs Morton)',
    desc: 'Why a spoon of Morton salt is 70% saltier than Diamond Crystal.',
    slug: 'equilibrium-salting-diamond-vs-morton',
    readMinutes: 4
  }, {
    badge: 'FOOD SAFETY',
    title: 'USDA vs Chef Internal Temperatures',
    desc: 'Why chicken is safe at 155°F with dwell time vs 165°F rubber.',
    slug: 'safe-internal-meat-temperatures-guide',
    readMinutes: 5
  }];
  var tools = [{
    href: '/reheat',
    badge: 'CRISP REVIVE',
    title: 'Takeout Revive Engine',
    description: 'Restore fries, pizza, and tenders to crispness without microwave mush.',
    icon: 'heat-waves',
    category: 'emergency'
  }, {
    href: '/frozen-cook',
    badge: 'USDA SAFETY',
    title: 'Freezer-to-Plate Matrix',
    description: 'Forgot to thaw? Direct frozen cook times and cold-water speed thaw rules.',
    icon: 'safety-shield',
    category: 'emergency'
  }, {
    href: '/dinner-sync',
    badge: 'REVERSE TIMELINE',
    title: 'Dinner Sync Scheduler',
    description: 'Sync multiple appliances so protein, veggies, and carbs finish hot together.',
    icon: 'clock',
    category: 'planning'
  }, {
    href: '/meat-math',
    badge: 'COSTCO SCALER',
    title: 'Feed The Crew Meat Math',
    description: 'Calculate raw butcher weights accounting for 25-50% shrinkage and bones.',
    icon: 'scale-weight',
    category: 'ratios'
  }, {
    href: '/internal-temp',
    badge: 'CARRYOVER RISE',
    title: 'Thermometer Pull Guide',
    description: 'Exact temperatures to pull meat early to prevent dry overcooked steaks.',
    icon: 'thermometer-probe',
    category: 'temperature'
  }, {
    href: '/salt-math',
    badge: 'SALT DENSITY',
    title: 'Equilibrium Salt Math',
    description: 'Convert Diamond Crystal vs Morton salt accurately by weight and spoons.',
    icon: 'scale-weight',
    category: 'ratios'
  }, {
    href: '/kid-split',
    badge: 'ZERO DOUBLE-COOK',
    title: 'Picky Kid Deconstructor',
    description: '60-second pull-aside steps to satisfy toddler sensory preferences.',
    icon: 'portion-plate',
    category: 'planning'
  }, {
    href: '/troubleshoot',
    badge: '5-SEC FIXES',
    title: 'Fix My Cook // Rescue',
    description: 'Instant remedies for smoking air fryers, soggy fries, and gray steak.',
    icon: 'flame',
    category: 'emergency'
  }, {
    href: '/air-fryer-calculator',
    badge: 'CONVECTION MATH',
    title: 'Air Fryer Conversion Calculator',
    description: 'Convert any oven recipe: -25°F and -20% time, with basket-load adjustments.',
    icon: 'appliance-air-fryer',
    category: 'temperature'
  }];
  var searchItems = recipes.map(function (r) {
    return {
      type: 'recipe',
      id: r.id,
      title: r.title,
      subtitle: r.tagline,
      badge: r.appliance,
      time: r.totalMinutes + 'm',
      href: '#/recipes/' + r.slug,
      keywords: [r.protein]
    };
  }).concat(fieldGuides.map(function (g, i) {
    return {
      type: 'guide',
      id: 'G' + (i + 1),
      title: g.title,
      subtitle: g.desc,
      badge: 'FIELD GUIDE',
      time: g.readMinutes + 'm read',
      href: '#/blog/' + g.slug
    };
  })).concat([{
    type: 'storage',
    id: 'S1',
    title: 'Cooked Chicken',
    subtitle: 'Fridge: 3–4 days',
    badge: 'STORAGE',
    time: '3–4 days',
    href: '#/storage/cooked-chicken'
  }]);
  return {
    root: ROOT,
    recipes: recipes,
    datasheets: datasheets,
    presets: presets,
    categories: categories,
    proteinCounts: proteinCounts,
    crisisCounts: crisisCounts,
    appliances: appliances,
    guides: guides,
    fieldGuides: fieldGuides,
    tools: tools,
    searchItems: searchItems,
    recipeCount: 228,
    datasheetCount: 378
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sample-data.js", error: String((e && e.message) || e) }); }

// ui_kits/web/App.jsx
try { (() => {
// Shell: Navbar + hash router + Footer + ⌘K search + consent + floating timer
(() => {
  const {
    Navbar,
    Footer,
    SearchModal,
    ConsentBanner,
    KitchenTimer
  } = window.MealInstructionsDesignSystem_767cb5;
  function parseHash() {
    const h = (location.hash || '#/').replace(/^#/, '');
    const m = h.match(/^\/recipes\/([^/?]+)/);
    if (m) return {
      screen: 'recipe',
      slug: m[1]
    };
    const d = h.match(/^\/how-long\/([^/]+)\/([^/?]+)/);
    if (d) return {
      screen: 'datasheet',
      slug: d[1] + '-' + d[2]
    };
    if (h.startsWith('/tools')) return {
      screen: 'tools'
    };
    return {
      screen: 'home'
    };
  }
  function App() {
    const D = window.MI_DATA;
    const [route, setRoute] = React.useState(parseHash());
    const [search, setSearch] = React.useState(false);
    const [timer, setTimer] = React.useState(false);
    const [signedIn, setSignedIn] = React.useState(false);
    React.useEffect(() => {
      const f = () => setRoute(parseHash());
      window.addEventListener('hashchange', f);
      const k = e => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setSearch(s => !s);
        }
      };
      window.addEventListener('keydown', k);
      return () => {
        window.removeEventListener('hashchange', f);
        window.removeEventListener('keydown', k);
      };
    }, []);
    const go = (screen, slug) => {
      if (screen === 'recipe') location.hash = '#/recipes/' + slug;else if (screen === 'datasheet') {
        const d = D.datasheets.find(x => x.slug === slug);
        location.hash = d ? '#/how-long/' + d.appliance + '/' + d.foodSlug : '#/how-long/' + slug;
      } else if (screen === 'tools') location.hash = '#/tools';else location.hash = '#/';
      window.scrollTo(0, 0);
    };
    const nav = href => {
      if (href === '/') go('home');else if (href === '/tools') go('tools');else if (href === '/how-long' || href === '/cheat-sheet' || href === '/appliances/air-fryer') go('datasheet', D.datasheets[0].slug);else if (href.startsWith('/categories')) go('home');else go('home');
    };
    const active = route.screen === 'tools' ? '/tools' : route.screen === 'datasheet' ? '/how-long' : '/';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper)',
        color: 'var(--ink)'
      }
    }, /*#__PURE__*/React.createElement(Navbar, {
      activeHref: active,
      onNavigate: nav,
      onSearch: () => setSearch(true),
      onSignIn: () => setSignedIn(true),
      signedIn: signedIn,
      recipeCount: D.recipeCount,
      datasheetCount: D.datasheetCount
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1
      }
    }, route.screen === 'home' && /*#__PURE__*/React.createElement(window.HomeScreen, {
      D: D,
      go: go
    }), route.screen === 'recipe' && /*#__PURE__*/React.createElement(window.RecipeScreen, {
      D: D,
      slug: route.slug,
      go: go
    }), route.screen === 'datasheet' && /*#__PURE__*/React.createElement(window.DatasheetScreen, {
      D: D,
      slug: route.slug,
      go: go
    }), route.screen === 'tools' && /*#__PURE__*/React.createElement(window.ToolsScreen, {
      D: D,
      go: go
    })), /*#__PURE__*/React.createElement(Footer, {
      datasheetCount: D.datasheetCount,
      onNavigate: nav
    }), /*#__PURE__*/React.createElement(SearchModal, {
      isOpen: search,
      onClose: () => setSearch(false),
      items: D.searchItems,
      onSelect: it => {
        location.hash = it.href;
        window.scrollTo(0, 0);
      }
    }), /*#__PURE__*/React.createElement(ConsentBanner, null), timer && /*#__PURE__*/React.createElement(KitchenTimer, {
      initialMinutes: 12,
      label: "Air Fryer Timer",
      onClose: () => setTimer(false)
    }), !timer && /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setTimer(true),
      className: "mi-btn mi-btn--ink mi-btn--rounded",
      style: {
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 49,
        boxShadow: 'var(--shadow-float)'
      }
    }, "\u23F1\uFE0F OPEN TIMER"));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/DatasheetScreen.jsx
try { (() => {
// Cook-time datasheet — recreation of app/how-long/[appliance]/[food]/page.tsx
(() => {
  const {
    LeanSpecBadge,
    StartCookButton,
    Button,
    Pill,
    Icon,
    Panel,
    MicroLabel
  } = window.MealInstructionsDesignSystem_767cb5;
  const dmono = {
    fontFamily: 'var(--font-mono)'
  };
  const HEAT = {
    'air-fryer': 'Convection Heat',
    oven: 'Radiant Heat',
    'instant-pot': 'Pressure Level',
    skillet: 'Stovetop Heat',
    'sheet-pan': 'Radiant Heat',
    'cast-iron': 'Stovetop Sear',
    grill: 'Direct Flame',
    'dutch-oven': 'Stovetop / Oven',
    'slow-cooker': 'Low & Slow',
    smoker: 'Indirect Smoke',
    boiling: 'Stovetop Boil'
  };
  function DatasheetScreen({
    D,
    slug,
    go
  }) {
    const s = D.datasheets.find(d => d.slug === slug) || D.datasheets[0];
    const a = s.appliance.replace('-', ' ');
    const food = s.food.toLowerCase();
    const oil = s.oilSprayRequired ? ' Spray lightly with high-smoke-point oil.' : '';
    const prep = 'Preheat ' + s.appliance + ' to ' + s.tempFormatted + '. Place ' + food + ' (' + s.cutOrPrep + ') in a single layer with space between items for convection airflow.' + oil;
    const cook = s.flipAtMinutes > 0 ? 'Cook for ' + s.timeFormatted + '. Flip or shake basket at the ' + s.flipAtMinutes + '-minute mark for even browning.' : 'Cook for ' + s.timeFormatted + '. Do not flip; allow surface to develop undisturbed.';
    const rest = s.donenessCue + (s.internalTempTargetFormatted ? ' Confirm internal temperature reaches ' + s.internalTempTargetFormatted + '.' : '') + ' Rest for ' + s.restMinutes + ' minutes before serving.';
    const Step = ({
      n,
      title,
      text
    }) => /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: 16,
        background: 'var(--paper)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'var(--ink)',
        color: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...dmono,
        fontSize: 12,
        fontWeight: 700,
        flexShrink: 0,
        marginTop: 2
      }
    }, n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        display: 'block',
        color: 'var(--ink)',
        fontSize: 14
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '2px 0 0',
        fontSize: 12,
        color: 'var(--ink-muted)',
        lineHeight: 1.625
      }
    }, text)));
    const others = D.datasheets.filter(d => d.appliance === s.appliance && d.slug !== s.slug).slice(0, 6);
    const rel = D.recipes.find(r => r.slug === s.relatedRecipeSlug);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 896,
        margin: '0 auto',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 40
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 12,
        ...dmono,
        color: 'var(--ink-subtle)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('home');
      },
      className: "mi-hover-ink",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        textTransform: 'uppercase',
        color: 'inherit'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 14
    }), /*#__PURE__*/React.createElement("span", null, s.appliance, " Charts")), /*#__PURE__*/React.createElement("span", {
      style: {
        textTransform: 'uppercase',
        color: 'var(--ink-muted)'
      }
    }, "DATASHEET // ", s.id)), /*#__PURE__*/React.createElement(Panel, {
      as: "section",
      padding: "xl",
      style: {
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        ...dmono,
        fontSize: 12,
        textTransform: 'uppercase'
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      bold: true,
      style: {
        fontSize: 12,
        padding: '4px 10px'
      }
    }, s.appliance), /*#__PURE__*/React.createElement(Pill, {
      variant: "muted",
      style: {
        fontSize: 12,
        padding: '4px 10px'
      }
    }, "STATE: ", s.state.toUpperCase()), /*#__PURE__*/React.createElement(Pill, {
      variant: "verified-soft",
      style: {
        fontSize: 12,
        padding: '4px 10px'
      }
    }, "VERIFIED DATASHEET")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-.01em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        lineHeight: 1.25
      }
    }, "How Long to Cook ", s.food, " in the ", a), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 16,
        color: 'var(--ink-muted)',
        lineHeight: 1.625
      }
    }, "Specification: ", s.cutOrPrep)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(LeanSpecBadge, {
      type: "temp",
      label: "Target Temp",
      value: s.tempFormatted,
      sub: HEAT[s.appliance] || 'Heat',
      accent: true
    }), /*#__PURE__*/React.createElement(LeanSpecBadge, {
      type: "time",
      label: "Total Time",
      value: s.timeFormatted,
      sub: "Total Cook Window"
    }), /*#__PURE__*/React.createElement(LeanSpecBadge, {
      type: "flip",
      label: "Flip Mark",
      value: s.flipAtMinutes > 0 ? s.flipAtMinutes + 'm' : 'No Flip',
      sub: s.flipAtMinutes > 0 ? 'Turnover Point' : 'Continuous Cook'
    }), /*#__PURE__*/React.createElement(LeanSpecBadge, {
      type: "probe",
      label: "Internal Safe Temp",
      value: s.internalTempTargetFormatted || '—',
      sub: "USDA Safe Pull"
    })), /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        background: 'var(--paper)',
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent"
    }, "COOK MODE"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        ...dmono,
        color: 'var(--ink-muted)',
        textTransform: 'uppercase'
      }
    }, "Live timer \xB7 flip prompt \xB7 target temp \xB7 rest stage")), /*#__PURE__*/React.createElement(StartCookButton, {
      appliance: s.appliance,
      foodSlug: s.foodSlug,
      onClick: e => e.preventDefault()
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        color: 'var(--ink)',
        ...dmono,
        borderBottom: '1px solid var(--hairline)',
        paddingBottom: 8
      }
    }, "3-Step Execution Protocol"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Step, {
      n: 1,
      title: "Preheat & Prep",
      text: prep
    }), /*#__PURE__*/React.createElement(Step, {
      n: 2,
      title: s.flipAtMinutes > 0 ? 'Cook & Flip' : 'Cook',
      text: cook
    }), /*#__PURE__*/React.createElement(Step, {
      n: 3,
      title: "Check & Rest",
      text: rest
    }))), /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        background: 'var(--paper)',
        padding: 16,
        ...dmono,
        fontSize: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--ink)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 16,
      style: {
        color: 'var(--verified)'
      }
    }), /*#__PURE__*/React.createElement("span", null, "Verification Basis & Testing Rig")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 12,
        color: 'var(--ink-muted)',
        fontFamily: 'var(--font-sans)'
      }
    }, s.verificationBasis), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 8,
        borderTop: '1px solid var(--hairline)',
        fontSize: 11,
        color: 'var(--ink-subtle)'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Pro Tip:"), " ", s.proTip || '—')), rel && /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--hairline)',
        paddingTop: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...dmono,
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-muted)'
      }
    }, "Want the complete meal with seasoning & sides?"), /*#__PURE__*/React.createElement(Button, {
      iconRight: "arrow-up-right",
      onClick: () => go('recipe', rel.slug)
    }, "View Full Recipe"))), /*#__PURE__*/React.createElement("section", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: 14,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        color: 'var(--ink)',
        ...dmono
      }
    }, "Related ", a, " Cook Times"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 12,
        ...dmono,
        fontSize: 12
      }
    }, others.map(o => /*#__PURE__*/React.createElement("a", {
      key: o.slug,
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('datasheet', o.slug);
      },
      className: "mi-tile",
      style: {
        padding: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--ink)',
        fontSize: 12,
        fontFamily: 'var(--font-sans)',
        marginBottom: 4
      }
    }, o.food), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 11,
        color: 'var(--ink-muted)',
        borderTop: '1px solid var(--hairline)',
        paddingTop: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", null, o.tempFormatted), /*#__PURE__*/React.createElement("span", null, o.timeFormatted)))))));
  }
  window.DatasheetScreen = DatasheetScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/DatasheetScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/HomeScreen.jsx
try { (() => {
// Home / directory — recreation of app/HomePageClient.tsx
(() => {
  const {
    ProteinSelectorBar,
    RecipeScrubber,
    CrisisTriageBar,
    CategoryGrid,
    KitchenHud,
    RecipeCard,
    RecipeTable,
    Button,
    Pill,
    MicroLabel,
    Segmented,
    Icon,
    LeanIcon,
    Panel,
    StatusDot
  } = window.MealInstructionsDesignSystem_767cb5;
  const wrap = {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 32px',
    width: '100%',
    boxSizing: 'border-box'
  };
  const mono = {
    fontFamily: 'var(--font-mono)'
  };
  function HomeScreen({
    D,
    go
  }) {
    const [protein, setProtein] = React.useState('all');
    const [cat, setCat] = React.useState('all');
    const [appl, setAppl] = React.useState('all');
    const [max, setMax] = React.useState(null);
    const [view, setView] = React.useState('grid');
    const [preset, setPreset] = React.useState(null);
    const [q, setQ] = React.useState('');
    const [sort, setSort] = React.useState('default');
    const [hi, setHi] = React.useState(null);
    const APPL = {
      'Air Fryer': 'air-fryer',
      'Standard Home Oven': 'oven',
      'Instant Pot / Pressure Cooker': 'instant-pot',
      '12-Inch Skillet / Non-Stick': 'skillet',
      'Sheet Pan (Convection Bake)': 'sheet-pan',
      'Cast Iron Skillet': 'cast-iron',
      'Gas or Charcoal Grill': 'grill',
      'Dutch Oven / Heavy Pot': 'dutch-oven',
      'Slow Cooker / Crockpot': 'slow-cooker',
      'Pellet or Charcoal Smoker': 'smoker',
      'Stovetop Boiling': 'boiling'
    };
    const list = D.recipes.filter(r => (max == null || r.totalMinutes <= max) && (protein === 'all' || r.protein === protein) && (cat === 'all' || (r.categories || []).includes(cat)) && (appl === 'all' || r.appliance === appl) && (!q || (r.title + r.tagline + r.protein + r.appliance).toLowerCase().includes(q.toLowerCase()))).sort((a, b) => sort === 'fastest' ? a.totalMinutes - b.totalMinutes : sort === 'protein' ? (b.nutrition.proteinGrams || 0) - (a.nutrition.proteinGrams || 0) : sort === 'alphabetical' ? a.title.localeCompare(b.title) : 0);
    const countFor = m => m == null ? D.recipeCount : Math.round(D.recipeCount * D.recipes.filter(r => r.totalMinutes <= m).length / D.recipes.length);
    const active = max != null || protein !== 'all' || cat !== 'all' || appl !== 'all' || preset || q;
    const reset = () => {
      setProtein('all');
      setMax(null);
      setCat('all');
      setAppl('all');
      setPreset(null);
      setQ('');
      setHi(null);
    };
    const onPreset = p => {
      if (!p) {
        setPreset(null);
        setCat('all');
        setMax(null);
        return;
      }
      setPreset(p.id);
      if (p.category) setCat(p.category);
      if (p.maxMinutes) setMax(p.maxMinutes);
    };
    const roll = () => {
      if (!list.length) return;
      setHi(list[Math.floor(Math.random() * list.length)].slug);
    };
    const catCounts = Object.fromEntries(D.categories.map(c => [c.slug, c.count]));
    const airFryer = D.datasheets.slice(0, 6);
    const open = r => go('recipe', r.slug);
    const H2 = ({
      children,
      black
    }) => /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 30,
        fontWeight: black ? 900 : 700,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        color: 'var(--ink)'
      }
    }, children);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper)'
      }
    }, /*#__PURE__*/React.createElement(ProteinSelectorBar, {
      selected: protein,
      onSelect: setProtein,
      counts: D.proteinCounts,
      total: D.recipeCount
    }), /*#__PURE__*/React.createElement(RecipeScrubber, {
      maxMinutes: max,
      onTimeChange: setMax,
      countFor: countFor,
      sample: "Crispy Air Fryer Chicken Tenders (15m)"
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 24,
        paddingBottom: 24,
        borderBottom: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 24,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent",
      dot: true,
      style: {
        letterSpacing: '.14em'
      }
    }, "THE ZERO-FLUFF HOME COOKING ENGINE"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 48,
        fontWeight: 900,
        letterSpacing: '-.01em',
        textTransform: 'uppercase',
        lineHeight: 1,
        color: 'var(--ink)'
      }
    }, "No fluff. ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)'
      }
    }, "Just the instructions.")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        ...mono,
        fontSize: 14,
        color: 'var(--ink-muted)',
        lineHeight: 1.625
      }
    }, "Parametric cook-time database and ", D.recipeCount, " quality-gated weeknight meals. Exact temperatures, verified air fryer datasheets, zero life stories.")), /*#__PURE__*/React.createElement(Panel, {
      variant: "inset",
      rounded: true,
      shadow: true,
      padding: "md",
      style: {
        ...mono,
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: '.14em',
        color: 'var(--ink-subtle)',
        borderBottom: '1px solid var(--hairline)',
        paddingBottom: 8,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", null, "SYSTEM SPECIFICATIONS"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        fontWeight: 700
      }
    }, "V 2.0 PRECISION")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        color: 'var(--ink)'
      }
    }, [['TOTAL INDEXED MEALS:', D.recipeCount + ' RECIPES'], ['USDA DATASHEETS:', D.datasheetCount + ' VERIFIED'], ['LIFE STORIES REMOVED:', '100% (0 WORDS)', true]].map(([k, v, a]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-muted)'
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: a ? 'var(--accent)' : 'var(--ink)'
      }
    }, v))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-muted)'
      }
    }, "AI & LLM TERMINAL:"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "mi-hover-accent",
      style: {
        fontWeight: 700,
        textDecoration: 'underline',
        color: 'var(--ink)'
      }
    }, "LLMS.TXT READY"))))), /*#__PURE__*/React.createElement("div", {
      className: "scrollbar-none",
      style: {
        marginTop: 24,
        paddingTop: 16,
        borderTop: '1px solid rgba(223,220,206,.8)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        overflowX: 'auto',
        fontSize: 11,
        ...mono,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: 'var(--ink-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        color: 'var(--ink-subtle)',
        fontWeight: 700
      }
    }, "POPULAR HARDWARE:"), D.appliances.map(a => /*#__PURE__*/React.createElement("button", {
      key: a,
      type: "button",
      onClick: () => setAppl(appl === APPL[a] ? 'all' : APPL[a]),
      className: 'mi-chip mi-chip--card' + (appl === APPL[a] ? ' is-active' : ''),
      style: {
        padding: '4px 12px',
        flexShrink: 0
      }
    }, a)))), /*#__PURE__*/React.createElement(KitchenHud, {
      datasheets: D.datasheets,
      recipes: D.recipes,
      presets: D.presets,
      datasheetCount: D.datasheetCount,
      recipeCount: D.recipeCount,
      onOpenRecipe: r => go('recipe', r.slug),
      onOpenDatasheet: d => go('datasheet', d.slug)
    }), /*#__PURE__*/React.createElement(CrisisTriageBar, {
      activePreset: preset,
      onSelectPreset: onPreset,
      counts: D.crisisCounts
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 32,
        paddingBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "ink",
      dot: "ink",
      pulse: false,
      style: {
        fontSize: 12,
        letterSpacing: '.08em'
      }
    }, "BROWSE BY INTENT & HARDWARE"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        ...mono,
        color: 'var(--ink-muted)'
      }
    }, "CLICK TO FILTER DIRECTORY")), /*#__PURE__*/React.createElement(CategoryGrid, {
      categories: D.categories,
      selected: cat,
      onSelect: setCat,
      counts: catCounts
    })), /*#__PURE__*/React.createElement("section", {
      id: "directory",
      style: {
        ...wrap,
        paddingTop: 32,
        paddingBottom: 32
      }
    }, active && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16,
        padding: 12,
        background: 'var(--paper-100)',
        border: '1px solid var(--hairline)',
        borderRadius: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        fontSize: 12,
        ...mono
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        textTransform: 'uppercase'
      }
    }, "ACTIVE FILTERS:"), protein !== 'all' && /*#__PURE__*/React.createElement(Pill, {
      variant: "accent",
      rounded: true
    }, "PROTEIN: ", protein.toUpperCase()), max != null && /*#__PURE__*/React.createElement(Pill, {
      variant: "ink",
      rounded: true
    }, "\u2264 ", max, " MINS TOTAL"), cat !== 'all' && /*#__PURE__*/React.createElement(Pill, {
      variant: "inset",
      rounded: true,
      style: {
        textTransform: 'uppercase'
      }
    }, "CATEGORY: ", cat), appl !== 'all' && /*#__PURE__*/React.createElement(Pill, {
      variant: "inset",
      rounded: true
    }, "APPLIANCE: ", appl), preset && /*#__PURE__*/React.createElement(Pill, {
      variant: "accent-soft",
      rounded: true,
      bold: true,
      style: {
        background: 'var(--accent-15)',
        borderColor: 'var(--accent-30)'
      }
    }, "CRISIS: ", preset.toUpperCase()), q && /*#__PURE__*/React.createElement(Pill, {
      variant: "inset",
      rounded: true
    }, "SEARCH: \"", q, "\""), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-muted)'
      }
    }, "(", list.length, " of ", D.recipeCount, " meals match)")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: reset,
      className: "mi-hover-underline",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--accent)',
        background: 'none',
        border: 0,
        cursor: 'pointer',
        ...mono
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "rotate-ccw",
      size: 12
    }), "CLEAR ALL FILTERS")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16,
        background: 'var(--paper-50)',
        border: '1px solid var(--hairline)',
        borderRadius: 4,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        fontSize: 12,
        ...mono
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 320
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 14,
      style: {
        color: 'var(--ink-subtle)',
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }), /*#__PURE__*/React.createElement("input", {
      className: "mi-input",
      value: q,
      onChange: e => setQ(e.target.value),
      placeholder: "Search recipes by name, cut, ingredient..."
    }), q && /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "mi-icon-btn",
      onClick: () => setQ(''),
      style: {
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 12
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      rounded: true,
      icon: "dices",
      onClick: roll,
      title: "Pick a random dinner from matching results",
      style: {
        fontSize: 11,
        boxShadow: 'var(--shadow-subtle)'
      }
    }, "ROLL DINNER"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase'
      }
    }, "SORT:"), /*#__PURE__*/React.createElement("select", {
      value: sort,
      onChange: e => setSort(e.target.value),
      style: {
        background: 'var(--paper)',
        border: '1px solid var(--hairline)',
        borderRadius: 4,
        padding: '4px 8px',
        color: 'var(--ink)',
        fontWeight: 700,
        textTransform: 'uppercase',
        ...mono,
        fontSize: 11,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "default"
    }, "INDEX # (DEFAULT)"), /*#__PURE__*/React.createElement("option", {
      value: "fastest"
    }, "\u26A1 FASTEST (LEAST TIME)"), /*#__PURE__*/React.createElement("option", {
      value: "protein"
    }, "\uD83E\uDD69 HIGHEST PROTEIN"), /*#__PURE__*/React.createElement("option", {
      value: "alphabetical"
    }, "A\u2013Z ALPHABETICAL"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        borderBottom: '1px solid var(--hairline)',
        paddingBottom: 16,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "scrollbar-none",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        overflowX: 'auto',
        fontSize: 11,
        ...mono,
        textTransform: 'uppercase',
        letterSpacing: '.08em'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setCat('all'),
      className: 'mi-chip mi-chip--sm' + (cat === 'all' ? ' is-active' : ''),
      style: {
        flexShrink: 0
      }
    }, "ALL [", D.recipeCount, "]"), D.categories.map(c => /*#__PURE__*/React.createElement("button", {
      key: c.slug,
      type: "button",
      onClick: () => setCat(c.slug),
      className: 'mi-chip mi-chip--sm' + (cat === c.slug ? ' is-active' : ''),
      style: {
        flexShrink: 0
      }
    }, c.name.replace(' Staples', '').replace(' Meals', ''), " [", c.count, "]"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        ...mono,
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: 'var(--ink-subtle)'
      }
    }, "VIEW:"), /*#__PURE__*/React.createElement(Segmented, {
      icon: true,
      value: view,
      onChange: setView,
      options: [{
        value: 'grid',
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "layout-grid"
        }),
        title: 'Grid View'
      }, {
        value: 'table',
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "list-filter"
        }),
        title: 'Index Table View'
      }]
    }))), view === 'grid' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 24
      }
    }, list.map(r => /*#__PURE__*/React.createElement(RecipeCard, {
      key: r.id,
      recipe: r,
      isHighlighted: r.slug === hi,
      onOpen: open
    }))) : /*#__PURE__*/React.createElement(RecipeTable, {
      recipes: list,
      onOpen: open
    }), !list.length && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: 64,
        background: 'var(--paper-50)',
        borderRadius: 4,
        border: '1px solid var(--hairline)',
        ...mono
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        margin: 0
      }
    }, "No meals match your active filters."), /*#__PURE__*/React.createElement(Button, {
      rounded: true,
      onClick: reset,
      style: {
        marginTop: 12
      }
    }, "RESET ALL FILTERS"))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 40,
        paddingBottom: 40
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--paper-100)',
        border: '1px solid var(--hairline)',
        borderRadius: 8,
        padding: 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        borderBottom: '1px solid var(--hairline)',
        paddingBottom: 16,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        padding: 8,
        background: 'var(--paper)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(LeanIcon, {
      name: "appliance-air-fryer",
      size: 28,
      style: {
        color: 'var(--accent)'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent",
      style: {
        fontWeight: 700
      }
    }, "INSTANT REFERENCE"), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '2px 0 0',
        fontFamily: 'var(--font-sans)',
        fontSize: 24,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--ink)'
      }
    }, "AIR FRYER QUICK TEMPERATURE MATRIX"))), /*#__PURE__*/React.createElement(Button, {
      rounded: true,
      size: "sm",
      style: {
        fontSize: 12
      },
      onClick: () => go('datasheet', D.datasheets[0].slug)
    }, "VIEW FULL CHEAT SHEET \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0,1fr))',
        gap: 12,
        ...mono,
        textAlign: 'center'
      }
    }, airFryer.map(m => /*#__PURE__*/React.createElement("a", {
      key: m.slug,
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('datasheet', m.slug);
      },
      className: "mi-tile mi-tile--rounded",
      style: {
        padding: 12,
        background: 'var(--paper-50)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block'
      }
    }, m.food), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '8px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        fontSize: 16,
        fontWeight: 900,
        color: 'var(--ink)'
      }
    }, /*#__PURE__*/React.createElement(LeanIcon, {
      name: "heat-waves",
      size: 16,
      style: {
        color: 'var(--accent)'
      }
    }), /*#__PURE__*/React.createElement("span", null, m.tempFormatted.split(' ')[0])), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--ink-muted)'
      }
    }, /*#__PURE__*/React.createElement(LeanIcon, {
      name: "clock",
      size: 13,
      style: {
        color: 'var(--ink-subtle)'
      }
    }), /*#__PURE__*/React.createElement("span", null, m.timeFormatted))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: 'var(--accent)',
        fontWeight: 700,
        background: 'var(--paper-200)',
        padding: '2px 6px',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(LeanIcon, {
      name: "flip-action",
      size: 11
    }), m.flipAtMinutes > 0 ? 'Flip ' + m.flipAtMinutes + 'm' : 'No Flip')))))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 40,
        paddingBottom: 40,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent"
    }, "PARAMETRIC UTILITIES"), /*#__PURE__*/React.createElement(H2, null, "Tactile Kitchen Engines & Tools")), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('tools');
      },
      className: "mi-hover-underline",
      style: {
        ...mono,
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--ink)',
        display: 'flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "View All 30 Tools"), /*#__PURE__*/React.createElement("span", null, "\u2192"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 12,
        ...mono,
        fontSize: 12
      }
    }, D.tools.slice(0, 8).map(t => /*#__PURE__*/React.createElement("a", {
      key: t.href,
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('tools');
      },
      className: "mi-tile",
      style: {
        gap: 8,
        justifyContent: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--accent)',
        fontWeight: 700,
        textTransform: 'uppercase'
      }
    }, t.badge), /*#__PURE__*/React.createElement("div", {
      className: "mi-tile__title",
      style: {
        fontWeight: 700,
        color: 'var(--ink)',
        fontSize: 14,
        fontFamily: 'var(--font-sans)'
      }
    }, t.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 11,
        color: 'var(--ink-muted)',
        fontFamily: 'var(--font-sans)'
      }
    }, t.description))))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 40,
        paddingBottom: 40,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent",
      dot: true,
      style: {
        fontSize: 12,
        letterSpacing: '.08em',
        marginBottom: 4
      }
    }, "20 OPERATIONAL TOP 10 LISTS"), /*#__PURE__*/React.createElement(H2, {
      black: true
    }, "Battle-Tested Dad & Home Cook Guides")), /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "mi-hover-accent",
      style: {
        ...mono,
        fontSize: 12,
        color: 'var(--ink)',
        fontWeight: 700,
        textTransform: 'uppercase',
        display: 'flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "View All 20 Guides"), /*#__PURE__*/React.createElement("span", null, "\u2192"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 16
      }
    }, D.guides.map(g => /*#__PURE__*/React.createElement("a", {
      key: g.slug,
      href: "#",
      className: "mi-tile",
      style: {
        padding: 20,
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--accent)',
        fontWeight: 700,
        textTransform: 'uppercase',
        ...mono
      }
    }, g.ref), /*#__PURE__*/React.createElement("h3", {
      className: "mi-tile__title",
      style: {
        margin: 0,
        fontWeight: 700,
        color: 'var(--ink)',
        fontSize: 14,
        fontFamily: 'var(--font-sans)'
      }
    }, g.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 11,
        color: 'var(--ink-muted)'
      }
    }, g.desc)), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 8,
        borderTop: '1px solid rgba(223,220,206,.6)',
        fontSize: 10,
        ...mono,
        color: 'var(--ink)',
        fontWeight: 700,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", null, "4 MIN READ"), /*#__PURE__*/React.createElement("span", null, "READ GUIDE \u2192")))))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 48,
        paddingBottom: 48,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent"
    }, "50 PEER-REVIEWED REFERENCES"), /*#__PURE__*/React.createElement(H2, null, "Culinary Physics & Field Guides")), /*#__PURE__*/React.createElement(Button, {
      rounded: true,
      size: "sm",
      style: {
        fontSize: 12,
        padding: '6px 14px'
      }
    }, "VIEW ALL 50 FIELD GUIDES \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 16,
        ...mono,
        fontSize: 12
      }
    }, D.fieldGuides.map(g => /*#__PURE__*/React.createElement("a", {
      key: g.slug,
      href: "#",
      className: "mi-tile mi-tile--rounded",
      style: {
        gap: 8,
        justifyContent: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--accent)',
        fontWeight: 700,
        textTransform: 'uppercase'
      }
    }, g.badge), /*#__PURE__*/React.createElement("div", {
      className: "mi-tile__title",
      style: {
        fontWeight: 700,
        color: 'var(--ink)',
        fontSize: 14,
        fontFamily: 'var(--font-sans)',
        lineHeight: 1.375
      }
    }, g.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 11,
        color: 'var(--ink-muted)',
        fontFamily: 'var(--font-sans)'
      }
    }, g.desc))))), /*#__PURE__*/React.createElement("section", {
      style: {
        ...wrap,
        paddingTop: 48,
        paddingBottom: 48,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      variant: "dark",
      padding: "xl",
      style: {
        padding: 48,
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 768
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 10,
        ...mono,
        textTransform: 'uppercase',
        letterSpacing: '.14em',
        color: 'var(--accent)',
        fontWeight: 700,
        marginBottom: 8
      }
    }, "WHY MEAL INSTRUCTIONS EXISTS"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-.01em',
        textTransform: 'uppercase',
        lineHeight: 1.25
      }
    }, "NO ESSAYS ABOUT GRANDMOTHER\u2019S CABIN. NO 5-PAGE ADS."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 16,
        color: 'rgba(245,244,240,.8)',
        marginTop: 16,
        marginBottom: 0,
        lineHeight: 1.625
      }
    }, "When you have hungry kids asking what\u2019s for dinner at 6:15 PM, you do not need 2,000 words on the cultural significance of chicken tenders. You need to know the temperature, the time, and when to flip the basket. That\u2019s it."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "paper",
      rounded: true,
      style: {
        padding: '8px 16px'
      }
    }, "READ THE MANIFESTO"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        ...mono,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: 'rgba(245,244,240,.7)',
        textDecoration: 'underline',
        textUnderlineOffset: 4
      }
    }, "VIEW MACHINE-READABLE LLMS.TXT \u2192"))))));
  }
  window.HomeScreen = HomeScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/RecipeScreen.jsx
try { (() => {
// Recipe page — recreation of app/recipes/[slug]/RecipeClientView.tsx
(() => {
  const {
    Lean5SMatrix,
    ModeSwitch,
    ShareButton,
    PortionScaler,
    MealActions,
    Button,
    Pill,
    Icon,
    LeanIcon,
    Panel,
    MicroLabel
  } = window.MealInstructionsDesignSystem_767cb5;
  const rmono = {
    fontFamily: 'var(--font-mono)'
  };
  const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  function scale(q, m) {
    const v = q * m;
    return Number.isInteger(v) ? String(v) : (Math.round(v * 100) / 100).toString();
  }
  function RecipeScreen({
    D,
    slug,
    go
  }) {
    const r = D.recipes.find(x => x.slug === slug) || D.recipes[0];
    const [mode, setMode] = React.useState('fast');
    const [mult, setMult] = React.useState(4);
    const [done, setDone] = React.useState([]);
    const secs0 = (r.quickVersion && r.quickVersion.timerMinutes || r.cookMinutes || 12) * 60;
    const [left, setLeft] = React.useState(secs0);
    const [run, setRun] = React.useState(false);
    const [fin, setFin] = React.useState(false);
    React.useEffect(() => {
      if (!run || left <= 0) return;
      const t = setInterval(() => setLeft(p => {
        if (p <= 1) {
          setRun(false);
          setFin(true);
          return 0;
        }
        return p - 1;
      }), 1000);
      return () => clearInterval(t);
    }, [run, left]);
    const ds = D.datasheets.find(d => d.relatedRecipeSlug === r.slug);
    const related = D.recipes.filter(x => x.slug !== r.slug && (x.appliance === r.appliance || x.protein === r.protein)).slice(0, 4);
    const qv = r.quickVersion || {
      bullets: [r.tagline],
      timerMinutes: r.cookMinutes || 12,
      flipAtMinutes: 0
    };
    const steps = r.detailedSteps || [];
    const ings = r.ingredients || [];
    const head = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--hairline)',
      paddingBottom: 16
    };
    const H2 = ({
      children
    }) => /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 20,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        color: 'var(--ink)'
      }
    }, children);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 896,
        margin: '0 auto',
        padding: '32px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 12,
        ...rmono,
        color: 'var(--ink-subtle)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('home');
      },
      className: "mi-hover-ink",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        textTransform: 'uppercase',
        color: 'inherit'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 14
    }), /*#__PURE__*/React.createElement("span", null, "Back to Index")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", null, "SPECIMEN #", r.id), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", {
      style: {
        textTransform: 'uppercase',
        color: 'var(--ink-muted)'
      }
    }, r.appliance))), /*#__PURE__*/React.createElement(Panel, {
      padding: "xl",
      as: "section",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      bold: true
    }, r.appliance), (r.categories || []).map(c => /*#__PURE__*/React.createElement(Pill, {
      key: c,
      variant: "muted",
      href: "#",
      onClick: e => e.preventDefault()
    }, c)), /*#__PURE__*/React.createElement(Pill, {
      variant: "verified"
    }, "VERIFIED NO-FLUFF")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-.01em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        lineHeight: 1.25
      }
    }, r.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 16,
        color: 'var(--ink-muted)',
        lineHeight: 1.625
      }
    }, r.tagline)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '4px 12px',
        fontSize: 11,
        ...rmono,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: 'var(--ink-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "By ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "mi-opacity-link",
      style: {
        color: 'var(--ink)',
        textDecoration: 'underline'
      }
    }, "Meal Instructions Kitchen")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-subtle)'
      }
    }, "\u2022"), /*#__PURE__*/React.createElement("span", null, "Published ", r.datePublished || 'Aug 29, 2026'), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-subtle)'
      }
    }, "\u2022"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--verified-strong)'
      }
    }, "Reviewed for USDA Food Safety")), r.image && /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        position: 'relative',
        width: '100%',
        height: 384,
        borderRadius: 4,
        overflow: 'hidden',
        background: 'var(--paper)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: r.image,
      alt: r.title,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }
    })), /*#__PURE__*/React.createElement(Lean5SMatrix, {
      cookTemp: r.cookTemp,
      totalMinutes: r.totalMinutes,
      proteinGrams: r.nutrition && r.nutrition.proteinGrams || 30,
      flipMinutes: qv.flipAtMinutes,
      servings: r.defaultServings || 4
    }), /*#__PURE__*/React.createElement(ShareButton, {
      smsText: '🍳 ' + r.title.toUpperCase(),
      markdown: '# ' + r.title
    })), ds && /*#__PURE__*/React.createElement(Panel, {
      verified: true,
      hover: true,
      as: "a",
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('datasheet', ds.slug);
      },
      padding: "lg",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        textDecoration: 'none',
        color: 'inherit'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 16,
      style: {
        color: 'var(--verified)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        ...rmono,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        color: 'var(--verified-strong)'
      }
    }, "Verified Cook-Time Datasheet"), ds.state !== 'fresh' && /*#__PURE__*/React.createElement(Pill, {
      variant: "info",
      size: "xs"
    }, ds.state)), /*#__PURE__*/React.createElement("span", {
      className: "mi-hover-accent",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        ...rmono,
        fontSize: 10,
        color: 'var(--ink-muted)',
        textTransform: 'uppercase'
      }
    }, "View Full Datasheet ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 12
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: 14,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        color: 'var(--ink)'
      }
    }, ds.food), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '2px 0 0',
        fontSize: 12,
        color: 'var(--ink-muted)'
      }
    }, ds.cutOrPrep)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0,1fr))',
        gap: 8
      }
    }, [[ds.tempF + '°F', 'Temp'], [ds.timeFormatted, 'Cook Time'], [ds.internalTempTargetF ? ds.internalTempTargetF + '°F' : '—', 'Internal', true], ds.flipAtMinutes > 0 && [ds.flipAtMinutes + 'm', 'Flip At'], ds.restMinutes > 0 && [ds.restMinutes + 'm', 'Rest']].filter(Boolean).map(([v, l, a]) => /*#__PURE__*/React.createElement("div", {
      key: l,
      className: "hairline-border",
      style: {
        background: 'var(--paper)',
        padding: 10,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...rmono,
        fontSize: 18,
        fontWeight: 700,
        color: a ? 'var(--accent)' : 'var(--ink)'
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        ...rmono,
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase',
        marginTop: 2
      }
    }, l)))), /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        fontSize: 12,
        color: 'var(--ink-muted)',
        background: 'var(--paper)',
        padding: 12,
        lineHeight: 1.625
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...rmono,
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--ink)',
        textTransform: 'uppercase'
      }
    }, "Doneness: "), ds.donenessCue), /*#__PURE__*/React.createElement("div", {
      style: {
        ...rmono,
        fontSize: 10,
        color: 'var(--ink-subtle)',
        borderTop: '1px solid var(--hairline)',
        paddingTop: 8
      }
    }, ds.verificationBasis)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement(ModeSwitch, {
      mode: mode,
      onChange: setMode,
      top: 64
    }), /*#__PURE__*/React.createElement(Panel, {
      as: "section",
      padding: "lg",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        width: 32,
        height: 32,
        background: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 16
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontWeight: 700,
        fontSize: 14,
        textTransform: 'uppercase',
        color: 'var(--ink)'
      }
    }, r.appliance, " Timer"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 12,
        color: 'var(--ink-muted)'
      }
    }, "Set for ", qv.timerMinutes, " mins @ ", r.cookTemp, qv.flipAtMinutes ? ' (Flip at ' + qv.flipAtMinutes + 'm)' : ''))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: fin ? 'animate-bounce' : '',
      style: {
        ...rmono,
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: '-.01em',
        color: fin ? 'var(--accent)' : run ? 'var(--ink)' : 'var(--ink-muted)'
      }
    }, fmt(left)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: run ? 'caution' : fin ? 'accent' : 'ink',
      icon: run ? 'pause' : 'play',
      onClick: () => {
        if (fin) {
          setLeft(secs0);
          setFin(false);
          setRun(true);
        } else setRun(!run);
      },
      style: {
        padding: '8px 16px'
      }
    }, run ? 'PAUSE' : fin ? 'DONE!' : 'START'), /*#__PURE__*/React.createElement(Button, {
      variant: "outline-muted",
      iconOnly: true,
      icon: "rotate-ccw",
      title: "Reset timer",
      onClick: () => {
        setRun(false);
        setFin(false);
        setLeft(secs0);
      }
    }))))), /*#__PURE__*/React.createElement(Panel, {
      as: "section",
      padding: "xl",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...head,
        flexWrap: 'wrap',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        padding: 8,
        background: 'var(--paper)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(LeanIcon, {
      name: "fork-knife",
      size: 24
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(H2, null, "Ingredients"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 12,
        color: 'var(--ink-muted)'
      }
    }, "Base recipe calibrated for ", r.defaultServings || 4, " adults."))), /*#__PURE__*/React.createElement(PortionScaler, {
      variant: "multiplier",
      currentServings: mult,
      onChange: setMult
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        fontSize: 14
      }
    }, ings.map((i, k) => /*#__PURE__*/React.createElement("div", {
      key: k,
      className: "hairline-border",
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: 12,
        background: 'var(--paper)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "hairline-border",
      style: {
        ...rmono,
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--ink)',
        background: 'var(--paper-50)',
        padding: '2px 8px',
        flexShrink: 0
      }
    }, i.qtyNumeric ? scale(i.qtyNumeric, mult / 4) + ' ' + i.unit : i.qty + ' ' + i.unit), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: 'var(--ink)',
        lineHeight: 1.375
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, i.item), i.notes && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-muted)',
        display: 'block',
        fontSize: 12,
        marginTop: 2
      }
    }, i.notes)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, mode === 'fast' && /*#__PURE__*/React.createElement(Panel, {
      as: "section",
      padding: "xl",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: head
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "zap",
      size: 20,
      style: {
        color: 'var(--accent)'
      }
    }), /*#__PURE__*/React.createElement(H2, null, "Get to the Point Execution")), /*#__PURE__*/React.createElement("span", {
      style: {
        ...rmono,
        fontSize: 10,
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase'
      }
    }, "20-WORD BULLETS // NO FLUFF")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, qv.bullets.map((b, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "hairline-border",
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        padding: 16,
        background: 'var(--paper)',
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'var(--ink)',
        color: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...rmono,
        fontSize: 12,
        fontWeight: 700,
        flexShrink: 0,
        marginTop: 2
      }
    }, i + 1), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        color: 'var(--ink)',
        fontWeight: 500,
        lineHeight: 1.625
      }
    }, b)))), qv.flipAtMinutes > 0 && /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        padding: 12,
        background: 'var(--paper)',
        ...rmono,
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        padding: 4,
        background: 'var(--paper-50)',
        color: 'var(--accent)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(LeanIcon, {
      name: "flip-action",
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--accent)'
      }
    }, "Critical Flip Mark:"), /*#__PURE__*/React.createElement("span", null, "Flip at exactly ", /*#__PURE__*/React.createElement("strong", null, qv.flipAtMinutes, " minutes"), "."))), mode === 'detailed' && /*#__PURE__*/React.createElement(Panel, {
      as: "section",
      padding: "xl",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: head
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "book-open",
      size: 20
    }), /*#__PURE__*/React.createElement(H2, null, "Step-by-Step Guided Instructions")), /*#__PURE__*/React.createElement("span", {
      style: {
        ...rmono,
        fontSize: 10,
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase'
      }
    }, "FLUFF-FREE GUIDED STEPS")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, steps.map(s => {
      const isDone = done.includes(s.stepNumber);
      return /*#__PURE__*/React.createElement("div", {
        key: s.stepNumber,
        onClick: () => setDone(isDone ? done.filter(n => n !== s.stepNumber) : [...done, s.stepNumber]),
        className: 'mi-step' + (isDone ? ' is-done' : ''),
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...rmono,
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 700,
          background: isDone ? 'var(--verified-check)' : 'var(--ink)',
          color: '#fff'
        }
      }, isDone ? '✓' : s.stepNumber), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700,
          fontSize: 14,
          color: 'var(--ink)',
          fontFamily: 'var(--font-sans)',
          textTransform: 'uppercase'
        }
      }, s.title)), s.timerMinutes && /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--ink-subtle)',
          textTransform: 'uppercase'
        }
      }, "\u23F1\uFE0F ", s.timerMinutes, " MINS")), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 14,
          lineHeight: 1.625,
          color: isDone ? 'var(--ink-muted)' : 'var(--ink)',
          textDecoration: isDone ? 'line-through' : 'none'
        }
      }, s.instruction), s.proTip && /*#__PURE__*/React.createElement("div", {
        className: "hairline-border",
        style: {
          background: 'var(--paper-50)',
          padding: 12,
          fontSize: 12,
          color: 'var(--ink-muted)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          ...rmono,
          fontWeight: 700,
          color: 'var(--ink)',
          textTransform: 'uppercase',
          fontSize: 10,
          display: 'block'
        }
      }, "\uD83D\uDCA1 Dad Pro Tip:"), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 12
        }
      }, s.proTip)));
    }), !steps.length && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 12,
        color: 'var(--ink-subtle)',
        ...rmono
      }
    }, "Detailed steps not included in this sample record."))))), /*#__PURE__*/React.createElement("section", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
        ...rmono,
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      padding: "lg",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--ink)',
        fontWeight: 700,
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--hairline)',
        paddingBottom: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 16,
      style: {
        color: 'var(--verified)'
      }
    }), /*#__PURE__*/React.createElement("span", null, "Dad Pro Tip")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--ink)',
        lineHeight: 1.625
      }
    }, r.dadProTip || r.tagline), r.kidAdjustment && /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 8,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase',
        display: 'block',
        fontWeight: 700
      }
    }, "\uD83D\uDC76 Kid & Toddler Adjustment:"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '4px 0 0',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--ink-muted)',
        lineHeight: 1.625
      }
    }, r.kidAdjustment))), /*#__PURE__*/React.createElement(Panel, {
      padding: "lg",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--ink)',
        fontWeight: 700,
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--hairline)',
        paddingBottom: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "flame",
      size: 16,
      style: {
        color: 'var(--accent)'
      }
    }), /*#__PURE__*/React.createElement("span", null, "Serve With & Reheating")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase',
        display: 'block',
        fontWeight: 700
      }
    }, "Suggested Sides:"), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: '4px 0 0',
        paddingLeft: 16,
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--ink)'
      }
    }, (r.sideSuggestions || ['—']).map(s => /*#__PURE__*/React.createElement("li", {
      key: s
    }, s)))), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 8,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: 'var(--ink-subtle)',
        textTransform: 'uppercase',
        display: 'block',
        fontWeight: 700
      }
    }, "\uD83D\uDD25 Reheat Method (Restore Crunch):"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '4px 0 0',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--ink-muted)',
        lineHeight: 1.625
      }
    }, r.reheatInstructions || '—')))), /*#__PURE__*/React.createElement(Panel, {
      as: "section",
      padding: "lg",
      style: {
        ...rmono,
        fontSize: 12,
        color: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--hairline)',
        paddingBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        textTransform: 'uppercase'
      }
    }, "Nutrition & Verification Basis"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-subtle)'
      }
    }, "HR-2 SOURCED")), r.nutrition && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        padding: '8px 0'
      }
    }, /*#__PURE__*/React.createElement("div", null, "Calories: ", /*#__PURE__*/React.createElement("strong", null, r.nutrition.calories || '—', " kcal")), /*#__PURE__*/React.createElement("div", null, "Protein: ", /*#__PURE__*/React.createElement("strong", null, r.nutrition.proteinGrams, "g")), /*#__PURE__*/React.createElement("div", null, "Carbohydrates: ", /*#__PURE__*/React.createElement("strong", null, r.nutrition.carbsGrams || '—', "g")), /*#__PURE__*/React.createElement("div", null, "Fat: ", /*#__PURE__*/React.createElement("strong", null, r.nutrition.fatGrams || '—', "g"))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--ink-muted)',
        borderTop: '1px solid var(--hairline)',
        paddingTop: 8,
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, r.nutrition && r.nutrition.source && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Nutrition Source:"), " ", r.nutrition.source), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Cook Time Basis:"), " ", r.basis || 'See datasheet.'))), /*#__PURE__*/React.createElement(MealActions, {
      recipeTitle: r.title,
      signedIn: false,
      style: {
        marginTop: 0
      }
    }), related.length > 0 && /*#__PURE__*/React.createElement("section", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        paddingTop: 24,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '-.01em',
        color: 'var(--ink)'
      }
    }, "Related ", r.appliance.replace('-', ' '), " Recipes"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 16
      }
    }, related.map(x => /*#__PURE__*/React.createElement("a", {
      key: x.id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('recipe', x.slug);
      },
      className: "mi-tile"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...rmono,
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--ink-subtle)'
      }
    }, "#", x.id), /*#__PURE__*/React.createElement("h4", {
      className: "mi-tile__title",
      style: {
        margin: 0,
        fontWeight: 700,
        fontSize: 12,
        color: 'var(--ink)'
      }
    }, x.title)), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--hairline)',
        marginTop: 12,
        paddingTop: 8,
        ...rmono,
        fontSize: 10,
        color: 'var(--ink-muted)',
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", null, x.cookTemp), /*#__PURE__*/React.createElement("span", null, x.totalMinutes, "m")))))));
  }
  window.RecipeScreen = RecipeScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/RecipeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/ToolsScreen.jsx
try { (() => {
// Tools & Calcs directory — recreation of components/tools/ToolsDirectory.tsx
(() => {
  const {
    LeanIcon,
    Icon,
    Panel,
    MicroLabel
  } = window.MealInstructionsDesignSystem_767cb5;
  const tmono = {
    fontFamily: 'var(--font-mono)'
  };
  const CATS = [['all', 'All 30 Engines'], ['temperature', 'Temperature & Searing'], ['ratios', 'Ratios & Math'], ['bbq', 'BBQ & Meat Science'], ['planning', 'Planning & Timelines'], ['emergency', 'Emergency & Rescue']];
  function ToolsScreen({
    D,
    go
  }) {
    const [cat, setCat] = React.useState('all');
    const [q, setQ] = React.useState('');
    const tools = D.tools.filter(t => (cat === 'all' || t.category === cat) && (t.title + t.description + t.badge).toLowerCase().includes(q.toLowerCase()));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: '0 auto',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent"
    }, "PARAMETRIC UTILITIES"), /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-.01em',
        textTransform: 'uppercase',
        color: 'var(--ink)'
      }
    }, "Kitchen Tools & Calculators"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 16,
        color: 'var(--ink-muted)',
        lineHeight: 1.625,
        maxWidth: 768
      }
    }, "30 tactile kitchen engines. Enter your numbers, get the exact temperature, time or weight. No accounts, no ads between you and the answer.")), /*#__PURE__*/React.createElement(Panel, {
      padding: "lg",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, CATS.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      onClick: () => setCat(id),
      className: 'mi-chip mi-chip--square' + (cat === id ? ' is-active' : ''),
      style: {
        padding: '6px 12px',
        fontSize: 12
      }
    }, label))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16,
      style: {
        color: 'var(--ink-subtle)',
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }), /*#__PURE__*/React.createElement("input", {
      className: "mi-input mi-input--square",
      value: q,
      onChange: e => setQ(e.target.value),
      placeholder: "Search all 30 kitchen engines (e.g. Smoke Points, Brisket, Baker's %, Sous Vide, Egg, Reheat)...",
      style: {
        padding: '10px 12px 10px 36px'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 16
      }
    }, tools.map(t => /*#__PURE__*/React.createElement("a", {
      key: t.href,
      href: "#",
      onClick: e => e.preventDefault(),
      className: "mi-tile",
      style: {
        padding: 24,
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(MicroLabel, {
      color: "accent"
    }, t.badge), /*#__PURE__*/React.createElement("div", {
      className: "hairline-border",
      style: {
        padding: 6,
        background: 'var(--paper)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(LeanIcon, {
      name: t.icon,
      size: 24,
      style: {
        color: 'var(--ink-muted)'
      }
    }))), /*#__PURE__*/React.createElement("h2", {
      className: "mi-tile__title",
      style: {
        margin: 0,
        fontSize: 20,
        fontWeight: 700,
        color: 'var(--ink)',
        textTransform: 'uppercase',
        letterSpacing: '-.01em'
      }
    }, t.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        color: 'var(--ink-muted)',
        lineHeight: 1.625
      }
    }, t.description)), /*#__PURE__*/React.createElement("div", {
      className: "mi-tile__go",
      style: {
        ...tmono,
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--ink)',
        textTransform: 'uppercase',
        paddingTop: 8,
        display: 'flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "Launch Engine"), /*#__PURE__*/React.createElement("span", null, "\u2192"))))));
  }
  window.ToolsScreen = ToolsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/ToolsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.LUCIDE = __ds_scope.LUCIDE;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Kbd = __ds_scope.Kbd;

__ds_ns.LEAN_ICONS = __ds_scope.LEAN_ICONS;

__ds_ns.LeanIcon = __ds_scope.LeanIcon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.MicroLabel = __ds_scope.MicroLabel;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Segmented = __ds_scope.Segmented;

__ds_ns.StatusDot = __ds_scope.StatusDot;

__ds_ns.CategoryGrid = __ds_scope.CategoryGrid;

__ds_ns.CRISIS_PRESETS = __ds_scope.CRISIS_PRESETS;

__ds_ns.CrisisTriageBar = __ds_scope.CrisisTriageBar;

__ds_ns.KitchenHud = __ds_scope.KitchenHud;

__ds_ns.PROTEIN_OPTIONS = __ds_scope.PROTEIN_OPTIONS;

__ds_ns.ProteinSelectorBar = __ds_scope.ProteinSelectorBar;

__ds_ns.TIME_STOPS = __ds_scope.TIME_STOPS;

__ds_ns.RecipeScrubber = __ds_scope.RecipeScrubber;

__ds_ns.ConsentBanner = __ds_scope.ConsentBanner;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NAV_LINKS = __ds_scope.NAV_LINKS;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.SearchModal = __ds_scope.SearchModal;

__ds_ns.KitchenTimer = __ds_scope.KitchenTimer;

__ds_ns.Lean5SMatrix = __ds_scope.Lean5SMatrix;

__ds_ns.LeanSpecBadge = __ds_scope.LeanSpecBadge;

__ds_ns.MealActions = __ds_scope.MealActions;

__ds_ns.ModeSwitch = __ds_scope.ModeSwitch;

__ds_ns.ModeSwitchCards = __ds_scope.ModeSwitchCards;

__ds_ns.PortionScaler = __ds_scope.PortionScaler;

__ds_ns.PrintButton = __ds_scope.PrintButton;

__ds_ns.RecipeCard = __ds_scope.RecipeCard;

__ds_ns.RecipeTable = __ds_scope.RecipeTable;

__ds_ns.ShareButton = __ds_scope.ShareButton;

__ds_ns.StartCookButton = __ds_scope.StartCookButton;

})();
