import type { Metadata } from 'next';
import Script from 'next/script';
import AdSenseLoader from '@/components/AdSenseLoader';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WebMCPClient from '@/components/WebMCPClient';
import ConsentBanner from '@/components/ConsentBanner';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import { SITE_URL, SITE_NAME, abs } from '@/lib/site';

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

  return (
    <html lang="en" className="bg-paper text-ink" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 defaults — denied until user opts in via ConsentBanner.
            Restored if a prior "granted" choice is in localStorage. */}
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
              gtag('js', new Date());
              gtag('config', 'G-0S1B04Q1S9');
            `,
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-ink selection:text-paper text-ink bg-paper">
        <SessionProviderWrapper>
          <WebMCPClient />
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
          id="gtag-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0S1B04Q1S9"
        />
      </body>
    </html>
  );
}
