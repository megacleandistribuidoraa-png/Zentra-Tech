// server.js - Sistema MegaClean completo com MongoDB
const express = require("express");
const cors = require("cors");
const path = require('path');
require('dotenv').config();

// Importar configuração do banco
const { conectarDB } = require('./config/database');

// Importar modelos
const Cliente = require('./models/Cliente');
const Produto = require('./models/Produto');
const Pedido = require('./models/Pedido');
const Orcamento = require('./models/Orcamento');
const NotaFiscal = require('./models/NotaFiscal');
const Fornecedor = require('./models/Fornecedor');
const Categoria = require('./models/Categoria');
const Solicitacao = require('./models/Solicitacao');
const ConfigEmpresa = require('./models/ConfigEmpresa');
const ConfigNFe = require('./models/ConfigNFe');
const Usuario = require('./models/Usuario');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ============================================
const verificarToken = async (req, res, next) => {
  const token = req.header('x-auth-token') || req.query.token || '';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-token';
  
  if (token === ADMIN_TOKEN) {
    return next();
  }
  
  // Verificar se é um usuário válido
  try {
    const usuario = await Usuario.findOne({ username: token.split(':')[0] });
    if (usuario && usuario.status === 'ativo') {
      req.usuario = usuario;
      return next();
    }
  } catch (e) {}
  
  return res.status(401).json({ error: 'Token inválido' });
};

// ============================================
// ROTAS DE LOGIN / ADMIN
// ============================================
app.post('/api/login', async (req, res) => {
  const body = req.body || {};
  const username = (body.username || body.usuario || '').toString().trim();
  const password = (body.password || body.senha || '').toString().trim();

  if (!username || !password) {
    return res.status(400).json({ error: 'username/usuario e password/senha são obrigatórios' });
  }

  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
  const ADMIN_NAME = process.env.ADMIN_NAME || 'Administrador MegaClean';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-token';

  // Login admin padrão
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ token: ADMIN_TOKEN, username: ADMIN_USER, name: ADMIN_NAME });
  }

  // Login com usuários do banco
  try {
    const usuario = await Usuario.findOne({ username, status: 'ativo' });
    if (usuario && usuario.password === password) {
      return res.json({ 
        token: `${usuario.username}:${usuario._id}`, 
        username: usuario.username, 
        name: usuario.nome 
      });
    }
  } catch (e) {
    console.error('Erro ao buscar usuário:', e);
  }

  return res.status(401).json({ error: 'Credenciais inválidas' });
});

app.get('/api/admin/me', verificarToken, async (req, res) => {
  const token = req.header('x-auth-token') || req.query.token || '';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-token';
  
  if (token === ADMIN_TOKEN) {
    return res.json({ 
      username: process.env.ADMIN_USER || 'admin', 
      name: process.env.ADMIN_NAME || 'Administrador MegaClean' 
    });
  }
  
  if (req.usuario) {
    return res.json({ username: req.usuario.username, name: req.usuario.nome });
  }
  
  return res.status(401).json({ error: 'Token inválido' });
});

app.get('/api/admin/pages', (req, res) => {
  return res.json({
    pages: [
      { id: 'dashboard', title: 'Dashboard', url: '/dashboard.html' },
      { id: 'clientes', title: 'Clientes', url: '/clientes.html' },
      { id: 'produtos', title: 'Produtos', url: '/produtos.html' },
      { id: 'pedidos', title: 'Pedidos', url: '/pedidos.html' },
      { id: 'orcamentos', title: 'Orçamentos', url: '/orcamentos.html' },
      { id: 'estoque', title: 'Estoque', url: '/estoque.html' },
      { id: 'fornecedores', title: 'Fornecedores', url: '/fornecedores.html' },
      { id: 'categorias', title: 'Categorias', url: '/categorias.html' },
      { id: 'solicitacoes', title: 'Solicitações', url: '/solicitacoes.html' },
      { id: 'notas-fiscais', title: 'Notas Fiscais', url: '/notas-fiscais.html' },
      { id: 'contas', title: 'Contas a Receber', url: '/contas.html' },
      { id: 'relatorio', title: 'Relatórios', url: '/relatorio.html' },
      { id: 'config', title: 'Configurações', url: '/config.html' },
      { id: 'config-empresa', title: 'Config. Empresa', url: '/config-empresa.html' },
      { id: 'config-nfe', title: 'Config. NF-e', url: '/config-nfe.html' },
      { id: 'usuarios', title: 'Usuários', url: '/usuarios.html' }
    ]
  });
});

// ============================================
// ROTAS DE CLIENTES
// ============================================
app.get("/api/clientes", async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ dataCriacao: -1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/clientes", async (req, res) => {
  try {
    const novo = new Cliente(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE PRODUTOS
// ============================================
app.get("/api/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find().populate('categoriaId fornecedorId').sort({ dataCriacao: -1 });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id).populate('categoriaId fornecedorId');
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/produtos", async (req, res) => {
  try {
    const novo = new Produto(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/produtos/:id/ajustar", async (req, res) => {
  try {
    const { tipo, quantidade } = req.body;
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

    if (tipo === "entrada") produto.quantidade += Number(quantidade);
    if (tipo === "saida") produto.quantidade -= Number(quantidade);
    if (produto.quantidade < 0) produto.quantidade = 0;

    await produto.save();
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE PEDIDOS
// ============================================
app.get("/api/pedidos", async (req, res) => {
  try {
    const query = {};
    if (req.query.clienteId) query.clienteId = req.query.clienteId;
    
    const pedidos = await Pedido.find(query)
      .populate('clienteId')
      .populate('items.produtoId')
      .sort({ dataCriacao: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/pedidos/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('clienteId')
      .populate('items.produtoId');
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/pedidos", async (req, res) => {
  try {
    const { clienteId, items } = req.body;
    if (!clienteId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "clienteId e items são obrigatórios" });
    }

    // Validar e calcular total; verificar estoque
    let total = 0;
    for (const it of items) {
      const prod = await Produto.findById(it.produtoId);
      if (!prod) return res.status(400).json({ error: `Produto ${it.produtoId} não encontrado` });
      const q = Number(it.quantidade);
      if (q <= 0) return res.status(400).json({ error: 'Quantidade inválida' });
      if (prod.quantidade < q) return res.status(400).json({ error: `Estoque insuficiente para ${prod.nome}` });
      total += (Number(prod.preco) * q);
    }

    // Descontar estoque
    for (const it of items) {
      const prod = await Produto.findById(it.produtoId);
      prod.quantidade -= Number(it.quantidade);
      if (prod.quantidade < 0) prod.quantidade = 0;
      await prod.save();
    }

    // Criar pedido
    const itemsCompletos = await Promise.all(items.map(async (it) => {
      const prod = await Produto.findById(it.produtoId);
      return {
        produtoId: prod._id,
        nome: prod.nome,
        quantidade: Number(it.quantidade),
        preco: Number(prod.preco),
        unidade: prod.unidade
      };
    }));

    const pedido = new Pedido({
      clienteId,
      items: itemsCompletos,
      total: Number(total.toFixed(2)),
      dateISO: new Date().toISOString(),
      ...req.body
    });

    await pedido.save();
    res.status(201).json(await Pedido.findById(pedido._id).populate('clienteId'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/pedidos/stats', async (req, res) => {
  try {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const thisMonth = now.toISOString().slice(0, 7);

    const pedidosHoje = await Pedido.find({
      dateISO: { $regex: `^${today}` }
    });
    const pedidosMes = await Pedido.find({
      dateISO: { $regex: `^${thisMonth}` }
    });

    const totalHoje = pedidosHoje.reduce((s, p) => s + Number(p.total || 0), 0);
    const totalMes = pedidosMes.reduce((s, p) => s + Number(p.total || 0), 0);

    res.json({
      countToday: pedidosHoje.length,
      totalToday: Number(totalHoje.toFixed(2)),
      countMonth: pedidosMes.length,
      totalMonth: Number(totalMes.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTA DE DASHBOARD
// ============================================
app.get('/api/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const thisMonth = now.toISOString().slice(0, 7);

    // Estatísticas de pedidos
    const pedidosHoje = await Pedido.find({
      dateISO: { $regex: `^${today}` }
    });
    const pedidosMes = await Pedido.find({
      dateISO: { $regex: `^${thisMonth}` }
    });

    const totalHoje = pedidosHoje.reduce((s, p) => s + Number(p.total || 0), 0);
    const totalMes = pedidosMes.reduce((s, p) => s + Number(p.total || 0), 0);

    // Estatísticas gerais
    const totalClientes = await Cliente.countDocuments();
    const totalProdutos = await Produto.countDocuments();
    const produtosBaixoEstoque = await Produto.countDocuments({
      $expr: { $lte: ['$quantidade', { $ifNull: ['$minimo', 0] }] }
    });

    // Gráfico de vendas (últimos 7 dias)
    const graficoVendas = [];
    for (let i = 6; i >= 0; i--) {
      const data = new Date(now);
      data.setDate(data.getDate() - i);
      const dataStr = data.toISOString().slice(0, 10);
      
      const pedidosDia = await Pedido.find({
        dateISO: { $regex: `^${dataStr}` }
      });
      
      const vendasDia = pedidosDia.reduce((s, p) => s + Number(p.total || 0), 0);
      
      graficoVendas.push({
        dia: data.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' }),
        vendas: Number(vendasDia.toFixed(2))
      });
    }

    // Top clientes do mês
    const pedidosMesCompleto = await Pedido.find({
      dateISO: { $regex: `^${thisMonth}` }
    }).populate('clienteId');

    const clientesMap = new Map();
    pedidosMesCompleto.forEach(pedido => {
      const clienteId = pedido.clienteId?._id?.toString() || pedido.clienteId?.toString();
      const clienteNome = pedido.clienteId?.nome || 'Cliente';
      const total = Number(pedido.total || 0);
      
      if (clientesMap.has(clienteId)) {
        clientesMap.set(clienteId, {
          nome: clienteNome,
          total: clientesMap.get(clienteId).total + total
        });
      } else {
        clientesMap.set(clienteId, { nome: clienteNome, total });
      }
    });

    const topClientes = Array.from(clientesMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    res.json({
      resumo: {
        vendasHoje: Number(totalHoje.toFixed(2)),
        pedidosHoje: pedidosHoje.length,
        vendasMes: Number(totalMes.toFixed(2)),
        pedidosMes: pedidosMes.length,
        totalClientes,
        totalProdutos,
        produtosBaixoEstoque,
        contasReceber: 0 // Placeholder
      },
      graficoVendas,
      topClientes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE ORÇAMENTOS
// ============================================
app.get("/api/orcamentos", async (req, res) => {
  try {
    const orcamentos = await Orcamento.find()
      .populate('clienteId')
      .populate('items.produtoId')
      .sort({ dataCriacao: -1 });
    res.json(orcamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/orcamentos/:id", async (req, res) => {
  try {
    const orcamento = await Orcamento.findById(req.params.id)
      .populate('clienteId')
      .populate('items.produtoId');
    if (!orcamento) return res.status(404).json({ error: "Orçamento não encontrado" });
    res.json(orcamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/orcamentos", async (req, res) => {
  try {
    const { clienteId, items, desconto, validade } = req.body;
    if (!clienteId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "clienteId e items são obrigatórios" });
    }

    // Calcular total
    let total = 0;
    const itemsCompletos = await Promise.all(items.map(async (it) => {
      const prod = await Produto.findById(it.produtoId);
      if (!prod) throw new Error(`Produto ${it.produtoId} não encontrado`);
      const q = Number(it.quantidade);
      const preco = Number(prod.preco);
      total += (preco * q);
      return {
        produtoId: prod._id,
        nome: prod.nome,
        quantidade: q,
        preco: preco,
        unidade: prod.unidade
      };
    }));

    const descontoValor = Number(desconto || 0);
    const totalComDesconto = total - (total * descontoValor / 100);

    const orcamento = new Orcamento({
      clienteId,
      items: itemsCompletos,
      total: Number(total.toFixed(2)),
      desconto: descontoValor,
      totalComDesconto: Number(totalComDesconto.toFixed(2)),
      validade,
      dateISO: new Date().toISOString()
    });

    await orcamento.save();
    res.status(201).json(await Orcamento.findById(orcamento._id).populate('clienteId'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/orcamentos/:id", async (req, res) => {
  try {
    const orcamento = await Orcamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!orcamento) return res.status(404).json({ error: "Orçamento não encontrado" });
    res.json(orcamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/orcamentos/:id", async (req, res) => {
  try {
    const orcamento = await Orcamento.findByIdAndDelete(req.params.id);
    if (!orcamento) return res.status(404).json({ error: "Orçamento não encontrado" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE FORNECEDORES
// ============================================
app.get("/api/fornecedores", async (req, res) => {
  try {
    const fornecedores = await Fornecedor.find().sort({ dataCriacao: -1 });
    res.json(fornecedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/fornecedores/:id", async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findById(req.params.id);
    if (!fornecedor) return res.status(404).json({ error: "Fornecedor não encontrado" });
    res.json(fornecedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/fornecedores", async (req, res) => {
  try {
    const novo = new Fornecedor(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/fornecedores/:id", async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fornecedor) return res.status(404).json({ error: "Fornecedor não encontrado" });
    res.json(fornecedor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/fornecedores/:id", async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);
    if (!fornecedor) return res.status(404).json({ error: "Fornecedor não encontrado" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE CATEGORIAS
// ============================================
app.get("/api/categorias", async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ dataCriacao: -1 });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/categorias/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/categorias", async (req, res) => {
  try {
    const novo = new Categoria(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/categorias/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/categorias/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE SOLICITAÇÕES
// ============================================
app.get("/api/solicitacoes", async (req, res) => {
  try {
    const solicitacoes = await Solicitacao.find()
      .populate('clienteId')
      .populate('items.produtoId')
      .populate('usuarioId')
      .sort({ dataCriacao: -1 });
    res.json(solicitacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/solicitacoes/:id", async (req, res) => {
  try {
    const solicitacao = await Solicitacao.findById(req.params.id)
      .populate('clienteId')
      .populate('items.produtoId')
      .populate('usuarioId');
    if (!solicitacao) return res.status(404).json({ error: "Solicitação não encontrada" });
    res.json(solicitacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/solicitacoes", async (req, res) => {
  try {
    const { clienteId, items, dataDesejada, motivo } = req.body;
    if (!clienteId || !Array.isArray(items) || items.length === 0 || !dataDesejada || !motivo) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    let total = 0;
    const itemsCompletos = await Promise.all(items.map(async (it) => {
      const prod = await Produto.findById(it.produtoId);
      if (!prod) throw new Error(`Produto ${it.produtoId} não encontrado`);
      const q = Number(it.quantidade);
      const preco = Number(prod.preco);
      total += (preco * q);
      return {
        produtoId: prod._id,
        nome: prod.nome,
        quantidade: q,
        preco: preco
      };
    }));

    const solicitacao = new Solicitacao({
      clienteId,
      items: itemsCompletos,
      total: Number(total.toFixed(2)),
      dataDesejada,
      motivo,
      ...req.body
    });

    await solicitacao.save();
    res.status(201).json(await Solicitacao.findById(solicitacao._id).populate('clienteId'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/solicitacoes/:id", async (req, res) => {
  try {
    const solicitacao = await Solicitacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!solicitacao) return res.status(404).json({ error: "Solicitação não encontrada" });
    res.json(solicitacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/solicitacoes/:id", async (req, res) => {
  try {
    const solicitacao = await Solicitacao.findByIdAndDelete(req.params.id);
    if (!solicitacao) return res.status(404).json({ error: "Solicitação não encontrada" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE NOTAS FISCAIS
// ============================================
app.get("/api/notas-fiscais", async (req, res) => {
  try {
    const notas = await NotaFiscal.find()
      .populate('pedidoId')
      .sort({ dataEmissao: -1 });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/notas-fiscais/:id", async (req, res) => {
  try {
    const nota = await NotaFiscal.findById(req.params.id).populate('pedidoId');
    if (!nota) return res.status(404).json({ error: "Nota fiscal não encontrada" });
    res.json(nota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/notas-fiscais", async (req, res) => {
  try {
    const novo = new NotaFiscal(req.body);
    await novo.save();
    res.status(201).json(await NotaFiscal.findById(novo._id).populate('pedidoId'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/notas-fiscais/:id", async (req, res) => {
  try {
    const nota = await NotaFiscal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nota) return res.status(404).json({ error: "Nota fiscal não encontrada" });
    res.json(nota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/notas-fiscais/:id", async (req, res) => {
  try {
    const nota = await NotaFiscal.findByIdAndDelete(req.params.id);
    if (!nota) return res.status(404).json({ error: "Nota fiscal não encontrada" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE CONFIGURAÇÕES
// ============================================
app.get("/api/config/empresa", async (req, res) => {
  try {
    let config = await ConfigEmpresa.findOne();
    if (!config) {
      config = new ConfigEmpresa();
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/config/empresa", async (req, res) => {
  try {
    let config = await ConfigEmpresa.findOne();
    if (!config) {
      config = new ConfigEmpresa(req.body);
    } else {
      Object.assign(config, req.body);
      config.dataAtualizacao = new Date();
    }
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/config/nfe", async (req, res) => {
  try {
    let config = await ConfigNFe.findOne();
    if (!config) {
      config = new ConfigNFe();
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/config/nfe", async (req, res) => {
  try {
    let config = await ConfigNFe.findOne();
    if (!config) {
      config = new ConfigNFe(req.body);
    } else {
      Object.assign(config, req.body);
      config.dataAtualizacao = new Date();
    }
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================
// ROTAS DE USUÁRIOS
// ============================================
app.get("/api/usuarios", verificarToken, async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password').sort({ dataCriacao: -1 });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/usuarios/:id", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/usuarios", verificarToken, async (req, res) => {
  try {
    const novo = new Usuario(req.body);
    await novo.save();
    const usuario = await Usuario.findById(novo._id).select('-password');
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/usuarios/:id", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/usuarios/:id", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ROTA DE DASHBOARD
// ============================================
app.get('/api/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const thisMonth = now.toISOString().slice(0, 7);

    // Estatísticas de pedidos
    const pedidosHoje = await Pedido.find({
      dateISO: { $regex: `^${today}` }
    });
    const pedidosMes = await Pedido.find({
      dateISO: { $regex: `^${thisMonth}` }
    });

    const totalHoje = pedidosHoje.reduce((s, p) => s + Number(p.total || 0), 0);
    const totalMes = pedidosMes.reduce((s, p) => s + Number(p.total || 0), 0);

    // Estatísticas gerais
    const totalClientes = await Cliente.countDocuments();
    const totalProdutos = await Produto.countDocuments();
    const produtosBaixoEstoque = await Produto.countDocuments({
      $expr: { $lte: ['$quantidade', { $ifNull: ['$minimo', 0] }] }
    });

    // Gráfico de vendas (últimos 7 dias)
    const graficoVendas = [];
    for (let i = 6; i >= 0; i--) {
      const data = new Date(now);
      data.setDate(data.getDate() - i);
      const dataStr = data.toISOString().slice(0, 10);
      
      const pedidosDia = await Pedido.find({
        dateISO: { $regex: `^${dataStr}` }
      });
      
      const vendasDia = pedidosDia.reduce((s, p) => s + Number(p.total || 0), 0);
      
      graficoVendas.push({
        dia: data.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' }),
        vendas: Number(vendasDia.toFixed(2))
      });
    }

    // Top clientes do mês
    const pedidosMesCompleto = await Pedido.find({
      dateISO: { $regex: `^${thisMonth}` }
    }).populate('clienteId');

    const clientesMap = new Map();
    pedidosMesCompleto.forEach(pedido => {
      const clienteId = pedido.clienteId?._id?.toString() || pedido.clienteId?.toString();
      const clienteNome = pedido.clienteId?.nome || 'Cliente';
      const total = Number(pedido.total || 0);
      
      if (clientesMap.has(clienteId)) {
        clientesMap.set(clienteId, {
          nome: clienteNome,
          total: clientesMap.get(clienteId).total + total
        });
      } else {
        clientesMap.set(clienteId, { nome: clienteNome, total });
      }
    });

    const topClientes = Array.from(clientesMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    res.json({
      resumo: {
        vendasHoje: Number(totalHoje.toFixed(2)),
        pedidosHoje: pedidosHoje.length,
        vendasMes: Number(totalMes.toFixed(2)),
        pedidosMes: pedidosMes.length,
        totalClientes,
        totalProdutos,
        produtosBaixoEstoque,
        contasReceber: 0 // Placeholder
      },
      graficoVendas,
      topClientes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// INICIAR SERVIDOR
// ============================================
// Render.com usa porta dinâmica via variável PORT
// Em desenvolvimento local, usa 3000 como padrão
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // Render precisa escutar em 0.0.0.0

(async () => {
  const conectado = await conectarDB();
  if (!conectado) {
    console.log('⚠️  Aviso: Não foi possível conectar ao MongoDB. O sistema continuará funcionando com limitações.');
  }
  
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor MegaClean rodando na porta ${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📱 Acesse: http://localhost:${PORT}`);
      console.log(`✨ Sistema moderno disponível em: http://localhost:${PORT}/app.html`);
    } else {
      console.log(`✨ Sistema em produção - Acesse via URL do Render`);
    }
  });
})();
