import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../app');

const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark Swiss Canvas Background -->
  <rect width="1200" height="630" fill="#111111"/>
  
  <!-- Subtle Grid Texture -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer Architectural Border -->
  <rect x="24" y="24" width="1152" height="582" rx="16" stroke="#262626" stroke-width="2" />
  
  <!-- Corner Registration Crosshairs -->
  <path d="M 36 48 L 48 48 L 48 36" stroke="#404040" stroke-width="2" fill="none" />
  <path d="M 1164 48 L 1152 48 L 1152 36" stroke="#404040" stroke-width="2" fill="none" />
  <path d="M 36 582 L 48 582 L 48 594" stroke="#404040" stroke-width="2" fill="none" />
  <path d="M 1164 582 L 1152 582 L 1152 594" stroke="#404040" stroke-width="2" fill="none" />

  <!-- Brand Mark (140x140) -->
  <g transform="translate(80, 110)">
    <rect width="140" height="140" rx="28" fill="#1A1A1A" stroke="#333333" stroke-width="3"/>
    <!-- M Legs -->
    <path d="M30 108V40L57 74L84 40V108" stroke="#F5F4F0" stroke-width="11" stroke-linecap="square" stroke-linejoin="miter"/>
    <!-- I Needle -->
    <line x1="110" y1="40" x2="110" y2="108" stroke="#F5F4F0" stroke-width="11" stroke-linecap="square"/>
    <!-- Accent Dot -->
    <circle cx="110" cy="40" r="8" fill="#EA580C"/>
  </g>

  <!-- Typography Block -->
  <g transform="translate(260, 150)">
    <text x="0" y="0" fill="#EA580C" font-family="'SF Mono', Menlo, Monaco, Consolas, monospace" font-weight="700" font-size="14" letter-spacing="3">TECHNICAL COOKING REFERENCE // SPEC VERIFIED</text>
    <text x="0" y="52" fill="#F5F4F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-weight="900" font-size="54" letter-spacing="2">MEAL INSTRUCTIONS</text>
    <text x="0" y="94" fill="#A3A3A3" font-family="'SF Mono', Menlo, Monaco, Consolas, monospace" font-weight="600" font-size="20" letter-spacing="3">NO FLUFF, JUST THE INSTRUCTIONS</text>
  </g>

  <!-- Divider Line -->
  <line x1="80" y1="330" x2="1120" y2="330" stroke="#262626" stroke-width="2"/>

  <!-- Metric Badges Row -->
  <g transform="translate(80, 370)">
    <!-- Card 1 -->
    <g transform="translate(0, 0)">
      <rect width="240" height="150" rx="8" fill="#181818" stroke="#262626" stroke-width="1"/>
      <text x="24" y="42" fill="#EA580C" font-family="'SF Mono', monospace" font-weight="700" font-size="12" letter-spacing="1.5">DATASHEETS</text>
      <text x="24" y="85" fill="#F5F4F0" font-family="sans-serif" font-weight="900" font-size="32">60 Verified</text>
      <text x="24" y="118" fill="#737373" font-family="sans-serif" font-size="13">Air Fryer, Skillet, Oven</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(268, 0)">
      <rect width="240" height="150" rx="8" fill="#181818" stroke="#262626" stroke-width="1"/>
      <text x="24" y="42" fill="#EA580C" font-family="'SF Mono', monospace" font-weight="700" font-size="12" letter-spacing="1.5">FIELD GUIDES</text>
      <text x="24" y="85" fill="#F5F4F0" font-family="sans-serif" font-weight="900" font-size="32">50 Science</text>
      <text x="24" y="118" fill="#737373" font-family="sans-serif" font-size="13">Maillard, Osmosis, Heat</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(536, 0)">
      <rect width="240" height="150" rx="8" fill="#181818" stroke="#262626" stroke-width="1"/>
      <text x="24" y="42" fill="#EA580C" font-family="'SF Mono', monospace" font-weight="700" font-size="12" letter-spacing="1.5">CALCULATORS</text>
      <text x="24" y="85" fill="#F5F4F0" font-family="sans-serif" font-weight="900" font-size="32">30 Engines</text>
      <text x="24" y="118" fill="#737373" font-family="sans-serif" font-size="13">Reheat, Meat Math, Salt</text>
    </g>

    <!-- Card 4 -->
    <g transform="translate(804, 0)">
      <rect width="236" height="150" rx="8" fill="#181818" stroke="#262626" stroke-width="1"/>
      <text x="24" y="42" fill="#EA580C" font-family="'SF Mono', monospace" font-weight="700" font-size="12" letter-spacing="1.5">EXECUTION</text>
      <text x="24" y="85" fill="#F5F4F0" font-family="sans-serif" font-weight="900" font-size="32">0 Stories</text>
      <text x="24" y="118" fill="#737373" font-family="sans-serif" font-size="13">Dual-Mode Quick View</text>
    </g>
  </g>

  <!-- Bottom Colophon -->
  <text x="80" y="570" fill="#525252" font-family="'SF Mono', monospace" font-size="12" letter-spacing="1">SCHEMA.ORG JSON-LD VERIFIED // OPEN AI &amp; LLM MACHINE FORMATS (LLMS.TXT)</text>
</svg>`;

async function generateOgImages() {
  console.log('Generating high-resolution OpenGraph and social sharing cards...');

  const ogBuffer = Buffer.from(ogSvg);

  const targets = [
    path.join(publicDir, 'opengraph-image.png'),
    path.join(publicDir, 'twitter-image.png'),
    path.join(appDir, 'opengraph-image.png'),
    path.join(appDir, 'twitter-image.png'),
    path.join(publicDir, 'images/og/og_hero_banner.jpg'),
  ];

  for (const target of targets) {
    if (target.endsWith('.jpg')) {
      await sharp(ogBuffer).jpeg({ quality: 92 }).toFile(target);
    } else {
      await sharp(ogBuffer).png().toFile(target);
    }
    console.log(`✓ Generated ${path.relative(path.join(__dirname, '..'), target)}`);
  }

  console.log('All OpenGraph and social sharing cards generated successfully!');
}

generateOgImages().catch((err) => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
