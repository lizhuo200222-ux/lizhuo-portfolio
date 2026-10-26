(() => {
 const introCopy='我将 AI 视觉探索、3D 表现与后期处理融入商品设计，从理解产品到筛选与修正，让画面既有吸引力，也能清楚传达产品价值。';
 const stages = [
  ['01｜项目目标','先把问题问清楚','把产品卖点、销售平台与目标人群整理为视觉任务。先确认图片需要回答什么，再决定做什么。'],
  ['02｜视觉方案','让形式服务产品','围绕产品特征选择构图与光影，用材质和色彩建立重点，让质感与信息表达保持一致。'],
  ['03｜制作过程','把探索推进为方案','分析参考、探索 AI 候选，再按任务结合 3D 与后期处理。明确每个工具的作用，不把生成当作交付。'],
  ['04｜质量控制','用细节检验画面','对照产品检查比例、结构与细节，复核材质和光影。发现变形或风格偏差时，筛选、修正并重新检查。'],
  ['05｜最终成果','交付完整视觉语言','按用途组织主图、详情模块与场景图，统一色彩、尺寸与展示顺序，让单张画面组成完整方案。']
 ];
 const texts = {
  'We Are Here':'我的工作方式与优势','About':'工作方式','(Our Studio)':'(VISUAL PRACTICE)',
  'One part-time creative dedicated to \u2028\u2028your continuous stream of projects.':'从需求到交付，让每个视觉选择都有依据。',
  '(Process)':'(从目标出发)','(Meet Our Team)':'(五个工作环节 · AI 生成方法示意)',
  'Research':'理解需求','Experiment':'建立方向','Refinement':'检查与交付',
  'What’s included':'关注的问题','Market discovery & visual mapping':'产品卖点与平台用途','Brand positioning review':'人群需求与表达重点','Dedicated creative, 20 hrs weekly':'按项目需求确认范围',
  'Concept sketches & directions':'构图与光影的探索','Visual style development':'色彩与材质的统一','Final design adjustments':'结构与细节的修正','System-wide consistency check':'整套视觉的一致性',
  '(Awards)':'(质量检查标准)','(Clients)':'(制作中的视觉线索)','(Stats)':'(交付的四个维度)','(Article)':'(清晰的过程表达)',
  'Awwwards':'结构比例','CSSD Awards':'材质表现','Behance':'产品细节','FWA':'信息层级','CSS Winner':'光影关系','Mindsparkle':'色彩统一','Dribbble':'图片规格','Web Excellence Awards':'交付检查',
  'Bruten Website':'形体与角度','Fuel Portfolio':'表面与反射','Branding Showcase':'网罩与旋钮','Digital Experience':'阅读与重点','Creative Website':'接触与阴影','Modern Design':'系列与场景','Visual Design':'尺寸与用途','Brand System':'版本与文件',
  'SOTD':'逐项检查','WOTD':'逐项检查','Featured':'逐项检查','FOTD':'逐项检查','Feature':'逐项检查','Highlighted':'逐项检查','Winner':'逐项检查',
  '2x':'01','1x':'02','7×':'03','5x':'04','4x':'06','3x':'07','8x':'08',
  '2.06M':'产品','160K':'信息','750+':'质感','257+':'系统',
  'Global Impressions':'先看清产品','Community Reach':'再读懂卖点','Creative Hours Logged':'细节经得起看','Projects Completed':'整套保持一致',
  'Velocity Becomes':'参考与分析','Way To Clearance':'构图与方向','All Grapples':'检查与修正','Flowers Love':'输出与组织',
  'Art Direction':'确定视觉目标','Books':'选择表达方式','Automotive':'核对关键细节','Gardening':'整理交付内容',
  'Home':'首页','Portfolio':'作品','Contact':'联系我','Contact Now':'联系我','Let’s work together\u2028\u2028':'让创意成为作品',
  'Play':'工作方法','Showreel':'AI 示意 · 非客户案例','(Frequently Asked Questions)':'(我的工作原则)',
  'What distinguishes us from other agencies?':'为什么先明确目标？','Why not hire an in-house designer or freelancer?':'如何选择视觉方向？','Are creative requests truly unlimited?':'AI 在流程中负责什么？','How fast will I receive my work?':'怎样判断图片可以交付？','What if I have a single project?':'如何组织整套成果？'
 };
 const descriptions = [
  ['Exploring insights through structured analysis and clear intention.',stages[0][2]],
  ['Translating ideas into visual concepts with clarity, balance, and exploration.',stages[1][2]],
  ['Polishing every detail with precision and structure.',stages[3][2]],
  ['Design-driven expression blends','先确认产品要传递的信息，再探索视觉方向，最后以结构、材质和一致性检查完成方案。'],
  ['Fuel moves beyond simple authenticity,','保持产品外形和关键特征清晰，避免视觉效果掩盖产品本身。'],
  ['Elevating identity with structured clarity.','把最重要的卖点放在阅读路径中，让信息层级服务购买判断。'],
  ['Through precision and intention,','关注表面、织物、反射与接触阴影，让细节支撑产品质感。'],
  ['Blending modern aesthetics','让主图、详情与场景共享视觉规则，形成完整的展示顺序。']
 ];
 let pending=false;
 function apply(){
  pending=false;document.title='XIAOLI / 我的工作方式与优势';document.documentElement.lang='zh-CN';
  const walker=document.createTreeWalker(document.getElementById('main')||document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=walker.nextNode()){
   if(/SCRIPT|STYLE/.test(n.parentElement?.tagName))continue;
   const t=n.data.trim();const replacement=texts[t]||descriptions.find(([prefix])=>t.startsWith(prefix))?.[1];
   if(replacement&&t!==replacement)n.data=replacement;
  }
  document.querySelectorAll('.framer-s7v7ik-container [aria-hidden="true"]').forEach(el=>{if(el.textContent.includes('Design-driven'))el.textContent=introCopy;});
  document.querySelectorAll('[data-framer-name="Logo"] a').forEach(a=>{a.setAttribute('href','/');a.setAttribute('aria-label','XIAOLI 首页');});
  document.querySelectorAll('.framer-lZJAJ').forEach((card,i)=>{
   const title=card.querySelector('[data-framer-name="Title"] p');const original=title?.textContent;
   let index=['Ariana Voss','Mira Leone','Selena Hart','Nora Bennett','Chloe Richter'].indexOf(original);
   if(index<0)index=Number(card.dataset.methodIndex);if(!Number.isInteger(index)||!stages[index])index=i%5;
   card.dataset.methodIndex=index;const item=stages[index];
   if(title&&title.textContent!==item[0])title.textContent=item[0];
   const category=card.querySelector('[data-framer-name="Category"] p');if(category&&category.textContent!==item[2])category.textContent=item[2];
   const image=card.querySelector('img');if(image){const src='/assets/work-method-0'+(index+1)+'.png';if(image.getAttribute('src')!==src)image.src=src;image.removeAttribute('srcset');image.alt=item[1]+' · AI 生成工作方法示意';}
  });
  document.querySelectorAll('img').forEach(img=>{
   const src=img.getAttribute('src')||'';
   if(src.includes('YIi7jRx')||src.includes('I4PBvZDh')){img.removeAttribute('srcset');img.src='/assets/work-method-01.png';img.alt='需求分析 · AI 生成方法示意';}
   if(src.includes('WQ7hN14')){img.removeAttribute('srcset');img.src='/assets/work-method-04.png';img.alt='质量检查 · AI 生成方法示意';}
  });
  const clients=document.querySelector('section[data-framer-name="Client"]');clients?.querySelectorAll('img').forEach((img,i)=>{img.removeAttribute('srcset');const src='/assets/work-method-0'+(i%5+1)+'.png';if(img.getAttribute('src')!==src)img.src=src;img.alt=stages[i%5][1]+' · AI 工作方法示意';const tile=img.closest('.framer-Ab1Db')?.parentElement;if(tile)tile.dataset.methodTile=String(i);});
  document.querySelectorAll('section[data-framer-name="Article"] img').forEach((img,i)=>{img.removeAttribute('srcset');const src='/assets/work-method-0'+(i%4+2)+'.png';if(img.getAttribute('src')!==src)img.src=src;img.alt='AI 生成的工作方法示意';});
  document.querySelectorAll('a[href]').forEach(a=>{const t=a.textContent.trim();if(a.closest('section[data-framer-name="Article"]'))a.setAttribute('href','#about');else if(t.includes('首页'))a.setAttribute('href','/');else if(t.includes('作品'))a.setAttribute('href','/#portfolio');else if(t.includes('联系我'))a.setAttribute('href','mailto:3453026257@qq.com');});
 }
  const style=document.createElement('style');style.textContent='.framer-J6Nvq,div:has(>a.framer-J6Nvq),#framer-badge-container{display:none!important}.framer-lZJAJ [data-framer-name="Category"] p{font-size:13px!important;line-height:1.6!important}.framer-lZJAJ [data-framer-name="Top"]{flex:1!important;min-height:0!important;aspect-ratio:16/9!important;background:#201f1c!important}.framer-lZJAJ [data-framer-name="Bottom"]{flex-shrink:0!important}.framer-lZJAJ img{object-fit:contain!important;object-position:center!important;background:#201f1c!important}section[data-framer-name="Client"] img{object-fit:contain!important;border-radius:5px}';document.head.append(style);
 const brandStyle=document.createElement('style');brandStyle.textContent='[data-framer-name="Logo"]{position:relative!important;min-width:110px!important;min-height:26px!important}[data-framer-name="Logo"] a>*{visibility:hidden!important}[data-framer-name="Logo"] a:after{content:"XIAOLI®";position:absolute;inset:0;display:flex;align-items:center;font:800 20px Arial,sans-serif;letter-spacing:-1px;color:white;visibility:visible}';document.head.append(brandStyle);
 const galleryStyle=document.createElement('style');galleryStyle.textContent=`section[data-framer-name="Client"] [data-framer-name="Cards"]{display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:24px!important;width:100%!important;height:auto!important}section[data-framer-name="Client"] [data-framer-name="Spacer"]{display:none!important}section[data-framer-name="Client"] [data-method-tile]{grid-column:span 2!important;width:100%!important;height:auto!important;min-width:0!important}section[data-framer-name="Client"] [data-method-tile="0"],section[data-framer-name="Client"] [data-method-tile="1"]{grid-column:span 3!important}section[data-framer-name="Client"] [data-method-tile="5"],section[data-framer-name="Client"] [data-method-tile="6"],section[data-framer-name="Client"] [data-method-tile="7"]{display:none!important}section[data-framer-name="Client"] .framer-Ab1Db{height:auto!important;aspect-ratio:16/9!important;padding:0!important;overflow:hidden!important}section[data-framer-name="Client"] .framer-1atv9y3{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;transform:none!important}section[data-framer-name="Client"] img{width:100%!important;height:100%!important;object-fit:contain!important} @media(max-width:700px){section[data-framer-name="Client"] [data-framer-name="Cards"]{grid-template-columns:1fr!important;gap:18px!important}section[data-framer-name="Client"] [data-method-tile]{grid-column:1!important}section[data-framer-name="Client"] [data-method-tile="0"],section[data-framer-name="Client"] [data-method-tile="1"]{grid-column:1!important}}`;document.head.append(galleryStyle);
 new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(apply);}}).observe(document.body,{childList:true,subtree:true});apply();
})();
