// ============================================
// PÁGINA: FORNECEDORES
// ============================================

export default {
  title: 'Fornecedores',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>🚚 Fornecedores</h2>
          </div>
          <button class="btn btn-primary" id="btn-novo-fornecedor">➕ Novo Fornecedor</button>
        </div>

        <div class="card">
          <div class="table-container">
            <table style="width:100%;border-collapse:collapse">
              <thead>
                <tr>
                  <th style="padding:14px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid #e5e7eb">Fornecedor</th>
                  <th style="padding:14px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid #e5e7eb">CNPJ</th>
                  <th style="padding:14px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid #e5e7eb">Telefone</th>
                  <th style="padding:14px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid #e5e7eb">Contato</th>
                  <th style="padding:14px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid #e5e7eb">Status</th>
                  <th style="padding:14px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid #e5e7eb">Ações</th>
                </tr>
              </thead>
              <tbody id="tabela-fornecedores"></tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="modal-fornecedor" class="modal">
        <div class="modal-content" style="max-width:500px">
          <div class="modal-header">
            <h3 id="modal-titulo">Novo Fornecedor</h3>
            <button class="btn-close" onclick="document.getElementById('modal-fornecedor').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="forn-id" />
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Nome / Razão Social *</label>
              <input type="text" id="forn-nome" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
              <div class="form-group" style="margin-bottom:16px">
                <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">CNPJ</label>
                <input type="text" id="forn-cnpj" placeholder="00.000.000/0000-00" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
              </div>
              <div class="form-group" style="margin-bottom:16px">
                <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Telefone</label>
                <input type="text" id="forn-telefone" placeholder="(00) 00000-0000" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">E-mail</label>
              <input type="email" id="forn-email" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Nome do Contato</label>
              <input type="text" id="forn-contato" placeholder="Pessoa responsável" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Endereço</label>
              <input type="text" id="forn-endereco" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Observações</label>
              <textarea id="forn-obs" rows="3" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px"></textarea>
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Status</label>
              <select id="forn-status" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-fornecedor').classList.remove('show')">Cancelar</button>
            <button class="btn btn-primary" id="btn-salvar-fornecedor">Salvar</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.fornecedores = [];
    await this.carregarFornecedores();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  async carregarFornecedores() {
    try {
      const res = await fetch('/api/fornecedores');
      this.fornecedores = await res.json();
      this.renderizar();
    } catch (e) {
      console.error(e);
    }
  },

  renderizar() {
    const tbody = document.getElementById('tabela-fornecedores');
    if (this.fornecedores.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--muted)">Nenhum fornecedor cadastrado</td></tr>';
      return;
    }
    tbody.innerHTML = this.fornecedores.map(f => `
      <tr style="transition:background .15s">
        <td style="padding:14px;text-align:left;border-bottom:1px solid #e5e7eb"><strong>${(window.Utils || Utils).escapeHtml(f.nome)}</strong></td>
        <td style="padding:14px;text-align:left;border-bottom:1px solid #e5e7eb">${f.cnpj || '—'}</td>
        <td style="padding:14px;text-align:left;border-bottom:1px solid #e5e7eb">${f.telefone || '—'}</td>
        <td style="padding:14px;text-align:left;border-bottom:1px solid #e5e7eb">${f.contato || '—'}</td>
        <td style="padding:14px;text-align:left;border-bottom:1px solid #e5e7eb"><span class="badge ${f.status}" style="padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${f.status === 'ativo' ? 'var(--primary-light)' : '#fee2e2'};color:${f.status === 'ativo' ? 'var(--primary)' : 'var(--danger)'}">${f.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
        <td style="padding:14px;text-align:left;border-bottom:1px solid #e5e7eb">
          <button class="btn btn-ghost btn-sm" data-action="edit" data-id="${f._id}" style="padding:6px 12px;font-size:12px;background:#f0f3f7;color:var(--muted);border:none;border-radius:8px;cursor:pointer;font-weight:600">✏️ Editar</button>
          <button class="btn btn-ghost btn-sm" data-action="delete" data-id="${f._id}" style="padding:6px 12px;font-size:12px;background:#f0f3f7;color:var(--muted);border:none;border-radius:8px;cursor:pointer;font-weight:600">🗑️</button>
        </td>
      </tr>
    `).join('');
  },

  abrirModal() {
    document.getElementById('modal-titulo').textContent = 'Novo Fornecedor';
    document.getElementById('forn-id').value = '';
    document.getElementById('forn-nome').value = '';
    document.getElementById('forn-cnpj').value = '';
    document.getElementById('forn-telefone').value = '';
    document.getElementById('forn-email').value = '';
    document.getElementById('forn-contato').value = '';
    document.getElementById('forn-endereco').value = '';
    document.getElementById('forn-obs').value = '';
    document.getElementById('forn-status').value = 'ativo';
    document.getElementById('modal-fornecedor').classList.add('show');
  },

  editar(id) {
    const f = this.fornecedores.find(x => x._id === id);
    if (!f) return;
    document.getElementById('modal-titulo').textContent = 'Editar Fornecedor';
    document.getElementById('forn-id').value = f._id;
    document.getElementById('forn-nome').value = f.nome;
    document.getElementById('forn-cnpj').value = f.cnpj || '';
    document.getElementById('forn-telefone').value = f.telefone || '';
    document.getElementById('forn-email').value = f.email || '';
    document.getElementById('forn-contato').value = f.contato || '';
    document.getElementById('forn-endereco').value = f.endereco || '';
    document.getElementById('forn-obs').value = f.observacoes || '';
    document.getElementById('forn-status').value = f.status || 'ativo';
    document.getElementById('modal-fornecedor').classList.add('show');
  },

  async salvar() {
    const id = document.getElementById('forn-id').value;
    const data = {
      nome: document.getElementById('forn-nome').value,
      cnpj: document.getElementById('forn-cnpj').value,
      telefone: document.getElementById('forn-telefone').value,
      email: document.getElementById('forn-email').value,
      contato: document.getElementById('forn-contato').value,
      endereco: document.getElementById('forn-endereco').value,
      observacoes: document.getElementById('forn-obs').value,
      status: document.getElementById('forn-status').value
    };
    
    if (!data.nome) { 
      if (window.toastManager) window.toastManager.error('Informe o nome');
      return; 
    }
    
    try {
      const url = id ? `/api/fornecedores/${id}` : '/api/fornecedores';
      const method = id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-auth-token': this.getToken() },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        if (window.toastManager) window.toastManager.success('✅ Fornecedor salvo!');
        document.getElementById('modal-fornecedor').classList.remove('show');
        await this.carregarFornecedores();
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error('Erro ao salvar fornecedor');
    }
  },

  async excluir(id) {
    if (!confirm('Excluir este fornecedor?')) return;
    try {
      const res = await fetch(`/api/fornecedores/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': this.getToken() }
      });
      if (res.ok) {
        if (window.toastManager) window.toastManager.success('🗑️ Fornecedor excluído');
        await this.carregarFornecedores();
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error('Erro ao excluir fornecedor');
    }
  },

  setupEventListeners() {
    document.getElementById('btn-novo-fornecedor')?.addEventListener('click', () => {
      this.abrirModal();
    });

    document.getElementById('btn-salvar-fornecedor')?.addEventListener('click', () => {
      this.salvar();
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      
      if (action === 'edit') {
        this.editar(id);
      } else if (action === 'delete') {
        this.excluir(id);
      }
    });
  }
};
