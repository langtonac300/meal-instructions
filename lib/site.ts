const getRawSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return undefined;
};

const raw = getRawSiteUrl();

if (!raw && process.env.NODE_ENV === 'production') {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL is required for production builds. Configure NEXT_PUBLIC_SITE_URL in environment or .env.production.'
  );
}

export const SITE_URL = (raw ?? 'http://localhost:3000').replace(/\/$/, '');
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Dad Meals // Zero Fluff';

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
export const absoluteUrl = abs;
export const getSiteUrl = () => SITE_URL;
