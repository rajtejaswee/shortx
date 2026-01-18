import { customAlphabet } from "nanoid";

const alphabet = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'

const generateShortCode = customAlphabet(alphabet, 6)

export {generateShortCode}