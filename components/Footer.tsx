import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';

export default function Footer() {
  return (
    <footer className="bg-paper-card hairline-t mt-20 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-ink text-paper flex items-center justify-center font-bold text-xs font-mono">
                DM
              </div>
              <span className="font-bold text-sm tracking-wider uppercase font-mono">
                DAD MEALS // ZERO FLUFF
              </span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed font-sans">
              Engineered for busy parents. Instant directions, exact temps, and 20-word execution. No popups, no ads, no 12-paragraph essays about childhood summers.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-block text-xs font-mono uppercase tracking-wider text-ink border-b border-ink hover:opacity-60 transition-opacity"
              >
                Read The Zero-Fluff Manifesto →
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="micro-label mb-4 text-ink">Browse by Category</h4>
            <ul className="space-y-2 text-xs font-mono">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-ink-muted hover:text-ink transition-colors uppercase"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Appliances */}
          <div>
            <h4 className="micro-label mb-4 text-ink">Appliance Guides</h4>
            <ul className="space-y-2 text-xs font-mono">
              {APPLIANCES.map((app) => (
                <li key={app.slug}>
                  <Link
                    href={`/appliances/${app.slug}`}
                    className="text-ink-muted hover:text-ink transition-colors uppercase"
                  >
                    {app.name} Guide
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/cheat-sheet"
                  className="text-accent font-bold hover:underline uppercase"
                >
                  ⚡ All-Appliance Cheatsheet
                </Link>
              </li>
            </ul>
          </div>

          {/* Machine-Readable / SEO & AI Scraper */}
          <div className="space-y-4">
            <h4 className="micro-label text-ink">AI & Machine Endpoints</h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              Standardized AI scraper endpoints allowing instant ingest by ChatGPT, Claude, Perplexity, and Gemini:
            </p>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/llms.txt" className="text-ink hover:underline">
                  📄 /llms.txt (AI Index)
                </Link>
              </li>
              <li>
                <Link href="/llms-full.txt" className="text-ink hover:underline">
                  📚 /llms-full.txt (All Recipes Markdown)
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-ink hover:underline">
                  🗺️ /sitemap.xml (SEO Sitemap)
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="text-ink hover:underline">
                  🤖 /robots.txt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="hairline-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-ink-subtle gap-4">
          <div>
            © 2026 DAD MEALS // ALL RECIPES VALIDATED WITH SCHEMA.ORG JSON-LD.
          </div>
          <div className="flex items-center gap-6">
            <span>COOK TIME ENGINE & ZERO-FLUFF RECIPES</span>
            <span>•</span>
            <span>BUILD: STATIC GENERATION (SSG)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
