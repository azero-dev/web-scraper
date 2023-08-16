const fs = require("fs").promises;
const puppeteer = require("puppeteer");

async function run(url, option) {
  if (url && option === "screenshot") {
    let screen;
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto(url);
      await page.setViewport({ width: 1024, height: 768 });
      screen = await page.screenshot();
      await browser.close();
    } catch (error) {
      throw error;
    }
    return screen;
  } else if (url && option === "links") {
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto(url);
      const links = await page.$$eval("a", (as) =>
        as.map((a) => a.href)
      );
      await browser.close();
      return links;
    } catch (error) {
      throw error;
    }
  } else {
    return "Ask me something!";
  }
}

module.exports = run;

// width: 1024, height: 768
