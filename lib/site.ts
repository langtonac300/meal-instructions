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
// The brand is fixed, not configuration. This used to read NEXT_PUBLIC_SITE_NAME,
// and a stale value on Vercel ("Dad Meals // Zero Fluff") kept every production
// <title> and OpenGraph title on the old name long after the rebrand.
export const SITE_NAME = 'Meal Instructions';

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
export const absoluteUrl = abs;
export const getSiteUrl = () => SITE_URL;
