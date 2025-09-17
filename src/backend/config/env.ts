import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
export const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  console.warn(
    "MONGODB_URI is not set. The backend will fail to connect to the database until it is configured."
  );
}
