'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Zap, Clock, ArrowRight, Flame } from 'lucide-react';
import { RECIPES } from '@/data/recipes';
import { Recipe } from '@/lib/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipe[]>(RECIPES.slice(0, 8));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults(RECIPES.slice(0, 8));
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(RECIPES.slice(0, 8));
      return;
    }

    const q = query.toLowerCase();
    const filtered = RECIPES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q)) ||
        r.appliance.toLowerCase().includes(q) ||
        r.ingredients.some((ing) => ing.item.toLowerCase().includes(q))
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        router.push(`/recipes/${results[selectedIndex].slug}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl bg-paper-50 rounded-lg shadow-float border border-hairline overflow-hidden z-10 flex flex-col max-h-[80vh]"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-hairline bg-paper-100">
          <Search className="w-4 h-4 text-ink-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, ingredients (chicken, salmon, burger), times, or temps..."
            className="w-full bg-transparent text-ink placeholder:text-ink-subtle text-sm font-sans focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-paper-200 rounded text-ink-muted hover:text-ink"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-1.5 py-0.5 text-[9px] font-mono text-ink-muted bg-paper-200 border border-hairline rounded">
            ESC
          </kbd>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2 px-4 py-2 bg-paper-200/50 border-b border-hairline overflow-x-auto text-[10px] font-mono uppercase tracking-wider text-ink-muted">
          <span className="shrink-0 text-ink-subtle">QUICK FILTERS:</span>
          {['Air Fryer', 'Chicken', 'Salmon', '15-Min', 'Burgers', 'Sides'].map((filter) => (
            <button
              key={filter}
              onClick={() => setQuery(filter)}
              className="px-2 py-0.5 rounded bg-paper-50 hover:bg-paper border border-hairline text-ink hover:text-accent transition-colors shrink-0"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-hairline/60 py-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-ink-muted">
              <p className="text-sm font-medium">No recipes found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-ink-subtle mt-1">
                Try searching for simple terms like &ldquo;chicken&rdquo;, &ldquo;steak&rdquo;, or &ldquo;400°F&rdquo;
              </p>
            </div>
          ) : (
            results.map((recipe, index) => {
              const isSelected = index === selectedIndex;
              return (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-4 py-3 transition-colors ${
                    isSelected ? 'bg-paper-200 text-ink' : 'hover:bg-paper-100 text-ink'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-4">
                    <span className="font-mono text-xs text-ink-muted font-bold shrink-0 pt-0.5">
                      {recipe.id}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-ink truncate">
                          {recipe.title}
                        </span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-paper border border-hairline rounded text-ink-muted">
                          {recipe.appliance.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted truncate mt-0.5">{recipe.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div className="hidden sm:block">
                      <div className="font-mono text-xs font-semibold text-accent">
                        {recipe.cookTemp}
                      </div>
                      <div className="font-mono text-[10px] text-ink-subtle">
                        {recipe.totalMinutes} MINS
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-accent translate-x-0.5' : 'text-ink-subtle'
                      }`}
                    />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-hairline bg-paper-100 flex items-center justify-between text-[10px] font-mono text-ink-muted">
          <span>{results.length} recipes matched</span>
          <div className="flex items-center gap-2">
            <span>Use ↑ ↓ to navigate</span>
            <span>•</span>
            <span>↵ to select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
