import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COOK_TIME_DATASHEETS, getCookTimeBySlug } from '@/data/cook-times';
import { APPLIANCES } from '@/data/appliances';
import { POPULAR_PRESETS } from '@/data/cook-time-presets';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { lookupIndex } from '@/lib/cook-time-lookup';
import { LeanIcon } from '@/components/icons/Lean5SIcons';
import CookTimeLookup from '@/components/CookTimeLookup';

export const metadata: Metadata = {
  title: 'How Long to Cook Everything — Verified Time & Temperature Datasheets',
  description:
    `${COOK_TIME_DATASHEETS.length} verified cook-time datasheets for oven, air fryer, Instant Pot, skillet, sheet pan, cast iron, grill, slow cooker, smoker, and boiling. Exact temps, flip marks, and internal targets.`,
  alternates: {
    canonical: absoluteUrl('/how-long'),
  },
};

/** Rows shown per appliance before the "All {n} →" link carries the rest. */
const ROWS_PER_APPLIANCE = 8;

const RELATED = [
  {
    title: 'Printable cheat sheet',
    description: 'One page, every temperature you actually need',
    href: '/cheat-sheet',
  },
  {
    title: 'Internal temperature guide',
    description: 'Doneness by protein, USDA and chef-safe, with carryover',
    href: '/internal-temp',
  },
  {
    title: 'Reheat calculator',
    description: 'Bring leftovers and takeout back without ruining them',
    href: '/reheat',
  },
];

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle';

export default function HowLongHubPage() {
  const breadcrumbs = generateBreadcrumbSchema([{ name: 'Cook Times', path: '/how-long' }]);

  const appliancesWithData = APPLIANCES.filter((app) =>
    COOK_TIME_DATASHEETS.some((d) => d.appliance === app.slug)
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

  const index = lookupIndex();

  // Suggestion chips: the shared preset list, resolved to real datasheet routes.
  const chips = POPULAR_PRESETS.slice(0, 6)
    .map((preset) => {
      const ds = getCookTimeBySlug(preset.slug);
      return ds ? { label: preset.label, href: `/how-long/${ds.appliance}/${ds.foodSlug}` } : null;
    })
    .filter((c): c is { label: string; href: string } => c !== null);

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-10 pb-16 text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* ── 1. Hero ── */}
      <header className="pt-14">
        <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase max-w-[20ch]">
          How long to cook everything
        </h1>
        <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[58ch]">
          {COOK_TIME_DATASHEETS.length} verified time and temperature datasheets across{' '}
          {appliancesWithData.length} appliances. Exact temps, flip marks, internal targets. Tested
          on real hardware.
        </p>
      </header>

      {/* ── 2. Lookup ── */}
      <div className="mt-8 max-w-[640px]">
        <CookTimeLookup
          variant="hero"
          datasheets={index.datasheets}
          recipes={index.recipes}
          datasheetCount={COOK_TIME_DATASHEETS.length}
        />
        {chips.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Popular lookups">
            {chips.map((chip) => (
              <li key={chip.href}>
                <Link
                  href={chip.href}
                  className="inline-block px-3 py-[7px] bg-paper-50 border border-hairline text-[15px] text-ink hover:border-ink transition-colors"
                >
                  {chip.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── 3. Appliance jump row ── */}
      <nav className="mt-12 pb-4 border-b border-ink" aria-label="Appliances">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-2">
          <span className={`${EYEBROW} shrink-0`}>Or jump to an appliance</span>
          <ul className="flex sm:flex-wrap gap-x-[18px] gap-y-1.5 text-[16px] overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal pb-1 sm:pb-0">
            {appliancesWithData.map((app) => (
              <li key={app.slug} className="shrink-0">
                <a href={`#${app.slug}`} className="hover:text-accent transition-colors">
                  {app.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <p className="mt-3 text-[15px] text-ink-muted">
        Your own equipment sorts to the top once your kitchen is set up. Nothing is hidden — the
        rest just follows.
      </p>

      {/* ── 4. Appliance sections ──
          data-appliance-sort turns this into the flex container the kitchen
          personalisation rules order. Every appliance still renders — the CSS
          only moves owned equipment to the top (HR-6). */}
      <div data-appliance-sort="column">
        <div data-appliance-divider className={`${EYEBROW} pt-12 pb-2 border-b border-hairline`}>
          Everything else
        </div>
        {appliancesWithData.map((app) => {
          const datasheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === app.slug);
          const shown = datasheets.slice(0, ROWS_PER_APPLIANCE);
          const applianceWord = app.name.replace(/^Standard Home /, '').toLowerCase();
          return (
            <section
              key={app.slug}
              id={app.slug}
              data-appliance={app.slug}
              className="pt-12 scroll-mt-24"
              aria-labelledby={`${app.slug}-heading`}
            >
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-5">
                <div className="flex items-center gap-4">
                  <LeanIcon
                    name={app.slug}
                    size={44}
                    className="text-ink shrink-0 w-8 h-8 sm:w-11 sm:h-11"
                  />
                  <div>
                    <h2
                      id={`${app.slug}-heading`}
                      className="text-[24px] sm:text-[30px] font-extrabold tracking-[-0.01em] uppercase leading-tight"
                    >
                      {app.name}
                    </h2>
                    <p className="mt-1 font-mono text-[15px] text-ink-muted">
                      {datasheets.length} datasheets · {app.tempRange}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/charts/${app.slug}`}
                  className="text-[16px] font-semibold hover:text-accent transition-colors"
                >
                  All {datasheets.length} {applianceWord} datasheets →
                </Link>
              </div>

              <div className="border-t border-ink">
                {/* Column headers — hidden under sm; the mono values carry it there. */}
                <div
                  className={`hidden sm:flex items-baseline gap-5 py-2.5 border-b border-hairline ${EYEBROW}`}
                  aria-hidden="true"
                >
                  <span className="flex-1 min-w-0">Food</span>
                  <span className="w-[6em] text-right">Temp</span>
                  <span className="w-[7em] text-right">Time</span>
                  <span className="hidden md:block w-[9em] text-right">Flip / shake</span>
                  <span className="w-[5em] text-right">Internal</span>
                </div>
                <ul>
                  {shown.map((item) => (
                    <li key={item.id} className="border-b border-hairline">
                      <Link
                        href={`/how-long/${item.appliance}/${item.foodSlug}`}
                        className="flex items-baseline gap-4 sm:gap-5 py-4 -mx-3 px-3 hover:bg-paper-50 transition-colors group"
                      >
                        <span className="flex-1 min-w-0">
                          <span className="block text-[19px] font-semibold leading-tight group-hover:text-accent transition-colors">
                            {item.food}
                          </span>
                          <span className="block mt-0.5 text-[15px] text-ink-muted">
                            {item.cutOrPrep}
                          </span>
                        </span>
                        <span className="font-mono text-[18px] font-bold w-[6em] text-right shrink-0">
                          {item.tempFormatted.split(' ')[0]}
                        </span>
                        <span className="hidden sm:block font-mono text-[17px] w-[7em] text-right shrink-0">
                          {item.timeFormatted}
                        </span>
                        <span className="hidden md:block font-mono text-[15px] text-ink-muted w-[9em] text-right shrink-0">
                          {item.flipAtMinutes > 0 ? `Flip at ${item.flipAtMinutes}` : 'No flip'}
                        </span>
                        {item.internalTempTargetFormatted ? (
                          <span className="font-mono text-[18px] font-bold text-accent w-[5em] text-right shrink-0">
                            {item.internalTempTargetFormatted.split(' ')[0]}
                          </span>
                        ) : (
                          <span className="text-[16px] text-ink-muted w-[5em] text-right shrink-0">
                            Visual
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── 6. Related references ── */}
      <section className="pt-14" aria-labelledby="related-heading">
        <h2 id="related-heading" className="text-[24px] font-extrabold tracking-[-0.01em] uppercase mb-4">
          Related references
        </h2>
        <ul className="border-t border-ink">
          {RELATED.map((ref) => (
            <li key={ref.href} className="border-b border-hairline">
              <Link
                href={ref.href}
                className="flex items-center justify-between gap-6 py-[18px] group"
              >
                <span>
                  <span className="block text-[20px] font-semibold group-hover:text-accent transition-colors">
                    {ref.title}
                  </span>
                  <span className="block mt-0.5 text-[16px] text-ink-muted">{ref.description}</span>
                </span>
                <ArrowRight
                  className="w-[18px] h-[18px] text-ink-muted shrink-0 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
