// ============================================
// PÁGINA: RELATÓRIOS
// ============================================

export default {
  title: 'Relatórios',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>📈 Relatórios</h2>
            <p>Acompanhe vendas por dia, período ou mês</p>
          </div>
          <div class="auto-update" style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:var(--primary-light);border-radius:20px;font-size:12px;color:var(--primary);font-weight:600">
            <span class="dot" style="width:8px;height:8px;border-radius:50%;background:var(--primary);animation:pulse 2s infinite"></span>
            Auto-atualização (hoje)
          </div>
        </div>

        <!-- Filtros de período -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="periodo-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;align-items:end">
            <div class="form-group" style="margin-bottom:0">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">📅 Tipo:</label>
              <select id="tipo-periodo" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px">
                <option value="dia">Dia específico</option>
                <option value="periodo">Período personalizado</option>
                <option value="mes">Mês inteiro</option>
              </select>
            </div>
            
            <div class="form-group" id="grupo-dia" style="margin-bottom:0">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Data:</label>
              <input type="date" id="data-relatorio" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            
            <div class="form-group" id="grupo-periodo-inicio" style="display:none;margin-bottom:0">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">De:</label>
              <input type="date" id="data-inicio" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            
            <div class="form-group" id="grupo-periodo-fim" style="display:none;margin-bottom:0">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Até:</label>
              <input type="date" id="data-fim" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            
            <div class="form-group" id="grupo-mes" style="display:none;margin-bottom:0">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Mês:</label>
              <input type="month" id="mes-relatorio" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            
            <div class="periodo-actions" style="display:flex;gap:8px;flex-wrap:wrap">
              <button class="btn btn-ghost" id="btn-atualizar" style="padding:12px 18px;border-radius:10px;border:2px solid #e6e9ef;cursor:pointer;font-weight:600;font-size:14px;background:#f8fafc;color:var(--muted)">🔄 Atualizar</button>
              <button class="btn btn-ghost" id="btn-excel" style="padding:12px 18px;border-radius:10px;border:2px solid #e6e9ef;cursor:pointer;font-weight:600;font-size:14px;background:#f8fafc;color:var(--muted)">📊 Excel</button>
              <button class="btn btn-ghost" id="btn-pdf" style="padding:12px 18px;border-radius:10px;border:2px solid #e6e9ef;cursor:pointer;font-weight:600;font-size:14px;background:#f8fafc;color:var(--muted)">📄 PDF</button>
              <button class="btn btn-primary" id="btn-imprimir" style="padding:12px 18px;border-radius:10px;border:none;cursor:pointer;font-weight:600;font-size:14px;background:var(--primary);color:#fff">🖨️ Imprimir</button>
            </div>
          </div>
        </div>

        <!-- Cards de estatísticas -->
        <div class="stats-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:22px">
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon purple" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--purple-light);color:var(--purple)">🛒</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-pedidos">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Pedidos do dia</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon green" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--primary-light);color:var(--primary)">💰</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-vendas">R$ 0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Total em vendas</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon blue" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--info-light);color:var(--info)">📊</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-ticket">R$ 0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Ticket médio</p>
            </div>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:18px;box-shadow:var(--shadow);display:flex;align-items:center;gap:14px">
            <div class="icon yellow" style="width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--warning-light);color:var(--warning)">👥</div>
            <div class="info">
              <h3 style="margin:0;font-size:24px;font-weight:800" id="stat-clientes">0</h3>
              <p style="margin:4px 0 0;color:var(--muted);font-size:13px">Clientes atendidos</p>
            </div>
          </div>
        </div>

        <!-- Grid de conteúdo -->
        <div class="grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px">
          <!-- Pedidos do dia -->
          <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow)">
            <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">🛒 Pedidos do Dia</h2>
              <span class="badge purple" id="pedidos-count" style="padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:var(--purple-light);color:var(--purple)">0 pedidos</span>
            </div>
            <div id="pedidos-list" style="max-height:400px;overflow-y:auto"></div>
          </div>

          <!-- Vendas por hora -->
          <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow)">
            <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">⏰ Vendas por Hora</h2>
            </div>
            <div id="vendas-hora" class="chart-bars" style="max-height:400px;overflow-y:auto"></div>
          </div>
        </div>

        <div class="grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
          <!-- Produtos mais vendidos -->
          <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow)">
            <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">🏆 Produtos Mais Vendidos</h2>
            </div>
            <div id="top-produtos" style="max-height:400px;overflow-y:auto"></div>
          </div>

          <!-- Clientes do dia -->
          <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow)">
            <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
              <h2 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">👥 Clientes do Dia</h2>
            </div>
            <div id="clientes-list" style="max-height:400px;overflow-y:auto"></div>
          </div>
        </div>
      </div>

      <!-- Área de impressão (invisível) -->
      <div id="print-relatorio" style="display:none">
        <div id="print-content-rel"></div>
      </div>
    `;
  },

  async onLoad() {
    this.tipoPeriodo = 'dia';
    this.dataRelatorio = new Date().toISOString().slice(0, 10);
    this.dataInicio = '';
    this.dataFim = '';
    this.mesRelatorio = new Date().toISOString().slice(0, 7);
    this.dados = null;
    
    document.getElementById('data-relatorio').value = this.dataRelatorio;
    document.getElementById('mes-relatorio').value = this.mesRelatorio;
    
    await this.carregarRelatorio();
    this.setupEventListeners();
  },

  formatMoney(v) {
    return 'R$ ' + Number(v || 0).toFixed(2).replace('.', ',');
  },

  formatTime(hora) {
    return hora + ':00';
  },

  formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR');
  },

  getPeriodoTexto() {
    if (this.tipoPeriodo === 'dia') {
      return this.formatDate(this.dataRelatorio);
    } else if (this.tipoPeriodo === 'periodo') {
      return `${this.formatDate(this.dataInicio)} até ${this.formatDate(this.dataFim)}`;
    } else {
      const mes = new Date(this.mesRelatorio + '-01');
      return mes.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    }
  },

  mudarTipoPeriodo() {
    this.tipoPeriodo = document.getElementById('tipo-periodo').value;
    
    document.getElementById('grupo-dia').style.display = this.tipoPeriodo === 'dia' ? 'block' : 'none';
    document.getElementById('grupo-periodo-inicio').style.display = this.tipoPeriodo === 'periodo' ? 'block' : 'none';
    document.getElementById('grupo-periodo-fim').style.display = this.tipoPeriodo === 'periodo' ? 'block' : 'none';
    document.getElementById('grupo-mes').style.display = this.tipoPeriodo === 'mes' ? 'block' : 'none';
  },

  async carregarRelatorio() {
    try {
      let url = '/api/pedidos/stats?';
      
      if (this.tipoPeriodo === 'dia') {
        url += `data=${this.dataRelatorio}`;
      } else if (this.tipoPeriodo === 'periodo') {
        url += `inicio=${this.dataInicio}&fim=${this.dataFim}`;
      } else {
        url += `mes=${this.mesRelatorio}`;
      }
      
      const res = await fetch(url);
      this.dados = await res.json();
      
      this.renderizarEstatisticas();
      this.renderizarPedidos();
      this.renderizarVendasPorHora();
      this.renderizarTopProdutos();
      this.renderizarClientes();
    } catch (e) {
      console.error(e);
    }
  },

  renderizarEstatisticas() {
    if (!this.dados) return;
    
    document.getElementById('stat-pedidos').textContent = this.dados.totalPedidos || 0;
    document.getElementById('stat-vendas').textContent = this.formatMoney(this.dados.totalVendas || 0);
    document.getElementById('stat-ticket').textContent = this.formatMoney(this.dados.ticketMedio || 0);
    document.getElementById('stat-clientes').textContent = this.dados.totalClientes || 0;
  },

  renderizarPedidos() {
    const container = document.getElementById('pedidos-list');
    const pedidos = this.dados?.pedidos || [];
    
    document.getElementById('pedidos-count').textContent = `${pedidos.length} pedido(s)`;
    
    if (pedidos.length === 0) {
      container.innerHTML = '<div class="empty-state" style="text-align:center;padding:40px;color:var(--muted)"><div class="icon" style="font-size:40px;margin-bottom:10px">📋</div><p>Nenhum pedido</p></div>';
      return;
    }
    
    container.innerHTML = pedidos.map(p => `
      <div class="pedido-item" style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:#f8fafc;border-radius:10px;margin-bottom:10px">
        <div class="pedido-info">
          <h4 style="margin:0;font-size:14px;font-weight:600">#${p.id} - ${(window.Utils || Utils).escapeHtml(p.clienteNome || 'Cliente')}</h4>
          <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">${this.formatTime(p.hora)} • ${p.itens || 0} item(s)</p>
        </div>
        <div class="pedido-valor" style="font-size:16px;font-weight:700;color:var(--primary)">${this.formatMoney(p.total)}</div>
      </div>
    `).join('');
  },

  renderizarVendasPorHora() {
    const container = document.getElementById('vendas-hora');
    const vendas = this.dados?.vendasPorHora || [];
    
    if (vendas.length === 0) {
      container.innerHTML = '<div class="empty-state" style="text-align:center;padding:40px;color:var(--muted)"><div class="icon" style="font-size:40px;margin-bottom:10px">📊</div><p>Sem dados</p></div>';
      return;
    }
    
    const maxVenda = Math.max(...vendas.map(v => v.valor), 1);
    
    container.innerHTML = vendas.map(v => {
      const porcentagem = (v.valor / maxVenda) * 100;
      return `
        <div class="chart-bar" style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          <div class="label" style="width:50px;font-size:12px;color:var(--muted);text-align:right">${this.formatTime(v.hora)}</div>
          <div class="bar-container" style="flex:1;height:24px;background:#f0f3f7;border-radius:4px;overflow:hidden">
            <div class="bar" style="height:100%;background:var(--primary);width:${porcentagem}%;transition:width .3s"></div>
          </div>
          <div class="value" style="width:80px;font-size:13px;font-weight:600;text-align:right">${this.formatMoney(v.valor)}</div>
        </div>
      `;
    }).join('');
  },

  renderizarTopProdutos() {
    const container = document.getElementById('top-produtos');
    const produtos = this.dados?.topProdutos || [];
    
    if (produtos.length === 0) {
      container.innerHTML = '<div class="empty-state" style="text-align:center;padding:40px;color:var(--muted)"><div class="icon" style="font-size:40px;margin-bottom:10px">🏆</div><p>Sem dados</p></div>';
      return;
    }
    
    container.innerHTML = produtos.map((p, i) => `
      <div class="produto-item" style="display:flex;align-items:center;justify-content:space-between;padding:12px;border-bottom:1px solid #f0f3f7">
        <div class="produto-info" style="display:flex;align-items:center;gap:12px">
          <div class="produto-rank" style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">${i + 1}</div>
          <div>
            <div class="produto-nome" style="font-weight:600">${(window.Utils || Utils).escapeHtml(p.nome)}</div>
            <div class="produto-qtd" style="font-size:12px;color:var(--muted)">${p.quantidade} unidade(s)</div>
          </div>
        </div>
        <div class="produto-valor" style="font-weight:700;color:var(--primary)">${this.formatMoney(p.valor)}</div>
      </div>
    `).join('');
  },

  renderizarClientes() {
    const container = document.getElementById('clientes-list');
    const clientes = this.dados?.clientes || [];
    
    if (clientes.length === 0) {
      container.innerHTML = '<div class="empty-state" style="text-align:center;padding:40px;color:var(--muted)"><div class="icon" style="font-size:40px;margin-bottom:10px">👥</div><p>Sem dados</p></div>';
      return;
    }
    
    container.innerHTML = clientes.map(c => `
      <div class="cliente-item" style="display:flex;align-items:center;justify-content:space-between;padding:12px;border-bottom:1px solid #f0f3f7">
        <div>
          <div class="cliente-nome" style="font-weight:600">${(window.Utils || Utils).escapeHtml(c.nome)}</div>
          <div class="cliente-pedidos" style="font-size:12px;color:var(--muted)">${c.pedidos || 0} pedido(s)</div>
        </div>
        <div class="cliente-valor" style="font-weight:700">${this.formatMoney(c.valor)}</div>
      </div>
    `).join('');
  },

  imprimirRelatorio() {
    const printContent = document.getElementById('print-content-rel');
    const periodo = this.getPeriodoTexto();
    
    printContent.innerHTML = `
      <div style="padding:40px;font-family:Arial,sans-serif">
        <div style="text-align:center;border-bottom:3px solid #0aa04e;padding-bottom:20px;margin-bottom:30px">
          <h1 style="margin:0;font-size:28px;color:#0aa04e">🧹 MegaClean</h1>
          <p style="margin:4px 0 0;font-size:14px;color:#666">Relatório de Vendas</p>
          <p style="margin:8px 0 0;font-size:12px;color:#999">Período: ${periodo}</p>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:30px">
          <div style="background:#f8f8f8;border:1px solid #e0e0e0;border-radius:8px;padding:15px;text-align:center">
            <h3 style="margin:0;font-size:22px;color:#0aa04e">${this.dados?.totalPedidos || 0}</h3>
            <p style="margin:5px 0 0;font-size:11px;color:#666">Pedidos</p>
          </div>
          <div style="background:#f8f8f8;border:1px solid #e0e0e0;border-radius:8px;padding:15px;text-align:center">
            <h3 style="margin:0;font-size:22px;color:#0aa04e">${this.formatMoney(this.dados?.totalVendas || 0)}</h3>
            <p style="margin:5px 0 0;font-size:11px;color:#666">Total Vendas</p>
          </div>
          <div style="background:#f8f8f8;border:1px solid #e0e0e0;border-radius:8px;padding:15px;text-align:center">
            <h3 style="margin:0;font-size:22px;color:#0aa04e">${this.formatMoney(this.dados?.ticketMedio || 0)}</h3>
            <p style="margin:5px 0 0;font-size:11px;color:#666">Ticket Médio</p>
          </div>
          <div style="background:#f8f8f8;border:1px solid #e0e0e0;border-radius:8px;padding:15px;text-align:center">
            <h3 style="margin:0;font-size:22px;color:#0aa04e">${this.dados?.totalClientes || 0}</h3>
            <p style="margin:5px 0 0;font-size:11px;color:#666">Clientes</p>
          </div>
        </div>
        
        <div style="margin-top:25px;padding-top:12px;border-top:1px solid #e0e0e0;text-align:center;font-size:10px;color:#999">
          <p style="margin:2px 0"><strong>MegaClean</strong> • Relatório gerado em ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>
    `;
    
    document.getElementById('print-relatorio').style.display = 'block';
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.getElementById('print-relatorio').style.display = 'none';
      }, 500);
    }, 300);
  },

  exportarExcel() {
    if (window.toastManager) window.toastManager.info('Funcionalidade em desenvolvimento');
  },

  exportarPDF() {
    if (window.toastManager) window.toastManager.info('Funcionalidade em desenvolvimento');
  },

  setupEventListeners() {
    document.getElementById('tipo-periodo')?.addEventListener('change', () => {
      this.mudarTipoPeriodo();
    });

    document.getElementById('data-relatorio')?.addEventListener('change', () => {
      this.dataRelatorio = document.getElementById('data-relatorio').value;
    });

    document.getElementById('data-inicio')?.addEventListener('change', () => {
      this.dataInicio = document.getElementById('data-inicio').value;
    });

    document.getElementById('data-fim')?.addEventListener('change', () => {
      this.dataFim = document.getElementById('data-fim').value;
    });

    document.getElementById('mes-relatorio')?.addEventListener('change', () => {
      this.mesRelatorio = document.getElementById('mes-relatorio').value;
    });

    document.getElementById('btn-atualizar')?.addEventListener('click', () => {
      this.carregarRelatorio();
    });

    document.getElementById('btn-imprimir')?.addEventListener('click', () => {
      this.imprimirRelatorio();
    });

    document.getElementById('btn-excel')?.addEventListener('click', () => {
      this.exportarExcel();
    });

    document.getElementById('btn-pdf')?.addEventListener('click', () => {
      this.exportarPDF();
    });
  }
};
