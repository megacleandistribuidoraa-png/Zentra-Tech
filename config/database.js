const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://megacleandistribuidoraa_db_user:ian04032023@cluster0.en8yzsz.mongodb.net/megaclean?retryWrites=true&w=majority';

const conectarDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB Atlas!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    return false;
  }
};

module.exports = { conectarDB, MONGODB_URI };








