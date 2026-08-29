'use client';

import React, { useState } from 'react';
import { MEAT_MATH_PROFILES, MeatMathProfile } from '@/data/tools-data';
import { Users, ShoppingBag, Flame, Copy, Check, Info } from 'lucide-react';

export default function MeatMathScaler() {
  const [adults, setAdults] = useState<number>(6);
  const [bigEaters, setBigEaters] = useState<number>(2);
  const [kids, setKids] = useState<number>(4);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(MEAT_MATH_PROFILES[0].id);
  const [copied, setCopied] = useState(false);

  const activeProfile = MEAT_MATH_PROFILES.find((p) => p.id === selectedProfileId) || MEAT_MATH_PROFILES[0];

  // Calculation Math:
  // Standard Adult: rawOzPerAdult
  // Big Eater: rawOzPerAdult * 1.5
  // Kid: rawOzPerChild
  const totalRawOz = (adults * activeProfile.rawOzPerAdult) +
    (bigEaters * (activeProfile.rawOzPerAdult * 1.5)) +
    (kids * activeProfile.rawOzPerChild);

  const rawLbs = Math.round((totalRawOz / 16) * 10) / 10;
  const rawLbsRoundedUp = Math.ceil(rawLbs * 2) / 2; // rounds to nearest 0.5 lb
  const cookedLbs = Math.round((rawLbs * (1 - activeProfile.shrinkagePercent / 100)) * 10) / 10;

  const totalHeadcount = adults + bigEaters + kids;

  const handleCopy = () => {
    const lines = [
      `COSTCO / GROCERY LIST // ${activeProfile.name.toUpperCase()}`,
      `Headcount: ${totalHeadcount} Total (${adults} Adults, ${bigEaters} Big Eaters, ${kids} Kids)`,
      `• RAW BUTCHER MEAT: Buy ${rawLbsRoundedUp} lbs (Yields ~${cookedLbs} lbs cooked)`,
      ...activeProfile.sideRecommendations.map((s) => `• ${s.item}: for ${totalHeadcount} people (${s.qtyPerPerson})`),
      `• Pack Tip: ${activeProfile.costcoPackTip}`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Menu Style Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {MEAT_MATH_PROFILES.map((profile) => {
          const isSelected = profile.id === activeProfile.id;
          return (
            <button
              key={profile.id}
              onClick={() => setSelectedProfileId(profile.id)}
              className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[80px] ${
                isSelected
                  ? 'bg-paper-card border-2 border-ink shadow-subtle'
                  : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
              }`}
            >
              <span className={`font-bold font-sans text-xs line-clamp-2 ${isSelected ? 'text-ink' : ''}`}>
                {profile.name}
              </span>
              <span className="text-[10px] tracking-widest text-accent font-bold mt-2 uppercase">
                {profile.shrinkagePercent}% LOSS
              </span>
            </button>
          );
        })}
      </div>

      {/* Headcount Configurator Panel */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="micro-label text-accent">PARTY HEADCOUNT & HUNGER MATRIX</div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* Adults */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">ADULTS (STANDARD):</label>
              <span className="text-sm font-bold text-accent">{adults}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAdults(Math.max(0, adults - 1))}
                className="w-8 h-8 bg-paper-card hairline-border font-bold text-ink hover:border-ink cursor-pointer"
              >
                -
              </button>
              <input
                type="range"
                min="0"
                max="30"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <button
                onClick={() => setAdults(adults + 1)}
                className="w-8 h-8 bg-paper-card hairline-border font-bold text-ink hover:border-ink cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="text-[10px] text-ink-subtle">{activeProfile.rawOzPerAdult} oz raw per adult</div>
          </div>

          {/* Big Eaters / Teenagers */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">BIG EATERS (1.5X):</label>
              <span className="text-sm font-bold text-accent">{bigEaters}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBigEaters(Math.max(0, bigEaters - 1))}
                className="w-8 h-8 bg-paper-card hairline-border font-bold text-ink hover:border-ink cursor-pointer"
              >
                -
              </button>
              <input
                type="range"
                min="0"
                max="20"
                value={bigEaters}
                onChange={(e) => setBigEaters(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <button
                onClick={() => setBigEaters(bigEaters + 1)}
                className="w-8 h-8 bg-paper-card hairline-border font-bold text-ink hover:border-ink cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="text-[10px] text-ink-subtle">{Math.round(activeProfile.rawOzPerAdult * 1.5)} oz raw (seconds/teens)</div>
          </div>

          {/* Kids / Toddlers */}
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink uppercase">KIDS / TODDLERS (0.5X):</label>
              <span className="text-sm font-bold text-accent">{kids}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setKids(Math.max(0, kids - 1))}
                className="w-8 h-8 bg-paper-card hairline-border font-bold text-ink hover:border-ink cursor-pointer"
              >
                -
              </button>
              <input
                type="range"
                min="0"
                max="20"
                value={kids}
                onChange={(e) => setKids(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <button
                onClick={() => setKids(kids + 1)}
                className="w-8 h-8 bg-paper-card hairline-border font-bold text-ink hover:border-ink cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="text-[10px] text-ink-subtle">{activeProfile.rawOzPerChild} oz raw portion</div>
          </div>
        </div>
      </div>

      {/* Output Results Blueprint */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-4">
          <div>
            <div className="micro-label text-accent">RAW TO COOKED YIELD SPECIFICATION</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
              Butcher Purchase Order
            </h2>
            <div className="font-mono text-xs text-ink-subtle mt-1">
              Feeding {totalHeadcount} people ({adults + bigEaters} adults, {kids} kids)
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-paper hairline-border hover:border-ink font-mono text-xs uppercase tracking-wider text-ink transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED FOR SMS' : 'COPY SHOPPING LIST'}</span>
          </button>
        </div>

        {/* Primary Metric Displays */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-paper hairline-border p-4 space-y-1 font-mono bg-paper-100 border-2 border-ink">
            <div className="micro-label text-accent font-bold">RAW WEIGHT TO BUY (BUTCHER)</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {rawLbsRoundedUp} LBS
            </div>
            <div className="text-[11px] text-ink-muted">
              ({totalRawOz} oz raw weight)
            </div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">ESTIMATED COOKED YIELD</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              ~{cookedLbs} LBS
            </div>
            <div className="text-[11px] text-ink-subtle">
              After {activeProfile.shrinkagePercent}% fat/water render {activeProfile.isBoneIn ? '& bone discard' : ''}
            </div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">SERVING BASIS</div>
            <div className="text-xl sm:text-2xl font-bold text-accent uppercase">
              {activeProfile.servingUnitName}
            </div>
            <div className="text-[11px] text-ink-subtle">
              Includes safety buffer for seconds
            </div>
          </div>
        </div>

        {/* Buns & Sides Breakdown */}
        <div className="bg-paper hairline-border p-5 space-y-3 font-mono text-xs">
          <div className="text-[11px] font-bold text-ink uppercase tracking-wider">
            SIDES & BUNS CALCULATION (FOR {totalHeadcount} GUESTS):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeProfile.sideRecommendations.map((side) => (
              <div key={side.item} className="bg-paper-card hairline-border p-3 space-y-1">
                <div className="font-bold text-ink">{side.item}</div>
                <div className="text-ink-muted text-[11px]">{side.qtyPerPerson}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Costco & Grocery Packaging Tip */}
        <div className="bg-paper hairline-border p-4 flex items-start gap-3 border-l-4 border-l-ink font-mono text-xs">
          <ShoppingBag className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-ink uppercase">COSTCO / SUPERMARKET PACK STRATEGY:</span>
            <p className="text-ink-muted font-sans leading-relaxed">
              {activeProfile.costcoPackTip}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
