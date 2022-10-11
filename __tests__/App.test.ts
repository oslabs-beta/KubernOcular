import puppeteer from 'puppeteer';

describe("App tests (end to end testing I think)", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    })
    
    afterAll(() => browser.close());

    it('shows kubernocular logo on navbar', async () => {
        await page.goto("http://localhost:8080");
        
        const dimensions = await page.evaluate(() => {
            return {
              width: document.documentElement.clientWidth,
              height: document.documentElement.clientHeight,
              deviceScaleFactor: window.devicePixelRatio,
            };
          });

          console.log('Dimensions:', dimensions);
    })

    
});