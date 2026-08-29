'use client';

import React, { useState } from 'react';
import { TROUBLESHOOT_ISSUES, TroubleshootIssue } from '@/data/tools-data';
import { AlertTriangle, Wrench, Search, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export default function TroubleshootMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'ALL ISSUES' },
    { id: 'air-fryer', label: 'AIR FRYER EMERGENCIES' },
    { id: 'pan-sear', label: 'SKILLET & CRUST' },
    { id: 'meat', label: 'MEAT & TEXTURE' },
  ];

  const filteredIssues = TROUBLESHOOT_ISSUES.filter((issue) => {
    const matchesCat = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      issue.symptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.rootCause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.instantFiveSecFix.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* Category Bar & Live Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-4">
        <div className="flex flex-wrap gap-2">
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

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search symptoms (e.g. smoke, soggy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-paper hairline-border pl-8 pr-3 py-1.5 font-mono text-xs text-ink focus:outline-none focus:border-ink w-full sm:w-64"
          />
        </div>
      </div>

      {/* Emergency Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-paper-card hairline-border p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="micro-label text-accent uppercase">
                  {issue.category} EMERGENCY
                </span>
                <span className="font-mono text-[10px] text-ink-muted px-2 py-0.5 bg-paper hairline-border">
                  TRIAGE: 5 SECONDS
                </span>
              </div>

              <h3 className="text-lg font-bold text-ink uppercase tracking-tight font-sans">
                {issue.symptom}
              </h3>

              {/* 5-Second Rescue Fix */}
              <div className="bg-paper hairline-border p-3.5 space-y-1 border-l-4 border-l-accent font-mono text-xs">
                <div className="font-bold text-accent uppercase flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-accent" />
                  INSTANT 5-SECOND FIX:
                </div>
                <p className="text-ink font-mono leading-relaxed pt-1">
                  {issue.instantFiveSecFix}
                </p>
              </div>

              {/* Root Cause */}
              <div className="text-xs font-mono text-ink-muted space-y-1">
                <strong className="text-ink">Root Cause:</strong> {issue.rootCause}
              </div>
            </div>

            {/* Future Prevention */}
            <div className="hairline-t pt-3 flex items-center gap-2 text-[11px] font-mono text-ink-subtle">
              <CheckCircle2 className="w-3.5 h-3.5 text-ink flex-shrink-0" />
              <span><strong>Next Time:</strong> {issue.futurePrevention}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
