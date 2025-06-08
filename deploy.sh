#!/bin/bash

echo "🚀 Iniciando deploy do StyleIA..."

# Build do projeto
echo "📦 Compilando projeto..."
npm run build

# Deploy no Vercel
echo "☁️  Fazendo deploy no Vercel..."
vercel --prod --yes

echo "✅ Deploy concluído!"
echo "📱 Acesse o QR Code em: https://qr-code-generator.com/"
echo "🎯 Use o link do deploy para gerar o código"