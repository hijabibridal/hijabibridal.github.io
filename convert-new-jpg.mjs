import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIR = './public/images/muslim-groom-outfit';

async function convertJpgToWebp() {
  const files = fs.readdirSync(TARGET_DIR);
  let convertedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // Check for jpg or jpeg extensions
    if (ext === '.jpg' || ext === '.jpeg') {
      const filePath = path.join(TARGET_DIR, file);
      const newFileName = file.replace(ext, '.webp');
      const newPath = path.join(TARGET_DIR, newFileName);

      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(newPath);

        // Delete the original JPG after successful conversion
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

convertJpgToWebp();