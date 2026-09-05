import React from 'react';
// Lucide icon subset used across mealinstructions.com (lucide-react in the repo). Path data inlined so no CDN is required.
const P = (d) => ['path', { d }];
export const LUCIDE = {
  search: [['circle',{cx:11,cy:11,r:8}], P('m21 21-4.3-4.3')],
  x: [P('M18 6 6 18'), P('m6 6 12 12')],
  menu: [['line',{x1:4,x2:20,y1:12,y2:12}],['line',{x1:4,x2:20,y1:6,y2:6}],['line',{x1:4,x2:20,y1:18,y2:18}]],
  zap: [['polygon',{points:'13 2 3 14 12 14 11 22 21 10 12 10 13 2'}]],
  'book-open': [P('M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'), P('M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z')],
  clock: [['circle',{cx:12,cy:12,r:10}],['polyline',{points:'12 6 12 12 16 14'}]],
  flame: [P('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z')],
  play: [['polygon',{points:'6 3 20 12 6 21 6 3'}]],
  pause: [['rect',{x:14,y:4,width:4,height:16,rx:1}],['rect',{x:6,y:4,width:4,height:16,rx:1}]],
  'rotate-ccw': [P('M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'), P('M3 3v5h5')],
  printer: [['polyline',{points:'6 9 6 2 18 2 18 9'}], P('M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'), ['rect',{width:12,height:8,x:6,y:14}]],
  'share-2': [['circle',{cx:18,cy:5,r:3}],['circle',{cx:6,cy:12,r:3}],['circle',{cx:18,cy:19,r:3}],['line',{x1:8.59,x2:15.42,y1:13.51,y2:17.49}],['line',{x1:15.41,x2:8.59,y1:6.51,y2:10.49}]],
  copy: [['rect',{width:14,height:14,x:8,y:8,rx:2,ry:2}], P('M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2')],
  check: [P('M20 6 9 17l-5-5')],
  'shield-check': [P('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'), P('m9 12 2 2 4-4')],
  'arrow-left': [P('m12 19-7-7 7-7'), P('M19 12H5')],
  'arrow-right': [P('M5 12h14'), P('m12 5 7 7-7 7')],
  'arrow-up-right': [P('M7 7h10v10'), P('M7 17 17 7')],
  'arrow-up-down': [P('m21 16-4 4-4-4'), P('M17 20V4'), P('m3 8 4-4 4 4'), P('M7 4v16')],
  'layout-grid': [['rect',{width:7,height:7,x:3,y:3,rx:1}],['rect',{width:7,height:7,x:14,y:3,rx:1}],['rect',{width:7,height:7,x:14,y:14,rx:1}],['rect',{width:7,height:7,x:3,y:14,rx:1}]],
  'list-filter': [P('M3 6h18'), P('M7 12h10'), P('M10 18h4')],
  dices: [['rect',{width:12,height:12,x:2,y:10,rx:2,ry:2}], P('m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6'), P('M6 18h.01'), P('M10 14h.01'), P('M15 6h.01'), P('M18 9h.01')],
  bookmark: [P('m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z')],
  'bookmark-check': [P('m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z'), P('m9 10 2 2 4-4')],
  star: [['polygon',{points:'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'}]],
  'log-in': [P('M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4'), ['polyline',{points:'10 17 15 12 10 7'}], ['line',{x1:15,x2:3,y1:12,y2:12}]],
  'log-out': [P('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'), ['polyline',{points:'16 17 21 12 16 7'}], ['line',{x1:21,x2:9,y1:12,y2:12}]],
  users: [P('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'), ['circle',{cx:9,cy:7,r:4}], P('M22 21v-2a4 4 0 0 0-3-3.87'), P('M16 3.13a4 4 0 0 1 0 7.75')],
  'volume-2': [['polygon',{points:'11 5 6 9 2 9 2 15 6 15 11 19 11 5'}], P('M15.54 8.46a5 5 0 0 1 0 7.07'), P('M19.07 4.93a10 10 0 0 1 0 14.14')],
  'external-link': [P('M15 3h6v6'), P('M10 14 21 3'), P('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6')],
  'check-circle-2': [['circle',{cx:12,cy:12,r:10}], P('m9 12 2 2 4-4')],
  'x-circle': [['circle',{cx:12,cy:12,r:10}], P('m15 9-6 6'), P('m9 9 6 6')],
  'message-square': [P('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')],
  pencil: [P('M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'), P('m15 5 4 4')],
  bell: [P('M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9'), P('M10.3 21a1.94 1.94 0 0 0 3.4 0')],
  sparkles: [P('M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z'), P('M20 3v4'), P('M22 5h-4'), P('M4 17v2'), P('M5 18H3')],
  thermometer: [P('M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z')],
  'sliders-horizontal': [['line',{x1:21,x2:14,y1:4,y2:4}],['line',{x1:10,x2:3,y1:4,y2:4}],['line',{x1:21,x2:12,y1:12,y2:12}],['line',{x1:8,x2:3,y1:12,y2:12}],['line',{x1:21,x2:16,y1:20,y2:20}],['line',{x1:12,x2:3,y1:20,y2:20}],['line',{x1:14,x2:14,y1:2,y2:6}],['line',{x1:8,x2:8,y1:10,y2:14}],['line',{x1:16,x2:16,y1:18,y2:22}]],
  'shield-alert': [P('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'), P('M12 8v4'), P('M12 16h.01')],
  scale: [P('m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z'), P('m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z'), P('M7 21h10'), P('M12 3v18'), P('M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2')],
};
/** Lucide icon (24x24, stroke 2, round caps) - the generic UI icon set. size in px; color via CSS color. */
export function Icon({ name, size = 16, strokeWidth = 2, className = '', style, fill = 'none', ...rest }) {
  const nodes = LUCIDE[name];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={{ flexShrink: 0, display: 'inline-block', ...style }} aria-hidden="true" {...rest}>
      {nodes ? nodes.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs })) : <rect x="3" y="3" width="18" height="18" />}
    </svg>
  );
}
