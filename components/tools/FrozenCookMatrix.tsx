'use client';

import React, { useState } from 'react';
import { FROZEN_ITEMS, FrozenItem } from '@/data/tools-data';
import { ShieldCheck, ShieldAlert, Clock, Flame, Droplets, ArrowRight, AlertOctagon, Check } from 'lucide-react';

export default function FrozenCookMatrix() {
  const [selectedId, setSelectedId] = useState<string>(FROZEN_ITEMS[0].id);
  const [meatWeightLbs, setMeatWeightLbs] = useState<number>(1.0);

  const activeItem = FROZEN_ITEMS.find((item) => item.id === selectedId) || FROZEN_ITEMS[0];

  const estimatedThawMinutes = Math.round(activeItem.waterBathThawMinutes * meatWeightLbs);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Cut Selection Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {FROZEN_ITEMS.map((item) => {
          const isSelected = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[84px] ${
                isSelected
                  ? 'bg-paper-card border-2 border-ink shadow-subtle'
                  : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
              }`}
            >
              <span className={`font-bold font-sans text-xs line-clamp-2 ${isSelected ? 'text-ink' : ''}`}>
                {item.name}
              </span>
              <span className="text-[10px] tracking-widest text-accent font-bold mt-2 uppercase">
                {item.cutType}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Spec Card */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Safety Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-4">
          <div>
            <div className="micro-label text-accent">USDA FSIS SAFETY PROTOCOL // ROCK-FROZEN TRIAGE</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
              {activeItem.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {activeItem.canCookFromFrozen ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hairline-border text-ink font-mono text-xs font-bold border-l-4 border-l-accent">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>SAFE TO DIRECT COOK</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hairline-border text-accent font-mono text-xs font-bold border-l-4 border-l-accent">
                <ShieldAlert className="w-4 h-4 text-accent" />
                <span>RAPID WATER THAW FIRST</span>
              </div>
            )}
          </div>
        </div>

        {/* Appliance Greenlight vs Danger Zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-accent" />
              APPROVED APPLIANCES (DIRECT FROZEN)
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeItem.safeAppliances.map((app) => (
                <span key={app} className="px-2.5 py-1 bg-paper-card hairline-border text-ink font-bold">
                  {app}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent">
            <div className="text-[11px] font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-accent" />
              BANNED APPLIANCES (SAFETY VIOLATION)
            </div>
            <ul className="space-y-1 text-ink-muted text-[11px] pt-1">
              {activeItem.bannedAppliances.map((banned) => (
                <li key={banned} className="leading-snug">
                  • {banned}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The 50% Time Rule Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-paper hairline-border p-4 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">FRESH / THAWED COOK TIME</div>
            <div className="text-2xl sm:text-3xl font-bold text-ink-muted">
              {activeItem.freshCookMinutes} MINS
            </div>
            <div className="text-[10px] text-ink-subtle">Baseline standard</div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-1 font-mono bg-paper-100">
            <div className="micro-label text-accent font-bold">DIRECT FROZEN TIME (+50%)</div>
            <div className="text-2xl sm:text-3xl font-bold text-ink">
              {activeItem.frozenCookMinutes} MINS
            </div>
            <div className="text-[10px] text-accent font-bold">Accounts for ice vaporization</div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">USDA INTERNAL TARGET</div>
            <div className="text-2xl sm:text-3xl font-bold text-ink">
              {activeItem.internalTargetTemp}°F
            </div>
            <div className="text-[10px] text-ink-subtle">Core instant probe temp</div>
          </div>
        </div>

        {/* Temperature Step-Down Directive */}
        <div className="bg-paper hairline-border p-4 sm:p-5 space-y-2">
          <div className="micro-label text-accent">CRITICAL HEAT ADJUSTMENT</div>
          <p className="text-sm font-mono text-ink leading-relaxed">
            {activeItem.tempAdjust}
          </p>
        </div>

        {/* Cold Water Submersion Calculator */}
        <div className="bg-paper hairline-border p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 hairline-b pb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-accent" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-ink">
                EMERGENCY COLD-WATER SPEED THAW
              </h3>
            </div>
            <span className="font-mono text-[11px] text-ink-muted">USDA Approved Method</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <label className="font-mono text-xs text-ink uppercase">Package Weight (Lbs):</label>
              <div className="flex items-center gap-2 font-mono">
                {[0.5, 1.0, 1.5, 2.0, 3.0].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setMeatWeightLbs(weight)}
                    className={`px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                      meatWeightLbs === weight
                        ? 'bg-ink text-paper font-bold'
                        : 'bg-paper hairline-border text-ink-muted hover:border-ink hover:text-ink'
                    }`}
                  >
                    {weight} LB
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-paper-card hairline-border p-3 sm:px-5 text-right font-mono">
              <div className="text-[10px] text-ink-muted uppercase">Cold Submersion Time:</div>
              <div className="text-2xl font-bold text-accent">~{estimatedThawMinutes} MINS</div>
            </div>
          </div>

          <p className="text-xs text-ink-muted font-mono leading-relaxed">
            <strong>The Cold Water Protocol:</strong> Seal meat in a leak-proof ziplock bag. Submerge in a large bowl of cold tap water. Change the water every 10 minutes to maintain heat transfer. Never use hot water (causes surface bacterial blooms).
          </p>
        </div>

      </div>
    </div>
  );
}
