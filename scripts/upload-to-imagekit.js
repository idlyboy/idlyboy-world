/**
 * ImageKit Bulk Upload Script
 * 
 * Usage:
 * 1. Add your credentials to .env file
 * 2. Run: node scripts/upload-to-imagekit.js
 */

const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
const imagekitId = process.env.IMAGEKIT_ID;

if (!publicKey || !privateKey || !urlEndpoint) {
  console.error('❌ Missing ImageKit credentials!');
  console.error('Add to .env file:');
  console.error('  IMAGEKIT_PUBLIC_KEY=your_public_key');
  console.error('  IMAGEKIT_PRIVATE_KEY=your_private_key');
  process.exit(1);
}

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint
});

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_FILE = path.join(__dirname, '../src/imagekit-urls.ts');

const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.pdf', '.svg'];
const skippedFiles = [];

async function uploadFile(filePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  
  try {
    console.log(`Uploading: ${fileName}...`);
    
    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString('base64');
    
    const result = await imagekit.upload({
      file: base64File,
      fileName: fileName,
      folder: '/idlyboy/',
      useUniqueFileName: false,
    });
    
    console.log(`  ✓ Done`);
    return {
      originalName: fileName,
      fileId: result.fileId,
      filePath: result.filePath,
      url: result.url,
    };
  } catch (error) {
    console.error(`  ✗ FAILED: ${error.message}`);
    skippedFiles.push({ name: fileName, error: error.message });
    return null;
  }
}

async function main() {
  console.log('🚀 Starting ImageKit upload...\n');
  console.log(`URL Endpoint: ${urlEndpoint}\n`);
  
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
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log(`\n✅ Uploaded ${results.length}/${files.length} files`);
  
  if (skippedFiles.length > 0) {
    console.log(`\n⚠️  Skipped ${skippedFiles.length} files:`);
    skippedFiles.forEach(f => console.log(`   - ${f.name}: ${f.error}`));
  }

  // Generate TypeScript mapping file
  const tsContent = `/**
 * Auto-generated ImageKit URL mappings
 * Generated: ${new Date().toISOString()}
 */

const IMAGEKIT_ID = '${imagekitId}';
const URL_ENDPOINT = '${urlEndpoint}';

export const imagekitAssets: Record<string, { filePath: string }> = {
${results.map(r => `  '${r.originalName}': { filePath: '${r.filePath}' },`).join('\n')}
};

type ImageSize = 'original' | 'thumbnail' | 'medium';

/**
 * Get ImageKit URL with transformations
 * @param filename - Original filename
 * @param size - 'original' | 'thumbnail' (400px) | 'medium' (1200px)
 */
export function getImageKitUrl(filename: string, size: ImageSize = 'original'): string {
  const asset = imagekitAssets[filename];
  if (!asset) {
    console.warn('Asset not found:', filename);
    return '';
  }

  let transform = 'f-auto,q-auto';
  if (size === 'thumbnail') transform = 'w-400,f-auto,q-auto';
  if (size === 'medium') transform = 'w-1200,f-auto,q-auto';

  return \`\${URL_ENDPOINT}/tr:\${transform}\${asset.filePath}\`;
}

/**
 * Get raw ImageKit URL without transformations (for PDFs, etc.)
 */
export function getImageKitRawUrl(filename: string): string {
  const asset = imagekitAssets[filename];
  if (!asset) return '';
  return \`\${URL_ENDPOINT}\${asset.filePath}\`;
}

/**
 * Convert a thumbnail URL to higher resolution
 */
export function getHighResUrl(thumbnailUrl: string): string {
  if (!thumbnailUrl || !thumbnailUrl.includes('ik.imagekit.io')) {
    return thumbnailUrl;
  }
  return thumbnailUrl.replace('w-400,', 'w-1200,');
}
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent);
  console.log(`\n📄 Generated: ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error('\n❌ Upload failed:', err.message);
  process.exit(1);
});

