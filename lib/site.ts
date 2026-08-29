const raw = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL = (raw ?? 'http://localhost:3000').replace(/\/$/, '');
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Dad Meals // Zero Fluff';

export function getSiteUrl(): string {
  return SITE_URL;
}

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
export const absoluteUrl = abs;
