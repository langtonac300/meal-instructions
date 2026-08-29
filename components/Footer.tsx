import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, Flame, Zap, Award } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';
import { RECIPES } from '@/data/recipes';

export default function Footer() {
  return (
    <footer className="bg-paper-100 border-t border-hairline mt-20 text-ink font-mono text-xs">
      {/* Top Banner: The Zero Fluff Guarantee */}
      <div className="border-b border-hairline py-8 px-4 sm:px-8 bg-paper-200/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ink text-paper rounded">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-wider uppercase text-ink">
                THE ZERO FLUFF PROMISE
              </h4>
              <p className="text-[11px] text-ink-muted font-sans mt-0.5">
                0 childhood memoirs. 0 vacation stories before recipes. 100% actionable cooking instructions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-ink-muted">
            <span className="px-2.5 py-1 bg-paper border border-hairline rounded font-bold text-ink">
              {RECIPES.length} RECIPES
            </span>
            <span className="px-2.5 py-1 bg-paper border border-hairline rounded font-bold text-ink">
              SUB-15 MIN AVG
            </span>
            <span className="px-2.5 py-1 bg-paper border border-hairline rounded font-bold text-accent">
              100% TESTED
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Col 1: Categories */}
        <div>
          <h5 className="font-bold uppercase tracking-widest text-[10px] text-ink-subtle mb-4">
            CATEGORIES
          </h5>
          <ul className="space-y-2 text-[11px]">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="hover:text-accent transition-colors hover:underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Appliances & Guides */}
        <div>
          <h5 className="font-bold uppercase tracking-widest text-[10px] text-ink-subtle mb-4">
            APPLIANCES & GUIDES
          </h5>
          <ul className="space-y-2 text-[11px]">
            {APPLIANCES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/appliances/${a.slug}`}
                  className="hover:text-accent transition-colors hover:underline"
                >
                  {a.name} Guide
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/air-fryer-calculator"
                className="hover:text-accent transition-colors hover:underline text-accent font-bold"
              >
                ⚡ Oven-to-Air Fryer Calc
              </Link>
            </li>
            <li>
              <Link
                href="/cheat-sheet"
                className="hover:text-accent transition-colors hover:underline"
              >
                📋 Temp & Time Cheat Sheet
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: AI & Machine Access */}
        <div>
          <h5 className="font-bold uppercase tracking-widest text-[10px] text-ink-subtle mb-4">
            LLM & AI COVERAGE
          </h5>
          <ul className="space-y-2 text-[11px]">
            <li>
              <Link
                href="/llms.txt"
                target="_blank"
                className="hover:text-accent transition-colors flex items-center gap-1.5 font-bold"
              >
                <FileText className="w-3 h-3 text-accent" />
                <span>/llms.txt (Index)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/llms-full.txt"
                target="_blank"
                className="hover:text-accent transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-ink-muted" />
                <span>/llms-full.txt (Full Dump)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="hover:text-accent transition-colors"
              >
                /sitemap.xml
              </Link>
            </li>
            <li>
              <Link
                href="/robots.txt"
                target="_blank"
                className="hover:text-accent transition-colors"
              >
                /robots.txt
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Brand & Manifesto */}
        <div>
          <h5 className="font-bold uppercase tracking-widest text-[10px] text-ink-subtle mb-4">
            DAD MEALS
          </h5>
          <p className="text-[11px] font-sans text-ink-muted leading-relaxed mb-3">
            Designed with architectural minimalism for fathers who want dinner on the table without scrolling through ads.
          </p>
          <Link
            href="/about"
            className="inline-block px-3 py-1 bg-ink text-paper rounded text-[10px] uppercase font-bold hover:bg-accent transition-colors"
          >
            READ MANIFESTO →
          </Link>
        </div>
      </div>

      {/* Bottom Kellerstöckl Colophon Bar */}
      <div className="border-t border-hairline py-6 px-4 sm:px-8 text-center text-[10px] text-ink-subtle tracking-widest uppercase bg-paper-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>DAD MEALS // ZERO FLUFF ARCHITECTURAL COOKING SYSTEM</span>
          <span>LIGHT THEME // SWISS GROTESK // NO POPUPS</span>
          <span>© 2026 DADMEALS.COM</span>
        </div>
      </div>
    </footer>
  );
}
