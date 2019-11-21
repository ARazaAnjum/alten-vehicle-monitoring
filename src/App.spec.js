const puppeteer = require('puppeteer');

describe('E2E Test', () => {
  test('Loads correctly and find overview text', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#vehicle-status-content');

    const html = await page.$eval('#vehicle-status-content', e => e.innerHTML);
    expect(html).toBe('Vehicle Status Overview');
    const htmlCustomer = await page.$eval('#panel1a-header > div.MuiExpansionPanelSummary-content', e => e.innerHTML);
    expect(htmlCustomer).toBe('<h4 class="customer-name">Customer: </h4>Kalles Grustransporter AB');

    browser.close();
  }, 16000);
});
