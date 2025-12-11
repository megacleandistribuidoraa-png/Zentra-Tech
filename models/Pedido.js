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
  dataCriacao: { type: Date, default: Date.now }
});

pedidoSchema.virtual('id').get(function() {
  return this._id.toString();
});

pedidoSchema.set('toJSON', { virtuals: true });
pedidoSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Pedido', pedidoSchema);

