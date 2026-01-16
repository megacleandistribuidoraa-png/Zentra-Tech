// ============================================
// PÁGINA: DASHBOARD
// ============================================

export default {
  title: 'Dashboard',
  
  async load() {
    const isAdmin = (window.Utils || Utils).isAdmin();
    
    return `
      <div class="dashboard-container">
        <!-- Cards de Estatísticas Clicáveis -->
        <div class="stats-grid">
          <a href="#" data-route="clientes" class="stat-card">
            <div class="stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3 id="stat-total-clientes">—</h3>
              <p>Clientes cadastrados</p>
            </div>
          </a>
          
          ${isAdmin ? `
          <a href="#" data-route="produtos" class="stat-card" id="card-produtos">
            <div class="stat-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3 id="stat-total-produtos">—</h3>
              <p>Produtos no catálogo</p>
            </div>
          </a>
          ` : ''}
          
          <a href="#" data-route="pedidos" class="stat-card">
            <div class="stat-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3 id="stat-total-pedidos">—</h3>
              <p>Pedidos realizados</p>
            </div>
          </a>
          
          ${isAdmin ? `
          <a href="#" data-route="estoque" class="stat-card" id="card-estoque">
            <div class="stat-icon yellow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="9" y1="16" x2="15" y2="16"/>
              </svg>
            </div>
            <div class="stat-info">
              <h3 id="stat-estoque-baixo">—</h3>
              <p>Produtos em baixa</p>
            </div>
          </a>
          ` : ''}
        </div>

        <!-- Grid de Conteúdo -->
        <div class="content-grid">
          <!-- Menu de Navegação -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">📋 Menu Principal</h2>
            </div>
            <div class="card-body">
              <nav class="nav-menu" id="dashboard-nav-menu">
                <!-- Será preenchido via JavaScript -->
              </nav>
              
              ${isAdmin ? `
              <div class="admin-section" id="dashboard-admin-section">
                <div class="admin-section-title">👑 Área do Administrador</div>
                <nav class="nav-menu" id="dashboard-admin-menu">
                  <!-- Será preenchido via JavaScript -->
                </nav>
              </div>
              ` : ''}
            </div>
          </div>

          <!-- Informações -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">ℹ️ Informações</h2>
            </div>
            <div class="card-body">
              <div class="info-list">
                <div class="info-item">
                  <div class="icon">🚀</div>
                  <div class="text">
                    <h5>Sistema MegaClean</h5>
                    <p>Sistema completo para gestão de produtos de limpeza, clientes e pedidos.</p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="icon">📊</div>
                  <div class="text">
                    <h5>Estoque Automático</h5>
                    <p>O estoque é atualizado automaticamente quando pedidos são realizados.</p>
                  </div>
                </div>
                <div class="info-item" id="info-admin" style="display:${isAdmin ? 'flex' : 'none'}">
                  <div class="icon">👑</div>
                  <div class="text">
                    <h5>Acesso Administrador</h5>
                    <p>Você tem acesso total ao sistema, incluindo relatórios e gerenciamento de usuários.</p>
                  </div>
                </div>
                <div class="info-item" id="info-operador" style="display:${isAdmin ? 'none' : 'flex'}">
                  <div class="icon">👤</div>
                  <div class="text">
                    <h5>Acesso Operador</h5>
                    <p>Você tem acesso a Clientes e Pedidos. Para mais permissões, contate o administrador.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estatísticas Detalhadas -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon green">💰</div>
            <div class="stat-info">
              <h3 id="stat-vendas-hoje">R$ 0,00</h3>
              <p>Vendas Hoje</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon blue">📦</div>
            <div class="stat-info">
              <h3 id="stat-pedidos-hoje">0</h3>
              <p>Pedidos Hoje</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon purple">📈</div>
            <div class="stat-info">
              <h3 id="stat-vendas-mes">R$ 0,00</h3>
              <p>Vendas no Mês</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon blue">🛒</div>
            <div class="stat-info">
              <h3 id="stat-pedidos-mes">0</h3>
              <p>Pedidos no Mês</p>
            </div>
          </div>
        </div>

        <!-- Gráficos e Top Clientes -->
        <div class="content-grid">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">📈 Vendas - Últimos 7 dias</h3>
            </div>
            <div class="card-body">
              <canvas id="chart-vendas" height="200"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">🏆 Top 5 Clientes do Mês</h3>
            </div>
            <div class="card-body">
              <div id="top-clientes" class="top-clientes-list"></div>
            </div>
          </div>
        </div>

        <!-- Ações Rápidas -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">⚡ Ações Rápidas</h3>
          </div>
          <div class="card-body">
            <div class="quick-actions">
              <button class="action-btn" data-route="pedidos">
                <span class="action-icon">🛒</span>
                <span class="action-label">Novo Pedido</span>
              </button>
              <button class="action-btn" data-route="orcamentos">
                <span class="action-icon">📋</span>
                <span class="action-label">Novo Orçamento</span>
              </button>
              <button class="action-btn" data-route="clientes">
                <span class="action-icon">👥</span>
                <span class="action-label">Novo Cliente</span>
              </button>
              <button class="action-btn" data-route="contas">
                <span class="action-icon">💰</span>
                <span class="action-label">Contas a Receber</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    await this.loadMenu();
    await this.loadStats();
    await this.loadChart();
    await this.loadTopClientes();
    this.setupEventListeners();
  },

  async loadMenu() {
    try {
      const apiBase = window.API_BASE_URL || '/api';
      const res = await fetch(`${apiBase}/admin/pages`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });
      
      if (!res.ok) return;
      
      const data = await res.json();
      const pages = data.pages || [];
      const isAdmin = (window.Utils || Utils).isAdmin();
      
      const mainPages = pages.filter(p => 
        ['dashboard', 'clientes', 'pedidos', 'orcamentos'].includes(p.id)
      );
      
      const adminPages = pages.filter(p => 
        ['produtos', 'categorias', 'estoque', 'fornecedores', 'contas', 
         'relatorio', 'solicitacoes', 'notas-fiscais', 'config-empresa', 
         'usuarios', 'config'].includes(p.id)
      );

      const navMenu = document.getElementById('dashboard-nav-menu');
      const adminMenu = document.getElementById('dashboard-admin-menu');
      
      if (navMenu) {
        navMenu.innerHTML = mainPages.map(p => `
          <a href="#" data-route="${p.id}" class="nav-item">
            <div class="icon">${getPageIcon(p.id)}</div>
            <div class="text">
              <h4>${p.title}</h4>
              <p>${getPageDescription(p.id)}</p>
            </div>
            <span class="arrow">→</span>
          </a>
        `).join('');
      }

      if (isAdmin && adminMenu) {
        adminMenu.innerHTML = adminPages.map(p => `
          <a href="#" data-route="${p.id}" class="nav-item">
            <div class="icon">${getPageIcon(p.id)}</div>
            <div class="text">
              <h4>${p.title}</h4>
              <p>${getPageDescription(p.id)}</p>
            </div>
            <span class="arrow">→</span>
          </a>
        `).join('');
      }
    } catch (error) {
      console.error('Erro ao carregar menu:', error);
    }
  },

  async loadStats() {
    try {
      // Clientes
      const apiBase = window.API_BASE_URL || '/api';
      const clientesRes = await fetch(`${apiBase}/clientes`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });
      
      if (clientesRes.ok) {
        const clientes = await clientesRes.json();
        const totalClientes = Array.isArray(clientes) ? clientes.length : 0;
        document.getElementById('stat-total-clientes').textContent = totalClientes;
      }

      // Produtos (apenas admin)
      if ((window.Utils || Utils).isAdmin()) {
        const produtosRes = await fetch(`${apiBase}/produtos`, {
          headers: (window.Utils || Utils).getAuthHeaders()
        });
        
        if (produtosRes.ok) {
          const produtos = await produtosRes.json();
          const totalProdutos = Array.isArray(produtos) ? produtos.length : 0;
          const estoqueBaixo = Array.isArray(produtos) 
            ? produtos.filter(p => p.quantidade <= (p.minimo || 0)).length 
            : 0;
          
          document.getElementById('stat-total-produtos').textContent = totalProdutos;
          document.getElementById('stat-estoque-baixo').textContent = estoqueBaixo;
        }
      }

      // Pedidos
      const pedidosRes = await fetch(`${apiBase}/pedidos`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });
      
      if (pedidosRes.ok) {
        const pedidos = await pedidosRes.json();
        const totalPedidos = Array.isArray(pedidos) ? pedidos.length : 0;
        document.getElementById('stat-total-pedidos').textContent = totalPedidos;
      }

      // Estatísticas de pedidos (hoje/mês)
      const statsRes = await fetch(`${apiBase}/pedidos/stats`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });
      
      if (statsRes.ok) {
        const stats = await statsRes.json();
        document.getElementById('stat-vendas-hoje').textContent = (window.Utils || Utils).formatMoney(stats.totalToday || 0);
        document.getElementById('stat-pedidos-hoje').textContent = stats.countToday || 0;
        document.getElementById('stat-vendas-mes').textContent = (window.Utils || Utils).formatMoney(stats.totalMonth || 0);
        document.getElementById('stat-pedidos-mes').textContent = stats.countMonth || 0;
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  },

  async loadChart() {
    try {
      const pedidosRes = await fetch(`${apiBase}/pedidos`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });
      
      if (!pedidosRes.ok) return;

      const pedidos = await pedidosRes.json();
      
      const hoje = new Date();
      const dias = [];
      const vendas = [];
      
      for (let i = 6; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(data.getDate() - i);
        const dataStr = data.toISOString().slice(0, 10);
        
        dias.push(data.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' }));
        
        const pedidosDia = Array.isArray(pedidos) 
          ? pedidos.filter(p => p.dateISO && p.dateISO.startsWith(dataStr))
          : [];
        
        const totalDia = pedidosDia.reduce((sum, p) => sum + (parseFloat(p.total) || 0), 0);
        vendas.push(totalDia);
      }

      const ctx = document.getElementById('chart-vendas');
      if (!ctx) return;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dias,
          datasets: [{
            label: 'Vendas (R$)',
            data: vendas,
            backgroundColor: '#0d9488',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: isDark ? '#334155' : '#f0f0f0' },
              ticks: {
                callback: function(value) {
                  return 'R$ ' + value.toFixed(0);
                }
              }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao carregar gráfico:', error);
    }
  },

  async loadTopClientes() {
    try {
      const pedidosRes = await fetch(`${apiBase}/pedidos`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });
      
      if (!pedidosRes.ok) return;

      const pedidos = await pedidosRes.json();
      
      const hoje = new Date();
      const mesAtual = hoje.toISOString().slice(0, 7);
      
      const pedidosMes = Array.isArray(pedidos)
        ? pedidos.filter(p => p.dateISO && p.dateISO.startsWith(mesAtual))
        : [];

      const clientesMap = new Map();
      
      pedidosMes.forEach(pedido => {
        const clienteId = pedido.clienteId?._id || pedido.clienteId;
        const clienteNome = pedido.clienteId?.nome || 'Cliente';
        const total = parseFloat(pedido.total) || 0;
        
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

      const container = document.getElementById('top-clientes');
      
      if (topClientes.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px">Nenhuma venda este mês</p>';
      } else {
        container.innerHTML = topClientes.map((c, i) => `
          <div class="cliente-item">
            <span class="cliente-rank">${i + 1}º</span>
            <span class="cliente-nome">${(window.Utils || Utils).escapeHtml(c.nome)}</span>
            <span class="cliente-valor">${(window.Utils || Utils).formatMoney(c.total)}</span>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Erro ao carregar top clientes:', error);
    }
  },

  setupEventListeners() {
    // Cards clicáveis
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.stat-card[data-route]');
      if (!card) return;
      
      e.preventDefault();
      const route = card.getAttribute('data-route');
      if (route && window.router) {
        window.router.navigate(route);
      }
    });

    // Menu de navegação
    document.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item[data-route]');
      if (!navItem) return;
      
      e.preventDefault();
      const route = navItem.getAttribute('data-route');
      if (route && window.router) {
        window.router.navigate(route);
      }
    });

    // Ações rápidas
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.action-btn');
      if (!btn) return;
      
      const route = btn.getAttribute('data-route');
      if (route && window.router) {
        window.router.navigate(route);
      }
    });
  }
};

function getPageIcon(id) {
  const icons = {
    'dashboard': '📊',
    'clientes': '👥',
    'produtos': '📦',
    'categorias': '📁',
    'pedidos': '🛒',
    'orcamentos': '📋',
    'contas': '💰',
    'estoque': '📦',
    'fornecedores': '🚚',
    'relatorio': '📈',
    'solicitacoes': '📝',
    'notas-fiscais': '📄',
    'config-empresa': '🏢',
    'usuarios': '👤',
    'config': '⚙️'
  };
  return icons[id] || '📄';
}

function getPageDescription(id) {
  const descriptions = {
    'dashboard': 'Visão geral do sistema',
    'clientes': 'Cadastre e gerencie seus clientes',
    'produtos': 'Gerencie seu catálogo de produtos',
    'categorias': 'Organize produtos por categoria',
    'pedidos': 'Crie e acompanhe pedidos',
    'orcamentos': 'Crie orçamentos para clientes',
    'contas': 'Controle de contas a receber',
    'estoque': 'Controle de estoque em tempo real',
    'fornecedores': 'Cadastre seus fornecedores',
    'relatorio': 'Relatórios e métricas do dia',
    'solicitacoes': 'Aprove pedidos retroativos',
    'notas-fiscais': 'Gerencie notas fiscais emitidas',
    'config-empresa': 'Configure dados da empresa',
    'usuarios': 'Gerencie usuários do sistema',
    'config': 'Configurações da sua conta'
  };
  return descriptions[id] || '';
}
