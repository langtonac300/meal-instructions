import React from 'react';

/**
 * A calendar mark in Google's four brand colours.
 *
 * Deliberately a generic calendar built from the Google palette rather than a
 * copy of the Google Calendar logo: it reads unmistakably as "this goes to
 * Google Calendar" without reproducing a trademarked asset we have no licence
 * to redraw. Colours are Google's published brand values.
 */
export default function GoogleCalendarMark({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {/* Four quadrants of the page, one per brand colour. */}
      <path d="M4 8h7v7H4z" fill="#4285F4" />
      <path d="M13 8h7v7h-7z" fill="#EA4335" />
      <path d="M4 15h7v5H4z" fill="#FBBC04" />
      <path d="M13 15h7v5h-7z" fill="#34A853" />
      {/* Binding rail and rings. */}
      <path d="M3 5h18v3H3z" fill="#5F6368" />
      <path d="M7 2.5h1.6v3.2H7zM15.4 2.5H17v3.2h-1.6z" fill="#5F6368" />
    </svg>
  );
}
