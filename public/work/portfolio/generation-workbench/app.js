(() => {
  const modes = [
    {
      title: '自由生图',
      shortTitle: '01 / 自由生图',
      label: '01 / DIRECT GENERATION',
      heading: '从提示词开始，组织生成参数。',
      description: '把描述输入、参考图、模型、画面比例和生成数量放在同一操作面板，让生成条件与结果状态更容易核对。',
      image: '/assets/workbench-case/ui-01.png',
      alt: '自由生图模式：描述输入、模型、比例与生成任务控制',
    },
    {
      title: '商品处理',
      shortTitle: '02 / 商品处理',
      label: '02 / PRODUCT PROCESSING',
      heading: '围绕商品素材，衔接主图制作。',
      description: '以商品参考图为输入，选择场景主图、白底、抠图或局部处理等任务，明确每一步需要的素材和输出。',
      image: '/assets/workbench-case/ui-02.png',
      alt: '商品处理模式：商品参考图、场景主图与处理任务控制',
    },
    {
      title: '设计创作',
      shortTitle: '03 / 设计创作',
      label: '03 / DESIGN CANVAS',
      heading: '用画布连接不同创作步骤。',
      description: '通过节点画布组织生成节点与图像框，把素材、提示词和结果串联起来，让创作关系更直观，也便于继续调整。',
      image: '/assets/workbench-case/ui-03.png',
      alt: '设计创作模式：通过节点画布连接图像生成流程',
    },
  ];

  const tabs = [...document.querySelectorAll('.interface-tab')];
  const panel = document.querySelector('#interface-panel');
  const detailImage = document.querySelector('#interface-image');
  const previewImage = document.querySelector('#workbench-preview-image');
  const zoomButton = document.querySelector('.preview-zoom');
  const dialog = document.querySelector('#image-dialog');
  const dialogImage = document.querySelector('#dialog-image');
  const dialogCaption = document.querySelector('#dialog-caption');
  let activeIndex = 0;

  function setMode(index, focusTab = false) {
    activeIndex = (index + modes.length) % modes.length;
    const mode = modes[activeIndex];

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === activeIndex;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });

    panel.setAttribute('aria-labelledby', tabs[activeIndex].id);
    detailImage.src = mode.image;
    detailImage.alt = mode.alt;
    previewImage.src = mode.image;
    previewImage.alt = mode.alt;
    document.querySelector('#workbench-preview-title').textContent = mode.shortTitle;
    document.querySelector('#workbench-preview-count').textContent = `0${activeIndex + 1} / 03`;
    document.querySelector('#interface-kicker').textContent = mode.label;
    document.querySelector('#interface-heading').textContent = mode.heading;
    document.querySelector('#interface-description').textContent = mode.description;
  }

  function openImage() {
    const mode = modes[activeIndex];
    dialogImage.src = mode.image;
    dialogImage.alt = mode.alt;
    dialogCaption.textContent = `${mode.shortTitle} / FORMA 生图工作台界面`;
    dialog.showModal();
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setMode(Number(tab.dataset.index)));
    tab.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setMode(activeIndex + 1, true);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setMode(activeIndex - 1, true);
      } else if (event.key === 'Home') {
        event.preventDefault();
        setMode(0, true);
      } else if (event.key === 'End') {
        event.preventDefault();
        setMode(modes.length - 1, true);
      }
    });
  });

  detailImage.closest('button').addEventListener('click', openImage);
  previewImage.addEventListener('click', openImage);
  zoomButton.addEventListener('click', openImage);
  dialog.querySelector('.image-dialog__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  setMode(0);
})();
