(() => {
 const update=()=>{const aboutCta=document.querySelector('section[data-framer-name="Hero"] .framer-ej9q0 a');if(aboutCta){aboutCta.href='/#about';aboutCta.setAttribute('aria-label','查看我的个人简介');const label=aboutCta.querySelector('p');if(label&&label.textContent.trim()!=='查看我的个人简介')label.textContent='查看我的个人简介';}  const lab=document.querySelector('section[data-framer-name="Portfolio"] a[href*="nike-studios"]');
  if(lab){for(const img of lab.querySelectorAll('img')){if(img.getAttribute('src')!=='/assets/generation-workbench-cover.jpg'){img.removeAttribute('srcset');img.setAttribute('src','/assets/generation-workbench-cover.jpg');img.alt='生图工作台';}}const nodes=document.createTreeWalker(lab,NodeFilter.SHOW_TEXT);let text;while(text=nodes.nextNode()){if(text.data.includes('Nike Studios'))text.data=text.data.replace('Nike Studios','生图工作台');if(text.data.includes('Art Direction'))text.data=text.data.replace('Art Direction','AI Workflow');}}  const amazon=document.querySelector('section[data-framer-name="Portfolio"] a[href*="dunwill-lanson"]');
  if(amazon){for(const img of amazon.querySelectorAll('img')){if(img.getAttribute('src')!=='/assets/amazon-series-cover.jpg'){img.removeAttribute('srcset');img.setAttribute('src','/assets/amazon-series-cover.jpg');img.alt='亚马逊主图A+系列';}}const nodes=document.createTreeWalker(amazon,NodeFilter.SHOW_TEXT);let text;while(text=nodes.nextNode()){if(text.data.includes('Dunwill Lanson'))text.data=text.data.replace('Dunwill Lanson','亚马逊主图A+系列');}}
  const card=document.querySelector('section[data-framer-name="Portfolio"] a[href*="vellfire-calibration"]');if(!card)return;
  for(const img of card.querySelectorAll('img')){if(img.getAttribute('src')!=='/assets/tea-ip-cover-v2.jpg'){img.removeAttribute('srcset');img.setAttribute('src','/assets/tea-ip-cover-v2.jpg');img.alt='AI甜芽ip';}}
  const walker=document.createTreeWalker(card,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.data.includes('Vellfire Calibration'))n.data=n.data.replace('Vellfire Calibration','AI甜芽ip');}
 };
 document.addEventListener('click',event=>{const link=event.target.closest('section[data-framer-name="Hero"] .framer-ej9q0 a');if(!link)return;event.preventDefault();event.stopImmediatePropagation();const about=document.getElementById('about');if(!about)return;history.replaceState(null,'','#about');about.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});},true);
 let queued=false;const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;update();});}});observer.observe(document.body,{subtree:true,childList:true,characterData:true});update();
})();



