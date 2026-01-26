// ============================================
// PÁGINA: CLIENTES
// ============================================

export default {
  title: 'Clientes',
  clientes: [],
  editandoId: null,
  filtroStatus: 'todos',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>👥 Clientes</h2>
            <p>Cadastre e gerencie seus clientes</p>
          </div>
        </div>

        <!-- Cards de Estatísticas -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon green">👥</div>
            <div class="stat-info">
              <h3 id="stat-total">0</h3>
              <p>Total de clientes</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon blue">✓</div>
            <div class="stat-info">
              <h3 id="stat-ativos">0</h3>
              <p>Clientes ativos</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon red">✕</div>
            <div class="stat-info">
              <h3 id="stat-inativos">0</h3>
              <p>Clientes inativos</p>
            </div>
          </div>
        </div>

        <!-- Grid: Formulário + Lista -->
        <div class="content-grid" style="grid-template-columns: 420px 1fr; gap: 20px; align-items: start;">
          <!-- Formulário -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">➕ Novo Cliente</h2>
            </div>
            
            <form id="form-cliente" autocomplete="off">
              <div class="form-group">
                <label for="nome">Nome completo *</label>
                <input type="text" id="nome" placeholder="Digite o nome do cliente" required />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="cpf">CPF/CNPJ *</label>
                  <input type="text" id="cpf" placeholder="000.000.000-00" maxlength="18" required />
                </div>
                <div class="form-group">
                  <label for="nascimento">Data de Nascimento</label>
                  <input type="date" id="nascimento" />
                </div>
              </div>

              <div class="form-group">
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" placeholder="(00) 00000-0000" />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="email@exemplo.com" />
              </div>

              <div class="form-group">
                <label for="endereco">Endereço</label>
                <input type="text" id="endereco" placeholder="Rua, número, bairro, cidade" />
              </div>

              <div class="form-group">
                <label>Status do cliente *</label>
                <div class="status-toggle">
                  <label class="status-option active ativo" id="opt-ativo">
                    <input type="radio" name="status" value="ativo" checked />
                    ✓ Ativo
                  </label>
                  <label class="status-option inativo" id="opt-inativo">
                    <input type="radio" name="status" value="inativo" />
                    ✕ Inativo
                  </label>
                </div>
              </div>

              <div id="feedback" class="feedback"></div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" id="btn-salvar">
                  💾 Salvar Cliente
                </button>
                <button type="button" class="btn btn-ghost" id="btn-limpar">
                  Limpar
                </button>
              </div>
            </form>
          </div>

          <!-- Lista de Clientes -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">📋 Lista de Clientes</h2>
            </div>

            <div class="filters" style="margin-bottom: 16px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
              <div class="search-box" style="position: relative; flex: 1; max-width: 300px;">
                <input type="text" id="search" placeholder="Buscar por nome ou CPF..." style="width: 100%; padding: 12px 14px 12px 42px; border-radius: 10px; border: 2px solid #e6e9ef; font-size: 14px;" />
                <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px;">🔍</span>
              </div>
              <button class="filter-btn active" data-filter="todos">Todos</button>
              <button class="filter-btn" data-filter="ativo">✓ Ativos</button>
              <button class="filter-btn" data-filter="inativo">✕ Inativos</button>
            </div>

            <!-- Dica de clique -->
            <div class="click-hint" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: var(--info-light); border-radius: 10px; margin-bottom: 16px; font-size: 13px; color: var(--info);">
              💡 <strong>Dica:</strong> Clique em um cliente para ver seus detalhes e histórico de pedidos
            </div>

            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th style="width: 60px">ID</th>
                    <th>Nome</th>
                    <th>CPF/CNPJ</th>
                    <th>Status</th>
                    <th>Endereço</th>
                    <th style="width: 80px">Ações</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  <tr>
                    <td colspan="6" class="loading-state">Carregando clientes...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de confirmação de exclusão -->
      <div id="modal-delete" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>⚠️ Confirmar Exclusão</h3>
            <button class="btn-close" onclick="document.getElementById('modal-delete').classList.remove('show')">✕</button>
          </div>
          <div class="modal-body">
            <p>Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.</p>
            <div style="background: var(--danger-light); padding: 12px; border-radius: 8px; margin-top: 16px;">
              <strong style="color: var(--danger)" id="delete-nome">Nome do cliente</strong>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="document.getElementById('modal-delete').classList.remove('show')">Cancelar</button>
            <button class="btn btn-danger" id="btn-confirm-delete">🗑️ Excluir</button>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    await this.loadClientes();
    this.setupEventListeners();
    this.updateStats();
    window.clientesPage = this;
  },

  async loadClientes() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/clientes`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });

      if (!res.ok) {
        throw new Error(`Erro ao carregar clientes: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const clientesNovos = Array.isArray(data) ? data : [];
      
      // Log detalhado dos clientes recebidos
      console.log(`📥 Dados recebidos da API:`, data);
      console.log(`📊 Array de clientes recebidos:`, clientesNovos);
      console.log(`📝 Nomes dos clientes recebidos:`, clientesNovos.map(c => c.nome || 'Sem nome'));
      
      // Preservar clientes temporários que não foram substituídos
      const clientesTemp = this.clientes.filter(c => c.temp === true);
      console.log(`📋 Clientes temporários na lista atual:`, clientesTemp.length);
      
      // Substituir lista, mas manter temporários que não têm correspondente real
      this.clientes = clientesNovos;
      
      // Adicionar temporários que não foram substituídos
      clientesTemp.forEach(temp => {
        const temCorrespondente = clientesNovos.some(c => {
          const nomeMatch = c.nome === temp.nome;
          const cpfMatch = (c.cpfCnpj === temp.cpfCnpj) || 
                          (c.cpf === temp.cpfCnpj) || 
                          (c.cpfCnpj === temp.cpf) ||
                          (c.cpf === temp.cpf);
          return nomeMatch && (cpfMatch || (!temp.cpfCnpj && !c.cpfCnpj && !c.cpf));
        });
        if (!temCorrespondente) {
          console.log(`➕ Mantendo cliente temporário: ${temp.nome}`);
          this.clientes.unshift(temp);
        }
      });
      
      // Garantir que a lista está ordenada (mais recentes primeiro)
      this.clientes.sort((a, b) => {
        const dateA = new Date(a.dataCriacao || a.createdAt || 0);
        const dateB = new Date(b.dataCriacao || b.createdAt || 0);
        return dateB - dateA;
      });
      
      console.log(`✅ Clientes carregados: ${this.clientes.length} total (${clientesNovos.length} do servidor + ${this.clientes.filter(c => c.temp).length} temporários)`);
      
      this.updateStats();
      this.renderTable();
    } catch (error) {
      console.error('Erro:', error);
      const tbody = document.getElementById('table-body');
      if (tbody) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="error-state">❌ Erro ao carregar clientes</td>
          </tr>
        `;
      }
    }
  },

  updateStats() {
    const total = this.clientes.length;
    const ativos = this.clientes.filter(c => c.status === 'ativo').length;
    const inativos = total - ativos;

    const statTotal = document.getElementById('stat-total');
    const statAtivos = document.getElementById('stat-ativos');
    const statInativos = document.getElementById('stat-inativos');

    if (statTotal) statTotal.textContent = total;
    if (statAtivos) statAtivos.textContent = ativos;
    if (statInativos) statInativos.textContent = inativos;
  },

  renderTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;

    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';

    let filtered = this.clientes.filter(c => {
      // Filtro de status
      if (this.filtroStatus === 'ativo' && c.status !== 'ativo') return false;
      if (this.filtroStatus === 'inativo' && c.status !== 'inativo') return false;

      // Busca
      if (searchTerm) {
        const nome = (c.nome || '').toLowerCase();
        const cpf = ((c.cpfCnpj || c.cpf || '')).toLowerCase();
        return nome.includes(searchTerm) || cpf.includes(searchTerm);
      }

      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="empty-state">
            <div class="icon">👥</div>
            <h4>Nenhum cliente encontrado</h4>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((c, index) => `
      <tr class="${c.status === 'inativo' ? 'inativo' : ''}" style="cursor: pointer;" onclick="window.clientesPage.editarCliente('${c._id}')">
        <td><span class="badge badge-id">${index + 1}</span></td>
        <td>
          <div class="cliente-nome">${(window.Utils || Utils).escapeHtml(c.nome || '—')}</div>
          ${c.email ? `<div class="cliente-hint">${(window.Utils || Utils).escapeHtml(c.email)}</div>` : ''}
        </td>
        <td>${(window.Utils || Utils).escapeHtml(c.cpfCnpj || c.cpf || '—')}</td>
        <td>
          <span class="badge ${c.status === 'ativo' ? 'badge-ativo' : 'badge-inativo'}">
            ${c.status === 'ativo' ? '✓ Ativo' : '✕ Inativo'}
          </span>
        </td>
        <td>${(window.Utils || Utils).escapeHtml(c.endereco || '—')}</td>
        <td>
          <div class="table-actions" onclick="event.stopPropagation()">
            <button class="btn btn-sm btn-info" onclick="window.clientesPage.editarCliente('${c._id}')" title="Editar">✏️</button>
            <button class="btn btn-sm btn-danger" onclick="window.clientesPage.abrirModalDelete('${c._id}')" title="Excluir">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  setupEventListeners() {
    // Formulário
    document.getElementById('form-cliente')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.salvarCliente();
    });

    // Limpar formulário
    document.getElementById('btn-limpar')?.addEventListener('click', () => {
      document.getElementById('form-cliente').reset();
      document.getElementById('opt-ativo').classList.add('active');
      document.getElementById('opt-inativo').classList.remove('active');
      this.editandoId = null;
      document.querySelector('.card-title').textContent = '➕ Novo Cliente';
    });

    // Status toggle
    document.getElementById('opt-ativo')?.addEventListener('click', () => {
      document.getElementById('opt-ativo').classList.add('active');
      document.getElementById('opt-inativo').classList.remove('active');
    });

    document.getElementById('opt-inativo')?.addEventListener('click', () => {
      document.getElementById('opt-inativo').classList.add('active');
      document.getElementById('opt-ativo').classList.remove('active');
    });

    // Busca
    document.getElementById('search')?.addEventListener('input', (window.Utils || Utils).debounce(() => {
      this.renderTable();
    }, 300));

    // Filtros de status
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filtroStatus = btn.getAttribute('data-filter');
        this.renderTable();
      });
    });

    // Confirmar exclusão
    document.getElementById('btn-confirm-delete')?.addEventListener('click', () => {
      this.confirmarExclusao();
    });
  },

  async salvarCliente() {
    const form = document.getElementById('form-cliente');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const status = document.querySelector('input[name="status"]:checked')?.value || 'ativo';

    const data = {
      nome: document.getElementById('nome').value.trim(),
      cpfCnpj: document.getElementById('cpf').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      email: document.getElementById('email').value.trim(),
      endereco: document.getElementById('endereco').value.trim(),
      status: status
    };

    // Data de nascimento (se houver)
    const nascimento = document.getElementById('nascimento').value;
    if (nascimento) {
      data.dataNascimento = nascimento;
    }

    try {
      const url = this.editandoId 
        ? `/api/clientes/${this.editandoId}`
        : '/api/clientes';
      
      const method = this.editandoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          ...(window.Utils || Utils).getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Verificar se a resposta está OK
      if (!res.ok) {
        let errorMessage = `Erro ${res.status}: ${res.statusText}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Se não conseguir fazer parse do erro, usar a mensagem padrão
          const text = await res.text().catch(() => '');
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      // Tentar obter o cliente salvo da resposta
      let clienteSalvo = null;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          clienteSalvo = await res.json();
          console.log('✅ Cliente salvo (resposta da API):', clienteSalvo);
        } catch (jsonError) {
          console.warn('Erro ao fazer parse do JSON da resposta:', jsonError);
          // Se não conseguir fazer parse, criar cliente temporário com os dados do formulário
          if (!this.editandoId) {
            clienteSalvo = {
              _id: 'temp_' + Date.now(),
              ...data,
              dataCriacao: new Date().toISOString(),
              temp: true // Marcar como temporário
            };
            console.log('⚠️ Criando cliente temporário:', clienteSalvo);
          }
        }
      } else {
        // Se não for JSON, criar cliente temporário
        if (!this.editandoId) {
          clienteSalvo = {
            _id: 'temp_' + Date.now(),
            ...data,
            dataCriacao: new Date().toISOString(),
            temp: true
          };
          console.log('⚠️ Resposta não é JSON, criando cliente temporário:', clienteSalvo);
        }
      }
      
      // Se for um novo cliente (não edição), adicionar à lista imediatamente
      if (!this.editandoId && clienteSalvo) {
        // Verificar se o cliente já não está na lista (evitar duplicatas)
        const jaExiste = this.clientes.some(c => 
          (c._id === clienteSalvo._id) || 
          (c.nome === clienteSalvo.nome && c.cpfCnpj === clienteSalvo.cpfCnpj)
        );
        
        if (!jaExiste) {
          // Adicionar no início da lista
          this.clientes.unshift(clienteSalvo);
          console.log('➕ Cliente adicionado à lista localmente:', clienteSalvo.nome, clienteSalvo._id);
          console.log('📋 Total na lista local agora:', this.clientes.length);
        } else {
          console.log('⚠️ Cliente já existe na lista, não adicionando duplicata');
        }
      } else if (this.editandoId && clienteSalvo) {
        // Se for edição, atualizar o cliente na lista
        const index = this.clientes.findIndex(c => c._id === this.editandoId);
        if (index !== -1) {
          this.clientes[index] = clienteSalvo;
          console.log('✏️ Cliente atualizado na lista localmente');
        }
      }
      
      (window.toastManager || toastManager).success(
        this.editandoId ? '✅ Cliente atualizado!' : '✅ Cliente cadastrado!'
      );

      form.reset();
      const optAtivo = document.getElementById('opt-ativo');
      const optInativo = document.getElementById('opt-inativo');
      if (optAtivo) optAtivo.classList.add('active');
      if (optInativo) optInativo.classList.remove('active');
      this.editandoId = null;
      const cardTitle = document.querySelector('.card-title');
      if (cardTitle) cardTitle.textContent = '➕ Novo Cliente';
      
      // Resetar filtro para "todos" para garantir que o novo cliente apareça
      this.filtroStatus = 'todos';
      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'todos') {
          btn.classList.add('active');
        }
      });
      
      // Limpar campo de busca para garantir que o cliente apareça
      const searchInput = document.getElementById('search');
      if (searchInput) searchInput.value = '';
      
      // Se já adicionamos o cliente à lista, atualizar a tabela imediatamente
      if (clienteSalvo && !this.editandoId) {
        console.log('🔄 Atualizando tabela imediatamente com cliente local...');
        this.updateStats();
        this.renderTable();
        console.log('✅ Tabela atualizada. Clientes na lista:', this.clientes.length);
        console.log('📋 Clientes na lista:', this.clientes.map(c => `${c.nome} (${c._id})`));
      }
      
      // Recarregar lista de clientes do servidor (aguardar um pouco para garantir que o banco salvou)
      console.log('🔄 Aguardando 2 segundos antes de recarregar do servidor...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('🔄 Recarregando lista de clientes do servidor...');
      
      // Salvar referência do cliente temporário antes de recarregar
      const clienteTemp = clienteSalvo && clienteSalvo.temp ? clienteSalvo : null;
      
      await this.loadClientes();
      console.log('✅ Lista recarregada. Total de clientes:', this.clientes.length);
      console.log('📋 Clientes finais:', this.clientes.map(c => `${c.nome} (${c._id})`));
      
      // Se o cliente temporário não foi substituído por um cliente real do servidor, mantê-lo na lista
      if (clienteTemp && !this.editandoId) {
        const clienteRealEncontrado = this.clientes.find(c => {
          const nomeMatch = c.nome === clienteTemp.nome;
          const cpfMatch = (c.cpfCnpj === clienteTemp.cpfCnpj) || 
                          (c.cpf === clienteTemp.cpfCnpj) || 
                          (c.cpfCnpj === clienteTemp.cpf) ||
                          (c.cpf === clienteTemp.cpf);
          return nomeMatch && (cpfMatch || (!clienteTemp.cpfCnpj && !c.cpfCnpj && !c.cpf));
        });
        
        if (!clienteRealEncontrado) {
          console.log('⚠️ Cliente temporário não foi encontrado no servidor, mantendo na lista');
          this.clientes.unshift(clienteTemp);
          this.updateStats();
          this.renderTable();
        } else {
          console.log('✅ Cliente temporário substituído por cliente real do servidor');
        }
      }
    } catch (error) {
      (window.toastManager || toastManager).error('❌ Erro ao salvar cliente');
      console.error(error);
    }
  },

  editarCliente(id) {
    const cliente = this.clientes.find(c => c._id === id);
    if (!cliente) return;

    this.editandoId = id;
    document.querySelector('.card-title').textContent = '✏️ Editar Cliente';

    document.getElementById('nome').value = cliente.nome || '';
    document.getElementById('cpf').value = cliente.cpfCnpj || '';
    document.getElementById('telefone').value = cliente.telefone || '';
    document.getElementById('email').value = cliente.email || '';
    document.getElementById('endereco').value = cliente.endereco || '';
    
    if (cliente.dataNascimento) {
      document.getElementById('nascimento').value = cliente.dataNascimento.split('T')[0];
    }

    // Status
    if (cliente.status === 'ativo') {
      document.getElementById('opt-ativo').classList.add('active');
      document.getElementById('opt-inativo').classList.remove('active');
    } else {
      document.getElementById('opt-inativo').classList.add('active');
      document.getElementById('opt-ativo').classList.remove('active');
    }
  },

  abrirModalDelete(id) {
    const cliente = this.clientes.find(c => c._id === id);
    if (!cliente) return;

    this.deletandoId = id;
    document.getElementById('delete-nome').textContent = cliente.nome;
    document.getElementById('modal-delete').classList.add('show');
  },

  async confirmarExclusao() {
    if (!this.deletandoId) return;

    try {
      const res = await fetch(`/api/clientes/${this.deletandoId}`, {
        method: 'DELETE',
        headers: (window.Utils || Utils).getAuthHeaders()
      });

      if (!res.ok) throw new Error('Erro ao excluir cliente');

      (window.toastManager || toastManager).success('✅ Cliente excluído!');
      document.getElementById('modal-delete').classList.remove('show');
      this.deletandoId = null;
      await this.loadClientes();
    } catch (error) {
      (window.toastManager || toastManager).error('❌ Erro ao excluir cliente');
      console.error(error);
    }
  }
};
