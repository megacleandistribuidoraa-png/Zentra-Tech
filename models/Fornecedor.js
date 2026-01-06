const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, default: '' },
  telefone: { type: String, default: '' },
  email: { type: String, default: '' },
  endereco: { type: String, default: '' },
  contato: { type: String, default: '' }, // Nome do contato
  observacoes: { type: String, default: '' },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  dataCriacao: { type: Date, default: Date.now }
});

fornecedorSchema.virtual('id').get(function() {
  return this._id.toString();
});

fornecedorSchema.set('toJSON', { virtuals: true });
fornecedorSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Fornecedor', fornecedorSchema);













