import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Zap, Flame } from 'lucide-react';
import { APPLIANCES } from '@/data/appliances';
import PrintButton from '@/components/PrintButton';

export const metadata: Metadata = {
  title: 'Air Fryer Temperature & Time Cheat Sheet // 1-Page Printable Guide',
  description:
    'Complete 1-page reference chart for air fryer cooking times and temperatures. Poultry, beef, pork, seafood, frozen snacks, and vegetables. Zero fluff.',
  keywords: [
    'air fryer cheat sheet',
    'air fryer cooking times chart',
    'printable air fryer temperature chart',
    'air fryer quick reference',
    'how long to cook in air fryer',
  ],
  alternates: {
    canonical: 'https://dadmeals.com/cheat-sheet',
  },
};

export default function CheatSheetPage() {
  const airFryerGuide = APPLIANCES.find((a) => a.slug === 'air-fryer')?.tempGuide || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
      {/* Breadcrumb & Print Action */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-muted border-b border-hairline pb-3 mb-8 no-print">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-accent transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO ALL MEALS</span>
        </Link>

        <PrintButton />
      </div>

      {/* Header */}
      <div className="border-b border-hairline pb-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
            MASTER REFERENCE SHEET // REFRIGERATOR MAGNET EDITION
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-ink uppercase tracking-tight">
          AIR FRYER TIME & TEMP CHEAT SHEET
        </h1>

        <p className="text-sm sm:text-base text-ink-muted font-sans mt-2 max-w-2xl">
          Keep this page open on your phone or print and tape it to the inside of your kitchen cabinet.
          Never Google &ldquo;how long do chicken tenders go in the air fryer&rdquo; again.
        </p>
      </div>

      {/* Master Grid Table */}
      <div className="overflow-hidden bg-paper-50 border border-hairline rounded-lg shadow-subtle font-mono text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-hairline bg-paper-200 text-[11px] uppercase tracking-widest text-ink font-bold">
              <th className="py-3.5 px-4">FOOD ITEM</th>
              <th className="py-3.5 px-4 text-accent">TEMP (°F / °C)</th>
              <th className="py-3.5 px-4">TOTAL TIME</th>
              <th className="py-3.5 px-4">SHAKE / FLIP MARK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {airFryerGuide.map((item, idx) => (
              <tr key={idx} className="hover:bg-paper-100/80 transition-colors">
                <td className="py-3 px-4 font-bold text-ink text-sm font-sans">{item.food}</td>
                <td className="py-3 px-4 font-bold text-accent">{item.temp}</td>
                <td className="py-3 px-4 font-bold text-ink">{item.time}</td>
                <td className="py-3 px-4 text-ink-muted">{item.shake}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4 Golden Dad Air Fryer Laws */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-paper-100 p-4 rounded border border-hairline">
          <span className="text-accent font-bold block mb-1">LAW 1: PREHEAT 2 MINS</span>
          <span className="text-ink-muted font-sans text-xs">
            A screaming hot basket sears food immediately upon contact and prevents breading from sticking.
          </span>
        </div>

        <div className="bg-paper-100 p-4 rounded border border-hairline">
          <span className="text-accent font-bold block mb-1">LAW 2: NEVER OVERCROWD</span>
          <span className="text-ink-muted font-sans text-xs">
            Trapped steam is the enemy of crunch. If food overlaps, cook in two quick batches.
          </span>
        </div>

        <div className="bg-paper-100 p-4 rounded border border-hairline">
          <span className="text-accent font-bold block mb-1">LAW 3: SHAKE AT 50%</span>
          <span className="text-ink-muted font-sans text-xs">
            Redistribute fries and nuggets halfway through so high-velocity convection air touches all sides.
          </span>
        </div>

        <div className="bg-paper-100 p-4 rounded border border-hairline">
          <span className="text-accent font-bold block mb-1">LAW 4: OIL SPRAY = CRUNCH</span>
          <span className="text-ink-muted font-sans text-xs">
            A quick mist of avocado or olive oil spray makes dry coatings turn golden and shatteringly crisp.
          </span>
        </div>
      </div>
    </div>
  );
}
