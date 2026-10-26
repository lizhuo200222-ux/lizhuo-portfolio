(() => {
 const style=document.createElement('style');style.textContent=`/* Remove the reference template CEO contact card and its layout slot. */ .framer-J6Nvq,div:has(>a.framer-J6Nvq){display:none!important}#framer-badge-container,#__framer-badge-container,[data-framer-name="Logo"]>a>*,[data-framer-name="Place Your Logo Here"]>div:not(.xiaoli-wordmark){display:none!important}[data-framer-name="Logo"]{position:relative!important;min-height:24px}[data-framer-name="Logo"]:after{content:'XIAOLI®';position:absolute;left:0;top:50%;transform:translateY(-50%);font:800 20px Arial,sans-serif;color:#fff;pointer-events:none;letter-spacing:-1px}[data-framer-name="Place Your Logo Here"]:not(:has(.xiaoli-wordmark)):after{content:'XIAOLI ×';display:block;font:900 clamp(40px,16vw,240px)/.85 Arial,sans-serif;letter-spacing:-.07em}[class*="framer-9weVr"]{display:none!important}a[href*="framer.com"]{pointer-events:none}[data-framer-name="User"]{display:none!important}[data-framer-name="Details"]{display:none!important}.framer-39qqj8{display:none!important}.framer-13ii7z1{display:none!important}`;document.head.append(style);
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
 function removeTemplatePortrait(){
  document.querySelectorAll('.framer-16jnmr1:has(.framer-985gzq), .framer-985gzq').forEach(card=>card.remove());
 }
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
 function personalizePortfolioCases(){
  const section=document.querySelector('section[data-framer-name="Portfolio"]');if(!section)return;
  const cases=[
   {match:/vellfire-calibration/,title:'AI 甜芽 IP',category:'角色 / 品牌视觉',href:'/work/portfolio/vellfire-calibration/'},
   {match:/dunwill-lanson/,title:'电商图',category:'',href:'/work/portfolio/ecommerce-detail/',image:'/assets/ecommerce-model-cover.png'},
   {match:/noara-willis/,title:'生图工作台',category:'AI 生成 / 工作流界面',summary:'自由生图 / 商品处理 / 设计创作',href:'/work/portfolio/generation-workbench/index.html',image:'/assets/workbench-case/ui-01.png'},
   {match:/nike-studios/,title:'手串 AI 商品视觉',category:'主图 / 详情视觉',href:'/work/selected-3/'},
  ];
  section.querySelectorAll('a[href*="work/portfolio/"]').forEach(link=>{
   const item=cases.find(entry=>entry.match.test(link.getAttribute('href')||''));if(!item)return;
   link.setAttribute('href',item.href);
   const texts=[...link.querySelectorAll('[data-framer-name="Title"] p,[data-framer-name="Category"] p,[data-framer-name="Text"] p')];
   if(texts[0])texts[0].textContent=item.title;if(texts[1]){texts[1].textContent=item.category;texts[1].style.display=item.category?'':'none';}if(texts[2]&&item.summary)texts[2].textContent=item.summary;
   link.querySelectorAll('img').forEach(image=>{if(item.image){image.removeAttribute('srcset');image.src=item.image;}image.alt=item.title+(item.category?' / '+item.category:'');});
  });
  const close=[...section.querySelectorAll('h4,h5,p')].find(el=>el.textContent.trim()==="FX-25'");if(close)close.textContent='XIAOLI / 李卓';
  section.querySelectorAll('h1').forEach((heading,index)=>{heading.setAttribute('aria-hidden','true');heading.tabIndex=-1;});
 }
 function personalizeHomepage(){
  const hero=document.querySelector('section[data-framer-name="Hero"]');const intro=hero?.querySelector('.framer-ej9q0');
  if(intro){let h=intro.querySelector('.portfolio-role-h1');if(!h){h=document.createElement('h1');h.className='portfolio-role-h1';h.textContent='\u674e\u5353 / \u7535\u5546\u89c6\u89c9\u8bbe\u8ba1\u5e08';h.style.cssText='position:relative;z-index:2;margin:0 0 12px;color:#fff;font:600 clamp(16px,1.8vw,24px)/1.2 Arial,"Microsoft YaHei",sans-serif;letter-spacing:-.035em;text-shadow:0 2px 16px #0008';intro.insertBefore(h,intro.firstChild);}const lines=[...intro.querySelectorAll('[data-framer-name="Description"] p')];if(lines[0])lines[0].textContent='\u628a\u4ea7\u54c1\u89c6\u89c9\u505a\u5f97\u6e05\u6670\u3001\u6709\u8fa8\u8bc6\u5ea6\u3002';if(lines[1])lines[1].textContent='AI \u4e0e\u81ea\u52a8\u5316\uff0c\u8ba9\u5236\u4f5c\u6d41\u7a0b\u66f4\u9ad8\u6548\u3002';const cta=[...intro.querySelectorAll('a')].find(a=>a.textContent.includes('Explore Now'));if(cta){cta.href='/';const p=cta.querySelector('p');if(p)p.textContent='\u8fd4\u56de\u4e3b\u9875';}}
  document.querySelectorAll('section[data-framer-name="Portfolio"] h1').forEach(h=>{const x=document.createElement('h2');for(const a of h.attributes)x.setAttribute(a.name,a.value);x.innerHTML=h.innerHTML;h.replaceWith(x);});
  const about=document.querySelector('section[data-framer-name="About"]');if(about){const rows=[...about.querySelectorAll('.framer-105k73z [data-framer-name="1"],.framer-105k73z [data-framer-name="2"]')];const labels=['\u5355\u5f20\u7269\u6599\u5236\u4f5c\u5468\u671f\u7f29\u77ed(\u6d41\u7a0b\u7edf\u8ba1)','1688 \u6570\u636e\u91c7\u96c6\u673a\u5668\u4eba'],values=['\u7ea6 60%','7'];rows.forEach((r,i)=>{const ps=r.querySelectorAll('[data-framer-name="Text 1"] p,[data-framer-name="Text 2"] p');if(ps[0])ps[0].textContent=labels[i];if(ps[1])ps[1].textContent=values[i];});about.querySelectorAll('h1').forEach(h=>{const x=document.createElement('h2');for(const a of h.attributes)x.setAttribute(a.name,a.value);x.innerHTML=h.innerHTML;h.replaceWith(x);});}
  const services=document.querySelector('section[data-framer-name="Services"]');if(services){const ls=[...services.querySelectorAll('[data-framer-name="Text 1"] p,[data-framer-name="Text 2"] p,[data-framer-name="Text 3"] p')];if(ls[0])ls[0].textContent='01 / \u7535\u5546\u89c6\u89c9\u8bbe\u8ba1';if(ls[1])ls[1].textContent='02 / 3D \u5546\u54c1\u8868\u73b0';if(ls[2])ls[2].textContent='03 / AI \u4e0e\u81ea\u52a8\u5316';}
  const cards=document.querySelector('section[data-framer-name="Portfolio"]');if(cards){const close=[...cards.querySelectorAll('h4,h5,p')].find(x=>x.textContent.trim()==="FX-25'");if(close)close.textContent='XIAOLI / \u674e\u5353';for(const link of cards.querySelectorAll('a[href*="work/portfolio/"]')){const text=link.textContent;if(text.includes('Join Us Now')){link.href='/work/portfolio/amazon-a-plus/';link.setAttribute('aria-label','打开亚马逊主图与 A+ 商品视觉案例');const p=link.querySelector('p');if(p)p.textContent='\u4e9a\u9a6c\u900a\u4e3b\u56fe + A+ \u7cfb\u5217';const img=link.querySelector('img');if(img){img.removeAttribute('srcset');img.src='/assets/amazon-series-cover.jpg';img.alt='亚马逊主图与 A+ 商品视觉系列';}continue;}const items=[['vellfire-calibration','/work/portfolio/vellfire-calibration/','AI \u751c\u82bd IP','\u89d2\u8272 / \u54c1\u724c\u89c6\u89c9'],['dunwill-lanson','/portfolio-template/index.html','\u7535\u5546\u56fe','','/assets/ecommerce-model-cover.png'],['noara-willis','/work/portfolio/noara-willis/','\u7535\u5546\u8be6\u60c5\u9875','\u5546\u54c1\u89c6\u89c9 / \u8be6\u60c5\u8bbe\u8ba1'],['nike-studios','/work/selected-3/','\u624b\u4e32 AI \u5546\u54c1\u89c6\u89c9','\u4e3b\u56fe / \u8be6\u60c5\u89c6\u89c9']];const item=items.find(x=>(link.getAttribute('href')||'').includes(x[0]));if(item){link.href=item[1];const ps=link.querySelectorAll('[data-framer-name="Title"] p,[data-framer-name="Category"] p');if(ps[0])ps[0].textContent=item[2];if(ps[1]){ps[1].textContent=item[3];ps[1].style.display=item[3]?'':'none';}const img=link.querySelector('img');if(img){if(item[4]){img.removeAttribute('srcset');img.src=item[4];}img.alt=item[2]+(item[3]?' / '+item[3]:'');}}}
  document.querySelectorAll('section[data-framer-name="Stats"],section[data-framer-name="Article"]').forEach(x=>{x.style.setProperty('display','none','important');x.setAttribute('aria-hidden','true');});document.querySelectorAll('p').forEach(p=>{if(p.textContent.includes('95%+'))p.textContent='\u5efa\u7acb\u53ef\u91cd\u590d\u6267\u884c\u7684\u91c7\u96c6\u6d41\u7a0b\uff0c\u51cf\u5c11\u91cd\u590d\u624b\u52a8\u64cd\u4f5c\u3002';if(p.textContent.includes('20+ \u4efd'))p.textContent='\u6574\u7406\u591a\u5e73\u53f0\u7ade\u54c1\u4e0e\u8fd0\u8425\u5206\u6790\u6750\u6599\uff0c\u652f\u6301\u590d\u76d8\u548c\u770b\u677f\u4f7f\u7528\u3002';});
 }
 const archiveViewer=document.createElement('dialog');
 archiveViewer.className='archive-viewer';
 archiveViewer.innerHTML='<button type="button" class="archive-close" aria-label="关闭大图">×</button><button type="button" class="archive-prev" aria-label="上一张">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="archive-next" aria-label="下一张">›</button>';
 document.body.append(archiveViewer);
 const archiveViewerStyle=document.createElement('style');archiveViewerStyle.textContent='.archive-viewer{position:fixed;inset:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:56px 72px 48px;border:0;background:rgba(7,9,12,.96);color:#fff;overflow:hidden}.archive-viewer::backdrop{background:rgba(0,0,0,.82);backdrop-filter:blur(5px)}.archive-viewer figure{display:grid;width:100%;height:100%;margin:0;place-items:center;align-content:center;gap:12px}.archive-viewer figure img{display:block;max-width:min(88vw,1400px);max-height:calc(100dvh - 130px);width:auto;height:auto;object-fit:contain}.archive-viewer figcaption{font:12px Arial,sans-serif;color:#eee}.archive-viewer button{position:absolute;z-index:2;display:grid;width:48px;height:48px;place-items:center;border:1px solid #ffffff55;border-radius:50%;background:#171a20;color:#fff;font-size:30px;cursor:pointer}.archive-viewer .archive-close{top:18px;right:20px}.archive-viewer .archive-prev{top:50%;left:16px;transform:translateY(-50%)}.archive-viewer .archive-next{top:50%;right:16px;transform:translateY(-50%)}@media(max-width:640px){.archive-viewer{padding:64px 50px 48px}.archive-viewer figure img{max-width:94vw;max-height:calc(100dvh - 130px)}.archive-viewer .archive-prev{left:4px}.archive-viewer .archive-next{right:4px}}';document.head.append(archiveViewerStyle);
 let archiveImages=[],archiveIndex=0;
 function showArchiveImage(){const image=archiveViewer.querySelector('img');image.src=archiveImages[archiveIndex];image.alt=(archiveViewer.dataset.projectTitle||'精选作品')+' '+(archiveIndex+1);archiveViewer.querySelector('figcaption').textContent=(archiveIndex+1)+' / '+archiveImages.length;}
 function openArchive(row,clickedImage){const id=row.dataset.selectedProject;const title=id==='2'?'瑜伽服':id==='3'?'高跟鞋':id==='1'?'系列海报':id==='4'?'RPA 自动化':'AI 视频';const assetGroup=id==='2'?'4':id==='3'?'5':null;const clickedPath=clickedImage?new URL(clickedImage.currentSrc||clickedImage.src,location.origin).pathname:'';archiveImages=assetGroup?['1','2','3'].map(i=>'/assets/archive-selected/'+assetGroup+'-'+i+'.png'):Array.from(row.querySelectorAll('img')).slice(0,3).map(img=>new URL(img.currentSrc||img.src,location.origin).pathname);archiveViewer.dataset.projectTitle=title;archiveIndex=Math.max(0,archiveImages.indexOf(clickedPath));showArchiveImage();archiveViewer.showModal();document.body.style.overflow='hidden';}
 function closeArchive(){archiveViewer.close();document.body.style.overflow='';}
 archiveViewer.querySelector('.archive-close').onclick=closeArchive;
 archiveViewer.querySelector('.archive-prev').onclick=()=>{archiveIndex=(archiveIndex+2)%3;showArchiveImage();};
 archiveViewer.querySelector('.archive-next').onclick=()=>{archiveIndex=(archiveIndex+1)%3;showArchiveImage();};
 archiveViewer.addEventListener('click',e=>{if(e.target===archiveViewer)closeArchive();});
 archiveViewer.addEventListener('close',()=>{document.body.style.overflow='';});
 archiveViewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();archiveViewer.querySelector('.archive-next').click();}if(e.key==='ArrowLeft'){e.preventDefault();archiveViewer.querySelector('.archive-prev').click();}});
 window.addEventListener('click',event=>{const image=event.target.closest('img');if(!image)return;const archive= image.closest('section[data-framer-name="Archive"]');if(!archive)return;const row=image.closest('[data-selected-project]')||image.closest('.framer-1gjgywn-container,.framer-1c7xt9w-container,.framer-6om6j8-container,.framer-ycquz-container');if(!row)return;const rows=['.framer-1gjgywn-container','.framer-1c7xt9w-container','.framer-6om6j8-container','.framer-ycquz-container'];const index=rows.findIndex(selector=>row.matches(selector));if(index<0)return;if(!row.dataset.selectedProject)row.dataset.selectedProject=String(index+1);event.preventDefault();event.stopImmediatePropagation();openArchive(row,image);},true);
  }
 function apply(){pending=false;const root=document.getElementById('main');if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){return /SCRIPT|STYLE/.test(n.parentElement?.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let node;while(node=walker.nextNode()){if(node.parentElement?.closest('section[data-framer-name="Testimonial"]')&&node.data.trim()==='© 2026'){node.data='2023–2026';continue;}if(node.parentElement?.closest('section[data-framer-name="Testimonial"]')&&/20\d{2}(?:\.\d{2})?[—–-]20\d{2}/.test(node.data))continue;const next=node.data.replace(/sayhi@fuelstudio\.com/g,'3453026257@qq.com');if(next!==node.data)node.data=next;}
 for(const a of document.querySelectorAll('a[href]')){const raw=a.getAttribute('href');if(!raw)continue;if(raw.startsWith('mailto:')){a.setAttribute('href','mailto:3453026257@qq.com');continue;}let url;try{url=new URL(raw,location.origin+'/')}catch{continue;}if(url.origin!==location.origin){a.setAttribute('href','/#top');a.removeAttribute('target');}else if(a.target==='_blank'){a.removeAttribute('target');}}
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
 personalizePortfolioCases();personalizeHomepage();
 if(footer){const phone=footer.querySelector('a[data-framer-name="Light"]');if(phone){const label=phone.querySelector('p');if(label&&label.textContent!=='13555558884')label.textContent='13555558884';phone.removeAttribute('href');phone.removeAttribute('target');phone.style.cursor='text';phone.style.userSelect='text';phone.setAttribute('aria-label','联系电话 13555558884');phone.querySelector('[data-framer-name="Icon"]')?.style.setProperty('display','none');}}
 if(footer){const targets=['top','about','portfolio','contact-me'],labels=['首页','关于我','作品','联系我'];footer.querySelectorAll('a:has([data-framer-name="Page Name"])').forEach((link,i)=>{if(!targets[i])return;link.dataset.footerScroll=targets[i];link.setAttribute('href','#'+targets[i]);const label=link.querySelector('[data-framer-name="Page Name"] p');if(label&&label.textContent!==labels[i])label.textContent=labels[i];});}
 const villa=document.querySelector('section[data-framer-name="L"] .framer-facib3');
 const coastalSection=document.querySelector('section[data-framer-name="L"]');
 if(coastalSection){for(const heading of coastalSection.querySelectorAll('h2')){if(heading.textContent!=='CREATIVE VISION, POWERED BY AI — ')heading.textContent='CREATIVE VISION, POWERED BY AI — ';}}

 const faq=document.querySelector('.framer-jdAJs');
 if(faq){
  faq.id='my-strengths';
  const set=(el,text)=>{if(el&&el.textContent!==text)el.textContent=text;};
  set(faq.querySelector('.framer-r7cp99 p'),'(我的优势)');
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
 document.title='XIAOLI / PORTFOLIO';
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
  const playFeatureFilm=(event)=>{event.preventDefault();event.stopPropagation();const video=videoDialog.querySelector('#ai-demo-video');video.src='/assets/ai-film-beacons-to-answers.mp4';videoDialog.querySelector('#video-title').textContent='从烽火到回答';videoDialog.querySelector('#video-description').textContent='AI 影像创作展示 · 完整作品播放。';videoDialog.showModal();document.body.style.overflow='hidden';video.play().catch(()=>{});};
  document.querySelectorAll('section[data-framer-name="Portfolio"] a').forEach(link=>{
   if(!link.textContent.includes('Join Us Now')||link.dataset.aiFilmCta==='true')return;
   link.dataset.aiFilmCta='true';link.setAttribute('href','#ai-film');link.setAttribute('aria-label','播放 AI 影像作品《从烽火到回答》');
   const label=link.querySelector('p');if(label)label.textContent='▶ 播放《从烽火到回答》';
   link.addEventListener('click',playFeatureFilm);
  });
 }
 const ecommerceModalStyle=document.createElement('style');
 ecommerceModalStyle.textContent='.ecommerce-detail-modal{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:clamp(8px,2vw,24px);background:rgba(8,10,12,.82);backdrop-filter:blur(8px)}.ecommerce-detail-modal iframe{width:min(1280px,96vw);height:94dvh;border:0;border-radius:12px;background:#f2eee7;box-shadow:0 24px 90px #0008}.ecommerce-detail-close{position:fixed;top:calc((100dvh - min(94dvh,1100px))/2 - 18px);right:max(2vw,calc((100vw - 1280px)/2));z-index:1;display:grid;width:42px;height:42px;place-items:center;border:1px solid #fff7;border-radius:50%;background:#17191b;color:#fff;font-size:28px;cursor:pointer}@media(max-width:600px){.ecommerce-detail-modal{padding:0}.ecommerce-detail-modal iframe{width:100vw;height:100dvh;border-radius:0}.ecommerce-detail-close{top:10px;right:10px}}';
 document.head.append(ecommerceModalStyle);
 const observer=new MutationObserver(()=>{removeTemplatePortrait();if(!pending){pending=true;requestAnimationFrame(apply)}});observer.observe(document.body,{subtree:true,childList:true,characterData:true});removeTemplatePortrait();apply();
 document.addEventListener('click',event=>{const link=event.target.closest('a[href*="/work/portfolio/generation-workbench/"]');if(!link)return;event.preventDefault();event.stopImmediatePropagation();location.assign('/work/portfolio/generation-workbench/index.html');},true);
 document.addEventListener('click',event=>{const project=event.target.closest('[data-selected-project]');if(project){event.preventDefault();event.stopImmediatePropagation();openArchive(project,event.target.closest('img'));return;}const a=event.target.closest('a');if(!a)return;if(a.closest('section[data-framer-name="About"]')&&a.textContent.includes('13555558884')){event.preventDefault();event.stopImmediatePropagation();return;}const raw=a.getAttribute('href')||'';if(a.closest('section[data-framer-name="Pricing"]')&&a.getAttribute('aria-controls')){event.preventDefault();event.stopImmediatePropagation();const panel=document.getElementById(a.getAttribute('aria-controls'));if(panel){panel.hidden=!panel.hidden;a.setAttribute('aria-expanded',String(!panel.hidden));const text=a.querySelector('p');if(text)text.textContent=panel.hidden?'项目过程':'收起过程';}return;}if(raw.startsWith('mailto:'))return;const url=new URL(raw,location.origin+'/');if(url.origin!==location.origin){event.preventDefault();event.stopImmediatePropagation();location.assign('/#top');}},true);
 document.addEventListener('keydown',event=>{const project=event.target.closest('[data-selected-project]');if(project&&(event.key==='Enter'||event.key===' ')){event.preventDefault();project.click();return;}const link=event.target.closest('a[aria-controls][role="button"]');if(link&&event.key===' '){event.preventDefault();link.click();}});
})();


