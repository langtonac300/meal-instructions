'use client';

import React, { useState } from 'react';
import { PAN_SPECS, PanShapeSpec } from '@/data/tools-data';
import { Square, Circle, ArrowRight, Scale, Clock, Thermometer, AlertCircle } from 'lucide-react';

export default function RecipePanScaler() {
  const [sourcePanId, setSourcePanId] = useState<string>(PAN_SPECS[2].id); // 8x8 square
  const [targetPanId, setTargetPanId] = useState<string>(PAN_SPECS[4].id); // 9x13 rect
  const [originalServings, setOriginalServings] = useState<number>(4);
  const [targetServings, setTargetServings] = useState<number>(8);

  const sourcePan = PAN_SPECS.find((p) => p.id === sourcePanId) || PAN_SPECS[0];
  const targetPan = PAN_SPECS.find((p) => p.id === targetPanId) || PAN_SPECS[1];

  // Mathematical Geometry Calculations
  const areaRatio = Math.round((targetPan.areaSqInches / sourcePan.areaSqInches) * 100) / 100;
  const servingsRatio = Math.round((targetServings / originalServings) * 100) / 100;

  // Depth and Baking Physics Adjustment:
  // If target pan has larger area than recipe scaling requires, batter is thinner -> cooks faster.
  // Thinner ratio:
  const batterThicknessRatio = servingsRatio / areaRatio;
  let timeAdjustmentNote = 'Standard bake time';
  let tempAdjustmentNote = 'Maintain original oven temp';

  if (batterThicknessRatio < 0.8) {
    timeAdjustmentNote = `Reduce baking time by approx 15%–25% (Batter is thinner)`;
  } else if (batterThicknessRatio > 1.25) {
    timeAdjustmentNote = `Increase baking time by approx 20%–35% (Batter is deeper)`;
    tempAdjustmentNote = `Lower oven temp by 25°F so center cooks through without burning edges`;
  }

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Pan Selector Dual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Source Pan */}
        <div className="bg-paper-card hairline-border p-5 space-y-4">
          <div className="micro-label text-ink-muted">FROM: ORIGINAL RECIPE PAN</div>
          <select
            value={sourcePanId}
            onChange={(e) => setSourcePanId(e.target.value)}
            className="w-full p-2.5 bg-paper hairline-border font-mono text-xs font-bold text-ink focus:outline-none focus:border-ink cursor-pointer"
          >
            {PAN_SPECS.map((pan) => (
              <option key={pan.id} value={pan.id}>
                {pan.name} ({pan.areaSqInches} sq in)
              </option>
            ))}
          </select>

          <div className="bg-paper hairline-border p-3 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-ink-muted">
              <span>Surface Area:</span>
              <span className="font-bold text-ink">{sourcePan.areaSqInches} sq in</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Approx Volume:</span>
              <span className="font-bold text-ink">{sourcePan.standardVolumeCups} cups</span>
            </div>
          </div>
        </div>

        {/* Target Pan */}
        <div className="bg-paper-card hairline-border p-5 space-y-4 border-2 border-ink">
          <div className="micro-label text-accent font-bold">TO: YOUR AVAILABLE PAN</div>
          <select
            value={targetPanId}
            onChange={(e) => setTargetPanId(e.target.value)}
            className="w-full p-2.5 bg-paper hairline-border font-mono text-xs font-bold text-ink focus:outline-none focus:border-ink cursor-pointer"
          >
            {PAN_SPECS.map((pan) => (
              <option key={pan.id} value={pan.id}>
                {pan.name} ({pan.areaSqInches} sq in)
              </option>
            ))}
          </select>

          <div className="bg-paper hairline-border p-3 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-ink-muted">
              <span>Surface Area:</span>
              <span className="font-bold text-accent">{targetPan.areaSqInches} sq in</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Approx Volume:</span>
              <span className="font-bold text-ink">{targetPan.standardVolumeCups} cups</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Scaler Multiplier Controls */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Servings Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-ink">ORIGINAL RECIPE SERVINGS:</label>
              <span className="font-bold text-ink">{originalServings}</span>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              value={originalServings}
              onChange={(e) => setOriginalServings(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          <div className="bg-paper hairline-border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-accent">TARGET DESIRED SERVINGS:</label>
              <span className="font-bold text-accent">{targetServings}</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              value={targetServings}
              onChange={(e) => setTargetServings(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Output Multiplier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Pan Area Multiplier */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono border-2 border-ink">
            <div className="micro-label text-accent font-bold">PAN AREA MULTIPLIER</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {areaRatio}x
            </div>
            <div className="text-[11px] text-ink-muted pt-1">
              Multiply single-layer ingredients by {areaRatio}
            </div>
          </div>

          {/* Servings Multiplier */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">SERVINGS SCALER</div>
            <div className="text-3xl sm:text-4xl font-bold text-ink">
              {servingsRatio}x
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              From {originalServings} to {targetServings} portions
            </div>
          </div>

          {/* Depth / Batter Status */}
          <div className="bg-paper hairline-border p-5 space-y-1 font-mono">
            <div className="micro-label text-ink-muted">BATTER THICKNESS</div>
            <div className="text-2xl sm:text-3xl font-bold text-accent">
              {batterThicknessRatio < 0.85
                ? 'THINNER'
                : batterThicknessRatio > 1.15
                ? 'THICKER'
                : 'IDENTICAL'}
            </div>
            <div className="text-[11px] text-ink-subtle pt-1">
              Relative to original pan depth
            </div>
          </div>

        </div>

        {/* 4. Baking Adjustment Directives */}
        <div className="bg-paper hairline-border p-4 space-y-2 border-l-4 border-l-accent font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-accent uppercase">
            <Clock className="w-4 h-4" />
            <span>TIME &amp; TEMPERATURE MODIFIER:</span>
          </div>
          <p className="text-ink font-sans text-xs leading-relaxed">
            • <strong>Time:</strong> {timeAdjustmentNote}.<br />
            • <strong>Temperature:</strong> {tempAdjustmentNote}.
          </p>
        </div>

      </div>
    </div>
  );
}
