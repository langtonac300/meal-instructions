import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`\n--- RUNNING SEO AUDIT (npm run audit:seo) ---`);

let errors = [];

// 1. Mandatory .next build check (HR-6 / B8 gate: MUST FAIL if build does not exist)
const nextAppServerDir = path.join(__dirname, '../.next/server/app');
if (!fs.existsSync(nextAppServerDir)) {
  console.error('❌ SEO AUDIT FAILED: .next build output not found.');
  console.error('You must run "npm run build" before running "npm run audit:seo".\n');
  process.exit(1);
}

// 2. Check for hardcoded forbidden domains across source code
const scanDirs = ['app', 'lib', 'components', 'content'];
const forbiddenStrings = ['dadmeals.com', 'https://dadmeals', 'http://dadmeals'];

function scanDirectory(dir) {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) return;

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const resPath = path.join(fullPath, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(path.join(dir, entry.name));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.ts') ||
        entry.name.endsWith('.tsx') ||
        entry.name.endsWith('.js') ||
        entry.name.endsWith('.mjs'))
    ) {
      const content = fs.readFileSync(resPath, 'utf-8');
      for (const str of forbiddenStrings) {
        if (content.includes(str)) {
          errors.push(
            `Hardcoded domain "${str}" found in ${path.relative(
              path.join(__dirname, '..'),
              resPath
            )}. Must import from lib/site.ts.`
          );
        }
      }
    }
  }
}

for (const dir of scanDirs) {
  scanDirectory(dir);
}

// 3. Inspect built SSR HTML for Canonical, Dual-Mode Panels, and Schema.org JSON-LD
const recipesJsonPath = path.join(__dirname, '../data/recipes.json');
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

    // Check canonical link tag
    if (!html.includes('<link rel="canonical"') && !html.includes('<link rel=\\"canonical\\"')) {
      errors.push(`[${slug}] Missing canonical link tag in built HTML.`);
    }

    // Verify dual mode panels exist in SSR HTML (HR-6)
    const hasFastPanel = html.includes('data-mode-panel="fast"') || html.includes('data-mode-panel="quick"');
    const hasDetailedPanel = html.includes('data-mode-panel="detailed"');

    if (!hasFastPanel) {
      errors.push(`[${slug}] SSR HTML missing quick mode panel (data-mode-panel="fast/quick").`);
    }
    if (!hasDetailedPanel) {
      errors.push(`[${slug}] SSR HTML missing detailed mode panel (data-mode-panel="detailed") — HR-6 violation.`);
    }

    // Verify quick version text bullet
    if (r.quickVersion && r.quickVersion.bullets && r.quickVersion.bullets.length > 0) {
      const firstQuickBullet = r.quickVersion.bullets[0];
      if (!html.includes(firstQuickBullet)) {
        errors.push(`[${slug}] SSR HTML missing quick bullet content: "${firstQuickBullet}"`);
      }
    }

    // Verify detailed step title
    if (r.detailedSteps && r.detailedSteps.length > 0) {
      const firstStepTitle = r.detailedSteps[0].title;
      if (!html.includes(firstStepTitle)) {
        errors.push(`[${slug}] SSR HTML missing detailed step title: "${firstStepTitle}"`);
      }
    }

    // Verify Schema.org Recipe JSON-LD
    if (!html.includes('"@context":"https://schema.org"') && !html.includes('"@context": "https://schema.org"')) {
      errors.push(`[${slug}] Missing Schema.org context in JSON-LD.`);
    }
    if (!html.includes('"@type":"Recipe"') && !html.includes('"@type": "Recipe"')) {
      errors.push(`[${slug}] Missing Schema.org Recipe @type in JSON-LD.`);
    }
  }

  console.log(`Audited ${auditedCount} recipe HTML pages for canonicals, dual-mode SSR, and JSON-LD.`);
}

// 4. Audit all 30 dedicated tool pages in .next build output
const toolRoutes = [
  'tools',
  'air-fryer-calculator',
  'cheat-sheet',
  'reheat',
  'frozen-cook',
  'dinner-sync',
  'meat-math',
  'internal-temp',
  'salt-math',
  'kid-split',
  'troubleshoot',
  'smoke-points',
  'steak-timer',
  'turkey-calculator',
  'bakers-percentage',
  'recipe-scaler',
  'slow-cooker-converter',
  'sous-vide-calculator',
  'grill-fuel-estimator',
  'egg-timer',
  'pasta-water-ratio',
  'marinade-ratio',
  'substitutions',
  'thaw-timer',
  'food-cost-calculator',
  'macronutrient-calculator',
  'caffeine-steep-timer',
  'brisket-timeline',
  'ground-beef-fat-ratio',
  'dutch-oven-bread-timer',
  'cheese-melt-matrix',
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

  // Check canonical link tag
  if (!html.includes('<link rel="canonical"') && !html.includes('<link rel=\\"canonical\\"')) {
    errors.push(`[Tool: /${toolSlug}] Missing canonical link tag in built HTML.`);
  }

  // Check Schema.org JSON-LD
  if (!html.includes('schema.org')) {
    errors.push(`[Tool: /${toolSlug}] Missing Schema.org JSON-LD structured data.`);
  }
}

console.log(`Audited ${auditedToolsCount} dedicated tool HTML pages for canonicals and Schema.org JSON-LD.`);

// 5. Audit 50 Blog Field Guides in .next build output
const blogServerDir = path.join(nextAppServerDir, 'blog');
let auditedBlogCount = 0;

// Check /blog index page
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

// Audit all 50 individual blog post HTML files
if (fs.existsSync(blogServerDir)) {
  const blogFiles = fs.readdirSync(blogServerDir).filter((f) => f.endsWith('.html'));
  auditedBlogCount = blogFiles.length;

  for (const bFile of blogFiles) {
    const slug = bFile.replace(/\.html$/, '');
    const bHtml = fs.readFileSync(path.join(blogServerDir, bFile), 'utf-8');

    // Check canonical
    if (!bHtml.includes('<link rel="canonical"') && !bHtml.includes('<link rel=\\"canonical\\"')) {
      errors.push(`[Blog: /blog/${slug}] Missing canonical link tag in built HTML.`);
    }

    // Check BlogPosting Schema
    if (!bHtml.includes('BlogPosting') && !bHtml.includes('Article')) {
      errors.push(`[Blog: /blog/${slug}] Missing BlogPosting or Article Schema.org JSON-LD.`);
    }

    // Check Breadcrumbs Schema
    if (!bHtml.includes('BreadcrumbList')) {
      errors.push(`[Blog: /blog/${slug}] Missing BreadcrumbList Schema.org JSON-LD.`);
    }
  }

  console.log(`Audited ${auditedBlogCount} blog field guide HTML pages for canonicals, breadcrumbs, and BlogPosting JSON-LD.`);
} else {
  errors.push(`Missing built blog directory at ${blogServerDir}`);
}

if (errors.length > 0) {
  console.error(`\n❌ SEO AUDIT FAILED with ${errors.length} error(s):\n`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ SEO AUDIT PASSED: All canonicals, dual-mode SSR HTML, tool pages, ${auditedBlogCount} blog pages, and schemas verified.\n`);
  process.exit(0);
}

