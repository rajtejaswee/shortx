import {Request, Response} from "express"
import { CreateUrlSchema } from "../utils/validation"
import { AsyncHandler } from "../utils/AsyncHandler"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { generateShortCode } from "../utils/urlGenerator"
import { db } from "../db"
import {eq, sql} from "drizzle-orm"
import {urls} from "../db/schema"

interface AuthRequest extends Request {
    userId?: string;
}

const shortenUrl = AsyncHandler(async(req: Request, res: Response) => {

    const authReq = req as AuthRequest

    const parseData = CreateUrlSchema.safeParse(req.body);

    if(!parseData.success) {
        throw new ApiError(400, "Invalid Input", parseData.error.issues)
    }

    const {url, alias} = parseData.data;

    let shortCode:string;

    if(alias) {
        const  existingAlias = await db.query.urls.findFirst({
            where: eq(urls.shortCode, alias)
        })

        if(existingAlias) {
            throw new ApiError(409, "Alias already taken")
        }
        shortCode = alias;
    }
    else {
        shortCode = generateShortCode()
    }
    if (!authReq.userId) {
        throw new ApiError(401, "Unauthorized");
    }
        const [shortcodeGeneration] = await db
            .insert(urls)
            .values({
                originalUrl: url,
                shortCode: shortCode,
                userId: authReq.userId

            })
            .returning({
                id:urls.id,
                shortCode:urls.shortCode,
                originalUrl: urls.originalUrl,
            })

        return res.status(200).json(
        new ApiResponse(201, shortcodeGeneration, "shortcode genertion was successfull")
    )
})

const redirectUrl = AsyncHandler(async(req: Request, res:Response) => {

    const {shortCode} = req.params;

    if(!shortCode) {
        throw new ApiError(400, "shortcode is required")
    }

    const urlEntry = await db.query.urls.findFirst({
        where: eq(urls.shortCode, shortCode as string)
    })

    if(!urlEntry) {
        throw new ApiError(404, "URL not found")
    }

    await db.update(urls)
        .set({ clicks: sql`${urls.clicks} + 1` })
        .where(eq(urls.id, urlEntry.id))

    return res.redirect(urlEntry.originalUrl)
})

export {
    shortenUrl, redirectUrl
}