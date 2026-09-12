import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ShieldCheck, Thermometer, Info, HelpCircle } from 'lucide-react';
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
    return { title: 'Cooking Chart Not Found | Meal Instructions' };
  }

  const datasheets = COOK_TIME_DATASHEETS.filter((d) => d.appliance === appliance);
  const title = `${appMeta.name} Cooking Times & Temperatures Chart (${datasheets.length} Verified Datasheets)`;
  const description = `Complete technical cook time, temperature, flip mark, and internal pull target matrix for ${appMeta.name}. Includes fresh, frozen, bone-in, and boneless specifications.`;

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
    { name: 'Charts', path: '/charts' },
    { name: `${appMeta.name} Chart`, path: `/charts/${appMeta.slug}` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I adjust cook times in the ${appMeta.name} for thicker or thinner cuts?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Times listed in this chart are calibrated for standard butcher specifications (e.g. 1-inch boneless cuts or 6-8 oz portions). For cuts thicker than 1.25 inches, increase cook time by 20-30% and verify internal core temperature using a probe thermometer. For thin cutlets under 1/2-inch, reduce cook time by 25%.`,
        },
      },
      {
        '@type': 'Question',
        name: `Does the ${appMeta.name} require resting for all meats?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. All whole muscle cuts (steaks, chops, chicken breasts, roasts) require a 3 to 5-minute rest on a warm plate or wire rack. During resting, carryover thermal diffusion raises core temperature by 3°F to 5°F while muscle fibers relax to retain intracellular juices.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can I cook directly from frozen using the ${appMeta.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Refer to the "State" column in the chart. Items marked "frozen" (such as burger patties, salmon fillets, and chicken tenders) have tested thermal curves specifically calibrated to thaw the core and brown the exterior simultaneously.`,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 text-ink font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/charts"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Charts</span>
        </Link>
        <span className="uppercase text-ink-muted">
          TECHNICAL CHART // {appMeta.slug}
        </span>
      </div>

      {/* Hero */}
      <section className="bg-paper-card border border-hairline p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-paper border border-hairline">
            <LeanIcon name={appMeta.slug} size={30} className="text-accent" />
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
              VERIFIED TIME &amp; TEMP MATRIX
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink uppercase font-sans">
              {appMeta.name} Cooking Chart
            </h1>
          </div>
        </div>
        <p className="text-base sm:text-lg text-ink-muted max-w-3xl leading-relaxed">
          Parametric technical reference guide for cooking meats, poultry, seafood, vegetables, and frozen foods in the {appMeta.name}. Every temperature and time has been verified on consumer hardware with USDA FSIS food safety calibration.
        </p>

        <div className="border-t border-hairline pt-4 font-mono text-xs text-ink-muted flex flex-wrap items-center gap-4">
          <span>OPERATING TEMP: <strong className="text-ink">{appMeta.tempRange}</strong></span>
          <span>•</span>
          <span>TOTAL SPECIFICATIONS: <strong className="text-ink">{datasheets.length} DATASHEETS</strong></span>
          <span>•</span>
          <Link href={`/appliances/${appMeta.slug}`} className="text-accent underline font-bold">
            VIEW {appMeta.name.toUpperCase()} APPLIANCE GUIDE →
          </Link>
        </div>
      </section>

      {/* Engineering Calibration Note */}
      <section className="bg-paper border border-hairline p-5 sm:p-6 space-y-2 font-mono text-xs">
        <div className="flex items-center gap-2 font-bold uppercase text-ink text-[12px] font-sans">
          <ShieldCheck className="w-4 h-4 text-emerald-800" />
          <span>How to Execute With This Matrix</span>
        </div>
        <p className="text-ink-muted font-sans text-xs leading-relaxed">
          Times listed represent the total active thermal window for standard cuts. Preheating the {appMeta.name} is mandatory prior to inserting food. If cooking food straight from the refrigerator, use the higher end of the time range; if cooking room-temperature food, use the lower end. Always confirm doneness with an instant-read probe thermometer inserted into the geometric center.
        </p>
      </section>

      {/* Datasheet Table */}
      <section className="bg-paper-card border border-hairline overflow-x-auto shadow-subtle">
        <table className="w-full text-left font-mono text-xs divide-y divide-hairline">
          <thead className="bg-paper uppercase text-[10px] tracking-wider text-ink-subtle">
            <tr>
              <th className="py-3.5 px-4 w-16">ID</th>
              <th className="py-3.5 px-4">Food &amp; Cut Specification</th>
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
              <th className="py-3.5 px-4 w-24 text-right">Datasheet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {datasheets.map((sheet) => (
              <tr
                key={sheet.id}
                className="hover:bg-paper-50 transition-colors group cursor-pointer"
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
                  <span className={`px-2 py-0.5 border border-hairline inline-block ${
                    sheet.state === 'frozen' ? 'bg-sky-100 text-sky-950 font-bold' : 'bg-paper text-ink'
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
                  {sheet.internalTempTargetFormatted ?? '—'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/how-long/${sheet.appliance}/${sheet.foodSlug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-hairline group-hover:bg-ink group-hover:text-paper uppercase transition-colors"
                  >
                    <span>VIEW</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Chart FAQs */}
      <section className="border-t border-ink pt-10 space-y-6">
        <h2 className="text-[24px] font-extrabold uppercase tracking-tight">
          {appMeta.name} Chart Calibration FAQs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-hairline pb-5 space-y-2">
              <h3 className="font-bold text-[16px] text-ink">
                {faq.name}
              </h3>
              <p className="text-[14px] leading-[1.6] text-ink-muted">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
