import { NextFunction, Request, Response } from "express-serve-static-core";
import { getUserByID } from "../services/user.service";
import { IUser } from "../models/user.model";
import { decodeToken } from "../libs/jwt.lib";

export async function checkAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authToken = req.cookies["auth-token"];
        if (authToken) {
            const decodedToken = await decodeToken(authToken);
            const user = await getUserByID(decodedToken.id);
            req.user = user;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.log("checkauth middleware error", error);
        res.status(500).send("Error...");
    }
}
