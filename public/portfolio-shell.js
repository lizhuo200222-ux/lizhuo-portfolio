/* portfolio-shell.js
 * 2026-10-28 体验修复层：在 portfolio-personalize.js 之后运行。
 * 1) 移动端导航（替换失效的 Framer 汉堡菜单）
 * 2) 可访问性：焦点可见、点击区、alt、lang/landmark
 * 3) 链接修复：尾斜杠、#top、影片 CTA
 * 4) 手机端首屏取景、邮箱断行、重复指标
 */
(() => {
  if (window.__portfolioShell) return;
  window.__portfolioShell = true;

  const MOBILE_MAX = 809.98;
  const FILM = '/assets/ai-film-beacons-to-answers.mp4';
  const NAV = [
    ['首页', '/'],
    ['作品集', '/work/portfolio/'],
    ['关于我', '/about/'],
    ['联系我', '/contact/'],
  ];

  const css = `
:focus-visible{outline:2px solid #c8ff36!important;outline-offset:3px!important}
#main{--shell-accent:#c8ff36}
footer a[href^="mailto:"],a[href^="mailto:"]{overflow-wrap:anywhere;word-break:break-word}
a[href="/work/portfolio/"] p{font-weight:500!important;letter-spacing:0!important}
@media (max-width:${MOBILE_MAX}px){

  section[data-framer-name="Hero"]{min-height:100svh}
  [data-framer-name="Mobile Menu Icon"],#__framer-badge-container{display:none!important}
  nav[data-framer-name="Home Active"]{display:none!important}
  footer a,footer [role="link"]{min-height:44px;display:inline-flex;align-items:center}
  footer nav a{min-height:44px}
  h1,h2{overflow-wrap:anywhere}
}
@media (min-width:810px){#x-menu-btn,#x-menu{display:none!important}}
#x-menu-btn{position:fixed;top:12px;right:12px;z-index:1002;width:48px;height:48px;border:1px solid #ffffff2e;border-radius:10px;background:#0a0a0acc;backdrop-filter:blur(8px);display:grid;place-items:center;cursor:pointer;color:#fff}
#x-menu-btn span{display:block;width:20px;height:1.5px;background:#fff;margin:2.5px 0;transition:transform .25s,opacity .2s}
#x-menu-btn[aria-expanded="true"] span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
#x-menu-btn[aria-expanded="true"] span:nth-child(2){opacity:0}
#x-menu-btn[aria-expanded="true"] span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
#x-menu{position:fixed;inset:0;z-index:1001;background:#0a0a0a;display:flex;flex-direction:column;justify-content:center;padding:88px 24px 40px;opacity:0;visibility:hidden;transition:opacity .28s ease,visibility .28s}
#x-menu[data-open="1"]{opacity:1;visibility:visible}
#x-menu a{display:flex;align-items:baseline;justify-content:space-between;padding:20px 0;border-bottom:1px solid #ffffff1f;color:#f5f5f5;font:600 30px/1.1 system-ui,"Microsoft YaHei",sans-serif;text-decoration:none;letter-spacing:-.02em}
#x-menu a i{font:400 12px/1 ui-monospace,monospace;color:#c8ff36;font-style:normal}
#x-menu small{margin-top:28px;color:#8b8b8b;font:400 13px/1.7 system-ui,"Microsoft YaHei",sans-serif}
#x-menu small a{display:inline;padding:0;border:0;color:#c8ff36;font:inherit}
html.x-menu-open,html.x-menu-open body{overflow:hidden}
`;

  function styleOnce() {
    if (document.getElementById('x-shell-style')) return;
    const s = document.createElement('style');
    s.id = 'x-shell-style';
    s.textContent = css;
    document.head.append(s);
  }

  /* ---------- 移动端菜单 ---------- */
  function buildMenu() {
    if (document.getElementById('x-menu-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'x-menu-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', '打开导航菜单');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'x-menu');
    btn.innerHTML = '<span></span><span></span><span></span>';

    const panel = document.createElement('nav');
    panel.id = 'x-menu';
    panel.setAttribute('aria-label', '主导航');
    panel.innerHTML =
      NAV.map(([label, href], i) =>
        `<a href="${href}">${label}<i>0${i + 1}</i></a>`).join('') +
      '<small>李卓 · 电商视觉设计师<br>3453026257@qq.com · <a href="tel:13555558884">13555558884</a></small>';

    const close = () => {
      panel.dataset.open = '0';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '打开导航菜单');
      document.documentElement.classList.remove('x-menu-open');
    };
    const open = () => {
      panel.dataset.open = '1';
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', '关闭导航菜单');
      document.documentElement.classList.add('x-menu-open');
      panel.querySelector('a')?.focus({ preventScroll: true });
    };
    btn.addEventListener('click', () => (panel.dataset.open === '1' ? close() : open()));
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.dataset.open === '1') { close(); btn.focus(); } });
    document.body.append(btn, panel);
  }

  /* ---------- 链接 ---------- */
  const FIX = [
    ['./work/portfolio', '/work/portfolio/'],
    ['./about', '/about/'],
    ['./contact', '/contact/'],
  ];
  function fixLinks() {
    for (const a of document.querySelectorAll('a[href]')) {
      const raw = a.getAttribute('href');
      if (!raw) continue;
      if (raw === '#ai-film' || raw === '#film') { a.setAttribute('href', FILM); continue; }
      if (raw === '#top') { a.setAttribute('href', '/'); continue; }
      const hit = FIX.find(([from]) => raw === from);
      if (hit) { a.setAttribute('href', hit[1]); continue; }
      if (raw.startsWith('#')) {
        const id = raw.slice(1);
        if (id && !document.getElementById(id)) {
          // 页内锚点不存在时回落到首页对应区块
          const map = { portfolio: '/work/portfolio/', about: '/#about', 'contact-me': '/contact/' };
          if (map[id]) a.setAttribute('href', map[id]);
        }
      }
    }
    // 电话改为可拨打
    for (const a of document.querySelectorAll('a, [role="link"]')) {
      const t = (a.textContent || '').trim();
      if (/^1[3-9]\d{9}$/.test(t) && (!a.getAttribute('href') || a.getAttribute('href') === '/#top')) {
        a.setAttribute('href', `tel:${t}`);
        a.style.cursor = 'pointer';
        a.style.userSelect = 'text';
      }
    }
  }

  /* ---------- 可访问性 ---------- */
  function a11y() {
    const main = document.getElementById('main');
    if (main && main.getAttribute('role') !== 'main') main.setAttribute('role', 'main');

    // 全页只保留一个 h1，装饰性大数字降级为 div
    const h1s = [...document.querySelectorAll('#main h1')];
    const keep = h1s.find((h) => /李卓|设计师/.test(h.textContent || ''));
    for (const h of h1s) {
      if (h === keep) continue;
      if (!/^\d{2}$/.test((h.textContent || '').trim())) continue;
      if (h.dataset.xDemoted) continue;
      const d = document.createElement('div');
      d.className = h.className;
      const st = h.getAttribute('style');
      if (st) d.setAttribute('style', st);
      d.setAttribute('aria-hidden', 'true');
      d.dataset.xDemoted = '1';
      d.innerHTML = h.innerHTML;
      h.replaceWith(d);
    }    // 装饰性大数字 / 跑马灯重复项不进无障碍树
    for (const h of document.querySelectorAll('#main h1')) {
      if (!h.textContent.trim().match(/^\d{2}$/)) continue;
      h.setAttribute('aria-hidden', 'true');
    }
    for (const marquee of document.querySelectorAll('h2, .framer-text')) {
      if (!/CREATIVE VISION|从需求到交付/.test(marquee.textContent || '')) continue;
      marquee.setAttribute('aria-hidden', 'true');
    }

    // 图片补 alt
    for (const img of document.images) {
      if (img.alt == null || img.getAttribute('alt') === null) {
        img.alt = img.closest('section')?.getAttribute('data-framer-name') === 'Hero' ? '李卓作品视觉' : '李卓作品';
      }
    }
  }

  /* ---------- 首屏视频 ---------- */
  function heroVideo() { /* 首屏视频保持原样，不做任何干预 */ }

  /* ---------- 重复指标 ---------- */
  function dedupe() {
    const t = document.querySelector('section[data-framer-name="Testimonial"]');
    if (!t) return;
    for (const el of t.querySelectorAll('p,h3,h4,h5,h6,span,div')) {
      const txt = (el.textContent || '').trim();
      if (!/^(60%|20\+)$/.test(txt) || el.children.length) continue;
      let box = el;
      for (let i = 0; i < 3 && box.parentElement && box.parentElement !== t; i++) box = box.parentElement;
      box.style.display = 'none';
    }
    // 单一引言时不展示轮播箭头
    for (const btn of t.querySelectorAll('button,[role="button"]')) {
      const label = (btn.getAttribute('aria-label') || '') + (btn.textContent || '');
      if (/prev|next|上一|下一|arrow/i.test(label)) btn.style.display = 'none';
    }
  }

  /* ---------- 文案：清掉模板残留（客户端渲染会覆盖静态 HTML，所以在这里兜底） ---------- */
  const COPY = [
    ['Meet the CEO', '现在可接单'],
    ['Lousiana KD6', '李卓 · 电商视觉'],
    ['CEO', '3D / AI 视觉制作'],
    ['See all (07)', '查看全部作品'],
    ['Videography', '3D 商品视觉'],
    ['Branding', 'AI 视觉与自动化'],
    ['Strategy', '视觉服务'],
    ['within 24 hours.', '24 小时内回复。'],
    ['We Are Faster, Better And Cheaper"', '从需求到交付，一条可复用的视觉生产线'],
    ['We Are Faster, Better And Cheaper', '从需求到交付，一条可复用的视觉生产线'],
    ['Contact Now', '联系我们'],
    ['Home', '首页'],
    ['Portfolio', '作品集'],
    ['About', '关于我'],
    ['Contact', '联系我'],
    ['© 2025', '© 2026'],
    ['© 2024', '© 2026'],
    ['©2025', '©2026'],
  ];
  const MARKERS = COPY.map(([from]) => from);
  function rewriteCopy() {
    const main = document.getElementById('main') || document.body;
    const text = main.textContent || '';
    if (!MARKERS.some((m) => text.includes(m))) return;
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (/SCRIPT|STYLE|TEXTAREA/.test(n.parentElement?.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    let node;
    while ((node = walker.nextNode())) {
      const v = node.nodeValue;
      if (!v) continue;
      const t = v.trim();
      if (!t) continue;
      const host = node.parentElement;
      // 被拆成逐字 span 的文案：整段替换，避免字符重叠
      const exact = COPY.find(([from]) => t === from);
      if (exact && host && host.children.length > 0 && (host.textContent || '').trim() === exact[0]) {
        const block = host.closest('p') || host;
        if (!block.dataset.xClean) {
          const fresh = block.cloneNode(false);
          fresh.dataset.xClean = '1';
          fresh.textContent = exact[1];
          block.replaceWith(fresh);
        }
        continue;
      }
      const hit = COPY.find(([from]) => t === from || v.includes(from));
      if (hit) node.nodeValue = v.split(hit[0]).join(hit[1]);
    }
    // “查看全部作品”按钮：清掉模板拆字层，只留一层
    for (const cta of document.querySelectorAll('a[data-framer-name="Primary"][href="/work/portfolio/"],a[data-framer-name="Primary"][href="./work/portfolio"]')) {
      const box = cta.querySelector('[data-framer-name="Text"]');
      if (!box || box.dataset.xLabel === '1') continue;
      box.dataset.xLabel = '1';
      box.style.display = 'none';
      const label = document.createElement('span');
      label.className = 'x-cta-label';
      label.textContent = '查看全部作品';
      label.style.cssText = 'font:600 13px/1 system-ui,"PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:.02em;padding:0 18px;color:#0a0a0a;white-space:nowrap';
      cta.append(label);
    }
    // See all 缩略图：模板头像换成本人
    for (const a of document.querySelectorAll('a')) {
      if (!/查看全部作品|See all/.test(a.textContent || '')) continue;
      for (const img of a.querySelectorAll('img')) {
        if (img.dataset.xMe === '1') continue;
        img.dataset.xMe = '1';
        img.removeAttribute('srcset');
        img.setAttribute('src', '/assets/portrait.png');
        img.alt = '李卓';
      }
    }
    // CEO 卡片头像：换成本人照片
    for (const img of document.querySelectorAll('img[src*="wFRJn1NkdVZsLrogcfZqK9CfE"]')) {
      img.removeAttribute('srcset');
      img.setAttribute('src', '/assets/portrait.png');
      img.alt = '李卓';
    }
  }


  // 同一按钮内重复的文案层（Framer 悬停动画会叠两层）只保留一层
  function dedupeLabels() {
    const groups = new Map();
    for (const p of document.querySelectorAll('p')) {
      const t = (p.textContent || '').trim();
      if (t.length < 3 || t.length > 12) continue;
      const r = p.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const key = t + '|' + Math.round(r.x) + '|' + Math.round(r.y);
      const arr = groups.get(key) || [];
      arr.push(p);
      groups.set(key, arr);
    }
    for (const arr of groups.values()) {
      if (arr.length < 2) continue;
      arr.slice(1).forEach((el) => { el.style.visibility = 'hidden'; });
    }
  }
  function run() {
    try {
      styleOnce();
      buildMenu();
      rewriteCopy();
      fixLinks();
      a11y();
      heroVideo();
      dedupe();
      dedupeLabels();
    } catch (e) { /* 保持页面可用 */ }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  run();
  [600, 1600, 3200].forEach((ms) => setTimeout(run, ms));
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; run(); });
  }).observe(document.body, { childList: true, subtree: true });
})();
