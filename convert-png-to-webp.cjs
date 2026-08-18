const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Targeted directory
const targetDir = `C:\\Users\\haira\\Downloads\\HBmigration\\public\\images\\halal-nails\\attachments`;

async function convertPngToWebp() {
  try {
    const files = await fs.promises.readdir(targetDir);
    const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

    if (pngFiles.length === 0) {
      console.log('No PNG files found in the folder.');
      return;
    }

    console.log(`Found ${pngFiles.length} PNG file(s). Converting...\n`);

    for (const file of pngFiles) {
      const inputPath = path.join(targetDir, file);
      const outputFilename = `${path.parse(file).name}.webp`;
      const outputPath = path.join(targetDir, outputFilename);

      await sharp(inputPath)
        .webp({ quality: 80 }) // Quality setting (0-100)
        .toFile(outputPath);

      console.log(`✔ Created: ${outputFilename}`);
    }

    console.log('\n✨ All conversions complete! Original PNG files were kept.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

convertPngToWebp();