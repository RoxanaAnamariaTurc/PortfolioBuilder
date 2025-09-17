import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { loginUser, registerUser } from "../services/authService.js";
import { LoginBody, RegisterBody } from "../validation/authSchemas.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as RegisterBody;
  const profileImage = req.file ? req.file.path : null;

  const result = await registerUser({
    fullName: body.fullName,
    email: body.email,
    password: body.password,
    jobTitle: body.jobTitle,
    profileImage,
  });

  res.status(201).json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as LoginBody;
  const result = await loginUser({
    email: body.email,
    password: body.password,
  });

  res.status(200).json(result);
});
