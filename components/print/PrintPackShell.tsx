'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Printer } from 'lucide-react';
import { track } from '@/lib/analytics';
import { PAPER_KEY, parsePaper, type PaperSize } from '@/lib/print-pack';

interface Props {
  pageCount: number;
  children: React.ReactNode;
}

const PAGE_WIDTH_PX: Record<PaperSize, number> = {
  letter: 8.5 * 96,
  a4: (210 / 25.4) * 96,
};

/**
 * Client chrome around the server-rendered document: the print button, the
 * paper-size toggle, and the desk that scales the fixed-size pages down on a
 * narrow screen. The pages never reflow — they are a physical size — so the
 * desk uses `zoom`, which shrinks layout height along with the render, rather
 * than a transform that would leave the scaled-away space behind.
 */
export default function PrintPackShell({ pageCount, children }: Props) {
  const [paper, setPaper] = useState<PaperSize>('letter');
  const deskRef = useRef<HTMLDivElement>(null);

  // ?size=a4 wins, then the remembered choice. Resolved after mount because the
  // server can see neither; a one-frame Letter→A4 swap of a preview is harmless.
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('size');
      if (fromUrl) {
        setPaper(parsePaper(fromUrl));
        return;
      }
      const stored = localStorage.getItem(PAPER_KEY);
      if (stored) setPaper(parsePaper(stored));
    } catch {
      // private mode — Letter
    }
  }, []);

  const choose = useCallback((next: PaperSize) => {
    setPaper(next);
    try {
      localStorage.setItem(PAPER_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const desk = deskRef.current;
    if (!desk) return;
    const fit = () => {
      const available = desk.clientWidth - 32;
      const zoom = Math.min(1, available / PAGE_WIDTH_PX[paper]);
      desk.style.setProperty('--pp-zoom', zoom.toFixed(3));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(desk);
    return () => observer.disconnect();
  }, [paper]);

  const print = () => {
    track('recipe_print', { source: 'print_pack', pages: pageCount });
    window.print();
  };

  const recipes = pageCount - 1;

  return (
    <div data-paper={paper}>
      <style>{`@page { size: ${paper === 'a4' ? 'A4' : 'letter'}; margin: 0; }`}</style>
      <div
        id="pack"
        className="no-print scroll-mt-20 flex flex-wrap items-center justify-between gap-3 bg-paper-card hairline-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider"
      >
        <span className="text-ink-muted">
          <span className="text-ink font-bold">{pageCount} pages</span> // cover + {recipes} recipe
          {recipes === 1 ? '' : 's'}
          <span className="hidden sm:inline text-ink-subtle"> // pick “Save as PDF” in the print dialog</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Paper size" className="inline-flex hairline-border">
            {(['letter', 'a4'] as const).map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={paper === size}
                onClick={() => choose(size)}
                className={`px-2.5 py-1.5 transition-colors ${
                  paper === size ? 'bg-ink text-paper' : 'bg-paper text-ink-muted hover:text-ink'
                }`}
              >
                {size === 'a4' ? 'A4' : 'Letter'}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={print}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-paper hover:bg-accent transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
      <div ref={deskRef} className="pp-desk mt-3">
        {children}
      </div>
    </div>
  );
}
