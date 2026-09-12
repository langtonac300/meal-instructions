import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Thermometer, AlertTriangle, HelpCircle, CheckCircle2, Wrench } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import { getRecipesByAppliance } from '@/data/recipes';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { getApplianceGuide } from '@/data/appliance-guides';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { LeanIcon, LeanHeatWavesIcon, LeanClockIcon, LeanFlipIcon } from '@/components/icons/Lean5SIcons';
import { Appliance } from '@/lib/types';

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
  const title = `${appMeta.name} Cook Times, Physics & Recipe Guide (${recipes.length} Meals)`;
  const description = `${appMeta.shortDescription} Thermal physics, preheat protocols, 5 failure mode fixes, and ${recipes.length} tested recipes.`;

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
  const guide = getApplianceGuide(appliance as Appliance);

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Appliances', path: '/appliances' },
    { name: appMeta.name, path: `/appliances/${appliance}` },
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${appMeta.name} Guide & Recipes`,
    description: `Complete technical cook times, temperatures, and ${recipes.length} verified recipes for ${appMeta.name}.`,
    url: absoluteUrl(`/appliances/${appliance}`),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: recipes.length,
      itemListElement: recipes.map((recipe, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: recipe.title,
        url: absoluteUrl(`/recipes/${recipe.slug}`),
      })),
    },
  };

  const faqSchema = guide && guide.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12 text-ink font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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
          href="/appliances"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Appliances</span>
        </Link>
        <span className="uppercase text-ink-muted">
          HARDWARE MASTER // {appMeta.slug}
        </span>
      </div>

      {/* Appliance Hero */}
      <section className="bg-paper-card border border-hairline p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-paper border border-hairline">
            <LeanIcon name={appMeta.slug} size={32} className="text-accent" />
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
              HARDWARE SPECIFICATION // {appMeta.slug}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink uppercase font-sans">
              {appMeta.name}
            </h1>
          </div>
        </div>
        <p className="text-base sm:text-lg text-ink-muted max-w-3xl leading-relaxed">
          {guide?.tagline ?? appMeta.shortDescription}
        </p>
        <div className="border-t border-hairline pt-4 font-mono text-xs text-ink-muted flex flex-wrap items-center gap-4">
          <span>OPERATING TEMP RANGE: <strong className="text-ink">{appMeta.tempRange}</strong></span>
          <span>•</span>
          <Link href={`/charts/${appMeta.slug}`} className="text-accent underline font-bold">
            VIEW FULL {appMeta.name.toUpperCase()} CHART MATRIX →
          </Link>
        </div>
      </section>

      {/* Comprehensive Thermal Physics & Preheating Guide */}
      {guide && (
        <section className="bg-paper-card border border-hairline p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
            <Thermometer className="w-4 h-4" />
            <span>Thermal Dynamics &amp; Mechanics</span>
          </div>
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-extrabold uppercase text-ink">
              How the {appMeta.name} Transfers Heat
            </h2>
            <p className="mt-3 text-[15px] text-ink-muted leading-[1.6]">
              {guide.thermalPhysics}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-hairline pt-6">
            <div className="p-4 bg-paper border border-hairline space-y-2 font-mono text-xs">
              <span className="block font-bold text-ink uppercase text-[12px] font-sans">Preheat &amp; Chamber Staging Protocol</span>
              <p className="text-ink-muted font-sans text-xs leading-relaxed">{guide.preheatProtocol}</p>
            </div>
            <div className="p-4 bg-paper border border-hairline space-y-2 font-mono text-xs">
              <span className="block font-bold text-ink uppercase text-[12px] font-sans">Care, Cleaning &amp; Surface Maintenance</span>
              <p className="text-ink-muted font-sans text-xs leading-relaxed">{guide.careAndCleaning}</p>
            </div>
          </div>
        </section>
      )}

      {/* Verified Datasheets Grid */}
      {datasheets.length > 0 && (
        <section className="bg-paper-card border border-hairline p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap justify-between items-baseline border-b border-hairline pb-3">
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-bold uppercase tracking-tight text-ink">
                Verified {appMeta.name} Cook Time Datasheets
              </h2>
              <span className="text-[13px] text-ink-muted font-sans">
                Tested time, temperature, and flip marks on real hardware.
              </span>
            </div>
            <Link href={`/charts/${appMeta.slug}`} className="font-mono text-xs text-accent font-bold hover:underline uppercase">
              View All {datasheets.length} Datasheets →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {datasheets.slice(0, 6).map((sheet) => (
              <Link
                key={sheet.id}
                href={`/how-long/${sheet.appliance}/${sheet.foodSlug}`}
                className="bg-paper p-4 border border-hairline hover:border-ink transition-colors space-y-2 block group"
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
        <div className="flex flex-wrap items-baseline justify-between border-b border-ink pb-3">
          <h2 className="text-[22px] sm:text-[26px] font-black uppercase tracking-tight text-ink">
            {recipes.length} Verified {appMeta.name} Recipes
          </h2>
          <span className="font-mono text-xs text-ink-muted">Sorted by ID</span>
        </div>
        <div className="bg-paper-card border border-hairline overflow-x-auto">
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
                  className="hover:bg-paper-50 transition-colors group cursor-pointer"
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
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-hairline group-hover:bg-ink group-hover:text-paper uppercase transition-colors"
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

      {/* 5 Critical Failure Modes */}
      {guide && guide.fiveMistakes.length > 0 && (
        <section className="bg-paper-card border border-hairline p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
            <AlertTriangle className="w-4 h-4" />
            <span>Failure Mode Avoidance</span>
          </div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold uppercase text-ink">
            5 Critical Mistakes to Avoid with the {appMeta.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {guide.fiveMistakes.map((fm, idx) => (
              <div key={idx} className="p-4 bg-paper border border-hairline space-y-2">
                <span className="font-mono text-[10px] text-accent uppercase font-bold block">
                  Failure Mode #{idx + 1}
                </span>
                <strong className="block text-ink text-[14px] font-bold leading-snug">
                  {fm.mistake}
                </strong>
                <p className="text-[12px] text-ink-muted leading-relaxed">
                  <span className="font-bold text-ink">Physics:</span> {fm.physicsWhy}
                </p>
                <div className="text-[12px] text-emerald-900 bg-emerald-50 border border-emerald-200 p-2 font-mono">
                  <strong>The Fix:</strong> {fm.fix}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Appliance Engineering FAQs */}
      {guide && guide.faqs.length > 0 && (
        <section className="border-t border-ink pt-10 space-y-6">
          <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
            Frequently Asked Questions About the {appMeta.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guide.faqs.map((faq, i) => (
              <div key={i} className="border-b border-hairline pb-5">
                <h3 className="font-bold text-[17px] text-ink mb-2">
                  {faq.q}
                </h3>
                <p className="text-[15px] leading-[1.6] text-ink-muted">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
