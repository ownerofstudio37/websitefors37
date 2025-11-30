#!/usr/bin/env node

/**
 * Generate PWA icons from the Studio37 logo SVG
 * This script creates the required icon sizes for the PWA manifest.
 * 
 * Requirements:
 * - sharp npm package for image processing
 * 
 * Install: npm install sharp --save-dev
 * Run: node scripts/generate-pwa-icons.js
 */

const fs = require('fs');
const path = require('path');

async function generateIcons() {
  try {
    // Dynamically import sharp (ESM module)
    const sharp = (await import('sharp')).default;
    
    const logoPath = path.join(__dirname, '../public/brand/studio37-badge-square.svg');
    const iconsDir = path.join(__dirname, '../public/icons');
    
    // Ensure icons directory exists
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }
    
    console.log('🎨 Generating PWA icons from studio37-badge-square.svg...\n');
    
    // Read SVG file
    const svgBuffer = fs.readFileSync(logoPath);
    
    // Define icon sizes
    const sizes = [
      { size: 192, name: 'icon-192.png', maskable: false },
      { size: 512, name: 'icon-512.png', maskable: false },
      { size: 192, name: 'maskable-192.png', maskable: true },
      { size: 512, name: 'maskable-512.png', maskable: true },
    ];
    
    // Generate each icon
    for (const { size, name, maskable } of sizes) {
      const outputPath = path.join(iconsDir, name);
      
      let image = sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 15, g: 23, b: 42, alpha: 1 } // #0f172a (slate-900)
        });
      
      // For maskable icons, add padding (safe zone is 80% of icon)
      if (maskable) {
        const paddedSize = Math.round(size * 1.25); // 20% padding
        image = sharp(svgBuffer)
          .resize(Math.round(size * 0.8), Math.round(size * 0.8), {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .extend({
            top: Math.round((paddedSize - size) / 2),
            bottom: Math.round((paddedSize - size) / 2),
            left: Math.round((paddedSize - size) / 2),
            right: Math.round((paddedSize - size) / 2),
            background: { r: 15, g: 23, b: 42, alpha: 1 }
          })
          .resize(size, size);
      }
      
      await image.png().toFile(outputPath);
      console.log(`✅ Generated ${name} (${size}x${size}px)`);
    }
    
    console.log('\n✨ All PWA icons generated successfully!');
    console.log('📁 Icons saved to: public/icons/\n');
    
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND' || error.message.includes('sharp')) {
      console.error('❌ Error: sharp package not found.');
      console.error('📦 Please install it: npm install sharp --save-dev\n');
    } else {
      console.error('❌ Error generating icons:', error);
    }
    process.exit(1);
  }
}

generateIcons();
