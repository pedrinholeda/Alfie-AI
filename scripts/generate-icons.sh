#!/bin/bash

# Verifica se o ImageMagick está instalado
if ! command -v convert &> /dev/null
then
    echo "ImageMagick não está instalado. Por favor, instale usando:"
    echo "brew install imagemagick"
    exit 1
fi

# Verifica se o svgexport está instalado
if ! command -v svgexport &> /dev/null
then
    echo "svgexport não está instalado. Por favor, instale usando:"
    echo "npm install -g svgexport"
    exit 1
fi

# Cria diretório de assets se não existir
mkdir -p assets

# Gera os ícones
echo "Gerando ícones..."
svgexport src/assets/icon.svg assets/icon.png 1024:1024
svgexport src/assets/icon.svg assets/adaptive-icon.png 1024:1024
svgexport src/assets/icon.svg assets/favicon.png 196:196
svgexport src/assets/splash.svg assets/splash.png 1242:2436

echo "Ícones gerados com sucesso!" 