import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import PrintButton from '@/components/PrintButton';
import DinnerSyncTimeline from '@/components/tools/DinnerSyncTimeline';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbs';

export const metadata: Metadata = {
  title: 'Multi-Appliance Dinner Sync Timeline — Reverse Cook Orchestrator',
  description: 'Reverse-engineer your dinner prep timeline so the air fryer protein, oven roasted vegetables, and stovetop carbs all finish hot at the exact same minute.',
  alternates: {
    canonical: absoluteUrl('/dinner-sync'),
  },
};

const FAQ_ENTRIES = [
  {
    q: 'What is the Critical Path Method (CPM) in dinner timing?',
    a: 'The Critical Path Method (CPM) is an operations management technique that identifies the longest sequential chain of dependent activities required to complete dinner. For example, if roasted baby potatoes require 10 minutes of parboiling plus 35 minutes of roasting (45 minutes total), while seared salmon requires only 8 minutes in a skillet, the potatoes represent the critical path. Cooking start times are calculated backward from target dinner time (T=0) based on this critical constraint.',
  },
  {
    q: 'Why should resting time be built directly into the cooking schedule?',
    a: 'Whole muscle cuts (steaks, pork chops, chicken breasts) must rest for 5 to 10 minutes before slicing to allow contracted muscle fibers to relax and reabsorb liquid juices. If a steak is scheduled to finish cooking at T=0, it will either be sliced immediately (causing a pool of lost juice and dry meat) or eaten cold while the cook waits for sides. Scheduling the protein to pull from heat at T-10m aligns its resting curve perfectly with the final minute of stovetop sides.',
  },
  {
    q: 'Which side dishes hold temperature well and which must be served immediately?',
    a: 'Thermal mass and moisture sensitivity dictate holding endurance. Dense starches like mashed potatoes, rice in a closed cooker, or braised greens retain heat exceptionally well (15–30 minute holding buffer under foil or lid). Conversely, high-surface-area crispy foods like roasted broccoli, air-fried fries, or sautéed asparagus lose crispness within 3 minutes as internal steam softens the dehydrated outer skin; they must finish in the final 2 minutes of the timeline.',
  },
  {
    q: 'How should preheat lead times be factored into a multi-appliance meal?',
    a: 'Ovens require 15 to 20 minutes to reach 425°F (218°C), while compact air fryers require only 3 to 4 minutes. A common failure mode is prepping vegetables and placing them in an unheated oven, which boils veggies rather than roasting them. In an engineered reverse schedule, oven preheat is triggered at T-60m so the steel chassis and baking stone achieve radiant equilibrium before food enters.',
  },
  {
    q: 'How do you prevent stovetop pan sauces from breaking while plating other dishes?',
    a: 'Pan sauces (like garlic pan reductions or pan gravies) should be simmered to the nappe stage, then pulled from direct flame and mounted with cold cubed butter (monter au beurre) just 60 seconds before plating. If kept on a warm burner, residual heat will boil the emulsion, separating clear butterfat from the savory reduction.',
  },
];

export default function DinnerSyncPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Tools', path: '/tools' },
    { name: 'Multi-Appliance Dinner Sync Timeline', path: '/dinner-sync' },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Multi-Appliance Dinner Sync Timeline',
    url: absoluteUrl('/dinner-sync'),
    description: 'Reverse timeline cooking scheduler to synchronize multiple dishes and appliances.',
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
          label="PRINT SCHEDULE"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-paper-card hairline-border hover:border-ink uppercase text-ink cursor-pointer font-mono text-xs"
        />
      </div>

      {/* Hero Header */}
      <section className="bg-paper-card hairline-border p-6 sm:p-10 space-y-3">
        <div className="micro-label text-accent">REVERSE-ENGINEERED TIMING &amp; CPM ORCHESTRATION</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
          The Two-Appliance Dinner Sync
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl font-sans">
          End cold sides and overcooked meats. Tell us what you are making and what time you want to eat; we calculate the military-precision countdown to start each appliance.
        </p>
      </section>

      {/* Interactive Tool Component */}
      <DinnerSyncTimeline />

      {/* Engineering Reference Guide: Operations Scheduling */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6 font-mono text-xs text-ink-muted">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent">OPERATIONS MANAGEMENT</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Kitchen Orchestration: Critical Path Logistics &amp; Thermal Decay
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              01. The Critical Path Lead
            </div>
            <p className="text-xs leading-relaxed">
              Identify the item with the highest non-negotiable cook duration plus prep time. That item defines the primary timeline anchor (T-start). Shorter cooking steps are nested inside this master window.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              02. Protein Resting Buffer
            </div>
            <p className="text-xs leading-relaxed">
              Steaks, roasted chickens, and pork loins require an mandatory 8-to-12 minute resting plateau. Schedule protein completion at $T-10m$, freeing the chef to finish fast stovetop pan sauces in the final minutes.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-paper hairline-border">
            <div className="font-bold font-mono text-ink text-xs uppercase text-accent">
              03. Crispy Side Synchronization
            </div>
            <p className="text-xs leading-relaxed">
              Air fryer vegetables and roasted potatoes suffer rapid moisture condensation (steam limpness) if held under foil. Schedule them to exit heat within 120 seconds of the dinner plate drop ($T-2m$).
            </p>
          </div>
        </div>

        <div className="p-4 bg-paper hairline-border space-y-2">
          <div className="font-bold text-ink uppercase text-[11px] font-mono">
            The Golden Rule of Staged Heat Recovery
          </div>
          <p className="font-sans text-xs leading-relaxed">
            Never open the main oven door within 10 minutes of loading roasted vegetables; door opening dumps up to 100°F of ambient heat and stalls the Maillard reaction. If reheating rolls or bread, slip them onto the bottom rack in the final 3 minutes without adjusting the thermostat.
          </p>
        </div>
      </section>

      {/* On-Page FAQs */}
      <section className="bg-paper hairline-border p-6 sm:p-8 space-y-6">
        <div className="border-b border-hairline pb-3">
          <div className="micro-label text-accent font-mono">E-E-A-T CULINARY OPERATIONS MANAGEMENT</div>
          <h2 className="text-xl font-bold uppercase text-ink font-sans">
            Frequently Asked Questions: Multi-Dish Dinner Timing
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
