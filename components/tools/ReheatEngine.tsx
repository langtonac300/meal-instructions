'use client';

import React, { useState } from 'react';
import { REHEAT_ITEMS, ReheatItem } from '@/data/tools-data';
import { Zap, Flame, AlertTriangle, CheckCircle2, RotateCcw, Clock, Copy, Check } from 'lucide-react';

export default function ReheatEngine() {
  const [selectedId, setSelectedId] = useState<string>(REHEAT_ITEMS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: 'ALL LEFTOVERS' },
    { id: 'takeout', label: 'FAST FOOD & TAKEOUT' },
    { id: 'pizza', label: 'PIZZA' },
    { id: 'protein', label: 'PROTEIN & STEAK' },
    { id: 'bakery', label: 'BAKERY' },
    { id: 'comfort', label: 'COMFORT' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? REHEAT_ITEMS
    : REHEAT_ITEMS.filter((item) => item.category === selectedCategory);

  const activeItem = REHEAT_ITEMS.find((item) => item.id === selectedId) || REHEAT_ITEMS[0];

  const handleCopy = () => {
    const text = `REHEAT // ${activeItem.name.toUpperCase()}\n• Air Fryer: ${activeItem.airFryerTemp}°F for ${activeItem.airFryerMinutes} mins${activeItem.shakeAtMinute ? ` (Shake at ${activeItem.shakeAtMinute}m)` : ''}\n• Anti-Sogginess Rule: ${activeItem.antiSoggyTip}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Category Segmented Filter */}
      <div className="flex flex-wrap gap-2 pb-2 hairline-b">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 text-xs font-mono tracking-wider transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-ink text-paper font-bold'
                : 'bg-paper hairline-border text-ink-muted hover:text-ink hover:border-ink'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Item Picker Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {filteredItems.map((item) => {
          const isSelected = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3 text-left transition-all cursor-pointer font-mono text-xs flex flex-col justify-between min-h-[76px] ${
                isSelected
                  ? 'bg-paper-card border-2 border-ink shadow-subtle'
                  : 'bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink'
              }`}
            >
              <span className={`font-bold font-sans text-xs sm:text-sm line-clamp-2 ${isSelected ? 'text-ink' : ''}`}>
                {item.name}
              </span>
              <span className="text-[10px] tracking-widest text-accent font-bold mt-2">
                {item.airFryerTemp}°F // {item.airFryerMinutes}M
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Execution Blueprint Panel */}
      <div className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-4">
          <div>
            <div className="micro-label text-accent">REHEAT BLUEPRINT // ZERO MICROWAVE MUSH</div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
              {activeItem.name}
            </h2>
            <div className="font-mono text-xs text-ink-subtle mt-1">
              BENCHMARK: {activeItem.testedWith}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-paper hairline-border hover:border-ink font-mono text-xs uppercase tracking-wider text-ink transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY INSTRUCTIONS'}</span>
          </button>
        </div>

        {/* Primary Air Fryer Data Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-paper hairline-border p-4 space-y-1">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-accent" />
              AIR FRYER TEMP
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-ink tracking-tight">
              {activeItem.airFryerTemp}°F
            </div>
            <div className="text-[11px] font-mono text-ink-subtle">
              ({Math.round((activeItem.airFryerTemp - 32) * (5 / 9))}°C) Preheated 2 min
            </div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-1">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              TARGET TIME
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-ink tracking-tight">
              {activeItem.airFryerMinutes} MINS
            </div>
            <div className="text-[11px] font-mono text-ink-subtle">
              From refrigerator (38°F–40°F)
            </div>
          </div>

          <div className="bg-paper hairline-border p-4 space-y-1">
            <div className="micro-label text-ink-muted flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-accent" />
              SHAKE / FLIP MARK
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-accent tracking-tight">
              {activeItem.shakeAtMinute ? `AT ${activeItem.shakeAtMinute} MINS` : 'NO FLIP NEEDED'}
            </div>
            <div className="text-[11px] font-mono text-ink-subtle">
              Even convection airflow
            </div>
          </div>
        </div>

        {/* Alternative Skillet Protocol (if applicable) */}
        {activeItem.skilletMinutes && (
          <div className="bg-paper hairline-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-ink">
              <Zap className="w-4 h-4 text-accent flex-shrink-0" />
              <span><strong>SKILLET ALTERNATIVE:</strong> {activeItem.skilletTemp} for <strong>{activeItem.skilletMinutes} minutes</strong>.</span>
            </div>
            <span className="text-[11px] text-ink-muted">No Air Fryer Required</span>
          </div>
        )}

        {/* The Golden Anti-Sogginess Rule */}
        <div className="bg-paper hairline-border p-4 sm:p-5 space-y-2 border-l-4 border-l-ink">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>The Crisp Preservation Secret</span>
          </div>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            {activeItem.antiSoggyTip}
          </p>
        </div>

        {/* Why Microwave Destroys This Item */}
        <div className="bg-paper hairline-border p-4 sm:p-5 space-y-2 border-l-4 border-l-accent">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-accent">
            <AlertTriangle className="w-4 h-4 text-accent" />
            <span>Why The Microwave Fails</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted font-mono leading-relaxed">
            {activeItem.microwaveWarning}
          </p>
        </div>

      </div>
    </div>
  );
}
