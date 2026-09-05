import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { APPLIANCES } from '@/data/appliances';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { LeanIcon, LeanHeatWavesIcon, LeanClockIcon, LeanFlipIcon } from '@/components/icons/Lean5SIcons';
import KitchenPrompt from '@/components/KitchenPrompt';

export const metadata: Metadata = {
  title: 'How Long to Cook Everything — Verified Time & Temperature Datasheets',
  description:
    `${COOK_TIME_DATASHEETS.length} verified cook-time datasheets for oven, air fryer, Instant Pot, skillet, sheet pan, cast iron, grill, slow cooker, smoker, and boiling. Exact temps, flip marks, and internal targets.`,
  alternates: {
    canonical: absoluteUrl('/how-long'),
  },
};

export default function HowLongHubPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Cook Times', path: '/how-long' }]);

  const appliancesWithData = APPLIANCES.filter(
    (app) => COOK_TIME_DATASHEETS.some((d) => d.appliance === app.slug)
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'How Long to Cook Everything — Verified Datasheets',
    description: `${COOK_TIME_DATASHEETS.length} verified cook-time and temperature datasheets across ${appliancesWithData.length} appliances.`,
    url: absoluteUrl('/how-long'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: COOK_TIME_DATASHEETS.length,
      itemListElement: COOK_TIME_DATASHEETS.map((sheet, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `How Long to Cook ${sheet.food} in the ${sheet.appliance.replace('-', ' ')}`,
        url: absoluteUrl(`/how-long/${sheet.appliance}/${sheet.foodSlug}`),
      })),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <span className="font-mono text-xs text-accent font-bold uppercase">
          INDEX // {COOK_TIME_DATASHEETS.length} VERIFIED DATASHEETS
        </span>
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PARAMETRIC COOK-TIME DATABASE</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          How Long to Cook Everything
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans leading-relaxed">
          {COOK_TIME_DATASHEETS.length} verified time & temperature datasheets across {appliancesWithData.length} appliances.
          Exact temps, flip marks, internal targets. Tested on real hardware, zero guesswork.
        </p>
      </section>

      {/* Appliance Sections */}
      <KitchenPrompt />

      {/* data-appliance-list turns this into the flex container the kitchen
          personalisation rules order. Every appliance still renders — the CSS
          only moves owned equipment to the top (HR-6). */}
      <div className="space-y-8" data-appliance-list>
        <div
          data-appliance-divider
          className="micro-label text-ink-subtle hairline-t pt-4"
        >
          EVERYTHING ELSE
        </div>
        {appliancesWithData.map((app) => {
          const datasheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === app.slug);
          return (
            <section
              key={app.slug}
              data-appliance={app.slug}
              className="bg-paper-card hairline-border p-6 space-y-4"
            >
              <div className="flex justify-between items-center hairline-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-paper hairline-border">
                    <LeanIcon name={app.slug} size={28} className="text-ink" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
                      {app.name}
                    </h2>
                    <p className="text-[11px] text-ink-muted font-mono">
                      {datasheets.length} DATASHEETS // {app.tempRange}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/charts/${app.slug}`}
                  className="font-mono text-xs text-ink hover:underline uppercase hidden sm:block"
                >
                  Full Chart →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                {datasheets.map((item) => (
                  <Link
                    key={item.id}
                    href={`/how-long/${item.appliance}/${item.foodSlug}`}
                    className="bg-paper p-3.5 hairline-border space-y-2 hover:border-ink transition-colors block group"
                  >
                    <div className="font-bold text-ink text-sm font-sans group-hover:text-accent transition-colors">
                      {item.food}
                    </div>
                    <div className="text-[11px] text-ink-muted font-mono">
                      {item.cutOrPrep}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-ink-muted text-xs pt-1 border-t border-hairline/60">
                      <div className="flex items-center gap-1">
                        <LeanHeatWavesIcon size={16} className="text-accent shrink-0" />
                        <span><strong className="text-ink">{item.tempFormatted}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LeanClockIcon size={16} className="text-ink-muted shrink-0" />
                        <span><strong className="text-ink">{item.timeFormatted}</strong></span>
                      </div>
                    </div>
                    <div className="text-[11px] text-accent font-bold pt-1 border-t border-hairline/40 flex items-center gap-1.5">
                      <LeanFlipIcon size={14} className="shrink-0" />
                      <span>{item.flipAtMinutes > 0 ? `Flip at ${item.flipAtMinutes}m` : 'No Flip'}</span>
                      <span className="ml-auto text-ink-muted">→ {item.internalTempTargetFormatted ?? '—'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Cross-links */}
      <section className="bg-paper-card hairline-border p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-tight text-ink font-mono">
          Related References
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <Link
            href="/cheat-sheet"
            className="p-4 bg-paper hairline-border hover:border-ink transition-colors flex items-center justify-between group"
          >
            <span className="font-bold text-ink group-hover:text-accent transition-colors">Printable Cheatsheet</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent" />
          </Link>
          <Link
            href="/internal-temp"
            className="p-4 bg-paper hairline-border hover:border-ink transition-colors flex items-center justify-between group"
          >
            <span className="font-bold text-ink group-hover:text-accent transition-colors">Internal Temp Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent" />
          </Link>
          <Link
            href="/reheat"
            className="p-4 bg-paper hairline-border hover:border-ink transition-colors flex items-center justify-between group"
          >
            <span className="font-bold text-ink group-hover:text-accent transition-colors">Reheat Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent" />
          </Link>
        </div>
      </section>
    </div>
  );
}
