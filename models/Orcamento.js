const mongoose = require('mongoose');

const itemOrcamentoSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
  nome: String,
  quantidade: Number,
  preco: Number,
  unidade: String
});

const orcamentoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  items: [itemOrcamentoSchema],
  total: { type: Number, default: 0 },
  desconto: { type: Number, default: 0 }, // Percentual de desconto
  totalComDesconto: { type: Number, default: 0 },
  validade: { type: String }, // Data de validade do orçamento
  status: { 
    type: String, 
    enum: ['pendente', 'aprovado', 'rejeitado', 'convertido', 'expirado'], 
    default: 'pendente' 
  },
  pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }, // Se convertido em pedido
  observacoes: { type: String, default: '' },
  dateISO: { type: String, default: () => new Date().toISOString() },
  dataCriacao: { type: Date, default: Date.now }
});

orcamentoSchema.virtual('id').get(function() {
  return this._id.toString();
});

orcamentoSchema.set('toJSON', { virtuals: true });
orcamentoSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Orcamento', orcamentoSchema);













