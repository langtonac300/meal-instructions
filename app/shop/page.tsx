import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import MerchCatalog from '@/components/merch/MerchCatalog';
import CartDrawer from '@/components/merch/CartDrawer';
import { CartProvider } from '@/components/merch/CartContext';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Merch & Equipment Supply | Meal Instructions',
  description:
    'Over-engineered kitchen uniforms, Swiss culinary graphic tees, inverted cheatsheet aprons, and linen internal temp towels. Zero fluff.',
  alternates: { canonical: absoluteUrl('/shop') },
};

export default function ShopPage() {
  return (
    <CartProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-12">
        
        {/* Breadcrumb & Spec Status */}
        <div className="flex items-center justify-between text-xs font-mono text-ink-subtle">
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <span className="uppercase text-ink-muted">DOCUMENT // MERCHANDISE &amp; FIELD UNIFORMS</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="micro-label text-accent">SUPPLY &amp; GEAR DIVISION</div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink uppercase font-sans">
            Zero-Fluff Kitchen Uniforms &amp; Hardware
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
            Standard dad BBQ merchandise is full of clip-art pigs and cheesy puns. We built over-engineered Swiss technical datasheets, acoustic tong calibration schematics, and inverted cheatsheet aprons.
          </p>
        </div>

        {/* 3 Core Engineering Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-paper-card hairline-border space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-ink font-bold uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>1. Heavyweight Materials</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              6.5 oz / 220 GSM combed ring-spun cotton and 14 oz heavy duck canvas. No paper-thin polyester promotional blanks.
            </p>
          </div>

          <div className="p-4 bg-paper-card hairline-border space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-ink font-bold uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>2. Inverted Chef Geometry</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Aprons are printed 180° upside down on the hem. When you look down while searing meat, the temperature matrix is right-side up for you.
            </p>
          </div>

          <div className="p-4 bg-paper-card hairline-border space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-ink font-bold uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>3. Single-Ink Discharge</span>
            </div>
            <p className="text-ink-muted font-sans text-xs leading-relaxed">
              Crisp water-based discharge screenprints in #111111 ink and #F5F4F0 ground. Soft to the touch, zero plastic rubber peeling.
            </p>
          </div>
        </div>

        {/* Catalog Section */}
        <MerchCatalog />

        {/* Guarantee and Shipping FAQ Banner */}
        <div className="hairline-t pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-ink font-bold uppercase">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Domestic Dispatch</span>
            </div>
            <p className="text-ink-muted font-sans leading-relaxed">
              All orders over $60 ship free in North America. Packed in unbleached, 100% recyclable Kraft mailers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-ink font-bold uppercase">
              <RotateCcw className="w-4 h-4 text-emerald-700" />
              <span>Zero-Hassle Sizing Exchanges</span>
            </div>
            <p className="text-ink-muted font-sans leading-relaxed">
              If the cut isn&apos;t comfortable for kitchen duty, exchange for another size within 30 days. No paperwork loops.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-ink font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Single-Ink Longevity Guarantee</span>
            </div>
            <p className="text-ink-muted font-sans leading-relaxed">
              Discharge screenprinted graphics become part of the cotton fiber. Won&apos;t crack, peel, or stick in the dryer.
            </p>
          </div>
        </div>

        {/* Global Cart Slide-over */}
        <CartDrawer />

      </div>
    </CartProvider>
  );
}
