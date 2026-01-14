# Como Trocar o Logo do MegaClean

## 📋 Instruções

Para substituir o logo em todo o sistema, siga estes passos:

### 1. Prepare sua imagem
- Formato recomendado: **PNG** ou **SVG**
- Tamanho recomendado: **48x56 pixels** (ou proporção similar)
- Nome do arquivo: **logo.png** (ou logo.svg)

### 2. Coloque o arquivo na pasta public
Coloque sua imagem em:
```
public/logo.png
```
ou
```
public/logo.svg
```

### 3. Pronto!
O sistema automaticamente usará sua imagem. Se a imagem não for encontrada, o logo antigo (SVG) será exibido como fallback.

## 📍 Onde o logo aparece:
- ✅ Sidebar do sistema (app.html)
- ✅ Página de login (index.html)
- ✅ Favicon do navegador (icon.svg)

## 🔄 Para trocar o favicon também:
Se quiser trocar o ícone que aparece na aba do navegador, substitua o arquivo:
```
public/icon.svg
```

---

**Nota:** Se você usar um arquivo com nome diferente de `logo.png` ou `logo.svg`, edite os arquivos `app.html` e `index.html` e altere o caminho `/logo.png` para o nome do seu arquivo.
