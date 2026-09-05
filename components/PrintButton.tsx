'use client';

import React from 'react';
import { Printer } from 'lucide-react';
import { track } from '@/lib/analytics';

interface PrintButtonProps {
  label?: string;
  className?: string;
  /** Where on the site the print was asked for — the `source` parameter on the recipe_print event. */
  source?: string;
}

export default function PrintButton({
  label = 'PRINT 1-PAGE SHEET',
  className = 'px-3 py-1 bg-ink text-paper rounded flex items-center gap-1.5 hover:bg-accent transition-colors cursor-pointer font-mono text-xs',
  source = 'print_button',
}: PrintButtonProps) {
  return (
    <button
      onClick={() => {
        track('recipe_print', { source });
        if (typeof window !== 'undefined') window.print();
      }}
      className={className}
      type="button"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
