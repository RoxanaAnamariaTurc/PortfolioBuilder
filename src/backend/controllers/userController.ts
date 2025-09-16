import { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  getPortfolioByToken,
  getUserByToken,
  updateUserProfile,
} from "../services/userService.js";
import {
  TokenParams,
  UpdateUserBody,
  UpdateUserParams,
} from "../validation/userSchemas.js";

export const getPortfolio = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params as TokenParams;
  const portfolio = await getPortfolioByToken(token);
  res.status(200).json({ user: portfolio });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params as TokenParams;
  const user = await getUserByToken(token);
  res.status(200).json({ user });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params as UpdateUserParams;
  const body = req.body as UpdateUserBody;

  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("No token provided", 403);
  }

  const token = authHeader.slice(7);
  const updatedUser = await updateUserProfile({
    userId: params.userId,
    token,
    updates: {
      fullName: body.fullName,
      email: body.email,
      jobTitle: body.jobTitle,
    },
  });

  res.status(200).json(updatedUser);
});
