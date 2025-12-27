import cors from "cors";
import express from "express";
import path from "path";
import { NODE_ENV } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const allowedOrigins =
  NODE_ENV === "production"
    ? ["https://nimble-fairy-0b2928.netlify.app"]
    : [
        "http://localhost:3000",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:5173",
      ];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

const uploadsDirectory = path.resolve("uploads");
app.use("/uploads", express.static(uploadsDirectory));

app.use(authRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(skillRoutes);

app.use(errorHandler);

export default app;
