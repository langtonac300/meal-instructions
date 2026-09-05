import * as React from 'react';
export interface ConsentBannerProps { onDecide?: (state: 'granted' | 'denied') => void; /** Fixed to viewport bottom (default). */ fixed?: boolean; className?: string; style?: React.CSSProperties; }
export declare function ConsentBanner(props: ConsentBannerProps): JSX.Element | null;
