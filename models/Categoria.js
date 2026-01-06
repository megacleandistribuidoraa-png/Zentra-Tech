const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, default: '' },
  cor: { type: String, default: '#0aa04e' },
  icone: { type: String, default: '📦' },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  dataCriacao: { type: Date, default: Date.now }
});

categoriaSchema.virtual('id').get(function() {
  return this._id.toString();
});

categoriaSchema.set('toJSON', { virtuals: true });
categoriaSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Categoria', categoriaSchema);













