// ============================================
// PÁGINA: USUÁRIOS
// ============================================

export default {
  title: 'Usuários',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>👤 Gerenciar Usuários</h2>
            <p>Crie e gerencie os usuários do sistema</p>
          </div>
        </div>

        <!-- Cards de estatísticas -->
        <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:22px">
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon green" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--primary-light);color:var(--primary)">👥</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-total">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Total de usuários</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon purple" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--purple-light);color:var(--purple)">👑</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-admins">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Administradores</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon blue" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--info-light);color:var(--info)">👤</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-operadores">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Operadores</p>
            </div>
          </div>
        </div>

        <div class="grid" style="display:grid;grid-template-columns:420px 1fr;gap:20px;align-items:start">
          <!-- Formulário -->
          <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
            <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
              <h2 class="card-title" id="form-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">➕ Novo Usuário</h2>
            </div>

            <div class="info-box" style="padding:14px 16px;background:var(--info-light);border:2px solid #bfdbfe;border-radius:10px;margin-bottom:16px">
              <h5 style="margin:0 0 8px;font-size:14px;color:var(--info)">ℹ️ Tipos de Usuário</h5>
              <p style="margin:0;font-size:13px;color:#1e40af"><strong>Administrador:</strong> Acesso total ao sistema</p>
              <p style="margin:4px 0 0;font-size:13px;color:#1e40af"><strong>Operador:</strong> Acesso apenas a:</p>
              <ul style="margin:8px 0 0;padding-left:20px;font-size:13px;color:#1e40af">
                <li>Clientes (cadastrar/editar)</li>
                <li>Pedidos (criar/visualizar)</li>
              </ul>
            </div>
            
            <form id="form-usuario" autocomplete="off">
              <input type="hidden" id="usuario-id" />
              
              <div class="form-group" style="margin-bottom:16px">
                <label for="nome" style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Nome completo *</label>
                <input type="text" id="nome" placeholder="Nome do usuário" required style="width:100%;padding:12px 14px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;transition:all .2s;background:#f8fafc" />
              </div>

              <div class="form-group" style="margin-bottom:16px">
                <label for="username" style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Nome de usuário (login) *</label>
                <input type="text" id="username" placeholder="Ex: joao.silva" required style="width:100%;padding:12px 14px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;transition:all .2s;background:#f8fafc" />
              </div>

              <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
                <div class="form-group" style="margin-bottom:16px">
                  <label for="password" style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Senha *</label>
                  <input type="password" id="password" placeholder="Mínimo 6 caracteres" style="width:100%;padding:12px 14px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;transition:all .2s;background:#f8fafc" />
                </div>
                <div class="form-group" style="margin-bottom:16px">
                  <label for="role" style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Tipo de usuário *</label>
                  <select id="role" style="width:100%;padding:12px 14px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;transition:all .2s;background:#f8fafc">
                    <option value="operador">Operador</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="margin-bottom:16px">
                <label for="status" style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Status</label>
                <select id="status" style="width:100%;padding:12px 14px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;transition:all .2s;background:#f8fafc">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              <div id="feedback" class="feedback" style="min-height:20px;margin-top:8px;font-size:13px;font-weight:500"></div>

              <div class="form-actions" style="display:flex;gap:10px;margin-top:20px">
                <button type="submit" class="btn btn-primary" id="btn-salvar" style="flex:1;padding:12px 20px;border-radius:10px;border:none;cursor:pointer;font-weight:600;font-size:14px;background:var(--primary);color:#fff">
                  💾 Salvar Usuário
                </button>
                <button type="button" class="btn btn-ghost" id="btn-limpar" style="padding:12px 20px;border-radius:10px;border:2px solid #e6e9ef;cursor:pointer;font-weight:600;font-size:14px;background:#f8fafc;color:var(--muted)">
                  Limpar
                </button>
              </div>
            </form>
          </div>

          <!-- Lista de usuários -->
          <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
            <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
              <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">📋 Usuários Cadastrados</h2>
            </div>

            <div class="table-container">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <thead>
                  <tr>
                    <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Nome</th>
                    <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Usuário</th>
                    <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Tipo</th>
                    <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Status</th>
                    <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef;width:120px">Ações</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  <tr>
                    <td colspan="5" class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
                      <div class="icon" style="font-size:40px;margin-bottom:10px">👥</div>
                      <p>Carregando...</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de confirmação de exclusão -->
      <div id="modal-delete" class="modal">
        <div class="modal-content" style="max-width:500px">
          <div class="modal-header">
            <h3>⚠️ Excluir Usuário</h3>
            <button class="btn-close" onclick="document.getElementById('modal-delete').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <p>Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.</p>
            <div style="background:#fef2f2;padding:12px;border-radius:8px;margin-bottom:20px">
              <strong style="color:var(--danger)" id="delete-nome">Nome do usuário</strong>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-delete').classList.remove('show')">Cancelar</button>
            <button class="btn btn-danger" id="btn-confirmar-exclusao" style="background:var(--danger);color:#fff">🗑️ Excluir</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.usuarios = [];
    this.editandoId = null;
    this.deletandoId = null;
    
    if (!this.getToken()) {
      window.location.href = '/index.html';
      return;
    }
    
    await this.carregarUsuarios();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  setFeedback(msg, isError = false) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = msg;
    feedback.className = 'feedback ' + (isError ? 'error' : 'success');
    feedback.style.color = isError ? 'var(--danger)' : 'var(--primary)';
    if (!isError) setTimeout(() => feedback.textContent = '', 3000);
  },

  async carregarUsuarios() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/usuarios`, {
        headers: { 'x-auth-token': this.getToken() }
      });
      
      if (!res.ok) {
        if (res.status === 403) {
          if (window.toastManager) window.toastManager.error('Acesso negado. Apenas administradores.');
          setTimeout(() => window.location.href = '/dashboard.html', 2000);
          return;
        }
        throw new Error('Erro ao carregar');
      }
      
      this.usuarios = await res.json();
      this.atualizarEstatisticas();
      this.renderizarTabela();
    } catch (e) {
      console.error(e);
      document.getElementById('table-body').innerHTML = `
        <tr>
          <td colspan="5" class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
            <div class="icon" style="font-size:40px;margin-bottom:10px">❌</div>
            <p>Erro ao carregar usuários</p>
          </td>
        </tr>
      `;
    }
  },

  atualizarEstatisticas() {
    const admins = this.usuarios.filter(u => u.role === 'admin').length;
    const operadores = this.usuarios.filter(u => u.role === 'operador').length;
    
    const elStatTotal = document.getElementById('stat-total');
    const elStatAdmins = document.getElementById('stat-admins');
    const elStatOperadores = document.getElementById('stat-operadores');
    
    if (elStatTotal) elStatTotal.textContent = this.usuarios.length;
    if (elStatAdmins) elStatAdmins.textContent = admins;
    if (elStatOperadores) elStatOperadores.textContent = operadores;
  },

  renderizarTabela() {
    const tbody = document.getElementById('table-body');

    if (this.usuarios.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-state" style="text-align:center;padding:40px 20px;color:var(--muted)">
            <div class="icon" style="font-size:40px;margin-bottom:10px">👥</div>
            <p>Nenhum usuário cadastrado</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.usuarios.map(u => {
      const roleLabel = u.role === 'admin' ? '👑 Admin' : '👤 Operador';
      const roleClass = u.role === 'admin' ? 'admin' : 'operador';
      const statusLabel = u.status === 'ativo' ? '✓ Ativo' : '✕ Inativo';
      const statusClass = u.status === 'ativo' ? 'ativo' : 'inativo';
      const isMainAdmin = u.id === 1;

      return `
        <tr class="${u.status}" style="${u.status === 'inativo' ? 'opacity:0.6' : ''}">
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle"><strong>${(window.Utils || Utils).escapeHtml(u.nome)}</strong></td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle">${(window.Utils || Utils).escapeHtml(u.username)}</td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle"><span class="badge ${roleClass}" style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${roleClass === 'admin' ? 'var(--purple-light)' : 'var(--info-light)'};color:${roleClass === 'admin' ? 'var(--purple)' : 'var(--info)'}">${roleLabel}</span></td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle"><span class="badge ${statusClass}" style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${statusClass === 'ativo' ? 'var(--primary-light)' : 'var(--danger-light)'};color:${statusClass === 'ativo' ? 'var(--primary)' : 'var(--danger)'}">${statusLabel}</span></td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle">
            <button class="btn btn-warning btn-sm" data-action="edit" data-id="${u.id}" title="Editar" style="padding:6px 10px;font-size:12px;background:var(--warning-light);color:#b45309;border:none;border-radius:8px;cursor:pointer;font-weight:600">✏️</button>
            ${!isMainAdmin ? `<button class="btn btn-danger btn-sm" data-action="delete" data-id="${u.id}" title="Excluir" style="padding:6px 10px;font-size:12px;background:var(--danger-light);color:var(--danger);border:none;border-radius:8px;cursor:pointer;font-weight:600">🗑️</button>` : ''}
          </td>
        </tr>
      `;
    }).join('');
  },

  limparFormulario() {
    const formUsuario = document.getElementById('form-usuario');
    const usuarioId = document.getElementById('usuario-id');
    const formTitle = document.getElementById('form-title');
    const btnSalvar = document.getElementById('btn-salvar');
    const password = document.getElementById('password');
    const feedback = document.getElementById('feedback');
    
    if (formUsuario) formUsuario.reset();
    if (usuarioId) usuarioId.value = '';
    if (formTitle) formTitle.innerHTML = '➕ Novo Usuário';
    if (btnSalvar) btnSalvar.innerHTML = '💾 Salvar Usuário';
    if (password) password.placeholder = 'Mínimo 6 caracteres';
    if (feedback) feedback.textContent = '';
    this.editandoId = null;
  },

  editarUsuario(id) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) return;

    this.editandoId = id;
    const usuarioId = document.getElementById('usuario-id');
    const nome = document.getElementById('nome');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const role = document.getElementById('role');
    const status = document.getElementById('status');
    const formTitle = document.getElementById('form-title');
    const btnSalvar = document.getElementById('btn-salvar');
    
    if (usuarioId) usuarioId.value = id;
    if (nome) nome.value = usuario.nome;
    if (username) username.value = usuario.username;
    if (password) {
      password.value = '';
      password.placeholder = 'Deixe em branco para manter';
    }
    if (role) role.value = usuario.role;
    if (status) status.value = usuario.status;
    if (formTitle) formTitle.innerHTML = '✏️ Editar Usuário';
    if (btnSalvar) btnSalvar.innerHTML = '💾 Atualizar Usuário';
    
    document.getElementById('nome').focus();
  },

  abrirModalExclusao(id) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) return;

    this.deletandoId = id;
    const deleteNome = document.getElementById('delete-nome');
    if (deleteNome) deleteNome.textContent = usuario.nome;
    document.getElementById('modal-delete').classList.add('show');
  },

  async confirmarExclusao() {
    if (!this.deletandoId) return;

    try {
      const res = await fetch(`/api/usuarios/${this.deletandoId}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': this.getToken() }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao excluir');
      }

      if (window.toastManager) window.toastManager.success('🗑️ Usuário excluído!');
      document.getElementById('modal-delete').classList.remove('show');
      this.deletandoId = null;
      this.limparFormulario();
      await this.carregarUsuarios();
    } catch (e) {
      if (window.toastManager) window.toastManager.error(e.message);
    }
  },

  setupEventListeners() {
    document.getElementById('form-usuario')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const id = document.getElementById('usuario-id').value;
      const nome = document.getElementById('nome').value.trim();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
      const status = document.getElementById('status').value;

      if (!nome || !username) {
        this.setFeedback('Preencha nome e usuário', true);
        return;
      }

      if (!this.editandoId && (!password || password.length < 6)) {
        this.setFeedback('Senha deve ter pelo menos 6 caracteres', true);
        return;
      }

      const payload = { nome, username, role, status };
      if (passwordValue) payload.password = passwordValue;

      try {
        const url = this.editandoId ? `/api/usuarios/${this.editandoId}` : '/api/usuarios';
        const method = this.editandoId ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: { 
            'Content-Type': 'application/json',
            'x-auth-token': this.getToken()
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao salvar');
        }

        if (window.toastManager) {
          window.toastManager.success(this.editandoId ? '✅ Usuário atualizado!' : '✅ Usuário criado!');
        }
        this.limparFormulario();
        await this.carregarUsuarios();
      } catch (e) {
        this.setFeedback(e.message, true);
      }
    });

    document.getElementById('btn-limpar')?.addEventListener('click', () => {
      this.limparFormulario();
    });

    document.getElementById('btn-confirmar-exclusao')?.addEventListener('click', () => {
      this.confirmarExclusao();
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      
      if (action === 'edit') {
        this.editarUsuario(parseInt(id));
      } else if (action === 'delete') {
        this.abrirModalExclusao(parseInt(id));
      }
    });
  }
};
