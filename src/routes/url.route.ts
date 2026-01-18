import {Router} from "express"
import { shortenUrl,redirectUrl } from "../controllers/url.controller"
import { userMiddleware } from "../middlewares/auth.middleware";

const urlRouter = Router()

urlRouter.route("/:shortCode").get(redirectUrl);
urlRouter.route("/shorten").post(userMiddleware, shortenUrl);

export default urlRouter;