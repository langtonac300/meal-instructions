import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Printer, ShieldCheck, AlertTriangle, HelpCircle, CheckCircle2, Zap } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getRecipesByCategory } from '@/data/recipes';
import { getCategoryGuide } from '@/data/category-guides';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { PACK_MAX, packHref } from '@/lib/print-pack-format';
import { Category } from '@/lib/types';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catMeta = CATEGORIES.find((c) => c.slug === category);

  if (!catMeta) {
    return { title: 'Category Not Found | Meal Instructions' };
  }

  const count = getRecipesByCategory(category).length;
  const title = `${catMeta.name} (${count} No-Fluff Recipes & Guide)`;
  const description = `${catMeta.fullDescription} Complete weeknight logistics, golden rules, common mistakes, and ${count} verified recipes.`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/categories/${category}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/categories/${category}`),
    },
  };
}

/** 'air-fryer' → 'Air fryer' */
const applianceLabel = (slug: string) => {
  const words = slug.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle';

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const catMeta = CATEGORIES.find((c) => c.slug === category);

  if (!catMeta) {
    notFound();
  }

  const recipes = getRecipesByCategory(category);
  const guide = getCategoryGuide(category as Category);

  // Every number is derived from the recipes in this category (HR-2).
  const minutes = recipes.map((r) => r.totalMinutes);
  const averageMinutes = minutes.length
    ? Math.round(minutes.reduce((a, b) => a + b, 0) / minutes.length)
    : null;
  const fastestMinutes = minutes.length ? Math.min(...minutes) : null;

  // The printable pack caps at PACK_MAX; past that, the first PACK_MAX in
  // index order go in and the copy says so (packFromParam truncates silently).
  const packSlugs = recipes.slice(0, PACK_MAX).map((r) => r.slug);
  const packIsCapped = recipes.length > PACK_MAX;

  const specCells = [
    { label: 'Recipes', value: `${recipes.length}` },
    ...(averageMinutes !== null ? [{ label: 'Average time', value: `${averageMinutes} min` }] : []),
    ...(fastestMinutes !== null ? [{ label: 'Fastest', value: `${fastestMinutes} min` }] : []),
  ];

  // Collection JSON-LD Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: catMeta.name,
    description: catMeta.fullDescription,
    numberOfItems: recipes.length,
    itemListElement: recipes.map((recipe, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: recipe.title,
      url: absoluteUrl(`/recipes/${recipe.slug}`),
    })),
  };

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Categories', path: '/categories' },
    { name: catMeta.name, path: `/categories/${category}` },
  ]);

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
    <div className="max-w-[1000px] mx-auto px-5 sm:px-10 pb-16 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
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
      <div className="pt-6 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
        <Link href="/categories" className="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>All categories</span>
        </Link>
      </div>

      {/* Header */}
      <header className="pt-7">
        <div className={EYEBROW}>CATEGORY PROTOCOL // {catMeta.heroTag}</div>
        <h1 className="mt-1 font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
          {catMeta.name}
        </h1>
        <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[65ch]">
          {catMeta.fullDescription}
        </p>
      </header>

      {/* Spec row — derived at render time, never a literal */}
      <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 border-t border-b border-ink">
        {specCells.map((cell, i) => (
          <div
            key={cell.label}
            className={`py-5 sm:px-5 first:pl-0 last:pr-0 border-hairline ${
              i < specCells.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''
            }`}
          >
            <dt className={EYEBROW}>{cell.label}</dt>
            <dd className="mt-2 font-mono text-[28px] sm:text-[36px] font-black tracking-[-0.02em] leading-none">
              {cell.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Comprehensive Category Editorial Guide */}
      {guide && (
        <section className="mt-12 bg-paper-card border border-hairline p-6 sm:p-8 font-sans space-y-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Operational Blueprint</span>
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.01em] uppercase text-ink">
              {guide.title}
            </h2>
            <p className="mt-3 text-[16px] text-ink-muted leading-[1.6]">
              {guide.overview}
            </p>
          </div>

          {/* Logistics Protocol */}
          <div className="border-t border-hairline pt-6">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] font-bold text-ink mb-4">
              Weeknight Execution Protocol
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {guide.logisticsProtocol.map((item, idx) => (
                <li key={idx} className="p-3 bg-paper border border-hairline flex items-start gap-2.5">
                  <span className="w-4 h-4 bg-ink text-paper rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-ink leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 Golden Rules */}
          <div className="border-t border-hairline pt-6">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] font-bold text-ink mb-4">
              The 4 Golden Rules of {catMeta.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {guide.goldenRules.map((rule, idx) => (
                <div key={idx} className="p-4 bg-paper border border-hairline space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-[15px] uppercase text-ink">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{rule.title}</span>
                  </div>
                  <p className="text-[14px] text-ink-muted leading-[1.5]">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Gear & Staples */}
          <div className="border-t border-hairline pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
            <div>
              <span className="block font-bold text-ink uppercase mb-2">Essential Hardware</span>
              <ul className="space-y-1 text-ink-muted">
                {guide.essentialGear.map((g, i) => (
                  <li key={i}>• {g}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="block font-bold text-ink uppercase mb-2">Pantry Anchor Staples</span>
              <ul className="space-y-1 text-ink-muted">
                {guide.pantryStaples.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Recipe list */}
      <section className="mt-14" aria-labelledby="recipes-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
          <h2 id="recipes-heading" className="text-[24px] font-extrabold tracking-[-0.01em] uppercase">
            All {recipes.length} Verified {catMeta.name}
          </h2>
          <span className="text-[15px] text-ink-muted">Exact cook times and temperatures</span>
        </div>
        <ul className="border-t border-ink">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="border-b border-hairline">
              <Link
                href={`/recipes/${recipe.slug}`}
                className="flex items-baseline gap-4 sm:gap-6 py-5 -mx-3 px-3 hover:bg-paper-50 transition-colors group"
              >
                <span className="font-mono text-[15px] text-ink-subtle w-[3.5em] shrink-0">
                  {recipe.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[19px] sm:text-[22px] font-bold tracking-[-0.01em] leading-tight group-hover:text-accent transition-colors">
                    {recipe.title}
                  </span>
                  <span className="block mt-1 text-[17px] leading-[1.5] text-ink-muted">
                    {recipe.tagline}
                  </span>
                </span>
                <span className="hidden md:inline font-mono text-[15px] text-ink-muted w-[7em] text-right shrink-0">
                  {applianceLabel(recipe.appliance)}
                </span>
                <span className="font-mono text-[17px] font-bold w-[4.5em] text-right shrink-0">
                  {recipe.totalMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Failure Modes / Troubleshooting */}
      {guide && guide.failureModes.length > 0 && (
        <section className="mt-14 border border-hairline bg-paper p-6 sm:p-8 space-y-4 font-sans">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
            <AlertTriangle className="w-4 h-4" />
            <span>Failure Mode Prevention</span>
          </div>
          <h3 className="text-[20px] sm:text-[24px] font-bold uppercase text-ink">
            Top 3 Mistakes to Avoid in this Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
            {guide.failureModes.map((fm, i) => (
              <div key={i} className="p-4 bg-paper-card border border-hairline space-y-2">
                <strong className="text-red-900 block font-sans text-[13px] font-bold uppercase">
                  Mistake: {fm.mistake}
                </strong>
                <p className="text-ink-muted font-sans text-[13px] leading-relaxed">
                  <span className="font-bold text-ink">The Fix:</span> {fm.fix}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category FAQs (Schema-backed) */}
      {guide && guide.faqs.length > 0 && (
        <section className="mt-14 border-t border-ink pt-10 space-y-6">
          <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
            {catMeta.name} Questions &amp; Answers
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

      {/* Print this category */}
      {recipes.length > 0 && (
        <aside className="mt-12 border border-ink p-5 sm:p-7 flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-[22px] font-bold tracking-[-0.01em]">Print this category</h3>
            <p className="mt-1.5 text-[17px] text-ink-muted">
              {packIsCapped
                ? `The first ${PACK_MAX} of ${recipes.length} as PDF fridge cards, one recipe per page. No signup.`
                : `All ${recipes.length} as PDF fridge cards, one recipe per page. No signup.`}
            </p>
          </div>
          <Link
            href={packHref(packSlugs)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-[13px] bg-ink text-paper text-[16px] font-semibold hover:bg-accent transition-colors"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print / save as PDF
          </Link>
        </aside>
      )}
    </div>
  );
}
