#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts PNG images to WebP and resizes them for optimal web performance
 * 
 * Run: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/optimized');

// Target size: 2x retina (628x448) for tiles displayed at 314x224
const TARGET_WIDTH = 628;
const TARGET_HEIGHT = 448;
const QUALITY = 80;

async function optimizeImages() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Find all night_*.png files
  const files = fs.readdirSync(ASSETS_DIR).filter(f => 
    f.startsWith('night_') && f.endsWith('.png')
  );

  console.log(`Found ${files.length} images to optimize...\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of files) {
    const inputPath = path.join(ASSETS_DIR, file);
    const outputFileName = file.replace('.png', '.webp');
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;

      await sharp(inputPath)
        .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover' })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const optimizedStats = fs.statSync(outputPath);
      totalOptimizedSize += optimizedStats.size;

      const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
      console.log(`✓ ${file}`);
      console.log(`  ${(originalStats.size / 1024 / 1024).toFixed(2)} MB → ${(optimizedStats.size / 1024).toFixed(0)} KB (${reduction}% smaller)\n`);
    } catch (err) {
      console.error(`✗ Error processing ${file}:`, err.message);
    }
  }

  console.log('='.repeat(50));
  console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total reduction: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('\nOptimized images saved to: src/assets/optimized/');
  console.log('\nNext steps:');
  console.log('1. Update DesignSection.tsx imports to use .webp files from optimized folder');
  console.log('2. Or move optimized files to replace originals');
}

optimizeImages().catch(console.error);

