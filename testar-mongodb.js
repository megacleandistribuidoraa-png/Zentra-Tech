// Script para testar conexão com MongoDB
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || '';

console.log('🔍 DIAGNÓSTICO DE CONEXÃO MONGODB\n');
console.log('=' .repeat(50));

// 1. Verificar se MONGODB_URI existe
console.log('\n1️⃣ Verificando variável MONGODB_URI...');
if (!MONGODB_URI) {
  console.log('❌ MONGODB_URI não está definida!');
  console.log('   Configure no arquivo .env ou variáveis de ambiente');
  process.exit(1);
} else {
  // Ocultar senha na exibição
  const uriOculta = MONGODB_URI.replace(/:[^:@]+@/, ':****@');
  console.log('✅ MONGODB_URI encontrada:', uriOculta);
}

// 2. Tentar conectar
console.log('\n2️⃣ Tentando conectar ao MongoDB...');
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ CONECTADO COM SUCESSO ao MongoDB!');
  console.log('   Database:', mongoose.connection.db.databaseName);
  console.log('   Host:', mongoose.connection.host);
  console.log('   Port:', mongoose.connection.port || 'padrão');
  console.log('   Estado:', mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado');
  
  // Listar coleções
  mongoose.connection.db.listCollections().toArray()
    .then(collections => {
      console.log('\n3️⃣ Coleções encontradas:');
      if (collections.length === 0) {
        console.log('   ⚠️  Nenhuma coleção encontrada (banco vazio)');
      } else {
        collections.forEach(col => {
          console.log(`   ✅ ${col.name}`);
        });
      }
      
      mongoose.connection.close();
      console.log('\n✅ Teste concluído com sucesso!');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Erro ao listar coleções:', err.message);
      mongoose.connection.close();
      process.exit(1);
    });
})
.catch((error) => {
  console.error('❌ ERRO AO CONECTAR:', error.message);
  
  if (error.message.includes('authentication failed')) {
    console.error('\n💡 Possíveis causas:');
    console.error('   - Usuário ou senha incorretos na MONGODB_URI');
    console.error('   - Usuário não tem permissões no banco');
  } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
    console.error('\n💡 Possíveis causas:');
    console.error('   - URL do MongoDB incorreta');
    console.error('   - Problema de rede/DNS');
  } else if (error.message.includes('timeout')) {
    console.error('\n💡 Possíveis causas:');
    console.error('   - IP não está liberado no MongoDB Atlas');
    console.error('   - Firewall bloqueando conexão');
    console.error('   - Problema de rede');
  }
  
  process.exit(1);
});
