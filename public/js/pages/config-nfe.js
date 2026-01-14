// ============================================
// PÁGINA: CONFIGURAÇÃO NF-e
// ============================================

export default {
  title: 'Config. NF-e',
  
  async load() {
    return `
      <div class="page-container">
        <div class="page-header">
          <div>
            <h2>📄 Configuração de NF-e</h2>
            <p>Configure as credenciais e dados para emissão de Notas Fiscais Eletrônicas</p>
          </div>
          <button class="btn btn-primary" id="btn-salvar-config">💾 Salvar Configurações</button>
        </div>

        <!-- Provedor e Credenciais -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">🔐 Provedor e Credenciais</h3>
          </div>
          
          <form id="form-config-nfe">
            <div class="form-group" style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Provedor de NF-e *</label>
              <select id="provedor" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px">
                <option value="focus_nfe">Focus NFe</option>
                <option value="nfe_io">NFe.io</option>
                <option value="enotas">eNotas</option>
                <option value="manual">Manual (sem integração)</option>
              </select>
              <small style="display:block;margin-top:6px;font-size:12px;color:var(--muted)">Escolha o provedor de NF-e que você utiliza</small>
            </div>

            <!-- Focus NFe -->
            <div id="config-focus" class="provedor-config" style="display:none">
              <div class="form-group" style="margin-bottom:20px">
                <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Token Focus NFe</label>
                <input type="text" id="focusToken" placeholder="Seu token da Focus NFe" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
                <small style="display:block;margin-top:6px;font-size:12px;color:var(--muted)">Encontre seu token em: <a href="https://focusnfe.com.br" target="_blank">focusnfe.com.br</a></small>
              </div>
            </div>

            <!-- NFe.io -->
            <div id="config-nfeio" class="provedor-config" style="display:none">
              <div class="form-group" style="margin-bottom:20px">
                <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">API Key</label>
                <input type="text" id="nfeioApiKey" placeholder="Sua API Key do NFe.io" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
              </div>
              <div class="form-group" style="margin-bottom:20px">
                <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Company ID</label>
                <input type="text" id="nfeioCompanyId" placeholder="ID da sua empresa no NFe.io" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
              </div>
            </div>

            <!-- eNotas -->
            <div id="config-enotas" class="provedor-config" style="display:none">
              <div class="form-group" style="margin-bottom:20px">
                <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">API Key</label>
                <input type="text" id="enotasApiKey" placeholder="Sua API Key do eNotas" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
              </div>
              <div class="form-group" style="margin-bottom:20px">
                <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Empresa ID</label>
                <input type="text" id="enotasEmpresaId" placeholder="ID da sua empresa no eNotas" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
              </div>
            </div>

            <!-- Ambiente -->
            <div class="form-group" style="margin-bottom:20px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Ambiente *</label>
              <select id="ambiente" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px">
                <option value="homologacao">Homologação (Testes)</option>
                <option value="producao">Produção (Real)</option>
              </select>
              <small style="display:block;margin-top:6px;font-size:12px;color:var(--muted)">Use Homologação para testes. Produção apenas quando estiver tudo configurado.</small>
            </div>
          </form>
        </div>

        <!-- Dados Fiscais -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">🏢 Dados Fiscais da Empresa</h3>
          </div>
          
          <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">CNPJ *</label>
              <input type="text" id="cnpj" placeholder="00.000.000/0000-00" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Inscrição Estadual</label>
              <input type="text" id="inscricaoEstadual" placeholder="IE da empresa" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
          </div>

          <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Razão Social *</label>
              <input type="text" id="razaoSocial" placeholder="Razão social completa" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Nome Fantasia</label>
              <input type="text" id="nomeFantasia" placeholder="Nome fantasia" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
          </div>
        </div>

        <!-- Endereço -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">📍 Endereço (Obrigatório para NF-e)</h3>
          </div>
          
          <div class="form-row" style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px;margin-bottom:16px">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Logradouro *</label>
              <input type="text" id="logradouro" placeholder="Rua, Avenida, etc." style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Número *</label>
              <input type="text" id="numero" placeholder="Número" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Complemento</label>
              <input type="text" id="complemento" placeholder="Apto, Sala, etc." style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
          </div>

          <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:16px">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Bairro *</label>
              <input type="text" id="bairro" placeholder="Bairro" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Cidade *</label>
              <input type="text" id="cidade" placeholder="Cidade" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div class="form-group" style="margin-bottom:16px">
                <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">UF *</label>
                <select id="uf" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px">
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
              <div class="form-group" style="margin-bottom:16px">
                <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">CEP</label>
                <input type="text" id="cep" placeholder="00000-000" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:16px">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Código do Município (IBGE)</label>
            <input type="text" id="codigoMunicipio" placeholder="Código IBGE do município" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            <small style="display:block;margin-top:6px;font-size:12px;color:var(--muted)">Encontre o código em: <a href="https://www.ibge.gov.br/explica/codigos-dos-municipios.php" target="_blank">ibge.gov.br</a></small>
          </div>
        </div>

        <!-- Configurações de Numeração -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">🔢 Configurações de Série e Numeração</h3>
          </div>
          
          <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Série NF-e</label>
              <input type="number" id="serieNfe" value="1" min="1" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Próximo Número NF-e</label>
              <input type="number" id="proximoNumeroNfe" value="1" min="1" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
          </div>
        </div>

        <!-- Regime Tributário -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">💰 Regime Tributário</h3>
          </div>
          
          <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Regime Tributário</label>
              <select id="regimeTributario" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px">
                <option value="1">1 - Simples Nacional</option>
                <option value="2">2 - Simples Nacional - excesso de sublimite</option>
                <option value="3">3 - Regime Normal</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">CRT (Código de Regime Tributário)</label>
              <select id="crt" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px">
                <option value="1">1 - Simples Nacional</option>
                <option value="2">2 - Simples Nacional - excesso de sublimite</option>
                <option value="3">3 - Regime Normal</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:16px">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">CFOP Padrão</label>
            <input type="text" id="cfopPadrao" value="5102" placeholder="5102" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            <small style="display:block;margin-top:6px;font-size:12px;color:var(--muted)">5102 = Venda de mercadoria adquirida de terceiros (dentro do estado)</small>
          </div>
        </div>

        <!-- Certificado Digital -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">🔐 Certificado Digital</h3>
          </div>
          
          <div class="alert" style="background:var(--info-light);border:2px solid #bfdbfe;border-radius:10px;padding:16px;margin-bottom:20px">
            <div style="display:flex;align-items:flex-start;gap:12px">
              <span style="font-size:24px">ℹ️</span>
              <div>
                <h4 style="margin:0 0 4px;font-size:14px;font-weight:600;color:var(--info)">Certificado Digital A1</h4>
                <p style="margin:0;font-size:13px;color:#1e40af">Para emitir NF-e em produção, você precisará de um Certificado Digital A1 (arquivo .pfx ou .p12). O certificado será armazenado de forma segura no servidor.</p>
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:16px">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Certificado Digital (Base64)</label>
            <textarea id="certificadoBase64" rows="4" placeholder="Cole aqui o conteúdo do certificado em Base64" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px;font-family:monospace"></textarea>
            <small style="display:block;margin-top:6px;font-size:12px;color:var(--muted)">Converta seu arquivo .pfx/.p12 para Base64 antes de colar aqui</small>
          </div>

          <div class="form-group" style="margin-bottom:16px">
            <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Senha do Certificado</label>
            <input type="password" id="senhaCertificado" placeholder="Senha do certificado digital" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
          </div>
        </div>

        <!-- Contato -->
        <div class="card" style="background:var(--card);border-radius:12px;padding:20px;box-shadow:var(--shadow);margin-bottom:18px">
          <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 class="card-title" style="font-size:18px;font-weight:700;margin:0;display:flex;align-items:center;gap:8px">📞 Contato</h3>
          </div>
          
          <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">Telefone</label>
              <input type="text" id="telefone" placeholder="(00) 00000-0000" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label style="display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:8px">E-mail</label>
              <input type="email" id="email" placeholder="contato@empresa.com" style="width:100%;padding:12px;border:2px solid #e6e9ef;border-radius:10px;font-size:14px" />
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async onLoad() {
    this.config = null;
    await this.carregarConfig();
    this.setupEventListeners();
  },

  getToken() {
    return localStorage.getItem('admin_token') || '';
  },

  async carregarConfig() {
    try {
      const res = await fetch('/api/config/nfe', {
        headers: { 'x-auth-token': this.getToken() }
      });
      
      if (!res.ok) throw new Error('Erro ao carregar');
      
      this.config = await res.json();
      this.preencherFormulario();
    } catch (e) {
      console.error(e);
      if (window.toastManager) window.toastManager.error('Erro ao carregar configurações');
    }
  },

  preencherFormulario() {
    if (!this.config) return;
    
    document.getElementById('provedor').value = this.config.provedor || 'focus_nfe';
    document.getElementById('focusToken').value = this.config.focusToken || '';
    document.getElementById('nfeioApiKey').value = this.config.nfeioApiKey || '';
    document.getElementById('nfeioCompanyId').value = this.config.nfeioCompanyId || '';
    document.getElementById('enotasApiKey').value = this.config.enotasApiKey || '';
    document.getElementById('enotasEmpresaId').value = this.config.enotasEmpresaId || '';
    document.getElementById('ambiente').value = this.config.ambiente || 'homologacao';
    
    document.getElementById('cnpj').value = this.config.cnpj || '';
    document.getElementById('inscricaoEstadual').value = this.config.inscricaoEstadual || '';
    document.getElementById('razaoSocial').value = this.config.razaoSocial || '';
    document.getElementById('nomeFantasia').value = this.config.nomeFantasia || '';
    
    document.getElementById('logradouro').value = this.config.logradouro || '';
    document.getElementById('numero').value = this.config.numero || '';
    document.getElementById('complemento').value = this.config.complemento || '';
    document.getElementById('bairro').value = this.config.bairro || '';
    document.getElementById('cidade').value = this.config.cidade || '';
    document.getElementById('uf').value = this.config.uf || 'SP';
    document.getElementById('cep').value = this.config.cep || '';
    document.getElementById('codigoMunicipio').value = this.config.codigoMunicipio || '';
    
    document.getElementById('serieNfe').value = this.config.serieNfe || 1;
    document.getElementById('proximoNumeroNfe').value = this.config.proximoNumeroNfe || 1;
    
    document.getElementById('regimeTributario').value = this.config.regimeTributario || 1;
    document.getElementById('crt').value = this.config.crt || 1;
    document.getElementById('cfopPadrao').value = this.config.cfopPadrao || '5102';
    
    document.getElementById('certificadoBase64').value = this.config.certificadoBase64 || '';
    document.getElementById('senhaCertificado').value = '';
    
    document.getElementById('telefone').value = this.config.telefone || '';
    document.getElementById('email').value = this.config.email || '';
    
    this.mostrarConfigProvedor();
  },

  mostrarConfigProvedor() {
    const provedor = document.getElementById('provedor').value;
    
    document.getElementById('config-focus').style.display = provedor === 'focus_nfe' ? 'block' : 'none';
    document.getElementById('config-nfeio').style.display = provedor === 'nfe_io' ? 'block' : 'none';
    document.getElementById('config-enotas').style.display = provedor === 'enotas' ? 'block' : 'none';
  },

  async salvarConfig() {
    const data = {
      provedor: document.getElementById('provedor').value,
      focusToken: document.getElementById('focusToken').value,
      nfeioApiKey: document.getElementById('nfeioApiKey').value,
      nfeioCompanyId: document.getElementById('nfeioCompanyId').value,
      enotasApiKey: document.getElementById('enotasApiKey').value,
      enotasEmpresaId: document.getElementById('enotasEmpresaId').value,
      ambiente: document.getElementById('ambiente').value,
      cnpj: document.getElementById('cnpj').value,
      inscricaoEstadual: document.getElementById('inscricaoEstadual').value,
      razaoSocial: document.getElementById('razaoSocial').value,
      nomeFantasia: document.getElementById('nomeFantasia').value,
      logradouro: document.getElementById('logradouro').value,
      numero: document.getElementById('numero').value,
      complemento: document.getElementById('complemento').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      uf: document.getElementById('uf').value,
      cep: document.getElementById('cep').value,
      codigoMunicipio: document.getElementById('codigoMunicipio').value,
      serieNfe: parseInt(document.getElementById('serieNfe').value) || 1,
      proximoNumeroNfe: parseInt(document.getElementById('proximoNumeroNfe').value) || 1,
      regimeTributario: parseInt(document.getElementById('regimeTributario').value) || 1,
      crt: parseInt(document.getElementById('crt').value) || 1,
      cfopPadrao: document.getElementById('cfopPadrao').value || '5102',
      telefone: document.getElementById('telefone').value,
      email: document.getElementById('email').value
    };
    
    const certificado = document.getElementById('certificadoBase64').value;
    const senhaCertificado = document.getElementById('senhaCertificado').value;
    
    if (certificado) {
      data.certificadoBase64 = certificado;
    }
    
    if (senhaCertificado) {
      data.senhaCertificado = senhaCertificado;
    }
    
    try {
      const res = await fetch('/api/config/nfe', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.getToken()
        },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || 'Erro ao salvar');
      }
      
      if (window.toastManager) window.toastManager.success('✅ Configurações de NF-e salvas!');
      await this.carregarConfig();
    } catch (e) {
      console.error(e);
      if (window.toastManager) window.toastManager.error(e.message || 'Erro ao salvar configurações');
    }
  },

  setupEventListeners() {
    document.getElementById('btn-salvar-config')?.addEventListener('click', () => {
      this.salvarConfig();
    });

    document.getElementById('provedor')?.addEventListener('change', () => {
      this.mostrarConfigProvedor();
    });
  }
};
