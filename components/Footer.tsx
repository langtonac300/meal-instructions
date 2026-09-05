import React from 'react';
import Link from 'next/link';
import { ALL_TOOLS } from '@/data/tools-directory';
import { SITE_NAME } from '@/lib/site';
import Logo from '@/components/Logo';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: 'Recipes',
    links: [
      { label: 'All categories', href: '/categories' },
      { label: 'Cook times', href: '/how-long' },
      { label: 'Temp cheat sheet', href: '/cheat-sheet' },
      { label: 'Food storage', href: '/storage' },
    ],
  },
  {
    heading: 'Kitchen',
    links: [
      { label: `All ${ALL_TOOLS.length} tools`, href: '/tools' },
      { label: 'Print pack (PDF)', href: '/print-pack' },
      { label: 'Field guides', href: '/blog' },
      { label: 'Merch', href: '/shop' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

/**
 * Site footer. /llms.txt, /llms-full.txt, /sitemap.xml and /robots.txt stay
 * real routes and are declared in robots.ts and sitemap.ts; they no longer
 * need a link on the page.
 */
export default function Footer() {
  return (
    <footer className="bg-paper border-t border-hairline text-ink no-print">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 py-10 flex flex-wrap items-start justify-between gap-10">
        {/* Brand */}
        <div className="max-w-[34ch]">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${SITE_NAME} home`}>
            <Logo size="sm" variant="mark-only" />
            <span className="flex flex-col">
              <span className="font-sans text-[13px] font-black uppercase tracking-[0.06em] text-ink leading-none">
                {SITE_NAME}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-subtle mt-1 leading-none">
                No fluff, just the instructions
              </span>
            </span>
          </Link>
          <p className="mt-4 text-[14px] text-ink-muted leading-relaxed">
            Instant directions, exact temps, 20-word execution. No popups, no interstitials, no essays
            about childhood summers.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex flex-wrap gap-x-14 gap-y-8 text-[14px] text-ink-muted">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-ink font-bold mb-3">{col.heading}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Colophon */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-8 font-mono text-[11px] text-ink-subtle uppercase tracking-[0.08em]">
        © {new Date().getFullYear()} {SITE_NAME}
      </div>
    </footer>
  );
}
