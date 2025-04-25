const fs = require('fs');
const path = require('path');

// Diretório de imagens
const imagesDir = path.join(__dirname, '../public/images');

// Criar diretório se não existir
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Copiar favicon como ícones temporários
const faviconPath = path.join(__dirname, '../public/favicon.ico');
fs.copyFileSync(faviconPath, path.join(imagesDir, 'icon-192x192.png'));
fs.copyFileSync(faviconPath, path.join(imagesDir, 'icon-512x512.png'));

console.log('✅ Ícones gerados com sucesso!'); 