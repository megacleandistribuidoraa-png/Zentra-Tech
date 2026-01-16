// ============================================
// PÁGINA: CONTAS A RECEBER
// ============================================

export default {
  title: 'Contas a Receber',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>💰 Contas a Receber</h2>
          </div>
        </div>

        <div class="stats-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px">
          <div class="stat-card danger" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);text-align:center">
            <h3 style="margin:0;font-size:28px;color:var(--danger)" id="total-receber">R$ 0</h3>
            <p style="margin:8px 0 0;color:var(--muted);font-size:14px">Total a Receber</p>
          </div>
          <div class="stat-card warning" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);text-align:center">
            <h3 style="margin:0;font-size:28px;color:var(--warning)" id="qtd-pendentes">0</h3>
            <p style="margin:8px 0 0;color:var(--muted);font-size:14px">Contas Pendentes</p>
          </div>
          <div class="stat-card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);text-align:center">
            <h3 style="margin:0;font-size:28px;color:var(--primary)" id="recebido-mes">R$ 0</h3>
            <p style="margin:8px 0 0;color:var(--muted);font-size:14px">Recebido este Mês</p>
          </div>
        </div>

        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:20px">
          <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0 0 16px">📋 Contas Pendentes</h3>
          <div id="lista-contas">
            <div class="empty-state" style="text-align:center;padding:40px;color:var(--muted)">
              <div class="icon" style="font-size:48px;margin-bottom:10px">✅</div>
              <h4 style="margin:0 0 8px;color:#0f172a;font-size:16px">Nenhuma conta pendente!</h4>
              <p>Todas as contas estão em dia</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Pagamento -->
      <div id="modal-pagamento" class="modal">
        <div class="modal-content" style="max-width:400px">
          <div class="modal-header">
            <h3>💳 Registrar Pagamento</h3>
            <button class="btn-close" onclick="document.getElementById('modal-pagamento').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Cliente</label>
              <input type="text" id="pag-cliente" readonly style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Valor Devido</label>
              <input type="text" id="pag-devido" readonly style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Valor do Pagamento *</label>
              <input type="number" id="pag-valor" step="0.01" placeholder="0,00" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Forma de Pagamento</label>
              <select id="pag-forma" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px">
                <option value="dinheiro">💵 Dinheiro</option>
                <option value="pix">📱 PIX</option>
                <option value="cartao_credito">💳 Cartão Crédito</option>
                <option value="cartao_debito">💳 Cartão Débito</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-pagamento').classList.remove('show')">Cancelar</button>
            <button class="btn btn-primary" id="btn-confirmar-pagamento">✓ Confirmar</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.contas = [];
    this.contaAtual = null;
    await this.carregarContas();
    this.setupEventListeners();
  },

  formatMoney(v) {
    return 'R$ ' + Number(v || 0).toFixed(2).replace('.', ',');
  },

  async carregarContas() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/contas-receber`);
      this.contas = await res.json();
      
      const total = this.contas.reduce((s, c) => s + c.valorDevido, 0);
      document.getElementById('total-receber').textContent = this.formatMoney(total);
      document.getElementById('qtd-pendentes').textContent = this.contas.length;
      
      this.renderizarContas();
    } catch(e) {
      console.error(e);
    }
  },

  renderizarContas() {
    const container = document.getElementById('lista-contas');
    
    if (this.contas.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align:center;padding:40px;color:var(--muted)">
          <div class="icon" style="font-size:48px;margin-bottom:10px">✅</div>
          <h4 style="margin:0 0 8px;color:#0f172a;font-size:16px">Nenhuma conta pendente!</h4>
          <p>Todas as contas estão em dia</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = this.contas.map(c => {
      const data = c.dateISO ? new Date(c.dateISO).toLocaleDateString('pt-BR') : '—';
      const whatsLink = c.clienteTelefone ? 
        `https://wa.me/55${c.clienteTelefone.replace(/\D/g,'')}?text=${encodeURIComponent(`Olá ${c.clienteNome}! Passando para lembrar do valor pendente de ${this.formatMoney(c.valorDevido)} referente ao pedido #${c.id}. Como podemos ajudar?`)}` : '';
      
      return `
        <div class="conta-item" style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:#f8fafc;border-radius:10px;margin-bottom:10px;border-left:4px solid var(--warning)">
          <div class="conta-info">
            <h4 style="margin:0;font-size:15px">#${c.id} - ${(window.Utils || Utils).escapeHtml(c.clienteNome)}</h4>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">📅 ${data} | Total: ${this.formatMoney(c.total)} | Pago: ${this.formatMoney(c.valorPago || 0)}</p>
          </div>
          <div class="conta-valor" style="text-align:right">
            <h4 style="margin:0;font-size:18px;color:var(--danger)">${this.formatMoney(c.valorDevido)}</h4>
            <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">Valor Devido</p>
          </div>
          <div class="conta-actions" style="display:flex;gap:8px;margin-left:16px">
            ${whatsLink ? `<a href="${whatsLink}" target="_blank" class="btn btn-whatsapp" style="background:#25d366;color:#fff;padding:10px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:13px;text-decoration:none">📱 WhatsApp</a>` : ''}
            <button class="btn btn-primary" data-action="pagar" data-id="${c._id || c.id}" style="padding:10px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:600;font-size:13px;background:var(--primary);color:#fff">💳 Pagar</button>
          </div>
        </div>
      `;
    }).join('');
  },

  abrirPagamento(id) {
    this.contaAtual = this.contas.find(c => (c._id || c.id) === id);
    if (!this.contaAtual) return;
    
    document.getElementById('pag-cliente').value = this.contaAtual.clienteNome;
    document.getElementById('pag-devido').value = this.formatMoney(this.contaAtual.valorDevido);
    document.getElementById('pag-valor').value = this.contaAtual.valorDevido.toFixed(2);
    document.getElementById('modal-pagamento').classList.add('show');
  },

  async confirmarPagamento() {
    if (!this.contaAtual) return;
    
    const valor = parseFloat(document.getElementById('pag-valor').value);
    const forma = document.getElementById('pag-forma').value;
    
    if (!valor || valor <= 0) {
      if (window.toastManager) window.toastManager.error('Informe um valor válido');
      return;
    }
    
    try {
      const res = await fetch(`/api/pedidos/${this.contaAtual._id || this.contaAtual.id}/pagamento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor, formaPagamento: forma })
      });
      
      if (res.ok) {
        if (window.toastManager) window.toastManager.success('✅ Pagamento registrado!');
        document.getElementById('modal-pagamento').classList.remove('show');
        this.contaAtual = null;
        await this.carregarContas();
      } else {
        if (window.toastManager) window.toastManager.error('Erro ao registrar pagamento');
      }
    } catch(e) {
      if (window.toastManager) window.toastManager.error('Erro ao registrar pagamento');
    }
  },

  setupEventListeners() {
    document.getElementById('btn-confirmar-pagamento')?.addEventListener('click', () => {
      this.confirmarPagamento();
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      
      if (action === 'pagar') {
        this.abrirPagamento(id);
      }
    });
  }
};
