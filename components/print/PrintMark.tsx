interface Props {
  size: number;
}

/**
 * The brand mark, drawn inline rather than loaded from /icon.svg: a printed
 * page must never carry a broken-image box because a fetch was slow or
 * blocked when the print dialog opened. Same geometry as public/icon.svg.
 */
export default function PrintMark({ size }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" aria-hidden="true" focusable="false">
      <rect width="512" height="512" rx="96" fill="#111111" />
      <rect x="4" y="4" width="504" height="504" rx="92" stroke="#262626" strokeWidth="8" />
      <path
        d="M106 384V149L202 266L298 149V384"
        stroke="#F5F4F0"
        strokeWidth="38"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <line x1="390" y1="149" x2="390" y2="384" stroke="#F5F4F0" strokeWidth="38" strokeLinecap="square" />
      <circle cx="390" cy="149" r="28" fill="#EA580C" />
      <line x1="42" y1="256" x2="70" y2="256" stroke="#404040" strokeWidth="10" strokeLinecap="round" />
      <line x1="442" y1="256" x2="470" y2="256" stroke="#404040" strokeWidth="10" strokeLinecap="round" />
      <line x1="256" y1="42" x2="256" y2="70" stroke="#404040" strokeWidth="10" strokeLinecap="round" />
      <line x1="256" y1="442" x2="256" y2="470" stroke="#404040" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
