import { MetadataRoute } from 'next';

/**
 * Web App Manifest — also the source of truth for the Android Trusted Web
 * Activity. `bubblewrap init` reads this file to seed the app name, colours,
 * launcher icon and splash screen, so changes here flow into the Play build.
 * See ANDROID.md.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Meal Instructions // No Fluff, Just the Instructions',
    short_name: 'Meal Instructions',
    description: 'Precision parametric cooking reference, cook-time datasheets, and 50 science field guides.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#F5F4F0',
    theme_color: '#111111',
    categories: ['food', 'lifestyle', 'utilities'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        // Glyph inset to 62% of the canvas so it survives Android's adaptive
        // icon masks (circle, squircle, teardrop). Bubblewrap uses this one
        // for the launcher icon.
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
