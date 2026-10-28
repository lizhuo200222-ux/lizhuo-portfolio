(() => {
 const backScrollKey='portfolio-back-scroll';
 try{
  const saved=Number(sessionStorage.getItem(backScrollKey));
  const fromCase=!!document.referrer&&/\/work\/portfolio\/|\/portfolio-template\//.test(document.referrer);
  if(saved>0&&fromCase){
   const jump=()=>{try{window.scrollTo(0,saved);}catch(error){}};
   jump();window.addEventListener('load',jump);setTimeout(jump,300);setTimeout(jump,900);
  }
  sessionStorage.removeItem(backScrollKey);
 }catch(error){}
 addEventListener('click',event=>{
  const target=event.target;const link=target&&target.closest?target.closest('section[data-framer-name="Portfolio"] a[data-framer-name="Project"]'):null;
  if(!link)return;
  try{sessionStorage.setItem(backScrollKey,String(Math.round(window.scrollY)));}catch(error){}
 },true);
 const style=document.createElement('style');style.textContent=`/* Keep all original page modules visible. */#framer-badge-container,#__framer-badge-container,[data-framer-name="Logo"]>a>*,[data-framer-name="Place Your Logo Here"]>div:not(.xiaoli-wordmark){display:none!important}[data-framer-name="Logo"]{position:relative!important;min-height:24px}[data-framer-name="Logo"]:after{content:'XIAOLI®';position:absolute;left:0;top:50%;transform:translateY(-50%);font:800 20px Arial,sans-serif;color:#fff;pointer-events:none;letter-spacing:-1px}[data-framer-name="Place Your Logo Here"]:not(:has(.xiaoli-wordmark)):after{content:'XIAOLI ×';display:block;font:900 clamp(40px,16vw,240px)/.85 Arial,sans-serif;letter-spacing:-.07em}a[href*="framer.com"]{pointer-events:none}`;document.head.append(style); function removeExternalPortfolioLinks(root=document){
  root.querySelectorAll?.('a[href]').forEach(link=>{
   const href=link.getAttribute('href')||'';
   if(/^(#|mailto:|tel:|javascript:)/i.test(href))return;
   try{if(new URL(href,location.href).origin!==location.origin){link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.setAttribute('tabindex','-1');link.dataset.externalLinkRemoved='true';}}catch{link.removeAttribute('href');}
  });
 }
 removeExternalPortfolioLinks();
 new MutationObserver(()=>removeExternalPortfolioLinks()).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['href']});
 document.addEventListener('click',event=>{const link=event.target.closest('section[data-framer-name="L"] a');if(!link)return;event.preventDefault();event.stopImmediatePropagation();location.hash='about';document.getElementById('about')?.scrollIntoView({behavior:'smooth'});},true);
 document.addEventListener('click',event=>{const link=event.target.closest('footer a[data-footer-scroll]');if(!link)return;event.preventDefault();event.stopImmediatePropagation();const target=link.dataset.footerScroll;const el=target==='top'?document.querySelector('section[data-framer-name="Hero"]'):document.getElementById(target);if(el){history.replaceState(null,'','#'+target);el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}},true);
 document.addEventListener('click',event=>{if(event.target.closest('footer a[aria-label="联系电话 13555558884"]')){event.preventDefault();event.stopImmediatePropagation();}},true);
 let pending=false;
 const resultCards=[
  {selector:'.framer-1g23nsb-container',prefix:'约',unit:'制作周期缩短',target:'visual-production',capability:'.framer-14miuru-container'},
  {selector:'.framer-7zvvok-container',prefix:'',unit:'个机器人',target:'data-automation',capability:'.framer-1pihqpm-container'},
  {selector:'.framer-4c4yj0-container',prefix:'',unit:'份分析成果',target:'market-analysis',capability:'.framer-1pihqpm-container'}
 ];
 const processes=[
  [['需求整理','梳理参考图、产品信息、构图、场景、角度与光线需求。'],['批量生成','通过 FORMA 生图工作台，将成熟方案整理为制作模板，批量生成候选图片。支持文生图、图生图、参考图融合等多种模式。'],['一致性检查','筛选候选图，复核产品结构、材质、Logo 与细节一致性。'],['精修交付','调整问题细节，完成后期精修并整理交付素材。建立标准化命名与交付流程。']],
  [['采集需求','梳理 1688 竞品、推广与销售等核心数据维度。'],['机器人搭建','使用影刀 RPA 从零搭建 7 个数据采集机器人，覆盖商品信息、价格监控、销量趋势等场景。'],['定时采集','建立定时采集流程，支持失败重试。减少重复手动操作。'],['清洗汇总','清洗采集结果并汇总，统一多平台字段格式，为后续分析准备标准化数据。']],
  [['平台数据整理','整理 1688、亚马逊与拼多多相关数据，建立跨平台数据清洗与映射规则。'],['可视化看板','将整理后的数据接入九数云，制作动态可视化看板。支持多维度筛选与钻取分析。'],['分析输出','基于清洗后的数据，输出 20+ 份竞品及运营分析成果，涵盖价格分布、销量趋势、评价分析等维度。'],['决策参考','为商品策略与运营决策提供数据支持，减少重复分析工作。']]
 ];
 const processStyle=document.createElement('style');processStyle.textContent=`.portfolio-process{width:100%;box-sizing:border-box;border-top:1px solid #8884;padding-top:20px;font:400 14px/1.7 Arial,"Microsoft YaHei",sans-serif;color:#333}.portfolio-process[hidden]{display:none!important}.portfolio-process h3{font-size:15px;margin:0 0 16px;font-weight:600}.portfolio-process ol{list-style:none;padding:0;margin:0;display:grid;gap:16px}.portfolio-process li{display:grid;grid-template-columns:24px 1fr;gap:8px}.portfolio-process .step-number{opacity:.5;font-size:12px;padding-top:2px}.portfolio-process strong{display:block;font-weight:600}.portfolio-process p{margin:4px 0 0;opacity:.7}.framer-4c4yj0-container .portfolio-process{color:#fff}section[data-framer-name="Pricing"] a[role="button"]:focus-visible{outline:2px solid currentColor;outline-offset:6px}`;document.head.append(processStyle);
 function removeTemplatePortrait(){}
 function personalizeAiPractice(){
  document.querySelectorAll('section[data-framer-name="Services"] img').forEach(image=>{
   if(!image.src.includes('BChNf0ssn5x1I9kAk4vwX8qT5o'))return;
   image.removeAttribute('srcset');
   image.src='/assets/capability-product-studio.png';
   image.alt='香水产品视觉制作工作室';
  });
  const section=document.querySelector('section[data-framer-name="Stats"]');if(!section)return;
  section.id='ai-systems';
  const set=(el,text)=>{if(el&&el.textContent!==text)el.textContent=text;};
  set(section.querySelector('[data-framer-name="Text 1"] p'),'(电商视觉 × AI 工作流)');
  const items=[
   ['AI Native','AI 融入日常创作','将 AI 融入需求研究、创意策划与视觉制作，根据任务选择工具，把想法转化为可交付作品。'],
   ['Agent Systems','智能体搭建与工具接入','围绕具体任务配置角色、指令与工具，接入 API，让智能体协助拆解需求、整理信息与执行流程。'],
   ['Reusable Skills','Skill 编写与技能封装','将成熟的方法、提示词与操作步骤封装为可复用 Skill，让创作经验成为可以持续调用的能力。'],
   ['Creative Pipeline','AI 创作全流程编排','串联策划、生图、筛选、精修与交付，结合自动化和 AI 辅助开发，搭建从需求到结果的创作流程。']
  ];
  section.querySelectorAll('[data-framer-name="Primary"]').forEach((card,i)=>{
   if(!items[i])return;const [title,label,body]=items[i];
   const heading=card.querySelector('h2');set(heading,title);
   if(heading){heading.style.setProperty('font-size','clamp(32px, 4.2vw, 64px)');heading.style.setProperty('letter-spacing','-.055em');heading.style.setProperty('line-height','1.08');}
   set(card.querySelector('[data-framer-name="Heading"] p'),label);
   const description=card.querySelector('[data-framer-name="Content"] [data-framer-name="Text"] p');set(description,body);
   if(description)description.style.setProperty('line-height','1.7');
  });
 }
 function setupAiPracticeArchive(){
  const section=document.querySelector('section[data-framer-name="Article"]');if(!section)return;
  section.id='ai-practice';
  const label=section.querySelector('[data-framer-name="Text 1"] p');if(label&&label.textContent!=='(AI IN ACTION)')label.textContent='(AI IN ACTION)';
  const items=[
   {title:'AI 电商视觉工作流',category:'AI VISUAL PRODUCTION',image:'/assets/portfolio/generation-workbench/ui/lQLPKecTB_GkPuPNBPvNCfawYxyFstmJ-2gKYxjzoJk0AA_2550_1275.png',intro:'参与生图工作台流程和页面搭建，覆盖素材输入、参数设置、批量任务、状态查看与结果筛选。',steps:['梳理真实商品制作任务与输入信息。','把批量生成、进度反馈和失败处理整理成工作流。','结合人工筛选与复核完成素材交付。']},
   {title:'手串 AI 商品视觉',category:'E-COMMERCE VISUAL',image:'/assets/portfolio/bracelet-case/main/01.jpg',intro:'围绕同一款实物手串进行视觉探索、主图制作和详情表达，重点检查珠型、顺序、材质与配件一致性。',steps:['建立产品外观基准与视觉方向。','生成并筛选场景、主图与细节表现。','复核产品身份与画面信息后整理交付。']},
   {title:'1688 数据自动化',category:'AUTOMATION',image:'/assets/portfolio/rpa-case/07-output-evidence.jpg',intro:'使用影刀 RPA 搭建 7 个 1688 数据采集机器人，涉及竞品、推广和销售数据的采集整理。',steps:['拆解平台字段与日常采集任务。','搭建可重复执行的采集流程并处理异常状态。','清洗汇总数据，支持后续分析和看板整理。']},
   {title:'电商详情页视觉',category:'PRODUCT DETAIL DESIGN',image:'/assets/detail-cases/case-1-cover.jpg',intro:'展示猫粮与料理机两套商品详情页视觉方案，梳理产品信息、页面节奏与场景表达。',steps:['整理商品资料与核心信息。','规划首屏、卖点、细节和场景的表达顺序。','统一色彩与版式并完成长图设计。']}
  ];
  const covers=['build','agent','main','detail'];
  items.forEach((item,i)=>{item.evidence=i===2?'/assets/skill-source-main.png':i===3?'/assets/skill-source-detail.png':item.image;item.image='/assets/ai-practice-'+covers[i]+'.png';});
  const cards=[...section.querySelectorAll('a')].slice(0,4);
  cards.forEach((card,i)=>{const item=items[i];if(!item)return;card.dataset.aiPractice=String(i);card.setAttribute('href','#ai-practice-'+i);card.style.cursor='pointer';
   const img=card.querySelector('img');if(img){if(img.getAttribute('src')!==item.image)img.src=item.image;img.removeAttribute('srcset');img.alt=item.title;}
   const ps=card.querySelectorAll('p');if(ps.length>3){['00'+(i+1),item.title,item.category].forEach((text,n)=>{if(ps[n].textContent!==text)ps[n].textContent=text;});}
  });
  let dialog=document.getElementById('ai-practice-dialog');if(!dialog){dialog=document.createElement('dialog');dialog.id='ai-practice-dialog';dialog.className='ai-practice-dialog';dialog.innerHTML='<button class="ai-practice-close" aria-label="关闭">×</button><div class="ai-practice-modal"></div>';document.body.append(dialog);
   const style=document.createElement('style');style.textContent='.ai-practice-dialog{width:min(680px,calc(100vw - 32px));border:0;padding:0;background:#111;color:#fff;border-radius:10px}.ai-practice-dialog::backdrop{background:rgba(0,0,0,.65)}.ai-practice-modal{padding:28px}.ai-practice-modal h2{font:600 clamp(28px,5vw,48px)/1.05 Arial;margin:0 0 10px;letter-spacing:-.05em}.ai-practice-modal .kicker{font-size:12px;opacity:.55;text-transform:uppercase;letter-spacing:.12em}.ai-practice-modal .intro{font-size:15px;line-height:1.7;opacity:.8;margin:20px 0}.ai-practice-modal ol{list-style:none;padding:0;margin:0;display:grid;gap:14px}.ai-practice-modal li{border-top:1px solid #ffffff30;padding-top:12px;line-height:1.6}.ai-practice-modal li b{display:block;font-size:12px;opacity:.45;margin-bottom:4px}.ai-practice-close{position:absolute;right:14px;top:10px;background:none;border:0;color:#fff;font-size:28px;cursor:pointer}.ai-practice-dialog img{width:100%;max-height:220px;object-fit:cover;border-radius:6px;margin:16px 0 4px}';document.head.append(style);dialog.querySelector('.ai-practice-close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
  if(!document.getElementById('ai-practice-refine-style')){const style=document.createElement('style');style.id='ai-practice-refine-style';style.textContent=`#ai-practice a:focus-visible{outline:2px solid #b6bb00;outline-offset:6px}#ai-practice [data-framer-name="Top"]{background:#111!important}#ai-practice img{transition:filter .4s}#ai-practice a:hover img{filter:brightness(1.14)}.ai-practice-dialog{width:min(920px,calc(100vw - 32px));max-height:90vh;overflow:auto;background:#121310}.ai-practice-modal{padding:40px}.ai-practice-modal .kicker{color:#e0e339;opacity:1;margin-bottom:16px}.ai-practice-modal>img{max-height:350px;object-fit:contain;background:#080908}.ai-practice-modal ol{grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin:30px 0}.ai-practice-modal li b{color:#dfe337;opacity:1;font-size:24px;margin-bottom:12px}.practice-evidence{border-top:1px solid #ffffff24;margin-top:28px;padding-top:24px}.practice-evidence h3{font-size:16px}.practice-evidence p{font-size:13px;line-height:1.7;color:#bcbfb5}.practice-evidence img{max-height:300px;object-fit:contain;background:#1c1e18}@media(max-width:600px){.ai-practice-modal{padding:28px 20px}.ai-practice-modal ol{grid-template-columns:1fr;gap:18px}.ai-practice-modal>img{max-height:260px}}@media(prefers-reduced-motion:reduce){#ai-practice img{transition:none}}`;document.head.append(style);}
  if(section.dataset.practiceBound)return;section.dataset.practiceBound='true';
  dialog.addEventListener('click',e=>{const source=e.target.closest('.skill-source-preview');if(source){source.classList.add('expanded');source.setAttribute('aria-expanded','true');e.stopPropagation();}},true);
  const sourceStyle=document.createElement('style');sourceStyle.textContent=`.skill-method{border-top:1px solid #ffffff25;padding-top:28px;margin-top:28px}.skill-method h3{font-size:22px;letter-spacing:-.03em}.skill-method p{font-size:14px;line-height:1.85;color:#bbc2b3}.skill-flow{padding:18px;border:1px solid #dfea5630;background:#dfea5608;color:#e4ec91!important}.skill-source-preview{display:block;width:100%;padding:0;border:1px solid #ffffff25;background:#101211;cursor:zoom-in;border-radius:8px;overflow:hidden}.skill-source-preview img{display:block;width:100%;max-height:360px!important;object-fit:cover!important;object-position:top;margin:0!important}.skill-source-preview.expanded{cursor:zoom-out}.skill-source-preview.expanded img{max-height:none!important}.source-caption{font-size:12px!important;color:#969e8c!important}`;document.head.append(sourceStyle);
  dialog.addEventListener('close',()=>{document.body.style.overflow='';});
  const sourceContent=(index)=>{
   if(index<2)return '';
   const main=index===2;
   return '<section class="skill-method"><div class="kicker">METHOD → RULES → SKILL</div><h3>从制作经验到可复用技能</h3><p>'+(main?'我的出发点是减少每次制作主图都要重新描述构图与质量要求的重复工作。先拆解稳定的制作步骤，再把规则、分支与检查节点组织成 Skill。':'我的出发点是让详情页从零散出图变成有顺序、有统一视觉的制作流程。先收集产品资料，再规划买家需要了解的信息，最后逐屏生成与检查。')+'</p><p class="skill-flow">'+(main?'识别需求 → 锁定产品与平台约束 → 建立主图基准 → 规划副图类型 → 检查一致性':'收集产品图 → 瑕疵分析与精修 → 产品信息与风格参考 → 分屏策划 → 提示词提取 → 逐屏生成与检查')+'</p><h3>制作 Skill 的思路</h3><p><strong>01 / 先明确输入与输出</strong><br>'+(main?'区分只做主图、完整套图与 A+ 内容，避免所有需求都走同一个模板。':'将产品图、产品信息和参考风格作为三个输入阶段，资料不完整时先补齐。')+'</p><p><strong>02 / 将经验变成执行规则</strong><br>'+(main?'把背景、构图、产品身份和套图一致性写成明确约束；先生成基准图，再沿用基准制作副图。':'先检查产品身份与多角度一致性，再制定分屏结构；每一屏只承担一个主要沟通任务。')+'</p><p><strong>03 / 设置检查与返修节点</strong><br>'+(main?'将需求分流、平台约束与一致性检查放进流程，让交付有可重复的标准。':'把瑕疵分析、精修提示词和一致性报告放在前面，发现问题先修复，再进入下一步。')+'</p><h3>SKILL.md 源文件节选</h3><button type="button" class="skill-source-preview" aria-expanded="false" aria-label="展开源文件截图"><img src="/assets/skill-source-'+(main?'main':'detail')+'.png" alt="'+(main?'主图需求分流与执行步骤':'详情页输入阶段与工作流')+'真实源文件节选"></button><p class="source-caption">真实源文件内容的代码视图截图 · 点击展开 / 收起<br>'+(main?'product-shots-main-image / SKILL.md':'ecommerce-detail-page-workflow / SKILL.md')+'</p><p class="source-caption">'+(main?'基于已有开源主图 Skill 的规则结构，结合我的制作需求进行组织与使用；AI 协助理解和润色实现。':'将制作流程整理为可调用指令，结合自己的产品与交付需求迭代；AI 协助润色和完善实现。')+'</p></section>';
  };

  document.addEventListener('click',e=>{const card=e.target.closest('a[data-ai-practice]');if(!card)return;e.preventDefault();e.stopImmediatePropagation();const index=Number(card.dataset.aiPractice),item=items[index];dialog.querySelector('.ai-practice-modal').innerHTML='<div class="kicker">'+item.category+' · AI PRACTICE</div><h2>'+item.title+'</h2><img src="'+item.image+'" alt="AI 生成的能力概念封面"><p class="intro">'+item.intro+'</p><ol>'+item.steps.map((s,n)=>'<li><b>0'+(n+1)+'</b>'+s+'</li>').join('')+'</ol><div class="practice-evidence"><h3>'+['实际页面','工作台与流程设计','主图 Skill 源文件','详情页 Skill 源文件'][index]+'</h3><p>'+['由我提出视觉和交互需求，借助 AI 编程与预览迭代。','产品资料 → 任务分析 → 调用主图 / 详情页 Skill → 方案输出 → 人工检查。下图为现有工作台，展示流程所连接的制作工具。','我的方法设计：产品分析、构图约束、一致性检查与交付标准；AI 协助完善指令与实现。下图展示主图 Skill 的需求分流与执行步骤。','我的方法设计：资料收集、卖点策划、统一视觉与逐屏生成；AI 协助润色指令。下图展示详情页 Skill 的输入阶段与制作流程。'][index]+'</p><img src="'+item.evidence+'" alt="'+item.title+'相关作品"></div>';dialog.querySelector('.ai-practice-modal').insertAdjacentHTML('beforeend',sourceContent(index));dialog.showModal();document.body.style.overflow='hidden';},true);
 }
 function personalizeResults(){
  const section=document.querySelector('section[data-framer-name="Pricing"]');if(!section)return;
  if(section.id==='strengths')return;
  for(const [index,item] of resultCards.entries()){
   const card=section.querySelector(item.selector);if(!card)continue;
   const set=(selector,value)=>{const el=card.querySelector(selector);if(el&&el.textContent!==value)el.textContent=value;};
   set('[data-framer-name="Currency"] p',item.prefix);
   set('[data-framer-name="Duration"] p',item.unit);
   const link=card.querySelector('a');if(!link)continue;
   const panelId='process-'+item.target;
   let panel=card.querySelector('.portfolio-process');
   if(!panel){
    panel=document.createElement('div');panel.className='portfolio-process';panel.id=panelId;panel.hidden=true;
    panel.innerHTML='<h3>项目过程</h3><ol>'+processes[index].map(([title,body],i)=>'<li><span class="step-number">0'+(i+1)+'</span><div><strong>'+title+'</strong><p>'+body+'</p></div></li>').join('')+'</ol>';
    card.firstElementChild.append(panel);
   }
   set('a p',panel.hidden?'项目过程':'收起过程');
   link.setAttribute('href','#'+panelId);link.setAttribute('role','button');link.setAttribute('aria-controls',panelId);link.setAttribute('aria-expanded',String(!panel.hidden));
   if(index===0&&!card.querySelector('.ai-capability-note')){
    const note=document.createElement('div');
    note.className='ai-capability-note';
    note.innerHTML='<p style="margin:16px 0 0;padding:12px;background:rgba(255,255,255,.05);border-radius:8px;font-size:13px;line-height:1.6;opacity:.85">能力方向：<strong>智能体搭建 / Skill 编写与封装 / API 工具接入 / 工作流编排</strong>，结合 AI 视觉生产与数据自动化实践场景。</p>';
    panel.parentElement.append(note);
   }
   if(index===1&&!card.querySelector('.rpa-capability-note')){
    const note=document.createElement('div');
    note.className='rpa-capability-note';
    note.innerHTML='<p style="margin:16px 0 0;padding:12px;background:rgba(255,255,255,.05);border-radius:8px;font-size:13px;line-height:1.6;opacity:.85">已搭建 7 个<strong>影刀 RPA</strong> 数据采集机器人。能力拓展方向：通过智能体、Skill 封装与 API 工具提升自动化复用性。</p>';
    panel.parentElement.append(note);
   }
  }
 }
 function bindPortfolioCardNav(){
  if(window.__portfolioCardNavBound)return;window.__portfolioCardNavBound=true;
  addEventListener('click',event=>{
   const target=event.target;const link=target&&target.closest?target.closest('a[data-framer-name="Project"][data-card-nav="true"]'):null;
   if(!link)return;
   if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();event.stopImmediatePropagation();location.assign(link.getAttribute('href'));
  },true);
 }
 function mountPortfolioCover(link,src){
  const top=link.querySelector('[data-framer-name="Top"]');if(!top||!src)return;
  if(top.dataset.coverSrc===src)return;top.dataset.coverSrc=src;
  top.style.position='relative';
  let bg=top.querySelector('.portfolio-cover-bg');
  if(!bg){
   bg=document.createElement('div');bg.className='portfolio-cover-bg';
   bg.style.cssText='position:absolute;inset:0;background-size:cover;background-position:center;filter:blur(26px);transform:scale(1.1);pointer-events:none;';
   top.prepend(bg);
  }
  bg.style.backgroundImage='url("'+src+'")';
  const content=top.querySelector('[data-framer-name="Content"]');if(!content)return;
  content.style.position='relative';
  if(!content.dataset.coverBox){
   const rect=content.getBoundingClientRect();
   content.dataset.coverBox=Math.round(rect.width)+'x'+Math.round(rect.height);
   content.style.width=(Math.round(rect.width)||432)+'px';
   content.style.height=(Math.round(rect.height)||256)+'px';
   content.style.flex='0 0 auto';
  }
  let img=content.querySelector('img.portfolio-cover-inline');
  if(!img){img=document.createElement('img');img.className='portfolio-cover-inline';img.style.cssText='position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit;';content.append(img);}
  img.src=src;img.alt='';
  content.querySelectorAll('video').forEach(video=>{try{video.pause();}catch{}video.style.display='none';});
  content.querySelectorAll('[data-framer-name="Inner Image"]').forEach(node=>{node.style.display='none';});
 }
 function personalizePortfolioCases(){
  const section=document.querySelector('section[data-framer-name="Portfolio"]');if(!section)return;
  const cases=[
   {title:'AI 甜芽 IP',category:'角色 / 品牌视觉',href:'/work/portfolio/vellfire-calibration/',image:'/assets/tea-case/visual-01.jpg'},
   {title:'电商详情页设计',category:'商品视觉 / 详情设计',summary:'三套详情页 / 分屏结构 / 完整交付',href:'/portfolio-template/',image:'/assets/portfolio-template-cover.png',nav:true},
   {title:'生图工作台',category:'AI 生成 / 工作流界面',summary:'自由生图 / 商品处理 / 设计创作',href:'/work/portfolio/generation-workbench/index.html',image:'/assets/workbench-case/ui-01.png',coverMount:true},
   {title:'跨境短视频粗剪',category:'参考拆解 / AI 视频 / 粗剪',summary:'参考拆解 / 分镜 / 粗剪交付',href:'/work/portfolio/ai-video-workflow/',image:'/assets/portfolio/cross-border-video/handbag.jpg'},
  ];
  section.querySelectorAll('a[data-framer-name="Project"]').forEach((link,index)=>{
   const item=cases[index];if(!item)return;
   link.setAttribute('href',item.href);
   const texts=[...link.querySelectorAll('[data-framer-name="Title"] p,[data-framer-name="Category"] p,[data-framer-name="Text"] p')];
   if(texts[0])texts[0].textContent=item.title;if(texts[1]){texts[1].textContent=item.category;texts[1].style.display=item.category?'':'none';}if(texts[2]&&item.summary)texts[2].textContent=item.summary;
   link.querySelectorAll('img').forEach(image=>{if(item.image){image.removeAttribute('srcset');image.src=item.image;}image.alt=item.title+(item.category?' / '+item.category:'');});
   if(item.coverMount)mountPortfolioCover(link,item.image);
   if(item.nav){link.dataset.cardNav='true';bindPortfolioCardNav();}
  });
  const close=[...section.querySelectorAll('h4,h5,p')].find(el=>el.textContent.trim()==="FX-25'");if(close)close.textContent='XIAOLI / 李卓';
  section.querySelectorAll('h1').forEach((heading,index)=>{heading.setAttribute('aria-hidden','true');heading.tabIndex=-1;});
 }
 function personalizeAboutPage(){
  const about=document.querySelector('section[data-framer-name="About"]');
  if(!about)return;
  about.classList.add('about-profile-redesign');
  const setText=(selector,text)=>{const node=about.querySelector(selector);const p=node?.matches('p')?node:node?.querySelector('p');if(p&&p.textContent!==text)p.textContent=text;return p;};
  setText('.framer-1t6yhrg [data-framer-name="Text 1"]','');
  setText('.framer-1t6yhrg [data-framer-name="Text 2"]','');
  about.querySelector('.framer-1t6yhrg')?.style.setProperty('display','none');

  const intro=about.querySelector('.framer-d4kxpu-container');
  const introLines=[
    '我是李卓，电商视觉设计师。',
    '以 3D 与 AI 拓展创意，从商品主图、详情页到',
    '动态影像，构建有质感、有辨识度的商业视觉。',
  ];
  if(intro){
    const visible=[...intro.children].find(node=>node.getAttribute('aria-hidden')!=='true'&&[...node.children].some(child=>child.querySelector('span')));
    const wrappers=visible?[...visible.children]:[];
    const animated=wrappers.map(wrapper=>wrapper.querySelector('span')).filter(Boolean);
    animated.forEach((span,index)=>{span.textContent=introLines[index]||'';if(wrappers[index])wrappers[index].style.display=index<introLines.length?'block':'none';});
    const measure=intro.querySelector('[aria-hidden="true"]');if(measure)measure.textContent=introLines.join('\n');
  }

  const portrait=about.querySelector('.framer-b8e2di img');
  if(portrait&&portrait.getAttribute('src')!=='/assets/about-li-zhuo.png'){
    portrait.removeAttribute('srcset');portrait.src='/assets/about-li-zhuo.png';portrait.alt='李卓，电商视觉设计师';
  }

  setText('.framer-vmrxtv [data-framer-name="Heading"]','视觉能力');
  setText('.framer-mkhvv2','具备2年以上电商与商业视觉经验，毕业于长春光华学院影视摄影与制作专业。熟练使用 C4D、Redshift、OC，完成产品建模、材质灯光、商品主图、详情页与品牌视频制作。');
  setText('.framer-1t09l2g [data-framer-name="Heading"]','工作方式');
  setText('.framer-1l1ky8t','将 AI 生图、候选筛选、产品一致性检查与后期精修串联成标准化流程；结合 Codex、影刀和 API，参与图片生成工作台与网页工具搭建，让创意制作更高效。');
  setText('.framer-hb0zvv','实践成果');
  const resultRows=[...about.querySelectorAll('.framer-105k73z [data-framer-name="1"],.framer-105k73z [data-framer-name="2"]')];
  const results=[['单张物料制作周期缩短（流程统计）','约 60%'],['1688 数据采集机器人','7']];
  resultRows.forEach((row,index)=>{const fields=row.querySelectorAll('[data-framer-name="Text 1"] p,[data-framer-name="Text 2"] p');if(fields[0])fields[0].textContent=results[index]?.[0]||'';if(fields[1])fields[1].textContent=results[index]?.[1]||'';});

  const contact=about.querySelector('.framer-cVr5E');
  if(contact){
    const p=contact.querySelector('p');if(p)p.textContent='联系方式：13555558884';
    contact.removeAttribute('href');contact.setAttribute('aria-label','联系方式：13555558884');contact.setAttribute('aria-disabled','true');
  }

  if(!document.getElementById('about-profile-redesign-style')){
    const style=document.createElement('style');style.id='about-profile-redesign-style';
    style.textContent=`
      .about-profile-redesign .framer-xxrn3h,
      .about-profile-redesign .framer-1we30un{width:min(73vw,1349px)!important;margin-left:auto!important;margin-right:auto!important}
      .about-profile-redesign .framer-xxrn3h{margin-top:60px!important}
      .about-profile-redesign .framer-900tmv{height:78px!important;min-height:78px!important}
      .about-profile-redesign .framer-d4kxpu-container{width:100%!important;transform:translateY(-18px);font-size:clamp(42px,3.6vw,68px)!important;line-height:1.05!important;letter-spacing:-.035em!important;text-align:left!important}
      .about-profile-redesign .framer-d4kxpu-container>div:not([aria-hidden="true"]){font-size:inherit!important;line-height:inherit!important;letter-spacing:inherit!important}
      .about-profile-redesign .framer-d4kxpu-container>div:not([aria-hidden="true"])>span{line-height:1.05!important;margin-bottom:0!important}
      .about-profile-redesign .framer-d4kxpu-container>div:not([aria-hidden="true"])>span:first-child{width:65%!important;margin-left:35%!important}
      .about-profile-redesign .framer-d4kxpu-container>div:not([aria-hidden="true"])>span>span{font-size:inherit!important;font-weight:600!important;line-height:1.05!important;letter-spacing:-.035em!important;white-space:normal!important}
      .about-profile-redesign .framer-b8e2di{width:clamp(220px,16.6vw,308px)!important;height:auto!important;margin-left:10px!important;flex:0 0 auto!important;align-self:flex-start!important}
      .about-profile-redesign .framer-5593zm{position:relative!important;top:-100px!important;width:100%!important;height:auto!important;aspect-ratio:1086/1452!important;overflow:hidden!important}
      .about-profile-redesign .framer-5593zm img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center top!important}
      .about-profile-redesign .framer-a1e6to{transform:translateX(-13px);padding-top:26px!important;gap:40px!important}
      .about-profile-redesign .framer-vmrxtv,.about-profile-redesign .framer-1t09l2g,.about-profile-redesign .framer-xh9v2p{gap:clamp(96px,8.3vw,154px)!important}
      .about-profile-redesign .framer-105k73z{gap:clamp(64px,5vw,92px)!important}
      .about-profile-redesign .framer-mkhvv2 p,.about-profile-redesign .framer-1l1ky8t p{color:#737373!important;font-weight:400!important;line-height:1.35!important}
      .about-profile-redesign .framer-cVr5E{cursor:default!important;margin-top:32px!important}
      @media(max-width:809px){
        .about-profile-redesign .framer-xxrn3h,.about-profile-redesign .framer-1we30un{width:calc(100% - 40px)!important}
        .about-profile-redesign .framer-xxrn3h{margin-top:32px!important}
        .about-profile-redesign .framer-d4kxpu-container{font-size:clamp(32px,6vw,48px)!important}
        .about-profile-redesign .framer-d4kxpu-container>div:not([aria-hidden="true"])>span:first-child{width:100%!important;margin-left:0!important}
        .about-profile-redesign .framer-1we30un{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:30px!important}
        .about-profile-redesign .framer-b8e2di{width:min(58vw,308px)!important}
        .about-profile-redesign .framer-cmfpcx{display:none!important}
        .about-profile-redesign .framer-a1e6to{transform:none!important;gap:24px!important}
        .about-profile-redesign .framer-vmrxtv,.about-profile-redesign .framer-1t09l2g,.about-profile-redesign .framer-xh9v2p{gap:24px!important}
      }
    `;
    document.head.append(style);
  }
 }
 function personalizeSoftwareMarquee(){
  const section=document.querySelector('section[data-framer-name="Desktop"].framer-9weVr');
  const list=section?.querySelector('ul');
  if(!list)return;
  section.id='software-tools';
  section.setAttribute('aria-label','李卓使用的软件与工具');
  const tools=['FORMA / AI 生图','ComfyUI','DeepSeek','Codex','Claude','WorkBuddy','剪映 / CapCut','ClipCat','Premiere Pro','After Effects','Photoshop','Illustrator','Cinema 4D','Redshift','Octane Render','影刀 RPA','九数云','API'];
  const templateItem=list.children[0];
  while(templateItem&&list.children.length<tools.length)list.append(templateItem.cloneNode(true));
  [...list.children].forEach((item,index)=>{
   const name=tools[index%tools.length];
   const card=item.querySelector('.framer-Ab1Db');
   const content=card?.querySelector('.framer-1atv9y3');
   if(!card||!content)return;
   if(item.dataset.softwareName===name&&content.querySelector('.software-marquee-name'))return;
   item.dataset.softwareName=name;
   item.setAttribute('aria-label',name);
   item.setAttribute('aria-hidden',index<tools.length?'false':'true');
   card.setAttribute('aria-label',name);
   card.style.position='relative';
   card.style.overflow='hidden';
   content.classList.add('software-marquee-content');
   const label=document.createElement('span');
   label.className='software-marquee-name';
   label.textContent=name;
   content.replaceChildren(label);
  });
  if(!document.getElementById('software-marquee-style')){
   const style=document.createElement('style');style.id='software-marquee-style';
   style.textContent='.software-marquee-content{position:absolute!important;inset:0!important;display:grid!important;width:100%!important;height:100%!important;place-items:center!important;background:#f7f7f7!important}.software-marquee-name{display:block;width:100%;max-width:100%;padding:12px 16px;color:#171717;text-align:center;font:700 clamp(16px,1.4vw,21px)/1.15 Inter,"Microsoft YaHei","Noto Sans SC",sans-serif;letter-spacing:-.035em;white-space:normal;word-break:keep-all;overflow-wrap:normal}@media(max-width:809px){.software-marquee-name{font-size:clamp(15px,3.8vw,20px)}}';
   document.head.append(style);
  }
 }
 function personalizeHomepage(){
  const hero=document.querySelector('section[data-framer-name="Hero"]');const intro=hero?.querySelector('.framer-ej9q0');
  if(intro){let h=intro.querySelector('.portfolio-role-h1');if(!h){h=document.createElement('h1');h.className='portfolio-role-h1';h.textContent='\u674e\u5353 / \u7535\u5546\u89c6\u89c9\u8bbe\u8ba1\u5e08';h.style.cssText='position:relative;z-index:2;margin:0 0 12px;color:#fff;font:600 clamp(16px,1.8vw,24px)/1.2 Arial,"Microsoft YaHei",sans-serif;letter-spacing:-.035em;text-shadow:0 2px 16px #0008';intro.insertBefore(h,intro.firstChild);}const lines=[...intro.querySelectorAll('[data-framer-name="Description"] p')];if(lines[0])lines[0].textContent='\u628a\u4ea7\u54c1\u89c6\u89c9\u505a\u5f97\u6e05\u6670\u3001\u6709\u8fa8\u8bc6\u5ea6\u3002';if(lines[1])lines[1].textContent='AI \u4e0e\u81ea\u52a8\u5316\uff0c\u8ba9\u5236\u4f5c\u6d41\u7a0b\u66f4\u9ad8\u6548\u3002';const cta=[...intro.querySelectorAll('a')].find(a=>a.textContent.includes('Explore Now'));if(cta){cta.href='#about';const p=cta.querySelector('p');if(p)p.textContent='\u67e5\u770b\u6211\u7684\u4e2a\u4eba\u7b80\u4ecb';}}
  document.querySelectorAll('section[data-framer-name="Portfolio"] h1').forEach(h=>{const x=document.createElement('h2');for(const a of h.attributes)x.setAttribute(a.name,a.value);x.innerHTML=h.innerHTML;h.replaceWith(x);});
  personalizeAboutPage();
  personalizeSoftwareMarquee();
  const services=document.querySelector('section[data-framer-name="Services"]');if(services){const ls=[...services.querySelectorAll('[data-framer-name="Text 1"] p,[data-framer-name="Text 2"] p,[data-framer-name="Text 3"] p')];if(ls[0])ls[0].textContent='01 / \u7535\u5546\u89c6\u89c9\u8bbe\u8ba1';if(ls[1])ls[1].textContent='02 / 3D \u5546\u54c1\u8868\u73b0';if(ls[2])ls[2].textContent='03 / AI \u4e0e\u81ea\u52a8\u5316';}
  const cards=document.querySelector('section[data-framer-name="Portfolio"]');if(cards){const close=[...cards.querySelectorAll('h4,h5,p')].find(x=>x.textContent.trim()==="FX-25'");if(close)close.textContent='XIAOLI / \u674e\u5353';for(const link of cards.querySelectorAll('a[href*="work/portfolio/"]')){const text=link.textContent;if(text.includes('Join Us Now')){link.href='/work/portfolio/amazon-a-plus/';link.setAttribute('aria-label','打开亚马逊主图与 A+ 商品视觉案例');const p=link.querySelector('p');if(p)p.textContent='\u4e9a\u9a6c\u900a\u4e3b\u56fe + A+ \u7cfb\u5217';const img=link.querySelector('img');if(img){img.removeAttribute('srcset');img.src='/assets/amazon-series-cover.jpg';img.alt='亚马逊主图与 A+ 商品视觉系列';}continue;}const items=[['vellfire-calibration','/work/portfolio/vellfire-calibration/','AI \u751c\u82bd IP','\u89d2\u8272 / \u54c1\u724c\u89c6\u89c9'],['dunwill-lanson','/portfolio-template/index.html','\u7535\u5546\u56fe','','/assets/ecommerce-model-cover.png'],['noara-willis','/work/portfolio/noara-willis/','\u7535\u5546\u8be6\u60c5\u9875','\u5546\u54c1\u89c6\u89c9 / \u8be6\u60c5\u8bbe\u8ba1'],['nike-studios','/work/selected-3/','\u624b\u4e32 AI \u5546\u54c1\u89c6\u89c9','\u4e3b\u56fe / \u8be6\u60c5\u89c6\u89c9']];const item=items.find(x=>(link.getAttribute('href')||'').includes(x[0]));if(item){link.href=item[1];const ps=link.querySelectorAll('[data-framer-name="Title"] p,[data-framer-name="Category"] p');if(ps[0])ps[0].textContent=item[2];if(ps[1]){ps[1].textContent=item[3];ps[1].style.display=item[3]?'':'none';}const img=link.querySelector('img');if(img){if(item[4]){img.removeAttribute('srcset');img.src=item[4];}img.alt=item[2]+(item[3]?' / '+item[3]:'');}}}
  document.querySelectorAll('p').forEach(p=>{if(p.textContent.includes('95%+'))p.textContent='\u5efa\u7acb\u53ef\u91cd\u590d\u6267\u884c\u7684\u91c7\u96c6\u6d41\u7a0b\uff0c\u51cf\u5c11\u91cd\u590d\u624b\u52a8\u64cd\u4f5c\u3002';if(p.textContent.includes('20+ \u4efd'))p.textContent='\u6574\u7406\u591a\u5e73\u53f0\u7ade\u54c1\u4e0e\u8fd0\u8425\u5206\u6790\u6750\u6599\uff0c\u652f\u6301\u590d\u76d8\u548c\u770b\u677f\u4f7f\u7528\u3002';});
 }
 }
 const strengthSteps=[
  {title:'需求拆解',body:'把产品信息、参考图、构图、角度与光线拆成可执行的制作条件，先确认这一次要解决的卖点，再决定用 3D 还是 AI 出图。'},
  {title:'批量生成',body:'用生图工作台与 ComfyUI 批量跑候选图，把稳定方案沉淀成模板；同一套参数可以重复执行，单张制作周期因此缩短约 60%。'},
  {title:'复核交付',body:'逐项检查产品结构、材质与 Logo 一致性，精修后按平台规范整理命名与交付；7 个 RPA 机器人负责把重复采集做完。'},
 ];
 function personalizeStrengthsPage(){
  const section=document.querySelector('section[data-framer-name="Pricing"]');if(!section)return;
  section.id='strengths';
  const labels=section.querySelectorAll('[data-framer-name="Text 1"] p');
  if(labels[0])labels[0].textContent='(我的优势)';
  const subtitle=[...section.querySelectorAll('p')].find(p=>p.textContent.trim()==='(Pricing)');if(subtitle)subtitle.textContent='(专业能力)';
  const firstCard=section.querySelector('.framer-1g23nsb-container,.framer-7zvvok-container,.framer-4c4yj0-container');
  const bottom=firstCard?firstCard.parentElement:null;
  if(!bottom||bottom.dataset.stepsMounted==='1')return;
  const inner=section.querySelector('section[data-framer-name="Overlap Detailing"]')||section;
  if(!document.getElementById('portfolio-steps-style')){
   const style=document.createElement('style');style.id='portfolio-steps-style';
   style.textContent='.portfolio-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:48px;width:min(1298px,calc(100% - 48px));margin:0 auto;padding:10px 0 26px;font-family:Arial,"Microsoft YaHei",sans-serif;color:#171717;text-align:left}.portfolio-step{display:grid;gap:14px;align-content:start;border-top:1px solid rgba(0,0,0,.16);padding-top:22px}.portfolio-step b{font:600 12px/1 Arial,sans-serif;letter-spacing:.12em;color:#a3a3a3}.portfolio-step h3{margin:0;font-size:clamp(20px,2vw,27px);line-height:1.15;letter-spacing:-.035em;font-weight:600}.portfolio-step p{margin:0;font-size:14px;line-height:1.85;color:#6b6b6b}@media(max-width:809px){.portfolio-steps{grid-template-columns:1fr;gap:26px;width:calc(100% - 40px)}.portfolio-step{padding-top:18px}}';
   document.head.append(style);
  }
  bottom.dataset.stepsMounted='1';
  bottom.innerHTML='';
  bottom.style.cssText='display:block!important;height:auto!important;min-height:0!important;width:100%!important;max-width:none!important';
  inner.style.height='auto';inner.style.minHeight='0';
  const list=document.createElement('div');list.className='portfolio-steps';
  list.innerHTML=strengthSteps.map((step,index)=>'<div class="portfolio-step"><b>'+String(index+1).padStart(2,'0')+'</b><h3>'+step.title+'</h3><p>'+step.body+'</p></div>').join('');
  bottom.append(list);
  const metrics=section.querySelector('.portfolio-metrics');if(metrics)section.append(metrics);
 }
 const careerLead='我把产品特点讲清楚，再把重复环节交给工具——这是我在做电商视觉时的顺序。从 3D 建模到 AI 批量生成与数据自动化，我在意的是每一次交付都能被复现、被检查。';
 const careerBlocks=[
  {image:'/assets/section05-orange.jpg',kicker:'01 / 工作过的地方',title:'浙江树外科技 · 义乌临祥纺织',items:['浙江树外科技有限公司 · 电商视觉设计 / AI 内容与流程优化（2025.08–2026.09）','义乌市临祥纺织品有限公司 · 3D 设计师（2023.06–2024.04）']},
  {image:'/assets/section05-blue.jpg',kicker:'02 / 常用工具',title:'从 C4D 到 Codex',items:['建模与渲染：C4D / Redshift / OC','视觉与版式：Photoshop / Illustrator','AI 与自动化：ComfyUI / Codex / 影刀 RPA / 九数云']},
  {image:'/assets/section05-study.jpg',kicker:'03 / 学校',title:'长春光华学院',items:['影视摄影与制作（本科）· 2021–2025']},
 ];
 const archiveRows=[
  {year:'2026',title:'系列海报与城市视觉',href:'/work/selected-1/',thumbs:['1-1','1-2','1-3'].map(name=>'/assets/archive-selected/'+name+'.jpg')},
  {year:'2026',title:'瑜伽服 AI 电商视觉',href:'/work/selected-2/',thumbs:['4-1','4-2','4-3'].map(name=>'/assets/archive-selected/'+name+'.png')},
  {year:'2026',title:'高跟鞋 AI 电商视觉',href:'/work/selected-3/',thumbs:['5-1','5-2','5-3'].map(name=>'/assets/archive-selected/'+name+'.png')},
  {year:'2026',title:'1688 数据自动化',href:'/work/selected-4/',thumbs:['01-flow-industry','05-process-map','07-output-evidence'].map(name=>'/assets/portfolio/rpa-case/'+name+'.jpg')},
  {year:'2026',title:'AI 短视频',href:'/work/portfolio/ai-video-workflow/',
   thumbs:['seasons','zhiyin','jiangjinjiu'].map(name=>'/assets/ai-video-collection/'+name+'.jpg'),
   videos:[
    {name:'四季',src:'/assets/ai-video-collection/seasons.mp4'},
    {name:'知音 · AI 人物',src:'/assets/ai-video-collection/zhiyin.mp4'},
    {name:'将进酒',src:'/assets/ai-video-collection/jiangjinjiu.mp4'},
   ]},
 ];
 function personalizeArchive(){
  const section=document.querySelector('section[data-framer-name="Archive"]');if(!section)return;
  section.id='more-work';
  const host=section.querySelector('[data-framer-name="List"]');
  if(!host)return;
  if(host.querySelector('.portfolio-archive'))return;
  if(!document.getElementById('portfolio-archive-style')){
   const style=document.createElement('style');style.id='portfolio-archive-style';
   style.textContent='.portfolio-archive{display:grid;width:min(1298px,calc(100% - 48px));margin:0 auto;font-family:Arial,"Microsoft YaHei",sans-serif;color:#171717}.portfolio-archive-row{display:grid;grid-template-columns:120px minmax(0,1fr) auto;gap:28px;align-items:center;padding:26px 0;border-top:1px solid rgba(0,0,0,.14);text-decoration:none;color:inherit;transition:opacity .2s ease}.portfolio-archive-row:last-child{border-bottom:1px solid rgba(0,0,0,.14)}.portfolio-archive-row:hover{opacity:.6}button.portfolio-archive-row{border-left:0;border-right:0;border-bottom:0;background:none;font:inherit;text-align:left;width:100%;cursor:pointer}.portfolio-archive-date{font-size:13px;color:#a3a3a3;letter-spacing:.06em}.portfolio-archive-row h3{margin:0;font-size:clamp(20px,2.2vw,30px);font-weight:500;letter-spacing:-.03em;line-height:1.1}.portfolio-archive-thumbs{display:flex;gap:10px}.portfolio-archive-thumbs img{display:block;width:96px;height:64px;object-fit:cover;object-position:center top;border-radius:4px}@media(max-width:809px){.portfolio-archive{width:calc(100% - 40px)}.portfolio-archive-row{grid-template-columns:1fr;gap:10px;padding:20px 0}.portfolio-archive-thumbs img{width:76px;height:52px}}';
   document.head.append(style);
  }
  host.dataset.archiveMounted='1';
  host.innerHTML='';
  host.style.cssText='display:block!important;height:auto!important;min-height:0!important;width:100%!important;max-width:none!important';
  const list=document.createElement('div');list.className='portfolio-archive';
  list.innerHTML=archiveRows.map(row=>'<button type="button" class="portfolio-archive-row" data-title="'+row.title+'" data-preview="'+row.thumbs.join('|')+'"><div class="portfolio-archive-date">'+row.year+'</div><h3>'+row.title+'</h3><span class="portfolio-archive-thumbs">'+row.thumbs.map(src=>'<img src="'+src+'" alt="'+row.title+'" loading="lazy">').join('')+'</span></button>').join('');
  const buttons=[...list.querySelectorAll('.portfolio-archive-row')];
  buttons.forEach((row,rowIndex)=>{
   row.addEventListener('click',event=>{
    const data=archiveRows[rowIndex];if(!data)return;
    const thumb=event.target.closest('img');
    const thumbIndex=thumb?[...row.querySelectorAll('img')].indexOf(thumb):0;
    if(data.videos){openArchiveVideo(data.videos,Math.max(0,thumbIndex));return;}
    openArchiveViewer(data.title,data.thumbs,thumb?new URL(thumb.currentSrc||thumb.src,location.origin).pathname:'');
   });
  });
  host.append(list);
 }
 const careerSlides=[
  {src:'/assets/section05-orange.jpg',
   quote:'把产品特点讲清楚，把重复环节交给工具，这是我做电商视觉的顺序。从 3D 建模到批量生成，再到数据自动化——我在意每一次交付都能复现、检查。',
   lines:['把产品特点讲清楚，','把重复环节交给工具，','这是我做电商视觉的顺序。','从 3D 建模到批量生成，','再到数据自动化——我在意','每一次交付都能复现、检查。']},
  {src:'/assets/section05-blue.jpg',
   quote:'我更在意画面之外的东西：参考图怎么拆，提示词怎么约束，结果怎么筛选。让 AI 稳定产出可用的商品图，比偶尔一张惊艳更重要。',
   lines:['我更在意画面之外的东西：','参考图怎么拆，','提示词怎么约束，','结果怎么筛选。','让 AI 稳定产出可用的图，','比偶尔一张惊艳更重要。']},
  {src:'/assets/section05-slide-2.jpg',
   quote:'从建模到成片，我习惯把流程写成可复用的模板。换一个产品，质量和速度都不用重新摸索，这是我想交给团队的东西。',
   lines:['从建模到成片，','我习惯把流程','写成可复用的模板。','换一个产品，质量和速度','都不用重新摸索，','这是我想交给团队的东西。']},
 ];
 let careerSlideIndex=0;
 function splitSlideLines(slide,count){
  if(count===slide.lines.length)return slide.lines;
  const per=Math.ceil(slide.quote.length/count);const out=[];
  for(let i=0;i<count;i++)out.push(slide.quote.slice(i*per,(i+1)*per));
  return out;
 }
 function renderCareerSlide(section,index){
  const slide=careerSlides[index];if(!slide||!section)return;
  const setImage=(selector,src,position)=>{const image=section.querySelector(selector+' img');if(!image)return;if(image.hasAttribute('srcset'))image.removeAttribute('srcset');if(image.hasAttribute('sizes'))image.removeAttribute('sizes');if(image.getAttribute('src')!==src)image.setAttribute('src',src);image.alt='李卓';if(position)image.style.objectPosition=position;};
  setImage('.framer-x2rok7',slide.src,'50% 50%');
  setImage('.framer-1met6yp',slide.src,'50% 16%');
  section.querySelectorAll('[data-code-component-plugin-id]').forEach(component=>{
   const hidden=component.querySelector('[aria-hidden="true"]');
   if(hidden&&hidden.textContent.trim()!==slide.quote)hidden.textContent=slide.quote;
   const wrap=component.children[1];if(!wrap)return;
   const lines=[...wrap.children].filter(el=>/SPAN|DIV/.test(el.tagName));if(!lines.length)return;
   const chunks=splitSlideLines(slide,lines.length);
   lines.forEach((el,lineIndex)=>{const inner=el.firstElementChild||el;if(inner.textContent!==chunks[lineIndex])inner.textContent=chunks[lineIndex];});
   wrap.style.transition='opacity .28s ease';wrap.style.opacity='1';
  });
 }
 function stepCareerSlide(target,delta){
  if(!target)return;
  const next=(careerSlideIndex+delta+careerSlides.length)%careerSlides.length;
  const wrap=target.querySelector('[data-code-component-plugin-id] > div:nth-child(2)');
  if(wrap)wrap.style.opacity='0';
  setTimeout(()=>{careerSlideIndex=next;renderCareerSlide(target,careerSlideIndex);},200);
 }
 function bindCareerSlides(){
  if(window.__careerSlidesBound)return;
  window.__careerSlidesBound=true;
  const intercept=event=>{
   const button=event.target&&event.target.closest?event.target.closest('section[data-framer-name="Testimonial"] [data-highlight]'):null;
   if(!button)return;
   event.preventDefault();event.stopImmediatePropagation();
   if(event.type!=='pointerdown')return;
   const owner=button.closest('section[data-framer-name="Testimonial"]');
   const arrows=owner?[...owner.querySelectorAll('[data-highlight]')]:[];
   stepCareerSlide(owner,arrows.indexOf(button)===0?-1:1);
  };
  ['pointerdown','mousedown','touchstart','click'].forEach(type=>document.addEventListener(type,intercept,{capture:true,passive:false}));
 }
 function personalizeCareerPage(){
  const section=document.querySelector('section[data-framer-name="Testimonial"]');if(!section)return;
  section.id='career-strengths';
  const setText=(selector,text)=>{const node=section.querySelector(selector);if(node&&node.textContent.trim()!==text)node.textContent=text;};
  section.querySelectorAll('.framer-19hrx6f p').forEach(p=>{if(p.textContent!=='(我的经历)')p.textContent='(我的经历)';});
  setText('.framer-1s250ls p','李卓');
  setText('.framer-1vaqlxu p','电商视觉设计 / AI 内容与流程优化');
  setText('.framer-gmz0g0 h6','60%');
  setText('.framer-tvzzfe h6','7');
  setText('.framer-1u71rer h6','95%+');
  setText('.framer-1kq567v h6','20+');
  setText('.framer-1c74eeq h6','47');
  setText('.framer-y7u0c2 h6','11');
  setText('.framer-wyoft9 p','效率提升');
  setText('.framer-ymndi7 p','流程优化后');
  setText('.framer-13zd27 p','交付成果');
  setText('.framer-1p0ebd5 p','真实项目');
  const logo=section.querySelector('.framer-6gvhj2');if(logo)logo.style.display='none';
  renderCareerSlide(section,careerSlideIndex);
  bindCareerSlides();
  section.querySelectorAll('[data-highlight]').forEach(button=>{button.style.cursor='pointer';});
 }
 const capabilityRows=[
  {no:'01',title:'3D 电商视觉',subtitle:'C4D / Redshift / OC',body:'从产品建模、材质灯光到场景渲染，输出白底图、细节特写与场景意境图；配合主图与详情页设计，统一视觉层级与色彩表达。',image:'/assets/capability-product-bottle.jpg'},
  {no:'02',title:'AI 视觉制作',subtitle:'ComfyUI / 批量生图 / 工作台',body:'梳理参考图、构图、角度与光线，建立批量生成、候选筛选、商品一致性检查与精修交付流程；流程优化后单张图片制作周期缩短约 60%，并参与 AI 生图工作台的页面与流程搭建。',image:'/assets/capability-product-studio.png'},
  {no:'03',title:'工具与自动化',subtitle:'Codex / 影刀 RPA / API / 九数云',body:'用 Codex 辅助页面开发与调试；从 0 搭建 7 个 1688 数据采集机器人，覆盖竞品、推广与销售，采集效率提升 95%+；把多平台数据整理成可视化看板，支持选品与运营决策。',image:'/assets/capability-rpa-delivery.jpg'},
 ];
 function setRowText(node,text){if(node&&node.textContent.trim()!==text)node.textContent=text;}
 const portfolioMetrics=[
  ['60%','单张图片制作周期缩短','流程优化后'],
  ['7','个 1688 数据采集机器人','从 0 搭建'],
  ['95%+','采集效率提升','影刀 RPA'],
  ['20+','份竞品与运营分析成果','九数云看板'],
 ];
 function personalizeResultsMetrics(){
  const section=document.querySelector('section[data-framer-name="Pricing"]');if(!section)return;
  if(!document.getElementById('portfolio-metrics-style')){
   const style=document.createElement('style');style.id='portfolio-metrics-style';
   style.textContent='.portfolio-metrics{width:min(1298px,calc(100% - 48px));margin:56px auto 0;padding:28px 0 0;border-top:1px solid rgba(0,0,0,.16);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px;font-family:Arial,"Microsoft YaHei",sans-serif;color:#171717;text-align:left}.portfolio-metric{display:grid;gap:7px}.portfolio-metric b{font-size:clamp(30px,3.2vw,46px);font-weight:700;letter-spacing:-.04em;line-height:1}.portfolio-metric span{font-size:13px;font-weight:600;line-height:1.4}.portfolio-metric em{font-size:12px;font-style:normal;color:#767676}@media(max-width:809px){.portfolio-metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;width:calc(100% - 40px);margin-top:32px}}';
   document.head.append(style);
  }
  if(section.querySelector('.portfolio-metrics'))return;
  const box=document.createElement('div');box.className='portfolio-metrics';
  box.innerHTML=portfolioMetrics.map(([number,label,note])=>'<div class="portfolio-metric"><b>'+number+'</b><span>'+label+'</span><em>'+note+'</em></div>').join('');
  section.append(box);
 }
 function mountCapabilityHeaderVideo(section,src){
  const box=section.querySelector('[data-framer-name="Video"]');if(!box)return;
  const image=box.querySelector('img');if(image)image.style.visibility='hidden';
  const video=box.querySelector('video');if(!video)return;
  if(video.getAttribute('src')!==src){video.removeAttribute('poster');video.src=src;video.load();}
  video.muted=true;video.loop=true;video.autoplay=true;video.playsInline=true;video.preload='auto';
  video.style.objectFit='cover';
  const started=video.play();if(started&&started.catch)started.catch(()=>{});
 }
 const capabilityHeadline=new Map([
  ['Design-driven studio delivering the','我是李卓，电商视觉设计师。'],
  ['structured visuals, refined digital system,','用 3D 与 AI 打通从建模、'],
  ['and high-impact brand experiences','批量生成到精修交付的流程，'],
  ['shaped by aesthetics & Fuel®.','把重复工作交给工具。'],
 ]);
 const capabilityHeadlineLines={
  4:['我是李卓，电商视觉设计师。','用 3D 与 AI 打通从建模、','批量生成到精修交付的流程，','把重复工作交给工具。'],
  7:['我是李卓，','电商视觉设计师。','用 3D 与 AI','打通从建模、','批量生成到精修','交付的流程，','把重复工作交给工具。'],
  8:['我是李卓，','电商视觉设计师。','用 3D 与 AI','打通从建模、','批量生成到','精修交付的流程，','把重复工作','交给工具。'],
 };
 function personalizeCapabilityHeadline(section){
  const walker=document.createTreeWalker(section,NodeFilter.SHOW_TEXT);let node;
  while(node=walker.nextNode()){
   const key=node.data.trim();const value=capabilityHeadline.get(key);
   if(value&&node.data!==value)node.data=value;
   else if(key==='Explore More'&&node.parentElement)node.data='查看作品集';
  }
  section.querySelectorAll('div').forEach(group=>{
   const kids=[...group.children];
   if(kids.length<2||!kids.every(child=>child.tagName==='SPAN'&&child.children.length===1&&child.firstElementChild.tagName==='SPAN'))return;
   const lines=capabilityHeadlineLines[kids.length];if(!lines)return;
   kids.forEach((child,index)=>{const inner=child.firstElementChild;if(inner&&inner.textContent.trim()!==lines[index])inner.textContent=lines[index];});
   const first=kids[0].firstElementChild;
   if(first&&!first.classList.contains('portfolio-capability-first'))first.classList.add('portfolio-capability-first');
  });
  section.querySelectorAll('a[data-framer-name="Light"]').forEach(link=>{const label=link.querySelector('p,span,div');if(label&&label.textContent.trim()==='查看作品集'&&link.getAttribute('href')!=='#portfolio')link.setAttribute('href','#portfolio');});
  section.querySelectorAll('span').forEach(span=>{
   const inner=span.children.length===1?span.firstElementChild:null;
   if(inner&&inner.tagName==='SPAN'&&/^我是李卓/.test(inner.textContent.trim())&&!inner.classList.contains('portfolio-capability-first'))inner.classList.add('portfolio-capability-first');
  });
  if(!document.getElementById('portfolio-capability-style')){
   const style=document.createElement('style');style.id='portfolio-capability-style';
   style.textContent='#services .portfolio-capability-first{margin-left:202px}#services [data-framer-name="Image"] video{object-fit:cover}@media(max-width:809px){#services .portfolio-capability-first{margin-left:118px}}';
   document.head.append(style);
  }
 }
 function personalizeServiceRows(){
  const section=document.querySelector('section[data-framer-name="Services"]');if(!section)return;
  section.id='services';
  personalizeCapabilityHeadline(section);
  mountCapabilityHeaderVideo(section,'/assets/li-zhuo-capabilities.mp4');
  section.querySelectorAll('[data-framer-name="Laptop"],[data-framer-name="Tab"]').forEach((row,index)=>{
   const item=capabilityRows[index];if(!item)return;
   setRowText(row.querySelector('[data-framer-name="Left"] h1,[data-framer-name="Left"] h2,[data-framer-name="Left"] p'),item.no);
   setRowText(row.querySelector('[data-framer-name="Title"] h4,[data-framer-name="Title"] h3,[data-framer-name="Title"] h2,[data-framer-name="Title"] p'),item.title);
   setRowText(row.querySelector('[data-framer-name="Heading"] p'),item.subtitle);
   setRowText(row.querySelector('[data-framer-name="Description"] [data-framer-name="Text"] p'),item.body);
   const box=row.querySelector('[data-framer-name="Image"]');if(!box)return;
   box.style.position='relative';
   if(item.video){
    const image=box.querySelector('img');if(image)image.style.visibility='hidden';
    let video=box.querySelector('video[data-capability-video]');
    if(!video){
     video=document.createElement('video');
     video.dataset.capabilityVideo='true';video.muted=true;video.loop=true;video.autoplay=true;video.playsInline=true;video.preload='auto';
     video.setAttribute('aria-label','李卓的 AI 视频与自动化作品');
     video.style.cssText='position:absolute;inset:0;z-index:2;display:block;width:100%;height:100%;object-fit:cover;border-radius:6px;background:#0b0b0b;';
     box.append(video);
    }
    if(video.getAttribute('src')!==item.video)video.src=item.video;
    video.play().catch(()=>{});
   }else if(item.image){
    const video=box.querySelector('video[data-capability-video]');if(video)video.remove();
    box.querySelectorAll('img').forEach(image=>{
     if(image.getAttribute('src')!==item.image){image.removeAttribute('srcset');image.setAttribute('src',item.image);}
     image.style.visibility='';
    });
   }
  });
 }
 const archiveViewer=document.createElement('dialog');
 archiveViewer.className='archive-viewer';
 archiveViewer.innerHTML='<button type="button" class="archive-close" aria-label="关闭大图">×</button><button type="button" class="archive-prev" aria-label="上一张">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="archive-next" aria-label="下一张">›</button>';
 document.body.append(archiveViewer);
 const archiveViewerStyle=document.createElement('style');archiveViewerStyle.textContent='.archive-viewer{position:fixed;inset:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:56px 72px 48px;border:0;background:rgba(7,9,12,.96);color:#fff;overflow:hidden}.archive-viewer::backdrop{background:rgba(0,0,0,.82);backdrop-filter:blur(5px)}.archive-viewer figure{display:grid;width:100%;height:100%;margin:0;place-items:center;align-content:center;gap:12px}.archive-viewer figure img{display:block;max-width:min(88vw,1400px);max-height:calc(100dvh - 130px);width:auto;height:auto;object-fit:contain}.archive-viewer figcaption{font:12px Arial,sans-serif;color:#eee}.archive-viewer button{position:absolute;z-index:2;display:grid;width:48px;height:48px;place-items:center;border:1px solid #ffffff55;border-radius:50%;background:#171a20;color:#fff;font-size:30px;cursor:pointer}.archive-viewer .archive-close{top:18px;right:20px}.archive-viewer .archive-prev{top:50%;left:16px;transform:translateY(-50%)}.archive-viewer .archive-next{top:50%;right:16px;transform:translateY(-50%)}@media(max-width:640px){.archive-viewer{padding:64px 50px 48px}.archive-viewer figure img{max-width:94vw;max-height:calc(100dvh - 130px)}.archive-viewer .archive-prev{left:4px}.archive-viewer .archive-next{right:4px}}';document.head.append(archiveViewerStyle);
 let archiveImages=[],archiveIndex=0;
 function showArchiveImage(){const image=archiveViewer.querySelector('img');image.src=archiveImages[archiveIndex];image.alt=(archiveViewer.dataset.projectTitle||'精选作品')+' '+(archiveIndex+1);archiveViewer.querySelector('figcaption').textContent=(archiveViewer.dataset.projectTitle?archiveViewer.dataset.projectTitle+' · ':'')+(archiveIndex+1)+' / '+archiveImages.length;}
 function openArchiveViewer(title,images,clickedPath){archiveImages=(images||[]).filter(Boolean);if(!archiveImages.length)return;archiveViewer.dataset.projectTitle=title||'精选作品';archiveIndex=Math.max(0,archiveImages.indexOf(clickedPath||''));showArchiveImage();archiveViewer.showModal();document.body.style.overflow='hidden';}
 function closeArchive(){archiveViewer.close();document.body.style.overflow='';}
 archiveViewer.querySelector('.archive-close').onclick=closeArchive;
 archiveViewer.querySelector('.archive-prev').onclick=()=>{const n=archiveImages.length||1;archiveIndex=(archiveIndex-1+n)%n;showArchiveImage();};
 archiveViewer.querySelector('.archive-next').onclick=()=>{const n=archiveImages.length||1;archiveIndex=(archiveIndex+1)%n;showArchiveImage();};
 archiveViewer.addEventListener('click',e=>{if(e.target===archiveViewer)closeArchive();});
 archiveViewer.addEventListener('close',()=>{document.body.style.overflow='';});
 archiveViewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();archiveViewer.querySelector('.archive-next').click();}if(e.key==='ArrowLeft'){e.preventDefault();archiveViewer.querySelector('.archive-prev').click();}});
 window.addEventListener('click',event=>{const image=event.target.closest('img');if(!image)return;const archive= image.closest('section[data-framer-name="Archive"]');if(!archive)return;const row=image.closest('[data-selected-project]')||image.closest('.framer-1gjgywn-container,.framer-1c7xt9w-container,.framer-6om6j8-container,.framer-ycquz-container');if(!row)return;const rows=['.framer-1gjgywn-container','.framer-1c7xt9w-container','.framer-6om6j8-container','.framer-ycquz-container'];const index=rows.findIndex(selector=>row.matches(selector));if(index<0)return;if(!row.dataset.selectedProject)row.dataset.selectedProject=String(index+1);event.preventDefault();event.stopImmediatePropagation();const imgs=Array.from(row.querySelectorAll('img')).slice(0,3).map(img=>new URL(img.currentSrc||img.src,location.origin).pathname);openArchiveViewer(row.dataset.selectedProject==='2'?'瑜伽服':row.dataset.selectedProject==='3'?'高跟鞋':'精选作品',imgs,image?new URL(image.currentSrc||image.src,location.origin).pathname:'');},true);
 const archiveVideoViewer=document.createElement('dialog');
 archiveVideoViewer.className='archive-viewer archive-video-viewer';
 archiveVideoViewer.innerHTML='<button type="button" class="archive-close" aria-label="关闭视频">×</button><button type="button" class="archive-prev" aria-label="上一个视频">‹</button><figure><video controls playsinline preload="metadata"></video><figcaption></figcaption></figure><button type="button" class="archive-next" aria-label="下一个视频">›</button>';
 document.body.append(archiveVideoViewer);
 const archiveVideoStyle=document.createElement('style');archiveVideoStyle.textContent='.archive-viewer figure video{display:block;max-width:min(88vw,1400px);max-height:calc(100dvh - 130px);width:auto;height:auto;border-radius:8px;background:#000}';
 document.head.append(archiveVideoStyle);
 let archiveVideos=[],archiveVideoIndex=0;
 function showArchiveVideo(){const item=archiveVideos[archiveVideoIndex];if(!item)return;const video=archiveVideoViewer.querySelector('video');video.src=item.src;video.load();const playing=video.play();if(playing&&playing.catch)playing.catch(()=>{});archiveVideoViewer.querySelector('figcaption').textContent=item.name+' · '+(archiveVideoIndex+1)+' / '+archiveVideos.length;}
 function openArchiveVideo(list,index){archiveVideos=list.slice();archiveVideoIndex=Math.max(0,index||0);showArchiveVideo();archiveVideoViewer.showModal();document.body.style.overflow='hidden';}
 function closeArchiveVideo(){const video=archiveVideoViewer.querySelector('video');video.pause();video.removeAttribute('src');video.load();archiveVideoViewer.close();document.body.style.overflow='';}
 archiveVideoViewer.querySelector('.archive-close').onclick=closeArchiveVideo;
 archiveVideoViewer.querySelector('.archive-prev').onclick=()=>{const n=archiveVideos.length||1;archiveVideoIndex=(archiveVideoIndex-1+n)%n;showArchiveVideo();};
 archiveVideoViewer.querySelector('.archive-next').onclick=()=>{const n=archiveVideos.length||1;archiveVideoIndex=(archiveVideoIndex+1)%n;showArchiveVideo();};
 archiveVideoViewer.addEventListener('click',e=>{if(e.target===archiveVideoViewer)closeArchiveVideo();});
 archiveVideoViewer.addEventListener('close',()=>{archiveVideoViewer.querySelector('video').pause();document.body.style.overflow='';});
 archiveVideoViewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();archiveVideoViewer.querySelector('.archive-next').click();}if(e.key==='ArrowLeft'){e.preventDefault();archiveVideoViewer.querySelector('.archive-prev').click();}});
 function ensureAiStyle(){
  if(document.getElementById('portfolio-ai-style'))return;
  const style=document.createElement('style');style.id='portfolio-ai-style';
  style.textContent=[
   '.ai-cap-lead{margin:0 0 26px;color:#131313;max-width:none;font:400 clamp(14px,1.25vw,17px)/1.55 Arial,"Microsoft YaHei",sans-serif;letter-spacing:-.01em;opacity:.68}',
   '.ai-cap-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:rgba(0,0,0,.16);width:100%}',
   '.ai-cap-card{position:relative;display:flex;flex-direction:column;gap:14px;min-height:236px;padding:34px 36px 32px;background:#fbfbf9;color:#131313;overflow:hidden;opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1),background .5s ease,color .5s ease,box-shadow .5s ease;transform-style:preserve-3d;will-change:transform}',
   '.ai-cap-card.is-in{opacity:1;transform:none}',
   '.ai-cap-card::before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,0%),rgba(215,255,63,.5),transparent 62%);opacity:0;transition:opacity .45s ease;pointer-events:none}',
   '.ai-cap-card::after{content:"";position:absolute;left:0;top:0;width:100%;height:2px;background:#131313;transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(.2,.7,.2,1)}',
   '.ai-cap-card:hover,.ai-cap-card:focus-visible{background:#0c0d0b;color:#f4f4f0;box-shadow:0 24px 60px rgba(0,0,0,.28);outline:none}',
   '.ai-cap-card:hover::before{opacity:.16}',
   '.ai-cap-card:hover::after{transform:scaleX(1);background:#d7ff3f}',
   '.ai-cap-top{display:flex;align-items:center;justify-content:space-between;font:500 12px/1 Arial,"Microsoft YaHei",sans-serif;letter-spacing:.16em;opacity:.55}',
   '.ai-cap-card:hover .ai-cap-top{opacity:.85}',
   '.ai-cap-mark{display:block;width:10px;height:10px;border-top:1px solid currentColor;border-right:1px solid currentColor;transition:transform .5s cubic-bezier(.2,.7,.2,1)}',
   '.ai-cap-card:hover .ai-cap-mark{transform:translate(3px,-3px)}',
   '.ai-cap-card h3{margin:0;font:400 clamp(30px,3.4vw,52px)/1.02 Arial,"Helvetica Neue",sans-serif;letter-spacing:-.035em;transition:transform .5s cubic-bezier(.2,.7,.2,1)}',
   '.ai-cap-card:hover h3{transform:translateY(-4px)}',
   '.ai-cap-zh{margin:0;font:600 15px/1.4 Arial,"Microsoft YaHei",sans-serif;letter-spacing:.01em}',
   '.ai-cap-body{margin:0;max-width:34ch;font:400 13.5px/1.75 Arial,"Microsoft YaHei",sans-serif;opacity:.62;transition:opacity .4s ease}',
   '.ai-cap-card:hover .ai-cap-body{opacity:.82}',
   '@media(max-width:809px){.ai-cap-grid{grid-template-columns:minmax(0,1fr)}.ai-cap-card{min-height:0;padding:26px 22px}}',
   '.ai-reel-wrap{width:100%;font-family:Arial,"Microsoft YaHei",sans-serif;color:#131313}',
   '.ai-reel-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:0 0 18px;border-bottom:1px solid rgba(0,0,0,.16);margin-bottom:22px}',
   '.ai-reel-head p{margin:0;font:400 clamp(15px,1.5vw,20px)/1.35 Arial,"Microsoft YaHei",sans-serif;letter-spacing:-.01em;opacity:.75}',
   '.ai-reel-nav{display:flex;gap:8px}',
   '.ai-reel-nav button{display:grid;width:40px;height:40px;place-items:center;border:1px solid rgba(0,0,0,.2);border-radius:50%;background:transparent;color:#131313;font-size:20px;line-height:1;cursor:pointer;transition:background .3s ease,color .3s ease,transform .3s ease}',
   '.ai-reel-nav button:hover{background:#131313;color:#f4f4f0;transform:translateY(-2px)}',
   '.ai-reel{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding-bottom:8px;cursor:grab;scrollbar-width:none}',
   '.ai-reel::-webkit-scrollbar{display:none}',
   '.ai-reel.is-dragging{cursor:grabbing;scroll-behavior:auto;scroll-snap-type:none}',
   '.ai-reel-card{position:relative;flex:0 0 clamp(240px,30vw,392px);display:flex;flex-direction:column;gap:14px;padding:0;border:0;background:none;text-align:left;color:inherit;scroll-snap-align:start;cursor:pointer;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .5s cubic-bezier(.2,.7,.2,1)}',
   '.ai-reel-img{position:relative;display:block;overflow:hidden;border-radius:6px;background:#e9e9e4;aspect-ratio:4/5}',
   '.ai-reel-img img{display:block;width:100%;height:100%;object-fit:cover;transform:scale(1.02);transition:transform 1.1s cubic-bezier(.2,.7,.2,1),filter .6s ease}',
   '.ai-reel-card:hover .ai-reel-img img{transform:scale(1.07);filter:brightness(1.04)}',
   '.ai-reel-img::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(0,0,0,.38));opacity:0;transition:opacity .5s ease}',
   '.ai-reel-card:hover .ai-reel-img::after{opacity:1}',
   '.ai-reel-meta{display:grid;grid-template-columns:auto 1fr;gap:2px 12px;align-items:baseline}',
   '.ai-reel-meta b{grid-row:span 2;font:500 12px/1 Arial,sans-serif;letter-spacing:.12em;opacity:.5}',
   '.ai-reel-meta{font:600 15px/1.3 Arial,"Microsoft YaHei",sans-serif}',
   '.ai-reel-meta em{font:400 11px/1.3 Arial,sans-serif;font-style:normal;letter-spacing:.14em;opacity:.45;text-transform:uppercase}',
   '@media(max-width:809px){.ai-reel-card{flex:0 0 78vw}.ai-reel-head{flex-direction:column;align-items:flex-start;gap:14px}}'
  ].join('');
  document.head.append(style);
 }
 const aiCapabilities=[
  {no:'01',title:'AI Native',zh:'AI 融入日常创作',body:'将 AI 融入需求研究、创意策划与视觉制作，根据任务选择工具，把想法转化为可交付作品。'},
  {no:'02',title:'Agent Systems',zh:'智能体搭建与工具接入',body:'围绕具体任务配置角色、指令与工具，接入 API，让智能体协助拆解需求、整理信息与执行流程。'},
  {no:'03',title:'Reusable Skills',zh:'Skill 编写与技能封装',body:'将成熟的方法、提示词与操作步骤封装为可复用 Skill，让创作经验成为可以持续调用的能力。'},
  {no:'04',title:'Creative Pipeline',zh:'AI 创作全流程编排',body:'串联策划、生图、筛选、精修与交付，结合自动化和 AI 辅助开发，搭建从需求到结果的创作流程。'},
 ];
 const aiReelItems=[
  {src:'/assets/archive-selected/1-2.jpg',no:'01',zh:'系列海报',en:'Poster series'},
  {src:'/assets/archive-selected/4-1.png',no:'02',zh:'瑜伽服主图',en:'Yoga apparel'},
  {src:'/assets/archive-selected/5-1.png',no:'03',zh:'高跟鞋视觉',en:'Heels visual'},
  {src:'/assets/ai-video-collection/zhiyin.jpg',no:'04',zh:'AI 人物视频',en:'AI character'},
  {src:'/assets/workbench-case/ui-01.png',no:'05',zh:'生图工作台',en:'Image workbench'},
  {src:'/assets/portfolio/rpa-case/05-process-map.jpg',no:'06',zh:'数据自动化',en:'Data automation'},
 ];
 function bindPointerTilt(nodes){
  if(!window.matchMedia||!window.matchMedia('(hover:hover)').matches)return;
  nodes.forEach(card=>{
   if(card.dataset.tiltBound==='1')return;card.dataset.tiltBound='1';
   card.addEventListener('pointermove',event=>{
    const rect=card.getBoundingClientRect();
    const px=(event.clientX-rect.left)/Math.max(1,rect.width);
    const py=(event.clientY-rect.top)/Math.max(1,rect.height);
    card.style.setProperty('--rx',((0.5-py)*7).toFixed(2)+'deg');
    card.style.setProperty('--ry',((px-0.5)*9).toFixed(2)+'deg');
    card.style.setProperty('--mx',(px*100).toFixed(1)+'%');
    card.style.setProperty('--my',(py*100).toFixed(1)+'%');
   });
   card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');});
  });
 }
 function bindReveal(nodes){
  if(!nodes.length)return;
  if(!('IntersectionObserver' in window)){nodes.forEach(node=>node.classList.add('is-in'));return;}
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-in');observer.unobserve(entry.target);}});},{threshold:.16});
  nodes.forEach((node,index)=>{if(node.classList.contains('is-in'))return;node.style.transitionDelay=(index*70)+'ms';observer.observe(node);});
 }
 function relaxHeight(node,depth){
  let current=node;
  for(let i=0;i<depth&&current;i++){
   current.style.height='auto';current.style.minHeight='0';
   if(i>0&&current.style.maxHeight==='')current.style.maxHeight='none';
   current=current.parentElement;
  }
 }
 function personalizeAiCapabilities(){
  const section=document.querySelector('section[data-framer-name="Stats"]');if(!section)return;
  const host=section.querySelector('[data-framer-name="Cards"]');if(!host)return;
  ensureAiStyle();
  if(!host.querySelector('.ai-cap-grid')){
   host.innerHTML='';
   host.style.cssText='display:block!important;height:auto!important;min-height:0!important;width:100%!important;max-width:none!important';
   const lead=document.createElement('p');lead.className='ai-cap-lead';lead.textContent='四种把 AI 放进真实交付的方式';
   const grid=document.createElement('div');grid.className='ai-cap-grid';
   grid.innerHTML=aiCapabilities.map(item=>'<article class="ai-cap-card"><div class="ai-cap-top"><span>'+item.no+'</span><i class="ai-cap-mark"></i></div><h3>'+item.title+'</h3><p class="ai-cap-zh">'+item.zh+'</p><p class="ai-cap-body">'+item.body+'</p></article>').join('');
   host.append(lead,grid);
   relaxHeight(host,3);
  }
  const cards=[...host.querySelectorAll('.ai-cap-card')];
  bindPointerTilt(cards);
  bindReveal(cards);
 }
 function personalizeWorkflow(){
  const section=document.querySelector('section[data-framer-name="Article"]');if(!section)return;
  const host=section.querySelector('[data-framer-name="Container"]');if(!host)return;
  const flows=[
   {name:'商品图批量生产',nodes:[
    {no:'01',name:'需求与素材',desc:'整理产品信息、卖点与参考图，明确这次要出的图用来做什么。',tools:['产品资料','参考图'],image:'/assets/workbench-case/ui-01.png'},
    {no:'02',name:'参考拆解',desc:'把参考拆成构图、场景、角度、光线四个可执行的要素。',tools:['构图','光线'],image:'/assets/workbench-case/comfy-fusion.png'},
    {no:'03',name:'ComfyUI 搭流',desc:'搭节点工作流，固定提示词结构与参数，让同一套流程可以反复跑。',tools:['ComfyUI','提示词'],image:'/assets/workbench-case/comfy-workflow.png'},
    {no:'04',name:'批量生成',desc:'一次提交多组商品与场景组合，把重复操作交给队列。',tools:['批量任务','参数复用'],image:'/assets/workbench-case/ui-03.png'},
    {no:'05',name:'候选筛选',desc:'对结构、材质、Logo 与细节做一致性检查，留下能交付的那几张。',tools:['一致性检查','筛选'],image:'/assets/workbench-case/candidates.jpg'},
    {no:'06',name:'精修交付',desc:'局部返修与统一色调，把成熟方案沉淀成模板下次直接调用。',tools:['Photoshop','模板'],image:'/assets/capability-product-bottle.jpg'}
   ]},
   {name:'AI 短视频生成',nodes:[
    {no:'01',name:'选题与检索',desc:'用 Codex 检索参考视频，先确定这条片子要表达什么。',tools:['Codex','参考检索'],image:'/assets/ai-video-collection/video-brief.jpg'},
    {no:'02',name:'参考拆解',desc:'拆镜头、节奏与产品出现方式，整理成可以照着生成的结构。',tools:['分镜','节奏'],image:'/assets/ai-video-collection/video-storyboard.jpg'},
    {no:'03',name:'生成任务',desc:'调用 Skill 与 ClipCat 把拆解结果交给视频工具执行。',tools:['Skill','ClipCat'],image:'/assets/ai-video-collection/video-prompt.jpg'},
    {no:'04',name:'候选比较',desc:'同一主题生成多个版本，对比主体、动作与画面稳定性。',tools:['多版本','对比'],image:'/assets/ai-video-collection/video-result.jpg'},
    {no:'05',name:'质检与成片',desc:'检查画面、节奏与时长，确认这条片子可以直接发布。',tools:['成片确认','节奏'],image:'/assets/ai-video-collection/video-final.jpg'},
    {no:'06',name:'规范与复用',desc:'把这次的做法写成文档规范：选题、参数、镜头结构，下一次直接照着跑。',tools:['文档规范','模板'],image:'/assets/ai-video-collection/video-template.jpg'}
   ]}
  ];
  if(!document.getElementById('portfolio-wf-style')){
   const style=document.createElement('style');style.id='portfolio-wf-style';
   style.textContent=[
    '.wf-wrap{width:100%;font-family:Arial,"Microsoft YaHei",sans-serif;color:#131313}',
    '.wf-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:0 0 18px;border-bottom:1px solid rgba(0,0,0,.16);margin-bottom:26px}',
    '.wf-lead{margin:0;font:400 clamp(14px,1.25vw,17px)/1.55 Arial,"Microsoft YaHei",sans-serif;letter-spacing:-.01em;opacity:.68}',
    '.wf-tabs{display:flex;gap:8px;flex-wrap:wrap}',
    '.wf-tab{padding:8px 16px;border:1px solid rgba(0,0,0,.18);border-radius:999px;background:transparent;color:inherit;font:500 12.5px/1 Arial,"Microsoft YaHei",sans-serif;cursor:pointer;transition:background .3s ease,color .3s ease,border-color .3s ease}',
    '.wf-tab:hover{border-color:#131313}',
    '.wf-tab.is-on{background:#0c0d0b;border-color:#0c0d0b;color:#f4f4f0}',
    '.wf-rail{position:relative;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0;padding-top:30px}',
    '.wf-line{position:absolute;left:0;right:0;top:36px;height:1px;background:rgba(0,0,0,.14);overflow:hidden}',
    '.wf-line::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,#c8e63a,transparent);background-size:36% 100%;background-repeat:no-repeat;animation:wf-sweep 5.2s linear infinite}',
    '@keyframes wf-sweep{0%{background-position:-45% 0}100%{background-position:145% 0}}',
    '.wf-node{position:relative;display:grid;gap:8px;padding:26px 18px 6px 0;border:0;background:none;text-align:left;color:inherit;cursor:pointer;opacity:.5;transition:opacity .35s ease}',
    '.wf-node:hover,.wf-node.is-on{opacity:1}',
    '.wf-dot{position:absolute;top:0;left:0;width:13px;height:13px;border-radius:50%;background:#fff;border:1px solid #131313;transition:background .3s ease,transform .3s ease,border-color .3s ease}',
    '.wf-node.is-on .wf-dot{background:#c8e63a;border-color:#c8e63a;transform:scale(1.15)}',
    '.wf-node b{font:500 11px/1 Arial,sans-serif;letter-spacing:.12em;opacity:.6}',
    '.wf-name{font:600 15px/1.35 Arial,"Microsoft YaHei",sans-serif;letter-spacing:-.01em}',
    '.wf-node.is-on .wf-name{color:#0c0d0b}',
    '.wf-detail{display:grid;grid-template-columns:minmax(0,190px) minmax(0,1fr);gap:26px;align-items:start;margin-top:30px;padding-top:22px;border-top:1px solid rgba(0,0,0,.12);min-height:98px}',
    '.wf-detail h4{margin:0;font:600 clamp(17px,1.7vw,22px)/1.25 Arial,"Microsoft YaHei",sans-serif;letter-spacing:-.02em}',
    '.wf-detail p{margin:4px 0 0;font:400 13.5px/1.75 Arial,"Microsoft YaHei",sans-serif;opacity:.66;max-width:52ch}',
    '.wf-tools{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}',
    '.wf-tools i{font:400 11px/1 Arial,"Microsoft YaHei",sans-serif;font-style:normal;letter-spacing:.04em;padding:5px 9px;border:1px solid rgba(0,0,0,.16);border-radius:999px;opacity:.7}',
    '.wf-detail-inner{transition:opacity .3s ease,transform .3s ease}',
    '.wf-main{min-width:0}',
    '.wf-shot{margin:16px 0 0;display:block;width:fit-content;max-width:100%;cursor:zoom-in}',
    '.wf-shot img{display:block;width:auto;max-height:326px;max-width:100%;object-fit:contain;object-position:center;border-radius:8px;background:#111;box-shadow:0 16px 40px rgba(0,0,0,.24);transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s ease}',
    '.wf-shot:hover img{transform:translateY(-3px);box-shadow:0 24px 54px rgba(0,0,0,.3)}',
    '.wf-shot figcaption{margin-top:8px;font:400 11px/1.2 Arial,"Microsoft YaHei",sans-serif;letter-spacing:.06em;opacity:.5}',
    '.wf-detail-inner.is-fade{opacity:0;transform:translateY(6px)}',
    '@media(max-width:809px){.wf-shot{width:100%}.wf-shot img{width:100%;height:auto}.wf-rail{grid-template-columns:minmax(0,1fr);padding-top:0;gap:0}.wf-line{top:6px;bottom:6px;left:6px;right:auto;width:1px;height:auto;background:rgba(0,0,0,.14)}.wf-line::after{background:linear-gradient(180deg,transparent,#c8e63a,transparent);background-size:100% 36%;animation:wf-sweep-y 5.2s linear infinite}@keyframes wf-sweep-y{0%{background-position:0 -45%}100%{background-position:0 145%}}.wf-node{padding:10px 0 16px 26px}.wf-dot{top:12px;left:0}.wf-head{flex-direction:column;align-items:flex-start;gap:14px}.wf-detail{grid-template-columns:minmax(0,1fr);gap:6px}}',
    '@media(prefers-reduced-motion:reduce){.wf-line::after{animation:none;opacity:0}}'
   ].join('');
   document.head.append(style);
  }
  if(!host.querySelector('.wf-wrap')){
   host.innerHTML='';
   host.style.cssText='display:block!important;height:auto!important;min-height:0!important;width:100%!important;max-width:none!important';
   const wrap=document.createElement('div');wrap.className='wf-wrap';
   wrap.innerHTML='<div class="wf-head"><p class="wf-lead">把一次性的尝试，变成可以重复跑的工作流</p><div class="wf-tabs">'+flows.map((flow,index)=>'<button type="button" class="wf-tab'+(index===0?' is-on':'')+'" data-flow="'+index+'">'+flow.name+'</button>').join('')+'</div></div>'
    +'<div class="wf-rail"><span class="wf-line"></span></div>'
    +'<div class="wf-detail"><div class="wf-detail-inner"><h4></h4><div class="wf-tools"></div></div><div class="wf-main"><p></p><figure class="wf-shot" hidden><img alt="ComfyUI 节点工作流"><figcaption>点击查看大图</figcaption></figure></div></div>';
   host.append(wrap);
   relaxHeight(host,3);
  }
  const rail=host.querySelector('.wf-rail');
  const detail=host.querySelector('.wf-detail');
  const detailInner=detail.querySelector('.wf-detail-inner');
  const title=detail.querySelector('h4');
  const text=detail.querySelector('p');
  const tools=detail.querySelector('.wf-tools');
  const shot=detail.querySelector('.wf-shot');
  const shotImage=detail.querySelector('.wf-shot img');
  const tabs=[...host.querySelectorAll('.wf-tab')];
  let flowIndex=0,nodeIndex=0;
  const renderDetail=(flow,index)=>{
   const node=flow.nodes[index];if(!node)return;
   title.textContent=node.no+'  '+node.name;
   text.textContent=node.desc;
   tools.innerHTML=node.tools.map(tool=>'<i>'+tool+'</i>').join('');
   if(shot&&shotImage){if(node.image){shotImage.src=node.image;shot.hidden=false;shot.dataset.src=node.image;shot.dataset.title='工作流 · '+node.name;}else{shot.hidden=true;shot.dataset.src='';}}
   [...rail.querySelectorAll('.wf-node')].forEach((el,position)=>el.classList.toggle('is-on',position===index));
  };
  const paintFlow=index=>{
   flowIndex=index;nodeIndex=0;
   const flow=flows[flowIndex];
   tabs.forEach((tab,position)=>tab.classList.toggle('is-on',position===flowIndex));
   rail.querySelectorAll('.wf-node').forEach(node=>node.remove());
   const nodes=flow.nodes.map((node,position)=>{
    const button=document.createElement('button');
    button.type='button';button.className='wf-node'+(position===0?' is-on':'');
    button.innerHTML='<span class="wf-dot"></span><b>'+node.no+'</b><span class="wf-name">'+node.name+'</span>';
    button.addEventListener('mouseenter',()=>{nodeIndex=position;renderDetail(flow,position);});
    button.addEventListener('focus',()=>{nodeIndex=position;renderDetail(flow,position);});
    button.addEventListener('click',()=>{nodeIndex=position;renderDetail(flow,position);});
    return button;
   });
   nodes.forEach(node=>rail.append(node));
   detailInner.classList.add('is-fade');
   setTimeout(()=>{renderDetail(flow,0);detailInner.classList.remove('is-fade');},150);
  };
  if(shot&&shot.dataset.bound!=='1'){shot.dataset.bound='1';shot.addEventListener('click',()=>{const src=shot.dataset.src;if(src)openArchiveViewer(shot.dataset.title||'工作流',[src],src);});}
  tabs.forEach((tab,index)=>{
   if(tab.dataset.bound==='1')return;tab.dataset.bound='1';
   tab.addEventListener('click',()=>{if(index===flowIndex)return;paintFlow(index);});
  });
  if(!rail.dataset.wfInit){rail.dataset.wfInit='1';paintFlow(0);}
 }
 function apply(){pending=false;const root=document.getElementById('main');if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){return /SCRIPT|STYLE/.test(n.parentElement?.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let node;while(node=walker.nextNode()){if(node.parentElement?.closest('section[data-framer-name="Testimonial"]')&&node.data.trim()==='© 2026'){node.data='2023–2026';continue;}if(node.parentElement?.closest('section[data-framer-name="Testimonial"]')&&/20\d{2}(?:\.\d{2})?[—–-]20\d{2}/.test(node.data))continue;const next=node.data.replace(/sayhi@fuelstudio\.com/g,'3453026257@qq.com');if(next!==node.data)node.data=next;}
 for(const a of document.querySelectorAll('a[href]')){const raw=a.getAttribute('href');if(!raw)continue;if(raw.startsWith('mailto:')){a.setAttribute('href','mailto:3453026257@qq.com');continue;}if(raw.startsWith('tel:'))continue;let url;try{url=new URL(raw,location.origin+'/')}catch{continue;}if(url.origin!==location.origin){a.setAttribute('href','/#top');a.removeAttribute('target');}else if(a.target==='_blank'){a.removeAttribute('target');}}
 const phoneLink=document.querySelector('section[data-framer-name="About"] a');if(phoneLink&&phoneLink.textContent.includes('13555558884')){phoneLink.removeAttribute('href');phoneLink.removeAttribute('target');phoneLink.style.cursor='text';}
 const archive=document.querySelector('section[data-framer-name="Archive"]');
 if(archive){archive.id='more-work';['.framer-1gjgywn-container','.framer-1c7xt9w-container','.framer-6om6j8-container','.framer-ycquz-container'].forEach((selector,i)=>{const row=archive.querySelector(selector);if(!row)return;row.dataset.selectedProject=String(i+1);row.setAttribute('role','link');row.tabIndex=0;row.style.cursor='pointer';const content=row.textContent||'';let title='',assetRow='';if(content.includes('雪憨憨 IP')||content.includes('Snowman IP')){title='瑜伽服';assetRow='4';}else if(content.includes('手串视觉探索')||content.includes('手串视觉')){title='高跟鞋';assetRow='5';}const walker=document.createTreeWalker(row,NodeFilter.SHOW_TEXT);let textNode;while(textNode=walker.nextNode()){const value=textNode.nodeValue.trim();if(/^(?:20\d{2}|2-\d{2})$/.test(value))textNode.nodeValue=textNode.nodeValue.replace(value,'2-26');else if(title&&(value==='雪憨憨 IP'||value==='Snowman IP'||value==='手串视觉探索'||value==='手串视觉'))textNode.nodeValue=textNode.nodeValue.replace(value,title);}if(title){row.querySelectorAll('img').forEach((img,n)=>{const imageIndex=n%3+1;img.removeAttribute('srcset');img.src='/assets/archive-selected/'+assetRow+'-'+imageIndex+'.png';img.alt=title+'作品 '+imageIndex;img.style.cursor='zoom-in';});}});archive.querySelectorAll('p,span').forEach(el=>{if(el.children.length===0&&/^(?:20\d{2}|2-\d{2})$/.test(el.textContent.trim()))el.textContent='2-26';});}
 for(const card of document.querySelectorAll('a[href*="noara-willis"]')){
  for(const image of card.querySelectorAll('img')){if(image.getAttribute('src')!=='/assets/detail-card-cover.jpg'){image.removeAttribute('srcset');image.setAttribute('src','/assets/detail-card-cover.jpg');image.alt='电商详情页设计';}}
  for(const text of card.querySelectorAll('p')){if(text.textContent==='Noara Willis')text.textContent='详情页';else if(text.textContent==='Strategy')text.textContent='电商视觉设计';}
 }
 personalizeResults();
 const footer=document.querySelector('footer');
 if(footer){const texts=document.createTreeWalker(footer,NodeFilter.SHOW_TEXT);let t;while(t=texts.nextNode()){if(t.data.includes('work together'))t.data='让创意成为作品';}const portfolio=document.querySelector('section[data-framer-name="Portfolio"]');if(portfolio)portfolio.id='portfolio';}
 if(footer){footer.id='contact-me';const labels={'Contact Now':'联系我','Home':'首页','Portfolio':'作品','About':'关于我','Contact':'联系我'};for(const el of footer.querySelectorAll('p,h1,h2,h3,span')){if(el.children.length)continue;const text=el.textContent.trim();const replacement=text.includes('work together')?'让创意成为作品':labels[text];if(replacement&&el.textContent!==replacement)el.textContent=replacement;}for(const link of footer.querySelectorAll('a')){const text=link.textContent;if(text.includes('首页'))link.setAttribute('href','/#top');else if(text.includes('作品')&&!text.includes('创意'))link.setAttribute('href','/#portfolio');else if(text.includes('关于我'))link.setAttribute('href','/#about');else if(text.includes('联系我')||text.includes('@qq.com'))link.setAttribute('href','mailto:3453026257@qq.com');}}
 personalizeAiPractice();
 personalizePortfolioCases();personalizeHomepage();personalizeStrengthsPage();personalizeCareerPage();personalizeServiceRows();personalizeResultsMetrics();personalizeArchive();personalizeAiCapabilities();personalizeWorkflow();
 if(footer){const phone=footer.querySelector('a[data-framer-name="Light"]');if(phone){const label=phone.querySelector('p');if(label&&label.textContent!=='13555558884')label.textContent='13555558884';phone.removeAttribute('href');phone.removeAttribute('target');phone.style.cursor='text';phone.style.userSelect='text';phone.setAttribute('aria-label','联系电话 13555558884');phone.querySelector('[data-framer-name="Icon"]')?.style.setProperty('display','none');}}
 if(footer){const targets=['top','about','portfolio','contact-me'],labels=['首页','关于我','作品','联系我'];footer.querySelectorAll('a:has([data-framer-name="Page Name"])').forEach((link,i)=>{if(!targets[i])return;link.dataset.footerScroll=targets[i];link.setAttribute('href','#'+targets[i]);const label=link.querySelector('[data-framer-name="Page Name"] p');if(label&&label.textContent!==labels[i])label.textContent=labels[i];});}
 const villa=document.querySelector('section[data-framer-name="L"] .framer-facib3');
 const coastalSection=document.querySelector('section[data-framer-name="L"]');
 if(coastalSection){for(const heading of coastalSection.querySelectorAll('h2')){if(heading.textContent!=='CREATIVE VISION, POWERED BY AI — ')heading.textContent='CREATIVE VISION, POWERED BY AI — ';}}

 const faq=document.querySelector('.framer-jdAJs');
 if(faq){
  faq.id='my-strengths';
  const set=(el,text)=>{if(el&&el.textContent!==text)el.textContent=text;};
  set(faq.querySelector('.framer-r7cp99 p'),'(09) 常见问题');
  const portrait=faq.querySelector('.framer-rq95u4-container img');
  if(portrait&&portrait.getAttribute('src')!=='/assets/strengths-profile.jpg'){portrait.removeAttribute('srcset');portrait.src='/assets/strengths-profile.jpg';portrait.alt='个人视觉作品';}
  const card=faq.querySelector('.framer-rq95u4-container a');
  if(card){card.setAttribute('href','/#about');for(const p of card.querySelectorAll('p')){if(p.textContent==='Play')set(p,'关于我');if(p.textContent==='Showreel')set(p,'视觉 × AI');}}
  const questions=[
   ['我的核心优势是什么？','我将电商视觉、3D 设计与 AI 工作流结合起来，从产品卖点出发，兼顾画面质感、信息表达与制作效率。'],
   ['我能为项目带来什么？','从产品建模、材质与灯光，到主图、详情页和品牌内容，我能把创意整理成统一的视觉方案，并推进到具体交付。'],
   ['我如何把 AI 用在工作里？','围绕真实制作需求拆解任务，组织提示词、Skill 与工具流程，让 AI 协助策划、生成、筛选和迭代，把方法沉淀为可复用的能力。'],
   ['我的工作方式有什么特点？','先理解目标与产品，再规划视觉方向和制作步骤。重视产品结构、材质与风格的一致性，根据反馈持续调整，并整理交付规范。'],
   ['我适合参与哪些项目？','电商主图与详情页、3D 产品视觉、AI 创意内容和制作流程优化。既关注最终画面，也愿意搭建帮助团队减少重复工作的工具与方法。']
  ];
  faq.querySelectorAll('.framer-RiA7P').forEach((row,i)=>{
   if(!questions[i])return;
   set(row.querySelector('[data-framer-name="Question"] p'),questions[i][0]);
   set(row.querySelector('[data-framer-name="Answer"] p'),questions[i][1]);
   const answer=row.querySelector('[data-framer-name="Answer"] p');if(answer)answer.style.lineHeight='1.8';
  });
 }

 if(coastalSection){const portrait=coastalSection.querySelector('.framer-k573g7 img');if(portrait&&portrait.getAttribute('src')!=='/assets/coastal-profile.jpg'){portrait.removeAttribute('srcset');portrait.src='/assets/coastal-profile.jpg';portrait.alt='关于我';}const portraitSlot=coastalSection.querySelector('.framer-k573g7');if(portraitSlot&&!portraitSlot.dataset.aboutLink){portraitSlot.dataset.aboutLink='true';portraitSlot.setAttribute('role','link');portraitSlot.setAttribute('aria-label','查看我的简介');portraitSlot.tabIndex=0;portraitSlot.style.cursor='pointer';const go=()=>{location.hash='about';document.getElementById('about')?.scrollIntoView({behavior:'smooth'});};portraitSlot.addEventListener('click',go);portraitSlot.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}});}const link=coastalSection.querySelector('a');if(link){link.setAttribute('href','/#about');const label=link.querySelector('p');if(label&&label.textContent!=='关于我')label.textContent='关于我';}}
 if(villa){villa.querySelector('.coastal-loop')?.remove();const image=villa.querySelector('img');if(image&&image.getAttribute('src')!=='/assets/coastal-villa-dusk.png'){image.removeAttribute('srcset');image.src='/assets/coastal-villa-dusk.png';image.alt='海边别墅夕阳';}}
 setupAiPracticeArchive();
 setupAIVideoViewer();
 document.title='李卓｜电商视觉设计师 · 3D / AI 视觉作品集';
 }
 function setupAIVideoViewer(){
  const servicesSection=document.querySelector('section[data-framer-name="Services"]');
  if(!servicesSection)return;
  let videoDialog=document.getElementById('ai-video-viewer-dialog');
  if(!videoDialog){
   videoDialog=document.createElement('dialog');
   videoDialog.id='ai-video-viewer-dialog';
   videoDialog.className='ai-video-viewer';
   videoDialog.innerHTML='<button type="button" class="video-close" aria-label="关闭视频">×</button><div class="video-wrapper"><video id="ai-demo-video" controls playsinline preload="metadata"></video><div class="video-caption"><h3 id="video-title"></h3><p id="video-description"></p></div></div>';
   document.body.append(videoDialog);
   if(!document.getElementById('ai-video-viewer-style')){
    const videoStyle=document.createElement('style');
    videoStyle.id='ai-video-viewer-style';
    videoStyle.textContent=`.ai-video-viewer{max-width:90vw;max-height:90vh;border:none;border-radius:12px;background:#000;padding:0;box-shadow:0 20px 60px rgba(0,0,0,.8)}.ai-video-viewer::backdrop{background:rgba(0,0,0,.85)}.ai-video-viewer .video-close{position:absolute;top:16px;right:16px;width:40px;height:40px;border:none;background:rgba(255,255,255,.1);color:#fff;font-size:28px;line-height:1;cursor:pointer;border-radius:50%;z-index:1;transition:background .2s}.ai-video-viewer .video-close:hover{background:rgba(255,255,255,.2)}.ai-video-viewer .video-wrapper{display:flex;flex-direction:column;gap:16px;padding:20px}.ai-video-viewer video{width:100%;max-width:1000px;border-radius:8px;background:#000}.ai-video-viewer .video-caption{color:#fff;max-width:1000px}.ai-video-viewer .video-caption h3{font-size:18px;margin:0 0 6px;font-weight:600}.ai-video-viewer .video-caption p{font-size:13px;line-height:1.6;opacity:.75;margin:0}.ai-video-viewer .video-list{display:flex;gap:8px;flex-wrap:wrap}.ai-video-viewer .video-item{padding:8px 16px;background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:999px;font-size:13px;cursor:pointer;transition:all .2s}.ai-video-viewer .video-item:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.25)}.ai-video-viewer .video-item.active{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.3)}.ai-demo-btn{margin:16px 0;padding:12px 24px;background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:8px;font-size:14px;cursor:pointer;transition:all .2s;display:block;width:100%;text-align:center;font-weight:500;box-sizing:border-box}.ai-demo-btn:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.3)}.ai-capability-text{margin:12px 0 0;padding:12px;background:rgba(255,255,255,.05);border-radius:6px;font-size:13px;line-height:1.6;opacity:.85;color:#fff;border-left:2px solid rgba(255,255,255,.2);box-sizing:border-box}@media(max-width:768px){.ai-video-viewer .video-wrapper{padding:12px}.ai-video-viewer .video-caption h3{font-size:16px}.ai-video-viewer .video-caption p{font-size:12px}.ai-demo-btn{padding:10px 16px}}`;
    document.head.append(videoStyle);
   }
   const video=videoDialog.querySelector('#ai-demo-video');
   const title=videoDialog.querySelector('#video-title');
   const desc=videoDialog.querySelector('#video-description');
   const videoItems=videoDialog.querySelectorAll('.video-item');
   function loadVideo(src,titleText,descText){
    video.innerHTML='<source src="'+src+'" type="video/mp4">您的浏览器不支持视频播放。';
    video.load();
    title.textContent=titleText;
    desc.textContent=descText;
    videoItems.forEach(item=>item.classList.remove('active'));
    videoItems.forEach(item=>{if(item.dataset.src===src)item.classList.add('active');});
   }
   videoItems.forEach(item=>{
    item.onclick=(e)=>{e.preventDefault();loadVideo(item.dataset.src,item.dataset.title,item.dataset.desc);};
   });
   videoDialog.querySelector('.video-close').onclick=(e)=>{e.preventDefault();video.pause();videoDialog.close();};
   videoDialog.addEventListener('click',e=>{if(e.target===videoDialog){video.pause();videoDialog.close();}});
   videoDialog.addEventListener('close',()=>{video.pause();document.body.style.overflow='';});
   document.addEventListener('keydown',e=>{if(e.key==='Escape'&&videoDialog.open){video.pause();videoDialog.close();}});
  }
  const playFeatureFilm=(event)=>{event.preventDefault();event.stopPropagation();const video=videoDialog.querySelector('#ai-demo-video');video.src='/assets/ai-film-beacons-to-answers.mp4';video.load();videoDialog.querySelector('#video-title').textContent='从烽火到回答';videoDialog.querySelector('#video-description').textContent='AI 影像创作展示 · 完整作品播放。';videoDialog.showModal();document.body.style.overflow='hidden';video.play().catch(()=>{});};
  document.querySelectorAll('section[data-framer-name="Portfolio"] a').forEach(link=>{
   if(!link.textContent.includes('Join Us Now')||link.dataset.aiFilmCta==='true')return;
   link.dataset.aiFilmCta='true';link.setAttribute('href','/assets/ai-film-beacons-to-answers.mp4');link.setAttribute('aria-label','播放 AI 影像作品《从烽火到回答》');
   const label=link.querySelector('p');if(label)label.textContent='▶ 播放《从烽火到回答》';
   link.addEventListener('click',playFeatureFilm);
  });
 }
 const ecommerceModalStyle=document.createElement('style');
 ecommerceModalStyle.textContent='.ecommerce-detail-modal{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:clamp(8px,2vw,24px);background:rgba(8,10,12,.82);backdrop-filter:blur(8px)}.ecommerce-detail-modal iframe{width:min(1280px,96vw);height:94dvh;border:0;border-radius:12px;background:#f2eee7;box-shadow:0 24px 90px #0008}.ecommerce-detail-close{position:fixed;top:calc((100dvh - min(94dvh,1100px))/2 - 18px);right:max(2vw,calc((100vw - 1280px)/2));z-index:1;display:grid;width:42px;height:42px;place-items:center;border:1px solid #fff7;border-radius:50%;background:#17191b;color:#fff;font-size:28px;cursor:pointer}@media(max-width:600px){.ecommerce-detail-modal{padding:0}.ecommerce-detail-modal iframe{width:100vw;height:100dvh;border-radius:0}.ecommerce-detail-close{top:10px;right:10px}}';
 document.head.append(ecommerceModalStyle);
 const observer=new MutationObserver(()=>{removeTemplatePortrait();if(!pending){pending=true;requestAnimationFrame(apply)}});observer.observe(document.body,{subtree:true,childList:true,characterData:true});removeTemplatePortrait();apply();
 personalizeServiceRows();
 document.addEventListener('click',event=>{const link=event.target.closest('a[href*="/work/portfolio/generation-workbench/"]');if(!link)return;event.preventDefault();event.stopImmediatePropagation();location.assign('/work/portfolio/generation-workbench/index.html');},true);
 document.addEventListener('click',event=>{const project=event.target.closest('[data-selected-project]');if(project){event.preventDefault();event.stopImmediatePropagation();const images=Array.from(project.querySelectorAll('img')).slice(0,3).map(img=>new URL(img.currentSrc||img.src,location.origin).pathname);openArchiveViewer(project.querySelector('h3')?.textContent||project.dataset.projectTitle||'精选作品',images,'');return;}const a=event.target.closest('a');if(!a)return;if(a.closest('section[data-framer-name="About"]')&&a.textContent.includes('13555558884')){event.preventDefault();event.stopImmediatePropagation();return;}const raw=a.getAttribute('href')||'';if(a.closest('section[data-framer-name="Pricing"]')&&a.getAttribute('aria-controls')){event.preventDefault();event.stopImmediatePropagation();const panel=document.getElementById(a.getAttribute('aria-controls'));if(panel){panel.hidden=!panel.hidden;a.setAttribute('aria-expanded',String(!panel.hidden));const text=a.querySelector('p');if(text)text.textContent=panel.hidden?'项目过程':'收起过程';}return;}if(raw.startsWith('mailto:'))return;const url=new URL(raw,location.origin+'/');if(url.origin!==location.origin){event.preventDefault();event.stopImmediatePropagation();location.assign('/#top');}},true);
 document.addEventListener('keydown',event=>{const project=event.target.closest('[data-selected-project]');if(project&&(event.key==='Enter'||event.key===' ')){event.preventDefault();project.click();return;}const link=event.target.closest('a[aria-controls][role="button"]');if(link&&event.key===' '){event.preventDefault();link.click();}});
})();



// Replace Noara Willis card 03 artwork with the supplied video.
(function(){
  function mountNoaraVideo(){
    const card=document.querySelector('#noara-willis-card-3');
    if(!card || card.dataset.videoMounted) return;
    const top=card.querySelector('[data-framer-name="Top"]');
    if(!top) return;
    card.dataset.videoMounted='1';
    const bg=top.querySelector('[data-framer-name="BG Image"]');
    if(bg) bg.remove();
    const content=top.querySelector('[data-framer-name="Content"]') || top;
    const old=content.querySelector('img');
    if(old) old.remove();
    const video=document.createElement('video');
    video.src='/assets/noara-willis-03.mp4';
    video.autoplay=true; video.muted=true; video.loop=true; video.playsInline=true;
    video.setAttribute('aria-label','Noara Willis 03 video');
    video.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:5px;display:block;';
    content.style.position='relative';
    content.prepend(video);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountNoaraVideo); else mountNoaraVideo();
  new MutationObserver(mountNoaraVideo).observe(document.documentElement,{childList:true,subtree:true});
})();

