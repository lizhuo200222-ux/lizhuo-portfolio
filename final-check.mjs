import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2500);
  
  // 检查按钮
  const demoBtn = await page.$('.ai-demo-btn');
  const demoBtnVisible = demoBtn ? await demoBtn.isVisible() : false;
  const demoBtnText = demoBtn ? await demoBtn.textContent() : null;
  
  // 检查能力文本
  const capabilityText = await page.$('.ai-capability-text');
  const capabilityTextContent = capabilityText ? await capabilityText.textContent() : null;
  
  // 检查Dialog
  const dialogs = await page.$$('#ai-video-viewer-dialog');
  
  // 检查Pricing中的能力说明
  const pricingNotes = await page.$$('section[data-framer-name="Pricing"] [class*="capability-note"]');
  
  console.log(`\n=== 桌面(1440x900)最终验证 ===`);
  console.log(`✓ AI视频演示按钮可见: ${demoBtnVisible ? '✓ 是' : '✗ 否'}`);
  console.log(`✓ 按钮文本: "${demoBtnText}"`);
  console.log(`✓ 能力说明文本: "${capabilityTextContent?.substring(0, 60)}..."`);
  console.log(`✓ Dialog唯一性: ${dialogs.length} (期望1)`);
  console.log(`✓ Pricing能力说明数量: ${pricingNotes.length} (期望2)`);
  
  // 截图
  await page.screenshot({ path: 'output/final-desktop.png' });
  
  if (demoBtnVisible) {
    await demoBtnVisible;
    await page.click('.ai-demo-btn');
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'output/final-video-open.png' });
  }
  
  await browser.close();
})();
