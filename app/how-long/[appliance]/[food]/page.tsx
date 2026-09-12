import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Flame, ShieldCheck, Zap, ArrowUpRight, CheckCircle2, Thermometer, AlertTriangle, Eye, HelpCircle } from 'lucide-react';
import LeanSpecBadge from '@/components/LeanSpecBadge';
import StartCookButton from '@/components/StartCookButton';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';
import type { CookTimeDatasheet, Appliance } from '@/lib/types';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';
import { getDatasheetContent } from '@/lib/datasheet-content';

const HEAT_METHOD: Record<Appliance, string> = {
  'air-fryer': 'Convection Heat',
  'oven': 'Radiant Heat',
  'instant-pot': 'Pressure Level',
  'skillet': 'Stovetop Heat',
  'sheet-pan': 'Radiant Heat',
  'cast-iron': 'Stovetop Sear',
  'grill': 'Direct Flame',
  'dutch-oven': 'Stovetop / Oven',
  'slow-cooker': 'Low & Slow',
  'smoker': 'Indirect Smoke',
  'boiling': 'Stovetop Boil',
};

function releaseLabel(method?: string): string {
  if (method === 'natural') return 'full natural release';
  if (method === 'quick') return 'quick release';
  if (method === '10-min-natural') return '10-minute natural release';
  return '';
}

function getStepCopy(sheet: CookTimeDatasheet) {
  const a = sheet.appliance;
  const food = sheet.food.toLowerCase();
  const isIP = a === 'instant-pot';
  const oil = sheet.oilSprayRequired ? ' Spray lightly with high-smoke-point oil.' : '';
  const release = releaseLabel(sheet.releaseMethod);

  let prep: string;
  if (isIP) {
    prep = `Add ${food} (${sheet.cutOrPrep}) to the Instant Pot inner pot. Seal the lid and set the valve to Sealing. Select ${sheet.tempFormatted} for ${sheet.timeFormatted}.`;
  } else if (a === 'slow-cooker') {
    prep = `Add ${food} (${sheet.cutOrPrep}) to the slow cooker. Set to ${sheet.tempFormatted}.${oil}`;
  } else if (a === 'air-fryer') {
    prep = `Preheat ${a} to ${sheet.tempFormatted}. Place ${food} (${sheet.cutOrPrep}) in a single layer with space between items for convection airflow.${oil}`;
  } else if (a === 'grill') {
    prep = `Preheat grill to ${sheet.tempFormatted}. Clean and oil grates. Prepare ${food} (${sheet.cutOrPrep}).${oil}`;
  } else if (a === 'smoker') {
    prep = `Preheat smoker to ${sheet.tempFormatted} with your choice of wood. Prepare ${food} (${sheet.cutOrPrep}).${oil}`;
  } else if (a === 'cast-iron') {
    prep = `Heat cast iron skillet over ${sheet.tempFormatted} until lightly smoking. Prepare ${food} (${sheet.cutOrPrep}).${oil}`;
  } else if (a === 'sheet-pan') {
    prep = `Preheat oven to ${sheet.tempFormatted}. Arrange ${food} (${sheet.cutOrPrep}) on a parchment-lined sheet pan in a single layer.${oil}`;
  } else {
    prep = `Preheat ${a.replace('-', ' ')} to ${sheet.tempFormatted}. Prepare ${food} (${sheet.cutOrPrep}).${oil}`;
  }

  let cookTitle: string;
  let cook: string;
  if (isIP) {
    cookTitle = 'Pressure Cook';
    cook = `Cook at ${sheet.tempFormatted} for ${sheet.timeFormatted}.${release ? ` Use ${release}.` : ''}`;
  } else if (a === 'slow-cooker') {
    cookTitle = 'Slow Cook';
    cook = `Cook for ${sheet.timeFormatted}. Keep lid on; do not stir unless specified.`;
  } else {
    cookTitle = sheet.flipAtMinutes > 0 ? 'Cook & Flip' : 'Cook';
    if (sheet.flipAtMinutes > 0) {
      const action = a === 'air-fryer' ? 'Flip or shake basket' : 'Flip';
      cook = `Cook for ${sheet.timeFormatted}. ${action} at the ${sheet.flipAtMinutes}-minute mark for even browning.`;
    } else {
      cook = `Cook for ${sheet.timeFormatted}. Do not flip; allow surface to develop undisturbed.`;
    }
  }

  let rest: string;
  if (isIP && release) {
    rest = `${sheet.donenessCue} After ${release}, carefully open the lid away from you. ${sheet.restMinutes > 0 ? `Let stand ${sheet.restMinutes} minutes before serving.` : ''}`;
  } else {
    rest = `${sheet.donenessCue}${sheet.internalTempTargetFormatted ? ` Confirm internal temperature reaches ${sheet.internalTempTargetFormatted}.` : ''} Rest for ${sheet.restMinutes} minutes before serving.`;
  }

  return { prep, cookTitle, cook, rest };
}

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
    return { title: 'Cooking Guide Not Found | Meal Instructions' };
  }

  const title = `How Long to Cook ${sheet.food} in the ${sheet.appliance.replace('-', ' ')} (${sheet.tempFormatted}, ${sheet.timeFormatted})`;
  const description = sheet.metaDescription ?? `Exact verified cooking time, temperature (${sheet.tempFormatted}), flip mark (${sheet.flipAtMinutes} mins), ${sheet.internalTempTargetFormatted ? `, and internal target temp (${sheet.internalTempTargetFormatted})` : ''} for ${sheet.food}. Verified on real hardware. Zero fluff.`;

  const url = absoluteUrl(`/how-long/${sheet.appliance}/${sheet.foodSlug}`);

  return {
    title,
    description,
    keywords: sheet.keywords,
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

  const applianceName = sheet.appliance.replace('-', ' ');
  const pageUrl = absoluteUrl(`/how-long/${sheet.appliance}/${sheet.foodSlug}`);
  const steps = getStepCopy(sheet);
  const extraContent = getDatasheetContent(sheet);

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'How Long to Cook', path: '/how-long' },
    { name: sheet.food, path: `/how-long/${sheet.appliance}/${sheet.foodSlug}` },
  ]);

  const totalMinutes = sheet.appliance === 'instant-pot' && sheet.restMinutes > 0
    ? sheet.timeMaxMinutes + sheet.restMinutes
    : sheet.timeMaxMinutes;

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How Long to Cook ${sheet.food} in the ${applianceName}`,
    description: `Verified cook time and temperature guide for ${sheet.food} in the ${applianceName}. ${sheet.tempFormatted}, ${sheet.timeFormatted}${sheet.internalTempTargetFormatted ? `, internal target ${sheet.internalTempTargetFormatted}` : ''}.`,
    url: pageUrl,
    image: [absoluteUrl('/opengraph-image.png')],
    totalTime: `PT${totalMinutes}M`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Preheat & Prep',
        text: steps.prep,
      },
      {
        '@type': 'HowToStep',
        name: steps.cookTitle,
        text: steps.cook,
      },
      {
        '@type': 'HowToStep',
        name: 'Check & Rest',
        text: steps.rest,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: extraContent.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 text-ink font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
      <section className="bg-paper-card border border-hairline p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted uppercase">
          <span className="px-2.5 py-1 bg-paper border border-hairline font-bold text-ink">
            {sheet.appliance}
          </span>
          <span className="px-2.5 py-1 bg-paper border border-hairline">
            STATE: {sheet.state.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
            VERIFIED DATASHEET
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink uppercase font-sans">
            How Long to Cook {sheet.food} in the {applianceName}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Specification: <strong>{sheet.cutOrPrep}</strong>
          </p>
        </div>

        {/* Big Numbers Grid with Lean 5S Visual Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <LeanSpecBadge
            type="temp"
            label="Target Temp"
            value={sheet.tempFormatted}
            sub={HEAT_METHOD[sheet.appliance] ?? 'Heat'}
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
            value={sheet.internalTempTargetFormatted ?? '—'}
            sub="USDA Safe Pull"
          />
        </div>

        {sheet.releaseMethod && (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs uppercase">
            <Clock className="w-4 h-4 shrink-0" />
            <span><strong>Release:</strong> {releaseLabel(sheet.releaseMethod)}{sheet.pressureMinutes != null ? ` (${sheet.pressureMinutes} min pressure + ${sheet.restMinutes} min release)` : ''}</span>
          </div>
        )}

        {/* Live-cook companion entry point */}
        <div className="flex flex-wrap items-center justify-between gap-3 border border-hairline bg-paper p-4">
          <div className="space-y-0.5">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">COOK MODE</div>
            <div className="text-xs font-mono text-ink-muted uppercase">
              Live timer · flip prompt · target temp · rest stage
            </div>
          </div>
          <StartCookButton appliance={sheet.appliance} foodSlug={sheet.foodSlug} />
        </div>

        {/* Thermal Science & Equipment Calibration Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-paper border border-hairline space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
              <Thermometer className="w-4 h-4" />
              <span>Thermal Dynamics &amp; Chemistry</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {extraContent.thermalScience}
            </p>
          </div>

          <div className="p-5 bg-paper border border-hairline space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink">
              <Zap className="w-4 h-4 text-accent" />
              <span>Hardware Calibration Protocol</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {extraContent.equipmentCalibration}
            </p>
          </div>
        </div>

        {extraContent.pasteurizationLethality && (
          <div className="p-4 bg-paper-card border-l-2 border-accent text-xs font-mono text-ink space-y-1">
            <div className="font-bold uppercase tracking-wider text-[11px]">USDA FSIS Pathogen Lethality Kinetics:</div>
            <p className="font-sans text-xs text-ink-muted leading-relaxed">
              {extraContent.pasteurizationLethality}
            </p>
          </div>
        )}

        {/* Execution Directions */}
        <div className="space-y-4 font-sans text-sm">
          <h2 className="text-base font-bold uppercase tracking-tight text-ink font-mono border-b border-hairline pb-2">
            3-Step Execution Protocol
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-paper border border-hairline">
              <span className="w-5 h-5 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="block text-ink">Preheat &amp; Prep</strong>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  {steps.prep}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-paper border border-hairline">
              <span className="w-5 h-5 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="block text-ink">{steps.cookTitle}</strong>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  {steps.cook}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-paper border border-hairline">
              <span className="w-5 h-5 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="block text-ink">Check &amp; Rest</strong>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  {steps.rest}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sensory Doneness Checkpoints */}
        <div className="border border-hairline bg-paper p-5 space-y-3">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
            <Eye className="w-4 h-4" />
            <span>Sensory Doneness Checkpoints</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <strong className="block text-ink uppercase text-[11px]">Visual Cue:</strong>
              <p className="text-ink-muted font-sans text-xs mt-0.5">{extraContent.sensoryCues.visual}</p>
            </div>
            <div>
              <strong className="block text-ink uppercase text-[11px]">Tactile / Texture:</strong>
              <p className="text-ink-muted font-sans text-xs mt-0.5">{extraContent.sensoryCues.auditoryOrTactile}</p>
            </div>
          </div>
          {extraContent.restingPhysics && (
            <div className="pt-2 border-t border-hairline font-sans text-xs text-ink-muted">
              <strong className="text-ink font-mono uppercase">Resting Physics: </strong>
              {extraContent.restingPhysics}
            </div>
          )}
        </div>

        {/* Field Notes — individually authored, food-specific detail beyond
            the appliance-level/food-category defaults above. Only renders
            when a record actually has this content. */}
        {(extraContent.additionalEquipmentNotes.length > 0 || extraContent.additionalSensoryCues.length > 0) && (
          <div className="border border-hairline bg-paper p-5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
              <CheckCircle2 className="w-4 h-4" />
              <span>Field Notes for {sheet.food}</span>
            </div>
            {extraContent.additionalEquipmentNotes.length > 0 && (
              <div className="space-y-2">
                <strong className="block text-ink uppercase text-[11px] font-mono">Setup &amp; Equipment</strong>
                <ul className="space-y-1.5">
                  {extraContent.additionalEquipmentNotes.map((note, i) => (
                    <li key={i} className="text-xs sm:text-sm text-ink-muted leading-relaxed flex gap-2">
                      <span className="text-accent shrink-0">—</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {extraContent.additionalSensoryCues.length > 0 && (
              <div className="space-y-2">
                <strong className="block text-ink uppercase text-[11px] font-mono">Additional Doneness Checkpoints</strong>
                <ul className="space-y-1.5">
                  {extraContent.additionalSensoryCues.map((cue, i) => (
                    <li key={i} className="text-xs sm:text-sm text-ink-muted leading-relaxed flex gap-2">
                      <span className="text-accent shrink-0">—</span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Failure Modes & Troubleshooting */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-accent">
            <AlertTriangle className="w-4 h-4" />
            <span>Critical Failure Modes &amp; Fixes</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            {extraContent.failureModes.map((fm, i) => (
              <div key={i} className="p-3 bg-paper border border-hairline space-y-1.5">
                <strong className="block text-red-900 font-sans text-xs font-bold uppercase">{fm.mistake}</strong>
                <p className="text-ink-muted font-sans text-[11px]">{fm.consequence}</p>
                <div className="text-[11px] text-emerald-900 bg-emerald-50 border border-emerald-200 p-1.5 font-mono">
                  <strong>Fix:</strong> {fm.prevention}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Verification Box */}
        <div className="bg-paper p-4 border border-hairline font-mono text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold uppercase text-ink">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Verification Basis &amp; Testing Rig</span>
          </div>
          <p className="text-xs text-ink-muted font-sans">
            {sheet.verificationBasis}
          </p>
          <div className="pt-2 border-t border-hairline text-[11px] text-ink-subtle">
            <strong>Pro Tip:</strong> {sheet.proTip}
          </div>
        </div>

        {/* Related Full Recipe Link */}
        {sheet.relatedRecipeSlug && (
          <div className="border-t border-hairline pt-4 flex items-center justify-between font-mono text-xs">
            <span className="text-ink-muted">Want the complete meal with seasoning &amp; sides?</span>
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

      {/* Targeted Datasheet FAQs */}
      <section className="border-t border-ink pt-8 space-y-6">
        <h2 className="text-[22px] font-extrabold uppercase tracking-tight">
          Frequently Asked Questions About Cooking {sheet.food}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {extraContent.faqs.map((faq, i) => (
            <div key={i} className="border-b border-hairline pb-4 space-y-1.5">
              <h3 className="font-bold text-[16px] text-ink">
                {faq.q}
              </h3>
              <p className="text-[14px] leading-[1.6] text-ink-muted">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* More Cook-Time Datasheets for this appliance */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-tight text-ink font-mono">
          Related {applianceName} Cook Times
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
                className="p-3 bg-paper-card border border-hairline hover:border-ink transition-colors flex flex-col justify-between"
              >
                <div className="font-bold text-ink text-xs font-sans mb-1">
                  {other.food}
                </div>
                <div className="flex justify-between text-[11px] text-ink-muted border-t border-hairline pt-2 mt-2">
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
