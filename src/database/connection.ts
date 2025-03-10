import mongoose from "mongoose";

export function connectDatabase() {
    mongoose
        .connect(process.env.DATABASE_URL || "")
        .then(() => {
            console.log("Mongodb connected...");
        })
        .catch((error: Error) => {
            throw error;
        });
}
