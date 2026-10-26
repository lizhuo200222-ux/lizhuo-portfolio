import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2500);
  
  // 获取Services的完整结构
  const servicesInfo = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    if (!services) return 'Services not found';
    
    // 获取所有卡片标题
    const cards = services.querySelectorAll('[data-framer-name="Title"]');
    const titles = Array.from(cards).map(el => el.textContent);
    
    // 查找02和03卡片
    const allText = services.textContent;
    const sections = [];
    const match02 = allText.match(/02[^0-9]+?(?=03|$)/s);
    const match03 = allText.match(/03[^0-9]+?(?=$)/s);
    
    return {
      titleCount: titles.length,
      titles: titles,
      has02: !!match02,
      has03: !!match03,
      section02: match02 ? match02[0].substring(0, 300) : null,
      section03: match03 ? match03[0].substring(0, 300) : null
    };
  });
  
  console.log('Services结构分析:');
  console.log(JSON.stringify(servicesInfo, null, 2));
  
  // 查找视频相关元素
  const videoInfo = await page.evaluate(() => {
    const videos = document.querySelectorAll('video, [data-framer-name*="Video"], [data-framer-name*="video"]');
    const videoSrcs = Array.from(videos).map(v => ({
      tag: v.tagName,
      src: v.src || v.querySelector('source')?.src || 'none',
      dataName: v.getAttribute('data-framer-name')
    }));
    
    // 查找包含视频相关文本的元素
    const allElements = document.querySelectorAll('*');
    const videoText = [];
    for (const el of allElements) {
      if (el.textContent.includes('视频') || el.textContent.includes('Video')) {
        videoText.push({
          text: el.textContent.substring(0, 100),
          dataName: el.getAttribute('data-framer-name')
        });
      }
    }
    
    return {
      videoElements: videoSrcs,
      videoRelatedText: videoText.slice(0, 5)
    };
  });
  
  console.log('\n视频相关元素:');
  console.log(JSON.stringify(videoInfo, null, 2));
  
  // 截图当前页面
  await page.screenshot({ path: 'output/current-layout-1440.png' });
  
  // 移动端截图
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await mobilePage.waitForTimeout(2500);
  await mobilePage.screenshot({ path: 'output/current-layout-390.png' });
  
  await browser.close();
  console.log('\n✓ 截图已保存到 output/');
})();
