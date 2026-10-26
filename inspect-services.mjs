import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // 获取Services完整结构
  const servicesStructure = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    if (!services) return 'Services not found';
    
    // 获取所有直接子元素
    const children = Array.from(services.children);
    const structure = children.map((child, idx) => ({
      index: idx,
      tag: child.tagName,
      className: child.className.substring(0, 40),
      dataName: child.getAttribute('data-framer-name'),
      text: child.textContent?.substring(0, 80) || ''
    }));
    
    return structure;
  });
  
  console.log('Services直接子元素:');
  console.log(JSON.stringify(servicesStructure, null, 2));
  
  // 查找包含"AI 视频制作"的元素
  const aiCardInfo = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    if (!services) return null;
    
    // 搜索所有包含指定文本的元素
    const allElements = services.querySelectorAll('*');
    const aiElements = [];
    
    for (const el of allElements) {
      if (el.textContent.includes('AI 视频制作')) {
        aiElements.push({
          tag: el.tagName,
          dataName: el.getAttribute('data-framer-name'),
          className: el.className.substring(0, 40),
          text: el.textContent.substring(0, 100),
          depth: Array.from(el.parentElement.querySelectorAll('*')).indexOf(el)
        });
      }
    }
    
    return aiElements;
  });
  
  console.log('\n包含"AI 视频制作"的元素:');
  console.log(JSON.stringify(aiCardInfo, null, 2));
  
  // 获取Services内所有data-framer-name属性
  const allFramerNames = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    if (!services) return null;
    
    const names = new Set();
    services.querySelectorAll('[data-framer-name]').forEach(el => {
      names.add(el.getAttribute('data-framer-name'));
    });
    
    return Array.from(names);
  });
  
  console.log('\nServices内所有data-framer-name:');
  console.log(allFramerNames);
  
  await browser.close();
})();
