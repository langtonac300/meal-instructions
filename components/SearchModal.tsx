'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Zap, Flame, Clock, ArrowRight } from 'lucide-react';
import { Recipe } from '@/lib/types';
import { RECIPES } from '@/data/recipes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredRecipes = useMemo(() => {
    if (!query.trim()) {
      return RECIPES.slice(0, 8); // show popular/flagship first
    }
    const q = query.toLowerCase();
    return RECIPES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.appliance.toLowerCase().includes(q) ||
        r.protein.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q)) ||
        r.ingredients.some((i) => i.item.toLowerCase().includes(q))
    ).slice(0, 15);
  }, [query]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredRecipes.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredRecipes.length) % filteredRecipes.length);
    } else if (e.key === 'Enter') {
      if (filteredRecipes[selectedIndex]) {
        router.push(`/recipes/${filteredRecipes[selectedIndex].slug}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-paper-card hairline-border shadow-float overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 hairline-b bg-paper">
          <Search className="w-4 h-4 text-ink-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search recipes & cook-time reference (e.g. wings, salmon, burger, 10 min)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-ink placeholder-ink-subtle font-mono text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-ink-muted hover:text-ink">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Tag Suggestions */}
        {!query && (
          <div className="px-4 py-2.5 bg-paper-subtle/50 hairline-b flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
            <span className="text-ink-subtle uppercase">Quick:</span>
            {['air fryer', 'chicken', 'smash burger', 'steak', 'salmon', '10 min', 'kid friendly'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2 py-0.5 bg-paper hairline-border hover:border-ink uppercase text-ink-muted hover:text-ink whitespace-nowrap transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-hairline">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, idx) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between p-4 transition-colors ${
                  selectedIndex === idx ? 'bg-paper-subtle/80' : 'hover:bg-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-ink-subtle w-10">
                    #{recipe.id}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-ink">{recipe.title}</h4>
                    <p className="text-xs text-ink-muted line-clamp-1 font-sans">
                      {recipe.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-ink-muted">
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-paper hairline-border uppercase">
                    {recipe.appliance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-ink-subtle" />
                    {recipe.totalMinutes}m
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-subtle" />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center font-mono text-sm text-ink-muted">
              No recipes found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Modal Footer Key Hints */}
        <div className="px-4 py-2 bg-paper-subtle hairline-t flex justify-between items-center text-[10px] font-mono text-ink-subtle">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>•</span>
            <span>↵ to select</span>
            <span>•</span>
            <span>ESC to close</span>
          </div>
          <div>{filteredRecipes.length} RESULTS</div>
        </div>
      </div>
    </div>
  );
}
