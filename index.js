const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`,
  });
  const page = await browser.newPage();

  await page.goto('https://01.0easy.com/yihao01-park-payment/car-discount/index.html#/car-owner?parkName=%E6%B6%A6%E5%98%89%E5%85%AC%E5%9B%AD%E9%81%93&businessName=%E9%9D%92%E7%AB%B9%E8%8D%9F&businessId=24469&discountName=8%E5%B0%8F%E6%97%B6&id=112220&plateFirstName=%E6%B9%98A', { waitUntil: 'networkidle0' });

  // 点击车牌输入框
  await page.waitForSelector('input[placeholder="\u8bf7\u8f93\u5165\u8f66\u724c"]', { timeout: 10000 });
  await page.click('input[placeholder="\u8bf7\u8f93\u5165\u8f66\u724c"]');

  // 等待键盘弹出
  await page.waitForTimeout(500);

  // 依次点击 A R G 7 9 8
  const keys = ['A','R','G','7','9','8'];
  for (const key of keys) {
    const selector = `button >> text="${key}"`;
    await page.click(selector);
    await page.waitForTimeout(200);
  }

  // 点击关闭
  await page.click('button >> text="\u5173\u95ed"');

  // 点击领取
  await page.click('button >> text="\u9886\u53d6"');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
