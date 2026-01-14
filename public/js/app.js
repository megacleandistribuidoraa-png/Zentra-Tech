// ============================================
// MEGA CLEAN - SISTEMA MODERNO E DINÂMICO
// ============================================

// Configuração da API
const API_BASE = '/api';
const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// ============================================
// UTILITÁRIOS
// ============================================
const Utils = {
  // Formatação de moeda
  formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  },

  // Formatação de data
  formatDate(date) {
    if (!date) return '—';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  },

  // Formatação de data e hora
  formatDateTime(date) {
    if (!date) return '—';
    const d = new Date(date);
    return d.toLocaleString('pt-BR');
  },

  // Escape HTML
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Obter token de autenticação
  getAuthToken() {
    return localStorage.getItem('admin_token');
  },

  // Obter headers com autenticação
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      ...API_CONFIG.headers,
      'x-auth-token': token || ''
    };
  },

  // Verificar se é admin
  isAdmin() {
    return localStorage.getItem('admin_role') === 'admin';
  }
};

// ============================================
// SISTEMA DE ROTEAMENTO
// ============================================
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.isNavigating = false;
    this.init();
  }

  init() {
    // Interceptar cliques em links usando event delegation (apenas como fallback)
    // Os menus têm seus próprios listeners que têm prioridade
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (!link) return;
      
      // Se já foi tratado por outro listener, não fazer nada
      if (e.defaultPrevented) return;
      
      // Se o link está dentro do navMenu, deixar o listener do menu tratar
      const navMenu = document.getElementById('sidebar-nav');
      if (navMenu && navMenu.contains(link)) {
        return; // Deixar o listener do menu tratar
      }
      
      e.preventDefault();
      e.stopPropagation();
      
      const route = link.getAttribute('data-route');
      if (!route) return;
      
      console.log('Router init (fallback): Clique detectado em rota', route);
      this.navigate(route);
    });

    // Interceptar navegação do browser
    window.addEventListener('popstate', () => {
      console.log('Router: Popstate detectado');
      this.handleRoute();
    });
    
    // Interceptar mudanças no hash
    window.addEventListener('hashchange', () => {
      console.log('Router: Hashchange detectado');
      this.handleRoute();
    });
  }

  route(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path, replace = false) {
    const currentHash = window.location.hash.slice(1);
    
    // Se já estamos na mesma rota, não fazer nada
    if (currentHash === path && this.currentRoute === path) {
      console.log('Router: Já estamos na rota', path);
      return;
    }
    
    console.log('Router: Navegando de', currentHash, 'para', path);
    this.isNavigating = true;
    
    try {
      if (replace) {
        window.history.replaceState({}, '', `#${path}`);
      } else {
        window.history.pushState({}, '', `#${path}`);
      }
      
      // Executar handleRoute imediatamente
      this.handleRoute();
      
      // Resetar flag após um pequeno delay
      setTimeout(() => {
        this.isNavigating = false;
      }, 100);
    } catch (error) {
      console.error('Router: Erro ao navegar', error);
      this.isNavigating = false;
    }
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const [path, ...params] = hash.split('/');
    
    console.log('Router: handleRoute - path:', path, 'rotas disponíveis:', Array.from(this.routes.keys()));
    
    // Se a rota não existe, aguardar ou redirecionar
    if (!this.routes.has(path)) {
      console.log('Router: Rota não encontrada:', path);
      // Se dashboard ainda não foi carregado, mostrar loading
      if (!this.routes.has('dashboard')) {
        console.log('Router: Aguardando carregamento da rota:', path);
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
          pageContent.innerHTML = `
            <div class="loading-state">
              <p>Carregando rota "${path}"...</p>
            </div>
          `;
        }
        this.currentRoute = path;
        return;
      }
      
      // Se a rota não existe e já temos componentes carregados, mostrar erro
      console.log('Router: Rota não encontrada:', path);
      const pageContent = document.getElementById('page-content');
      if (pageContent) {
        pageContent.innerHTML = `
          <div class="error-state">
            <h3>❌ Página não encontrada</h3>
            <p>A página "${path}" não foi encontrada.</p>
            <button class="btn btn-primary" onclick="window.router.navigate('dashboard')" style="margin-top:20px">
              Voltar ao Dashboard
            </button>
          </div>
        `;
      }
      this.currentRoute = path;
      return;
    }
    
    const handler = this.routes.get(path);
    
    if (handler) {
      console.log('Router: Executando handler para:', path);
      this.currentRoute = path;
      handler(path, ...params);
    } else {
      console.error('Router: Handler não encontrado para:', path);
    }
  }

  getCurrentRoute() {
    return this.currentRoute || '';
  }
}

// ============================================
// GERENCIADOR DE PÁGINAS
// ============================================
class PageManager {
  constructor() {
    this.pages = new Map();
    this.currentPage = null;
  }

  register(name, component) {
    this.pages.set(name, component);
  }

  async load(name, ...params) {
    console.log('PageManager: Carregando página', name);
    
    const pageContent = document.getElementById('page-content');
    if (!pageContent) {
      console.error('PageManager: Elemento page-content não encontrado no DOM');
      return;
    }
    
    // Ocultar página atual
    if (this.currentPage && this.currentPage.onUnload) {
      try {
        this.currentPage.onUnload();
      } catch (e) {
        console.error('Erro ao descarregar página atual:', e);
      }
    }

    // Carregar nova página
    const component = this.pages.get(name);
    if (!component) {
      console.error(`PageManager: Página "${name}" não encontrada. Páginas disponíveis:`, Array.from(this.pages.keys()));
      pageContent.innerHTML = `
        <div class="error-state">
          <h3>❌ Página não encontrada</h3>
          <p>A página "${name}" não foi encontrada.</p>
          <p style="font-size:12px;margin-top:10px">Páginas disponíveis: ${Array.from(this.pages.keys()).join(', ')}</p>
        </div>
      `;
      return;
    }
    
    pageContent.innerHTML = '<div class="loading-state">Carregando...</div>';

    try {
      console.log('PageManager: Chamando component.load() para', name);
      const page = await component.load(...params);
      
      if (!page || typeof page !== 'string') {
        throw new Error('Component.load() não retornou uma string válida');
      }
      
      console.log('PageManager: HTML recebido, atualizando DOM');
      pageContent.innerHTML = page;
      
      // Atualizar título
      const title = component.title || name;
      const pageTitleEl = document.getElementById('page-title');
      if (pageTitleEl) {
        pageTitleEl.textContent = title;
      }
      
      // Executar script da página se existir
      if (component.onLoad) {
        console.log('PageManager: Executando onLoad() para', name);
        await component.onLoad(...params);
      }

      this.currentPage = component;
      console.log('PageManager: Página carregada com sucesso', name);
    } catch (error) {
      console.error('PageManager: Erro ao carregar página:', error);
      pageContent.innerHTML = `
        <div class="error-state">
          <h3>❌ Erro ao carregar página</h3>
          <p><strong>${error.message}</strong></p>
          <pre style="font-size:12px;margin-top:10px;background:#f5f5f5;padding:10px;border-radius:4px;overflow:auto">${error.stack || error.toString()}</pre>
        </div>
      `;
    }
  }
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES
// ============================================
class NotificationManager {
  constructor() {
    this.notifications = [];
    this.badge = document.getElementById('notif-badge');
    this.panel = document.getElementById('notifications-panel');
    this.list = document.getElementById('notifications-list');
    this.init();
  }

  init() {
    document.getElementById('btn-notifications').addEventListener('click', () => {
      this.togglePanel();
    });

    document.getElementById('close-notifications').addEventListener('click', () => {
      this.hidePanel();
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!this.panel.contains(e.target) && 
          !document.getElementById('btn-notifications').contains(e.target)) {
        this.hidePanel();
      }
    });
  }

  add(notification) {
    this.notifications.unshift(notification);
    this.updateBadge();
    this.render();
  }

  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.updateBadge();
    this.render();
  }

  clear() {
    this.notifications = [];
    this.updateBadge();
    this.render();
  }

  updateBadge() {
    const count = this.notifications.length;
    if (count > 0) {
      this.badge.textContent = count > 9 ? '9+' : count;
      this.badge.style.display = 'flex';
    } else {
      this.badge.style.display = 'none';
    }
  }

  render() {
    if (this.notifications.length === 0) {
      this.list.innerHTML = '<p style="text-align:center;padding:20px;color:var(--text-muted)">✅ Nenhuma notificação</p>';
      return;
    }

    this.list.innerHTML = this.notifications.map(n => `
      <div class="notification-item ${n.type}" data-id="${n.id}">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <span style="font-size:20px">${n.icon || '🔔'}</span>
          <div style="flex:1">
            <strong style="display:block;font-size:13px;margin-bottom:4px">${n.title}</strong>
            <p style="margin:0;font-size:12px;color:var(--text-muted)">${n.message}</p>
            ${n.link ? `<a href="#" data-route="${n.link}" style="display:inline-block;margin-top:8px;font-size:11px;color:var(--primary)">Ver mais →</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Adicionar event listeners aos links
    this.list.querySelectorAll('a[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        router.navigate(route);
        this.hidePanel();
      });
    });
  }

  togglePanel() {
    this.panel.classList.toggle('show');
  }

  hidePanel() {
    this.panel.classList.remove('show');
  }

  async loadNotifications() {
    try {
      // Carregar notificações do servidor
      const token = window.Utils.getAuthToken();
      
      // Verificar produtos com estoque baixo
      const produtosRes = await fetch(`${API_BASE}/produtos`, {
        headers: window.Utils.getAuthHeaders()
      });
      
      if (produtosRes.ok) {
        const produtos = await produtosRes.json();
        const baixoEstoque = produtos.filter(p => p.quantidade <= (p.minimo || 5));
        
        baixoEstoque.forEach(p => {
          this.add({
            id: `estoque-${p._id}`,
            type: 'warning',
            icon: '⚠️',
            title: 'Estoque Baixo',
            message: `${p.nome} - apenas ${p.quantidade} un.`,
            link: 'produtos'
          });
        });
      }

      // Verificar solicitações pendentes (se admin)
      if (window.Utils.isAdmin()) {
        const solRes = await fetch(`${API_BASE}/solicitacoes`, {
          headers: window.Utils.getAuthHeaders()
        });
        
        if (solRes.ok) {
          const solicitacoes = await solRes.json();
          const pendentes = solicitacoes.filter(s => s.status === 'pendente');
          
          if (pendentes.length > 0) {
            this.add({
              id: 'solicitacoes-pendentes',
              type: 'info',
              icon: '📋',
              title: 'Solicitações Pendentes',
              message: `${pendentes.length} solicitação(ões) aguardando aprovação`,
              link: 'solicitacoes'
            });
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
  }
}

// ============================================
// SISTEMA DE TOAST
// ============================================
class ToastManager {
  constructor() {
    this.container = document.getElementById('toast-container');
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    this.container.appendChild(toast);

    // Auto remover
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'toastOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }

  success(message, duration) {
    this.show(message, 'success', duration);
  }

  error(message, duration) {
    this.show(message, 'error', duration);
  }

  warning(message, duration) {
    this.show(message, 'warning', duration);
  }

  info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// ============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================
// Exportar Utils IMEDIATAMENTE para uso global
window.Utils = Utils;

let router = null;
let pageManager = null;
let notificationManager = null;
let toastManager = null;

async function initApp() {
  try {
    // Verificar autenticação
    const token = Utils.getAuthToken();
    if (!token) {
      window.location.href = '/index.html';
      return;
    }

  // Inicializar managers
  router = new Router();
  window.router = router; // Expor globalmente
  pageManager = new PageManager();
  window.pageManager = pageManager; // Expor globalmente
  notificationManager = new NotificationManager();
  toastManager = new ToastManager();

  // Configurar sidebar
  setupSidebar();

  // Configurar tema
  setupTheme();

  // Configurar menu de navegação
  await setupNavigation();

  // Carregar notificações
  await notificationManager.loadNotifications();
  setInterval(() => notificationManager.loadNotifications(), 60000);

  // Carregar componentes de páginas
  await loadPageComponents();

    // Ocultar loading e mostrar app
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      const app = document.getElementById('app');
      if (loadingScreen) loadingScreen.classList.add('hidden');
      if (app) app.style.display = 'flex';
    }, 100);
  } catch (error) {
    console.error('Erro ao inicializar aplicação:', error);
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.innerHTML = `
        <div class="loading-spinner">
          <div style="color: #ef4444; font-size: 48px; margin-bottom: 20px">❌</div>
          <h3 style="color: white; margin-bottom: 10px">Erro ao carregar aplicação</h3>
          <p style="color: rgba(255,255,255,0.8)">${error.message}</p>
          <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: white; color: #0d9488; border: none; border-radius: 8px; cursor: pointer; font-weight: 600">
            Tentar Novamente
          </button>
        </div>
      `;
    }
  }
}

function setupSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

  // Carregar estado salvo
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (sidebarCollapsed) {
    sidebar.classList.add('collapsed');
    if (sidebarToggle) {
      sidebarToggle.textContent = '▶';
      sidebarToggle.title = 'Expandir menu';
    }
  }

  sidebarToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCollapsed = sidebar.classList.contains('collapsed');
    
    if (isCollapsed) {
      // Expandir
      sidebar.classList.remove('collapsed');
      sidebarToggle.textContent = '◀';
      sidebarToggle.title = 'Recolher menu';
      localStorage.setItem('sidebarCollapsed', 'false');
    } else {
      // Recolher
      sidebar.classList.add('collapsed');
      sidebarToggle.textContent = '▶';
      sidebarToggle.title = 'Expandir menu';
      localStorage.setItem('sidebarCollapsed', 'true');
    }
  });

  mobileMenuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  // Fechar sidebar ao clicar em link no mobile
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('show');
      }
    });
  });
}

function setupTheme() {
  const btnTheme = document.getElementById('btn-theme');
  const savedTheme = localStorage.getItem('theme') || '';
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    btnTheme.textContent = '☀️';
  }

  btnTheme.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', '');
      btnTheme.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btnTheme.textContent = '☀️';
    }
  });
}

async function setupNavigation() {
  const token = Utils.getAuthToken();
  const isAdmin = window.Utils.isAdmin();
  
  // Atualizar informações do usuário
  const userName = localStorage.getItem('admin_name') || 'Usuário';
  const userRole = localStorage.getItem('admin_role') || 'operador';
  
  document.getElementById('user-name').textContent = userName;
  document.getElementById('user-role').textContent = isAdmin ? 'Administrador' : 'Operador';
  document.getElementById('user-initial').textContent = userName.charAt(0).toUpperCase();

  // Configurar logout
  document.getElementById('btn-logout').addEventListener('click', () => {
    if (confirm('Deseja realmente sair?')) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_name');
      localStorage.removeItem('admin_role');
      window.location.href = '/index.html';
    }
  });

  // Carregar menu
  try {
    const res = await fetch(`${API_BASE}/admin/pages`, {
      headers: Utils.getAuthHeaders()
    });
    
    if (res.ok) {
      const data = await res.json();
      const pages = data.pages || [];
      
      const mainPages = pages.filter(p => 
        ['dashboard', 'clientes', 'pedidos', 'orcamentos'].includes(p.id)
      );
      
      const adminPages = pages.filter(p => 
        ['produtos', 'categorias', 'estoque', 'fornecedores', 'contas', 
         'relatorio', 'solicitacoes', 'notas-fiscais', 'config-empresa', 
         'config-nfe', 'usuarios', 'config'].includes(p.id)
      );
      
      console.log('Menu: Páginas admin encontradas:', adminPages.map(p => p.id));
      console.log('Menu: config-nfe está na lista?', adminPages.some(p => p.id === 'config-nfe'));

      const navMenu = document.getElementById('sidebar-nav');
      
      // Menu principal
      navMenu.innerHTML = mainPages.map(p => `
        <a href="#" data-route="${p.id}" class="nav-item">
          <span class="nav-icon">${getPageIcon(p.id)}</span>
          <span class="nav-text">
            <span class="nav-title">${p.title}</span>
            <span class="nav-description">${getPageDescription(p.id)}</span>
          </span>
        </a>
      `).join('');

      // Menu admin
      if (isAdmin && adminPages.length > 0) {
        navMenu.innerHTML += `
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
            <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;padding:0 12px;display:flex;align-items:center;gap:6px">
              <span>👑</span>
              <span>Área Administrativa</span>
            </div>
            ${adminPages.map(p => `
              <a href="#" data-route="${p.id}" class="nav-item">
                <span class="nav-icon">${getPageIcon(p.id)}</span>
                <span class="nav-text">
                  <span class="nav-title">${p.title}</span>
                  <span class="nav-description">${getPageDescription(p.id)}</span>
                </span>
              </a>
            `).join('')}
          </div>
        `;
      }

      // Adicionar event listeners usando event delegation
      navMenu.addEventListener('click', (e) => {
        const item = e.target.closest('a[data-route]');
        if (!item) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const route = item.getAttribute('data-route');
        if (!route) return;
        
        console.log('Menu: Clique detectado em rota', route);
        
        // Atualizar active state
        navMenu.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Navegar usando router
        if (window.router) {
          console.log('Menu: Navegando para', route);
          window.router.navigate(route);
        } else {
          console.warn('Menu: Router não disponível, usando hash');
          window.location.hash = route;
        }
      });
    }
  } catch (error) {
    console.error('Erro ao carregar menu:', error);
  }
}

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
    'config-nfe': '📄',
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
    'config-nfe': 'Configure emissão de NF-e',
    'usuarios': 'Gerencie usuários do sistema',
    'config': 'Configurações da sua conta'
  };
  return descriptions[id] || '';
}

async function loadPageComponents() {
  // Carregar componentes dinamicamente
  const components = [
    'dashboard',
    'clientes',
    'produtos',
    'pedidos',
    'orcamentos',
    'fornecedores',
    'categorias',
    'estoque',
    'contas',
    'solicitacoes',
    'notas-fiscais',
    'relatorio',
    'config',
    'config-empresa',
    'config-nfe',
    'usuarios'
  ];

  for (const component of components) {
    try {
      const module = await import(`/js/pages/${component}.js`);
      const pageComponent = module.default;
      pageManager.register(component, pageComponent);
      
      // Expor instâncias das páginas para uso global
      if (component === 'clientes') {
        window.clientesPage = pageComponent;
      } else if (component === 'produtos') {
        window.produtosPage = pageComponent;
      } else if (component === 'pedidos') {
        window.pedidosPage = pageComponent;
      } else if (component === 'orcamentos') {
        window.orcamentosPage = pageComponent;
      } else if (component === 'notas-fiscais') {
        window.notasFiscaisPage = pageComponent;
      }
      
      // Registrar rota
      router.route(component, async (...params) => {
        console.log('Router handler: Carregando', component);
        await pageManager.load(component, ...params);
      });
    } catch (error) {
      console.error(`Erro ao carregar componente ${component}:`, error);
    }
  }

  // Navegar para a rota atual (ou dashboard se não houver hash)
  const currentHash = window.location.hash.slice(1) || 'dashboard';
  console.log('loadPageComponents: Hash atual:', currentHash);
  console.log('loadPageComponents: Rotas registradas:', Array.from(router.routes.keys()));
  
  // Navegar para a rota após carregar componentes
  setTimeout(() => {
    router.isNavigating = false; // Reset flag
    
    if (router.routes.has(currentHash)) {
      console.log('loadPageComponents: Navegando para rota existente:', currentHash);
      router.handleRoute();
    } else {
      // Se a rota não existe, tentar navegar (vai mostrar erro se não existir)
      console.log('loadPageComponents: Rota não encontrada, tentando navegar:', currentHash);
      router.handleRoute();
    }
  }, 200);
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

