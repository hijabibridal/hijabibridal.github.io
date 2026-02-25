import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileTypeFromFile } from 'file-type';

const TARGET_DIR = './public/images';

async function fixFakeWebpImages() {
  const files = fs.readdirSync(TARGET_DIR);
  let fixedCount = 0;

  console.log(`Checking ${files.length} files in ${TARGET_DIR}...`);

  for (const file of files) {
    // Only look at files that CLAIM to be webp
    if (!file.toLowerCase().endsWith('.webp')) continue;

    const filePath = path.join(TARGET_DIR, file);
    
    try {
      // 1. Detect the ACTUAL file type
      const type = await fileTypeFromFile(filePath);

      // 2. If it's NOT webp but has a .webp extension, fix it
      if (type && type.ext !== 'webp') {
        console.log(`Found fake WebP: ${file} (Actual type: ${type.ext})`);
        
        // Read the file into a buffer
        const buffer = fs.readFileSync(filePath);
        
        // Convert to actual WebP using Sharp and overwrite the original
        await sharp(buffer)
          .webp({ quality: 80 })
          .toFile(filePath + '.tmp'); // Write to temp first to avoid corruption

        fs.renameSync(filePath + '.tmp', filePath);
        
        console.log(`✅ Successfully converted ${file} to real WebP.`);
        fixedCount++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\nDone! Fixed ${fixedCount} images.`);
}

fixFakeWebpImages();