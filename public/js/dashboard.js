// ============================================
// DASHBOARD - SISTEMA PRINCIPAL (SEM SIDEBAR)
// ============================================

// Configuração da API - usa window.API_BASE_URL se disponível (definido em config.js)
const API_BASE = (window.API_BASE_URL || '/api').replace(/\/$/, ''); // Remove trailing slash
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
    return localStorage.getItem('admin_token') || localStorage.getItem('token');
  },

  // Obter URL completa da API
  getApiUrl(path = '') {
    const base = API_BASE;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${cleanPath}`;
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
    this.publicRoutes = new Set(['login']);
    this.init();
  }

  init() {
    // Interceptar cliques em links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (!link) return;
      if (e.defaultPrevented) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const route = link.getAttribute('data-route');
      if (!route) return;
      
      this.navigate(route);
    });

    // Interceptar navegação do browser
    window.addEventListener('popstate', async () => {
      await this.handleRoute();
    });
    
    // Interceptar mudanças no hash
    window.addEventListener('hashchange', async () => {
      await this.handleRoute();
    });
  }

  route(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path, replace = false) {
    const currentHash = window.location.hash.slice(1);
    
    if (currentHash === path && this.currentRoute === path) {
      return;
    }
    
    this.isNavigating = true;
    
    try {
      if (replace) {
        window.history.replaceState({}, '', `#${path}`);
      } else {
        window.history.pushState({}, '', `#${path}`);
      }
      
      this.handleRoute().catch(err => {
        console.error('Erro ao navegar:', err);
        if (window.auth) {
          window.auth.logout();
        }
      });
      
      setTimeout(() => {
        this.isNavigating = false;
      }, 100);
    } catch (error) {
      console.error('Router: Erro ao navegar', error);
      this.isNavigating = false;
    }
  }

  async handleRoute() {
    // BLOQUEAR TUDO SE NÃO HOUVER TOKEN
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    if (!token || typeof token !== 'string' || token.trim() === '' || token === 'null' || token === 'undefined') {
      console.error('Router BLOCK: Token não encontrado');
      if (window.auth) {
        window.auth.logout();
      }
      return;
    }
    
    // Validação completa com API
    if (window.auth) {
      const isValid = await window.auth.validateToken();
      if (!isValid) {
        console.error('Router BLOCK: Token inválido');
        window.auth.logout();
        return;
      }
    }
    
    // Só processar rotas se estiver autenticado E token válido
    const hash = window.location.hash.slice(1);
    if (!hash) {
      console.log('Router: Sem hash, navegando para dashboard');
      this.navigate('dashboard', true);
      return;
    }
    
    const [path, ...params] = hash.split('/');
    
    // Evitar processamento duplicado
    if (this._processingRoute === path) {
      return;
    }
    
    if (this.currentRoute === path && !this.isNavigating) {
      return;
    }
    
    // Verificar autenticação para rotas privadas
    const isPublicRoute = this.publicRoutes.has(path);
    if (!isPublicRoute) {
      if (window.auth && !window.auth.isAuthenticated()) {
        window.auth.logout();
        return;
      }
      if (window.auth) {
        const isValid = await window.auth.validateToken();
        if (!isValid) {
          window.auth.logout();
          return;
        }
      }
    }
    
    // Se a rota não existe, mostrar erro
    if (!this.routes.has(path)) {
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
      this._processingRoute = null;
      return;
    }
    
    const handler = this.routes.get(path);
    
    if (handler) {
      this.currentRoute = path;
      this._processingRoute = path;
      
      Promise.resolve(handler(path, ...params)).finally(() => {
        setTimeout(() => {
          this._processingRoute = null;
        }, 100);
      });
    } else {
      this._processingRoute = null;
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
    this.loadingPage = null;
  }

  register(name, component) {
    this.pages.set(name, component);
  }

  async load(name, ...params) {
    if (this.loadingPage === name) {
      return;
    }
    
    this.loadingPage = name;
    
    const pageContent = document.getElementById('page-content');
    if (!pageContent) {
      this.loadingPage = null;
      return;
    }
    
    // Cleanup da página atual
    if (this.currentPage) {
      if (this.currentPage._intervals) {
        this.currentPage._intervals.forEach(id => clearInterval(id));
        this.currentPage._intervals = [];
      }
      
      if (this.currentPage._timeouts) {
        this.currentPage._timeouts.forEach(id => clearTimeout(id));
        this.currentPage._timeouts = [];
      }
      
      if (window.chartVendas) {
        try {
          window.chartVendas.destroy();
        } catch (e) {}
        window.chartVendas = null;
      }
      
      if (this.currentPage.onUnload) {
        try {
          this.currentPage.onUnload();
        } catch (e) {
          console.error('Erro ao descarregar página atual:', e);
        }
      }
    }

    const component = this.pages.get(name);
    if (!component) {
      pageContent.innerHTML = `
        <div class="error-state">
          <h3>❌ Página não encontrada</h3>
          <p>A página "${name}" não foi encontrada.</p>
        </div>
      `;
      return;
    }
    
    pageContent.innerHTML = '<div class="loading-state">Carregando...</div>';

    try {
      const page = await component.load(...params);
      
      if (!page || typeof page !== 'string') {
        throw new Error('Component.load() não retornou uma string válida');
      }
      
      pageContent.innerHTML = page;
      
      const title = component.title || name;
      const pageTitleEl = document.getElementById('page-title');
      if (pageTitleEl) {
        pageTitleEl.textContent = title;
      }
      
      if (component.onLoad) {
        await component.onLoad(...params);
      }

      this.currentPage = component;
      this.currentPage._intervals = [];
      this.currentPage._timeouts = [];
      this.loadingPage = null;
    } catch (error) {
      console.error('PageManager: Erro ao carregar página:', error);
      pageContent.innerHTML = `
        <div class="error-state">
          <h3>❌ Erro ao carregar página</h3>
          <p><strong>${error.message}</strong></p>
        </div>
      `;
      this.loadingPage = null;
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
    const btnNotifications = document.getElementById('btn-notifications');
    const closeNotifications = document.getElementById('close-notifications');
    
    if (btnNotifications) {
      btnNotifications.addEventListener('click', () => {
        this.togglePanel();
      });
    }

    if (closeNotifications) {
      closeNotifications.addEventListener('click', () => {
        this.hidePanel();
      });
    }

    document.addEventListener('click', (e) => {
      if (this.panel && btnNotifications && 
          !this.panel.contains(e.target) && 
          !btnNotifications.contains(e.target)) {
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
    if (this.badge) {
      if (count > 0) {
        this.badge.textContent = count > 9 ? '9+' : count;
        this.badge.style.display = 'flex';
      } else {
        this.badge.style.display = 'none';
      }
    }
  }

  render() {
    if (!this.list) return;
    
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

    this.list.querySelectorAll('a[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        if (window.router) {
          window.router.navigate(route);
        }
        this.hidePanel();
      });
    });
  }

  togglePanel() {
    if (this.panel) {
      this.panel.classList.toggle('show');
    }
  }

  hidePanel() {
    if (this.panel) {
      this.panel.classList.remove('show');
    }
  }

  async loadNotifications() {
    try {
      const produtosRes = await fetch(`${API_BASE}/produtos`, {
        headers: Utils.getAuthHeaders()
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

      if (Utils.isAdmin()) {
        const solRes = await fetch(`${API_BASE}/solicitacoes`, {
          headers: Utils.getAuthHeaders()
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
    if (!this.container) return;
    
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
// INICIALIZAÇÃO
// ============================================
window.Utils = Utils;

window.logout = function() {
  if (window.auth && window.auth.logout) {
    window.auth.logout();
  } else {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/index.html');
  }
};

let router = null;
let pageManager = null;
let notificationManager = null;
let toastManager = null;

async function initDashboard() {
  try {
    // BLOQUEAR TUDO SE NÃO HOUVER TOKEN
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    if (!token || typeof token !== 'string' || token.trim() === '' || token === 'null' || token === 'undefined') {
      console.error('initDashboard BLOCK: Token não encontrado');
      if (window.auth) {
        window.auth.logout();
      } else {
        window.location.replace('/index.html');
      }
      return;
    }

    // Validação completa com API
    if (window.auth) {
      const isValid = await window.auth.validateToken();
      if (!isValid) {
        console.error('initDashboard BLOCK: Token inválido');
        window.auth.logout();
        return;
      }
    }

    console.log('initDashboard: Token válido, inicializando sistema');

    // Inicializar managers
    router = new Router();
    window.router = router;
    pageManager = new PageManager();
    window.pageManager = pageManager;
    notificationManager = new NotificationManager();
    toastManager = new ToastManager();
    window.toastManager = toastManager;

    // CRIAR BOTÃO "SAIR" NA TOPBAR
    const createLogoutButton = () => {
      const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Deseja realmente sair do sistema?')) {
          if (window.auth) {
            window.auth.logout();
          } else {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('/index.html');
          }
        }
      };

      let btnLogoutTopbar = document.getElementById('btn-logout-topbar');
      if (!btnLogoutTopbar) {
        const topbarRight = document.querySelector('.topbar-right');
        if (topbarRight) {
          btnLogoutTopbar = document.createElement('button');
          btnLogoutTopbar.id = 'btn-logout-topbar';
          btnLogoutTopbar.className = 'btn-icon btn-logout-topbar';
          btnLogoutTopbar.title = 'Sair';
          btnLogoutTopbar.textContent = '🚪';
          topbarRight.insertBefore(btnLogoutTopbar, topbarRight.firstChild);
        }
      }
      if (btnLogoutTopbar) {
        btnLogoutTopbar.onclick = handleLogout;
        btnLogoutTopbar.style.display = 'flex';
        btnLogoutTopbar.style.visibility = 'visible';
        btnLogoutTopbar.style.opacity = '1';
      }
    };

    createLogoutButton();

    // Configurar tema
    const btnTheme = document.getElementById('btn-theme');
    if (btnTheme) {
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
    console.error('Erro ao inicializar dashboard:', error);
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.innerHTML = `
        <div class="loading-spinner">
          <div style="color: #ef4444; font-size: 48px; margin-bottom: 20px">❌</div>
          <h3 style="color: white; margin-bottom: 10px">Erro ao carregar sistema</h3>
          <p style="color: rgba(255,255,255,0.8)">${error.message}</p>
          <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: white; color: #0d9488; border: none; border-radius: 8px; cursor: pointer; font-weight: 600">
            Tentar Novamente
          </button>
        </div>
      `;
    }
  }
}

async function loadPageComponents() {
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
      
      router.route(component, async (...params) => {
        await pageManager.load(component, ...params);
      });
    } catch (error) {
      console.error(`Erro ao carregar componente ${component}:`, error);
    }
  }

  // Verificar token antes de navegar
  const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
  if (!token || typeof token !== 'string' || token.trim() === '' || token === 'null' || token === 'undefined') {
    console.error('loadPageComponents BLOCK: Token não encontrado');
    if (window.auth) {
      window.auth.logout();
    } else {
      window.location.replace('/index.html');
    }
    return;
  }
  
  if (window.auth) {
    const isValid = await window.auth.validateToken();
    if (!isValid) {
      console.error('loadPageComponents BLOCK: Token inválido');
      window.auth.logout();
      return;
    }
  }
  
  const currentHash = window.location.hash.slice(1);
  
  setTimeout(async () => {
    router.isNavigating = false;
    
    const tokenCheck = localStorage.getItem('admin_token') || localStorage.getItem('token');
    if (!tokenCheck || typeof tokenCheck !== 'string' || tokenCheck.trim() === '' || tokenCheck === 'null' || tokenCheck === 'undefined') {
      if (window.auth) {
        window.auth.logout();
      } else {
        window.location.replace('/index.html');
      }
      return;
    }
    
    if (window.auth) {
      const stillValid = await window.auth.validateToken();
      if (!stillValid) {
        window.auth.logout();
        return;
      }
    }
    
    await router.handleRoute();
  }, 200);
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
