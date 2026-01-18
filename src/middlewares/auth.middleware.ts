import {Request, Response, NextFunction} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import {ApiError} from "../utils/ApiError"

interface AuthRequest extends Request {
    userId?: string;
}

export const userMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers["authorization"]

    if(!authHeader) {
        next(new ApiError(401, "Unauthorized request: No token Provided"))
        return
    }

    try {
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1]: authHeader
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET || "secret") as JwtPayload

        if(decoded && decoded.id) {
            (req as AuthRequest).userId = decoded.id;
            next()
        }
        else {
            next(new ApiError(403, "Invalid JWT Token"))
        }
    }
    catch(error) {
        next(new ApiError(401, "Invalid or Expired Token"))
    }
}