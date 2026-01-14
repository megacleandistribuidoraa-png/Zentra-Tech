const mongoose = require('mongoose');

// IMPORTANT:
// - Nunca deixe credenciais hardcoded no código.
// - Configure via variável de ambiente (ou arquivo .env em DEV).
const MONGODB_URI = process.env.MONGODB_URI || '';

const conectarDB = async () => {
  try {
    if (!MONGODB_URI) {
      console.warn('⚠️  MONGODB_URI não definido. Configure a variável de ambiente MONGODB_URI para conectar ao MongoDB.');
      return false;
    }
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB Atlas!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    return false;
  }
};

module.exports = { conectarDB, MONGODB_URI };













