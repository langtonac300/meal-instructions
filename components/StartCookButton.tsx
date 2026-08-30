import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

interface Props {
  appliance: string;
  foodSlug: string;
  className?: string;
  label?: string;
}

/**
 * Deep-links into the live-cook companion at /cook, prefilling this datasheet
 * as an active timer. Keep encoding of the '/' literal so the URL stays
 * legible in the address bar; both encoded and literal forms parse the same.
 */
export default function StartCookButton({ appliance, foodSlug, className, label = 'Start cook' }: Props) {
  const href = `/cook?ds=${appliance}/${foodSlug}`;
  return (
    <Link
      href={href}
      className={
        className ??
        'inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-paper uppercase font-bold font-mono text-xs tracking-wider hover:bg-accent-dark transition-colors'
      }
    >
      <Play className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
}
