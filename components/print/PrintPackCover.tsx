import { Fragment } from 'react';
import type { Recipe } from '@/lib/types';
import { applianceLabel, siteHost, timeLabel } from '@/lib/print-pack';
import PrintMark from './PrintMark';

export type PackVariant = 'top20' | 'custom';

interface Props {
  recipes: Recipe[];
  total: number;
  variant: PackVariant;
}

function headline(variant: PackVariant, count: number): string[] {
  if (variant === 'top20') return ['The twenty', 'most-printed', 'dinners'];
  if (count === 1) return ['One recipe,', 'one page.'];
  return [`${count} recipes,`, 'one page', 'each.'];
}

/**
 * Page 1: brand lockup, headline, and an index of every page that follows.
 * The index holds 20 rows in one column; a bigger custom pack switches to two
 * columns and drops the appliance column so titles keep a single line.
 */
export default function PrintPackCover({ recipes, total, variant }: Props) {
  const count = recipes.length;
  const host = siteHost();
  const twoColumn = count > 20;
  const lines = headline(variant, count);
  const intro =
    variant === 'top20'
      ? 'One recipe per page. Temperature, time, flip mark and internal pull temp at the top; ingredients and directions below. Print the whole pack or just the page you need — every page stands alone on the fridge.'
      : `One recipe per page. Temperature, time, flip mark and internal pull temp at the top; ingredients and directions below. Built from your own selection at ${host}/print-pack — every page stands alone on the fridge.`;

  return (
    <section className="pp-page pp-page--cover" aria-label={`Cover and index, page 1 of ${total}`}>
      <div className="flex items-center gap-[14px] pb-4 border-b border-ink">
        <PrintMark size={46} />
        <div>
          <div className="font-sans text-[19px] font-black tracking-[.08em] uppercase leading-[1.1]">
            Meal Instructions
          </div>
          <div className="font-mono text-[9px] tracking-[.14em] uppercase text-ink-muted">
            No fluff, just the instructions
          </div>
        </div>
      </div>

      <div className="pt-[34px]">
        <div className="font-mono text-[11px] tracking-[.14em] uppercase font-bold text-accent">
          Print pack // {count} specimen{count === 1 ? '' : 's'}
        </div>
        <h2 className="mt-2 font-sans text-[46px] font-black tracking-[-.025em] uppercase leading-[.95]">
          {lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        <p className="mt-4 text-[13.5px] leading-[1.55] text-ink-muted max-w-[5.6in]">{intro}</p>
      </div>

      <div className="mt-[30px] pt-[18px] border-t border-hairline flex-1 min-h-0 overflow-hidden">
        <div className="font-mono text-[9px] tracking-[.14em] uppercase font-semibold text-ink-subtle mb-3">
          Index
        </div>
        <div className={twoColumn ? 'columns-2 gap-6' : undefined}>
          {recipes.map((recipe) => (
            <div
              key={recipe.slug}
              className="flex items-baseline gap-[10px] py-[4.5px] border-b border-paper-200 font-mono text-[10.5px] break-inside-avoid"
            >
              <span className="w-9 shrink-0 font-bold text-accent">{recipe.id}</span>
              <span
                className={`flex-1 min-w-0 font-sans text-[11.5px] font-semibold text-ink ${
                  twoColumn ? 'truncate' : ''
                }`}
              >
                {recipe.title}
              </span>
              {!twoColumn && (
                <span className="w-[76px] shrink-0 text-right text-ink-muted uppercase">
                  {applianceLabel(recipe.appliance)}
                </span>
              )}
              <span className="w-11 shrink-0 text-right font-bold">{timeLabel(recipe.totalMinutes)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-[14px] border-t border-ink flex justify-between font-mono text-[8.5px] tracking-[.1em] uppercase text-ink-subtle">
        <span>{host}</span>
        <span>Every cook time carries its testing basis</span>
      </div>
    </section>
  );
}
