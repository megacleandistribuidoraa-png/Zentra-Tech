// ============================================
// PÁGINA: SOLICITAÇÕES
// ============================================

export default {
  title: 'Solicitações',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>📋 Solicitações de Pedidos</h2>
            <p>Gerencie solicitações de pedidos retroativos</p>
          </div>
        </div>

        <!-- Cards de estatísticas -->
        <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:22px">
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon yellow" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--warning-light);color:var(--warning)">⏳</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-pendentes">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Pendentes</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon green" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--primary-light);color:var(--primary)">✓</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-aprovados">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Aprovados</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon red" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--danger-light);color:var(--danger)">✕</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-rejeitados">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Rejeitados</p>
            </div>
          </div>
        </div>

        <!-- Lista de solicitações -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
            <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">📋 Lista de Solicitações</h2>
            <div class="filters" style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="filter-btn active" data-filter="pendente" style="padding:10px 16px;border-radius:10px;border:2px solid var(--primary);background:var(--primary);color:#fff;cursor:pointer;font-size:13px;font-weight:600">⏳ Pendentes</button>
              <button class="filter-btn" data-filter="aprovado" style="padding:10px 16px;border-radius:10px;border:2px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">✓ Aprovados</button>
              <button class="filter-btn" data-filter="rejeitado" style="padding:10px 16px;border-radius:10px;border:2px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">✕ Rejeitados</button>
              <button class="filter-btn" data-filter="todos" style="padding:10px 16px;border-radius:10px;border:2px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">Todos</button>
            </div>
          </div>

          <div id="lista-solicitacoes">
            <div class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
              <div class="icon" style="font-size:48px;margin-bottom:12px">📋</div>
              <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Carregando...</h4>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de rejeição -->
      <div id="modal-rejeitar" class="modal">
        <div class="modal-content" style="max-width:500px">
          <div class="modal-header">
            <h3>❌ Rejeitar Solicitação</h3>
            <button class="btn-close" onclick="document.getElementById('modal-rejeitar').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <p>Informe o motivo da rejeição para que o operador entenda.</p>
            <textarea id="motivo-rejeicao" placeholder="Motivo da rejeição (opcional)" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;resize:vertical;min-height:80px"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-rejeitar').classList.remove('show')">Cancelar</button>
            <button class="btn btn-danger" id="btn-confirmar-rejeicao" style="background:var(--danger);color:#fff">Rejeitar</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.solicitacoes = [];
    this.filtroAtual = 'pendente';
    this.rejeitandoId = null;
    
    if (!this.getToken()) {
      window.location.href = '/index.html';
      return;
    }
    
    await this.carregarSolicitacoes();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  formatMoney(valor) {
    return 'R$ ' + Number(valor || 0).toFixed(2).replace('.', ',');
  },

  formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR');
  },

  formatDateTime(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleString('pt-BR');
  },

  async carregarSolicitacoes() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/solicitacoes`, {
        headers: { 'x-auth-token': this.getToken() }
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Erro ao carregar');
      
      this.solicitacoes = data;
      this.atualizarEstatisticas();
      this.renderizarLista();
    } catch (e) {
      console.error('Erro:', e);
      document.getElementById('lista-solicitacoes').innerHTML = `
        <div class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
          <div class="icon" style="font-size:48px;margin-bottom:12px">❌</div>
          <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Erro ao carregar solicitações</h4>
          <p style="font-size:12px;margin-top:8px">Verifique se você está logado como administrador. <a href="/index.html">Fazer login novamente</a></p>
        </div>
      `;
    }
  },

  atualizarEstatisticas() {
    const pendentes = this.solicitacoes.filter(s => s.status === 'pendente').length;
    const aprovados = this.solicitacoes.filter(s => s.status === 'aprovado').length;
    const rejeitados = this.solicitacoes.filter(s => s.status === 'rejeitado').length;
    
    document.getElementById('stat-pendentes').textContent = pendentes;
    document.getElementById('stat-aprovados').textContent = aprovados;
    document.getElementById('stat-rejeitados').textContent = rejeitados;
  },

  renderizarLista() {
    const container = document.getElementById('lista-solicitacoes');
    
    let lista = this.solicitacoes;
    if (this.filtroAtual !== 'todos') {
      lista = this.solicitacoes.filter(s => s.status === this.filtroAtual);
    }
    
    lista = [...lista].sort((a, b) => new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao));
    
    if (lista.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
          <div class="icon" style="font-size:48px;margin-bottom:12px">📭</div>
          <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Nenhuma solicitação ${this.filtroAtual !== 'todos' ? this.filtroAtual : ''}</h4>
          <p>As solicitações aparecerão aqui</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = lista.map(s => {
      const statusLabel = {
        'pendente': '⏳ Pendente',
        'aprovado': '✓ Aprovado',
        'rejeitado': '✕ Rejeitado'
      }[s.status];
      
      return `
        <div class="solicitacao-item ${s.status}" style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:14px;border-left:4px solid ${s.status === 'aprovado' ? 'var(--primary)' : s.status === 'rejeitado' ? 'var(--danger)' : 'var(--warning)'};transition:all .2s">
          <div class="solicitacao-header" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:10px">
            <div class="solicitacao-info">
              <h4 style="margin:0 0 4px;font-size:16px;display:flex;align-items:center;gap:8px">
                <span class="badge ${s.status}" style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${s.status === 'pendente' ? 'var(--warning-light)' : s.status === 'aprovado' ? 'var(--primary-light)' : 'var(--danger-light)'};color:${s.status === 'pendente' ? '#b45309' : s.status === 'aprovado' ? 'var(--primary)' : 'var(--danger)'}">${statusLabel}</span>
                Solicitação #${s.id}
              </h4>
              <p style="margin:0;font-size:13px;color:var(--muted)">
                <strong>Cliente:</strong> ${(window.Utils || Utils).escapeHtml(s.clienteNome)} &nbsp;|&nbsp;
                <strong>Solicitante:</strong> ${(window.Utils || Utils).escapeHtml(s.usuarioNome)}
              </p>
              <p style="margin-top:4px;font-size:13px;color:var(--muted)">
                📅 Solicitado em: ${this.formatDateTime(s.dataSolicitacao)}
              </p>
            </div>
            <div class="solicitacao-meta" style="text-align:right">
              <div class="data" style="font-size:14px;font-weight:600;color:var(--warning)">📅 Data do pedido: ${this.formatDate(s.dataDesejada)}</div>
              <div class="valor" style="font-size:18px;font-weight:800;color:var(--primary)">${this.formatMoney(s.total)}</div>
            </div>
          </div>
          
          <div class="solicitacao-details" style="margin:12px 0;padding:12px;background:#fff;border-radius:8px">
            <h5 style="margin:0 0 8px;font-size:13px;color:var(--muted)">Itens do pedido:</h5>
            ${s.items.map(it => `
              <div class="item-row" style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0f3f7;font-size:13px">
                <span>${(window.Utils || Utils).escapeHtml(it.nome)} × ${it.quantidade}</span>
                <span>${this.formatMoney(it.quantidade * it.preco)}</span>
              </div>
            `).join('')}
          </div>
          
          ${s.motivo ? `
            <div class="solicitacao-motivo" style="margin:12px 0;padding:12px;background:#fffbeb;border-radius:8px;font-size:13px">
              <strong style="color:#92400e">Motivo da solicitação:</strong> ${(window.Utils || Utils).escapeHtml(s.motivo)}
            </div>
          ` : ''}
          
          ${s.status === 'rejeitado' && s.motivoRejeicao ? `
            <div class="solicitacao-motivo" style="margin:12px 0;padding:12px;background:#fef2f2;border-radius:8px;font-size:13px">
              <strong style="color:var(--danger)">Motivo da rejeição:</strong> ${(window.Utils || Utils).escapeHtml(s.motivoRejeicao)}
            </div>
          ` : ''}
          
          ${s.status === 'aprovado' ? `
            <div class="solicitacao-motivo" style="margin:12px 0;padding:12px;background:var(--primary-light);border-radius:8px;font-size:13px">
              <strong style="color:var(--primary)">✓ Pedido #${s.pedidoId} criado em ${this.formatDateTime(s.dataResposta)}</strong>
            </div>
          ` : ''}
          
          ${s.status === 'pendente' ? `
            <div class="solicitacao-actions" style="display:flex;gap:10px;margin-top:14px;justify-content:flex-end">
              <button class="btn btn-primary btn-sm" data-action="aprovar" data-id="${s.id}" style="padding:8px 14px;font-size:13px;background:var(--primary);color:#fff;border:none;border-radius:10px;cursor:pointer;font-weight:600">
                ✓ Aprovar
              </button>
              <button class="btn btn-danger btn-sm" data-action="rejeitar" data-id="${s.id}" style="padding:8px 14px;font-size:13px;background:var(--danger);color:#fff;border:none;border-radius:10px;cursor:pointer;font-weight:600">
                ✕ Rejeitar
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  },

  async aprovarSolicitacao(id) {
    if (!confirm('Confirma a aprovação desta solicitação? O pedido será criado e o estoque será atualizado.')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/solicitacoes/${id}/aprovar`, {
        method: 'POST',
        headers: { 'x-auth-token': this.getToken() }
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao aprovar');
      }
      
      if (window.toastManager) window.toastManager.success('✅ Solicitação aprovada! Pedido criado.');
      await this.carregarSolicitacoes();
    } catch (e) {
      if (window.toastManager) window.toastManager.error(e.message);
    }
  },

  abrirModalRejeitar(id) {
    this.rejeitandoId = id;
    document.getElementById('motivo-rejeicao').value = '';
    document.getElementById('modal-rejeitar').classList.add('show');
  },

  async confirmarRejeicao() {
    if (!this.rejeitandoId) return;
    
    const motivo = document.getElementById('motivo-rejeicao').value.trim();
    
    try {
      const res = await fetch(`/api/solicitacoes/${this.rejeitandoId}/rejeitar`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': this.getToken() 
        },
        body: JSON.stringify({ motivo })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao rejeitar');
      }
      
      if (window.toastManager) window.toastManager.success('❌ Solicitação rejeitada');
      document.getElementById('modal-rejeitar').classList.remove('show');
      this.rejeitandoId = null;
      await this.carregarSolicitacoes();
    } catch (e) {
      if (window.toastManager) window.toastManager.error(e.message);
    }
  },

  setupEventListeners() {
    document.getElementById('btn-confirmar-rejeicao')?.addEventListener('click', () => {
      this.confirmarRejeicao();
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
        this.renderizarLista();
      });
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      
      if (action === 'aprovar') {
        this.aprovarSolicitacao(parseInt(id));
      } else if (action === 'rejeitar') {
        this.abrirModalRejeitar(parseInt(id));
      }
    });
  }
};
