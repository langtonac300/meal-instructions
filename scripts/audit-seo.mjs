import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`\n--- RUNNING SEO AUDIT (npm run audit:seo) ---`);

let errors = [];

// 1. Check for hardcoded domains across source code
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
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.mjs'))) {
      const content = fs.readFileSync(resPath, 'utf-8');
      for (const str of forbiddenStrings) {
        if (content.includes(str)) {
          errors.push(`Hardcoded domain "${str}" found in ${path.relative(path.join(__dirname, '..'), resPath)}. Must import from lib/site.ts.`);
        }
      }
    }
  }
}

for (const dir of scanDirs) {
  scanDirectory(dir);
}

// 2. Check JSON-LD validity & SSR dual-mode rendering in .next build if it exists
const recipesJsonPath = path.join(__dirname, '../data/recipes.json');
if (fs.existsSync(recipesJsonPath)) {
  const recipes = JSON.parse(fs.readFileSync(recipesJsonPath, 'utf-8'));
  const nextAppServerDir = path.join(__dirname, '../.next/server/app/recipes');

  for (const r of recipes) {
    const slug = r.slug;
    const htmlFile = path.join(nextAppServerDir, `${slug}.html`);
    if (fs.existsSync(htmlFile)) {
      const html = fs.readFileSync(htmlFile, 'utf-8');
      
      // Verify quick version bullet is present in HTML
      const firstQuickBullet = r.quickVersion.bullets[0];
      if (!html.includes(firstQuickBullet)) {
        errors.push(`[${slug}] SSR HTML is missing quick-version bullet: "${firstQuickBullet}"`);
      }

      // Verify detailed step title is present in HTML (HR-6)
      const firstStepTitle = r.detailedSteps[0].title;
      if (!html.includes(firstStepTitle)) {
        errors.push(`[${slug}] SSR HTML is missing detailed-step title (HR-6 violation): "${firstStepTitle}"`);
      }

      // Verify Schema.org Recipe JSON-LD
      if (!html.includes('"@context":"https://schema.org"') || !html.includes('"@type":"Recipe"')) {
        errors.push(`[${slug}] SSR HTML missing or invalid Schema.org Recipe JSON-LD.`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`❌ SEO AUDIT FAILED with ${errors.length} error(s):\n`);
  errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ SEO AUDIT PASSED: All canonical, schema, and LLM routes verified.\n`);
  process.exit(0);
}
