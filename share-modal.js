(function(){
  'use strict';

  if(typeof document==='undefined' || !document.addEventListener){
    return; // Skip execution in non-browser contexts.
  }

  // Simple, defensive share modal helper. Elements are optional so the script
  // can be included on pages that do not render a share modal without causing
  // runtime errors.
  document.addEventListener('DOMContentLoaded',()=>{
    const modal=document.querySelector('[data-share-modal]');
    const openers=Array.from(document.querySelectorAll('[data-share-open]'));
    const closers=Array.from(document.querySelectorAll('[data-share-close]'));

    if(!modal || openers.length===0){
      return; // No share UI present on the page.
    }

    const hide=()=>modal.classList.remove('is-open');
    const show=()=>modal.classList.add('is-open');

    openers.forEach(btn=>btn.addEventListener('click',show));
    closers.forEach(btn=>btn.addEventListener('click',hide));

    // Allow clicking the overlay to close the modal as well.
    modal.addEventListener('click',(e)=>{
      if(e.target===modal) hide();
    });
  });
})();
