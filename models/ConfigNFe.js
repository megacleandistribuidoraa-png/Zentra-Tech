const mongoose = require('mongoose');

const configNFeSchema = new mongoose.Schema({
  // Provedor de NF-e
  provedor: { 
    type: String, 
    enum: ['focus_nfe', 'nfe_io', 'enotas', 'manual'],
    default: 'focus_nfe'
  },
  
  // Credenciais API Focus NFe
  focusToken: { type: String, default: '' },
  
  // Credenciais API NFe.io
  nfeioApiKey: { type: String, default: '' },
  nfeioCompanyId: { type: String, default: '' },
  
  // Credenciais API eNotas
  enotasApiKey: { type: String, default: '' },
  enotasEmpresaId: { type: String, default: '' },
  
  // Ambiente
  ambiente: { 
    type: String, 
    enum: ['homologacao', 'producao'], 
    default: 'homologacao' 
  },
  
  // Dados Fiscais da Empresa
  cnpj: { type: String, default: '' },
  inscricaoEstadual: { type: String, default: '' },
  razaoSocial: { type: String, default: '' },
  nomeFantasia: { type: String, default: '' },
  
  // Endereço (obrigatório para NF-e)
  logradouro: { type: String, default: '' },
  numero: { type: String, default: '' },
  complemento: { type: String, default: '' },
  bairro: { type: String, default: '' },
  cidade: { type: String, default: '' },
  uf: { type: String, default: 'SP' },
  cep: { type: String, default: '' },
  codigoMunicipio: { type: String, default: '' }, // Código IBGE
  
  // Configurações de Série e Numeração
  serieNfe: { type: Number, default: 1 },
  proximoNumeroNfe: { type: Number, default: 1 },
  
  // Regime Tributário MEI
  regimeTributario: { type: Number, default: 1 }, // 1 = Simples Nacional
  crt: { type: Number, default: 1 }, // Código de Regime Tributário
  
  // CFOP padrão (venda dentro do estado)
  cfopPadrao: { type: String, default: '5102' }, // 5102 = Venda merc. adq. terceiros
  
  // Certificado Digital (Base64)
  certificadoBase64: { type: String, default: '' },
  senhaCertificado: { type: String, default: '' },
  validadeCertificado: { type: Date },
  
  // Contato
  telefone: { type: String, default: '' },
  email: { type: String, default: '' },
  
  // Status
  configurado: { type: Boolean, default: false },
  ultimoTeste: { type: Date },
  statusTeste: { type: String, default: '' },
  
  dataAtualizacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConfigNFe', configNFeSchema);




