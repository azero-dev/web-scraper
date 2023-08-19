import { Router } from "express"
import { FetcherChontroller } from "../controllers/fetcher.js"

export const indexRouter = Router()

indexRouter.get("/", FetcherChontroller.index)