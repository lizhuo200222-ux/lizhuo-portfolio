const { chromium } = require('C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.createContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`ERROR: ${err.message}`));
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const videoBtn = await page.$('.capability-video-btn');
  const videoText = videoBtn ? await videoBtn.textContent() : null;
  const dialogs = await page.$$('#ai-video-viewer-dialog');
  
  const videoItems = await page.$$('.video-item');
  const videoSrcs = [];
  for (const item of videoItems) {
    videoSrcs.push(await item.getAttribute('data-src'));
  }
  
  await page.screenshot({ path: 'output/desktop-1440.png' });
  
  await page.evaluate(() => {
    const el = document.querySelector('section[data-framer-name="Services"]');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'output/desktop-services.png' });
  
  if (videoBtn) {
    await videoBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'output/desktop-video-dialog.png' });
    await page.press('Escape');
  }
  
  console.log(`\n=== 桌面(1440x900)验证结果 ===`);
  console.log(`✓ 视频按钮文本: ${videoText}`);
  console.log(`✓ Dialog 数量: ${dialogs.length}`);
  console.log(`✓ 视频源数量: ${videoSrcs.length}`);
  videoSrcs.forEach((src, i) => console.log(`  ${i+1}. ${src}`));
  console.log(`✓ Console错误: ${consoleLogs.length === 0 ? '无' : consoleLogs.length}`);
  
  await context.close();
  const mobileContext = await browser.createContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  
  const mobileConsoleLogs = [];
  mobilePage.on('console', msg => mobileConsoleLogs.push(`${msg.type()}: ${msg.text()}`));
  mobilePage.on('pageerror', err => mobileConsoleLogs.push(`ERROR: ${err.message}`));
  
  await mobilePage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  
  const bodyWidth = await mobilePage.evaluate(() => document.body.scrollWidth);
  const viewportWidth = await mobilePage.evaluate(() => window.innerWidth);
  const hasHorizontalOverflow = bodyWidth > viewportWidth;
  
  await mobilePage.screenshot({ path: 'output/mobile-390.png' });
  
  await mobilePage.evaluate(() => {
    const el = document.querySelector('section[data-framer-name="Services"]');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: 'output/mobile-services.png' });
  
  console.log(`\n=== 移动端(390x844)验证结果 ===`);
  console.log(`✓ 横向溢出: ${hasHorizontalOverflow ? '有溢出' : '无溢出'} (宽度${bodyWidth}px)`);
  console.log(`✓ Console错误: ${mobileConsoleLogs.length === 0 ? '无' : mobileConsoleLogs.length}`);
  
  await browser.close();
  console.log(`\n✓ 截图已保存到 output/ 目录`);
})();
