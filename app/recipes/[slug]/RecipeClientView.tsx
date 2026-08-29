'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Zap, BookOpen, Clock, Flame, Share2, Printer, Check, 
  Copy, Play, Pause, RotateCcw, ShieldCheck, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import { Recipe } from '@/lib/types';
import { RECIPES } from '@/data/recipes';
import { formatScaledAmount, buildSmsShareText, recipeToMarkdown } from '@/lib/recipe-utils';

interface RecipeClientViewProps {
  recipe: Recipe;
}

export default function RecipeClientView({ recipe }: RecipeClientViewProps) {
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

  useEffect(() => {
    // Read existing data-mode stamped by head script
    const modeAttr = document.documentElement.getAttribute('data-mode');
    if (modeAttr === 'fast' || modeAttr === 'detailed') {
      setCurrentMode(modeAttr);
    }
  }, []);

  const handleModeChange = (newMode: 'fast' | 'detailed') => {
    setCurrentMode(newMode);
    document.documentElement.setAttribute('data-mode', newMode);
    try {
      localStorage.setItem('dad_meals_recipe_mode', newMode);
    } catch (e) {}
  };

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
      setTimerSeconds(initialSeconds);
      setIsTimerFinished(false);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(!isTimerRunning);
    }
  };

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
      setCopiedSms(true);
      setTimeout(() => setCopiedSms(false), 3000);
    } catch (err) {}
  };

  const handleCopyMd = async () => {
    const md = recipeToMarkdown(recipe);
    try {
      await navigator.clipboard.writeText(md);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 3000);
    } catch (err) {}
  };

  const toggleStepDone = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const relatedRecipes = useMemo(() => {
    return RECIPES.filter(
      (r) => r.id !== recipe.id && (r.appliance === recipe.appliance || r.protein === recipe.protein)
    ).slice(0, 4);
  }, [recipe]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs font-mono text-ink-subtle no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Index</span>
        </Link>
        <div className="flex items-center gap-2">
          <span>SPECIMEN #{recipe.id}</span>
          <span>•</span>
          <span className="uppercase text-ink-muted">{recipe.appliance}</span>
        </div>
      </div>

      {/* Recipe Header Card */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        
        {/* Category Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 bg-paper hairline-border text-[10px] font-mono uppercase tracking-wider font-bold text-ink">
            {recipe.appliance}
          </span>
          {recipe.categories.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat}`}
              className="px-2.5 py-0.5 bg-paper hairline-border text-[10px] font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors"
            >
              {cat}
            </Link>
          ))}
          <span className="px-2.5 py-0.5 bg-paper hairline-border text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800">
            VERIFIED NO-FLUFF
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-ink tracking-tight font-sans uppercase">
            {recipe.title}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
            {recipe.tagline}
          </p>
        </div>

        {/* Quick Specs Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-paper p-4 hairline-border font-mono text-xs text-ink">
          <div className="space-y-0.5">
            <span className="text-[10px] text-ink-subtle uppercase block">Cook Temp</span>
            <span className="font-bold text-sm text-accent">{recipe.cookTemp}</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-ink-subtle uppercase block">Total Time</span>
            <span className="font-bold text-sm">{recipe.totalMinutes} mins</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-ink-subtle uppercase block">Protein / Serv</span>
            <span className="font-bold text-sm">{recipe.nutrition?.proteinGrams ?? 30}g</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-ink-subtle uppercase block">Difficulty</span>
            <span className="font-bold text-sm text-emerald-800">{recipe.difficulty}</span>
          </div>
        </div>

        {/* HR-7: THE STICKY INLINE SEGMENTED MODE SELECTOR */}
        <div className="space-y-2 no-print sticky top-18 z-20 bg-paper-card py-2 hairline-b">
          <div className="flex justify-between items-center text-[10px] font-mono text-ink-subtle uppercase">
            <span>Execution Mode</span>
            <span>Applied via CSS Visibility</span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-paper hairline-border font-mono text-xs">
            <button
              type="button"
              onClick={() => handleModeChange('fast')}
              className={`py-2.5 px-4 flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer ${
                currentMode === 'fast'
                  ? 'bg-ink text-paper font-bold shadow-sm'
                  : 'text-ink-muted hover:text-ink hover:bg-paper-card'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span>⚡ GET TO THE POINT</span>
              <span className="hidden sm:inline text-[10px] font-normal opacity-70">
                (20 Words)
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('detailed')}
              className={`py-2.5 px-4 flex items-center justify-center gap-2 uppercase tracking-wider transition-all cursor-pointer ${
                currentMode === 'detailed'
                  ? 'bg-ink text-paper font-bold shadow-sm'
                  : 'text-ink-muted hover:text-ink hover:bg-paper-card'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-ink-subtle" />
              <span>📖 STEP-BY-STEP</span>
              <span className="hidden sm:inline text-[10px] font-normal opacity-70">
                (Guided Steps)
              </span>
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 hairline-t no-print font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySms}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hairline-border hover:border-ink transition-colors cursor-pointer text-ink"
            >
              {copiedSms ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedSms ? 'COPIED FOR SMS!' : 'SMS TO SPOUSE'}</span>
            </button>

            <button
              onClick={handleCopyMd}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hairline-border hover:border-ink transition-colors cursor-pointer text-ink-muted hover:text-ink"
              title="Copy clean markdown for ChatGPT, Claude, or Perplexity"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'MD COPIED!' : 'AI / LLM MARKDOWN'}</span>
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hairline-border hover:border-ink transition-colors cursor-pointer text-ink-muted hover:text-ink"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT CARD</span>
          </button>
        </div>

      </section>

      {/* APPLIANCE TIMER WIDGET */}
      <section className="bg-paper-card hairline-border p-6 space-y-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-paper hairline-border flex items-center justify-center font-bold text-accent">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ink font-sans uppercase">
                {recipe.appliance} Timer
              </h3>
              <p className="text-xs text-ink-muted font-sans">
                Set for {recipe.quickVersion.timerMinutes} mins @ {recipe.cookTemp}
                {recipe.quickVersion.flipAtMinutes ? ` (Flip at ${recipe.quickVersion.flipAtMinutes}m)` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${
              isTimerFinished ? 'text-accent animate-bounce' : isTimerRunning ? 'text-ink' : 'text-ink-muted'
            }`}>
              {formatTimerDisplay(timerSeconds)}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTimer}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hairline-border transition-colors ${
                  isTimerRunning
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : isTimerFinished
                    ? 'bg-accent text-paper border-accent'
                    : 'bg-ink text-paper border-ink'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'PAUSE' : isTimerFinished ? 'DONE!' : 'START'}</span>
              </button>

              <button
                onClick={resetTimer}
                className="p-2 bg-paper hairline-border hover:border-ink text-ink-muted hover:text-ink cursor-pointer transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTS CHECKLIST & PORTION SCALER */}
      <section className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4 hairline-b pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-ink uppercase tracking-tight font-sans">
              Ingredients
            </h2>
            <p className="text-xs text-ink-muted font-sans">
              Base recipe calibrated for {recipe.defaultServings} adults.
            </p>
          </div>

          {/* Portion Multiplier Controls */}
          <div className="flex items-center gap-1 font-mono text-xs no-print">
            <span className="text-[10px] text-ink-subtle uppercase mr-2">Servings:</span>
            {[
              { label: '2 (0.5x)', val: 0.5 },
              { label: '4 (1x)', val: 1.0 },
              { label: '6 (1.5x)', val: 1.5 },
              { label: '8 (2x)', val: 2.0 },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setPortionMultiplier(p.val)}
                className={`px-2.5 py-1 hairline-border transition-colors ${
                  portionMultiplier === p.val
                    ? 'bg-ink text-paper font-bold'
                    : 'bg-paper text-ink-muted hover:text-ink hover:border-ink'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Grid (HR-14 compliant) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-sm">
          {recipe.ingredients.map((ing, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-paper hairline-border"
            >
              <span className="font-mono text-xs font-bold text-ink shrink-0 bg-paper-card px-2 py-0.5 hairline-border">
                {ing.qtyNumeric
                  ? `${formatScaledAmount(ing.qtyNumeric, portionMultiplier)} ${ing.unit}`
                  : `${ing.qty} ${ing.unit}`}
              </span>
              <div className="text-xs sm:text-sm text-ink leading-snug">
                <span className="font-bold">{ing.item}</span>
                {ing.notes && (
                  <span className="text-ink-muted block text-xs mt-0.5">
                    {ing.notes}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HR-6: BOTH MODES PRESENT IN SSR HTML SIMULTANEOUSLY */}
      
      {/* PANEL 1: ⚡ GET TO THE POINT (SSR Present) */}
      <div data-mode-panel="fast" className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between hairline-b pb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <h2 className="text-lg sm:text-xl font-bold text-ink uppercase tracking-tight font-sans">
              Get to the Point Execution
            </h2>
          </div>
          <span className="font-mono text-[10px] text-ink-subtle uppercase">
            20-WORD BULLETS // NO FLUFF
          </span>
        </div>

        <div className="space-y-4">
          {recipe.quickVersion.bullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 bg-paper hairline-border text-sm font-sans"
            >
              <span className="w-6 h-6 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-ink font-medium leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {recipe.quickVersion.flipAtMinutes && (
          <div className="p-3 bg-paper hairline-border text-ink font-mono text-xs flex items-center gap-2">
            <span className="font-bold uppercase text-accent">⏱️ Critical Flip Mark:</span>
            <span>Flip at exactly <strong>{recipe.quickVersion.flipAtMinutes} minutes</strong>.</span>
          </div>
        )}
      </div>

      {/* PANEL 2: 📖 STEP-BY-STEP (SSR Present) */}
      <div data-mode-panel="detailed" className="bg-paper-card hairline-border p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between hairline-b pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-ink" />
            <h2 className="text-lg sm:text-xl font-bold text-ink uppercase tracking-tight font-sans">
              Step-by-Step Guided Instructions
            </h2>
          </div>
          <span className="font-mono text-[10px] text-ink-subtle uppercase">
            FLUFF-FREE GUIDED STEPS
          </span>
        </div>

        <div className="space-y-6">
          {recipe.detailedSteps.map((step) => {
            const isDone = completedSteps.includes(step.stepNumber);
            return (
              <div
                key={step.stepNumber}
                onClick={() => toggleStepDone(step.stepNumber)}
                className={`p-6 hairline-border transition-all cursor-pointer space-y-3 ${
                  isDone ? 'bg-paper-subtle/50 opacity-60' : 'bg-paper hover:border-ink'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold ${
                      isDone ? 'bg-emerald-600 text-white' : 'bg-ink text-paper'
                    }`}>
                      {isDone ? '✓' : step.stepNumber}
                    </span>
                    <span className="font-bold text-sm text-ink font-sans uppercase">
                      {step.title}
                    </span>
                  </div>
                  {step.timerMinutes && (
                    <span className="text-ink-subtle uppercase">
                      ⏱️ {step.timerMinutes} MINS
                    </span>
                  )}
                </div>

                <p className={`text-sm leading-relaxed font-sans ${isDone ? 'line-through text-ink-muted' : 'text-ink'}`}>
                  {step.instruction}
                </p>

                {step.proTip && (
                  <div className="bg-paper-card p-3 hairline-border text-xs font-mono text-ink-muted space-y-0.5">
                    <span className="font-bold text-ink uppercase text-[10px]">
                      💡 Dad Pro Tip:
                    </span>
                    <p className="font-sans text-xs">{step.proTip}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DAD KNOWLEDGE & PRACTICAL NOTES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        
        {/* Dad Pro Tip & Kid Adjustment */}
        <div className="bg-paper-card hairline-border p-6 space-y-4">
          <div className="flex items-center gap-2 text-ink font-bold uppercase hairline-b pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Dad Pro Tip</span>
          </div>
          <p className="font-sans text-xs text-ink leading-relaxed">
            {recipe.dadProTip}
          </p>

          {recipe.kidAdjustment && (
            <div className="pt-2 hairline-t space-y-1">
              <span className="text-[10px] text-ink-subtle uppercase block font-bold">
                👶 Kid & Toddler Adjustment:
              </span>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">
                {recipe.kidAdjustment}
              </p>
            </div>
          )}
        </div>

        {/* Sides & Reheating */}
        <div className="bg-paper-card hairline-border p-6 space-y-4">
          <div className="flex items-center gap-2 text-ink font-bold uppercase hairline-b pb-2">
            <Flame className="w-4 h-4 text-accent" />
            <span>Serve With & Reheating</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-ink-subtle uppercase block font-bold">
              Suggested Sides:
            </span>
            <ul className="font-sans text-xs text-ink space-y-1 list-disc list-inside">
              {recipe.sideSuggestions.map((side, idx) => (
                <li key={idx}>{side}</li>
              ))}
            </ul>
          </div>

          <div className="pt-2 hairline-t space-y-1">
            <span className="text-[10px] text-ink-subtle uppercase block font-bold">
              🔥 Reheat Method (Restore Crunch):
            </span>
            <p className="font-sans text-xs text-ink-muted leading-relaxed">
              {recipe.reheatInstructions}
            </p>
          </div>
        </div>

      </section>

      {/* NUTRITION & TESTING BASIS (HR-2 Compliant) */}
      <section className="bg-paper-card hairline-border p-6 font-mono text-xs text-ink space-y-2">
        <div className="flex justify-between items-center hairline-b pb-2">
          <span className="font-bold uppercase">Nutrition & Verification Basis</span>
          <span className="text-ink-subtle">HR-2 SOURCED</span>
        </div>
        {recipe.nutrition && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
            <div>Calories: <strong>{recipe.nutrition.calories} kcal</strong></div>
            <div>Protein: <strong>{recipe.nutrition.proteinGrams}g</strong></div>
            <div>Carbohydrates: <strong>{recipe.nutrition.carbsGrams}g</strong></div>
            <div>Fat: <strong>{recipe.nutrition.fatGrams}g</strong></div>
          </div>
        )}
        <div className="text-[11px] text-ink-muted hairline-t pt-2 space-y-1 font-sans">
          {recipe.nutrition?.source && <div><strong>Nutrition Source:</strong> {recipe.nutrition.source}</div>}
          <div><strong>Cook Time Basis:</strong> {recipe.basis}</div>
        </div>
      </section>

      {/* RELATED RECIPES */}
      {relatedRecipes.length > 0 && (
        <section className="space-y-4 pt-6 hairline-t no-print">
          <h3 className="text-base font-bold uppercase tracking-tight text-ink font-sans">
            Related {recipe.appliance.replace('-', ' ')} Recipes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedRecipes.map((rel) => (
              <Link
                key={rel.id}
                href={`/recipes/${rel.slug}`}
                className="bg-paper-card hairline-border p-4 hover:border-ink transition-colors group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-ink-subtle">
                    #{rel.id}
                  </span>
                  <h4 className="font-bold text-xs font-sans text-ink group-hover:text-accent transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="hairline-t mt-3 pt-2 font-mono text-[10px] text-ink-muted flex justify-between">
                  <span>{rel.cookTemp}</span>
                  <span>{rel.totalMinutes}m</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
