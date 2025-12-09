# ⚡ Quick Start - MIDI to Strudel Converter

## 🎯 Installation in 4 Schritten

### 1️⃣ Dependencies installieren
```bash
npm install
```

### 2️⃣ Extension bauen
```bash
npm run build
```

### 3️⃣ Extension prüfen
```bash
npm run verify
```
Alle Checks sollten grün sein ✓

### 4️⃣ In Chrome laden

1. Öffne: `chrome://extensions/`
2. Aktiviere: **Entwicklermodus** (oben rechts)
3. Klicke: **"Entpackte Erweiterung laden"**
4. Wähle: **`/home/user/midi-to-strudel-converter/dist/`**

**⚠️ WICHTIG:** Wähle den `dist/` Ordner, NICHT den Hauptordner!

---

## 🎵 Verwendung

1. **Extension öffnen** - Klicke auf das MIDI-Keyboard-Icon in der Chrome-Toolbar
2. **MIDI hochladen** - Drag & Drop oder Browse
3. **Code kopieren** - Klicke auf das Kopier-Icon
4. **In Strudel nutzen** - Öffne https://strudel.cc und füge den Code ein

---

## 🔧 NPM Scripts

```bash
npm run build          # Production Build
npm run dev            # Development Build (mit Watch)
npm run verify         # Extension überprüfen
npm run generate-icons # Icons neu generieren
npm run rebuild        # Icons + Build neu
```

---

## ❌ Problem: "Manifest-Datei fehlt"?

### Lösung 1: Richtigen Ordner wählen
```
❌ FALSCH: /home/user/midi-to-strudel-converter
✅ RICHTIG: /home/user/midi-to-strudel-converter/dist/
```

### Lösung 2: Neu bauen
```bash
npm run rebuild
npm run verify
```

### Lösung 3: Manuelle Prüfung
```bash
ls -la dist/manifest.json
# Datei muss existieren!
```

---

## 📚 Vollständige Dokumentation

- **Installation & Anwendung:** [HOWTODO.md](HOWTODO.md)
- **Build-Anleitung:** [docs/BUILD.md](docs/BUILD.md)
- **Projekt-Übersicht:** [README.md](README.md)

---

## ✅ Checkliste

- [ ] `npm install` ausgeführt
- [ ] `npm run build` ausgeführt
- [ ] `npm run verify` → alle grün ✓
- [ ] Chrome → `chrome://extensions/`
- [ ] Entwicklermodus AN
- [ ] **dist/** Ordner geladen
- [ ] Extension erscheint in Liste
- [ ] Extension aktiviert
- [ ] Icon sichtbar in Toolbar

---

**Support:** Siehe [HOWTODO.md](HOWTODO.md) für detaillierte Problemlösungen
