/**
 * Cloudinary Bulk Upload Script
 * 
 * Usage:
 * 1. Create a .env file in project root with your credentials:
 *    CLOUDINARY_CLOUD_NAME=your_cloud_name
 *    CLOUDINARY_API_KEY=your_api_key
 *    CLOUDINARY_API_SECRET=your_api_secret
 * 
 * 2. Run: node scripts/upload-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Cloudinary credentials from environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Missing Cloudinary credentials!');
  console.error('Create a .env file in project root with:');
  console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('  CLOUDINARY_API_KEY=your_api_key');
  console.error('  CLOUDINARY_API_SECRET=your_api_secret');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_FILE = path.join(__dirname, '../src/cloudinary-urls.ts');

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.pdf', '.svg'];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit for free tier
const skippedFiles = [];

async function uploadFile(filePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  
  // Check file size first
  const stats = fs.statSync(filePath);
  if (stats.size > MAX_FILE_SIZE) {
    const sizeMB = (stats.size / 1024 / 1024).toFixed(1);
    console.log(`⚠️  Skipping ${fileName} (${sizeMB}MB > 10MB limit)`);
    skippedFiles.push({ name: fileName, size: sizeMB });
    return null;
  }
  
  // Create a clean public_id
  const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
  const publicId = `idlyboy/${cleanName}`;
  
  // Determine resource type
  const resourceType = ext === '.pdf' ? 'raw' : 'image';
  
  try {
    console.log(`Uploading: ${fileName}...`);
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
    });
    console.log(`  ✓ Done`);
    return {
      originalName: fileName,
      publicId: result.public_id,
      url: result.secure_url,
      resourceType: result.resource_type,
    };
  } catch (error) {
    console.error(`  ✗ FAILED: ${error.message}`);
    skippedFiles.push({ name: fileName, error: error.message });
    return null; // Continue instead of stopping
  }
}

async function main() {
  console.log('🚀 Starting Cloudinary upload...\n');
  console.log(`Using cloud: ${cloudName}\n`);
  
  // Test connection first
  try {
    const testResult = await cloudinary.api.ping();
    console.log('✓ Cloudinary connection OK\n');
  } catch (error) {
    console.error('✗ Cloudinary connection FAILED:', error.message);
    console.error('\nCheck your API credentials!');
    process.exit(1);
  }
  
  // Get all files
  const files = fs.readdirSync(ASSETS_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(ASSETS_DIR, file);
    return SUPPORTED_EXTENSIONS.includes(ext) && !fs.statSync(filePath).isDirectory();
  });

  console.log(`Found ${files.length} files to upload\n`);

  const results = [];
  
  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const result = await uploadFile(filePath, file);
    if (result) {
      results.push(result);
    }
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`\n✅ Uploaded ${results.length}/${files.length} files`);
  
  if (skippedFiles.length > 0) {
    console.log(`\n⚠️  Skipped ${skippedFiles.length} files (too large or error):`);
    skippedFiles.forEach(f => console.log(`   - ${f.name} ${f.size ? `(${f.size}MB)` : `(${f.error})`}`));
    console.log('\n💡 To fix large files: compress them or upgrade Cloudinary plan');
  }

  // Generate TypeScript mapping file
  const tsContent = `/**
 * Auto-generated Cloudinary URL mappings
 * Generated: ${new Date().toISOString()}
 */

const CLOUD_NAME = '${cloudName}';

export const cloudinaryAssets: Record<string, { publicId: string; resourceType: string }> = {
${results.map(r => `  '${r.originalName}': { publicId: '${r.publicId}', resourceType: '${r.resourceType}' },`).join('\n')}
};

type ImageSize = 'original' | 'thumbnail' | 'medium';

export function getCloudinaryUrl(filename: string, size: ImageSize = 'original'): string {
  const asset = cloudinaryAssets[filename];
  if (!asset) {
    console.warn('Asset not found:', filename);
    return '';
  }

  const { publicId, resourceType } = asset;
  
  if (resourceType === 'raw') {
    return \`https://res.cloudinary.com/\${CLOUD_NAME}/raw/upload/\${publicId}\`;
  }

  let transform = 'f_auto,q_auto';
  if (size === 'thumbnail') transform = 'w_400,c_scale,f_auto,q_auto';
  if (size === 'medium') transform = 'w_1200,c_scale,f_auto,q_auto';

  return \`https://res.cloudinary.com/\${CLOUD_NAME}/image/upload/\${transform}/\${publicId}\`;
}

export function getCloudinaryRawUrl(filename: string): string {
  const asset = cloudinaryAssets[filename];
  if (!asset) return '';
  return \`https://res.cloudinary.com/\${CLOUD_NAME}/\${asset.resourceType}/upload/\${asset.publicId}\`;
}

/**
 * Convert a Cloudinary thumbnail URL to medium/original size
 * Use this in modals to show higher resolution images
 */
export function getHighResUrl(thumbnailUrl: string): string {
  if (!thumbnailUrl || !thumbnailUrl.includes('res.cloudinary.com')) {
    return thumbnailUrl; // Not a Cloudinary URL, return as-is
  }
  // Replace thumbnail transformation (w_400) with medium (w_1200)
  return thumbnailUrl.replace('w_400,c_scale,', 'w_1200,c_scale,');
}
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent);
  console.log(`📄 Generated: ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error('\n❌ Upload stopped due to error:', err.message);
  process.exit(1);
});
