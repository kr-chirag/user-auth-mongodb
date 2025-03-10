import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import { getUserByID } from "../services/user.service";
import { IUser } from "../models/user.model";

export async function checkAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authToken = req.cookies["auth-token"];
        if (authToken) {
            const decodedToken = jwt.verify(
                authToken,
                process.env.SECRET_JWT || ""
            ) as { id: string };
            const user = await getUserByID(decodedToken.id);
            req.user = user as IUser;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.log("checkauth middleware error", error);
        res.status(500).send("Error...");
    }
}
