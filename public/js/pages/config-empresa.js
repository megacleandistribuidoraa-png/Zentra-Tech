// ============================================
// PÁGINA: CONFIGURAÇÕES DA EMPRESA
// ============================================

export default {
  title: 'Config. Empresa',
  config: null,
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>🏢 Configurações da Empresa</h2>
            <p>Configure os dados da sua empresa</p>
          </div>
          <button class="btn btn-primary" id="btn-salvar-config">💾 Salvar Configurações</button>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>📋 Dados da Empresa</h3>
          </div>
          <div class="card-body">
            <form id="form-config-empresa">
              <div class="form-row">
                <div class="form-group">
                  <label for="razaoSocial">Razão Social *</label>
                  <input type="text" id="razaoSocial" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="nomeFantasia">Nome Fantasia</label>
                  <input type="text" id="nomeFantasia" class="form-control">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="cnpj">CNPJ</label>
                  <input type="text" id="cnpj" class="form-control" placeholder="00.000.000/0000-00">
                </div>
                <div class="form-group">
                  <label for="inscricaoEstadual">Inscrição Estadual</label>
                  <input type="text" id="inscricaoEstadual" class="form-control">
                </div>
                <div class="form-group">
                  <label for="inscricaoMunicipal">Inscrição Municipal</label>
                  <input type="text" id="inscricaoMunicipal" class="form-control">
                </div>
              </div>

              <h4 style="margin-top: 30px; margin-bottom: 15px;">📍 Endereço</h4>
              
              <div class="form-row">
                <div class="form-group" style="flex: 2;">
                  <label for="logradouro">Logradouro</label>
                  <input type="text" id="logradouro" class="form-control" placeholder="Rua, Avenida, etc.">
                </div>
                <div class="form-group" style="flex: 1;">
                  <label for="numero">Número</label>
                  <input type="text" id="numero" class="form-control">
                </div>
                <div class="form-group" style="flex: 1;">
                  <label for="complemento">Complemento</label>
                  <input type="text" id="complemento" class="form-control">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="bairro">Bairro</label>
                  <input type="text" id="bairro" class="form-control">
                </div>
                <div class="form-group">
                  <label for="cidade">Cidade</label>
                  <input type="text" id="cidade" class="form-control">
                </div>
                <div class="form-group" style="flex: 0.5;">
                  <label for="uf">UF</label>
                  <select id="uf" class="form-control">
                    <option value="">Selecione...</option>
                    <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option>
                    <option value="AM">AM</option><option value="BA">BA</option><option value="CE">CE</option>
                    <option value="DF">DF</option><option value="ES">ES</option><option value="GO">GO</option>
                    <option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                    <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option>
                    <option value="PR">PR</option><option value="PE">PE</option><option value="PI">PI</option>
                    <option value="RJ">RJ</option><option value="RN">RN</option><option value="RS">RS</option>
                    <option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                    <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                  </select>
                </div>
                <div class="form-group" style="flex: 1;">
                  <label for="cep">CEP</label>
                  <input type="text" id="cep" class="form-control" placeholder="00000-000">
                </div>
              </div>

              <h4 style="margin-top: 30px; margin-bottom: 15px;">📞 Contato</h4>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="telefone">Telefone</label>
                  <input type="text" id="telefone" class="form-control" placeholder="(00) 00000-0000">
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" class="form-control">
                </div>
                <div class="form-group">
                  <label for="site">Site</label>
                  <input type="url" id="site" class="form-control" placeholder="https://...">
                </div>
              </div>

              <h4 style="margin-top: 30px; margin-bottom: 15px;">💰 Configurações Fiscais</h4>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="regimeTributario">Regime Tributário</label>
                  <select id="regimeTributario" class="form-control">
                    <option value="mei">MEI - Microempreendedor Individual</option>
                    <option value="simples_nacional">Simples Nacional</option>
                    <option value="lucro_presumido">Lucro Presumido</option>
                    <option value="lucro_real">Lucro Real</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="crt">CRT (Código de Regime Tributário)</label>
                  <input type="number" id="crt" class="form-control" value="1" min="1" max="3">
                </div>
              </div>

              <h4 style="margin-top: 30px; margin-bottom: 15px;">📄 Nota Fiscal Eletrônica (NF-e)</h4>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="ambiente">Ambiente</label>
                  <select id="ambiente" class="form-control">
                    <option value="homologacao">Homologação (Testes)</option>
                    <option value="producao">Produção (Real)</option>
                  </select>
                  <small style="display: block; margin-top: 4px; font-size: 11px; color: var(--text-muted);">Use Homologação para testes iniciais</small>
                </div>
                <div class="form-group">
                  <label for="serieNfe">Série NF-e</label>
                  <input type="number" id="serieNfe" class="form-control" value="1" min="1">
                </div>
                <div class="form-group">
                  <label for="proximoNumeroNfe">Próximo Número NF-e</label>
                  <input type="number" id="proximoNumeroNfe" class="form-control" value="1" min="1">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group" style="width: 100%;">
                  <label for="mensagemPadrao">Mensagem Padrão (rodapé)</label>
                  <textarea id="mensagemPadrao" class="form-control" rows="2" placeholder="Ex: Obrigado pela preferência! Volte sempre.">Obrigado pela preferência!</textarea>
                </div>
              </div>
            </form>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
              <div class="alert" style="background: var(--info-light); border: 1px solid var(--info); padding: 16px; border-radius: 8px; display: flex; gap: 12px; align-items: flex-start;">
                <span style="font-size: 24px;">🔐</span>
                <div>
                  <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 600;">Certificado Digital A1</h4>
                  <p style="margin: 0; font-size: 13px; color: var(--text-muted);">Para emitir NF-e real, você precisará de um Certificado Digital A1. Quando tiver, entre em contato para configurarmos a integração com a SEFAZ.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    await this.loadConfig();
    this.setupEventListeners();
  },

  async loadConfig() {
    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/config/empresa`, {
        headers: (window.Utils || Utils).getAuthHeaders()
      });

      if (!res.ok) throw new Error('Erro ao carregar configurações');

      this.config = await res.json();
      this.populateForm();
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      (window.toastManager || toastManager).error('Erro ao carregar configurações da empresa.');
    }
  },

  populateForm() {
    if (!this.config) return;

    const fields = [
      'razaoSocial', 'nomeFantasia', 'cnpj', 'inscricaoEstadual', 'inscricaoMunicipal',
      'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'uf', 'cep',
      'telefone', 'email', 'site', 'regimeTributario', 'crt',
      'ambiente', 'serieNfe', 'proximoNumeroNfe', 'mensagemPadrao'
    ];

    fields.forEach(field => {
      const el = document.getElementById(field);
      if (el && this.config[field] !== undefined && this.config[field] !== null) {
        el.value = this.config[field];
      }
    });
  },

  setupEventListeners() {
    // Salvar configurações
    document.getElementById('btn-salvar-config')?.addEventListener('click', () => {
      this.salvarConfig();
    });
  },

  async salvarConfig() {
    const fields = [
      'razaoSocial', 'nomeFantasia', 'cnpj', 'inscricaoEstadual', 'inscricaoMunicipal',
      'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'uf', 'cep',
      'telefone', 'email', 'site', 'regimeTributario', 'crt',
      'ambiente', 'serieNfe', 'proximoNumeroNfe', 'mensagemPadrao'
    ];

    const data = {};
    fields.forEach(field => {
      const el = document.getElementById(field);
      if (el) {
        let value = el.value.trim();
        // Converter números
        if (field === 'crt' || field === 'serieNfe' || field === 'proximoNumeroNfe') {
          value = parseInt(value) || (field === 'crt' ? 1 : 1);
        }
        data[field] = value;
      }
    });

    // Validação básica
    if (!data.razaoSocial) {
      (window.toastManager || toastManager).error('Razão Social é obrigatória.');
      return;
    }

    try {
      const res = await fetch(`${window.API_BASE_URL || '/api'}/config/empresa`, {
        method: 'PUT',
        headers: {
          ...(window.Utils || Utils).getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Erro ao salvar configurações');

      (window.toastManager || toastManager).success('Configurações salvas com sucesso!');
      await this.loadConfig();
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      (window.toastManager || toastManager).error('Erro ao salvar configurações.');
    }
  }
};
