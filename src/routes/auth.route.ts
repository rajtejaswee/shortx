import {Router} from "express"
import { signin, signup } from "../controllers/auth.controller"

const userRouter = Router();

userRouter.route("/signin").post(signin)
userRouter.route("/signup").post(signup)

export default userRouter;