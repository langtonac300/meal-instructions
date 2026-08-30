import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

// Field guides pre-render to static HTML for SEO/LLM crawlers, matching the
// recipe and datasheet pages. See app/recipes/[slug]/page.tsx for the full
// note on why `generateStaticParams` alone is insufficient in Next.js 15.
export const dynamic = 'force-static';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, CheckCircle2, ArrowRight, Share2, Wrench } from 'lucide-react';
import { TOP_10_GUIDES } from '@/data/top-10-lists';
import { RECIPES } from '@/data/recipes';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TOP_10_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = TOP_10_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  const url = absoluteUrl(`/guides/${guide.slug}`);

  return {
    title: `${guide.title} | Meal Instructions`,
    description: guide.summary,
    keywords: guide.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${guide.title} — No Fluff, Just the Instructions`,
      description: guide.summary,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.summary,
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guideIndex = TOP_10_GUIDES.findIndex((g) => g.slug === slug);

  if (guideIndex === -1) {
    notFound();
  }

  const guide = TOP_10_GUIDES[guideIndex];
  const prevGuide = guideIndex > 0 ? TOP_10_GUIDES[guideIndex - 1] : null;
  const nextGuide = guideIndex < TOP_10_GUIDES.length - 1 ? TOP_10_GUIDES[guideIndex + 1] : null;

  const relatedRecipes = (guide.relatedRecipeSlugs || [])
    .map((rSlug) => RECIPES.find((r) => r.slug === rSlug))
    .filter(Boolean);

  // Schema.org JSON-LD (ItemList + Article + BreadcrumbList)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.summary,
        datePublished: '2026-08-29',
        dateModified: guide.lastUpdated,
        author: {
          '@type': 'Organization',
          name: 'Meal Instructions',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Meal Instructions',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': absoluteUrl(`/guides/${guide.slug}`),
        },
      },
      {
        '@type': 'ItemList',
        name: guide.title,
        description: guide.summary,
        itemListElement: guide.items.map((item) => ({
          '@type': 'ListItem',
          position: item.position,
          name: item.headline,
          description: item.body,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Guides',
            item: absoluteUrl('/guides'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: guide.shortTitle,
            item: absoluteUrl(`/guides/${guide.slug}`),
          },
        ],
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 font-sans">
      
      {/* Breadcrumb & Print Actions */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All 20 Guides</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-accent font-bold uppercase">
            REF-{String(guideIndex + 1).padStart(2, '0')} // {guide.categoryName.toUpperCase()}
          </span>
          <PrintButton
            label="PRINT GUIDE"
            className="hidden sm:inline-block px-2.5 py-1 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
          />
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-paper-card hairline-border p-6 sm:p-10 space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted">
          <span className="px-2 py-0.5 bg-paper hairline-border text-accent font-bold uppercase">
            {guide.categoryName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-ink-subtle" />
            <span>{guide.readMinutes} MIN READ</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-ink-subtle" />
            <span>UPDATED {guide.lastUpdated}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink uppercase font-sans leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
          {guide.summary}
        </p>
      </header>

      {/* 10 Operational Points */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-ink-muted uppercase tracking-wider hairline-b pb-2">
          <span>THE 10 NON-NEGOTIABLE RULES</span>
          <span>SPECIMEN // 01–10</span>
        </div>

        <div className="space-y-4">
          {guide.items.map((item) => (
            <div
              key={item.position}
              className="bg-paper-card hairline-border p-5 sm:p-6 space-y-3 transition-colors hover:border-ink"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-ink text-paper font-mono text-xs font-bold flex items-center justify-center">
                    {String(item.position).padStart(2, '0')}
                  </span>
                  <span className="micro-label text-accent font-mono">
                    {item.tag}
                  </span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-ink font-sans tracking-tight">
                {item.headline}
              </h2>

              <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Tool Companion CTA */}
      {guide.relatedTool && (
        <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="micro-label text-accent font-mono">
              INTERACTIVE TOOL COMPANION // {guide.relatedTool.badge}
            </span>
            <Wrench className="w-4 h-4 text-ink-muted" />
          </div>
          <h3 className="text-lg font-bold text-ink uppercase tracking-tight">
            Put This Rule Into Practice
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            Use our zero-fluff interactive calculation engine to calculate exact weights, temperatures, or timelines.
          </p>
          <div className="pt-2">
            <Link
              href={guide.relatedTool.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-paper text-xs font-mono font-bold uppercase hover:bg-accent transition-colors"
            >
              <span>Launch {guide.relatedTool.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* Related Tested Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-ink-muted uppercase tracking-wider hairline-b pb-2">
            <span>RELATED TESTED RECIPES</span>
            <span>ZERO-FLUFF CATALOG</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {relatedRecipes.map((r) => r && (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="bg-paper-card hairline-border p-4 space-y-2 hover:border-ink transition-colors block group"
              >
                <div className="font-bold text-ink text-sm font-sans group-hover:text-accent transition-colors">
                  {r.title}
                </div>
                <p className="text-ink-muted text-xs font-sans line-clamp-2">
                  {r.tagline}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-ink-subtle uppercase border-t border-hairline/60">
                  <span>{r.cookTemp}</span>
                  <span className="font-bold text-ink group-hover:underline">
                    View Recipe ({r.totalMinutes}m) →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Next & Previous Guides Navigation */}
      <footer className="hairline-t pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs no-print">
        {prevGuide ? (
          <Link
            href={`/guides/${prevGuide.slug}`}
            className="p-4 bg-paper-card hairline-border hover:border-ink transition-colors space-y-1 block"
          >
            <span className="text-ink-subtle uppercase text-[10px]">← Previous Guide</span>
            <div className="font-bold text-ink truncate font-sans text-sm">{prevGuide.title}</div>
          </Link>
        ) : <div />}

        {nextGuide && (
          <Link
            href={`/guides/${nextGuide.slug}`}
            className="p-4 bg-paper-card hairline-border hover:border-ink transition-colors space-y-1 block text-right"
          >
            <span className="text-ink-subtle uppercase text-[10px]">Next Guide →</span>
            <div className="font-bold text-ink truncate font-sans text-sm">{nextGuide.title}</div>
          </Link>
        )}
      </footer>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

    </article>
  );
}
