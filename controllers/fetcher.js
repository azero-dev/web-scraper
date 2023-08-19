import { validateQuery } from "../schemas/request.js"
import { fetcherModel } from "../models/fetcher.js"

export class FetcherChontroller {
  static async index(req, res) {
    const validation = validateQuery(req.query);

    if (!validation.success) {
      return res.status(422).json({ error: validation.error.message });
    }

    try {
      const { url, option } = validation.data
      let result = await fetcherModel.run({ url, option })

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
  }
}