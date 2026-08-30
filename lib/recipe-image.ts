import fs from 'node:fs';
import path from 'node:path';
import { abs } from './site';

const RECIPES_IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'recipes');
const FALLBACK_IMAGE = '/opengraph-image.png';

let cachedIndex: Set<string> | null = null;

function loadIndex(): Set<string> {
  if (cachedIndex) return cachedIndex;
  try {
    const files = fs.readdirSync(RECIPES_IMAGE_DIR);
    cachedIndex = new Set(files);
  } catch {
    cachedIndex = new Set();
  }
  return cachedIndex;
}

export function resolveRecipeImage(recipeImage: string | undefined): string {
  if (!recipeImage) return FALLBACK_IMAGE;
  const clean = recipeImage.startsWith('/') ? recipeImage : `/${recipeImage}`;
  const marker = '/images/recipes/';
  const idx = clean.indexOf(marker);
  if (idx === -1) return clean;
  const filename = clean.slice(idx + marker.length);
  const files = loadIndex();
  return files.has(filename) ? clean : FALLBACK_IMAGE;
}

export function resolveRecipeImageAbsolute(recipeImage: string | undefined): string {
  return abs(resolveRecipeImage(recipeImage));
}
