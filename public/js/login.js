// ============================================
// LÓGICA DE LOGIN
// ============================================

(function() {
  'use strict';

  const form = document.getElementById('login-form');
  const errorDiv = document.getElementById('error');
  const errorText = document.getElementById('error-text');
  const btnLogin = document.getElementById('btn-login');

  if (!form || !errorDiv || !errorText || !btnLogin) {
    console.error('login.js: Elementos do formulário não encontrados');
    return;
  }

  // Verificar se já está logado
  const existingToken = localStorage.getItem('admin_token');
  if (existingToken && existingToken.trim() !== '' && existingToken !== 'null' && existingToken !== 'undefined') {
    window.location.href = '/dashboard.html';
    return;
  }

  // Handler de submit do formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    errorDiv.classList.remove('show');
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
      errorText.textContent = 'Preencha usuário e senha.';
      errorDiv.classList.add('show');
      return;
    }

    try {
      btnLogin.disabled = true;
      btnLogin.innerHTML = '<span>Entrando...</span>';

      const apiBase = window.API_BASE_URL || '/api';
      const res = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const json = await res.json();

      if (!res.ok) {
        errorText.textContent = json.error || 'Login falhou';
        errorDiv.classList.add('show');
        btnLogin.disabled = false;
        btnLogin.innerHTML = '<span>Entrar</span><span>→</span>';
        return;
      }

      // Salvar token, nome e role
      localStorage.setItem('admin_token', json.token);
      localStorage.setItem('admin_name', json.name || json.username || 'Admin');
      localStorage.setItem('admin_role', json.role || 'admin');
      
      btnLogin.innerHTML = '<span>✓ Sucesso!</span>';
      
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 500);

    } catch (e) {
      errorText.textContent = 'Erro de conexão com o servidor';
      errorDiv.classList.add('show');
      btnLogin.disabled = false;
      btnLogin.innerHTML = '<span>Entrar</span><span>→</span>';
    }
  });

  // Enter para submeter
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
      }
    });
  }

  // Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
})();
