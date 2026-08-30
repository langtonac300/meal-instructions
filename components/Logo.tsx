import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'mark-only' | 'horizontal' | 'stacked';
  className?: string;
}

export default function Logo({
  size = 'md',
  variant = 'horizontal',
  className = '',
}: LogoProps) {
  // Dimensions
  const iconDimensions = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 64,
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision Geometric SVG Icon Mark */}
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
      >
        {/* Background rounded container */}
        <rect width="48" height="48" rx="8" fill="#111111" />
        <rect x="0.5" y="0.5" width="47" height="47" rx="7.5" stroke="#262626" strokeWidth="1" />

        {/* Technical Architectural 'M' Legs */}
        <path
          d="M10 36V14L19 25L28 14V36"
          stroke="#F5F4F0"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* Precision 'I' / Temperature Gauge Needle */}
        <line
          x1="36.5"
          y1="14"
          x2="36.5"
          y2="36"
          stroke="#F5F4F0"
          strokeWidth="3.5"
          strokeLinecap="square"
        />

        {/* Thermal Active Status Accent Dot */}
        <circle cx="36.5" cy="14" r="2.5" fill="#EA580C" />

        {/* Subtle grid calibration crosshair ticks */}
        <line x1="4" y1="24" x2="6.5" y2="24" stroke="#404040" strokeWidth="1" />
        <line x1="41.5" y1="24" x2="44" y2="24" stroke="#404040" strokeWidth="1" />
        <line x1="24" y1="4" x2="24" y2="6.5" stroke="#404040" strokeWidth="1" />
        <line x1="24" y1="41.5" x2="24" y2="44" stroke="#404040" strokeWidth="1" />
      </svg>

      {/* Text Branding */}
      {variant !== 'mark-only' && (
        <div className={variant === 'stacked' ? 'text-center' : 'text-left'}>
          <span
            className={`font-sans font-black tracking-wider uppercase block text-ink leading-tight ${
              size === 'sm'
                ? 'text-xs'
                : size === 'md'
                ? 'text-base'
                : size === 'lg'
                ? 'text-xl'
                : 'text-2xl'
            }`}
          >
            MEAL INSTRUCTIONS
          </span>
          <span
            className={`font-mono text-ink-muted uppercase tracking-widest block -mt-0.5 ${
              size === 'sm' ? 'text-[9px]' : 'text-[10px]'
            }`}
          >
            Cook-time reference
          </span>
        </div>
      )}
    </div>
  );
}
