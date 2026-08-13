import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Resize webp files
// Where your current massive images are
const inputDirectory = path.resolve(__dirname, './public/images/characters');
// A brand new folder where the optimized images will go
const outputDirectory = path.resolve(__dirname, './public/images/characters/resized');

async function resizeImages() {
  if (!fs.existsSync(inputDirectory)) {
    console.error(`Directory not found: ${inputDirectory}`);
    return;
  }

  // Create the 'resized' folder if it doesn't exist yet
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const files = fs.readdirSync(inputDirectory);

  for (const file of files) {
    const inputPath = path.join(inputDirectory, file);
    
    // Skip directories (like our new 'resized' folder)
    if (fs.statSync(inputPath).isDirectory()) continue;

    // Grab the file name without the extension (e.g., "naoya_1")
    const rawName = path.parse(file).name;
    const outputPath = path.join(outputDirectory, `${rawName}.webp`);
    
    try {
      await sharp(inputPath)
        .resize({ 
          width: 800, 
          withoutEnlargement: true 
        })
        .webp({ quality: 80 }) 
        .toFile(outputPath); // Writing to a new file avoids the Windows -4094 lock
        
      console.log(`[Success] Saved to resized/${rawName}.webp`);

    } catch (err) {
      console.error(`[Error] Failed to process ${file}. If this persists, the original image might be corrupted.`, err.message);
    }
  }
  console.log('\nAll done! Check the "resized" folder for your new images.');
}

resizeImages();