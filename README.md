# 🎹 MIDI to Strudel Converter

Convert any MIDI file to [Strudel.cc](https://strudel.cc) code - a Chrome extension that bridges traditional music production with live coding.

## Overview

The MIDI to Strudel Converter is a Chrome extension that transforms MIDI files into executable Strudel code, enabling music managers, marketers, educators, and creative professionals to create interactive, programmable musical experiences from their existing MIDI compositions.

## Features

### Core Functionality
- 🎵 **MIDI File Upload**: Drag-and-drop or browse to upload .mid/.midi files
- 🔄 **Real-time Conversion**: Automatic conversion to valid Strudel syntax
- 👀 **Live Preview**: View generated code with syntax highlighting
- 📋 **Copy/Export**: One-click copy to clipboard or download as .js file
- ⚙️ **Customizable Settings**: Adjust quantization, pattern length, and more
- 💾 **Persistent Settings**: Your preferences are saved automatically

### User Interface
- Modern, responsive design following Material Design principles
- Tab-based navigation (Code, Preview, Settings)
- Real-time processing indicators
- Comprehensive error handling
- Visual feedback for all actions

### Conversion Options
- **Quantization**: 16th notes, 8th notes, or quarter notes
- **Pattern Length**: 4, 8, or 16 beats
- **Tempo Preservation**: Maintain original MIDI tempo
- **Code Comments**: Include helpful comments in generated code

## Installation

### Option 1: Install from Chrome Web Store (Coming Soon)
Once published, you'll be able to install directly from the Chrome Web Store.

### Option 2: Install from Source

1. **Clone the repository**:
   ```bash
   git clone https://github.com/espra-zz/midi-to-strudel-converter.git
   cd midi-to-strudel-converter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

4. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist/` directory from the project

## Usage

### Basic Workflow

1. **Open the Extension**:
   - Click the extension icon in your Chrome toolbar
   - The converter popup will appear

2. **Upload a MIDI File**:
   - Drag and drop a MIDI file into the upload area
   - Or click "Browse Files" to select a file
   - Supports .mid and .midi formats

3. **View Generated Code**:
   - The extension automatically converts your MIDI file
   - Generated Strudel code appears in the Code tab
   - Preview MIDI information in the Preview tab

4. **Customize Conversion**:
   - Switch to the Settings tab
   - Adjust quantization, pattern length, and other options
   - Click "Reconvert with Settings" to regenerate code

5. **Use Your Code**:
   - Click the copy button to copy code to clipboard
   - Or click download to save as a .js file
   - Paste into [Strudel.cc](https://strudel.cc) to play!

### Example Conversion

**Input**: A simple MIDI melody

**Output**:
```javascript
// MIDI to Strudel Conversion
// File: melody.mid
// Generated: 12/9/2024, 4:41:23 PM

// Set tempo
setcpm(120)

// Track 1 (Piano)
const track0 = note("c4 d4 e4 f4 g4 a4 b4 c5")
  .sound("piano")
```

## Development

### Build Commands

- **Development Build** (with watch):
  ```bash
  npm run dev
  ```

- **Production Build**:
  ```bash
  npm run build
  ```

### Project Structure

```
midi-to-strudel-converter/
├── src/
│   ├── manifest.json          # Chrome extension manifest
│   ├── background/            # Service worker
│   ├── popup/                 # Extension UI
│   └── icons/                 # Extension icons
├── dist/                      # Build output
├── docs/
│   ├── PRD-Documentation      # Product requirements
│   └── BUILD.md               # Detailed build guide
├── scripts/                   # Build utilities
└── webpack.config.js          # Webpack configuration
```

### Technologies

- **Manifest V3**: Latest Chrome extension standard
- **@tonejs/midi**: MIDI file parsing
- **Webpack 5**: Module bundling
- **Vanilla JavaScript**: Lightweight, no framework dependencies
- **CSS3**: Modern styling with Grid and Flexbox

## Use Cases

### For Marketing Managers
Convert artist MIDI files into interactive web experiences for campaigns and brand activations.

### For Music Educators
Transform student compositions into code, teaching both music theory and programming concepts.

### For Content Creators
Create unique, shareable musical interactions for social media content.

### For Developers
Quickly prototype musical ideas using familiar MIDI tools before coding.

## Documentation

- [Build Instructions](docs/BUILD.md) - Detailed guide for building and deploying
- [PRD Documentation](docs/PRD-Documentation) - Product requirements and goals

## Browser Support

- Chrome 88+ (Manifest V3 support required)
- Microsoft Edge 88+ (Chromium-based)
- Opera 74+
- Brave 1.20+

## Limitations

- Audio preview requires external playback (copy to Strudel.cc)
- Complex MIDI arrangements may need manual adjustment
- Best results with 4/4 time signature and standard instruments

## Roadmap

- [ ] Batch processing for multiple files
- [ ] Direct Strudel.cc integration
- [ ] Advanced pattern recognition
- [ ] Custom sample library mapping
- [ ] API for third-party integrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Strudel.cc](https://strudel.cc) - The amazing live coding platform
- [Tone.js](https://tonejs.github.io/) - MIDI parsing library
- The live coding and algorithmic music community

## Support

- Report issues on [GitHub Issues](https://github.com/espra-zz/midi-to-strudel-converter/issues)
- Check the [Build Guide](docs/BUILD.md) for troubleshooting
- Visit [Strudel.cc Documentation](https://strudel.cc/learn) to learn about Strudel

---

Made with ♪ for creative coders and music enthusiasts
