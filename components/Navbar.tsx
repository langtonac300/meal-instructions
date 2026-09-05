'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, LogIn, LogOut, Bookmark } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import SearchModal from './SearchModal';
import Logo from '@/components/Logo';
import { RECIPES } from '@/data/recipes';

const TOOL_ROUTES = [
  '/tools',
  '/reheat',
  '/frozen-cook',
  '/dinner-sync',
  '/meat-math',
  '/internal-temp',
  '/salt-math',
  '/kid-split',
  '/troubleshoot',
  '/air-fryer-calculator',
];

interface NavItem {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Recipes',
    href: '/categories',
    isActive: (p) => p.startsWith('/categories') || p.startsWith('/recipes'),
  },
  {
    label: 'Cook times',
    href: '/how-long',
    isActive: (p) => p.startsWith('/how-long') || p.startsWith('/charts'),
  },
  {
    label: 'Tools',
    href: '/tools',
    isActive: (p) => TOOL_ROUTES.some((r) => p === r || p.startsWith(`${r}/`)),
  },
  {
    label: 'Print pack',
    href: '/print-pack',
    isActive: (p) => p.startsWith('/print-pack'),
  },
  {
    label: 'Field guides',
    href: '/blog',
    isActive: (p) => p.startsWith('/blog'),
  },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() ?? '';
  const { data: session, status } = useSession();

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

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Ticker */}
      <div className="bg-ink text-paper px-5 sm:px-10 py-2 font-mono text-[11px] tracking-[0.1em] uppercase flex justify-between items-center gap-4 no-print">
        <span className="text-neutral-300 truncate">
          {RECIPES.length} verified meals · exact temps · no life stories
        </span>
        <Link href="/about" className="text-neutral-400 hover:text-paper transition-colors shrink-0">
          Manifesto
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-hairline no-print">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-10 h-[72px] flex items-center justify-between gap-4">
          {/* Logo & wordmark */}
          <Link href="/" className="group inline-flex items-center gap-3 shrink-0" aria-label="Meal Instructions home">
            <Logo size="md" variant="mark-only" />
            <span className="hidden sm:inline font-sans text-[16px] font-black uppercase tracking-[0.06em] text-ink leading-none">
              Meal Instructions
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] text-ink-muted" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`transition-colors pb-0.5 border-b-2 ${
                    active
                      ? 'text-ink font-semibold border-ink'
                      : 'border-transparent hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-[9px] bg-paper-50 border border-hairline hover:border-ink transition-colors text-[14px] text-ink-muted hover:text-ink cursor-pointer"
              title="Search recipes, cook times, and field guides (⌘K)"
              aria-label="Search"
            >
              <Search className="w-[15px] h-[15px] text-ink-subtle" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Auth. The sign-in button stays in the bar on every width — on
                phones it is the only sign-in entry, so it cannot hide in the menu. */}
            {status !== 'loading' &&
              (session?.user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-3 sm:px-3.5 py-[9px] bg-paper-50 border border-hairline hover:border-ink transition-colors text-[14px] text-ink hover:text-accent"
                    title={`Saved meals — signed in as ${session.user.email ?? session.user.name}`}
                  >
                    {session.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt=""
                        className="w-5 h-5 rounded-full border border-hairline"
                      />
                    ) : (
                      <Bookmark className="w-[15px] h-[15px]" aria-hidden="true" />
                    )}
                    <span className="hidden sm:inline">Saved meals</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-ink text-paper hover:bg-accent transition-colors text-[14px] font-semibold cursor-pointer"
                    title={`Signed in as ${session.user.email ?? session.user.name}`}
                  >
                    <LogOut className="w-[15px] h-[15px]" aria-hidden="true" />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => signIn('google')}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-ink text-paper hover:bg-accent transition-colors text-[14px] font-semibold cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-[15px] h-[15px]" aria-hidden="true" />
                  <span>Sign in with Google</span>
                </button>
              ))}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-ink-muted hover:text-ink"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden bg-paper-50 border-t border-hairline px-5 sm:px-10 py-3 flex flex-col text-[15px]"
            aria-label="Primary (mobile)"
          >
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`py-3 border-b border-hairline last:border-b-0 transition-colors ${
                    active ? 'text-ink font-semibold' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 border-t border-hairline text-ink-muted hover:text-ink transition-colors"
            >
              About
            </Link>
            {status !== 'loading' && session?.user && (
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 border-t border-hairline text-ink-muted hover:text-ink transition-colors"
              >
                Saved meals
              </Link>
            )}
          </nav>
        )}
      </header>

      {/* Global search dialog */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
