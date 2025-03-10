import { Request, Response } from "express-serve-static-core";
import {
    deleteUser,
    getAllUsers,
    getUserByID,
    updateUser,
} from "../services/user.service";
import { IUser } from "../models/user.model";
import { createTokten } from "../libs/jwt.lib";

export async function handleGetUser(
    req: Request<{ userId: string }>,
    res: Response
) {
    try {
        const userId = req.params.userId;
        const user = await getUserByID(userId);
        if (!user)
            res.status(500).json({
                status: "error",
                error: "User not found with this user id",
            });
        else res.status(200).json({ status: "success", user });
    } catch (error) {
        res.status(500).json({ status: "error", error });
    }
}

export async function handleGetAllUsers(req: Request, res: Response) {
    const users = await getAllUsers();
    res.status(200).json({ status: "success", users });
}

export async function handleGetProfile(req: Request, res: Response) {
    res.status(200).json({ status: "success", user: req.user });
}

export async function handleUpdateProfile(
    req: Request<{}, {}, Partial<IUser>>,
    res: Response
) {
    const { name, password } = req.body;
    const newUser = await updateUser(req.user?._id as string, {
        name,
        password,
    });
    res.cookie("auth-token", await createTokten(newUser));
    res.status(200).json({
        status: "success",
        message: "user details updated",
        user: newUser,
    });
}

export async function handleDeleteProfile(req: Request, res: Response) {
    await deleteUser(req.user?._id as string);
    res.clearCookie("auth-token");
    res.status(200).json({
        status: "success",
        message: "user deleted",
        user: req.user,
    });
}
