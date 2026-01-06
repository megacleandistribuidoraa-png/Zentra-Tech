const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nome: { type: String, required: true },
  role: { type: String, enum: ['admin', 'operador'], default: 'operador' },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  dataCriacao: { type: Date, default: Date.now }
});

usuarioSchema.virtual('id').get(function() {
  return this._id.toString();
});

usuarioSchema.set('toJSON', { virtuals: true });
usuarioSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Usuario', usuarioSchema);













