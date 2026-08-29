import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { getRecipesByAppliance } from '@/data/recipes';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { absoluteUrl } from '@/lib/site';
import { LeanIcon, LeanHeatWavesIcon, LeanClockIcon, LeanFlipIcon } from '@/components/icons/Lean5SIcons';

interface AppliancePageProps {
  params: Promise<{ appliance: string }>;
}

export async function generateStaticParams() {
  return APPLIANCES.map((app) => ({
    appliance: app.slug,
  }));
}

export async function generateMetadata({ params }: AppliancePageProps): Promise<Metadata> {
  const { appliance } = await params;
  const appMeta = APPLIANCES.find((a) => a.slug === appliance);

  if (!appMeta) {
    return { title: 'Appliance Guide Not Found | Meal Instructions' };
  }

  const recipes = getRecipesByAppliance(appliance);
  const title = `${appMeta.name} Recipes & Cook Time Guide (${recipes.length} Meals)`;
  const description = `${appMeta.shortDescription} Full time, temperature, and shake guide plus ${recipes.length} battle-tested recipes.`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/appliances/${appliance}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/appliances/${appliance}`),
    },
  };
}

export default async function AppliancePage({ params }: AppliancePageProps) {
  const { appliance } = await params;
  const appMeta = APPLIANCES.find((a) => a.slug === appliance);

  if (!appMeta) {
    notFound();
  }

  const recipes = getRecipesByAppliance(appliance);
  const datasheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === appliance);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Recipes</span>
        </Link>
        <span className="uppercase text-ink-muted">
          APPLIANCE MASTER // {appMeta.slug}
        </span>
      </div>

      {/* Appliance Hero */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-paper hairline-border">
            <LeanIcon name={appMeta.slug} size={28} className="text-accent" />
          </div>
          <div>
            <div className="micro-label text-accent">APPLIANCE SPECIFICATION</div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink uppercase font-sans">
              {appMeta.name}
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans leading-relaxed">
          {appMeta.shortDescription}
        </p>
        <div className="hairline-t pt-4 font-mono text-xs text-ink-muted flex items-center gap-4">
          <span>TEMP RANGE: <strong className="text-ink">{appMeta.tempRange}</strong></span>
          <span>•</span>
          <Link href={`/charts/${appMeta.slug}`} className="text-accent underline font-bold">
            VIEW FULL {appMeta.name.toUpperCase()} CHART →
          </Link>
        </div>
      </section>

      {/* Verified Datasheets */}
      {datasheets.length > 0 && (
        <section className="bg-paper-card hairline-border p-6 space-y-4">
          <div className="flex justify-between items-center hairline-b pb-3">
            <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
              Verified {appMeta.name} Cook Time Datasheets
            </h2>
            <Link href={`/charts/${appMeta.slug}`} className="font-mono text-xs text-ink hover:underline uppercase">
              View Chart Matrix →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {datasheets.slice(0, 6).map((sheet) => (
              <Link
                key={sheet.id}
                href={`/how-long/${sheet.appliance}/${sheet.foodSlug}`}
                className="bg-paper p-4 hairline-border hover:border-ink transition-colors space-y-2 block group"
              >
                <div className="font-bold text-ink text-sm font-sans group-hover:text-accent transition-colors">{sheet.food}</div>
                <div className="grid grid-cols-2 gap-2 text-ink-muted text-xs pt-1 border-t border-hairline/60">
                  <div className="flex items-center gap-1">
                    <LeanHeatWavesIcon size={14} className="text-accent shrink-0" />
                    <span><strong className="text-ink">{sheet.tempFormatted}</strong></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LeanClockIcon size={14} className="text-ink-subtle shrink-0" />
                    <span><strong className="text-ink">{sheet.timeFormatted}</strong></span>
                  </div>
                </div>
                <div className="text-[11px] text-accent font-bold pt-1 border-t border-hairline/40 flex items-center gap-1.5">
                  <LeanFlipIcon size={12} className="shrink-0" />
                  <span>{sheet.flipAtMinutes > 0 ? `Flip at ${sheet.flipAtMinutes}m` : 'No Flip'}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Appliance Recipes List */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
          {recipes.length} {appMeta.name} Recipes
        </h2>
        <div className="bg-paper-card hairline-border overflow-x-auto">
          <table className="w-full text-left font-mono text-xs divide-y divide-hairline">
            <thead className="bg-paper uppercase text-[10px] tracking-wider text-ink-subtle">
              <tr>
                <th className="py-3 px-4 w-16">ID</th>
                <th className="py-3 px-4">Recipe Title</th>
                <th className="py-3 px-4 w-28 hidden sm:table-cell">Total Time</th>
                <th className="py-3 px-4 w-28 hidden lg:table-cell">Protein</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {recipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  className="hover:bg-paper-subtle/50 transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-bold text-ink-subtle">
                    #{recipe.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="block group-hover:text-accent transition-colors font-bold text-sm text-ink font-sans"
                    >
                      {recipe.title}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell font-bold text-ink">
                    {recipe.totalMinutes} MINS
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell uppercase text-ink-muted">
                    {recipe.protein}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper hairline-border group-hover:bg-ink group-hover:text-paper uppercase transition-colors"
                    >
                      <span>COOK</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
