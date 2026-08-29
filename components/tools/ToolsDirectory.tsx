'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Flame,
  Clock,
  Scale,
  Thermometer,
  ShieldAlert,
  Droplets,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  LeanAirFryerIcon,
  LeanHeatWavesIcon,
  LeanSafetyShieldIcon,
  LeanClockIcon,
  LeanForkIcon,
  LeanProbeIcon,
  LeanScaleIcon,
  LeanPlateIcon,
  LeanPanHeatIcon,
  LeanStopwatchIcon,
  LeanGrillIcon,
  LeanSlowCookerIcon,
} from '@/components/icons/Lean5SIcons';
import { ALL_TOOLS, ToolEntry } from '@/data/tools-directory';
export { ALL_TOOLS };
export type { ToolEntry };

export default function ToolsDirectory() {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All 30 Engines' },
    { id: 'temperature', label: 'Temperature & Searing' },
    { id: 'ratios', label: 'Ratios & Math' },
    { id: 'bbq', label: 'BBQ & Meat Science' },
    { id: 'planning', label: 'Planning & Timelines' },
    { id: 'emergency', label: 'Emergency & Rescue' },
  ];

  const filteredTools = ALL_TOOLS.filter((t) => {
    const matchesCat = selectedCat === 'all' || t.category === selectedCat;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'air-fryer':
        return LeanAirFryerIcon;
      case 'heat-waves':
        return LeanHeatWavesIcon;
      case 'safety':
        return LeanSafetyShieldIcon;
      case 'clock':
        return LeanClockIcon;
      case 'fork':
        return LeanForkIcon;
      case 'probe':
        return LeanProbeIcon;
      case 'scale':
        return LeanScaleIcon;
      case 'plate':
        return LeanPlateIcon;
      case 'pan-heat':
        return LeanPanHeatIcon;
      case 'stopwatch':
        return LeanStopwatchIcon;
      default:
        return LeanScaleIcon;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Category Pills & Search Filter */}
      <div className="bg-paper-card hairline-border p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-ink text-paper font-bold'
                  : 'bg-paper hairline-border text-ink-muted hover:border-ink hover:text-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search all 30 kitchen engines (e.g. Smoke Points, Brisket, Baker's %, Sous Vide, Egg, Reheat)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-paper hairline-border font-mono text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const Icon = getIcon(tool.iconName);
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-paper-card hairline-border p-6 space-y-3 hover:border-ink transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="micro-label text-accent font-mono">
                    {tool.badge}
                  </span>
                  <div className="p-1.5 bg-paper hairline-border">
                    <Icon size={24} className="text-ink-muted group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-ink uppercase tracking-tight font-sans group-hover:text-accent transition-colors">
                  {tool.title}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="font-mono text-xs font-bold text-ink uppercase pt-2 flex items-center gap-1 group-hover:underline">
                <span>Launch Engine</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
