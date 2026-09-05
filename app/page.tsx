import { Metadata } from 'next';
import Link from 'next/link';
import { Printer } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { RECIPES } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { ALL_TOOLS } from '@/data/tools-directory';
import { BLOG_POSTS } from '@/data/blog-posts';
import { packPageCount, topTwenty } from '@/lib/print-pack';
import { lookupIndex } from '@/lib/cook-time-lookup';
import CategoryGrid from '@/components/CategoryGrid';
import CookTimeLookup from '@/components/CookTimeLookup';

export const metadata: Metadata = {
  description: `Parametric cook-time database and ${RECIPES.length} quality-gated weeknight recipes. Exact temperatures, verified air fryer datasheets, zero blog stories. No fluff, just the instructions.`,
  alternates: {
    canonical: absoluteUrl('/'),
  },
};

const FEATURED_TOOLS = [
  { name: 'Takeout Revive Engine', description: 'Crisp again, not microwave mush', href: '/reheat' },
  { name: 'Freezer-to-Plate Matrix', description: 'Cook it straight from frozen', href: '/frozen-cook' },
  { name: 'Thermometer Pull Guide', description: 'Pull early, land on target', href: '/internal-temp' },
  { name: 'Feed The Crew Meat Math', description: 'How much raw meat to buy', href: '/meat-math' },
];

const FEATURED_GUIDES = [
  {
    title: 'Why wet steaks never brown',
    blurb: 'Water absorbs 2,260 J/g to vaporize. Stop steaming steaks at 212°F.',
    href: '/blog/maillard-reaction-steak-searing',
  },
  {
    title: 'Air fryer convection & boundary layers',
    blurb: 'How 2,000 RPM airflow strips the boundary layer to cook 20% faster.',
    href: '/blog/air-fryer-convection-airflow-physics',
  },
  {
    title: 'Equilibrium salting: Diamond vs Morton',
    blurb: 'Why a spoon of Morton salt is 70% saltier than Diamond Crystal.',
    href: '/blog/equilibrium-salting-diamond-vs-morton',
  },
  {
    title: 'USDA vs chef internal temperatures',
    blurb: 'Why chicken is safe at 155°F with dwell time vs 165°F rubber.',
    href: '/blog/safe-internal-meat-temperatures-guide',
  },
];

/** "Chicken Tenders (Fresh / Uncooked)" → "Chicken Tenders" for the six-cell strip. Display only. */
const shortFood = (food: string) => food.replace(/\s*\([^)]*\)\s*$/, '');

const CONTAINER = 'max-w-[1200px] mx-auto px-5 sm:px-10';

export default function HomePage() {
  const breadcrumbs = generateBreadcrumbSchema([]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Meal Instructions — No-Fluff Cooking Reference',
    description:
      'Parametric cook-time database and quality-gated weeknight meals with exact temperatures and zero blog stories.',
    url: absoluteUrl('/'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: RECIPES.length,
      itemListElement: RECIPES.map((recipe, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: recipe.title,
        url: absoluteUrl(`/recipes/${recipe.slug}`),
      })),
    },
  };

  const index = lookupIndex();
  const pageCount = packPageCount(topTwenty().length);
  // First six distinct air-fryer foods in datasheet order. Deduped on the
  // display name so fresh/frozen variants of one food don't take two cells.
  const airFryer = COOK_TIME_DATASHEETS.filter((d) => d.appliance === 'air-fryer')
    .filter((d, i, all) => all.findIndex((o) => shortFood(o.food) === shortFood(d.food)) === i)
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Body type is 15px on the home page (13px elsewhere): the density
          reduction is part of the redesign, scoped here rather than global. */}
      <div className="bg-paper text-ink text-[15px] leading-[1.55]">
        {/* ── Hero ── */}
        <section className={`${CONTAINER} pt-14 pb-10`}>
          <h1 className="font-sans text-[40px] sm:text-[52px] font-black tracking-[-0.02em] leading-[1.02] uppercase max-w-[640px]">
            No fluff. <span className="text-accent">Just the instructions.</span>
          </h1>
          <p className="mt-4 text-[18px] text-ink-muted max-w-[60ch]">
            Pick a category, look up a temperature, or print the pack. Everything on this site is
            one of those three things.
          </p>
        </section>

        {/* ── Three starting points ── */}
        <section className={`${CONTAINER} pb-14`} aria-label="Starting points">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* 1. Recipes by category */}
            <div className="min-h-[260px] p-7 bg-ink text-paper flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
                  Start here
                </span>
                <h2 className="text-[28px] font-extrabold tracking-[-0.01em] leading-[1.15] mt-3.5">
                  Recipes by category
                </h2>
                <p className="mt-2.5 leading-[1.6] text-paper/75">
                  15-minute, kid-approved, high-protein, from-frozen. {CATEGORIES.length === 12 ? 'Twelve' : CATEGORIES.length} ways
                  in, {RECIPES.length} meals behind them.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Link
                  href="/categories"
                  className="inline-block px-[18px] py-3 bg-paper text-ink font-bold hover:bg-accent hover:text-paper transition-colors"
                >
                  Browse categories
                </Link>
                <span className="font-mono text-[12px] text-paper/60">
                  {CATEGORIES.length} / {RECIPES.length}
                </span>
              </div>
            </div>

            {/* 2. Look up a cook time */}
            <div className="min-h-[260px] p-7 bg-paper-50 border border-hairline flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle">
                  Already cooking
                </span>
                <h2 className="text-[28px] font-extrabold tracking-[-0.01em] leading-[1.15] mt-3.5 text-ink">
                  Look up a cook time
                </h2>
                <p className="mt-2.5 leading-[1.6] text-ink-muted">
                  Temperature, total time, when to flip, and the internal target you pull at.
                </p>
              </div>
              <div className="mt-6">
                <CookTimeLookup
                  datasheets={index.datasheets}
                  recipes={index.recipes}
                  datasheetCount={COOK_TIME_DATASHEETS.length}
                />
              </div>
            </div>

            {/* 3. Print a recipe pack */}
            <div className="min-h-[260px] p-7 bg-paper-50 border border-hairline flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle">
                  For the fridge
                </span>
                <h2 className="text-[28px] font-extrabold tracking-[-0.01em] leading-[1.15] mt-3.5 text-ink">
                  Print a recipe pack
                </h2>
                <p className="mt-2.5 leading-[1.6] text-ink-muted">
                  The top 20 dinners as PDF fridge cards — one recipe per page, no signup. Or tick
                  your own from all {RECIPES.length}.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/print-pack"
                  className="inline-flex items-center gap-2 px-[18px] py-3 bg-ink text-paper font-bold hover:bg-accent transition-colors"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  Print / save as PDF
                </Link>
                <span className="font-mono text-[12px] text-ink-subtle uppercase tracking-[0.08em]">
                  {pageCount} pages · letter or A4
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Recipes by category ── */}
        <section className="bg-paper-50 border-t border-hairline">
          <div className={`${CONTAINER} py-12`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4 mb-6">
              <h2 className="text-[30px] font-extrabold tracking-[-0.01em] uppercase text-ink">
                Recipes by category
              </h2>
              <p className="text-ink-muted">Every category opens the full list of verified meals in it.</p>
            </div>
            <CategoryGrid />
          </div>
        </section>

        {/* ── Air fryer, at a glance ── */}
        {airFryer.length > 0 && (
          <section className="bg-paper border-t border-hairline">
            <div className={`${CONTAINER} py-12`}>
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h2 className="text-[24px] font-extrabold tracking-[-0.01em] uppercase text-ink">
                  Air fryer, at a glance
                </h2>
                <Link href="/cheat-sheet" className="text-ink-muted hover:text-accent transition-colors shrink-0">
                  Full cheat sheet →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                {airFryer.map((m) => (
                  <Link
                    key={m.id}
                    href={`/how-long/${m.appliance}/${m.foodSlug}`}
                    className="block bg-paper-50 border border-hairline hover:border-ink transition-colors px-3 py-4"
                  >
                    <span className="block text-[12px] text-ink-muted uppercase tracking-[0.08em] truncate">
                      {shortFood(m.food)}
                    </span>
                    <span className="block font-mono text-[26px] font-black text-ink mt-2 mb-0.5">
                      {m.tempFormatted.split(' ')[0]}
                    </span>
                    <span className="block font-mono text-[13px] text-ink-muted">
                      {m.timeFormatted} · {m.flipAtMinutes > 0 ? `flip ${m.flipAtMinutes}` : 'no flip'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Tools + Field guides ── */}
        <section className="bg-paper-50 border-t border-hairline">
          <div className={`${CONTAINER} py-12 grid grid-cols-1 md:grid-cols-2 gap-12`}>
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h2 className="text-[24px] font-extrabold tracking-[-0.01em] uppercase text-ink">Tools</h2>
                <Link href="/tools" className="text-[14px] text-ink-muted hover:text-accent transition-colors shrink-0">
                  All {ALL_TOOLS.length} →
                </Link>
              </div>
              <ul>
                {FEATURED_TOOLS.map((tool) => (
                  <li key={tool.href} className="border-t border-hairline last:border-b">
                    <Link
                      href={tool.href}
                      className="py-3.5 flex items-baseline justify-between gap-4 group"
                    >
                      <span className="text-[16px] font-semibold text-ink group-hover:text-accent transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[14px] text-ink-muted text-right">{tool.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h2 className="text-[24px] font-extrabold tracking-[-0.01em] uppercase text-ink">Field guides</h2>
                <Link href="/blog" className="text-[14px] text-ink-muted hover:text-accent transition-colors shrink-0">
                  All {BLOG_POSTS.length} →
                </Link>
              </div>
              <ul>
                {FEATURED_GUIDES.map((post) => (
                  <li key={post.href} className="border-t border-hairline last:border-b">
                    <Link href={post.href} className="py-3.5 block group">
                      <span className="block text-[16px] font-semibold text-ink group-hover:text-accent transition-colors">
                        {post.title}
                      </span>
                      <span className="block text-[14px] text-ink-muted mt-0.5">{post.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
