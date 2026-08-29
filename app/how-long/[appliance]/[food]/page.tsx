import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Flame, ShieldCheck, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import LeanSpecBadge from '@/components/LeanSpecBadge';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import { absoluteUrl } from '@/lib/site';

interface HowLongPageProps {
  params: Promise<{ appliance: string; food: string }>;
}

export async function generateStaticParams() {
  return COOK_TIME_DATASHEETS.map((item) => ({
    appliance: item.appliance,
    food: item.foodSlug,
  }));
}

export async function generateMetadata({ params }: HowLongPageProps): Promise<Metadata> {
  const { appliance, food } = await params;
  const sheet = COOK_TIME_DATASHEETS.find(
    (d) => d.appliance === appliance && d.foodSlug === food
  );

  if (!sheet) {
    return { title: 'Cooking Guide Not Found' };
  }

  const title = `How Long to Cook ${sheet.food} in the ${sheet.appliance.replace('-', ' ')} (${sheet.tempFormatted}, ${sheet.timeFormatted})`;
  const description = `Exact verified cooking time, temperature (${sheet.tempFormatted}), flip mark (${sheet.flipAtMinutes} mins), and internal target temp (${sheet.internalTempTargetFormatted}) for ${sheet.food}. Verified on real hardware. Zero fluff.`;

  const url = absoluteUrl(`/how-long/${sheet.appliance}/${sheet.foodSlug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function HowLongPage({ params }: HowLongPageProps) {
  const { appliance, food } = await params;
  const sheet = COOK_TIME_DATASHEETS.find(
    (d) => d.appliance === appliance && d.foodSlug === food
  );

  if (!sheet) {
    notFound();
  }

  // HowTo / Technical FAQ Schema.org JSON-LD
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How Long to Cook ${sheet.food} in the ${sheet.appliance.replace('-', ' ')}`,
    description: `Verified cook time and temperature guide for ${sheet.food} in the ${sheet.appliance}.`,
    totalTime: `PT${sheet.timeMaxMinutes}M`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Preheat & Prep',
        text: `Preheat ${sheet.appliance} to ${sheet.tempFormatted}. Prep ${sheet.cutOrPrep}. ${sheet.oilSprayRequired ? 'Spray lightly with oil.' : ''}`,
      },
      {
        '@type': 'HowToStep',
        name: 'Cook & Flip',
        text: `Cook for ${sheet.timeFormatted}.${sheet.flipAtMinutes > 0 ? ` Flip or shake at the ${sheet.flipAtMinutes}-minute mark.` : ''}`,
      },
      {
        '@type': 'HowToStep',
        name: 'Check Internal Temperature & Rest',
        text: `Verify internal temperature reaches ${sheet.internalTempTargetFormatted}. Rest for ${sheet.restMinutes} minutes before serving.`,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href={`/charts/${sheet.appliance}`}
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{sheet.appliance} Charts</span>
        </Link>
        <span className="uppercase text-ink-muted">
          DATASHEET // {sheet.id}
        </span>
      </div>

      {/* Main Datasheet Header Card */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted uppercase">
          <span className="px-2.5 py-1 bg-paper hairline-border font-bold text-ink">
            {sheet.appliance}
          </span>
          <span className="px-2.5 py-1 bg-paper hairline-border">
            STATE: {sheet.state.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 hairline-border font-bold">
            VERIFIED DATASHEET
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink font-sans uppercase">
            How Long to Cook {sheet.food} in the {sheet.appliance.replace('-', ' ')}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
            Specification: {sheet.cutOrPrep}
          </p>
        </div>

        {/* Big Numbers Grid with Lean 5S Visual Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <LeanSpecBadge
            type="temp"
            label="Target Temp"
            value={sheet.tempFormatted}
            sub="Convection Heat"
            accent
          />
          <LeanSpecBadge
            type="time"
            label="Total Time"
            value={sheet.timeFormatted}
            sub="Total Cook Window"
          />
          <LeanSpecBadge
            type="flip"
            label="Flip Mark"
            value={sheet.flipAtMinutes > 0 ? `${sheet.flipAtMinutes}m` : 'No Flip'}
            sub={sheet.flipAtMinutes > 0 ? 'Turnover Point' : 'Continuous Cook'}
          />
          <LeanSpecBadge
            type="probe"
            label="Internal Safe Temp"
            value={sheet.internalTempTargetFormatted}
            sub="USDA Safe Pull"
          />
        </div>

        {/* Execution Directions */}
        <div className="space-y-4 font-sans text-sm">
          <h2 className="text-base font-bold uppercase tracking-tight text-ink font-mono hairline-b pb-2">
            3-Step Execution Protocol
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-paper hairline-border">
              <span className="w-5 h-5 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="block font-sans text-ink">Preheat & Prep</strong>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  Preheat {sheet.appliance} to {sheet.tempFormatted}. Place {sheet.food.toLowerCase()} ({sheet.cutOrPrep}) in a single layer with space between items for convection airflow. {sheet.oilSprayRequired ? 'Spray lightly with high-smoke-point oil.' : 'No added oil required.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-paper hairline-border">
              <span className="w-5 h-5 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="block font-sans text-ink">Cook & Shake / Flip</strong>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  Cook for {sheet.timeFormatted}. {sheet.flipAtMinutes > 0 ? `Flip or shake basket at the ${sheet.flipAtMinutes}-minute mark for even browning.` : 'Do not flip; allow top surface to crust undisturbed.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-paper hairline-border">
              <span className="w-5 h-5 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="block font-sans text-ink">Doneness & Rest</strong>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  {sheet.donenessCue} Confirm internal temperature reaches {sheet.internalTempTargetFormatted}. Rest for {sheet.restMinutes} minutes before carving.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Verification Box */}
        <div className="bg-paper p-4 hairline-border font-mono text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold uppercase text-ink">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Verification Basis & Testing Rig</span>
          </div>
          <p className="text-xs text-ink-muted font-sans">
            {sheet.verificationBasis}
          </p>
          <div className="pt-2 hairline-t text-[11px] text-ink-subtle">
            <strong>Pro Tip:</strong> {sheet.proTip}
          </div>
        </div>

        {/* Related Full Recipe Link */}
        {sheet.relatedRecipeSlug && (
          <div className="hairline-t pt-4 flex items-center justify-between font-mono text-xs">
            <span className="text-ink-muted">Want the complete meal with seasoning & sides?</span>
            <Link
              href={`/recipes/${sheet.relatedRecipeSlug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-ink text-paper uppercase font-bold hover:bg-accent transition-colors"
            >
              <span>View Full Recipe</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </section>

      {/* More Cook-Time Datasheets for this appliance */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-tight text-ink font-mono">
          Related {sheet.appliance.replace('-', ' ')} Cook Times
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {COOK_TIME_DATASHEETS.filter(
            (d) => d.appliance === sheet.appliance && d.id !== sheet.id
          )
            .slice(0, 6)
            .map((other) => (
              <Link
                key={other.id}
                href={`/how-long/${other.appliance}/${other.foodSlug}`}
                className="p-3 bg-paper-card hairline-border hover:border-ink transition-colors flex flex-col justify-between"
              >
                <div className="font-bold text-ink text-xs font-sans mb-1">
                  {other.food}
                </div>
                <div className="flex justify-between text-[11px] text-ink-muted hairline-t pt-2 mt-2">
                  <span>{other.tempFormatted}</span>
                  <span>{other.timeFormatted}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

    </div>
  );
}
