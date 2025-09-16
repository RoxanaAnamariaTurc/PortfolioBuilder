import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { ValidationError } from "../validation/schema.js";

const isMongooseValidationError = (
  error: unknown
): error is { message: string; name: string } =>
  typeof error === "object" &&
  error !== null &&
  (error as { name?: string }).name === "ValidationError" &&
  typeof (error as { message?: string }).message === "string";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues,
    });
  }

  if (isMongooseValidationError(err)) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "An unexpected error occurred" });
};
