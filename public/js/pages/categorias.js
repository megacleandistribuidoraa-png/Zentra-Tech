// ============================================
// PÁGINA: CATEGORIAS
// ============================================

export default {
  title: 'Categorias',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>🏷️ Categorias</h2>
          </div>
          <button class="btn btn-primary" id="btn-nova-categoria">➕ Nova Categoria</button>
        </div>

        <div class="card">
          <div id="lista-categorias" class="categoria-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px"></div>
        </div>
      </div>

      <div id="modal-categoria" class="modal">
        <div class="modal-content" style="max-width:400px">
          <div class="modal-header">
            <h3 id="modal-titulo">Nova Categoria</h3>
            <button class="btn-close" onclick="document.getElementById('modal-categoria').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="cat-id" />
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Nome *</label>
              <input type="text" id="cat-nome" placeholder="Ex: Detergentes" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Descrição</label>
              <input type="text" id="cat-desc" placeholder="Descrição da categoria" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Ícone</label>
              <div class="icon-picker" id="icon-picker" style="display:flex;gap:8px;flex-wrap:wrap"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-categoria').classList.remove('show')">Cancelar</button>
            <button class="btn btn-primary" id="btn-salvar-categoria">Salvar</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.icones = ['📦','🧴','🧹','🧽','🧼','🪣','🧪','💧','✨','🌿','🍋','🪥','🚿','🛁','🧺','🏠'];
    this.iconeSelected = '📦';
    this.categorias = [];
    
    document.getElementById('icon-picker').innerHTML = this.icones.map(i => 
      `<button type="button" data-icon="${i}" class="icon-btn ${i===this.iconeSelected?'selected':''}" style="font-size:24px;padding:8px;border:2px solid ${i===this.iconeSelected?'var(--primary)':'#e5e7eb'};border-radius:8px;background:${i===this.iconeSelected?'var(--primary-light)':'none'};cursor:pointer">${i}</button>`
    ).join('');
    
    await this.carregarCategorias();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  selectIcon(i) {
    this.iconeSelected = i;
    document.querySelectorAll('.icon-btn').forEach(b => {
      b.classList.toggle('selected', b.dataset.icon === i);
      b.style.borderColor = b.dataset.icon === i ? 'var(--primary)' : '#e5e7eb';
      b.style.background = b.dataset.icon === i ? 'var(--primary-light)' : 'none';
    });
  },

  async carregarCategorias() {
    try {
      const res = await fetch('/api/categorias');
      this.categorias = await res.json();
      this.renderizar();
    } catch (e) {
      console.error(e);
    }
  },

  renderizar() {
    const container = document.getElementById('lista-categorias');
    if (this.categorias.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--muted);grid-column:1/-1;padding:40px">Nenhuma categoria cadastrada</p>';
      return;
    }
    container.innerHTML = this.categorias.map(c => `
      <div class="categoria-card" style="background:#f8fafc;border-radius:12px;padding:20px;text-align:center;position:relative;border:2px solid transparent;transition:all .2s">
        <div class="categoria-actions" style="position:absolute;top:10px;right:10px;display:flex;gap:4px">
          <button data-action="edit" data-id="${c._id}" style="background:none;border:none;cursor:pointer;font-size:16px;opacity:0.6">✏️</button>
          <button data-action="delete" data-id="${c._id}" style="background:none;border:none;cursor:pointer;font-size:16px;opacity:0.6">🗑️</button>
        </div>
        <div class="categoria-icon" style="font-size:40px;margin-bottom:10px">${c.icone || '📦'}</div>
        <h4 class="categoria-nome" style="font-size:16px;font-weight:700;margin:0 0 4px">${(window.Utils || Utils).escapeHtml(c.nome)}</h4>
        <p class="categoria-desc" style="font-size:12px;color:var(--muted);margin:0">${(window.Utils || Utils).escapeHtml(c.descricao || '—')}</p>
      </div>
    `).join('');
  },

  abrirModal() {
    document.getElementById('modal-titulo').textContent = 'Nova Categoria';
    document.getElementById('cat-id').value = '';
    document.getElementById('cat-nome').value = '';
    document.getElementById('cat-desc').value = '';
    this.selectIcon('📦');
    document.getElementById('modal-categoria').classList.add('show');
  },

  editar(id) {
    const cat = this.categorias.find(c => c._id === id);
    if (!cat) return;
    document.getElementById('modal-titulo').textContent = 'Editar Categoria';
    document.getElementById('cat-id').value = cat._id;
    document.getElementById('cat-nome').value = cat.nome;
    document.getElementById('cat-desc').value = cat.descricao || '';
    this.selectIcon(cat.icone || '📦');
    document.getElementById('modal-categoria').classList.add('show');
  },

  async salvar() {
    const id = document.getElementById('cat-id').value;
    const data = {
      nome: document.getElementById('cat-nome').value,
      descricao: document.getElementById('cat-desc').value,
      icone: this.iconeSelected
    };
    
    if (!data.nome) { 
      if (window.toastManager) window.toastManager.error('Informe o nome');
      return; 
    }
    
    try {
      const url = id ? `/api/categorias/${id}` : '/api/categorias';
      const method = id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-auth-token': this.getToken() },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        if (window.toastManager) window.toastManager.success('✅ Categoria salva!');
        document.getElementById('modal-categoria').classList.remove('show');
        await this.carregarCategorias();
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error('Erro ao salvar categoria');
    }
  },

  async excluir(id) {
    if (!confirm('Excluir esta categoria?')) return;
    try {
      const res = await fetch(`/api/categorias/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': this.getToken() }
      });
      if (res.ok) {
        if (window.toastManager) window.toastManager.success('🗑️ Categoria excluída');
        await this.carregarCategorias();
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error('Erro ao excluir categoria');
    }
  },

  setupEventListeners() {
    document.getElementById('btn-nova-categoria')?.addEventListener('click', () => {
      this.abrirModal();
    });

    document.getElementById('btn-salvar-categoria')?.addEventListener('click', () => {
      this.salvar();
    });

    document.querySelectorAll('.icon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectIcon(btn.dataset.icon);
      });
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
