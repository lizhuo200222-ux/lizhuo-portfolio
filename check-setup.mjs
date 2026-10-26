import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // 在页面加载前监听console消息
  const logs = [];
  page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  
  // 在页面中执行测试代码
  const result = await page.evaluate(async () => {
    await new Promise(r => setTimeout(r, 2000));
    
    return {
      servicesExists: !!document.querySelector('section[data-framer-name="Services"]'),
      bottomExists: !!document.querySelector('[data-framer-name="Bottom"]'),
      dialogExists: !!document.getElementById('ai-video-viewer-dialog'),
      buttonExists: !!document.querySelector('.ai-demo-btn'),
      windowSetupAIVideoViewer: typeof window.setupAIVideoViewer,
      portfolioPersonalizeLoaded: window.portfolioPersonalizeLoaded || 'unknown'
    };
  });
  
  console.log('页面状态检查:');
  console.log(JSON.stringify(result, null, 2));
  
  await browser.close();
})();
