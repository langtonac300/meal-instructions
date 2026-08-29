import { BlogPost } from './types';
import { SITE_URL, SITE_NAME, abs, absoluteUrl } from './site';

/**
 * Generate Schema.org BlogPosting / Article JSON-LD for maximum SEO
 */
export function generateBlogPostingSchema(post: BlogPost) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.subtitle,
    description: post.summary,
    url: abs(`/blog/${post.slug}`),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': abs(`/blog/${post.slug}`),
    },
    image: [abs('/opengraph-image.png')],
    datePublished: post.datePublished,
    dateModified: post.lastUpdated,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: abs('/logo-512.png'),
      },
    },
    articleSection: post.categoryName,
    keywords: post.keywords.join(', '),
    wordCount: post.contentMarkdown.split(/\s+/).length,
    inLanguage: 'en-US',
  };

  return schema;
}

/**
 * Generate Schema.org BreadcrumbList JSON-LD
 */
export function generateBlogBreadcrumbsSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Field Guides & Culinary Science',
        item: abs('/blog'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: abs(`/blog/${post.slug}`),
      },
    ],
  };
}

/**
 * Generate Schema.org FAQPage JSON-LD if post has FAQs
 */
export function generateBlogFaqSchema(post: BlogPost) {
  if (!post.faq || post.faq.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/**
 * Lightweight, robust, deterministic SSR Markdown to HTML converter
 */
export function formatBlogMarkdownToHtml(markdown: string): string {
  const lines = markdown.trim().split('\n');
  const out: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';
  let inTable = false;
  let tableHeaderProcessed = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Table detection
    if (line.startsWith('|') && line.endsWith('|')) {
      if (inList) {
        out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      if (!inTable) {
        inTable = true;
        tableHeaderProcessed = false;
        out.push('<div class="overflow-x-auto my-6"><table class="min-w-full text-xs font-mono hairline-border bg-paper-card">');
      }

      // Check if divider line
      if (line.includes('---') || line.includes(':---')) {
        tableHeaderProcessed = true;
        continue;
      }

      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());

      if (!tableHeaderProcessed) {
        out.push('<thead class="bg-paper-200 hairline-b"><tr>');
        for (const cell of cells) {
          out.push(`<th class="px-4 py-2.5 text-left font-bold text-ink uppercase tracking-wider">${formatInlineStyles(cell)}</th>`);
        }
        out.push('</tr></thead><tbody class="divide-y divide-hairline">');
      } else {
        out.push('<tr class="hover:bg-paper-100 transition-colors">');
        for (const cell of cells) {
          out.push(`<td class="px-4 py-2.5 text-ink leading-relaxed">${formatInlineStyles(cell)}</td>`);
        }
        out.push('</tr>');
      }
      continue;
    } else if (inTable) {
      out.push('</tbody></table></div>');
      inTable = false;
    }

    // Blank line
    if (!line) {
      if (inList) {
        out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      continue;
    }

    // Horizontal Rule
    if (line === '---' || line === '***') {
      if (inList) {
        out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      out.push('<hr class="my-8 border-hairline" />');
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      if (inList) {
        out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      const text = line.substring(4);
      out.push(`<h3 class="text-xl sm:text-2xl font-bold uppercase tracking-tight font-sans text-ink mt-8 mb-3">${formatInlineStyles(text)}</h3>`);
      continue;
    }

    if (line.startsWith('#### ')) {
      if (inList) {
        out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      const text = line.substring(5);
      out.push(`<h4 class="text-base sm:text-lg font-bold font-sans text-ink mt-6 mb-2">${formatInlineStyles(text)}</h4>`);
      continue;
    }

    // Math / Formula block: $$...$$
    if (line.startsWith('$$') && line.endsWith('$$')) {
      if (inList) {
        out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      const formula = line.substring(2, line.length - 2).trim();
      out.push(`<div class="p-4 my-4 bg-paper-100 hairline-border font-mono text-xs text-ink text-center tracking-wide overflow-x-auto"><span class="font-bold text-accent">${formula}</span></div>`);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      if (inList) {
        out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      const text = line.substring(2);
      out.push(`<blockquote class="border-l-2 border-accent pl-4 py-1 my-4 text-xs font-mono text-ink-muted italic">${formatInlineStyles(text)}</blockquote>`);
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = true;
        listType = 'ul';
        out.push('<ul class="space-y-2 my-4 list-disc list-inside text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">');
      }
      const text = line.substring(2);
      out.push(`<li class="leading-relaxed"><span class="text-ink">${formatInlineStyles(text)}</span></li>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      if (!inList || listType !== 'ol') {
        if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = true;
        listType = 'ol';
        out.push('<ol class="space-y-2 my-4 list-decimal list-inside text-xs sm:text-sm text-ink-muted font-sans leading-relaxed">');
      }
      const text = line.replace(/^\d+\.\s/, '');
      out.push(`<li class="leading-relaxed"><span class="text-ink">${formatInlineStyles(text)}</span></li>`);
      continue;
    }

    // Paragraph
    if (inList) {
      out.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
    }
    out.push(`<p class="text-xs sm:text-sm text-ink leading-relaxed font-sans my-3">${formatInlineStyles(line)}</p>`);
  }

  if (inList) out.push(listType === 'ul' ? '</ul>' : '</ol>');
  if (inTable) out.push('</tbody></table></div>');

  return out.join('\n');
}

function formatInlineStyles(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-ink-muted">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-paper-200 hairline-border rounded font-mono text-[11px] text-ink">$1</code>');
}
