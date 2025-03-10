import "./configs";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import { connectDatabase } from "./database/connection";
import userRouter from "./routes/user.route";

connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(3000, (error?: Error) => {
    if (error) console.log(error);
    else console.log("Server started at http://localhost:3000");
});
