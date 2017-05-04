import * as puppeteer from 'puppeteer';

(async () => {
  // Initialize puppeteer
  const browser = await puppeteer.launch(); // Can pass in options here, eg {headless: false}
  const page = await browser.newPage();

  // Navigate to our page
  await page.goto('https://news.ycombinator.com/');

  // Take a screenshot
  await page.screenshot({path: 'hacker-news.png', fullPage: true});

  // Clean up
  await browser.close();
})();
