const express = require("express");
const cors = require("cors");
const run = require("./fetcher.js");
const { validateQuery } = require("./schemas/request.js");

const app = express();
app.use(express.json());
app.disable("x-powered-by");
// Warning: CORS is enabled for all origins. ONLY for testing purposes.
app.use(cors());
// To enable CORS for specific origins only, use the following:
// app.use(cors({
//   origin: (origin, callback) => {
//     const ACCEPTED_ORIGINS = [
//       'https://inferente.com/',
//       'http://localhost:8080',
//       'https://example.com',
//     ]
//     if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS. Check the origin'))
//     }
//   }
// }))

app.get("/", async (req, res) => {
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
});

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
