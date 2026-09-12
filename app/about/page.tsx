import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Thermometer, Flame, Wrench, Users } from 'lucide-react';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { RECIPES } from '@/data/recipes';

export const metadata: Metadata = {
  title: 'About Meal Instructions // Test Kitchen Standards & The Zero-Fluff Manifesto',
  description:
    'Our test kitchen testing standards, thermometer calibration protocols, and zero-fluff manifesto. Why we built the cleanest, fastest cooking reference on earth.',
  alternates: { canonical: absoluteUrl('/about') },
};

export default function AboutPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'About', path: '/about' }]);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo-512.png'),
    sameAs: [],
    founder: {
      '@type': 'Person',
      name: 'Alex Langton',
      jobTitle: 'Founder & Head of Kitchen Operations',
      description: 'Home cook, parent, and engineer dedicated to eliminating fluff, popup ads, and unverified data from home cooking.',
    },
    publishingPrinciples: absoluteUrl('/about'),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-12 text-ink font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
        <span className="uppercase text-ink-muted">DOCUMENT // MANIFESTO &amp; STANDARDS</span>
      </div>

      {/* Manifesto Content */}
      <article className="space-y-10">
        
        <header className="space-y-4 border-b border-ink pb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">THE CORE PHILOSOPHY</div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink uppercase font-sans">
            The Zero-Fluff Manifesto
          </h1>
          <p className="text-base sm:text-xl text-ink-muted leading-relaxed max-w-[50ch]">
            It is 6:15 PM on a Tuesday. The kids are starving, homework isn&apos;t done, and you just want to know how long to air fry chicken thighs.
          </p>
        </header>

        <div className="bg-paper-card p-6 border border-hairline space-y-4 font-mono text-xs">
          <div className="text-ink font-bold uppercase border-b border-hairline pb-2">
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

        {/* 4 Golden Laws */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink">
            Our 4 Golden Laws
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-paper-card border border-hairline space-y-2">
              <div className="font-bold text-base text-ink uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>1. &ldquo;At A Glance&rdquo; Brief &amp; Dual-Mode Delivery</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                The top of every recipe features an immediate news-style executive brief with core time, temperature, flip mark, and pull target, plus a toggle between &ldquo;Get to the Point&rdquo; and &ldquo;Step by Step&rdquo; modes. Both exist simultaneously in server-rendered HTML for instant page loads.
              </p>
            </div>

            <div className="p-5 bg-paper-card border border-hairline space-y-2">
              <div className="font-bold text-base text-ink uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>2. Minimum Dirty Dishes Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Every recipe is engineered for an Air Fryer basket, a single sheet pan, or one 12-inch skillet. We do not design recipes that leave your sink filled with 6 pots.
              </p>
            </div>

            <div className="p-5 bg-paper-card border border-hairline space-y-2">
              <div className="font-bold text-base text-ink uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>3. Complete LLM &amp; AI Readability (`llms.txt`)</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                We provide open standard <Link href="/llms.txt" className="underline font-mono">/llms.txt</Link> and <Link href="/llms-full.txt" className="underline font-mono">/llms-full.txt</Link> feeds so AI assistants (ChatGPT, Claude, Perplexity, Gemini) can parse and cite our verified culinary datasheets cleanly without scraping barriers.
              </p>
            </div>

            <div className="p-5 bg-paper-card border border-hairline space-y-2">
              <div className="font-bold text-base text-ink uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>4. Swiss Architectural Aesthetic</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                High-contrast ink on warm paper. Clear numerical indexing. Hairline structural grids. Built for maximum utility and visual calm in the kitchen.
              </p>
            </div>
          </div>
        </section>

        {/* Test Kitchen Calibration Standards */}
        <section className="border-t border-ink pt-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>E-E-A-T Quality Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink">
              Test Kitchen Standards &amp; Verification Protocol
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed mt-2">
              We operate under a strict anti-hallucination policy. No recipe on this site is generated by combinatorial loops, and no temperature or cooking time is derived from guessing or extrapolation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-paper-card border border-hairline space-y-2">
              <div className="flex items-center gap-2 font-bold text-ink uppercase text-[12px] font-sans">
                <Thermometer className="w-4 h-4 text-accent" />
                <span>Thermometer Calibration</span>
              </div>
              <p className="text-ink-muted font-sans text-xs leading-relaxed">
                All meat internal pull temperatures are verified using NIST-traceable thermocouple probe thermometers (ThermoWorks Thermapen ONE). Calibration is verified using a 32°F (0°C) crushed ice slurry and 212°F (100°C) distilled boiling water.
              </p>
            </div>

            <div className="p-4 bg-paper-card border border-hairline space-y-2">
              <div className="flex items-center gap-2 font-bold text-ink uppercase text-[12px] font-sans">
                <Wrench className="w-4 h-4 text-accent" />
                <span>Real Consumer Hardware</span>
              </div>
              <p className="text-ink-muted font-sans text-xs leading-relaxed">
                Recipes are tested on consumer kitchen hardware: 6-quart basket air fryers, seasoned 12-inch Lodge cast iron skillets, 6-quart Instant Pots, and standard 30-inch electric and gas ovens with oven thermometers.
              </p>
            </div>
          </div>

          <div className="p-5 bg-paper border border-hairline space-y-2 font-sans text-xs">
            <strong className="font-mono text-ink uppercase text-[12px] block">
              USDA FSIS Safety Compliance
            </strong>
            <p className="text-ink-muted leading-relaxed">
              Every poultry recipe is tested to ensure internal temperature reaches the USDA safe minimum threshold (165°F), accounting for carryover cooking during mandatory resting windows. Ground beef recipes require 160°F internal; whole cuts of pork and beef require 145°F plus a 3-minute rest.
            </p>
          </div>
        </section>

        {/* Editorial Team */}
        <section className="border-t border-ink pt-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
            <Users className="w-4 h-4" />
            <span>Editorial Team</span>
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-ink">
            Behind Meal Instructions
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Meal Instructions was founded by <strong>Alex Langton</strong> and is maintained by a dedicated team of parents, home cooks, and engineers. Every recipe and cook-time datasheet in our {RECIPES.length}-recipe archive has been cooked in real home kitchens, tasted by real children, and validated against physical thermal benchmarks.
          </p>
        </section>

        <div className="border-t border-hairline pt-8 text-center font-mono text-xs">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-bold uppercase tracking-wider hover:bg-accent transition-colors"
          >
            <span>Explore The {RECIPES.length} Verified Recipe Archive →</span>
          </Link>
        </div>

      </article>

    </div>
  );
}
