// 在浏览器控制台粘贴运行这段代码
function forceRemove() {
  const selectors = [
    '[data-framer-name="User"]',
    '[data-framer-name="Details"]',
    '.framer-39qqj8',
    '.framer-13ii7z1',
    '.framer-rgtkst',
    '.framer-1met6yp',
    'img[src*="ykB2unblGBc4DohSe1vhH0DUD4"]',
    'img[alt*="Women Side Pose"]'
  ];
  
  let removed = 0;
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      console.log('删除:', selector, el);
      el.remove();
      removed++;
    });
  });
  
  console.log('总共删除了', removed, '个元素');
}

forceRemove();
