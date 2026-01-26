# 🔧 CORRIGIR PROBLEMAS DO FRONTEND

## 🔴 PROBLEMAS IDENTIFICADOS:

1. **Frontend usando `app.html` (com sidebar)** ao invés de `dashboard.html`
2. **Botão "Sair" não aparece** no topbar (porque está usando `app.html`)
3. **Erros 500 nas APIs** - Frontend chamando URL errada do backend
4. **`config.js` não está configurado** com a URL correta do backend

---

## ✅ SOLUÇÕES:

### 1. Configurar API_URL no Frontend (Render)

No serviço `erp-system-frontend` no Render:

1. Vá em **"Environment"**
2. Adicione/edite a variável:
   - **Key:** `API_URL`
   - **Value:** `https://zentra-tech.onrender.com/api`
3. Salve e faça deploy

### 2. Verificar Build do Frontend

O `build-frontend.js` precisa da variável `API_URL` para atualizar o `config.js`.

**No Render, no serviço `erp-system-frontend`:**
- **Build Command:** `npm install && API_URL=${API_URL} npm run build:frontend`

### 3. Forçar uso de `dashboard.html`

O problema é que o sistema está carregando `app.html`. Precisamos garantir que:
- Login redirecione para `/dashboard.html` ✅ (já está correto)
- O frontend não tenha `app.html` no build, OU
- Redirecionar automaticamente de `app.html` para `dashboard.html`

---

## 🚨 AÇÃO IMEDIATA:

### No Render - Frontend (`erp-system-frontend`):

1. **Environment Variables:**
   ```
   API_URL=https://zentra-tech.onrender.com/api
   ```

2. **Build Command:**
   ```
   npm install && API_URL=${API_URL} npm run build:frontend
   ```

3. **Static Publish Path:**
   ```
   dist
   ```

---

## 🔍 Verificar Erros 500:

Os erros 500 podem ser:
1. **CORS** - Backend não está permitindo requisições do frontend
2. **URL errada** - Frontend chamando URL antiga
3. **Autenticação** - Token não está sendo enviado corretamente

**Verificar logs do backend** no Render para ver os erros específicos.
