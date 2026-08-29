import React from 'react';
import LeanSpecBadge from './LeanSpecBadge';

interface Lean5SMatrixProps {
  cookTemp: string;
  totalMinutes: number;
  proteinGrams?: number;
  internalTemp?: string;
  flipMinutes?: number;
  restMinutes?: number;
  servings?: number;
  className?: string;
}

export default function Lean5SMatrix({
  cookTemp,
  totalMinutes,
  proteinGrams,
  internalTemp,
  flipMinutes,
  restMinutes,
  servings,
  className = '',
}: Lean5SMatrixProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-[10px] font-mono text-ink-subtle uppercase tracking-wider">
        <span>LEAN 5S SPECIFICATION MATRIX</span>
        <span>AT-A-GLANCE PROCESS METRICS</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <LeanSpecBadge
          type="temp"
          label="Cook Temp"
          value={cookTemp}
          sub="Preheat Required"
          accent
        />

        <LeanSpecBadge
          type="time"
          label="Total Time"
          value={`${totalMinutes} MIN`}
          sub="Floor-to-Plate"
        />

        {proteinGrams !== undefined && (
          <LeanSpecBadge
            type="protein"
            label="Protein / Serv"
            value={`${proteinGrams}G`}
            sub={servings ? `Yield: ${servings} Servings` : 'Macro-Dense'}
          />
        )}

        {internalTemp ? (
          <LeanSpecBadge
            type="probe"
            label="Target Probe"
            value={internalTemp}
            sub="USDA Safe Pull"
          />
        ) : flipMinutes !== undefined && flipMinutes > 0 ? (
          <LeanSpecBadge
            type="flip"
            label="Flip / Shake"
            value={`${flipMinutes} MIN`}
            sub="Turnover Mark"
          />
        ) : restMinutes !== undefined && restMinutes > 0 ? (
          <LeanSpecBadge
            type="rest"
            label="Rest Duration"
            value={`${restMinutes} MIN`}
            sub="Juice Retention"
          />
        ) : (
          <LeanSpecBadge
            type="safety"
            label="Standard"
            value="VERIFIED"
            sub="Zero Fluff"
          />
        )}
      </div>
    </div>
  );
}
