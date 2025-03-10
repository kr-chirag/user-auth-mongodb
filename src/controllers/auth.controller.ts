import { Request, Response } from "express-serve-static-core";
import { IUser } from "../models/user.model";
import { createUser, getUserByEmail } from "../services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function login(user: IUser, res: Response) {
    const authToken = await jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.SECRET_JWT || ""
    );
    res.cookie("auth-token", authToken);
}

export async function handleSignup(req: Request<{}, {}, IUser>, res: Response) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    await login(user, res);
    res.status(201).json({ status: "success", message: "User created", user });
}

export async function handleLogin(
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
        if (await bcrypt.compare(password, user?.password)) {
            await login(user, res);
            res.status(200).json({
                status: "success",
                message: "User logged in",
                user,
            });
        } else
            res.status(400).json({
                status: "error",
                message: "Invalid Password",
            });
    } else
        res.status(400).json({
            status: "error",
            message: "No user found with this email",
        });
}
