import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { LeanIcon, LeanHeatWavesIcon, LeanClockIcon, LeanFlipIcon, LeanProbeIcon } from '@/components/icons/Lean5SIcons';

interface ChartPageProps {
  params: Promise<{ appliance: string }>;
}

export async function generateStaticParams() {
  return APPLIANCES.map((app) => ({
    appliance: app.slug,
  }));
}

export async function generateMetadata({ params }: ChartPageProps): Promise<Metadata> {
  const { appliance } = await params;
  const appMeta = APPLIANCES.find((a) => a.slug === appliance);

  if (!appMeta) {
    return { title: 'Cooking Chart Not Found' };
  }

  const title = `${appMeta.name} Cooking Times & Temperatures Chart (Verified Datasheets)`;
  const description = `Complete verified technical cook time, temperature, and basket flip chart for ${appMeta.name}. Includes chicken, beef, pork, salmon, and frozen foods.`;

  const url = absoluteUrl(`/charts/${appMeta.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ChartPage({ params }: ChartPageProps) {
  const { appliance } = await params;
  const appMeta = APPLIANCES.find((a) => a.slug === appliance);

  if (!appMeta) {
    notFound();
  }

  const datasheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === appliance);
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Charts', path: '/cheat-sheet' },
    { name: `${appMeta.name} Chart`, path: `/charts/${appMeta.slug}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
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
          <span>Home</span>
        </Link>
        <span className="uppercase text-ink-muted">
          TECHNICAL CHART // {appMeta.slug}
        </span>
      </div>

      {/* Hero */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-paper hairline-border">
            <LeanIcon name={appMeta.slug} size={28} className="text-accent" />
          </div>
          <div>
            <div className="micro-label text-accent">VERIFIED TIME & TEMP MATRIX</div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink uppercase font-sans">
              {appMeta.name} Cooking Chart
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          Parametric reference guide for cooking meats, seafood, vegetables, and frozen foods in the {appMeta.name}.
        </p>
      </section>

      {/* Datasheet Table */}
      <section className="bg-paper-card hairline-border overflow-x-auto shadow-subtle">
        <table className="w-full text-left font-mono text-xs divide-y divide-hairline">
          <thead className="bg-paper uppercase text-[10px] tracking-wider text-ink-subtle">
            <tr>
              <th className="py-3.5 px-4 w-16">ID</th>
              <th className="py-3.5 px-4">Food & Cut Specification</th>
              <th className="py-3.5 px-4 w-28">State</th>
              <th className="py-3.5 px-4 w-36">
                <div className="flex items-center gap-1.5">
                  <LeanHeatWavesIcon size={14} className="text-accent" />
                  <span>Temp</span>
                </div>
              </th>
              <th className="py-3.5 px-4 w-32">
                <div className="flex items-center gap-1.5">
                  <LeanClockIcon size={14} className="text-ink-subtle" />
                  <span>Time</span>
                </div>
              </th>
              <th className="py-3.5 px-4 w-28">
                <div className="flex items-center gap-1.5">
                  <LeanFlipIcon size={14} className="text-ink-subtle" />
                  <span>Flip Mark</span>
                </div>
              </th>
              <th className="py-3.5 px-4 w-36 hidden sm:table-cell">
                <div className="flex items-center gap-1.5">
                  <LeanProbeIcon size={14} className="text-emerald-800" />
                  <span>Internal Temp</span>
                </div>
              </th>
              <th className="py-3.5 px-4 w-24 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {datasheets.map((sheet) => (
              <tr
                key={sheet.id}
                className="hover:bg-paper-subtle/50 transition-colors group cursor-pointer"
              >
                <td className="py-3.5 px-4 font-bold text-ink-subtle">
                  {sheet.id}
                </td>
                <td className="py-3.5 px-4">
                  <Link
                    href={`/how-long/${sheet.appliance}/${sheet.foodSlug}`}
                    className="block group-hover:text-accent transition-colors"
                  >
                    <div className="font-bold text-sm text-ink font-sans">
                      {sheet.food}
                    </div>
                    <div className="text-xs text-ink-muted font-sans line-clamp-1 mt-0.5">
                      {sheet.cutOrPrep}
                    </div>
                  </Link>
                </td>
                <td className="py-3.5 px-4 uppercase text-[11px] text-ink-muted">
                  <span className={`px-2 py-0.5 hairline-border inline-block ${
                    sheet.state === 'frozen' ? 'bg-sky-100 text-sky-950' : 'bg-paper text-ink'
                  }`}>
                    {sheet.state}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-accent">
                  {sheet.tempFormatted}
                </td>
                <td className="py-3.5 px-4 font-bold text-ink">
                  {sheet.timeFormatted}
                </td>
                <td className="py-3.5 px-4 text-ink-muted">
                  {sheet.flipAtMinutes > 0 ? `${sheet.flipAtMinutes}m` : 'No Flip'}
                </td>
                <td className="py-3.5 px-4 hidden sm:table-cell text-emerald-800 font-bold">
                  {sheet.internalTempTargetFormatted}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/how-long/${sheet.appliance}/${sheet.foodSlug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper hairline-border group-hover:bg-ink group-hover:text-paper uppercase transition-colors"
                  >
                    <span>SHEET</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}
