import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // 测试选择器
  const services = await page.$('section[data-framer-name="Services"]');
  console.log('Services section:', services ? '✓ 存在' : '✗ 不存在');
  
  const firstCapability = await page.$('.framer-14miuru-container');
  console.log('.framer-14miuru-container:', firstCapability ? '✓ 存在' : '✗ 不存在');
  
  const videoBtn = await page.$('.capability-video-btn');
  console.log('.capability-video-btn:', videoBtn ? '✓ 存在' : '✗ 不存在');
  
  // 检查dialog
  const dialog = await page.$('#ai-video-viewer-dialog');
  console.log('#ai-video-viewer-dialog:', dialog ? '✓ 存在' : '✗ 不存在');
  
  // 检查视频项目
  const videoItems = await page.$$('.video-item');
  console.log('.video-item数量:', videoItems.length);
  
  // 查看实际的HTML结构
  const firstCardHTML = await page.evaluate(() => {
    const card = document.querySelector('.framer-14miuru-container');
    return card ? card.innerHTML.substring(0, 300) : 'not found';
  });
  console.log('\n第一个卡片HTML片段:');
  console.log(firstCardHTML);
  
  await browser.close();
})();
