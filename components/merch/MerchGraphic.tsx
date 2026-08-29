'use client';

import React from 'react';
import Image from 'next/image';
import { MerchProduct } from '@/data/merch';

interface MerchGraphicProps {
  product: MerchProduct;
  viewMode: 'product' | 'model';
  className?: string;
  priority?: boolean;
}

export default function MerchGraphic({
  product,
  viewMode,
  className = '',
  priority = false,
}: MerchGraphicProps) {
  // If model view is selected and a distinct model photo exists, render it
  if (viewMode === 'model' && product.modelImage && product.modelImage !== product.productImage) {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src={product.modelImage}
          alt={`${product.title} - Authentic Field Fit`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  // Products with distinct physical photo assets:
  if (product.id === '01-skip-to-recipe') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/skip-to-recipe-tee.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '02-tongs-calibration') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/tongs-protocol-tee.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '11-internal-temp-chart') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/internal-temp-towel.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '14-calibrated-cook-hoodie') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/specification-hoodie.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '15-apron-cheatsheet-inverted') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/apron-cheatsheet-model.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '16-knuckle-radiation') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/knuckle-radiation-tee.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '17-smoker-lid-protocol') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/smoker-lid-protocol-tee.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '18-cast-iron-soap') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/cast-iron-soap-heresy-tee.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '19-costco-reserve') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/costco-reserve-tee.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '20-sniff-test-protocol') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/sniff-test-protocol-tee.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '21-caution-cones') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/resting-meat-caution-cones.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '22-smoke-alarm-stick') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/smoke-alarm-dismissal-stick.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '23-toddler-border-patrol') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/toddler-food-border-patrol.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  if (product.id === '24-tongs-compliance-counter') {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-paper ${className}`}>
        <Image
          src="/images/merch/tongs-compliance-counter.jpg"
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  // Bespoke Vector Graphic Mockups for all other individual items:
  // Each renders a unique, authentic high-contrast Swiss garment/hardware graphic!
  return (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center p-6 select-none ${className}`}>
      
      {/* 03: 6:15 PM Tuesday Recovery Flowchart Tee */}
      {product.id === '03-six-fifteen-pm' && (
        <div className="w-full h-full bg-[#181818] text-[#F5F4F0] p-5 flex flex-col justify-between font-mono hairline-border">
          <div className="flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-700 pb-2">
            <span>SPEC: 03-FLOWCHART</span>
            <span>CRISIS PROTOCOL</span>
          </div>
          <div className="space-y-2.5 my-auto text-center">
            <div className="px-2 py-1 bg-neutral-800 border border-neutral-600 text-[11px] font-bold uppercase">
              T-00:00 • 6:15 PM (KIDS SCREAMING)
            </div>
            <div className="text-neutral-500 text-xs">▼</div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-1.5 bg-neutral-900 border border-neutral-700">
                <span className="text-emerald-400 font-bold block">CHICKEN THAWED?</span>
                <span className="text-neutral-400 text-[9px]">400°F • 12 MIN</span>
              </div>
              <div className="p-1.5 bg-neutral-900 border border-neutral-700">
                <span className="text-amber-400 font-bold block">STILL FROZEN?</span>
                <span className="text-neutral-400 text-[9px]">400°F • 18 MIN</span>
              </div>
            </div>
            <div className="text-neutral-500 text-xs">▼</div>
            <div className="p-1.5 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[10px] font-bold uppercase">
              DINNER SERVED • 6:33 PM • PARENT SAVED
            </div>
          </div>
          <div className="text-[9px] text-neutral-500 text-center tracking-widest uppercase pt-2 border-t border-neutral-800">
            ZERO-FLUFF OPERATIONAL PROTOCOL
          </div>
        </div>
      )}

      {/* 04: The Truth Table Heavyweight Tee */}
      {product.id === '04-internal-temp-truth' && (
        <div className="w-full h-full bg-[#FAF9F6] text-[#111111] p-5 flex flex-col justify-between font-mono hairline-border">
          <div className="flex justify-between items-center text-[10px] text-neutral-500 border-b border-neutral-300 pb-2">
            <span className="font-bold">SPEC: 04-TRUTH-TABLE</span>
            <span>THERMAL FACTS</span>
          </div>
          <div className="my-auto space-y-2">
            <div className="text-center font-sans font-bold uppercase text-xs tracking-tight text-neutral-900">
              COLOR IS A LIE • TIME IS ESTIMATE
            </div>
            <div className="border border-neutral-900 divide-y divide-neutral-900 text-[10px]">
              <div className="grid grid-cols-3 p-1.5 bg-neutral-200 font-bold">
                <span>PROTEIN</span>
                <span className="text-center">USDA SAFE</span>
                <span className="text-right">CHEF PULL</span>
              </div>
              <div className="grid grid-cols-3 p-1.5">
                <span>RIBEYE / NY STRIP</span>
                <span className="text-center text-neutral-500">145°F</span>
                <span className="text-right font-bold text-emerald-800">130°F</span>
              </div>
              <div className="grid grid-cols-3 p-1.5">
                <span>PORK CHOP</span>
                <span className="text-center text-neutral-500">160°F</span>
                <span className="text-right font-bold text-emerald-800">145°F</span>
              </div>
              <div className="grid grid-cols-3 p-1.5">
                <span>CHICKEN THIGH</span>
                <span className="text-center text-neutral-500">165°F</span>
                <span className="text-right font-bold text-emerald-800">175°F (JUICY)</span>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-neutral-600 text-center tracking-widest uppercase pt-2 border-t border-neutral-300">
            INTERNAL PROBE IS THE ONLY TRUTH
          </div>
        </div>
      )}

      {/* 05: Minimum Dirty Dishes Architecture Tee */}
      {product.id === '05-minimum-dirty-dishes' && (
        <div className="w-full h-full bg-[#F4F3EE] text-[#111111] p-5 flex flex-col justify-between font-mono hairline-border">
          <div className="flex justify-between items-center text-[10px] text-neutral-500 border-b border-neutral-300 pb-2">
            <span className="font-bold">SPEC: 05-ONE-PAN</span>
            <span>SINK OPTIMIZATION</span>
          </div>
          <div className="my-auto space-y-3 text-center">
            <div className="w-24 h-24 mx-auto border-2 border-neutral-900 rounded-full flex flex-col items-center justify-center p-2 relative">
              <span className="text-2xl font-black font-sans">1.0</span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-600">PAN MAX</span>
              <div className="absolute -top-1 px-1.5 bg-[#F4F3EE] text-[8px] font-bold">CONSTRAINT</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase font-sans">MINIMUM DIRTY DISHES</div>
              <div className="text-[10px] text-neutral-600">
                1 SKILLET // 1 SHEET PAN // 1 BASKET
              </div>
            </div>
          </div>
          <div className="text-[9px] text-neutral-500 text-center tracking-widest uppercase pt-2 border-t border-neutral-300">
            ZERO SINK CONGESTION ARCHITECTURE
          </div>
        </div>
      )}

      {/* 06: Smoke Detector Warning Tee */}
      {product.id === '06-smoke-detector-timer' && (
        <div className="w-full h-full bg-[#1A1A1A] text-[#F5F4F0] p-5 flex flex-col justify-between font-mono hairline-border">
          <div className="flex justify-between items-center text-[10px] text-amber-400 border-b border-neutral-700 pb-2">
            <span>SPEC: 06-ACOUSTIC-ALARM</span>
            <span>WARNING</span>
          </div>
          <div className="my-auto space-y-3 text-center">
            <div className="w-16 h-16 mx-auto border-2 border-amber-500 rotate-45 flex items-center justify-center">
              <span className="text-xl font-bold -rotate-45 text-amber-400">⚠️</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold font-sans uppercase text-amber-400">
                NOT A KITCHEN TIMER
              </div>
              <p className="text-[10px] text-neutral-400 leading-tight">
                THE CEILING SMOKE DETECTOR IS AN EMERGENCY LIFE SAFETY DEVICE.
              </p>
            </div>
          </div>
          <div className="text-[9px] text-neutral-500 text-center tracking-widest uppercase pt-2 border-t border-neutral-800">
            OPEN A WINDOW BEFORE SEARING STEAK
          </div>
        </div>
      )}

      {/* 07: Do Not Touch For 8 Minutes Tee */}
      {product.id === '07-dad-pro-tip' && (
        <div className="w-full h-full bg-[#FAF9F6] text-[#111111] p-5 flex flex-col justify-between font-mono hairline-border">
          <div className="flex justify-between items-center text-[10px] text-neutral-500 border-b border-neutral-300 pb-2">
            <span className="font-bold">SPEC: 07-REST-TIMER</span>
            <span>DAD PRO TIP</span>
          </div>
          <div className="my-auto space-y-2 text-center">
            <div className="text-3xl font-black font-sans tracking-tight">
              08:00
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent font-sans">
              DO NOT TOUCH THE STEAK
            </div>
            <p className="text-[10px] text-neutral-600 max-w-[200px] mx-auto leading-tight">
              Intramuscular pressure stabilization in progress. Cutting now loses 18% moisture.
            </p>
          </div>
          <div className="text-[9px] text-neutral-500 text-center tracking-widest uppercase pt-2 border-t border-neutral-300">
            STEP AWAY FROM THE CUTTING BOARD
          </div>
        </div>
      )}

      {/* 08: 400°F / 14 MIN / FLIP AT 7 Tee */}
      {product.id === '08-air-fryer-400' && (
        <div className="w-full h-full bg-[#111111] text-[#F5F4F0] p-5 flex flex-col justify-between font-mono hairline-border">
          <div className="flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-800 pb-2">
            <span>SPEC: 08-CONSTANT</span>
            <span>THERMODYNAMIC BASE</span>
          </div>
          <div className="my-auto space-y-1.5 text-center">
            <div className="text-4xl font-black font-sans tracking-tighter text-white">
              400°F
            </div>
            <div className="text-xl font-bold tracking-tight text-neutral-300 font-sans">
              14 MINUTES
            </div>
            <div className="text-xs font-bold text-accent uppercase tracking-widest">
              FLIP AT 7 MIN
            </div>
            <div className="text-[9px] text-neutral-400 pt-1">
              SOLVES 82% OF DOMESTIC DINNER EMERGENCIES
            </div>
          </div>
          <div className="text-[9px] text-neutral-500 text-center tracking-widest uppercase pt-2 border-t border-neutral-800">
            THE UNIVERSAL CULINARY CONSTANT
          </div>
        </div>
      )}

      {/* 09: HTTP 200 /llms.txt Architecture Tee */}
      {product.id === '09-llms-txt-spec' && (
        <div className="w-full h-full bg-[#14181B] text-[#E0E6ED] p-5 flex flex-col justify-between font-mono text-[10px] hairline-border">
          <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2 text-[9px]">
            <span>GET /llms.txt</span>
            <span className="text-emerald-400 font-bold">HTTP 200 OK</span>
          </div>
          <div className="my-auto space-y-1.5 font-mono text-[10px] leading-relaxed">
            <div className="text-neutral-500"># Meal Instructions LLM Scraper Manifest</div>
            <div className="text-neutral-300">&gt; User-Agent: AI-Crawler / Perplexity / Claude</div>
            <div className="text-neutral-300">&gt; JS-Hydration: false</div>
            <div className="text-neutral-300">&gt; Blog-Stories: 0 (REDACTED)</div>
            <div className="p-1.5 bg-neutral-900 border border-neutral-800 text-emerald-300 text-[9px]">
              Content-Type: text/markdown; charset=utf-8
            </div>
          </div>
          <div className="text-[8px] text-neutral-500 text-center tracking-widest uppercase pt-2 border-t border-neutral-800">
            PURE MARKDOWN • ZERO CLIENT SCRIPTS
          </div>
        </div>
      )}

      {/* 10: Meat Math: Rest Time Ratio Tee */}
      {product.id === '10-meat-math-ratio' && (
        <div className="w-full h-full bg-[#FAF9F6] text-[#111111] p-5 flex flex-col justify-between font-mono hairline-border">
          <div className="flex justify-between items-center text-[10px] text-neutral-500 border-b border-neutral-300 pb-2">
            <span className="font-bold">SPEC: 10-EQUATION</span>
            <span>MEAT MATH</span>
          </div>
          <div className="my-auto space-y-2 text-center">
            <div className="p-2.5 bg-neutral-100 border border-neutral-900 text-xs font-bold">
              t_rest = t_cook × 0.20
            </div>
            <div className="text-[10px] text-neutral-600">
              WHERE t_rest ≥ 8.0 MIN
            </div>
            <div className="text-[9px] text-neutral-500">
              ΔP(center → edge) = 0 @ equilibrium
            </div>
          </div>
          <div className="text-[9px] text-neutral-500 text-center tracking-widest uppercase pt-2 border-t border-neutral-300">
            THERMODYNAMICS OVER SUPERSTITION
          </div>
        </div>
      )}

      {/* 12: Parametric Fridge Magnet */}
      {product.id === '12-kitchen-param-magnet' && (
        <div className="w-full h-full bg-[#E5E5E5] text-[#111111] p-4 flex flex-col justify-between font-mono shadow-md border-2 border-neutral-400">
          <div className="flex justify-between items-center text-[9px] border-b border-neutral-400 pb-1 font-bold">
            <span>HEAVY GAUGE MAGNET</span>
            <span>3.0&quot; × 4.0&quot;</span>
          </div>
          <div className="my-auto grid grid-cols-2 gap-1.5 text-[9px]">
            <div className="p-1 bg-white border border-neutral-300">
              <div className="font-bold text-[8px] text-accent">AIR FRYER THIGHS</div>
              <div>380°F • 22 MIN</div>
            </div>
            <div className="p-1 bg-white border border-neutral-300">
              <div className="font-bold text-[8px] text-accent">SALMON FILLET</div>
              <div>400°F • 9 MIN</div>
            </div>
            <div className="p-1 bg-white border border-neutral-300">
              <div className="font-bold text-[8px] text-accent">FROZEN BURGER</div>
              <div>375°F • 14 MIN</div>
            </div>
            <div className="p-1 bg-white border border-neutral-300">
              <div className="font-bold text-[8px] text-accent">CRISPY BROCCOLI</div>
              <div>390°F • 8 MIN</div>
            </div>
          </div>
          <div className="text-[8px] text-center text-neutral-600 uppercase font-bold pt-1 border-t border-neutral-400">
            FRIDGE MOUNT QUICK REFERENCE
          </div>
        </div>
      )}

      {/* 13: Master Smoke Point Blueprint Print */}
      {product.id === '13-master-smoke-point-print' && (
        <div className="w-full h-full bg-[#18232C] text-[#E5F0F8] p-4 flex flex-col justify-between font-mono text-[9px] border-2 border-neutral-600 shadow-lg">
          <div className="flex justify-between items-center text-cyan-400 border-b border-cyan-800 pb-1">
            <span className="font-bold">LIPID SMOKE MATRIX</span>
            <span>A3 BLUEPRINT</span>
          </div>
          <div className="my-auto space-y-1 text-[8px]">
            <div className="flex justify-between items-center">
              <span>AVOCADO OIL</span>
              <span className="font-bold text-cyan-300">520°F (MAX SEAR)</span>
            </div>
            <div className="w-full h-1 bg-neutral-800 rounded"><div className="w-[95%] h-full bg-cyan-400" /></div>
            <div className="flex justify-between items-center pt-0.5">
              <span>GHEE (CLARIFIED)</span>
              <span className="font-bold text-cyan-300">485°F</span>
            </div>
            <div className="w-full h-1 bg-neutral-800 rounded"><div className="w-[85%] h-full bg-cyan-400" /></div>
            <div className="flex justify-between items-center pt-0.5">
              <span>BEEF TALLOW</span>
              <span className="font-bold text-cyan-300">420°F</span>
            </div>
            <div className="w-full h-1 bg-neutral-800 rounded"><div className="w-[70%] h-full bg-cyan-400" /></div>
            <div className="flex justify-between items-center pt-0.5">
              <span>EXTRA VIRGIN OLIVE</span>
              <span className="font-bold text-amber-400">375°F (DRESSING)</span>
            </div>
            <div className="w-full h-1 bg-neutral-800 rounded"><div className="w-[50%] h-full bg-amber-400" /></div>
          </div>
          <div className="text-[7px] text-center text-cyan-500 uppercase tracking-widest pt-1 border-t border-cyan-900">
            MUSEUM ARCHIVAL GICLÉE • 250 GSM
          </div>
        </div>
      )}

    </div>
  );
}
