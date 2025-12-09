# MIDI to Strudel Converter - Installation & Anwendung

## 📋 INSTALLATION SCHRITT FÜR SCHRITT

### Voraussetzungen
- **Google Chrome Browser** (Version 88 oder höher)
- Das fertige Extension-Paket im `dist/` Ordner

---

## 🚀 INSTALLATION IN CHROME

### Schritt 1: Chrome Extensions-Seite öffnen

**Option A - Via URL:**
1. Öffnen Sie Chrome
2. Geben Sie in die Adressleiste ein: `chrome://extensions/`
3. Drücken Sie Enter

**Option B - Via Menü:**
1. Klicken Sie auf die drei Punkte oben rechts in Chrome ⋮
2. Bewegen Sie die Maus über "Weitere Tools"
3. Klicken Sie auf "Erweiterungen"

---

### Schritt 2: Entwicklermodus aktivieren

1. Auf der Extensions-Seite sehen Sie oben rechts einen Schalter **"Entwicklermodus"**
2. Klicken Sie darauf, um ihn zu **aktivieren** (er sollte blau werden)
3. Es erscheinen nun drei neue Schaltflächen:
   - "Entpackte Erweiterung laden"
   - "Erweiterung packen"
   - "Updates für Erweiterungen laden"

---

### Schritt 3: Extension laden

1. Klicken Sie auf **"Entpackte Erweiterung laden"** (ganz links)
2. Ein Datei-Dialog öffnet sich
3. Navigieren Sie zu Ihrem Projektordner
4. **WICHTIG:** Wählen Sie den **`dist/`** Ordner aus (nicht den Hauptordner!)
5. Der Pfad sollte sein: `/home/user/midi-to-strudel-converter/dist/`
6. Klicken Sie auf **"Ordner auswählen"** oder **"Select Folder"**

---

### Schritt 4: Überprüfung

Nach erfolgreichem Laden sollten Sie sehen:

```
✓ MIDI to Strudel Converter
  ID: [eine zufällige ID]
  Version: 1.0.0
  Ein-/Ausschalten-Schalter (sollte AN sein)
  Icon: Stilisiertes MIDI-Keyboard
```

**Falls ein Fehler erscheint:**
- Prüfen Sie, ob Sie wirklich den `dist/` Ordner gewählt haben (NICHT den Hauptordner!)
- Prüfen Sie, ob alle Dateien im dist/ Ordner vorhanden sind (siehe unten)

---

## ✅ DATEIEN IM DIST/ ORDNER

Der `dist/` Ordner muss folgende Struktur haben:

```
dist/
├── manifest.json           ← MUSS vorhanden sein!
├── background/
│   └── background.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    ├── icon128.png
    └── icon.svg
```

**Prüfen Sie mit diesem Befehl:**
```bash
cd /home/user/midi-to-strudel-converter
ls -la dist/
```

---

## 🎵 ANWENDUNG DER EXTENSION

### Extension öffnen

**Option A - Via Icon:**
1. Schauen Sie in die Chrome-Toolbar (oben rechts)
2. Finden Sie das MIDI-Keyboard-Icon
3. Klicken Sie darauf

**Option B - Via Extensions-Menü:**
1. Klicken Sie auf das Puzzle-Icon in der Toolbar
2. Finden Sie "MIDI to Strudel Converter" in der Liste
3. Klicken Sie darauf

**Tipp:** Pin die Extension an:
- Klicken Sie auf das Puzzle-Icon
- Klicken Sie auf die Stecknadel neben "MIDI to Strudel Converter"
- Das Icon bleibt dauerhaft sichtbar

---

### MIDI-Datei konvertieren

#### Schritt 1: MIDI-Datei vorbereiten
- Stellen Sie sicher, dass Sie eine .mid oder .midi Datei haben
- Die Datei sollte gültig und nicht beschädigt sein

#### Schritt 2: Datei hochladen

**Option A - Drag & Drop:**
1. Öffnen Sie die Extension
2. Ziehen Sie Ihre MIDI-Datei auf den Upload-Bereich
3. Lassen Sie die Maustaste los

**Option B - Datei-Browser:**
1. Öffnen Sie die Extension
2. Klicken Sie auf "Browse Files"
3. Wählen Sie Ihre MIDI-Datei aus
4. Klicken Sie auf "Öffnen"

#### Schritt 3: Konvertierung
- Die Extension konvertiert die Datei automatisch
- Sie sehen einen Fortschrittsbalken mit "Converting your MIDI file..."
- Nach wenigen Sekunden erscheint der generierte Code

#### Schritt 4: Code verwenden

**Den Code kopieren:**
1. Klicken Sie auf das Kopier-Icon (📋) neben dem Code
2. Es erscheint "✓ Copied to clipboard!"
3. Der Code ist jetzt in Ihrer Zwischenablage

**Den Code herunterladen:**
1. Klicken Sie auf das Download-Icon (⬇️)
2. Die Datei wird als .js-Datei heruntergeladen
3. Der Dateiname entspricht Ihrer MIDI-Datei (z.B. `melody.js`)

**Den Code in Strudel.cc verwenden:**
1. Öffnen Sie https://strudel.cc in einem neuen Tab
2. Löschen Sie den Beispielcode
3. Fügen Sie Ihren kopierten Code ein (Strg+V oder Cmd+V)
4. Klicken Sie auf Play ▶️

---

### Tabs erklärt

#### 📝 Code Tab
- Zeigt den generierten Strudel-Code
- Syntax-Highlighting für bessere Lesbarkeit
- Copy- und Download-Funktionen

#### 👁️ Preview Tab
- Zeigt MIDI-Informationen:
  - Tempo (BPM)
  - Anzahl der Tracks
  - Dauer
- Audio-Vorschau (in zukünftiger Version)

#### ⚙️ Settings Tab
- **Quantization**: Wie genau Noten zeitlich ausgerichtet werden
  - 16th notes = sehr genau
  - 8th notes = mittel
  - Quarter notes = grob
- **Pattern Length**: Länge des Musters in Beats
- **Preserve Tempo**: Original-Tempo beibehalten
- **Include Comments**: Erklärende Kommentare im Code

**Einstellungen ändern:**
1. Wechseln Sie zum Settings Tab
2. Ändern Sie die gewünschten Einstellungen
3. Klicken Sie auf "Reconvert with Settings"
4. Der Code wird mit neuen Einstellungen generiert

---

## 🔧 PROBLEMLÖSUNG

### Problem: "Manifest-Datei fehlt oder ist nicht lesbar"

**Lösung 1 - Richtigen Ordner wählen:**
```
❌ FALSCH: /home/user/midi-to-strudel-converter
✅ RICHTIG: /home/user/midi-to-strudel-converter/dist/
```

**Lösung 2 - Extension neu bauen:**
```bash
cd /home/user/midi-to-strudel-converter
npm run build
```

**Lösung 3 - Dateien prüfen:**
```bash
cd /home/user/midi-to-strudel-converter/dist
ls -la
# manifest.json MUSS vorhanden sein!
```

**Lösung 4 - Chrome neu starten:**
1. Schließen Sie Chrome komplett
2. Öffnen Sie Chrome neu
3. Versuchen Sie erneut, die Extension zu laden

---

### Problem: Extension-Icon erscheint nicht

**Lösung:**
1. Gehen Sie zu `chrome://extensions/`
2. Finden Sie "MIDI to Strudel Converter"
3. Prüfen Sie, ob der Schalter auf AN steht
4. Klicken Sie auf das Puzzle-Icon in der Toolbar
5. Pinnen Sie die Extension an (Stecknadel-Symbol)

---

### Problem: MIDI-Datei wird nicht erkannt

**Lösung:**
1. Prüfen Sie die Dateiendung (muss .mid oder .midi sein)
2. Öffnen Sie die Datei mit einem MIDI-Player, um zu testen, ob sie gültig ist
3. Versuchen Sie eine andere MIDI-Datei
4. Prüfen Sie, ob die Datei nicht beschädigt ist

---

### Problem: Generierter Code funktioniert nicht in Strudel.cc

**Lösung:**
1. Kopieren Sie den gesamten Code (nicht nur einen Teil)
2. Prüfen Sie, ob Strudel.cc richtig geladen ist
3. Öffnen Sie die Browser-Konsole (F12) für Fehlermeldungen
4. Passen Sie die Settings an und konvertieren Sie erneut

---

## 📊 CODE-BEISPIEL

### Eingabe: MIDI-Datei mit Klaviermelodie

### Ausgabe:
```javascript
// MIDI to Strudel Conversion
// File: melody.mid
// Generated: 12/9/2024, 5:30:15 PM

// Set tempo
setcpm(120)

// Track 1 (Piano)
const track0 = note("c4 d4 e4 f4 g4 a4 b4 c5")
  .sound("piano")
```

### In Strudel.cc verwenden:
1. Kopieren Sie den kompletten Code oben
2. Gehen Sie zu https://strudel.cc
3. Fügen Sie den Code ein
4. Klicken Sie auf Play ▶️
5. Hören Sie Ihre Melodie!

---

## 🎛️ ERWEITERTE NUTZUNG

### Mehrere Tracks kombinieren

Wenn Ihre MIDI-Datei mehrere Tracks hat:

```javascript
// Track 1 (Piano)
const track0 = note("c4 e4 g4")
  .sound("piano")

// Track 2 (Bass)
const track1 = note("c2 ~ c2 ~")
  .sound("bass")

// Alle Tracks zusammen spielen
stack(track0, track1)
```

### Settings für beste Ergebnisse

**Für elektronische Musik:**
- Quantization: 16th notes
- Pattern Length: 8 beats
- Preserve Tempo: An

**Für Jazz/Organic:**
- Quantization: 8th notes
- Pattern Length: 4 beats
- Preserve Tempo: An

**Für experimentell:**
- Quantization: Quarter notes
- Pattern Length: 16 beats
- Preserve Tempo: Aus

---

## 📱 CHROME DEVTOOLS (für Entwickler)

### Extension debuggen:

1. Gehen Sie zu `chrome://extensions/`
2. Finden Sie "MIDI to Strudel Converter"
3. Klicken Sie auf "Details"
4. Scrollen Sie zu "Popup überprüfen"
5. Die DevTools öffnen sich

### Console Logs ansehen:

```
Rechtsklick auf Extension-Icon → "Popup überprüfen"
```

---

## 🔄 EXTENSION AKTUALISIEREN

Wenn Sie Änderungen am Code gemacht haben:

### Schritt 1: Neu bauen
```bash
cd /home/user/midi-to-strudel-converter
npm run build
```

### Schritt 2: In Chrome aktualisieren
1. Gehen Sie zu `chrome://extensions/`
2. Finden Sie "MIDI to Strudel Converter"
3. Klicken Sie auf das Reload-Symbol ⟳
4. Die Extension wird mit den neuen Dateien geladen

---

## 📞 SUPPORT

### Bei Problemen:

1. **Prüfen Sie die Konsole:**
   - Rechtsklick auf Extension-Icon → "Popup überprüfen"
   - Schauen Sie nach Fehlermeldungen in der Console

2. **Prüfen Sie die Dateien:**
   ```bash
   cd /home/user/midi-to-strudel-converter/dist
   ls -la
   cat manifest.json
   ```

3. **Neu bauen:**
   ```bash
   cd /home/user/midi-to-strudel-converter
   rm -rf dist/
   npm run build
   ```

4. **Chrome-Cache leeren:**
   - Einstellungen → Datenschutz und Sicherheit → Browserdaten löschen
   - Wählen Sie "Zwischengespeicherte Bilder und Dateien"

---

## ✅ CHECKLISTE FÜR ERFOLGREICHE INSTALLATION

- [ ] Chrome Version 88+ installiert
- [ ] Projekt heruntergeladen/geklont
- [ ] `npm install` ausgeführt
- [ ] `npm run build` ausgeführt
- [ ] `dist/` Ordner existiert
- [ ] `dist/manifest.json` existiert
- [ ] Chrome Extensions-Seite geöffnet (`chrome://extensions/`)
- [ ] Entwicklermodus aktiviert
- [ ] "Entpackte Erweiterung laden" geklickt
- [ ] **`dist/`** Ordner ausgewählt (nicht Hauptordner!)
- [ ] Extension erscheint in der Liste
- [ ] Extension ist aktiviert (Schalter auf AN)
- [ ] Extension-Icon ist sichtbar in der Toolbar

---

## 🎯 SCHNELLSTART (TL;DR)

```bash
# 1. Dependencies installieren
npm install

# 2. Extension bauen
npm run build

# 3. In Chrome laden
# - Öffne chrome://extensions/
# - Aktiviere Entwicklermodus
# - Klicke "Entpackte Erweiterung laden"
# - Wähle den dist/ Ordner aus

# 4. Extension nutzen
# - Klicke auf Extension-Icon
# - Lade MIDI-Datei hoch
# - Kopiere generierten Code
# - Füge in strudel.cc ein
```

---

**Version:** 1.0.0
**Letzte Aktualisierung:** 9. Dezember 2024
**Support:** https://github.com/espra-zz/midi-to-strudel-converter
