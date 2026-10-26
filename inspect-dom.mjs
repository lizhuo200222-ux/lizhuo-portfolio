import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // 获取Services内部结构
  const structure = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    if (!services) return 'Services not found';
    
    const firstCard = services.querySelector('.framer-14miuru-container');
    if (!firstCard) return 'First card not found';
    
    // 获取卡片的所有子元素
    const children = firstCard.querySelectorAll('*');
    const structure = [];
    for (let i = 0; i < Math.min(15, children.length); i++) {
      const el = children[i];
      structure.push({
        tag: el.tagName,
        class: el.className.substring(0, 50),
        text: el.textContent?.substring(0, 50) || '',
        dataName: el.getAttribute('data-framer-name')
      });
    }
    return structure;
  });
  
  console.log('Services内第一个卡片的DOM结构:');
  console.log(JSON.stringify(structure, null, 2));
  
  // 检查是否有Pricing卡片中的过程说明
  const pricingInfo = await page.evaluate(() => {
    const pricing = document.querySelector('section[data-framer-name="Pricing"]');
    if (!pricing) return 'Pricing section not found';
    
    const processDiv = pricing.querySelector('.portfolio-process');
    if (!processDiv) return 'No .portfolio-process found';
    
    return {
      processId: processDiv.id,
      isHidden: processDiv.hidden,
      hasNotes: pricing.querySelectorAll('[class*="capability-note"]').length,
      notesContent: Array.from(pricing.querySelectorAll('[class*="capability-note"]')).map(el => 
        el.textContent.substring(0, 100)
      )
    };
  });
  
  console.log('\nPricing卡片中的过程说明:');
  console.log(JSON.stringify(pricingInfo, null, 2));
  
  // 检查Console错误类型
  const consoleErrors = [];
  page.on('console', msg => {
    consoleErrors.push({ type: msg.type(), text: msg.text().substring(0, 80) });
  });
  
  await page.waitForTimeout(1000);
  
  const errorTypes = {};
  consoleErrors.forEach(err => {
    const key = err.type;
    errorTypes[key] = (errorTypes[key] || 0) + 1;
  });
  
  console.log('\nConsole错误统计:');
  console.log(errorTypes);
  
  await browser.close();
})();
