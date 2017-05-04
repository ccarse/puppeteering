import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false}); // Can pass in options here, eg {headless: false}
  const page = await browser.newPage();

  // Load the page
  await page.goto('placeholder');

  // Click the login button
  await page.click('#navbar-collapse-1 > ul.nav.navbar-nav.navbar-right > li > a');
  await page.waitForSelector('#Username');

  // Fill out the login form.
  await page.type('#Username', 'username');
  await page.type('#Password', 'password');

  // Click the login button and wait for the page to load.
  const loginButtonSelector = 'form > fieldset > div:nth-child(3) > button';
  await Promise.all([
    page.waitForNavigation({waitUntil: 'networkidle0'}),
    page.click(loginButtonSelector),
  ]);

  // Check if the tree has nodes. 
  const treeSelector = '#app > div > div.container-fluid > div > div.col-lg-5 > div:nth-child(2) > div > ul';
  const hasNodes = await page.evaluate(`document.querySelector('${treeSelector}').children.length > 0`);
  
  // If this were a real test this is where you'd probably use your testing library to assert that the tree is populated.
  console.log(`Tree is populated: ${hasNodes ? 'Yes' : 'No'}`);

  await page.waitFor(2000);
  await browser.close();
})();
