import type { Metadata } from 'next';
import Script from 'next/script';
import AdSenseLoader from '@/components/AdSenseLoader';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WebMCPClient from '@/components/WebMCPClient';
import EngagementTracker from '@/components/EngagementTracker';
import ConsentBanner from '@/components/ConsentBanner';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import { SITE_URL, SITE_NAME, abs } from '@/lib/site';

// Google Tag Manager container. Kept alongside the GA4 / AdSense ids rather than
// in env so a missing Vercel variable can't silently drop the container.
const GTM_ID = 'GTM-5SVJCJB7';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | No Fluff, Just the Instructions`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'No-fluff cooking reference and parametric time & temperature datasheets. Fast, quality-gated weeknight meals with instant directions. No fluff, just the instructions.',
  keywords: [
    'meal instructions',
    'cooking instructions',
    'no fluff recipes',
    'air fryer cook times',
    'how long to cook chicken in air fryer',
    'quick weeknight dinners',
    '15 minute meals',
    'cast iron smash burgers',
    'cooking cheat sheet',
  ],
  authors: [{ name: 'Meal Instructions Kitchen' }],
  creator: 'Meal Instructions',
  publisher: 'Meal Instructions',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} — No Fluff, Just the Instructions`,
    description:
      'Parametric cook-time database and quality-gated weeknight meals. Exact temperatures and zero blog stories. No fluff, just the instructions.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — No Fluff, Just the Instructions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — No Fluff, Just the Instructions`,
    description: 'Parametric cook-time database. No fluff, just the instructions.',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global WebSite & Organization JSON-LD Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-512.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    description: 'Precision parametric cooking reference, cook-time datasheets, and quality-gated meals.',
  };


  // HR-8: Small blocking script in <head> to read localStorage and stamp data-mode on <html> before first paint
  const modeInitScript = `
    (function() {
      try {
        var params = new URLSearchParams(window.location.search);
        var qMode = params.get('mode');
        var stored = localStorage.getItem('meal_instructions_mode') || localStorage.getItem('recipe_mode') || localStorage.getItem('dad_mode') || localStorage.getItem('dad_meals_recipe_mode');
        var mode = qMode || stored || 'quick';
        if (mode === 'fast') mode = 'quick';
        document.documentElement.setAttribute('data-mode', mode);
      } catch (e) {
        document.documentElement.setAttribute('data-mode', 'quick');
      }
    })();
  `;

  // Kitchen profile, applied before first paint for the same reason as the mode
  // script above (HR-8): personalisation resolved in an effect would swap
  // content after hydration and shift layout. This only stamps attributes —
  // every appliance's content stays in the HTML, which HR-6 requires because
  // the LLM crawlers this site targets do not execute JavaScript.
  const profileInitScript = `
    (function() {
      try {
        var raw = localStorage.getItem('mi_profile_v1');
        if (!raw) return;
        var p = JSON.parse(raw);
        var el = document.documentElement;
        if (p && Array.isArray(p.appliances) && p.appliances.length) {
          el.setAttribute('data-appliances', p.appliances.join(' '));
        }
        if (p && typeof p.adults === 'number') el.setAttribute('data-adults', String(p.adults));
        if (p && typeof p.kids === 'number') el.setAttribute('data-kids', String(p.kids));
        if (p && Array.isArray(p.avoid) && p.avoid.length) {
          el.setAttribute('data-avoid', p.avoid.join(' '));
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" className="bg-paper text-ink" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 defaults — denied until user opts in via ConsentBanner.
            Restored if a prior "granted" choice is in localStorage.

            Deliberately no gtag('config', ...) here: GA4 is configured inside the
            GTM container (GTM-5SVJCJB7), so configuring it here as well would
            double-count every pageview. The gtag() shim stays — Consent Mode v2
            is expressed through it, and GTM reads those commands off dataLayer.

            ads_data_redaction redacts ad identifiers in the pings that still go
            out while ad_storage is denied. url_passthrough forwards gclid in the
            URL when cookies are unavailable, which is the only way Ads can
            attribute a conversion from a visitor who never accepts. Both are
            set after the defaults, per Google's advanced consent-mode sample. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              var stored = null;
              try { stored = localStorage.getItem('mi_consent_v1'); } catch (e) {}
              var state = stored === 'granted' ? 'granted' : 'denied';
              gtag('consent', 'default', {
                ad_storage: state,
                ad_user_data: state,
                ad_personalization: state,
                analytics_storage: state,
                wait_for_update: 500,
              });
              gtag('set', 'ads_data_redaction', true);
              gtag('set', 'url_passthrough', true);
            `,
          }}
        />
        {/* Google Tag Manager — timing event only, and deliberately after the
            consent defaults above so `consent: default` is already on the queue
            when gtm.js drains it. The stock snippet's insertBefore() would add a
            <script> as a <head> sibling the moment it ran; during hydration that
            shifts every following child by one slot, which is the same failure
            mode documented in <AdSenseLoader />. The loader itself is therefore
            mounted after hydration, at the bottom of <body>. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`,
          }}
        />
        {/* Google AdSense — only the account meta belongs here. The loader script
            is appended after hydration by <AdSenseLoader /> in <body>, because
            adsbygoogle.js injects show_ads_impl.js as a <head> sibling the moment
            it runs. Loading it here shifted every following <head> child by one
            slot mid-hydration, which is what produced the attribute mismatch. */}
        <meta name="google-adsense-account" content="ca-pub-9801578474509944" />
        {/* Google Chrome WebMCP Origin Trial Token */}
        <meta
          httpEquiv="origin-trial"
          content="ArL4YLS8ktXkeiF8xEjzRJEQLvHmy4QZkd8aQbVsrQSLyVqY3bOT3r4c48sWteNjfHETXLE0EI4mk+B9ttHALwwAAABYeyJvcmlnaW4iOiJodHRwczovL3d3dy5tZWFsaW5zdHJ1Y3Rpb25zLmNvbTo0NDMiLCJmZWF0dXJlIjoiV2ViTUNQIiwiZXhwaXJ5IjoxNzk0ODczNjAwfQ=="
        />
        <script
          dangerouslySetInnerHTML={{ __html: modeInitScript }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: profileInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-ink selection:text-paper text-ink bg-paper">
        {/* Google Tag Manager (noscript) — must be the first thing in <body>. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <SessionProviderWrapper>
          <WebMCPClient />
          <EngagementTracker />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ConsentBanner />
        </SessionProviderWrapper>

        {/* Third-party loaders mount after hydration so neither can insert a node
            into <head> while React is still matching it against the SSR HTML.
            Consent-mode defaults stay inline in <head> and still run first. */}
        <AdSenseLoader />
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
      </body>
    </html>
  );
}
