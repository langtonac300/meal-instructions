'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  BookOpen,
  Clock,
  Flame,
  Check,
  Play,
  Share2,
  Printer,
  Sparkles,
  Award,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { Recipe } from '@/lib/types';
import { scaleIngredientAmount } from '@/lib/recipe-utils';
import RecipeModeSwitch, { RecipeMode } from '@/components/RecipeModeSwitch';
import PortionScaler from '@/components/PortionScaler';
import ShareButton from '@/components/ShareButton';
import KitchenTimer from '@/components/KitchenTimer';

interface RecipeClientProps {
  recipe: Recipe;
  relatedRecipes: Recipe[];
}

export default function RecipeClient({ recipe, relatedRecipes }: RecipeClientProps) {
  const [mode, setMode] = useState<RecipeMode>('quick');
  const [servings, setServings] = useState<number>(recipe.defaultServings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerMinutes, setTimerMinutes] = useState<number>(recipe.quickVersion.timerMinutes);
  const [timerLabel, setTimerLabel] = useState<string>(`${recipe.title} Timer`);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const startCustomTimer = (minutes: number, label: string) => {
    setTimerMinutes(minutes);
    setTimerLabel(label);
    setIsTimerActive(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      {/* ── BREADCRUMB / BACK BAR ── */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-muted border-b border-hairline pb-3 mb-6">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-accent transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK TO INDEX [001-040]</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">INDEX #{recipe.id}</span>
          <span className="px-2 py-0.5 bg-paper-200 text-ink rounded font-bold text-[9px]">
            {recipe.appliance.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ── RECIPE HEADER ── */}
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
            NO-FLUFF SPECIFICATION // #{recipe.id}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-ink tracking-tight leading-tight uppercase">
          {recipe.title}
        </h1>

        <p className="text-base sm:text-lg text-ink-muted font-sans mt-3 leading-relaxed">
          {recipe.tagline}
        </p>

        {/* Fast Specs Matrix Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 font-mono text-center">
          <div className="bg-paper-100 p-2.5 rounded border border-hairline">
            <span className="block text-[9px] uppercase tracking-wider text-ink-subtle">COOK TEMP</span>
            <span className="text-sm font-bold text-ink">{recipe.cookTemp}</span>
          </div>

          <div className="bg-paper-100 p-2.5 rounded border border-hairline">
            <span className="block text-[9px] uppercase tracking-wider text-ink-subtle">TOTAL TIME</span>
            <span className="text-sm font-bold text-ink">{recipe.totalMinutes} MINS</span>
          </div>

          <div className="bg-paper-100 p-2.5 rounded border border-hairline">
            <span className="block text-[9px] uppercase tracking-wider text-ink-subtle">PROTEIN</span>
            <span className="text-sm font-bold text-accent">{recipe.nutrition.proteinGrams}G PER SERVING</span>
          </div>

          <div className="bg-paper-100 p-2.5 rounded border border-hairline">
            <span className="block text-[9px] uppercase tracking-wider text-ink-subtle">DIFFICULTY</span>
            <span className="text-sm font-bold text-ink">{recipe.difficulty}</span>
          </div>
        </div>
      </header>

      {/* ── SIGNATURE DUAL-MODE SWITCHER (Requested by User) ── */}
      <section aria-label="Cooking mode selection">
        <RecipeModeSwitch mode={mode} onChange={setMode} />
      </section>

      {/* ── TOOLBAR: PORTIONS SCALER + SHARE/SMS ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 border-y border-hairline mb-8 bg-paper-100/60 px-4 rounded">
        <PortionScaler
          currentServings={servings}
          baseServings={recipe.defaultServings}
          onChange={setServings}
        />

        <ShareButton recipe={recipe} servings={servings} />
      </div>

      {/* ── MODE 1: GET TO THE POINT (Ultra-Concise) ── */}
      {mode === 'quick' && (
        <section className="space-y-8 animate-fadeIn">
          {/* Sizzling Target Banner with Direct Timer Launcher */}
          <div className="bg-paper-200/90 rounded-lg p-6 border-2 border-ink text-center font-mono">
            <div className="flex items-center justify-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 fill-accent" />
              <span>THE 20-WORD SPEED EXECUTION</span>
            </div>

            <div className="text-2xl sm:text-4xl font-black text-ink my-3 tracking-tight">
              {recipe.cookTemp.split(' ')[0]} // {recipe.quickVersion.totalTime.toUpperCase()}
              {recipe.quickVersion.flipAtMinutes && (
                <span className="text-accent"> // FLIP @ {recipe.quickVersion.flipAtMinutes}M</span>
              )}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() =>
                  startCustomTimer(
                    recipe.quickVersion.timerMinutes,
                    `${recipe.title} (${recipe.quickVersion.timerMinutes}m)`
                  )
                }
                className="px-5 py-2.5 rounded bg-ink hover:bg-accent text-paper font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer shadow-subtle"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START {recipe.quickVersion.timerMinutes}-MINUTE IN-PAGE TIMER</span>
              </button>
            </div>
          </div>

          {/* Quick Bullets Execution */}
          <div className="bg-paper-50 rounded-lg border border-hairline p-6 shadow-subtle">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-ink border-b border-hairline pb-2 mb-4">
              ⚡ RAPID EXECUTION STEPS
            </h2>

            <ol className="space-y-3 font-sans text-sm sm:text-base text-ink leading-relaxed">
              {recipe.quickVersion.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold bg-ink text-paper w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── MODE 2: STEP-BY-STEP (Guided & Fluff-Free) ── */}
      {mode === 'detailed' && (
        <section className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-hairline pb-2 mb-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
              📖 DETAILED STEP-BY-STEP INSTRUCTIONS
            </h2>
            <span className="text-[10px] font-mono text-ink-muted">
              {recipe.detailedSteps.length} STEPS TOTAL
            </span>
          </div>

          {recipe.detailedSteps.map((step) => (
            <div
              key={step.stepNumber}
              id={`step-${step.stepNumber}`}
              className="bg-paper-50 rounded-lg border border-hairline p-5 shadow-subtle transition-all hover:border-ink/40"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-accent text-white px-2 py-0.5 rounded">
                    STEP {step.stepNumber}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-ink uppercase">
                    {step.title}
                  </h3>
                </div>

                {step.timerMinutes && (
                  <button
                    type="button"
                    onClick={() =>
                      startCustomTimer(
                        step.timerMinutes!,
                        `Step ${step.stepNumber}: ${step.title}`
                      )
                    }
                    className="px-2 py-1 rounded bg-paper-200 hover:bg-ink hover:text-paper font-mono text-[10px] uppercase font-bold text-ink transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Clock className="w-3 h-3" />
                    <span>TIMER: {step.timerMinutes}M</span>
                  </button>
                )}
              </div>

              <p className="text-sm sm:text-base text-ink font-sans leading-relaxed mt-2">
                {step.instruction}
              </p>

              {step.targetTemp && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded font-mono text-xs text-amber-900">
                  <Flame className="w-3.5 h-3.5 text-accent" />
                  <span>TARGET TEMP: {step.targetTemp}</span>
                </div>
              )}

              {step.proTip && (
                <div className="mt-3 p-3 bg-paper-100 rounded border-l-2 border-accent text-xs font-sans text-ink-muted">
                  <strong className="text-ink font-mono uppercase tracking-wide mr-1">
                    Dad Pro Tip:
                  </strong>
                  {step.proTip}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ── INGREDIENTS CHECKLIST (Scalable) ── */}
      <section className="mt-10 bg-paper-50 rounded-lg border border-hairline p-6 shadow-subtle">
        <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">
              GROCERY & PREP CHECKLIST
            </span>
            <h2 className="font-serif text-xl font-bold text-ink uppercase">
              INGREDIENTS ({servings} SERVINGS)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-ink-muted hidden sm:inline">
            TAP TO CHECK OFF ITEMS
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-sm">
          {recipe.ingredients.map((ing, idx) => {
            const isChecked = !!checkedIngredients[idx];
            const scaledAmount = scaleIngredientAmount(
              ing.amount,
              recipe.defaultServings,
              servings
            );

            return (
              <li
                key={idx}
                onClick={() => toggleIngredient(idx)}
                className={`flex items-start gap-3 p-2.5 rounded border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-paper-200/50 border-hairline text-ink-subtle line-through'
                    : 'bg-paper-100 hover:bg-paper-200 border-hairline text-ink'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-forest border-forest text-white'
                      : 'border-hairline-dark/40 bg-paper-50'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="leading-tight">
                  <span className="font-mono font-bold text-ink mr-1.5">
                    {scaledAmount} {ing.unit}
                  </span>
                  <span>{ing.item}</span>
                  {ing.notes && (
                    <span className="text-xs text-ink-muted italic block mt-0.5">
                      ({ing.notes})
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── DAD PRO TIPS & KID MODIFICATION SECTION ── */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pro Tip Box */}
        <div className="bg-paper-100 border border-hairline rounded-lg p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink mb-2">
            <Award className="w-4 h-4 text-accent" />
            <span>DAD CULINARY SECRET</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
            {recipe.dadProTip}
          </p>
        </div>

        {/* Kid Modification Box */}
        {recipe.kidAdjustment && (
          <div className="bg-paper-100 border border-hairline rounded-lg p-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-ink mb-2">
              <Sparkles className="w-4 h-4 text-forest" />
              <span>KID / TODDLER ADJUSTMENT</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">
              {recipe.kidAdjustment}
            </p>
          </div>
        )}
      </section>

      {/* ── REHEAT INSTRUCTIONS ── */}
      <section className="mt-4 bg-paper-50 border border-hairline rounded-lg p-4 font-mono text-xs text-ink flex items-start gap-3">
        <RotateCcw className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />
        <div>
          <strong className="uppercase tracking-wide text-ink mr-1">REHEATING:</strong>
          <span className="font-sans text-ink-muted">{recipe.reheatInstructions}</span>
        </div>
      </section>

      {/* ── RELATED PAIRINGS & SIDES ── */}
      {relatedRecipes.length > 0 && (
        <section className="mt-12 pt-8 border-t border-hairline">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-bold uppercase text-ink">
              WHAT TO SERVE WITH THIS
            </h3>
            <span className="text-[10px] font-mono text-ink-muted">MATCHING SIDES & MAINS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedRecipes.map((rel) => (
              <Link
                key={rel.id}
                href={`/recipes/${rel.slug}`}
                className="p-4 bg-paper-50 hover:bg-paper-100 border border-hairline hover:border-ink/40 rounded transition-all group block shadow-subtle"
              >
                <span className="font-mono text-[9px] text-ink-muted block font-bold">
                  INDEX #{rel.id} • {rel.totalMinutes} MINS
                </span>
                <h4 className="font-serif text-sm font-bold text-ink group-hover:text-accent mt-1 leading-snug">
                  {rel.title}
                </h4>
                <p className="text-[11px] text-ink-muted line-clamp-2 mt-1 font-sans">
                  {rel.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── FLOATING AUDIO KITCHEN TIMER ── */}
      {isTimerActive && (
        <KitchenTimer
          initialMinutes={timerMinutes}
          label={timerLabel}
          autoStart={true}
          onClose={() => setIsTimerActive(false)}
        />
      )}
    </div>
  );
}
