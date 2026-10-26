import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // 收集脚本相关的错误（排除外部资源和Vite日志）
  const scriptErrors = [];
  page.on('console', msg => {
    const text = msg.text();
    if (!text.includes('vite') && !text.includes('Images loaded') && !text.includes('recoverable') && 
        !text.includes('framer') && !text.includes('connected') && msg.type() === 'error') {
      scriptErrors.push(text.substring(0, 100));
    }
  });
  page.on('pageerror', err => {
    scriptErrors.push(`ERROR: ${err.message.substring(0, 80)}`);
  });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForSelector('section[data-framer-name="Services"]', { timeout: 10000 });
  await page.waitForSelector('.capability-video-btn', { timeout: 5000 }).catch(() => null);
  await page.waitForTimeout(2000);
  
  // 检查按钮
  const videoBtn = await page.$('.capability-video-btn');
  const videoBtnVisible = videoBtn ? await videoBtn.isVisible() : false;
  const videoBtnText = videoBtn ? await videoBtn.textContent() : null;
  
  // 检查Dialog
  const dialogs = await page.$$('#ai-video-viewer-dialog');
  
  // 检查Pricing卡片中的能力说明
  const pricingNotes = await page.evaluate(() => {
    const pricing = document.querySelector('section[data-framer-name="Pricing"]');
    if (!pricing) return null;
    const notes = pricing.querySelectorAll('[class*="capability-note"]');
    return {
      count: notes.length,
      content: Array.from(notes).map(el => el.textContent.substring(0, 60))
    };
  });
  
  // 截图
  await page.screenshot({ path: 'output/final-desktop-1440.png' });
  
  // 滚动到Services
  await page.evaluate(() => {
    const el = document.querySelector('section[data-framer-name="Services"]');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'output/final-desktop-services.png' });
  
  // 测试按钮点击
  if (videoBtn && videoBtnVisible) {
    await videoBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'output/final-desktop-video.png' });
  }
  
  console.log(`\n=== 最终验证结果(桌面 1440x900) ===`);
  console.log(`✓ 视频按钮可见: ${videoBtnVisible ? '✓ 是' : '✗ 否'}`);
  console.log(`✓ 按钮文本: "${videoBtnText}"`);
  console.log(`✓ Dialog数量: ${dialogs.length} (期望1)`);
  console.log(`✓ Pricing能力说明数量: ${pricingNotes?.count || 0} (期望2)`);
  if (pricingNotes?.content) {
    pricingNotes.content.forEach((text, i) => console.log(`  ${i+1}. ${text}...`));
  }
  console.log(`✓ 脚本相关错误: ${scriptErrors.length}`);
  if (scriptErrors.length > 0) {
    scriptErrors.slice(0, 3).forEach(err => console.log(`  ⚠ ${err}`));
  }
  
  await page.close();
  
  // 移动端验证
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  const mobileScriptErrors = [];
  mobilePage.on('console', msg => {
    const text = msg.text();
    if (!text.includes('vite') && !text.includes('Images') && msg.type() === 'error') {
      mobileScriptErrors.push(text);
    }
  });
  
  await mobilePage.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await mobilePage.waitForSelector('section[data-framer-name="Services"]', { timeout: 10000 });
  await mobilePage.waitForTimeout(2000);
  
  const bodyWidth = await mobilePage.evaluate(() => document.body.scrollWidth);
  const viewportWidth = await mobilePage.evaluate(() => window.innerWidth);
  const hasOverflow = bodyWidth > viewportWidth;
  
  const mobileBtn = await mobilePage.$('.capability-video-btn');
  const mobileBtnVisible = mobileBtn ? await mobileBtn.isVisible() : false;
  
  await mobilePage.screenshot({ path: 'output/final-mobile-390.png' });
  
  console.log(`\n=== 最终验证结果(移动端 390x844) ===`);
  console.log(`✓ 视频按钮可见: ${mobileBtnVisible ? '✓ 是' : '✗ 否'}`);
  console.log(`✓ 横向溢出: ${hasOverflow ? `✗ 有(${bodyWidth}px)` : `✓ 无(${bodyWidth}px)`}`);
  console.log(`✓ 脚本相关错误: ${mobileScriptErrors.length}`);
  
  await browser.close();
  console.log(`\n✓ 最终验证完成`);
})();
