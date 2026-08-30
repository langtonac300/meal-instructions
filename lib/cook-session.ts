import type { CookTimeDatasheet } from './types';
import { COOK_TIME_DATASHEETS } from '@/data/cook-times';

export interface CookStagePrompt {
  atSec: number;
  text: string;
}

export interface CookStage {
  id: string;
  label: string;
  durationSec: number;
  targetTempF?: number;
  targetTempFormatted?: string;
  prompts?: CookStagePrompt[];
  donenessCue?: string;
}

export interface CookPlan {
  planId: string;
  title: string;
  appliance: string;
  sourceHref: string;
  stages: CookStage[];
}

export function datasheetToCookPlan(sheet: CookTimeDatasheet): CookPlan {
  const cookMinutes = sheet.timeMaxMinutes;
  const cookStage: CookStage = {
    id: `${sheet.id}-cook`,
    label: sheet.appliance === 'slow-cooker' || sheet.appliance === 'smoker' ? 'Cook (low & slow)' : 'Cook',
    durationSec: cookMinutes * 60,
    targetTempF: sheet.internalTempTargetF,
    targetTempFormatted: sheet.internalTempTargetFormatted,
    donenessCue: sheet.donenessCue,
    prompts: sheet.flipAtMinutes > 0
      ? [{
          atSec: sheet.flipAtMinutes * 60,
          text: sheet.appliance === 'air-fryer'
            ? `Flip or shake the basket (${sheet.flipAtMinutes} min mark)`
            : `Flip now (${sheet.flipAtMinutes} min mark)`,
        }]
      : undefined,
  };

  const stages: CookStage[] = [cookStage];
  if (sheet.restMinutes > 0) {
    stages.push({
      id: `${sheet.id}-rest`,
      label: 'Rest',
      durationSec: sheet.restMinutes * 60,
      donenessCue: 'Juices redistribute. Do not slice yet.',
    });
  }

  return {
    planId: `${sheet.appliance}/${sheet.foodSlug}`,
    title: `${sheet.food} · ${sheet.appliance.replace('-', ' ')}`,
    appliance: sheet.appliance,
    sourceHref: `/how-long/${sheet.appliance}/${sheet.foodSlug}`,
    stages,
  };
}

export function planIdFromParam(param: string): { appliance: string; foodSlug: string } | null {
  const [appliance, foodSlug] = param.split('/');
  if (!appliance || !foodSlug) return null;
  return { appliance, foodSlug };
}

export function resolvePlan(planId: string): CookPlan | null {
  const parsed = planIdFromParam(planId);
  if (!parsed) return null;
  const sheet = COOK_TIME_DATASHEETS.find(
    (d) => d.appliance === parsed.appliance && d.foodSlug === parsed.foodSlug,
  );
  return sheet ? datasheetToCookPlan(sheet) : null;
}

export function totalPlanSeconds(plan: CookPlan): number {
  return plan.stages.reduce((sum, s) => sum + s.durationSec, 0);
}

export interface DatasheetIndexEntry {
  planId: string;
  title: string;
  appliance: string;
  timeLabel: string;
}

export function buildDatasheetIndex(): DatasheetIndexEntry[] {
  return COOK_TIME_DATASHEETS.map((d) => ({
    planId: `${d.appliance}/${d.foodSlug}`,
    title: d.food,
    appliance: d.appliance,
    timeLabel: d.timeFormatted,
  })).sort((a, b) => a.appliance.localeCompare(b.appliance) || a.title.localeCompare(b.title));
}

export function formatClock(totalSec: number): string {
  const sign = totalSec < 0 ? '-' : '';
  const abs = Math.abs(Math.round(totalSec));
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  if (h > 0) return `${sign}${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${sign}${m}:${String(s).padStart(2, '0')}`;
}
