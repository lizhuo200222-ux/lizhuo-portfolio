import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 桌面验证
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleLogs = [];
  page.on('console', msg => {
    if (!msg.text().includes('vite') && !msg.text().includes('Images loaded')) {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', err => consoleLogs.push(`ERROR: ${err.message}`));
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForSelector('section[data-framer-name="Services"]', { timeout: 10000 });
  
  // 等待按钮出现
  await page.waitForSelector('.capability-video-btn', { timeout: 5000 }).catch(() => null);
  await page.waitForTimeout(2000);
  
  const videoBtn = await page.$('.capability-video-btn');
  const videoText = videoBtn ? await videoBtn.textContent() : null;
  const videoBtnVisible = videoBtn ? await videoBtn.isVisible() : false;
  const dialogs = await page.$$('#ai-video-viewer-dialog');
  
  const videoItems = await page.$$('.video-item');
  const videoSrcs = [];
  for (const item of videoItems) {
    videoSrcs.push(await item.getAttribute('data-src'));
  }
  
  // 截图
  await page.screenshot({ path: 'output/desktop-1440.png' });
  
  await page.evaluate(() => {
    const el = document.querySelector('section[data-framer-name="Services"]');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'output/desktop-services.png' });
  
  // 测试按钮点击
  if (videoBtn && videoBtnVisible) {
    await videoBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'output/desktop-video-dialog.png' });
    await page.press('Escape');
    await page.waitForTimeout(300);
  }
  
  console.log(`\n=== 桌面(1440x900)验证结果 ===`);
  console.log(`✓ 视频按钮可见: ${videoBtnVisible ? '✓ 是' : '✗ 否'}`);
  console.log(`✓ 按钮文本: "${videoText}"`);
  console.log(`✓ Dialog唯一性: ${dialogs.length === 1 ? '✓ 唯一(1个)' : `✗ 数量${dialogs.length}`}`);
  console.log(`✓ 视频源数量: ${videoSrcs.length}`);
  console.log(`✓ 视频源地址:`);
  videoSrcs.forEach((src, i) => {
    const name = src.includes('FORMA') ? 'FORMA演示' : src.includes('01-') ? '参考图重建' : '生成与编辑';
    console.log(`  ${i+1}. ${name}`);
  });
  console.log(`✓ 关键错误: ${consoleLogs.length === 0 ? '无' : consoleLogs.length}`);
  
  await page.close();
  
  // 移动端验证
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  const mobileConsoleLogs = [];
  mobilePage.on('console', msg => {
    if (!msg.text().includes('vite') && !msg.text().includes('Images loaded')) {
      mobileConsoleLogs.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  mobilePage.on('pageerror', err => mobileConsoleLogs.push(`ERROR: ${err.message}`));
  
  await mobilePage.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await mobilePage.waitForSelector('section[data-framer-name="Services"]', { timeout: 10000 });
  await mobilePage.waitForSelector('.capability-video-btn', { timeout: 5000 }).catch(() => null);
  await mobilePage.waitForTimeout(2000);
  
  const bodyWidth = await mobilePage.evaluate(() => document.body.scrollWidth);
  const viewportWidth = await mobilePage.evaluate(() => window.innerWidth);
  const hasHorizontalOverflow = bodyWidth > viewportWidth;
  
  const mobileVideoBtn = await mobilePage.$('.capability-video-btn');
  const mobileVideoBtnVisible = mobileVideoBtn ? await mobileVideoBtn.isVisible() : false;
  
  await mobilePage.screenshot({ path: 'output/mobile-390.png' });
  
  await mobilePage.evaluate(() => {
    const el = document.querySelector('section[data-framer-name="Services"]');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: 'output/mobile-services.png' });
  
  // 移动端测试按钮
  if (mobileVideoBtn && mobileVideoBtnVisible) {
    await mobileVideoBtn.click();
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: 'output/mobile-video-dialog.png' });
    await mobilePage.press('Escape');
  }
  
  console.log(`\n=== 移动端(390x844)验证结果 ===`);
  console.log(`✓ 视频按钮可见: ${mobileVideoBtnVisible ? '✓ 是' : '✗ 否'}`);
  console.log(`✓ 横向溢出: ${hasHorizontalOverflow ? `✗ 有(${bodyWidth}px > ${viewportWidth}px)` : `✓ 无(宽度${bodyWidth}px)`}`);
  console.log(`✓ 关键错误: ${mobileConsoleLogs.length === 0 ? '无' : mobileConsoleLogs.length}`);
  
  await browser.close();
  console.log(`\n✓ 浏览器验证完成`);
})();
