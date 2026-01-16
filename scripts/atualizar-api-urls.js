// ============================================
// SCRIPT PARA ATUALIZAR URLs DA API
// ============================================
// Atualiza todas as chamadas fetch('/api/...') para usar window.API_BASE_URL

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../public/js/pages');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Padrão: fetch('/api/...')
  // Substituir por: fetch(`${window.API_BASE_URL || '/api'}/...`)
  const patterns = [
    {
      // fetch('/api/endpoint')
      regex: /fetch\(['"]\/api\/([^'"]+)['"]/g,
      replacement: (match, endpoint) => {
        return `fetch(\`\${window.API_BASE_URL || '/api'}/${endpoint}\``;
      }
    },
    {
      // fetch('/api')
      regex: /fetch\(['"]\/api['"]/g,
      replacement: () => {
        return `fetch(\`\${window.API_BASE_URL || '/api'}\``;
      }
    }
  ];
  
  patterns.forEach(({ regex, replacement }) => {
    const newContent = content.replace(regex, (match, ...args) => {
      // Verificar se já usa API_BASE_URL
      const before = content.substring(0, content.indexOf(match));
      if (before.includes('API_BASE_URL') || before.includes('getApiUrl') || before.includes('apiBase')) {
        return match; // Já está usando configuração
      }
      modified = true;
      return replacement(match, ...args);
    });
    content = newContent;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Atualizado: ${path.basename(filePath)}`);
    return true;
  }
  
  return false;
}

// Processar todos os arquivos JS na pasta pages
const files = fs.readdirSync(PAGES_DIR);
let updated = 0;

files.forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(PAGES_DIR, file);
    if (updateFile(filePath)) {
      updated++;
    }
  }
});

console.log(`\n✅ ${updated} arquivo(s) atualizado(s)`);
console.log('💡 Faça commit e push para aplicar as mudanças');
