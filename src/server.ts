import { env } from "./helper/env.helper";
import app from "./app";
import mongoose from "mongoose";

const PORT = env.PORT;

if (!env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

// MongoDB connect
mongoose
  .connect(env.MONGODB_URI)
  .then(() => {
    // run express
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
