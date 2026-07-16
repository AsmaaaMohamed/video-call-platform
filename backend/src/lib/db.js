import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("DB_URL is not defined in the environment variables");
        }
        await mongoose.connect(ENV.DB_URL);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};