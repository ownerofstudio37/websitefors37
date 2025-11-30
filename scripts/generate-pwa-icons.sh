#!/bin/bash

# Generate PWA icons from Studio37 logo SVG
# This script creates the required icon sizes for the PWA manifest.
#
# Requirements:
# - ImageMagick (install: brew install imagemagick on macOS)
#
# Run: chmod +x scripts/generate-pwa-icons.sh && ./scripts/generate-pwa-icons.sh

set -e

LOGO_SVG="public/brand/studio37-badge-square.svg"
ICONS_DIR="public/icons"
BG_COLOR="#0f172a"  # slate-900

echo "🎨 Generating PWA icons from studio37-badge-square.svg..."
echo ""

# Create icons directory if it doesn't exist
mkdir -p "$ICONS_DIR"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick not found."
    echo "📦 Install it with: brew install imagemagick (macOS) or sudo apt-get install imagemagick (Linux)"
    exit 1
fi

# Function to generate icon
generate_icon() {
    local size=$1
    local output=$2
    local padding=$3
    
    if [ "$padding" = "true" ]; then
        # Maskable icon with 20% padding (safe zone)
        local inner_size=$((size * 80 / 100))
        convert "$LOGO_SVG" \
            -resize "${inner_size}x${inner_size}" \
            -background "$BG_COLOR" \
            -gravity center \
            -extent "${size}x${size}" \
            "$output"
    else
        # Regular icon
        convert "$LOGO_SVG" \
            -resize "${size}x${size}" \
            -background "$BG_COLOR" \
            -gravity center \
            -extent "${size}x${size}" \
            "$output"
    fi
    
    echo "✅ Generated $(basename "$output") (${size}x${size}px)"
}

# Generate all required icons
generate_icon 192 "$ICONS_DIR/icon-192.png" false
generate_icon 512 "$ICONS_DIR/icon-512.png" false
generate_icon 192 "$ICONS_DIR/maskable-192.png" true
generate_icon 512 "$ICONS_DIR/maskable-512.png" true

echo ""
echo "✨ All PWA icons generated successfully!"
echo "📁 Icons saved to: $ICONS_DIR/"
echo ""
