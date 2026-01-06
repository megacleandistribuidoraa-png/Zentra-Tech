const mongoose = require('mongoose');

const itemSolicitacaoSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
  nome: String,
  quantidade: Number,
  preco: Number
});

const solicitacaoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  items: [itemSolicitacaoSchema],
  total: { type: Number, default: 0 },
  dataDesejada: { type: String, required: true },
  motivo: { type: String, required: true },
  status: { type: String, enum: ['pendente', 'aprovado', 'rejeitado'], default: 'pendente' },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  motivoRejeicao: { type: String, default: '' },
  dataCriacao: { type: Date, default: Date.now }
});

solicitacaoSchema.virtual('id').get(function() {
  return this._id.toString();
});

solicitacaoSchema.set('toJSON', { virtuals: true });
solicitacaoSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Solicitacao', solicitacaoSchema);













