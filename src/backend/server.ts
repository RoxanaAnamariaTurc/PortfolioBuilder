import mongoose from "mongoose";
import app from "./app.js";
import { MONGODB_URI, PORT } from "./config/env.js";

const startServer = async () => {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not configured");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to the db");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void startServer();
