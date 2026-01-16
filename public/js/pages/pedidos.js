// ============================================
// PÁGINA: PEDIDOS
// ============================================

export default {
  title: 'Pedidos',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>🛒 Pedidos</h2>
            <p>Crie pedidos e dê baixa automática no estoque</p>
          </div>
        </div>

        <!-- Cards de estatísticas -->
        <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:22px">
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon purple" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--purple-light);color:var(--purple)">🛒</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-total">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Total de pedidos</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon green" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--primary-light);color:var(--primary)">📅</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-hoje">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Pedidos hoje</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon blue" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--info-light);color:var(--info)">💰</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-valor-hoje">R$ 0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Vendas hoje</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon yellow" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--warning-light);color:var(--warning)">📊</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-valor-mes">R$ 0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Vendas no mês</p>
            </div>
          </div>
        </div>

        <!-- Criar pedido -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
            <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">➕ Novo Pedido</h2>
          </div>

          <div class="cliente-select" style="margin-bottom:20px">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Selecione o cliente *</label>
            <select id="select-cliente" style="width:100%;padding:14px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;background:#f8fafc;cursor:pointer">
              <option value="">-- Selecione um cliente --</option>
            </select>
          </div>

          <!-- Seção de Data -->
          <div class="date-section" id="date-section" style="margin:16px 0;padding:16px;background:#f8fafc;border-radius:10px;border:2px solid #e6e9ef">
            <div class="date-row" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <label style="font-size:13px;font-weight:600;color:#374151">📅 Data do Pedido:</label>
              <input type="date" id="input-data" style="padding:10px 14px;border:2px solid #e6e9ef;border-radius:8px;font-size:14px" />
              <button class="btn btn-ghost btn-sm" id="btn-hoje" style="padding:8px 12px;font-size:12px">Hoje</button>
            </div>
            <p class="date-info" id="date-info" style="font-size:12px;color:var(--muted);margin-top:8px">
              Selecione a data do pedido. Data de hoje = pedido normal.
            </p>
            <div class="motivo-section" id="motivo-section" style="display:none;margin-top:12px">
              <label style="font-size:13px;font-weight:600;color:#374151">Motivo da solicitação (obrigatório):</label>
              <textarea id="input-motivo" placeholder="Explique por que precisa registrar este pedido em data anterior..." style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:8px;font-size:14px;resize:vertical;min-height:60px"></textarea>
            </div>
          </div>

          <!-- Card de solicitações pendentes -->
          <div class="solicitacoes-card" id="solicitacoes-card" style="display:none;background:var(--warning-light);border:2px solid var(--warning);border-radius:12px;padding:16px;margin-bottom:18px">
            <div class="solicitacoes-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <h4 style="margin:0;display:flex;align-items:center;gap:8px;color:#b45309">📋 Minhas Solicitações</h4>
              <a href="#solicitacoes" class="btn btn-ghost btn-sm" id="link-todas-solicitacoes" style="display:none;padding:6px 12px;font-size:12px">Ver todas</a>
            </div>
            <div id="lista-minhas-solicitacoes"></div>
          </div>

          <div class="pedido-grid" style="display:grid;grid-template-columns:1fr 420px;gap:20px">
            <!-- Lista de produtos -->
            <div>
              <!-- Seletor de Tipo de Produto -->
              <div class="tipo-pedido-selector" style="display:flex;gap:10px;margin-bottom:16px">
                <button class="tipo-pedido-btn active" data-tipo="unitario" id="btn-tipo-unitario" style="flex:1;padding:14px 20px;border:3px solid var(--primary);background:var(--primary-light);color:var(--primary);border-radius:12px;cursor:pointer;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:10px">
                  📄 Unitários
                  <span class="badge" id="badge-unitarios" style="background:rgba(10,160,78,0.2);padding:2px 10px;border-radius:20px;font-size:12px">0</span>
                </button>
                <button class="tipo-pedido-btn caixa" data-tipo="caixa" id="btn-tipo-caixa" style="flex:1;padding:14px 20px;border:3px solid #e6e9ef;background:#fff;border-radius:12px;cursor:pointer;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:10px">
                  📦 Caixas
                  <span class="badge" id="badge-caixas" style="background:#e6e9ef;padding:2px 10px;border-radius:20px;font-size:12px">0</span>
                </button>
              </div>

              <div class="search-box" style="position:relative;margin-bottom:16px">
                <input type="text" id="search-produto" placeholder="Buscar produto por nome ou SKU..." style="width:100%;padding:12px 14px 12px 42px;border-radius:10px;border:2px solid #e6e9ef;font-size:14px" />
                <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px">🔍</span>
              </div>
              <div class="product-list" id="product-list" style="max-height:400px;overflow-y:auto;border:2px solid #e6e9ef;border-radius:12px;background:#f8fafc">
                <div class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
                  <div class="icon" style="font-size:40px;margin-bottom:10px">📦</div>
                  <h4 style="margin:0 0 8px;color:#0f172a;font-size:16px">Carregando produtos...</h4>
                </div>
              </div>
            </div>

            <!-- Carrinho -->
            <div class="cart-section" style="background:#f8fafc;border-radius:12px;padding:20px">
              <h3 class="cart-title" style="font-size:16px;font-weight:700;margin:0 0 16px;display:flex;align-items:center;gap:8px">🛒 Carrinho</h3>
              
              <div class="cart-items" id="cart-items" style="max-height:280px;overflow-y:auto;margin-bottom:16px">
                <div class="cart-empty" style="text-align:center;padding:40px 20px;color:var(--muted)">
                  <div class="icon" style="font-size:40px;margin-bottom:10px">🛒</div>
                  <p>Carrinho vazio</p>
                  <p style="font-size:12px">Adicione produtos ao carrinho</p>
                </div>
              </div>

              <div class="cart-totals" style="border-top:2px solid #e6e9ef;padding-top:16px;margin-top:8px">
                <div class="cart-total-row" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                  <span>Itens:</span>
                  <span id="cart-count">0</span>
                </div>
                <div class="cart-total-row final" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:18px;font-weight:800;color:var(--primary)">
                  <span>Total:</span>
                  <span id="cart-total">R$ 0,00</span>
                </div>
              </div>

              <div class="cart-actions" style="display:flex;gap:10px;margin-top:16px">
                <button class="btn btn-ghost" id="btn-limpar-carrinho" style="flex:1;padding:10px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:14px">🗑️ Limpar</button>
                <button class="btn btn-primary" id="btn-confirmar" style="flex:1;padding:10px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:14px;background:var(--primary);color:#fff">
                  ✓ Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Histórico de pedidos -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
            <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">📋 Histórico de Pedidos</h2>
            <div class="filter-buttons" style="display:flex;gap:8px">
              <button class="filter-btn active" data-filter="all" style="padding:8px 16px;border-radius:8px;border:2px solid var(--primary);background:var(--primary);color:#fff;cursor:pointer;font-size:13px;font-weight:600">Todos</button>
              <button class="filter-btn" data-filter="today" style="padding:8px 16px;border-radius:8px;border:2px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">Hoje</button>
              <button class="filter-btn" data-filter="month" style="padding:8px 16px;border-radius:8px;border:2px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">Este mês</button>
            </div>
          </div>

          <div class="orders-list" id="orders-list" style="max-height:400px;overflow-y:auto">
            <div class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
              <div class="icon" style="font-size:40px;margin-bottom:10px">📋</div>
              <h4 style="margin:0 0 8px;color:#0f172a;font-size:16px">Carregando pedidos...</h4>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal detalhes do pedido -->
      <div id="modal-detail" class="modal">
        <div class="modal-content" style="max-width:600px">
          <div class="modal-header">
            <h3>📋 Detalhes do Pedido</h3>
            <button class="btn-close" onclick="document.getElementById('modal-detail').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <div id="modal-content"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-detail').classList.remove('show')">Fechar</button>
            <button class="btn btn-ghost" id="btn-whatsapp" style="background:#25d366;color:#fff">📱 WhatsApp</button>
            <button class="btn btn-ghost" id="btn-nfe" style="background:#fbbf24;color:#000">📄 NF-e</button>
            <button class="btn btn-primary" id="btn-imprimir">🖨️ Imprimir Pedido</button>
          </div>
        </div>
      </div>

      <!-- Área de Impressão (invisível na tela) -->
      <div id="print-area" style="display:none">
        <div class="print-content" id="print-content"></div>
      </div>
    `;
  },

  async onLoad() {
    this.clientes = [];
    this.produtos = [];
    this.pedidos = [];
    this.carrinho = [];
    this.filtroAtual = 'all';
    this.userRole = localStorage.getItem('admin_role') || localStorage.getItem('user_role') || 'admin';
    this.minhasSolicitacoes = [];
    this.pedidoAtual = null;
    this.tipoProdutoAtual = 'unitario';
    
    await this.carregarClientes();
    await this.carregarProdutos();
    await this.carregarPedidos();
    await this.carregarMinhasSolicitacoes();
    this.definirDataHoje();
    this.renderizarCarrinho();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  getHoje() {
    return new Date().toISOString().slice(0, 10);
  },

  isDataAnterior(data) {
    return data < this.getHoje();
  },

  definirDataHoje() {
    const inputData = document.getElementById('input-data');
    if (inputData) {
      inputData.value = this.getHoje();
    }
    this.verificarData();
  },

  verificarData() {
    const inputData = document.getElementById('input-data');
    const data = inputData ? inputData.value : '';
    const dateSection = document.getElementById('date-section');
    const dateInfo = document.getElementById('date-info');
    const motivoSection = document.getElementById('motivo-section');
    const btnConfirmar = document.getElementById('btn-confirmar');
    
    if (!data || data >= this.getHoje()) {
      dateSection.className = 'date-section';
      dateInfo.className = 'date-info';
      dateInfo.innerHTML = 'Selecione a data do pedido. Data de hoje = pedido normal.';
      motivoSection.style.display = 'none';
      btnConfirmar.innerHTML = '✓ Confirmar Pedido';
    } else {
      if (this.userRole === 'admin') {
        dateSection.className = 'date-section admin-mode';
        dateSection.style.borderColor = 'var(--primary)';
        dateSection.style.background = 'var(--primary-light)';
        dateInfo.className = 'date-info admin';
        dateInfo.style.color = 'var(--primary)';
        dateInfo.innerHTML = '👑 <strong>Modo Admin:</strong> Pedido será registrado diretamente na data selecionada.';
        motivoSection.style.display = 'none';
        btnConfirmar.innerHTML = '✓ Registrar Pedido Retroativo';
      } else {
        dateSection.className = 'date-section solicitacao-mode';
        dateSection.style.borderColor = 'var(--warning)';
        dateSection.style.background = 'var(--warning-light)';
        dateInfo.className = 'date-info solicitacao';
        dateInfo.style.color = '#b45309';
        dateInfo.innerHTML = '⏳ <strong>Solicitação:</strong> Como a data é anterior, será criada uma solicitação que o administrador precisa aprovar.';
        motivoSection.style.display = 'block';
        btnConfirmar.innerHTML = '📋 Enviar Solicitação';
      }
    }
  },

  async carregarClientes() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/clientes`);
      if (!res.ok) throw new Error('Erro');
      this.clientes = await res.json();
      
      const select = document.getElementById('select-cliente');
      select.innerHTML = '<option value="">-- Selecione um cliente --</option>';
      this.clientes.forEach(c => {
        select.innerHTML += `<option value="${c.id || c._id}">${(window.Utils || Utils).escapeHtml(c.nome)} ${c.cpf ? '(' + c.cpf + ')' : ''}</option>`;
      });
    } catch (e) {
      console.error(e);
    }
  },

  async carregarProdutos() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/produtos`);
      if (!res.ok) throw new Error('Erro');
      this.produtos = await res.json();
      this.atualizarContadoresTipo();
      this.renderizarProdutos();
    } catch (e) {
      console.error(e);
      document.getElementById('product-list').innerHTML = `
        <div class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
          <div class="icon" style="font-size:40px;margin-bottom:10px">❌</div>
          <h4 style="margin:0 0 8px;color:#0f172a;font-size:16px">Erro ao carregar produtos</h4>
        </div>
      `;
    }
  },

  async carregarPedidos() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/pedidos`);
      if (!res.ok) throw new Error('Erro');
      this.pedidos = await res.json();
      
      this.atualizarEstatisticas();
      this.renderizarPedidos();
    } catch (e) {
      console.error(e);
    }
  },

  atualizarEstatisticas() {
    const hoje = new Date().toISOString().slice(0, 10);
    const mes = new Date().toISOString().slice(0, 7);

    const pedidosHoje = this.pedidos.filter(p => (p.dateISO || '').slice(0, 10) === hoje);
    const pedidosMes = this.pedidos.filter(p => (p.dateISO || '').slice(0, 7) === mes);

    const valorHoje = pedidosHoje.reduce((s, p) => s + (p.total || 0), 0);
    const valorMes = pedidosMes.reduce((s, p) => s + (p.total || 0), 0);

    const elTotal = document.getElementById('stat-total');
    const elHoje = document.getElementById('stat-hoje');
    const elValorHoje = document.getElementById('stat-valor-hoje');
    const elValorMes = document.getElementById('stat-valor-mes');
    
    if (elTotal) elTotal.textContent = this.pedidos.length;
    if (elHoje) elHoje.textContent = pedidosHoje.length;
    if (elValorHoje) elValorHoje.textContent = (window.Utils || Utils).formatMoney(valorHoje);
    if (elValorMes) elValorMes.textContent = (window.Utils || Utils).formatMoney(valorMes);
  },

  mudarTipoProduto(tipo) {
    this.tipoProdutoAtual = tipo;
    
    document.querySelectorAll('.tipo-pedido-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tipo === tipo) {
        btn.classList.add('active');
        if (tipo === 'caixa') {
          btn.style.borderColor = 'var(--purple)';
          btn.style.background = 'var(--purple-light)';
          btn.style.color = 'var(--purple)';
        } else {
          btn.style.borderColor = 'var(--primary)';
          btn.style.background = 'var(--primary-light)';
          btn.style.color = 'var(--primary)';
        }
      } else {
        btn.style.borderColor = '#e6e9ef';
        btn.style.background = '#fff';
        btn.style.color = 'var(--muted)';
      }
    });
    
    this.renderizarProdutos();
  },

  atualizarContadoresTipo() {
    const unitarios = this.produtos.filter(p => (p.tipo || 'unitario') === 'unitario').length;
    const caixas = this.produtos.filter(p => p.tipo === 'caixa').length;
    
    const badgeUnitarios = document.getElementById('badge-unitarios');
    const badgeCaixas = document.getElementById('badge-caixas');
    if (badgeUnitarios) badgeUnitarios.textContent = unitarios;
    if (badgeCaixas) badgeCaixas.textContent = caixas;
  },

  renderizarProdutos() {
    const container = document.getElementById('product-list');
    const searchTerm = document.getElementById('search-produto')?.value.toLowerCase() || '';

    let lista = this.produtos.filter(p => {
      const matchTipo = (p.tipo || 'unitario') === this.tipoProdutoAtual;
      const matchSearch = !searchTerm || 
        (p.nome || '').toLowerCase().includes(searchTerm) ||
        (p.sku || '').toLowerCase().includes(searchTerm);
      return matchTipo && matchSearch;
    });

    const tipoLabel = this.tipoProdutoAtual === 'caixa' ? 'caixas' : 'produtos unitários';
    const tipoIcon = this.tipoProdutoAtual === 'caixa' ? '📦' : '📄';

    if (lista.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
          <div class="icon" style="font-size:40px;margin-bottom:10px">${tipoIcon}</div>
          <h4 style="margin:0 0 8px;color:#0f172a;font-size:16px">Nenhum(a) ${tipoLabel} encontrado(a)</h4>
          <p style="font-size:12px">Cadastre ${tipoLabel} na página de Produtos</p>
        </div>
      `;
      return;
    }

    container.innerHTML = lista.map(p => {
      const qtdInfo = p.tipo === 'caixa' && p.qtdPorCaixa ? ` (${p.qtdPorCaixa} un/cx)` : '';
      return `
        <div class="product-item" style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #e6e9ef;background:#fff;transition:background .15s">
          <div class="product-info">
            <h4 style="margin:0;font-size:14px;font-weight:600">${tipoIcon} ${(window.Utils || Utils).escapeHtml(p.nome)}${qtdInfo}</h4>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">SKU: ${(window.Utils || Utils).escapeHtml(p.sku || '—')} | ${(window.Utils || Utils).formatMoney(p.preco)}</p>
          </div>
          <div class="product-actions" style="display:flex;align-items:center;gap:10px">
            <span class="stock" style="font-size:12px;color:var(--muted);min-width:60px;text-align:right">${p.quantidade} ${(window.Utils || Utils).escapeHtml(p.unidade || 'UN')}</span>
            <input type="number" id="qty-${p.id || p._id}" min="1" max="${p.quantidade}" value="1" style="width:70px;padding:8px;border:2px solid #e6e9ef;border-radius:8px;text-align:center;font-size:14px" />
            <button class="btn btn-add btn-sm" data-action="add-cart" data-id="${p.id || p._id}" style="background:var(--info);color:#fff;padding:8px 14px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:12px" ${p.quantidade <= 0 ? 'disabled' : ''}>
              ➕
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  adicionarAoCarrinho(produtoId) {
    const produto = this.produtos.find(p => (p._id || p.id) === produtoId);
    if (!produto) return;

    const qtyInput = document.getElementById(`qty-${produto.id || produto._id}`);
    const quantidade = parseInt(qtyInput?.value) || 1;

    if (quantidade <= 0) {
      if (window.toastManager) window.toastManager.error('Quantidade inválida');
      return;
    }

    const pid = produto._id || produto.id;

    const noCarrinho = this.carrinho.find(c => c.produtoId === pid);
    const qtdAtual = noCarrinho ? noCarrinho.quantidade : 0;

    if (qtdAtual + quantidade > produto.quantidade) {
      if (window.toastManager) window.toastManager.error('Estoque insuficiente');
      return;
    }

    const tipoIcon = produto.tipo === 'caixa' ? '📦' : '📄';

    if (noCarrinho) {
      noCarrinho.quantidade += quantidade;
    } else {
      this.carrinho.push({
        produtoId: pid,
        nome: produto.nome,
        quantidade,
        preco: produto.preco,
        unidade: produto.unidade || 'UN',
        tipo: produto.tipo || 'unitario'
      });
    }

    if (qtyInput) qtyInput.value = 1;
    this.renderizarCarrinho();
    if (window.toastManager) window.toastManager.success(`✓ ${tipoIcon} ${produto.nome} adicionado!`);
  },

  removerDoCarrinho(index) {
    this.carrinho.splice(index, 1);
    this.renderizarCarrinho();
  },

  atualizarQuantidade(index, novaQtd) {
    const item = this.carrinho[index];
    if (!item) return;

    const produto = this.produtos.find(p => (p.id || p._id) === item.produtoId);
    if (!produto) return;

    novaQtd = parseInt(novaQtd) || 1;
    if (novaQtd > produto.quantidade) {
      if (window.toastManager) window.toastManager.error('Estoque insuficiente');
      return;
    }

    if (novaQtd < 1) novaQtd = 1;

    this.carrinho[index].quantidade = novaQtd;
    this.renderizarCarrinho();
  },

  renderizarCarrinho() {
    const container = document.getElementById('cart-items');

    if (this.carrinho.length === 0) {
      container.innerHTML = `
        <div class="cart-empty" style="text-align:center;padding:40px 20px;color:var(--muted)">
          <div class="icon" style="font-size:40px;margin-bottom:10px">🛒</div>
          <p>Carrinho vazio</p>
          <p style="font-size:12px">Adicione produtos ao carrinho</p>
        </div>
      `;
      const cartCount = document.getElementById('cart-count');
      const cartTotal = document.getElementById('cart-total');
      if (cartCount) cartCount.textContent = '0';
      if (cartTotal) cartTotal.textContent = 'R$ 0,00';
      return;
    }

    let total = 0;
    let itens = 0;

    container.innerHTML = this.carrinho.map((item, index) => {
      const subtotal = item.quantidade * item.preco;
      total += subtotal;
      itens += item.quantidade;
      const tipoIcon = item.tipo === 'caixa' ? '📦' : '📄';

      return `
        <div class="cart-item" style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:#fff;border-radius:10px;margin-bottom:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04)">
          <div class="cart-item-info">
            <h5 style="margin:0;font-size:14px;font-weight:600">${tipoIcon} ${(window.Utils || Utils).escapeHtml(item.nome)}</h5>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">${(window.Utils || Utils).formatMoney(item.preco)} × ${item.quantidade} = <strong>${(window.Utils || Utils).formatMoney(subtotal)}</strong></p>
          </div>
          <div class="cart-item-actions" style="display:flex;align-items:center;gap:8px">
            <input type="number" value="${item.quantidade}" min="1" onchange="window.pedidosPage.atualizarQuantidade(${index}, this.value)" style="width:60px;padding:6px;border:2px solid #e6e9ef;border-radius:6px;text-align:center;font-size:13px" />
            <button class="remove" onclick="window.pedidosPage.removerDoCarrinho(${index})" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:18px;padding:4px">✕</button>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('cart-count').textContent = itens;
    document.getElementById('cart-total').textContent = (window.Utils || Utils).formatMoney(total);
  },

  limparCarrinho() {
    this.carrinho = [];
    this.renderizarCarrinho();
  },

  async confirmarPedido() {
    const clienteId = document.getElementById('select-cliente').value;
    const dataSelecionada = document.getElementById('input-data').value;
    const motivo = document.getElementById('input-motivo')?.value || '';

    if (!clienteId) {
      if (window.toastManager) window.toastManager.error('Selecione um cliente');
      return;
    }

    if (this.carrinho.length === 0) {
      if (window.toastManager) window.toastManager.error('Carrinho vazio');
      return;
    }

    const btn = document.getElementById('btn-confirmar');
    btn.disabled = true;
    
    const isRetroativo = dataSelecionada && this.isDataAnterior(dataSelecionada);
    const isSolicitacao = isRetroativo && this.userRole !== 'admin';
    
    btn.innerHTML = isSolicitacao ? 'Enviando solicitação...' : 'Processando...';

    try {
      const itemsPayload = this.carrinho.map(c => ({
        produtoId: c.produtoId,
        quantidade: c.quantidade
      }));

      if (isSolicitacao) {
        if (!motivo.trim()) {
          throw new Error('Informe o motivo da solicitação');
        }

        const payload = {
          clienteId: clienteId,
          items: itemsPayload,
          dataDesejada: dataSelecionada,
          motivo: motivo.trim()
        };

        const res = await fetch(`${window.API_BASE_URL || '/api'}/solicitacoes`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-auth-token': this.getToken()
          },
          body: JSON.stringify(payload)
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || 'Erro ao criar solicitação');
        }

        if (window.toastManager) window.toastManager.success('📋 Solicitação enviada! Aguarde aprovação do administrador.');
        this.limparCarrinho();
        document.getElementById('input-motivo').value = '';
        this.definirDataHoje();
        await this.carregarMinhasSolicitacoes();
      } else {
        const payload = {
          clienteId: parseInt(clienteId),
          items: itemsPayload
        };

        if (isRetroativo && this.userRole === 'admin') {
          payload.dataPersonalizada = dataSelecionada;
        }

        const res = await fetch(`${window.API_BASE_URL || '/api'}/pedidos`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-auth-token': this.getToken()
          },
          body: JSON.stringify(payload)
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || 'Erro ao criar pedido');
        }

        if (isRetroativo) {
          if (window.toastManager) window.toastManager.success('✅ Pedido retroativo registrado! Estoque atualizado.');
        } else {
          if (window.toastManager) window.toastManager.success('✅ Pedido confirmado! Estoque atualizado.');
        }
        
        this.limparCarrinho();
        this.definirDataHoje();
        await this.carregarProdutos();
        await this.carregarPedidos();
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error(e.message);
    } finally {
      btn.disabled = false;
      this.verificarData();
    }
  },

  async carregarMinhasSolicitacoes() {
    if (this.userRole === 'admin') {
      const solicitacoesCard = document.getElementById('solicitacoes-card');
      if (solicitacoesCard) {
        solicitacoesCard.style.display = 'none';
      }
      return;
    }

    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/solicitacoes`, {
        headers: { 'x-auth-token': this.getToken() }
      });
      
      if (!res.ok) return;
      
      this.minhasSolicitacoes = await res.json();
      this.renderizarMinhasSolicitacoes();
    } catch (e) {
      console.error(e);
    }
  },

  renderizarMinhasSolicitacoes() {
    const container = document.getElementById('lista-minhas-solicitacoes');
    const card = document.getElementById('solicitacoes-card');
    
    const recentes = this.minhasSolicitacoes
      .filter(s => s.status === 'pendente')
      .slice(-3)
      .reverse();
    
    if (recentes.length === 0) {
      card.style.display = 'none';
      return;
    }
    
    card.style.display = 'block';
    
    container.innerHTML = recentes.map(s => {
      const statusLabel = {
        'pendente': '⏳ Aguardando aprovação',
        'aprovado': '✓ Aprovado',
        'rejeitado': '✕ Rejeitado'
      }[s.status];
      
      const cliente = this.clientes.find(c => (c.id || c._id) === s.clienteId);
      
      return `
        <div class="solicitacao-mini ${s.status}" style="background:#fff;padding:12px;border-radius:8px;margin-bottom:8px;border-left:3px solid var(--warning)">
          <h5 style="margin:0 0 4px;font-size:13px">${(window.Utils || Utils).escapeHtml(cliente?.nome || 'Cliente')} - ${(window.Utils || Utils).formatDate(s.dataDesejada)}</h5>
          <p style="margin:0;font-size:12px;color:var(--muted)">${statusLabel} • ${(window.Utils || Utils).formatMoney(s.total)}</p>
        </div>
      `;
    }).join('');
  },

  renderizarPedidos() {
    const container = document.getElementById('orders-list');
    const hoje = new Date().toISOString().slice(0, 10);
    const mes = new Date().toISOString().slice(0, 7);

    let lista = this.pedidos;
    if (this.filtroAtual === 'today') {
      lista = this.pedidos.filter(p => (p.dateISO || '').slice(0, 10) === hoje);
    } else if (this.filtroAtual === 'month') {
      lista = this.pedidos.filter(p => (p.dateISO || '').slice(0, 7) === mes);
    }

    lista = [...lista].reverse();

    if (lista.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
          <div class="icon" style="font-size:40px;margin-bottom:10px">📋</div>
          <h4 style="margin:0 0 8px;color:#0f172a;font-size:16px">Nenhum pedido encontrado</h4>
        </div>
      `;
      return;
    }

    container.innerHTML = lista.map(p => {
      const cliente = this.clientes.find(c => (c.id || c._id) === p.clienteId);
      const data = p.dateISO ? new Date(p.dateISO).toLocaleString('pt-BR') : '—';
      const retroativoBadge = p.retroativo ? '<span class="badge retroativo" style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:600;background:var(--purple-light);color:var(--purple)">📅 Retroativo</span>' : '';

      return `
        <div class="order-item" style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:#f8fafc;border-radius:10px;margin-bottom:10px;transition:all .15s">
          <div class="order-info">
            <h4 style="margin:0;font-size:15px;font-weight:600"><span class="badge green" style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:var(--primary-light);color:var(--primary)">#${p.id}</span> ${retroativoBadge} ${(window.Utils || Utils).escapeHtml(cliente?.nome || 'Cliente')}</h4>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">${data} • ${p.items?.length || 0} item(s)</p>
          </div>
          <div class="order-total" style="text-align:right">
            <h4 style="margin:0;font-size:16px;font-weight:800;color:var(--primary)">${(window.Utils || Utils).formatMoney(p.total)}</h4>
            <button class="btn btn-ghost btn-sm" data-action="ver-pedido" data-id="${p.id}" style="margin-top:8px;padding:6px 12px;font-size:12px">Ver detalhes</button>
          </div>
        </div>
      `;
    }).join('');
  },

  verDetalhesPedido(pedidoId) {
    const pedido = this.pedidos.find(p => p.id === pedidoId);
    if (!pedido) return;

    this.pedidoAtual = pedido;

    const cliente = this.clientes.find(c => (c.id || c._id) === pedido.clienteId);
    const data = pedido.dateISO ? new Date(pedido.dateISO).toLocaleString('pt-BR') : '—';
    const retroativoInfo = pedido.retroativo 
      ? '<p><span class="badge retroativo" style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:600;background:var(--purple-light);color:var(--purple)">📅 Pedido Retroativo</span></p>' 
      : '';

    let html = `
      <div style="margin-bottom:16px">
        <p><strong>Pedido:</strong> #${pedido.id}</p>
        <p><strong>Cliente:</strong> ${(window.Utils || Utils).escapeHtml(cliente?.nome || 'Cliente')}</p>
        <p><strong>Data:</strong> ${data}</p>
        ${retroativoInfo}
      </div>
      <h4 style="margin:0 0 12px">Itens do pedido:</h4>
    `;

    pedido.items?.forEach(item => {
      const subtotal = item.quantidade * item.preco;
      html += `
        <div class="modal-detail-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f3f7">
          <span>${(window.Utils || Utils).escapeHtml(item.nome)} × ${item.quantidade}</span>
          <span><strong>${(window.Utils || Utils).formatMoney(subtotal)}</strong></span>
        </div>
      `;
    });

    html += `
      <div class="modal-detail-row" style="margin-top:12px;padding-top:12px;border-top:2px solid #e6e9ef;display:flex;justify-content:space-between">
        <span style="font-size:18px;font-weight:700">Total:</span>
        <span style="font-size:18px;font-weight:700;color:var(--primary)">${(window.Utils || Utils).formatMoney(pedido.total)}</span>
      </div>
    `;

    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-detail').classList.add('show');
  },

  enviarWhatsApp() {
    if (!this.pedidoAtual) {
      if (window.toastManager) window.toastManager.error('Nenhum pedido selecionado');
      return;
    }
    
    const cliente = this.clientes.find(c => (c._id || c.id) === this.pedidoAtual.clienteId);
    if (!cliente || !cliente.telefone) {
      if (window.toastManager) window.toastManager.error('Cliente não possui telefone cadastrado');
      return;
    }
    
    const tel = cliente.telefone.replace(/\D/g, '');
    const itens = (this.pedidoAtual.items || []).map(i => {
      return `• ${i.nome || 'Produto'} x${i.quantidade}`;
    }).join('\n');
    
    const msg = `🧹 *MEGACLEAN - Comprovante de Pedido*\n\n` +
      `📋 Pedido #${String(this.pedidoAtual.id).padStart(4, '0')}\n` +
      `👤 Cliente: ${cliente.nome}\n` +
      `📅 Data: ${new Date(this.pedidoAtual.dateISO || this.pedidoAtual.data).toLocaleDateString('pt-BR')}\n\n` +
      `*Itens:*\n${itens}\n\n` +
      `💰 *Total: R$ ${Number(this.pedidoAtual.total || 0).toFixed(2).replace('.', ',')}*\n\n` +
      `Obrigado pela preferência! 🙏`;
    
    const url = `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  async emitirNFe() {
    if (!this.pedidoAtual) {
      if (window.toastManager) window.toastManager.error('Nenhum pedido selecionado');
      return;
    }
    
    const pedido = this.pedidoAtual;
    
    if (!confirm(`Deseja emitir NF-e para o pedido #${String(pedido.id).padStart(4, '0')}?\n\nCliente: ${pedido.clienteNome || 'Cliente'}\nValor: ${(window.Utils || Utils).formatMoney(pedido.total)}`)) {
      return;
    }
    
    if (window.toastManager) window.toastManager.info('⏳ Gerando NF-e...');
    
    try {
      const res = await fetch(`/api/nfe/emitir/${pedido.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      
      if (data.error) {
        if (window.toastManager) window.toastManager.error('❌ ' + data.error);
        return;
      }
      
      if (data.modo === 'manual') {
        this.mostrarDadosNFeManual(data.dados);
        if (window.toastManager) window.toastManager.success('✅ Dados da NF-e gerados! Copie para o portal da SEFAZ.');
      } else if (data.sucesso) {
        if (window.toastManager) window.toastManager.success(`✅ NF-e #${data.nfe.numero} emitida com sucesso!`);
        if (data.nfe.urlPdf) {
          window.open(data.nfe.urlPdf, '_blank');
        }
      } else {
        const erro = data.nfe?.mensagemErro || 'Erro desconhecido';
        if (window.toastManager) window.toastManager.error('❌ ' + erro);
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error('❌ Erro ao emitir NF-e: ' + e.message);
    }
  },

  mostrarDadosNFeManual(dados) {
    const itensTexto = dados.itens.map(item => 
      `${item.numero}. ${item.produto} - Qtd: ${item.quantidade} - R$ ${item.valorUnitario.toFixed(2)} = R$ ${item.valorTotal.toFixed(2)}`
    ).join('\n');
    
    const texto = `
=== DADOS PARA NF-e ===

CLIENTE:
Nome: ${dados.cliente.nome}
CPF/CNPJ: ${dados.cliente.cpfCnpj || 'N/A'}

ITENS:
${itensTexto}

TOTAL: R$ ${dados.valorTotal.toFixed(2)}

Data: ${new Date(dados.dataEmissao).toLocaleString('pt-BR')}
    `.trim();
    
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.width = '100%';
    textarea.style.height = '300px';
    textarea.style.padding = '12px';
    textarea.style.border = '2px solid #e6e9ef';
    textarea.style.borderRadius = '10px';
    textarea.style.fontFamily = 'monospace';
    textarea.style.fontSize = '13px';
    textarea.readOnly = true;
    
    if (confirm('Dados da NF-e gerados! Deseja copiar para a área de transferência?')) {
      textarea.select();
      document.execCommand('copy');
      if (window.toastManager) window.toastManager.success('✅ Dados copiados!');
    }
  },

  imprimirPedido() {
    if (!this.pedidoAtual) {
      if (window.toastManager) window.toastManager.error('Nenhum pedido selecionado');
      return;
    }

    const pedido = this.pedidoAtual;
    const cliente = this.clientes.find(c => (c.id || c._id) === pedido.clienteId);
    const dataEmissao = new Date().toLocaleString('pt-BR');
    const dataPedido = pedido.dateISO ? new Date(pedido.dateISO).toLocaleString('pt-BR') : '—';

    let itensHtml = '';
    let subtotalGeral = 0;

    pedido.items?.forEach(item => {
      const subtotal = item.quantidade * item.preco;
      subtotalGeral += subtotal;
      itensHtml += `
        <tr>
          <td>${(window.Utils || Utils).escapeHtml(item.nome)}</td>
          <td class="qty-col" style="text-align:center;width:60px">${item.quantidade}</td>
          <td class="price-col" style="text-align:right;width:100px">${(window.Utils || Utils).formatMoney(item.preco)}</td>
          <td class="price-col" style="text-align:right;width:100px">${(window.Utils || Utils).formatMoney(subtotal)}</td>
        </tr>
      `;
    });

    const printContent = `
      <div class="print-header" style="text-align:center;border-bottom:3px solid #0aa04e;padding-bottom:15px;margin-bottom:20px">
        <h1 style="margin:0;font-size:26px;color:#0aa04e">🧹 MegaClean</h1>
        <p style="margin:4px 0 0;font-size:12px;color:#666">Sistema de Gestão de Pedidos</p>
        <div class="order-num" style="font-size:16px;font-weight:bold;margin-top:12px;background:#f0f0f0;display:inline-block;padding:8px 20px;border-radius:6px">PEDIDO Nº ${String(pedido.id).padStart(4, '0')} ${pedido.retroativo ? '• RETROATIVO' : ''}</div>
      </div>

      <div class="print-section" style="margin-bottom:18px">
        <div class="print-section-title" style="font-size:13px;font-weight:bold;color:#0aa04e;text-transform:uppercase;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-bottom:12px">👤 Cliente</div>
        <div class="print-cliente-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px 30px">
          <div class="print-cliente-item" style="padding:6px 0;border-bottom:1px dashed #e0e0e0">
            <label style="display:block;font-size:10px;color:#666;text-transform:uppercase;margin-bottom:2px">Nome</label>
            <span style="font-size:13px;font-weight:600;color:#333">${(window.Utils || Utils).escapeHtml(cliente?.nome || 'Não informado')}</span>
          </div>
          <div class="print-cliente-item" style="padding:6px 0;border-bottom:1px dashed #e0e0e0">
            <label style="display:block;font-size:10px;color:#666;text-transform:uppercase;margin-bottom:2px">CPF/CNPJ</label>
            <span style="font-size:13px;font-weight:600;color:#333">${(window.Utils || Utils).escapeHtml(cliente?.cpf || 'Não informado')}</span>
          </div>
          <div class="print-cliente-item" style="padding:6px 0;border-bottom:1px dashed #e0e0e0">
            <label style="display:block;font-size:10px;color:#666;text-transform:uppercase;margin-bottom:2px">Telefone</label>
            <span style="font-size:13px;font-weight:600;color:#333">${(window.Utils || Utils).escapeHtml(cliente?.telefone || 'Não informado')}</span>
          </div>
          <div class="print-cliente-item" style="padding:6px 0;border-bottom:1px dashed #e0e0e0">
            <label style="display:block;font-size:10px;color:#666;text-transform:uppercase;margin-bottom:2px">Data do Pedido</label>
            <span style="font-size:13px;font-weight:600;color:#333">${dataPedido}</span>
          </div>
          <div class="print-cliente-item" style="grid-column:span 2;padding:6px 0;border-bottom:1px dashed #e0e0e0">
            <label style="display:block;font-size:10px;color:#666;text-transform:uppercase;margin-bottom:2px">Endereço</label>
            <span style="font-size:13px;font-weight:600;color:#333">${(window.Utils || Utils).escapeHtml(cliente?.endereco || 'Não informado')}</span>
          </div>
        </div>
      </div>

      <div class="print-section" style="margin-bottom:18px">
        <div class="print-section-title" style="font-size:13px;font-weight:bold;color:#0aa04e;text-transform:uppercase;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-bottom:12px">📦 Itens do Pedido</div>
        <table class="print-table" style="width:100%;border-collapse:collapse;margin-top:8px">
          <thead>
            <tr>
              <th style="background:#f5f5f5;padding:10px 8px;text-align:left;font-size:11px;font-weight:bold;border-bottom:2px solid #ddd;text-transform:uppercase">Produto</th>
              <th class="qty-col" style="background:#f5f5f5;padding:10px 8px;text-align:center;font-size:11px;font-weight:bold;border-bottom:2px solid #ddd;text-transform:uppercase;width:60px">Qtd</th>
              <th class="price-col" style="background:#f5f5f5;padding:10px 8px;text-align:right;font-size:11px;font-weight:bold;border-bottom:2px solid #ddd;text-transform:uppercase;width:100px">Unit.</th>
              <th class="price-col" style="background:#f5f5f5;padding:10px 8px;text-align:right;font-size:11px;font-weight:bold;border-bottom:2px solid #ddd;text-transform:uppercase;width:100px">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itensHtml}
            <tr class="total-row" style="font-weight:bold;background:#f0fff4">
              <td colspan="3" style="text-align:right;border-top:2px solid #0aa04e;font-size:15px;padding:12px 8px">TOTAL:</td>
              <td class="price-col" style="color:#0aa04e;border-top:2px solid #0aa04e;font-size:15px;padding:12px 8px;text-align:right">${(window.Utils || Utils).formatMoney(pedido.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="print-obs" style="background:#fffbeb;border:1px solid #f59e0b;border-radius:6px;padding:12px 15px;margin-top:15px">
        <div class="print-obs-title" style="font-size:11px;font-weight:bold;color:#b45309;margin-bottom:6px">📝 Observações</div>
        <div class="print-obs-text" style="font-size:12px;color:#333;min-height:30px">________________________________________________________________</div>
      </div>

      <div class="print-signature" style="margin-top:30px;padding-top:20px;border-top:2px dashed #ccc">
        <div class="print-signature-title" style="font-size:11px;color:#666;text-transform:uppercase;margin-bottom:8px;text-align:center">Confirmação de Recebimento</div>
        <p style="font-size:9px;color:#666;text-align:center;margin:0 0 5px">
          Declaro que recebi os produtos/serviços descritos acima em perfeitas condições.
        </p>
        
        <div class="print-signature-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:50px;margin-top:15px">
          <div class="print-signature-box" style="text-align:center">
            <div class="print-signature-line" style="border-top:2px solid #333;padding-top:8px;margin-top:40px">
              <div class="print-signature-label" style="font-size:12px;color:#333;font-weight:600">Assinatura do Cliente</div>
              <div class="print-signature-sub" style="font-size:10px;color:#666;margin-top:2px">${(window.Utils || Utils).escapeHtml(cliente?.nome || 'Cliente')}</div>
            </div>
          </div>
          <div class="print-signature-box" style="text-align:center">
            <div class="print-signature-line" style="border-top:2px solid #333;padding-top:8px;margin-top:40px">
              <div class="print-signature-label" style="font-size:12px;color:#333;font-weight:600">Data do Recebimento</div>
              <div class="print-signature-sub" style="font-size:10px;color:#666;margin-top:2px">____/____/________</div>
            </div>
          </div>
        </div>
      </div>

      <div class="print-footer" style="margin-top:25px;padding-top:12px;border-top:1px solid #e0e0e0;text-align:center;font-size:10px;color:#999">
        <p style="margin:2px 0"><strong>MegaClean</strong> • Documento gerado em ${dataEmissao}</p>
      </div>
    `;

    document.getElementById('print-content').innerHTML = printContent;
    document.getElementById('print-area').style.display = 'block';

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.getElementById('print-area').style.display = 'none';
      }, 500);
    }, 300);
  },

  setupEventListeners() {
    document.getElementById('btn-hoje')?.addEventListener('click', () => {
      this.definirDataHoje();
    });

    document.getElementById('input-data')?.addEventListener('change', () => {
      this.verificarData();
    });

    document.getElementById('btn-confirmar')?.addEventListener('click', () => {
      this.confirmarPedido();
    });

    document.getElementById('btn-limpar-carrinho')?.addEventListener('click', () => {
      this.limparCarrinho();
    });

    document.getElementById('search-produto')?.addEventListener('input', () => {
      this.renderizarProdutos();
    });

    document.getElementById('btn-tipo-unitario')?.addEventListener('click', () => {
      this.mudarTipoProduto('unitario');
    });

    document.getElementById('btn-tipo-caixa')?.addEventListener('click', () => {
      this.mudarTipoProduto('caixa');
    });

    document.getElementById('btn-whatsapp')?.addEventListener('click', () => {
      this.enviarWhatsApp();
    });

    document.getElementById('btn-nfe')?.addEventListener('click', () => {
      this.emitirNFe();
    });

    document.getElementById('btn-imprimir')?.addEventListener('click', () => {
      this.imprimirPedido();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '#e6e9ef';
          b.style.background = '#fff';
          b.style.color = 'var(--muted)';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--primary)';
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
        this.filtroAtual = btn.dataset.filter;
        this.renderizarPedidos();
      });
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      
      if (action === 'add-cart') {
        this.adicionarAoCarrinho(id);
      } else if (action === 'ver-pedido') {
        this.verDetalhesPedido(parseInt(id));
      }
    });
  }
};
