// ============================================
// PÁGINA: CONFIGURAÇÕES
// ============================================

export default {
  title: 'Configurações',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>⚙️ Configurações</h2>
            <p>Gerencie suas configurações pessoais</p>
          </div>
        </div>

        <!-- Perfil do usuário -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:24px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #f0f3f7">
            <div class="card-icon green" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--primary-light);color:var(--primary)">👤</div>
            <div>
              <h3 class="card-title" style="margin:0;font-size:18px;font-weight:700">Perfil do usuário</h3>
              <p class="card-subtitle" style="margin:4px 0 0;font-size:13px;color:var(--muted)">Informações da sua conta</p>
            </div>
          </div>

          <div class="profile-header" style="display:flex;align-items:center;gap:20px;margin-bottom:24px">
            <div class="profile-avatar" id="user-avatar" style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg, #0aa04e 0%, #059669 100%);display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;font-weight:700">?</div>
            <div class="profile-info">
              <h2 id="user-name" style="margin:0;font-size:22px">Carregando...</h2>
              <p id="user-username" style="margin:4px 0 0;color:var(--muted);font-size:14px">@username</p>
              <span class="badge" id="user-role" style="display:inline-flex;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-top:8px;background:var(--primary-light);color:var(--primary)">—</span>
            </div>
          </div>
        </div>

        <!-- Alterar Nome -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:24px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #f0f3f7">
            <div class="card-icon blue" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--info-light);color:var(--info)">✏️</div>
            <div>
              <h3 class="card-title" style="margin:0;font-size:18px;font-weight:700">Alterar Nome</h3>
              <p class="card-subtitle" style="margin:4px 0 0;font-size:13px;color:var(--muted)">Atualize seu nome de exibição</p>
            </div>
          </div>

          <form id="form-nome">
            <div class="form-group" style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Novo nome</label>
              <input type="text" id="novo-nome" placeholder="Seu nome completo" required style="width:100%;padding:14px 16px;border:2px solid #e6e9ef;border-radius:10px;font-size:15px;transition:all .2s;background:#f8fafc" />
            </div>
            <button type="submit" class="btn btn-primary" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;border-radius:10px;border:none;cursor:pointer;font-weight:600;font-size:15px;background:linear-gradient(135deg, #0aa04e 0%, #059669 100%);color:#fff;box-shadow:0 4px 14px rgba(10,160,78,0.2)">💾 Salvar Nome</button>
          </form>
        </div>

        <!-- Alterar Senha -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:24px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #f0f3f7">
            <div class="card-icon red" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--danger-light);color:var(--danger)">🔒</div>
            <div>
              <h3 class="card-title" style="margin:0;font-size:18px;font-weight:700">Alterar Senha</h3>
              <p class="card-subtitle" style="margin:4px 0 0;font-size:13px;color:var(--muted)">Mude sua senha de acesso</p>
            </div>
          </div>

          <div class="alert warning" style="padding:14px 18px;border-radius:10px;margin-bottom:20px;display:flex;align-items:flex-start;gap:12px;background:var(--warning-light);border:2px solid #fde68a">
            <span class="icon" style="font-size:20px;flex-shrink:0;color:var(--warning)">⚠️</span>
            <div class="text" style="flex:1">
              <strong style="display:block;margin-bottom:2px;color:#92400e">Atenção!</strong>
              <p style="margin:0;font-size:13px;color:#92400e">Após alterar a senha, você será desconectado e precisará fazer login novamente.</p>
            </div>
          </div>

          <form id="form-senha">
            <div class="form-group" style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Senha atual</label>
              <input type="password" id="senha-atual" placeholder="Digite sua senha atual" required style="width:100%;padding:14px 16px;border:2px solid #e6e9ef;border-radius:10px;font-size:15px;transition:all .2s;background:#f8fafc" />
            </div>
            <div class="form-group" style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Nova senha</label>
              <input type="password" id="nova-senha" placeholder="Mínimo 6 caracteres" required style="width:100%;padding:14px 16px;border:2px solid #e6e9ef;border-radius:10px;font-size:15px;transition:all .2s;background:#f8fafc" />
              <div class="hint" style="font-size:12px;color:var(--muted);margin-top:6px">A senha deve ter pelo menos 6 caracteres</div>
            </div>
            <div class="form-group" style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Confirmar nova senha</label>
              <input type="password" id="confirmar-senha" placeholder="Digite a nova senha novamente" required style="width:100%;padding:14px 16px;border:2px solid #e6e9ef;border-radius:10px;font-size:15px;transition:all .2s;background:#f8fafc" />
            </div>
            <button type="submit" class="btn btn-danger" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;border-radius:10px;border:none;cursor:pointer;font-weight:600;font-size:15px;background:var(--danger);color:#fff">🔒 Alterar Senha</button>
          </form>
        </div>

        <!-- Informações da Conta -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:24px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #f0f3f7">
            <div class="card-icon blue" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--info-light);color:var(--info)">ℹ️</div>
            <div>
              <h3 class="card-title" style="margin:0;font-size:18px;font-weight:700">Informações da Conta</h3>
              <p class="card-subtitle" style="margin:4px 0 0;font-size:13px;color:var(--muted)">Dados que não podem ser alterados</p>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:20px">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Nome de usuário (login)</label>
            <input type="text" id="info-username" disabled style="width:100%;padding:14px 16px;border:2px solid #e6e9ef;border-radius:10px;font-size:15px;transition:all .2s;background:#f0f3f7;color:#9ca3af" />
            <div class="hint" style="font-size:12px;color:var(--muted);margin-top:6px">O nome de usuário não pode ser alterado</div>
          </div>

          <div class="form-group" style="margin-bottom:20px">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Tipo de conta</label>
            <input type="text" id="info-role" disabled style="width:100%;padding:14px 16px;border:2px solid #e6e9ef;border-radius:10px;font-size:15px;transition:all .2s;background:#f0f3f7;color:#9ca3af" />
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.usuario = null;
    
    if (!this.getToken()) {
      window.location.href = '/index.html';
      return;
    }
    
    await this.carregarUsuario();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  },

  async carregarUsuario() {
    try {
      const res = await fetch('/api/admin/me', {
        headers: { 'x-auth-token': this.getToken() }
      });

      if (!res.ok) {
        window.location.href = '/index.html';
        return;
      }

      this.usuario = await res.json();
      this.renderizarPerfil();
    } catch (e) {
      console.error(e);
      window.location.href = '/index.html';
    }
  },

  renderizarPerfil() {
    document.getElementById('user-avatar').textContent = this.getInitials(this.usuario.name);
    document.getElementById('user-name').textContent = this.usuario.name;
    document.getElementById('user-username').textContent = '@' + this.usuario.username;
    
    const roleEl = document.getElementById('user-role');
    if (this.usuario.role === 'admin') {
      roleEl.textContent = '👑 Administrador';
      roleEl.style.background = '#f5f3ff';
      roleEl.style.color = '#8b5cf6';
    } else {
      roleEl.textContent = '👤 Operador';
      roleEl.style.background = 'var(--info-light)';
      roleEl.style.color = 'var(--info)';
    }

    document.getElementById('novo-nome').value = this.usuario.name;
    document.getElementById('info-username').value = this.usuario.username;
    document.getElementById('info-role').value = this.usuario.role === 'admin' ? 'Administrador' : 'Operador';
  },

  setupEventListeners() {
    document.getElementById('form-nome')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const novoNome = document.getElementById('novo-nome').value.trim();

      if (!novoNome) {
        if (window.toastManager) window.toastManager.error('Digite um nome válido');
        return;
      }

      try {
        const res = await fetch('/api/usuarios/me', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': this.getToken()
          },
          body: JSON.stringify({ nome: novoNome })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao salvar');
        }

        localStorage.setItem('admin_name', novoNome);

        if (window.toastManager) window.toastManager.success('✅ Nome atualizado com sucesso!');
        await this.carregarUsuario();
      } catch (e) {
        if (window.toastManager) window.toastManager.error(e.message);
      }
    });

    document.getElementById('form-senha')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const senhaAtual = document.getElementById('senha-atual').value;
      const novaSenha = document.getElementById('nova-senha').value;
      const confirmarSenha = document.getElementById('confirmar-senha').value;

      if (!senhaAtual || !novaSenha || !confirmarSenha) {
        if (window.toastManager) window.toastManager.error('Preencha todos os campos');
        return;
      }

      if (novaSenha.length < 6) {
        if (window.toastManager) window.toastManager.error('A nova senha deve ter pelo menos 6 caracteres');
        return;
      }

      if (novaSenha !== confirmarSenha) {
        if (window.toastManager) window.toastManager.error('As senhas não coincidem');
        return;
      }

      try {
        const res = await fetch('/api/usuarios/me', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': this.getToken()
          },
          body: JSON.stringify({ senhaAtual, novaSenha })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao alterar senha');
        }

        if (window.toastManager) window.toastManager.success('✅ Senha alterada! Fazendo logout...');

        document.getElementById('form-senha').reset();

        setTimeout(() => {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_name');
          window.location.href = '/index.html';
        }, 2000);
      } catch (e) {
        if (window.toastManager) window.toastManager.error(e.message);
      }
    });
  }
};
