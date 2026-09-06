'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useScrollToTarget } from '@/lib/use-scroll-to-results';
import Link from 'next/link';
import Image from 'next/image';
import {
  Share2,
  Printer,
  Check,
  Copy,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import { Recipe, CookTimeDatasheet } from '@/lib/types';
import type { RecipeCostSummary } from '@/lib/ingredient-prices';
import { RECIPES } from '@/data/recipes';
import { formatScaledAmount, buildSmsShareText, recipeToMarkdown } from '@/lib/recipe-utils';
import { track } from '@/lib/analytics';
import { packHref } from '@/lib/print-pack-format';
import { householdServings, readProfile } from '@/lib/profile';

import KrogerCartPanel from '@/components/KrogerCartPanel';
import MealActions from '@/components/MealActions';
import PlanFab from '@/components/PlanFab';
import RecipeVideo from '@/components/RecipeVideo';
import type { ResolvedIngredient } from '@/lib/kroger/matches';
import type { RecipeVideo as RecipeVideoData } from '@/lib/recipe-video';

interface RecipeClientViewProps {
  recipe: Recipe;
  /** Absent when no store has been priced — the cell is then simply not shown. */
  cost?: RecipeCostSummary | null;
  /** Build-time Kroger product matches for this recipe's ingredients. */
  krogerIngredients?: ResolvedIngredient[];
  /** False when KROGER_CLIENT_ID is unset — the panel is hidden rather than
   *  rendering a button whose only outcome is a Kroger error page. */
  krogerEnabled?: boolean;
  /** False when SUPABASE_* is unset — the save/rate/suggest block is hidden
   *  rather than rendering controls whose only outcome is a 503. */
  mealsEnabled?: boolean;
  relatedDatasheets?: CookTimeDatasheet[];
  resolvedImage?: string;
  /** The recipe's curated clip, when data/recipe-videos.json has one. */
  video?: RecipeVideoData;
}

/** 'kid-approved' → 'Kid approved'; '15-minute' stays as written. */
function categoryLabel(slug: string): string {
  const words = slug.replace(/-/g, ' ');
  return /^\d/.test(slug) ? slug : words.charAt(0).toUpperCase() + words.slice(1);
}

/** "29 Aug 2026" — fixed locale so server and client render the same string. */
function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.14em] font-bold';
const SECTION_H2 = 'text-[30px] font-extrabold tracking-[-0.01em] uppercase text-ink leading-tight';
const COLUMN = 'max-w-[900px] mx-auto px-5 sm:px-10';

/**
 * Cell borders for the 2-up (mobile) / n-up (sm+) stat grids: hairline
 * dividers between cells, no outer padding on the row's first and last cell.
 */
function gridCell(i: number, n: number): string {
  const last = i === n - 1;
  return [
    'px-5 border-hairline',
    i === 0 ? 'pl-0' : '',
    last ? 'sm:pr-0' : 'sm:border-r',
    i % 2 === 0 && !last ? 'border-r' : '',
    i % 2 === 1 ? 'sm:pl-5' : '',
    i >= 2 ? 'border-t sm:border-t-0' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

interface SpecCell {
  key: string;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}

export default function RecipeClientView({
  recipe,
  relatedDatasheets = [],
  resolvedImage,
  cost = null,
  krogerIngredients = [],
  krogerEnabled = false,
  mealsEnabled = false,
  video,
}: RecipeClientViewProps) {
  // Mode state: syncs with document.documentElement's data-mode
  const [currentMode, setCurrentMode] = useState<'fast' | 'detailed'>('fast');
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1);
  const [copiedSms, setCopiedSms] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Cooking Timer State
  const initialSeconds = (recipe.quickVersion.timerMinutes || recipe.cookMinutes) * 60;
  const [timerSeconds, setTimerSeconds] = useState<number>(initialSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerFinished, setIsTimerFinished] = useState<boolean>(false);

  // The sticky mode/timer bar pins under the site header, whose height wraps
  // on narrow viewports. Read it rather than hardcoding 72px.
  const [headerHeight, setHeaderHeight] = useState(72);
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;
    const measure = () => setHeaderHeight(Math.round(header.getBoundingClientRect().height));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Default the portion scaler to the household. Deliberately post-hydration:
  // the SSR HTML must stay identical for every visitor (HR-6), and the ingredient
  // amounts are the only thing that moves. Runs once, and never fights a manual
  // choice because it only fires while the multiplier is still untouched.
  const portionsPrefilled = React.useRef(false);
  useEffect(() => {
    if (portionsPrefilled.current) return;
    portionsPrefilled.current = true;
    const servings = householdServings(readProfile());
    if (!servings) return;
    const next = servings / 4; // the scaler's options are 2/4/6/8 against a base of 4
    if ([0.5, 1, 1.5, 2].includes(next) && next !== 1) setPortionMultiplier(next);
  }, []);

  useEffect(() => {
    // Read existing data-mode stamped by head script
    const modeAttr = document.documentElement.getAttribute('data-mode');
    if (modeAttr === 'fast' || modeAttr === 'detailed') {
      setCurrentMode(modeAttr);
    }
  }, []);

  const handleModeChange = (newMode: 'fast' | 'detailed') => {
    if (newMode !== currentMode) {
      track('mode_switch', { mode: newMode, from: currentMode, recipe: recipe.slug });
    }
    setCurrentMode(newMode);
    document.documentElement.setAttribute('data-mode', newMode);
    // Triggered here rather than from an effect: the panel is roughly two
    // screens below this control, and firing on the click itself cannot be
    // cancelled by an unrelated re-render.
    revealPanels();
    try {
      localStorage.setItem('meal_instructions_mode', newMode);
      localStorage.setItem('recipe_mode', newMode);
      localStorage.setItem('dad_meals_recipe_mode', newMode);
    } catch (e) {}
  };

  // Offset clears the 72px header plus the sticky mode/timer bar (~68px)
  // pinned beneath it, with a little air.
  const [panelsRef, revealPanels] = useScrollToTarget<HTMLDivElement>({
    offset: headerHeight + 88,
  });

  // Web Audio Chime Sound Player
  const playTimerChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };
      playTone(523.25, 0.0, 0.3); // C5
      playTone(659.25, 0.2, 0.3); // E5
      playTone(783.99, 0.4, 0.5); // G5
    } catch (e) {}
  };

  // Timer interval countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsTimerFinished(true);
            playTimerChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => {
    if (isTimerFinished) {
      track('cook_start', {
        recipe: recipe.slug,
        minutes: Math.round(initialSeconds / 60),
        restart: true,
      });
      setTimerSeconds(initialSeconds);
      setIsTimerFinished(false);
      setIsTimerRunning(true);
    } else {
      const next = !isTimerRunning;
      track(next ? 'cook_start' : 'cook_pause', {
        recipe: recipe.slug,
        minutes: Math.round(initialSeconds / 60),
        remaining: timerSeconds,
      });
      setIsTimerRunning(next);
    }
  };

  // Guarded: the countdown sets isTimerFinished from inside a state updater,
  // which React invokes twice under StrictMode in development.
  const cookCompleteLogged = React.useRef(false);
  useEffect(() => {
    if (!isTimerFinished) {
      cookCompleteLogged.current = false;
      return;
    }
    if (cookCompleteLogged.current) return;
    cookCompleteLogged.current = true;
    track('cook_complete', { recipe: recipe.slug, minutes: Math.round(initialSeconds / 60) });
  }, [isTimerFinished, recipe.slug, initialSeconds]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsTimerFinished(false);
    setTimerSeconds(initialSeconds);
  };

  const formatTimerDisplay = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCopySms = async () => {
    const text = buildSmsShareText(recipe);
    try {
      await navigator.clipboard.writeText(text);
      track('recipe_share', { method: 'sms_copy', recipe: recipe.slug });
      setCopiedSms(true);
      setTimeout(() => setCopiedSms(false), 3000);
    } catch (err) {}
  };

  const handleCopyMd = async () => {
    const md = recipeToMarkdown(recipe);
    try {
      await navigator.clipboard.writeText(md);
      track('recipe_share', { method: 'llm_markdown', recipe: recipe.slug });
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 3000);
    } catch (err) {}
  };

  const toggleStepDone = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum],
    );
  };

  const relatedRecipes = useMemo(() => {
    return RECIPES.filter(
      (r) =>
        r.id !== recipe.id && (r.appliance === recipe.appliance || r.protein === recipe.protein),
    ).slice(0, 4);
  }, [recipe, cost]);

  // Spec row. Same fallback chain as the old Lean5SMatrix — internal temp →
  // flip → rest — and never an empty cell: only cells with a real value render.
  const specCells = useMemo<SpecCell[]>(() => {
    const cells: SpecCell[] = [
      {
        key: 'temp',
        label: 'Cook temp',
        value: `${recipe.cookTempF}°F`,
        sub: `${recipe.cookTempC}°C · preheat`,
      },
      {
        key: 'time',
        label: 'Total time',
        value: `${recipe.totalMinutes} min`,
        sub: [
          `${recipe.prepMinutes} prep`,
          `${recipe.cookMinutes} cook`,
          recipe.restMinutes ? `${recipe.restMinutes} rest` : null,
        ]
          .filter(Boolean)
          .join(' · '),
      },
    ];
    const flip = recipe.quickVersion.flipAtMinutes;
    if (flip) {
      cells.push({
        key: 'flip',
        label: 'Flip at',
        value: `${flip} min`,
        sub: `of ${recipe.quickVersion.timerMinutes} min cook`,
      });
    }
    if (recipe.safeInternalTempF) {
      cells.push({
        key: 'pull',
        label: 'Pull at',
        value: `${recipe.safeInternalTempF}°F`,
        sub: 'USDA safe minimum',
        accent: true,
      });
    }
    // Cost sits with the other hard numbers rather than in its own panel: it
    // is the same kind of fact as temp and time. The "+" in the value carries
    // the caveat, and `sub` says how many lines are behind it, so a partial
    // total can never read as a complete one.
    if (cost) {
      cells.push({
        key: 'cost',
        label: 'Cost / serving',
        value: cost.perServing,
        sub:
          cost.linesMissing > 0
            ? `${cost.total} for ${cost.servings} · ${cost.linesMissing} item${cost.linesMissing === 1 ? '' : 's'} unpriced`
            : `${cost.total} for ${cost.servings} servings`,
      });
    }
    if (cells.length < 4 && recipe.restMinutes) {
      cells.push({
        key: 'rest',
        label: 'Rest',
        value: `${recipe.restMinutes} min`,
        sub: 'Before slicing',
      });
    }
    return cells;
  }, [recipe]);

  const specCols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }[
    specCells.length as 2 | 3 | 4
  ];

  const servingOptions = [0.5, 1, 1.5, 2].map((val) => ({
    val,
    servings: Math.round(recipe.defaultServings * val),
  }));

  const hasImage = Boolean(resolvedImage ?? recipe.image);

  return (
    <div className="text-[17px] leading-[1.55] text-ink pb-16">
      {/* ── 1. Breadcrumb ── */}
      <div
        className={`${COLUMN} pt-6 flex items-center justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted no-print`}
      >
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>All recipes</span>
        </Link>
        <span>
          #{recipe.id} · {recipe.appliance.replace(/-/g, ' ')}
        </span>
      </div>

      {/* ── 2. Title block ── */}
      <header className={`${COLUMN} pt-7`}>
        <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase max-w-[22ch] print-url">
          {recipe.title}
        </h1>
        <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[56ch]">
          {recipe.tagline}
        </p>
        <div className="mt-[22px] flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[14px] text-ink-muted">
          {recipe.categories.map((cat, i) => (
            <React.Fragment key={cat}>
              {i > 0 && (
                <span className="text-hairline" aria-hidden="true">
                  ·
                </span>
              )}
              <Link href={`/categories/${cat}`} className="hover:text-accent transition-colors">
                {categoryLabel(cat)}
              </Link>
            </React.Fragment>
          ))}
          <span className="text-hairline" aria-hidden="true">
            ·
          </span>
          <span>{recipe.difficulty}</span>
          <span className="text-hairline" aria-hidden="true">
            ·
          </span>
          <span>Serves {recipe.defaultServings}</span>
        </div>
      </header>

      {/* ── 3. Spec row ── */}
      <div className={`${COLUMN} mt-8`}>
        <dl className={`grid grid-cols-2 ${specCols} border-t border-b border-ink`}>
          {specCells.map((cell, i) => (
            <div key={cell.key} className={`py-5 ${gridCell(i, specCells.length)}`}>
              <dt className={`${EYEBROW} ${cell.accent ? 'text-accent' : 'text-ink-subtle'}`}>
                {cell.label}
              </dt>
              <dd
                className={`mt-2 font-mono text-[30px] sm:text-[36px] font-black tracking-[-0.02em] leading-none ${
                  cell.accent ? 'text-accent' : 'text-ink'
                }`}
              >
                {cell.value}
              </dd>
              <dd className="mt-1 text-[14px] text-ink-muted">{cell.sub}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── 4. Photo + actions ── */}
      <div className={`${COLUMN} mt-8`}>
        {hasImage && (
          <div className="recipe-hero-image relative w-full h-[280px] sm:h-[420px] bg-paper-200 overflow-hidden">
            <Image
              src={resolvedImage ?? recipe.image!}
              alt={recipe.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 820px"
              className="object-cover"
            />
          </div>
        )}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-[14px] text-ink-muted">
          <span>
            <Link href="/about" className="hover:text-ink transition-colors">
              Meal Instructions Kitchen
            </Link>
            {' · '}
            {shortDate(recipe.datePublished)}
            {recipe.lastUpdated && recipe.lastUpdated !== recipe.datePublished && (
              <> · Updated {shortDate(recipe.lastUpdated)}</>
            )}
            {' · '}Reviewed for USDA food safety
          </span>
          <span className="flex flex-wrap items-center gap-5 text-ink no-print">
            {/* The one-sheet fridge card at /print-pack/custom, not a print of this
                web page. The print itself is tracked there; this is the intent. */}
            <Link
              href={packHref([recipe.slug])}
              onClick={() =>
                track('tool_used', {
                  tool: 'print_pack',
                  surface: 'recipe_toolbar',
                  recipe: recipe.slug,
                })
              }
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              title="One-page fridge card — print it or save as PDF"
            >
              <Printer className="w-[15px] h-[15px]" aria-hidden="true" />
              Print card
            </Link>
            <button
              type="button"
              onClick={handleCopySms}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer"
            >
              {copiedSms ? (
                <Check className="w-[15px] h-[15px]" aria-hidden="true" />
              ) : (
                <Share2 className="w-[15px] h-[15px]" aria-hidden="true" />
              )}
              {copiedSms ? 'Copied' : 'Send to phone'}
            </button>
            <button
              type="button"
              onClick={handleCopyMd}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer"
              title="Copy clean markdown for ChatGPT, Claude, or Perplexity"
            >
              {copiedMd ? (
                <Check className="w-[15px] h-[15px]" aria-hidden="true" />
              ) : (
                <Copy className="w-[15px] h-[15px]" aria-hidden="true" />
              )}
              {copiedMd ? 'Copied' : 'Copy as markdown'}
            </button>
          </span>
        </div>
      </div>

      {/* ── 4b. The technique clip, when this recipe has one. Sits outside both
              mode panels, so it shows in either mode without being duplicated,
              and never replaces text (HR-6). ── */}
      {video && (
        <div className={`${COLUMN} no-print`}>
          <RecipeVideo video={video} />
        </div>
      )}

      {/* ── 5. Ingredients ── */}
      <section className={`${COLUMN} mt-14`} aria-labelledby="ingredients-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-5">
          <h2 id="ingredients-heading" className={SECTION_H2}>
            Ingredients
          </h2>
          <div className="flex items-center gap-3 no-print">
            <span className="text-[14px] text-ink-subtle">Servings</span>
            <div
              className="flex border border-hairline text-[14px]"
              role="group"
              aria-label="Servings"
            >
              {servingOptions.map((p, i) => {
                const active = portionMultiplier === p.val;
                return (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => {
                      if (p.val !== portionMultiplier) {
                        track('portion_scale', {
                          multiplier: p.val,
                          servings: p.servings,
                          recipe: recipe.slug,
                        });
                      }
                      setPortionMultiplier(p.val);
                    }}
                    aria-pressed={active}
                    className={`px-3.5 py-2 transition-colors cursor-pointer ${
                      i < servingOptions.length - 1 ? 'border-r border-hairline' : ''
                    } ${active ? 'bg-ink text-paper font-bold' : 'text-ink-muted hover:text-ink'}`}
                  >
                    {p.servings}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HR-14 compliant: qtyNumeric scales, qty is the display fallback */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-ink">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx} className="flex items-baseline gap-4 py-3.5 border-b border-hairline">
              <span className="font-mono text-[17px] font-bold min-w-[5.5em] shrink-0">
                {ing.qtyNumeric
                  ? `${formatScaledAmount(ing.qtyNumeric, portionMultiplier)} ${ing.unit}`
                  : `${ing.qty} ${ing.unit}`}
              </span>
              <span className="text-[19px]">
                {ing.item}
                {ing.notes && <span className="text-ink-muted">, {ing.notes}</span>}
              </span>
            </li>
          ))}
        </ul>

        {/* ── 6. Send to Kroger ── */}
        {krogerEnabled && (
          <KrogerCartPanel ingredients={krogerIngredients} returnTo={`/recipes/${recipe.slug}`} />
        )}
      </section>

      {/* The sticky bar stays pinned from here through the end of the
          instructions: this wrapper is its containing block, so it releases
          once the reader is past the steps rather than following them down
          the whole page. */}
      <div>
        {/* ── 7. Mode switch + timer (HR-7: inline, sticky, never an overlay) ── */}
        <div
          className="sticky z-30 mt-14 bg-paper border-b border-hairline no-print"
          style={{ top: headerHeight }}
        >
          <div
            className={`${COLUMN} py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3`}
          >
            <div
              className="flex border border-ink text-[16px] w-full sm:w-auto"
              role="group"
              aria-label="Instruction mode"
            >
              <button
                type="button"
                onClick={() => handleModeChange('fast')}
                data-mode-btn="quick"
                aria-pressed={currentMode === 'fast'}
                className={`flex-1 sm:flex-none px-[22px] py-3 transition-colors cursor-pointer ${
                  currentMode === 'fast'
                    ? 'bg-ink text-paper font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                Get to the point
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('detailed')}
                data-mode-btn="detailed"
                aria-pressed={currentMode === 'detailed'}
                className={`flex-1 sm:flex-none px-[22px] py-3 transition-colors cursor-pointer ${
                  currentMode === 'detailed'
                    ? 'bg-ink text-paper font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                Step by step
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-mono text-[32px] font-black tracking-[-0.02em] leading-none tabular-nums ${
                  isTimerFinished ? 'text-accent' : isTimerRunning ? 'text-ink' : 'text-ink-muted'
                }`}
                aria-live="polite"
              >
                {formatTimerDisplay(timerSeconds)}
              </span>
              <button
                type="button"
                onClick={toggleTimer}
                className="inline-flex items-center gap-2 px-5 py-[11px] bg-ink text-paper text-[15px] font-bold hover:bg-accent transition-colors cursor-pointer"
              >
                {isTimerRunning ? (
                  <Pause className="w-4 h-4 fill-current" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                )}
                {isTimerRunning ? 'Pause' : isTimerFinished ? 'Done' : 'Start timer'}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="p-2 text-ink-muted hover:text-ink transition-colors cursor-pointer"
                title="Reset timer"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* HR-6: BOTH MODES PRESENT IN SSR HTML SIMULTANEOUSLY */}
        {/* Wrapper is a scroll target only — panel visibility stays pure CSS. */}
        <div ref={panelsRef} id="instructions" className={COLUMN}>
          {/* ── 8. Get to the point (SSR present) ── */}
          <section data-mode-panel="fast" className="mt-12" aria-labelledby="quick-heading">
            <h2 id="quick-heading" className={`${SECTION_H2} mb-6`}>
              Get to the point
            </h2>
            <ol className="border-t border-ink">
              {recipe.quickVersion.bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-6 py-6 border-b border-hairline">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-ink text-paper flex items-center justify-center font-mono text-[18px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-[20px] leading-[1.55] max-w-[62ch]">{bullet}</p>
                </li>
              ))}
            </ol>
            {recipe.quickVersion.flipAtMinutes ? (
              <div className="mt-6 px-6 py-5 bg-ink text-paper flex flex-wrap items-center gap-4">
                <span className={`${EYEBROW} text-accent`}>Critical flip mark</span>
                <span className="text-[19px]">
                  Flip at exactly <strong>{recipe.quickVersion.flipAtMinutes} minutes</strong>.
                </span>
              </div>
            ) : null}
          </section>

          {/* ── 9. Step by step (SSR present) ── */}
          <section data-mode-panel="detailed" className="mt-16" aria-labelledby="steps-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <h2 id="steps-heading" className={SECTION_H2}>
                Step by step
              </h2>
              <span className="text-[15px] text-ink-muted no-print">
                Tap a step to cross it off
              </span>
            </div>
            <ol className="border-t border-ink">
              {recipe.detailedSteps.map((step) => {
                const isDone = completedSteps.includes(step.stepNumber);
                return (
                  <li
                    key={step.stepNumber}
                    onClick={() => toggleStepDone(step.stepNumber)}
                    className={`flex gap-6 py-7 border-b border-hairline cursor-pointer transition-opacity ${
                      isDone ? 'opacity-55' : ''
                    }`}
                  >
                    <span
                      className={`w-8 h-8 sm:w-10 sm:h-10 border border-ink flex items-center justify-center font-mono text-[18px] font-bold shrink-0 ${
                        isDone ? 'bg-ink text-paper' : ''
                      }`}
                      aria-hidden="true"
                    >
                      {isDone ? '✓' : step.stepNumber}
                    </span>
                    <div className="max-w-[62ch] min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="text-[22px] font-bold tracking-[-0.01em] leading-tight">
                          {step.title}
                        </h3>
                        {step.timerMinutes ? (
                          <span className="font-mono text-[14px] font-bold text-accent">
                            {step.timerMinutes} min
                            {recipe.quickVersion.flipAtMinutes &&
                            step.timerMinutes === recipe.quickVersion.timerMinutes
                              ? ` · flip at ${recipe.quickVersion.flipAtMinutes}`
                              : ''}
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={`mt-2.5 text-[19px] leading-[1.6] ${isDone ? 'line-through' : ''}`}
                      >
                        {step.instruction}
                      </p>
                      {step.proTip && (
                        <div className="mt-4 pl-5 border-l-2 border-hairline">
                          <span className={`${EYEBROW} text-ink-subtle block`}>Why</span>
                          <p className="mt-1 text-[17px] leading-[1.6] text-ink-muted">
                            {step.proTip}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>

      {/* ── 10. Notes ── */}
      <section className={`${COLUMN} mt-16`} aria-label="Notes">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-ink">
          <div className="py-6 border-b border-hairline">
            <dt className="font-mono text-[12px] uppercase tracking-[0.14em] font-bold text-ink-subtle mb-2.5">
              Dad pro tip
            </dt>
            <dd className="text-[18px] leading-[1.6]">{recipe.dadProTip}</dd>
          </div>
          {recipe.kidAdjustment && (
            <div className="py-6 border-b border-hairline" data-kid-note>
              <dt className="font-mono text-[12px] uppercase tracking-[0.14em] font-bold text-ink-subtle mb-2.5">
                Kid &amp; toddler adjustment
              </dt>
              <dd className="text-[18px] leading-[1.6]">{recipe.kidAdjustment}</dd>
            </div>
          )}
          <div className="py-6 border-b border-hairline">
            <dt className="font-mono text-[12px] uppercase tracking-[0.14em] font-bold text-ink-subtle mb-2.5">
              Serve with
            </dt>
            <dd className="text-[18px] leading-[1.6]">{recipe.sideSuggestions.join(' · ')}</dd>
          </div>
          <div className="py-6 border-b border-hairline">
            <dt className="font-mono text-[12px] uppercase tracking-[0.14em] font-bold text-ink-subtle mb-2.5">
              Reheating
            </dt>
            <dd className="text-[18px] leading-[1.6]">{recipe.reheatInstructions}</dd>
          </div>
        </dl>
      </section>

      {/* ── 11. Nutrition (HR-2: only when sourced) ── */}
      <section className={`${COLUMN} mt-12`} aria-label="Nutrition and basis">
        {recipe.nutrition && (
          <dl className="grid grid-cols-2 sm:grid-cols-4 border-t border-ink border-b border-b-hairline">
            {[
              { label: 'Calories', value: `${recipe.nutrition.calories}` },
              { label: 'Protein', value: `${recipe.nutrition.proteinGrams} g` },
              { label: 'Carbs', value: `${recipe.nutrition.carbsGrams} g` },
              { label: 'Fat', value: `${recipe.nutrition.fatGrams} g` },
            ].map((cell, i, all) => (
              <div key={cell.label} className={`py-[18px] ${gridCell(i, all.length)}`}>
                <dt className={`${EYEBROW} text-ink-subtle`}>{cell.label}</dt>
                <dd className="mt-1.5 font-mono text-[24px] font-bold">{cell.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted max-w-[80ch]">
          {recipe.nutrition?.source && <>Nutrition source: {recipe.nutrition.source}. </>}
          Cook-time basis: {recipe.basis}
        </p>
      </section>

      {/* ── 12. Datasheet cross-link ── */}
      {relatedDatasheets.length > 0 && (
        <section
          className={`${COLUMN} mt-12 space-y-4 no-print`}
          aria-label="Verified cook-time datasheets"
        >
          {relatedDatasheets.map((ds) => {
            const stats = [
              `${ds.tempF}°F`,
              ds.timeFormatted,
              ds.flipAtMinutes > 0 ? `flip ${ds.flipAtMinutes}` : null,
              ds.internalTempTargetF ? `pull ${ds.internalTempTargetF}°F` : null,
              ds.restMinutes > 0 ? `rest ${ds.restMinutes} min` : null,
            ].filter(Boolean);
            return (
              <Link
                key={ds.id}
                href={`/how-long/${ds.appliance}/${ds.foodSlug}`}
                className="flex flex-wrap items-center justify-between gap-6 border border-ink p-6 hover:bg-paper-50 transition-colors group"
              >
                <div className="min-w-0">
                  <span className={`${EYEBROW} text-ink-subtle block`}>
                    Verified cook-time datasheet
                  </span>
                  <span className="block mt-2 text-[21px] font-bold leading-tight">
                    {ds.food}, {ds.appliance.replace(/-/g, ' ')}, {ds.state}
                  </span>
                  <span className="block mt-1.5 font-mono text-[16px] text-ink-muted">
                    {stats.join(' · ')}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[16px] font-semibold group-hover:text-accent transition-colors shrink-0">
                  Full datasheet <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </section>
      )}

      {/* Floating "plan this" — the quick path from a recipe to a calendar
          entry, without scrolling to the bottom or leaving the page. */}
      {mealsEnabled && <PlanFab recipeSlug={recipe.slug} />}

      {/* ── 13. Save & rate ── */}
      {mealsEnabled && (
        <div className={`${COLUMN} mt-12`}>
          <MealActions recipeSlug={recipe.slug} recipeTitle={recipe.title} />
        </div>
      )}

      {/* ── 14. Related recipes ── */}
      {relatedRecipes.length > 0 && (
        <section className={`${COLUMN} mt-14 no-print`} aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="text-[24px] font-extrabold tracking-[-0.01em] uppercase text-ink mb-5"
          >
            More {recipe.appliance.replace(/-/g, ' ')} recipes
          </h2>
          <ul className="border-t border-ink">
            {relatedRecipes.map((rel) => (
              <li key={rel.id} className="border-b border-hairline">
                <Link
                  href={`/recipes/${rel.slug}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 group"
                >
                  <span className="text-[19px] font-semibold group-hover:text-accent transition-colors">
                    {rel.title}
                  </span>
                  <span className="font-mono text-[15px] text-ink-muted shrink-0">
                    {rel.cookTemp.split(' ')[0]} · {rel.totalMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
