(() => {
  const caseUrl = '/work/portfolio/ai-video-workflow/index.html';
  const cover = '/assets/portfolio/cross-border-video/handbag.jpg';

  function updateText(root, name, value) {
    const node = root.querySelector(`[data-framer-name="${name}"] p`);
    if (node) node.textContent = value;
  }

  function mount() {
    const portfolio = document.querySelector('section[data-framer-name="Portfolio"]');
    const link = portfolio?.querySelector('a[href*="/work/selected-3/"]');
    if (!link || link.dataset.aiVideoProject === 'true') return;

    link.dataset.aiVideoProject = 'true';
    link.href = caseUrl;
    link.removeAttribute('target');
    link.setAttribute('aria-label', '查看跨境短视频 AI 自动粗剪案例');
    link.querySelectorAll('img').forEach((image) => {
      image.removeAttribute('srcset');
      image.src = cover;
      image.alt = '跨境短视频自动粗剪案例封面';
    });
    updateText(link, 'Roll No', 'AI 自动粗剪');
    updateText(link, 'Title', 'AI 自动粗剪');
    updateText(link, 'Category', '跨境短视频 / 内容复刻');
    updateText(link, 'Year', '© 2026');
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-ai-video-project="true"]');
    if (!link) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(caseUrl);
  }, true);

  let queued = false;
  const queueMount = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      mount();
    });
  };

  const root = document.getElementById('main') || document.body;
  new MutationObserver(queueMount).observe(root, { childList: true, subtree: true });
  mount();
})();
