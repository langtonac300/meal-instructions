import * as React from 'react';
export interface StartCookButtonProps { appliance?: string; foodSlug?: string; label?: string; href?: string; onClick?: (e: React.MouseEvent) => void; className?: string; style?: React.CSSProperties; }
export declare function StartCookButton(props: StartCookButtonProps): JSX.Element;
