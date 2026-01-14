# 🔄 Como Atualizar o Sistema no Render

Seu sistema está desatualizado no Render? Siga este guia para atualizar!

---

## 📋 Pré-requisitos

Você precisa ter o **Git instalado** no seu PC. Se não tiver:

### Instalar Git (Windows)

1. Baixe: https://git-scm.com/download/win
2. Instale (só clicar "Next" em tudo)
3. Reinicie o terminal/PowerShell

---

## 🚀 Passo a Passo para Atualizar

### Opção 1: Se o Código JÁ Está no GitHub (Recomendado)

#### 1.1. Verificar se tem Git instalado
Abra o PowerShell ou CMD e digite:
```bash
git --version
```

Se aparecer um número de versão = ✅ Git instalado!
Se der erro = Instale o Git primeiro (link acima)

#### 1.2. Ir para a pasta do projeto
```bash
cd C:\Users\t_stefany.nogueira\Documents\mega\megaclean-system
```

#### 1.3. Verificar mudanças
```bash
git status
```

Isso mostra quais arquivos foram modificados.

#### 1.4. Adicionar todas as mudanças
```bash
git add .
```

#### 1.5. Fazer commit (salvar as mudanças)
```bash
git commit -m "Atualização do sistema - ajustes e melhorias"
```

#### 1.6. Enviar para o GitHub
```bash
git push origin main
```

**Se pedir usuário/senha:**
- Use seu **token do GitHub** (não a senha normal)
- Como criar token: https://github.com/settings/tokens

#### 1.7. Render Detecta Automaticamente! 🎉
- O Render detecta o push no GitHub
- Faz deploy automático (2-5 minutos)
- Você verá o status mudar: "Building" → "Deployed"

---

### Opção 2: Se o Código NÃO Está no GitHub Ainda

#### 2.1. Criar repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `megaclean-system`
3. **NÃO** marque "Initialize with README"
4. Clique em "Create repository"

#### 2.2. Conectar o projeto local ao GitHub

No PowerShell, dentro da pasta do projeto:

```bash
# Inicializar Git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit - Sistema MegaClean"

# Conectar ao GitHub (substitua SEU-USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU-USUARIO/megaclean-system.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

#### 2.3. Conectar o Render ao GitHub
1. No Render, vá no seu serviço `megaclean-system`
2. Vá em **"Settings"** → **"GitHub"**
3. Selecione o repositório `megaclean-system`
4. Marque **"Auto-Deploy"**
5. Pronto! Agora cada push atualiza automaticamente

---

## 🔍 Verificar se Atualizou

### No Render:
1. Vá no serviço `megaclean-system`
2. Veja a aba **"Events"** ou **"Logs"**
3. Você verá um novo deploy aparecendo

### No Sistema:
1. Acesse a URL do sistema
2. Faça um hard refresh: **Ctrl + F5** (limpa cache)
3. Veja se as mudanças apareceram

---

## ⚡ Atualização Manual (Se Auto-Deploy Não Funcionar)

1. No Render, vá no serviço `megaclean-system`
2. Clique em **"Manual Deploy"** (no topo)
3. Escolha **"Deploy latest commit"**
4. Aguarde alguns minutos

---

## 🐛 Problemas Comuns

### Erro: "git não é reconhecido"
**Solução:** Instale o Git: https://git-scm.com/download/win

### Erro: "fatal: not a git repository"
**Solução:** Você precisa fazer `git init` primeiro (veja Opção 2)

### Erro: "Permission denied" ao fazer push
**Solução:** 
1. Use token do GitHub (não senha)
2. Ou configure SSH keys

### Render não detecta mudanças
**Solução:**
1. Verifique se o repositório está conectado no Render
2. Veja se "Auto-Deploy" está ativado
3. Faça deploy manual se necessário

---

## 📝 Checklist Rápido

- [ ] Git instalado no PC
- [ ] Código no GitHub
- [ ] Render conectado ao GitHub
- [ ] Auto-Deploy ativado
- [ ] Fiz `git add .`
- [ ] Fiz `git commit -m "mensagem"`
- [ ] Fiz `git push origin main`
- [ ] Render mostrou "Building"
- [ ] Render mostrou "Deployed"
- [ ] Sistema atualizado funcionando!

---

## 💡 Dica: Comandos Rápidos

Sempre que fizer mudanças, use estes 3 comandos:

```bash
git add .
git commit -m "Descrição da mudança"
git push origin main
```

E o Render atualiza automaticamente! 🚀

---

**Precisa de ajuda com algum passo específico? Me diga onde está travando!**
