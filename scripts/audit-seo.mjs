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

if (errors.length > 0) {
  console.error(`\n❌ SEO AUDIT FAILED with ${errors.length} error(s):\n`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ SEO AUDIT PASSED: All canonicals, dual-mode SSR HTML, and schemas verified.\n`);
  process.exit(0);
}
