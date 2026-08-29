import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://dadmeals.com'),
  title: {
    default: 'Dad Meals // Zero Fluff Cooking & Air Fryer Engine',
    template: '%s | Dad Meals // Zero Fluff',
  },
  description:
    '1,050+ battle-tested simple air fryer and dad meals with zero life stories or blog fluff. Instant directions, exact temps, and 20-word execution.',
  keywords: [
    'dad recipes',
    'air fryer recipes',
    'quick weeknight dinners',
    'no fluff recipe website',
    '15 minute meals',
    'high protein dad cooking',
    'kid friendly dinners',
    'crispy chicken tenders',
    'cast iron smash burgers',
  ],
  authors: [{ name: 'Dad Meals Kitchen' }],
  creator: 'Dad Meals',
  publisher: 'Dad Meals',
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
    title: 'Dad Meals // Zero Fluff Cooking & Air Fryer Engine',
    description:
      '1,050+ battle-tested simple air fryer and dad meals with zero life stories or blog fluff. Instant directions, exact temps, and 20-word execution.',
    url: 'https://dadmeals.com',
    siteName: 'Dad Meals',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dad Meals // Zero Fluff Cooking Engine',
    description: '1,050+ battle-tested simple dad meals. No fluff. Just execution.',
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
    name: 'Dad Meals // Zero Fluff',
    url: 'https://dadmeals.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://dadmeals.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="bg-paper text-ink">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-ink selection:text-paper">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
