import * as puppeteer from 'puppeteer';

(async () => {
  // Initialize puppeteer
  const browser = await puppeteer.launch(); // Can pass in options here, eg {headless: false}
  const page = await browser.newPage();

  // Navigate to our page
  await page.goto('https://news.ycombinator.com/', {waitUntil: 'networkidle0'});

  // Generate a pdf of the page
  await page.pdf({path: 'hacker-news.pdf'});

  // Clean up
  await browser.close();
})();
