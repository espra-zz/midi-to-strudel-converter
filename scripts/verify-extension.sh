#!/bin/bash

# Extension Verification Script
# Checks if all required files exist and are valid

echo "================================"
echo "MIDI to Strudel Extension Verifier"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check if dist directory exists
echo "Checking dist/ directory..."
if [ ! -d "dist" ]; then
    echo -e "${RED}✗ FEHLER: dist/ Ordner nicht gefunden!${NC}"
    echo "  Führen Sie 'npm run build' aus"
    exit 1
fi
echo -e "${GREEN}✓ dist/ Ordner gefunden${NC}"
echo ""

# Check manifest.json
echo "Checking manifest.json..."
if [ ! -f "dist/manifest.json" ]; then
    echo -e "${RED}✗ FEHLER: dist/manifest.json nicht gefunden!${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ manifest.json vorhanden${NC}"

    # Validate JSON
    if command -v python3 &> /dev/null; then
        if python3 -m json.tool dist/manifest.json > /dev/null 2>&1; then
            echo -e "${GREEN}✓ manifest.json ist valides JSON${NC}"
        else
            echo -e "${RED}✗ FEHLER: manifest.json ist KEIN valides JSON!${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    fi

    # Check required fields
    if grep -q '"manifest_version": 3' dist/manifest.json; then
        echo -e "${GREEN}✓ Manifest V3${NC}"
    else
        echo -e "${RED}✗ FEHLER: Kein Manifest V3!${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi
echo ""

# Check popup files
echo "Checking popup files..."
for file in popup/popup.html popup/popup.css popup/popup.js; do
    if [ -f "dist/$file" ]; then
        size=$(wc -c < "dist/$file")
        echo -e "${GREEN}✓ $file vorhanden ($size bytes)${NC}"
    else
        echo -e "${RED}✗ FEHLER: dist/$file nicht gefunden!${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# Check background service worker
echo "Checking background service worker..."
if [ -f "dist/background/background.js" ]; then
    size=$(wc -c < "dist/background/background.js")
    echo -e "${GREEN}✓ background.js vorhanden ($size bytes)${NC}"
else
    echo -e "${RED}✗ FEHLER: dist/background/background.js nicht gefunden!${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check icons
echo "Checking icons..."
for size in 16 32 48 128; do
    icon="dist/icons/icon${size}.png"
    if [ -f "$icon" ]; then
        filesize=$(wc -c < "$icon")

        # Check if file is actually a PNG
        if file "$icon" | grep -q "PNG image data, $size x $size"; then
            echo -e "${GREEN}✓ icon${size}.png vorhanden und korrekt ($filesize bytes)${NC}"
        elif file "$icon" | grep -q "PNG image data"; then
            echo -e "${YELLOW}⚠ icon${size}.png ist PNG aber falsche Größe!${NC}"
            WARNINGS=$((WARNINGS + 1))
        else
            echo -e "${RED}✗ FEHLER: icon${size}.png ist kein gültiges PNG!${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo -e "${RED}✗ FEHLER: $icon nicht gefunden!${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# Check file permissions
echo "Checking file permissions..."
if [ -r "dist/manifest.json" ]; then
    echo -e "${GREEN}✓ manifest.json ist lesbar${NC}"
else
    echo -e "${RED}✗ FEHLER: manifest.json ist nicht lesbar!${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Summary
echo "================================"
echo "ZUSAMMENFASSUNG"
echo "================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ Alle Prüfungen bestanden!${NC}"
    echo ""
    echo "Die Extension ist bereit zum Laden in Chrome:"
    echo "1. Öffnen Sie chrome://extensions/"
    echo "2. Aktivieren Sie den Entwicklermodus"
    echo "3. Klicken Sie 'Entpackte Erweiterung laden'"
    echo "4. Wählen Sie den Ordner: $(pwd)/dist/"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS Warnung(en) gefunden${NC}"
    echo ""
    echo "Die Extension sollte funktionieren, aber prüfen Sie die Warnungen."
    echo ""
    exit 0
else
    echo -e "${RED}✗ $ERRORS Fehler gefunden${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ $WARNINGS Warnung(en) gefunden${NC}"
    fi
    echo ""
    echo "Bitte beheben Sie die Fehler und führen Sie 'npm run build' erneut aus."
    echo ""
    exit 1
fi
