import { launch } from "puppeteer";

export class fetcherModel {
  static async run({ url, option }) {
    const browser = await launch({
      headless: "new",
      // running without sandbox is not recommended!
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();
      await page.goto(url);

      if (option === "screenshot") {
        await page.setViewport({ width: 1024, height: 768 });
        const screenshot = await page.screenshot();
        return screenshot;
      } else if (option === "links") {
        const links = await page.$$eval("a", (as) => as.map((a) => a.href));
        return links;
      } else {
        throw new Error("Invalid option");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      await browser.close();
    }
  }
}
