# 🚀 Passo a Passo - Atualizar Sistema no Render

## ⚠️ IMPORTANTE: Reiniciar o PowerShell

O Git foi instalado, mas o PowerShell precisa ser **reiniciado** para reconhecê-lo.

### 1️⃣ Fechar e Reabrir o PowerShell

1. **Feche** o PowerShell atual completamente
2. **Abra um NOVO PowerShell** (clique com botão direito → "Executar como administrador" ou só abra normalmente)
3. **Teste se o Git funciona:**
   ```bash
   git --version
   ```
   
   Se aparecer algo como `git version 2.52.0` = ✅ Funcionando!
   
   Se ainda der erro = Veja "Solução Alternativa" abaixo

---

## 📍 Passo 2: Ir para a Pasta do Projeto

No PowerShell, digite:

```bash
cd C:\Users\t_stefany.nogueira\Documents\mega\megaclean-system
```

Pressione Enter.

---

## 🔍 Passo 3: Verificar se Já Tem Git Configurado

Digite:

```bash
git status
```

### Se aparecer algo como "On branch main" ou "On branch master":
✅ **Já tem Git configurado!** Pule para o **Passo 5**.

### Se aparecer "fatal: not a git repository":
⚠️ **Ainda não tem Git configurado.** Vá para o **Passo 4**.

---

## 🔧 Passo 4: Configurar Git pela Primeira Vez

### 4.1. Inicializar Git
```bash
git init
```

### 4.2. Configurar seu nome e email (substitua pelos seus dados)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

### 4.3. Adicionar todos os arquivos
```bash
git add .
```

### 4.4. Primeiro commit
```bash
git commit -m "Initial commit - Sistema MegaClean"
```

### 4.5. Conectar ao GitHub

**IMPORTANTE:** Você precisa ter um repositório no GitHub primeiro!

1. Acesse: https://github.com/new
2. Nome do repositório: `megaclean-system`
3. **NÃO** marque "Initialize with README"
4. Clique em "Create repository"
5. Copie a URL que aparece (ex: `https://github.com/SEU-USUARIO/megaclean-system.git`)

Depois, no PowerShell:

```bash
git remote add origin https://github.com/SEU-USUARIO/megaclean-system.git
git branch -M main
git push -u origin main
```

**Se pedir usuário/senha:**
- Use seu **token do GitHub** (não a senha normal)
- Como criar token: https://github.com/settings/tokens
- Tipo: "Personal access token" → "classic" → Marque "repo"
- Copie o token e use como senha

---

## 🚀 Passo 5: Atualizar o Sistema (Se Já Tem Git)

Se você já tinha Git configurado, use estes 3 comandos:

```bash
git add .
git commit -m "Atualização do sistema - $(Get-Date -Format 'yyyy-MM-dd')"
git push origin main
```

---

## ✅ Passo 6: Verificar no Render

1. Acesse: https://dashboard.render.com
2. Vá no serviço `megaclean-system`
3. Você verá o status mudar:
   - "Building" (fazendo deploy)
   - "Deployed" (atualizado!) ✅

Aguarde 2-5 minutos.

---

## 🆘 Solução Alternativa: Se Git Ainda Não Funcionar

### Opção A: Reiniciar o Computador
Às vezes precisa reiniciar o PC para o PATH ser atualizado.

### Opção B: Usar Git Bash
1. Procure "Git Bash" no menu Iniciar
2. Abra o Git Bash
3. Use os mesmos comandos (mas sem o `cd`, use `cd /c/Users/t_stefany.nogueira/Documents/mega/megaclean-system`)

### Opção C: Verificar Instalação
1. Abra "Este Computador"
2. Vá em: `C:\Program Files\Git\bin`
3. Se a pasta existir = Git instalado
4. O problema é só o PATH não atualizado

---

## 📝 Resumo dos Comandos (Copiar e Colar)

### Se JÁ tem Git configurado:
```bash
cd C:\Users\t_stefany.nogueira\Documents\mega\megaclean-system
git add .
git commit -m "Atualização do sistema"
git push origin main
```

### Se NÃO tem Git configurado ainda:
```bash
cd C:\Users\t_stefany.nogueira\Documents\mega\megaclean-system
git init
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
git add .
git commit -m "Initial commit - Sistema MegaClean"
git remote add origin https://github.com/SEU-USUARIO/megaclean-system.git
git branch -M main
git push -u origin main
```

---

**Agora: Feche e reabra o PowerShell, depois me diga o que aconteceu quando você digitou `git --version`!**
