# 🔍 Como Encontrar o Backend no Render

## 📊 Situação Atual:
- ✅ **Frontend encontrado:** `erp-system-frontend` (Static Site)
- ❌ **Backend não visível:** Não aparece na lista

## 🔍 Possíveis Cenários:

### Cenário 1: Backend não foi criado ainda
Se você só tem o frontend, precisa criar o backend:

1. **No Render, clique em "+ New"** (canto superior direito)
2. Escolha **"Web Service"** (não Static Site)
3. Conecte ao mesmo repositório GitHub
4. Configure:
   - **Name:** `megaclean-system` (ou `megaclean-backend`)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** (deixe vazio)

### Cenário 2: Backend está em outro projeto
1. No topo, clique em **"My Workspace"** (canto superior esquerdo)
2. Veja se há outros projetos listados
3. Procure por um projeto que contenha um serviço "Web Service"

### Cenário 3: Backend tem outro nome
Procure na lista por serviços do tipo:
- **Runtime:** `Node` (não "Static")
- **Status:** Pode estar "Deployed", "Building" ou "Failed"

## ✅ O Que Você Precisa:

O backend deve ser um serviço com:
- **Tipo:** Web Service (não Static Site)
- **Runtime:** Node
- **Nome:** Pode ser `megaclean-system`, `megaclean-backend`, `megaclean-api`, etc.

## 🔧 Se o Backend Não Existe:

Você precisa criar o backend no Render. O backend é onde:
- Roda o `server.js`
- Precisa da variável `MONGODB_URI`
- Processa as requisições da API

**Quer que eu te ajude a criar o backend no Render?**
