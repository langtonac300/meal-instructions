import React from 'react';
/** Toggle group. pill (default): bg-paper-200 p-0.5 rounded, active = bg-ink. square: recipe mode selector (2-col grid, bg-paper, 10x16 padding). hairline: portion multiplier (separate hairline boxes). */
export function Segmented({ options, value, onChange, variant = 'pill', icon = false, className = '', ...rest }) {
  const cls = ['mi-seg', variant === 'square' ? 'mi-seg--square' : variant === 'hairline' ? 'mi-seg--hairline' : '', icon ? 'mi-seg--icon' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} role="tablist" {...rest}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button key={String(o.value)} type="button" role="tab" aria-selected={active} title={o.title} onClick={() => onChange && onChange(o.value)} className={'mi-seg__btn' + (active ? ' is-active' : '')}>
            {o.icon}{o.label}{o.note && <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.7 }}>{o.note}</span>}
          </button>
        );
      })}
    </div>
  );
}
