const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, default: '' },
  telefone: { type: String, default: '' },
  email: { type: String, default: '' },
  endereco: { type: String, default: '' },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
  // Fidelidade
  pontosFidelidade: { type: Number, default: 0 },
  totalCompras: { type: Number, default: 0 },
  limiteCredito: { type: Number, default: 0 },
  observacoes: { type: String, default: '' },
  dataCriacao: { type: Date, default: Date.now }
});

// Virtual para 'id' (compatibilidade com código existente)
clienteSchema.virtual('id').get(function() {
  return this._id.toString();
});

clienteSchema.set('toJSON', { virtuals: true });
clienteSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Cliente', clienteSchema);

