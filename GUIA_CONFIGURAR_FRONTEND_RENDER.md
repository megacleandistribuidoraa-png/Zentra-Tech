# 📋 GUIA PASSO A PASSO - Configurar Frontend no Render

## 🎯 OBJETIVO:
Configurar o serviço `erp-system-frontend` para usar o backend `zentra-tech.onrender.com`

---

## 📍 PASSO 1: Acessar o Frontend no Render

1. Acesse: **https://dashboard.render.com**
2. Faça login
3. Clique no serviço **`erp-system-frontend`** (Static Site)

---

## 📍 PASSO 2: Configurar Environment Variables

1. No menu lateral esquerdo, clique em **"Environment"**
2. Você verá a seção **"Environment Variables"**
3. Clique no botão **"Edit"** (canto superior direito, botão preto)
4. Procure pela variável `API_URL`
   - **Se NÃO existir:** Clique em **"+ Add Environment Variable"**
   - **Se já existir:** Clique nela para editar

5. Configure:
   - **Key:** `API_URL`
   - **Value:** `https://zentra-tech.onrender.com/api`
   
6. Clique em **"Save Changes"** (se estiver editando)
   - Ou clique em **"Add"** (se estiver criando nova)

---

## 📍 PASSO 3: Configurar Build Command

1. No menu lateral, clique em **"Settings"**
2. Role até a seção **"Build & Deploy"**
3. Procure por **"Build Command"**
4. Altere para:
   ```
   npm install && API_URL=${API_URL} npm run build:frontend
   ```
5. Verifique se **"Static Publish Path"** está como: `dist`
6. Clique em **"Save Changes"** (se aparecer)

---

## 📍 PASSO 4: Fazer Deploy

1. No topo da página, clique em **"Manual Deploy"** (botão preto com dropdown)
2. Escolha **"Deploy latest commit"**
3. Aguarde o deploy (2-5 minutos)
4. Quando aparecer **"Live"**, está pronto!

---

## ✅ VERIFICAÇÃO:

### 1. Verificar se API_URL está configurada:
- Vá em **"Environment"**
- Deve aparecer: `API_URL` = `https://zentra-tech.onrender.com/api`

### 2. Testar o sistema:
- Acesse: `https://erp-system-frontend-st0x.onrender.com`
- Faça login: `admin` / `admin123`
- Verifique:
  - ✅ Não tem sidebar
  - ✅ Botão "Sair" no topbar
  - ✅ Páginas carregam sem erros 500

---

## 🆘 SE DER ERRO:

### Erro no Build:
- Verifique se o Build Command está correto
- Veja os logs de build no Render

### Erro 500 ainda aparece:
- Verifique se `API_URL` está exatamente: `https://zentra-tech.onrender.com/api`
- Verifique logs do backend (`zentra-tech`) para ver erros

### Sidebar ainda aparece:
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Ou teste em aba anônima

---

## 📝 RESUMO RÁPIDO:

1. **Environment** → Adicionar `API_URL=https://zentra-tech.onrender.com/api`
2. **Settings** → Build Command: `npm install && API_URL=${API_URL} npm run build:frontend`
3. **Manual Deploy** → Deploy latest commit
4. **Aguardar** → 2-5 minutos
5. **Testar** → Acessar frontend e fazer login

---

**Siga esses passos e me avise quando terminar! 🚀**
