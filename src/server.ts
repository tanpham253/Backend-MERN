import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || "";

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Backend-MERN')
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});