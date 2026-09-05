import type { Recipe } from '@/lib/types';
import {
  applianceLabel,
  ingredientLine,
  midCell,
  nutritionLine,
  pullCell,
  siteHost,
  tempShort,
  tempSize,
  timeLabel,
} from '@/lib/print-pack';
import PrintMark from './PrintMark';

interface Props {
  recipe: Recipe;
  page: number;
  total: number;
}

interface CellProps {
  label: string;
  value: string;
  flex: number;
  tone?: 'paper' | 'accent' | 'ink';
  size?: number;
}

function SpecCell({ label, value, flex, tone = 'paper', size = 17 }: CellProps) {
  const ink = tone === 'ink';
  return (
    <div className={`pp-cell px-[11px] py-[9px] ${ink ? 'pp-cell--ink' : ''}`} style={{ flex }}>
      <div
        className={`font-mono text-[8px] tracking-[.12em] uppercase font-semibold ${
          ink ? 'text-neutral-400' : 'text-ink-subtle'
        }`}
      >
        {label}
      </div>
      <div
        className={`font-mono font-black tracking-[-.02em] mt-[2px] leading-[1.15] ${
          tone === 'accent' ? 'text-accent' : ink ? 'text-paper' : 'text-ink'
        }`}
        style={{ fontSize: size }}
      >
        {value}
      </div>
    </div>
  );
}

/**
 * One recipe, one sheet. Five bands top to bottom: header rule, title, spec
 * strip, the ingredients/directions columns (which take whatever height is
 * left), footer. The page box is a fixed physical size with overflow hidden,
 * so a long recipe clips rather than spilling onto a second sheet — the
 * `dense` switch tightens the ingredient rows for the lists that need it.
 */
export default function RecipePrintCard({ recipe, page, total }: Props) {
  const temp = tempShort(recipe.cookTemp);
  const mid = midCell(recipe);
  const pull = pullCell(recipe);
  const dense = recipe.ingredients.length > 13;

  return (
    <section
      id={`page-${recipe.slug}`}
      className="pp-page"
      aria-label={`Page ${page} of ${total}: ${recipe.title}`}
    >
      {/* A — header rule */}
      <div className="flex items-center justify-between pb-[10px] border-b border-ink">
        <div className="flex items-center gap-[10px]">
          <PrintMark size={26} />
          <span className="font-sans text-[12px] font-black tracking-[.08em] uppercase">
            Meal Instructions
          </span>
        </div>
        <div className="flex gap-[10px] font-mono text-[9px] tracking-[.12em] uppercase text-ink-muted">
          <span>Specimen #{recipe.id}</span>
          <span className="text-hairline">·</span>
          <span>{applianceLabel(recipe.appliance)}</span>
          <span className="text-hairline">·</span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>

      {/* B — title */}
      <div className="pt-4">
        <h2 className="font-sans text-[29px] font-black tracking-[-.02em] uppercase leading-[1.02]">
          {recipe.title}
        </h2>
        <p className="mt-[7px] text-[12.5px] leading-[1.5] text-ink-muted">{recipe.tagline}</p>
      </div>

      {/* C — spec strip */}
      <div className="flex gap-[7px] mt-4">
        <SpecCell label="Cook temp" value={temp} flex={1.15} tone="accent" size={tempSize(temp)} />
        <SpecCell label="Total time" value={timeLabel(recipe.totalMinutes)} flex={1} />
        <SpecCell label={mid.label} value={mid.value} flex={1} />
        <SpecCell label="Serves" value={String(recipe.defaultServings)} flex={1} />
        <SpecCell label={pull.label} value={pull.value} flex={1.1} tone="ink" />
      </div>

      {/* D — two columns */}
      <div className="flex gap-[22px] mt-5 flex-1 min-h-0">
        <div className="w-[2.35in] shrink-0">
          <div className="font-mono text-[9px] tracking-[.14em] uppercase font-bold pb-[6px] border-b border-ink">
            Ingredients
          </div>
          {recipe.ingredients.map((ingredient, i) => (
            <div
              key={i}
              className={`flex gap-[7px] border-b border-paper-200 ${
                dense ? 'py-[3px] text-[10px] leading-[1.3]' : 'py-[5px] text-[10.5px] leading-[1.35]'
              }`}
            >
              <span className="pp-tick" aria-hidden="true" />
              <span>{ingredientLine(ingredient)}</span>
            </div>
          ))}
          <div className="font-mono text-[9px] tracking-[.14em] uppercase font-bold pt-4 pb-[6px] border-b border-ink">
            Equipment
          </div>
          {recipe.equipmentNeeded.map((item) => (
            <div
              key={item}
              className={`font-mono text-[9.5px] text-ink-muted uppercase tracking-[.04em] ${
                dense ? 'py-[2px]' : 'py-1'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between pb-[6px] border-b border-ink">
            <span className="font-mono text-[9px] tracking-[.14em] uppercase font-bold">Directions</span>
            <span className="font-mono text-[8px] tracking-[.1em] uppercase text-ink-subtle">
              Get to the point
            </span>
          </div>
          {recipe.quickVersion.bullets.map((text, i) => (
            <div key={i} className="flex gap-[11px] py-[9px] border-b border-paper-200">
              <span className="w-[19px] h-[19px] rounded-full bg-ink text-paper font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-[1px]">
                {i + 1}
              </span>
              <span className="text-[12px] leading-[1.45] font-medium">{text}</span>
            </div>
          ))}

          <div className="pp-tip mt-[14px] px-[13px] py-[11px]">
            <div className="font-mono text-[8.5px] tracking-[.12em] uppercase font-bold text-accent">
              Dad pro tip
            </div>
            <p className="mt-1 text-[11px] leading-[1.45] text-ink">{recipe.dadProTip}</p>
          </div>

          <div className="mt-2 flex gap-2">
            {recipe.kidAdjustment && (
              <div className="flex-1 border-l-2 border-hairline pl-[9px] py-[2px]">
                <div className="font-mono text-[8px] tracking-[.12em] uppercase font-bold text-ink-subtle">
                  Kid adjustment
                </div>
                <p className="mt-[3px] text-[10px] leading-[1.4] text-ink-muted">{recipe.kidAdjustment}</p>
              </div>
            )}
            <div className="flex-1 border-l-2 border-hairline pl-[9px] py-[2px]">
              <div className="font-mono text-[8px] tracking-[.12em] uppercase font-bold text-ink-subtle">
                Reheat
              </div>
              <p className="mt-[3px] text-[10px] leading-[1.4] text-ink-muted">
                {recipe.reheatInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* E — footer: the HR-2 proof lines never drop for layout reasons */}
      <div className="mt-[14px] pt-[9px] border-t border-ink flex justify-between gap-4 font-mono text-[8px] leading-[1.5] text-ink-subtle tracking-[.04em]">
        <span className="flex-1">
          <strong className="text-ink">BASIS:</strong> {recipe.basis}
        </span>
        {recipe.nutrition && (
          <span className="shrink-0 text-right max-w-[2.6in]">
            <strong className="text-ink">{nutritionLine(recipe.nutrition)}</strong>
            <br />
            {recipe.nutrition.source}
          </span>
        )}
      </div>
      <div className="pt-[7px] flex justify-between font-mono text-[8px] tracking-[.1em] uppercase text-ink-subtle">
        <span>
          {siteHost()}/recipes/{recipe.slug}
        </span>
        <span>
          Page {page} of {total}
        </span>
      </div>
    </section>
  );
}
