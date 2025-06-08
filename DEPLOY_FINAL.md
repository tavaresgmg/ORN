# 🚀 Deploy Final - StyleIA

## Opção 1: Deploy Automático via Script
```bash
./deploy.sh
```

## Opção 2: Deploy Manual no Vercel

### Passo 1: Login no Vercel
```bash
vercel login
```

### Passo 2: Deploy
```bash
vercel --prod
```

Responda as perguntas:
- Setup and deploy? **Y**
- Which scope? **Selecione sua conta**
- Link to existing project? **N**
- Project name? **styleia-app**
- Directory? **./**
- Override settings? **N**

### Passo 3: Obter URL
Após o deploy, você receberá uma URL como:
- https://styleia-app.vercel.app
- https://styleia-app-[hash].vercel.app

## 📱 Gerar QR Code para Apresentação

1. Acesse: https://qr-code-generator.com/
2. Cole a URL do seu deploy
3. Personalize:
   - Cor: #F97316 (laranja do app)
   - Logo: Adicione o logo.svg
   - Tamanho: Alta resolução
4. Baixe em PNG ou SVG

## ✅ Checklist Pré-Apresentação

- [ ] App funcionando no Vercel
- [ ] QR Code gerado e testado
- [ ] Slides com QR Code grande
- [ ] Celular carregado para demo
- [ ] Internet móvel funcionando
- [ ] Modo avião desativado

## 🎯 URLs Importantes

- **Produção**: [sua-url].vercel.app
- **GitHub**: github.com/[seu-usuario]/StylistAI
- **QR Generator**: qr-code-generator.com

## 💡 Dicas para o Pitch

1. **Teste o QR Code** antes com diferentes celulares
2. **Tenha backup**: Print screens caso a internet falhe
3. **Demo rápida**: Foque nas 3 features principais
4. **Engaje**: Peça para a plateia testar em tempo real

## 🆘 Troubleshooting

**Erro no deploy?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
vercel --prod
```

**QR Code não funciona?**
- Verifique se a URL está correta
- Use HTTPS, não HTTP
- Teste em modo incógnito

**App lento?**
- Normal no primeiro acesso (cold start)
- Após cache, fica instantâneo

---

**Boa sorte no Startup Weekend! 🎉**