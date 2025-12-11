// server.js - Versão com MongoDB Atlas
const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');

// Modelos
const Cliente = require('./models/Cliente');
const Produto = require('./models/Produto');
const Pedido = require('./models/Pedido');
const Usuario = require('./models/Usuario');
const Solicitacao = require('./models/Solicitacao');

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------
// -------------- CONEXÃO MONGODB -------------
// ---------------------------------------------
const MONGODB_URI = 'mongodb+srv://megacleandistribuidoraa_db_user:ian04032023@cluster0.en8yzsz.mongodb.net/megaclean?retryWrites=true&w=majority';

// Armazenar tokens válidos (em memória - para produção usar Redis ou JWT)
let tokensValidos = {};

// Gerar token simples
function gerarToken(userId, role) {
  return `token-${userId}-${role}-${Date.now()}`;
}

// Conectar ao MongoDB e iniciar servidor
async function iniciarServidor() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB Atlas!');
    
    // Criar usuário admin padrão se não existir
    const adminExiste = await Usuario.findOne({ username: 'admin' });
    if (!adminExiste) {
      await Usuario.create({
        username: 'admin',
        password: 'admin123',
        nome: 'Administrador MegaClean',
        role: 'admin',
        status: 'ativo'
      });
      console.log('👤 Usuário admin criado (admin/admin123)');
    }
    
    // Criar usuário operador padrão se não existir
    const operadorExiste = await Usuario.findOne({ username: 'operador' });
    if (!operadorExiste) {
      await Usuario.create({
        username: 'operador',
        password: 'op123',
        nome: 'Operador Teste',
        role: 'operador',
        status: 'ativo'
      });
      console.log('👤 Usuário operador criado (operador/op123)');
    }
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
}

// ---------------------------------------------
// -------------- LOGIN / USUÁRIOS -------------
// ---------------------------------------------
app.post('/api/login', async (req, res) => {
  try {
    const body = req.body || {};
    const username = (body.username || body.usuario || '').toString().trim();
    const password = (body.password || body.senha || '').toString().trim();

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    const usuario = await Usuario.findOne({ username, password });
    
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    if (usuario.status === 'inativo') {
      return res.status(401).json({ error: 'Usuário inativo. Contate o administrador.' });
    }

    const token = gerarToken(usuario._id, usuario.role);
    tokensValidos[token] = { userId: usuario._id.toString(), role: usuario.role };

    return res.json({ 
      token, 
      username: usuario.username, 
      name: usuario.nome,
      role: usuario.role,
      userId: usuario._id
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Middleware para verificar autenticação
function verificarAuth(req, res, next) {
  const token = req.header('x-auth-token') || req.query.token || '';
  
  if (!token || !tokensValidos[token]) {
    return res.status(401).json({ error: 'Token inválido' });
  }
  
  req.auth = tokensValidos[token];
  next();
}

// Middleware para verificar se é admin
function verificarAdmin(req, res, next) {
  if (req.auth.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
}

// Obter info do usuário logado
app.get('/api/admin/me', async (req, res) => {
  try {
    const token = req.header('x-auth-token') || req.query.token || '';
    
    if (!token || !tokensValidos[token]) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    
    const authInfo = tokensValidos[token];
    const usuario = await Usuario.findById(authInfo.userId);
    
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    
    return res.json({ 
      id: usuario._id,
      username: usuario.username, 
      name: usuario.nome,
      role: usuario.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  const token = req.header('x-auth-token') || '';
  delete tokensValidos[token];
  res.json({ success: true });
});

// ---------------------------------------------
// -------------- GERENCIAR USUÁRIOS -----------
// ---------------------------------------------
app.get('/api/usuarios', verificarAuth, verificarAdmin, async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.post('/api/usuarios', verificarAuth, verificarAdmin, async (req, res) => {
  try {
    const { username, password, nome, role } = req.body;

    if (!username || !password || !nome) {
      return res.status(400).json({ error: 'Username, senha e nome são obrigatórios' });
    }

    const existe = await Usuario.findOne({ username });
    if (existe) {
      return res.status(400).json({ error: 'Este nome de usuário já existe' });
    }

    const novoUsuario = await Usuario.create({
      username,
      password,
      nome,
      role: role || 'operador',
      status: 'ativo'
    });

    res.json({
      id: novoUsuario._id,
      username: novoUsuario.username,
      nome: novoUsuario.nome,
      role: novoUsuario.role,
      status: novoUsuario.status
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.put('/api/usuarios/:id', verificarAuth, verificarAdmin, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { username, password, nome, role, status } = req.body;

    if (username && username !== usuario.username) {
      const existe = await Usuario.findOne({ username, _id: { $ne: req.params.id } });
      if (existe) {
        return res.status(400).json({ error: 'Este nome de usuário já existe' });
      }
      usuario.username = username;
    }

    if (password) usuario.password = password;
    if (nome) usuario.nome = nome;
    if (role) usuario.role = role;
    if (status) usuario.status = status;

    await usuario.save();

    res.json({
      id: usuario._id,
      username: usuario.username,
      nome: usuario.nome,
      role: usuario.role,
      status: usuario.status
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

app.delete('/api/usuarios/:id', verificarAuth, verificarAdmin, async (req, res) => {
  try {
    if (req.auth.userId === req.params.id) {
      return res.status(400).json({ error: 'Você não pode excluir seu próprio usuário' });
    }

    const usuario = await Usuario.findById(req.params.id);
    if (usuario && usuario.username === 'admin') {
      return res.status(400).json({ error: 'Não é possível excluir o administrador principal' });
    }

    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

app.put('/api/usuarios/me', verificarAuth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.auth.userId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { nome, senhaAtual, novaSenha } = req.body;

    if (nome) usuario.nome = nome;

    if (novaSenha) {
      if (!senhaAtual || senhaAtual !== usuario.password) {
        return res.status(400).json({ error: 'Senha atual incorreta' });
      }
      usuario.password = novaSenha;
    }

    await usuario.save();

    res.json({
      id: usuario._id,
      username: usuario.username,
      nome: usuario.nome,
      role: usuario.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Páginas disponíveis baseado no role
app.get('/api/admin/pages', verificarAuth, (req, res) => {
  const isAdmin = req.auth.role === 'admin';

  let pages = [
    { id: 'clientes', title: 'Clientes', url: '/clientes.html', icon: '👥' },
    { id: 'pedidos', title: 'Pedidos', url: '/pedidos.html', icon: '🛒' }
  ];

  if (isAdmin) {
    pages = [
      { id: 'clientes', title: 'Clientes', url: '/clientes.html', icon: '👥' },
      { id: 'produtos', title: 'Produtos', url: '/produtos.html', icon: '📦' },
      { id: 'pedidos', title: 'Pedidos', url: '/pedidos.html', icon: '🛒' },
      { id: 'estoque', title: 'Estoque', url: '/estoque.html', icon: '📊' },
      { id: 'relatorio', title: 'Relatório', url: '/relatorio.html', icon: '📈' },
      { id: 'solicitacoes', title: 'Solicitações', url: '/solicitacoes.html', icon: '📋' },
      { id: 'usuarios', title: 'Usuários', url: '/usuarios.html', icon: '👤' },
      { id: 'config', title: 'Configurações', url: '/config.html', icon: '⚙️' }
    ];
  }

  return res.json({ pages, role: req.auth.role });
});

// ---------------------------------------------
// -------------- CLIENTES ---------------------
// ---------------------------------------------
app.get("/api/clientes", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

app.get("/api/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

app.post("/api/clientes", async (req, res) => {
  try {
    const novo = await Cliente.create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      email: req.body.email,
      endereco: req.body.endereco,
      status: req.body.status || "ativo"
    });
    res.json(novo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

app.put("/api/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    cliente.nome = req.body.nome || cliente.nome;
    cliente.cpf = req.body.cpf || cliente.cpf;
    cliente.telefone = req.body.telefone || cliente.telefone;
    cliente.email = req.body.email || cliente.email;
    cliente.endereco = req.body.endereco || cliente.endereco;
    cliente.status = req.body.status || cliente.status;

    await cliente.save();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

app.delete("/api/clientes/:id", async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
});

// ---------------------------------------------
// -------------- PRODUTOS ---------------------
// ---------------------------------------------
app.get("/api/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get("/api/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

app.post("/api/produtos", async (req, res) => {
  try {
    const count = await Produto.countDocuments();
    const novo = await Produto.create({
      nome: req.body.nome,
      preco: Number(req.body.preco),
      quantidade: Number(req.body.quantidade),
      minimo: Number(req.body.minimo),
      unidade: req.body.unidade,
      sku: String(count + 1).padStart(3, "0")
    });
    res.json(novo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.put("/api/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

    produto.nome = req.body.nome;
    produto.preco = Number(req.body.preco);
    produto.quantidade = Number(req.body.quantidade);
    produto.minimo = Number(req.body.minimo);
    produto.unidade = req.body.unidade;

    await produto.save();
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
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
    res.status(500).json({ error: 'Erro ao ajustar estoque' });
  }
});

app.delete("/api/produtos/:id", async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

// ---------------------------------------------
// -------------- PEDIDOS ----------------------
// ---------------------------------------------
app.get("/api/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

app.get("/api/pedidos/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

app.post("/api/pedidos", async (req, res) => {
  try {
    const { clienteId, items, dataPersonalizada } = req.body;
    if (!clienteId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "clienteId e items são obrigatórios" });
    }

    // Valida e calcula total
    let total = 0;
    const itemsCompletos = [];

    for (const it of items) {
      const prod = await Produto.findById(it.produtoId);
      if (!prod) return res.status(400).json({ error: `Produto ${it.produtoId} não encontrado` });
      const q = Number(it.quantidade);
      if (q <= 0) return res.status(400).json({ error: 'Quantidade inválida' });
      if (prod.quantidade < q) return res.status(400).json({ error: `Estoque insuficiente para ${prod.nome}` });
      total += (Number(prod.preco) * q);
      
      itemsCompletos.push({
        produtoId: prod._id,
        nome: prod.nome,
        quantidade: q,
        preco: prod.preco,
        unidade: prod.unidade
      });
    }

    // Desconta estoque
    for (const it of items) {
      await Produto.findByIdAndUpdate(it.produtoId, {
        $inc: { quantidade: -Number(it.quantidade) }
      });
    }

    // Determinar a data do pedido
    let dataPedido = new Date().toISOString();
    if (dataPersonalizada) {
      const dataBase = new Date(dataPersonalizada + 'T12:00:00');
      dataPedido = dataBase.toISOString();
    }

    const pedido = await Pedido.create({
      clienteId,
      items: itemsCompletos,
      total: Number(total.toFixed(2)),
      dateISO: dataPedido,
      retroativo: !!dataPersonalizada
    });

    res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

app.get('/api/pedidos/stats', async (req, res) => {
  try {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const thisMonth = now.toISOString().slice(0, 7);

    const pedidos = await Pedido.find();
    
    const pedidosHoje = pedidos.filter(p => p.dateISO.slice(0, 10) === today);
    const pedidosMes = pedidos.filter(p => p.dateISO.slice(0, 7) === thisMonth);

    const totalHoje = pedidosHoje.reduce((s, p) => s + Number(p.total || 0), 0);
    const totalMes = pedidosMes.reduce((s, p) => s + Number(p.total || 0), 0);

    res.json({
      countToday: pedidosHoje.length,
      totalToday: Number(totalHoje.toFixed(2)),
      countMonth: pedidosMes.length,
      totalMonth: Number(totalMes.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

// ---------------------------------------------
// -------------- RELATÓRIO --------------------
// ---------------------------------------------
app.get('/api/relatorio/diario', async (req, res) => {
  try {
    const { data, dataInicio, dataFim } = req.query;
    
    const pedidos = await Pedido.find();
    const clientes = await Cliente.find();
    
    let pedidosDia;
    let periodoTexto;
    
    if (dataInicio && dataFim) {
      pedidosDia = pedidos.filter(p => {
        const dataP = p.dateISO.slice(0, 10);
        return dataP >= dataInicio && dataP <= dataFim;
      });
      periodoTexto = `${dataInicio} a ${dataFim}`;
    } else {
      const dataFiltro = data || new Date().toISOString().slice(0, 10);
      pedidosDia = pedidos.filter(p => p.dateISO.slice(0, 10) === dataFiltro);
      periodoTexto = dataFiltro;
    }
    
    const totalVendas = pedidosDia.reduce((s, p) => s + (p.total || 0), 0);
    
    // Produtos mais vendidos
    const produtosVendidos = {};
    pedidosDia.forEach(p => {
      p.items?.forEach(item => {
        const key = item.produtoId?.toString() || item.nome;
        if (!produtosVendidos[key]) {
          produtosVendidos[key] = { nome: item.nome, quantidade: 0, valor: 0 };
        }
        produtosVendidos[key].quantidade += item.quantidade;
        produtosVendidos[key].valor += item.quantidade * item.preco;
      });
    });
    
    const topProdutos = Object.values(produtosVendidos)
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);
    
    // Clientes que compraram
    const clientesIds = [...new Set(pedidosDia.map(p => p.clienteId?.toString()))];
    const clientesCompraram = clientesIds.map(id => {
      const cliente = clientes.find(c => c._id.toString() === id);
      const pedidosCliente = pedidosDia.filter(p => p.clienteId?.toString() === id);
      return {
        id,
        nome: cliente?.nome || 'Cliente',
        pedidos: pedidosCliente.length,
        total: pedidosCliente.reduce((s, p) => s + (p.total || 0), 0)
      };
    }).sort((a, b) => b.total - a.total);
    
    // Pedidos por hora
    const pedidosPorHora = {};
    for (let h = 0; h < 24; h++) {
      pedidosPorHora[h] = { hora: `${String(h).padStart(2, '0')}:00`, pedidos: 0, valor: 0 };
    }
    pedidosDia.forEach(p => {
      const hora = new Date(p.dateISO).getHours();
      pedidosPorHora[hora].pedidos++;
      pedidosPorHora[hora].valor += p.total || 0;
    });

    res.json({
      periodo: periodoTexto,
      resumo: {
        totalPedidos: pedidosDia.length,
        totalVendas: Number(totalVendas.toFixed(2)),
        ticketMedio: pedidosDia.length > 0 ? Number((totalVendas / pedidosDia.length).toFixed(2)) : 0,
        clientesAtendidos: clientesIds.length
      },
      pedidos: pedidosDia.map(p => {
        const cliente = clientes.find(c => c._id.toString() === p.clienteId?.toString());
        return {
          ...p.toObject(),
          clienteNome: cliente?.nome || 'Cliente'
        };
      }),
      topProdutos,
      clientesCompraram,
      pedidosPorHora: Object.values(pedidosPorHora)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar relatório' });
  }
});

// ---------------------------------------------
// -------- SOLICITAÇÕES RETROATIVAS ----------
// ---------------------------------------------
app.get('/api/solicitacoes', verificarAuth, async (req, res) => {
  try {
    let query = {};
    if (req.auth.role !== 'admin') {
      query.usuarioId = req.auth.userId;
    }
    
    const solicitacoes = await Solicitacao.find(query);
    const clientes = await Cliente.find();
    const usuarios = await Usuario.find();
    
    const listaEnriquecida = solicitacoes.map(s => {
      const cliente = clientes.find(c => c._id.toString() === s.clienteId?.toString());
      const usuario = usuarios.find(u => u._id.toString() === s.usuarioId?.toString());
      return {
        ...s.toObject(),
        clienteNome: cliente?.nome || 'Cliente',
        usuarioNome: usuario?.nome || 'Usuário'
      };
    });
    
    res.json(listaEnriquecida);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar solicitações' });
  }
});

app.get('/api/solicitacoes/pendentes/count', verificarAuth, verificarAdmin, async (req, res) => {
  try {
    const count = await Solicitacao.countDocuments({ status: 'pendente' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao contar solicitações' });
  }
});

app.post('/api/solicitacoes', verificarAuth, async (req, res) => {
  try {
    const { clienteId, items, dataDesejada, motivo } = req.body;
    
    if (!clienteId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'clienteId e items são obrigatórios' });
    }
    
    if (!dataDesejada) {
      return res.status(400).json({ error: 'Data desejada é obrigatória' });
    }
    
    const hoje = new Date().toISOString().slice(0, 10);
    if (dataDesejada >= hoje) {
      return res.status(400).json({ error: 'Solicitações só podem ser feitas para datas anteriores' });
    }
    
    let total = 0;
    const itemsCompletos = [];
    
    for (const it of items) {
      const prod = await Produto.findById(it.produtoId);
      if (!prod) return res.status(400).json({ error: `Produto ${it.produtoId} não encontrado` });
      const q = Number(it.quantidade);
      if (q <= 0) return res.status(400).json({ error: 'Quantidade inválida' });
      total += (Number(prod.preco) * q);
      
      itemsCompletos.push({
        produtoId: prod._id,
        nome: prod.nome,
        quantidade: q,
        preco: prod.preco
      });
    }
    
    const solicitacao = await Solicitacao.create({
      clienteId,
      items: itemsCompletos,
      total: Number(total.toFixed(2)),
      dataDesejada,
      motivo: motivo || '',
      status: 'pendente',
      usuarioId: req.auth.userId
    });
    
    res.status(201).json(solicitacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar solicitação' });
  }
});

app.post('/api/solicitacoes/:id/aprovar', verificarAuth, verificarAdmin, async (req, res) => {
  try {
    const solicitacao = await Solicitacao.findById(req.params.id);
    
    if (!solicitacao) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }
    
    if (solicitacao.status !== 'pendente') {
      return res.status(400).json({ error: 'Esta solicitação já foi processada' });
    }
    
    // Verificar estoque
    for (const it of solicitacao.items) {
      const prod = await Produto.findById(it.produtoId);
      if (!prod || prod.quantidade < it.quantidade) {
        return res.status(400).json({ error: `Estoque insuficiente para ${it.nome}` });
      }
    }
    
    // Descontar estoque
    for (const it of solicitacao.items) {
      await Produto.findByIdAndUpdate(it.produtoId, {
        $inc: { quantidade: -it.quantidade }
      });
    }
    
    // Criar o pedido
    const pedido = await Pedido.create({
      clienteId: solicitacao.clienteId,
      items: solicitacao.items,
      total: solicitacao.total,
      dateISO: new Date(solicitacao.dataDesejada + 'T12:00:00').toISOString(),
      retroativo: true
    });
    
    // Atualizar solicitação
    solicitacao.status = 'aprovado';
    await solicitacao.save();
    
    res.json({ solicitacao, pedido });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao aprovar solicitação' });
  }
});

app.post('/api/solicitacoes/:id/rejeitar', verificarAuth, verificarAdmin, async (req, res) => {
  try {
    const { motivo } = req.body;
    const solicitacao = await Solicitacao.findById(req.params.id);
    
    if (!solicitacao) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }
    
    if (solicitacao.status !== 'pendente') {
      return res.status(400).json({ error: 'Esta solicitação já foi processada' });
    }
    
    solicitacao.status = 'rejeitado';
    solicitacao.motivoRejeicao = motivo || 'Não informado';
    await solicitacao.save();
    
    res.json(solicitacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao rejeitar solicitação' });
  }
});

// Iniciar servidor
iniciarServidor();
