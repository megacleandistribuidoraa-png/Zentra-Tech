// ============================================
// PÁGINA: ESTOQUE
// ============================================

export default {
  title: 'Estoque',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>📦 Controle de Estoque</h2>
            <p>Gerencie o estoque dos seus produtos de limpeza</p>
          </div>
          <div style="text-align:right">
            <div style="font-size:13px;color:var(--muted)">Última atualização</div>
            <div id="last-update" style="font-weight:600">--:--</div>
          </div>
        </div>

        <!-- Cards de estatísticas -->
        <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:22px">
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon green" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--primary-light);color:var(--primary)">📦</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-total">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Total de produtos</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon blue" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--info-light);color:var(--info)">✓</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-ok">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Estoque OK</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon yellow" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--warning-light);color:var(--warning)">⚠</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-low">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Estoque baixo</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon red" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--danger-light);color:var(--danger)">⛔</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-critical">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Estoque crítico</p>
            </div>
          </div>
        </div>

        <!-- Tabela de estoque -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
            <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">📋 Lista de Produtos</h2>
            <div class="filters" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
              <div class="search-box" style="position:relative">
                <input type="text" id="search" placeholder="Buscar produto ou SKU..." style="padding:10px 14px 10px 38px;border-radius:10px;border:1px solid #e6e9ef;min-width:280px;font-size:14px" />
                <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px">🔍</span>
              </div>
              <button class="filter-btn active" data-filter="all" style="padding:10px 16px;border-radius:10px;border:1px solid var(--primary);background:var(--primary);color:#fff;cursor:pointer;font-size:13px;font-weight:600">Todos</button>
              <button class="filter-btn" data-filter="ok" style="padding:10px 16px;border-radius:10px;border:1px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">✓ OK</button>
              <button class="filter-btn" data-filter="low" style="padding:10px 16px;border-radius:10px;border:1px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">⚠ Baixo</button>
              <button class="filter-btn" data-filter="critical" style="padding:10px 16px;border-radius:10px;border:1px solid #e6e9ef;background:#fff;cursor:pointer;font-size:13px;font-weight:600">⛔ Crítico</button>
            </div>
          </div>

          <div class="table-container">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <thead>
                <tr>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Produto</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Quantidade</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Nível</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Status</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Preço Unit.</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Valor Total</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:center;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Ações</th>
                </tr>
              </thead>
              <tbody id="table-body">
                <tr>
                  <td colspan="7" class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
                    <div class="icon" style="font-size:48px;margin-bottom:12px">📦</div>
                    <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Carregando produtos...</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Resumo financeiro -->
        <div class="card" style="background:linear-gradient(135deg,#0aa04e 0%,#059669 100%);color:#fff;border-radius:12px;padding:20px;box-shadow:var(--shadow)">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px">
            <div>
              <div style="font-size:14px;opacity:0.9">💰 Valor total em estoque</div>
              <div id="valor-total" style="font-size:32px;font-weight:800">R$ 0,00</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:14px;opacity:0.9">📊 Total de itens</div>
              <div id="total-itens" style="font-size:24px;font-weight:700">0 unidades</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de ajuste -->
      <div id="modal-ajuste" class="modal">
        <div class="modal-content" style="max-width:420px">
          <div class="modal-header">
            <h3 id="modal-title">📦 Ajustar Estoque</h3>
            <button class="btn-close" onclick="document.getElementById('modal-ajuste').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <p id="modal-subtitle" style="margin:0 0 20px;color:var(--muted);font-size:14px">Produto selecionado</p>
            
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:6px;font-weight:600">Tipo de movimentação</label>
              <select id="ajuste-tipo" style="width:100%;padding:12px;border-radius:10px;border:1px solid #e6e9ef;font-size:15px;margin-bottom:16px">
                <option value="entrada">➕ Entrada (adicionar ao estoque)</option>
                <option value="saida">➖ Saída (remover do estoque)</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:6px;font-weight:600">Quantidade</label>
              <input type="number" id="ajuste-quantidade" min="1" value="1" placeholder="Digite a quantidade" style="width:100%;padding:12px;border-radius:10px;border:1px solid #e6e9ef;font-size:15px;margin-bottom:16px" />
            </div>

            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;color:var(--muted);margin-bottom:6px;font-weight:600">Motivo (opcional)</label>
              <input type="text" id="ajuste-motivo" placeholder="Ex: Compra de fornecedor, Ajuste de inventário..." style="width:100%;padding:12px;border-radius:10px;border:1px solid #e6e9ef;font-size:15px;margin-bottom:16px" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-ajuste').classList.remove('show')">Cancelar</button>
            <button class="btn btn-primary" id="btn-confirmar-ajuste">Confirmar</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.produtos = [];
    this.produtoSelecionado = null;
    this.filtroAtual = 'all';
    
    await this.carregarProdutos();
    this.atualizarHorario();
    this.setupEventListeners();
    
    // Auto-refresh a cada 30 segundos (com cleanup)
    if (!this._intervals) this._intervals = [];
    const intervalId = setInterval(() => {
      // Verificar se ainda estamos na página de estoque
      const statTotal = document.getElementById('stat-total');
      if (!statTotal) {
        clearInterval(intervalId);
        return;
      }
      this.carregarProdutos();
    }, 30000);
    this._intervals.push(intervalId);
  },

  onUnload() {
    // Limpar intervalos ao sair da página
    if (this._intervals) {
      this._intervals.forEach(id => clearInterval(id));
      this._intervals = [];
    }
  },

  formatMoney(valor) {
    return 'R$ ' + Number(valor || 0).toFixed(2).replace('.', ',');
  },

  getStockStatus(produto) {
    const { quantidade, minimo } = produto;
    if (quantidade <= 0) return 'critical';
    if (quantidade <= minimo) return 'low';
    return 'ok';
  },

  getStatusLabel(status) {
    const labels = {
      'ok': { text: 'OK', class: 'ok' },
      'low': { text: 'Baixo', class: 'low' },
      'critical': { text: 'Crítico', class: 'critical' }
    };
    return labels[status] || labels['ok'];
  },

  async carregarProdutos() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/produtos`);
      if (!res.ok) throw new Error('Erro ao carregar');
      this.produtos = await res.json();
      
      this.atualizarEstatisticas();
      this.renderizarTabela();
      this.atualizarHorario();
    } catch (e) {
      console.error(e);
      const tableBody = document.getElementById('table-body');
      if (tableBody) {
        tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
            <div class="icon" style="font-size:48px;margin-bottom:12px">❌</div>
            <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Erro ao carregar produtos</h4>
            <p>Verifique se o servidor está rodando</p>
          </td>
        </tr>
      `;
      }
    }
  },

  atualizarEstatisticas() {
    // Verificar se os elementos existem antes de continuar
    const elTotal = document.getElementById('stat-total');
    if (!elTotal) {
      console.warn('Elementos de estatísticas não encontrados, pulando atualização');
      return;
    }

    const stats = { total: 0, ok: 0, low: 0, critical: 0 };
    let valorTotal = 0;
    let totalItens = 0;

    if (Array.isArray(this.produtos)) {
      this.produtos.forEach(p => {
        stats.total++;
        const status = this.getStockStatus(p);
        stats[status]++;
        valorTotal += (p.quantidade || 0) * (p.preco || 0);
        totalItens += p.quantidade || 0;
      });
    }

    const elOk = document.getElementById('stat-ok');
    const elLow = document.getElementById('stat-low');
    const elCritical = document.getElementById('stat-critical');
    
    if (elTotal) elTotal.textContent = stats.total;
    if (elOk) elOk.textContent = stats.ok;
    if (elLow) elLow.textContent = stats.low;
    if (elCritical) elCritical.textContent = stats.critical;
    
    const elValorTotal = document.getElementById('valor-total');
    const elTotalItens = document.getElementById('total-itens');
    if (elValorTotal) elValorTotal.textContent = this.formatMoney(valorTotal);
    if (elTotalItens) elTotalItens.textContent = totalItens + ' unidades';
  },

  renderizarTabela() {
    const tbody = document.getElementById('table-body');
    if (!tbody) {
      console.warn('Elemento table-body não encontrado, pulando renderização');
      return;
    }
    
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    
    let lista = this.produtos.filter(p => {
      const matchSearch = !searchTerm || 
        (p.nome || '').toLowerCase().includes(searchTerm) ||
        (p.sku || '').toLowerCase().includes(searchTerm);
      
      if (this.filtroAtual === 'all') return matchSearch;
      return matchSearch && this.getStockStatus(p) === this.filtroAtual;
    });

    if (lista.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
            <div class="icon" style="font-size:48px;margin-bottom:12px">📭</div>
            <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Nenhum produto encontrado</h4>
            <p>Tente ajustar os filtros ou a busca</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = lista.map(p => {
      const status = this.getStockStatus(p);
      const statusInfo = this.getStatusLabel(status);
      const porcentagem = p.minimo > 0 ? Math.min((p.quantidade / (p.minimo * 3)) * 100, 100) : 100;
      const valorTotal = (p.quantidade || 0) * (p.preco || 0);

      return `
        <tr style="transition:background .15s">
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle">
            <div class="produto-info" style="display:flex;flex-direction:column;gap:2px">
              <span class="produto-nome" style="font-weight:600;color:#0f172a">${(window.Utils || Utils).escapeHtml(p.nome)}</span>
              <span class="produto-sku" style="font-size:12px;color:var(--muted)">SKU: ${(window.Utils || Utils).escapeHtml(p.sku || '--')}</span>
            </div>
          </td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle">
            <div class="qty-display" style="font-size:18px;font-weight:700">${p.quantidade}<span class="qty-unit" style="font-size:12px;color:var(--muted);margin-left:4px">${(window.Utils || Utils).escapeHtml(p.unidade || 'UN')}</span></div>
            <div class="qty-min" style="font-size:12px;color:var(--muted);margin-top:2px">Mín: ${p.minimo || 0}</div>
          </td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle">
            <div class="stock-bar" style="width:120px;height:8px;background:#e6e9ef;border-radius:4px;overflow:hidden">
              <div class="fill ${status}" style="height:100%;border-radius:4px;transition:width .3s;width:${porcentagem}%;background:${status === 'ok' ? 'var(--primary)' : status === 'low' ? 'var(--warning)' : 'var(--danger)'}"></div>
            </div>
          </td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle">
            <span class="stock-status ${statusInfo.class}" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;font-size:13px;font-weight:600;background:${statusInfo.class === 'ok' ? 'var(--primary-light)' : statusInfo.class === 'low' ? 'var(--warning-light)' : 'var(--danger-light)'};color:${statusInfo.class === 'ok' ? 'var(--primary)' : statusInfo.class === 'low' ? '#b45309' : 'var(--danger)'}">
              <span class="dot" style="width:8px;height:8px;border-radius:50%;background:currentColor"></span>
              ${statusInfo.text}
            </span>
          </td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle">${this.formatMoney(p.preco)}</td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle"><strong>${this.formatMoney(valorTotal)}</strong></td>
          <td style="padding:14px 12px;border-bottom:1px solid #f0f3f7;vertical-align:middle;text-align:center">
            <div class="actions" style="display:flex;gap:6px;justify-content:center">
              <button class="btn-entrada" data-action="ajustar" data-id="${p.id || p._id}" data-tipo="entrada" style="background:var(--primary-light);color:var(--primary);padding:8px 14px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:13px" title="Adicionar estoque">
                ➕
              </button>
              <button class="btn-saida" data-action="ajustar" data-id="${p.id || p._id}" data-tipo="saida" style="background:var(--danger-light);color:var(--danger);padding:8px 14px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:13px" title="Remover estoque">
                ➖
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  abrirModal(produtoId, tipo) {
    this.produtoSelecionado = this.produtos.find(p => (p.id || p._id) === produtoId);
    if (!this.produtoSelecionado) return;

    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const ajusteTipo = document.getElementById('ajuste-tipo');
    const ajusteQuantidade = document.getElementById('ajuste-quantidade');
    const ajusteMotivo = document.getElementById('ajuste-motivo');
    
    if (modalTitle) modalTitle.innerHTML = tipo === 'entrada' 
      ? '➕ Entrada de Estoque' 
      : '➖ Saída de Estoque';
    if (modalSubtitle) modalSubtitle.textContent = this.produtoSelecionado.nome;
    if (ajusteTipo) ajusteTipo.value = tipo;
    if (ajusteQuantidade) ajusteQuantidade.value = 1;
    if (ajusteMotivo) ajusteMotivo.value = '';
    document.getElementById('modal-ajuste').classList.add('show');
  },

  async confirmarAjuste() {
    if (!this.produtoSelecionado) return;

    const ajusteTipo = document.getElementById('ajuste-tipo');
    const ajusteQuantidade = document.getElementById('ajuste-quantidade');
    const tipo = ajusteTipo ? ajusteTipo.value : 'entrada';
    const quantidade = parseInt(ajusteQuantidade ? ajusteQuantidade.value : 0) || 0;

    if (quantidade <= 0) {
      if (window.toastManager) window.toastManager.error('Digite uma quantidade válida');
      return;
    }

    if (tipo === 'saida' && quantidade > this.produtoSelecionado.quantidade) {
      if (window.toastManager) window.toastManager.error('Quantidade maior que o estoque disponível');
      return;
    }

    try {
      const res = await fetch(`/api/produtos/${this.produtoSelecionado.id || this.produtoSelecionado._id}/ajustar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, quantidade })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao ajustar');
      }

      const msg = tipo === 'entrada' 
        ? `✅ +${quantidade} ${this.produtoSelecionado.unidade || 'UN'} adicionado(s)` 
        : `✅ -${quantidade} ${this.produtoSelecionado.unidade || 'UN'} removido(s)`;
      
      if (window.toastManager) window.toastManager.success(msg);
      document.getElementById('modal-ajuste').classList.remove('show');
      this.produtoSelecionado = null;
      await this.carregarProdutos();
    } catch (e) {
      console.error(e);
      if (window.toastManager) window.toastManager.error(e.message || 'Erro ao ajustar estoque');
    }
  },

  atualizarHorario() {
    const now = new Date();
    const lastUpdate = document.getElementById('last-update');
    if (lastUpdate) lastUpdate.textContent = now.toLocaleTimeString('pt-BR');
  },

  setupEventListeners() {
    document.getElementById('btn-confirmar-ajuste')?.addEventListener('click', () => {
      this.confirmarAjuste();
    });

    document.getElementById('search')?.addEventListener('input', () => {
      this.renderizarTabela();
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
        this.renderizarTabela();
      });
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      const tipo = btn.getAttribute('data-tipo');
      
      if (action === 'ajustar') {
        this.abrirModal(id, tipo);
      }
    });
  }
};
