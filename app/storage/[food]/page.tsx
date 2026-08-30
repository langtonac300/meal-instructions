import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, AlertTriangle, Snowflake, Thermometer, CheckCircle2 } from 'lucide-react';
import { FOOD_STORAGE_DATASHEETS } from '@/data/food-storage';
import type { StorageLocation } from '@/lib/types';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

const LOCATION_LABELS: Record<StorageLocation, string> = {
  fridge: 'Refrigerator',
  freezer: 'Freezer',
  counter: 'Counter / Room Temp',
  pantry: 'Pantry',
};

const LOCATION_ICONS: Record<StorageLocation, React.ReactNode> = {
  fridge: <Thermometer className="w-5 h-5 text-blue-600" />,
  freezer: <Snowflake className="w-5 h-5 text-cyan-600" />,
  counter: <Thermometer className="w-5 h-5 text-amber-600" />,
  pantry: <Thermometer className="w-5 h-5 text-orange-600" />,
};

interface StoragePageProps {
  params: Promise<{ food: string }>;
}

export async function generateStaticParams() {
  return FOOD_STORAGE_DATASHEETS.map((item) => ({
    food: item.slug,
  }));
}

export async function generateMetadata({ params }: StoragePageProps): Promise<Metadata> {
  const { food } = await params;
  const sheet = FOOD_STORAGE_DATASHEETS.find((d) => d.slug === food);

  if (!sheet) {
    return { title: 'Storage Guide Not Found' };
  }

  const fridgeTime = sheet.storageTimeframes.find((t) => t.location === 'fridge');
  const title = `How Long Does ${sheet.food} Last? (${fridgeTime?.formatted ?? 'Storage Guide'})`;
  const description = sheet.metaDescription;
  const url = absoluteUrl(`/storage/${sheet.slug}`);

  return {
    title,
    description,
    keywords: sheet.keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function StoragePage({ params }: StoragePageProps) {
  const { food } = await params;
  const sheet = FOOD_STORAGE_DATASHEETS.find((d) => d.slug === food);

  if (!sheet) {
    notFound();
  }

  const pageUrl = absoluteUrl(`/storage/${sheet.slug}`);
  const fridgeTime = sheet.storageTimeframes.find((t) => t.location === 'fridge');

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Food Storage', path: '/storage' },
    { name: sheet.food, path: `/storage/${sheet.slug}` },
  ]);

  const faqSchema = sheet.keywords.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How long does ${sheet.food.toLowerCase()} last in the fridge?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${sheet.food} lasts ${fridgeTime?.formatted ?? 'varies'} in the refrigerator at ${fridgeTime?.tempRange ?? '32°F–40°F'}. ${sheet.safetyNote}`,
            },
          },
          ...sheet.storageTimeframes
            .filter((t) => t.location !== 'fridge')
            .map((t) => ({
              '@type': 'Question' as const,
              name: `Can you ${t.location === 'freezer' ? 'freeze' : 'leave out'} ${sheet.food.toLowerCase()}?`,
              acceptedAnswer: {
                '@type': 'Answer' as const,
                text: `Yes. ${sheet.food} ${t.location === 'freezer' ? `can be frozen for ${t.formatted}` : `can sit at room temperature for ${t.formatted}`} at ${t.tempRange}.${t.notes ? ` ${t.notes}` : ''}`,
              },
            })),
        ],
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/storage"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Storage Guides</span>
        </Link>
        <span className="uppercase text-ink-muted">
          STORAGE // {sheet.id}
        </span>
      </div>

      {/* Main Header Card */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted uppercase">
          <span className="px-2.5 py-1 bg-paper hairline-border font-bold text-ink">
            {sheet.foodCategory}
          </span>
          <span className="px-2.5 py-1 bg-paper hairline-border">
            STATE: {sheet.state.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 hairline-border font-bold">
            USDA VERIFIED
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink font-sans uppercase">
            How Long Does {sheet.food} Last?
          </h1>
          <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
            Best stored in: {sheet.containerType}
          </p>
        </div>

        {/* Storage Timeframe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sheet.storageTimeframes.map((tf) => (
            <div
              key={tf.location}
              className="bg-paper hairline-border p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                {LOCATION_ICONS[tf.location]}
                <span className="font-mono text-xs font-bold uppercase text-ink">
                  {LOCATION_LABELS[tf.location]}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-ink font-sans tracking-tight">
                {tf.formatted}
              </div>
              <div className="text-[11px] text-ink-muted font-mono">
                {tf.tempRange}
              </div>
              {tf.notes && (
                <div className="text-xs text-ink-muted font-sans pt-1 border-t border-hairline/60">
                  {tf.notes}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Best Storage Method */}
        <div className="bg-paper p-4 hairline-border space-y-2">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-ink">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Best Storage Method</span>
          </div>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            {sheet.bestMethod}
          </p>
          <div className="text-xs text-ink-muted font-mono">
            Container: <strong className="text-ink">{sheet.containerType}</strong>
          </div>
        </div>

        {/* Spoilage Signs */}
        <div className="bg-paper p-4 hairline-border space-y-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-ink">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Signs It&apos;s Gone Bad</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sheet.spoilageSigns.map((sign, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-muted font-sans">
                <span className="text-amber-600 font-bold mt-0.5">×</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Note */}
        <div className="flex items-start gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-900 font-mono text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{sheet.safetyNote}</span>
        </div>

        {/* Verification & Pro Tip */}
        <div className="bg-paper p-4 hairline-border font-mono text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold uppercase text-ink">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Source & Verification</span>
          </div>
          <p className="text-xs text-ink-muted font-sans">
            {sheet.verificationBasis}
          </p>
          <div className="pt-2 hairline-t text-[11px] text-ink-subtle">
            <strong>Pro Tip:</strong> {sheet.proTip}
          </div>
        </div>
      </section>

      {/* Related Storage Guides */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-tight text-ink font-mono">
          Related Storage Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {FOOD_STORAGE_DATASHEETS.filter(
            (d) => d.foodCategory === sheet.foodCategory && d.id !== sheet.id
          )
            .slice(0, 6)
            .map((other) => {
              const otherFridge = other.storageTimeframes.find((t) => t.location === 'fridge');
              return (
                <Link
                  key={other.id}
                  href={`/storage/${other.slug}`}
                  className="p-3 bg-paper-card hairline-border hover:border-ink transition-colors flex flex-col justify-between"
                >
                  <div className="font-bold text-ink text-xs font-sans mb-1">
                    {other.food}
                  </div>
                  <div className="flex justify-between text-[11px] text-ink-muted hairline-t pt-2 mt-2">
                    <span>Fridge: {otherFridge?.formatted ?? '—'}</span>
                    <span className="uppercase">{other.state}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
