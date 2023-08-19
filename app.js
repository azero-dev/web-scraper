import express, { json } from "express"
import { indexRouter } from "./routes/indexRoute.js"
import cors from "cors"
import { corsMiddleware } from "./middlewares/cors.js"

const app = express()
app.use(json())
app.disable("x-powered-by")
// Warning: CORS is enabled for all origins. ONLY for testing purposes.
app.use(cors())
// To enable CORS for specific origins only, use the following:
// app.use(corsMiddleware())

app.use("/", indexRouter)

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
