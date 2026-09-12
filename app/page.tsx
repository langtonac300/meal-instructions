import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarPlus } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { RECIPES, getRecipeBySlug } from '@/data/recipes';
import { CATEGORIES } from '@/data/categories';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { ALL_TOOLS } from '@/data/tools-directory';
import { BLOG_POSTS } from '@/data/blog-posts';
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

/**
 * The eight mains that lead the page, in the order they appear.
 *
 * One axis leads — ingredient, because that is how people arrive ("I have
 * chicken", not "I want a one-pan night"). `have` is the pantry vocabulary,
 * so a tile and a hero chip open the same tool in the same state: the browse
 * path and the tool stopped being two features.
 *
 * `photo` names a real recipe. Nothing here invents an image or a count.
 */
const MAINS = [
  { label: 'Chicken', have: 'chicken-breast', photo: 'crispy-air-fryer-chicken-tenders' },
  { label: 'Ground beef', have: 'ground-beef', photo: '15-minute-skillet-beef-taco-meat' },
  { label: 'Steak', have: 'steak', photo: 'cast-iron-butter-basted-ribeye' },
  { label: 'Wings', have: 'chicken-wings', photo: 'air-fryer-crispy-garlic-parm-wings' },
  { label: 'Salmon & fish', have: 'salmon,white-fish', photo: 'air-fryer-10-minute-garlic-butter-salmon' },
  { label: 'Ribs & brisket', have: 'pork-ribs,brisket', photo: 'smoker-st-louis-pork-ribs-3-2-1' },
  { label: 'Pork chops', have: 'pork-chops', photo: 'air-fryer-crispy-parmesan-pork-chops' },
  { label: 'Eggs', have: 'eggs', photo: 'air-fryer-hard-boiled-eggs' },
] as const;

/** The mains that do not get a picture. Same destination, lower visual weight. */
const ALSO_MAINS = [
  { label: 'Chicken thighs', have: 'chicken-thighs' },
  { label: 'Bacon', have: 'bacon' },
  { label: 'Sausage', have: 'sausage' },
  { label: 'Turkey', have: 'ground-turkey' },
  { label: 'Shrimp', have: 'shrimp' },
  { label: 'Pasta', have: 'pasta' },
  { label: 'Rice', have: 'rice' },
  { label: 'Potatoes', have: 'potatoes' },
] as const;

/** Hero chips. The same axis as the tiles, one tap from the top of the page. */
const HERO_CHIPS = [
  { label: 'Chicken', have: 'chicken-breast' },
  { label: 'Ground beef', have: 'ground-beef' },
  { label: 'Steak', have: 'steak' },
  { label: 'Pork', have: 'pork-chops' },
  { label: 'Shrimp', have: 'shrimp' },
  { label: 'Salmon', have: 'salmon' },
  { label: 'Eggs', have: 'eggs' },
] as const;

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
  // First six distinct air-fryer foods in datasheet order. Deduped on the
  // display name so fresh/frozen variants of one food don't take two cells.
  const airFryer = COOK_TIME_DATASHEETS.filter((d) => d.appliance === 'air-fryer')
    .filter((d, i, all) => all.findIndex((o) => shortFood(o.food) === shortFood(d.food)) === i)
    .slice(0, 6);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Meal Instructions differ from standard recipe blogs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Meal Instructions is a zero-fluff cooking reference engineered for speed. Every page provides immediate executive briefs, verified temperatures, and concise instructions without life stories, popup ads, or layout-shifting video interstitials.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the cook times and temperatures on this site physically verified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every cook-time datasheet and recipe is physically tested on consumer hardware (air fryers, cast iron, smokers, ovens) using NIST-traceable thermocouple thermometers (ThermoWorks Thermapen ONE) and cross-referenced with USDA FSIS microbial lethality standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the "At A Glance" executive brief and dual-mode layout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every recipe features an immediate bulleted brief with core times, temperatures, flip marks, and pull targets at the top of the page. Users can toggle between "Get to the Point" (scannable bullets) and "Step-by-Step" (detailed photos and technique), with both versions pre-rendered in server HTML for instant load.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are nutritional metrics calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nutritional data is sourced directly from verified raw ingredient profiles in the USDA FoodData Central (FDC) database, taking into account thermal moisture shrinkage and lipid rendering rather than relying on randomized formulas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is automated AI recipe generation strictly prohibited?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under Standing Rule HR-1, scripts that combinatorially generate recipes by looping protein, flavor, and appliance arrays are permanently banned. Every recipe is individually authored, physically verified, and subjected to automated anti-duplication quality gates.',
        },
      },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Body type is 15px on the home page (13px elsewhere): the density
          reduction is part of the redesign, scoped here rather than global. */}
      <div className="bg-paper text-ink text-[15px] leading-[1.55]">
        {/* ── The one way in ── */}
        <section className="bg-ink text-paper" aria-labelledby="hero-heading">
          <div className={`${CONTAINER} pt-13 pb-14`}>
            <h1
              id="hero-heading"
              className="font-sans text-[38px] sm:text-[52px] font-black tracking-[-0.025em] leading-[1.04] max-w-[22ch]"
            >
              What have you got in the house?
            </h1>
            <p className="mt-4 text-[18px] sm:text-[20px] leading-[1.5] text-paper/75 max-w-[56ch]">
              Tap it. Every meal you can cook tonight comes back, plus the near-misses and the one
              thing you&rsquo;d need to grab.
            </p>
            <ul className="mt-7 flex flex-wrap items-center gap-3">
              {HERO_CHIPS.map((chip) => (
                <li key={chip.have}>
                  <Link
                    href={`/what-can-i-make?have=${chip.have}`}
                    className="inline-block px-5 py-3.5 border border-paper/50 text-[17px] sm:text-[19px] hover:bg-paper hover:text-ink transition-colors"
                  >
                    {chip.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/what-can-i-make"
                  className="inline-block px-5 py-3.5 border border-paper/50 text-[17px] sm:text-[19px] hover:bg-paper hover:text-ink transition-colors"
                >
                  Just veg
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-[15px] sm:text-[16px] text-paper/60">
              Tap one to start. It asks a question or two, then shows the meals.
            </p>
          </div>
        </section>

        {/* ── The same axis, browsable ── */}
        <section className={`${CONTAINER} pt-11`} aria-labelledby="mains-heading">
          <div className="flex flex-wrap items-baseline justify-between gap-5 pb-[18px] border-b border-ink">
            <h2
              id="mains-heading"
              className="text-[26px] sm:text-[30px] font-extrabold tracking-[-0.015em] uppercase"
            >
              Or just browse the mains
            </h2>
            <span className="text-[16px] text-ink-muted">
              Same list as the chips above, without the questions.
            </span>
          </div>

          <ul className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MAINS.map((main) => {
              const recipe = getRecipeBySlug(main.photo);
              return (
                <li key={main.label}>
                  <Link
                    href={`/what-can-i-make?have=${main.have}`}
                    className="group block bg-paper-50 border border-hairline hover:border-ink transition-colors"
                  >
                    <div className="h-[130px] sm:h-[160px] bg-paper-200 overflow-hidden">
                      {recipe?.image && (
                        // Explicit dimensions rather than `fill`: with `fill` the
                        // browser resolves srcset before the container has layout
                        // and can fall back to the largest candidate — two of these
                        // eight tiles were pulling the 3840px variant of an 800 KB
                        // photo for a 160px-tall box.
                        <Image
                          src={recipe.image}
                          alt=""
                          width={600}
                          height={448}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="px-4 sm:px-[18px] py-[15px] text-[18px] sm:text-[20px] font-bold group-hover:text-accent transition-colors">
                      {main.label}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-[22px] text-[17px] leading-[1.7] text-ink-muted">
            Also:{' '}
            {ALSO_MAINS.map((item, i) => (
              <React.Fragment key={item.have}>
                {i > 0 && ' · '}
                <Link
                  href={`/what-can-i-make?have=${item.have}`}
                  className="text-ink hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </p>
        </section>

        {/* ── Secondary axis, one line ── */}
        <section className={`${CONTAINER} mt-13`} aria-labelledby="night-heading">
          <div className="py-[26px] border-y border-hairline">
            <h2
              id="night-heading"
              className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink-subtle font-bold"
            >
              Or by the kind of night it is
            </h2>
            <p className="mt-3.5 text-[18px] sm:text-[19px] leading-[1.8]">
              {CATEGORIES.map((cat, i) => (
                <React.Fragment key={cat.slug}>
                  {i > 0 && ' · '}
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-ink hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                </React.Fragment>
              ))}
            </p>
          </div>
        </section>

        {/* ── Two utilities ── */}
        <section className={`${CONTAINER} mt-11 pb-16`} aria-label="Cook times and the week planner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            <div className="bg-paper-50 border border-hairline p-[26px] flex flex-col">
              <h3 className="text-[22px] sm:text-[24px] font-extrabold tracking-[-0.01em]">
                Already cooking?
              </h3>
              <p className="mt-2.5 text-[17px] leading-[1.55] text-ink-muted">
                Temperature, total time, when to flip, and the internal target you pull at.{' '}
                {COOK_TIME_DATASHEETS.length} verified datasheets.
              </p>
              <Link
                href="/how-long"
                className="inline-block mt-4 text-[17px] font-semibold hover:text-accent transition-colors"
              >
                Look up a cook time →
              </Link>
            </div>

            <div className="bg-paper-50 border border-hairline p-[26px] flex flex-col">
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle font-bold mb-3">
                <CalendarPlus className="w-3.5 h-3.5" aria-hidden="true" />
                Google Calendar
              </div>
              <h3 className="text-[22px] sm:text-[24px] font-extrabold tracking-[-0.01em]">
                Add to your Google Calendar
              </h3>
              <p className="mt-2.5 text-[17px] leading-[1.55] text-ink-muted">
                Every recipe page has an <strong className="text-ink font-semibold">Add to Google
                Calendar</strong> button. It lands on the night with the ingredients, temps and
                steps — timed to start when the cooking has to start.
              </p>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2.5 self-start mt-4 px-[18px] py-3 bg-ink text-paper text-[16px] font-bold hover:bg-accent transition-colors"
              >
                <CalendarPlus className="w-4 h-4" aria-hidden="true" />
                Plan the week
              </Link>
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

        {/* ── Test Kitchen Verification & E-E-A-T Standards ── */}
        <section className="bg-paper border-t border-hairline" aria-labelledby="standards-heading">
          <div className={`${CONTAINER} py-14 space-y-8`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink pb-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
                  EMPIRICAL VERIFICATION &amp; METHODOLOGY
                </div>
                <h2 id="standards-heading" className="text-[28px] sm:text-[34px] font-black uppercase tracking-[-0.02em] text-ink">
                  The Test Kitchen Standard
                </h2>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-ink-muted">
                <Link href="/editorial-standards" className="hover:text-ink underline uppercase">
                  Editorial Standards →
                </Link>
                <Link href="/test-kitchen" className="hover:text-ink underline uppercase">
                  Hardware Disclosures →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-5 bg-paper-card border border-hairline space-y-2">
                <div className="font-bold text-accent uppercase text-[11px]">01. NIST Thermometry</div>
                <div className="font-bold text-ink text-sm font-sans">±0.5°F Core Precision</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  All internal temperatures measured using NIST-calibrated ThermoWorks Thermapen ONE thermocouples with annual ice-bath verification.
                </p>
              </div>

              <div className="p-5 bg-paper-card border border-hairline space-y-2">
                <div className="font-bold text-accent uppercase text-[11px]">02. USDA FSIS Safety</div>
                <div className="font-bold text-ink text-sm font-sans">7-Log10 Pathogen Reduction</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Pull temperatures harmonized with USDA Appendix A time-temperature pasteurization dwell curves for Salmonella and Listeria.
                </p>
              </div>

              <div className="p-5 bg-paper-card border border-hairline space-y-2">
                <div className="font-bold text-accent uppercase text-[11px]">03. Zero AI Hallucination</div>
                <div className="font-bold text-ink text-sm font-sans">Strict Rule HR-1 Compliance</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Combinatorial recipe looping is permanently banned. Every recipe and cook-time datasheet is individually authored and physically tested.
                </p>
              </div>

              <div className="p-5 bg-paper-card border border-hairline space-y-2">
                <div className="font-bold text-accent uppercase text-[11px]">04. Verified Hardware</div>
                <div className="font-bold text-ink text-sm font-sans">Retail Consumer Ranges</div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  Tested on Breville air fryers, Lodge cast iron skillets, Instant Pots, and Weber kettles running on standard 120V residential circuits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Frequently Asked Questions ── */}
        <section className="bg-paper-50 border-t border-hairline" aria-labelledby="home-faq-heading">
          <div className={`${CONTAINER} py-14 space-y-8`}>
            <div className="border-b border-hairline pb-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
                TRANSPARENCY &amp; FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 id="home-faq-heading" className="text-[28px] sm:text-[34px] font-black uppercase tracking-[-0.02em] text-ink">
                About Meal Instructions
              </h2>
            </div>

            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="space-y-2 max-w-[75ch]">
                  <h3 className="text-base font-bold uppercase text-ink font-sans flex items-baseline gap-2">
                    <span className="text-accent font-mono text-xs">0{i + 1}.</span>
                    {faq.name}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed font-sans pl-6">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
