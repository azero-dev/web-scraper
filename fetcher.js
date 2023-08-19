import { launch } from "puppeteer";

async function run(url, option) {
  if (!url || !option) {
    throw new Error('Missing url or option');
  }

  try {
    const browser = await launch({
      headless: "new",
      // running without sandbox is not recommended!
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    
    if (option === "screenshot") {
      await page.setViewport({ width: 1024, height: 768 });
      const screenshot = await page.screenshot();
      await browser.close();
      return screenshot;
    } else if (option === "links") {
      const links = await page.$$eval("a", (as) =>
        as.map((a) => a.href)
      );
      await browser.close();
      return links;
    } else {
      await browser.close();
      throw new Error('Invalid option');
    }
  } catch (error) {
    throw error;
  }
}

export default run;