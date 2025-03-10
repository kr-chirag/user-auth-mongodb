import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

interface IToken {
    id: string;
    name: string;
    email: string;
}

export async function createTokten(user: IUser): Promise<string> {
    return await jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.SECRET_JWT || "",
        {
            expiresIn: "30 days",
        }
    );
}

export async function decodeToken(token: string): Promise<IToken> {
    return jwt.verify(token, process.env.SECRET_JWT || "") as IToken;
}
