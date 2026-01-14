// ============================================
// PÁGINA: NOTAS FISCAIS
// ============================================

export default {
  title: 'Notas Fiscais',
  notas: [],
  editandoId: null,
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>📄 Notas Fiscais</h2>
            <p>Gerencie notas fiscais emitidas</p>
          </div>
          <button class="btn btn-primary" id="btn-nova-nota">➕ Nova Nota Fiscal</button>
        </div>

        <div class="filters-bar">
          <div class="search-box">
            <input type="text" id="search-nota" placeholder="🔍 Buscar por número, cliente ou pedido..." />
          </div>
          <div class="filter-group">
            <select id="filter-status" class="form-control">
              <option value="">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="processando">Processando</option>
              <option value="autorizada">Autorizada</option>
              <option value="cancelada">Cancelada</option>
              <option value="rejeitada">Rejeitada</option>
              <option value="erro">Erro</option>
            </select>
          </div>
        </div>

        <div class="card">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Série</th>
                  <th>Cliente</th>
                  <th>Pedido</th>
                  <th>Data Emissão</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                  <th style="text-align:center">Ações</th>
                </tr>
              </thead>
              <tbody id="tbody-notas">
                <tr><td colspan="8" class="loading-state">Carregando...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal Detalhes Nota Fiscal -->
      <div id="modal-nota" class="modal">
        <div class="modal-content" style="max-width: 800px;">
          <div class="modal-header">
            <h3 id="modal-nota-title">Detalhes da Nota Fiscal</h3>
            <button class="btn-close" onclick="window.notasFiscaisPage.fecharModal()">✕</button>
          </div>
          <div class="modal-body" id="modal-nota-body">
            <!-- Conteúdo será preenchido dinamicamente -->
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="window.notasFiscaisPage.fecharModal()">Fechar</button>
            <button id="btn-download-pdf" class="btn btn-primary" style="display: none;">📥 Download PDF</button>
            <button id="btn-cancelar-nfe" class="btn btn-danger" style="display: none;">❌ Cancelar NF-e</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    await this.loadNotas();
    this.setupEventListeners();
    window.notasFiscaisPage = this;
  },

  async loadNotas() {
    try {
      const res = await fetch('/api/notas-fiscais', {
        headers: (window.Utils || Utils).getAuthHeaders()
      });

      if (!res.ok) throw new Error('Erro ao carregar notas fiscais');

      this.notas = await res.json();
      this.notas = Array.isArray(this.notas) ? this.notas : [];
      this.renderTable();
    } catch (error) {
      console.error('Erro:', error);
      const tbody = document.getElementById('tbody-notas');
      if (tbody) {
        tbody.innerHTML = `
          <tr><td colspan="8" class="error-state">❌ Erro ao carregar notas fiscais</td></tr>
        `;
      }
    }
  },

  renderTable() {
    const tbody = document.getElementById('tbody-notas');
    if (!tbody) return;

    const searchTerm = document.getElementById('search-nota')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filter-status')?.value || '';

    const filtered = this.notas.filter(n => {
      if (searchTerm) {
        const numero = (n.numero || '').toString().toLowerCase();
        const cliente = (n.clienteNome || '').toLowerCase();
        const pedido = (n.pedidoId?._id || n.pedidoId || '').toString().toLowerCase();
        if (!numero.includes(searchTerm) && !cliente.includes(searchTerm) && !pedido.includes(searchTerm)) {
          return false;
        }
      }
      if (statusFilter && n.status !== statusFilter) {
        return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <div>📄</div>
            <h4>Nenhuma nota fiscal encontrada</h4>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(n => {
      const data = (window.Utils || Utils).formatDate(n.dataEmissao);
      const valor = parseFloat(n.valorTotal || n.total || 0);
      const status = this.getStatusBadge(n.status);
      const pedidoRef = n.pedidoId?._id || n.pedidoId || '—';

      return `
        <tr>
          <td><strong>${(window.Utils || Utils).escapeHtml(n.numero || '—')}</strong></td>
          <td>${n.serie || 1}</td>
          <td>${(window.Utils || Utils).escapeHtml(n.clienteNome || '—')}</td>
          <td>${pedidoRef !== '—' ? 'Pedido #' + pedidoRef : '—'}</td>
          <td>${data}</td>
          <td><strong>${(window.Utils || Utils).formatMoney(valor)}</strong></td>
          <td>${status}</td>
          <td>
            <div class="table-actions">
              <button class="btn-icon-sm btn-view" data-action="view" data-id="${n._id}" title="Ver detalhes">👁️</button>
              ${n.status === 'autorizada' && n.pdfBase64 ? '<button class="btn-icon-sm btn-download" data-action="download" data-id="' + n._id + '" title="Download PDF">📥</button>' : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Event delegation para ações
    tbody.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]').dataset.action;
        const id = e.target.closest('[data-action]').dataset.id;
        if (action === 'view') {
          this.verDetalhes(id);
        } else if (action === 'download') {
          this.downloadPDF(id);
        }
      });
    });
  },

  getStatusBadge(status) {
    const badges = {
      'pendente': '<span class="badge badge-warning">⏳ Pendente</span>',
      'processando': '<span class="badge badge-info">🔄 Processando</span>',
      'autorizada': '<span class="badge badge-success">✅ Autorizada</span>',
      'cancelada': '<span class="badge badge-secondary">❌ Cancelada</span>',
      'rejeitada': '<span class="badge badge-danger">⚠️ Rejeitada</span>',
      'erro': '<span class="badge badge-danger">❌ Erro</span>'
    };
    return badges[status] || '<span class="badge">—</span>';
  },

  setupEventListeners() {
    // Busca
    document.getElementById('search-nota')?.addEventListener('input', (window.Utils || Utils).debounce(() => {
      this.renderTable();
    }, 300));

    // Filtro de status
    document.getElementById('filter-status')?.addEventListener('change', () => {
      this.renderTable();
    });

    // Nova nota fiscal
    document.getElementById('btn-nova-nota')?.addEventListener('click', () => {
      (window.toastManager || toastManager).info('Funcionalidade em desenvolvimento. Em breve você poderá emitir notas fiscais diretamente daqui.');
    });
  },

  async verDetalhes(notaId) {
    const nota = this.notas.find(n => n._id === notaId);
    if (!nota) return;

    const modal = document.getElementById('modal-nota');
    const modalBody = document.getElementById('modal-nota-body');
    const btnDownload = document.getElementById('btn-download-pdf');
    const btnCancelar = document.getElementById('btn-cancelar-nfe');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="nota-detalhes">
        <div class="detail-row">
          <strong>Número:</strong> ${nota.numero || '—'}
        </div>
        <div class="detail-row">
          <strong>Série:</strong> ${nota.serie || 1}
        </div>
        <div class="detail-row">
          <strong>Status:</strong> ${this.getStatusBadge(nota.status)}
        </div>
        <div class="detail-row">
          <strong>Cliente:</strong> ${(window.Utils || Utils).escapeHtml(nota.clienteNome || '—')}
        </div>
        <div class="detail-row">
          <strong>CPF/CNPJ:</strong> ${(window.Utils || Utils).escapeHtml(nota.clienteCpfCnpj || '—')}
        </div>
        <div class="detail-row">
          <strong>Pedido:</strong> ${nota.pedidoId?._id || nota.pedidoId || '—'}
        </div>
        <div class="detail-row">
          <strong>Data de Emissão:</strong> ${(window.Utils || Utils).formatDate(nota.dataEmissao)}
        </div>
        ${nota.dataAutorizacao ? `<div class="detail-row"><strong>Data de Autorização:</strong> ${(window.Utils || Utils).formatDate(nota.dataAutorizacao)}</div>` : ''}
        <div class="detail-row">
          <strong>Valor Total:</strong> <strong style="color: var(--primary);">${(window.Utils || Utils).formatMoney(parseFloat(nota.valorTotal || 0))}</strong>
        </div>
        ${nota.chaveAcesso ? `<div class="detail-row"><strong>Chave de Acesso:</strong> <code>${nota.chaveAcesso}</code></div>` : ''}
        ${nota.protocolo ? `<div class="detail-row"><strong>Protocolo:</strong> ${nota.protocolo}</div>` : ''}
        ${nota.mensagemErro ? `<div class="detail-row"><strong style="color: var(--danger);">Erro:</strong> ${(window.Utils || Utils).escapeHtml(nota.mensagemErro)}</div>` : ''}
      </div>
    `;

    // Mostrar/ocultar botões
    if (nota.status === 'autorizada' && nota.pdfBase64) {
      btnDownload.style.display = 'inline-block';
      btnDownload.onclick = () => this.downloadPDF(notaId);
    } else {
      btnDownload.style.display = 'none';
    }

    if (nota.status === 'autorizada') {
      btnCancelar.style.display = 'inline-block';
      btnCancelar.onclick = () => this.cancelarNFe(notaId);
    } else {
      btnCancelar.style.display = 'none';
    }

    modal.classList.add('show');
  },

  fecharModal() {
    document.getElementById('modal-nota')?.classList.remove('show');
  },

  downloadPDF(notaId) {
    const nota = this.notas.find(n => n._id === notaId);
    if (!nota || !nota.pdfBase64) {
      (window.toastManager || toastManager).error('PDF não disponível para esta nota fiscal.');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${nota.pdfBase64}`;
      link.download = `NF-e-${nota.numero || notaId}.pdf`;
      link.click();
      (window.toastManager || toastManager).success('Download iniciado!');
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      (window.toastManager || toastManager).error('Erro ao fazer download do PDF.');
    }
  },

  async cancelarNFe(notaId) {
    if (!confirm('Tem certeza que deseja cancelar esta nota fiscal?')) return;

    try {
      const res = await fetch(`/api/notas-fiscais/${notaId}`, {
        method: 'DELETE',
        headers: (window.Utils || Utils).getAuthHeaders()
      });

      if (!res.ok) throw new Error('Erro ao cancelar nota fiscal');

      (window.toastManager || toastManager).success('Nota fiscal cancelada com sucesso!');
      this.fecharModal();
      await this.loadNotas();
    } catch (error) {
      console.error('Erro ao cancelar nota fiscal:', error);
      (window.toastManager || toastManager).error('Erro ao cancelar nota fiscal.');
    }
  }
};
