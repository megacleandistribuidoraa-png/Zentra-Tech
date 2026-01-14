# 🔧 Configuração no Render.com

Este guia é para quem **já tem o sistema no Render** e quer garantir que está tudo configurado corretamente.

## ✅ Checklist de Configuração

### 1. Variáveis de Ambiente no Render

No painel do Render, vá em **"Environment"** e verifique se tem:

```
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/megaclean?retryWrites=true&w=majority
ADMIN_USER=admin
ADMIN_PASS=sua_senha_forte
ADMIN_NAME=Administrador MegaClean
ADMIN_TOKEN=token_aleatorio_forte
NODE_ENV=production
PORT=10000
```

**⚠️ IMPORTANTE:**
- `MONGODB_URI` deve estar completa e correta
- `ADMIN_PASS` e `ADMIN_TOKEN` devem ser fortes e seguros
- `PORT` o Render define automaticamente, mas você pode forçar 10000

### 2. Build e Start Commands

No painel do Render, em **"Settings"** → **"Build & Deploy"**, verifique:

- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 3. Conectar com GitHub (Deploy Automático)

1. No Render, vá em **"Settings"** → **"GitHub"**
2. Certifique-se que está conectado ao repositório correto
3. Marque **"Auto-Deploy"** para que cada `git push` atualize automaticamente

### 4. Verificar Logs

Se algo não estiver funcionando:

1. No Render, vá em **"Logs"**
2. Veja se há erros de conexão com MongoDB
3. Veja se o servidor está iniciando corretamente

---

## 🔄 Como Fazer Deploy de Atualizações

### Método 1: Deploy Automático (Recomendado)

1. **Edite o código localmente**
2. **Commit e push:**
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push origin main
   ```
3. **O Render detecta automaticamente** e faz deploy (2-5 minutos)

### Método 2: Deploy Manual

1. No Render, vá no seu serviço
2. Clique em **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🐛 Problemas Comuns

### Sistema não conecta no MongoDB

**Sintoma:** Erro nos logs: "Erro ao conectar ao MongoDB"

**Solução:**
1. Verifique se `MONGODB_URI` está correta no Render
2. No MongoDB Atlas, vá em **Network Access** e libere o IP do Render (ou use 0.0.0.0/0 temporariamente)

### Sistema "dorme" após inatividade

**Sintoma:** Primeira requisição demora 30-60 segundos

**Causa:** Plano gratuito do Render "dorme" serviços após 15 minutos de inatividade

**Soluções:**
- Aguardar o "wake up" (normal no plano gratuito)
- Ou fazer upgrade para plano pago (não "dorme")

### Deploy falha

**Sintoma:** Build falha no Render

**Solução:**
1. Veja os logs de build no Render
2. Verifique se `package.json` tem o script `start`
3. Verifique se todas as dependências estão corretas

---

## 📝 Próximos Passos

1. ✅ Verificar variáveis de ambiente
2. ✅ Testar login no sistema
3. ✅ Verificar se MongoDB está conectado
4. ✅ Configurar deploy automático (se ainda não tiver)

**Tudo funcionando?** Agora você pode:
- Editar de qualquer lugar
- Fazer `git push` e o sistema atualiza sozinho
- Acessar de qualquer PC pelo navegador

---

## 🆘 Precisa de Ajuda?

Se algo não estiver funcionando:
1. Veja os logs no Render
2. Verifique as variáveis de ambiente
3. Teste a conexão com MongoDB Atlas separadamente
