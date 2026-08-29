'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Flame, Clock, Sliders, FileText, Info } from 'lucide-react';
import SearchModal from './SearchModal';
import { RECIPES } from '@/data/recipes';

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-paper/95 backdrop-blur-md border-b border-hairline shadow-subtle'
            : 'bg-paper border-b border-hairline'
        }`}
      >
        {/* Top Minimal Ticker */}
        <div className="border-b border-hairline/60 px-4 sm:px-8 py-1.5 text-[10px] uppercase tracking-widest text-ink-muted flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-ink">ZERO FLUFF // 100% DIRECTIONS</span>
            <span className="hidden sm:inline text-hairline-dark/30">|</span>
            <span className="hidden sm:inline">NO ESSAYS. NO ADS. NO POPUPS.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-ink-subtle">PRESS ⌘K TO SEARCH</span>
            <span className="bg-paper-200 px-2 py-0.5 rounded text-[9px] font-bold text-ink">
              {RECIPES.length} MEALS INDEXED
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-ink group-hover:text-accent transition-colors">
              DAD MEALS
            </span>
            <span className="font-mono text-[10px] tracking-widest text-ink-muted hidden xs:inline border-l border-hairline pl-2">
              ZERO FLUFF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-wider font-mono font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-accent ${
                pathname === '/' ? 'text-accent font-bold underline underline-offset-4' : 'text-ink'
              }`}
            >
              INDEX [001-{String(RECIPES.length).padStart(3, '0')}]
            </Link>

            <Link
              href="/categories/air-fryer"
              className={`transition-colors hover:text-accent ${
                pathname.includes('/categories/air-fryer')
                  ? 'text-accent font-bold underline underline-offset-4'
                  : 'text-ink'
              }`}
            >
              AIR FRYER
            </Link>

            <Link
              href="/categories/15-minute"
              className={`transition-colors hover:text-accent ${
                pathname.includes('/categories/15-minute')
                  ? 'text-accent font-bold underline underline-offset-4'
                  : 'text-ink'
              }`}
            >
              15-MIN MEALS
            </Link>

            <Link
              href="/air-fryer-calculator"
              className={`transition-colors hover:text-accent ${
                pathname === '/air-fryer-calculator'
                  ? 'text-accent font-bold underline underline-offset-4'
                  : 'text-ink'
              }`}
            >
              CONVERTER
            </Link>

            <Link
              href="/cheat-sheet"
              className={`transition-colors hover:text-accent ${
                pathname === '/cheat-sheet'
                  ? 'text-accent font-bold underline underline-offset-4'
                  : 'text-ink'
              }`}
            >
              CHEAT SHEET
            </Link>

            <Link
              href="/about"
              className={`transition-colors hover:text-accent ${
                pathname === '/about'
                  ? 'text-accent font-bold underline underline-offset-4'
                  : 'text-ink'
              }`}
            >
              MANIFESTO
            </Link>
          </nav>

          {/* Search Trigger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-paper-50 hover:bg-paper-200 border border-hairline text-ink transition-all text-[11px] font-mono tracking-wider cursor-pointer"
              aria-label="Search recipes"
            >
              <Search className="w-3.5 h-3.5 text-ink-muted" />
              <span className="hidden sm:inline">SEARCH</span>
              <kbd className="hidden sm:inline text-[9px] bg-paper-200 px-1.5 py-0.5 rounded border border-hairline font-mono text-ink-muted">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/llms.txt"
              target="_blank"
              className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-ink-muted hover:text-ink px-2 py-1 border border-dashed border-hairline rounded hover:border-ink transition-colors"
              title="LLM-friendly text manifest"
            >
              <FileText className="w-3 h-3" />
              <span>LLMS.TXT</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
