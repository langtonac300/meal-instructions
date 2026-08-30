import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, Zap, ShieldCheck } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'The Zero-Fluff Manifesto',
  description: 'Why we built the cleanest, fastest cooking platform on earth with zero blog stories, popups, or filler.',
  alternates: { canonical: absoluteUrl('/about') },
};

export default function AboutPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'About', path: '/about' }]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="uppercase text-ink-muted">DOCUMENT // MANIFESTO</span>
      </div>

      {/* Manifesto Content */}
      <article className="space-y-8">
        
        <div className="space-y-4">
          <div className="micro-label text-accent">THE CORE PHILOSOPHY</div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
            The Zero-Fluff Manifesto
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
            It is 6:15 PM on a Tuesday. The kids are starving, homework isn&apos;t done, and you just want to know how long to air fry chicken thighs.
          </p>
        </div>

        <div className="bg-paper-card p-6 hairline-border space-y-4 font-mono text-xs">
          <div className="text-ink font-bold uppercase hairline-b pb-2">
            THE CURRENT RECIPE INTERNET EXPERIENCE:
          </div>
          <div className="space-y-2 text-ink-muted">
            <p>1. Open Google search for &ldquo;air fryer salmon&rdquo;.</p>
            <p>2. Tap a recipe blog.</p>
            <p>3. Dodge 4 video popups, 2 newsletter modals, and a sticky video banner.</p>
            <p>4. Scroll through 1,800 words detailing how the author spent their 2014 summer studying ceramics in Tuscany.</p>
            <p>5. Tap &ldquo;Jump to Recipe&rdquo;—the layout shifts under you and you lose your place.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-ink font-sans">
            Our 4 Golden Laws
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-paper-card hairline-border space-y-2">
              <div className="font-bold text-base text-ink font-sans uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>1. &ldquo;Get to the Point&rdquo; Mode on Every Recipe</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                The very first thing at the top of every page is a toggle. Choose &ldquo;⚡ Get to the Point&rdquo; for a telegram-style 20-word execution with temperature, time, and flip marks.
              </p>
            </div>

            <div className="p-5 bg-paper-card hairline-border space-y-2">
              <div className="font-bold text-base text-ink font-sans uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>2. Minimum Dirty Dishes Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                Every recipe is engineered for an Air Fryer basket, a single sheet pan, or one 12-inch skillet. We do not create recipes that leave your sink filled with 6 pots.
              </p>
            </div>

            <div className="p-5 bg-paper-card hairline-border space-y-2">
              <div className="font-bold text-base text-ink font-sans uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>3. Complete LLM & AI Readability (`llms.txt`)</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                We provide open standard <Link href="/llms.txt" className="underline font-mono">/llms.txt</Link> and <Link href="/llms-full.txt" className="underline font-mono">/llms-full.txt</Link> feeds so AI assistants (ChatGPT, Claude, Perplexity, Gemini) can parse and cite our recipes cleanly without web scraping hurdles.
              </p>
            </div>

            <div className="p-5 bg-paper-card hairline-border space-y-2">
              <div className="font-bold text-base text-ink font-sans uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>4. Swiss Architectural Aesthetic</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                High-contrast ink on warm paper. Clear numerical indexing. Hairline structural grids. Built for maximum utility and visual calm in the kitchen.
              </p>
            </div>
          </div>
        </div>

        <div className="hairline-t pt-8 text-center font-mono text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-bold uppercase tracking-wider hover:bg-accent transition-colors"
          >
            <span>Explore The 1,050 Recipe Archive →</span>
          </Link>
        </div>

      </article>

    </div>
  );
}
