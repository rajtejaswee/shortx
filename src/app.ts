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

app.use("/api/v1/user", userRouter)

import {errorHandler} from "./middlewares/error.middleware"
app.use(errorHandler)

export {app}