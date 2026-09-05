import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

console.log(`\n--- RUNNING SEO AUDIT (npm run audit:seo) ---`);

let errors = [];

// ─── 1. Build output check ───────────────────────────────────────────────────

const nextAppServerDir = path.join(ROOT, '.next/server/app');
if (!fs.existsSync(nextAppServerDir)) {
  console.error('❌ SEO AUDIT FAILED: .next build output not found.');
  console.error('You must run "npm run build" before running "npm run audit:seo".\n');
  process.exit(1);
}

// ─── 2. Forbidden domain strings ─────────────────────────────────────────────

const scanDirs = ['app', 'lib', 'components', 'content'];
const forbiddenStrings = ['dadmeals.com', 'https://dadmeals', 'http://dadmeals'];

function scanDirectory(dir) {
  const fullPath = path.join(ROOT, dir);
  if (!fs.existsSync(fullPath)) return;
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const resPath = path.join(fullPath, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(path.join(dir, entry.name));
    } else if (
      entry.isFile() &&
      /\.(ts|tsx|js|mjs)$/.test(entry.name)
    ) {
      const content = fs.readFileSync(resPath, 'utf-8');
      for (const str of forbiddenStrings) {
        if (content.includes(str)) {
          errors.push(
            `Hardcoded domain "${str}" found in ${path.relative(ROOT, resPath)}. Must import from lib/site.ts.`
          );
        }
      }
    }
  }
}

for (const dir of scanDirs) {
  scanDirectory(dir);
}

// ─── 3. Recipe-specific checks (canonical, dual-mode, JSON-LD) ───────────────

const recipesJsonPath = path.join(ROOT, 'data/recipes.json');
if (!fs.existsSync(recipesJsonPath)) {
  errors.push('Missing data/recipes.json');
} else {
  const recipes = JSON.parse(fs.readFileSync(recipesJsonPath, 'utf-8'));
  const recipesServerDir = path.join(nextAppServerDir, 'recipes');
  let auditedCount = 0;

  for (const r of recipes) {
    const slug = r.slug;
    const htmlFile = path.join(recipesServerDir, `${slug}.html`);
    if (!fs.existsSync(htmlFile)) {
      errors.push(`[${slug}] Built HTML file missing at ${htmlFile}`);
      continue;
    }
    const html = fs.readFileSync(htmlFile, 'utf-8');
    auditedCount++;

    if (!html.includes('<link rel="canonical"') && !html.includes('<link rel=\\"canonical\\"')) {
      errors.push(`[${slug}] Missing canonical link tag in built HTML.`);
    }

    const hasFastPanel = html.includes('data-mode-panel="fast"') || html.includes('data-mode-panel="quick"');
    const hasDetailedPanel = html.includes('data-mode-panel="detailed"');
    if (!hasFastPanel) {
      errors.push(`[${slug}] SSR HTML missing quick mode panel (data-mode-panel="fast/quick").`);
    }
    if (!hasDetailedPanel) {
      errors.push(`[${slug}] SSR HTML missing detailed mode panel (data-mode-panel="detailed") — HR-6 violation.`);
    }

    if (r.quickVersion && r.quickVersion.bullets && r.quickVersion.bullets.length > 0) {
      const firstQuickBullet = r.quickVersion.bullets[0];
      if (!html.includes(firstQuickBullet)) {
        errors.push(`[${slug}] SSR HTML missing quick bullet content: "${firstQuickBullet}"`);
      }
    }
    if (r.detailedSteps && r.detailedSteps.length > 0) {
      const firstStepTitle = r.detailedSteps[0].title;
      if (!html.includes(firstStepTitle)) {
        errors.push(`[${slug}] SSR HTML missing detailed step title: "${firstStepTitle}"`);
      }
    }

    if (!html.includes('"@context":"https://schema.org"') && !html.includes('"@context": "https://schema.org"')) {
      errors.push(`[${slug}] Missing Schema.org context in JSON-LD.`);
    }
    if (!html.includes('"@type":"Recipe"') && !html.includes('"@type": "Recipe"')) {
      errors.push(`[${slug}] Missing Schema.org Recipe @type in JSON-LD.`);
    }
  }
  console.log(`Audited ${auditedCount} recipe HTML pages for canonicals, dual-mode SSR, and JSON-LD.`);
}

// ─── 4. Tool pages ───────────────────────────────────────────────────────────

const toolRoutes = [
  'tools', 'air-fryer-calculator', 'cheat-sheet', 'reheat', 'frozen-cook',
  'dinner-sync', 'meat-math', 'internal-temp', 'salt-math', 'kid-split',
  'troubleshoot', 'smoke-points', 'steak-timer', 'turkey-calculator',
  'bakers-percentage', 'recipe-scaler', 'slow-cooker-converter',
  'sous-vide-calculator', 'grill-fuel-estimator', 'egg-timer',
  'pasta-water-ratio', 'marinade-ratio', 'substitutions', 'thaw-timer',
  'food-cost-calculator', 'macronutrient-calculator', 'caffeine-steep-timer',
  'brisket-timeline', 'ground-beef-fat-ratio', 'dutch-oven-bread-timer',
  'cheese-melt-matrix', 'print-pack',
];

let auditedToolsCount = 0;
for (const toolSlug of toolRoutes) {
  const toolHtmlPath = path.join(nextAppServerDir, `${toolSlug}.html`);
  if (!fs.existsSync(toolHtmlPath)) {
    errors.push(`[Tool: /${toolSlug}] Built HTML file missing at ${toolHtmlPath}`);
    continue;
  }
  const html = fs.readFileSync(toolHtmlPath, 'utf-8');
  auditedToolsCount++;

  if (!html.includes('<link rel="canonical"') && !html.includes('<link rel=\\"canonical\\"')) {
    errors.push(`[Tool: /${toolSlug}] Missing canonical link tag in built HTML.`);
  }
  if (!html.includes('schema.org')) {
    errors.push(`[Tool: /${toolSlug}] Missing Schema.org JSON-LD structured data.`);
  }
}
console.log(`Audited ${auditedToolsCount} dedicated tool HTML pages for canonicals and Schema.org JSON-LD.`);

// ─── 5. Blog pages ───────────────────────────────────────────────────────────

const blogServerDir = path.join(nextAppServerDir, 'blog');
let auditedBlogCount = 0;

const blogIndexHtmlPath = path.join(nextAppServerDir, 'blog.html');
if (fs.existsSync(blogIndexHtmlPath)) {
  const indexHtml = fs.readFileSync(blogIndexHtmlPath, 'utf-8');
  if (!indexHtml.includes('<link rel="canonical"') && !indexHtml.includes('<link rel=\\"canonical\\"')) {
    errors.push(`[/blog] Missing canonical link tag in built HTML.`);
  }
  if (!indexHtml.includes('schema.org')) {
    errors.push(`[/blog] Missing Schema.org structured data.`);
  }
} else {
  errors.push(`Built HTML file missing for /blog at ${blogIndexHtmlPath}`);
}

if (fs.existsSync(blogServerDir)) {
  const blogFiles = fs.readdirSync(blogServerDir).filter((f) => f.endsWith('.html'));
  auditedBlogCount = blogFiles.length;
  for (const bFile of blogFiles) {
    const slug = bFile.replace(/\.html$/, '');
    const bHtml = fs.readFileSync(path.join(blogServerDir, bFile), 'utf-8');
    if (!bHtml.includes('<link rel="canonical"') && !bHtml.includes('<link rel=\\"canonical\\"')) {
      errors.push(`[Blog: /blog/${slug}] Missing canonical link tag in built HTML.`);
    }
    if (!bHtml.includes('BlogPosting') && !bHtml.includes('Article')) {
      errors.push(`[Blog: /blog/${slug}] Missing BlogPosting or Article Schema.org JSON-LD.`);
    }
    if (!bHtml.includes('BreadcrumbList')) {
      errors.push(`[Blog: /blog/${slug}] Missing BreadcrumbList Schema.org JSON-LD.`);
    }
  }
  console.log(`Audited ${auditedBlogCount} blog field guide HTML pages for canonicals, breadcrumbs, and BlogPosting JSON-LD.`);
} else {
  errors.push(`Missing built blog directory at ${blogServerDir}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEO-018: UNIVERSAL SWEEP — every built HTML page gets baseline checks
// ═══════════════════════════════════════════════════════════════════════════════

function collectHtmlFiles(dir, prefix = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      results.push(...collectHtmlFiles(path.join(dir, entry.name), `${prefix}${entry.name}/`));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const routePath = `${prefix}${entry.name.replace(/\.html$/, '')}`;
      results.push({ file: path.join(dir, entry.name), route: routePath });
    }
  }
  return results;
}

const allPages = collectHtmlFiles(nextAppServerDir);
const SKIP_ROUTES = new Set(['_not-found', 'sitemap.xml', 'robots.txt', 'manifest.webmanifest', 'opengraph-image']);
let universalAuditCount = 0;
let canonicalCheckCount = 0;
let breadcrumbCheckCount = 0;

// Read the site URL from .env.local for canonical validation
let siteUrl = '';
const envLocalPath = path.join(ROOT, '.env.local');
const envProdPath = path.join(ROOT, '.env.production');
for (const envPath of [envProdPath, envLocalPath]) {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/NEXT_PUBLIC_SITE_URL\s*=\s*(.+)/);
    if (match) {
      siteUrl = match[1].trim().replace(/\/$/, '');
      break;
    }
  }
}

for (const { file, route } of allPages) {
  if (SKIP_ROUTES.has(route) || route.startsWith('_') || route.endsWith('.xml') || route.endsWith('.txt') || route.endsWith('.webmanifest')) {
    continue;
  }

  const html = fs.readFileSync(file, 'utf-8');
  universalAuditCount++;

  // ── SEO-018: canonical + BreadcrumbList on every page ──

  const hasCanonical = html.includes('<link rel="canonical"') || html.includes('<link rel=\\"canonical\\"');
  if (!hasCanonical) {
    errors.push(`[Universal: /${route}] Missing canonical link tag.`);
  }
  canonicalCheckCount++;

  if (!html.includes('BreadcrumbList')) {
    errors.push(`[Universal: /${route}] Missing BreadcrumbList structured data.`);
  }
  breadcrumbCheckCount++;

  // ── SEO-020: Ban aggregateRating (fabricated review markup) ──

  if (html.includes('aggregateRating') || html.includes('AggregateRating')) {
    errors.push(`[SEO-020: /${route}] Contains aggregateRating — fabricated review markup is banned (HR-2).`);
  }

  // ── SEO-021: Canonical must be absolute and self-referential ──

  if (hasCanonical && siteUrl) {
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
    if (canonicalMatch) {
      const canonicalHref = canonicalMatch[1];

      if (!canonicalHref.startsWith('https://') && !canonicalHref.startsWith('http://')) {
        errors.push(`[SEO-021: /${route}] Canonical is not absolute: "${canonicalHref}"`);
      }

      const cleanRoute = route === 'index' ? '' : route.replace(/\/index$/, '');
      const expectedUrl = siteUrl + (cleanRoute ? '/' + cleanRoute : '');
      // Normalize trailing slashes for comparison
      const normalizedCanonical = canonicalHref.replace(/\/$/, '');
      const normalizedExpected = expectedUrl.replace(/\/$/, '');

      if (normalizedCanonical !== normalizedExpected) {
        errors.push(`[SEO-021: /${route}] Canonical is not self-referential. Got "${canonicalHref}", expected "${expectedUrl}"`);
      }
    }
  }
}

console.log(`Universal sweep: ${universalAuditCount} pages checked for canonical, BreadcrumbList, aggregateRating ban.`);

// ═══════════════════════════════════════════════════════════════════════════════
// SEO-019: Every schema image URL must resolve to a file in public/
// ═══════════════════════════════════════════════════════════════════════════════

const publicDir = path.join(ROOT, 'public');
let imageCheckCount = 0;
const checkedImages = new Set();

for (const { file, route } of allPages) {
  if (SKIP_ROUTES.has(route) || route.startsWith('_')) continue;

  const html = fs.readFileSync(file, 'utf-8');

  // Extract JSON-LD blocks
  const jsonLdPattern = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = jsonLdPattern.exec(html)) !== null) {
    let jsonStr = match[1];
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      continue;
    }

    const imageUrls = extractImageUrls(parsed);
    for (const imgUrl of imageUrls) {
      if (checkedImages.has(imgUrl)) continue;
      checkedImages.add(imgUrl);
      imageCheckCount++;

      if (siteUrl && imgUrl.startsWith(siteUrl)) {
        const imgPath = imgUrl.slice(siteUrl.length);
        const localPath = path.join(publicDir, imgPath);
        if (!fs.existsSync(localPath)) {
          errors.push(`[SEO-019: /${route}] Schema image not found on disk: "${imgUrl}" → public${imgPath}`);
        }
      } else if (imgUrl.startsWith('/')) {
        const localPath = path.join(publicDir, imgUrl);
        if (!fs.existsSync(localPath)) {
          errors.push(`[SEO-019: /${route}] Schema image not found on disk: "${imgUrl}"`);
        }
      }
    }
  }
}

function extractImageUrls(obj) {
  const urls = [];
  if (!obj || typeof obj !== 'object') return urls;
  if (Array.isArray(obj)) {
    for (const item of obj) urls.push(...extractImageUrls(item));
    return urls;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'image' || key === 'logo' || key === 'thumbnailUrl') {
      if (typeof value === 'string') {
        urls.push(value);
      } else if (Array.isArray(value)) {
        for (const v of value) {
          if (typeof v === 'string') urls.push(v);
          else if (v && typeof v === 'object' && v.url) urls.push(v.url);
        }
      } else if (value && typeof value === 'object' && value.url) {
        urls.push(value.url);
      }
    }
    if (typeof value === 'object') {
      urls.push(...extractImageUrls(value));
    }
  }
  return urls;
}

console.log(`Image check: ${imageCheckCount} unique schema image URLs verified against public/.`);

// ═══════════════════════════════════════════════════════════════════════════════
// Final result
// ═══════════════════════════════════════════════════════════════════════════════

if (errors.length > 0) {
  console.error(`\n❌ SEO AUDIT FAILED with ${errors.length} error(s):\n`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ SEO AUDIT PASSED: ${universalAuditCount} pages swept, ${imageCheckCount} schema images verified, aggregateRating banned.\n`);
  process.exit(0);
}
