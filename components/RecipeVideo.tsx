'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { durationLabel, type RecipeVideo as Video } from '@/lib/recipe-video';

interface RecipeVideoProps {
  video: Video;
}

/**
 * Click-to-play facade for the recipe's curated clip.
 *
 * Nothing from YouTube loads until the reader asks for it: the poster is a
 * plain <img> (no optimiser round trip to a third party), and the iframe is
 * only mounted on click. Two reasons — an autoloaded embed costs roughly half
 * a megabyte and drags LCP on the page this site is judged on, and it would
 * set third-party cookies before anyone has answered the consent banner.
 *
 * The player, once mounted, is youtube-nocookie.com. The title, channel, and
 * duration around it are server-rendered, so the clip is visible to crawlers
 * that never click and never run JavaScript.
 */
export default function RecipeVideo({ video }: RecipeVideoProps) {
  const [playing, setPlaying] = useState(false);
  const length = durationLabel(video.duration);

  return (
    <figure className="mt-10">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2.5 border-b border-ink">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle">
          Watch the technique
        </span>
        {length && (
          <span className="font-mono text-[13px] text-ink-muted">{length}</span>
        )}
      </figcaption>

      <div className="relative w-full aspect-video bg-paper-200 overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${video.title}`}
            className="group absolute inset-0 w-full h-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnailUrl}
              alt=""
              width={video.thumbnailWidth}
              height={video.thumbnailHeight}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span
              className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors"
              aria-hidden="true"
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 px-5 py-3.5 bg-ink text-paper group-hover:bg-accent transition-colors"
              aria-hidden="true"
            >
              <Play className="w-[18px] h-[18px] fill-current" />
              <span className="text-[15px] font-bold">Play</span>
            </span>
          </button>
        )}
      </div>

      <p className="mt-2.5 text-[15px] leading-[1.5] text-ink-muted">
        <span className="text-ink font-semibold">{video.title}</span>
        {' · '}
        <a
          href={video.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink transition-colors"
        >
          {video.channel}
        </a>
        <br />
        {video.why}
      </p>
    </figure>
  );
}
