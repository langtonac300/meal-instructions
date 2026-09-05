/**
 * Tokenizer shared by the cook-time lookup index (server) and the lookup
 * input (client). No data imports: the client component reaches for this
 * module, so it must never pull a corpus into a browser bundle.
 */

/** Function words that add nothing to a food lookup. Everything else is kept. */
const STOPWORDS = new Set([
  'a',
  'an',
  'and',
  'at',
  'do',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'long',
  'my',
  'of',
  'on',
  'or',
  'the',
  'to',
  'with',
  'you',
  'your',
]);

/** Lowercased words, punctuation stripped, hyphenated words also split. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((w) => w.length > 0 && !STOPWORDS.has(w));
}
