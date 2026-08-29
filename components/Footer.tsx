import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { APPLIANCES } from '@/data/appliances';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-paper-card hairline-t mt-20 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Manifesto */}
          <div className="space-y-4">
            <Link href="/" className="group inline-flex items-center">
              <Logo size="sm" variant="horizontal" />
            </Link>
            <p className="text-xs text-ink-muted leading-relaxed font-sans">
              Engineered for busy cooks and parents. Instant directions, exact temps, and 20-word execution. No popups, no ads, no 12-paragraph essays about childhood summers. No fluff, just the instructions.
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

          {/* Kitchen Tools & Calculators */}
          <div>
            <h4 className="micro-label mb-4 text-accent">Kitchen Engines</h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <Link href="/shop" className="text-accent font-bold hover:underline uppercase">
                  👕 Merch &amp; Useless Tools (24 Specs)
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-ink font-bold hover:underline uppercase">
                  🛠️ All Tools (30 Engines)
                </Link>
              </li>
              <li>
                <Link href="/reheat" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  Takeout Revive
                </Link>
              </li>
              <li>
                <Link href="/frozen-cook" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  Freezer Cook Matrix
                </Link>
              </li>
              <li>
                <Link href="/dinner-sync" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  Dinner Sync Timer
                </Link>
              </li>
              <li>
                <Link href="/meat-math" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  Meat Math Scaler
                </Link>
              </li>
              <li>
                <Link href="/internal-temp" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  Thermometer Pull Guide
                </Link>
              </li>
              <li>
                <Link href="/salt-math" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  Salt &amp; Dry-Brine Math
                </Link>
              </li>
              <li>
                <Link href="/kid-split" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  Picky Kid Deconstructor
                </Link>
              </li>
              <li>
                <Link href="/troubleshoot" className="text-ink-muted hover:text-ink transition-colors uppercase">
                  5-Sec Dinner Rescue
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="micro-label mb-4 text-ink">Browse by Category</h4>
            <ul className="space-y-1.5 text-xs font-mono">
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
            <ul className="space-y-1.5 text-xs font-mono">
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
                  href="/how-long"
                  className="text-accent font-bold hover:underline uppercase"
                >
                  🔥 All Cook Times (60)
                </Link>
              </li>
              <li>
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
            <h4 className="micro-label text-ink">AI &amp; Machine Endpoints</h4>
            <p className="text-xs text-ink-muted leading-relaxed font-sans">
              Standardized AI scraper manifests for ChatGPT, Claude, and Perplexity:
            </p>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <Link href="/guides" className="text-ink font-bold hover:underline">
                  📚 Top 10 Guides (20)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-accent font-bold hover:underline">
                  🔬 Field Guides (55)
                </Link>
              </li>
              <li>
                <Link href="/llms.txt" className="text-ink hover:underline">
                  📄 /llms.txt (AI Index)
                </Link>
              </li>
              <li>
                <Link href="/llms-full.txt" className="text-ink hover:underline">
                  📚 /llms-full.txt (Markdown)
                </Link>
              </li>
              <li>
                <Link href="/.well-known/mcp/server-card.json" className="text-ink hover:underline">
                  🔌 MCP Server Card (AI Tools)
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-ink hover:underline">
                  🗺️ /sitemap.xml (Sitemap)
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
            © 2026 MEAL INSTRUCTIONS // ALL RECIPES VALIDATED WITH SCHEMA.ORG JSON-LD.
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
