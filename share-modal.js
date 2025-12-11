(function(){
  'use strict';

  const doc=typeof document==='undefined'?null:document;
  if(!doc || typeof doc.addEventListener!=='function' || typeof doc.querySelector!=='function'){
    return; // Skip execution in non-browser or extremely old environments.
  }

  // Simple, defensive share modal helper. Elements are optional so the script
  // can be included on pages that do not render a share modal without causing
  // runtime errors.
  const init=()=>{
    try{
      const modal=doc.querySelector('[data-share-modal]');
      const openers=Array.from(doc.querySelectorAll('[data-share-open]'));
      const closers=Array.from(doc.querySelectorAll('[data-share-close]'));

      if(!modal || openers.length===0){
        return; // No share UI present on the page.
      }

      const hide=()=>modal.classList.remove('is-open');
      const show=()=>modal.classList.add('is-open');

      openers.forEach(btn=>btn?.addEventListener?.('click',show));
      closers.forEach(btn=>btn?.addEventListener?.('click',hide));

      // Allow clicking the overlay to close the modal as well.
      modal.addEventListener('click',(e)=>{
        if(e.target===modal) hide();
      });
    }catch(err){
      console.warn('share-modal init failed', err);
    }
  };

  if(doc.readyState==='loading'){
    doc.addEventListener('DOMContentLoaded', init, { once:true });
  }else{
    setTimeout(init,0);
  }
})();
