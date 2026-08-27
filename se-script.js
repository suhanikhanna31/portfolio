(function(){
  const tabs = document.querySelectorAll('.code-tab');
  const filesEl = document.getElementById('file-list');
  const contentEl = document.getElementById('code-content');
  const pathEl = document.getElementById('code-path');
  const copyEl = document.getElementById('copy-code');
  const launcher = document.querySelector('.code-launch');
  const samples = window.CODE_SAMPLES || {};
  let project = tabs[0]?.dataset.tab || Object.keys(samples)[0];
  let index = 0;

  function render(){
    const files = samples[project] || [];
    filesEl.innerHTML = '';
    files.forEach((f,i)=>{
      const b=document.createElement('button');
      b.className='file-btn'+(i===index?' active':'');
      b.textContent=f.title;
      b.onclick=()=>{index=i;render()};
      filesEl.appendChild(b);
    });
    const f=files[index];
    if(!f){pathEl.textContent='';contentEl.textContent='';return;}
    pathEl.textContent=f.path;
    contentEl.textContent=f.code;
  }

  function openCode(which){
    const section=document.getElementById('code');
    const hiddenEls=section?.querySelectorAll('.code-hidden');
    hiddenEls?.forEach(el=>el.classList.remove('code-hidden'));
    if(launcher) launcher.textContent='Hide code samples ↑';
    if(which){
      const t=document.querySelector('.code-tab[data-tab="'+which+'"]');
      if(t){tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');project=which;index=0;render();}
    }
    section?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function closeCode(){
    const section=document.getElementById('code');
    const viewer=section?.querySelector('.code-viewer');
    const tabWrap=section?.querySelector('.code-tabs');
    viewer?.classList.add('code-hidden');
    tabWrap?.classList.add('code-hidden');
    if(launcher) launcher.textContent='Open code samples →';
  }

  launcher?.addEventListener('click',()=>{
    const viewer=document.getElementById('code-viewer');
    if(viewer?.classList.contains('code-hidden')) openCode(); else closeCode();
  });

  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    project=t.dataset.tab;
    index=0;
    render();
  }));

  document.querySelectorAll('[data-code-project]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();
    openCode(a.dataset.codeProject);
  }));

  if(copyEl) copyEl.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(contentEl.textContent);copyEl.textContent='Copied';setTimeout(()=>copyEl.textContent='Copy',900)}
    catch(e){copyEl.textContent='Select + copy';setTimeout(()=>copyEl.textContent='Copy',1100)}
  });

  render();
})();
