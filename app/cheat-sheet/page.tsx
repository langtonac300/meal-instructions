import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import { LeanIcon, LeanHeatWavesIcon, LeanClockIcon, LeanFlipIcon } from '@/components/icons/Lean5SIcons';

export const metadata: Metadata = {
  title: 'Air Fryer & Dad Cooking Cheat Sheet (Printable)',
  description: 'The ultimate zero-fluff cooking temperature, timing, and basket-shake cheat sheet for air fryers, sheet pans, skillets, and grills.',
  alternates: {
    canonical: absoluteUrl('/cheat-sheet'),
  },
};

export default function CheatSheetPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <PrintButton
          label="PRINT CHEATSHEET"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">PRINTABLE REFERENCE MATRIX</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Zero-Fluff Cooking Cheatsheet
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Hang this on the fridge. Exact times, temps, and flip marks so you never have to Google &ldquo;how long do chicken tenders take in the air fryer&rdquo; again.
        </p>
      </section>

      {/* Appliance Sections */}
      <div className="space-y-8">
        {APPLIANCES.map((app) => {
          const datasheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === app.slug);
          return (
            <section key={app.slug} className="bg-paper-card hairline-border p-6 space-y-4">
              <div className="flex justify-between items-center hairline-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-paper hairline-border">
                    <LeanIcon name={app.slug} size={28} className="text-ink" />
                  </div>
                  <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
                    {app.name}
                  </h2>
                </div>
                <Link
                  href={`/charts/${app.slug}`}
                  className="font-mono text-xs text-ink hover:underline uppercase"
                >
                  View Full Chart ({datasheets.length}) →
                </Link>
              </div>

              {datasheets.length > 0 ? (
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
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-ink-muted font-mono">
                  Standard operating range: {app.tempRange}
                </p>
              )}
            </section>
          );
        })}
      </div>

    </div>
  );
}
