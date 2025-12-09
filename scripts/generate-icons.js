/**
 * Simple icon generator script
 * For production, you would use a proper SVG to PNG converter
 * This script creates placeholder PNG files
 */

const fs = require('fs');
const path = require('path');

const iconSizes = [16, 32, 48, 128];
const iconsDir = path.join(__dirname, '../src/icons');
const svgPath = path.join(iconsDir, 'icon.svg');

console.log('Icon generation script');
console.log('Note: For production-quality icons, please use a proper SVG to PNG converter');
console.log('such as Inkscape, ImageMagick, or online tools like CloudConvert\n');

// Read SVG content
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Create a simple HTML file that can be used to manually generate PNGs
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Icon Generator</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .icon-container { margin: 20px 0; }
    canvas { border: 1px solid #ccc; margin: 10px; }
    .instructions { background: #f0f0f0; padding: 15px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>MIDI to Strudel Icon Generator</h1>
  <div class="instructions">
    <h2>Instructions:</h2>
    <ol>
      <li>Open this HTML file in a browser</li>
      <li>Right-click on each canvas below</li>
      <li>Select "Save image as..."</li>
      <li>Save with the corresponding filename (e.g., icon16.png, icon32.png, etc.)</li>
      <li>Place the files in the src/icons/ directory</li>
    </ol>
  </div>

  <div class="icon-container">
    ${iconSizes.map(size => `
      <div>
        <h3>${size}x${size}px</h3>
        <canvas id="canvas${size}" width="${size}" height="${size}"></canvas>
      </div>
    `).join('')}
  </div>

  <script>
    const svg = \`${svgContent}\`;

    ${iconSizes.map(size => `
      const canvas${size} = document.getElementById('canvas${size}');
      const ctx${size} = canvas${size}.getContext('2d');
      const img${size} = new Image();
      const blob${size} = new Blob([svg], { type: 'image/svg+xml' });
      const url${size} = URL.createObjectURL(blob${size});

      img${size}.onload = function() {
        ctx${size}.drawImage(img${size}, 0, 0, ${size}, ${size});
      };
      img${size}.src = url${size};
    `).join('\n')}
  </script>
</body>
</html>
`;

// Write HTML file
const htmlPath = path.join(__dirname, '../generate-icons.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log(`✓ Generated HTML icon generator at: ${htmlPath}`);
console.log('\nTo generate PNG icons:');
console.log('1. Open generate-icons.html in a web browser');
console.log('2. Right-click each canvas and save as PNG');
console.log('3. Save files as icon16.png, icon32.png, icon48.png, icon128.png');
console.log('4. Move the PNG files to src/icons/\n');

// Create placeholder PNG files (empty, just for build to work)
iconSizes.forEach(size => {
  const pngPath = path.join(iconsDir, `icon${size}.png`);
  if (!fs.existsSync(pngPath)) {
    // Create a simple 1x1 transparent PNG as placeholder
    const placeholder = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    fs.writeFileSync(pngPath, placeholder);
    console.log(`✓ Created placeholder: icon${size}.png`);
  }
});

console.log('\n✓ Icon generation complete!');
