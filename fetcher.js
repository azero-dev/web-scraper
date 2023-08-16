const fs = require('fs').promises;
const puppeteer = require('puppeteer');

async function run() {
  let screen;
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/');
    await page.setViewport({ width: 1920, height: 1080 });
    screen = await page.screenshot();
    await browser.close();

  } catch (error) {
    throw error;
  }
  return screen;
}

module.exports = run;
