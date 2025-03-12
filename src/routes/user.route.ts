import express from "express";
import {
    handleDeleteUser,
    handleGetAllUsers,
    handleGetProfile,
    handleGetUser,
    handleUpdateProfile,
} from "../controllers/user.controller";
import { checkAuth } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.use(checkAuth);

userRouter.route("/profile").get(handleGetProfile).post(handleUpdateProfile);
userRouter.route("/:userId").get(handleGetUser).delete(handleDeleteUser);
userRouter.get("/", handleGetAllUsers);

export default userRouter;
