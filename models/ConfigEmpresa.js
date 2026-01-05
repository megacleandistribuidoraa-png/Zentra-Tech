const mongoose = require('mongoose');

const configEmpresaSchema = new mongoose.Schema({
  // Dados da Empresa
  razaoSocial: { type: String, default: '' },
  nomeFantasia: { type: String, default: '' },
  cnpj: { type: String, default: '' },
  inscricaoEstadual: { type: String, default: '' },
  inscricaoMunicipal: { type: String, default: '' },
  
  // Endereço
  logradouro: { type: String, default: '' },
  numero: { type: String, default: '' },
  complemento: { type: String, default: '' },
  bairro: { type: String, default: '' },
  cidade: { type: String, default: '' },
  uf: { type: String, default: '' },
  cep: { type: String, default: '' },
  
  // Contato
  telefone: { type: String, default: '' },
  email: { type: String, default: '' },
  site: { type: String, default: '' },
  
  // Configurações Fiscais
  regimeTributario: { 
    type: String, 
    enum: ['simples_nacional', 'lucro_presumido', 'lucro_real', 'mei'],
    default: 'simples_nacional'
  },
  crt: { type: Number, default: 1 }, // Código de Regime Tributário
  
  // NF-e
  ambiente: { type: String, enum: ['homologacao', 'producao'], default: 'homologacao' },
  serieNfe: { type: Number, default: 1 },
  proximoNumeroNfe: { type: Number, default: 1 },
  certificadoDigital: { type: String, default: '' }, // Base64 do certificado
  senhaCertificado: { type: String, default: '' },
  
  // Logo
  logo: { type: String, default: '' }, // Base64 da imagem
  
  // Mensagens padrão
  mensagemPadrao: { type: String, default: 'Obrigado pela preferência!' },
  
  dataAtualizacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConfigEmpresa', configEmpresaSchema);
