import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Use CLI argument if provided, e.g: node convert-new-jpg.mjs "C:\path\to\images"
// Otherwise falls back to ./public/images
const TARGET_DIR = process.argv[2] || './public/images';

async function convertToWebp() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Directory not found: ${TARGET_DIR}`);
    process.exit(1);
  }

  console.log(`📁 Scanning: ${TARGET_DIR}\n`);
  const files = fs.readdirSync(TARGET_DIR);
  let convertedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // Check for jpg, jpeg, png, and jfif extensions
    if (['.jpg', '.jpeg', '.png', '.jfif'].includes(ext)) {
      const filePath = path.join(TARGET_DIR, file);
      const newFileName = file.replace(ext, '.webp');
      const newPath = path.join(TARGET_DIR, newFileName);

      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(newPath);

        // Delete the original file after successful conversion
        fs.unlinkSync(filePath);
        
        console.log(`✅ Converted and replaced: ${file} -> ${newFileName}`);
        convertedCount++;
      } catch (err) {
        console.error(`❌ Failed to convert ${file}:`, err.message);
      }
    }
  }

  console.log(`\nFinished! Converted ${convertedCount} new images.`);
}

convertToWebp();
