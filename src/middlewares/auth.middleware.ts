import { NextFunction, Request, Response } from "express-serve-static-core";
import { getUserByID } from "../services/user.service";
import { decodeToken } from "../libs/jwt.lib";

export async function checkAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authToken = req.cookies["auth-token"];
        if (!authToken) throw new Error("auth-token required");
        const decodedToken = await decodeToken(authToken);
        const user = await getUserByID(decodedToken.id);
        if (!user) throw new Error("user not found");
        req.user = user;
        next();
    } catch (error) {
        console.log("checkauth middleware error", error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
