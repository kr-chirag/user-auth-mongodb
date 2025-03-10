import express from "express";
import { handleLogin, handleSignup } from "../controllers/auth.controller";
import {
    handleDeleteProfile,
    handleGetAllUsers,
    handleGetProfile,
    handleGetUser,
    handleUpdateProfile,
} from "../controllers/user.controller";
import { checkAuth } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.use(checkAuth);

userRouter
    .route("/profile")
    .get(handleGetProfile)
    .post(handleUpdateProfile)
    .delete(handleDeleteProfile);
userRouter.get("/:userId", handleGetUser);
userRouter.get("/", handleGetAllUsers);

export default userRouter;
