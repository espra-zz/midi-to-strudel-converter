# Build Instructions - MIDI to Strudel Converter

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Chrome browser (for testing)

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd midi-to-strudel-converter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Building the Extension

### Development Build

For development with source maps and watch mode:

```bash
npm run dev
```

This will:
- Build the extension in development mode
- Watch for file changes
- Rebuild automatically when files are modified
- Output to the `dist/` directory

### Production Build

For optimized production build:

```bash
npm run build
```

This will:
- Build the extension in production mode
- Minify and optimize the code
- Output to the `dist/` directory

## Project Structure

```
midi-to-strudel-converter/
├── src/
│   ├── manifest.json          # Chrome extension manifest (Manifest V3)
│   ├── background/
│   │   └── background.js      # Service worker for background tasks
│   ├── popup/
│   │   ├── popup.html         # Extension popup interface
│   │   ├── popup.css          # Popup styling
│   │   └── popup.js           # Popup logic and MIDI converter
│   └── icons/
│       ├── icon.svg           # Source SVG icon
│       └── icon*.png          # PNG icons in various sizes
├── dist/                      # Build output (generated)
├── docs/
│   ├── PRD-Documentation      # Product requirements
│   └── BUILD.md               # This file
├── scripts/
│   └── generate-icons.js      # Icon generation utility
├── package.json
├── webpack.config.js
└── README.md
```

## Icon Generation

The extension requires PNG icons in multiple sizes (16x16, 32x32, 48x48, 128x128).

### Option 1: Using the Icon Generator Script

```bash
npm run generate-icons
```

This will create an HTML file that helps you generate PNG icons from the SVG source.

### Option 2: Manual Creation

1. Use an SVG to PNG converter like:
   - Inkscape
   - ImageMagick
   - Online tools (CloudConvert, etc.)

2. Generate PNG files at sizes: 16, 32, 48, 128 pixels

3. Save them in `src/icons/` as:
   - icon16.png
   - icon32.png
   - icon48.png
   - icon128.png

### Option 3: Use Placeholder Icons

The build process creates placeholder icons automatically. For production, replace these with proper icons.

## Loading the Extension in Chrome

1. **Build the extension**:
   ```bash
   npm run build
   ```

2. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**:
   - Toggle "Developer mode" in the top right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the `dist/` directory from your project

5. **Test the extension**:
   - Click the extension icon in the Chrome toolbar
   - Upload a MIDI file to test the conversion

## Development Workflow

1. **Start development mode**:
   ```bash
   npm run dev
   ```

2. **Make changes** to source files in `src/`

3. **Reload extension** in Chrome:
   - Go to `chrome://extensions/`
   - Click the refresh icon on your extension

4. **Test changes** by opening the extension popup

## Key Features Implemented

### Core Functionality
- ✅ MIDI file upload (drag & drop and file browser)
- ✅ MIDI parsing using @tonejs/midi library
- ✅ Conversion to Strudel code syntax
- ✅ Real-time code preview
- ✅ Copy to clipboard functionality
- ✅ Download code as .js file
- ✅ Customizable conversion settings

### User Interface
- ✅ Modern, responsive design
- ✅ Tab-based navigation (Code, Preview, Settings)
- ✅ Processing indicators and error handling
- ✅ MIDI file information display
- ✅ Visual feedback for all actions

### Settings
- ✅ Quantization options (16th, 8th, quarter notes)
- ✅ Pattern length configuration
- ✅ Tempo preservation option
- ✅ Code comments toggle
- ✅ Settings persistence using Chrome storage

## Technologies Used

- **Manifest V3**: Latest Chrome extension standard
- **@tonejs/midi**: MIDI file parsing library
- **Webpack 5**: Module bundler
- **Vanilla JavaScript**: No framework dependencies for lightweight bundle
- **CSS3**: Modern styling with CSS Grid and Flexbox

## Troubleshooting

### Extension won't load
- Ensure you've run `npm run build` first
- Check that you're loading the `dist/` directory, not `src/`
- Look for errors in Chrome's extension page

### MIDI files won't parse
- Verify the file is a valid .mid or .midi file
- Check browser console for error messages
- Ensure the file isn't corrupted

### Build fails
- Delete `node_modules/` and run `npm install` again
- Ensure you have Node.js v14 or higher
- Check for any npm version conflicts

### Icons not showing
- Run the icon generation script
- Verify PNG files exist in `src/icons/`
- Rebuild the extension after adding icons

## Testing

### Manual Testing Checklist

1. **File Upload**:
   - [ ] Drag and drop MIDI file
   - [ ] Browse and select MIDI file
   - [ ] Test with invalid file types
   - [ ] Test with corrupted MIDI files

2. **Conversion**:
   - [ ] Verify code generation
   - [ ] Check tempo preservation
   - [ ] Test different quantization settings
   - [ ] Verify pattern length options

3. **Code Actions**:
   - [ ] Copy to clipboard
   - [ ] Download as file
   - [ ] Verify code syntax

4. **Settings**:
   - [ ] Change settings
   - [ ] Reconvert with new settings
   - [ ] Verify settings persistence

5. **UI/UX**:
   - [ ] Tab navigation
   - [ ] Responsive design
   - [ ] Error handling
   - [ ] Loading states

## Production Deployment

When ready to publish to Chrome Web Store:

1. **Create production build**:
   ```bash
   npm run build
   ```

2. **Replace placeholder icons** with high-quality PNG icons

3. **Test thoroughly** in multiple scenarios

4. **Create ZIP file**:
   ```bash
   cd dist
   zip -r ../midi-to-strudel-converter.zip .
   ```

5. **Upload to Chrome Web Store**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Upload the ZIP file
   - Fill in store listing information
   - Submit for review

## Support

For issues or questions:
- Check the GitHub Issues page
- Review the PRD documentation in `docs/PRD-Documentation`
- Consult Chrome Extension documentation

## License

MIT License - see LICENSE file for details
