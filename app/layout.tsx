import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_URL, SITE_NAME, abs } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} // No-Fluff Reference & Air Fryer Engine`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'No-fluff cooking reference for dads. Parametric time & temperature datasheets and quality-gated weeknight meals with instant 20-word execution.',
  keywords: [
    'air fryer cook times',
    'how long to cook chicken in air fryer',
    'dad meals',
    'quick weeknight dinners',
    'no fluff recipe website',
    '15 minute meals',
    'cast iron smash burgers',
    'cooking cheat sheet',
  ],
  authors: [{ name: 'Dad Meals Kitchen' }],
  creator: 'Dad Meals',
  publisher: 'Dad Meals',
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
    title: `${SITE_NAME} // Zero-Fluff Cooking Reference`,
    description:
      'Parametric cook-time database and quality-gated dad meals. Exact temperatures and zero blog stories.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} // Zero-Fluff Cooking Reference`,
    description: 'Parametric cook-time database. No fluff. Just execution.',
  },
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

  // HR-8: Small blocking script in <head> to read localStorage and stamp data-mode on <html> before first paint
  const modeInitScript = `
    (function() {
      try {
        var params = new URLSearchParams(window.location.search);
        var qMode = params.get('mode');
        var stored = localStorage.getItem('dad_mode') || localStorage.getItem('dad_meals_recipe_mode');
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
        <script
          dangerouslySetInnerHTML={{ __html: modeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-ink selection:text-paper text-ink bg-paper">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
