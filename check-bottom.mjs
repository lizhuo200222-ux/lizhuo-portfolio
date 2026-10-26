import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  
  // 检查Bottom div中的按钮
  const bottomInfo = await page.evaluate(() => {
    const bottom = document.querySelector('[data-framer-name="Bottom"]');
    if (!bottom) return 'Bottom not found';
    
    return {
      bottomHasChildren: bottom.children.length,
      bottomHTML: bottom.innerHTML.substring(0, 200),
      hasButton: bottom.querySelector('.ai-demo-btn') ? true : false,
      buttonText: bottom.querySelector('.ai-demo-btn')?.textContent || 'none'
    };
  });
  
  console.log('Bottom div信息:');
  console.log(JSON.stringify(bottomInfo, null, 2));
  
  await browser.close();
})();
