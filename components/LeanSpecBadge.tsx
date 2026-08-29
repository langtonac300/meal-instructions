import React from 'react';
import {
  LeanClockIcon,
  LeanHeatWavesIcon,
  LeanForkIcon,
  LeanProbeIcon,
  LeanFlipIcon,
  LeanRestIcon,
  LeanOilSprayIcon,
  LeanScaleIcon,
  LeanSafetyShieldIcon,
  LeanFlameIcon,
  LeanSpeedIcon,
} from './icons/Lean5SIcons';

export type LeanSpecType =
  | 'time'
  | 'temp'
  | 'protein'
  | 'probe'
  | 'flip'
  | 'rest'
  | 'spray'
  | 'scale'
  | 'safety'
  | 'flame'
  | 'speed';

interface LeanSpecBadgeProps {
  type: LeanSpecType;
  value: string | number;
  label: string;
  sub?: string;
  variant?: 'cell' | 'row' | 'inline' | 'compact';
  accent?: boolean;
  className?: string;
}

export default function LeanSpecBadge({
  type,
  value,
  label,
  sub,
  variant = 'cell',
  accent = false,
  className = '',
}: LeanSpecBadgeProps) {
  const renderIcon = (iconSize = 24) => {
    switch (type) {
      case 'time':
        return <LeanClockIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'temp':
        return <LeanHeatWavesIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'protein':
        return <LeanForkIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'probe':
        return <LeanProbeIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'flip':
        return <LeanFlipIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'rest':
        return <LeanRestIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'spray':
        return <LeanOilSprayIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'scale':
        return <LeanScaleIcon size={iconSize} className={accent ? 'text-accent' : 'text-ink'} />;
      case 'safety':
        return <LeanSafetyShieldIcon size={iconSize} className="text-emerald-800" />;
      case 'flame':
        return <LeanFlameIcon size={iconSize} className="text-accent" />;
      case 'speed':
        return <LeanSpeedIcon size={iconSize} className="text-accent" />;
      default:
        return <LeanClockIcon size={iconSize} className="text-ink" />;
    }
  };

  if (variant === 'inline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 bg-paper hairline-border font-mono text-xs ${className}`}
      >
        {renderIcon(16)}
        <span className="text-ink-subtle uppercase text-[10px]">{label}:</span>
        <span className={`font-bold ${accent ? 'text-accent' : 'text-ink'}`}>{value}</span>
      </span>
    );
  }

  if (variant === 'row') {
    return (
      <div
        className={`flex items-center justify-between p-3 bg-paper hairline-border font-mono text-xs ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-paper-card hairline-border">{renderIcon(22)}</div>
          <div>
            <span className="text-[10px] uppercase text-ink-subtle block tracking-wider">{label}</span>
            {sub && <span className="text-[9px] text-ink-muted block">{sub}</span>}
          </div>
        </div>
        <span className={`text-base font-bold tracking-tight ${accent ? 'text-accent' : 'text-ink'}`}>
          {value}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`p-2 bg-paper hairline-border font-mono text-center flex flex-col items-center justify-center space-y-1 ${className}`}
      >
        <div className="flex items-center justify-center">{renderIcon(20)}</div>
        <span className="text-[8px] uppercase tracking-wider text-ink-subtle block leading-none">
          {label}
        </span>
        <span
          className={`text-xs font-bold leading-tight block ${accent ? 'text-accent' : 'text-ink'}`}
        >
          {value}
        </span>
      </div>
    );
  }

  // Default: 'cell' for quick spec matrix cards
  return (
    <div
      className={`p-3 bg-paper hairline-border font-mono space-y-2 relative overflow-hidden group hover:border-ink/40 transition-colors ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-wider text-ink-subtle font-semibold">
          {label}
        </span>
        <div className="opacity-80 group-hover:opacity-100 transition-opacity">
          {renderIcon(24)}
        </div>
      </div>
      <div className="space-y-0.5">
        <div
          className={`text-base sm:text-lg font-bold tracking-tight ${
            accent ? 'text-accent' : 'text-ink'
          }`}
        >
          {value}
        </div>
        {sub && <div className="text-[9px] text-ink-muted leading-tight">{sub}</div>}
      </div>
    </div>
  );
}
