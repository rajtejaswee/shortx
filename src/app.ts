import express from "express"
import cors from "cors"
import "dotenv/config";

const app = express()

app.use(cors({
    origin:"*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.static("public"));

import userRouter from "./routes/auth.route"
import urlRouter from "./routes/url.route"
import { redirectUrl } from "./controllers/url.controller";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/url", urlRouter)
app.get("/:shortCode", redirectUrl);

import {errorHandler} from "./middlewares/error.middleware"
app.use(errorHandler)

export {app}