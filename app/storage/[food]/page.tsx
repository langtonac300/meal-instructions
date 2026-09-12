import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, AlertTriangle, Snowflake, Thermometer, CheckCircle2, Flame, Clock } from 'lucide-react';
import { FOOD_STORAGE_DATASHEETS } from '@/data/food-storage';
import type { StorageLocation, FoodStorageCategory } from '@/lib/types';
import { absoluteUrl } from '@/lib/site';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

const LOCATION_LABELS: Record<StorageLocation, string> = {
  fridge: 'Refrigerator',
  freezer: 'Freezer',
  counter: 'Counter / Room Temp',
  pantry: 'Pantry',
};

const LOCATION_ICONS: Record<StorageLocation, React.ReactNode> = {
  fridge: <Thermometer className="w-5 h-5 text-blue-600" />,
  freezer: <Snowflake className="w-5 h-5 text-cyan-600" />,
  counter: <Thermometer className="w-5 h-5 text-amber-600" />,
  pantry: <Thermometer className="w-5 h-5 text-orange-600" />,
};

const PATHOGEN_PROFILES: Record<FoodStorageCategory, { primaryPathogen: string; dangerMechanism: string; prevention: string }> = {
  poultry: {
    primaryPathogen: 'Salmonella enterica & Campylobacter jejuni',
    dangerMechanism: 'Rapid cellular proliferation in raw tissue; cross-contamination via surface fluid exudate (purge).',
    prevention: 'Maintain strict 34°F–38°F refrigeration; store raw poultry on lowest shelf; reheat cooked meat to 165°F core.',
  },
  beef: {
    primaryPathogen: 'Shiga toxin-producing E. coli (STEC) & Clostridium perfringens',
    dangerMechanism: 'Surface colonization on whole cuts; internal cross-sectional dispersion in ground beef during mechanical grinding.',
    prevention: 'Sear whole steaks to pasteurize exterior surfaces; cook ground beef to 160°F; chill bulk cooked beef rapidly in shallow pans.',
  },
  pork: {
    primaryPathogen: 'Yersinia enterocolitica & Listeria monocytogenes (deli meats)',
    dangerMechanism: 'Psychrotrophic survival enabling replication even under cold refrigeration temperatures below 40°F.',
    prevention: 'Consume opened deli meats within 3–5 days; cook whole pork cuts to 145°F with 3-minute resting dwell time.',
  },
  seafood: {
    primaryPathogen: 'Vibrio parahaemolyticus & Histamine (Scombroid) toxicity',
    dangerMechanism: 'Endogenous histidine enzymatic breakdown into heat-stable histamine if pelagic fish warm above 40°F.',
    prevention: 'Store fresh fish directly on crushed ice in sealed leakproof vessels; consume raw or cooked seafood within 24–48 hours.',
  },
  'grains-pasta': {
    primaryPathogen: 'Bacillus cereus (Emetic & Diarrheal enterotoxins)',
    dangerMechanism: 'Heat-resistant endospores survive boiling water; germinating cells produce heat-stable cereulide toxin in warm starch.',
    prevention: 'Never leave cooked rice or pasta at room temperature for > 1 hour; cool rapidly in single-layer pans and refrigerate under 40°F.',
  },
  'dairy-eggs': {
    primaryPathogen: 'Salmonella enteritidis & Listeria monocytogenes',
    dangerMechanism: 'Transovarian contamination inside eggshells; psychrotrophic colonization of high-moisture unpasteurized soft cheeses.',
    prevention: 'Keep whole eggs in original carton on interior refrigerator shelves (not the warmer door); discard cracked eggs.',
  },
  'prepared-foods': {
    primaryPathogen: 'Staphylococcus aureus enterotoxins & Clostridium perfringens',
    dangerMechanism: 'Slow cooling of dense stews/soups creates anaerobic warm zones between 110°F and 130°F where spores double every 10 minutes.',
    prevention: 'Execute the Two-Stage Cooling Protocol: drop from 140°F to 70°F within 2 hours, then to 40°F within 4 hours using ice baths or shallow pans.',
  },
  produce: {
    primaryPathogen: 'Norovirus, Cyclospora cayetanensis & Listeria',
    dangerMechanism: 'Surface bio-film adhesion from agricultural wash water or soil contact; moisture condensation accelerating mold decay.',
    prevention: 'Store unwashed in ventilated containers with paper towel moisture absorbers; wash thoroughly under running water immediately before consumption.',
  },
};

interface StoragePageProps {
  params: Promise<{ food: string }>;
}

export async function generateStaticParams() {
  return FOOD_STORAGE_DATASHEETS.map((item) => ({
    food: item.slug,
  }));
}

export async function generateMetadata({ params }: StoragePageProps): Promise<Metadata> {
  const { food } = await params;
  const sheet = FOOD_STORAGE_DATASHEETS.find((d) => d.slug === food);

  if (!sheet) {
    return { title: 'Storage Guide Not Found' };
  }

  const fridgeTime = sheet.storageTimeframes.find((t) => t.location === 'fridge');
  const title = `How Long Does ${sheet.food} Last? (${fridgeTime?.formatted ?? 'Storage Guide'})`;
  const description = sheet.metaDescription;
  const url = absoluteUrl(`/storage/${sheet.slug}`);

  return {
    title,
    description,
    keywords: sheet.keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function StoragePage({ params }: StoragePageProps) {
  const { food } = await params;
  const sheet = FOOD_STORAGE_DATASHEETS.find((d) => d.slug === food);

  if (!sheet) {
    notFound();
  }

  const fridgeTime = sheet.storageTimeframes.find((t) => t.location === 'fridge');
  const freezerTime = sheet.storageTimeframes.find((t) => t.location === 'freezer');
  const pathogen = PATHOGEN_PROFILES[sheet.foodCategory] || PATHOGEN_PROFILES['prepared-foods'];

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Food Storage', path: '/storage' },
    { name: sheet.food, path: `/storage/${sheet.slug}` },
  ]);

  const faqList = [
    {
      q: `How long does ${sheet.food.toLowerCase()} last in the refrigerator?`,
      a: `${sheet.food} remains safe for ${fridgeTime?.formatted ?? 'standard shelf life'} in the refrigerator when held between ${fridgeTime?.tempRange ?? '34°F and 38°F'}. ${sheet.safetyNote}`,
    },
    ...(freezerTime
      ? [
          {
            q: `Can you freeze ${sheet.food.toLowerCase()} safely?`,
            a: `Yes. ${sheet.food} can be frozen for ${freezerTime.formatted} at ${freezerTime.tempRange}. Freezing halts microbial replication and enzymatic decomposition, though wrapping airtight in vapor-proof packaging is essential to prevent sublimation freezer burn.`,
          },
        ]
      : []),
    {
      q: `What are the primary signs that ${sheet.food.toLowerCase()} has spoiled?`,
      a: `Key spoilage indicators include: ${sheet.spoilageSigns.join(', ')}. If any of these sensory markers are present, discard immediately. Never taste suspect food to test for spoilage.`,
    },
    {
      q: `What is the correct core temperature for reheating ${sheet.food.toLowerCase()}?`,
      a: `Reheat all cooked leftovers to an internal core temperature of 165°F (74°C) verified with an instant-read digital thermometer. This ensures immediate 7-log10 destruction of vegetative foodborne pathogens. However, pre-formed bacterial toxins (like Staphylococcus enterotoxin) cannot be inactivated by reheating; if food was left in the Danger Zone over 2 hours, it must be discarded.`,
    },
    {
      q: `What is the optimal container for storing ${sheet.food.toLowerCase()}?`,
      a: `The recommended storage vessel is a ${sheet.containerType}. Minimizing headspace air contact reduces lipid oxidation, enzymatic degradation, and surface moisture evaporation.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((f) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
        <Link
          href="/storage"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Storage Guides</span>
        </Link>
        <span className="uppercase text-ink-muted">
          STORAGE DATASHEET // {sheet.id}
        </span>
      </div>

      {/* Main Header Card */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted uppercase">
          <span className="px-2.5 py-1 bg-paper hairline-border font-bold text-ink">
            {sheet.foodCategory}
          </span>
          <span className="px-2.5 py-1 bg-paper hairline-border">
            STATE: {sheet.state.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 hairline-border font-bold">
            USDA FOODKEEPER VERIFIED
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink font-sans uppercase">
            How Long Does {sheet.food} Last?
          </h1>
          <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
            Recommended containment: <strong className="text-ink">{sheet.containerType}</strong>
          </p>
        </div>

        {/* Storage Timeframe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sheet.storageTimeframes.map((tf) => (
            <div
              key={tf.location}
              className="bg-paper hairline-border p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                {LOCATION_ICONS[tf.location]}
                <span className="font-mono text-xs font-bold uppercase text-ink">
                  {LOCATION_LABELS[tf.location]}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-ink font-sans tracking-tight">
                {tf.formatted}
              </div>
              <div className="text-[11px] text-ink-muted font-mono">
                {tf.tempRange}
              </div>
              {tf.notes && (
                <div className="text-xs text-ink-muted font-sans pt-1 border-t border-hairline/60">
                  {tf.notes}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Best Storage Method */}
        <div className="bg-paper p-4 hairline-border space-y-2">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-ink">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Best Storage Protocol</span>
          </div>
          <p className="text-sm text-ink-muted font-sans leading-relaxed">
            {sheet.bestMethod}
          </p>
          <div className="text-xs text-ink-muted font-mono">
            Container Specification: <strong className="text-ink">{sheet.containerType}</strong>
          </div>
        </div>

        {/* Spoilage Signs */}
        <div className="bg-paper p-4 hairline-border space-y-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-ink">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Physical &amp; Sensory Spoilage Indicators</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sheet.spoilageSigns.map((sign, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-muted font-sans">
                <span className="text-amber-600 font-bold mt-0.5">×</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Note */}
        <div className="flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 text-red-900 font-mono text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
          <span><strong>Critical Safety Gate:</strong> {sheet.safetyNote}</span>
        </div>

        {/* Verification & Pro Tip */}
        <div className="bg-paper p-4 hairline-border font-mono text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold uppercase text-ink">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Authoritative Source &amp; Empirical Basis</span>
          </div>
          <p className="text-xs text-ink-muted font-sans">
            {sheet.verificationBasis}
          </p>
          <div className="pt-2 hairline-t text-[11px] text-ink-subtle">
            <strong>Pro Tip:</strong> {sheet.proTip}
          </div>
        </div>
      </section>

      {/* Pathogen Biophysics & Microbial Kinetics Guide */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">MICROBIOLOGICAL EPIDEMIOLOGY</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Pathogen Survival Dynamics &amp; Risk Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Primary Microbial Pathogens
            </div>
            <div className="text-sm font-bold text-ink">{pathogen.primaryPathogen}</div>
            <p className="text-xs text-ink-muted leading-relaxed pt-1">
              <strong>Proliferation Mechanism:</strong> {pathogen.dangerMechanism}
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              Laboratory Prevention Protocol
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              {pathogen.prevention}
            </p>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            The Two-Stage Cooling Protocol for Cooked Leftovers
          </div>
          <p className="font-sans text-xs leading-relaxed">
            Never place large, steaming stockpots or dense casseroles directly into the refrigerator. Trapped core heat sustains the 110°F–130°F spore germination window for up to 8 hours while warming adjacent shelf items. Execute the USDA two-stage protocol: (1) Cool from <strong>140°F down to 70°F within 2 hours</strong> by transferring into shallow containers (depth &le; 2 inches) or an ice bath; (2) Cool from <strong>70°F down to 40°F within an additional 4 hours</strong> under refrigeration.
          </p>
        </div>
      </section>

      {/* On-Page Frequently Asked Questions */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T FOOD SAFETY REFERENCE</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: {sheet.food} Storage &amp; Safety
          </h2>
        </div>

        <div className="space-y-6">
          {faqList.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-ink font-sans flex items-baseline gap-2">
                <span className="text-accent font-mono text-xs">0{i + 1}.</span>
                {faq.q}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Storage Guides */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-tight text-ink font-mono">
          Related Storage Guides in {sheet.foodCategory.toUpperCase()}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {FOOD_STORAGE_DATASHEETS.filter(
            (d) => d.foodCategory === sheet.foodCategory && d.id !== sheet.id
          )
            .slice(0, 6)
            .map((other) => {
              const otherFridge = other.storageTimeframes.find((t) => t.location === 'fridge');
              return (
                <Link
                  key={other.id}
                  href={`/storage/${other.slug}`}
                  className="p-3 bg-paper-card hairline-border hover:border-ink transition-colors flex flex-col justify-between"
                >
                  <div className="font-bold text-ink text-xs font-sans mb-1">
                    {other.food}
                  </div>
                  <div className="flex justify-between text-[11px] text-ink-muted hairline-t pt-2 mt-2">
                    <span>Fridge: {otherFridge?.formatted ?? '—'}</span>
                    <span className="uppercase">{other.state}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
