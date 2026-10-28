(() => {
  if (window.__portfolioBack) return;
  window.__portfolioBack = true;
  const FALLBACK = '/#portfolio';

  const style = document.createElement('style');
  style.id = 'portfolio-back-style';
  style.textContent = [
    '.portfolio-back-fab{position:fixed;z-index:2147483000;display:grid;place-items:center;width:44px;height:44px;box-sizing:border-box;border-radius:50%;background:rgba(255,255,255,.88);border:1px solid rgba(0,0,0,.14);color:#171717;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.14);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:transform .18s ease,background .18s ease,box-shadow .18s ease}',
    '.portfolio-back-fab:hover{background:#fff;transform:translateY(-1px);box-shadow:0 10px 26px rgba(0,0,0,.18)}',
    '.portfolio-back-fab:active{transform:translateY(0)}',
    '.portfolio-back-fab:focus-visible{outline:2px solid #171717;outline-offset:3px}',
    '.portfolio-back-fab svg{display:block;width:20px;height:20px}',
    '.portfolio-back-tl{left:18px;top:18px}',
    '.portfolio-back-br{right:18px;bottom:18px}',
    '@media(max-width:700px){.portfolio-back-fab{width:42px;height:42px}.portfolio-back-tl{left:12px;top:12px}.portfolio-back-br{right:12px;bottom:12px}}',
    '@media(prefers-reduced-motion:reduce){.portfolio-back-fab{transition:none}}',
  ].join('');
  document.head.append(style);

  const icon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function sameOriginReferrer() {
    try {
      return !!document.referrer && new URL(document.referrer).origin === location.origin;
    } catch (error) {
      return false;
    }
  }

  function goBack(event) {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
    if (event) event.preventDefault();
    if (sameOriginReferrer() && history.length > 1) {
      history.back();
      return;
    }
    location.replace(FALLBACK);
  }

  function fab(position) {
    const link = document.createElement('a');
    link.className = 'portfolio-back-fab portfolio-back-' + position;
    link.href = FALLBACK;
    link.setAttribute('aria-label', '返回作品集');
    link.title = '返回作品集';
    link.innerHTML = icon;
    link.addEventListener('click', goBack);
    return link;
  }

  function place() {
    if (document.querySelector('.portfolio-back-fab')) return;
    const topLeft = fab('tl');
    document.body.append(topLeft);
    document.body.append(fab('br'));
    const header = document.querySelector('header, nav');
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    topLeft.style.top = Math.max(18, Math.round(headerBottom) + 10) + 'px';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', place);
  else place();
})();
