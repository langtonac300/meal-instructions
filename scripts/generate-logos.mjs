import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');
const iconsDir = path.join(publicDir, 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const iconSvgPath = path.join(publicDir, 'icon.svg');
const iconSvgBuffer = fs.readFileSync(iconSvgPath);

async function generateAllLogoSizes() {
  console.log('Generating logo assets in all standard sizes...');

  const sizes = [
    { name: 'favicon-16x16.png', size: 16, dest: publicDir },
    { name: 'favicon-32x32.png', size: 32, dest: publicDir },
    { name: 'favicon-48x48.png', size: 48, dest: publicDir },
    { name: 'apple-touch-icon.png', size: 180, dest: publicDir },
    { name: 'icon-192.png', size: 192, dest: iconsDir },
    { name: 'icon-512.png', size: 512, dest: iconsDir },
    { name: 'logo-512.png', size: 512, dest: publicDir },
    { name: 'logo-1024.png', size: 1024, dest: publicDir },
  ];

  for (const { name, size, dest } of sizes) {
    const outPath = path.join(dest, name);
    await sharp(iconSvgBuffer)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`✓ Generated ${name} (${size}x${size})`);
  }

  // Also create a standard 32x32 favicon.ico copy in public
  const faviconIcoPath = path.join(publicDir, 'favicon.ico');
  await sharp(iconSvgBuffer)
    .resize(32, 32)
    .png()
    .toFile(faviconIcoPath);
  console.log(`✓ Generated favicon.ico (32x32)`);

  console.log('All logo sizes generated successfully!');
}

generateAllLogoSizes().catch((err) => {
  console.error('Error generating logos:', err);
  process.exit(1);
});
