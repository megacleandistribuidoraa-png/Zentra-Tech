// ============================================
// PÁGINA: PRODUTOS
// ============================================

export default {
  title: 'Produtos',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>📦 Produtos</h2>
            <p>Gerencie seu catálogo de produtos (Unitários e Caixas)</p>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <button class="btn btn-ghost" id="btn-relatorio">📊 Relatório de Lucros</button>
            <button class="btn btn-ghost" id="btn-lista-cliente" style="background:#fff3cd;border-color:#ffc107;color:#856404">📋 Lista p/ Cliente</button>
            <button class="btn btn-primary" id="btn-novo-unitario">📄 Novo Unitário</button>
            <button class="btn btn-purple" id="btn-nova-caixa">📦 Nova Caixa</button>
          </div>
        </div>

        <!-- Cards de estatísticas -->
        <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:22px">
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:16px;box-shadow:var(--shadow);display:flex;align-items:center;gap:12px">
            <div class="icon green" style="width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:var(--primary-light);color:var(--primary)">📄</div>
            <div class="info">
              <h3 style="margin:0;font-size:22px;font-weight:800" id="stat-unitarios">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:12px">Produtos Unitários</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:16px;box-shadow:var(--shadow);display:flex;align-items:center;gap:12px">
            <div class="icon purple" style="width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:var(--purple-light);color:var(--purple)">📦</div>
            <div class="info">
              <h3 style="margin:0;font-size:22px;font-weight:800" id="stat-caixas">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:12px">Caixas Fechadas</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:16px;box-shadow:var(--shadow);display:flex;align-items:center;gap:12px">
            <div class="icon blue" style="width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:var(--info-light);color:var(--info)">💰</div>
            <div class="info">
              <h3 style="margin:0;font-size:22px;font-weight:800" id="stat-valor">R$ 0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:12px">Valor em estoque</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:16px;box-shadow:var(--shadow);display:flex;align-items:center;gap:12px">
            <div class="icon yellow" style="width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:var(--warning-light);color:var(--warning)">⚠️</div>
            <div class="info">
              <h3 style="margin:0;font-size:22px;font-weight:800" id="stat-baixo">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:12px">Estoque baixo</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:16px;box-shadow:var(--shadow);display:flex;align-items:center;gap:12px">
            <div class="icon green" style="width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:var(--primary-light);color:var(--primary)">📈</div>
            <div class="info">
              <h3 style="margin:0;font-size:22px;font-weight:800" id="stat-lucro">R$ 0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:12px">Lucro Estimado</p>
            </div>
          </div>
        </div>

        <!-- Abas -->
        <div class="tabs" style="display:flex;gap:0;margin-bottom:0;background:var(--card);border-radius:12px 12px 0 0;padding:8px 8px 0;box-shadow:var(--shadow)">
          <button class="tab-btn active" data-tipo="unitario" id="tab-unitario" style="flex:1;padding:16px 24px;border:none;background:var(--primary);color:#fff;cursor:pointer;font-size:15px;font-weight:600;border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center;gap:10px">
            📄 Produtos Unitários
            <span class="badge" style="background:rgba(255,255,255,0.2);padding:2px 10px;border-radius:20px;font-size:12px" id="count-unitarios">0</span>
          </button>
          <button class="tab-btn caixa" data-tipo="caixa" id="tab-caixa" style="flex:1;padding:16px 24px;border:none;background:transparent;cursor:pointer;font-size:15px;font-weight:600;color:var(--muted);border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center;gap:10px">
            📦 Caixas Fechadas
            <span class="badge" style="background:#e6e9ef;padding:2px 10px;border-radius:20px;font-size:12px" id="count-caixas">0</span>
          </button>
        </div>

        <!-- Tabela de produtos -->
        <div class="card" style="border-radius:0 0 12px 12px;margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
            <h2 class="card-title" id="titulo-lista" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">📄 Produtos Unitários</h2>
            <div class="filters" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
              <div class="search-box" style="position:relative">
                <input type="text" id="search" placeholder="Buscar por nome ou SKU..." style="padding:10px 14px 10px 38px;border-radius:10px;border:2px solid #e6e9ef;min-width:260px;font-size:14px" />
                <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px">🔍</span>
              </div>
            </div>
          </div>

          <div class="table-container">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <thead>
                <tr>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Produto</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">SKU</th>
                  <th id="col-qtd-caixa" style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef;display:none">Qtd/Cx</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Custo</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Venda</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Lucro</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Margem</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Estoque</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:left;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Status</th>
                  <th style="background:#f8fafc;padding:14px 12px;text-align:center;font-weight:600;color:var(--muted);border-bottom:2px solid #e6e9ef">Ações</th>
                </tr>
              </thead>
              <tbody id="table-body">
                <tr>
                  <td colspan="10" class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
                    <div class="icon" style="font-size:48px;margin-bottom:12px">📦</div>
                    <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Carregando produtos...</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal Novo/Editar Produto -->
      <div id="modal-produto" class="modal">
        <div class="modal-content" style="max-width:600px">
          <div class="modal-header">
            <h3 id="modal-title">➕ Novo Produto</h3>
            <button class="btn-close" onclick="document.getElementById('modal-produto').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <!-- Seletor de Tipo -->
            <div class="tipo-selector" id="tipo-selector" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
              <div class="tipo-option unitario" data-tipo-select="unitario" style="padding:16px;border:3px solid #e6e9ef;border-radius:12px;cursor:pointer;text-align:center;transition:all .2s">
                <div class="icon" style="font-size:32px;margin-bottom:8px">📄</div>
                <div class="label" style="font-weight:700;font-size:14px">Unitário</div>
                <div class="desc" style="font-size:12px;color:var(--muted);margin-top:4px">Produto vendido por unidade</div>
              </div>
              <div class="tipo-option caixa" data-tipo-select="caixa" style="padding:16px;border:3px solid #e6e9ef;border-radius:12px;cursor:pointer;text-align:center;transition:all .2s">
                <div class="icon" style="font-size:32px;margin-bottom:8px">📦</div>
                <div class="label" style="font-weight:700;font-size:14px">Caixa Fechada</div>
                <div class="desc" style="font-size:12px;color:var(--muted);margin-top:4px">Produto vendido em caixa</div>
              </div>
            </div>
            
            <div class="form-grid">
              <div class="form-group full">
                <label>Nome do produto *</label>
                <input type="text" id="m-nome" placeholder="Ex: Detergente Neutro 500ml" required />
              </div>
              <div class="form-group" id="grupo-qtd-caixa" style="display:none">
                <label>📦 Qtd por Caixa *</label>
                <input type="number" id="m-qtdPorCaixa" min="1" value="12" placeholder="Ex: 12" />
              </div>
              <div class="form-group">
                <label>SKU (código)</label>
                <input type="text" id="m-sku" placeholder="Auto-gerado" readonly />
              </div>
              <div class="form-group">
                <label>📦 Código de Barras</label>
                <input type="text" id="m-codigoBarras" placeholder="Escaneie ou digite" />
              </div>
              <div class="form-group">
                <label>💵 Preço de Custo (R$) *</label>
                <input type="number" id="m-precoCusto" step="0.01" min="0" placeholder="0.00" required />
              </div>
              <div class="form-group">
                <label>💰 Preço de Venda (R$) *</label>
                <input type="number" id="m-preco" step="0.01" min="0" placeholder="0.00" required />
              </div>
              <div class="form-group">
                <label>📊 Margem de Lucro</label>
                <input type="text" id="m-margem" readonly style="background:#e6f9ee;font-weight:bold;color:#0aa04e" placeholder="0%" />
              </div>
              <div class="form-group">
                <label id="label-quantidade">Quantidade em Estoque *</label>
                <input type="number" id="m-quantidade" min="0" placeholder="0" required />
              </div>
              <div class="form-group">
                <label>Unidade</label>
                <select id="m-unidade">
                  <option value="UN">UN - Unidade</option>
                  <option value="L">L - Litro</option>
                  <option value="KG">KG - Quilograma</option>
                  <option value="CX">CX - Caixa</option>
                  <option value="PCT">PCT - Pacote</option>
                </select>
              </div>
              <div class="form-group">
                <label>Estoque mínimo</label>
                <input type="number" id="m-minimo" min="0" placeholder="0" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-produto').classList.remove('show')">Cancelar</button>
            <button class="btn btn-primary" id="btn-salvar">💾 Salvar</button>
          </div>
        </div>
      </div>

      <!-- Modal Ajuste de Estoque -->
      <div id="modal-ajuste" class="modal">
        <div class="modal-content" style="max-width:500px">
          <div class="modal-header">
            <h3>📊 Ajustar Estoque</h3>
            <button class="btn-close" onclick="document.getElementById('modal-ajuste').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <p id="ajuste-produto" style="color:var(--muted);margin:-10px 0 20px">Produto selecionado</p>
            
            <div class="form-group">
              <label>Tipo de movimentação</label>
              <select id="aj-tipo">
                <option value="entrada">➕ Entrada</option>
                <option value="saida">➖ Saída</option>
              </select>
            </div>
            <div class="form-group">
              <label>Quantidade</label>
              <input type="number" id="aj-quantidade" min="1" value="1" />
            </div>
            <div class="form-group">
              <label>Motivo (opcional)</label>
              <input type="text" id="aj-motivo" placeholder="Ex: Compra de fornecedor, Ajuste de inventário..." />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-ajuste').classList.remove('show')">Cancelar</button>
            <button class="btn btn-primary" id="btn-confirmar-ajuste">✓ Confirmar</button>
          </div>
        </div>
      </div>

      <!-- Modal Confirmar Exclusão -->
      <div id="modal-delete" class="modal">
        <div class="modal-content" style="max-width:400px">
          <div class="modal-header">
            <h3>⚠️ Confirmar Exclusão</h3>
            <button class="btn-close" onclick="document.getElementById('modal-delete').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <p>Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-delete').classList.remove('show')">Cancelar</button>
            <button class="btn btn-danger" id="btn-confirmar-exclusao">🗑️ Excluir</button>
          </div>
        </div>
      </div>

      <!-- Modal Relatório de Lucros -->
      <div id="modal-relatorio" class="modal">
        <div class="modal-content" style="max-width:800px">
          <div class="modal-header">
            <h3>📊 Relatório de Lucros</h3>
            <button class="btn-close" onclick="document.getElementById('modal-relatorio').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <div id="relatorio-content"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-relatorio').classList.remove('show')">Fechar</button>
            <button class="btn btn-primary" id="btn-imprimir-relatorio">🖨️ Imprimir</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.produtos = [];
    this.editandoId = null;
    this.ajustandoId = null;
    this.deletandoId = null;
    this.tipoAtual = 'unitario';
    this.tipoSelecionado = 'unitario';
    
    await this.carregarProdutos();
    this.setupEventListeners();
  },

  async carregarProdutos() {
    try {
      const res = await fetch('/api/produtos');
      if (!res.ok) throw new Error('Erro ao carregar');
      this.produtos = await res.json();
      
      this.atualizarEstatisticas();
      this.renderizarTabela();
    } catch (e) {
      console.error(e);
      document.getElementById('table-body').innerHTML = `
        <tr>
          <td colspan="10" class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
            <div class="icon" style="font-size:48px;margin-bottom:12px">❌</div>
            <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Erro ao carregar produtos</h4>
          </td>
        </tr>
      `;
    }
  },

  atualizarEstatisticas() {
    let valorTotal = 0;
    let baixo = 0;
    let lucroEstimado = 0;
    let unitarios = 0;
    let caixas = 0;

    this.produtos.forEach(p => {
      const qtd = p.quantidade || 0;
      const venda = p.preco || 0;
      const custo = p.precoCusto || 0;
      
      valorTotal += qtd * venda;
      lucroEstimado += qtd * (venda - custo);
      
      if (qtd > 0 && qtd <= (p.minimo || 0)) baixo++;
      
      if (p.tipo === 'caixa') caixas++;
      else unitarios++;
    });

    document.getElementById('stat-unitarios').textContent = unitarios;
    document.getElementById('stat-caixas').textContent = caixas;
    document.getElementById('stat-valor').textContent = (window.Utils || Utils).formatMoney(valorTotal);
    document.getElementById('stat-baixo').textContent = baixo;
    document.getElementById('stat-lucro').textContent = (window.Utils || Utils).formatMoney(lucroEstimado);
    
    document.getElementById('count-unitarios').textContent = unitarios;
    document.getElementById('count-caixas').textContent = caixas;
  },

  renderizarTabela() {
    const tbody = document.getElementById('table-body');
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    const colQtdCaixa = document.getElementById('col-qtd-caixa');
    
    let lista = this.produtos.filter(p => {
      const matchTipo = (p.tipo || 'unitario') === this.tipoAtual;
      const matchSearch = !searchTerm || 
        (p.nome || '').toLowerCase().includes(searchTerm) ||
        (p.sku || '').toLowerCase().includes(searchTerm);
      return matchTipo && matchSearch;
    });

    if (lista.length === 0) {
      const tipoLabel = this.tipoAtual === 'caixa' ? 'caixas' : 'produtos unitários';
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="empty-state" style="text-align:center;padding:60px 20px;color:var(--muted)">
            <div class="icon" style="font-size:48px;margin-bottom:12px">${this.tipoAtual === 'caixa' ? '📦' : '📄'}</div>
            <h4 style="margin:0 0 8px;color:#0f172a;font-size:18px">Nenhum(a) ${tipoLabel} encontrado(a)</h4>
            <p>Clique em "Nov${this.tipoAtual === 'caixa' ? 'a Caixa' : 'o Unitário'}" para cadastrar</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = lista.map(p => {
      const status = this.getStockStatus(p);
      const isLow = p.quantidade <= (p.minimo || 0);
      const custo = p.precoCusto || 0;
      const venda = p.preco || 0;
      const lucro = venda - custo;
      const margemPct = custo > 0 ? ((lucro / custo) * 100).toFixed(0) : 0;
      const margemClass = lucro > 0 ? 'margem-positiva' : (lucro < 0 ? 'margem-negativa' : '');
      const qtdPorCaixaCol = this.tipoAtual === 'caixa' ? `<td><strong>${p.qtdPorCaixa || 1}</strong> un</td>` : '';

      return `
        <tr class="${isLow ? 'lowstock' : ''}" style="${isLow ? 'background:linear-gradient(90deg,#fef2f2 0%,#fff 50%)' : ''}">
          <td>
            <div class="produto-info" style="display:flex;flex-direction:column;gap:2px">
              <span class="produto-nome" style="font-weight:600;color:#0f172a">${(window.Utils || Utils).escapeHtml(p.nome)}</span>
            </div>
          </td>
          <td><span class="produto-sku" style="font-size:12px;color:var(--muted)">${(window.Utils || Utils).escapeHtml(p.sku || '—')}</span></td>
          ${qtdPorCaixaCol}
          <td style="color:var(--muted)">${(window.Utils || Utils).formatMoney(custo)}</td>
          <td><strong>${(window.Utils || Utils).formatMoney(venda)}</strong></td>
          <td class="${margemClass}" style="color:${lucro >= 0 ? '#0aa04e' : '#dc2626'};font-weight:600"><strong>${(window.Utils || Utils).formatMoney(lucro)}</strong></td>
          <td class="${margemClass}" style="color:${lucro >= 0 ? '#0aa04e' : '#dc2626'};font-weight:600">${margemPct}%</td>
          <td><strong>${p.quantidade}</strong> ${(window.Utils || Utils).escapeHtml(p.unidade || 'UN')}</td>
          <td><span class="badge ${status.class}" style="display:inline-flex;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${status.class === 'green' ? 'var(--primary-light)' : status.class === 'yellow' ? 'var(--warning-light)' : 'var(--danger-light)'};color:${status.class === 'green' ? 'var(--primary)' : status.class === 'yellow' ? '#b45309' : 'var(--danger)'}">${status.text}</span></td>
          <td>
            <div class="table-actions" style="display:flex;gap:6px;justify-content:center">
              <button class="btn-icon-sm" data-action="edit-produto" data-id="${p._id || p.id}" title="Editar">✏️</button>
              <button class="btn-icon-sm" data-action="ajustar-produto" data-id="${p._id || p.id}" title="Ajustar estoque">📊</button>
              <button class="btn-icon-sm btn-danger" data-action="delete-produto" data-id="${p._id || p.id}" title="Excluir">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  getStockStatus(produto) {
    if (produto.quantidade <= 0) return { text: 'Sem estoque', class: 'red' };
    if (produto.quantidade <= (produto.minimo || 0)) return { text: 'Baixo', class: 'yellow' };
    return { text: 'OK', class: 'green' };
  },

  mudarAba(tipo) {
    this.tipoAtual = tipo;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.tipo === tipo) {
        btn.classList.add('active');
        if (tipo === 'caixa') {
          btn.style.background = 'var(--purple)';
          btn.style.color = '#fff';
        } else {
          btn.style.background = 'var(--primary)';
          btn.style.color = '#fff';
        }
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--muted)';
      }
    });
    
    const titulo = document.getElementById('titulo-lista');
    const colQtdCaixa = document.getElementById('col-qtd-caixa');
    
    if (tipo === 'caixa') {
      titulo.innerHTML = '📦 Caixas Fechadas';
      colQtdCaixa.style.display = '';
    } else {
      titulo.innerHTML = '📄 Produtos Unitários';
      colQtdCaixa.style.display = 'none';
    }
    
    this.renderizarTabela();
  },

  selecionarTipo(tipo) {
    this.tipoSelecionado = tipo;
    
    document.querySelectorAll('.tipo-option').forEach(opt => {
      opt.classList.remove('active');
    });
    const tipoOption = document.querySelector(`.tipo-option.${tipo}`);
    if (tipoOption) {
      tipoOption.classList.add('active');
      if (tipo === 'unitario') {
        tipoOption.style.borderColor = 'var(--primary)';
        tipoOption.style.background = 'var(--primary-light)';
      } else {
        tipoOption.style.borderColor = 'var(--purple)';
        tipoOption.style.background = 'var(--purple-light)';
      }
    }
    
    const grupoQtdCaixa = document.getElementById('grupo-qtd-caixa');
    const labelQuantidade = document.getElementById('label-quantidade');
    const btnSalvar = document.getElementById('btn-salvar');
    const unidadeSelect = document.getElementById('m-unidade');
    
    if (tipo === 'caixa') {
      if (grupoQtdCaixa) grupoQtdCaixa.style.display = '';
      if (labelQuantidade) labelQuantidade.textContent = 'Quantidade de Caixas *';
      if (btnSalvar) {
        btnSalvar.className = 'btn btn-purple';
      }
      if (unidadeSelect) unidadeSelect.value = 'CX';
    } else {
      if (grupoQtdCaixa) grupoQtdCaixa.style.display = 'none';
      if (labelQuantidade) labelQuantidade.textContent = 'Quantidade em Estoque *';
      if (btnSalvar) {
        btnSalvar.className = 'btn btn-primary';
      }
      if (unidadeSelect) unidadeSelect.value = 'UN';
    }
    
    document.getElementById('m-sku').value = this.gerarSku(tipo);
  },

  gerarSku(tipo) {
    const prefix = tipo === 'caixa' ? 'CX' : 'UN';
    let max = 0;
    this.produtos.filter(p => (p.tipo || 'unitario') === tipo).forEach(p => {
      const m = String(p.sku || '').match(/(\d+)/);
      if (m) {
        const num = parseInt(m[1], 10);
        if (num > max) max = num;
      }
    });
    return prefix + String(max + 1).padStart(4, '0');
  },

  calcularMargem() {
    const custo = parseFloat(document.getElementById('m-precoCusto')?.value) || 0;
    const venda = parseFloat(document.getElementById('m-preco')?.value) || 0;
    const margemInput = document.getElementById('m-margem');
    
    if (!margemInput) return;
    
    if (custo > 0 && venda > 0) {
      const lucro = venda - custo;
      const margemPct = ((lucro / custo) * 100).toFixed(1);
      const margemBruta = lucro.toFixed(2);
      
      margemInput.value = `${margemPct}% (R$ ${margemBruta.replace('.', ',')} de lucro)`;
      margemInput.style.color = lucro >= 0 ? '#0aa04e' : '#dc2626';
      margemInput.style.background = lucro >= 0 ? '#e6f9ee' : '#fef2f2';
    } else {
      margemInput.value = '—';
      margemInput.style.color = '#6b7280';
      margemInput.style.background = '#f4f7fb';
    }
  },

  abrirModalNovo(tipo = 'unitario') {
    this.editandoId = null;
    this.tipoSelecionado = tipo;
    
    document.getElementById('modal-title').innerHTML = tipo === 'caixa' ? '📦 Nova Caixa Fechada' : '📄 Novo Produto Unitário';
    document.getElementById('tipo-selector').style.display = 'grid';
    document.getElementById('m-nome').value = '';
    document.getElementById('m-sku').value = this.gerarSku(tipo);
    document.getElementById('m-codigoBarras').value = '';
    document.getElementById('m-precoCusto').value = '';
    document.getElementById('m-preco').value = '';
    document.getElementById('m-margem').value = '—';
    document.getElementById('m-quantidade').value = '';
    document.getElementById('m-qtdPorCaixa').value = '12';
    document.getElementById('m-minimo').value = '5';
    
    this.selecionarTipo(tipo);
    document.getElementById('modal-produto').classList.add('show');
  },

  abrirModalEditar(id) {
    const produto = this.produtos.find(p => (p._id || p.id) === id);
    if (!produto) return;

    this.editandoId = produto._id || produto.id;
    this.tipoSelecionado = produto.tipo || 'unitario';
    
    document.getElementById('modal-title').innerHTML = '✏️ Editar Produto';
    document.getElementById('tipo-selector').style.display = 'none';
    document.getElementById('m-nome').value = produto.nome || '';
    document.getElementById('m-sku').value = produto.sku || '';
    document.getElementById('m-codigoBarras').value = produto.codigoBarras || '';
    document.getElementById('m-precoCusto').value = produto.precoCusto || 0;
    document.getElementById('m-preco').value = produto.preco || 0;
    document.getElementById('m-quantidade').value = produto.quantidade || 0;
    document.getElementById('m-unidade').value = produto.unidade || 'UN';
    document.getElementById('m-minimo').value = produto.minimo || 0;
    document.getElementById('m-qtdPorCaixa').value = produto.qtdPorCaixa || 12;
    
    this.selecionarTipo(this.tipoSelecionado);
    this.calcularMargem();
    document.getElementById('modal-produto').classList.add('show');
  },

  abrirModalAjuste(id) {
    const produto = this.produtos.find(p => (p._id || p.id) === id);
    if (!produto) return;

    this.ajustandoId = produto._id || produto.id;
    document.getElementById('ajuste-produto').textContent = produto.nome;
    document.getElementById('aj-tipo').value = 'entrada';
    document.getElementById('aj-quantidade').value = 1;
    document.getElementById('aj-motivo').value = '';
    document.getElementById('modal-ajuste').classList.add('show');
  },

  abrirModalDelete(id) {
    this.deletandoId = id;
    document.getElementById('modal-delete').classList.add('show');
  },

  async salvarProduto() {
    const nome = document.getElementById('m-nome').value.trim();
    const sku = document.getElementById('m-sku').value.trim();
    const codigoBarras = document.getElementById('m-codigoBarras').value.trim();
    const precoCusto = parseFloat(document.getElementById('m-precoCusto').value) || 0;
    const preco = parseFloat(document.getElementById('m-preco').value) || 0;
    const quantidade = parseInt(document.getElementById('m-quantidade').value) || 0;
    const unidade = document.getElementById('m-unidade').value;
    const minimo = parseInt(document.getElementById('m-minimo').value) || 0;
    const qtdPorCaixa = parseInt(document.getElementById('m-qtdPorCaixa').value) || 1;

    if (!nome) {
      if (window.toastManager) window.toastManager.error('Nome é obrigatório');
      return;
    }

    const payload = { 
      nome, sku, codigoBarras, precoCusto, preco, quantidade, unidade, minimo,
      tipo: this.tipoSelecionado,
      qtdPorCaixa: this.tipoSelecionado === 'caixa' ? qtdPorCaixa : 1
    };

    try {
      const url = this.editandoId ? `/api/produtos/${this.editandoId}` : '/api/produtos';
      const method = this.editandoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erro ao salvar');

      const tipoLabel = this.tipoSelecionado === 'caixa' ? 'Caixa' : 'Produto';
      if (window.toastManager) {
        window.toastManager.success(this.editandoId ? `✅ ${tipoLabel} atualizado!` : `✅ ${tipoLabel} cadastrado!`);
      }
      document.getElementById('modal-produto').classList.remove('show');
      await this.carregarProdutos();
      
      this.mudarAba(this.tipoSelecionado);
    } catch (e) {
      if (window.toastManager) window.toastManager.error(e.message);
    }
  },

  async confirmarAjuste() {
    if (!this.ajustandoId) return;

    const tipo = document.getElementById('aj-tipo').value;
    const quantidade = parseInt(document.getElementById('aj-quantidade').value) || 0;

    if (quantidade <= 0) {
      if (window.toastManager) window.toastManager.error('Quantidade inválida');
      return;
    }

    try {
      const res = await fetch(`/api/produtos/${this.ajustandoId}/ajustar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, quantidade })
      });

      if (!res.ok) throw new Error('Erro ao ajustar');

      const msg = tipo === 'entrada' ? `✅ +${quantidade} adicionado!` : `✅ -${quantidade} removido!`;
      if (window.toastManager) window.toastManager.success(msg);
      document.getElementById('modal-ajuste').classList.remove('show');
      await this.carregarProdutos();
    } catch (e) {
      if (window.toastManager) window.toastManager.error(e.message);
    }
  },

  async confirmarExclusao() {
    if (!this.deletandoId) return;

    try {
      const res = await fetch(`/api/produtos/${this.deletandoId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao excluir');

      if (window.toastManager) window.toastManager.success('🗑️ Produto excluído!');
      document.getElementById('modal-delete').classList.remove('show');
      await this.carregarProdutos();
    } catch (e) {
      if (window.toastManager) window.toastManager.error(e.message);
    }
  },

  abrirRelatorio() {
    let totalCusto = 0;
    let totalVenda = 0;
    let totalLucro = 0;
    
    const linhas = this.produtos.map(p => {
      const qtd = p.quantidade || 0;
      const custo = p.precoCusto || 0;
      const venda = p.preco || 0;
      const custoTotal = qtd * custo;
      const vendaTotal = qtd * venda;
      const lucro = vendaTotal - custoTotal;
      const margemPct = custo > 0 ? ((venda - custo) / custo * 100).toFixed(1) : 0;
      const tipoIcon = p.tipo === 'caixa' ? '📦' : '📄';
      
      totalCusto += custoTotal;
      totalVenda += vendaTotal;
      totalLucro += lucro;
      
      return `
        <tr>
          <td>${tipoIcon} ${(window.Utils || Utils).escapeHtml(p.nome)}</td>
          <td style="text-align:center">${qtd}</td>
          <td style="text-align:right">${(window.Utils || Utils).formatMoney(custo)}</td>
          <td style="text-align:right">${(window.Utils || Utils).formatMoney(venda)}</td>
          <td style="text-align:right">${(window.Utils || Utils).formatMoney(custoTotal)}</td>
          <td style="text-align:right">${(window.Utils || Utils).formatMoney(vendaTotal)}</td>
          <td style="text-align:right;color:${lucro >= 0 ? '#0aa04e' : '#dc2626'};font-weight:bold">${(window.Utils || Utils).formatMoney(lucro)}</td>
          <td style="text-align:center">${margemPct}%</td>
        </tr>
      `;
    }).join('');
    
    const margemMedia = totalCusto > 0 ? ((totalLucro / totalCusto) * 100).toFixed(1) : 0;
    
    const unitarios = this.produtos.filter(p => (p.tipo || 'unitario') !== 'caixa').length;
    const caixas = this.produtos.filter(p => p.tipo === 'caixa').length;
    
    document.getElementById('relatorio-content').innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
        <div style="background:#f0f3f7;padding:14px;border-radius:10px;text-align:center">
          <p style="margin:0;font-size:12px;color:#6b7280">Custo Total</p>
          <h3 style="margin:4px 0 0;font-size:16px">${(window.Utils || Utils).formatMoney(totalCusto)}</h3>
        </div>
        <div style="background:#f0f3f7;padding:14px;border-radius:10px;text-align:center">
          <p style="margin:0;font-size:12px;color:#6b7280">Venda Total</p>
          <h3 style="margin:4px 0 0;font-size:16px">${(window.Utils || Utils).formatMoney(totalVenda)}</h3>
        </div>
        <div style="background:#e6f9ee;padding:14px;border-radius:10px;text-align:center">
          <p style="margin:0;font-size:12px;color:#0aa04e">Lucro Estimado</p>
          <h3 style="margin:4px 0 0;font-size:16px;color:#0aa04e">${(window.Utils || Utils).formatMoney(totalLucro)}</h3>
        </div>
        <div style="background:#e6f9ee;padding:14px;border-radius:10px;text-align:center">
          <p style="margin:0;font-size:12px;color:#0aa04e">Margem Média</p>
          <h3 style="margin:4px 0 0;font-size:16px;color:#0aa04e">${margemMedia}%</h3>
        </div>
      </div>
      <div style="display:flex;gap:20px;margin-bottom:16px">
        <span style="font-size:14px">📄 <strong>${unitarios}</strong> unitários</span>
        <span style="font-size:14px">📦 <strong>${caixas}</strong> caixas</span>
      </div>
      <div style="max-height:300px;overflow-y:auto">
        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <thead>
            <tr style="background:#f0f3f7">
              <th style="padding:8px;text-align:left">Produto</th>
              <th style="padding:8px;text-align:center">Qtd</th>
              <th style="padding:8px;text-align:right">Custo</th>
              <th style="padding:8px;text-align:right">Venda</th>
              <th style="padding:8px;text-align:right">Custo Total</th>
              <th style="padding:8px;text-align:right">Venda Total</th>
              <th style="padding:8px;text-align:right">Lucro</th>
              <th style="padding:8px;text-align:center">Margem</th>
            </tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    `;
    
    document.getElementById('modal-relatorio').classList.add('show');
  },

  imprimirRelatorioLucros() {
    const content = document.getElementById('relatorio-content').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Relatório de Lucros - MegaClean</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #0aa04e; font-size: 24px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px; border: 1px solid #ddd; }
          th { background: #f0f3f7; }
        </style>
      </head>
      <body>
        <h1>🧹 MegaClean - Relatório de Lucros</h1>
        <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
        ${content}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  },

  gerarListaCliente() {
    const unitarios = this.produtos.filter(p => (p.tipo || 'unitario') === 'unitario');
    const caixas = this.produtos.filter(p => p.tipo === 'caixa');
    
    const produtosAgrupados = [];
    let numero = 1;
    
    unitarios.forEach(un => {
      const nomeBase = un.nome.replace(/\s*-?\s*\d+[LlMmGgKk]+[Ll]?\s*$/i, '').trim();
      const caixaCorrespondente = caixas.find(cx => {
        const nomeCaixa = cx.nome.replace(/\s*-\s*Cx\s*c\/\d+/i, '').replace(/\s*-?\s*\d+[LlMmGgKk]+[Ll]?\s*$/i, '').trim();
        return nomeCaixa.toLowerCase() === nomeBase.toLowerCase() || 
               cx.nome.toLowerCase().includes(un.nome.toLowerCase().replace(/\s*\d+[LlMmGgKk]+[Ll]?\s*$/i, '').trim());
      });
      
      produtosAgrupados.push({
        numero: numero++,
        nome: un.nome,
        precoUnitario: un.preco,
        precoCaixa: caixaCorrespondente ? caixaCorrespondente.preco : null,
        qtdCaixa: caixaCorrespondente ? caixaCorrespondente.qtdPorCaixa : null
      });
    });
    
    const hoje = new Date();
    const validade = new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000);
    const validadeStr = validade.toLocaleDateString('pt-BR');
    const hojeStr = hoje.toLocaleDateString('pt-BR');
    
    const linhasTabela = produtosAgrupados.map(p => `
      <tr>
        <td style="text-align:center;font-weight:600;color:#666">${String(p.numero).padStart(2, '0')}</td>
        <td style="font-weight:500">${(window.Utils || Utils).escapeHtml(p.nome)}</td>
        <td style="text-align:center;font-weight:700;color:#0aa04e">R$ ${p.precoUnitario.toFixed(2).replace('.', ',')}</td>
        <td style="text-align:center;font-weight:700;color:#8b5cf6">
          ${p.precoCaixa ? `R$ ${p.precoCaixa.toFixed(2).replace('.', ',')}` : '—'}
          ${p.qtdCaixa ? `<br><small style="color:#666;font-weight:400">(Cx c/${p.qtdCaixa})</small>` : ''}
        </td>
        <td style="text-align:center;border:1px dashed #ccc;background:#fafafa"></td>
      </tr>
    `).join('');
    
    const htmlLista = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Tabela de Preços - MegaClean</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            background: #f5f5f5; 
            padding: 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #0aa04e 0%, #059669 100%);
            color: #fff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            font-size: 32px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }
          .header p {
            opacity: 0.9;
            font-size: 14px;
          }
          .validade {
            background: rgba(255,255,255,0.2);
            display: inline-block;
            padding: 8px 20px;
            border-radius: 20px;
            margin-top: 15px;
            font-size: 13px;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          thead th {
            background: #f8f9fa;
            padding: 14px 12px;
            text-align: left;
            font-weight: 700;
            color: #333;
            border-bottom: 2px solid #e0e0e0;
            font-size: 13px;
            text-transform: uppercase;
          }
          thead th:nth-child(1) { width: 50px; text-align: center; }
          thead th:nth-child(3),
          thead th:nth-child(4),
          thead th:nth-child(5) { text-align: center; width: 110px; }
          tbody tr { border-bottom: 1px solid #eee; }
          tbody tr:nth-child(even) { background: #fafafa; }
          tbody tr:hover { background: #f0fff4; }
          tbody td { padding: 12px; font-size: 13px; }
          .footer {
            background: #f8f9fa;
            padding: 25px 30px;
            border-top: 2px solid #e0e0e0;
          }
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .footer-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: #555;
          }
          .footer-item .icon {
            font-size: 18px;
          }
          .footer-note {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px dashed #ddd;
            text-align: center;
            font-size: 12px;
            color: #888;
          }
          .print-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #0aa04e;
            color: #fff;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(10,160,78,0.4);
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .print-btn:hover { transform: scale(1.05); }
          @media print {
            body { background: #fff; padding: 0; }
            .container { box-shadow: none; }
            .print-btn { display: none; }
            .header { padding: 20px; }
            thead th, tbody td { padding: 8px; font-size: 11px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧹 MEGACLEAN DISTRIBUIDORA</h1>
            <p>Produtos de Limpeza para Empresas</p>
            <div class="validade">📅 Preços válidos até ${validadeStr}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Produto</th>
                <th>📄 Unitário</th>
                <th>📦 Caixa</th>
                <th>Qtd</th>
              </tr>
            </thead>
            <tbody>
              ${linhasTabela}
            </tbody>
          </table>
          
          <div class="footer">
            <div class="footer-grid">
              <div class="footer-item">
                <span class="icon">📞</span>
                <span><strong>WhatsApp:</strong> (15) 98828-3792</span>
              </div>
              <div class="footer-item">
                <span class="icon">📧</span>
                <span><strong>E-mail:</strong> megacleandistribuidoraa@gmail.com</span>
              </div>
              <div class="footer-item">
                <span class="icon">💳</span>
                <span><strong>Pagamento:</strong> PIX, Boleto, Cartão</span>
              </div>
              <div class="footer-item">
                <span class="icon">📍</span>
                <span><strong>Região:</strong> Atendemos Sorocaba e região</span>
              </div>
            </div>
            <div class="footer-note">
              Preencha a coluna "Qtd" com a quantidade desejada e envie pelo WhatsApp!<br>
              Lista gerada em ${hojeStr}
            </div>
          </div>
        </div>
        
        <button class="print-btn" onclick="window.print()">
          🖨️ Imprimir / Salvar PDF
        </button>
      </body>
      </html>
    `;
    
    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(htmlLista);
    novaJanela.document.close();
  },

  setupEventListeners() {
    document.getElementById('btn-novo-unitario')?.addEventListener('click', () => {
      this.abrirModalNovo('unitario');
    });

    document.getElementById('btn-nova-caixa')?.addEventListener('click', () => {
      this.abrirModalNovo('caixa');
    });

    document.getElementById('btn-salvar')?.addEventListener('click', () => {
      this.salvarProduto();
    });

    document.getElementById('btn-confirmar-ajuste')?.addEventListener('click', () => {
      this.confirmarAjuste();
    });

    document.getElementById('btn-confirmar-exclusao')?.addEventListener('click', () => {
      this.confirmarExclusao();
    });

    document.getElementById('btn-relatorio')?.addEventListener('click', () => {
      this.abrirRelatorio();
    });

    document.getElementById('btn-imprimir-relatorio')?.addEventListener('click', () => {
      this.imprimirRelatorioLucros();
    });

    document.getElementById('btn-lista-cliente')?.addEventListener('click', () => {
      this.gerarListaCliente();
    });

    document.getElementById('search')?.addEventListener('input', () => {
      this.renderizarTabela();
    });

    document.getElementById('m-precoCusto')?.addEventListener('input', () => {
      this.calcularMargem();
    });

    document.getElementById('m-preco')?.addEventListener('input', () => {
      this.calcularMargem();
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.mudarAba(btn.dataset.tipo);
      });
    });

    document.querySelectorAll('.tipo-option').forEach(opt => {
      opt.addEventListener('click', () => {
        this.selecionarTipo(opt.dataset.tipoSelect);
      });
    });

    // Event delegation para ações da tabela
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      
      if (action === 'edit-produto') {
        this.abrirModalEditar(id);
      } else if (action === 'ajustar-produto') {
        this.abrirModalAjuste(id);
      } else if (action === 'delete-produto') {
        this.abrirModalDelete(id);
      }
    });
  }
};
