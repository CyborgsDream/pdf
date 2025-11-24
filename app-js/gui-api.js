// Minimal GUI API stub for Orbit OS integration
(function(){
  window.guiAPI = window.guiAPI || {};
  window.guiAPI.version = 'stub-0.1';
  window.guiAPI.init = function(){
    // placeholder for GUI integrations
    console.debug('gui-api stub initialized');
  };
  // expose a small helper used by console-log module in some apps
  window.guiAPI.appendConsole = function(container, text){
    try{
      if(!container) return;
      const el = (typeof container === 'string') ? document.querySelector(container) : container;
      if(!el) return;
      const row = document.createElement('div');
      row.textContent = text;
      el.appendChild(row);
    }catch(e){console.warn('guiAPI.appendConsole error', e)}
}  
})();
