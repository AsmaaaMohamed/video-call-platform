import express from "express";
import {ENV} from "./lib/env.js";
import {connectDB} from "./lib/db.js";

const app = express();
console.log(ENV.PORT);

app.get("/", (req, res) => {
  res.status(200).json({ message: "success from backend 123" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("server is running on port:", ENV.PORT);
      connectDB();
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();