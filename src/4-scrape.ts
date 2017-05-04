import * as fs from 'fs';
import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false}); // Can pass in options here, eg {headless: false}
  const page = await browser.newPage();
  
  for (let year = 1880; year < 2018; year++) {
    await page.goto('https://www.ssa.gov/oact/babynames/index.html');

    // Change the textbox to the correct year
    await page.evaluate(`document.querySelector('#year').value = '${year}'`);
    // Change the dropdown to 1000 results instead of default 20
    await page.select('#rank', '1000');

    // Click the go button and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.click('#content > section:nth-child(4) > div > div > div:nth-child(1) > form > p:nth-child(4) > input:nth-child(1)'),
    ]);
    
    // Parse the table to get our data
    const rowSelector = 'body > table:nth-child(3) > tbody > tr > td:nth-child(2) > p > table > tbody > tr[align=right]';
    const result = await page.evaluate(`[...document.querySelectorAll('${rowSelector}')].map(row => {
      try {
        const rank = row.querySelector('td:nth-child(1)').innerText;
        const boy = row.querySelector('td:nth-child(2)').innerText;
        const girl = row.querySelector('td:nth-child(3)') && row.querySelector('td:nth-child(3)').innerText || null;
    
        return {rank, boy, girl};
      } catch {
        return undefined;
      }
    });`);

    fs.writeFileSync(`data/${year}.json`, JSON.stringify(result, null, 2));
  }

  await browser.close();
})();
