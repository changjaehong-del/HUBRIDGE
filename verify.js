const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  const filePath = 'file:///C:/Users/%EC%9E%A5%EC%9E%AC%ED%99%8D/homepage/index.html';
  await page.goto(filePath, { waitUntil: 'networkidle', timeout: 15000 });

  // 1. 홈 히어로 (사진 3장 삭제 확인)
  await page.screenshot({ path: 'C:/Users/장재홍/homepage/verify_home.png', fullPage: false });

  // 2. 인스타그램 섹션으로 스크롤
  await page.evaluate(() => {
    document.querySelector('.ig-section').scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/장재홍/homepage/verify_instagram.png' });

  // 3. 인사말 페이지로 이동
  await page.evaluate(() => window.go('greeting'));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/장재홍/homepage/verify_greeting_slide1.png' });

  // 4. 슬라이드 2 (사진)로 이동
  await page.evaluate(() => window.gcGo(1));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/장재홍/homepage/verify_greeting_slide2.png' });

  await browser.close();
  console.log('done');
})();
