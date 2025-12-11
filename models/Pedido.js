const mongoose = require('mongoose');

const itemPedidoSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
  nome: String,
  quantidade: Number,
  preco: Number,
  unidade: String
});

const pedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  items: [itemPedidoSchema],
  total: { type: Number, default: 0 },
  retroativo: { type: Boolean, default: false },
  dateISO: { type: String, default: () => new Date().toISOString() },
  dataCriacao: { type: Date, default: Date.now },
  // Informações de Pagamento
  formaPagamento: { 
    type: String, 
    enum: ['dinheiro', 'pix', 'cartao_credito', 'cartao_debito', 'boleto', 'a_prazo'], 
    default: 'dinheiro' 
  },
  statusPagamento: { 
    type: String, 
    enum: ['pendente', 'pago', 'parcial', 'cancelado'], 
    default: 'pendente' 
  },
  valorPago: { type: Number, default: 0 },
  dataVencimento: { type: String },
  dataPagamento: { type: String },
  parcelas: { type: Number, default: 1 },
  observacaoPagamento: { type: String, default: '' }
});

pedidoSchema.virtual('id').get(function() {
  return this._id.toString();
});

pedidoSchema.set('toJSON', { virtuals: true });
pedidoSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Pedido', pedidoSchema);

