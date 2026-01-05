// Script para cadastrar produtos do fornecedor EVOLIMP
// Margem: Unitário 100%, Caixa 80%

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://megacleandistribuidoraa_db_user:ian04032023@cluster0.en8yzsz.mongodb.net/megaclean?retryWrites=true&w=majority';

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
  dataCriacao: { type: Date, default: Date.now }
});

const Produto = mongoose.model('Produto', produtoSchema);

// Lista de produtos do fornecedor EVOLIMP
// Formato: [nome, custoCaixa, qtdPorCaixa] ou [nome, custoUnitario, 1] para galões
const produtosEvolimp = [
  // Página 1
  ['Água Sanitária 1L', 2.45, 12],
  ['Água Sanitária 2L', 3.69, 6],
  ['Água Sanitária 5L', 8.49, 1],
  ['Álcool em Gel p/ Mãos 5L', 33.90, 1],
  ['Álcool Líq. 46,2% 1L', 5.04, 12],
  ['Álcool Líq. 70% 1L', 7.06, 12],
  ['Álcool Líq. 70% 5L', 29.99, 1],
  ['Álcool Perfumado 2L', 8.49, 6],
  ['Álcool Perfumado 5L', 16.62, 1],
  ['Alvejante s/Cloro 2L', 6.99, 6],
  ['Alvejante Sem Cloro 5L', 13.50, 1],
  ['Amaciante Blue Íris 2L', 5.80, 6],
  ['Amaciante Blue Íris 5L', 13.39, 1],
  ['Amaciante Pink Shy 2L', 5.80, 6],
  ['Bicarbonato de Sódio 500G', 8.49, 12],
  ['Brilho Rápido 1L', 7.56, 12],
  ['Cera para Pisos 1L', 11.66, 12],
  ['Cera para Pisos 5L', 48.99, 1],
  ['Cloro Líquido 2L', 9.19, 6],
  ['Cloro Líquido 5L', 18.05, 1],
  ['Cloro Gel 1L', 4.43, 12],
  ['Cloro Gel 2L', 9.22, 6],
  ['Cloro Gel 5L', 19.99, 1],
  ['Desengordurante 500ML', 3.63, 12],
  ['Desengordurante 1L', 7.05, 12],
  ['Desengordurante 2L', 13.99, 6],
  ['Desengordurante 5L', 26.90, 1],
  ['Desengraxante 1L', 7.06, 12],
  ['Desengraxante 5L', 24.99, 1],
  ['Desinfetante Ametista 2L', 3.99, 6],
  ['Desinfetante Ametista 5L', 9.49, 1],
  ['Desinf. Conc. Ametista 2L', 16.39, 6],
  ['Desinf. Conc. Safira 2L', 16.39, 6],
  ['Desinfetante Esmeralda 2L', 3.99, 6],
  ['Desinfetante Esmeralda 5L', 9.49, 1],
  ['Desinfetante Fluorita 2L', 3.99, 6],
  ['Desinfetante Fluorita 5L', 9.49, 1],
  ['Desinfetante Safira 2L', 3.99, 6],
  ['Desinfetante Safira 5L', 9.49, 1],
  ['Desinfetante Amazonita 2L', 3.99, 6],
  ['Desinfetante Amazonita 5L', 9.49, 1],
  ['Detergente 500ML', 1.74, 24],
  ['Detergente 2L', 7.49, 6],
  // Página 2
  ['Detergente 5L', 14.80, 1],
  ['Força Piso L. Alum. Auto 1L', 7.49, 12],
  ['Força Piso L. Alum. Auto 5L', 22.90, 1],
  ['Lava Canil 2L', 9.20, 6],
  ['Lava Canil 5L', 18.10, 1],
  ['Limpa Alumínio 500mL', 3.85, 12],
  ['Limpa Alumínio 1L', 6.49, 12],
  ['Limpa Alumínio 5L', 18.88, 1],
  ['Limpa Pedra 2L', 11.60, 6],
  ['Limpa Pedra 5L', 22.15, 1],
  ['Limpa Piso 2L', 9.49, 6],
  ['Limpa Piso 5L', 18.49, 1],
  ['Limpa Porcelanato 1L', 14.99, 12],
  ['Limpa Porcelanato 5L', 28.90, 1],
  ['Limpa Vidros 500ML', 3.49, 12],
  ['Limpador com Querosene 2L', 11.90, 6],
  ['Lustra Móveis 500ML', 3.90, 12],
  ['Mandião 1L', 4.50, 12],
  ['Mandião 5L', 20.99, 1],
  ['Multiuso 500ML', 1.69, 12],
  ['Multiuso 2L', 7.90, 6],
  ['Multiuso 5L', 12.50, 1],
  ['Pasta Mecânica', 35.00, 1],
  ['Percarbonato de Sódio 500G', 15.49, 12],
  ['Pinho Gel 2L', 9.90, 6],
  ['Pinho Gel 5L', 18.84, 1],
  ['Pneu Pretinho 1L', 6.66, 12],
  ['Pneu Pretinho 5L', 22.15, 1],
  ['Removedor Lavanda 500ML', 4.49, 12],
  ['Sabão Líquido Coco 2L', 8.50, 6],
  ['Sabão Líquido Coco 5L', 18.49, 1],
  ['Sabão Líquido 2L', 8.50, 6],
  ['Sabão Líquido 5L', 18.49, 1],
  ['Shampoo Auto Brilho 1L', 6.99, 12],
  ['Shampoo Auto Brilho 5L', 22.00, 1],
  ['Soda líquida 1L', 13.99, 12],
  ['Silicone em Gel 250g', 8.55, 12],
  ['Silicone Gel Balde 3,6Kg', 71.49, 1]
];

async function cadastrarProdutos() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');
    
    let countUnitarios = await Produto.countDocuments({ tipo: 'unitario' });
    let countCaixas = await Produto.countDocuments({ tipo: 'caixa' });
    
    const MARGEM_UNITARIO = 1.0; // 100%
    const MARGEM_CAIXA = 0.8;    // 80%
    
    let cadastrados = 0;
    
    for (const [nome, custoUnitario, qtdCaixa] of produtosEvolimp) {
      // ===== CADASTRAR UNITÁRIO =====
      countUnitarios++;
      const skuUnitario = 'UN' + String(countUnitarios).padStart(4, '0');
      const precoVendaUnitario = Number((custoUnitario * (1 + MARGEM_UNITARIO)).toFixed(2));
      
      await Produto.create({
        nome: nome,
        sku: skuUnitario,
        precoCusto: custoUnitario,
        preco: precoVendaUnitario,
        quantidade: 0,
        unidade: 'UN',
        minimo: 5,
        tipo: 'unitario',
        qtdPorCaixa: 1
      });
      cadastrados++;
      
      // ===== CADASTRAR CAIXA (só se qtdCaixa > 1) =====
      if (qtdCaixa > 1) {
        countCaixas++;
        const skuCaixa = 'CX' + String(countCaixas).padStart(4, '0');
        const custoCaixa = custoUnitario * qtdCaixa;
        const precoVendaCaixa = Number((custoCaixa * (1 + MARGEM_CAIXA)).toFixed(2));
        
        await Produto.create({
          nome: `${nome} - Cx c/${qtdCaixa}`,
          sku: skuCaixa,
          precoCusto: custoCaixa,
          preco: precoVendaCaixa,
          quantidade: 0,
          unidade: 'CX',
          minimo: 2,
          tipo: 'caixa',
          qtdPorCaixa: qtdCaixa
        });
        cadastrados++;
      }
      
      console.log(`📦 ${nome} cadastrado`);
    }
    
    console.log('');
    console.log('========================================');
    console.log(`✅ TOTAL CADASTRADO: ${cadastrados} produtos`);
    console.log(`   📄 Unitários: ${await Produto.countDocuments({ tipo: 'unitario' })}`);
    console.log(`   📦 Caixas: ${await Produto.countDocuments({ tipo: 'caixa' })}`);
    console.log('========================================');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('');
    console.log('🔌 Desconectado do MongoDB');
  }
}

cadastrarProdutos();

