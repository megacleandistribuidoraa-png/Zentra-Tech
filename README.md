# 🚀 MegaClean System

Sistema de gestão completo (ERP) para distribuidoras, desenvolvido com **Node.js + Express + MongoDB**.

## ✨ Características

- 📦 **Gestão de Produtos e Estoque**
- 👥 **Cadastro de Clientes e Fornecedores**
- 🛒 **Pedidos e Orçamentos**
- 📄 **Notas Fiscais**
- 📊 **Dashboard com Relatórios**
- 🔐 **Sistema de Usuários e Permissões**
- 📱 **Interface Moderna (SPA)**

---

## 🎯 Deploy em Nuvem (Recomendado)

**Para ter o sistema totalmente em nuvem e poder modificar de qualquer lugar:**

👉 **[Leia o guia completo de deploy aqui →](DEPLOY.md)**

**Resumo rápido:**
1. Coloque o código no **GitHub**
2. Hospede no **Render.com** ou **Railway.app** (gratuito)
3. Configure **MongoDB Atlas** (gratuito)
4. Pronto! Sistema acessível de qualquer lugar 🌐

---

## 💻 Desenvolvimento Local

### Requisitos
- Node.js (LTS recomendado)
- MongoDB Atlas ou MongoDB local

### Instalação
```bash
# Instalar dependências
npm install

# Criar arquivo .env (copie de env.example)
cp env.example .env

# Editar .env e preencher:
# - MONGODB_URI (string de conexão do MongoDB)
# - ADMIN_USER, ADMIN_PASS, ADMIN_TOKEN
```

### Rodar
```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

### Acesso
- Login: `http://localhost:3000/`
- App: `http://localhost:3000/app.html`

---

## 📁 Estrutura do Projeto

```
megaclean-system/
├── config/          # Configurações (banco de dados)
├── models/          # Modelos MongoDB (Mongoose)
├── routes/          # Rotas da API
├── public/          # Frontend (HTML/CSS/JS)
│   ├── app.html     # Aplicação SPA principal
│   ├── js/          # JavaScript do frontend
│   └── css/         # Estilos
├── scripts/         # Scripts utilitários
├── server.js        # Servidor Express principal
└── package.json     # Dependências e scripts
```

---

## 🔒 Segurança

- ✅ Credenciais via variáveis de ambiente (`.env`)
- ✅ `.env` está no `.gitignore` (não vai para o Git)
- ✅ Autenticação via tokens
- ✅ Validação de dados no backend

**⚠️ IMPORTANTE:** Nunca commite credenciais no código!

---

## 📚 Documentação Adicional

- **[Guia de Deploy em Nuvem](DEPLOY.md)** - Como colocar na nuvem
- **[Diferença entre Sistemas](DIFERENCA_SISTEMAS.md)** - SPA vs HTML tradicional

---

## 🆘 Suporte

Se tiver dúvidas sobre deploy ou configuração, consulte o [DEPLOY.md](DEPLOY.md) ou abra uma issue.

