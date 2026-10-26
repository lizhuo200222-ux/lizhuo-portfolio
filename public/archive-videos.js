(() => {
 const base='/assets/ai-video-collection/';
 const items=[['seasons','四季','音画同步'],['zhiyin','知音','品牌发布片'],['jiangjinjiu','将进酒','动态字体']];
 const dialog=document.createElement('dialog');
 dialog.className='archive-video-dialog';
 dialog.setAttribute('aria-label','视频作品播放');
 dialog.innerHTML='<button class="archive-video-close" aria-label="关闭视频">×</button><video controls playsinline preload="metadata"></video><p></p>';
 document.body.append(dialog);
 const player=dialog.querySelector('video');
 let previousOverflow='';
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();document.body.style.overflow=previousOverflow;});
 const style=document.createElement('style');
 style.textContent=`.archive-video-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;width:100%;padding:8px 0 40px;box-sizing:border-box}.archive-video-card{appearance:none;border:0;background:none;color:#111;padding:0;text-align:left;cursor:pointer;min-width:0;font-family:inherit}.archive-video-cover{display:block;position:relative;aspect-ratio:16/9;background:#111;overflow:hidden;border-radius:3px}.archive-video-cover img{width:100%;height:100%;object-fit:contain;transition:transform .3s}.archive-video-card:hover img{transform:scale(1.03)}.archive-video-play{position:absolute;inset:0;display:grid;place-items:center;color:white;font-size:28px;text-shadow:0 2px 12px #000}.archive-video-card strong{display:block;font-size:20px;margin-top:14px}.archive-video-card small{display:block;font-size:13px;color:#666;margin-top:6px}.archive-video-card:focus-visible{outline:2px solid #111;outline-offset:6px}.archive-video-dialog{width:min(1100px,calc(100vw - 32px));max-height:90vh;padding:48px 16px 16px;border:0;background:#111;color:white;box-sizing:border-box;border-radius:6px}.archive-video-dialog::backdrop{background:#000c}.archive-video-dialog video{display:block;width:100%;max-height:70vh;background:#000}.archive-video-dialog p{margin:14px 0 0;font:16px/1.5 sans-serif}.archive-video-close{position:absolute;top:6px;right:12px;border:0;background:transparent;color:white;font-size:32px;cursor:pointer}@media(max-width:700px){.archive-video-grid{grid-template-columns:1fr;gap:28px;padding-bottom:24px}.archive-video-card strong{font-size:18px}}@media(prefers-reduced-motion:reduce){.archive-video-cover img{transition:none}}`;
 style.textContent+=`.archive-video-row{pointer-events:auto!important}.archive-video-row [data-framer-name="Right"]{display:flex!important;opacity:1!important;transform:none!important;overflow:visible!important}.archive-video-row [data-framer-name="Right"]>:not(.archive-video-grid){display:none!important}.archive-video-row .archive-video-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));width:272px;max-width:100%;gap:8px;padding:0}.archive-video-row .archive-video-cover{height:52px;aspect-ratio:auto}section[data-framer-name="Archive"] .archive-video-row .archive-video-cover img{display:block!important;opacity:1!important;visibility:visible!important;object-fit:cover}.archive-video-row .archive-video-card strong,.archive-video-row .archive-video-card small{display:none}.archive-video-row .archive-video-play{font-size:14px}@media(max-width:809px){.archive-video-row [data-framer-name="Content"]{gap:12px!important}.archive-video-row [data-framer-name="Right"]{height:auto!important;position:relative!important}.archive-video-row .archive-video-grid{width:100%}.archive-video-row .archive-video-cover{height:auto;aspect-ratio:16/9}}`;
 document.head.append(style);
 function mount(){
  const archive=document.querySelector('section[data-framer-name="Archive"]');
  if(!archive)return;
  archive.querySelectorAll('h5').forEach(heading=>{if(heading.textContent.includes('AI 视频 · 制作中'))heading.textContent='AI 视频';});
  archive.querySelectorAll('h5').forEach(heading=>{
  if(heading.textContent.trim()!=='AI 视频')return;
  const row=heading.closest('.framer-eRGcA');
  if(!row)return;
  row.classList.add('archive-video-row');
  if(row.querySelector('.archive-video-grid'))return;
  let slot=row.querySelector('[data-framer-name=Right]');
  if(!slot){slot=document.createElement('div');slot.setAttribute('data-framer-name','Right');slot.style.width='100%';const content=row.querySelector('[data-framer-name=Content]');if(!content)return;content.style.flexWrap='wrap';content.append(slot);}
  const grid=document.createElement('div');grid.className='archive-video-grid';
  items.forEach(([id,title,type])=>{
   const button=document.createElement('button');button.type='button';button.className='archive-video-card';button.setAttribute('aria-label','播放《'+title+'》· '+type);
   button.innerHTML='<span class="archive-video-cover"><img loading="eager" src="'+base+id+'.jpg" alt="'+title+'视频封面"><span class="archive-video-play" aria-hidden="true">▶</span></span><strong>'+title+'</strong><small>'+type+'</small>';
   button.onclick=()=>{previousOverflow=document.body.style.overflow;player.src=base+id+'.mp4';dialog.querySelector('p').textContent=title+' · '+type;dialog.showModal();document.body.style.overflow='hidden';player.play().catch(()=>{});};
   grid.append(button);
  });
  slot.append(grid);
  });
 }
 let scheduled=false;
 new MutationObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;mount();});}}).observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
 mount();
})();
