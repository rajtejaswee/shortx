import {z} from "zod";

export const SignupSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(3).max(10),
})

export const SigninSchema = z.object({
    email:z.string().email(),
    password:z.string().min(3).max(10)
})