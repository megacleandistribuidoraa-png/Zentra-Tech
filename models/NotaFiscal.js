const mongoose = require('mongoose');

const notaFiscalSchema = new mongoose.Schema({
  // Referência ao Pedido
  pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
  
  // Dados da NF-e
  numero: { type: Number, required: true },
  serie: { type: Number, default: 1 },
  chaveAcesso: { type: String, default: '' },
  protocolo: { type: String, default: '' },
  
  // Status
  status: { 
    type: String, 
    enum: ['pendente', 'processando', 'autorizada', 'cancelada', 'rejeitada', 'erro'],
    default: 'pendente'
  },
  
  // Dados do Cliente
  clienteNome: { type: String },
  clienteCpfCnpj: { type: String },
  
  // Valores
  valorTotal: { type: Number, default: 0 },
  valorProdutos: { type: Number, default: 0 },
  
  // Datas
  dataEmissao: { type: Date, default: Date.now },
  dataAutorizacao: { type: Date },
  dataCancelamento: { type: Date },
  
  // XMLs
  xmlEnvio: { type: String, default: '' },
  xmlRetorno: { type: String, default: '' },
  xmlNfe: { type: String, default: '' },
  
  // PDF (DANFE)
  pdfBase64: { type: String, default: '' },
  urlPdf: { type: String, default: '' },
  
  // Erros
  mensagemErro: { type: String, default: '' },
  codigoErro: { type: String, default: '' },
  
  // Provedor usado
  provedor: { type: String, default: 'focus_nfe' },
  referenciaExterna: { type: String, default: '' }, // ID na API externa
  
  // Ambiente
  ambiente: { type: String, enum: ['homologacao', 'producao'], default: 'homologacao' }
});

notaFiscalSchema.virtual('id').get(function() {
  return this._id.toString();
});

notaFiscalSchema.set('toJSON', { virtuals: true });
notaFiscalSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('NotaFiscal', notaFiscalSchema);




