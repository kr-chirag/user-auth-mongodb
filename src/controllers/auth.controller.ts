import { Request, Response } from "express-serve-static-core";
import { IUser } from "../models/user.model";
import { createUser, getUserByEmail } from "../services/user.service";
import bcrypt from "bcrypt";
import { createTokten } from "../libs/jwt.lib";

async function login(user: IUser, res: Response) {
    res.cookie("auth-token", await createTokten(user));
    res.status(201).json({
        status: "success",
        message: "Logged in successfully",
        user,
    });
}

export async function handleSignup(req: Request<{}, {}, IUser>, res: Response) {
    const { name, email, password } = req.body;
    const oldUser = await getUserByEmail(email);
    if (oldUser) {
        res.status(400).json({
            status: "error",
            message: "This email is alredy registered",
        });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword);
        await login(user, res);
    }
}

export async function handleLogin(
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user)
        res.status(400).json({
            status: "error",
            message: "No user found with this email",
        });
    else if (await bcrypt.compare(password, user?.password)) login(user, res);
    else
        res.status(400).json({
            status: "error",
            message: "Invalid Password",
        });
}
