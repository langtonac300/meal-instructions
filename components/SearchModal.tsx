'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Zap, Flame, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Recipe, BlogPost, FoodStorageDatasheet } from '@/lib/types';
import { RECIPES } from '@/data/recipes';
import { BLOG_POSTS } from '@/data/blog-posts';
import { FOOD_STORAGE_DATASHEETS } from '@/data/food-storage';

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

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      const initialRecipes = RECIPES.slice(0, 5).map((r) => ({
        type: 'recipe' as const,
        id: r.id,
        slug: r.slug,
        title: r.title,
        subtitle: r.tagline,
        badge: r.appliance,
        time: `${r.totalMinutes}m`,
        href: `/recipes/${r.slug}`,
      }));
      const initialGuides = BLOG_POSTS.slice(0, 3).map((g) => ({
        type: 'guide' as const,
        id: g.id,
        slug: g.slug,
        title: g.title,
        subtitle: g.summary,
        badge: 'FIELD GUIDE',
        time: `${g.readMinutes}m read`,
        href: `/blog/${g.slug}`,
      }));
      return [...initialRecipes, ...initialGuides];
    }

    const q = query.toLowerCase();

    const matchedRecipes = RECIPES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.appliance.toLowerCase().includes(q) ||
        r.protein.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q)) ||
        r.ingredients.some((i) => i.item.toLowerCase().includes(q))
    ).slice(0, 8).map((r) => ({
      type: 'recipe' as const,
      id: r.id,
      slug: r.slug,
      title: r.title,
      subtitle: r.tagline,
      badge: r.appliance,
      time: `${r.totalMinutes}m`,
      href: `/recipes/${r.slug}`,
    }));

    const matchedGuides = BLOG_POSTS.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 6).map((g) => ({
      type: 'guide' as const,
      id: g.id,
      slug: g.slug,
      title: g.title,
      subtitle: g.summary,
      badge: 'FIELD GUIDE',
      time: `${g.readMinutes}m read`,
      href: `/blog/${g.slug}`,
    }));

    const matchedStorage = FOOD_STORAGE_DATASHEETS.filter(
      (s) =>
        s.food.toLowerCase().includes(q) ||
        s.foodCategory.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 4).map((s) => {
      const fridgeTime = s.storageTimeframes.find((t) => t.location === 'fridge');
      return {
        type: 'storage' as const,
        id: s.id,
        slug: s.slug,
        title: s.food,
        subtitle: `Fridge: ${fridgeTime?.formatted ?? '—'}`,
        badge: 'STORAGE',
        time: fridgeTime?.formatted ?? '—',
        href: `/storage/${s.slug}`,
      };
    });

    return [...matchedRecipes, ...matchedGuides, ...matchedStorage];
  }, [query]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      if (searchResults[selectedIndex]) {
        router.push(searchResults[selectedIndex].href);
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
        className="w-full max-w-2xl bg-paper-card hairline-border shadow-float overflow-hidden flex flex-col max-h-[80vh] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 hairline-b bg-paper">
          <Search className="w-4 h-4 text-ink-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search recipes, cook times, and 50 science field guides (e.g. maillard, wings, salt, steak)..."
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
            {['air fryer', 'maillard', 'chicken', 'dry brine', 'steak', 'salmon', 'storage', 'reverse sear'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2 py-0.5 bg-paper hairline-border hover:border-ink uppercase text-ink-muted hover:text-ink whitespace-nowrap transition-colors rounded"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-hairline">
          {searchResults.length > 0 ? (
            searchResults.map((item, idx) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.href}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between p-4 transition-colors ${
                  selectedIndex === idx ? 'bg-paper-subtle/80' : 'hover:bg-paper'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                    item.type === 'guide' ? 'bg-paper-200 text-accent border-accent/40' : item.type === 'storage' ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-paper text-ink-subtle border-hairline'
                  }`}>
                    {item.type === 'guide' ? 'GUIDE' : item.type === 'storage' ? 'STORAGE' : `#${item.id}`}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-ink font-sans">{item.title}</h4>
                    <p className="text-xs text-ink-muted line-clamp-1 font-sans">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-ink-muted">
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-paper hairline-border uppercase rounded">
                    {item.badge}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-ink-subtle" />
                    {item.time}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-subtle" />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center font-mono text-sm text-ink-muted">
              No results found matching &ldquo;{query}&rdquo;.
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
          <div>{searchResults.length} RESULTS</div>
        </div>
      </div>
    </div>
  );
}

