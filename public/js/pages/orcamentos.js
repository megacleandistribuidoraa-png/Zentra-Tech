// ============================================
// PÁGINA: ORÇAMENTOS
// ============================================

export default {
  title: 'Orçamentos',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>📋 Orçamentos</h2>
          </div>
          <button class="btn btn-primary" id="btn-novo-orcamento">➕ Novo Orçamento</button>
        </div>

        <!-- Formulário Novo Orçamento -->
        <div class="card" id="form-orcamento" style="display:none;background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:20px">
          <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0 0 16px">Criar Orçamento</h3>
          <div class="grid-2" style="display:grid;grid-template-columns:1fr 380px;gap:20px">
            <div>
              <div class="form-group" style="margin-bottom:16px">
                <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Cliente *</label>
                <select id="select-cliente" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px">
                  <option value="">Selecione...</option>
                </select>
              </div>
              <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
                <div class="form-group" style="margin-bottom:16px">
                  <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Desconto (%)</label>
                  <input type="number" id="input-desconto" value="0" min="0" max="100" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
                </div>
                <div class="form-group" style="margin-bottom:16px">
                  <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Validade</label>
                  <input type="date" id="input-validade" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
                </div>
              </div>
              <div class="form-group" style="margin-bottom:16px">
                <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Buscar Produto</label>
                <input type="text" id="busca-produto" placeholder="Digite para buscar..." style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
              </div>
              <div class="product-list" id="lista-produtos" style="max-height:300px;overflow-y:auto;border:2px solid #e5e7eb;border-radius:8px"></div>
            </div>
            <div>
              <div class="cart-section" style="background:#f8fafc;border-radius:12px;padding:16px">
                <h4 style="margin:0 0 12px">🛒 Itens do Orçamento</h4>
                <div id="carrinho-items"></div>
                <div class="cart-total" style="border-top:2px solid #e5e7eb;padding-top:12px;margin-top:12px">
                  <div class="cart-total-row" style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span>Subtotal:</span>
                    <span id="subtotal">R$ 0,00</span>
                  </div>
                  <div class="cart-total-row" style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span>Desconto:</span>
                    <span id="desconto-valor">- R$ 0,00</span>
                  </div>
                  <div class="cart-total-row final" style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:18px;font-weight:700;color:var(--primary)">
                    <span>Total:</span>
                    <span id="total">R$ 0,00</span>
                  </div>
                </div>
                <div style="margin-top:16px;display:flex;gap:10px">
                  <button class="btn btn-ghost" id="btn-cancelar-orcamento" style="padding:10px 18px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:14px;background:#f0f3f7;color:var(--muted)">Cancelar</button>
                  <button class="btn btn-primary" id="btn-salvar-orcamento" style="flex:1;padding:10px 18px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:14px;background:var(--primary);color:#fff">💾 Salvar Orçamento</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de Orçamentos -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow)">
          <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0 0 16px">📋 Orçamentos</h3>
          <div id="lista-orcamentos"></div>
        </div>
      </div>

      <!-- Modal Converter -->
      <div id="modal-converter" class="modal">
        <div class="modal-content" style="max-width:500px">
          <div class="modal-header">
            <h3>🛒 Converter em Pedido</h3>
            <button class="btn-close" onclick="document.getElementById('modal-converter').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <p>Deseja converter este orçamento em pedido?</p>
            <p><strong>O estoque será descontado automaticamente.</strong></p>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Forma de Pagamento</label>
              <select id="forma-pagamento" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px">
                <option value="dinheiro">💵 Dinheiro</option>
                <option value="pix">📱 PIX</option>
                <option value="cartao_credito">💳 Cartão Crédito</option>
                <option value="cartao_debito">💳 Cartão Débito</option>
                <option value="boleto">📄 Boleto</option>
                <option value="a_prazo">📅 À Prazo</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-converter').classList.remove('show')">Cancelar</button>
            <button class="btn btn-primary" id="btn-confirmar-conversao">✓ Converter</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.clientes = [];
    this.produtos = [];
    this.orcamentos = [];
    this.carrinho = [];
    this.orcamentoParaConverter = null;
    
    await this.carregarDados();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  formatMoney(v) {
    return 'R$ ' + Number(v || 0).toFixed(2).replace('.', ',');
  },

  async carregarDados() {
    const [cRes, pRes, oRes] = await Promise.all([
      fetch('/api/clientes'),
      fetch('/api/produtos'),
      fetch('/api/orcamentos')
    ]);
    this.clientes = await cRes.json();
    this.produtos = await pRes.json();
    this.orcamentos = await oRes.json();
    
    document.getElementById('select-cliente').innerHTML = 
      '<option value="">Selecione...</option>' + 
      this.clientes.map(c => `<option value="${c._id || c.id}">${(window.Utils || Utils).escapeHtml(c.nome)}</option>`).join('');
    
    const validade = new Date();
    validade.setDate(validade.getDate() + 7);
    document.getElementById('input-validade').value = validade.toISOString().slice(0,10);
    
    this.renderizarProdutos();
    this.renderizarOrcamentos();
  },

  renderizarProdutos() {
    const busca = document.getElementById('busca-produto')?.value.toLowerCase() || '';
    const filtrados = this.produtos.filter(p => 
      p.nome.toLowerCase().includes(busca) || (p.sku||'').toLowerCase().includes(busca)
    );
    
    const container = document.getElementById('lista-produtos');
    if (filtrados.length === 0) {
      container.innerHTML = '<p style="padding:20px;text-align:center;color:var(--muted)">Nenhum produto</p>';
      return;
    }
    
    container.innerHTML = filtrados.map(p => `
      <div class="product-item" style="display:flex;align-items:center;justify-content:space-between;padding:12px;border-bottom:1px solid #e5e7eb">
        <div class="product-info">
          <h4 style="margin:0;font-size:14px">${(window.Utils || Utils).escapeHtml(p.nome)}</h4>
          <p style="margin:2px 0 0;font-size:12px;color:var(--muted)">${this.formatMoney(p.preco)} | Estoque: ${p.quantidade}</p>
        </div>
        <button class="btn btn-primary btn-sm" data-action="add-item" data-id="${p._id || p.id}" style="padding:6px 12px;font-size:12px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600" ${p.quantidade<=0?'disabled':''}>+</button>
      </div>
    `).join('');
  },

  adicionarItem(produtoId) {
    const prod = this.produtos.find(p => (p._id || p.id) === produtoId);
    if (!prod) return;
    
    const existe = this.carrinho.find(c => c.produtoId === produtoId);
    if (existe) {
      if (existe.quantidade < prod.quantidade) existe.quantidade++;
    } else {
      this.carrinho.push({ produtoId, nome: prod.nome, preco: prod.preco, quantidade: 1 });
    }
    this.atualizarCarrinho();
  },

  removerItem(index) {
    this.carrinho.splice(index, 1);
    this.atualizarCarrinho();
  },

  atualizarCarrinho() {
    const container = document.getElementById('carrinho-items');
    if (this.carrinho.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--muted);padding:20px">Carrinho vazio</p>';
    } else {
      container.innerHTML = this.carrinho.map((c, i) => `
        <div class="cart-item" style="display:flex;justify-content:space-between;padding:10px;background:var(--card);border-radius:8px;margin-bottom:8px">
          <div class="cart-item-info">
            <h5 style="margin:0;font-size:13px">${(window.Utils || Utils).escapeHtml(c.nome)}</h5>
            <p style="margin:2px 0 0;font-size:11px;color:var(--muted)">${c.quantidade}x ${this.formatMoney(c.preco)} = ${this.formatMoney(c.quantidade * c.preco)}</p>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="window.orcamentosPage.removerItem(${i})" style="padding:6px 12px;font-size:12px;background:#f0f3f7;color:var(--muted);border:none;border-radius:8px;cursor:pointer;font-weight:600">✕</button>
        </div>
      `).join('');
    }
    
    const subtotal = this.carrinho.reduce((s, c) => s + (c.quantidade * c.preco), 0);
    const desconto = Number(document.getElementById('input-desconto').value) || 0;
    const descontoValor = subtotal * desconto / 100;
    const total = subtotal - descontoValor;
    
    document.getElementById('subtotal').textContent = this.formatMoney(subtotal);
    document.getElementById('desconto-valor').textContent = '- ' + this.formatMoney(descontoValor);
    document.getElementById('total').textContent = this.formatMoney(total);
  },

  mostrarNovoOrcamento() {
    document.getElementById('form-orcamento').style.display = 'block';
    this.carrinho = [];
    this.atualizarCarrinho();
  },

  cancelarOrcamento() {
    document.getElementById('form-orcamento').style.display = 'none';
    this.carrinho = [];
  },

  async salvarOrcamento() {
    const clienteId = document.getElementById('select-cliente').value;
    if (!clienteId) { 
      if (window.toastManager) window.toastManager.error('Selecione um cliente');
      return; 
    }
    if (this.carrinho.length === 0) { 
      if (window.toastManager) window.toastManager.error('Adicione itens');
      return; 
    }
    
    const data = {
      clienteId,
      items: this.carrinho.map(c => ({ produtoId: c.produtoId, quantidade: c.quantidade })),
      desconto: Number(document.getElementById('input-desconto').value) || 0,
      validade: document.getElementById('input-validade').value
    };
    
    try {
      const res = await fetch('/api/orcamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        if (window.toastManager) window.toastManager.success('✅ Orçamento criado!');
        this.cancelarOrcamento();
        await this.carregarDados();
      } else {
        const err = await res.json();
        if (window.toastManager) window.toastManager.error(err.error || 'Erro ao criar orçamento');
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error('Erro ao criar orçamento');
    }
  },

  renderizarOrcamentos() {
    const container = document.getElementById('lista-orcamentos');
    if (this.orcamentos.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px">Nenhum orçamento</p>';
      return;
    }
    
    container.innerHTML = this.orcamentos.map(o => {
      const data = o.dateISO ? new Date(o.dateISO).toLocaleDateString('pt-BR') : '—';
      const validade = o.validade ? new Date(o.validade+'T12:00:00').toLocaleDateString('pt-BR') : '—';
      const statusLabel = {pendente:'Pendente',aprovado:'Aprovado',convertido:'Convertido',rejeitado:'Rejeitado',expirado:'Expirado'}[o.status] || 'Pendente';
      
      const cliente = this.clientes.find(c => (c._id || c.id) === o.clienteId);
      const whatsLink = cliente?.telefone ? 
        `https://wa.me/55${cliente.telefone.replace(/\D/g,'')}?text=${encodeURIComponent(`Olá! Segue o orçamento #${String(o._id || o.id).slice(-6)} no valor de ${this.formatMoney(o.totalComDesconto || o.total)}. Válido até ${validade}.`)}` : '';
      
      const statusClass = {
        pendente: 'pendente',
        aprovado: 'aprovado',
        convertido: 'convertido',
        rejeitado: 'rejeitado',
        expirado: 'expirado'
      }[o.status] || 'pendente';
      
      return `
        <div class="orcamento-item ${statusClass}" style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:#f8fafc;border-radius:10px;margin-bottom:10px;border-left:4px solid ${statusClass === 'aprovado' ? 'var(--primary)' : statusClass === 'convertido' ? 'var(--info)' : statusClass === 'rejeitado' ? 'var(--danger)' : 'var(--warning)'}">
          <div class="orcamento-info">
            <h4 style="margin:0;font-size:15px">${(window.Utils || Utils).escapeHtml(cliente?.nome || 'Cliente')} <span class="badge ${statusClass}" style="padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:${statusClass === 'pendente' ? 'var(--warning-light)' : statusClass === 'aprovado' ? 'var(--primary-light)' : statusClass === 'convertido' ? '#dbeafe' : '#fee2e2'};color:${statusClass === 'pendente' ? '#b45309' : statusClass === 'aprovado' ? 'var(--primary)' : statusClass === 'convertido' ? 'var(--info)' : 'var(--danger)'}">${statusLabel}</span></h4>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">📅 ${data} | Validade: ${validade} | ${o.items?.length||0} item(s)</p>
          </div>
          <div class="orcamento-valor" style="text-align:right">
            <h4 style="margin:0;font-size:18px;color:var(--primary)">${this.formatMoney(o.totalComDesconto || o.total)}</h4>
            <div style="margin-top:8px;display:flex;gap:6px">
              ${whatsLink ? `<a href="${whatsLink}" target="_blank" class="btn btn-ghost btn-sm" style="padding:6px 12px;font-size:12px;background:#f0f3f7;color:var(--muted);border:none;border-radius:8px;cursor:pointer;font-weight:600;text-decoration:none">📱</a>` : ''}
              ${o.status==='pendente' ? `<button class="btn btn-primary btn-sm" data-action="converter" data-id="${o._id || o.id}" style="padding:6px 12px;font-size:12px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600">🛒 Converter</button>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  abrirConverter(id) {
    this.orcamentoParaConverter = id;
    document.getElementById('modal-converter').classList.add('show');
  },

  async confirmarConversao() {
    if (!this.orcamentoParaConverter) return;
    
    try {
      const res = await fetch(`/api/orcamentos/${this.orcamentoParaConverter}/converter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formaPagamento: document.getElementById('forma-pagamento').value
        })
      });
      
      if (res.ok) {
        if (window.toastManager) window.toastManager.success('✅ Orçamento convertido em pedido!');
        document.getElementById('modal-converter').classList.remove('show');
        this.orcamentoParaConverter = null;
        await this.carregarDados();
      } else {
        const err = await res.json();
        if (window.toastManager) window.toastManager.error(err.error || 'Erro ao converter');
      }
    } catch (e) {
      if (window.toastManager) window.toastManager.error('Erro ao converter');
    }
  },

  setupEventListeners() {
    document.getElementById('btn-novo-orcamento')?.addEventListener('click', () => {
      this.mostrarNovoOrcamento();
    });

    document.getElementById('btn-cancelar-orcamento')?.addEventListener('click', () => {
      this.cancelarOrcamento();
    });

    document.getElementById('btn-salvar-orcamento')?.addEventListener('click', () => {
      this.salvarOrcamento();
    });

    document.getElementById('btn-confirmar-conversao')?.addEventListener('click', () => {
      this.confirmarConversao();
    });

    document.getElementById('busca-produto')?.addEventListener('input', () => {
      this.renderizarProdutos();
    });

    document.getElementById('input-desconto')?.addEventListener('change', () => {
      this.atualizarCarrinho();
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      
      if (action === 'add-item') {
        this.adicionarItem(id);
      } else if (action === 'converter') {
        this.abrirConverter(id);
      }
    });
  }
};
