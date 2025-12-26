#!/bin/bash
# Check if Chrome/Chromium is installed before running Lighthouse

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Checking for Chrome/Chromium installation..."

# Check common Chrome locations
CHROME_PATHS=(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
  "$(which google-chrome-stable 2>/dev/null)"
  "$(which google-chrome 2>/dev/null)"
  "$(which chromium 2>/dev/null)"
  "$(which chromium-browser 2>/dev/null)"
)

CHROME_FOUND=false

for path in "${CHROME_PATHS[@]}"; do
  if [ -n "$path" ] && [ -f "$path" ]; then
    echo -e "${GREEN}✓ Chrome found at: $path${NC}"
    CHROME_FOUND=true
    break
  fi
done

if [ "$CHROME_FOUND" = false ]; then
  echo -e "${RED}✗ Chrome/Chromium not found${NC}"
  echo ""
  echo -e "${YELLOW}Lighthouse requires Chrome/Chromium to run.${NC}"
  echo ""
  echo "Install options:"
  echo ""
  echo "  macOS:"
  echo "    brew install --cask google-chrome"
  echo "    # or"
  echo "    brew install --cask chromium"
  echo ""
  echo "  Ubuntu/Debian:"
  echo "    sudo apt install chromium-browser"
  echo ""
  echo "  Or download manually:"
  echo "    https://www.google.com/chrome/"
  echo ""
  exit 1
fi

echo -e "${GREEN}✓ Chrome/Chromium is installed and ready${NC}"
exit 0
