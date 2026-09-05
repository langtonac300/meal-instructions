import React from 'react';
/** 6px round dot (8px lg). accent pulsing = live section kicker; verified/live = ticker & difficulty; ping = running timer. */
export function StatusDot({ color = 'accent', pulse = false, ping = false, size = 'md', className = '', style, ...rest }) {
  const cls = ['mi-dot', color !== 'accent' ? 'mi-dot--' + color : '', size === 'lg' ? 'mi-dot--lg' : '', pulse ? 'animate-pulse' : '', ping ? 'animate-ping' : '', className].filter(Boolean).join(' ');
  return <span className={cls} style={style} {...rest} />;
}
