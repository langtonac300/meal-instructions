import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import KidSplitter from '@/components/tools/KidSplitter';
import { KID_SPLIT_STRATEGIES } from '@/data/tools-data';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Picky Kid Meal Deconstructor — The Anti-Double-Cooking Blueprint',
  description: 'How to cook one delicious, flavorful dinner for adults while seamlessly plating a deconstructed, non-spicy, kid-approved version in 60 seconds without making two meals.',
  alternates: {
    canonical: absoluteUrl('/kid-split'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'Why do children reject mixed foods like casseroles, stews, and sauced stir-fries?',
    a: 'Children possess between 10,000 and 15,000 taste buds—nearly double the concentration per square millimeter of an adult tongue—making bitter, acidic, and astringent compounds exponentially more intense. Furthermore, young children exhibit evolutionary food neophobia; mixed dishes with heterogeneous textures (wet soggy vegetables touching crunchy meats under thick sauce) prevent visual threat appraisal. Plating components in separated compartments restores cognitive safety and autonomy.',
  },
  {
    q: 'How does deconstructed cooking eliminate short-order cooking?',
    a: 'Short-order cooking means preparing a secondary standalone meal (like hot dogs or frozen chicken tenders) when children refuse the adult dinner. Deconstructed cooking uses the exact same raw protein, starch, and vegetable components from the adult recipe, but physically pulls child portions aside 60 seconds prior to adding high-heat acid, chili flakes, heavy garlic, or compound emulsified sauces.',
  },
  {
    q: 'What is the "Corner Foil Dam" technique on sheet pans?',
    a: 'When roasting proteins and vegetables on a single half-sheet pan, fold an 18-inch piece of heavy-duty aluminum foil into a 1-inch raised perpendicular barrier separating one corner. Toss 80% of the ingredients in bold spices, garlic, or marinades on the main deck, while tossing the child’s corner with mild butter, olive oil, and light salt. Everything roasts at identical thermal rates without sauce cross-contamination.',
  },
  {
    q: 'Why is serving sauce in a side ramekin superior to tossing it over food?',
    a: 'Tactile control transforms dining psychology. Pouring sauce over food irreversibly alters texture and forces an all-or-nothing sensory commitment. Placing sauce in a small ramekin converts the interaction into self-directed play. Children can inspect, smell, lightly touch, or micro-dip their protein on their own timeline, systematically lowering sensory defensive thresholds.',
  },
  {
    q: 'What is the role of a "Safe Anchor Food" at dinner?',
    a: 'A safe anchor is a neutral, familiar staple food (such as white rice, buttered noodles, a roll, or sliced cucumbers) guaranteed to be accepted by the child. Including at least one anchor component on the plate removes starvation anxiety and dinner table power struggles, providing the caloric baseline needed for the child to explore new protein textures at their own pace.',
  },
];

export default function KidSplitPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Picky Kid Meal Deconstructor', path: '/kid-split' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Picky Kid Meal Deconstructor & Side-Car Splitter',
    url: absoluteUrl('/kid-split'),
    description: 'Deconstruction strategies to feed toddlers and adults from a single cooking session.',
    applicationCategory: 'CulinaryApplication',
    operatingSystem: 'All',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ENTRIES.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>
        <PrintButton
          label="PRINT BLUEPRINTS"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">ZERO SHORT-ORDER COOKING &amp; SENSORY AUTONOMY</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Picky Kid Deconstructor
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          You don&apos;t need to fry processed chicken nuggets when you want steak fajitas or spicy pasta. The exact 60-second pull-aside engineering steps to satisfy toddler sensory preferences from the same pan.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <KidSplitter />

      {/* SSR Static Reference Table for Search Engines */}
      <section className="bg-paper hairline-border p-6 space-y-4 font-mono text-xs">
        <div className="font-bold text-ink uppercase tracking-wider text-[11px] hairline-b pb-2">
          INDEXED DECONSTRUCTION PROTOCOLS ACROSS MEAL ARCHETYPES
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted text-[10px] uppercase">
                <th className="py-2">Meal Archetype</th>
                <th className="py-2">Adult Profile</th>
                <th className="py-2">Pull-Aside Checkpoint</th>
                <th className="py-2">Kid Bento Components</th>
                <th className="py-2">Dip Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {KID_SPLIT_STRATEGIES.map((s) => (
                <tr key={s.id} className="hover:bg-paper-card">
                  <td className="py-2.5 font-bold text-ink">{s.mealName}</td>
                  <td className="py-2.5 text-ink-muted text-[11px] max-w-[150px]">{s.adultFlavorProfile}</td>
                  <td className="py-2.5 font-bold text-accent text-[11px] max-w-[200px]">{s.deconstructStep}</td>
                  <td className="py-2.5 text-ink-muted text-[11px]">
                    <ul className="list-disc pl-3 space-y-0.5">
                      {s.kidBentoLayout.map((k, idx) => (
                        <li key={idx}>{k}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2.5 text-[11px]">{s.dipConversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Psychological & Physiological Reference Guide */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">PEDIATRIC SENSORY SCIENCE</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Sensory Biology: Taste Bud Density &amp; Textural Autonomy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              01. The Taste Bud Multiplier
            </div>
            <p className="text-xs leading-relaxed">
              Children possess up to 15,000 taste buds, including receptors on the throat and cheeks. Glucosinolates (bitter sulfur in broccoli/kale) and capsaicin (peppers) stimulate intense biological rejection designed to protect against toxic plants during evolutionary foraging.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              02. Visual Contamination Defense
            </div>
            <p className="text-xs leading-relaxed">
              Casseroles and one-pot stews trigger defense alarms because ingredients cannot be visually verified prior to mastication. Presenting foods in discrete bento compartments allows children to inspect textures, colors, and temperatures individually.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              03. The Division of Responsibility
            </div>
            <p className="text-xs leading-relaxed">
              Based on the Satter Division of Responsibility (sDOR): parents decide <em>what, when, and where</em> food is offered; children decide <em>whether and how much</em> to eat. Deconstructed plating eliminates power struggles by removing adult pressure.
            </p>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            The 4 Golden Separation Rules
          </div>
          <p className="font-sans text-xs leading-relaxed">
            1. <strong>Pull Early:</strong> Reserve protein/starch before acid, chili flakes, or emulsification.<br />
            2. <strong>Foil Barrier:</strong> Use a folded foil divider on sheet pans to bake mild and spiced batches simultaneously.<br />
            3. <strong>Dip, Don&apos;t Douse:</strong> Serve all dressings and sauces in side ramekins for tactical dipping.<br />
            4. <strong>The Safe Anchor:</strong> Always include one guaranteed carbohydrate or fruit anchor on the plate.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T PEDIATRIC NUTRITION PROTOCOLS</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Deconstructed Weeknight Cooking
          </h2>
        </div>

        <div className="space-y-6">
          {FAQ_ENTRIES.map((faq, i) => (
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

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
