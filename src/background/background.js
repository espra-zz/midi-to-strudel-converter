/**
 * Background Service Worker for MIDI to Strudel Converter
 * Handles extension lifecycle and background tasks
 */

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('MIDI to Strudel Converter installed!');

    // Set default settings
    chrome.storage.local.set({
      settings: {
        quantization: 16,
        patternLength: 8,
        preserveTempo: true,
        includeComments: true
      }
    });
  } else if (details.reason === 'update') {
    console.log('MIDI to Strudel Converter updated!');
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertMidi') {
    // Handle MIDI conversion requests if needed
    console.log('Converting MIDI:', request.data);
    sendResponse({ success: true });
  }

  return true; // Keep message channel open for async responses
});

// Optional: Add context menu items for quick access
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openConverter',
    title: 'Convert MIDI to Strudel',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openConverter') {
    // Open the extension popup
    chrome.action.openPopup();
  }
});

// Keep service worker alive (if needed for long-running tasks)
let keepAlive;
function resetKeepAlive() {
  clearTimeout(keepAlive);
  keepAlive = setTimeout(() => {
    // Ping to keep service worker active
    chrome.runtime.getPlatformInfo();
  }, 20000); // Ping every 20 seconds
}

resetKeepAlive();

console.log('MIDI to Strudel Converter background service worker loaded');
