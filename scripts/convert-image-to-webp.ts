import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

/**
 * Converts an image to WebP format with multiple sizes for responsive images
 * Usage: tsx scripts/convert-image-to-webp.ts <input-image> [output-dir]
 * Example: tsx scripts/convert-image-to-webp.ts public/travel-despre.jpg public
 */
async function convertImageToWebP(
  inputPath: string,
  outputDir: string = path.dirname(inputPath)
) {
  const inputFile = path.resolve(inputPath)
  const outputDirectory = path.resolve(outputDir)

  // Check if input file exists
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Error: Input file not found: ${inputFile}`)
    process.exit(1)
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true })
  }

  const inputFileName = path.basename(inputFile, path.extname(inputFile))
  const baseOutputPath = path.join(outputDirectory, inputFileName)

  // Responsive image sizes (widths in pixels)
  const sizes = [
    { width: 640, suffix: '-mobile' },      // Mobile
    { width: 1024, suffix: '-tablet' },     // Tablet
    { width: 1920, suffix: '' },             // Desktop (default)
    { width: 3840, suffix: '-2x' },         // Retina/4K
  ]

  console.log(`🖼️  Converting ${inputFile} to WebP format...\n`)

  try {
    const metadata = await sharp(inputFile).metadata()
    console.log(`📊 Original image: ${metadata.width}x${metadata.height} (${metadata.format})`)

    // Generate responsive sizes
    for (const size of sizes) {
      const outputPath = `${baseOutputPath}${size.suffix}.webp`
      
      await sharp(inputFile)
        .resize(size.width, null, {
          withoutEnlargement: true, // Don't upscale smaller images
          fit: 'inside',
        })
        .webp({
          quality: 85,
          effort: 6, // Higher effort = better compression but slower
        })
        .toFile(outputPath)

      const outputStats = fs.statSync(outputPath)
      const fileSizeKB = (outputStats.size / 1024).toFixed(2)
      
      console.log(`✓ Created: ${path.basename(outputPath)} (${size.width}w, ${fileSizeKB} KB)`)
    }

    // Also create the default WebP version (same as desktop)
    const defaultOutputPath = `${baseOutputPath}.webp`
    if (!fs.existsSync(defaultOutputPath)) {
      await sharp(inputFile)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({
          quality: 85,
          effort: 6,
        })
        .toFile(defaultOutputPath)

      const outputStats = fs.statSync(defaultOutputPath)
      const fileSizeKB = (outputStats.size / 1024).toFixed(2)
      console.log(`✓ Created: ${path.basename(defaultOutputPath)} (default, ${fileSizeKB} KB)`)
    }

    console.log(`\n✅ Conversion complete!`)
    console.log(`📁 Output directory: ${outputDirectory}`)
  } catch (error) {
    console.error(`❌ Error converting image:`, error)
    process.exit(1)
  }
}

// Main execution
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('Usage: tsx scripts/convert-image-to-webp.ts <input-image> [output-dir]')
  console.log('Example: tsx scripts/convert-image-to-webp.ts public/travel-despre.jpg public')
  process.exit(1)
}

const inputPath = args[0]
const outputDir = args[1] || path.dirname(inputPath)

convertImageToWebP(inputPath, outputDir).catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

