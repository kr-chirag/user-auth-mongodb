import { Request, Response } from "express-serve-static-core";
import { getAllUsers, getUserByID } from "../services/user.service";

export async function handleGetUser(
    req: Request<{ userId: string }>,
    res: Response
) {
    const userId = req.params.userId;
    const user = await getUserByID(userId);
    res.status(200).json({ status: "success", user });
}

export async function handleGetAllUsers(req: Request, res: Response) {
    const users = await getAllUsers();
    res.status(200).json({ status: "success", users });
}
