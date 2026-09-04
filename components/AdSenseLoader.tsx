'use client';

import { useEffect } from 'react';

const ADSENSE_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9801578474509944';

/**
 * Injects the AdSense loader after hydration.
 *
 * Two constraints have to hold at once, and neither `next/script` nor a plain
 * <script> in <head> satisfies both:
 *
 *  - It must not be in <head> during hydration. adsbygoogle.js injects
 *    show_ads_impl.js as a <head> sibling as soon as it runs. If that happens
 *    while React is still matching <head> against the SSR HTML, every following
 *    child shifts one slot and React reports an attribute mismatch it refuses
 *    to patch up.
 *  - The tag must carry no attributes Google doesn't expect. next/script solves
 *    the first constraint but stamps data-nscript, which AdSense warns about.
 *
 * Appending it ourselves in an effect satisfies both: it runs after hydration,
 * and the tag is exactly what Google's own snippet produces.
 */
export default function AdSenseLoader() {
  useEffect(() => {
    // React 18+ runs effects twice in dev StrictMode, and client navigations
    // re-mount the layout — match on src so we never append a second loader.
    if (document.querySelector(`script[src="${ADSENSE_SRC}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = ADSENSE_SRC;
    document.head.appendChild(script);
  }, []);

  return null;
}
