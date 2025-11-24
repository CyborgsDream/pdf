export function setupUI({onSubmit, onTool}){
  const input = document.getElementById('prompt-input');
  const submit = document.getElementById('prompt-submit');

  submit.addEventListener('click', ()=>{
    const v = input.value.trim();
    if(!v) return;
    onSubmit && onSubmit(v);
  });

  input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      const v = input.value.trim();
      if(!v) return;
      onSubmit && onSubmit(v);
    }
  });

  const tools = [
    ['btn-comics','comics'],
    ['btn-books','books'],
    ['btn-newspapers','newspapers'],
    ['btn-editor','editor']
  ];

  tools.forEach(([id,key])=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('click', ()=>{
      onTool && onTool(key);
    });
  });
}
