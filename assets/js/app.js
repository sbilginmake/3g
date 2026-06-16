(function(){
  const choices=document.querySelectorAll('[data-assistant-choice]');
  const result=document.querySelector('.assistant-result');
  const selected={};
  choices.forEach(btn=>btn.addEventListener('click',()=>{
    const group=btn.dataset.group; selected[group]=btn.textContent.trim();
    document.querySelectorAll(`[data-group="${group}"]`).forEach(b=>b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    if(result){
      const usage=selected.usage||'kullanım alanı'; const user=selected.user||'firma tipi'; const need=selected.need||'ihtiyaç';
      result.innerHTML=`<strong>Önerilen yönlendirme:</strong><ul><li>${usage} için uygun HOPPE ürün grupları</li><li>${user} için B2B talep formu</li><li>${need} ihtiyacına göre teknik görüşme</li></ul>`;
      result.classList.add('show');
    }
  }));

  const grid=document.getElementById('productGrid');
  const count=document.getElementById('resultCount');
  const table=document.getElementById('technicalTable');
  const search=document.getElementById('productSearch');
  const filters=document.querySelectorAll('[data-filter]');
  const clear=document.getElementById('clearFilters');
  const viewBtns=document.querySelectorAll('[data-view]');
  function applyFilters(){
    if(!grid)return;
    const q=(search?.value||'').toLowerCase().trim();
    const active={}; filters.forEach(f=>{if(f.checked){(active[f.dataset.filter] ||= []).push(f.value)}});
    let visible=0;
    grid.querySelectorAll('.product-card').forEach(card=>{
      const text=card.textContent.toLowerCase();
      let ok=!q||text.includes(q);
      Object.entries(active).forEach(([key,vals])=>{
        const data=(card.dataset[key]||'').split(',').map(s=>s.trim());
        if(vals.length && !vals.some(v=>data.includes(v))) ok=false;
      });
      card.style.display=ok?'flex':'none'; if(ok)visible++;
    });
    if(count)count.textContent=`${visible} sonuç gösteriliyor`;
  }
  filters.forEach(f=>f.addEventListener('change',applyFilters));
  search?.addEventListener('input',applyFilters);
  clear?.addEventListener('click',()=>{filters.forEach(f=>f.checked=false); if(search)search.value=''; applyFilters();});
  viewBtns.forEach(btn=>btn.addEventListener('click',()=>{
    viewBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const v=btn.dataset.view;
    if(v==='table'){grid?.classList.add('hide'); table?.classList.remove('hide');}
    else{table?.classList.add('hide'); grid?.classList.remove('hide'); grid?.classList.toggle('list-view',v==='list');}
  }));
  applyFilters();

  const main=document.getElementById('mainProductImage');
  document.querySelectorAll('[data-thumb]').forEach(img=>img.addEventListener('click',()=>{
    document.querySelectorAll('[data-thumb]').forEach(i=>i.classList.remove('active'));
    img.classList.add('active'); if(main) main.src=img.src;
  }));
})();

(function(){
  const panel=document.querySelector('[data-customizer-panel]');
  const content=document.querySelector('[data-customizer-content]');
  const note=document.querySelector('[data-customizer-closed-note]');
  const openBtns=document.querySelectorAll('[data-open-customizer]');
  const closeBtns=document.querySelectorAll('[data-close-customizer]');
  const summary={
    model:'Set on rose brass · HOPPE quick-fit connection M1530/23KV/23KVS',
    finish:'F1 · Alüminyum gümüş',
    lock:'BB · Oda kapısı / standart iç kapı'
  };
  function setOpen(isOpen){
    if(!panel)return;
    panel.classList.toggle('is-open',isOpen);
    if(content) content.hidden=!isOpen;
    if(note) note.hidden=isOpen;
    if(isOpen) panel.scrollIntoView({behavior:'smooth',block:'start'});
  }
  openBtns.forEach(btn=>btn.addEventListener('click',()=>setOpen(true)));
  closeBtns.forEach(btn=>btn.addEventListener('click',()=>setOpen(false)));
  function shortLock(val){return (val||'').split(' · ')[0] + (val&&val.includes('·')?' · '+val.split(' · ')[1]:'')}
  function updateSummary(){
    document.querySelectorAll('[data-summary="model"]').forEach(el=>el.textContent=summary.model);
    document.querySelectorAll('[data-summary="finish"]').forEach(el=>el.textContent=summary.finish);
    document.querySelectorAll('[data-summary="lock"]').forEach(el=>el.textContent=summary.lock);
    const fm=document.getElementById('formModel'); if(fm) fm.value=summary.model;
    const fl=document.getElementById('formFinishLock'); if(fl) fl.value=`${summary.finish} / ${shortLock(summary.lock)}`;
  }
  document.querySelectorAll('[data-choice-type]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const type=btn.dataset.choiceType;
      summary[type]=btn.dataset.choiceValue || btn.textContent.trim();
      document.querySelectorAll(`[data-choice-type="${type}"]`).forEach(el=>el.classList.remove('selected'));
      btn.classList.add('selected');
      if(type==='model'){
        const img=btn.dataset.modelImage;
        const preview=document.getElementById('selectedPreview');
        const main=document.getElementById('mainProductImage');
        if(img && preview) preview.src=img;
        if(img && main) main.src=img;
      }
      updateSummary();
    });
  });
  updateSummary();
})();

(function(){
  const menu=document.querySelector('[data-mobile-menu]');
  const openBtn=document.querySelector('[data-mobile-toggle]');
  const closeBtn=document.querySelector('[data-mobile-close]');
  if(!menu||!openBtn)return;

  function setMenu(open){
    menu.hidden=!open;
    openBtn.setAttribute('aria-expanded',String(open));
    document.body.classList.toggle('nav-open',open);
  }

  openBtn.addEventListener('click',()=>setMenu(true));
  closeBtn?.addEventListener('click',()=>setMenu(false));
  menu.addEventListener('click',event=>{
    if(event.target===menu)setMenu(false);
  });
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!menu.hidden)setMenu(false);
  });
})();
