# 🔧 Variáveis de Ambiente para o Render

## 📍 ONDE ADICIONAR NO RENDER:

### Durante a Criação do Web Service:

1. **Na tela de criação do Web Service**, role até a seção **"Environment Variables"**
2. Você verá campos para adicionar variáveis
3. Clique em **"Add Environment Variable"** para cada uma

### OU Depois de Criar o Serviço:

1. **Após criar o serviço**, vá no serviço `megaclean-system` (ou o nome que você deu)
2. Clique em **"Environment"** no menu lateral
3. Clique em **"Edit"** (botão preto no canto superior direito)
4. Clique em **"Add Environment Variable"** para cada variável

---

## 📋 VARIÁVEIS PARA ADICIONAR:

### 1. MONGODB_URI
```
Key: MONGODB_URI
Value: mongodb+srv://megacleandistribuidoraa_db_user:mega123@cluster0.en8yzsz.mongodb.net/megaclean?appName=Cluster0
```

### 2. ADMIN_USER
```
Key: ADMIN_USER
Value: admin
```

### 3. ADMIN_PASS
```
Key: ADMIN_PASS
Value: admin123
```
⚠️ **IMPORTANTE:** Use uma senha forte em produção! Exemplo: `MinhaSenha@2024!`

### 4. ADMIN_NAME
```
Key: ADMIN_NAME
Value: Administrador MegaClean
```

### 5. ADMIN_TOKEN
```
Key: ADMIN_TOKEN
Value: megaclean-token-2024-seguro
```
⚠️ **IMPORTANTE:** Use um token aleatório forte em produção! Exemplo: gere em https://randomkeygen.com/

### 6. NODE_ENV
```
Key: NODE_ENV
Value: production
```

---

## ✅ CHECKLIST:

- [ ] MONGODB_URI adicionada
- [ ] ADMIN_USER adicionada
- [ ] ADMIN_PASS adicionada (use senha forte!)
- [ ] ADMIN_NAME adicionada
- [ ] ADMIN_TOKEN adicionada (use token forte!)
- [ ] NODE_ENV adicionada

---

## 🔐 SEGURANÇA:

**Para produção, use senhas e tokens fortes:**

- **ADMIN_PASS:** Mínimo 12 caracteres, com letras, números e símbolos
- **ADMIN_TOKEN:** Gere um token aleatório (ex: `a7f3b9c2d4e6f8a1b3c5d7e9f1a3b5c`)

**Gerador de token:** https://randomkeygen.com/

---

## 📝 EXEMPLO VISUAL:

No Render, você verá algo assim:

```
Environment Variables
┌─────────────────────┬─────────────────────────────────────────────┐
│ KEY                 │ VALUE                                        │
├─────────────────────┼─────────────────────────────────────────────┤
│ MONGODB_URI         │ mongodb+srv://...                            │
│ ADMIN_USER          │ admin                                        │
│ ADMIN_PASS          │ •••••••••••• (oculto)                        │
│ ADMIN_NAME          │ Administrador MegaClean                      │
│ ADMIN_TOKEN         │ •••••••••••• (oculto)                        │
│ NODE_ENV            │ production                                    │
└─────────────────────┴─────────────────────────────────────────────┘
```

---

## 🧪 DEPOIS DE ADICIONAR:

1. Clique em **"Save Changes"** (se estiver editando)
2. O Render vai fazer deploy automaticamente
3. Aguarde alguns minutos
4. Verifique os logs para confirmar que conectou ao MongoDB
