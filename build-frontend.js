// ============================================
// SCRIPT DE BUILD DO FRONTEND - MEGACLEAN
// ============================================
// Este script prepara o frontend para deploy como Static Site
// Copia os arquivos e substitui a URL da API

const fs = require('fs');
const path = require('path');

// Configurações
const API_URL = process.env.API_URL || process.env.VITE_API_URL || '/api';
const SOURCE_DIR = path.join(__dirname, 'public');
const BUILD_DIR = path.join(__dirname, 'dist');

console.log('🚀 Iniciando build do frontend...');
console.log(`📡 URL da API: ${API_URL}`);

// Limpar diretório de build
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true, force: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });

// Função para copiar arquivos recursivamente
function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copiar todos os arquivos
console.log('📁 Copiando arquivos...');
copyRecursive(SOURCE_DIR, BUILD_DIR);

// REMOVER app.html do build (não deve ser usado)
const appHtmlPath = path.join(BUILD_DIR, 'app.html');
if (fs.existsSync(appHtmlPath)) {
  fs.unlinkSync(appHtmlPath);
  console.log('✅ app.html removido do build (usando apenas dashboard.html)');
}

// Substituir URL da API no config.js
const configPath = path.join(BUILD_DIR, 'js', 'config.js');
if (fs.existsSync(configPath)) {
  let configContent = fs.readFileSync(configPath, 'utf8');
  configContent = configContent.replace(
    /window\.API_BASE_URL = window\.API_BASE_URL \|\| '\/api';/,
    `window.API_BASE_URL = '${API_URL}';`
  );
  fs.writeFileSync(configPath, configContent);
  console.log('✅ Configuração da API atualizada');
}

// NOTA: Não modificamos arquivos JS automaticamente para evitar quebrar código
// Os arquivos JS usam caminhos relativos '/api' que funcionam quando servidos
// do mesmo domínio, ou podem usar window.API_BASE_URL se necessário
// Apenas o config.js é modificado para definir window.API_BASE_URL

// Substituir URLs relativas em arquivos HTML (scripts inline)
console.log('🔍 Atualizando referências em arquivos HTML...');
const htmlFiles = [];
function findHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}
findHtmlFiles(BUILD_DIR);

// Substituir referências inline de /api em scripts HTML
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Substituir fetch('/api por fetch usando window.API_BASE_URL
  // Apenas dentro de tags <script>
  content = content.replace(
    /(<script[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, openTag, scriptContent, closeTag) => {
      // Não processar se já tem type="module" ou src (script externo)
      if (openTag.includes('src=') || openTag.includes('type="module"')) {
        return match;
      }
      
      let newContent = scriptContent;
      // Substituir fetch('/api/...')
      newContent = newContent.replace(
        /fetch\(['"]\/api\//g,
        (m) => {
          const before = newContent.substring(0, newContent.indexOf(m));
          if (before.includes('API_BASE_URL') || before.includes('getApiUrl')) {
            return m;
          }
          return `fetch(\`\${window.API_BASE_URL || '/api'}/\``;
        }
      );
      
      newContent = newContent.replace(
        /fetch\(['"]\/api['"]/g,
        (m) => {
          const before = newContent.substring(0, newContent.indexOf(m));
          if (before.includes('API_BASE_URL') || before.includes('getApiUrl')) {
            return m;
          }
          return `fetch(\`\${window.API_BASE_URL || '/api'}\``;
        }
      );
      
      return openTag + newContent + closeTag;
    }
  );
  
  fs.writeFileSync(file, content);
});

console.log(`✅ Build concluído! Arquivos em: ${BUILD_DIR}`);
console.log(`📦 Pronto para deploy no Render como Static Site`);
console.log(`\n💡 Para testar localmente:`);
console.log(`   cd dist && npx serve .`);
console.log(`\n💡 Para deploy no Render:`);
console.log(`   1. Configure a variável de ambiente API_URL`);
console.log(`   2. Aponte o Static Site para a pasta 'dist'`);
