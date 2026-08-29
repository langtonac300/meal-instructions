import React from 'react';

export interface LeanIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
  title?: string;
}

/** 4-Tine Precision Fork (Portions, Servings, Dining) */
export function LeanForkIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Fork',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M8 4v7c0 2.2 1.8 4 4 4h0c2.2 0 4-1.8 4-4V4" />
      <line x1="10.7" y1="4" x2="10.7" y2="10" />
      <line x1="13.3" y1="4" x2="13.3" y2="10" />
      <line x1="12" y1="15" x2="12" y2="24" strokeWidth={strokeWidth + 0.2} />
      <line x1="10.5" y1="24" x2="13.5" y2="24" />
    </svg>
  );
}

/** Fork & Knife Utensils (Specimen Portions) */
export function LeanUtensilsIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Utensils',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M7 4v6c0 1.8 1.4 3 3 3h0" />
      <line x1="9" y1="4" x2="9" y2="8.5" />
      <line x1="11" y1="4" x2="11" y2="8.5" />
      <path d="M13 4v6c0 1.8-1.4 3-3 3" />
      <line x1="10" y1="13" x2="10" y2="24" strokeWidth={strokeWidth} />
      <path d="M19 4c0 0-3 2-3 7v13h3V4z" fill="currentColor" fillOpacity="0.1" />
      <line x1="16" y1="14" x2="19" y2="14" />
    </svg>
  );
}

/** Portion Plate Specimen */
export function LeanPlateIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Portion Plate',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <circle cx="14" cy="14" r="11" strokeWidth={strokeWidth} />
      <circle cx="14" cy="14" r="7" strokeWidth={Math.max(1, strokeWidth - 0.5)} strokeDasharray="2 2" />
      <path d="M12 9v3.5a2 2 0 0 0 4 0V9" strokeWidth={Math.max(1.2, strokeWidth - 0.4)} />
      <line x1="14" y1="9" x2="14" y2="12" strokeWidth={Math.max(1, strokeWidth - 0.6)} />
      <line x1="14" y1="14.5" x2="14" y2="19" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** 3 Rising Thermal Convection Heat Waves (How Hot / Cook Temp) */
export function LeanHeatWavesIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Heat Waves',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M7 23c-1.5-2.5-1.5-5 0-7.5s1.5-5 0-7.5-1.5-5 0-7.5" />
      <path d="M14 24c-1.8-3-1.8-6 0-9s1.8-6 0-9-1.8-6 0-9" strokeWidth={strokeWidth + 0.2} />
      <path d="M21 23c-1.5-2.5-1.5-5 0-7.5s1.5-5 0-7.5-1.5-5 0-7.5" />
      <line x1="4" y1="26" x2="24" y2="26" strokeWidth={Math.max(1, strokeWidth - 0.2)} strokeDasharray="1 2.5" />
    </svg>
  );
}

/** Precision Geometric Flame (High Heat / Searing) */
export function LeanFlameIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Flame',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M14 3c0 4.5-5 7-5 13 0 4.4 3.1 8 7 8s7-3.6 7-8c0-5-3.5-7-3.5-10.5-2 1.5-3 3-3.5 5-1-1.5-2-5-2-7.5z" />
      <path d="M14 17c0 2-1 3.5-2.5 4.5C13 22 14.5 22 16 21c1-1 1-2.5 0.5-4-1 0.5-2 0.5-2.5 0z" fill="currentColor" />
    </svg>
  );
}

/** Precision Meat Thermometer Probe (Internal Target Temp) */
export function LeanProbeIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Thermometer Probe',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <rect x="4" y="4" width="12" height="9" rx="1.5" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <line x1="7" y1="8.5" x2="13" y2="8.5" strokeWidth={strokeWidth} strokeDasharray="1 1.5" />
      <line x1="16" y1="8.5" x2="24.5" y2="17" strokeWidth={strokeWidth} />
      <path d="M24.5 17l1.5 6.5-6.5-1.5z" fill="currentColor" />
      <path d="M4 17c2 0 4 2 4 4" strokeWidth={Math.max(1, strokeWidth - 0.5)} strokeDasharray="1 1.5" />
    </svg>
  );
}

/** Skillet with Convection Heat */
export function LeanPanHeatIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Pan Heat',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M4 17h14a3 3 0 0 1 3 3v1H1v-1a3 3 0 0 1 3-3z" strokeWidth={strokeWidth} fill="currentColor" fillOpacity="0.08" />
      <path d="M21 18.5l5.5-2.5" strokeWidth={strokeWidth + 0.2} />
      <path d="M6 13c-.8-1.5-.8-3 0-4.5" strokeWidth={Math.max(1, strokeWidth - 0.4)} />
      <path d="M11 13c-.8-1.5-.8-3 0-4.5" strokeWidth={strokeWidth} />
      <path d="M16 13c-.8-1.5-.8-3 0-4.5" strokeWidth={Math.max(1, strokeWidth - 0.4)} />
    </svg>
  );
}

/** Precision Clock Face (How Long / Total Time) */
export function LeanClockIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Clock Time',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <circle cx="14" cy="14" r="11" strokeWidth={strokeWidth} />
      <polyline points="14 7.5 14 14 18.5 14" strokeWidth={strokeWidth} />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      <line x1="14" y1="3" x2="14" y2="4.5" strokeWidth={Math.max(1, strokeWidth - 0.2)} />
      <line x1="25" y1="14" x2="23.5" y2="14" strokeWidth={Math.max(1, strokeWidth - 0.2)} />
      <line x1="14" y1="25" x2="14" y2="23.5" strokeWidth={Math.max(1, strokeWidth - 0.2)} />
      <line x1="3" y1="14" x2="4.5" y2="14" strokeWidth={Math.max(1, strokeWidth - 0.2)} />
    </svg>
  );
}

/** Industrial Stopwatch (Process Timer / Actuator) */
export function LeanStopwatchIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Timer Stopwatch',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <circle cx="14" cy="16" r="9.5" strokeWidth={strokeWidth} />
      <polyline points="14 11 14 16 17.5 16" strokeWidth={strokeWidth} />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" />
      <line x1="14" y1="2.5" x2="14" y2="6.5" strokeWidth={strokeWidth + 0.4} />
      <line x1="11.5" y1="2.5" x2="16.5" y2="2.5" strokeWidth={strokeWidth + 0.2} />
      <line x1="21.5" y1="8.5" x2="23.5" y2="6.5" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Rest Time / Cutting Board Steam */
export function LeanRestIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Rest Time',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <rect x="3" y="19" width="22" height="4" rx="1" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} fill="currentColor" fillOpacity="0.08" />
      <path d="M6 19c0-3.5 2-6 8-6s8 2.5 8 6" strokeWidth={strokeWidth} />
      <path d="M10 9c-.5-1.5 0-3 1-4" strokeWidth={Math.max(1, strokeWidth - 0.5)} strokeDasharray="1 1.5" />
      <path d="M14 9c-.5-1.5 0-3 1-4" strokeWidth={Math.max(1, strokeWidth - 0.4)} strokeDasharray="1 1.5" />
      <path d="M18 9c-.5-1.5 0-3 1-4" strokeWidth={Math.max(1, strokeWidth - 0.5)} strokeDasharray="1 1.5" />
    </svg>
  );
}

/** 15-Minute Fast Rapid Cycle Lightning Bolt */
export function LeanSpeedIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Fast Cycle',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <polygon points="16 2 6 15 13 15 11 26 22 12 15 12 16 2" fill="currentColor" fillOpacity="0.12" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** 180° Flip Turnover Action Indicator */
export function LeanFlipIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Flip Action',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M21 10a8 8 0 1 0 2.5 6" strokeWidth={strokeWidth + 0.2} />
      <polyline points="21 5 21 11 15 11" strokeWidth={strokeWidth} />
      <line x1="11" y1="14" x2="17" y2="14" strokeWidth={strokeWidth + 0.4} />
      <line x1="9" y1="17" x2="19" y2="17" strokeWidth={Math.max(1, strokeWidth - 0.2)} strokeDasharray="1 1.5" />
    </svg>
  );
}

/** Precision Balance Scale / Grams */
export function LeanScaleIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Scale Grams',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <line x1="14" y1="4" x2="14" y2="23" strokeWidth={strokeWidth + 0.2} />
      <line x1="8" y1="23" x2="20" y2="23" strokeWidth={strokeWidth + 0.4} />
      <line x1="5" y1="8" x2="23" y2="8" strokeWidth={strokeWidth} />
      <path d="M5 8l-2 5h6l-2-5" />
      <path d="M3 13a3 3 0 0 0 6 0" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <path d="M23 8l-2 5h6l-2-5" />
      <path d="M21 13a3 3 0 0 0 6 0" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
    </svg>
  );
}

/** Oil Spray / Fine Mist Droplet */
export function LeanOilSprayIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Oil Spray',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <rect x="7" y="11" width="10" height="13" rx="1.5" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <rect x="9" y="8" width="6" height="3" strokeWidth={Math.max(1, strokeWidth - 0.4)} />
      <line x1="9" y1="8" x2="6" y2="7" strokeWidth={strokeWidth} />
      <circle cx="6" cy="7" r="1" fill="currentColor" />
      <circle cx="21" cy="6" r="1.2" fill="currentColor" />
      <circle cx="24" cy="9" r="1" fill="currentColor" />
      <circle cx="21" cy="12" r="1.4" fill="currentColor" />
      <path d="M16 8l3-1.5" strokeWidth={Math.max(1, strokeWidth - 0.6)} strokeDasharray="1 1" />
      <path d="M16 9l3 1.5" strokeWidth={Math.max(1, strokeWidth - 0.6)} strokeDasharray="1 1" />
    </svg>
  );
}

/** USDA / Standard Verified Safety Shield */
export function LeanSafetyShieldIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Verified Safety',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M14 3L4 7v7c0 6.5 4.3 11 10 12 5.7-1 10-5.5 10-12V7L14 3z" strokeWidth={strokeWidth} fill="currentColor" fillOpacity="0.08" />
      <polyline points="9.5 14 12.5 17 18.5 10.5" strokeWidth={strokeWidth + 0.2} />
    </svg>
  );
}

/** Air Fryer Hardware Icon */
export function LeanAirFryerIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Air Fryer',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <rect x="4" y="3" width="20" height="22" rx="3" strokeWidth={strokeWidth} />
      <rect x="8" y="6" width="12" height="4" rx="1" strokeWidth={Math.max(1, strokeWidth - 0.5)} />
      <circle cx="14" cy="8" r="1" fill="currentColor" />
      <path d="M7 13h14v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8z" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <rect x="12" y="15" width="4" height="5" rx="1" strokeWidth={Math.max(1, strokeWidth - 0.4)} fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

/** Sheet Pan Hardware Icon */
export function LeanSheetPanIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Sheet Pan',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <polygon points="3 7 25 7 23 23 5 23" strokeWidth={strokeWidth} />
      <polygon points="5.5 9.5 22.5 9.5 21 21 7 21" strokeWidth={Math.max(1, strokeWidth - 0.6)} fill="currentColor" fillOpacity="0.06" />
      <line x1="11" y1="12" x2="11" y2="18" strokeWidth={Math.max(1, strokeWidth - 0.6)} strokeDasharray="1 2" />
      <line x1="17" y1="12" x2="17" y2="18" strokeWidth={Math.max(1, strokeWidth - 0.6)} strokeDasharray="1 2" />
    </svg>
  );
}

/** Skillet Hardware Icon */
export function LeanSkilletIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Skillet',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <ellipse cx="12" cy="14" rx="9" ry="7" strokeWidth={strokeWidth} fill="currentColor" fillOpacity="0.08" />
      <path d="M3 14h-1.5" strokeWidth={strokeWidth} />
      <path d="M21 14h5a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1h-5" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <circle cx="25.5" cy="15" r="0.8" fill="currentColor" />
    </svg>
  );
}

/** Grill Hardware Icon */
export function LeanGrillIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Grill',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M4 14a10 10 0 0 0 20 0H4z" strokeWidth={strokeWidth} fill="currentColor" fillOpacity="0.08" />
      <line x1="4" y1="14" x2="24" y2="14" strokeWidth={strokeWidth} />
      <line x1="8" y1="14" x2="8" y2="9" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <line x1="12" y1="14" x2="12" y2="8" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <line x1="16" y1="14" x2="16" y2="8" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <line x1="20" y1="14" x2="20" y2="9" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <line x1="9" y1="22" x2="6" y2="26" strokeWidth={strokeWidth} />
      <line x1="19" y1="22" x2="22" y2="26" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Instant Pot / Pressure Cooker Hardware Icon */
export function LeanInstantPotIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Instant Pot',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <rect x="5" y="9" width="18" height="15" rx="3" strokeWidth={strokeWidth} />
      <path d="M7 9a7 7 0 0 1 14 0" strokeWidth={strokeWidth} />
      <rect x="12" y="3" width="4" height="3" rx="0.5" strokeWidth={Math.max(1, strokeWidth - 0.4)} fill="currentColor" fillOpacity="0.2" />
      <path d="M5 13H3v4h2" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <path d="M23 13h2v4h-2" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <rect x="10" y="14" width="8" height="5" rx="1" strokeWidth={Math.max(1, strokeWidth - 0.6)} />
    </svg>
  );
}

/** Slow Cooker Hardware Icon */
export function LeanSlowCookerIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Slow Cooker',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <ellipse cx="14" cy="11" rx="10" ry="3.5" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <path d="M4 11v9a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-9" strokeWidth={strokeWidth} />
      <ellipse cx="14" cy="6" rx="2.5" ry="1.5" strokeWidth={Math.max(1, strokeWidth - 0.4)} fill="currentColor" />
      <line x1="14" y1="7.5" x2="14" y2="10" strokeWidth={Math.max(1, strokeWidth - 0.4)} />
      <circle cx="14" cy="18" r="2" strokeWidth={Math.max(1, strokeWidth - 0.5)} />
    </svg>
  );
}

/** Smoker Hardware Icon */
export function LeanSmokerIcon({
  size = 28,
  className = '',
  strokeWidth = 2,
  title = 'Smoker',
  ...props
}: LeanIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <rect x="4" y="9" width="14" height="9" rx="3" strokeWidth={strokeWidth} />
      <rect x="6" y="3" width="2.5" height="6" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <line x1="5" y1="3" x2="9.5" y2="3" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} />
      <rect x="18" y="12" width="6.5" height="7" rx="1.5" strokeWidth={Math.max(1.2, strokeWidth - 0.2)} fill="currentColor" fillOpacity="0.1" />
      <line x1="6" y1="18" x2="4" y2="25" strokeWidth={strokeWidth} />
      <line x1="16" y1="18" x2="18" y2="25" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Dynamic Lean Icon Component */
export type LeanIconName =
  | 'fork'
  | 'utensils'
  | 'plate'
  | 'heat-waves'
  | 'flame'
  | 'probe'
  | 'pan-heat'
  | 'clock'
  | 'stopwatch'
  | 'rest'
  | 'speed'
  | 'flip'
  | 'scale'
  | 'oil-spray'
  | 'safety'
  | 'air-fryer'
  | 'sheet-pan'
  | 'skillet'
  | 'grill'
  | 'instant-pot'
  | 'slow-cooker'
  | 'smoker';

export function LeanIcon({
  name,
  size = 28,
  className = '',
  strokeWidth = 2,
  ...props
}: LeanIconProps & { name: LeanIconName | string }) {
  switch (name) {
    case 'fork':
      return <LeanForkIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'utensils':
      return <LeanUtensilsIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'plate':
      return <LeanPlateIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'heat-waves':
    case 'heat':
      return <LeanHeatWavesIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'flame':
      return <LeanFlameIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'probe':
    case 'internal-temp':
      return <LeanProbeIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'pan-heat':
      return <LeanPanHeatIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'clock':
    case 'time':
      return <LeanClockIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'stopwatch':
    case 'timer':
      return <LeanStopwatchIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'rest':
      return <LeanRestIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'speed':
    case 'fast':
      return <LeanSpeedIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'flip':
      return <LeanFlipIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'scale':
    case 'weight':
    case 'protein':
      return <LeanScaleIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'oil-spray':
      return <LeanOilSprayIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'safety':
      return <LeanSafetyShieldIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'air-fryer':
      return <LeanAirFryerIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'sheet-pan':
      return <LeanSheetPanIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'skillet':
    case 'cast-iron':
      return <LeanSkilletIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'grill':
      return <LeanGrillIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'instant-pot':
      return <LeanInstantPotIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'slow-cooker':
      return <LeanSlowCookerIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    case 'smoker':
      return <LeanSmokerIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
    default:
      return <LeanClockIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
  }
}
