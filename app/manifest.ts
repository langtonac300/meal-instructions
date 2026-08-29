import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meal Instructions // No Fluff, Just the Instructions',
    short_name: 'Meal Instructions',
    description: 'Precision parametric cooking reference, cook-time datasheets, and 50 science field guides.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F4F0',
    theme_color: '#111111',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
