import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../content/recipes');
const jsonOutputPath = path.join(__dirname, '../data/recipes.json');
const generatedJsonOutputPath = path.join(__dirname, '../data/recipes.generated.json');

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.ts'));

console.log(`Found ${files.length} recipe source files in content/recipes/`);

const recipes = [];

for (const file of files) {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find where export begins
  const exportIdx = content.search(/export\s+(?:default|const\s+recipe)/);
  if (exportIdx === -1) {
    console.error(`No export statement found in ${file}`);
    process.exit(1);
  }

  const exportChunk = content.substring(exportIdx);
  const firstBrace = exportChunk.indexOf('{');
  const lastBrace = exportChunk.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    console.error(`Could not parse recipe object in ${file}`);
    process.exit(1);
  }

  const jsonString = exportChunk.substring(firstBrace, lastBrace + 1);

  try {
    const fn = new Function(`return (${jsonString})`);
    const recipeObj = fn();
    
    // Ensure basis field is mapped (HR-2)
    if (!recipeObj.basis && recipeObj.cookTimeBasis) {
      recipeObj.basis = recipeObj.cookTimeBasis;
    }
    if (!recipeObj.cookTimeBasis && recipeObj.basis) {
      recipeObj.cookTimeBasis = recipeObj.basis;
    }
    
    recipes.push(recipeObj);
  } catch (err) {
    console.error(`Error parsing recipe ${file}:`, err);
    process.exit(1);
  }
}

// Sort by ID
recipes.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(jsonOutputPath, JSON.stringify(recipes, null, 2), 'utf-8');
fs.writeFileSync(generatedJsonOutputPath, JSON.stringify(recipes, null, 2), 'utf-8');

console.log(`✅ Successfully compiled ${recipes.length} recipes to data/recipes.json`);
