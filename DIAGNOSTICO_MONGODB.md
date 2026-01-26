# 🔍 DIAGNÓSTICO: Conexão MongoDB

## ✅ Situação Atual:
- ✅ Banco de dados MongoDB existe (em produção/Render)
- ❌ Arquivo `.env` local não tem `MONGODB_URI`
- ⚠️ Sistema local não consegue conectar ao banco

## 🔧 SOLUÇÃO: Adicionar MONGODB_URI no .env local

### Opção 1: Pegar do Render (Recomendado)

1. **Acesse o Render:**
   - Vá em: https://dashboard.render.com
   - Entre no serviço `megaclean-system`
   - Vá em **"Environment"** (menu lateral)

2. **Copie a MONGODB_URI:**
   - Procure pela variável `MONGODB_URI`
   - Clique para ver o valor (pode estar oculto, clique em "Reveal")
   - Copie a string completa

3. **Adicione no .env local:**
   - Abra o arquivo `.env` na raiz do projeto
   - Adicione a linha:
     ```
     MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/megaclean?retryWrites=true&w=majority
     ```
   - Substitua pela string que você copiou do Render

### Opção 2: Pegar do MongoDB Atlas

1. **Acesse MongoDB Atlas:**
   - Vá em: https://cloud.mongodb.com
   - Faça login

2. **Obter String de Conexão:**
   - Clique no seu cluster
   - Clique em **"Connect"**
   - Escolha **"Connect your application"**
   - Copie a string
   - **IMPORTANTE:** Substitua `<password>` pela senha real
   - **IMPORTANTE:** Adicione `/megaclean` antes do `?` (nome do banco)

3. **Adicione no .env:**
   ```
   MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/megaclean?retryWrites=true&w=majority
   ```

## 🧪 Testar Conexão

Após adicionar a `MONGODB_URI` no `.env`, execute:

```bash
node testar-mongodb.js
```

Se aparecer:
- ✅ `CONECTADO COM SUCESSO` = Tudo certo!
- ❌ `ERRO AO CONECTAR` = Verifique a string ou IP liberado

## ⚠️ IMPORTANTE:

- **NÃO** commite o arquivo `.env` no Git (ele já deve estar no `.gitignore`)
- A string contém senha, mantenha segura
- Se usar MongoDB Atlas, verifique se o IP está liberado em "Network Access"
