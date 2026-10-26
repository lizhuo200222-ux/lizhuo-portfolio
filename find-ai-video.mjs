import { chromium } from 'file:///C:/Users/34530/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // 查找所有data-framer-name="Content"的元素并检查其文本
  const cardContents = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    const cards = services.querySelectorAll('[data-framer-name="Content"]');
    
    const result = [];
    cards.forEach((card, idx) => {
      result.push({
        index: idx,
        text: card.textContent.substring(0, 150)
      });
    });
    
    return result;
  });
  
  console.log('Services内所有Content元素的文本:');
  cardContents.forEach(card => {
    console.log(`Card ${card.index}: ${card.text.replace(/\n/g, ' ')}`);
  });
  
  // 查找第02个卡片（"AI 视频制作"应该在第二个）
  const secondCardInfo = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    const cards = services.querySelectorAll('[data-framer-name="Laptop"]');
    
    if (cards.length < 2) return `只找到 ${cards.length} 个Laptop卡片`;
    
    const secondCard = cards[1];
    return {
      text: secondCard.textContent.substring(0, 200),
      className: secondCard.className,
      hasVideo: secondCard.textContent.includes('视频')
    };
  });
  
  console.log('\n第二个卡片信息:');
  console.log(JSON.stringify(secondCardInfo, null, 2));
  
  // 检查所有包含"02"的文本
  const allText = await page.evaluate(() => {
    const services = document.querySelector('section[data-framer-name="Services"]');
    const text = services.textContent;
    
    // 找到包含"02"附近的文本
    const match = text.match(/02.+?(?=03|\$)/s);
    return match ? match[0].substring(0, 200) : 'not found';
  });
  
  console.log('\n"02"附近的文本:');
  console.log(allText);
  
  await browser.close();
})();
