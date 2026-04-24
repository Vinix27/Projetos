#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$ROOT_DIR/build/forca-tv"
WWW_DIR="$BUILD_DIR/www"

if ! command -v cordova >/dev/null 2>&1; then
  echo "Erro: cordova não encontrado. Instale com: npm i -g cordova"
  exit 1
fi

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

cordova create "$BUILD_DIR" com.exemplo.forcatv ForcaTV

cd "$BUILD_DIR"

# android@6.4.0 é uma opção conhecida por suportar API 19 (Android 4.4)
cordova platform add android@6.4.0

mkdir -p "$WWW_DIR"
cp "$ROOT_DIR/index.html" "$WWW_DIR/index.html"
cp "$ROOT_DIR/styles.css" "$WWW_DIR/styles.css"
cp "$ROOT_DIR/script.js" "$WWW_DIR/script.js"

cordova build android --debug

echo
echo "APK gerado em:"
echo "  $BUILD_DIR/platforms/android/build/outputs/apk/android-debug.apk"
