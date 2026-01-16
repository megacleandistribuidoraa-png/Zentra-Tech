// ============================================
// HELPER PARA ACESSO SEGURO A DOM
// ============================================
// Fornece funções auxiliares para acessar elementos DOM de forma segura

(function() {
  'use strict';

  // Função helper para obter elemento de forma segura
  window.$ = function(id) {
    return document.getElementById(id);
  };

  // Função helper para definir textContent de forma segura
  window.setText = function(id, text) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      return true;
    }
    return false;
  };

  // Função helper para definir innerHTML de forma segura
  window.setHTML = function(id, html) {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = html;
      return true;
    }
    return false;
  };

  // Função helper para obter value de forma segura
  window.getValue = function(id, defaultValue = '') {
    const el = document.getElementById(id);
    return el ? el.value : defaultValue;
  };

  // Função helper para definir value de forma segura
  window.setValue = function(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.value = value;
      return true;
    }
    return false;
  };

  // Função helper para definir style de forma segura
  window.setStyle = function(id, property, value) {
    const el = document.getElementById(id);
    if (el) {
      el.style[property] = value;
      return true;
    }
    return false;
  };
})();
