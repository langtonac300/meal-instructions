'use client';

import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Printer } from 'lucide-react';
import { Recipe } from '@/lib/types';
import { absoluteUrl } from '@/lib/site';

interface ShareButtonProps {
  recipe: Recipe;
  servings: number;
}

export default function ShareButton({ recipe, servings }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySMS = async () => {
    const text = `🍳 ${recipe.title.toUpperCase()}
⚡ ${recipe.cookTemp} | ${recipe.totalMinutes} MINS (${servings} servings)
📋 DIRECTIONS:
${recipe.quickVersion.bullets.map((b, i) => `${i + 1}. ${b}`).join('\n')}

🛒 INGREDIENTS:
${recipe.ingredients
  .map(
    (ing) =>
      `• ${ing.qty} ${ing.unit} ${ing.item}`
  )
  .join('\n')}

🔗 Link: ${absoluteUrl(`/recipes/${recipe.slug}`)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.log('Clipboard error', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
      <button
        onClick={handleCopySMS}
        type="button"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hover:bg-paper-card border border-hairline text-ink transition-colors cursor-pointer"
        title="Copy short text for SMS / iMessage"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-800 font-bold">COPIED FOR SMS!</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-3.5 h-3.5 text-ink-muted" />
            <span>COPY FOR SMS</span>
          </>
        )}
      </button>

      <button
        onClick={handlePrint}
        type="button"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hover:bg-paper-card border border-hairline text-ink transition-colors cursor-pointer"
        title="Print clean 1-page recipe card"
      >
        <Printer className="w-3.5 h-3.5 text-ink-muted" />
        <span className="hidden sm:inline">PRINT</span>
      </button>
    </div>
  );
}
