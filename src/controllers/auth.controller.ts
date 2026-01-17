import {Request, Response} from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { SignupSchema, SigninSchema } from "../utils/validation";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const signup = AsyncHandler(async(req:Request, res:Response) => {
    const parseData = SignupSchema.safeParse(req.body);
    if(!parseData.success) {
        throw new ApiError(401, "Validation Error", parseData.error.issues)
    }

    const {name, email, password} = parseData.data;

    const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

    if(existingUser) {
        throw new ApiError(409, "User already exist with this email")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
        .insert(users)
        .values({
            name,
            email,
            password:hashedPassword
        })
        .returning({
            id:users.id,
            email:users.email,
            username: users.name,
        })

    return res.status(201).json(
        new ApiResponse(200, user, "User resgistered successfully")
    )
})

const signin = AsyncHandler(async(req:Request, res:Response) => {
    const parseData = SigninSchema.safeParse(req.body);
    if(!parseData.success) {
        throw new ApiError(401, "Validation Error", parseData.error.issues)
    }

    const {email, password} = parseData.data

    const [user] = await db
        .select()
        .from(users)
        .where(eq(
            users.email, email
        ))
    
    if(!user) {
        throw new ApiError(403, "User doesn't exist")
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) {
        throw new ApiError(401, "Password is incorrect")
    }

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET || "secret",
        {expiresIn: "24h"}
    )   

    return res.status(200).json(
        new ApiResponse(200, {token}, "User logged in successfully")
    )
})

export {
    signin,
    signup
}