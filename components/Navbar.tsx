'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Flame, Zap, Clock, BookOpen, Layers, Menu, X } from 'lucide-react';
import SearchModal from './SearchModal';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Top Ticker / Manifesto Header */}
      <div className="bg-ink text-paper py-1.5 px-4 sm:px-8 text-[11px] font-mono tracking-wider flex justify-between items-center hairline-b">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase text-neutral-300">Technical Cook-Time Reference & Quality-Gated Meals // No Fluff, Just the Instructions</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <Link href="/about" className="hover:text-paper transition-colors">
            MANIFESTO
          </Link>
          <span>/</span>
          <Link href="/llms.txt" className="hover:text-paper transition-colors">
            AI SCRAPER (LLMS.TXT)
          </Link>
        </div>
      </div>

      {/* Main Architectural Navigation */}
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md hairline-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="group inline-flex items-center">
            <Logo size="md" variant="horizontal" />
          </Link>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs tracking-wider uppercase text-ink-muted">
            <Link
              href="/appliances/air-fryer"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname === '/appliances/air-fryer' ? 'text-ink border-b-2 border-ink font-bold' : ''
              }`}
            >
              Air Fryer
            </Link>
            <Link
              href="/categories/15-minute"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname === '/categories/15-minute' ? 'text-ink border-b-2 border-ink font-bold' : ''
              }`}
            >
              15-Minute Dinners
            </Link>
            <Link
              href="/categories/high-protein"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname === '/categories/high-protein' ? 'text-ink border-b-2 border-ink font-bold' : ''
              }`}
            >
              High Protein
            </Link>
            <Link
              href="/categories/kid-approved"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname === '/categories/kid-approved' ? 'text-ink border-b-2 border-ink font-bold' : ''
              }`}
            >
              Kid Approved
            </Link>
            <Link
              href="/blog"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname.startsWith('/blog') ? 'text-ink border-b-2 border-ink font-bold text-accent' : ''
              }`}
            >
              Field Guides
            </Link>
            <Link
              href="/tools"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname === '/tools' || pathname.startsWith('/reheat') || pathname.startsWith('/frozen-cook') || pathname.startsWith('/dinner-sync') || pathname.startsWith('/meat-math') || pathname.startsWith('/internal-temp') || pathname.startsWith('/salt-math') || pathname.startsWith('/kid-split') || pathname.startsWith('/troubleshoot') || pathname.startsWith('/air-fryer-calculator') ? 'text-ink border-b-2 border-ink font-bold text-accent' : ''
              }`}
            >
              Tools &amp; Calcs
            </Link>
            <Link
              href="/shop"
              className={`hover:text-ink transition-colors pb-0.5 flex items-center gap-1 ${
                pathname.startsWith('/shop') || pathname.startsWith('/merch') ? 'text-ink border-b-2 border-ink font-bold text-accent' : ''
              }`}
            >
              <span>Merch &amp; Tools</span>
              <span className="text-[9px] px-1 py-0.2 bg-ink text-paper font-bold">24</span>
            </Link>
            <Link
              href="/how-long"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname.startsWith('/how-long') ? 'text-ink border-b-2 border-ink font-bold text-accent' : ''
              }`}
            >
              Cook Times
            </Link>
            <Link
              href="/cheat-sheet"
              className={`hover:text-ink transition-colors pb-0.5 ${
                pathname === '/cheat-sheet' ? 'text-ink border-b-2 border-ink font-bold' : ''
              }`}
            >
              Temp Cheatsheet
            </Link>
          </nav>

          {/* Right Action: Search Trigger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink transition-colors text-xs font-mono text-ink-muted hover:text-ink cursor-pointer"
              title="Search recipes, cook times, and 50 field guides"
            >
              <Search className="w-3.5 h-3.5 text-ink-subtle" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-paper-subtle hairline-border rounded text-ink-muted">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink-muted hover:text-ink"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-paper-card hairline-t hairline-b p-4 space-y-3 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/appliances/air-fryer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-ink hover:text-accent"
            >
              ⚡ Air Fryer Engine
            </Link>
            <Link
              href="/categories/15-minute"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-ink hover:text-accent"
            >
              ⏱️ 15-Minute Meals
            </Link>
            <Link
              href="/categories/high-protein"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-ink hover:text-accent"
            >
              💪 High Protein / Lean
            </Link>
            <Link
              href="/categories/kid-approved"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-ink hover:text-accent"
            >
              👶 Kid & Toddler Approved
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-accent font-bold hover:underline"
            >
              🔬 50 Field Guides &amp; Science
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-ink hover:text-accent"
            >
              🛠️ Kitchen Tools &amp; Calculators (11)
            </Link>
            <Link
              href="/how-long"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-accent font-bold hover:underline"
            >
              🔥 Cook Times (60 Datasheets)
            </Link>
            <Link
              href="/cheat-sheet"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-ink hover:text-accent"
            >
              📋 Air Fryer Temp Cheatsheet
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-accent font-bold hover:underline"
            >
              👕 Merch &amp; Useless Tools (24 Specs)
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-ink-muted hover:text-ink"
            >
              ℹ️ Zero-Fluff Manifesto
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
