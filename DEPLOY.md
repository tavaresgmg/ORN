# 🚀 Instruções de Deploy - ORN

## Deploy no GitHub Pages

### 1. Criar repositório no GitHub
```bash
# No GitHub, criar novo repositório chamado "ORN"
# Marcar como público
```

### 2. Conectar repositório local
```bash
git remote add origin https://github.com/SEU_USUARIO/ORN.git
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages
1. Vá em Settings > Pages
2. Em "Build and deployment":
   - Source: GitHub Actions
3. O workflow já está configurado em `.github/workflows/deploy.yml`
4. Ao fazer push, o deploy será automático

### 4. Acessar o app
```
https://SEU_USUARIO.github.io/ORN/
```

## Deploy no Vercel

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
vercel

# Responder as perguntas:
# - Set up and deploy? Y
# - Which scope? (selecionar sua conta)
# - Link to existing project? N
# - Project name? orn
# - Directory? ./
# - Override settings? N
```

### 3. Deploy em produção
```bash
vercel --prod
```

## Gerar QR Code para Apresentação

### 1. Após deploy, usar o link gerado
```bash
# GitHub Pages: https://SEU_USUARIO.github.io/ORN/
# Vercel: https://orn.vercel.app/
```

### 2. Gerar QR Code
- Acesse: https://qr-code-generator.com/
- Cole o link do deploy
- Baixe o QR Code em alta resolução
- Adicione ao slide da apresentação

## Configurações Importantes

### Vite Config
O arquivo `vite.config.ts` já está configurado com:
```typescript
base: '/ORN/', // Para GitHub Pages
```

### Manifest PWA
O `manifest.json` está configurado para funcionar como app mobile.

### CI/CD
GitHub Actions está configurado para deploy automático em cada push.

## Troubleshooting

### Erro 404 no GitHub Pages
- Verificar se o `base` no vite.config.ts está correto
- Aguardar alguns minutos após o deploy

### Imagens não aparecem
- Usar caminhos relativos
- Verificar se estão na pasta `public`

### PWA não funciona
- Precisa ser servido via HTTPS
- Verificar manifest.json e service worker

## Performance

O app está otimizado para:
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Score > 90

## Monitoramento

Após deploy, testar em:
- https://pagespeed.web.dev/
- Chrome DevTools > Lighthouse
- Diferentes dispositivos móveis