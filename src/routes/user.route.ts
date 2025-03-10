import express from "express";
import { handleLogin, handleSignup } from "../controllers/auth.controller";
import {
    handleGetAllUsers,
    handleGetUser,
} from "../controllers/user.controller";
import { checkAuth } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.use(checkAuth);

userRouter.get("/:userId", handleGetUser);
userRouter.get("/", handleGetAllUsers);

export default userRouter;
