import { Router } from "express"
import run from "../fetcher.js"
import { validateQuery } from "../schemas/request.js"

export const indexRouter = Router()

indexRouter.get("/", async (req, res) => {
  const validation = validateQuery(req.query);

  if (!validation.success) {
    return res.status(422).json({ error: validation.error.message });
  }

  const { url, option } = validation.data

  try {
    if (!url || !option) {
      return res.status(400).json({ error: "Missing url or option" });
    }

    let result;
    if (option === "screenshot" || option === "links") {
      result = await run(url, option);
    } else {
      return res.status(400).json({ error: "Invalid option" });
    }

    if (option === "screenshot") {
      const screenshotBase64 = result.toString("base64");
      res.writeHead(200, {
        "Content-Type": "image/png",
      });
      res.end(screenshotBase64, "base64");
    } else if (option === "links") {
      return res.status(200).json({ links: result });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
})