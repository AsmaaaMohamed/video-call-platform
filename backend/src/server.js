import express from "express";
import {ENV} from "./lib/env.js";
import {connectDB} from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import cors from "cors";
import path from "path";

const app = express();
const __dirname = path.resolve();
//middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));
app.use("/inngest", serve({ client: inngest, functions }));

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