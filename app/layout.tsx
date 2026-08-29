import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://dadmeals.com'),
  title: {
    default: 'Dad Meals // Zero Fluff Air Fryer & Quick Family Dinners',
    template: '%s | Dad Meals Zero Fluff',
  },
  description:
    'No life stories, zero blog fluff, 100% specific cooking directions. High-speed air fryer, 15-minute skillet, and sheet pan meals engineered for busy dads.',
  keywords: [
    'air fryer recipes',
    'quick dad meals',
    'no fluff recipes',
    '15 minute dinners',
    'easy family meals',
    'air fryer chicken tenders',
    'air fryer burgers',
    'air fryer salmon',
    'crispy air fryer recipes',
    'dad cooking guide',
  ],
  authors: [{ name: 'Dad Meals Zero Fluff Team' }],
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
    type: 'website',
    locale: 'en_US',
    url: 'https://dadmeals.com',
    siteName: 'Dad Meals Zero Fluff',
    title: 'Dad Meals // Zero Fluff Air Fryer & Quick Family Dinners',
    description:
      'No life stories. 0 popups. Instant dual-mode directions (Get to the Point vs Step-by-Step). Over 40+ tested dad meals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dad Meals // Zero Fluff Cooking',
    description: '100% directions. 0 fluff. Quick air fryer & weeknight family recipes.',
  },
  alternates: {
    canonical: 'https://dadmeals.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dad Meals // Zero Fluff',
    url: 'https://dadmeals.com',
    description: 'High-speed, zero-fluff cooking instructions for air fryer and quick dad meals.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://dadmeals.com/recipes?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="bg-paper text-ink">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper text-ink flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
