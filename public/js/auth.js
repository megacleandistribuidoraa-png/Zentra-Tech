// ============================================
// SISTEMA DE AUTENTICAÇÃO CENTRALIZADO
// ============================================

// Configuração da API - usa window.API_BASE_URL se disponível (definido em config.js)
const API_BASE = (window.API_BASE_URL || '/api').replace(/\/$/, ''); // Remove trailing slash

const auth = {
  // Verificar se está autenticado (verificação simples e direta)
  isAuthenticated() {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    if (!token || typeof token !== 'string' || token.trim() === '' || token === 'null' || token === 'undefined') {
      return false;
    }
    return token.length > 0;
  },

  // Validar token com API (verificação completa)
  async validateToken() {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
    if (!token || typeof token !== 'string' || token.trim() === '' || token === 'null' || token === 'undefined') {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(`${API_BASE}/admin/me`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          this.logout();
          return false;
        }
        return false;
      }

      const userData = await res.json();
      if (userData.name) {
        localStorage.setItem('admin_name', userData.name);
      }
      
      return true;
    } catch (error) {
      console.warn('auth.validateToken: Erro ao validar token:', error);
      return false;
    }
  },

  // Fazer logout
  logout() {
    console.log('auth.logout: Iniciando logout...');
    
    // Limpar TODOS os dados
    localStorage.clear();
    sessionStorage.clear();
    
    // Resetar estado
    if (window.router) {
      window.router.currentRoute = null;
      window.router.isNavigating = false;
    }
    
    if (window.pageManager) {
      window.pageManager.currentPage = null;
      window.pageManager.loadingPage = null;
    }
    
    // Limpar gráficos
    if (window.chartVendas) {
      try {
        window.chartVendas.destroy();
      } catch (e) {}
      window.chartVendas = null;
    }
    
    console.log('auth.logout: Dados limpos, redirecionando...');
    window.location.replace('/index.html');
  },

  // Redirecionar para login
  redirectToLogin() {
    this.logout();
  }
};

// Exportar globalmente
window.auth = auth;
