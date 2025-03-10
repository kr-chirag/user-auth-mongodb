import express from "express";
import { handleLogin, handleSignup } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", handleSignup);
authRouter.post("/login", handleLogin);

export default authRouter;
