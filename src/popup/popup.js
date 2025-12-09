import { Midi } from '@tonejs/midi';

/**
 * Main application state
 */
const state = {
  currentMidi: null,
  currentCode: '',
  fileName: '',
  settings: {
    quantization: 16,
    patternLength: 8,
    preserveTempo: true,
    includeComments: true
  }
};

/**
 * DOM elements
 */
const elements = {
  // Sections
  uploadSection: document.getElementById('uploadSection'),
  processingSection: document.getElementById('processingSection'),
  resultsSection: document.getElementById('resultsSection'),
  errorSection: document.getElementById('errorSection'),

  // Upload
  dropZone: document.getElementById('dropZone'),
  fileInput: document.getElementById('fileInput'),
  browseBtn: document.getElementById('browseBtn'),

  // Processing
  processingStatus: document.getElementById('processingStatus'),

  // Results
  fileName: document.getElementById('fileName'),
  convertNewBtn: document.getElementById('convertNewBtn'),
  codeOutput: document.getElementById('codeOutput'),
  copyBtn: document.getElementById('copyBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  copyNotification: document.getElementById('copyNotification'),

  // Tabs
  tabs: document.querySelectorAll('.tab'),
  tabContents: document.querySelectorAll('.tab-content'),

  // Preview
  playBtn: document.getElementById('playBtn'),
  stopBtn: document.getElementById('stopBtn'),
  tempo: document.getElementById('tempo'),
  trackCount: document.getElementById('trackCount'),
  duration: document.getElementById('duration'),

  // Settings
  quantization: document.getElementById('quantization'),
  patternLength: document.getElementById('patternLength'),
  preserveTempo: document.getElementById('preserveTempo'),
  includeComments: document.getElementById('includeComments'),
  reconvertBtn: document.getElementById('reconvertBtn'),

  // Error
  errorMessage: document.getElementById('errorMessage'),
  tryAgainBtn: document.getElementById('tryAgainBtn')
};

/**
 * Initialize the application
 */
function init() {
  setupEventListeners();
  loadSettings();
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Upload interactions
  elements.browseBtn.addEventListener('click', () => elements.fileInput.click());
  elements.fileInput.addEventListener('change', handleFileSelect);
  elements.dropZone.addEventListener('click', () => elements.fileInput.click());

  // Drag and drop
  elements.dropZone.addEventListener('dragover', handleDragOver);
  elements.dropZone.addEventListener('dragleave', handleDragLeave);
  elements.dropZone.addEventListener('drop', handleDrop);

  // Navigation
  elements.convertNewBtn.addEventListener('click', resetToUpload);
  elements.tryAgainBtn.addEventListener('click', resetToUpload);

  // Tabs
  elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Code actions
  elements.copyBtn.addEventListener('click', copyToClipboard);
  elements.downloadBtn.addEventListener('click', downloadCode);

  // Preview actions
  elements.playBtn.addEventListener('click', playPreview);
  elements.stopBtn.addEventListener('click', stopPreview);

  // Settings
  elements.reconvertBtn.addEventListener('click', reconvertWithSettings);

  // Save settings on change
  elements.quantization.addEventListener('change', saveSettings);
  elements.patternLength.addEventListener('change', saveSettings);
  elements.preserveTempo.addEventListener('change', saveSettings);
  elements.includeComments.addEventListener('change', saveSettings);
}

/**
 * Load settings from Chrome storage
 */
function loadSettings() {
  chrome.storage.local.get(['settings'], (result) => {
    if (result.settings) {
      state.settings = { ...state.settings, ...result.settings };
      applySettings();
    }
  });
}

/**
 * Apply settings to UI
 */
function applySettings() {
  elements.quantization.value = state.settings.quantization;
  elements.patternLength.value = state.settings.patternLength;
  elements.preserveTempo.checked = state.settings.preserveTempo;
  elements.includeComments.checked = state.settings.includeComments;
}

/**
 * Save settings to Chrome storage
 */
function saveSettings() {
  state.settings = {
    quantization: parseInt(elements.quantization.value),
    patternLength: parseInt(elements.patternLength.value),
    preserveTempo: elements.preserveTempo.checked,
    includeComments: elements.includeComments.checked
  };

  chrome.storage.local.set({ settings: state.settings });
}

/**
 * Handle drag over event
 */
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  elements.dropZone.classList.add('drag-over');
}

/**
 * Handle drag leave event
 */
function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  elements.dropZone.classList.remove('drag-over');
}

/**
 * Handle drop event
 */
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  elements.dropZone.classList.remove('drag-over');

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
}

/**
 * Handle file select from input
 */
function handleFileSelect(e) {
  const files = e.target.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
}

/**
 * Process the uploaded MIDI file
 */
async function processFile(file) {
  // Validate file type
  if (!file.name.endsWith('.mid') && !file.name.endsWith('.midi')) {
    showError('Invalid file type. Please upload a .mid or .midi file.');
    return;
  }

  state.fileName = file.name;
  showProcessing();

  try {
    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Parse MIDI
    updateProcessingStatus('Parsing MIDI data...');
    const midi = new Midi(arrayBuffer);
    state.currentMidi = midi;

    // Convert to Strudel
    updateProcessingStatus('Converting to Strudel code...');
    const strudelCode = convertMidiToStrudel(midi);
    state.currentCode = strudelCode;

    // Show results
    setTimeout(() => {
      showResults();
    }, 500);

  } catch (error) {
    console.error('Error processing file:', error);
    showError(`Failed to process MIDI file: ${error.message}`);
  }
}

/**
 * Convert MIDI data to Strudel code
 */
function convertMidiToStrudel(midi) {
  const { quantization, patternLength, preserveTempo, includeComments } = state.settings;

  let code = '';

  // Add header comment
  if (includeComments) {
    code += `// MIDI to Strudel Conversion\n`;
    code += `// File: ${state.fileName}\n`;
    code += `// Generated: ${new Date().toLocaleString()}\n\n`;
  }

  // Set tempo
  const tempo = preserveTempo && midi.header.tempos.length > 0
    ? Math.round(midi.header.tempos[0].bpm)
    : 120;

  if (includeComments) {
    code += `// Set tempo\n`;
  }
  code += `setcpm(${tempo})\n\n`;

  // Process each track
  const tracks = midi.tracks.filter(track => track.notes.length > 0);

  if (tracks.length === 0) {
    throw new Error('No notes found in MIDI file');
  }

  if (includeComments) {
    code += `// ${tracks.length} track(s) found\n\n`;
  }

  // Convert tracks
  tracks.forEach((track, index) => {
    const trackCode = convertTrackToStrudel(track, index, quantization, patternLength, includeComments);
    code += trackCode + '\n';
  });

  // Stack tracks if multiple
  if (tracks.length > 1) {
    if (includeComments) {
      code += `// Stack all tracks\n`;
    }
    const trackNames = tracks.map((_, i) => `track${i}`).join(', ');
    code += `stack(${trackNames})`;
  }

  return code;
}

/**
 * Convert a single MIDI track to Strudel code
 */
function convertTrackToStrudel(track, trackIndex, quantization, patternLength, includeComments) {
  let code = '';

  // Track comment
  if (includeComments) {
    const trackName = track.name || `Track ${trackIndex + 1}`;
    const instrument = track.instrument?.name || 'Unknown';
    code += `// ${trackName} (${instrument})\n`;
  }

  // Extract notes
  const notes = track.notes.map(note => ({
    name: note.name,
    midi: note.midi,
    time: note.time,
    duration: note.duration,
    velocity: note.velocity
  }));

  if (notes.length === 0) {
    return code;
  }

  // Group notes into patterns
  const patterns = groupNotesIntoPatterns(notes, patternLength, quantization);

  // Convert to Strudel pattern notation
  const notePattern = createNotePattern(patterns);

  // Build Strudel code
  const varName = `track${trackIndex}`;
  code += `const ${varName} = note("${notePattern}")\n`;

  // Add sound/instrument
  const instrument = getStrudelInstrument(track);
  code += `  .sound("${instrument}")\n`;

  return code;
}

/**
 * Group notes into quantized patterns
 */
function groupNotesIntoPatterns(notes, patternLength, quantization) {
  if (notes.length === 0) return [];

  // Calculate grid size
  const gridSize = patternLength * quantization;
  const timePerStep = (60 / 120) / (quantization / 4); // Assuming 120 BPM base

  // Create pattern grid
  const pattern = [];

  // Quantize notes to grid
  notes.forEach(note => {
    const step = Math.round(note.time / timePerStep) % gridSize;
    if (!pattern[step]) {
      pattern[step] = [];
    }
    pattern[step].push(note.name);
  });

  return pattern;
}

/**
 * Create Strudel note pattern string
 */
function createNotePattern(patterns) {
  const maxLength = 16; // Maximum pattern length
  const noteArray = [];

  for (let i = 0; i < maxLength; i++) {
    if (patterns[i] && patterns[i].length > 0) {
      // Use first note if multiple notes at same position
      noteArray.push(patterns[i][0].toLowerCase());
    } else {
      noteArray.push('~'); // Rest
    }
  }

  return noteArray.join(' ');
}

/**
 * Get appropriate Strudel instrument/sound for MIDI track
 */
function getStrudelInstrument(track) {
  const instrument = track.instrument?.name?.toLowerCase() || '';
  const channel = track.channel;

  // Map MIDI instruments to Strudel sounds
  if (instrument.includes('piano')) return 'piano';
  if (instrument.includes('bass')) return 'bass';
  if (instrument.includes('drum') || channel === 9) return 'bd sd hh';
  if (instrument.includes('synth')) return 'sawtooth';
  if (instrument.includes('guitar')) return 'guitar';
  if (instrument.includes('organ')) return 'organ';
  if (instrument.includes('string')) return 'strings';

  return 'sawtooth'; // Default
}

/**
 * Update processing status message
 */
function updateProcessingStatus(message) {
  elements.processingStatus.textContent = message;
}

/**
 * Show processing section
 */
function showProcessing() {
  hideAllSections();
  elements.processingSection.classList.remove('hidden');
}

/**
 * Show results section
 */
function showResults() {
  hideAllSections();
  elements.resultsSection.classList.remove('hidden');

  // Update UI with results
  elements.fileName.textContent = state.fileName;
  elements.codeOutput.textContent = state.currentCode;

  // Update preview info
  if (state.currentMidi) {
    const midi = state.currentMidi;
    const tempo = midi.header.tempos.length > 0 ? Math.round(midi.header.tempos[0].bpm) : 120;
    const trackCount = midi.tracks.filter(t => t.notes.length > 0).length;
    const duration = Math.round(midi.duration);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    elements.tempo.textContent = tempo;
    elements.trackCount.textContent = trackCount;
    elements.duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

/**
 * Show error section
 */
function showError(message) {
  hideAllSections();
  elements.errorSection.classList.remove('hidden');
  elements.errorMessage.textContent = message;
}

/**
 * Hide all sections
 */
function hideAllSections() {
  elements.uploadSection.classList.add('hidden');
  elements.processingSection.classList.add('hidden');
  elements.resultsSection.classList.add('hidden');
  elements.errorSection.classList.add('hidden');
}

/**
 * Reset to upload section
 */
function resetToUpload() {
  hideAllSections();
  elements.uploadSection.classList.remove('hidden');
  elements.fileInput.value = '';
  state.currentMidi = null;
  state.currentCode = '';
  state.fileName = '';
}

/**
 * Switch between tabs
 */
function switchTab(tabName) {
  // Update tab buttons
  elements.tabs.forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update tab contents
  const tabContents = {
    'code': document.getElementById('codeTab'),
    'preview': document.getElementById('previewTab'),
    'settings': document.getElementById('settingsTab')
  };

  Object.keys(tabContents).forEach(key => {
    if (key === tabName) {
      tabContents[key].classList.add('active');
    } else {
      tabContents[key].classList.remove('active');
    }
  });
}

/**
 * Copy code to clipboard
 */
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(state.currentCode);

    // Show notification
    elements.copyNotification.classList.remove('hidden');
    setTimeout(() => {
      elements.copyNotification.classList.add('hidden');
    }, 2000);
  } catch (error) {
    console.error('Failed to copy:', error);
    alert('Failed to copy to clipboard');
  }
}

/**
 * Download code as file
 */
function downloadCode() {
  const blob = new Blob([state.currentCode], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = state.fileName.replace(/\.(mid|midi)$/i, '.js');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Play preview (placeholder - actual audio playback would require Tone.js integration)
 */
function playPreview() {
  alert('Audio preview functionality would require Tone.js integration.\n\nFor now, copy the code and paste it into strudel.cc to hear it!');
  elements.playBtn.classList.add('hidden');
  elements.stopBtn.classList.remove('hidden');
}

/**
 * Stop preview
 */
function stopPreview() {
  elements.playBtn.classList.remove('hidden');
  elements.stopBtn.classList.add('hidden');
}

/**
 * Reconvert with new settings
 */
function reconvertWithSettings() {
  if (!state.currentMidi) return;

  saveSettings();
  showProcessing();

  setTimeout(() => {
    try {
      const strudelCode = convertMidiToStrudel(state.currentMidi);
      state.currentCode = strudelCode;
      showResults();
      switchTab('code');
    } catch (error) {
      showError(`Failed to reconvert: ${error.message}`);
    }
  }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
