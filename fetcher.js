const fs = require('fs').promises;
const puppeteer = require('puppeteer');

async function run(url) {
  let screen;
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 200, height: 200 });
    screen = await page.screenshot();
    await browser.close();

  } catch (error) {
    throw error;
  }
  return screen;
}

module.exports = run;



// await page.setViewport({ width: 1024, height: 768 });