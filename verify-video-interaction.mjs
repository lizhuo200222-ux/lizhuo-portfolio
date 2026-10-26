import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2500);
  
  // 测试视频切换
  console.log('\n=== 视频交互验证 ===');
  
  // 打开视频
  await page.click('.ai-demo-btn');
  await page.waitForTimeout(800);
  
  // 检查第一个视频按钮的active状态
  let firstActive = await page.evaluate(() => document.querySelector('.video-item.active')?.textContent || 'none');
  console.log(`✓ 初始激活视频: ${firstActive}`);
  
  // 点击第二个视频按钮
  const secondBtn = (await page.$$('.video-item'))[1];
  await secondBtn.click();
  await page.waitForTimeout(500);
  
  let secondActive = await page.evaluate(() => document.querySelector('.video-item.active')?.textContent || 'none');
  console.log(`✓ 切换后激活视频: ${secondActive}`);
  
  // 检查标题是否更新
  const title = await page.evaluate(() => document.querySelector('#video-title')?.textContent || 'none');
  console.log(`✓ 当前标题: "${title}"`);
  
  // 测试关闭按钮
  const closeBtn = await page.$('.video-close');
  await closeBtn.click();
  await page.waitForTimeout(500);
  
  const dialogOpen = await page.evaluate(() => !!document.querySelector('dialog[open]'));
  console.log(`✓ 关闭按钮有效: ${dialogOpen ? '✗ dialog仍开' : '✓ dialog已关'}`);
  
  // 测试Escape键
  await page.click('.ai-demo-btn');
  await page.waitForTimeout(500);
  await page.press('Escape');
  await page.waitForTimeout(500);
  
  const dialogOpenAfterEscape = await page.evaluate(() => !!document.querySelector('dialog[open]'));
  console.log(`✓ Escape关闭有效: ${dialogOpenAfterEscape ? '✗ dialog仍开' : '✓ dialog已关'}`);
  
  await browser.close();
  console.log(`\n✓ 交互验证完成`);
})();
