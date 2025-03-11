import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

interface ITokenPayload {
    id: string;
    name?: string;
    email?: string;
}

export async function createTokten(payload: ITokenPayload): Promise<string> {
    return jwt.sign(payload, process.env.SECRET_JWT || "", {
        expiresIn: "30 days",
    });
}

export async function decodeToken(token: string): Promise<ITokenPayload> {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT || "");
    return decodedToken as ITokenPayload;
}
