const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sku: { type: String, default: '' },
  codigoBarras: { type: String, default: '' },
  preco: { type: Number, required: true, default: 0 },
  precoCusto: { type: Number, default: 0 },
  quantidade: { type: Number, default: 0 },
  unidade: { type: String, default: 'UN' },
  minimo: { type: Number, default: 5 },
  tipo: { type: String, enum: ['unitario', 'caixa'], default: 'unitario' },
  qtdPorCaixa: { type: Number, default: 1 },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
  fornecedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornecedor' },
  descricao: { type: String, default: '' },
  dataCriacao: { type: Date, default: Date.now }
});

produtoSchema.virtual('id').get(function() {
  return this._id.toString();
});

produtoSchema.set('toJSON', { virtuals: true });
produtoSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Produto', produtoSchema);

