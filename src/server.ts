import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config({path: '.env'});
const PORT = process.env.PORT || 8080;

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URL as string)
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
