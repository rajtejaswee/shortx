import {Router} from "express"
import { shortenUrl,redirectUrl, getUserUrls, getUrlStats } from "../controllers/url.controller"
import { userMiddleware } from "../middlewares/auth.middleware";

const urlRouter = Router()


urlRouter.route("/shorten").post(userMiddleware, shortenUrl);
urlRouter.route("/my-urls").get(userMiddleware, getUserUrls)
urlRouter.route("/stats/:shortCode").get(userMiddleware, getUrlStats);


urlRouter.route("/:shortCode").get(redirectUrl);
export default urlRouter;