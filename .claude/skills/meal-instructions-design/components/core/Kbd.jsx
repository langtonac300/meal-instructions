import React from 'react';
/** Keyboard hint chip (cmd-K, LIVE). */
export function Kbd({ children, className = '', ...rest }) { return <kbd className={'mi-kbd ' + className} {...rest}>{children}</kbd>; }
